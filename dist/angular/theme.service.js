import { Injectable, InjectionToken, inject, signal, } from '@angular/core';
import * as i0 from "@angular/core";
export const KIT_THEME_CONFIG = new InjectionToken('KIT_THEME_CONFIG');
export function isKitThemeMode(value) {
    return value === 'light' || value === 'dark' || value === 'auto';
}
export function normalizeKitUserPreferences(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
        return {};
    }
    const record = raw;
    const out = {};
    if (isKitThemeMode(record['theme'])) {
        out.theme = record['theme'];
    }
    return out;
}
export async function updateUpstreamPreferences(oidcIssuer, patch, clientId) {
    if (typeof fetch !== 'function') {
        return { ok: false, status: 0, preferences: null };
    }
    const normalizedPatch = normalizeKitUserPreferences(patch);
    if (Object.keys(normalizedPatch).length === 0) {
        return { ok: false, status: 400, preferences: null };
    }
    try {
        const base = oidcIssuer.replace(/\/+$/, '');
        const url = clientId
            ? `${base}/api/auth/preferences?client_id=${encodeURIComponent(clientId)}`
            : `${base}/api/auth/preferences`;
        const res = await fetch(url, {
            method: 'PATCH',
            credentials: base ? 'include' : 'same-origin',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(normalizedPatch),
        });
        if (!res.ok) {
            return { ok: false, status: res.status, preferences: null };
        }
        const data = (await res.json().catch(() => null));
        return {
            ok: true,
            status: res.status,
            preferences: data
                ? normalizeKitUserPreferences(data.preferences ?? data)
                : normalizedPatch,
        };
    }
    catch {
        return { ok: false, status: 0, preferences: null };
    }
}
let activeThemeService = null;
export function notifyActiveThemeService(state) {
    activeThemeService?.syncUpstreamState(state);
}
export class KitThemeService {
    constructor() {
        this.theme = signal('auto', ...(ngDevMode ? [{ debugName: "theme" }] : /* istanbul ignore next */ []));
        this.resolvedTheme = signal('dark', ...(ngDevMode ? [{ debugName: "resolvedTheme" }] : /* istanbul ignore next */ []));
        this.storageKey = 'app-theme';
        this.darkThemeColor = '#121214';
        this.lightThemeColor = '#f8fafc';
        this.syncDebounceMs = 400;
        this.upstreamIssuer = null;
        this.upstreamClientId = null;
        this.upstreamAuthenticated = false;
        this.lastSyncedUpstreamTheme = null;
        this.syncDebounceTimer = null;
        this.inflightSyncCount = 0;
        this.mediaQuery = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
            ? window.matchMedia('(prefers-color-scheme: dark)')
            : null;
        this.mediaQueryListener = () => {
            if (this.theme() === 'auto') {
                this.applyTheme('auto', { animate: false });
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        activeThemeService = this;
        let injectedConfig;
        try {
            injectedConfig = inject(KIT_THEME_CONFIG, { optional: true });
        }
        catch {
            injectedConfig = null;
        }
        if (typeof injectedConfig?.syncDebounceMs === 'number') {
            this.syncDebounceMs = Math.max(0, injectedConfig.syncDebounceMs);
        }
        if (this.mediaQuery) {
            if (typeof this.mediaQuery.addEventListener === 'function') {
                this.mediaQuery.addEventListener('change', this.mediaQueryListener);
            }
            else if ('addListener' in this.mediaQuery) {
                this.mediaQuery.addListener(this.mediaQueryListener);
            }
        }
        this.init(injectedConfig?.storageKey ?? 'app-theme', injectedConfig?.legacyKeys ?? ['living-dex_theme', 'theme'], injectedConfig?.defaultMode ?? 'auto', {
            darkThemeColor: injectedConfig?.darkThemeColor,
            lightThemeColor: injectedConfig?.lightThemeColor,
        });
    }
    init(storageKey = 'app-theme', legacyKeys = ['living-dex_theme', 'theme'], defaultMode = 'auto', colors) {
        this.storageKey = storageKey;
        if (colors?.darkThemeColor) {
            this.darkThemeColor = colors.darkThemeColor;
        }
        if (colors?.lightThemeColor) {
            this.lightThemeColor = colors.lightThemeColor;
        }
        if (this.upstreamAuthenticated && this.lastSyncedUpstreamTheme) {
            this.persistThemeToStorage(this.lastSyncedUpstreamTheme);
            this.theme.set(this.lastSyncedUpstreamTheme);
            this.applyTheme(this.lastSyncedUpstreamTheme, { animate: false });
            return;
        }
        let saved = null;
        if (typeof localStorage !== 'undefined') {
            try {
                const raw = localStorage.getItem(storageKey);
                if (raw === 'light' || raw === 'dark' || raw === 'auto') {
                    saved = raw;
                }
                else {
                    for (const legacyKey of legacyKeys) {
                        const legacyVal = localStorage.getItem(legacyKey);
                        if (legacyVal === 'light' ||
                            legacyVal === 'dark' ||
                            legacyVal === 'auto') {
                            saved = legacyVal;
                            localStorage.setItem(storageKey, legacyVal);
                            break;
                        }
                    }
                }
            }
            catch {
                // Ignore storage errors
            }
        }
        const initial = saved ?? defaultMode;
        this.theme.set(initial);
        this.applyTheme(initial, { animate: false });
    }
    ngOnDestroy() {
        if (activeThemeService === this) {
            activeThemeService = null;
        }
        this.clearPendingSyncTimer();
        if (this.mediaQuery) {
            if (typeof this.mediaQuery.removeEventListener === 'function') {
                this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
            }
            else if ('removeListener' in this.mediaQuery) {
                this.mediaQuery.removeListener(this.mediaQueryListener);
            }
        }
    }
    /**
     * Synchronizes the local theme service with upstream OIDC Account Server state.
     * - Does not trigger an echo `PATCH` back to the server.
     * - Leaves existing `localStorage` untouched when upstream `preferences.theme` is unset (`{}`).
     * - Skips applying stale server state while a local user toggle is debouncing or in flight.
     */
    syncUpstreamState(state) {
        if (!state.authenticated || state.issuerUrl === null) {
            this.upstreamAuthenticated = false;
            this.upstreamIssuer = null;
            this.upstreamClientId = null;
            this.lastSyncedUpstreamTheme = null;
            this.clearPendingSyncTimer();
            return;
        }
        this.upstreamAuthenticated = true;
        this.upstreamIssuer = state.issuerUrl.replace(/\/+$/, '');
        this.upstreamClientId = state.clientId ?? null;
        // Never clobber an active local toggle that is still debouncing or in flight
        if (this.syncDebounceTimer !== null || this.inflightSyncCount > 0) {
            return;
        }
        const upstreamTheme = state.preferences?.theme;
        if (!isKitThemeMode(upstreamTheme)) {
            return;
        }
        this.lastSyncedUpstreamTheme = upstreamTheme;
        this.persistThemeToStorage(upstreamTheme);
        if (this.theme() !== upstreamTheme) {
            this.theme.set(upstreamTheme);
            this.applyTheme(upstreamTheme, { animate: false });
        }
    }
    toggleTheme() {
        const modes = ['light', 'dark', 'auto'];
        const next = modes[(modes.indexOf(this.theme()) + 1) % modes.length];
        this.setTheme(next);
        return next;
    }
    setTheme(mode) {
        this.theme.set(mode);
        this.persistThemeToStorage(mode);
        this.applyTheme(mode, { animate: true });
        this.scheduleUpstreamThemeSync(mode);
    }
    persistThemeToStorage(mode) {
        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem(this.storageKey, mode);
            }
            catch {
                // Ignore storage errors
            }
        }
    }
    clearPendingSyncTimer() {
        if (this.syncDebounceTimer !== null) {
            clearTimeout(this.syncDebounceTimer);
            this.syncDebounceTimer = null;
        }
    }
    scheduleUpstreamThemeSync(mode) {
        if (!this.upstreamAuthenticated || this.upstreamIssuer === null) {
            return;
        }
        this.lastSyncedUpstreamTheme = mode;
        this.clearPendingSyncTimer();
        const issuer = this.upstreamIssuer;
        const clientId = this.upstreamClientId;
        const executeSync = async () => {
            this.syncDebounceTimer = null;
            if (!this.upstreamAuthenticated || this.upstreamIssuer === null) {
                return;
            }
            this.inflightSyncCount++;
            try {
                const result = await updateUpstreamPreferences(issuer, { theme: mode }, clientId);
                if (result.status === 401 || result.status === 403) {
                    this.upstreamAuthenticated = false;
                    this.upstreamIssuer = null;
                    this.upstreamClientId = null;
                }
            }
            finally {
                this.inflightSyncCount = Math.max(0, this.inflightSyncCount - 1);
            }
        };
        if (this.syncDebounceMs <= 0) {
            void executeSync();
        }
        else {
            this.syncDebounceTimer = setTimeout(() => {
                void executeSync();
            }, this.syncDebounceMs);
        }
    }
    applyTheme(mode, options) {
        const animate = options?.animate ?? false;
        const prefersDark = Boolean(typeof window !== 'undefined' &&
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);
        const effective = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode;
        this.resolvedTheme.set(effective);
        if (typeof document === 'undefined')
            return;
        const updateDom = () => {
            const root = document.documentElement;
            const body = document.body;
            root.setAttribute('data-theme', effective);
            root.style.colorScheme = effective;
            root.classList.remove('theme-light', 'theme-dark');
            root.classList.add(effective === 'dark' ? 'theme-dark' : 'theme-light');
            if (body) {
                body.classList.remove('theme-light', 'theme-dark');
                body.classList.add(effective === 'dark' ? 'theme-dark' : 'theme-light');
            }
            this.updateThemeColorMeta(mode, effective);
        };
        const doc = document;
        if (animate && typeof doc.startViewTransition === 'function') {
            doc.startViewTransition(() => {
                updateDom();
            });
        }
        else {
            document.documentElement.classList.add('disable-theme-transitions');
            updateDom();
            if (typeof window !== 'undefined' &&
                typeof requestAnimationFrame === 'function') {
                void document.body?.offsetHeight;
                requestAnimationFrame(() => {
                    document.documentElement.classList.remove('disable-theme-transitions');
                });
            }
            else {
                document.documentElement.classList.remove('disable-theme-transitions');
            }
        }
    }
    updateThemeColorMeta(mode, effective) {
        if (typeof document === 'undefined')
            return;
        const darkColor = this.darkThemeColor;
        const lightColor = this.lightThemeColor;
        const metas = document.querySelectorAll('meta[name="theme-color"]');
        metas.forEach((meta) => {
            const media = meta.getAttribute('media');
            if (mode === 'dark') {
                meta.setAttribute('content', darkColor);
            }
            else if (mode === 'light') {
                meta.setAttribute('content', lightColor);
            }
            else if (media && media.includes('prefers-color-scheme: dark')) {
                meta.setAttribute('content', darkColor);
            }
            else if (media && media.includes('prefers-color-scheme: light')) {
                meta.setAttribute('content', lightColor);
            }
            else {
                meta.setAttribute('content', effective === 'dark' ? darkColor : lightColor);
            }
        });
    }
    static { this.ɵfac = function KitThemeService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitThemeService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: KitThemeService, factory: KitThemeService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitThemeService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [], null); })();
