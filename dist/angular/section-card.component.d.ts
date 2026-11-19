import { IconName } from './icon.component.js';
import * as i0 from "@angular/core";
export interface KitKvItem {
    label: string;
    value: string;
    hint?: string | null;
    mono?: boolean;
    tone?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger';
}
/**
 * Standardized Material 3 Expressive content card with optional icon,
 * subtitle, header action slot (`[cardActions]`), and collapsible toggle.
 */
export declare class KitSectionCardComponent {
    readonly title: import("@angular/core").InputSignal<string>;
    readonly subtitle: import("@angular/core").InputSignal<string | null>;
    readonly icon: import("@angular/core").InputSignal<IconName | null>;
    readonly collapsible: import("@angular/core").InputSignal<boolean>;
    readonly expanded: import("@angular/core").InputSignal<boolean>;
    readonly collapseLabel: import("@angular/core").InputSignal<string>;
    readonly expandLabel: import("@angular/core").InputSignal<string>;
    readonly toggleTestId: import("@angular/core").InputSignal<string | null>;
    readonly testId: import("@angular/core").InputSignal<string | null>;
    readonly compact: import("@angular/core").InputSignal<boolean>;
    readonly expandedChange: import("@angular/core").OutputEmitterRef<boolean>;
    private readonly toggledState;
    readonly isExpanded: import("@angular/core").Signal<boolean>;
    toggleExpanded(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitSectionCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitSectionCardComponent, "kit-section-card", never, { "title": { "alias": "title"; "required": true; "isSignal": true; }; "subtitle": { "alias": "subtitle"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "collapsible": { "alias": "collapsible"; "required": false; "isSignal": true; }; "expanded": { "alias": "expanded"; "required": false; "isSignal": true; }; "collapseLabel": { "alias": "collapseLabel"; "required": false; "isSignal": true; }; "expandLabel": { "alias": "expandLabel"; "required": false; "isSignal": true; }; "toggleTestId": { "alias": "toggleTestId"; "required": false; "isSignal": true; }; "testId": { "alias": "testId"; "required": false; "isSignal": true; }; "compact": { "alias": "compact"; "required": false; "isSignal": true; }; }, { "expandedChange": "expandedChange"; }, never, ["[cardActions]", "*"], true, never>;
}
/**
 * Responsive semantic definition grid (`<dl>`) for key-value metadata rows.
 */
export declare class KitKvGridComponent {
    readonly items: import("@angular/core").InputSignal<readonly KitKvItem[]>;
    readonly density: import("@angular/core").InputSignal<"compact" | "comfortable">;
    readonly layout: import("@angular/core").InputSignal<"grid" | "list">;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitKvGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitKvGridComponent, "kit-kv-grid", never, { "items": { "alias": "items"; "required": true; "isSignal": true; }; "density": { "alias": "density"; "required": false; "isSignal": true; }; "layout": { "alias": "layout"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
