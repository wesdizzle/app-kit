import { Injectable, signal, computed } from '@angular/core';
import * as i0 from "@angular/core";
export class KitAuthService {
    constructor() {
        this.currentUser = signal(null, ...(ngDevMode ? [{ debugName: "currentUser" }] : /* istanbul ignore next */ []));
        this.authInitialized = signal(false, ...(ngDevMode ? [{ debugName: "authInitialized" }] : /* istanbul ignore next */ []));
        this.unprovisionedEmail = signal(null, ...(ngDevMode ? [{ debugName: "unprovisionedEmail" }] : /* istanbul ignore next */ []));
        this.accountHubUrl = signal(null, ...(ngDevMode ? [{ debugName: "accountHubUrl" }] : /* istanbul ignore next */ []));
        this.oidcIssuer = signal(null, ...(ngDevMode ? [{ debugName: "oidcIssuer" }] : /* istanbul ignore next */ []));
        this.isAuthenticated = computed(() => this.currentUser() !== null, ...(ngDevMode ? [{ debugName: "isAuthenticated" }] : /* istanbul ignore next */ []));
        this.isAdmin = computed(() => this.currentUser()?.role === 'admin', ...(ngDevMode ? [{ debugName: "isAdmin" }] : /* istanbul ignore next */ []));
        this.isProvisioned = computed(() => this.currentUser() !== null || this.unprovisionedEmail() === null, ...(ngDevMode ? [{ debugName: "isProvisioned" }] : /* istanbul ignore next */ []));
        this.userEmail = computed(() => this.currentUser()?.email ?? null, ...(ngDevMode ? [{ debugName: "userEmail" }] : /* istanbul ignore next */ []));
        this.username = computed(() => this.currentUser()?.username ?? null, ...(ngDevMode ? [{ debugName: "username" }] : /* istanbul ignore next */ []));
        this.displayName = computed(() => this.currentUser()?.displayName || this.currentUser()?.username || null, ...(ngDevMode ? [{ debugName: "displayName" }] : /* istanbul ignore next */ []));
        this.bio = computed(() => this.currentUser()?.bio ?? null, ...(ngDevMode ? [{ debugName: "bio" }] : /* istanbul ignore next */ []));
        this.isPublic = computed(() => this.currentUser()?.isPublic ?? true, ...(ngDevMode ? [{ debugName: "isPublic" }] : /* istanbul ignore next */ []));
        this.authLoadPromise = null;
        this.lastUpstreamCheckMs = 0;
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
            this.lastUpstreamCheckMs = now;
            void this.verifyUpstreamOidcSession();
        };
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                triggerCheck();
            }
        });
        window.addEventListener('focus', () => {
            triggerCheck();
        });
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                triggerCheck();
            }
        });
    }
    async ensureAuthLoaded() {
        if (this.authInitialized())
            return;
        if (!this.authLoadPromise) {
            this.authLoadPromise = this.checkSession();
        }
        return this.authLoadPromise;
    }
    async checkSession() {
        try {
            const response = await fetch('/api/auth/me', {
                credentials: 'same-origin',
                cache: 'no-store',
                headers: {
                    Accept: 'application/json',
                    'Cache-Control': 'no-cache',
                },
            });
            if (!response.ok) {
                this.currentUser.set(null);
                return;
            }
            const data = (await response.json());
            if (data.accountHubUrl) {
                this.accountHubUrl.set(data.accountHubUrl);
            }
            if (data.oidcIssuer) {
                this.oidcIssuer.set(data.oidcIssuer);
            }
            if (data.authenticated && data.user) {
                this.currentUser.set({
                    ...data.user,
                    username: data.user.username || 'trainer',
                    isPublic: data.user.isPublic ?? true,
                    displayName: data.user.displayName ?? null,
                    bio: data.user.bio ?? null,
                });
                this.unprovisionedEmail.set(null);
                await this.verifyUpstreamOidcSession();
            }
            else {
                this.currentUser.set(null);
                this.unprovisionedEmail.set(data.unprovisionedEmail ?? null);
            }
        }
        catch {
            this.currentUser.set(null);
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
                });
                this.currentUser.set(null);
                return;
            }
            if ((status.user.username &&
                localUser.username &&
                status.user.username.toLowerCase() !==
                    localUser.username.toLowerCase()) ||
                (status.user.role && status.user.role !== localUser.role)) {
                if (typeof window !== 'undefined') {
                    window.location.assign('/api/auth/login');
                }
            }
        }
        catch {
            // Network or CORS unavailable (e.g., offline mode); preserve local session
        }
    }
    async updateProfile(patch) {
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
            throw new Error(errBody.error || 'Failed to update profile');
        }
        const data = (await response.json());
        this.currentUser.set(data.user);
        return data.user;
    }
    async logout() {
        try {
            await fetch('/api/auth/logout?silent=1', {
                method: 'POST',
                credentials: 'same-origin',
                cache: 'no-store',
            });
        }
        finally {
            this.currentUser.set(null);
        }
    }
    getLogoutRedirectUrl() {
        return '/api/auth/logout';
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
