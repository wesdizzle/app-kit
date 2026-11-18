import { OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export declare function canAnimateKitBannerExit(): boolean;
export type KitSyncPhase = 'idle' | 'saving' | 'saved';
/**
 * Header-friendly sync pill that morphs from a spinning indicator into a
 * checkmark confirmation before lingering briefly and fading out.
 */
export declare class KitSyncIndicatorComponent implements OnDestroy {
    readonly isSaving: import("@angular/core").InputSignal<boolean>;
    readonly savingLabel: import("@angular/core").InputSignal<string>;
    readonly savedLabel: import("@angular/core").InputSignal<string>;
    readonly lingerMs: import("@angular/core").InputSignal<number>;
    readonly phase: import("@angular/core").WritableSignal<KitSyncPhase>;
    private wasSaving;
    private lingerTimer;
    constructor();
    updateSavingState(saving: boolean): void;
    ngOnDestroy(): void;
    private clearLingerTimer;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitSyncIndicatorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitSyncIndicatorComponent, "kit-sync-indicator", never, { "isSaving": { "alias": "isSaving"; "required": false; "isSignal": true; }; "savingLabel": { "alias": "savingLabel"; "required": false; "isSignal": true; }; "savedLabel": { "alias": "savedLabel"; "required": false; "isSignal": true; }; "lingerMs": { "alias": "lingerMs"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
export type KitStatusBannerVariant = 'error' | 'success' | 'info' | 'warning';
/**
 * Animated inline status/alert banner with directional entrance, height collapse,
 * and exit animation on dismissal, plus a subtle horizontal shake on error feedback.
 */
export declare class KitStatusBannerComponent implements OnDestroy {
    readonly message: import("@angular/core").InputSignal<string | null | undefined>;
    readonly variant: import("@angular/core").InputSignal<KitStatusBannerVariant>;
    readonly exitDurationMs: import("@angular/core").InputSignal<number>;
    readonly displayedMessage: import("@angular/core").WritableSignal<string | null>;
    readonly isClosing: import("@angular/core").WritableSignal<boolean>;
    readonly effectiveMessage: import("@angular/core").Signal<string | null>;
    private closeTimer;
    constructor();
    syncMessageState(msg: string | null | undefined): void;
    ngOnDestroy(): void;
    private clearCloseTimer;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitStatusBannerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitStatusBannerComponent, "kit-status-banner", never, { "message": { "alias": "message"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "exitDurationMs": { "alias": "exitDurationMs"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
export type KitDegradedMode = 'offline' | 'backup' | null;
export declare function formatKitDegradedTimestamp(value: string | Date | null | undefined): string | null;
/**
 * Shared read-only warning banner displayed when the app is running against an
 * R2 backup snapshot (due to D1 read quota exhaustion) or offline cached data,
 * with smooth appearing and disappearing animations.
 */
export declare class KitDegradedBannerComponent implements OnDestroy {
    readonly mode: import("@angular/core").InputSignal<KitDegradedMode>;
    readonly snapshotTimestamp: import("@angular/core").InputSignal<string | Date | null | undefined>;
    readonly customMessage: import("@angular/core").InputSignal<string | null | undefined>;
    readonly exitDurationMs: import("@angular/core").InputSignal<number>;
    readonly displayedMode: import("@angular/core").WritableSignal<KitDegradedMode>;
    readonly displayedMessage: import("@angular/core").WritableSignal<string>;
    readonly isClosing: import("@angular/core").WritableSignal<boolean>;
    readonly effectiveMode: import("@angular/core").Signal<KitDegradedMode>;
    readonly resolvedMessage: import("@angular/core").Signal<string>;
    private closeTimer;
    constructor();
    syncModeState(nextMode: KitDegradedMode): void;
    ngOnDestroy(): void;
    private clearCloseTimer;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitDegradedBannerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitDegradedBannerComponent, "kit-degraded-banner", never, { "mode": { "alias": "mode"; "required": false; "isSignal": true; }; "snapshotTimestamp": { "alias": "snapshotTimestamp"; "required": false; "isSignal": true; }; "customMessage": { "alias": "customMessage"; "required": false; "isSignal": true; }; "exitDurationMs": { "alias": "exitDurationMs"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
/**
 * Shared animated loading/sync progress banner with pulsing status indicator,
 * optional determinate progress track, and smooth appear/disappear animations.
 */
export declare class KitLoadingBannerComponent implements OnDestroy {
    readonly active: import("@angular/core").InputSignal<boolean>;
    readonly message: import("@angular/core").InputSignal<string>;
    readonly percent: import("@angular/core").InputSignal<number | null | undefined>;
    readonly showProgress: import("@angular/core").InputSignal<boolean>;
    readonly testId: import("@angular/core").InputSignal<string>;
    readonly exitDurationMs: import("@angular/core").InputSignal<number>;
    readonly isRendered: import("@angular/core").WritableSignal<boolean>;
    readonly isClosing: import("@angular/core").WritableSignal<boolean>;
    readonly lastMessage: import("@angular/core").WritableSignal<string>;
    readonly lastPercent: import("@angular/core").WritableSignal<number | null>;
    readonly shouldShow: import("@angular/core").Signal<boolean>;
    readonly effectiveMessage: import("@angular/core").Signal<string>;
    readonly effectivePercent: import("@angular/core").Signal<number | null>;
    private closeTimer;
    constructor();
    syncActiveState(isActive: boolean, msg?: string, pct?: number | null): void;
    ngOnDestroy(): void;
    private clearCloseTimer;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitLoadingBannerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitLoadingBannerComponent, "kit-loading-banner", never, { "active": { "alias": "active"; "required": false; "isSignal": true; }; "message": { "alias": "message"; "required": false; "isSignal": true; }; "percent": { "alias": "percent"; "required": false; "isSignal": true; }; "showProgress": { "alias": "showProgress"; "required": false; "isSignal": true; }; "testId": { "alias": "testId"; "required": false; "isSignal": true; }; "exitDurationMs": { "alias": "exitDurationMs"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
