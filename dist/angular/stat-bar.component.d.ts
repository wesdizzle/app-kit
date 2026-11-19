import * as i0 from "@angular/core";
export type KitStatBarTone = 'low' | 'mid' | 'good' | 'high' | 'peak' | 'primary' | 'warning' | 'success' | 'danger';
export interface KitStatBarItem {
    id: string;
    label: string;
    value: number;
    max?: number;
    displayValue?: string;
    secondaryText?: string | null;
    tone?: KitStatBarTone;
}
export declare function computeKitStatPct(value: number, max: number): number;
export declare function resolveKitStatTone(value: number, max: number, explicit?: KitStatBarTone): KitStatBarTone;
/**
 * Labeled horizontal metric bar list with automatic ratio-based semantic tiers,
 * optional secondary ranges, and an optional summary footer row.
 */
export declare class KitStatBarListComponent {
    readonly items: import("@angular/core").InputSignal<readonly KitStatBarItem[]>;
    readonly defaultMax: import("@angular/core").InputSignal<number>;
    readonly totalLabel: import("@angular/core").InputSignal<string | null>;
    readonly totalValue: import("@angular/core").InputSignal<string | number | null>;
    readonly ariaLabel: import("@angular/core").InputSignal<string>;
    readonly compact: import("@angular/core").InputSignal<boolean>;
    computePct(value: number, max: number): number;
    resolveTone(value: number, max: number, explicit?: KitStatBarTone): KitStatBarTone;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitStatBarListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitStatBarListComponent, "kit-stat-bar-list", never, { "items": { "alias": "items"; "required": true; "isSignal": true; }; "defaultMax": { "alias": "defaultMax"; "required": false; "isSignal": true; }; "totalLabel": { "alias": "totalLabel"; "required": false; "isSignal": true; }; "totalValue": { "alias": "totalValue"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "compact": { "alias": "compact"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
