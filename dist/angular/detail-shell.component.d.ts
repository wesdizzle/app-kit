import * as i0 from "@angular/core";
export interface KitDetailNavItem {
    label: string;
    sublabel?: string;
    href?: string;
    ariaLabel?: string;
}
export declare function shouldHandleDetailShellKeyNav(event: {
    key: string;
    altKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
    target?: unknown;
}, hasOpenDialog?: boolean): 'prev' | 'next' | null;
/**
 * Reusable detail-page scaffold with sticky sub-navigation, back link/button,
 * optional Previous/Next item pager with keyboard navigation, hero banner slot,
 * primary content slot, and optional desktop sidebar slot.
 */
export declare class KitDetailShellComponent {
    readonly backLabel: import("@angular/core").InputSignal<string>;
    readonly backHref: import("@angular/core").InputSignal<string | null>;
    readonly interceptBackClick: import("@angular/core").InputSignal<boolean>;
    readonly interceptPagerClick: import("@angular/core").InputSignal<boolean>;
    readonly title: import("@angular/core").InputSignal<string | null>;
    readonly code: import("@angular/core").InputSignal<string | null>;
    readonly prevItem: import("@angular/core").InputSignal<KitDetailNavItem | null>;
    readonly nextItem: import("@angular/core").InputSignal<KitDetailNavItem | null>;
    readonly enableKeyboardNav: import("@angular/core").InputSignal<boolean>;
    readonly maxWidth: import("@angular/core").InputSignal<string>;
    readonly backClicked: import("@angular/core").OutputEmitterRef<MouseEvent>;
    readonly prevClicked: import("@angular/core").OutputEmitterRef<MouseEvent | KeyboardEvent>;
    readonly nextClicked: import("@angular/core").OutputEmitterRef<MouseEvent | KeyboardEvent>;
    onBackClick(event: MouseEvent): void;
    onPagerClick(event: MouseEvent, direction: 'prev' | 'next'): void;
    onDocumentKeydown(event: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitDetailShellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitDetailShellComponent, "kit-detail-shell", never, { "backLabel": { "alias": "backLabel"; "required": false; "isSignal": true; }; "backHref": { "alias": "backHref"; "required": false; "isSignal": true; }; "interceptBackClick": { "alias": "interceptBackClick"; "required": false; "isSignal": true; }; "interceptPagerClick": { "alias": "interceptPagerClick"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "code": { "alias": "code"; "required": false; "isSignal": true; }; "prevItem": { "alias": "prevItem"; "required": false; "isSignal": true; }; "nextItem": { "alias": "nextItem"; "required": false; "isSignal": true; }; "enableKeyboardNav": { "alias": "enableKeyboardNav"; "required": false; "isSignal": true; }; "maxWidth": { "alias": "maxWidth"; "required": false; "isSignal": true; }; }, { "backClicked": "backClicked"; "prevClicked": "prevClicked"; "nextClicked": "nextClicked"; }, never, ["[detailActions]", "[detailHero]", "*", "[detailSidebar]"], true, never>;
}
