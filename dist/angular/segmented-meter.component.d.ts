import * as i0 from "@angular/core";
export interface KitMeterSegment {
    id: string;
    label?: string;
    pct: number;
    color?: string;
    className?: string;
    title?: string;
}
/**
 * Multi-segment animated meter bar with `@starting-style` mount growth and
 * smooth width interpolation as percentages change.
 */
export declare class KitSegmentedMeterComponent {
    readonly segments: import("@angular/core").InputSignal<readonly KitMeterSegment[]>;
    readonly heightPx: import("@angular/core").InputSignal<number>;
    readonly ariaLabel: import("@angular/core").InputSignal<string>;
    readonly totalPct: import("@angular/core").Signal<number>;
    clampPct(val: number): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitSegmentedMeterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitSegmentedMeterComponent, "kit-segmented-meter", never, { "segments": { "alias": "segments"; "required": true; "isSignal": true; }; "heightPx": { "alias": "heightPx"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
