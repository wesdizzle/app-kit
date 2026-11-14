import { OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export interface KitSelectOption<T = unknown> {
    value: T;
    label: string;
    indent?: boolean;
}
export interface KitSelectGroup<T = unknown> {
    label: string;
    options: readonly KitSelectOption<T>[];
}
export declare const activeKitDropdownId: import("@angular/core").WritableSignal<string | null>;
export declare function closeAllKitDropdowns(): void;
export declare class KitSelectComponent {
    private readonly fallbackId;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly labelTitle: import("@angular/core").InputSignal<string>;
    readonly triggerId: import("@angular/core").InputSignal<string>;
    readonly dropdownName: import("@angular/core").InputSignal<string>;
    readonly value: import("@angular/core").InputSignal<unknown>;
    readonly options: import("@angular/core").InputSignal<readonly KitSelectOption<unknown>[]>;
    readonly groups: import("@angular/core").InputSignal<readonly KitSelectGroup<unknown>[]>;
    readonly allOption: import("@angular/core").InputSignal<KitSelectOption<unknown> | null>;
    readonly placeholder: import("@angular/core").InputSignal<string>;
    readonly variant: import("@angular/core").InputSignal<"default" | "compact-sort">;
    readonly disabled: import("@angular/core").InputSignal<boolean>;
    readonly valueChange: import("@angular/core").OutputEmitterRef<any>;
    readonly dropdownKey: import("@angular/core").Signal<string>;
    readonly isOpen: import("@angular/core").Signal<boolean>;
    readonly selectedLabel: import("@angular/core").Signal<string>;
    isSelected(optionValue: unknown): boolean;
    toggle(event?: Event): void;
    close(): void;
    select(val: unknown): void;
    onDocumentClick(event: MouseEvent): void;
    onEscape(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitSelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitSelectComponent, "kit-select", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "labelTitle": { "alias": "labelTitle"; "required": false; "isSignal": true; }; "triggerId": { "alias": "triggerId"; "required": false; "isSignal": true; }; "dropdownName": { "alias": "dropdownName"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "options": { "alias": "options"; "required": false; "isSignal": true; }; "groups": { "alias": "groups"; "required": false; "isSignal": true; }; "allOption": { "alias": "allOption"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
export declare class KitComboboxComponent implements OnDestroy {
    private readonly fallbackId;
    private debounceTimer;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly inputId: import("@angular/core").InputSignal<string>;
    readonly dropdownName: import("@angular/core").InputSignal<string>;
    readonly value: import("@angular/core").InputSignal<string>;
    readonly suggestions: import("@angular/core").InputSignal<readonly string[]>;
    readonly placeholder: import("@angular/core").InputSignal<string>;
    readonly allOptionLabel: import("@angular/core").InputSignal<string>;
    readonly emptyMessagePrefix: import("@angular/core").InputSignal<string>;
    readonly toggleAriaLabel: import("@angular/core").InputSignal<string>;
    readonly showExactToggle: import("@angular/core").InputSignal<boolean>;
    readonly exact: import("@angular/core").InputSignal<boolean>;
    readonly exactTitle: import("@angular/core").InputSignal<string>;
    readonly debounceMs: import("@angular/core").InputSignal<number>;
    readonly maxSuggestions: import("@angular/core").InputSignal<number>;
    readonly valueChange: import("@angular/core").OutputEmitterRef<string>;
    readonly exactChange: import("@angular/core").OutputEmitterRef<boolean>;
    readonly dropdownKey: import("@angular/core").Signal<string>;
    readonly isOpen: import("@angular/core").Signal<boolean>;
    readonly filteredSuggestions: import("@angular/core").Signal<string[]>;
    ngOnDestroy(): void;
    open(): void;
    toggle(event?: Event): void;
    close(): void;
    onTextInput(val: string): void;
    selectSuggestion(item: string): void;
    onDocumentClick(event: MouseEvent): void;
    onEscape(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitComboboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitComboboxComponent, "kit-combobox", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "inputId": { "alias": "inputId"; "required": false; "isSignal": true; }; "dropdownName": { "alias": "dropdownName"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "suggestions": { "alias": "suggestions"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "allOptionLabel": { "alias": "allOptionLabel"; "required": false; "isSignal": true; }; "emptyMessagePrefix": { "alias": "emptyMessagePrefix"; "required": false; "isSignal": true; }; "toggleAriaLabel": { "alias": "toggleAriaLabel"; "required": false; "isSignal": true; }; "showExactToggle": { "alias": "showExactToggle"; "required": false; "isSignal": true; }; "exact": { "alias": "exact"; "required": false; "isSignal": true; }; "exactTitle": { "alias": "exactTitle"; "required": false; "isSignal": true; }; "debounceMs": { "alias": "debounceMs"; "required": false; "isSignal": true; }; "maxSuggestions": { "alias": "maxSuggestions"; "required": false; "isSignal": true; }; }, { "valueChange": "valueChange"; "exactChange": "exactChange"; }, never, never, true, never>;
}
export declare class KitMultiSelectComponent {
    private readonly fallbackId;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly triggerId: import("@angular/core").InputSignal<string>;
    readonly dropdownName: import("@angular/core").InputSignal<string>;
    readonly selected: import("@angular/core").InputSignal<readonly string[]>;
    readonly options: import("@angular/core").InputSignal<readonly string[]>;
    readonly allLabel: import("@angular/core").InputSignal<string>;
    readonly clearLabel: import("@angular/core").InputSignal<string>;
    readonly emptyLabel: import("@angular/core").InputSignal<string>;
    readonly containerClass: import("@angular/core").InputSignal<string>;
    readonly selectedChange: import("@angular/core").OutputEmitterRef<string[]>;
    readonly dropdownKey: import("@angular/core").Signal<string>;
    readonly isOpen: import("@angular/core").Signal<boolean>;
    readonly summaryLabel: import("@angular/core").Signal<string>;
    isSelected(item: string): boolean;
    toggle(event?: Event): void;
    close(): void;
    clearAll(): void;
    toggleItem(item: string): void;
    onDocumentClick(event: MouseEvent): void;
    onEscape(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitMultiSelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitMultiSelectComponent, "kit-multiselect", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "triggerId": { "alias": "triggerId"; "required": false; "isSignal": true; }; "dropdownName": { "alias": "dropdownName"; "required": false; "isSignal": true; }; "selected": { "alias": "selected"; "required": false; "isSignal": true; }; "options": { "alias": "options"; "required": false; "isSignal": true; }; "allLabel": { "alias": "allLabel"; "required": false; "isSignal": true; }; "clearLabel": { "alias": "clearLabel"; "required": false; "isSignal": true; }; "emptyLabel": { "alias": "emptyLabel"; "required": false; "isSignal": true; }; "containerClass": { "alias": "containerClass"; "required": false; "isSignal": true; }; }, { "selectedChange": "selectedChange"; }, never, never, true, never>;
}
