/**
 * STATELESS SESSION & OIDC RELYING PARTY AUTHENTICATION (@wesdizzle/app-kit/worker)
 *
 * Provides zero-D1-read session verification via HMAC-SHA256 signed cookies,
 * OIDC 1.0 Authorization Code Flow with PKCE (S256), and cached JWKS verification
 * (ES256 with ASN.1 DER -> IEEE P1363 normalization, and RS256).
 */

export const SESSION_COOKIE = '__Host-session';
export const DEV_SESSION_COOKIE = 'dev_session';
export const LEGACY_SESSION_COOKIE = '__Host-dex_session';
export const OIDC_STATE_COOKIE = '__Host-oidc_state';
export const DEV_OIDC_STATE_COOKIE = 'dev_oidc_state';

export const SESSION_TTL_SECONDS = 30 * 24 * 60 * 60; // 30 days
export const OIDC_STATE_TTL_SECONDS = 10 * 60; // 10 minutes

export interface SessionUser {
  id: number;
  username: string;
  role: 'admin' | 'user';
  homeRegion?: string;
}

interface SessionPayload {
  uid: number;
  usr: string;
  rol: 'admin' | 'user';
  hr?: string;
  exp: number;
}

export interface OidcStatePayload {
  state: string;
  codeVerifier: string;
  nonce: string;
  returnTo?: string;
  exp: number;
}

export interface OidcIdTokenClaims {
  iss: string;
  sub: string;
  aud: string | string[];
  exp: number;
  iat: number;
  nonce?: string;
  email?: string;
  preferred_username?: string;
  role?: string;
}

export function base64UrlEncode(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function base64UrlDecode(str: string): Uint8Array {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function generateRandomBase64Url(byteLength = 32): string {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return base64UrlEncode(bytes);
}

export async function computePkceCodeChallenge(
  verifier: string,
): Promise<string> {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(verifier),
  );
  return base64UrlEncode(new Uint8Array(digest));
}

export function timingSafeEqualStrings(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const aBytes = enc.encode(a);
  const bBytes = enc.encode(b);
  const maxLen = Math.max(aBytes.length, bBytes.length);
  let diff = aBytes.length ^ bBytes.length;
  for (let i = 0; i < maxLen; i++) {
    diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  }
  return diff === 0;
}

export function isLoopbackRequest(request: Request): boolean {
  try {
    const url = new URL(request.url);
    return url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  } catch {
    return false;
  }
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

export async function signSession(
  user: SessionUser,
  secret: string,
  ttlSeconds = SESSION_TTL_SECONDS,
): Promise<string> {
  const payload: SessionPayload = {
    uid: user.id,
    usr: user.username,
    rol: user.role,
    ...(user.homeRegion ? { hr: user.homeRegion } : {}),
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const payloadB64 = base64UrlEncode(
    new TextEncoder().encode(JSON.stringify(payload)),
  );
  const key = await importHmacKey(secret);
  const sig = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(payloadB64),
  );
  return `${payloadB64}.${base64UrlEncode(new Uint8Array(sig))}`;
}

export async function verifySession(
  token: string,
  secret: string,
): Promise<SessionUser | null> {
  try {
    const dotIdx = token.indexOf('.');
    if (dotIdx <= 0 || dotIdx !== token.lastIndexOf('.')) return null;

    const payloadB64 = token.slice(0, dotIdx);
    const sigB64 = token.slice(dotIdx + 1);
    if (!payloadB64 || !sigB64) return null;

    const key = await importHmacKey(secret);
    const sigBytes = base64UrlDecode(sigB64);
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes.buffer as ArrayBuffer,
      new TextEncoder().encode(payloadB64),
    );
    if (!valid) return null;

    const rawJson = new TextDecoder().decode(base64UrlDecode(payloadB64));
    const parsed = JSON.parse(rawJson) as Partial<SessionPayload>;
    if (
      typeof parsed.uid !== 'number' ||
      typeof parsed.usr !== 'string' ||
      (parsed.rol !== 'admin' && parsed.rol !== 'user') ||
      typeof parsed.exp !== 'number'
    ) {
      return null;
    }

    if (parsed.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    const sessionUser: SessionUser = {
      id: parsed.uid,
      username: parsed.usr,
      role: parsed.rol,
    };
    if (typeof parsed.hr === 'string' && parsed.hr) {
      sessionUser.homeRegion = parsed.hr;
    }
    return sessionUser;
  } catch {
    return null;
  }
}

export function buildSessionCookie(
  token: string,
  request: Request,
  ttlSeconds = SESSION_TTL_SECONDS,
): string {
  const isDev = isLoopbackRequest(request);
  const cookieName = isDev ? DEV_SESSION_COOKIE : SESSION_COOKIE;
  const secureAttr = isDev ? '' : ' Secure;';
  return `${cookieName}=${token}; HttpOnly;${secureAttr} SameSite=Lax; Path=/; Max-Age=${ttlSeconds}`;
}

export function clearSessionCookies(
  request: Request,
  includeLegacyCookie = true,
): string[] {
  const isDev = isLoopbackRequest(request);
  if (isDev) {
    return [`${DEV_SESSION_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`];
  }
  const cookies = [
    `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`,
  ];
  if (includeLegacyCookie) {
    cookies.push(
      `${LEGACY_SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`,
    );
  }
  return cookies;
}

export function extractCookieValue(
  cookieHeader: string | null,
  name: string,
): string | null {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(';');
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(`${name}=`)) {
      return trimmed.slice(name.length + 1);
    }
  }
  return null;
}

export async function signOidcStateCookie(
  payload: Omit<OidcStatePayload, 'exp'>,
  secret: string,
  ttlSeconds = OIDC_STATE_TTL_SECONDS,
): Promise<string> {
  const fullPayload: OidcStatePayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const payloadB64 = base64UrlEncode(
    new TextEncoder().encode(JSON.stringify(fullPayload)),
  );
  const key = await importHmacKey(`oidc_state:${secret}`);
  const sig = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(payloadB64),
  );
  return `${payloadB64}.${base64UrlEncode(new Uint8Array(sig))}`;
}

export async function verifyOidcStateCookie(
  token: string,
  secret: string,
): Promise<OidcStatePayload | null> {
  try {
    const dotIdx = token.indexOf('.');
    if (dotIdx <= 0 || dotIdx !== token.lastIndexOf('.')) return null;

    const payloadB64 = token.slice(0, dotIdx);
    const sigB64 = token.slice(dotIdx + 1);
    if (!payloadB64 || !sigB64) return null;

    const key = await importHmacKey(`oidc_state:${secret}`);
    const sigBytes = base64UrlDecode(sigB64);
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes.buffer as ArrayBuffer,
      new TextEncoder().encode(payloadB64),
    );
    if (!valid) return null;

    const rawJson = new TextDecoder().decode(base64UrlDecode(payloadB64));
    const parsed = JSON.parse(rawJson) as Partial<OidcStatePayload>;
    if (
      typeof parsed.state !== 'string' ||
      typeof parsed.codeVerifier !== 'string' ||
      typeof parsed.nonce !== 'string' ||
      typeof parsed.exp !== 'number'
    ) {
      return null;
    }

    if (parsed.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return {
      state: parsed.state,
      codeVerifier: parsed.codeVerifier,
      nonce: parsed.nonce,
      ...(typeof parsed.returnTo === 'string'
        ? { returnTo: parsed.returnTo }
        : {}),
      exp: parsed.exp,
    };
  } catch {
    return null;
  }
}

export function buildOidcStateCookie(
  token: string,
  request: Request,
  ttlSeconds = OIDC_STATE_TTL_SECONDS,
): string {
  const isDev = isLoopbackRequest(request);
  const cookieName = isDev ? DEV_OIDC_STATE_COOKIE : OIDC_STATE_COOKIE;
  const secureAttr = isDev ? '' : ' Secure;';
  return `${cookieName}=${token}; HttpOnly;${secureAttr} SameSite=Lax; Path=/; Max-Age=${ttlSeconds}`;
}

export function clearOidcStateCookie(request: Request): string {
  const isDev = isLoopbackRequest(request);
  const cookieName = isDev ? DEV_OIDC_STATE_COOKIE : OIDC_STATE_COOKIE;
  const secureAttr = isDev ? '' : ' Secure;';
  return `${cookieName}=; HttpOnly;${secureAttr} SameSite=Lax; Path=/; Max-Age=0`;
}

/**
 * Converts an ASN.1 DER-encoded ECDSA signature into a 64-byte IEEE P1363
 * (r || s) signature if needed, or returns the original bytes if already P1363.
 */
export function derToP1363(sig: Uint8Array, componentLength = 32): Uint8Array {
  if (sig.length === componentLength * 2) {
    return sig;
  }
  if (sig.length < 8 || sig[0] !== 0x30) {
    return sig;
  }
  let offset = 1;
  let seqLen = sig[offset++];
  if (seqLen & 0x80) {
    const nBytes = seqLen & 0x7f;
    if (nBytes === 0 || nBytes > 2 || offset + nBytes > sig.length) return sig;
    seqLen = 0;
    for (let i = 0; i < nBytes; i++) {
      seqLen = (seqLen << 8) | sig[offset++];
    }
  }
  if (sig[offset++] !== 0x02) return sig;
  const rLen = sig[offset++];
  if (offset + rLen > sig.length) return sig;
  const rBytes = sig.subarray(offset, offset + rLen);
  offset += rLen;

  if (sig[offset++] !== 0x02) return sig;
  const sLen = sig[offset++];
  if (offset + sLen > sig.length) return sig;
  const sBytes = sig.subarray(offset, offset + sLen);

  const out = new Uint8Array(componentLength * 2);
  const copyInt = (src: Uint8Array, destOffset: number) => {
    let trimmed = src;
    while (trimmed.length > componentLength && trimmed[0] === 0x00) {
      trimmed = trimmed.subarray(1);
    }
    if (trimmed.length > componentLength) return false;
    out.set(trimmed, destOffset + (componentLength - trimmed.length));
    return true;
  };
  if (!copyInt(rBytes, 0) || !copyInt(sBytes, componentLength)) {
    return sig;
  }
  return out;
}

interface CachedJwks {
  keys: Map<string, { key: CryptoKey; alg: string }>;
  fetchedAtMs: number;
  lastRefetchAttemptMs: number;
}

const jwksCacheByIssuer = new Map<string, CachedJwks>();
const JWKS_TTL_MS = 60 * 60 * 1000; // 1 hour
const JWKS_REFETCH_COOLDOWN_MS = 60 * 1000; // 60 seconds cooldown on unknown kid

export function resetOidcJwksCache(): void {
  jwksCacheByIssuer.clear();
}

async function fetchAndCacheJwks(
  issuer: string,
  existing?: CachedJwks,
): Promise<CachedJwks> {
  const now = Date.now();
  const jwksUrl = `${issuer.replace(/\/+$/, '')}/.well-known/jwks.json`;
  const response = await fetch(jwksUrl, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch JWKS (${response.status})`);
  }
  const body = (await response.json()) as {
    keys?: Array<JsonWebKey & { kid?: string; alg?: string; use?: string }>;
  };
  const keyMap = new Map<string, { key: CryptoKey; alg: string }>();

  for (const jwk of body.keys ?? []) {
    if (jwk.use && jwk.use !== 'sig') continue;

    if (jwk.kty === 'EC' && (!jwk.crv || jwk.crv === 'P-256')) {
      const cryptoKey = await crypto.subtle.importKey(
        'jwk',
        jwk,
        { name: 'ECDSA', namedCurve: 'P-256' },
        false,
        ['verify'],
      );
      const kid = jwk.kid ?? '__default_ES256';
      keyMap.set(kid, { key: cryptoKey, alg: 'ES256' });
    } else if (jwk.kty === 'RSA') {
      const cryptoKey = await crypto.subtle.importKey(
        'jwk',
        jwk,
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        false,
        ['verify'],
      );
      const kid = jwk.kid ?? '__default_RS256';
      keyMap.set(kid, { key: cryptoKey, alg: 'RS256' });
    }
  }

  const entry: CachedJwks = {
    keys: keyMap,
    fetchedAtMs: now,
    lastRefetchAttemptMs: existing?.lastRefetchAttemptMs ?? now,
  };
  jwksCacheByIssuer.set(issuer, entry);
  return entry;
}

async function resolveSigningKey(
  issuer: string,
  kid: string | undefined,
  alg: string,
): Promise<{ key: CryptoKey; alg: string } | null> {
  const now = Date.now();
  let cached = jwksCacheByIssuer.get(issuer);

  if (!cached || now - cached.fetchedAtMs > JWKS_TTL_MS) {
    cached = await fetchAndCacheJwks(issuer, cached);
  }

  const lookup = (
    c: CachedJwks,
  ): { key: CryptoKey; alg: string } | undefined => {
    if (kid && c.keys.has(kid)) return c.keys.get(kid);
    const fallbackId = alg === 'ES256' ? '__default_ES256' : '__default_RS256';
    if (!kid && c.keys.has(fallbackId)) return c.keys.get(fallbackId);
    if (!kid && c.keys.size === 1) return Array.from(c.keys.values())[0];
    return undefined;
  };

  let found = lookup(cached);
  if (found) return found;

  if (now - cached.lastRefetchAttemptMs >= JWKS_REFETCH_COOLDOWN_MS) {
    cached.lastRefetchAttemptMs = now;
    cached = await fetchAndCacheJwks(issuer, cached);
    found = lookup(cached);
  }

  return found ?? null;
}

export async function verifyOidcIdToken(options: {
  idToken: string;
  issuer: string;
  clientId: string;
  expectedNonce?: string;
}): Promise<OidcIdTokenClaims> {
  const parts = options.idToken.split('.');
  if (parts.length !== 3) {
    throw new Error('Malformed ID token');
  }

  const [headerB64, payloadB64, sigB64] = parts;
  const header = JSON.parse(
    new TextDecoder().decode(base64UrlDecode(headerB64)),
  ) as { alg?: string; kid?: string };

  if (header.alg !== 'ES256' && header.alg !== 'RS256') {
    throw new Error(`Unsupported ID token alg: ${header.alg ?? 'none'}`);
  }

  const keyEntry = await resolveSigningKey(
    options.issuer,
    header.kid,
    header.alg,
  );
  if (!keyEntry || keyEntry.alg !== header.alg) {
    throw new Error('No matching JWK found for ID token');
  }

  const signingInput = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const rawSignature = base64UrlDecode(sigB64);

  let verified = false;
  if (header.alg === 'ES256') {
    const p1363Sig = derToP1363(rawSignature, 32);
    verified = await crypto.subtle.verify(
      { name: 'ECDSA', hash: 'SHA-256' },
      keyEntry.key,
      p1363Sig.buffer.slice(
        p1363Sig.byteOffset,
        p1363Sig.byteOffset + p1363Sig.byteLength,
      ) as ArrayBuffer,
      signingInput,
    );
  } else {
    verified = await crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      keyEntry.key,
      rawSignature.buffer.slice(
        rawSignature.byteOffset,
        rawSignature.byteOffset + rawSignature.byteLength,
      ) as ArrayBuffer,
      signingInput,
    );
  }

  if (!verified) {
    throw new Error('Invalid ID token signature');
  }

  const claims = JSON.parse(
    new TextDecoder().decode(base64UrlDecode(payloadB64)),
  ) as OidcIdTokenClaims;

  const normalizedExpectedIss = options.issuer.replace(/\/+$/, '');
  const normalizedClaimIss = (claims.iss ?? '').replace(/\/+$/, '');
  if (normalizedClaimIss !== normalizedExpectedIss) {
    throw new Error('ID token issuer mismatch');
  }

  const audiences = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  if (!audiences.includes(options.clientId)) {
    throw new Error('ID token audience mismatch');
  }

  const nowSec = Math.floor(Date.now() / 1000);
  if (typeof claims.exp !== 'number' || claims.exp <= nowSec - 30) {
    throw new Error('ID token expired');
  }

  if (options.expectedNonce && claims.nonce !== options.expectedNonce) {
    throw new Error('ID token nonce mismatch');
  }

  if (!claims.sub || typeof claims.sub !== 'string') {
    throw new Error('ID token missing sub claim');
  }

  return claims;
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
  if (contentType.includes('text/html') && !headers.has('Content-Security-Policy')) {
    headers.set('Content-Security-Policy', htmlCsp);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
