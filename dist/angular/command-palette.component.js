import { ChangeDetectionStrategy, Component, DestroyRef, HostListener, ViewChild, ViewEncapsulation, computed, effect, inject, input, output, signal, } from '@angular/core';
import { BottomSheetDragController } from './bottom-sheet-drag.js';
import { canAnimateKitDialogExit } from './dialog-sheet.component.js';
import { KitIconComponent } from './icon.component.js';
import * as i0 from "@angular/core";
const _c0 = ["dialogEl"];
const _c1 = ["searchInput"];
const _forTrack0 = ($index, $item) => $item.category;
const _forTrack1 = ($index, $item) => $item.item.id;
function KitCommandPaletteComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.shortcutLabel());
} }
function KitCommandPaletteComponent_Conditional_18_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate2(" ", ctx_r0.emptyText(), " \"", ctx_r0.query(), "\" ");
} }
function KitCommandPaletteComponent_Conditional_18_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.emptyText(), " ");
} }
function KitCommandPaletteComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, KitCommandPaletteComponent_Conditional_18_Conditional_0_Template, 1, 2)(1, KitCommandPaletteComponent_Conditional_18_Conditional_1_Template, 1, 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r0.query() ? 0 : 1);
} }
function KitCommandPaletteComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.flatResults().length, " results available ");
} }
function KitCommandPaletteComponent_Conditional_21_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate2(" ", ctx_r0.emptyText(), " \"", ctx_r0.query(), "\" ");
} }
function KitCommandPaletteComponent_Conditional_21_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.emptyText(), " ");
} }
function KitCommandPaletteComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵelement(1, "kit-icon", 21);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵconditionalCreate(3, KitCommandPaletteComponent_Conditional_21_Conditional_3_Template, 1, 2)(4, KitCommandPaletteComponent_Conditional_21_Conditional_4_Template, 1, 1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", 32);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.query() ? 3 : 4);
} }
function KitCommandPaletteComponent_Conditional_22_For_1_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 27);
    i0.ɵɵlistener("click", function KitCommandPaletteComponent_Conditional_22_For_1_Conditional_4_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r2); const group_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onClearCategory(group_r3.category, $event)); });
    i0.ɵɵtext(1, " Clear ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵattribute("aria-label", "Clear " + group_r3.category);
} }
function KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "kit-icon", 8);
} if (rf & 2) {
    const entry_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("name", entry_r5.item.icon)("size", 18);
} }
function KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 30);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entry_r5.item.glyph);
} }
function KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "kit-icon", 31);
} if (rf & 2) {
    i0.ɵɵproperty("size", 16);
} }
function KitCommandPaletteComponent_Conditional_22_For_1_For_6_For_9_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mark", 39);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const chunk_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(chunk_r6.text);
} }
function KitCommandPaletteComponent_Conditional_22_For_1_For_6_For_9_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const chunk_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", chunk_r6.text, " ");
} }
function KitCommandPaletteComponent_Conditional_22_For_1_For_6_For_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, KitCommandPaletteComponent_Conditional_22_For_1_For_6_For_9_Conditional_0_Template, 2, 1, "mark", 39)(1, KitCommandPaletteComponent_Conditional_22_For_1_For_6_For_9_Conditional_1_Template, 1, 1);
} if (rf & 2) {
    const chunk_r6 = ctx.$implicit;
    i0.ɵɵconditional(chunk_r6.match ? 0 : 1);
} }
function KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entry_r5.item.tag);
} }
function KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_11_For_2_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mark", 39);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const chunk_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(chunk_r7.text);
} }
function KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_11_For_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const chunk_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", chunk_r7.text, " ");
} }
function KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_11_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_11_For_2_Conditional_0_Template, 2, 1, "mark", 39)(1, KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_11_For_2_Conditional_1_Template, 1, 1);
} if (rf & 2) {
    const chunk_r7 = ctx.$implicit;
    i0.ɵɵconditional(chunk_r7.match ? 0 : 1);
} }
function KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 36);
    i0.ɵɵrepeaterCreate(1, KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_11_For_2_Template, 2, 1, null, null, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.tokenize(entry_r5.item.subtitle));
} }
function KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 40);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassProp("tone-success", entry_r5.item.badgeTone === "success")("tone-info", entry_r5.item.badgeTone === "info")("tone-warning", entry_r5.item.badgeTone === "warning")("tone-danger", entry_r5.item.badgeTone === "danger");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", entry_r5.item.badge, " ");
} }
function KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 41);
    i0.ɵɵlistener("click", function KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_13_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r8); const entry_r5 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.onRemoveItem(entry_r5.item, $event)); });
    i0.ɵɵelement(1, "kit-icon", 42);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵattribute("aria-label", "Remove " + entry_r5.item.title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", 12);
} }
function KitCommandPaletteComponent_Conditional_22_For_1_For_6_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 28);
    i0.ɵɵlistener("click", function KitCommandPaletteComponent_Conditional_22_For_1_For_6_Template_div_click_0_listener() { const entry_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.onSelect(entry_r5.item)); })("mouseenter", function KitCommandPaletteComponent_Conditional_22_For_1_For_6_Template_div_mouseenter_0_listener() { const entry_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.onHover(entry_r5.flatIndex)); });
    i0.ɵɵelementStart(1, "div", 29);
    i0.ɵɵconditionalCreate(2, KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_2_Template, 1, 2, "kit-icon", 8)(3, KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_3_Template, 2, 1, "span", 30)(4, KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_4_Template, 1, 1, "kit-icon", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 32)(6, "div", 33)(7, "span", 34);
    i0.ɵɵrepeaterCreate(8, KitCommandPaletteComponent_Conditional_22_For_1_For_6_For_9_Template, 2, 1, null, null, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(10, KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_10_Template, 2, 1, "span", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(11, KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_11_Template, 3, 0, "span", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(12, KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_12_Template, 2, 9, "span", 37);
    i0.ɵɵconditionalCreate(13, KitCommandPaletteComponent_Conditional_22_For_1_For_6_Conditional_13_Template, 2, 2, "button", 38);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r5 = ctx.$implicit;
    const group_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", ctx_r0.selectedIndex() === entry_r5.flatIndex);
    i0.ɵɵproperty("id", ctx_r0.optionId(entry_r5.item));
    i0.ɵɵattribute("aria-selected", ctx_r0.selectedIndex() === entry_r5.flatIndex)("data-palette-selected", ctx_r0.selectedIndex() === entry_r5.flatIndex ? "true" : null);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(entry_r5.item.icon ? 2 : entry_r5.item.glyph ? 3 : 4);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r0.tokenize(entry_r5.item.title));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(entry_r5.item.tag ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(entry_r5.item.subtitle ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(entry_r5.item.badge ? 12 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(entry_r5.item.removable || ctx_r0.clearableCategories().includes(group_r3.category) ? 13 : -1);
} }
function KitCommandPaletteComponent_Conditional_22_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22)(1, "div", 23)(2, "span", 24);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, KitCommandPaletteComponent_Conditional_22_For_1_Conditional_4_Template, 2, 1, "button", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(5, KitCommandPaletteComponent_Conditional_22_For_1_For_6_Template, 14, 10, "div", 26, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("aria-label", group_r3.category);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(group_r3.category);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.clearableCategories().includes(group_r3.category) ? 4 : -1);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(group_r3.entries);
} }
function KitCommandPaletteComponent_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, KitCommandPaletteComponent_Conditional_22_For_1_Template, 7, 3, "div", 22, _forTrack0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵrepeater(ctx_r0.groupedResults());
} }
export function tokenizeKitCommandQuery(text, query) {
    if (!text)
        return [];
    const rawQuery = (query || '').trim().toLowerCase();
    if (!rawQuery) {
        return [{ text, match: false }];
    }
    const terms = rawQuery.split(/\s+/).filter(Boolean);
    if (terms.length === 0) {
        return [{ text, match: false }];
    }
    const lower = text.toLowerCase();
    const intervals = [];
    for (const term of terms) {
        let pos = 0;
        while (pos < lower.length) {
            const idx = lower.indexOf(term, pos);
            if (idx === -1)
                break;
            intervals.push([idx, idx + term.length]);
            pos = idx + Math.max(1, term.length);
        }
    }
    if (intervals.length === 0) {
        return [{ text, match: false }];
    }
    intervals.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
    const merged = [];
    let cur = [intervals[0][0], intervals[0][1]];
    for (let i = 1; i < intervals.length; i++) {
        const next = intervals[i];
        if (next[0] <= cur[1]) {
            cur[1] = Math.max(cur[1], next[1]);
        }
        else {
            merged.push(cur);
            cur = [next[0], next[1]];
        }
    }
    merged.push(cur);
    const tokens = [];
    let lastIndex = 0;
    for (const [start, end] of merged) {
        if (start > lastIndex) {
            tokens.push({ text: text.slice(lastIndex, start), match: false });
        }
        tokens.push({ text: text.slice(start, end), match: true });
        lastIndex = end;
    }
    if (lastIndex < text.length) {
        tokens.push({ text: text.slice(lastIndex), match: false });
    }
    return tokens;
}
export function matchesKitCommandTokens(text, query) {
    const raw = (query || '').trim().toLowerCase();
    if (!raw)
        return true;
    const terms = raw.split(/\s+/).filter(Boolean);
    if (terms.length === 0)
        return true;
    const target = (text || '').toLowerCase();
    return terms.every((term) => target.includes(term));
}
export function filterAndGroupKitCommands(items, query, options) {
    const filterLocally = options?.filterLocally ?? true;
    const trimmedQuery = (query || '').trim();
    const filtered = filterLocally && trimmedQuery.length > 0
        ? items.filter((item) => {
            const haystack = [
                item.title,
                item.subtitle ?? '',
                item.tag ?? '',
                item.category,
                ...(item.keywords ?? []),
            ].join(' ');
            return matchesKitCommandTokens(haystack, trimmedQuery);
        })
        : [...items];
    const buckets = new Map();
    for (const cat of options?.categoryOrder ?? []) {
        buckets.set(cat, []);
    }
    for (const item of filtered) {
        let bucket = buckets.get(item.category);
        if (!bucket) {
            bucket = [];
            buckets.set(item.category, bucket);
        }
        bucket.push(item);
    }
    const groups = [];
    const flatItems = [];
    let flatIndex = 0;
    for (const [category, bucket] of buckets.entries()) {
        if (bucket.length === 0)
            continue;
        const entries = bucket.map((item) => {
            flatItems.push(item);
            return { item, flatIndex: flatIndex++ };
        });
        groups.push({ category, entries });
    }
    return { groups, flatItems };
}
let nextPaletteInstanceId = 0;
export class KitCommandPaletteComponent {
    constructor() {
        this.isOpen = input(false, ...(ngDevMode ? [{ debugName: "isOpen" }] : /* istanbul ignore next */ []));
        this.title = input('Command Palette', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
        this.ariaLabel = input('', ...(ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
        this.headerIcon = input('sparkles', ...(ngDevMode ? [{ debugName: "headerIcon" }] : /* istanbul ignore next */ []));
        this.shortcutLabel = input('Ctrl + K', ...(ngDevMode ? [{ debugName: "shortcutLabel" }] : /* istanbul ignore next */ []));
        this.placeholder = input('Search commands...', ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
        this.emptyText = input('No results found', ...(ngDevMode ? [{ debugName: "emptyText" }] : /* istanbul ignore next */ []));
        this.items = input([], ...(ngDevMode ? [{ debugName: "items" }] : /* istanbul ignore next */ []));
        this.categoryOrder = input([], ...(ngDevMode ? [{ debugName: "categoryOrder" }] : /* istanbul ignore next */ []));
        this.filterLocally = input(true, ...(ngDevMode ? [{ debugName: "filterLocally" }] : /* istanbul ignore next */ []));
        this.clearableCategories = input([
            'Recent Searches',
        ], ...(ngDevMode ? [{ debugName: "clearableCategories" }] : /* istanbul ignore next */ []));
        this.enableGlobalShortcut = input(true, ...(ngDevMode ? [{ debugName: "enableGlobalShortcut" }] : /* istanbul ignore next */ []));
        this.externalDragging = input(false, ...(ngDevMode ? [{ debugName: "externalDragging" }] : /* istanbul ignore next */ []));
        this.closeOnSelect = input(true, ...(ngDevMode ? [{ debugName: "closeOnSelect" }] : /* istanbul ignore next */ []));
        this.closeDurationMs = input(220, ...(ngDevMode ? [{ debugName: "closeDurationMs" }] : /* istanbul ignore next */ []));
        this.openRequested = output();
        this.toggleRequested = output();
        this.closed = output();
        this.queryChange = output();
        this.itemSelected = output();
        this.clearCategory = output();
        this.removeItem = output();
        this.listboxId = `kit-palette-list-${++nextPaletteInstanceId}`;
        this.query = signal('', ...(ngDevMode ? [{ debugName: "query" }] : /* istanbul ignore next */ []));
        this.selectedIndex = signal(0, ...(ngDevMode ? [{ debugName: "selectedIndex" }] : /* istanbul ignore next */ []));
        this.isEntering = signal(false, ...(ngDevMode ? [{ debugName: "isEntering" }] : /* istanbul ignore next */ []));
        this.isClosing = signal(false, ...(ngDevMode ? [{ debugName: "isClosing" }] : /* istanbul ignore next */ []));
        this.sheetDrag = new BottomSheetDragController();
        this.isDraggingSheet = this.sheetDrag.isDragging;
        this.effectiveTransformY = this.sheetDrag.effectiveTransformY;
        this.destroyRef = inject(DestroyRef);
        this.wasOpen = false;
        this.closeTimer = null;
        this.enterTimer = null;
        this.focusTimer = null;
        this.computedModel = computed(() => filterAndGroupKitCommands(this.items(), this.query(), {
            categoryOrder: this.categoryOrder(),
            filterLocally: this.filterLocally(),
        }), ...(ngDevMode ? [{ debugName: "computedModel" }] : /* istanbul ignore next */ []));
        this.groupedResults = computed(() => this.computedModel().groups, ...(ngDevMode ? [{ debugName: "groupedResults" }] : /* istanbul ignore next */ []));
        this.flatResults = computed(() => this.computedModel().flatItems, ...(ngDevMode ? [{ debugName: "flatResults" }] : /* istanbul ignore next */ []));
        this.activeOptionId = computed(() => {
            const flat = this.flatResults();
            const idx = this.selectedIndex();
            if (flat.length === 0 || idx < 0 || idx >= flat.length) {
                return null;
            }
            return this.optionId(flat[idx]);
        }, ...(ngDevMode ? [{ debugName: "activeOptionId" }] : /* istanbul ignore next */ []));
        try {
            effect(() => {
                this.syncOpenState(this.isOpen(), this.externalDragging());
            });
        }
        catch {
            // Allow plain unit-test instantiation without an Angular effect scheduler
        }
        this.destroyRef.onDestroy(() => {
            this.clearTimers();
            this.restoreBodyScroll();
        });
    }
    ngAfterViewInit() {
        if (this.isOpen()) {
            this.syncOpenState(true, this.externalDragging());
        }
    }
    syncOpenState(open, dragging = false) {
        if (open && !this.wasOpen) {
            this.clearTimers();
            this.wasOpen = true;
            this.isClosing.set(false);
            this.sheetDrag.reset();
            this.query.set('');
            this.queryChange.emit('');
            this.selectedIndex.set(0);
            this.lockBodyScroll();
            this.openDialog();
            if (!dragging) {
                this.isEntering.set(true);
                this.enterTimer = setTimeout(() => {
                    this.enterTimer = null;
                    this.isEntering.set(false);
                }, 280);
                this.focusTimer = setTimeout(() => {
                    this.focusTimer = null;
                    this.searchInput?.nativeElement?.focus();
                }, 50);
            }
        }
        else if (open && this.wasOpen && !dragging) {
            this.focusTimer = setTimeout(() => {
                this.focusTimer = null;
                this.searchInput?.nativeElement?.focus();
            }, 50);
        }
        else if (!open && this.wasOpen) {
            this.wasOpen = false;
            this.isEntering.set(false);
            if (!this.isClosing()) {
                this.performCloseTransition(false);
            }
        }
    }
    onGlobalKeydown(event) {
        const key = (event.key || '').toLowerCase();
        if (this.enableGlobalShortcut() &&
            (event.ctrlKey || event.metaKey) &&
            key === 'k') {
            event.preventDefault();
            if (this.isOpen()) {
                this.requestClose();
            }
            else {
                this.openRequested.emit();
            }
            this.toggleRequested.emit();
            return;
        }
        if (!this.isOpen())
            return;
        if (event.key === 'Escape') {
            event.preventDefault();
            this.requestClose();
        }
        else if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.moveSelection(1);
        }
        else if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.moveSelection(-1);
        }
        else if (event.key === 'Enter') {
            event.preventDefault();
            this.executeSelected();
        }
    }
    optionId(item) {
        return `${this.listboxId}-opt-${item.id}`;
    }
    tokenize(text) {
        return tokenizeKitCommandQuery(text, this.query());
    }
    onInputChange(event) {
        const target = event.target;
        this.setQuery(target?.value ?? '');
    }
    setQuery(value) {
        this.query.set(value);
        this.selectedIndex.set(0);
        this.queryChange.emit(value);
    }
    moveSelection(delta) {
        const total = this.flatResults().length;
        if (total === 0)
            return;
        this.selectedIndex.update((i) => (i + delta + total) % total);
        this.scrollActiveItemIntoView();
    }
    executeSelected() {
        const flat = this.flatResults();
        const idx = this.selectedIndex();
        if (flat[idx]) {
            this.onSelect(flat[idx]);
        }
    }
    onSelect(item) {
        this.itemSelected.emit(item);
        item.action?.();
        if (this.closeOnSelect() && this.isOpen() && !this.isClosing()) {
            this.requestClose();
        }
    }
    onHover(index) {
        this.selectedIndex.set(index);
    }
    onClearCategory(category, event) {
        event.stopPropagation();
        this.clearCategory.emit(category);
    }
    onRemoveItem(item, event) {
        event.stopPropagation();
        this.removeItem.emit(item);
    }
    onDialogClick(event) {
        const dialog = this.dialogRef?.nativeElement;
        if (!dialog)
            return;
        const rect = dialog.getBoundingClientRect();
        const isInDialog = rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;
        if (!isInDialog) {
            this.requestClose();
        }
    }
    onDialogCancel(event) {
        event.preventDefault();
        this.requestClose();
    }
    requestClose() {
        if (this.isClosing())
            return;
        this.performCloseTransition(true);
    }
    onDragHandleTouchStart(event) {
        this.sheetDrag.onTouchStart(event);
    }
    onDragHandleTouchMove(event) {
        this.sheetDrag.onTouchMove(event);
    }
    onDragHandleTouchEnd() {
        this.sheetDrag.onTouchEnd(() => {
            this.requestClose();
        });
    }
    onDragHandleTouchCancel() {
        this.sheetDrag.reset();
    }
    performCloseTransition(emitClosed) {
        const dialog = this.dialogRef?.nativeElement;
        if (canAnimateKitDialogExit(dialog)) {
            this.clearTimers();
            this.isClosing.set(true);
            this.closeTimer = setTimeout(() => {
                this.closeTimer = null;
                this.finishClose(emitClosed);
            }, this.closeDurationMs());
            return;
        }
        this.finishClose(emitClosed);
    }
    finishClose(emitClosed) {
        this.wasOpen = false;
        this.isEntering.set(false);
        this.isClosing.set(false);
        this.sheetDrag.reset();
        this.restoreBodyScroll();
        this.closeDialog();
        if (emitClosed) {
            this.closed.emit();
        }
    }
    openDialog() {
        const dialog = this.dialogRef?.nativeElement;
        if (!dialog)
            return;
        if (!dialog.open) {
            if (typeof dialog.showModal === 'function') {
                try {
                    dialog.showModal();
                }
                catch {
                    dialog.setAttribute('open', '');
                }
            }
            else {
                dialog.setAttribute('open', '');
            }
        }
    }
    closeDialog() {
        const dialog = this.dialogRef?.nativeElement;
        if (!dialog)
            return;
        if (dialog.open) {
            if (typeof dialog.close === 'function') {
                try {
                    dialog.close();
                }
                catch {
                    dialog.removeAttribute('open');
                }
            }
            else {
                dialog.removeAttribute('open');
            }
        }
    }
    scrollActiveItemIntoView() {
        const dialog = this.dialogRef?.nativeElement;
        if (!dialog)
            return;
        setTimeout(() => {
            const activeEl = dialog.querySelector('[data-palette-selected="true"]');
            if (activeEl && typeof activeEl.scrollIntoView === 'function') {
                activeEl.scrollIntoView({ block: 'nearest' });
            }
        }, 0);
    }
    lockBodyScroll() {
        if (typeof document !== 'undefined' && document.body) {
            document.body.style.overflow = 'hidden';
        }
    }
    restoreBodyScroll() {
        if (typeof document !== 'undefined' && document.body) {
            document.body.style.overflow = '';
        }
    }
    clearTimers() {
        if (this.closeTimer !== null) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
        if (this.enterTimer !== null) {
            clearTimeout(this.enterTimer);
            this.enterTimer = null;
        }
        if (this.focusTimer !== null) {
            clearTimeout(this.focusTimer);
            this.focusTimer = null;
        }
    }
    static { this.ɵfac = function KitCommandPaletteComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitCommandPaletteComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitCommandPaletteComponent, selectors: [["kit-command-palette"]], viewQuery: function KitCommandPaletteComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5)(_c1, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dialogRef = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.searchInput = _t.first);
        } }, hostBindings: function KitCommandPaletteComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keydown", function KitCommandPaletteComponent_keydown_HostBindingHandler($event) { return ctx.onGlobalKeydown($event); }, i0.ɵɵresolveWindow);
        } }, inputs: { isOpen: [1, "isOpen"], title: [1, "title"], ariaLabel: [1, "ariaLabel"], headerIcon: [1, "headerIcon"], shortcutLabel: [1, "shortcutLabel"], placeholder: [1, "placeholder"], emptyText: [1, "emptyText"], items: [1, "items"], categoryOrder: [1, "categoryOrder"], filterLocally: [1, "filterLocally"], clearableCategories: [1, "clearableCategories"], enableGlobalShortcut: [1, "enableGlobalShortcut"], externalDragging: [1, "externalDragging"], closeOnSelect: [1, "closeOnSelect"], closeDurationMs: [1, "closeDurationMs"] }, outputs: { openRequested: "openRequested", toggleRequested: "toggleRequested", closed: "closed", queryChange: "queryChange", itemSelected: "itemSelected", clearCategory: "clearCategory", removeItem: "removeItem" }, decls: 41, vars: 23, consts: [["dialogEl", ""], ["searchInput", ""], [1, "kit-command-palette", "m3-surface-container-high", 3, "click", "cancel"], [1, "kit-palette-drag-area", "sheet-drag-area", 3, "touchstart", "touchmove", "touchend", "touchcancel"], [1, "kit-palette-drag-handle-bar"], [1, "kit-palette-drag-handle"], [1, "kit-palette-header"], [1, "kit-palette-title-group"], [3, "name", "size"], [1, "kit-palette-title"], [1, "kit-palette-shortcut-badge"], [1, "kit-palette-search-wrapper"], ["name", "search", "className", "kit-palette-search-icon", 3, "size"], ["type", "search", "role", "combobox", "aria-autocomplete", "list", "aria-haspopup", "listbox", "inputmode", "search", "enterkeyhint", "go", "autocomplete", "off", "autocorrect", "off", "autocapitalize", "none", "spellcheck", "false", 1, "kit-palette-input", 3, "input", "value", "placeholder"], ["type", "button", "aria-label", "Close command palette", 1, "kit-palette-kbd", "kit-palette-esc-badge", 3, "click"], ["role", "status", "aria-live", "polite", "aria-atomic", "true", 1, "sr-only"], ["role", "listbox", 1, "kit-palette-results", 3, "id"], [1, "kit-palette-empty-state"], [1, "kit-palette-footer"], [1, "kit-palette-hint"], [1, "kit-palette-kbd", "mini"], ["name", "inbox-empty", 3, "size"], ["role", "group", 1, "kit-palette-group"], [1, "kit-palette-group-header"], ["aria-hidden", "true", 1, "kit-palette-group-title"], ["type", "button", 1, "kit-palette-clear-btn"], ["role", "option", 1, "kit-palette-item", 3, "id", "selected"], ["type", "button", 1, "kit-palette-clear-btn", 3, "click"], ["role", "option", 1, "kit-palette-item", 3, "click", "mouseenter", "id"], [1, "kit-palette-item-icon"], [1, "kit-palette-item-glyph"], ["name", "search", 3, "size"], [1, "kit-palette-item-info"], [1, "kit-palette-title-row"], [1, "kit-palette-item-title"], [1, "kit-palette-region-badge"], [1, "kit-palette-item-subtitle"], [1, "kit-palette-item-badge", 3, "tone-success", "tone-info", "tone-warning", "tone-danger"], ["type", "button", "title", "Remove", 1, "kit-palette-item-remove-btn"], [1, "kit-palette-mark"], [1, "kit-palette-item-badge"], ["type", "button", "title", "Remove", 1, "kit-palette-item-remove-btn", 3, "click"], ["name", "close", 3, "size"]], template: function KitCommandPaletteComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "dialog", 2, 0);
            i0.ɵɵlistener("click", function KitCommandPaletteComponent_Template_dialog_click_0_listener($event) { return ctx.onDialogClick($event); })("cancel", function KitCommandPaletteComponent_Template_dialog_cancel_0_listener($event) { return ctx.onDialogCancel($event); });
            i0.ɵɵelementStart(2, "div", 3);
            i0.ɵɵlistener("touchstart", function KitCommandPaletteComponent_Template_div_touchstart_2_listener($event) { return ctx.onDragHandleTouchStart($event); })("touchmove", function KitCommandPaletteComponent_Template_div_touchmove_2_listener($event) { return ctx.onDragHandleTouchMove($event); })("touchend", function KitCommandPaletteComponent_Template_div_touchend_2_listener() { return ctx.onDragHandleTouchEnd(); })("touchcancel", function KitCommandPaletteComponent_Template_div_touchcancel_2_listener() { return ctx.onDragHandleTouchCancel(); });
            i0.ɵɵelementStart(3, "div", 4);
            i0.ɵɵelement(4, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "header", 6)(6, "div", 7);
            i0.ɵɵelement(7, "kit-icon", 8);
            i0.ɵɵelementStart(8, "h2", 9);
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(10, KitCommandPaletteComponent_Conditional_10_Template, 2, 1, "span", 10);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "div", 11);
            i0.ɵɵelement(12, "kit-icon", 12);
            i0.ɵɵelementStart(13, "input", 13, 1);
            i0.ɵɵlistener("input", function KitCommandPaletteComponent_Template_input_input_13_listener($event) { return ctx.onInputChange($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "button", 14);
            i0.ɵɵlistener("click", function KitCommandPaletteComponent_Template_button_click_15_listener() { return ctx.requestClose(); });
            i0.ɵɵtext(16, " ESC ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "div", 15);
            i0.ɵɵconditionalCreate(18, KitCommandPaletteComponent_Conditional_18_Template, 2, 1)(19, KitCommandPaletteComponent_Conditional_19_Template, 1, 1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 16);
            i0.ɵɵconditionalCreate(21, KitCommandPaletteComponent_Conditional_21_Template, 5, 2, "div", 17)(22, KitCommandPaletteComponent_Conditional_22_Template, 2, 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "footer", 18)(24, "div", 19)(25, "kbd", 20);
            i0.ɵɵtext(26, "\u2191");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "kbd", 20);
            i0.ɵɵtext(28, "\u2193");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "span");
            i0.ɵɵtext(30, "Navigate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "div", 19)(32, "kbd", 20);
            i0.ɵɵtext(33, "\u21B5");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "span");
            i0.ɵɵtext(35, "Select");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "div", 19)(37, "kbd", 20);
            i0.ɵɵtext(38, "esc");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "span");
            i0.ɵɵtext(40, "Close");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵstyleProp("transform", !ctx.isClosing() && ctx.effectiveTransformY() !== 0 ? "translateY(" + ctx.effectiveTransformY() + "px)" : null);
            i0.ɵɵclassProp("dragging", ctx.isDraggingSheet() || ctx.externalDragging())("slide-up-enter", ctx.isEntering())("closing", ctx.isClosing());
            i0.ɵɵattribute("aria-label", ctx.ariaLabel() || ctx.title());
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("name", ctx.headerIcon())("size", 15);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.title());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.shortcutLabel() ? 10 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("size", 20);
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.query())("placeholder", ctx.placeholder());
            i0.ɵɵattribute("aria-expanded", ctx.isOpen())("aria-controls", ctx.listboxId)("aria-activedescendant", ctx.activeOptionId());
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.flatResults().length === 0 ? 18 : 19);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("id", ctx.listboxId);
            i0.ɵɵattribute("aria-label", ctx.ariaLabel() || ctx.title());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.flatResults().length === 0 ? 21 : 22);
        } }, dependencies: [KitIconComponent], styles: ["\n      .kit-command-palette {\n        margin: var(--spacing-48, 48px) auto auto auto;\n        padding: 0;\n        width: calc(100% - var(--spacing-32, 32px));\n        max-width: 640px;\n        max-height: calc(85vh - 48px);\n        background: var(--kit-surface-container-high);\n        border: 1px solid var(--kit-outline-variant);\n        border-radius: var(--kit-radius-md, 16px);\n        box-shadow:\n          0 24px 64px rgba(0, 0, 0, 0.5),\n          0 0 0 1px rgba(255, 255, 255, 0.05);\n        overflow: hidden;\n        color: var(--kit-on-surface);\n      }\n\n      .kit-command-palette:not([open]) {\n        display: none;\n      }\n\n      .kit-command-palette[open] {\n        display: flex;\n        flex-direction: column;\n      }\n\n      .kit-command-palette::backdrop {\n        background: rgba(0, 0, 0, 0.65);\n        backdrop-filter: blur(16px) contrast(95%) brightness(85%);\n        -webkit-backdrop-filter: blur(16px) contrast(95%) brightness(85%);\n        overscroll-behavior: contain;\n        transition: opacity var(--kit-duration-medium, 220ms)\n          var(--kit-ease-standard, cubic-bezier(0.2, 0, 0, 1));\n      }\n\n      .kit-command-palette.slide-up-enter {\n        animation: kitPaletteDesktopIn var(--kit-duration-medium, 220ms)\n          var(--kit-ease-emphasized, cubic-bezier(0.16, 1, 0.3, 1)) forwards;\n      }\n\n      @keyframes kitPaletteDesktopIn {\n        from {\n          opacity: 0;\n          transform: scale(0.96) translateY(-8px);\n        }\n        to {\n          opacity: 1;\n          transform: scale(1) translateY(0);\n        }\n      }\n\n      .kit-command-palette.closing {\n        opacity: 0;\n        transform: scale(0.96) translateY(8px);\n        transition:\n          opacity var(--kit-duration-medium, 220ms)\n            var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)),\n          transform var(--kit-duration-medium, 220ms)\n            var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1));\n      }\n\n      .kit-command-palette.closing::backdrop {\n        opacity: 0;\n      }\n\n      .kit-palette-drag-area {\n        cursor: grab;\n        touch-action: none;\n      }\n\n      .kit-palette-drag-handle-bar {\n        display: none;\n      }\n\n      .kit-palette-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        padding: var(--spacing-12, 12px) var(--spacing-20, 20px);\n        border-bottom: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container);\n      }\n\n      .kit-palette-title-group {\n        display: flex;\n        align-items: center;\n        gap: var(--spacing-8, 8px);\n        color: var(--kit-primary);\n      }\n\n      .kit-palette-title {\n        font-size: 0.8125rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.06em;\n        margin: 0;\n        color: var(--kit-on-surface);\n      }\n\n      .kit-palette-shortcut-badge {\n        font-family: inherit;\n        font-size: 0.6875rem;\n        font-weight: 600;\n        padding: 2px 7px;\n        border-radius: 4px;\n        background: var(--kit-surface-container-highest);\n        color: var(--kit-on-surface-variant);\n        border: 1px solid var(--kit-outline-variant);\n      }\n\n      .kit-palette-search-wrapper {\n        display: flex;\n        align-items: center;\n        gap: var(--spacing-12, 12px);\n        padding: var(--spacing-16, 16px) var(--spacing-20, 20px);\n        border-bottom: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container-high);\n      }\n\n      .kit-palette-search-icon {\n        color: var(--kit-on-surface-variant);\n        flex-shrink: 0;\n      }\n\n      .kit-palette-input {\n        flex: 1;\n        background: transparent;\n        border: none;\n        outline: none;\n        font-size: 1.05rem;\n        color: var(--kit-on-surface);\n        font-family: inherit;\n      }\n\n      .kit-palette-input::-webkit-search-cancel-button,\n      .kit-palette-input::-webkit-search-decoration {\n        -webkit-appearance: none;\n        appearance: none;\n      }\n\n      .kit-palette-input::placeholder {\n        color: var(--kit-on-surface-variant);\n        opacity: 0.7;\n      }\n\n      .kit-command-palette .sr-only {\n        position: absolute;\n        width: 1px;\n        height: 1px;\n        padding: 0;\n        margin: -1px;\n        overflow: hidden;\n        clip: rect(0, 0, 0, 0);\n        white-space: nowrap;\n        border-width: 0;\n      }\n\n      .kit-palette-kbd {\n        font-family: inherit;\n        font-size: 0.75rem;\n        font-weight: 600;\n        padding: 3px 6px;\n        border-radius: 4px;\n        background: var(--kit-surface-container-highest);\n        color: var(--kit-on-surface-variant);\n        border: 1px solid var(--kit-outline-variant);\n        line-height: 1;\n      }\n\n      .kit-palette-kbd.mini {\n        padding: 2px 5px;\n        font-size: 0.7rem;\n      }\n\n      .kit-palette-esc-badge {\n        cursor: pointer;\n        transition:\n          background-color var(--kit-duration-fast, 150ms) ease,\n          color var(--kit-duration-fast, 150ms) ease;\n      }\n\n      .kit-palette-esc-badge:hover {\n        background: var(--kit-surface-container);\n        color: var(--kit-on-surface);\n      }\n\n      .kit-palette-results {\n        flex: 1;\n        overflow-y: auto;\n        padding: var(--spacing-8, 8px) 0;\n        overscroll-behavior: contain;\n      }\n\n      .kit-palette-group {\n        margin-bottom: var(--spacing-8, 8px);\n      }\n\n      .kit-palette-group-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        padding: var(--spacing-8, 8px) var(--spacing-20, 20px)\n          var(--spacing-4, 4px);\n      }\n\n      .kit-palette-group-title {\n        padding: 0;\n        font-size: 0.75rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.05em;\n        color: var(--kit-primary);\n      }\n\n      .kit-palette-clear-btn {\n        background: transparent;\n        border: none;\n        font-family: inherit;\n        font-size: 0.7rem;\n        font-weight: 600;\n        color: var(--kit-on-surface-variant);\n        cursor: pointer;\n        padding: 2px 6px;\n        border-radius: 4px;\n        line-height: 1;\n        transition:\n          color var(--kit-duration-fast, 150ms) ease,\n          background-color var(--kit-duration-fast, 150ms) ease;\n      }\n\n      .kit-palette-clear-btn:hover {\n        color: var(--m3-error, var(--kit-danger, #ef4444));\n        background: var(--kit-surface-container-highest);\n      }\n\n      .kit-palette-item {\n        position: relative;\n        display: flex;\n        align-items: center;\n        gap: var(--spacing-12, 12px);\n        padding: var(--spacing-8, 8px) var(--spacing-20, 20px);\n        margin: 2px var(--spacing-8, 8px);\n        border-radius: var(--kit-radius-xs, 8px);\n        cursor: pointer;\n        transition:\n          background-color var(--kit-duration-fast, 150ms) ease,\n          color var(--kit-duration-fast, 150ms) ease,\n          transform var(--kit-duration-fast, 150ms)\n            var(--kit-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));\n      }\n\n      .kit-palette-item:hover,\n      .kit-palette-item.selected {\n        background: var(--m3-secondary-container, var(--kit-primary-container));\n        color: var(\n          --m3-on-secondary-container,\n          var(--kit-on-primary-container)\n        );\n      }\n\n      .kit-palette-item.selected {\n        transform: translateX(2px);\n      }\n\n      .kit-palette-item:active {\n        transform: scale(0.99);\n      }\n\n      .kit-palette-item-icon {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 32px;\n        height: 32px;\n        border-radius: 6px;\n        background: var(--kit-surface-container-highest);\n        color: var(--kit-on-surface);\n        flex-shrink: 0;\n        transition:\n          background-color var(--kit-duration-fast, 150ms) ease,\n          color var(--kit-duration-fast, 150ms) ease;\n      }\n\n      .kit-palette-item-glyph {\n        font-size: 0.875rem;\n        font-weight: 700;\n        line-height: 1;\n      }\n\n      .kit-palette-item.selected .kit-palette-item-icon {\n        background: var(\n          --m3-on-secondary-container,\n          var(--kit-on-primary-container)\n        );\n        color: var(--m3-secondary-container, var(--kit-primary-container));\n      }\n\n      .kit-palette-item-info {\n        flex: 1;\n        min-width: 0;\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n      }\n\n      .kit-palette-title-row {\n        display: flex;\n        align-items: center;\n        gap: var(--spacing-8, 8px);\n        min-width: 0;\n      }\n\n      .kit-palette-item-title {\n        font-size: 0.95rem;\n        font-weight: 500;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n\n      .kit-palette-region-badge {\n        font-size: 0.65rem;\n        font-weight: 700;\n        padding: 1px 5px;\n        border-radius: 4px;\n        background: var(--kit-surface-container-highest);\n        color: var(--kit-on-surface-variant);\n        border: 1px solid var(--kit-outline-variant);\n        flex-shrink: 0;\n        line-height: 1.2;\n      }\n\n      .kit-palette-item.selected .kit-palette-region-badge {\n        background: var(\n          --m3-on-secondary-container,\n          var(--kit-on-primary-container)\n        );\n        color: var(--m3-secondary-container, var(--kit-primary-container));\n        border-color: transparent;\n      }\n\n      .kit-palette-item-subtitle {\n        font-size: 0.8rem;\n        color: var(--kit-on-surface-variant);\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n\n      .kit-palette-item.selected .kit-palette-item-subtitle {\n        color: var(\n          --m3-on-secondary-container,\n          var(--kit-on-primary-container)\n        );\n        opacity: 0.85;\n      }\n\n      .kit-palette-mark {\n        background: color-mix(\n          in srgb,\n          var(--kit-primary, #6366f1) 24%,\n          transparent\n        );\n        color: inherit;\n        font-weight: 700;\n        border-radius: 2px;\n        padding: 0 1px;\n      }\n\n      .kit-palette-item.selected .kit-palette-mark {\n        background: color-mix(in srgb, currentColor 24%, transparent);\n        color: inherit;\n      }\n\n      .kit-palette-item-badge {\n        font-size: 0.75rem;\n        font-weight: 600;\n        padding: 2px 8px;\n        border-radius: 12px;\n        background: var(--kit-surface-container-highest);\n        color: var(--kit-on-surface-variant);\n        flex-shrink: 0;\n      }\n\n      .kit-palette-item-badge.tone-success {\n        background: rgba(34, 197, 94, 0.15);\n        color: #22c55e;\n      }\n\n      .kit-palette-item-badge.tone-info {\n        background: rgba(59, 130, 246, 0.15);\n        color: #3b82f6;\n      }\n\n      .kit-palette-item-badge.tone-warning {\n        background: rgba(245, 158, 11, 0.18);\n        color: #f59e0b;\n      }\n\n      .kit-palette-item-badge.tone-danger {\n        background: rgba(239, 68, 68, 0.16);\n        color: #ef4444;\n      }\n\n      .kit-palette-item-remove-btn {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 24px;\n        height: 24px;\n        background: transparent;\n        border: none;\n        border-radius: 4px;\n        color: var(--kit-on-surface-variant);\n        cursor: pointer;\n        opacity: 0.6;\n        flex-shrink: 0;\n        padding: 0;\n        margin-left: auto;\n        transition:\n          opacity var(--kit-duration-fast, 150ms) ease,\n          background-color var(--kit-duration-fast, 150ms) ease,\n          color var(--kit-duration-fast, 150ms) ease;\n      }\n\n      .kit-palette-item-remove-btn:hover {\n        opacity: 1;\n        color: var(--m3-error, var(--kit-danger, #ef4444));\n        background: var(--kit-surface-container-highest);\n      }\n\n      .kit-palette-item.selected .kit-palette-item-remove-btn {\n        color: var(\n          --m3-on-secondary-container,\n          var(--kit-on-primary-container)\n        );\n        opacity: 0.85;\n      }\n\n      .kit-palette-empty-state {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        padding: var(--spacing-48, 48px) var(--spacing-20, 20px);\n        gap: var(--spacing-12, 12px);\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-palette-empty-state p {\n        margin: 0;\n        font-size: 0.95rem;\n      }\n\n      .kit-palette-footer {\n        display: flex;\n        align-items: center;\n        gap: var(--spacing-16, 16px);\n        padding: var(--spacing-8, 8px) var(--spacing-20, 20px);\n        border-top: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container);\n        font-size: 0.75rem;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-palette-hint {\n        display: flex;\n        align-items: center;\n        gap: var(--spacing-4, 4px);\n      }\n\n      @media (max-width: 768px) {\n        .kit-command-palette {\n          margin: auto 0 0 0;\n          width: 100%;\n          max-width: 100%;\n          max-height: calc(88dvh - env(safe-area-inset-top, 0px));\n          border-radius: 20px 20px 0 0;\n          border-bottom: none;\n          border-left: none;\n          border-right: none;\n          padding-bottom: max(\n            var(--spacing-16, 16px),\n            env(safe-area-inset-bottom, 16px)\n          );\n          transform: translateY(0);\n          transition: transform 0.25s cubic-bezier(0.2, 0, 0, 1);\n        }\n\n        .kit-command-palette.dragging {\n          transition: none !important;\n        }\n\n        .kit-command-palette.slide-up-enter {\n          animation: kitPaletteSheetUp var(--kit-duration-medium, 280ms)\n            var(--kit-ease-emphasized, cubic-bezier(0.16, 1, 0.3, 1)) forwards;\n        }\n\n        @keyframes kitPaletteSheetUp {\n          from {\n            transform: translateY(100%);\n          }\n          to {\n            transform: translateY(0);\n          }\n        }\n\n        .kit-command-palette.closing {\n          transform: translateY(100%) !important;\n          opacity: 1 !important;\n          transition: transform var(--kit-duration-medium, 220ms)\n            var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)) !important;\n        }\n\n        .kit-palette-drag-handle-bar {\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          padding: 10px 0 4px;\n          cursor: grab;\n          touch-action: none;\n          background: var(--kit-surface-container);\n        }\n\n        .kit-palette-drag-handle {\n          width: 36px;\n          height: 4px;\n          border-radius: 2px;\n          background: var(--kit-outline-variant);\n        }\n\n        .kit-palette-item {\n          min-height: 48px;\n          padding: 10px 16px;\n        }\n\n        .kit-palette-shortcut-badge,\n        .kit-palette-esc-badge,\n        .kit-palette-footer {\n          display: none;\n        }\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-command-palette,\n        .kit-command-palette * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitCommandPaletteComponent, [{
        type: Component,
        args: [{ selector: 'kit-command-palette', standalone: true, imports: [KitIconComponent], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <dialog
      #dialogEl
      class="kit-command-palette m3-surface-container-high"
      [class.dragging]="isDraggingSheet() || externalDragging()"
      [class.slide-up-enter]="isEntering()"
      [class.closing]="isClosing()"
      [style.transform]="
        !isClosing() && effectiveTransformY() !== 0
          ? 'translateY(' + effectiveTransformY() + 'px)'
          : null
      "
      (click)="onDialogClick($event)"
      (cancel)="onDialogCancel($event)"
      [attr.aria-label]="ariaLabel() || title()"
    >
      <div
        class="kit-palette-drag-area sheet-drag-area"
        (touchstart)="onDragHandleTouchStart($event)"
        (touchmove)="onDragHandleTouchMove($event)"
        (touchend)="onDragHandleTouchEnd()"
        (touchcancel)="onDragHandleTouchCancel()"
      >
        <div class="kit-palette-drag-handle-bar">
          <div class="kit-palette-drag-handle"></div>
        </div>

        <header class="kit-palette-header">
          <div class="kit-palette-title-group">
            <kit-icon [name]="headerIcon()" [size]="15" />
            <h2 class="kit-palette-title">{{ title() }}</h2>
          </div>
          @if (shortcutLabel()) {
            <span class="kit-palette-shortcut-badge">{{
              shortcutLabel()
            }}</span>
          }
        </header>
      </div>

      <div class="kit-palette-search-wrapper">
        <kit-icon
          name="search"
          [size]="20"
          className="kit-palette-search-icon"
        />
        <input
          #searchInput
          type="search"
          role="combobox"
          [attr.aria-expanded]="isOpen()"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          [attr.aria-controls]="listboxId"
          [attr.aria-activedescendant]="activeOptionId()"
          inputmode="search"
          enterkeyhint="go"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="none"
          spellcheck="false"
          class="kit-palette-input"
          [value]="query()"
          (input)="onInputChange($event)"
          [placeholder]="placeholder()"
        />
        <button
          type="button"
          class="kit-palette-kbd kit-palette-esc-badge"
          (click)="requestClose()"
          aria-label="Close command palette"
        >
          ESC
        </button>
      </div>

      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        @if (flatResults().length === 0) {
          @if (query()) {
            {{ emptyText() }} "{{ query() }}"
          } @else {
            {{ emptyText() }}
          }
        } @else {
          {{ flatResults().length }} results available
        }
      </div>

      <div
        [id]="listboxId"
        role="listbox"
        [attr.aria-label]="ariaLabel() || title()"
        class="kit-palette-results"
      >
        @if (flatResults().length === 0) {
          <div class="kit-palette-empty-state">
            <kit-icon name="inbox-empty" [size]="32" />
            <p>
              @if (query()) {
                {{ emptyText() }} "{{ query() }}"
              } @else {
                {{ emptyText() }}
              }
            </p>
          </div>
        } @else {
          @for (group of groupedResults(); track group.category) {
            <div
              class="kit-palette-group"
              role="group"
              [attr.aria-label]="group.category"
            >
              <div class="kit-palette-group-header">
                <span class="kit-palette-group-title" aria-hidden="true">{{
                  group.category
                }}</span>
                @if (clearableCategories().includes(group.category)) {
                  <button
                    type="button"
                    class="kit-palette-clear-btn"
                    (click)="onClearCategory(group.category, $event)"
                    [attr.aria-label]="'Clear ' + group.category"
                  >
                    Clear
                  </button>
                }
              </div>
              @for (entry of group.entries; track entry.item.id) {
                <div
                  [id]="optionId(entry.item)"
                  role="option"
                  [attr.aria-selected]="selectedIndex() === entry.flatIndex"
                  [attr.data-palette-selected]="
                    selectedIndex() === entry.flatIndex ? 'true' : null
                  "
                  class="kit-palette-item"
                  [class.selected]="selectedIndex() === entry.flatIndex"
                  (click)="onSelect(entry.item)"
                  (mouseenter)="onHover(entry.flatIndex)"
                >
                  <div class="kit-palette-item-icon">
                    @if (entry.item.icon) {
                      <kit-icon [name]="entry.item.icon" [size]="18" />
                    } @else if (entry.item.glyph) {
                      <span class="kit-palette-item-glyph">{{
                        entry.item.glyph
                      }}</span>
                    } @else {
                      <kit-icon name="search" [size]="16" />
                    }
                  </div>
                  <div class="kit-palette-item-info">
                    <div class="kit-palette-title-row">
                      <span class="kit-palette-item-title">
                        @for (
                          chunk of tokenize(entry.item.title);
                          track $index
                        ) {
                          @if (chunk.match) {
                            <mark class="kit-palette-mark">{{
                              chunk.text
                            }}</mark>
                          } @else {
                            {{ chunk.text }}
                          }
                        }
                      </span>
                      @if (entry.item.tag) {
                        <span class="kit-palette-region-badge">{{
                          entry.item.tag
                        }}</span>
                      }
                    </div>
                    @if (entry.item.subtitle) {
                      <span class="kit-palette-item-subtitle">
                        @for (
                          chunk of tokenize(entry.item.subtitle);
                          track $index
                        ) {
                          @if (chunk.match) {
                            <mark class="kit-palette-mark">{{
                              chunk.text
                            }}</mark>
                          } @else {
                            {{ chunk.text }}
                          }
                        }
                      </span>
                    }
                  </div>
                  @if (entry.item.badge) {
                    <span
                      class="kit-palette-item-badge"
                      [class.tone-success]="entry.item.badgeTone === 'success'"
                      [class.tone-info]="entry.item.badgeTone === 'info'"
                      [class.tone-warning]="entry.item.badgeTone === 'warning'"
                      [class.tone-danger]="entry.item.badgeTone === 'danger'"
                    >
                      {{ entry.item.badge }}
                    </span>
                  }
                  @if (
                    entry.item.removable ||
                    clearableCategories().includes(group.category)
                  ) {
                    <button
                      type="button"
                      class="kit-palette-item-remove-btn"
                      (click)="onRemoveItem(entry.item, $event)"
                      [attr.aria-label]="'Remove ' + entry.item.title"
                      title="Remove"
                    >
                      <kit-icon name="close" [size]="12" />
                    </button>
                  }
                </div>
              }
            </div>
          }
        }
      </div>

      <footer class="kit-palette-footer">
        <div class="kit-palette-hint">
          <kbd class="kit-palette-kbd mini">↑</kbd>
          <kbd class="kit-palette-kbd mini">↓</kbd>
          <span>Navigate</span>
        </div>
        <div class="kit-palette-hint">
          <kbd class="kit-palette-kbd mini">↵</kbd>
          <span>Select</span>
        </div>
        <div class="kit-palette-hint">
          <kbd class="kit-palette-kbd mini">esc</kbd>
          <span>Close</span>
        </div>
      </footer>
    </dialog>
  `, styles: ["\n      .kit-command-palette {\n        margin: var(--spacing-48, 48px) auto auto auto;\n        padding: 0;\n        width: calc(100% - var(--spacing-32, 32px));\n        max-width: 640px;\n        max-height: calc(85vh - 48px);\n        background: var(--kit-surface-container-high);\n        border: 1px solid var(--kit-outline-variant);\n        border-radius: var(--kit-radius-md, 16px);\n        box-shadow:\n          0 24px 64px rgba(0, 0, 0, 0.5),\n          0 0 0 1px rgba(255, 255, 255, 0.05);\n        overflow: hidden;\n        color: var(--kit-on-surface);\n      }\n\n      .kit-command-palette:not([open]) {\n        display: none;\n      }\n\n      .kit-command-palette[open] {\n        display: flex;\n        flex-direction: column;\n      }\n\n      .kit-command-palette::backdrop {\n        background: rgba(0, 0, 0, 0.65);\n        backdrop-filter: blur(16px) contrast(95%) brightness(85%);\n        -webkit-backdrop-filter: blur(16px) contrast(95%) brightness(85%);\n        overscroll-behavior: contain;\n        transition: opacity var(--kit-duration-medium, 220ms)\n          var(--kit-ease-standard, cubic-bezier(0.2, 0, 0, 1));\n      }\n\n      .kit-command-palette.slide-up-enter {\n        animation: kitPaletteDesktopIn var(--kit-duration-medium, 220ms)\n          var(--kit-ease-emphasized, cubic-bezier(0.16, 1, 0.3, 1)) forwards;\n      }\n\n      @keyframes kitPaletteDesktopIn {\n        from {\n          opacity: 0;\n          transform: scale(0.96) translateY(-8px);\n        }\n        to {\n          opacity: 1;\n          transform: scale(1) translateY(0);\n        }\n      }\n\n      .kit-command-palette.closing {\n        opacity: 0;\n        transform: scale(0.96) translateY(8px);\n        transition:\n          opacity var(--kit-duration-medium, 220ms)\n            var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)),\n          transform var(--kit-duration-medium, 220ms)\n            var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1));\n      }\n\n      .kit-command-palette.closing::backdrop {\n        opacity: 0;\n      }\n\n      .kit-palette-drag-area {\n        cursor: grab;\n        touch-action: none;\n      }\n\n      .kit-palette-drag-handle-bar {\n        display: none;\n      }\n\n      .kit-palette-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        padding: var(--spacing-12, 12px) var(--spacing-20, 20px);\n        border-bottom: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container);\n      }\n\n      .kit-palette-title-group {\n        display: flex;\n        align-items: center;\n        gap: var(--spacing-8, 8px);\n        color: var(--kit-primary);\n      }\n\n      .kit-palette-title {\n        font-size: 0.8125rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.06em;\n        margin: 0;\n        color: var(--kit-on-surface);\n      }\n\n      .kit-palette-shortcut-badge {\n        font-family: inherit;\n        font-size: 0.6875rem;\n        font-weight: 600;\n        padding: 2px 7px;\n        border-radius: 4px;\n        background: var(--kit-surface-container-highest);\n        color: var(--kit-on-surface-variant);\n        border: 1px solid var(--kit-outline-variant);\n      }\n\n      .kit-palette-search-wrapper {\n        display: flex;\n        align-items: center;\n        gap: var(--spacing-12, 12px);\n        padding: var(--spacing-16, 16px) var(--spacing-20, 20px);\n        border-bottom: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container-high);\n      }\n\n      .kit-palette-search-icon {\n        color: var(--kit-on-surface-variant);\n        flex-shrink: 0;\n      }\n\n      .kit-palette-input {\n        flex: 1;\n        background: transparent;\n        border: none;\n        outline: none;\n        font-size: 1.05rem;\n        color: var(--kit-on-surface);\n        font-family: inherit;\n      }\n\n      .kit-palette-input::-webkit-search-cancel-button,\n      .kit-palette-input::-webkit-search-decoration {\n        -webkit-appearance: none;\n        appearance: none;\n      }\n\n      .kit-palette-input::placeholder {\n        color: var(--kit-on-surface-variant);\n        opacity: 0.7;\n      }\n\n      .kit-command-palette .sr-only {\n        position: absolute;\n        width: 1px;\n        height: 1px;\n        padding: 0;\n        margin: -1px;\n        overflow: hidden;\n        clip: rect(0, 0, 0, 0);\n        white-space: nowrap;\n        border-width: 0;\n      }\n\n      .kit-palette-kbd {\n        font-family: inherit;\n        font-size: 0.75rem;\n        font-weight: 600;\n        padding: 3px 6px;\n        border-radius: 4px;\n        background: var(--kit-surface-container-highest);\n        color: var(--kit-on-surface-variant);\n        border: 1px solid var(--kit-outline-variant);\n        line-height: 1;\n      }\n\n      .kit-palette-kbd.mini {\n        padding: 2px 5px;\n        font-size: 0.7rem;\n      }\n\n      .kit-palette-esc-badge {\n        cursor: pointer;\n        transition:\n          background-color var(--kit-duration-fast, 150ms) ease,\n          color var(--kit-duration-fast, 150ms) ease;\n      }\n\n      .kit-palette-esc-badge:hover {\n        background: var(--kit-surface-container);\n        color: var(--kit-on-surface);\n      }\n\n      .kit-palette-results {\n        flex: 1;\n        overflow-y: auto;\n        padding: var(--spacing-8, 8px) 0;\n        overscroll-behavior: contain;\n      }\n\n      .kit-palette-group {\n        margin-bottom: var(--spacing-8, 8px);\n      }\n\n      .kit-palette-group-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        padding: var(--spacing-8, 8px) var(--spacing-20, 20px)\n          var(--spacing-4, 4px);\n      }\n\n      .kit-palette-group-title {\n        padding: 0;\n        font-size: 0.75rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.05em;\n        color: var(--kit-primary);\n      }\n\n      .kit-palette-clear-btn {\n        background: transparent;\n        border: none;\n        font-family: inherit;\n        font-size: 0.7rem;\n        font-weight: 600;\n        color: var(--kit-on-surface-variant);\n        cursor: pointer;\n        padding: 2px 6px;\n        border-radius: 4px;\n        line-height: 1;\n        transition:\n          color var(--kit-duration-fast, 150ms) ease,\n          background-color var(--kit-duration-fast, 150ms) ease;\n      }\n\n      .kit-palette-clear-btn:hover {\n        color: var(--m3-error, var(--kit-danger, #ef4444));\n        background: var(--kit-surface-container-highest);\n      }\n\n      .kit-palette-item {\n        position: relative;\n        display: flex;\n        align-items: center;\n        gap: var(--spacing-12, 12px);\n        padding: var(--spacing-8, 8px) var(--spacing-20, 20px);\n        margin: 2px var(--spacing-8, 8px);\n        border-radius: var(--kit-radius-xs, 8px);\n        cursor: pointer;\n        transition:\n          background-color var(--kit-duration-fast, 150ms) ease,\n          color var(--kit-duration-fast, 150ms) ease,\n          transform var(--kit-duration-fast, 150ms)\n            var(--kit-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));\n      }\n\n      .kit-palette-item:hover,\n      .kit-palette-item.selected {\n        background: var(--m3-secondary-container, var(--kit-primary-container));\n        color: var(\n          --m3-on-secondary-container,\n          var(--kit-on-primary-container)\n        );\n      }\n\n      .kit-palette-item.selected {\n        transform: translateX(2px);\n      }\n\n      .kit-palette-item:active {\n        transform: scale(0.99);\n      }\n\n      .kit-palette-item-icon {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 32px;\n        height: 32px;\n        border-radius: 6px;\n        background: var(--kit-surface-container-highest);\n        color: var(--kit-on-surface);\n        flex-shrink: 0;\n        transition:\n          background-color var(--kit-duration-fast, 150ms) ease,\n          color var(--kit-duration-fast, 150ms) ease;\n      }\n\n      .kit-palette-item-glyph {\n        font-size: 0.875rem;\n        font-weight: 700;\n        line-height: 1;\n      }\n\n      .kit-palette-item.selected .kit-palette-item-icon {\n        background: var(\n          --m3-on-secondary-container,\n          var(--kit-on-primary-container)\n        );\n        color: var(--m3-secondary-container, var(--kit-primary-container));\n      }\n\n      .kit-palette-item-info {\n        flex: 1;\n        min-width: 0;\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n      }\n\n      .kit-palette-title-row {\n        display: flex;\n        align-items: center;\n        gap: var(--spacing-8, 8px);\n        min-width: 0;\n      }\n\n      .kit-palette-item-title {\n        font-size: 0.95rem;\n        font-weight: 500;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n\n      .kit-palette-region-badge {\n        font-size: 0.65rem;\n        font-weight: 700;\n        padding: 1px 5px;\n        border-radius: 4px;\n        background: var(--kit-surface-container-highest);\n        color: var(--kit-on-surface-variant);\n        border: 1px solid var(--kit-outline-variant);\n        flex-shrink: 0;\n        line-height: 1.2;\n      }\n\n      .kit-palette-item.selected .kit-palette-region-badge {\n        background: var(\n          --m3-on-secondary-container,\n          var(--kit-on-primary-container)\n        );\n        color: var(--m3-secondary-container, var(--kit-primary-container));\n        border-color: transparent;\n      }\n\n      .kit-palette-item-subtitle {\n        font-size: 0.8rem;\n        color: var(--kit-on-surface-variant);\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n\n      .kit-palette-item.selected .kit-palette-item-subtitle {\n        color: var(\n          --m3-on-secondary-container,\n          var(--kit-on-primary-container)\n        );\n        opacity: 0.85;\n      }\n\n      .kit-palette-mark {\n        background: color-mix(\n          in srgb,\n          var(--kit-primary, #6366f1) 24%,\n          transparent\n        );\n        color: inherit;\n        font-weight: 700;\n        border-radius: 2px;\n        padding: 0 1px;\n      }\n\n      .kit-palette-item.selected .kit-palette-mark {\n        background: color-mix(in srgb, currentColor 24%, transparent);\n        color: inherit;\n      }\n\n      .kit-palette-item-badge {\n        font-size: 0.75rem;\n        font-weight: 600;\n        padding: 2px 8px;\n        border-radius: 12px;\n        background: var(--kit-surface-container-highest);\n        color: var(--kit-on-surface-variant);\n        flex-shrink: 0;\n      }\n\n      .kit-palette-item-badge.tone-success {\n        background: rgba(34, 197, 94, 0.15);\n        color: #22c55e;\n      }\n\n      .kit-palette-item-badge.tone-info {\n        background: rgba(59, 130, 246, 0.15);\n        color: #3b82f6;\n      }\n\n      .kit-palette-item-badge.tone-warning {\n        background: rgba(245, 158, 11, 0.18);\n        color: #f59e0b;\n      }\n\n      .kit-palette-item-badge.tone-danger {\n        background: rgba(239, 68, 68, 0.16);\n        color: #ef4444;\n      }\n\n      .kit-palette-item-remove-btn {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 24px;\n        height: 24px;\n        background: transparent;\n        border: none;\n        border-radius: 4px;\n        color: var(--kit-on-surface-variant);\n        cursor: pointer;\n        opacity: 0.6;\n        flex-shrink: 0;\n        padding: 0;\n        margin-left: auto;\n        transition:\n          opacity var(--kit-duration-fast, 150ms) ease,\n          background-color var(--kit-duration-fast, 150ms) ease,\n          color var(--kit-duration-fast, 150ms) ease;\n      }\n\n      .kit-palette-item-remove-btn:hover {\n        opacity: 1;\n        color: var(--m3-error, var(--kit-danger, #ef4444));\n        background: var(--kit-surface-container-highest);\n      }\n\n      .kit-palette-item.selected .kit-palette-item-remove-btn {\n        color: var(\n          --m3-on-secondary-container,\n          var(--kit-on-primary-container)\n        );\n        opacity: 0.85;\n      }\n\n      .kit-palette-empty-state {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        padding: var(--spacing-48, 48px) var(--spacing-20, 20px);\n        gap: var(--spacing-12, 12px);\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-palette-empty-state p {\n        margin: 0;\n        font-size: 0.95rem;\n      }\n\n      .kit-palette-footer {\n        display: flex;\n        align-items: center;\n        gap: var(--spacing-16, 16px);\n        padding: var(--spacing-8, 8px) var(--spacing-20, 20px);\n        border-top: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container);\n        font-size: 0.75rem;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-palette-hint {\n        display: flex;\n        align-items: center;\n        gap: var(--spacing-4, 4px);\n      }\n\n      @media (max-width: 768px) {\n        .kit-command-palette {\n          margin: auto 0 0 0;\n          width: 100%;\n          max-width: 100%;\n          max-height: calc(88dvh - env(safe-area-inset-top, 0px));\n          border-radius: 20px 20px 0 0;\n          border-bottom: none;\n          border-left: none;\n          border-right: none;\n          padding-bottom: max(\n            var(--spacing-16, 16px),\n            env(safe-area-inset-bottom, 16px)\n          );\n          transform: translateY(0);\n          transition: transform 0.25s cubic-bezier(0.2, 0, 0, 1);\n        }\n\n        .kit-command-palette.dragging {\n          transition: none !important;\n        }\n\n        .kit-command-palette.slide-up-enter {\n          animation: kitPaletteSheetUp var(--kit-duration-medium, 280ms)\n            var(--kit-ease-emphasized, cubic-bezier(0.16, 1, 0.3, 1)) forwards;\n        }\n\n        @keyframes kitPaletteSheetUp {\n          from {\n            transform: translateY(100%);\n          }\n          to {\n            transform: translateY(0);\n          }\n        }\n\n        .kit-command-palette.closing {\n          transform: translateY(100%) !important;\n          opacity: 1 !important;\n          transition: transform var(--kit-duration-medium, 220ms)\n            var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)) !important;\n        }\n\n        .kit-palette-drag-handle-bar {\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          padding: 10px 0 4px;\n          cursor: grab;\n          touch-action: none;\n          background: var(--kit-surface-container);\n        }\n\n        .kit-palette-drag-handle {\n          width: 36px;\n          height: 4px;\n          border-radius: 2px;\n          background: var(--kit-outline-variant);\n        }\n\n        .kit-palette-item {\n          min-height: 48px;\n          padding: 10px 16px;\n        }\n\n        .kit-palette-shortcut-badge,\n        .kit-palette-esc-badge,\n        .kit-palette-footer {\n          display: none;\n        }\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-command-palette,\n        .kit-command-palette * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "] }]
    }], () => [], { isOpen: [{ type: i0.Input, args: [{ isSignal: true, alias: "isOpen", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], ariaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }], headerIcon: [{ type: i0.Input, args: [{ isSignal: true, alias: "headerIcon", required: false }] }], shortcutLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "shortcutLabel", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], emptyText: [{ type: i0.Input, args: [{ isSignal: true, alias: "emptyText", required: false }] }], items: [{ type: i0.Input, args: [{ isSignal: true, alias: "items", required: false }] }], categoryOrder: [{ type: i0.Input, args: [{ isSignal: true, alias: "categoryOrder", required: false }] }], filterLocally: [{ type: i0.Input, args: [{ isSignal: true, alias: "filterLocally", required: false }] }], clearableCategories: [{ type: i0.Input, args: [{ isSignal: true, alias: "clearableCategories", required: false }] }], enableGlobalShortcut: [{ type: i0.Input, args: [{ isSignal: true, alias: "enableGlobalShortcut", required: false }] }], externalDragging: [{ type: i0.Input, args: [{ isSignal: true, alias: "externalDragging", required: false }] }], closeOnSelect: [{ type: i0.Input, args: [{ isSignal: true, alias: "closeOnSelect", required: false }] }], closeDurationMs: [{ type: i0.Input, args: [{ isSignal: true, alias: "closeDurationMs", required: false }] }], openRequested: [{ type: i0.Output, args: ["openRequested"] }], toggleRequested: [{ type: i0.Output, args: ["toggleRequested"] }], closed: [{ type: i0.Output, args: ["closed"] }], queryChange: [{ type: i0.Output, args: ["queryChange"] }], itemSelected: [{ type: i0.Output, args: ["itemSelected"] }], clearCategory: [{ type: i0.Output, args: ["clearCategory"] }], removeItem: [{ type: i0.Output, args: ["removeItem"] }], dialogRef: [{
            type: ViewChild,
            args: ['dialogEl']
        }], searchInput: [{
            type: ViewChild,
            args: ['searchInput']
        }], onGlobalKeydown: [{
            type: HostListener,
            args: ['window:keydown', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitCommandPaletteComponent, { className: "KitCommandPaletteComponent", filePath: "command-palette.component.ts", lineNumber: 986 }); })();
