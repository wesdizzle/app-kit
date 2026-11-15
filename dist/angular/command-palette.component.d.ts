import { AfterViewInit, ElementRef } from '@angular/core';
import { BottomSheetDragController } from './bottom-sheet-drag.js';
import { IconName } from './icon.component.js';
import * as i0 from "@angular/core";
export interface KitCommandPaletteToken {
    text: string;
    match: boolean;
}
export interface KitCommandPaletteItem {
    id: string;
    title: string;
    subtitle?: string;
    tag?: string;
    category: string;
    icon?: IconName;
    glyph?: string;
    badge?: string;
    badgeTone?: 'default' | 'success' | 'info' | 'warning' | 'danger';
    keywords?: string[];
    removable?: boolean;
    action?: () => void;
}
export interface KitCommandPaletteGroup {
    category: string;
    items: KitCommandPaletteItem[];
}
export interface KitCommandPaletteGroupEntry {
    item: KitCommandPaletteItem;
    flatIndex: number;
}
export interface KitCommandPaletteRenderedGroup {
    category: string;
    entries: KitCommandPaletteGroupEntry[];
}
export declare function tokenizeKitCommandQuery(text: string, query: string): KitCommandPaletteToken[];
export declare function matchesKitCommandTokens(text: string, query: string): boolean;
export declare function filterAndGroupKitCommands(items: readonly KitCommandPaletteItem[], query: string, options?: {
    categoryOrder?: readonly string[];
    filterLocally?: boolean;
}): {
    groups: KitCommandPaletteRenderedGroup[];
    flatItems: KitCommandPaletteItem[];
};
export declare class KitCommandPaletteComponent implements AfterViewInit {
    readonly isOpen: import("@angular/core").InputSignal<boolean>;
    readonly title: import("@angular/core").InputSignal<string>;
    readonly ariaLabel: import("@angular/core").InputSignal<string>;
    readonly headerIcon: import("@angular/core").InputSignal<IconName>;
    readonly shortcutLabel: import("@angular/core").InputSignal<string>;
    readonly placeholder: import("@angular/core").InputSignal<string>;
    readonly emptyText: import("@angular/core").InputSignal<string>;
    readonly items: import("@angular/core").InputSignal<readonly KitCommandPaletteItem[]>;
    readonly categoryOrder: import("@angular/core").InputSignal<readonly string[]>;
    readonly filterLocally: import("@angular/core").InputSignal<boolean>;
    readonly clearableCategories: import("@angular/core").InputSignal<readonly string[]>;
    readonly enableGlobalShortcut: import("@angular/core").InputSignal<boolean>;
    readonly externalDragging: import("@angular/core").InputSignal<boolean>;
    readonly closeOnSelect: import("@angular/core").InputSignal<boolean>;
    readonly closeDurationMs: import("@angular/core").InputSignal<number>;
    readonly openRequested: import("@angular/core").OutputEmitterRef<void>;
    readonly toggleRequested: import("@angular/core").OutputEmitterRef<void>;
    readonly closed: import("@angular/core").OutputEmitterRef<void>;
    readonly queryChange: import("@angular/core").OutputEmitterRef<string>;
    readonly itemSelected: import("@angular/core").OutputEmitterRef<KitCommandPaletteItem>;
    readonly clearCategory: import("@angular/core").OutputEmitterRef<string>;
    readonly removeItem: import("@angular/core").OutputEmitterRef<KitCommandPaletteItem>;
    dialogRef?: ElementRef<HTMLDialogElement>;
    searchInput?: ElementRef<HTMLInputElement>;
    readonly listboxId: string;
    readonly query: import("@angular/core").WritableSignal<string>;
    readonly selectedIndex: import("@angular/core").WritableSignal<number>;
    readonly isEntering: import("@angular/core").WritableSignal<boolean>;
    readonly isClosing: import("@angular/core").WritableSignal<boolean>;
    readonly sheetDrag: BottomSheetDragController;
    readonly isDraggingSheet: import("@angular/core").WritableSignal<boolean>;
    readonly effectiveTransformY: import("@angular/core").Signal<number>;
    private readonly destroyRef;
    private wasOpen;
    private closeTimer;
    private enterTimer;
    private focusTimer;
    private readonly computedModel;
    readonly groupedResults: import("@angular/core").Signal<KitCommandPaletteRenderedGroup[]>;
    readonly flatResults: import("@angular/core").Signal<KitCommandPaletteItem[]>;
    readonly activeOptionId: import("@angular/core").Signal<string | null>;
    constructor();
    ngAfterViewInit(): void;
    syncOpenState(open: boolean, dragging?: boolean): void;
    onGlobalKeydown(event: KeyboardEvent): void;
    optionId(item: KitCommandPaletteItem): string;
    tokenize(text: string): KitCommandPaletteToken[];
    onInputChange(event: Event): void;
    setQuery(value: string): void;
    moveSelection(delta: number): void;
    executeSelected(): void;
    onSelect(item: KitCommandPaletteItem): void;
    onHover(index: number): void;
    onClearCategory(category: string, event: Event): void;
    onRemoveItem(item: KitCommandPaletteItem, event: Event): void;
    onDialogClick(event: MouseEvent): void;
    onDialogCancel(event: Event): void;
    requestClose(): void;
    onDragHandleTouchStart(event: TouchEvent): void;
    onDragHandleTouchMove(event: TouchEvent): void;
    onDragHandleTouchEnd(): void;
    onDragHandleTouchCancel(): void;
    private performCloseTransition;
    private finishClose;
    private openDialog;
    private closeDialog;
    private scrollActiveItemIntoView;
    private lockBodyScroll;
    private restoreBodyScroll;
    private clearTimers;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitCommandPaletteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitCommandPaletteComponent, "kit-command-palette", never, { "isOpen": { "alias": "isOpen"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "headerIcon": { "alias": "headerIcon"; "required": false; "isSignal": true; }; "shortcutLabel": { "alias": "shortcutLabel"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "emptyText": { "alias": "emptyText"; "required": false; "isSignal": true; }; "items": { "alias": "items"; "required": false; "isSignal": true; }; "categoryOrder": { "alias": "categoryOrder"; "required": false; "isSignal": true; }; "filterLocally": { "alias": "filterLocally"; "required": false; "isSignal": true; }; "clearableCategories": { "alias": "clearableCategories"; "required": false; "isSignal": true; }; "enableGlobalShortcut": { "alias": "enableGlobalShortcut"; "required": false; "isSignal": true; }; "externalDragging": { "alias": "externalDragging"; "required": false; "isSignal": true; }; "closeOnSelect": { "alias": "closeOnSelect"; "required": false; "isSignal": true; }; "closeDurationMs": { "alias": "closeDurationMs"; "required": false; "isSignal": true; }; }, { "openRequested": "openRequested"; "toggleRequested": "toggleRequested"; "closed": "closed"; "queryChange": "queryChange"; "itemSelected": "itemSelected"; "clearCategory": "clearCategory"; "removeItem": "removeItem"; }, never, never, true, never>;
}
