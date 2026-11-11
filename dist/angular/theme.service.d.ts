import { InjectionToken, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export type KitThemeMode = 'light' | 'dark' | 'auto';
export interface KitThemeConfig {
    storageKey?: string;
    legacyKeys?: string[];
    defaultMode?: KitThemeMode;
    darkThemeColor?: string;
    lightThemeColor?: string;
}
export declare const KIT_THEME_CONFIG: InjectionToken<KitThemeConfig>;
export declare class KitThemeService implements OnDestroy {
    readonly theme: import("@angular/core").WritableSignal<KitThemeMode>;
    readonly resolvedTheme: import("@angular/core").WritableSignal<"light" | "dark">;
    private storageKey;
    private darkThemeColor;
    private lightThemeColor;
    private mediaQuery;
    private readonly mediaQueryListener;
    constructor();
    init(storageKey?: string, legacyKeys?: string[], defaultMode?: KitThemeMode, colors?: {
        darkThemeColor?: string;
        lightThemeColor?: string;
    }): void;
    ngOnDestroy(): void;
    toggleTheme(): KitThemeMode;
    setTheme(mode: KitThemeMode): void;
    applyTheme(mode: KitThemeMode, options?: {
        animate?: boolean;
    }): void;
    private updateThemeColorMeta;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitThemeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<KitThemeService>;
}
