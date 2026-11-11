import { OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export interface BaseUserProfile {
    id: number;
    email?: string | null;
    username: string;
    role: 'admin' | 'user';
    isPublic: boolean;
    displayName?: string | null;
    bio?: string | null;
    createdAt?: string;
    homeRegion?: string;
}
export interface AuthMeResponse<TUser extends BaseUserProfile = BaseUserProfile> {
    authenticated: boolean;
    provisioned?: boolean;
    email?: string | null;
    unprovisionedEmail?: string | null;
    accountHubUrl?: string | null;
    oidcIssuer?: string | null;
    oidcClientId?: string | null;
    user: TUser | null;
}
export interface UpstreamOidcStatusResult {
    reachable: boolean;
    authenticated: boolean;
    authorized: boolean;
    cookiePresent?: boolean;
    user: {
        id?: number;
        username?: string;
        displayName?: string | null;
        role?: 'admin' | 'user';
    } | null;
}
export declare function sanitizeClientReturnToPath(raw: string | null | undefined, defaultPath?: string): string;
export declare function consumeSilentSsoCallbackParam(clientId?: string | null): boolean;
export declare function shouldAttemptSilentSso(clientId?: string | null): boolean;
export declare function markSilentSsoAttempt(clientId?: string | null): void;
export declare function clearSilentSsoAttempt(clientId?: string | null): void;
export declare function getCurrentReturnToPath(defaultPath?: string): string;
/**
 * Queries the OIDC Account Server's `/api/auth/status` endpoint with credentials
 * to check if an upstream identity session is active and authorized for `oidcClientId`.
 */
export declare function checkUpstreamOidcStatus(oidcIssuer: string, oidcClientId?: string | null): Promise<UpstreamOidcStatusResult>;
export declare class KitAuthService<TUser extends BaseUserProfile = BaseUserProfile> implements OnDestroy {
    readonly currentUser: import("@angular/core").WritableSignal<TUser | null>;
    readonly authInitialized: import("@angular/core").WritableSignal<boolean>;
    readonly isAutoSigningIn: import("@angular/core").WritableSignal<boolean>;
    readonly isProvisioned: import("@angular/core").WritableSignal<boolean>;
    readonly unprovisionedEmail: import("@angular/core").WritableSignal<string | null>;
    readonly accountHubUrl: import("@angular/core").WritableSignal<string | null>;
    readonly oidcIssuer: import("@angular/core").WritableSignal<string | null>;
    readonly oidcClientId: import("@angular/core").WritableSignal<string | null>;
    readonly isLoading: import("@angular/core").Signal<boolean>;
    readonly isAuthenticated: import("@angular/core").Signal<boolean>;
    readonly isAdmin: import("@angular/core").Signal<boolean>;
    readonly userEmail: import("@angular/core").Signal<string | null>;
    readonly username: import("@angular/core").Signal<string | null>;
    readonly displayName: import("@angular/core").Signal<string | null>;
    readonly bio: import("@angular/core").Signal<string | null>;
    readonly isPublic: import("@angular/core").Signal<boolean>;
    private authLoadPromise;
    private lastUpstreamCheckMs;
    private sessionEpoch;
    private readonly cleanupCallbacks;
    constructor();
    ngOnDestroy(): void;
    private registerUpstreamSessionLifecycleListeners;
    ensureAuthLoaded(): Promise<void>;
    checkSession(): Promise<void>;
    protected canAutoSignIn(): boolean;
    protected trySilentAutoSignIn(): Promise<boolean>;
    /**
     * Verifies with the central OIDC Account Server (`/api/auth/status`) that the
     * user's upstream session is still active, authorized for this client, and
     * belongs to the same account.
     */
    verifyUpstreamOidcSession(): Promise<void>;
    getLoginUrl(returnTo?: string, options?: {
        prompt?: 'none' | 'login' | 'select_account';
    }): string;
    protected redirectTo(url: string): void;
    updateProfile(patch: {
        displayName?: string | null;
        bio?: string | null;
        isPublic?: boolean;
        homeRegion?: string;
    }): Promise<TUser>;
    logout(): Promise<void>;
    getLogoutRedirectUrl(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitAuthService<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<KitAuthService<any>>;
}
