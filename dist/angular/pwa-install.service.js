import { Injectable, computed, signal } from '@angular/core';
import * as i0 from "@angular/core";
export const KIT_PWA_INSTALL_STORAGE_KEY = 'kit-pwa-install-v1';
export const KIT_PWA_DEFAULT_SNOOZE_DAYS = 14;
export function detectKitStandaloneMode() {
    if (typeof window === 'undefined')
        return false;
    try {
        if (window.matchMedia?.('(display-mode: standalone)')?.matches) {
            return true;
        }
        if (window.matchMedia?.('(display-mode: window-controls-overlay)')?.matches) {
            return true;
        }
    }
    catch {
        // Ignore matchMedia failures in test environments
    }
    const nav = (typeof navigator !== 'undefined' ? navigator : null);
    return Boolean(nav?.standalone);
}
export function detectKitIosSafari(userAgent, maxTouchPoints = 0) {
    if (!userAgent)
        return false;
    const isIosDevice = /iP(?:ad|hone|od)/i.test(userAgent) ||
        (/Macintosh/i.test(userAgent) && maxTouchPoints > 1);
    if (!isIosDevice)
        return false;
    const isSafari = /Safari/i.test(userAgent);
    const isThirdPartyBrowser = /CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo|Focus|YaBrowser/i.test(userAgent);
    return isSafari && !isThirdPartyBrowser;
}
export function readKitInstallDismissalState(storage) {
    if (!storage)
        return {};
    try {
        const raw = storage.getItem(KIT_PWA_INSTALL_STORAGE_KEY);
        if (!raw)
            return {};
        const parsed = JSON.parse(raw);
        return {
            dismissedPermanently: Boolean(parsed.dismissedPermanently),
            snoozedUntil: typeof parsed.snoozedUntil === 'number' &&
                Number.isFinite(parsed.snoozedUntil)
                ? parsed.snoozedUntil
                : null,
        };
    }
    catch {
        return {};
    }
}
export function isKitInstallAutoPromptSuppressed(state, nowMs = Date.now()) {
    if (state.dismissedPermanently)
        return true;
    if (typeof state.snoozedUntil === 'number' && state.snoozedUntil > nowMs) {
        return true;
    }
    return false;
}
function getSafeStorage() {
    try {
        return typeof localStorage !== 'undefined' ? localStorage : null;
    }
    catch {
        return null;
    }
}
function persistDismissalState(state) {
    const storage = getSafeStorage();
    if (!storage)
        return;
    try {
        storage.setItem(KIT_PWA_INSTALL_STORAGE_KEY, JSON.stringify(state));
    }
    catch {
        // Ignore storage quota or private browsing errors
    }
}
export class KitPwaInstallService {
    constructor() {
        this._isInstalled = signal(detectKitStandaloneMode(), /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "_isInstalled" }] : /* istanbul ignore next */ []));
        this._isIosSafari = signal(typeof navigator !== 'undefined'
            ? detectKitIosSafari(navigator.userAgent || '', navigator.maxTouchPoints || 0)
            : false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "_isIosSafari" }] : /* istanbul ignore next */ []));
        this._deferredPrompt = signal(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "_deferredPrompt" }] : /* istanbul ignore next */ []));
        this._iosGuideOpen = signal(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "_iosGuideOpen" }] : /* istanbul ignore next */ []));
        this._dismissalState = signal(readKitInstallDismissalState(getSafeStorage()), /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "_dismissalState" }] : /* istanbul ignore next */ []));
        this.isInstalled = this._isInstalled.asReadonly();
        this.isIosSafari = this._isIosSafari.asReadonly();
        this.iosGuideOpen = this._iosGuideOpen.asReadonly();
        this.canPromptNative = computed(() => !this._isInstalled() && this._deferredPrompt() !== null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "canPromptNative" }] : /* istanbul ignore next */ []));
        this.canShowManualInstall = computed(() => !this._isInstalled() &&
            (this._deferredPrompt() !== null || this._isIosSafari()), /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "canShowManualInstall" }] : /* istanbul ignore next */ []));
        this.shouldShowAutoPrompt = computed(() => {
            if (this._isInstalled())
                return false;
            if (isKitInstallAutoPromptSuppressed(this._dismissalState(), Date.now())) {
                return false;
            }
            return this._deferredPrompt() !== null || this._isIosSafari();
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "shouldShowAutoPrompt" }] : /* istanbul ignore next */ []));
        this.registerBrowserListeners();
    }
    registerBrowserListeners() {
        if (typeof window === 'undefined')
            return;
        if (typeof window.addEventListener === 'function') {
            this.beforeInstallListener = (event) => {
                if (this._isInstalled())
                    return;
                event.preventDefault?.();
                this._deferredPrompt.set(event);
            };
            this.appInstalledListener = () => {
                this._deferredPrompt.set(null);
                this._iosGuideOpen.set(false);
                this._isInstalled.set(true);
            };
            window.addEventListener('beforeinstallprompt', this.beforeInstallListener);
            window.addEventListener('appinstalled', this.appInstalledListener);
        }
        try {
            const mql = window.matchMedia?.('(display-mode: standalone)');
            if (mql && typeof mql.addEventListener === 'function') {
                this.standaloneMediaQuery = mql;
                this.standaloneMediaListener = (ev) => {
                    if (ev.matches) {
                        this._deferredPrompt.set(null);
                        this._iosGuideOpen.set(false);
                        this._isInstalled.set(true);
                    }
                };
                mql.addEventListener('change', this.standaloneMediaListener);
            }
        }
        catch {
            // Ignore matchMedia listener errors
        }
    }
    ngOnDestroy() {
        if (typeof window !== 'undefined' &&
            typeof window.removeEventListener === 'function') {
            if (this.beforeInstallListener) {
                window.removeEventListener('beforeinstallprompt', this.beforeInstallListener);
                this.beforeInstallListener = undefined;
            }
            if (this.appInstalledListener) {
                window.removeEventListener('appinstalled', this.appInstalledListener);
                this.appInstalledListener = undefined;
            }
        }
        if (this.standaloneMediaQuery &&
            this.standaloneMediaListener &&
            typeof this.standaloneMediaQuery.removeEventListener === 'function') {
            this.standaloneMediaQuery.removeEventListener('change', this.standaloneMediaListener);
            this.standaloneMediaListener = undefined;
            this.standaloneMediaQuery = undefined;
        }
    }
    async promptInstall() {
        if (this._isInstalled()) {
            return 'unavailable';
        }
        const deferred = this._deferredPrompt();
        if (deferred) {
            this._deferredPrompt.set(null);
            try {
                await deferred.prompt();
                const choice = await deferred.userChoice;
                if (choice?.outcome === 'accepted') {
                    this._isInstalled.set(true);
                    this._iosGuideOpen.set(false);
                    return 'accepted';
                }
                this.snooze(KIT_PWA_DEFAULT_SNOOZE_DAYS);
                return 'dismissed';
            }
            catch {
                return 'unavailable';
            }
        }
        if (this._isIosSafari()) {
            this._iosGuideOpen.set(true);
            return 'ios-guide';
        }
        return 'unavailable';
    }
    snooze(days = KIT_PWA_DEFAULT_SNOOZE_DAYS) {
        const safeDays = Number.isFinite(days) && days > 0 ? days : 14;
        const nextState = {
            dismissedPermanently: false,
            snoozedUntil: Date.now() + safeDays * 86_400_000,
        };
        this._dismissalState.set(nextState);
        this._iosGuideOpen.set(false);
        persistDismissalState(nextState);
    }
    dismissPermanently() {
        const nextState = {
            dismissedPermanently: true,
            snoozedUntil: null,
        };
        this._dismissalState.set(nextState);
        this._iosGuideOpen.set(false);
        persistDismissalState(nextState);
    }
    closeIosGuide() {
        this._iosGuideOpen.set(false);
    }
    static { this.ɵfac = function KitPwaInstallService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitPwaInstallService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: KitPwaInstallService, factory: KitPwaInstallService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitPwaInstallService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [], null); })();
