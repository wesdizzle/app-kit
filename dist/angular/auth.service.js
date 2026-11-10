import { Injectable, signal, computed } from '@angular/core';
import * as i0 from "@angular/core";
const SSO_ATTEMPT_KEY_PREFIX = 'kit_sso_attempt_';
const SSO_ATTEMPT_COOLDOWN_MS = 4_000;
const ssoCheckedInMemory = new Set();
function getSsoAttemptStorageKey(clientId) {
    return `${SSO_ATTEMPT_KEY_PREFIX}${clientId || 'default'}`;
}
export function consumeSilentSsoCallbackParam(clientId) {
    if (typeof window === 'undefined' || !window.location) {
        return false;
    }
    const search = window.location.search || '';
    if (!search.includes('sso=checked') && !search.includes('sso=none')) {
        return false;
    }
    markSilentSsoAttempt(clientId);
    try {
        const url = new URL(window.location.href);
        url.searchParams.delete('sso');
        const cleanUrl = url.pathname +
            (url.search ? url.search : '') +
            (url.hash ? url.hash : '');
        if (typeof window.history !== 'undefined' &&
            typeof window.history.replaceState === 'function') {
            window.history.replaceState(window.history.state, '', cleanUrl);
        }
    }
    catch {
        // Ignore URL/history cleanup errors
    }
    return true;
}
export function shouldAttemptSilentSso(clientId) {
    if (consumeSilentSsoCallbackParam(clientId)) {
        return false;
    }
    if (typeof window !== 'undefined' && window.location) {
        const search = window.location.search || '';
        if (search.includes('account=missing') ||
            search.includes('auth_error=')) {
            return false;
        }
    }
    const key = getSsoAttemptStorageKey(clientId);
    if (ssoCheckedInMemory.has(key)) {
        return false;
    }
    if (typeof sessionStorage !== 'undefined') {
        try {
            const raw = sessionStorage.getItem(key);
            if (raw) {
                const ts = Number(raw);
                if (!Number.isNaN(ts) && Date.now() - ts < SSO_ATTEMPT_COOLDOWN_MS) {
                    return false;
                }
            }
        }
        catch {
            // Ignore storage errors
        }
    }
    return true;
}
export function markSilentSsoAttempt(clientId) {
    const key = getSsoAttemptStorageKey(clientId);
    ssoCheckedInMemory.add(key);
    if (typeof sessionStorage !== 'undefined') {
        try {
            sessionStorage.setItem(key, String(Date.now()));
        }
        catch {
            // Ignore storage errors
        }
    }
}
export function clearSilentSsoAttempt(clientId) {
    const key = getSsoAttemptStorageKey(clientId);
    ssoCheckedInMemory.delete(key);
    if (!clientId) {
        ssoCheckedInMemory.clear();
    }
    if (typeof sessionStorage !== 'undefined') {
        try {
            sessionStorage.removeItem(key);
        }
        catch {
            // Ignore storage errors
        }
    }
}
export function getCurrentReturnToPath(defaultPath = '/') {
    if (typeof window !== 'undefined' && window.location) {
        try {
            const url = new URL(window.location.href);
            url.searchParams.delete('sso');
            const combined = (url.pathname || '/') +
                (url.search ? url.search : '') +
                (url.hash ? url.hash : '');
            if (combined.startsWith('/') && !combined.startsWith('//')) {
                return combined;
            }
        }
        catch {
            const combined = (window.location.pathname || '/') +
                (window.location.search || '') +
                (window.location.hash || '');
            if (combined.startsWith('/') && !combined.startsWith('//')) {
                return combined;
            }
        }
    }
    return defaultPath;
}
/**
 * Queries the OIDC Account Server's `/api/auth/status` endpoint with credentials
 * to check if an upstream identity session is active and authorized for `oidcClientId`.
 */
export async function checkUpstreamOidcStatus(oidcIssuer, oidcClientId) {
    if (typeof fetch !== 'function' || !oidcIssuer) {
        return {
            reachable: false,
            authenticated: false,
            authorized: false,
            user: null,
        };
    }
    try {
        const base = oidcIssuer.replace(/\/+$/, '');
        const statusUrl = oidcClientId
            ? `${base}/api/auth/status?client_id=${encodeURIComponent(oidcClientId)}`
            : `${base}/api/auth/status`;
        const res = await fetch(statusUrl, {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store',
            headers: { Accept: 'application/json' },
        });
        if (!res.ok) {
            return {
                reachable: false,
                authenticated: false,
                authorized: false,
                user: null,
            };
        }
        const data = (await res.json().catch(() => null));
        if (!data) {
            return {
                reachable: false,
                authenticated: false,
                authorized: false,
                user: null,
            };
        }
        const authenticated = Boolean(data.authenticated && data.user);
        const authorized = authenticated
            ? data.authorized !== undefined
                ? Boolean(data.authorized)
                : true
            : false;
        return {
            reachable: true,
            authenticated,
            authorized,
            cookiePresent: typeof data.cookiePresent === 'boolean'
                ? data.cookiePresent
                : undefined,
            user: authenticated ? (data.user ?? null) : null,
        };
    }
    catch {
        return {
            reachable: false,
            authenticated: false,
            authorized: false,
            user: null,
        };
    }
}
export class KitAuthService {
    constructor() {
        this.currentUser = signal(null, ...(ngDevMode ? [{ debugName: "currentUser" }] : /* istanbul ignore next */ []));
        this.authInitialized = signal(false, ...(ngDevMode ? [{ debugName: "authInitialized" }] : /* istanbul ignore next */ []));
        this.isAutoSigningIn = signal(false, ...(ngDevMode ? [{ debugName: "isAutoSigningIn" }] : /* istanbul ignore next */ []));
        this.isProvisioned = signal(true, ...(ngDevMode ? [{ debugName: "isProvisioned" }] : /* istanbul ignore next */ []));
        this.unprovisionedEmail = signal(null, ...(ngDevMode ? [{ debugName: "unprovisionedEmail" }] : /* istanbul ignore next */ []));
        this.accountHubUrl = signal(null, ...(ngDevMode ? [{ debugName: "accountHubUrl" }] : /* istanbul ignore next */ []));
        this.oidcIssuer = signal(null, ...(ngDevMode ? [{ debugName: "oidcIssuer" }] : /* istanbul ignore next */ []));
        this.oidcClientId = signal(null, ...(ngDevMode ? [{ debugName: "oidcClientId" }] : /* istanbul ignore next */ []));
        this.isLoading = computed(() => !this.authInitialized() || this.isAutoSigningIn(), ...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
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
                if (document.visibilityState === 'hidden') {
                    ssoCheckedInMemory.clear();
                }
                else if (document.visibilityState === 'visible') {
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
            if (typeof data.oidcClientId === 'string' && data.oidcClientId) {
                this.oidcClientId.set(data.oidcClientId);
            }
            else {
                this.oidcClientId.set(null);
            }
            if (data.authenticated && data.user) {
                clearSilentSsoAttempt(this.oidcClientId());
                this.isAutoSigningIn.set(false);
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
                    await this.trySilentAutoSignIn();
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
    canAutoSignIn() {
        if (typeof window !== 'undefined' && window.location) {
            const path = window.location.pathname || '/';
            if (path.startsWith('/u/')) {
                return false;
            }
        }
        return shouldAttemptSilentSso(this.oidcClientId());
    }
    async trySilentAutoSignIn() {
        const issuer = this.oidcIssuer();
        const clientId = this.oidcClientId();
        if (!issuer || !this.canAutoSignIn()) {
            return false;
        }
        const status = await checkUpstreamOidcStatus(issuer, clientId);
        if (status.reachable && status.authenticated) {
            if (!status.authorized) {
                return false;
            }
            markSilentSsoAttempt(clientId);
            this.isAutoSigningIn.set(true);
            const returnTo = getCurrentReturnToPath('/');
            this.redirectTo(this.getLoginUrl(returnTo));
            return true;
        }
        if (status.reachable && status.cookiePresent === false) {
            markSilentSsoAttempt(clientId);
            this.isAutoSigningIn.set(true);
            const returnTo = getCurrentReturnToPath('/');
            this.redirectTo(this.getLoginUrl(returnTo, { prompt: 'none' }));
            return true;
        }
        return false;
    }
    /**
     * Verifies with the central OIDC Account Server (`/api/auth/status`) that the
     * user's upstream session is still active, authorized for this client, and
     * belongs to the same account.
     */
    async verifyUpstreamOidcSession() {
        const issuer = this.oidcIssuer();
        const clientId = this.oidcClientId();
        const localUser = this.currentUser();
        if (!issuer || !localUser)
            return;
        const status = await checkUpstreamOidcStatus(issuer, clientId);
        if (!status.reachable)
            return;
        if (!status.authenticated && status.cookiePresent === false) {
            return;
        }
        if (!status.authenticated || !status.user || !status.authorized) {
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
            const returnTo = getCurrentReturnToPath('/');
            this.redirectTo(this.getLoginUrl(returnTo));
        }
    }
    getLoginUrl(returnTo = '/', options) {
        const base = `/api/auth/login?return_to=${encodeURIComponent(returnTo)}`;
        if (options?.prompt) {
            return `${base}&prompt=${encodeURIComponent(options.prompt)}`;
        }
        return base;
    }
    redirectTo(url) {
        if (typeof window !== 'undefined' && window.location) {
            window.location.assign(url);
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
