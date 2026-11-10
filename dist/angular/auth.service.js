import { Injectable, signal, computed } from '@angular/core';
import * as i0 from "@angular/core";
export class KitAuthService {
    constructor() {
        this.currentUser = signal(null, ...(ngDevMode ? [{ debugName: "currentUser" }] : /* istanbul ignore next */ []));
        this.authInitialized = signal(false, ...(ngDevMode ? [{ debugName: "authInitialized" }] : /* istanbul ignore next */ []));
        this.isProvisioned = signal(true, ...(ngDevMode ? [{ debugName: "isProvisioned" }] : /* istanbul ignore next */ []));
        this.unprovisionedEmail = signal(null, ...(ngDevMode ? [{ debugName: "unprovisionedEmail" }] : /* istanbul ignore next */ []));
        this.accountHubUrl = signal(null, ...(ngDevMode ? [{ debugName: "accountHubUrl" }] : /* istanbul ignore next */ []));
        this.oidcIssuer = signal(null, ...(ngDevMode ? [{ debugName: "oidcIssuer" }] : /* istanbul ignore next */ []));
        this.isAuthenticated = computed(() => this.currentUser() !== null, ...(ngDevMode ? [{ debugName: "isAuthenticated" }] : /* istanbul ignore next */ []));
        this.isAdmin = computed(() => this.currentUser()?.role === 'admin', ...(ngDevMode ? [{ debugName: "isAdmin" }] : /* istanbul ignore next */ []));
        this.userEmail = computed(() => this.currentUser()?.email ?? null, ...(ngDevMode ? [{ debugName: "userEmail" }] : /* istanbul ignore next */ []));
        this.username = computed(() => this.currentUser()?.username ?? null, ...(ngDevMode ? [{ debugName: "username" }] : /* istanbul ignore next */ []));
        this.displayName = computed(() => this.currentUser()?.displayName || this.currentUser()?.username || null, ...(ngDevMode ? [{ debugName: "displayName" }] : /* istanbul ignore next */ []));
        this.bio = computed(() => this.currentUser()?.bio ?? null, ...(ngDevMode ? [{ debugName: "bio" }] : /* istanbul ignore next */ []));
        this.isPublic = computed(() => this.currentUser()?.isPublic ?? true, ...(ngDevMode ? [{ debugName: "isPublic" }] : /* istanbul ignore next */ []));
        this.authLoadPromise = null;
        this.lastUpstreamCheckMs = 0;
        this.sessionEpoch = 0;
        this.authLoadPromise = this.checkSession();
        this.registerUpstreamSessionLifecycleListeners();
    }
    registerUpstreamSessionLifecycleListeners() {
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return;
        }
        const triggerCheck = () => {
            const now = Date.now();
            if (now - this.lastUpstreamCheckMs < 2000)
                return;
            void this.checkSession();
        };
        if (typeof document.addEventListener === 'function') {
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') {
                    triggerCheck();
                }
            });
        }
        if (typeof window.addEventListener === 'function') {
            window.addEventListener('focus', () => {
                triggerCheck();
            });
            window.addEventListener('pageshow', (event) => {
                if (event.persisted) {
                    triggerCheck();
                }
            });
        }
    }
    async ensureAuthLoaded() {
        if (this.authInitialized())
            return;
        if (!this.authLoadPromise) {
            this.authLoadPromise = this.checkSession();
        }
        await this.authLoadPromise;
    }
    async checkSession() {
        this.lastUpstreamCheckMs = Date.now();
        const epoch = ++this.sessionEpoch;
        try {
            const response = await fetch('/api/auth/me', {
                credentials: 'same-origin',
                cache: 'no-store',
                headers: {
                    Accept: 'application/json',
                    'Cache-Control': 'no-cache',
                },
            });
            if (epoch !== this.sessionEpoch)
                return;
            if (!response.ok) {
                this.currentUser.set(null);
                return;
            }
            const data = (await response.json());
            if (epoch !== this.sessionEpoch)
                return;
            if (typeof data.accountHubUrl === 'string' && data.accountHubUrl) {
                this.accountHubUrl.set(data.accountHubUrl);
            }
            else {
                this.accountHubUrl.set(null);
            }
            if (typeof data.oidcIssuer === 'string' && data.oidcIssuer) {
                this.oidcIssuer.set(data.oidcIssuer);
            }
            else {
                this.oidcIssuer.set(null);
            }
            if (data.authenticated && data.user) {
                const u = data.user;
                const fallbackUsername = u.username ||
                    (u.email ? u.email.split('@')[0] : 'trainer') ||
                    'trainer';
                this.currentUser.set({
                    ...u,
                    id: typeof u.id === 'number' ? u.id : 1,
                    email: u.email ?? null,
                    username: fallbackUsername,
                    role: u.role === 'user' ? 'user' : 'admin',
                    isPublic: typeof u.isPublic === 'boolean' ? u.isPublic : true,
                    displayName: u.displayName ?? fallbackUsername,
                    bio: u.bio ?? null,
                });
                this.isProvisioned.set(true);
                this.unprovisionedEmail.set(null);
                await this.verifyUpstreamOidcSession();
            }
            else {
                this.currentUser.set(null);
                if (data.provisioned === false) {
                    this.isProvisioned.set(false);
                    this.unprovisionedEmail.set(data.unprovisionedEmail ?? data.email ?? null);
                }
                else {
                    this.isProvisioned.set(true);
                    this.unprovisionedEmail.set(data.unprovisionedEmail ?? null);
                }
            }
        }
        catch {
            if (epoch === this.sessionEpoch) {
                this.currentUser.set(null);
            }
        }
        finally {
            this.authInitialized.set(true);
        }
    }
    /**
     * Verifies with the central OIDC Account Server (`/api/auth/status`) that the
     * user's upstream session is still active and belongs to the same account.
     */
    async verifyUpstreamOidcSession() {
        const issuer = this.oidcIssuer();
        const localUser = this.currentUser();
        if (!issuer || !localUser)
            return;
        try {
            const statusUrl = `${issuer.replace(/\/+$/, '')}/api/auth/status`;
            const res = await fetch(statusUrl, {
                method: 'GET',
                credentials: 'include',
                cache: 'no-store',
                headers: { Accept: 'application/json' },
            });
            if (!res.ok)
                return;
            const status = (await res.json());
            if (!status.authenticated || !status.user) {
                await fetch('/api/auth/logout?silent=1', {
                    method: 'GET',
                    credentials: 'same-origin',
                    cache: 'no-store',
                }).catch(() => null);
                this.currentUser.set(null);
                return;
            }
            if ((status.user.username &&
                localUser.username &&
                status.user.username.toLowerCase() !==
                    localUser.username.toLowerCase()) ||
                (status.user.role && status.user.role !== localUser.role)) {
                if (typeof window !== 'undefined' && window.location) {
                    window.location.assign('/api/auth/login');
                }
            }
        }
        catch {
            // Network or CORS unavailable (e.g., offline mode); preserve local session
        }
    }
    async updateProfile(patch) {
        this.sessionEpoch++;
        const response = await fetch('/api/user/profile', {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(patch),
        });
        if (!response.ok) {
            const errBody = (await response.json().catch(() => ({})));
            throw new Error(errBody.error || `Failed to save profile (${response.status})`);
        }
        const data = (await response.json());
        if (data?.user) {
            this.currentUser.set(data.user);
        }
        return data.user;
    }
    async logout() {
        this.sessionEpoch++;
        try {
            await fetch('/api/auth/logout?silent=1', {
                method: 'POST',
                credentials: 'same-origin',
                cache: 'no-store',
            });
        }
        catch {
            // Ignore network errors on logout
        }
        finally {
            this.currentUser.set(null);
        }
    }
    getLogoutRedirectUrl() {
        const issuer = this.oidcIssuer();
        if (issuer && typeof window !== 'undefined' && window.location?.origin) {
            return `${issuer.replace(/\/+$/, '')}/logout?post_logout_redirect_uri=${encodeURIComponent(window.location.origin + '/')}`;
        }
        return '/';
    }
    static { this.ɵfac = function KitAuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitAuthService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: KitAuthService, factory: KitAuthService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitAuthService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [], null); })();
