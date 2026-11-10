/**
 * STATELESS SESSION & OIDC RELYING PARTY AUTHENTICATION (@wesdizzle/app-kit/worker)
 *
 * Unifies the best of `living-dex/worker/auth.ts` and `collection-tracker/worker/auth.ts`:
 * - Zero-D1-read session verification via HMAC-SHA256 signed cookies (`uid`, `un`, `r`, optional `hr`)
 * - OIDC 1.0 Authorization Code Flow with PKCE (`S256`) state/nonce cookies (`redirectUri` & `returnTo`)
 * - Resilient JWKS verification (`ES256` with `derToP1363` ASN.1 DER -> IEEE P1363 conversion, `RS256`,
 *   fallback `kid` resolution, 60s refetch cooldown, 1h TTL cache, injectable `fetchFn` & `nowMs`)
 * - CSRF Origin guard exempting `/api/auth/logout` and standard security headers (`withSecurityHeaders`)
 */

export const SESSION_COOKIE = 'app_user_session';
export const LEGACY_SESSION_COOKIE = 'living_dex_session';
export const DEFAULT_SESSION_DAYS = 30;
export const SESSION_TTL_SECONDS = DEFAULT_SESSION_DAYS * 24 * 60 * 60;
export const OIDC_STATE_COOKIE = 'app_oidc_state';
export const LEGACY_OIDC_STATE_COOKIE = 'oidc_login_state';
export const OIDC_STATE_TTL_SECONDS = 600; // 10 minutes

export type UserRole = 'admin' | 'user';

export interface SessionUser {
  id: number;
  username: string;
  role: UserRole;
  homeRegion?: string;
}

interface SessionPayload {
  uid: number;
  un?: string;
  usr?: string;
  r?: UserRole;
  rol?: UserRole;
  hr?: string;
  exp: number;
}

export interface OidcStatePayload {
  state: string;
  codeVerifier: string;
  nonce: string;
  redirectUri?: string;
  returnTo?: string;
  silent?: boolean;
  exp: number;
}

export interface OidcIdTokenClaims {
  iss: string;
  sub: string;
  aud: string | string[];
  exp: number;
  iat?: number;
  nbf?: number;
  nonce?: string;
  preferred_username?: string;
  name?: string | null;
  email?: string | null;
  email_verified?: boolean;
  role?: UserRole;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function base64UrlEncode(bytes: Uint8Array): string {
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function base64UrlDecode(input: string): Uint8Array {
  let b64 = input.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4 !== 0) b64 += '=';
  const binary = atob(b64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

export function timingSafeEqualStrings(a: string, b: string): boolean {
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);
  const maxLen = Math.max(aBytes.length, bBytes.length);
  let diff = aBytes.length ^ bBytes.length;
  for (let i = 0; i < maxLen; i++) {
    diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  }
  return diff === 0 && aBytes.length > 0;
}

export function generateRandomBase64Url(byteLength = 32): string {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return base64UrlEncode(bytes);
}

export const generateRandomToken = generateRandomBase64Url;

export async function sha256Base64Url(input: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    encoder.encode(input) as unknown as BufferSource,
  );
  return base64UrlEncode(new Uint8Array(digest));
}

export const computePkceCodeChallenge = sha256Base64Url;
export const generatePkceChallenge = sha256Base64Url;

const hmacKeyCache = new Map<string, Promise<CryptoKey>>();

function getHmacKey(secret: string): Promise<CryptoKey> {
  let key = hmacKeyCache.get(secret);
  if (!key) {
    key = crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign', 'verify'],
    );
    hmacKeyCache.set(secret, key);
  }
  return key;
}

export async function signSession(
  user: SessionUser,
  secret: string,
  days: number = DEFAULT_SESSION_DAYS,
  nowMs: number = Date.now(),
): Promise<string> {
  if (!secret) throw new Error('SESSION_SECRET is not configured.');
  const payload: SessionPayload = {
    uid: user.id,
    un: user.username,
    r: user.role,
    ...(user.homeRegion ? { hr: user.homeRegion } : {}),
    exp: Math.floor(nowMs / 1000) + Math.round(days * 86400),
  };
  const body = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign(
    'HMAC',
    await getHmacKey(secret),
    encoder.encode(body),
  );
  return `${body}.${base64UrlEncode(new Uint8Array(sig))}`;
}

export async function verifySession(
  token: string | null | undefined,
  secret: string | undefined,
  nowMs: number = Date.now(),
): Promise<SessionUser | null> {
  if (!token || !secret) return null;
  const parts = token.split('.');
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  const [body, sig] = parts;

  let sigBytes: Uint8Array;
  try {
    sigBytes = base64UrlDecode(sig);
  } catch {
    return null;
  }

  try {
    const valid = await crypto.subtle.verify(
      'HMAC',
      await getHmacKey(secret),
      sigBytes as unknown as BufferSource,
      encoder.encode(body),
    );
    if (!valid) return null;

    const payload = JSON.parse(
      decoder.decode(base64UrlDecode(body)),
    ) as SessionPayload;
    const username = payload.un ?? payload.usr;
    const role = payload.r ?? payload.rol;
    if (
      typeof payload.uid !== 'number' ||
      payload.uid <= 0 ||
      typeof username !== 'string' ||
      !username ||
      (role !== 'admin' && role !== 'user') ||
      typeof payload.exp !== 'number'
    ) {
      return null;
    }
    if (payload.exp < Math.floor(nowMs / 1000)) return null;

    const result: SessionUser = {
      id: payload.uid,
      username,
      role,
    };
    if (typeof payload.hr === 'string' && payload.hr) {
      result.homeRegion = payload.hr;
    }
    return result;
  } catch {
    return null;
  }
}

export async function signOidcStateCookie(
  payload: Omit<OidcStatePayload, 'exp'> & { exp?: number },
  secret: string,
  ttlSeconds: number = OIDC_STATE_TTL_SECONDS,
  nowMs: number = Date.now(),
): Promise<string> {
  if (!secret) throw new Error('SESSION_SECRET is not configured.');
  const fullPayload: OidcStatePayload = {
    ...payload,
    exp:
      typeof payload.exp === 'number'
        ? payload.exp
        : Math.floor(nowMs / 1000) + ttlSeconds,
  };
  const body = base64UrlEncode(encoder.encode(JSON.stringify(fullPayload)));
  const sig = await crypto.subtle.sign(
    'HMAC',
    await getHmacKey(`oidc_state:${secret}`),
    encoder.encode(body),
  );
  return `${body}.${base64UrlEncode(new Uint8Array(sig))}`;
}

export const signOidcState = signOidcStateCookie;

export async function verifyOidcStateCookie(
  token: string | null | undefined,
  secret: string | undefined,
  nowMs: number = Date.now(),
): Promise<OidcStatePayload | null> {
  if (!token || !secret) return null;
  const parts = token.split('.');
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  const [body, sig] = parts;

  let sigBytes: Uint8Array;
  try {
    sigBytes = base64UrlDecode(sig);
  } catch {
    return null;
  }

  try {
    const valid = await crypto.subtle.verify(
      'HMAC',
      await getHmacKey(`oidc_state:${secret}`),
      sigBytes as unknown as BufferSource,
      encoder.encode(body),
    );
    if (!valid) return null;

    const payload = JSON.parse(
      decoder.decode(base64UrlDecode(body)),
    ) as OidcStatePayload;
    if (
      typeof payload.state !== 'string' ||
      !payload.state ||
      typeof payload.codeVerifier !== 'string' ||
      !payload.codeVerifier ||
      typeof payload.nonce !== 'string' ||
      !payload.nonce ||
      typeof payload.exp !== 'number'
    ) {
      return null;
    }
    if (payload.exp < Math.floor(nowMs / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export const verifyOidcState = verifyOidcStateCookie;

/**
 * Converts an ASN.1 DER-encoded ECDSA signature into a 64-byte IEEE P1363
 * (r || s) signature if needed, or returns the original bytes if already P1363.
 */
export function derToP1363(sig: Uint8Array, componentLength = 32): Uint8Array {
  if (sig.length === componentLength * 2) return sig;
  if (sig.length < 8 || sig[0] !== 0x30) return sig;
  let offset = 2;
  if ((sig[1] & 0x80) !== 0) {
    offset = 2 + (sig[1] & 0x7f);
  }
  if (offset + 2 > sig.length || sig[offset] !== 0x02) return sig;
  const rLen = sig[offset + 1];
  const rStart = offset + 2;
  if (rStart + rLen > sig.length) return sig;
  const rBytes = sig.slice(rStart, rStart + rLen);
  offset = rStart + rLen;
  if (offset + 2 > sig.length || sig[offset] !== 0x02) return sig;
  const sLen = sig[offset + 1];
  const sStart = offset + 2;
  if (sStart + sLen > sig.length) return sig;
  const sBytes = sig.slice(sStart, sStart + sLen);

  const out = new Uint8Array(componentLength * 2);
  const rTrim =
    rBytes.length > componentLength
      ? rBytes.slice(rBytes.length - componentLength)
      : rBytes;
  const sTrim =
    sBytes.length > componentLength
      ? sBytes.slice(sBytes.length - componentLength)
      : sBytes;
  out.set(rTrim, componentLength - rTrim.length);
  out.set(sTrim, componentLength * 2 - sTrim.length);
  return out;
}

interface CachedJwksEntry {
  alg: 'ES256' | 'RS256';
  key: CryptoKey;
}

const JWKS_CACHE_TTL_MS = 60 * 60 * 1000;
const JWKS_REFETCH_COOLDOWN_MS = 60 * 1000;

let oidcJwksCache: {
  issuer: string;
  keys: Map<string, CachedJwksEntry>;
  fetchedAt: number;
  expiresAt: number;
} | null = null;

export function resetOidcJwksCache(): void {
  oidcJwksCache = null;
}

async function getOidcSigningKey(
  issuer: string,
  kid: string | undefined,
  alg: 'ES256' | 'RS256',
  fetchFn: typeof fetch,
  nowMs: number,
): Promise<CachedJwksEntry | null> {
  const normalizedIssuer = issuer.replace(/\/+$/, '');
  const lookupKey = kid || `__default_${alg}`;

  const cacheHitSameIssuer =
    oidcJwksCache !== null &&
    oidcJwksCache.issuer === normalizedIssuer &&
    oidcJwksCache.expiresAt >= nowMs;

  if (cacheHitSameIssuer) {
    const match =
      oidcJwksCache!.keys.get(lookupKey) ||
      (!kid && oidcJwksCache!.keys.size === 1
        ? Array.from(oidcJwksCache!.keys.values())[0]
        : undefined);
    if (match && match.alg === alg) {
      return match;
    }
    if (nowMs - oidcJwksCache!.fetchedAt < JWKS_REFETCH_COOLDOWN_MS) {
      return null;
    }
  }

  const res = await fetchFn(`${normalizedIssuer}/.well-known/jwks.json`);
  if (!res.ok) return null;
  const data = (await res.json()) as {
    keys?: (JsonWebKey & { kid?: string; alg?: string; use?: string })[];
  };

  const keys = new Map<string, CachedJwksEntry>();
  for (const jwk of data.keys || []) {
    if (jwk.use && jwk.use !== 'sig') continue;
    try {
      if (jwk.kty === 'EC' && (!jwk.crv || jwk.crv === 'P-256')) {
        const key = await crypto.subtle.importKey(
          'jwk',
          { kty: 'EC', crv: 'P-256', x: jwk.x, y: jwk.y, ext: true },
          { name: 'ECDSA', namedCurve: 'P-256' },
          false,
          ['verify'],
        );
        const entry: CachedJwksEntry = { alg: 'ES256', key };
        keys.set(jwk.kid || '__default_ES256', entry);
      } else if (jwk.kty === 'RSA' && jwk.n && jwk.e) {
        const key = await crypto.subtle.importKey(
          'jwk',
          { kty: 'RSA', n: jwk.n, e: jwk.e, alg: 'RS256', ext: true },
          { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
          false,
          ['verify'],
        );
        const entry: CachedJwksEntry = { alg: 'RS256', key };
        keys.set(jwk.kid || '__default_RS256', entry);
      }
    } catch {
      // Skip unsupported key entries
    }
  }

  oidcJwksCache = {
    issuer: normalizedIssuer,
    keys,
    fetchedAt: nowMs,
    expiresAt: nowMs + JWKS_CACHE_TTL_MS,
  };

  const resolved =
    keys.get(lookupKey) ||
    (!kid && keys.size === 1 ? Array.from(keys.values())[0] : undefined);
  return resolved && resolved.alg === alg ? resolved : null;
}

export interface VerifyOidcIdTokenOptions {
  issuer: string;
  clientId: string;
  expectedNonce?: string | null;
  fetchFn?: typeof fetch;
  nowMs?: number;
}

/**
 * Cryptographically verifies an OIDC ID Token (ES256 or RS256) against the
 * provider's `.well-known/jwks.json` endpoint and validates standard OIDC claims.
 */
export async function verifyOidcIdToken(
  idToken: string | null | undefined,
  opts: VerifyOidcIdTokenOptions,
): Promise<OidcIdTokenClaims | null> {
  if (!idToken || !opts.issuer || !opts.clientId) return null;
  try {
    const parts = idToken.split('.');
    if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) return null;
    const [headerB64, payloadB64, sigB64] = parts;

    const header = JSON.parse(decoder.decode(base64UrlDecode(headerB64))) as {
      alg?: string;
      kid?: string;
    };
    if (header.alg !== 'ES256' && header.alg !== 'RS256') return null;

    const nowMs = opts.nowMs ?? Date.now();
    const normalizedIssuer = opts.issuer.trim().replace(/\/+$/, '');
    const signingKey = await getOidcSigningKey(
      normalizedIssuer,
      header.kid,
      header.alg,
      opts.fetchFn ?? fetch,
      nowMs,
    );
    if (!signingKey) return null;

    const rawSig = base64UrlDecode(sigB64);
    const sigBytes = header.alg === 'ES256' ? derToP1363(rawSig) : rawSig;
    const verifyParams: EcdsaParams | AlgorithmIdentifier =
      header.alg === 'ES256'
        ? { name: 'ECDSA', hash: 'SHA-256' }
        : { name: 'RSASSA-PKCS1-v1_5' };

    const isValid = await crypto.subtle.verify(
      verifyParams,
      signingKey.key,
      sigBytes as unknown as BufferSource,
      encoder.encode(`${headerB64}.${payloadB64}`),
    );
    if (!isValid) return null;

    const payload = JSON.parse(
      decoder.decode(base64UrlDecode(payloadB64)),
    ) as OidcIdTokenClaims;

    if (
      !payload ||
      typeof payload.sub !== 'string' ||
      !payload.sub.trim() ||
      typeof payload.iss !== 'string'
    ) {
      return null;
    }

    if (payload.iss.replace(/\/+$/, '') !== normalizedIssuer) {
      return null;
    }

    const audList = Array.isArray(payload.aud)
      ? payload.aud
      : payload.aud
        ? [payload.aud]
        : [];
    if (!audList.includes(opts.clientId)) {
      return null;
    }

    const nowSec = Math.floor(nowMs / 1000);
    if (typeof payload.exp !== 'number' || payload.exp <= nowSec) {
      return null;
    }
    if (typeof payload.nbf === 'number' && payload.nbf > nowSec + 60) {
      return null;
    }

    if (opts.expectedNonce !== undefined && opts.expectedNonce !== null) {
      if (
        typeof payload.nonce !== 'string' ||
        !timingSafeEqualStrings(payload.nonce, opts.expectedNonce)
      ) {
        return null;
      }
    }

    return payload;
  } catch {
    return null;
  }
}

export function parseCookies(header: string | null): Record<string, string> {
  if (!header) return {};
  const out: Record<string, string> = {};
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    if (key) {
      try {
        out[key] = decodeURIComponent(val);
      } catch {
        out[key] = val;
      }
    }
  }
  return out;
}

export function isLoopbackRequest(input: Request | URL): boolean {
  try {
    const url = input instanceof URL ? input : new URL(input.url);
    const host = url.hostname.toLowerCase();
    return host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
  } catch {
    return false;
  }
}

/**
 * Validates that state-mutating requests (POST/PUT/DELETE) originate from the
 * same origin, while explicitly exempting `/api/auth/logout` so privacy browsers
 * sending `Origin: null` or upstream front-channel logout requests are never blocked.
 */
export function isCrossOriginMutatingRequest(
  request: Request,
  url: URL,
): boolean {
  if (
    request.method !== 'POST' &&
    request.method !== 'PUT' &&
    request.method !== 'DELETE'
  ) {
    return false;
  }
  if (url.pathname === '/api/auth/logout') {
    return false;
  }
  const originHeader = request.headers.get('Origin');
  return originHeader !== null && originHeader !== url.origin;
}

const DEFAULT_HTML_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' https: data: blob:",
  "connect-src 'self' https:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
].join('; ');

export function withSecurityHeaders(
  response: Response,
  htmlCsp = DEFAULT_HTML_CSP,
): Response {
  const headers = new Headers(response.headers);
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  const contentType = headers.get('Content-Type') || '';
  if (
    contentType.includes('text/html') &&
    !headers.has('Content-Security-Policy')
  ) {
    headers.set('Content-Security-Policy', htmlCsp);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
