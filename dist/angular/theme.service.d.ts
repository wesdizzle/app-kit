import { InjectionToken, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export type KitThemeMode = 'light' | 'dark' | 'auto';
export interface KitUserPreferences {
    theme?: KitThemeMode;
}
export interface KitUpstreamThemeSyncState {
    issuerUrl: string | null;
    clientId?: string | null;
    authenticated: boolean;
    preferences?: KitUserPreferences | null;
}
export interface KitThemeConfig {
    storageKey?: string;
    legacyKeys?: string[];
    defaultMode?: KitThemeMode;
    darkThemeColor?: string;
    lightThemeColor?: string;
    syncDebounceMs?: number;
}
export declare const KIT_THEME_CONFIG: InjectionToken<KitThemeConfig>;
export declare function isKitThemeMode(value: unknown): value is KitThemeMode;
export declare function normalizeKitUserPreferences(raw: unknown): KitUserPreferences;
export declare function updateUpstreamPreferences(oidcIssuer: string, patch: KitUserPreferences, clientId?: string | null): Promise<{
    ok: boolean;
    status: number;
    preferences: KitUserPreferences | null;
}>;
export declare function notifyActiveThemeService(state: KitUpstreamThemeSyncState): void;
export declare class KitThemeService implements OnDestroy {
    readonly theme: import("@angular/core").WritableSignal<KitThemeMode>;
    readonly resolvedTheme: import("@angular/core").WritableSignal<"light" | "dark">;
    private storageKey;
    private darkThemeColor;
    private lightThemeColor;
    private syncDebounceMs;
    private upstreamIssuer;
    private upstreamClientId;
    private upstreamAuthenticated;
    private lastSyncedUpstreamTheme;
    private syncDebounceTimer;
    private inflightSyncCount;
    private mediaQuery;
    private readonly mediaQueryListener;
    constructor();
    init(storageKey?: string, legacyKeys?: string[], defaultMode?: KitThemeMode, colors?: {
        darkThemeColor?: string;
        lightThemeColor?: string;
    }): void;
    ngOnDestroy(): void;
    /**
     * Synchronizes the local theme service with upstream OIDC Account Server state.
     * - Does not trigger an echo `PATCH` back to the server.
     * - Leaves existing `localStorage` untouched when upstream `preferences.theme` is unset (`{}`).
     * - Skips applying stale server state while a local user toggle is debouncing or in flight.
     */
    syncUpstreamState(state: KitUpstreamThemeSyncState): void;
    toggleTheme(): KitThemeMode;
    setTheme(mode: KitThemeMode): void;
    private persistThemeToStorage;
    private clearPendingSyncTimer;
    private scheduleUpstreamThemeSync;
    applyTheme(mode: KitThemeMode, options?: {
        animate?: boolean;
    }): void;
    private updateThemeColorMeta;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitThemeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<KitThemeService>;
}
