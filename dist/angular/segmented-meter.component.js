import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input, } from '@angular/core';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function KitSegmentedMeterComponent_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElement(0, "div", 3);
} if (rf & 2) {
    const seg_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(seg_r1.className || "");
    i0.ɵɵstyleProp("width", ctx_r1.clampPct(seg_r1.pct), "%")("background", seg_r1.color || null);
    i0.ɵɵattribute("title", seg_r1.title || seg_r1.label || null);
} }
/**
 * Multi-segment animated meter bar with `@starting-style` mount growth and
 * smooth width interpolation as percentages change.
 */
export class KitSegmentedMeterComponent {
    constructor() {
        this.segments = input.required(...(ngDevMode ? [{ debugName: "segments" }] : /* istanbul ignore next */ []));
        this.heightPx = input(12, ...(ngDevMode ? [{ debugName: "heightPx" }] : /* istanbul ignore next */ []));
        this.ariaLabel = input('Completion progress', ...(ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
        this.totalPct = computed(() => {
            const sum = this.segments().reduce((acc, seg) => acc + this.clampPct(seg.pct), 0);
            return Math.min(100, Math.round(sum));
        }, ...(ngDevMode ? [{ debugName: "totalPct" }] : /* istanbul ignore next */ []));
    }
    clampPct(val) {
        if (!Number.isFinite(val))
            return 0;
        return Math.max(0, Math.min(100, val));
    }
    static { this.ɵfac = function KitSegmentedMeterComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitSegmentedMeterComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitSegmentedMeterComponent, selectors: [["kit-segmented-meter"]], inputs: { segments: [1, "segments"], heightPx: [1, "heightPx"], ariaLabel: [1, "ariaLabel"] }, decls: 4, vars: 4, consts: [["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", 1, "kit-segmented-meter"], [1, "kit-meter-track"], [1, "kit-meter-segment", 3, "class", "width", "background"], [1, "kit-meter-segment"]], template: function KitSegmentedMeterComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵrepeaterCreate(2, KitSegmentedMeterComponent_For_3_Template, 1, 7, "div", 2, _forTrack0);
            i0.ɵɵdomElementEnd()();
        } if (rf & 2) {
            i0.ɵɵattribute("aria-valuenow", ctx.totalPct())("aria-label", ctx.ariaLabel());
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("height", ctx.heightPx(), "px");
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.segments());
        } }, styles: ["\n      .kit-segmented-meter {\n        display: block;\n        width: 100%;\n      }\n\n      .kit-meter-track {\n        display: flex;\n        width: 100%;\n        border-radius: var(--kit-radius-full);\n        background: var(--kit-surface-container-low);\n        border: 1px solid var(--kit-outline-variant);\n        overflow: hidden;\n      }\n\n      .kit-meter-segment {\n        height: 100%;\n        transition: width 550ms var(--kit-ease-smooth);\n      }\n\n      @starting-style {\n        .kit-meter-segment {\n          width: 0% !important;\n        }\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-segmented-meter * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitSegmentedMeterComponent, [{
        type: Component,
        args: [{ selector: 'kit-segmented-meter', standalone: true, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div
      class="kit-segmented-meter"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-valuenow]="totalPct()"
      [attr.aria-label]="ariaLabel()"
    >
      <div class="kit-meter-track" [style.height.px]="heightPx()">
        @for (seg of segments(); track seg.id) {
          <div
            class="kit-meter-segment"
            [class]="seg.className || ''"
            [style.width.%]="clampPct(seg.pct)"
            [style.background]="seg.color || null"
            [attr.title]="seg.title || seg.label || null"
          ></div>
        }
      </div>
    </div>
  `, styles: ["\n      .kit-segmented-meter {\n        display: block;\n        width: 100%;\n      }\n\n      .kit-meter-track {\n        display: flex;\n        width: 100%;\n        border-radius: var(--kit-radius-full);\n        background: var(--kit-surface-container-low);\n        border: 1px solid var(--kit-outline-variant);\n        overflow: hidden;\n      }\n\n      .kit-meter-segment {\n        height: 100%;\n        transition: width 550ms var(--kit-ease-smooth);\n      }\n\n      @starting-style {\n        .kit-meter-segment {\n          width: 0% !important;\n        }\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-segmented-meter * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "] }]
    }], null, { segments: [{ type: i0.Input, args: [{ isSignal: true, alias: "segments", required: true }] }], heightPx: [{ type: i0.Input, args: [{ isSignal: true, alias: "heightPx", required: false }] }], ariaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitSegmentedMeterComponent, { className: "KitSegmentedMeterComponent", filePath: "segmented-meter.component.ts", lineNumber: 86 }); })();
