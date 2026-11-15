import { OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
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
 * Animated inline status/alert banner with directional entrance and a subtle
 * horizontal shake on error feedback.
 */
export declare class KitStatusBannerComponent {
    readonly message: import("@angular/core").InputSignal<string | null | undefined>;
    readonly variant: import("@angular/core").InputSignal<KitStatusBannerVariant>;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitStatusBannerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitStatusBannerComponent, "kit-status-banner", never, { "message": { "alias": "message"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
