import { OnDestroy } from '@angular/core';
import { IconName } from './icon.component.js';
import * as i0 from "@angular/core";
export interface KitFilterPill {
    id: string;
    label: string;
    active: boolean;
    title?: string;
    variant?: 'default' | 'deals';
    icon?: IconName;
}
export interface KitFilterViewModeOption {
    value: string;
    icon: 'view-grid' | 'view-list' | IconName;
    title: string;
    ariaLabel: string;
}
export declare const DEFAULT_KIT_VIEW_MODES: readonly KitFilterViewModeOption[];
export declare class KitFilterBarComponent implements OnDestroy {
    private searchDebounceTimer;
    readonly search: import("@angular/core").InputSignal<string>;
    readonly searchPlaceholder: import("@angular/core").InputSignal<string>;
    readonly searchInputId: import("@angular/core").InputSignal<string>;
    readonly searchAriaLabel: import("@angular/core").InputSignal<string>;
    readonly searchDebounceMs: import("@angular/core").InputSignal<number>;
    readonly quickPills: import("@angular/core").InputSignal<readonly KitFilterPill[]>;
    readonly quickPillsAriaLabel: import("@angular/core").InputSignal<string>;
    readonly activeFilterCount: import("@angular/core").InputSignal<number>;
    readonly resultCount: import("@angular/core").InputSignal<number>;
    readonly resultCountNoun: import("@angular/core").InputSignal<string>;
    readonly lastUpdated: import("@angular/core").InputSignal<Date | null>;
    readonly viewMode: import("@angular/core").InputSignal<string>;
    readonly viewModes: import("@angular/core").InputSignal<readonly KitFilterViewModeOption[]>;
    readonly resetTitle: import("@angular/core").InputSignal<string>;
    readonly showDrawer: import("@angular/core").ModelSignal<boolean>;
    readonly searchChange: import("@angular/core").OutputEmitterRef<string>;
    readonly searchCleared: import("@angular/core").OutputEmitterRef<void>;
    readonly quickPillClick: import("@angular/core").OutputEmitterRef<string>;
    readonly viewModeChange: import("@angular/core").OutputEmitterRef<string>;
    readonly resetFilters: import("@angular/core").OutputEmitterRef<void>;
    readonly searchInput: import("@angular/core").WritableSignal<string>;
    ngOnDestroy(): void;
    onQuickSearchInput(value: string): void;
    onQuickSearchEnter(event: Event): void;
    clearQuickSearch(): void;
    onViewModeSelect(mode: string): void;
    onResetClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitFilterBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitFilterBarComponent, "kit-filter-bar", never, { "search": { "alias": "search"; "required": false; "isSignal": true; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; "isSignal": true; }; "searchInputId": { "alias": "searchInputId"; "required": false; "isSignal": true; }; "searchAriaLabel": { "alias": "searchAriaLabel"; "required": false; "isSignal": true; }; "searchDebounceMs": { "alias": "searchDebounceMs"; "required": false; "isSignal": true; }; "quickPills": { "alias": "quickPills"; "required": false; "isSignal": true; }; "quickPillsAriaLabel": { "alias": "quickPillsAriaLabel"; "required": false; "isSignal": true; }; "activeFilterCount": { "alias": "activeFilterCount"; "required": false; "isSignal": true; }; "resultCount": { "alias": "resultCount"; "required": false; "isSignal": true; }; "resultCountNoun": { "alias": "resultCountNoun"; "required": false; "isSignal": true; }; "lastUpdated": { "alias": "lastUpdated"; "required": false; "isSignal": true; }; "viewMode": { "alias": "viewMode"; "required": false; "isSignal": true; }; "viewModes": { "alias": "viewModes"; "required": false; "isSignal": true; }; "resetTitle": { "alias": "resetTitle"; "required": false; "isSignal": true; }; "showDrawer": { "alias": "showDrawer"; "required": false; "isSignal": true; }; }, { "showDrawer": "showDrawerChange"; "searchChange": "searchChange"; "searchCleared": "searchCleared"; "quickPillClick": "quickPillClick"; "viewModeChange": "viewModeChange"; "resetFilters": "resetFilters"; }, never, ["[kitFilterPills]", "[kitFilterQuickSort]", "*"], true, never>;
}
