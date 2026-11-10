import * as i0 from "@angular/core";
export interface BaseUserProfile {
    id: number;
    email: string;
    username: string;
    role: 'admin' | 'user';
    isPublic: boolean;
    displayName: string | null;
    bio: string | null;
    createdAt?: string;
    homeRegion?: string;
}
export interface AuthMeResponse<TUser extends BaseUserProfile = BaseUserProfile> {
    authenticated: boolean;
    provisioned?: boolean;
    unprovisionedEmail?: string | null;
    accountHubUrl?: string | null;
    oidcIssuer?: string | null;
    user: TUser | null;
}
export declare class KitAuthService<TUser extends BaseUserProfile = BaseUserProfile> {
    readonly currentUser: import("@angular/core").WritableSignal<TUser | null>;
    readonly authInitialized: import("@angular/core").WritableSignal<boolean>;
    readonly unprovisionedEmail: import("@angular/core").WritableSignal<string | null>;
    readonly accountHubUrl: import("@angular/core").WritableSignal<string | null>;
    readonly oidcIssuer: import("@angular/core").WritableSignal<string | null>;
    readonly isAuthenticated: import("@angular/core").Signal<boolean>;
    readonly isAdmin: import("@angular/core").Signal<boolean>;
    readonly isProvisioned: import("@angular/core").Signal<boolean>;
    readonly userEmail: import("@angular/core").Signal<string | null>;
    readonly username: import("@angular/core").Signal<string | null>;
    readonly displayName: import("@angular/core").Signal<string | null>;
    readonly bio: import("@angular/core").Signal<string | null>;
    readonly isPublic: import("@angular/core").Signal<boolean>;
    private authLoadPromise;
    private lastUpstreamCheckMs;
    constructor();
    private registerUpstreamSessionLifecycleListeners;
    ensureAuthLoaded(): Promise<void>;
    checkSession(): Promise<void>;
    /**
     * Verifies with the central OIDC Account Server (`/api/auth/status`) that the
     * user's upstream session is still active and belongs to the same account.
     */
    verifyUpstreamOidcSession(): Promise<void>;
    updateProfile(patch: {
        displayName?: string;
        bio?: string;
        isPublic?: boolean;
        homeRegion?: string;
    }): Promise<TUser>;
    logout(): Promise<void>;
    getLogoutRedirectUrl(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitAuthService<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<KitAuthService<any>>;
}
