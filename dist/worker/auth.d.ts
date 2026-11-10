/**
 * STATELESS SESSION & OIDC RELYING PARTY AUTHENTICATION (@wesdizzle/app-kit/worker)
 *
 * Provides zero-D1-read session verification via HMAC-SHA256 signed cookies,
 * OIDC 1.0 Authorization Code Flow with PKCE (S256), and cached JWKS verification
 * (ES256 with ASN.1 DER -> IEEE P1363 normalization, and RS256).
 */
export declare const SESSION_COOKIE = "__Host-session";
export declare const DEV_SESSION_COOKIE = "dev_session";
export declare const LEGACY_SESSION_COOKIE = "__Host-dex_session";
export declare const OIDC_STATE_COOKIE = "__Host-oidc_state";
export declare const DEV_OIDC_STATE_COOKIE = "dev_oidc_state";
export declare const SESSION_TTL_SECONDS: number;
export declare const OIDC_STATE_TTL_SECONDS: number;
export interface SessionUser {
    id: number;
    username: string;
    role: 'admin' | 'user';
    homeRegion?: string;
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
export declare function base64UrlEncode(bytes: Uint8Array): string;
export declare function base64UrlDecode(str: string): Uint8Array;
export declare function generateRandomBase64Url(byteLength?: number): string;
export declare function computePkceCodeChallenge(verifier: string): Promise<string>;
export declare function timingSafeEqualStrings(a: string, b: string): boolean;
export declare function isLoopbackRequest(request: Request): boolean;
export declare function signSession(user: SessionUser, secret: string, ttlSeconds?: number): Promise<string>;
export declare function verifySession(token: string, secret: string): Promise<SessionUser | null>;
export declare function buildSessionCookie(token: string, request: Request, ttlSeconds?: number): string;
export declare function clearSessionCookies(request: Request, includeLegacyCookie?: boolean): string[];
export declare function extractCookieValue(cookieHeader: string | null, name: string): string | null;
export declare function signOidcStateCookie(payload: Omit<OidcStatePayload, 'exp'>, secret: string, ttlSeconds?: number): Promise<string>;
export declare function verifyOidcStateCookie(token: string, secret: string): Promise<OidcStatePayload | null>;
export declare function buildOidcStateCookie(token: string, request: Request, ttlSeconds?: number): string;
export declare function clearOidcStateCookie(request: Request): string;
/**
 * Converts an ASN.1 DER-encoded ECDSA signature into a 64-byte IEEE P1363
 * (r || s) signature if needed, or returns the original bytes if already P1363.
 */
export declare function derToP1363(sig: Uint8Array, componentLength?: number): Uint8Array;
export declare function resetOidcJwksCache(): void;
export declare function verifyOidcIdToken(options: {
    idToken: string;
    issuer: string;
    clientId: string;
    expectedNonce?: string;
}): Promise<OidcIdTokenClaims>;
/**
 * Validates that state-mutating requests (POST/PUT/DELETE) originate from the
 * same origin, while explicitly exempting `/api/auth/logout` so privacy browsers
 * sending `Origin: null` or upstream front-channel logout requests are never blocked.
 */
export declare function isCrossOriginMutatingRequest(request: Request, url: URL): boolean;
export declare function withSecurityHeaders(response: Response, htmlCsp?: string): Response;
