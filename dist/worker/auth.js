/**
 * STATELESS SESSION & OIDC RELYING PARTY AUTHENTICATION (@wesdizzle/app-kit/worker)
 *
 * Unifies stateless session verification, OIDC 1.0 Authorization Code + PKCE (`S256`),
 * `__Host-` cookie management (with rolling legacy cookie fallback), strict URL
 * `return_to` validation, Fetch Metadata + Origin CSRF protection, and CSP/HSTS
 * security headers.
 */
import { base64UrlDecode, base64UrlEncode, computePkceCodeChallenge, derToP1363, generatePkceChallenge, generateRandomBase64Url, generateRandomBytes, generateRandomToken, getCachedHmacKey, hmacSha256Bytes, hmacSha256Hex, resolveStrongSecret, sha256Base64Url, sha256Bytes, sha256Hex, timingSafeEqualBytes, timingSafeEqualStrings, } from './crypto.js';
export { base64UrlDecode, base64UrlEncode, computePkceCodeChallenge, derToP1363, generatePkceChallenge, generateRandomBase64Url, generateRandomBytes, generateRandomToken, hmacSha256Bytes, hmacSha256Hex, resolveStrongSecret, sha256Base64Url, sha256Bytes, sha256Hex, timingSafeEqualBytes, timingSafeEqualStrings, };
export const HOST_SESSION_COOKIE = '__Host-app_user_session';
export const SESSION_COOKIE = 'app_user_session';
export const LEGACY_SESSION_COOKIE = 'living_dex_session';
export const DEFAULT_SESSION_DAYS = 30;
export const SESSION_TTL_SECONDS = DEFAULT_SESSION_DAYS * 24 * 60 * 60;
export const HOST_OIDC_STATE_COOKIE = '__Host-app_oidc_state';
export const OIDC_STATE_COOKIE = 'app_oidc_state';
export const LEGACY_OIDC_STATE_COOKIE = 'oidc_login_state';
export const OIDC_STATE_TTL_SECONDS = 600; // 10 minutes
const encoder = new TextEncoder();
const decoder = new TextDecoder();
export async function signSession(user, secret, days = DEFAULT_SESSION_DAYS, nowMs = Date.now()) {
    if (!secret)
        throw new Error('SESSION_SECRET is not configured.');
    const payload = {
        uid: user.id,
        un: user.username,
        r: user.role,
        ...(user.homeRegion ? { hr: user.homeRegion } : {}),
        exp: Math.floor(nowMs / 1000) + Math.round(days * 86400),
    };
    const body = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
    const sig = await crypto.subtle.sign('HMAC', await getCachedHmacKey(`session:${secret}`), encoder.encode(body));
    return `${body}.${base64UrlEncode(new Uint8Array(sig))}`;
}
export async function verifySession(token, secret, nowMs = Date.now()) {
    if (!token || !secret)
        return null;
    const parts = token.split('.');
    if (parts.length !== 2 || !parts[0] || !parts[1])
        return null;
    const [body, sig] = parts;
    let sigBytes;
    try {
        sigBytes = base64UrlDecode(sig);
    }
    catch {
        return null;
    }
    try {
        // Verify domain-separated key first, with fallback to v1 unprefixed secret
        // so rolling upgrades preserve existing active sessions seamlessly.
        let valid = await crypto.subtle.verify('HMAC', await getCachedHmacKey(`session:${secret}`), sigBytes, encoder.encode(body));
        if (!valid) {
            valid = await crypto.subtle.verify('HMAC', await getCachedHmacKey(secret), sigBytes, encoder.encode(body));
        }
        if (!valid)
            return null;
        const payload = JSON.parse(decoder.decode(base64UrlDecode(body)));
        const username = payload.un ?? payload.usr;
        const role = payload.r ?? payload.rol;
        if (typeof payload.uid !== 'number' ||
            payload.uid <= 0 ||
            typeof username !== 'string' ||
            !username ||
            (role !== 'admin' && role !== 'user') ||
            typeof payload.exp !== 'number') {
            return null;
        }
        if (payload.exp < Math.floor(nowMs / 1000))
            return null;
        const result = {
            id: payload.uid,
            username,
            role,
        };
        if (typeof payload.hr === 'string' && payload.hr) {
            result.homeRegion = payload.hr;
        }
        return result;
    }
    catch {
        return null;
    }
}
export async function signOidcStateCookie(payload, secret, ttlSeconds = OIDC_STATE_TTL_SECONDS, nowMs = Date.now()) {
    if (!secret)
        throw new Error('SESSION_SECRET is not configured.');
    const fullPayload = {
        ...payload,
        exp: typeof payload.exp === 'number'
            ? payload.exp
            : Math.floor(nowMs / 1000) + ttlSeconds,
    };
    const body = base64UrlEncode(encoder.encode(JSON.stringify(fullPayload)));
    const sig = await crypto.subtle.sign('HMAC', await getCachedHmacKey(`oidc_state:${secret}`), encoder.encode(body));
    return `${body}.${base64UrlEncode(new Uint8Array(sig))}`;
}
export const signOidcState = signOidcStateCookie;
export async function verifyOidcStateCookie(token, secret, nowMs = Date.now()) {
    if (!token || !secret)
        return null;
    const parts = token.split('.');
    if (parts.length !== 2 || !parts[0] || !parts[1])
        return null;
    const [body, sig] = parts;
    let sigBytes;
    try {
        sigBytes = base64UrlDecode(sig);
    }
    catch {
        return null;
    }
    try {
        const valid = await crypto.subtle.verify('HMAC', await getCachedHmacKey(`oidc_state:${secret}`), sigBytes, encoder.encode(body));
        if (!valid)
            return null;
        const payload = JSON.parse(decoder.decode(base64UrlDecode(body)));
        if (typeof payload.state !== 'string' ||
            !payload.state ||
            typeof payload.codeVerifier !== 'string' ||
            !payload.codeVerifier ||
            typeof payload.nonce !== 'string' ||
            !payload.nonce ||
            typeof payload.exp !== 'number') {
            return null;
        }
        if (payload.exp < Math.floor(nowMs / 1000))
            return null;
        return payload;
    }
    catch {
        return null;
    }
}
export const verifyOidcState = verifyOidcStateCookie;
const JWKS_CACHE_TTL_MS = 60 * 60 * 1000;
const JWKS_REFETCH_COOLDOWN_MS = 60 * 1000;
let oidcJwksCache = null;
export function resetOidcJwksCache() {
    oidcJwksCache = null;
}
async function getOidcSigningKey(issuer, kid, alg, fetchFn, nowMs) {
    const normalizedIssuer = issuer.replace(/\/+$/, '');
    const lookupKey = kid || `__default_${alg}`;
    const cacheHitSameIssuer = oidcJwksCache !== null &&
        oidcJwksCache.issuer === normalizedIssuer &&
        oidcJwksCache.expiresAt >= nowMs;
    if (cacheHitSameIssuer) {
        const match = oidcJwksCache.keys.get(lookupKey) ||
            (!kid && oidcJwksCache.keys.size === 1
                ? Array.from(oidcJwksCache.keys.values())[0]
                : undefined);
        if (match && match.alg === alg) {
            return match;
        }
        if (nowMs - oidcJwksCache.fetchedAt < JWKS_REFETCH_COOLDOWN_MS) {
            return null;
        }
    }
    const res = await fetchFn(`${normalizedIssuer}/.well-known/jwks.json`);
    if (!res.ok)
        return null;
    const data = (await res.json());
    const keys = new Map();
    for (const jwk of data.keys || []) {
        if (jwk.use && jwk.use !== 'sig')
            continue;
        try {
            if (jwk.kty === 'EC' && (!jwk.crv || jwk.crv === 'P-256')) {
                const key = await crypto.subtle.importKey('jwk', { kty: 'EC', crv: 'P-256', x: jwk.x, y: jwk.y, ext: true }, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
                const entry = { alg: 'ES256', key };
                keys.set(jwk.kid || '__default_ES256', entry);
            }
            else if (jwk.kty === 'RSA' && jwk.n && jwk.e) {
                const key = await crypto.subtle.importKey('jwk', { kty: 'RSA', n: jwk.n, e: jwk.e, alg: 'RS256', ext: true }, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
                const entry = { alg: 'RS256', key };
                keys.set(jwk.kid || '__default_RS256', entry);
            }
        }
        catch {
            // Skip unsupported key entries
        }
    }
    oidcJwksCache = {
        issuer: normalizedIssuer,
        keys,
        fetchedAt: nowMs,
        expiresAt: nowMs + JWKS_CACHE_TTL_MS,
    };
    const resolved = keys.get(lookupKey) ||
        (!kid && keys.size === 1 ? Array.from(keys.values())[0] : undefined);
    return resolved && resolved.alg === alg ? resolved : null;
}
/**
 * Cryptographically verifies an OIDC ID Token (ES256 or RS256) against the
 * provider's `.well-known/jwks.json` endpoint and validates standard OIDC claims,
 * explicitly rejecting OAuth2 `at+jwt` / `token_use: "access"` tokens.
 */
export async function verifyOidcIdToken(idToken, opts) {
    if (!idToken || !opts.issuer || !opts.clientId)
        return null;
    try {
        const parts = idToken.split('.');
        if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2])
            return null;
        const [headerB64, payloadB64, sigB64] = parts;
        const header = JSON.parse(decoder.decode(base64UrlDecode(headerB64)));
        if (header.alg !== 'ES256' && header.alg !== 'RS256')
            return null;
        if (typeof header.typ === 'string' &&
            header.typ.toLowerCase() === 'at+jwt') {
            return null;
        }
        const nowMs = opts.nowMs ?? Date.now();
        const normalizedIssuer = opts.issuer.trim().replace(/\/+$/, '');
        const signingKey = await getOidcSigningKey(normalizedIssuer, header.kid, header.alg, opts.fetchFn ?? fetch, nowMs);
        if (!signingKey)
            return null;
        const rawSig = base64UrlDecode(sigB64);
        const sigBytes = header.alg === 'ES256' ? derToP1363(rawSig) : rawSig;
        const verifyParams = header.alg === 'ES256'
            ? { name: 'ECDSA', hash: 'SHA-256' }
            : { name: 'RSASSA-PKCS1-v1_5' };
        const isValid = await crypto.subtle.verify(verifyParams, signingKey.key, sigBytes, encoder.encode(`${headerB64}.${payloadB64}`));
        if (!isValid)
            return null;
        const payload = JSON.parse(decoder.decode(base64UrlDecode(payloadB64)));
        if (!payload ||
            typeof payload.sub !== 'string' ||
            !payload.sub.trim() ||
            typeof payload.iss !== 'string') {
            return null;
        }
        // Prevent RFC 9068 / OAuth2 access_token substitution into ID token verification
        if (payload.token_use !== undefined && payload.token_use !== 'id') {
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
            if (typeof payload.nonce !== 'string' ||
                !timingSafeEqualStrings(payload.nonce, opts.expectedNonce)) {
                return null;
            }
        }
        return {
            ...payload,
            email_verified: payload.email_verified === true,
        };
    }
    catch {
        return null;
    }
}
export function parseCookies(header) {
    if (!header)
        return {};
    const out = {};
    for (const part of header.split(';')) {
        const idx = part.indexOf('=');
        if (idx === -1)
            continue;
        const key = part.slice(0, idx).trim();
        const val = part.slice(idx + 1).trim();
        if (key) {
            try {
                out[key] = decodeURIComponent(val);
            }
            catch {
                out[key] = val;
            }
        }
    }
    return out;
}
export function isLoopbackRequest(input) {
    try {
        const url = input instanceof URL ? input : new URL(input.url);
        const host = url.hostname.toLowerCase();
        return host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
    }
    catch {
        return false;
    }
}
export function isSecureOrigin(input) {
    try {
        const url = input instanceof URL ? input : new URL(input.url);
        return url.protocol === 'https:' && !isLoopbackRequest(url);
    }
    catch {
        return false;
    }
}
export function getSessionCookieName(secure) {
    return secure ? HOST_SESSION_COOKIE : SESSION_COOKIE;
}
export function getOidcStateCookieName(secure) {
    return secure ? HOST_OIDC_STATE_COOKIE : OIDC_STATE_COOKIE;
}
export function readSessionCookie(cookies) {
    return (cookies[HOST_SESSION_COOKIE] ||
        cookies[SESSION_COOKIE] ||
        cookies[LEGACY_SESSION_COOKIE] ||
        null);
}
export function readOidcStateCookie(cookies) {
    return (cookies[HOST_OIDC_STATE_COOKIE] ||
        cookies[OIDC_STATE_COOKIE] ||
        cookies[LEGACY_OIDC_STATE_COOKIE] ||
        null);
}
export function serializeSessionCookie(token, secure, maxAgeSeconds = SESSION_TTL_SECONDS) {
    const name = getSessionCookieName(secure);
    const parts = [
        `${name}=${token}`,
        'Path=/',
        'HttpOnly',
        'SameSite=Lax',
        `Max-Age=${maxAgeSeconds}`,
    ];
    if (secure)
        parts.push('Secure');
    return parts.join('; ');
}
export function serializeClearSessionCookies(secure) {
    const headers = [];
    if (secure) {
        headers.push(`${HOST_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Secure`);
    }
    const secFlag = secure ? '; Secure' : '';
    headers.push(`${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secFlag}`, `${LEGACY_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secFlag}`);
    return headers;
}
export function serializeOidcStateCookie(token, secure, maxAgeSeconds = OIDC_STATE_TTL_SECONDS) {
    const name = getOidcStateCookieName(secure);
    const parts = [
        `${name}=${token}`,
        'Path=/',
        'HttpOnly',
        'SameSite=Lax',
        `Max-Age=${maxAgeSeconds}`,
    ];
    if (secure)
        parts.push('Secure');
    return parts.join('; ');
}
export function serializeClearOidcStateCookies(secure) {
    const headers = [];
    if (secure) {
        headers.push(`${HOST_OIDC_STATE_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Secure`);
    }
    const secFlag = secure ? '; Secure' : '';
    headers.push(`${OIDC_STATE_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secFlag}`, `${LEGACY_OIDC_STATE_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secFlag}`);
    return headers;
}
function hasAsciiControlChars(value) {
    for (let i = 0; i < value.length; i++) {
        const code = value.charCodeAt(i);
        if (code <= 0x1f || code === 0x7f)
            return true;
    }
    return false;
}
/**
 * Strictly validates an internal post-login `return_to` path against open-redirect
 * vectors, including WHATWG URL backslash authority normalization (`/\evil.com`),
 * protocol-relative paths (`//evil.com`), and ASCII control characters.
 */
export function sanitizeReturnToPath(raw, baseOrigin = 'https://app.local', defaultPath = '/') {
    if (!raw || typeof raw !== 'string')
        return defaultPath;
    const trimmed = raw.trim();
    if (!trimmed.startsWith('/') ||
        trimmed.startsWith('//') ||
        trimmed.includes('\\') ||
        hasAsciiControlChars(trimmed) ||
        /^\/%5c/i.test(trimmed)) {
        return defaultPath;
    }
    try {
        const base = new URL(baseOrigin);
        const parsed = new URL(trimmed, base.origin);
        if (parsed.origin !== base.origin ||
            !parsed.pathname.startsWith('/') ||
            parsed.pathname.startsWith('//') ||
            parsed.pathname.includes('\\')) {
            return defaultPath;
        }
        return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
    catch {
        return defaultPath;
    }
}
/**
 * Validates that state-mutating requests (`POST`, `PUT`, `PATCH`, `DELETE`)
 * originate from the exact same origin (or an explicit `allowedOrigins` list),
 * blocking cross-site AND sibling-subdomain (`Sec-Fetch-Site: same-site`) CSRF
 * as well as `Origin: null` sandboxed submissions.
 */
export function isCrossOriginMutatingRequest(request, url, options) {
    const method = request.method.toUpperCase();
    if (method !== 'POST' &&
        method !== 'PUT' &&
        method !== 'PATCH' &&
        method !== 'DELETE') {
        return false;
    }
    const allowed = new Set([
        url.origin,
        ...(options?.allowedOrigins ?? []),
    ]);
    const originHeader = request.headers.get('Origin');
    if (originHeader !== null) {
        return !allowed.has(originHeader);
    }
    const secFetchSite = request.headers.get('Sec-Fetch-Site')?.toLowerCase();
    if (secFetchSite === 'cross-site' || secFetchSite === 'same-site') {
        return true;
    }
    const refererHeader = request.headers.get('Referer');
    if (refererHeader !== null) {
        try {
            const refOrigin = new URL(refererHeader).origin;
            return !allowed.has(refOrigin);
        }
        catch {
            return true;
        }
    }
    return false;
}
export function validateSameOriginMutation(request, url, options) {
    return !isCrossOriginMutatingRequest(request, url, options);
}
export function buildCspHeader(options = {}) {
    const directives = [
        "default-src 'self'",
        `script-src ${options.scriptSrc ?? "'self'"}`,
        `style-src ${options.styleSrc ?? "'self' 'unsafe-inline' https://fonts.googleapis.com"}`,
        `font-src ${options.fontSrc ?? "'self' https://fonts.gstatic.com data:"}`,
        `img-src ${options.imgSrc ?? "'self' https: data: blob:"}`,
        `connect-src ${options.connectSrc ?? "'self' https:"}`,
        `worker-src ${options.workerSrc ?? "'self' blob:"}`,
        "manifest-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "frame-ancestors 'none'",
    ];
    if (options.frameSrc) {
        directives.push(`frame-src ${options.frameSrc}`);
    }
    return directives.join('; ');
}
export const DEFAULT_HTML_CSP = buildCspHeader();
export const DEFAULT_PERMISSIONS_POLICY = 'camera=(), microphone=(), geolocation=(), payment=()';
export function withSecurityHeaders(response, htmlCspOrOptions = DEFAULT_HTML_CSP) {
    const opts = typeof htmlCspOrOptions === 'string'
        ? { htmlCsp: htmlCspOrOptions }
        : htmlCspOrOptions;
    const htmlCsp = opts.htmlCsp ?? DEFAULT_HTML_CSP;
    const includeHsts = opts.includeHsts ?? true;
    const headers = new Headers(response.headers);
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'DENY');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    if (!headers.has('Permissions-Policy')) {
        headers.set('Permissions-Policy', DEFAULT_PERMISSIONS_POLICY);
    }
    if (includeHsts && !headers.has('Strict-Transport-Security')) {
        headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    const contentType = headers.get('Content-Type') || '';
    if (contentType.includes('text/html') &&
        !headers.has('Content-Security-Policy')) {
        headers.set('Content-Security-Policy', htmlCsp);
    }
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
    });
}
