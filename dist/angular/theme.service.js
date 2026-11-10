import { Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
export class KitThemeService {
    constructor() {
        this.theme = signal('auto', ...(ngDevMode ? [{ debugName: "theme" }] : /* istanbul ignore next */ []));
        this.resolvedTheme = signal('dark', ...(ngDevMode ? [{ debugName: "resolvedTheme" }] : /* istanbul ignore next */ []));
        this.storageKey = 'app-theme';
        this.mediaQuery = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
            ? window.matchMedia('(prefers-color-scheme: dark)')
            : null;
        this.mediaQueryListener = () => {
            if (this.theme() === 'auto') {
                this.applyTheme('auto');
            }
        };
        if (this.mediaQuery) {
            if (typeof this.mediaQuery.addEventListener === 'function') {
                this.mediaQuery.addEventListener('change', this.mediaQueryListener);
            }
            else if ('addListener' in this.mediaQuery) {
                this.mediaQuery.addListener(this.mediaQueryListener);
            }
        }
        this.init();
    }
    init(storageKey = 'app-theme', legacyKeys = ['living-dex_theme'], defaultMode = 'auto') {
        this.storageKey = storageKey;
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
        this.applyTheme(initial);
    }
    ngOnDestroy() {
        if (this.mediaQuery) {
            if (typeof this.mediaQuery.removeEventListener === 'function') {
                this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
            }
            else if ('removeListener' in this.mediaQuery) {
                this.mediaQuery.removeListener(this.mediaQueryListener);
            }
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
        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem(this.storageKey, mode);
            }
            catch {
                // Ignore storage errors
            }
        }
        this.applyTheme(mode);
    }
    applyTheme(mode) {
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
            root.classList.remove('theme-light', 'theme-dark');
            root.classList.add(effective === 'dark' ? 'theme-dark' : 'theme-light');
            if (body) {
                body.classList.remove('theme-light', 'theme-dark');
                body.classList.add(effective === 'dark' ? 'theme-dark' : 'theme-light');
            }
            this.updateThemeColorMeta(mode, effective);
        };
        const doc = document;
        if (typeof doc.startViewTransition === 'function') {
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
        const darkColor = '#121214';
        const lightColor = '#f8fafc';
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
