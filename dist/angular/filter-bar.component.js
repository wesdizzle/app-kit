import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, input, linkedSignal, model, output, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KitIconComponent } from './icon.component.js';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = [[["", "kitFilterPills", ""]], [["", "kitFilterQuickSort", ""]], "*"];
const _c1 = ["[kitFilterPills]", "[kitFilterQuickSort]", "*"];
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.value;
function KitFilterBarComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵlistener("click", function KitFilterBarComponent_Conditional_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearQuickSearch()); });
    i0.ɵɵelement(1, "kit-icon", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", 14);
} }
function KitFilterBarComponent_Conditional_10_For_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 33);
    i0.ɵɵelement(1, "kit-icon", 34);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const pill_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", pill_r4.icon)("size", 14);
} }
function KitFilterBarComponent_Conditional_10_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 32);
    i0.ɵɵlistener("click", function KitFilterBarComponent_Conditional_10_For_2_Template_button_click_0_listener() { const pill_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.quickPillClick.emit(pill_r4.id)); });
    i0.ɵɵconditionalCreate(1, KitFilterBarComponent_Conditional_10_For_2_Conditional_1_Template, 2, 2, "span", 33);
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
    i0.ɵɵrepeaterCreate(1, KitFilterBarComponent_Conditional_10_For_2_Template, 3, 7, "button", 31, _forTrack0);
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
    i0.ɵɵelementStart(0, "button", 36);
    i0.ɵɵlistener("click", function KitFilterBarComponent_Conditional_23_For_2_Template_button_click_0_listener() { const vm_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onViewModeSelect(vm_r6.value)); });
    i0.ɵɵelement(1, "kit-icon", 34);
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
    i0.ɵɵrepeaterCreate(1, KitFilterBarComponent_Conditional_23_For_2_Template, 2, 6, "button", 35, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.viewModes());
} }
function KitFilterBarComponent_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 23);
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
        this.search = input('', ...(ngDevMode ? [{ debugName: "search" }] : /* istanbul ignore next */ []));
        this.searchPlaceholder = input('Search by title or series...', ...(ngDevMode ? [{ debugName: "searchPlaceholder" }] : /* istanbul ignore next */ []));
        this.searchInputId = input('filter-name', ...(ngDevMode ? [{ debugName: "searchInputId" }] : /* istanbul ignore next */ []));
        this.searchAriaLabel = input('', ...(ngDevMode ? [{ debugName: "searchAriaLabel" }] : /* istanbul ignore next */ []));
        this.searchDebounceMs = input(150, ...(ngDevMode ? [{ debugName: "searchDebounceMs" }] : /* istanbul ignore next */ []));
        this.quickPills = input([], ...(ngDevMode ? [{ debugName: "quickPills" }] : /* istanbul ignore next */ []));
        this.quickPillsAriaLabel = input('Quick ownership filter', ...(ngDevMode ? [{ debugName: "quickPillsAriaLabel" }] : /* istanbul ignore next */ []));
        this.activeFilterCount = input(0, ...(ngDevMode ? [{ debugName: "activeFilterCount" }] : /* istanbul ignore next */ []));
        this.resultCount = input(0, ...(ngDevMode ? [{ debugName: "resultCount" }] : /* istanbul ignore next */ []));
        this.resultCountNoun = input('items', ...(ngDevMode ? [{ debugName: "resultCountNoun" }] : /* istanbul ignore next */ []));
        this.lastUpdated = input(null, ...(ngDevMode ? [{ debugName: "lastUpdated" }] : /* istanbul ignore next */ []));
        this.viewMode = input('grid', ...(ngDevMode ? [{ debugName: "viewMode" }] : /* istanbul ignore next */ []));
        this.viewModes = input(DEFAULT_KIT_VIEW_MODES, ...(ngDevMode ? [{ debugName: "viewModes" }] : /* istanbul ignore next */ []));
        this.resetTitle = input('Reset all filters back to Owned', ...(ngDevMode ? [{ debugName: "resetTitle" }] : /* istanbul ignore next */ []));
        this.showDrawer = model(false, ...(ngDevMode ? [{ debugName: "showDrawer" }] : /* istanbul ignore next */ []));
        this.searchChange = output();
        this.searchCleared = output();
        this.quickPillClick = output();
        this.viewModeChange = output();
        this.resetFilters = output();
        this.searchInput = linkedSignal(() => this.search(), ...(ngDevMode ? [{ debugName: "searchInput" }] : /* istanbul ignore next */ []));
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
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitFilterBarComponent, selectors: [["kit-filter-bar"]], inputs: { search: [1, "search"], searchPlaceholder: [1, "searchPlaceholder"], searchInputId: [1, "searchInputId"], searchAriaLabel: [1, "searchAriaLabel"], searchDebounceMs: [1, "searchDebounceMs"], quickPills: [1, "quickPills"], quickPillsAriaLabel: [1, "quickPillsAriaLabel"], activeFilterCount: [1, "activeFilterCount"], resultCount: [1, "resultCount"], resultCountNoun: [1, "resultCountNoun"], lastUpdated: [1, "lastUpdated"], viewMode: [1, "viewMode"], viewModes: [1, "viewModes"], resetTitle: [1, "resetTitle"], showDrawer: [1, "showDrawer"] }, outputs: { showDrawer: "showDrawerChange", searchChange: "searchChange", searchCleared: "searchCleared", quickPillClick: "quickPillClick", viewModeChange: "viewModeChange", resetFilters: "resetFilters" }, ngContentSelectors: _c1, decls: 39, vars: 21, consts: [[1, "kit-filter-bar", "filter-wrapper", "animate-expressive", "animate-stagger-1"], [1, "filter-bar", "m3-surface-container", "mb-lg"], [1, "quick-toolbar"], [1, "quick-search-box"], ["aria-hidden", "true", 1, "search-icon-wrapper"], ["viewBox", "0 0 24 24", "width", "18", "height", "18", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "search-svg"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], ["type", "text", "autocomplete", "off", 1, "m3-input", "quick-search-input", 3, "ngModelChange", "keydown.enter", "ngModel"], ["type", "button", "aria-label", "Clear search", 1, "clear-search-btn"], ["role", "group", 1, "segmented-status-group"], ["type", "button", "id", "toggle-more-filters", "aria-haspopup", "true", 1, "m3-button", "m3-button-outlined", "more-filters-btn", 3, "click"], ["name", "tune", 3, "size"], [1, "filter-count-badge"], [1, "toolbar-auxiliary-row", "flex", "items-center", "justify-between"], [1, "filter-info", "flex", "items-center", "gap-xs"], [1, "count-badge"], [1, "sync-timestamp", 3, "title"], ["role", "group", "aria-label", "View layout", 1, "view-toggle-group"], [1, "secondary-filters-drawer"], [1, "drawer-header", "flex", "items-center", "justify-between"], [1, "drawer-title", "flex", "items-center", "gap-xs"], [1, "drawer-heading"], [1, "active-tag"], [1, "drawer-actions", "flex", "items-center", "gap-sm"], ["type", "button", 1, "m3-button", "m3-button-text", "reset-filters-btn", 3, "click"], ["name", "refresh", 3, "size"], ["type", "button", "aria-label", "Close filters drawer", 1, "drawer-close-btn", 3, "click"], ["name", "close", 3, "size"], [1, "secondary-filters-grid"], ["type", "button", "aria-label", "Clear search", 1, "clear-search-btn", 3, "click"], ["type", "button", 1, "status-pill-btn", "state-layer", 3, "deals-pill", "active"], ["type", "button", 1, "status-pill-btn", "state-layer", 3, "click"], [1, "pill-fire-icon"], [3, "name", "size"], ["type", "button", 1, "view-toggle-btn", "state-layer", 3, "active"], ["type", "button", 1, "view-toggle-btn", "state-layer", 3, "click"]], template: function KitFilterBarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef(_c0);
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(5, "svg", 5);
            i0.ɵɵelement(6, "circle", 6)(7, "line", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(8, "input", 8);
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
            i0.ɵɵelementStart(24, "div", 19)(25, "div", 20)(26, "div", 21)(27, "span", 22);
            i0.ɵɵtext(28, "Advanced Filters");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(29, KitFilterBarComponent_Conditional_29_Template, 2, 1, "span", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 24)(31, "button", 25);
            i0.ɵɵlistener("click", function KitFilterBarComponent_Template_button_click_31_listener() { return ctx.onResetClick(); });
            i0.ɵɵelement(32, "kit-icon", 26);
            i0.ɵɵelementStart(33, "span");
            i0.ɵɵtext(34, "Reset All");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "button", 27);
            i0.ɵɵlistener("click", function KitFilterBarComponent_Template_button_click_35_listener() { return ctx.showDrawer.set(false); });
            i0.ɵɵelement(36, "kit-icon", 28);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(37, "div", 29);
            i0.ɵɵprojection(38, 2);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngModel", ctx.searchInput());
            i0.ɵɵattribute("placeholder", ctx.searchPlaceholder())("aria-label", ctx.searchAriaLabel() || null)("id", ctx.searchInputId() || null);
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
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.activeFilterCount() > 0 ? 29 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("title", ctx.resetTitle());
            i0.ɵɵadvance();
            i0.ɵɵproperty("size", 14);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("size", 16);
        } }, dependencies: [FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, KitIconComponent, DatePipe], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitFilterBarComponent, [{
        type: Component,
        args: [{
                selector: 'kit-filter-bar',
                standalone: true,
                imports: [FormsModule, DatePipe, KitIconComponent],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
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
          <div class="drawer-header flex items-center justify-between">
            <div class="drawer-title flex items-center gap-xs">
              <span class="drawer-heading">Advanced Filters</span>
              @if (activeFilterCount() > 0) {
                <span class="active-tag">{{ activeFilterCount() }} active</span>
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
  `,
            }]
    }], null, { search: [{ type: i0.Input, args: [{ isSignal: true, alias: "search", required: false }] }], searchPlaceholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "searchPlaceholder", required: false }] }], searchInputId: [{ type: i0.Input, args: [{ isSignal: true, alias: "searchInputId", required: false }] }], searchAriaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "searchAriaLabel", required: false }] }], searchDebounceMs: [{ type: i0.Input, args: [{ isSignal: true, alias: "searchDebounceMs", required: false }] }], quickPills: [{ type: i0.Input, args: [{ isSignal: true, alias: "quickPills", required: false }] }], quickPillsAriaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "quickPillsAriaLabel", required: false }] }], activeFilterCount: [{ type: i0.Input, args: [{ isSignal: true, alias: "activeFilterCount", required: false }] }], resultCount: [{ type: i0.Input, args: [{ isSignal: true, alias: "resultCount", required: false }] }], resultCountNoun: [{ type: i0.Input, args: [{ isSignal: true, alias: "resultCountNoun", required: false }] }], lastUpdated: [{ type: i0.Input, args: [{ isSignal: true, alias: "lastUpdated", required: false }] }], viewMode: [{ type: i0.Input, args: [{ isSignal: true, alias: "viewMode", required: false }] }], viewModes: [{ type: i0.Input, args: [{ isSignal: true, alias: "viewModes", required: false }] }], resetTitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "resetTitle", required: false }] }], showDrawer: [{ type: i0.Input, args: [{ isSignal: true, alias: "showDrawer", required: false }] }, { type: i0.Output, args: ["showDrawerChange"] }], searchChange: [{ type: i0.Output, args: ["searchChange"] }], searchCleared: [{ type: i0.Output, args: ["searchCleared"] }], quickPillClick: [{ type: i0.Output, args: ["quickPillClick"] }], viewModeChange: [{ type: i0.Output, args: ["viewModeChange"] }], resetFilters: [{ type: i0.Output, args: ["resetFilters"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitFilterBarComponent, { className: "KitFilterBarComponent", filePath: "filter-bar.component.ts", lineNumber: 231 }); })();
