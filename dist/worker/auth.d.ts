/**
 * STATELESS SESSION & OIDC RELYING PARTY AUTHENTICATION (@wesdizzle/app-kit/worker)
 *
 * Unifies stateless session verification, OIDC 1.0 Authorization Code + PKCE (`S256`),
 * `__Host-` cookie management (with rolling legacy cookie fallback), strict URL
 * `return_to` validation, Fetch Metadata + Origin CSRF protection, and CSP/HSTS
 * security headers.
 */
import { base64UrlDecode, base64UrlEncode, computePkceCodeChallenge, derToP1363, generatePkceChallenge, generateRandomBase64Url, generateRandomBytes, generateRandomToken, hmacSha256Bytes, hmacSha256Hex, resolveStrongSecret, sha256Base64Url, sha256Bytes, sha256Hex, timingSafeEqualBytes, timingSafeEqualStrings } from './crypto.js';
export { base64UrlDecode, base64UrlEncode, computePkceCodeChallenge, derToP1363, generatePkceChallenge, generateRandomBase64Url, generateRandomBytes, generateRandomToken, hmacSha256Bytes, hmacSha256Hex, resolveStrongSecret, sha256Base64Url, sha256Bytes, sha256Hex, timingSafeEqualBytes, timingSafeEqualStrings, };
export declare const HOST_SESSION_COOKIE = "__Host-app_user_session";
export declare const SESSION_COOKIE = "app_user_session";
export declare const LEGACY_SESSION_COOKIE = "living_dex_session";
export declare const DEFAULT_SESSION_DAYS = 30;
export declare const SESSION_TTL_SECONDS: number;
export declare const HOST_OIDC_STATE_COOKIE = "__Host-app_oidc_state";
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
    token_use?: string;
    preferred_username?: string;
    name?: string | null;
    email?: string | null;
    email_verified?: boolean;
    role?: UserRole;
}
export declare function signSession(user: SessionUser, secret: string, days?: number, nowMs?: number): Promise<string>;
export declare function verifySession(token: string | null | undefined, secret: string | undefined, nowMs?: number): Promise<SessionUser | null>;
export declare function signOidcStateCookie(payload: Omit<OidcStatePayload, 'exp'> & {
    exp?: number;
}, secret: string, ttlSeconds?: number, nowMs?: number): Promise<string>;
export declare const signOidcState: typeof signOidcStateCookie;
export declare function verifyOidcStateCookie(token: string | null | undefined, secret: string | undefined, nowMs?: number): Promise<OidcStatePayload | null>;
export declare const verifyOidcState: typeof verifyOidcStateCookie;
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
 * provider's `.well-known/jwks.json` endpoint and validates standard OIDC claims,
 * explicitly rejecting OAuth2 `at+jwt` / `token_use: "access"` tokens.
 */
export declare function verifyOidcIdToken(idToken: string | null | undefined, opts: VerifyOidcIdTokenOptions): Promise<OidcIdTokenClaims | null>;
export declare function parseCookies(header: string | null): Record<string, string>;
export declare function isLoopbackRequest(input: Request | URL): boolean;
export declare function isSecureOrigin(input: Request | URL): boolean;
export declare function getSessionCookieName(secure: boolean): string;
export declare function getOidcStateCookieName(secure: boolean): string;
export declare function readSessionCookie(cookies: Record<string, string>): string | null;
export declare function readOidcStateCookie(cookies: Record<string, string>): string | null;
export declare function serializeSessionCookie(token: string, secure: boolean, maxAgeSeconds?: number): string;
export declare function serializeClearSessionCookies(secure: boolean): string[];
export declare function serializeOidcStateCookie(token: string, secure: boolean, maxAgeSeconds?: number): string;
export declare function serializeClearOidcStateCookies(secure: boolean): string[];
/**
 * Strictly validates an internal post-login `return_to` path against open-redirect
 * vectors, including WHATWG URL backslash authority normalization (`/\evil.com`),
 * protocol-relative paths (`//evil.com`), and ASCII control characters.
 */
export declare function sanitizeReturnToPath(raw: string | null | undefined, baseOrigin?: string, defaultPath?: string): string;
export interface SameOriginMutationOptions {
    allowedOrigins?: readonly string[];
}
/**
 * Validates that state-mutating requests (`POST`, `PUT`, `PATCH`, `DELETE`)
 * originate from the exact same origin (or an explicit `allowedOrigins` list),
 * blocking cross-site AND sibling-subdomain (`Sec-Fetch-Site: same-site`) CSRF
 * as well as `Origin: null` sandboxed submissions.
 */
export declare function isCrossOriginMutatingRequest(request: Request, url: URL, options?: SameOriginMutationOptions): boolean;
export declare function validateSameOriginMutation(request: Request, url: URL, options?: SameOriginMutationOptions): boolean;
export interface CspOptions {
    scriptSrc?: string;
    styleSrc?: string;
    fontSrc?: string;
    imgSrc?: string;
    connectSrc?: string;
    frameSrc?: string;
    workerSrc?: string;
}
export declare function buildCspHeader(options?: CspOptions): string;
export declare const DEFAULT_HTML_CSP: string;
export declare const DEFAULT_PERMISSIONS_POLICY = "camera=(), microphone=(), geolocation=(), payment=()";
export interface SecurityHeadersOptions {
    htmlCsp?: string;
    includeHsts?: boolean;
}
export declare function withSecurityHeaders(response: Response, htmlCspOrOptions?: string | SecurityHeadersOptions): Response;
