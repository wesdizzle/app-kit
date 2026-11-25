import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, input, linkedSignal, model, output, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KIT_FILTER_BAR_CSS, KIT_FILTER_DROPDOWN_BASE_CSS, } from './filter-primitives.styles.js';
import { KitIconComponent } from './icon.component.js';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = [[["", "kitFilterPills", ""]], [["", "kitFilterQuickSort", ""]], "*"];
const _c1 = ["[kitFilterPills]", "[kitFilterQuickSort]", "*"];
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.value;
function KitFilterBarComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function KitFilterBarComponent_Conditional_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearQuickSearch()); });
    i0.ɵɵelement(1, "kit-icon", 29);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", 14);
} }
function KitFilterBarComponent_Conditional_10_For_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 34);
    i0.ɵɵelement(1, "kit-icon", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const pill_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", pill_r4.icon)("size", 14);
} }
function KitFilterBarComponent_Conditional_10_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 33);
    i0.ɵɵlistener("click", function KitFilterBarComponent_Conditional_10_For_2_Template_button_click_0_listener() { const pill_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.quickPillClick.emit(pill_r4.id)); });
    i0.ɵɵconditionalCreate(1, KitFilterBarComponent_Conditional_10_For_2_Conditional_1_Template, 2, 2, "span", 34);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const pill_r4 = ctx.$implicit;
    i0.ɵɵclassProp("deals-pill", pill_r4.variant === "deals")("active", pill_r4.active);
    i0.ɵɵattribute("title", pill_r4.title || null);
    i0.ɵɵadvance();
    i0.ɵɵconditional(pill_r4.icon ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", pill_r4.label, " ");
} }
function KitFilterBarComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵrepeaterCreate(1, KitFilterBarComponent_Conditional_10_For_2_Template, 3, 7, "button", 32, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-label", ctx_r1.quickPillsAriaLabel());
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.quickPills());
} }
function KitFilterBarComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.activeFilterCount());
} }
function KitFilterBarComponent_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 17);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", "Last synced with server: " + i0.ɵɵpipeBind2(1, 2, ctx_r1.lastUpdated(), "medium"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" \u2022 Updated ", i0.ɵɵpipeBind2(3, 5, ctx_r1.lastUpdated(), "shortTime"), " ");
} }
function KitFilterBarComponent_Conditional_23_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 37);
    i0.ɵɵlistener("click", function KitFilterBarComponent_Conditional_23_For_2_Template_button_click_0_listener() { const vm_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onViewModeSelect(vm_r6.value)); });
    i0.ɵɵelement(1, "kit-icon", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const vm_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r1.viewMode() === vm_r6.value);
    i0.ɵɵattribute("title", vm_r6.title)("aria-label", vm_r6.ariaLabel);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", vm_r6.icon)("size", 16);
} }
function KitFilterBarComponent_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵrepeaterCreate(1, KitFilterBarComponent_Conditional_23_For_2_Template, 2, 6, "button", 36, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.viewModes());
} }
function KitFilterBarComponent_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", ctx_r1.activeFilterCount(), " active");
} }
export const DEFAULT_KIT_VIEW_MODES = [
    {
        value: 'grid',
        icon: 'view-grid',
        title: 'Tile View (Grid)',
        ariaLabel: 'Tile View',
    },
    {
        value: 'compact',
        icon: 'view-list',
        title: 'Compact View (Rows)',
        ariaLabel: 'Compact View',
    },
];
export class KitFilterBarComponent {
    constructor() {
        this.searchDebounceTimer = null;
        this.search = input('', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "search" }] : /* istanbul ignore next */ []));
        this.searchPlaceholder = input('Search by title or series...', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "searchPlaceholder" }] : /* istanbul ignore next */ []));
        this.searchInputId = input('filter-name', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "searchInputId" }] : /* istanbul ignore next */ []));
        this.searchAriaLabel = input('', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "searchAriaLabel" }] : /* istanbul ignore next */ []));
        this.searchDebounceMs = input(150, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "searchDebounceMs" }] : /* istanbul ignore next */ []));
        this.quickPills = input([], /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "quickPills" }] : /* istanbul ignore next */ []));
        this.quickPillsAriaLabel = input('Quick ownership filter', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "quickPillsAriaLabel" }] : /* istanbul ignore next */ []));
        this.activeFilterCount = input(0, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "activeFilterCount" }] : /* istanbul ignore next */ []));
        this.resultCount = input(0, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "resultCount" }] : /* istanbul ignore next */ []));
        this.resultCountNoun = input('items', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "resultCountNoun" }] : /* istanbul ignore next */ []));
        this.lastUpdated = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "lastUpdated" }] : /* istanbul ignore next */ []));
        this.viewMode = input('grid', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "viewMode" }] : /* istanbul ignore next */ []));
        this.viewModes = input(DEFAULT_KIT_VIEW_MODES, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "viewModes" }] : /* istanbul ignore next */ []));
        this.resetTitle = input('Reset all filters back to Owned', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "resetTitle" }] : /* istanbul ignore next */ []));
        this.showDrawer = model(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "showDrawer" }] : /* istanbul ignore next */ []));
        this.searchChange = output();
        this.searchCleared = output();
        this.quickPillClick = output();
        this.viewModeChange = output();
        this.resetFilters = output();
        this.searchInput = linkedSignal(() => this.search(), /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "searchInput" }] : /* istanbul ignore next */ []));
    }
    ngOnDestroy() {
        if (this.searchDebounceTimer) {
            clearTimeout(this.searchDebounceTimer);
            this.searchDebounceTimer = null;
        }
    }
    onQuickSearchInput(value) {
        this.searchInput.set(value);
        if (this.searchDebounceTimer) {
            clearTimeout(this.searchDebounceTimer);
            this.searchDebounceTimer = null;
        }
        const delay = this.searchDebounceMs();
        if (delay <= 0) {
            this.searchChange.emit(value);
            return;
        }
        this.searchDebounceTimer = setTimeout(() => {
            this.searchDebounceTimer = null;
            this.searchChange.emit(value);
        }, delay);
    }
    onQuickSearchEnter(event) {
        if (this.searchDebounceTimer) {
            clearTimeout(this.searchDebounceTimer);
            this.searchDebounceTimer = null;
        }
        const target = event.target;
        if (target) {
            this.searchInput.set(target.value);
            this.searchChange.emit(target.value);
        }
    }
    clearQuickSearch() {
        if (this.searchDebounceTimer) {
            clearTimeout(this.searchDebounceTimer);
            this.searchDebounceTimer = null;
        }
        this.searchInput.set('');
        this.searchChange.emit('');
        this.searchCleared.emit();
    }
    onViewModeSelect(mode) {
        if (this.viewMode() !== mode) {
            this.viewModeChange.emit(mode);
        }
    }
    onResetClick() {
        if (this.searchDebounceTimer) {
            clearTimeout(this.searchDebounceTimer);
            this.searchDebounceTimer = null;
        }
        this.searchInput.set('');
        this.resetFilters.emit();
    }
    static { this.ɵfac = function KitFilterBarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitFilterBarComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitFilterBarComponent, selectors: [["kit-filter-bar"]], inputs: { search: [1, "search"], searchPlaceholder: [1, "searchPlaceholder"], searchInputId: [1, "searchInputId"], searchAriaLabel: [1, "searchAriaLabel"], searchDebounceMs: [1, "searchDebounceMs"], quickPills: [1, "quickPills"], quickPillsAriaLabel: [1, "quickPillsAriaLabel"], activeFilterCount: [1, "activeFilterCount"], resultCount: [1, "resultCount"], resultCountNoun: [1, "resultCountNoun"], lastUpdated: [1, "lastUpdated"], viewMode: [1, "viewMode"], viewModes: [1, "viewModes"], resetTitle: [1, "resetTitle"], showDrawer: [1, "showDrawer"] }, outputs: { showDrawer: "showDrawerChange", searchChange: "searchChange", searchCleared: "searchCleared", quickPillClick: "quickPillClick", viewModeChange: "viewModeChange", resetFilters: "resetFilters" }, ngContentSelectors: _c1, decls: 40, vars: 21, consts: [[1, "kit-filter-bar", "filter-wrapper", "animate-expressive", "animate-stagger-1"], [1, "filter-bar", "m3-surface-container", "mb-lg"], [1, "quick-toolbar"], [1, "quick-search-box"], ["aria-hidden", "true", 1, "search-icon-wrapper"], ["viewBox", "0 0 24 24", "width", "18", "height", "18", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "search-svg"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], ["type", "text", "autocomplete", "off", 1, "m3-input", "quick-search-input", 3, "ngModelChange", "keydown.enter", "ngModel"], ["type", "button", "aria-label", "Clear search", 1, "clear-search-btn"], ["role", "group", 1, "segmented-status-group"], ["type", "button", "id", "toggle-more-filters", "aria-haspopup", "true", 1, "m3-button", "m3-button-outlined", "more-filters-btn", 3, "click"], ["name", "tune", 3, "size"], [1, "filter-count-badge"], [1, "toolbar-auxiliary-row", "flex", "items-center", "justify-between"], [1, "filter-info", "flex", "items-center", "gap-xs"], [1, "count-badge"], [1, "sync-timestamp", 3, "title"], ["role", "group", "aria-label", "View layout", 1, "view-toggle-group"], [1, "secondary-filters-drawer"], [1, "secondary-filters-drawer-inner"], [1, "drawer-header", "flex", "items-center", "justify-between"], [1, "drawer-title", "flex", "items-center", "gap-xs"], [1, "drawer-heading"], [1, "active-tag"], [1, "drawer-actions", "flex", "items-center", "gap-sm"], ["type", "button", 1, "m3-button", "m3-button-text", "reset-filters-btn", 3, "click"], ["name", "refresh", 3, "size"], ["type", "button", "aria-label", "Close filters drawer", 1, "drawer-close-btn", 3, "click"], ["name", "close", 3, "size"], [1, "secondary-filters-grid"], ["type", "button", "aria-label", "Clear search", 1, "clear-search-btn", 3, "click"], ["type", "button", 1, "status-pill-btn", "state-layer", 3, "deals-pill", "active"], ["type", "button", 1, "status-pill-btn", "state-layer", 3, "click"], [1, "pill-fire-icon"], [3, "name", "size"], ["type", "button", 1, "view-toggle-btn", "state-layer", 3, "active"], ["type", "button", 1, "view-toggle-btn", "state-layer", 3, "click"]], template: function KitFilterBarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef(_c0);
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(5, "svg", 5);
            i0.ɵɵelement(6, "circle", 6)(7, "line", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(8, "input", 8);
            i0.ɵɵcontrolCreate();
            i0.ɵɵlistener("ngModelChange", function KitFilterBarComponent_Template_input_ngModelChange_8_listener($event) { return ctx.onQuickSearchInput($event); })("keydown.enter", function KitFilterBarComponent_Template_input_keydown_enter_8_listener($event) { return ctx.onQuickSearchEnter($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(9, KitFilterBarComponent_Conditional_9_Template, 2, 1, "button", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(10, KitFilterBarComponent_Conditional_10_Template, 3, 1, "div", 10);
            i0.ɵɵprojection(11);
            i0.ɵɵprojection(12, 1);
            i0.ɵɵelementStart(13, "button", 11);
            i0.ɵɵlistener("click", function KitFilterBarComponent_Template_button_click_13_listener() { return ctx.showDrawer.set(!ctx.showDrawer()); });
            i0.ɵɵelement(14, "kit-icon", 12);
            i0.ɵɵelementStart(15, "span");
            i0.ɵɵtext(16, "Filters");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(17, KitFilterBarComponent_Conditional_17_Template, 2, 1, "span", 13);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "div", 14)(19, "div", 15)(20, "span", 16);
            i0.ɵɵtext(21);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(22, KitFilterBarComponent_Conditional_22_Template, 4, 8, "span", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(23, KitFilterBarComponent_Conditional_23_Template, 3, 0, "div", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 19)(25, "div", 20)(26, "div", 21)(27, "div", 22)(28, "span", 23);
            i0.ɵɵtext(29, "Advanced Filters");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(30, KitFilterBarComponent_Conditional_30_Template, 2, 1, "span", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 25)(32, "button", 26);
            i0.ɵɵlistener("click", function KitFilterBarComponent_Template_button_click_32_listener() { return ctx.onResetClick(); });
            i0.ɵɵelement(33, "kit-icon", 27);
            i0.ɵɵelementStart(34, "span");
            i0.ɵɵtext(35, "Reset All");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "button", 28);
            i0.ɵɵlistener("click", function KitFilterBarComponent_Template_button_click_36_listener() { return ctx.showDrawer.set(false); });
            i0.ɵɵelement(37, "kit-icon", 29);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(38, "div", 30);
            i0.ɵɵprojection(39, 2);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngModel", ctx.searchInput());
            i0.ɵɵattribute("placeholder", ctx.searchPlaceholder())("aria-label", ctx.searchAriaLabel() || null)("id", ctx.searchInputId() || null);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.searchInput() ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.quickPills().length > 0 ? 10 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("drawer-active", ctx.showDrawer() || ctx.activeFilterCount() > 0);
            i0.ɵɵattribute("aria-expanded", ctx.showDrawer());
            i0.ɵɵadvance();
            i0.ɵɵproperty("size", 16);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.activeFilterCount() > 0 ? 17 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate2(" ", ctx.resultCount(), " ", ctx.resultCountNoun(), " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.lastUpdated() ? 22 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.viewModes().length > 0 ? 23 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("drawer-collapsed", !ctx.showDrawer());
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(ctx.activeFilterCount() > 0 ? 30 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("title", ctx.resetTitle());
            i0.ɵɵadvance();
            i0.ɵɵproperty("size", 14);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("size", 16);
        } }, dependencies: [FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, KitIconComponent, DatePipe], styles: ["\n  kit-select,\n  kit-combobox,\n  kit-multiselect {\n    display: block;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .flex {\n    display: flex;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .items-center {\n    align-items: center;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .justify-between {\n    justify-content: space-between;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .gap-xs {\n    gap: 6px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .gap-sm {\n    gap: 10px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .pr-xs {\n    padding-right: 4px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .filter-group {\n    display: flex;\n    flex-direction: column;\n    gap: var(--%NS%spacing-8, 8px);\n    min-width: 0;\n    max-width: 100%;\n    width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .filter-group-header {\n    display: flex;\n    align-items: center;\n    min-height: 20px;\n    gap: 8px;\n    flex-wrap: wrap;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .m3-label {\n    font-size: 0.75rem;\n    font-weight: 700;\n    color: var(--%NS%kit-primary);\n    margin-left: 4px;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    line-height: 1;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper {\n    position: relative;\n    display: flex;\n    align-items: center;\n    width: 100%;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-wrapper.active-wrapper {\n    z-index: 60;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .m3-input {\n    box-sizing: border-box;\n    height: var(--%NS%kit-input-height, 46px);\n    background: var(--%NS%kit-surface-container-high);\n    border: 1px solid var(--%NS%kit-outline);\n    color: var(--%NS%kit-on-surface);\n    padding: 0 2.75rem 0 1rem;\n    border-radius: var(--%NS%kit-radius-sm);\n    font-family: var(--%NS%kit-font-sans);\n    font-size: var(--%NS%kit-input-font-size, 0.9375rem);\n    line-height: normal;\n    outline: none;\n    transition:\n      border-color 0.2s ease,\n      background-color 0.2s ease,\n      box-shadow 0.2s ease;\n    width: 100%;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:hover:not(:disabled) {\n    background: var(--%NS%kit-surface-container-highest);\n    border-color: var(--%NS%kit-outline);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:disabled {\n    opacity: 0.55;\n    cursor: not-allowed;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:focus,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger.open,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .list-input.open {\n    border-color: var(--%NS%kit-primary);\n    background: var(--%NS%kit-surface-container-highest);\n    box-shadow: 0 0 0 1px var(--%NS%kit-primary);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-icon-wrapper {\n    position: absolute;\n    right: 1rem;\n    top: 50%;\n    transform: translateY(-50%);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    pointer-events: none;\n    color: var(--%NS%kit-on-surface-variant);\n    transition: color 0.2s ease;\n    z-index: 1;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-chevron {\n    width: 18px;\n    height: 18px;\n    transition:\n      transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),\n      color 0.2s ease;\n    flex-shrink: 0;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-chevron.open {\n    transform: rotate(180deg);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper:hover\n    .dropdown-icon-wrapper,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper:focus-within\n    .dropdown-icon-wrapper,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger.open\n    .dropdown-icon-wrapper {\n    color: var(--%NS%kit-primary);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger {\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    cursor: pointer;\n    text-align: left;\n    padding-left: 1rem;\n    padding-right: 2.75rem;\n    position: relative;\n    user-select: none;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .trigger-text {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  @keyframes kitDropdownEnter {\n    from {\n      opacity: 0;\n      transform: translateY(-6px) scaleY(0.92);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0) scaleY(1);\n    }\n  }\n\n  @keyframes kitCheckPop {\n    from {\n      opacity: 0;\n      transform: scale(0.5);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-list,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-list.animate-expressive {\n    position: absolute;\n    top: calc(100% + 6px);\n    left: var(--%NS%kit-dropdown-left, 0);\n    right: var(--%NS%kit-dropdown-right, auto);\n    min-width: 100%;\n    width: var(--%NS%kit-dropdown-width, max-content);\n    max-width: var(--%NS%kit-dropdown-max-width, min(340px, calc(100vw - 48px)));\n    z-index: 100;\n    background: var(--%NS%kit-surface-container-high);\n    backdrop-filter: blur(20px) contrast(95%);\n    -webkit-backdrop-filter: blur(20px) contrast(95%);\n    border: 1px solid var(--%NS%kit-outline);\n    border-radius: var(--%NS%kit-radius-sm);\n    padding: 0.375rem 0;\n    max-height: 280px;\n    overflow-y: auto;\n    box-shadow: 0 12px 36px 0 rgba(0, 0, 0, 0.45);\n    scrollbar-width: thin;\n    scrollbar-color: var(--%NS%kit-outline-variant) transparent;\n    transform-origin: top center;\n    animation: kitDropdownEnter 180ms var(--%NS%kit-ease-spring) both;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    width: 100%;\n    padding: 0.625rem 1rem;\n    cursor: pointer;\n    user-select: none;\n    background: transparent;\n    border: none;\n    font-family: var(--%NS%kit-font-sans);\n    font-size: 0.875rem;\n    color: var(--%NS%kit-on-surface);\n    text-align: left;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease;\n    gap: 0.75rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item:hover {\n    background: var(--%NS%kit-surface-container-highest);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item.selected {\n    background: var(--%NS%m3-secondary-container, var(--%NS%kit-primary-container));\n    color: var(--%NS%m3-on-secondary-container, var(--%NS%kit-on-primary-container));\n    font-weight: 600;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item.selected\n    .selected-check {\n    color: var(--%NS%m3-on-secondary-container, var(--%NS%kit-on-primary-container));\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .selected-check {\n    color: var(--%NS%kit-primary);\n    flex-shrink: 0;\n    animation: kitCheckPop 180ms var(--%NS%kit-ease-spring) both;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .item-label {\n    font-size: 0.875rem;\n    color: inherit;\n    text-transform: none;\n    letter-spacing: normal;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-group-header {\n    padding: 0.6rem 1rem 0.25rem 1rem;\n    font-size: 0.7rem;\n    font-weight: 700;\n    color: var(--%NS%kit-primary);\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    pointer-events: none;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .child-platform {\n    padding-left: 1.75rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .sub-platform-arrow {\n    color: var(--%NS%kit-on-surface-variant);\n    margin-right: 0.35rem;\n    font-size: 0.85rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-empty {\n    padding: 0.75rem 1rem;\n    font-size: 0.85rem;\n    color: var(--%NS%kit-on-surface-variant);\n    text-align: center;\n  }\n", "\n  .kit-filter-bar {\n    display: block;\n    position: relative;\n    z-index: 20;\n    width: 100%;\n    max-width: 100%;\n    min-width: 0;\n  }\n\n  .kit-filter-bar .mb-lg {\n    margin-bottom: var(--%NS%spacing-32, 24px);\n  }\n\n  .kit-filter-bar .filter-bar {\n    background: var(--%NS%kit-surface-container);\n    border-radius: var(--%NS%kit-radius-md);\n    border: 1px solid var(--%NS%kit-outline-variant);\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    position: relative;\n    z-index: 20;\n    padding: var(--%NS%spacing-16, 16px) var(--%NS%spacing-24, 24px);\n    width: 100%;\n    max-width: 100%;\n    min-width: 0;\n    box-sizing: border-box;\n  }\n\n  .kit-filter-bar .filter-group {\n    min-width: 160px;\n  }\n\n  .kit-filter-bar .toolbar-auxiliary-row {\n    margin-top: 12px;\n  }\n\n  .kit-filter-bar .count-badge {\n    font-size: 0.82rem;\n    font-weight: 600;\n    color: var(--%NS%kit-on-surface-variant);\n  }\n\n  .kit-filter-bar .sync-timestamp {\n    font-size: 0.78rem;\n    color: var(--%NS%kit-on-surface-variant);\n    opacity: 0.85;\n  }\n\n  .kit-filter-bar .view-toggle-group {\n    display: inline-flex;\n    align-items: center;\n    background: var(--%NS%kit-surface-container-high);\n    border: 1px solid var(--%NS%kit-outline);\n    border-radius: var(--%NS%kit-radius-sm);\n    padding: 3px;\n    gap: 2px;\n    box-sizing: border-box;\n    height: 46px;\n  }\n\n  .kit-filter-bar .view-toggle-btn {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    background: transparent;\n    color: var(--%NS%kit-on-surface-variant);\n    border: none;\n    border-radius: calc(var(--%NS%kit-radius-sm) - 4px);\n    width: 38px;\n    height: 38px;\n    cursor: pointer;\n    transition:\n      background-color var(--%NS%kit-duration-fast) var(--%NS%kit-ease-standard),\n      color var(--%NS%kit-duration-fast) var(--%NS%kit-ease-standard),\n      transform var(--%NS%kit-duration-fast) var(--%NS%kit-ease-spring),\n      box-shadow var(--%NS%kit-duration-fast) var(--%NS%kit-ease-standard);\n  }\n\n  .kit-filter-bar .view-toggle-btn:hover {\n    background: var(--%NS%kit-surface-container-highest);\n    color: var(--%NS%kit-on-surface);\n  }\n\n  .kit-filter-bar .view-toggle-btn:active {\n    transform: scale(0.94);\n  }\n\n  .kit-filter-bar .view-toggle-btn.active {\n    background: var(--%NS%kit-primary);\n    color: var(--%NS%kit-on-primary);\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  }\n\n  .kit-filter-bar .quick-toolbar {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    width: 100%;\n    flex-wrap: wrap;\n  }\n\n  .kit-filter-bar .quick-search-box {\n    position: relative;\n    flex: 1 1 240px;\n    min-width: 180px;\n    display: flex;\n    align-items: center;\n  }\n\n  .kit-filter-bar .search-icon-wrapper {\n    position: absolute;\n    left: 0.875rem;\n    top: 50%;\n    transform: translateY(-50%);\n    pointer-events: none;\n    color: var(--%NS%kit-on-surface-variant);\n    display: flex;\n    align-items: center;\n    z-index: 1;\n  }\n\n  .kit-filter-bar .quick-search-input {\n    padding-left: 2.5rem !important;\n    padding-right: 2.25rem !important;\n  }\n\n  .kit-filter-bar .clear-search-btn {\n    position: absolute;\n    right: 0.625rem;\n    top: 50%;\n    transform: translateY(-50%);\n    background: transparent;\n    border: none;\n    color: var(--%NS%kit-on-surface-variant);\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 4px;\n    border-radius: 50%;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease;\n    z-index: 2;\n  }\n\n  .kit-filter-bar .clear-search-btn:hover {\n    background: var(--%NS%kit-surface-container-highest);\n    color: var(--%NS%kit-on-surface);\n  }\n\n  .kit-filter-bar .segmented-status-group {\n    display: inline-flex;\n    flex-wrap: wrap;\n    align-items: center;\n    background: transparent;\n    border: none;\n    border-radius: 0;\n    padding: 0;\n    gap: 6px;\n    height: auto;\n    box-sizing: border-box;\n  }\n\n  .kit-filter-bar .status-pill-btn {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    background: var(--%NS%kit-surface-container-high);\n    border: 1px solid var(--%NS%kit-outline);\n    border-radius: var(--%NS%kit-radius-full);\n    padding: 0.3125rem 0.875rem;\n    font-family: var(--%NS%kit-font-sans);\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: var(--%NS%kit-on-surface-variant);\n    cursor: pointer;\n    transition:\n      background-color 200ms var(--%NS%kit-ease-emphasized),\n      border-color 200ms var(--%NS%kit-ease-emphasized),\n      color 180ms var(--%NS%kit-ease-standard),\n      transform var(--%NS%kit-duration-fast) var(--%NS%kit-ease-spring),\n      box-shadow 200ms var(--%NS%kit-ease-standard);\n    white-space: nowrap;\n    height: 38px;\n    flex-shrink: 0;\n  }\n\n  .kit-filter-bar .status-pill-btn:hover {\n    color: var(--%NS%kit-on-surface);\n    background: var(--%NS%kit-surface-container-highest);\n  }\n\n  .kit-filter-bar .status-pill-btn:active {\n    transform: scale(0.96);\n  }\n\n  .kit-filter-bar .status-pill-btn.active {\n    background: var(--%NS%kit-primary);\n    color: var(--%NS%kit-on-primary);\n    border-color: var(--%NS%kit-primary);\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  }\n\n  .kit-filter-bar .status-pill-btn.deals-pill.active {\n    background: #ef4444;\n    color: #ffffff;\n    border-color: #dc2626;\n    box-shadow: 0 1px 4px rgba(239, 68, 68, 0.4);\n  }\n\n  .kit-filter-bar .pill-fire-icon {\n    display: inline-flex;\n    align-items: center;\n    line-height: 1;\n  }\n\n  .kit-filter-bar .quick-toolbar > kit-select {\n    display: block;\n    min-width: 170px;\n    flex: 0 1 190px;\n    max-width: 100%;\n  }\n\n  .kit-filter-bar .quick-sort-wrapper {\n    width: 100%;\n    min-width: 0;\n    flex: 0 1 190px;\n  }\n\n  .kit-filter-bar .quick-sort-trigger {\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    gap: 6px;\n  }\n\n  .kit-filter-bar .sort-icon-prefix {\n    display: inline-flex;\n    align-items: center;\n    color: var(--%NS%kit-on-surface-variant);\n    flex-shrink: 0;\n  }\n\n  .kit-filter-bar .more-filters-btn {\n    display: inline-flex;\n    align-items: center;\n    gap: 8px;\n    height: 46px;\n    padding: 0 16px;\n    border-radius: var(--%NS%kit-radius-sm);\n    border: 1px solid var(--%NS%kit-outline);\n    background: var(--%NS%kit-surface-container-high);\n    color: var(--%NS%kit-on-surface);\n    font-family: var(--%NS%kit-font-sans);\n    font-size: 0.875rem;\n    font-weight: 600;\n    cursor: pointer;\n    transition: all 0.2s ease;\n    white-space: nowrap;\n    flex-shrink: 0;\n  }\n\n  .kit-filter-bar .more-filters-btn:hover {\n    background: var(--%NS%kit-surface-container-highest);\n  }\n\n  .kit-filter-bar .more-filters-btn.drawer-active {\n    border-color: var(--%NS%kit-primary);\n    background: var(--%NS%m3-secondary-container, var(--%NS%kit-primary-container));\n    color: var(--%NS%m3-on-secondary-container, var(--%NS%kit-on-primary-container));\n  }\n\n  @keyframes kitBadgePop {\n    from {\n      opacity: 0;\n      transform: scale(0.6);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n\n  @keyframes kitDrawerInnerClip {\n    0%,\n    99% {\n      overflow: hidden;\n    }\n    100% {\n      overflow: visible;\n    }\n  }\n\n  .kit-filter-bar .filter-count-badge {\n    background: var(--%NS%kit-primary);\n    color: var(--%NS%kit-on-primary);\n    font-size: 0.75rem;\n    font-weight: 700;\n    border-radius: 999px;\n    padding: 1px 7px;\n    line-height: 1.4;\n    animation: kitBadgePop 200ms var(--%NS%kit-ease-spring) both;\n  }\n\n  .kit-filter-bar .secondary-filters-drawer {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr);\n    grid-template-rows: 1fr;\n    width: 100%;\n    margin-top: 16px;\n    padding-top: 16px;\n    border-top: 1px solid var(--%NS%kit-outline-variant);\n    opacity: 1;\n    visibility: visible;\n    transition:\n      grid-template-rows var(--%NS%kit-duration-medium) var(--%NS%kit-ease-smooth),\n      opacity 200ms var(--%NS%kit-ease-standard),\n      margin-top var(--%NS%kit-duration-medium) var(--%NS%kit-ease-smooth),\n      padding-top var(--%NS%kit-duration-medium) var(--%NS%kit-ease-smooth),\n      border-top-width 200ms var(--%NS%kit-ease-standard),\n      visibility 0s linear 0s;\n  }\n\n  .kit-filter-bar .secondary-filters-drawer-inner {\n    min-height: 0;\n    min-width: 0;\n    max-width: 100%;\n    overflow: visible;\n  }\n\n  .kit-filter-bar\n    .secondary-filters-drawer:not(.drawer-collapsed)\n    .secondary-filters-drawer-inner {\n    animation: kitDrawerInnerClip var(--%NS%kit-duration-medium) step-end both;\n  }\n\n  .kit-filter-bar .secondary-filters-drawer.drawer-collapsed {\n    grid-template-rows: 0fr;\n    opacity: 0;\n    visibility: hidden;\n    pointer-events: none;\n    overflow: hidden;\n    margin-top: 0;\n    padding-top: 0;\n    border-top-width: 0;\n    transition:\n      grid-template-rows var(--%NS%kit-duration-medium) var(--%NS%kit-ease-smooth),\n      opacity 160ms var(--%NS%kit-ease-exit),\n      margin-top var(--%NS%kit-duration-medium) var(--%NS%kit-ease-smooth),\n      padding-top var(--%NS%kit-duration-medium) var(--%NS%kit-ease-smooth),\n      border-top-width 160ms var(--%NS%kit-ease-exit),\n      visibility 0s linear var(--%NS%kit-duration-medium);\n  }\n\n  .kit-filter-bar\n    .secondary-filters-drawer.drawer-collapsed\n    .secondary-filters-drawer-inner {\n    overflow: hidden;\n    animation: none;\n  }\n\n  .kit-filter-bar .drawer-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex-wrap: wrap;\n    gap: 8px;\n    margin-bottom: 16px;\n  }\n\n  .kit-filter-bar .drawer-title {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n  }\n\n  .kit-filter-bar .drawer-heading {\n    font-size: 0.875rem;\n    font-weight: 700;\n    color: var(--%NS%kit-on-surface);\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .kit-filter-bar .active-tag {\n    background: var(--%NS%kit-primary-container);\n    color: var(--%NS%kit-on-primary-container);\n    font-size: 0.75rem;\n    font-weight: 700;\n    padding: 2px 8px;\n    border-radius: var(--%NS%kit-radius-full);\n  }\n\n  .kit-filter-bar .drawer-actions {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n  }\n\n  .kit-filter-bar .reset-filters-btn {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    background: transparent;\n    border: 1px solid var(--%NS%kit-outline);\n    border-radius: var(--%NS%kit-radius-full);\n    padding: 0.375rem 0.875rem;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: var(--%NS%kit-primary);\n    cursor: pointer;\n    transition: all 0.2s;\n  }\n\n  .kit-filter-bar .reset-filters-btn:hover {\n    background: var(--%NS%kit-surface-container-highest);\n    border-color: var(--%NS%kit-primary);\n  }\n\n  .kit-filter-bar .drawer-close-btn {\n    background: transparent;\n    border: none;\n    color: var(--%NS%kit-on-surface-variant);\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 4px;\n    border-radius: 50%;\n    transition: all 0.2s;\n  }\n\n  .kit-filter-bar .drawer-close-btn:hover {\n    background: var(--%NS%kit-surface-container-highest);\n    color: var(--%NS%kit-on-surface);\n  }\n\n  .kit-filter-bar .secondary-filters-grid {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 16px;\n    align-items: flex-end;\n    width: 100%;\n    max-width: 100%;\n    min-width: 0;\n  }\n\n  .kit-filter-bar .secondary-filters-grid > kit-select,\n  .kit-filter-bar .secondary-filters-grid > kit-combobox,\n  .kit-filter-bar .secondary-filters-grid > kit-multiselect {\n    display: block;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  @media (max-width: 768px) {\n    .kit-filter-bar .filter-bar {\n      padding: 16px;\n    }\n    .kit-filter-bar .quick-toolbar {\n      gap: 8px;\n    }\n    .kit-filter-bar .quick-search-box {\n      flex: 1 1 100%;\n      min-width: 0;\n      max-width: 100%;\n    }\n    .kit-filter-bar .segmented-status-group {\n      display: flex;\n      width: 100%;\n      max-width: 100%;\n      justify-content: flex-start;\n      flex-shrink: 0;\n      overflow: visible;\n    }\n    .kit-filter-bar .status-pill-btn {\n      height: 32px;\n      padding: 0.25rem 0.6875rem;\n      font-size: 0.75rem;\n    }\n    .kit-filter-bar .quick-toolbar > kit-select {\n      flex: 1 1 0;\n      min-width: 0;\n      max-width: 100%;\n    }\n    .kit-filter-bar .quick-sort-wrapper {\n      flex: 1 1 0;\n      min-width: 0;\n      width: 100%;\n    }\n    .kit-filter-bar .secondary-filters-grid > kit-select,\n    .kit-filter-bar .secondary-filters-grid > kit-combobox,\n    .kit-filter-bar .secondary-filters-grid > kit-multiselect,\n    .kit-filter-bar .secondary-filters-grid > .filter-group {\n      min-width: 0;\n      max-width: 100%;\n      flex: 1 1 calc(50% - 8px);\n    }\n    .kit-filter-bar .filter-group {\n      min-width: 0;\n      max-width: 100%;\n      width: 100%;\n      flex: 1 1 calc(50% - 8px);\n    }\n    .kit-filter-bar .secondary-filters-grid .dropdown-list,\n    .kit-filter-bar .secondary-filters-grid .dropdown-list.animate-expressive {\n      max-width: 100%;\n    }\n    .kit-filter-bar .toolbar-auxiliary-row {\n      flex-wrap: wrap;\n      gap: 8px;\n    }\n  }\n\n  @media (max-width: 480px) {\n    .kit-filter-bar .secondary-filters-grid > kit-select,\n    .kit-filter-bar .secondary-filters-grid > kit-combobox,\n    .kit-filter-bar .secondary-filters-grid > kit-multiselect,\n    .kit-filter-bar .secondary-filters-grid > .filter-group,\n    .kit-filter-bar .filter-group {\n      flex: 1 1 100%;\n      width: 100%;\n    }\n    .kit-filter-bar .secondary-filters-grid .dropdown-list,\n    .kit-filter-bar .secondary-filters-grid .dropdown-list.animate-expressive {\n      width: 100%;\n      max-width: 100%;\n    }\n    .kit-filter-bar .toolbar-auxiliary-row {\n      flex-direction: column;\n      align-items: flex-start;\n      gap: 8px;\n    }\n    .kit-filter-bar .toolbar-auxiliary-row .view-toggle-group {\n      align-self: flex-end;\n    }\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    .kit-filter-bar * {\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n      transition-duration: 0.01ms !important;\n    }\n  }\n"], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitFilterBarComponent, [{
        type: Component,
        args: [{ selector: 'kit-filter-bar', standalone: true, imports: [FormsModule, DatePipe, KitIconComponent], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div
      class="kit-filter-bar filter-wrapper animate-expressive animate-stagger-1"
    >
      <div class="filter-bar m3-surface-container mb-lg">
        <!-- Tier 1: Quick Toolbar -->
        <div class="quick-toolbar">
          <!-- Search input -->
          <div class="quick-search-box">
            <span class="search-icon-wrapper" aria-hidden="true">
              <svg
                class="search-svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              class="m3-input quick-search-input"
              [attr.placeholder]="searchPlaceholder()"
              [attr.aria-label]="searchAriaLabel() || null"
              [ngModel]="searchInput()"
              (ngModelChange)="onQuickSearchInput($event)"
              (keydown.enter)="onQuickSearchEnter($event)"
              [attr.id]="searchInputId() || null"
              autocomplete="off"
            />
            @if (searchInput()) {
              <button
                type="button"
                class="clear-search-btn"
                (click)="clearQuickSearch()"
                aria-label="Clear search"
              >
                <kit-icon name="close" [size]="14" />
              </button>
            }
          </div>

          <!-- Segmented Quick Status Pills -->
          @if (quickPills().length > 0) {
            <div
              class="segmented-status-group"
              role="group"
              [attr.aria-label]="quickPillsAriaLabel()"
            >
              @for (pill of quickPills(); track pill.id) {
                <button
                  type="button"
                  class="status-pill-btn state-layer"
                  [class.deals-pill]="pill.variant === 'deals'"
                  [class.active]="pill.active"
                  [attr.title]="pill.title || null"
                  (click)="quickPillClick.emit(pill.id)"
                >
                  @if (pill.icon) {
                    <span class="pill-fire-icon">
                      <kit-icon [name]="pill.icon" [size]="14" />
                    </span>
                  }
                  {{ pill.label }}
                </button>
              }
            </div>
          }

          <ng-content select="[kitFilterPills]" />

          <!-- Optional Quick Sort By Slot -->
          <ng-content select="[kitFilterQuickSort]" />

          <!-- More Filters Toggle Button -->
          <button
            type="button"
            class="m3-button m3-button-outlined more-filters-btn"
            [class.drawer-active]="showDrawer() || activeFilterCount() > 0"
            (click)="showDrawer.set(!showDrawer())"
            id="toggle-more-filters"
            aria-haspopup="true"
            [attr.aria-expanded]="showDrawer()"
          >
            <kit-icon name="tune" [size]="16" />
            <span>Filters</span>
            @if (activeFilterCount() > 0) {
              <span class="filter-count-badge">{{ activeFilterCount() }}</span>
            }
          </button>
        </div>

        <!-- Auxiliary Row: Count & Layout Toggle -->
        <div class="toolbar-auxiliary-row flex items-center justify-between">
          <div class="filter-info flex items-center gap-xs">
            <span class="count-badge">
              {{ resultCount() }} {{ resultCountNoun() }}
            </span>
            @if (lastUpdated()) {
              <span
                class="sync-timestamp"
                [title]="
                  'Last synced with server: ' + (lastUpdated() | date: 'medium')
                "
              >
                • Updated {{ lastUpdated() | date: 'shortTime' }}
              </span>
            }
          </div>

          @if (viewModes().length > 0) {
            <div
              class="view-toggle-group"
              role="group"
              aria-label="View layout"
            >
              @for (vm of viewModes(); track vm.value) {
                <button
                  type="button"
                  class="view-toggle-btn state-layer"
                  [class.active]="viewMode() === vm.value"
                  (click)="onViewModeSelect(vm.value)"
                  [attr.title]="vm.title"
                  [attr.aria-label]="vm.ariaLabel"
                >
                  <kit-icon [name]="vm.icon" [size]="16" />
                </button>
              }
            </div>
          }
        </div>

        <!-- Tier 2: Collapsible Secondary Filter Drawer -->
        <div
          class="secondary-filters-drawer"
          [class.drawer-collapsed]="!showDrawer()"
        >
          <div class="secondary-filters-drawer-inner">
            <div class="drawer-header flex items-center justify-between">
              <div class="drawer-title flex items-center gap-xs">
                <span class="drawer-heading">Advanced Filters</span>
                @if (activeFilterCount() > 0) {
                  <span class="active-tag"
                    >{{ activeFilterCount() }} active</span
                  >
                }
              </div>
              <div class="drawer-actions flex items-center gap-sm">
                <button
                  type="button"
                  class="m3-button m3-button-text reset-filters-btn"
                  (click)="onResetClick()"
                  [attr.title]="resetTitle()"
                >
                  <kit-icon name="refresh" [size]="14" />
                  <span>Reset All</span>
                </button>
                <button
                  type="button"
                  class="drawer-close-btn"
                  (click)="showDrawer.set(false)"
                  aria-label="Close filters drawer"
                >
                  <kit-icon name="close" [size]="16" />
                </button>
              </div>
            </div>

            <div class="secondary-filters-grid">
              <ng-content />
            </div>
          </div>
        </div>
      </div>
    </div>
  `, styles: ["\n  kit-select,\n  kit-combobox,\n  kit-multiselect {\n    display: block;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .flex {\n    display: flex;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .items-center {\n    align-items: center;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .justify-between {\n    justify-content: space-between;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .gap-xs {\n    gap: 6px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .gap-sm {\n    gap: 10px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .pr-xs {\n    padding-right: 4px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .filter-group {\n    display: flex;\n    flex-direction: column;\n    gap: var(--spacing-8, 8px);\n    min-width: 0;\n    max-width: 100%;\n    width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .filter-group-header {\n    display: flex;\n    align-items: center;\n    min-height: 20px;\n    gap: 8px;\n    flex-wrap: wrap;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .m3-label {\n    font-size: 0.75rem;\n    font-weight: 700;\n    color: var(--kit-primary);\n    margin-left: 4px;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    line-height: 1;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper {\n    position: relative;\n    display: flex;\n    align-items: center;\n    width: 100%;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-wrapper.active-wrapper {\n    z-index: 60;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .m3-input {\n    box-sizing: border-box;\n    height: var(--kit-input-height, 46px);\n    background: var(--kit-surface-container-high);\n    border: 1px solid var(--kit-outline);\n    color: var(--kit-on-surface);\n    padding: 0 2.75rem 0 1rem;\n    border-radius: var(--kit-radius-sm);\n    font-family: var(--kit-font-sans);\n    font-size: var(--kit-input-font-size, 0.9375rem);\n    line-height: normal;\n    outline: none;\n    transition:\n      border-color 0.2s ease,\n      background-color 0.2s ease,\n      box-shadow 0.2s ease;\n    width: 100%;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:hover:not(:disabled) {\n    background: var(--kit-surface-container-highest);\n    border-color: var(--kit-outline);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:disabled {\n    opacity: 0.55;\n    cursor: not-allowed;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:focus,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger.open,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .list-input.open {\n    border-color: var(--kit-primary);\n    background: var(--kit-surface-container-highest);\n    box-shadow: 0 0 0 1px var(--kit-primary);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-icon-wrapper {\n    position: absolute;\n    right: 1rem;\n    top: 50%;\n    transform: translateY(-50%);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    pointer-events: none;\n    color: var(--kit-on-surface-variant);\n    transition: color 0.2s ease;\n    z-index: 1;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-chevron {\n    width: 18px;\n    height: 18px;\n    transition:\n      transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),\n      color 0.2s ease;\n    flex-shrink: 0;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-chevron.open {\n    transform: rotate(180deg);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper:hover\n    .dropdown-icon-wrapper,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper:focus-within\n    .dropdown-icon-wrapper,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger.open\n    .dropdown-icon-wrapper {\n    color: var(--kit-primary);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger {\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    cursor: pointer;\n    text-align: left;\n    padding-left: 1rem;\n    padding-right: 2.75rem;\n    position: relative;\n    user-select: none;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .trigger-text {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  @keyframes kitDropdownEnter {\n    from {\n      opacity: 0;\n      transform: translateY(-6px) scaleY(0.92);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0) scaleY(1);\n    }\n  }\n\n  @keyframes kitCheckPop {\n    from {\n      opacity: 0;\n      transform: scale(0.5);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-list,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-list.animate-expressive {\n    position: absolute;\n    top: calc(100% + 6px);\n    left: var(--kit-dropdown-left, 0);\n    right: var(--kit-dropdown-right, auto);\n    min-width: 100%;\n    width: var(--kit-dropdown-width, max-content);\n    max-width: var(--kit-dropdown-max-width, min(340px, calc(100vw - 48px)));\n    z-index: 100;\n    background: var(--kit-surface-container-high);\n    backdrop-filter: blur(20px) contrast(95%);\n    -webkit-backdrop-filter: blur(20px) contrast(95%);\n    border: 1px solid var(--kit-outline);\n    border-radius: var(--kit-radius-sm);\n    padding: 0.375rem 0;\n    max-height: 280px;\n    overflow-y: auto;\n    box-shadow: 0 12px 36px 0 rgba(0, 0, 0, 0.45);\n    scrollbar-width: thin;\n    scrollbar-color: var(--kit-outline-variant) transparent;\n    transform-origin: top center;\n    animation: kitDropdownEnter 180ms var(--kit-ease-spring) both;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    width: 100%;\n    padding: 0.625rem 1rem;\n    cursor: pointer;\n    user-select: none;\n    background: transparent;\n    border: none;\n    font-family: var(--kit-font-sans);\n    font-size: 0.875rem;\n    color: var(--kit-on-surface);\n    text-align: left;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease;\n    gap: 0.75rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item:hover {\n    background: var(--kit-surface-container-highest);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item.selected {\n    background: var(--m3-secondary-container, var(--kit-primary-container));\n    color: var(--m3-on-secondary-container, var(--kit-on-primary-container));\n    font-weight: 600;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item.selected\n    .selected-check {\n    color: var(--m3-on-secondary-container, var(--kit-on-primary-container));\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .selected-check {\n    color: var(--kit-primary);\n    flex-shrink: 0;\n    animation: kitCheckPop 180ms var(--kit-ease-spring) both;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .item-label {\n    font-size: 0.875rem;\n    color: inherit;\n    text-transform: none;\n    letter-spacing: normal;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-group-header {\n    padding: 0.6rem 1rem 0.25rem 1rem;\n    font-size: 0.7rem;\n    font-weight: 700;\n    color: var(--kit-primary);\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    pointer-events: none;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .child-platform {\n    padding-left: 1.75rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .sub-platform-arrow {\n    color: var(--kit-on-surface-variant);\n    margin-right: 0.35rem;\n    font-size: 0.85rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-empty {\n    padding: 0.75rem 1rem;\n    font-size: 0.85rem;\n    color: var(--kit-on-surface-variant);\n    text-align: center;\n  }\n", "\n  .kit-filter-bar {\n    display: block;\n    position: relative;\n    z-index: 20;\n    width: 100%;\n    max-width: 100%;\n    min-width: 0;\n  }\n\n  .kit-filter-bar .mb-lg {\n    margin-bottom: var(--spacing-32, 24px);\n  }\n\n  .kit-filter-bar .filter-bar {\n    background: var(--kit-surface-container);\n    border-radius: var(--kit-radius-md);\n    border: 1px solid var(--kit-outline-variant);\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    position: relative;\n    z-index: 20;\n    padding: var(--spacing-16, 16px) var(--spacing-24, 24px);\n    width: 100%;\n    max-width: 100%;\n    min-width: 0;\n    box-sizing: border-box;\n  }\n\n  .kit-filter-bar .filter-group {\n    min-width: 160px;\n  }\n\n  .kit-filter-bar .toolbar-auxiliary-row {\n    margin-top: 12px;\n  }\n\n  .kit-filter-bar .count-badge {\n    font-size: 0.82rem;\n    font-weight: 600;\n    color: var(--kit-on-surface-variant);\n  }\n\n  .kit-filter-bar .sync-timestamp {\n    font-size: 0.78rem;\n    color: var(--kit-on-surface-variant);\n    opacity: 0.85;\n  }\n\n  .kit-filter-bar .view-toggle-group {\n    display: inline-flex;\n    align-items: center;\n    background: var(--kit-surface-container-high);\n    border: 1px solid var(--kit-outline);\n    border-radius: var(--kit-radius-sm);\n    padding: 3px;\n    gap: 2px;\n    box-sizing: border-box;\n    height: 46px;\n  }\n\n  .kit-filter-bar .view-toggle-btn {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    background: transparent;\n    color: var(--kit-on-surface-variant);\n    border: none;\n    border-radius: calc(var(--kit-radius-sm) - 4px);\n    width: 38px;\n    height: 38px;\n    cursor: pointer;\n    transition:\n      background-color var(--kit-duration-fast) var(--kit-ease-standard),\n      color var(--kit-duration-fast) var(--kit-ease-standard),\n      transform var(--kit-duration-fast) var(--kit-ease-spring),\n      box-shadow var(--kit-duration-fast) var(--kit-ease-standard);\n  }\n\n  .kit-filter-bar .view-toggle-btn:hover {\n    background: var(--kit-surface-container-highest);\n    color: var(--kit-on-surface);\n  }\n\n  .kit-filter-bar .view-toggle-btn:active {\n    transform: scale(0.94);\n  }\n\n  .kit-filter-bar .view-toggle-btn.active {\n    background: var(--kit-primary);\n    color: var(--kit-on-primary);\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  }\n\n  .kit-filter-bar .quick-toolbar {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    width: 100%;\n    flex-wrap: wrap;\n  }\n\n  .kit-filter-bar .quick-search-box {\n    position: relative;\n    flex: 1 1 240px;\n    min-width: 180px;\n    display: flex;\n    align-items: center;\n  }\n\n  .kit-filter-bar .search-icon-wrapper {\n    position: absolute;\n    left: 0.875rem;\n    top: 50%;\n    transform: translateY(-50%);\n    pointer-events: none;\n    color: var(--kit-on-surface-variant);\n    display: flex;\n    align-items: center;\n    z-index: 1;\n  }\n\n  .kit-filter-bar .quick-search-input {\n    padding-left: 2.5rem !important;\n    padding-right: 2.25rem !important;\n  }\n\n  .kit-filter-bar .clear-search-btn {\n    position: absolute;\n    right: 0.625rem;\n    top: 50%;\n    transform: translateY(-50%);\n    background: transparent;\n    border: none;\n    color: var(--kit-on-surface-variant);\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 4px;\n    border-radius: 50%;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease;\n    z-index: 2;\n  }\n\n  .kit-filter-bar .clear-search-btn:hover {\n    background: var(--kit-surface-container-highest);\n    color: var(--kit-on-surface);\n  }\n\n  .kit-filter-bar .segmented-status-group {\n    display: inline-flex;\n    flex-wrap: wrap;\n    align-items: center;\n    background: transparent;\n    border: none;\n    border-radius: 0;\n    padding: 0;\n    gap: 6px;\n    height: auto;\n    box-sizing: border-box;\n  }\n\n  .kit-filter-bar .status-pill-btn {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    background: var(--kit-surface-container-high);\n    border: 1px solid var(--kit-outline);\n    border-radius: var(--kit-radius-full);\n    padding: 0.3125rem 0.875rem;\n    font-family: var(--kit-font-sans);\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: var(--kit-on-surface-variant);\n    cursor: pointer;\n    transition:\n      background-color 200ms var(--kit-ease-emphasized),\n      border-color 200ms var(--kit-ease-emphasized),\n      color 180ms var(--kit-ease-standard),\n      transform var(--kit-duration-fast) var(--kit-ease-spring),\n      box-shadow 200ms var(--kit-ease-standard);\n    white-space: nowrap;\n    height: 38px;\n    flex-shrink: 0;\n  }\n\n  .kit-filter-bar .status-pill-btn:hover {\n    color: var(--kit-on-surface);\n    background: var(--kit-surface-container-highest);\n  }\n\n  .kit-filter-bar .status-pill-btn:active {\n    transform: scale(0.96);\n  }\n\n  .kit-filter-bar .status-pill-btn.active {\n    background: var(--kit-primary);\n    color: var(--kit-on-primary);\n    border-color: var(--kit-primary);\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  }\n\n  .kit-filter-bar .status-pill-btn.deals-pill.active {\n    background: #ef4444;\n    color: #ffffff;\n    border-color: #dc2626;\n    box-shadow: 0 1px 4px rgba(239, 68, 68, 0.4);\n  }\n\n  .kit-filter-bar .pill-fire-icon {\n    display: inline-flex;\n    align-items: center;\n    line-height: 1;\n  }\n\n  .kit-filter-bar .quick-toolbar > kit-select {\n    display: block;\n    min-width: 170px;\n    flex: 0 1 190px;\n    max-width: 100%;\n  }\n\n  .kit-filter-bar .quick-sort-wrapper {\n    width: 100%;\n    min-width: 0;\n    flex: 0 1 190px;\n  }\n\n  .kit-filter-bar .quick-sort-trigger {\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    gap: 6px;\n  }\n\n  .kit-filter-bar .sort-icon-prefix {\n    display: inline-flex;\n    align-items: center;\n    color: var(--kit-on-surface-variant);\n    flex-shrink: 0;\n  }\n\n  .kit-filter-bar .more-filters-btn {\n    display: inline-flex;\n    align-items: center;\n    gap: 8px;\n    height: 46px;\n    padding: 0 16px;\n    border-radius: var(--kit-radius-sm);\n    border: 1px solid var(--kit-outline);\n    background: var(--kit-surface-container-high);\n    color: var(--kit-on-surface);\n    font-family: var(--kit-font-sans);\n    font-size: 0.875rem;\n    font-weight: 600;\n    cursor: pointer;\n    transition: all 0.2s ease;\n    white-space: nowrap;\n    flex-shrink: 0;\n  }\n\n  .kit-filter-bar .more-filters-btn:hover {\n    background: var(--kit-surface-container-highest);\n  }\n\n  .kit-filter-bar .more-filters-btn.drawer-active {\n    border-color: var(--kit-primary);\n    background: var(--m3-secondary-container, var(--kit-primary-container));\n    color: var(--m3-on-secondary-container, var(--kit-on-primary-container));\n  }\n\n  @keyframes kitBadgePop {\n    from {\n      opacity: 0;\n      transform: scale(0.6);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n\n  @keyframes kitDrawerInnerClip {\n    0%,\n    99% {\n      overflow: hidden;\n    }\n    100% {\n      overflow: visible;\n    }\n  }\n\n  .kit-filter-bar .filter-count-badge {\n    background: var(--kit-primary);\n    color: var(--kit-on-primary);\n    font-size: 0.75rem;\n    font-weight: 700;\n    border-radius: 999px;\n    padding: 1px 7px;\n    line-height: 1.4;\n    animation: kitBadgePop 200ms var(--kit-ease-spring) both;\n  }\n\n  .kit-filter-bar .secondary-filters-drawer {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr);\n    grid-template-rows: 1fr;\n    width: 100%;\n    margin-top: 16px;\n    padding-top: 16px;\n    border-top: 1px solid var(--kit-outline-variant);\n    opacity: 1;\n    visibility: visible;\n    transition:\n      grid-template-rows var(--kit-duration-medium) var(--kit-ease-smooth),\n      opacity 200ms var(--kit-ease-standard),\n      margin-top var(--kit-duration-medium) var(--kit-ease-smooth),\n      padding-top var(--kit-duration-medium) var(--kit-ease-smooth),\n      border-top-width 200ms var(--kit-ease-standard),\n      visibility 0s linear 0s;\n  }\n\n  .kit-filter-bar .secondary-filters-drawer-inner {\n    min-height: 0;\n    min-width: 0;\n    max-width: 100%;\n    overflow: visible;\n  }\n\n  .kit-filter-bar\n    .secondary-filters-drawer:not(.drawer-collapsed)\n    .secondary-filters-drawer-inner {\n    animation: kitDrawerInnerClip var(--kit-duration-medium) step-end both;\n  }\n\n  .kit-filter-bar .secondary-filters-drawer.drawer-collapsed {\n    grid-template-rows: 0fr;\n    opacity: 0;\n    visibility: hidden;\n    pointer-events: none;\n    overflow: hidden;\n    margin-top: 0;\n    padding-top: 0;\n    border-top-width: 0;\n    transition:\n      grid-template-rows var(--kit-duration-medium) var(--kit-ease-smooth),\n      opacity 160ms var(--kit-ease-exit),\n      margin-top var(--kit-duration-medium) var(--kit-ease-smooth),\n      padding-top var(--kit-duration-medium) var(--kit-ease-smooth),\n      border-top-width 160ms var(--kit-ease-exit),\n      visibility 0s linear var(--kit-duration-medium);\n  }\n\n  .kit-filter-bar\n    .secondary-filters-drawer.drawer-collapsed\n    .secondary-filters-drawer-inner {\n    overflow: hidden;\n    animation: none;\n  }\n\n  .kit-filter-bar .drawer-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex-wrap: wrap;\n    gap: 8px;\n    margin-bottom: 16px;\n  }\n\n  .kit-filter-bar .drawer-title {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n  }\n\n  .kit-filter-bar .drawer-heading {\n    font-size: 0.875rem;\n    font-weight: 700;\n    color: var(--kit-on-surface);\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .kit-filter-bar .active-tag {\n    background: var(--kit-primary-container);\n    color: var(--kit-on-primary-container);\n    font-size: 0.75rem;\n    font-weight: 700;\n    padding: 2px 8px;\n    border-radius: var(--kit-radius-full);\n  }\n\n  .kit-filter-bar .drawer-actions {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n  }\n\n  .kit-filter-bar .reset-filters-btn {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    background: transparent;\n    border: 1px solid var(--kit-outline);\n    border-radius: var(--kit-radius-full);\n    padding: 0.375rem 0.875rem;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: var(--kit-primary);\n    cursor: pointer;\n    transition: all 0.2s;\n  }\n\n  .kit-filter-bar .reset-filters-btn:hover {\n    background: var(--kit-surface-container-highest);\n    border-color: var(--kit-primary);\n  }\n\n  .kit-filter-bar .drawer-close-btn {\n    background: transparent;\n    border: none;\n    color: var(--kit-on-surface-variant);\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 4px;\n    border-radius: 50%;\n    transition: all 0.2s;\n  }\n\n  .kit-filter-bar .drawer-close-btn:hover {\n    background: var(--kit-surface-container-highest);\n    color: var(--kit-on-surface);\n  }\n\n  .kit-filter-bar .secondary-filters-grid {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 16px;\n    align-items: flex-end;\n    width: 100%;\n    max-width: 100%;\n    min-width: 0;\n  }\n\n  .kit-filter-bar .secondary-filters-grid > kit-select,\n  .kit-filter-bar .secondary-filters-grid > kit-combobox,\n  .kit-filter-bar .secondary-filters-grid > kit-multiselect {\n    display: block;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  @media (max-width: 768px) {\n    .kit-filter-bar .filter-bar {\n      padding: 16px;\n    }\n    .kit-filter-bar .quick-toolbar {\n      gap: 8px;\n    }\n    .kit-filter-bar .quick-search-box {\n      flex: 1 1 100%;\n      min-width: 0;\n      max-width: 100%;\n    }\n    .kit-filter-bar .segmented-status-group {\n      display: flex;\n      width: 100%;\n      max-width: 100%;\n      justify-content: flex-start;\n      flex-shrink: 0;\n      overflow: visible;\n    }\n    .kit-filter-bar .status-pill-btn {\n      height: 32px;\n      padding: 0.25rem 0.6875rem;\n      font-size: 0.75rem;\n    }\n    .kit-filter-bar .quick-toolbar > kit-select {\n      flex: 1 1 0;\n      min-width: 0;\n      max-width: 100%;\n    }\n    .kit-filter-bar .quick-sort-wrapper {\n      flex: 1 1 0;\n      min-width: 0;\n      width: 100%;\n    }\n    .kit-filter-bar .secondary-filters-grid > kit-select,\n    .kit-filter-bar .secondary-filters-grid > kit-combobox,\n    .kit-filter-bar .secondary-filters-grid > kit-multiselect,\n    .kit-filter-bar .secondary-filters-grid > .filter-group {\n      min-width: 0;\n      max-width: 100%;\n      flex: 1 1 calc(50% - 8px);\n    }\n    .kit-filter-bar .filter-group {\n      min-width: 0;\n      max-width: 100%;\n      width: 100%;\n      flex: 1 1 calc(50% - 8px);\n    }\n    .kit-filter-bar .secondary-filters-grid .dropdown-list,\n    .kit-filter-bar .secondary-filters-grid .dropdown-list.animate-expressive {\n      max-width: 100%;\n    }\n    .kit-filter-bar .toolbar-auxiliary-row {\n      flex-wrap: wrap;\n      gap: 8px;\n    }\n  }\n\n  @media (max-width: 480px) {\n    .kit-filter-bar .secondary-filters-grid > kit-select,\n    .kit-filter-bar .secondary-filters-grid > kit-combobox,\n    .kit-filter-bar .secondary-filters-grid > kit-multiselect,\n    .kit-filter-bar .secondary-filters-grid > .filter-group,\n    .kit-filter-bar .filter-group {\n      flex: 1 1 100%;\n      width: 100%;\n    }\n    .kit-filter-bar .secondary-filters-grid .dropdown-list,\n    .kit-filter-bar .secondary-filters-grid .dropdown-list.animate-expressive {\n      width: 100%;\n      max-width: 100%;\n    }\n    .kit-filter-bar .toolbar-auxiliary-row {\n      flex-direction: column;\n      align-items: flex-start;\n      gap: 8px;\n    }\n    .kit-filter-bar .toolbar-auxiliary-row .view-toggle-group {\n      align-self: flex-end;\n    }\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    .kit-filter-bar * {\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n      transition-duration: 0.01ms !important;\n    }\n  }\n"] }]
    }], null, { search: [{ type: i0.Input, args: [{ isSignal: true, alias: "search", required: false }] }], searchPlaceholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "searchPlaceholder", required: false }] }], searchInputId: [{ type: i0.Input, args: [{ isSignal: true, alias: "searchInputId", required: false }] }], searchAriaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "searchAriaLabel", required: false }] }], searchDebounceMs: [{ type: i0.Input, args: [{ isSignal: true, alias: "searchDebounceMs", required: false }] }], quickPills: [{ type: i0.Input, args: [{ isSignal: true, alias: "quickPills", required: false }] }], quickPillsAriaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "quickPillsAriaLabel", required: false }] }], activeFilterCount: [{ type: i0.Input, args: [{ isSignal: true, alias: "activeFilterCount", required: false }] }], resultCount: [{ type: i0.Input, args: [{ isSignal: true, alias: "resultCount", required: false }] }], resultCountNoun: [{ type: i0.Input, args: [{ isSignal: true, alias: "resultCountNoun", required: false }] }], lastUpdated: [{ type: i0.Input, args: [{ isSignal: true, alias: "lastUpdated", required: false }] }], viewMode: [{ type: i0.Input, args: [{ isSignal: true, alias: "viewMode", required: false }] }], viewModes: [{ type: i0.Input, args: [{ isSignal: true, alias: "viewModes", required: false }] }], resetTitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "resetTitle", required: false }] }], showDrawer: [{ type: i0.Input, args: [{ isSignal: true, alias: "showDrawer", required: false }] }, { type: i0.Output, args: ["showDrawerChange"] }], searchChange: [{ type: i0.Output, args: ["searchChange"] }], searchCleared: [{ type: i0.Output, args: ["searchCleared"] }], quickPillClick: [{ type: i0.Output, args: ["quickPillClick"] }], viewModeChange: [{ type: i0.Output, args: ["viewModeChange"] }], resetFilters: [{ type: i0.Output, args: ["resetFilters"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitFilterBarComponent, { className: "KitFilterBarComponent", filePath: "filter-bar.component.ts", lineNumber: 240 }); })();
