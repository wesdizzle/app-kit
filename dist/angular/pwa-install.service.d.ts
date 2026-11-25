import { OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export declare const KIT_PWA_INSTALL_STORAGE_KEY = "kit-pwa-install-v1";
export declare const KIT_PWA_DEFAULT_SNOOZE_DAYS = 14;
export interface KitBeforeInstallPromptEvent extends Event {
    readonly platforms?: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}
export interface KitInstallDismissalState {
    dismissedPermanently?: boolean;
    snoozedUntil?: number | null;
}
export type KitInstallOutcome = 'accepted' | 'dismissed' | 'ios-guide' | 'unavailable';
export declare function detectKitStandaloneMode(): boolean;
export declare function detectKitIosSafari(userAgent: string, maxTouchPoints?: number): boolean;
export declare function readKitInstallDismissalState(storage: Pick<Storage, 'getItem'> | null | undefined): KitInstallDismissalState;
export declare function isKitInstallAutoPromptSuppressed(state: KitInstallDismissalState, nowMs?: number): boolean;
export declare class KitPwaInstallService implements OnDestroy {
    private readonly _isInstalled;
    private readonly _isIosSafari;
    private readonly _deferredPrompt;
    private readonly _iosGuideOpen;
    private readonly _dismissalState;
    readonly isInstalled: import("@angular/core").Signal<boolean>;
    readonly isIosSafari: import("@angular/core").Signal<boolean>;
    readonly iosGuideOpen: import("@angular/core").Signal<boolean>;
    readonly canPromptNative: import("@angular/core").Signal<boolean>;
    readonly canShowManualInstall: import("@angular/core").Signal<boolean>;
    readonly shouldShowAutoPrompt: import("@angular/core").Signal<boolean>;
    private beforeInstallListener?;
    private appInstalledListener?;
    private standaloneMediaQuery?;
    private standaloneMediaListener?;
    constructor();
    private registerBrowserListeners;
    ngOnDestroy(): void;
    promptInstall(): Promise<KitInstallOutcome>;
    snooze(days?: number): void;
    dismissPermanently(): void;
    closeIosGuide(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitPwaInstallService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<any>;
}
