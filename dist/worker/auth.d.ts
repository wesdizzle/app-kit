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
export declare const SESSION_COOKIE = "app_user_session";
export declare const LEGACY_SESSION_COOKIE = "living_dex_session";
export declare const DEFAULT_SESSION_DAYS = 30;
export declare const SESSION_TTL_SECONDS: number;
export declare const OIDC_STATE_COOKIE = "app_oidc_state";
export declare const LEGACY_OIDC_STATE_COOKIE = "oidc_login_state";
export declare const OIDC_STATE_TTL_SECONDS = 600;
export type UserRole = 'admin' | 'user';
export interface SessionUser {
    id: number;
    username: string;
    role: UserRole;
    homeRegion?: string;
}
export interface OidcStatePayload {
    state: string;
    codeVerifier: string;
    nonce: string;
    redirectUri?: string;
    returnTo?: string;
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
export declare function base64UrlEncode(bytes: Uint8Array): string;
export declare function base64UrlDecode(input: string): Uint8Array;
export declare function timingSafeEqualStrings(a: string, b: string): boolean;
export declare function generateRandomBase64Url(byteLength?: number): string;
export declare const generateRandomToken: typeof generateRandomBase64Url;
export declare function sha256Base64Url(input: string): Promise<string>;
export declare const computePkceCodeChallenge: typeof sha256Base64Url;
export declare const generatePkceChallenge: typeof sha256Base64Url;
export declare function signSession(user: SessionUser, secret: string, days?: number, nowMs?: number): Promise<string>;
export declare function verifySession(token: string | null | undefined, secret: string | undefined, nowMs?: number): Promise<SessionUser | null>;
export declare function signOidcStateCookie(payload: Omit<OidcStatePayload, 'exp'> & {
    exp?: number;
}, secret: string, ttlSeconds?: number, nowMs?: number): Promise<string>;
export declare const signOidcState: typeof signOidcStateCookie;
export declare function verifyOidcStateCookie(token: string | null | undefined, secret: string | undefined, nowMs?: number): Promise<OidcStatePayload | null>;
export declare const verifyOidcState: typeof verifyOidcStateCookie;
/**
 * Converts an ASN.1 DER-encoded ECDSA signature into a 64-byte IEEE P1363
 * (r || s) signature if needed, or returns the original bytes if already P1363.
 */
export declare function derToP1363(sig: Uint8Array, componentLength?: number): Uint8Array;
export declare function resetOidcJwksCache(): void;
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
export declare function verifyOidcIdToken(idToken: string | null | undefined, opts: VerifyOidcIdTokenOptions): Promise<OidcIdTokenClaims | null>;
export declare function parseCookies(header: string | null): Record<string, string>;
export declare function isLoopbackRequest(input: Request | URL): boolean;
/**
 * Validates that state-mutating requests (POST/PUT/DELETE) originate from the
 * same origin, while explicitly exempting `/api/auth/logout` so privacy browsers
 * sending `Origin: null` or upstream front-channel logout requests are never blocked.
 */
export declare function isCrossOriginMutatingRequest(request: Request, url: URL): boolean;
export declare function withSecurityHeaders(response: Response, htmlCsp?: string): Response;
