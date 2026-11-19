import { ChangeDetectionStrategy, Component, ViewEncapsulation, input, } from '@angular/core';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function KitStatBarListComponent_For_2_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r1.secondaryText);
} }
function KitStatBarListComponent_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 1)(1, "div", 3)(2, "span", 4);
    i0.ɵɵtext(3);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(4, "div", 5)(5, "strong", 6);
    i0.ɵɵtext(6);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(7, KitStatBarListComponent_For_2_Conditional_7_Template, 2, 1, "span", 7);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(8, "div", 8);
    i0.ɵɵdomElement(9, "div", 9);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const itemMax_r3 = item_r1.max ?? ctx_r1.defaultMax();
    const pct_r4 = ctx_r1.computePct(item_r1.value, itemMax_r3);
    const tone_r5 = ctx_r1.resolveTone(item_r1.value, itemMax_r3, item_r1.tone);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r1.label);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r1.displayValue ?? item_r1.value);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r1.secondaryText ? 7 : -1);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-valuemax", itemMax_r3)("aria-valuenow", item_r1.value)("aria-label", item_r1.label + ": " + (item_r1.displayValue ?? item_r1.value));
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("width", pct_r4, "%");
    i0.ɵɵattribute("data-tone", tone_r5);
} }
function KitStatBarListComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 2)(1, "span", 10);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "strong", 11);
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.totalLabel());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.totalValue());
} }
export function computeKitStatPct(value, max) {
    if (!Number.isFinite(value) || !Number.isFinite(max) || max <= 0) {
        return 0;
    }
    return Math.max(0, Math.min(100, (value / max) * 100));
}
export function resolveKitStatTone(value, max, explicit) {
    if (explicit)
        return explicit;
    const ratio = max > 0 && Number.isFinite(value) ? value / max : 0;
    if (ratio < 0.24)
        return 'low';
    if (ratio < 0.36)
        return 'mid';
    if (ratio < 0.48)
        return 'good';
    if (ratio < 0.62)
        return 'high';
    return 'peak';
}
/**
 * Labeled horizontal metric bar list with automatic ratio-based semantic tiers,
 * optional secondary ranges, and an optional summary footer row.
 */
export class KitStatBarListComponent {
    constructor() {
        this.items = input.required(...(ngDevMode ? [{ debugName: "items" }] : /* istanbul ignore next */ []));
        this.defaultMax = input(255, ...(ngDevMode ? [{ debugName: "defaultMax" }] : /* istanbul ignore next */ []));
        this.totalLabel = input(null, ...(ngDevMode ? [{ debugName: "totalLabel" }] : /* istanbul ignore next */ []));
        this.totalValue = input(null, ...(ngDevMode ? [{ debugName: "totalValue" }] : /* istanbul ignore next */ []));
        this.ariaLabel = input('Statistics', ...(ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
        this.compact = input(false, ...(ngDevMode ? [{ debugName: "compact" }] : /* istanbul ignore next */ []));
    }
    computePct(value, max) {
        return computeKitStatPct(value, max);
    }
    resolveTone(value, max, explicit) {
        return resolveKitStatTone(value, max, explicit);
    }
    static { this.ɵfac = function KitStatBarListComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitStatBarListComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitStatBarListComponent, selectors: [["kit-stat-bar-list"]], inputs: { items: [1, "items"], defaultMax: [1, "defaultMax"], totalLabel: [1, "totalLabel"], totalValue: [1, "totalValue"], ariaLabel: [1, "ariaLabel"], compact: [1, "compact"] }, decls: 4, vars: 4, consts: [["role", "list", 1, "kit-stat-bar-list"], ["role", "listitem", 1, "kit-stat-row"], [1, "kit-stat-footer"], [1, "kit-stat-header"], [1, "kit-stat-label"], [1, "kit-stat-values"], [1, "kit-stat-val"], [1, "kit-stat-secondary"], ["role", "progressbar", "aria-valuemin", "0", 1, "kit-stat-track"], [1, "kit-stat-fill"], [1, "kit-stat-footer-label"], [1, "kit-stat-footer-val"]], template: function KitStatBarListComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0);
            i0.ɵɵrepeaterCreate(1, KitStatBarListComponent_For_2_Template, 10, 9, "div", 1, _forTrack0);
            i0.ɵɵconditionalCreate(3, KitStatBarListComponent_Conditional_3_Template, 5, 2, "div", 2);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("kit-stat-bar-compact", ctx.compact());
            i0.ɵɵattribute("aria-label", ctx.ariaLabel());
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.items());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.totalLabel() && ctx.totalValue() !== null && ctx.totalValue() !== undefined ? 3 : -1);
        } }, styles: ["\n      .kit-stat-bar-list {\n        display: flex;\n        flex-direction: column;\n        gap: 11px;\n      }\n\n      .kit-stat-bar-list.kit-stat-bar-compact {\n        gap: 8px;\n      }\n\n      .kit-stat-row {\n        display: flex;\n        flex-direction: column;\n        gap: 5px;\n      }\n\n      .kit-stat-header {\n        display: flex;\n        align-items: baseline;\n        justify-content: space-between;\n        gap: 10px;\n        font-size: 0.84rem;\n      }\n\n      .kit-stat-label {\n        font-weight: 600;\n        color: var(--kit-on-surface);\n      }\n\n      .kit-stat-values {\n        display: inline-flex;\n        align-items: baseline;\n        gap: 8px;\n        font-variant-numeric: tabular-nums;\n      }\n\n      .kit-stat-val {\n        font-family: var(--kit-font-mono);\n        font-size: 0.85rem;\n        font-weight: 700;\n        color: var(--kit-on-surface);\n      }\n\n      .kit-stat-secondary {\n        font-family: var(--kit-font-mono);\n        font-size: 0.75rem;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-stat-track {\n        height: 9px;\n        border-radius: var(--kit-radius-full);\n        background: var(--kit-surface-container-low);\n        border: 1px solid var(--kit-outline-variant);\n        overflow: hidden;\n      }\n\n      .kit-stat-bar-compact .kit-stat-track {\n        height: 7px;\n      }\n\n      .kit-stat-fill {\n        height: 100%;\n        border-radius: var(--kit-radius-full);\n        background: var(--kit-primary);\n        transition: width var(--kit-duration-medium) var(--kit-ease-smooth);\n      }\n\n      .kit-stat-fill[data-tone='low'],\n      .kit-stat-fill[data-tone='danger'] {\n        background: var(--kit-danger);\n      }\n      .kit-stat-fill[data-tone='mid'],\n      .kit-stat-fill[data-tone='warning'] {\n        background: var(--kit-warning);\n      }\n      .kit-stat-fill[data-tone='good'],\n      .kit-stat-fill[data-tone='success'] {\n        background: var(--kit-success);\n      }\n      .kit-stat-fill[data-tone='high'] {\n        background: #06b6d4;\n      }\n      .kit-stat-fill[data-tone='peak'] {\n        background: #8b5cf6;\n      }\n      .kit-stat-fill[data-tone='primary'] {\n        background: var(--kit-primary);\n      }\n\n      .kit-stat-footer {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        padding-top: 8px;\n        margin-top: 2px;\n        border-top: 1px solid var(--kit-outline-variant);\n        font-size: 0.86rem;\n      }\n\n      .kit-stat-footer-label {\n        font-weight: 700;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-stat-footer-val {\n        font-family: var(--kit-font-mono);\n        font-size: 0.96rem;\n        font-weight: 800;\n        color: var(--kit-on-surface);\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-stat-fill {\n          transition: none;\n        }\n      }\n    "], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitStatBarListComponent, [{
        type: Component,
        args: [{ selector: 'kit-stat-bar-list', standalone: true, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div
      class="kit-stat-bar-list"
      [class.kit-stat-bar-compact]="compact()"
      role="list"
      [attr.aria-label]="ariaLabel()"
    >
      @for (item of items(); track item.id) {
        @let itemMax = item.max ?? defaultMax();
        @let pct = computePct(item.value, itemMax);
        @let tone = resolveTone(item.value, itemMax, item.tone);
        <div class="kit-stat-row" role="listitem">
          <div class="kit-stat-header">
            <span class="kit-stat-label">{{ item.label }}</span>
            <div class="kit-stat-values">
              <strong class="kit-stat-val">{{
                item.displayValue ?? item.value
              }}</strong>
              @if (item.secondaryText) {
                <span class="kit-stat-secondary">{{ item.secondaryText }}</span>
              }
            </div>
          </div>
          <div
            class="kit-stat-track"
            role="progressbar"
            aria-valuemin="0"
            [attr.aria-valuemax]="itemMax"
            [attr.aria-valuenow]="item.value"
            [attr.aria-label]="
              item.label + ': ' + (item.displayValue ?? item.value)
            "
          >
            <div
              class="kit-stat-fill"
              [attr.data-tone]="tone"
              [style.width.%]="pct"
            ></div>
          </div>
        </div>
      }

      @if (
        totalLabel() && totalValue() !== null && totalValue() !== undefined
      ) {
        <div class="kit-stat-footer">
          <span class="kit-stat-footer-label">{{ totalLabel() }}</span>
          <strong class="kit-stat-footer-val">{{ totalValue() }}</strong>
        </div>
      }
    </div>
  `, styles: ["\n      .kit-stat-bar-list {\n        display: flex;\n        flex-direction: column;\n        gap: 11px;\n      }\n\n      .kit-stat-bar-list.kit-stat-bar-compact {\n        gap: 8px;\n      }\n\n      .kit-stat-row {\n        display: flex;\n        flex-direction: column;\n        gap: 5px;\n      }\n\n      .kit-stat-header {\n        display: flex;\n        align-items: baseline;\n        justify-content: space-between;\n        gap: 10px;\n        font-size: 0.84rem;\n      }\n\n      .kit-stat-label {\n        font-weight: 600;\n        color: var(--kit-on-surface);\n      }\n\n      .kit-stat-values {\n        display: inline-flex;\n        align-items: baseline;\n        gap: 8px;\n        font-variant-numeric: tabular-nums;\n      }\n\n      .kit-stat-val {\n        font-family: var(--kit-font-mono);\n        font-size: 0.85rem;\n        font-weight: 700;\n        color: var(--kit-on-surface);\n      }\n\n      .kit-stat-secondary {\n        font-family: var(--kit-font-mono);\n        font-size: 0.75rem;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-stat-track {\n        height: 9px;\n        border-radius: var(--kit-radius-full);\n        background: var(--kit-surface-container-low);\n        border: 1px solid var(--kit-outline-variant);\n        overflow: hidden;\n      }\n\n      .kit-stat-bar-compact .kit-stat-track {\n        height: 7px;\n      }\n\n      .kit-stat-fill {\n        height: 100%;\n        border-radius: var(--kit-radius-full);\n        background: var(--kit-primary);\n        transition: width var(--kit-duration-medium) var(--kit-ease-smooth);\n      }\n\n      .kit-stat-fill[data-tone='low'],\n      .kit-stat-fill[data-tone='danger'] {\n        background: var(--kit-danger);\n      }\n      .kit-stat-fill[data-tone='mid'],\n      .kit-stat-fill[data-tone='warning'] {\n        background: var(--kit-warning);\n      }\n      .kit-stat-fill[data-tone='good'],\n      .kit-stat-fill[data-tone='success'] {\n        background: var(--kit-success);\n      }\n      .kit-stat-fill[data-tone='high'] {\n        background: #06b6d4;\n      }\n      .kit-stat-fill[data-tone='peak'] {\n        background: #8b5cf6;\n      }\n      .kit-stat-fill[data-tone='primary'] {\n        background: var(--kit-primary);\n      }\n\n      .kit-stat-footer {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        padding-top: 8px;\n        margin-top: 2px;\n        border-top: 1px solid var(--kit-outline-variant);\n        font-size: 0.86rem;\n      }\n\n      .kit-stat-footer-label {\n        font-weight: 700;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-stat-footer-val {\n        font-family: var(--kit-font-mono);\n        font-size: 0.96rem;\n        font-weight: 800;\n        color: var(--kit-on-surface);\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-stat-fill {\n          transition: none;\n        }\n      }\n    "] }]
    }], null, { items: [{ type: i0.Input, args: [{ isSignal: true, alias: "items", required: true }] }], defaultMax: [{ type: i0.Input, args: [{ isSignal: true, alias: "defaultMax", required: false }] }], totalLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "totalLabel", required: false }] }], totalValue: [{ type: i0.Input, args: [{ isSignal: true, alias: "totalValue", required: false }] }], ariaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }], compact: [{ type: i0.Input, args: [{ isSignal: true, alias: "compact", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitStatBarListComponent, { className: "KitStatBarListComponent", filePath: "stat-bar.component.ts", lineNumber: 233 }); })();
