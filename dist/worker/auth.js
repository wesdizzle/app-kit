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
export function base64UrlEncode(bytes) {
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}
export function base64UrlDecode(str) {
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
export function generateRandomBase64Url(byteLength = 32) {
    const bytes = new Uint8Array(byteLength);
    crypto.getRandomValues(bytes);
    return base64UrlEncode(bytes);
}
export async function computePkceCodeChallenge(verifier) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
    return base64UrlEncode(new Uint8Array(digest));
}
export function timingSafeEqualStrings(a, b) {
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
export function isLoopbackRequest(request) {
    try {
        const url = new URL(request.url);
        return url.hostname === 'localhost' || url.hostname === '127.0.0.1';
    }
    catch {
        return false;
    }
}
async function importHmacKey(secret) {
    return crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}
export async function signSession(user, secret, ttlSeconds = SESSION_TTL_SECONDS) {
    const payload = {
        uid: user.id,
        usr: user.username,
        rol: user.role,
        ...(user.homeRegion ? { hr: user.homeRegion } : {}),
        exp: Math.floor(Date.now() / 1000) + ttlSeconds,
    };
    const payloadB64 = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));
    const key = await importHmacKey(secret);
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadB64));
    return `${payloadB64}.${base64UrlEncode(new Uint8Array(sig))}`;
}
export async function verifySession(token, secret) {
    try {
        const dotIdx = token.indexOf('.');
        if (dotIdx <= 0 || dotIdx !== token.lastIndexOf('.'))
            return null;
        const payloadB64 = token.slice(0, dotIdx);
        const sigB64 = token.slice(dotIdx + 1);
        if (!payloadB64 || !sigB64)
            return null;
        const key = await importHmacKey(secret);
        const sigBytes = base64UrlDecode(sigB64);
        const valid = await crypto.subtle.verify('HMAC', key, sigBytes.buffer, new TextEncoder().encode(payloadB64));
        if (!valid)
            return null;
        const rawJson = new TextDecoder().decode(base64UrlDecode(payloadB64));
        const parsed = JSON.parse(rawJson);
        if (typeof parsed.uid !== 'number' ||
            typeof parsed.usr !== 'string' ||
            (parsed.rol !== 'admin' && parsed.rol !== 'user') ||
            typeof parsed.exp !== 'number') {
            return null;
        }
        if (parsed.exp <= Math.floor(Date.now() / 1000)) {
            return null;
        }
        const sessionUser = {
            id: parsed.uid,
            username: parsed.usr,
            role: parsed.rol,
        };
        if (typeof parsed.hr === 'string' && parsed.hr) {
            sessionUser.homeRegion = parsed.hr;
        }
        return sessionUser;
    }
    catch {
        return null;
    }
}
export function buildSessionCookie(token, request, ttlSeconds = SESSION_TTL_SECONDS) {
    const isDev = isLoopbackRequest(request);
    const cookieName = isDev ? DEV_SESSION_COOKIE : SESSION_COOKIE;
    const secureAttr = isDev ? '' : ' Secure;';
    return `${cookieName}=${token}; HttpOnly;${secureAttr} SameSite=Lax; Path=/; Max-Age=${ttlSeconds}`;
}
export function clearSessionCookies(request, includeLegacyCookie = true) {
    const isDev = isLoopbackRequest(request);
    if (isDev) {
        return [`${DEV_SESSION_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`];
    }
    const cookies = [
        `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`,
    ];
    if (includeLegacyCookie) {
        cookies.push(`${LEGACY_SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`);
    }
    return cookies;
}
export function extractCookieValue(cookieHeader, name) {
    if (!cookieHeader)
        return null;
    const parts = cookieHeader.split(';');
    for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.startsWith(`${name}=`)) {
            return trimmed.slice(name.length + 1);
        }
    }
    return null;
}
export async function signOidcStateCookie(payload, secret, ttlSeconds = OIDC_STATE_TTL_SECONDS) {
    const fullPayload = {
        ...payload,
        exp: Math.floor(Date.now() / 1000) + ttlSeconds,
    };
    const payloadB64 = base64UrlEncode(new TextEncoder().encode(JSON.stringify(fullPayload)));
    const key = await importHmacKey(`oidc_state:${secret}`);
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadB64));
    return `${payloadB64}.${base64UrlEncode(new Uint8Array(sig))}`;
}
export async function verifyOidcStateCookie(token, secret) {
    try {
        const dotIdx = token.indexOf('.');
        if (dotIdx <= 0 || dotIdx !== token.lastIndexOf('.'))
            return null;
        const payloadB64 = token.slice(0, dotIdx);
        const sigB64 = token.slice(dotIdx + 1);
        if (!payloadB64 || !sigB64)
            return null;
        const key = await importHmacKey(`oidc_state:${secret}`);
        const sigBytes = base64UrlDecode(sigB64);
        const valid = await crypto.subtle.verify('HMAC', key, sigBytes.buffer, new TextEncoder().encode(payloadB64));
        if (!valid)
            return null;
        const rawJson = new TextDecoder().decode(base64UrlDecode(payloadB64));
        const parsed = JSON.parse(rawJson);
        if (typeof parsed.state !== 'string' ||
            typeof parsed.codeVerifier !== 'string' ||
            typeof parsed.nonce !== 'string' ||
            typeof parsed.exp !== 'number') {
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
    }
    catch {
        return null;
    }
}
export function buildOidcStateCookie(token, request, ttlSeconds = OIDC_STATE_TTL_SECONDS) {
    const isDev = isLoopbackRequest(request);
    const cookieName = isDev ? DEV_OIDC_STATE_COOKIE : OIDC_STATE_COOKIE;
    const secureAttr = isDev ? '' : ' Secure;';
    return `${cookieName}=${token}; HttpOnly;${secureAttr} SameSite=Lax; Path=/; Max-Age=${ttlSeconds}`;
}
export function clearOidcStateCookie(request) {
    const isDev = isLoopbackRequest(request);
    const cookieName = isDev ? DEV_OIDC_STATE_COOKIE : OIDC_STATE_COOKIE;
    const secureAttr = isDev ? '' : ' Secure;';
    return `${cookieName}=; HttpOnly;${secureAttr} SameSite=Lax; Path=/; Max-Age=0`;
}
/**
 * Converts an ASN.1 DER-encoded ECDSA signature into a 64-byte IEEE P1363
 * (r || s) signature if needed, or returns the original bytes if already P1363.
 */
export function derToP1363(sig, componentLength = 32) {
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
        if (nBytes === 0 || nBytes > 2 || offset + nBytes > sig.length)
            return sig;
        seqLen = 0;
        for (let i = 0; i < nBytes; i++) {
            seqLen = (seqLen << 8) | sig[offset++];
        }
    }
    if (sig[offset++] !== 0x02)
        return sig;
    const rLen = sig[offset++];
    if (offset + rLen > sig.length)
        return sig;
    const rBytes = sig.subarray(offset, offset + rLen);
    offset += rLen;
    if (sig[offset++] !== 0x02)
        return sig;
    const sLen = sig[offset++];
    if (offset + sLen > sig.length)
        return sig;
    const sBytes = sig.subarray(offset, offset + sLen);
    const out = new Uint8Array(componentLength * 2);
    const copyInt = (src, destOffset) => {
        let trimmed = src;
        while (trimmed.length > componentLength && trimmed[0] === 0x00) {
            trimmed = trimmed.subarray(1);
        }
        if (trimmed.length > componentLength)
            return false;
        out.set(trimmed, destOffset + (componentLength - trimmed.length));
        return true;
    };
    if (!copyInt(rBytes, 0) || !copyInt(sBytes, componentLength)) {
        return sig;
    }
    return out;
}
const jwksCacheByIssuer = new Map();
const JWKS_TTL_MS = 60 * 60 * 1000; // 1 hour
const JWKS_REFETCH_COOLDOWN_MS = 60 * 1000; // 60 seconds cooldown on unknown kid
export function resetOidcJwksCache() {
    jwksCacheByIssuer.clear();
}
async function fetchAndCacheJwks(issuer, existing) {
    const now = Date.now();
    const jwksUrl = `${issuer.replace(/\/+$/, '')}/.well-known/jwks.json`;
    const response = await fetch(jwksUrl, {
        headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch JWKS (${response.status})`);
    }
    const body = (await response.json());
    const keyMap = new Map();
    for (const jwk of body.keys ?? []) {
        if (jwk.use && jwk.use !== 'sig')
            continue;
        if (jwk.kty === 'EC' && (!jwk.crv || jwk.crv === 'P-256')) {
            const cryptoKey = await crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
            const kid = jwk.kid ?? '__default_ES256';
            keyMap.set(kid, { key: cryptoKey, alg: 'ES256' });
        }
        else if (jwk.kty === 'RSA') {
            const cryptoKey = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
            const kid = jwk.kid ?? '__default_RS256';
            keyMap.set(kid, { key: cryptoKey, alg: 'RS256' });
        }
    }
    const entry = {
        keys: keyMap,
        fetchedAtMs: now,
        lastRefetchAttemptMs: existing?.lastRefetchAttemptMs ?? now,
    };
    jwksCacheByIssuer.set(issuer, entry);
    return entry;
}
async function resolveSigningKey(issuer, kid, alg) {
    const now = Date.now();
    let cached = jwksCacheByIssuer.get(issuer);
    if (!cached || now - cached.fetchedAtMs > JWKS_TTL_MS) {
        cached = await fetchAndCacheJwks(issuer, cached);
    }
    const lookup = (c) => {
        if (kid && c.keys.has(kid))
            return c.keys.get(kid);
        const fallbackId = alg === 'ES256' ? '__default_ES256' : '__default_RS256';
        if (!kid && c.keys.has(fallbackId))
            return c.keys.get(fallbackId);
        if (!kid && c.keys.size === 1)
            return Array.from(c.keys.values())[0];
        return undefined;
    };
    let found = lookup(cached);
    if (found)
        return found;
    if (now - cached.lastRefetchAttemptMs >= JWKS_REFETCH_COOLDOWN_MS) {
        cached.lastRefetchAttemptMs = now;
        cached = await fetchAndCacheJwks(issuer, cached);
        found = lookup(cached);
    }
    return found ?? null;
}
export async function verifyOidcIdToken(options) {
    const parts = options.idToken.split('.');
    if (parts.length !== 3) {
        throw new Error('Malformed ID token');
    }
    const [headerB64, payloadB64, sigB64] = parts;
    const header = JSON.parse(new TextDecoder().decode(base64UrlDecode(headerB64)));
    if (header.alg !== 'ES256' && header.alg !== 'RS256') {
        throw new Error(`Unsupported ID token alg: ${header.alg ?? 'none'}`);
    }
    const keyEntry = await resolveSigningKey(options.issuer, header.kid, header.alg);
    if (!keyEntry || keyEntry.alg !== header.alg) {
        throw new Error('No matching JWK found for ID token');
    }
    const signingInput = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
    const rawSignature = base64UrlDecode(sigB64);
    let verified = false;
    if (header.alg === 'ES256') {
        const p1363Sig = derToP1363(rawSignature, 32);
        verified = await crypto.subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, keyEntry.key, p1363Sig.buffer.slice(p1363Sig.byteOffset, p1363Sig.byteOffset + p1363Sig.byteLength), signingInput);
    }
    else {
        verified = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', keyEntry.key, rawSignature.buffer.slice(rawSignature.byteOffset, rawSignature.byteOffset + rawSignature.byteLength), signingInput);
    }
    if (!verified) {
        throw new Error('Invalid ID token signature');
    }
    const claims = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadB64)));
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
export function isCrossOriginMutatingRequest(request, url) {
    if (request.method !== 'POST' &&
        request.method !== 'PUT' &&
        request.method !== 'DELETE') {
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
export function withSecurityHeaders(response, htmlCsp = DEFAULT_HTML_CSP) {
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
