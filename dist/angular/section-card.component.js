import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input, output, signal, } from '@angular/core';
import { KitIconComponent } from './icon.component.js';
import * as i0 from "@angular/core";
const _c0 = [[["", "cardActions", ""]], "*"];
const _c1 = ["[cardActions]", "*"];
function KitSectionCardComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "kit-icon", 4);
} if (rf & 2) {
    i0.ɵɵproperty("name", ctx)("size", 18);
} }
function KitSectionCardComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.subtitle());
} }
function KitSectionCardComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵlistener("click", function KitSectionCardComponent_Conditional_10_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.toggleExpanded()); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "kit-icon", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-expanded", ctx_r0.isExpanded())("data-testid", ctx_r0.toggleTestId());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.isExpanded() ? ctx_r0.collapseLabel() : ctx_r0.expandLabel());
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", ctx_r0.isExpanded() ? "chevron-up" : "chevron-down")("size", 15);
} }
function KitSectionCardComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵprojection(1, 1);
    i0.ɵɵelementEnd();
} }
const _forTrack0 = ($index, $item) => $item.label;
function KitKvGridComponent_For_2_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "dd", 4);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r1.hint);
} }
function KitKvGridComponent_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 1)(1, "dt", 2);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "dd", 3);
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(5, KitKvGridComponent_For_2_Conditional_5_Template, 2, 1, "dd", 4);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r1.label);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("kit-kv-mono", item_r1.mono ?? false);
    i0.ɵɵattribute("data-tone", item_r1.tone || "default");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r1.value, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r1.hint ? 5 : -1);
} }
/**
 * Standardized Material 3 Expressive content card with optional icon,
 * subtitle, header action slot (`[cardActions]`), and collapsible toggle.
 */
export class KitSectionCardComponent {
    constructor() {
        this.title = input.required(...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
        this.subtitle = input(null, ...(ngDevMode ? [{ debugName: "subtitle" }] : /* istanbul ignore next */ []));
        this.icon = input(null, ...(ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []));
        this.collapsible = input(false, ...(ngDevMode ? [{ debugName: "collapsible" }] : /* istanbul ignore next */ []));
        this.expanded = input(true, ...(ngDevMode ? [{ debugName: "expanded" }] : /* istanbul ignore next */ []));
        this.collapseLabel = input('Collapse', ...(ngDevMode ? [{ debugName: "collapseLabel" }] : /* istanbul ignore next */ []));
        this.expandLabel = input('Expand', ...(ngDevMode ? [{ debugName: "expandLabel" }] : /* istanbul ignore next */ []));
        this.toggleTestId = input(null, ...(ngDevMode ? [{ debugName: "toggleTestId" }] : /* istanbul ignore next */ []));
        this.testId = input(null, ...(ngDevMode ? [{ debugName: "testId" }] : /* istanbul ignore next */ []));
        this.compact = input(false, ...(ngDevMode ? [{ debugName: "compact" }] : /* istanbul ignore next */ []));
        this.expandedChange = output();
        this.toggledState = signal(null, ...(ngDevMode ? [{ debugName: "toggledState" }] : /* istanbul ignore next */ []));
        this.isExpanded = computed(() => {
            const base = this.expanded();
            const toggled = this.toggledState();
            return toggled && toggled.base === base ? toggled.value : base;
        }, ...(ngDevMode ? [{ debugName: "isExpanded" }] : /* istanbul ignore next */ []));
    }
    toggleExpanded() {
        if (!this.collapsible())
            return;
        const next = !this.isExpanded();
        this.toggledState.set({ base: this.expanded(), value: next });
        this.expandedChange.emit(next);
    }
    static { this.ɵfac = function KitSectionCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitSectionCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitSectionCardComponent, selectors: [["kit-section-card"]], inputs: { title: [1, "title"], subtitle: [1, "subtitle"], icon: [1, "icon"], collapsible: [1, "collapsible"], expanded: [1, "expanded"], collapseLabel: [1, "collapseLabel"], expandLabel: [1, "expandLabel"], toggleTestId: [1, "toggleTestId"], testId: [1, "testId"], compact: [1, "compact"] }, outputs: { expandedChange: "expandedChange" }, ngContentSelectors: _c1, decls: 12, vars: 10, consts: [[1, "kit-section-card"], [1, "kit-section-card-header"], [1, "kit-section-card-titles"], [1, "kit-section-card-title"], [3, "name", "size"], [1, "kit-section-card-subtitle"], [1, "kit-section-card-actions"], ["type", "button", 1, "kit-section-collapse-btn", "state-layer"], [1, "kit-section-card-body"], ["type", "button", 1, "kit-section-collapse-btn", "state-layer", 3, "click"]], template: function KitSectionCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef(_c0);
            i0.ɵɵelementStart(0, "section", 0)(1, "header", 1)(2, "div", 2)(3, "h2", 3);
            i0.ɵɵconditionalCreate(4, KitSectionCardComponent_Conditional_4_Template, 1, 2, "kit-icon", 4);
            i0.ɵɵelementStart(5, "span");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(7, KitSectionCardComponent_Conditional_7_Template, 2, 1, "p", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 6);
            i0.ɵɵprojection(9);
            i0.ɵɵconditionalCreate(10, KitSectionCardComponent_Conditional_10_Template, 4, 5, "button", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(11, KitSectionCardComponent_Conditional_11_Template, 2, 0, "div", 8);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_3_0;
            i0.ɵɵclassProp("kit-section-card-compact", ctx.compact())("kit-section-card-collapsed", ctx.collapsible() && !ctx.isExpanded());
            i0.ɵɵattribute("data-testid", ctx.testId());
            i0.ɵɵadvance(4);
            i0.ɵɵconditional((tmp_3_0 = ctx.icon()) ? 4 : -1, tmp_3_0);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.title());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.subtitle() ? 7 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.collapsible() ? 10 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.collapsible() || ctx.isExpanded() ? 11 : -1);
        } }, dependencies: [KitIconComponent], styles: ["\n      .kit-section-card {\n        background: var(--kit-surface-container);\n        border: 1.5px solid var(--kit-outline-variant);\n        border-radius: var(--kit-radius-lg);\n        padding: 20px;\n        min-width: 0;\n      }\n\n      .kit-section-card.kit-section-card-compact {\n        padding: 16px;\n      }\n\n      .kit-section-card-header {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        flex-wrap: wrap;\n        gap: 12px;\n        margin-bottom: 16px;\n      }\n\n      .kit-section-card-collapsed .kit-section-card-header {\n        margin-bottom: 0;\n      }\n\n      .kit-section-card-titles {\n        min-width: 0;\n        flex: 1 1 200px;\n      }\n\n      .kit-section-card-title {\n        margin: 0;\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        font-family: var(--kit-font-heading);\n        font-size: 1.05rem;\n        font-weight: 800;\n        color: var(--kit-on-surface);\n        line-height: 1.3;\n      }\n\n      .kit-section-card-subtitle {\n        margin: 4px 0 0;\n        font-size: 0.82rem;\n        color: var(--kit-on-surface-variant);\n        line-height: 1.4;\n      }\n\n      .kit-section-card-actions {\n        display: flex;\n        align-items: center;\n        flex-wrap: wrap;\n        gap: 8px;\n      }\n\n      .kit-section-collapse-btn {\n        display: inline-flex;\n        align-items: center;\n        gap: 5px;\n        padding: 5px 11px;\n        border-radius: var(--kit-radius-full);\n        border: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container-low);\n        color: var(--kit-on-surface);\n        font-family: var(--kit-font-sans);\n        font-size: 0.78rem;\n        font-weight: 600;\n        cursor: pointer;\n      }\n\n      .kit-section-collapse-btn:hover {\n        border-color: var(--kit-primary);\n        color: var(--kit-primary);\n      }\n\n      .kit-section-collapse-btn:focus-visible {\n        outline: 2.5px solid var(--kit-primary);\n        outline-offset: 2px;\n      }\n    "], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitSectionCardComponent, [{
        type: Component,
        args: [{ selector: 'kit-section-card', standalone: true, imports: [KitIconComponent], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <section
      class="kit-section-card"
      [class.kit-section-card-compact]="compact()"
      [class.kit-section-card-collapsed]="collapsible() && !isExpanded()"
      [attr.data-testid]="testId()"
    >
      <header class="kit-section-card-header">
        <div class="kit-section-card-titles">
          <h2 class="kit-section-card-title">
            @if (icon(); as iconName) {
              <kit-icon [name]="iconName" [size]="18" />
            }
            <span>{{ title() }}</span>
          </h2>
          @if (subtitle()) {
            <p class="kit-section-card-subtitle">{{ subtitle() }}</p>
          }
        </div>

        <div class="kit-section-card-actions">
          <ng-content select="[cardActions]" />
          @if (collapsible()) {
            <button
              type="button"
              class="kit-section-collapse-btn state-layer"
              [attr.aria-expanded]="isExpanded()"
              [attr.data-testid]="toggleTestId()"
              (click)="toggleExpanded()"
            >
              <span>{{ isExpanded() ? collapseLabel() : expandLabel() }}</span>
              <kit-icon
                [name]="isExpanded() ? 'chevron-up' : 'chevron-down'"
                [size]="15"
              />
            </button>
          }
        </div>
      </header>

      @if (!collapsible() || isExpanded()) {
        <div class="kit-section-card-body">
          <ng-content />
        </div>
      }
    </section>
  `, styles: ["\n      .kit-section-card {\n        background: var(--kit-surface-container);\n        border: 1.5px solid var(--kit-outline-variant);\n        border-radius: var(--kit-radius-lg);\n        padding: 20px;\n        min-width: 0;\n      }\n\n      .kit-section-card.kit-section-card-compact {\n        padding: 16px;\n      }\n\n      .kit-section-card-header {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        flex-wrap: wrap;\n        gap: 12px;\n        margin-bottom: 16px;\n      }\n\n      .kit-section-card-collapsed .kit-section-card-header {\n        margin-bottom: 0;\n      }\n\n      .kit-section-card-titles {\n        min-width: 0;\n        flex: 1 1 200px;\n      }\n\n      .kit-section-card-title {\n        margin: 0;\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        font-family: var(--kit-font-heading);\n        font-size: 1.05rem;\n        font-weight: 800;\n        color: var(--kit-on-surface);\n        line-height: 1.3;\n      }\n\n      .kit-section-card-subtitle {\n        margin: 4px 0 0;\n        font-size: 0.82rem;\n        color: var(--kit-on-surface-variant);\n        line-height: 1.4;\n      }\n\n      .kit-section-card-actions {\n        display: flex;\n        align-items: center;\n        flex-wrap: wrap;\n        gap: 8px;\n      }\n\n      .kit-section-collapse-btn {\n        display: inline-flex;\n        align-items: center;\n        gap: 5px;\n        padding: 5px 11px;\n        border-radius: var(--kit-radius-full);\n        border: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container-low);\n        color: var(--kit-on-surface);\n        font-family: var(--kit-font-sans);\n        font-size: 0.78rem;\n        font-weight: 600;\n        cursor: pointer;\n      }\n\n      .kit-section-collapse-btn:hover {\n        border-color: var(--kit-primary);\n        color: var(--kit-primary);\n      }\n\n      .kit-section-collapse-btn:focus-visible {\n        outline: 2.5px solid var(--kit-primary);\n        outline-offset: 2px;\n      }\n    "] }]
    }], null, { title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: true }] }], subtitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "subtitle", required: false }] }], icon: [{ type: i0.Input, args: [{ isSignal: true, alias: "icon", required: false }] }], collapsible: [{ type: i0.Input, args: [{ isSignal: true, alias: "collapsible", required: false }] }], expanded: [{ type: i0.Input, args: [{ isSignal: true, alias: "expanded", required: false }] }], collapseLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "collapseLabel", required: false }] }], expandLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "expandLabel", required: false }] }], toggleTestId: [{ type: i0.Input, args: [{ isSignal: true, alias: "toggleTestId", required: false }] }], testId: [{ type: i0.Input, args: [{ isSignal: true, alias: "testId", required: false }] }], compact: [{ type: i0.Input, args: [{ isSignal: true, alias: "compact", required: false }] }], expandedChange: [{ type: i0.Output, args: ["expandedChange"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitSectionCardComponent, { className: "KitSectionCardComponent", filePath: "section-card.component.ts", lineNumber: 162 }); })();
/**
 * Responsive semantic definition grid (`<dl>`) for key-value metadata rows.
 */
export class KitKvGridComponent {
    constructor() {
        this.items = input.required(...(ngDevMode ? [{ debugName: "items" }] : /* istanbul ignore next */ []));
        this.density = input('comfortable', ...(ngDevMode ? [{ debugName: "density" }] : /* istanbul ignore next */ []));
        this.layout = input('grid', ...(ngDevMode ? [{ debugName: "layout" }] : /* istanbul ignore next */ []));
    }
    static { this.ɵfac = function KitKvGridComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitKvGridComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitKvGridComponent, selectors: [["kit-kv-grid"]], inputs: { items: [1, "items"], density: [1, "density"], layout: [1, "layout"] }, decls: 3, vars: 4, consts: [[1, "kit-kv-grid"], [1, "kit-kv-item"], [1, "kit-kv-label"], [1, "kit-kv-value"], [1, "kit-kv-hint"]], template: function KitKvGridComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "dl", 0);
            i0.ɵɵrepeaterCreate(1, KitKvGridComponent_For_2_Template, 6, 6, "div", 1, _forTrack0);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("kit-kv-compact", ctx.density() === "compact")("kit-kv-list", ctx.layout() === "list");
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.items());
        } }, styles: ["\n      .kit-kv-grid {\n        margin: 0;\n        display: grid;\n        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n        gap: 12px;\n      }\n\n      .kit-kv-grid.kit-kv-compact {\n        grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));\n        gap: 8px;\n      }\n\n      .kit-kv-grid.kit-kv-list {\n        grid-template-columns: minmax(0, 1fr);\n        gap: 8px;\n      }\n\n      .kit-kv-grid.kit-kv-list .kit-kv-item {\n        display: flex;\n        align-items: baseline;\n        justify-content: space-between;\n        gap: 12px;\n        padding: 8px 12px;\n      }\n\n      .kit-kv-item {\n        padding: 10px 12px;\n        border-radius: var(--kit-radius-sm);\n        border: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container-low);\n        min-width: 0;\n      }\n\n      .kit-kv-label {\n        font-size: 0.72rem;\n        font-weight: 700;\n        letter-spacing: 0.04em;\n        text-transform: uppercase;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-kv-value {\n        margin: 4px 0 0;\n        font-size: 0.92rem;\n        font-weight: 700;\n        color: var(--kit-on-surface);\n        word-break: break-word;\n      }\n\n      .kit-kv-list .kit-kv-value {\n        margin: 0;\n        text-align: right;\n      }\n\n      .kit-kv-value.kit-kv-mono {\n        font-family: var(--kit-font-mono);\n        font-variant-numeric: tabular-nums;\n      }\n\n      .kit-kv-value[data-tone='muted'] {\n        color: var(--kit-on-surface-variant);\n        font-weight: 500;\n      }\n      .kit-kv-value[data-tone='primary'] {\n        color: var(--kit-primary);\n      }\n      .kit-kv-value[data-tone='success'] {\n        color: var(--kit-success);\n      }\n      .kit-kv-value[data-tone='warning'] {\n        color: var(--kit-warning);\n      }\n      .kit-kv-value[data-tone='danger'] {\n        color: var(--kit-danger);\n      }\n\n      .kit-kv-hint {\n        margin: 2px 0 0;\n        font-size: 0.74rem;\n        color: var(--kit-on-surface-variant);\n      }\n    "], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitKvGridComponent, [{
        type: Component,
        args: [{ selector: 'kit-kv-grid', standalone: true, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <dl
      class="kit-kv-grid"
      [class.kit-kv-compact]="density() === 'compact'"
      [class.kit-kv-list]="layout() === 'list'"
    >
      @for (item of items(); track item.label) {
        <div class="kit-kv-item">
          <dt class="kit-kv-label">{{ item.label }}</dt>
          <dd
            class="kit-kv-value"
            [class.kit-kv-mono]="item.mono ?? false"
            [attr.data-tone]="item.tone || 'default'"
          >
            {{ item.value }}
          </dd>
          @if (item.hint) {
            <dd class="kit-kv-hint">{{ item.hint }}</dd>
          }
        </div>
      }
    </dl>
  `, styles: ["\n      .kit-kv-grid {\n        margin: 0;\n        display: grid;\n        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n        gap: 12px;\n      }\n\n      .kit-kv-grid.kit-kv-compact {\n        grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));\n        gap: 8px;\n      }\n\n      .kit-kv-grid.kit-kv-list {\n        grid-template-columns: minmax(0, 1fr);\n        gap: 8px;\n      }\n\n      .kit-kv-grid.kit-kv-list .kit-kv-item {\n        display: flex;\n        align-items: baseline;\n        justify-content: space-between;\n        gap: 12px;\n        padding: 8px 12px;\n      }\n\n      .kit-kv-item {\n        padding: 10px 12px;\n        border-radius: var(--kit-radius-sm);\n        border: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container-low);\n        min-width: 0;\n      }\n\n      .kit-kv-label {\n        font-size: 0.72rem;\n        font-weight: 700;\n        letter-spacing: 0.04em;\n        text-transform: uppercase;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-kv-value {\n        margin: 4px 0 0;\n        font-size: 0.92rem;\n        font-weight: 700;\n        color: var(--kit-on-surface);\n        word-break: break-word;\n      }\n\n      .kit-kv-list .kit-kv-value {\n        margin: 0;\n        text-align: right;\n      }\n\n      .kit-kv-value.kit-kv-mono {\n        font-family: var(--kit-font-mono);\n        font-variant-numeric: tabular-nums;\n      }\n\n      .kit-kv-value[data-tone='muted'] {\n        color: var(--kit-on-surface-variant);\n        font-weight: 500;\n      }\n      .kit-kv-value[data-tone='primary'] {\n        color: var(--kit-primary);\n      }\n      .kit-kv-value[data-tone='success'] {\n        color: var(--kit-success);\n      }\n      .kit-kv-value[data-tone='warning'] {\n        color: var(--kit-warning);\n      }\n      .kit-kv-value[data-tone='danger'] {\n        color: var(--kit-danger);\n      }\n\n      .kit-kv-hint {\n        margin: 2px 0 0;\n        font-size: 0.74rem;\n        color: var(--kit-on-surface-variant);\n      }\n    "] }]
    }], null, { items: [{ type: i0.Input, args: [{ isSignal: true, alias: "items", required: true }] }], density: [{ type: i0.Input, args: [{ isSignal: true, alias: "density", required: false }] }], layout: [{ type: i0.Input, args: [{ isSignal: true, alias: "layout", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitKvGridComponent, { className: "KitKvGridComponent", filePath: "section-card.component.ts", lineNumber: 312 }); })();
