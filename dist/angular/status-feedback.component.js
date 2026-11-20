import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, effect, input, signal, untracked, } from '@angular/core';
import { isKitReducedMotionPreferred } from './theme.service.js';
import * as i0 from "@angular/core";
function KitSyncIndicatorComponent_Conditional_0_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(0, "svg", 2);
    i0.ɵɵdomElement(1, "circle", 3)(2, "path", 4);
    i0.ɵɵdomElementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵdomElementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.savingLabel());
} }
function KitSyncIndicatorComponent_Conditional_0_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(0, "svg", 5);
    i0.ɵɵdomElement(1, "path", 6);
    i0.ɵɵdomElementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵdomElementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.savedLabel());
} }
function KitSyncIndicatorComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 1);
    i0.ɵɵconditionalCreate(1, KitSyncIndicatorComponent_Conditional_0_Conditional_1_Template, 5, 1)(2, KitSyncIndicatorComponent_Conditional_0_Conditional_2_Template, 4, 1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("saving", ctx_r0.phase() === "saving")("saved", ctx_r0.phase() === "saved");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.phase() === "saving" ? 1 : 2);
} }
function KitStatusBannerComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "span", 4);
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("closing", ctx_r0.isClosing());
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap("kit-status-banner variant-" + ctx_r0.variant() + (ctx_r0.isClosing() ? " closing" : ""));
    i0.ɵɵattribute("role", ctx_r0.variant() === "error" ? "alert" : "status");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx);
} }
function KitDegradedBannerComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "span", 4);
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "span", 5);
    i0.ɵɵtext(6);
    i0.ɵɵdomElementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("closing", ctx_r0.isClosing());
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("closing", ctx_r0.isClosing());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx === "backup" ? "\u26A0\uFE0F Read-Only Backup Mode" : "\u26A0\uFE0F Offline Read-Only Mode", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.resolvedMessage());
} }
const _c0 = "\n  @keyframes kitBannerIn {\n    from {\n      opacity: 0;\n      transform: translateY(-6px) scale(0.985);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0) scale(1);\n    }\n  }\n\n  @keyframes kitBannerOut {\n    from {\n      opacity: 1;\n      transform: translateY(0) scale(1);\n    }\n    to {\n      opacity: 0;\n      transform: translateY(-6px) scale(0.985);\n    }\n  }\n\n  .kit-banner-collapse {\n    display: grid;\n    grid-template-rows: 1fr;\n    opacity: 1;\n    transition:\n      grid-template-rows var(--%NS%kit-duration-medium, 260ms)\n        var(--%NS%kit-ease-smooth, cubic-bezier(0.22, 1, 0.36, 1)),\n      opacity 200ms var(--%NS%kit-ease-standard, cubic-bezier(0.4, 0, 0.2, 1));\n  }\n\n  @starting-style {\n    .kit-banner-collapse {\n      grid-template-rows: 0fr;\n      opacity: 0;\n    }\n  }\n\n  .kit-banner-collapse.closing {\n    grid-template-rows: 0fr;\n    opacity: 0;\n    pointer-events: none;\n    transition:\n      grid-template-rows 220ms var(--%NS%kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)),\n      opacity 180ms var(--%NS%kit-ease-exit, cubic-bezier(0.4, 0, 1, 1));\n  }\n\n  .kit-banner-collapse-inner {\n    min-height: 0;\n    overflow: hidden;\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    .kit-banner-collapse {\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n      transition-duration: 0.01ms !important;\n    }\n  }\n";
const _c1 = "\n  @keyframes kitErrorShake {\n    0%,\n    100% {\n      transform: translateX(0);\n    }\n    20% {\n      transform: translateX(-6px);\n    }\n    40% {\n      transform: translateX(5px);\n    }\n    60% {\n      transform: translateX(-3px);\n    }\n    80% {\n      transform: translateX(2px);\n    }\n  }\n\n  .kit-status-banner {\n    padding: 12px 16px;\n    border-radius: var(--%NS%kit-radius-sm);\n    font-size: 0.875rem;\n    font-weight: 600;\n    border: 1px solid var(--%NS%kit-outline-variant);\n    background: var(--%NS%kit-surface-container-high);\n    color: var(--%NS%kit-on-surface);\n    animation: kitBannerIn 220ms var(--%NS%kit-ease-emphasized) both;\n  }\n\n  .kit-status-banner.variant-error {\n    background: var(--%NS%kit-danger-subtle);\n    border-color: var(--%NS%kit-danger-border);\n    color: var(--%NS%kit-danger);\n    animation:\n      kitBannerIn 200ms var(--%NS%kit-ease-emphasized) both,\n      kitErrorShake 360ms var(--%NS%kit-ease-standard) both;\n  }\n\n  .kit-status-banner.variant-success {\n    background: var(--%NS%kit-success-subtle);\n    border-color: var(--%NS%kit-success-border);\n    color: var(--%NS%kit-success);\n  }\n\n  .kit-status-banner.variant-warning {\n    background: var(--%NS%kit-warning-subtle);\n    border-color: var(--%NS%kit-warning-border);\n    color: var(--%NS%kit-warning);\n  }\n\n  .kit-status-banner.closing,\n  .kit-status-banner.variant-error.closing {\n    animation: kitBannerOut 200ms\n      var(--%NS%kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)) forwards;\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    .kit-status-banner {\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n      transition-duration: 0.01ms !important;\n    }\n  }\n";
const _c2 = ["*"];
function KitLoadingBannerComponent_Conditional_0_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.effectiveMessage(), " ");
} }
function KitLoadingBannerComponent_Conditional_0_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 7);
    i0.ɵɵdomElement(1, "div", 8);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("width", ctx_r0.effectivePercent(), "%");
} }
function KitLoadingBannerComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4);
    i0.ɵɵdomElement(4, "span", 5);
    i0.ɵɵdomElementStart(5, "span", 6);
    i0.ɵɵconditionalCreate(6, KitLoadingBannerComponent_Conditional_0_Conditional_6_Template, 1, 1);
    i0.ɵɵprojection(7);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵconditionalCreate(8, KitLoadingBannerComponent_Conditional_0_Conditional_8_Template, 2, 2, "div", 7);
    i0.ɵɵdomElementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("closing", ctx_r0.isClosing());
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("closing", ctx_r0.isClosing());
    i0.ɵɵattribute("data-testid", ctx_r0.testId() || null);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r0.effectiveMessage() ? 6 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.showProgress() && ctx_r0.effectivePercent() !== null ? 8 : -1);
} }
export function canAnimateKitBannerExit() {
    if (isKitReducedMotionPreferred()) {
        return false;
    }
    return Boolean(typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: no-preference)').matches);
}
const KIT_BANNER_COLLAPSE_CSS = `
  @keyframes kitBannerIn {
    from {
      opacity: 0;
      transform: translateY(-6px) scale(0.985);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes kitBannerOut {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(-6px) scale(0.985);
    }
  }

  .kit-banner-collapse {
    display: grid;
    grid-template-rows: 1fr;
    opacity: 1;
    transition:
      grid-template-rows var(--kit-duration-medium, 260ms)
        var(--kit-ease-smooth, cubic-bezier(0.22, 1, 0.36, 1)),
      opacity 200ms var(--kit-ease-standard, cubic-bezier(0.4, 0, 0.2, 1));
  }

  @starting-style {
    .kit-banner-collapse {
      grid-template-rows: 0fr;
      opacity: 0;
    }
  }

  .kit-banner-collapse.closing {
    grid-template-rows: 0fr;
    opacity: 0;
    pointer-events: none;
    transition:
      grid-template-rows 220ms var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)),
      opacity 180ms var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1));
  }

  .kit-banner-collapse-inner {
    min-height: 0;
    overflow: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    .kit-banner-collapse {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
const KIT_STATUS_BANNER_CSS = `
  @keyframes kitErrorShake {
    0%,
    100% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(-6px);
    }
    40% {
      transform: translateX(5px);
    }
    60% {
      transform: translateX(-3px);
    }
    80% {
      transform: translateX(2px);
    }
  }

  .kit-status-banner {
    padding: 12px 16px;
    border-radius: var(--kit-radius-sm);
    font-size: 0.875rem;
    font-weight: 600;
    border: 1px solid var(--kit-outline-variant);
    background: var(--kit-surface-container-high);
    color: var(--kit-on-surface);
    animation: kitBannerIn 220ms var(--kit-ease-emphasized) both;
  }

  .kit-status-banner.variant-error {
    background: var(--kit-danger-subtle);
    border-color: var(--kit-danger-border);
    color: var(--kit-danger);
    animation:
      kitBannerIn 200ms var(--kit-ease-emphasized) both,
      kitErrorShake 360ms var(--kit-ease-standard) both;
  }

  .kit-status-banner.variant-success {
    background: var(--kit-success-subtle);
    border-color: var(--kit-success-border);
    color: var(--kit-success);
  }

  .kit-status-banner.variant-warning {
    background: var(--kit-warning-subtle);
    border-color: var(--kit-warning-border);
    color: var(--kit-warning);
  }

  .kit-status-banner.closing,
  .kit-status-banner.variant-error.closing {
    animation: kitBannerOut 200ms
      var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)) forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    .kit-status-banner {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
/**
 * Header-friendly sync pill that morphs from a spinning indicator into a
 * checkmark confirmation before lingering briefly and fading out.
 */
export class KitSyncIndicatorComponent {
    constructor() {
        this.isSaving = input(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "isSaving" }] : /* istanbul ignore next */ []));
        this.savingLabel = input('Saving...', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "savingLabel" }] : /* istanbul ignore next */ []));
        this.savedLabel = input('Saved', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "savedLabel" }] : /* istanbul ignore next */ []));
        this.lingerMs = input(1400, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "lingerMs" }] : /* istanbul ignore next */ []));
        this.phase = signal('idle', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "phase" }] : /* istanbul ignore next */ []));
        this.wasSaving = false;
        this.lingerTimer = null;
        try {
            effect(() => {
                this.updateSavingState(this.isSaving());
            });
        }
        catch {
            // Allow plain unit-test instantiation outside an Angular injector context
        }
    }
    updateSavingState(saving) {
        if (saving) {
            this.clearLingerTimer();
            this.wasSaving = true;
            this.phase.set('saving');
        }
        else if (this.wasSaving) {
            this.wasSaving = false;
            this.phase.set('saved');
            this.clearLingerTimer();
            const delay = Math.max(0, this.lingerMs());
            this.lingerTimer = setTimeout(() => {
                this.lingerTimer = null;
                this.phase.set('idle');
            }, delay);
        }
    }
    ngOnDestroy() {
        this.clearLingerTimer();
    }
    clearLingerTimer() {
        if (this.lingerTimer) {
            clearTimeout(this.lingerTimer);
            this.lingerTimer = null;
        }
    }
    static { this.ɵfac = function KitSyncIndicatorComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitSyncIndicatorComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitSyncIndicatorComponent, selectors: [["kit-sync-indicator"]], inputs: { isSaving: [1, "isSaving"], savingLabel: [1, "savingLabel"], savedLabel: [1, "savedLabel"], lingerMs: [1, "lingerMs"] }, decls: 1, vars: 1, consts: [["aria-live", "polite", 1, "kit-sync-indicator", 3, "saving", "saved"], ["aria-live", "polite", 1, "kit-sync-indicator"], ["viewBox", "0 0 24 24", "width", "14", "height", "14", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "aria-hidden", "true", 1, "kit-sync-spinner"], ["cx", "12", "cy", "12", "r", "9", "opacity", "0.25"], ["d", "M21 12a9 9 0 0 0-9-9", "stroke-linecap", "round"], ["viewBox", "0 0 24 24", "width", "14", "height", "14", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true", 1, "kit-sync-check"], ["d", "M5 13l4 4L19 7"]], template: function KitSyncIndicatorComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, KitSyncIndicatorComponent_Conditional_0_Template, 3, 5, "div", 0);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.phase() !== "idle" ? 0 : -1);
        } }, styles: ["\n      @keyframes kitSyncSpin {\n        to {\n          transform: rotate(360deg);\n        }\n      }\n\n      @keyframes kitSyncPopIn {\n        from {\n          opacity: 0;\n          transform: translateY(-4px) scale(0.92);\n        }\n        to {\n          opacity: 1;\n          transform: translateY(0) scale(1);\n        }\n      }\n\n      @keyframes kitCheckDraw {\n        from {\n          stroke-dashoffset: 24;\n        }\n        to {\n          stroke-dashoffset: 0;\n        }\n      }\n\n      .kit-sync-indicator {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        padding: 5px 11px;\n        border-radius: var(--%NS%kit-radius-full);\n        font-size: 0.78rem;\n        font-weight: 600;\n        border: 1px solid var(--%NS%kit-outline-variant);\n        background: var(--%NS%kit-surface-container-high);\n        color: var(--%NS%kit-on-surface-variant);\n        animation: kitSyncPopIn 200ms var(--%NS%kit-ease-spring) both;\n      }\n\n      .kit-sync-indicator.saving {\n        border-color: var(--%NS%kit-primary);\n        color: var(--%NS%kit-primary);\n        background: var(--%NS%kit-primary-container);\n      }\n\n      .kit-sync-indicator.saved {\n        border-color: var(--%NS%kit-success-border);\n        color: var(--%NS%kit-success);\n        background: var(--%NS%kit-success-subtle);\n      }\n\n      .kit-sync-spinner {\n        animation: kitSyncSpin 0.85s linear infinite;\n      }\n\n      .kit-sync-check path {\n        stroke-dasharray: 24;\n        animation: kitCheckDraw 240ms var(--%NS%kit-ease-emphasized) both;\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-sync-indicator,\n        .kit-sync-indicator * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitSyncIndicatorComponent, [{
        type: Component,
        args: [{ selector: 'kit-sync-indicator', standalone: true, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    @if (phase() !== 'idle') {
      <div
        class="kit-sync-indicator"
        [class.saving]="phase() === 'saving'"
        [class.saved]="phase() === 'saved'"
        aria-live="polite"
      >
        @if (phase() === 'saving') {
          <svg
            class="kit-sync-spinner"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" opacity="0.25" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke-linecap="round" />
          </svg>
          <span>{{ savingLabel() }}</span>
        } @else {
          <svg
            class="kit-sync-check"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          <span>{{ savedLabel() }}</span>
        }
      </div>
    }
  `, styles: ["\n      @keyframes kitSyncSpin {\n        to {\n          transform: rotate(360deg);\n        }\n      }\n\n      @keyframes kitSyncPopIn {\n        from {\n          opacity: 0;\n          transform: translateY(-4px) scale(0.92);\n        }\n        to {\n          opacity: 1;\n          transform: translateY(0) scale(1);\n        }\n      }\n\n      @keyframes kitCheckDraw {\n        from {\n          stroke-dashoffset: 24;\n        }\n        to {\n          stroke-dashoffset: 0;\n        }\n      }\n\n      .kit-sync-indicator {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        padding: 5px 11px;\n        border-radius: var(--kit-radius-full);\n        font-size: 0.78rem;\n        font-weight: 600;\n        border: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container-high);\n        color: var(--kit-on-surface-variant);\n        animation: kitSyncPopIn 200ms var(--kit-ease-spring) both;\n      }\n\n      .kit-sync-indicator.saving {\n        border-color: var(--kit-primary);\n        color: var(--kit-primary);\n        background: var(--kit-primary-container);\n      }\n\n      .kit-sync-indicator.saved {\n        border-color: var(--kit-success-border);\n        color: var(--kit-success);\n        background: var(--kit-success-subtle);\n      }\n\n      .kit-sync-spinner {\n        animation: kitSyncSpin 0.85s linear infinite;\n      }\n\n      .kit-sync-check path {\n        stroke-dasharray: 24;\n        animation: kitCheckDraw 240ms var(--kit-ease-emphasized) both;\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-sync-indicator,\n        .kit-sync-indicator * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "] }]
    }], () => [], { isSaving: [{ type: i0.Input, args: [{ isSignal: true, alias: "isSaving", required: false }] }], savingLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "savingLabel", required: false }] }], savedLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "savedLabel", required: false }] }], lingerMs: [{ type: i0.Input, args: [{ isSignal: true, alias: "lingerMs", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitSyncIndicatorComponent, { className: "KitSyncIndicatorComponent", filePath: "status-feedback.component.ts", lineNumber: 283 }); })();
/**
 * Animated inline status/alert banner with directional entrance, height collapse,
 * and exit animation on dismissal, plus a subtle horizontal shake on error feedback.
 */
export class KitStatusBannerComponent {
    constructor() {
        this.message = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "message" }] : /* istanbul ignore next */ []));
        this.variant = input('info', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
        this.exitDurationMs = input(220, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "exitDurationMs" }] : /* istanbul ignore next */ []));
        this.displayedMessage = signal(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "displayedMessage" }] : /* istanbul ignore next */ []));
        this.isClosing = signal(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "isClosing" }] : /* istanbul ignore next */ []));
        this.effectiveMessage = computed(() => this.message() || this.displayedMessage(), /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "effectiveMessage" }] : /* istanbul ignore next */ []));
        this.closeTimer = null;
        try {
            effect(() => {
                this.syncMessageState(this.message());
            });
        }
        catch {
            // Allow plain unit-test instantiation outside an Angular injector context
        }
    }
    syncMessageState(msg) {
        if (msg) {
            this.clearCloseTimer();
            this.isClosing.set(false);
            this.displayedMessage.set(msg);
            return;
        }
        if (this.displayedMessage()) {
            const duration = Math.max(0, this.exitDurationMs());
            if (canAnimateKitBannerExit() && duration > 0) {
                if (!this.isClosing()) {
                    this.isClosing.set(true);
                    this.clearCloseTimer();
                    this.closeTimer = setTimeout(() => {
                        this.closeTimer = null;
                        this.isClosing.set(false);
                        this.displayedMessage.set(null);
                    }, duration);
                }
            }
            else {
                this.clearCloseTimer();
                this.isClosing.set(false);
                this.displayedMessage.set(null);
            }
        }
    }
    ngOnDestroy() {
        this.clearCloseTimer();
    }
    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }
    static { this.ɵfac = function KitStatusBannerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitStatusBannerComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitStatusBannerComponent, selectors: [["kit-status-banner"]], inputs: { message: [1, "message"], variant: [1, "variant"], exitDurationMs: [1, "exitDurationMs"] }, decls: 1, vars: 1, consts: [[1, "kit-banner-collapse", 3, "closing"], [1, "kit-banner-collapse"], [1, "kit-banner-collapse-inner"], ["aria-live", "polite", 1, "kit-status-banner"], [1, "kit-status-banner-text"]], template: function KitStatusBannerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, KitStatusBannerComponent_Conditional_0_Template, 5, 6, "div", 0);
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵconditional((tmp_0_0 = ctx.effectiveMessage()) ? 0 : -1, tmp_0_0);
        } }, styles: [_c0, _c1], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitStatusBannerComponent, [{
        type: Component,
        args: [{ selector: 'kit-status-banner', standalone: true, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    @if (effectiveMessage(); as activeMessage) {
      <div class="kit-banner-collapse" [class.closing]="isClosing()">
        <div class="kit-banner-collapse-inner">
          <div
            class="kit-status-banner"
            [class]="
              'kit-status-banner variant-' +
              variant() +
              (isClosing() ? ' closing' : '')
            "
            [attr.role]="variant() === 'error' ? 'alert' : 'status'"
            aria-live="polite"
          >
            <span class="kit-status-banner-text">{{ activeMessage }}</span>
          </div>
        </div>
      </div>
    }
  `, styles: ["\n  @keyframes kitBannerIn {\n    from {\n      opacity: 0;\n      transform: translateY(-6px) scale(0.985);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0) scale(1);\n    }\n  }\n\n  @keyframes kitBannerOut {\n    from {\n      opacity: 1;\n      transform: translateY(0) scale(1);\n    }\n    to {\n      opacity: 0;\n      transform: translateY(-6px) scale(0.985);\n    }\n  }\n\n  .kit-banner-collapse {\n    display: grid;\n    grid-template-rows: 1fr;\n    opacity: 1;\n    transition:\n      grid-template-rows var(--kit-duration-medium, 260ms)\n        var(--kit-ease-smooth, cubic-bezier(0.22, 1, 0.36, 1)),\n      opacity 200ms var(--kit-ease-standard, cubic-bezier(0.4, 0, 0.2, 1));\n  }\n\n  @starting-style {\n    .kit-banner-collapse {\n      grid-template-rows: 0fr;\n      opacity: 0;\n    }\n  }\n\n  .kit-banner-collapse.closing {\n    grid-template-rows: 0fr;\n    opacity: 0;\n    pointer-events: none;\n    transition:\n      grid-template-rows 220ms var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)),\n      opacity 180ms var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1));\n  }\n\n  .kit-banner-collapse-inner {\n    min-height: 0;\n    overflow: hidden;\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    .kit-banner-collapse {\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n      transition-duration: 0.01ms !important;\n    }\n  }\n", "\n  @keyframes kitErrorShake {\n    0%,\n    100% {\n      transform: translateX(0);\n    }\n    20% {\n      transform: translateX(-6px);\n    }\n    40% {\n      transform: translateX(5px);\n    }\n    60% {\n      transform: translateX(-3px);\n    }\n    80% {\n      transform: translateX(2px);\n    }\n  }\n\n  .kit-status-banner {\n    padding: 12px 16px;\n    border-radius: var(--kit-radius-sm);\n    font-size: 0.875rem;\n    font-weight: 600;\n    border: 1px solid var(--kit-outline-variant);\n    background: var(--kit-surface-container-high);\n    color: var(--kit-on-surface);\n    animation: kitBannerIn 220ms var(--kit-ease-emphasized) both;\n  }\n\n  .kit-status-banner.variant-error {\n    background: var(--kit-danger-subtle);\n    border-color: var(--kit-danger-border);\n    color: var(--kit-danger);\n    animation:\n      kitBannerIn 200ms var(--kit-ease-emphasized) both,\n      kitErrorShake 360ms var(--kit-ease-standard) both;\n  }\n\n  .kit-status-banner.variant-success {\n    background: var(--kit-success-subtle);\n    border-color: var(--kit-success-border);\n    color: var(--kit-success);\n  }\n\n  .kit-status-banner.variant-warning {\n    background: var(--kit-warning-subtle);\n    border-color: var(--kit-warning-border);\n    color: var(--kit-warning);\n  }\n\n  .kit-status-banner.closing,\n  .kit-status-banner.variant-error.closing {\n    animation: kitBannerOut 200ms\n      var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)) forwards;\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    .kit-status-banner {\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n      transition-duration: 0.01ms !important;\n    }\n  }\n"] }]
    }], () => [], { message: [{ type: i0.Input, args: [{ isSignal: true, alias: "message", required: false }] }], variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], exitDurationMs: [{ type: i0.Input, args: [{ isSignal: true, alias: "exitDurationMs", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitStatusBannerComponent, { className: "KitStatusBannerComponent", filePath: "status-feedback.component.ts", lineNumber: 366 }); })();
export function formatKitDegradedTimestamp(value) {
    if (!value)
        return null;
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
        return typeof value === 'string' && value.trim() ? value.trim() : null;
    }
    try {
        return date.toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });
    }
    catch {
        return date.toISOString();
    }
}
/**
 * Shared read-only warning banner displayed when the app is running against an
 * R2 backup snapshot (due to D1 read quota exhaustion) or offline cached data,
 * with smooth appearing and disappearing animations.
 */
export class KitDegradedBannerComponent {
    constructor() {
        this.mode = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "mode" }] : /* istanbul ignore next */ []));
        this.snapshotTimestamp = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "snapshotTimestamp" }] : /* istanbul ignore next */ []));
        this.customMessage = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "customMessage" }] : /* istanbul ignore next */ []));
        this.exitDurationMs = input(220, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "exitDurationMs" }] : /* istanbul ignore next */ []));
        this.displayedMode = signal(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "displayedMode" }] : /* istanbul ignore next */ []));
        this.displayedMessage = signal('', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "displayedMessage" }] : /* istanbul ignore next */ []));
        this.isClosing = signal(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "isClosing" }] : /* istanbul ignore next */ []));
        this.effectiveMode = computed(() => this.mode() ?? this.displayedMode(), /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "effectiveMode" }] : /* istanbul ignore next */ []));
        this.resolvedMessage = computed(() => {
            const custom = this.customMessage()?.trim();
            if (custom)
                return custom;
            const activeMode = this.effectiveMode();
            const ts = formatKitDegradedTimestamp(this.snapshotTimestamp());
            if (activeMode === 'backup') {
                const fromPart = ts ? ` from ${ts}` : '';
                return `Database read quota is temporarily exhausted. Showing backup snapshot${fromPart}. Editing is disabled until service resumes.`;
            }
            if (activeMode === 'offline') {
                const syncedPart = ts ? ` (last synced ${ts})` : '';
                return `Showing locally cached data${syncedPart}. Editing is disabled until connection is restored.`;
            }
            return this.displayedMessage();
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "resolvedMessage" }] : /* istanbul ignore next */ []));
        this.closeTimer = null;
        try {
            effect(() => {
                this.syncModeState(this.mode());
            });
        }
        catch {
            // Allow plain unit-test instantiation outside an Angular injector context
        }
    }
    syncModeState(nextMode) {
        if (nextMode !== null) {
            this.clearCloseTimer();
            this.isClosing.set(false);
            this.displayedMode.set(nextMode);
            this.displayedMessage.set(untracked(() => this.resolvedMessage()));
            return;
        }
        if (this.displayedMode() !== null) {
            const duration = Math.max(0, this.exitDurationMs());
            if (canAnimateKitBannerExit() && duration > 0) {
                if (!this.isClosing()) {
                    this.isClosing.set(true);
                    this.clearCloseTimer();
                    this.closeTimer = setTimeout(() => {
                        this.closeTimer = null;
                        this.isClosing.set(false);
                        this.displayedMode.set(null);
                        this.displayedMessage.set('');
                    }, duration);
                }
            }
            else {
                this.clearCloseTimer();
                this.isClosing.set(false);
                this.displayedMode.set(null);
                this.displayedMessage.set('');
            }
        }
    }
    ngOnDestroy() {
        this.clearCloseTimer();
    }
    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }
    static { this.ɵfac = function KitDegradedBannerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitDegradedBannerComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitDegradedBannerComponent, selectors: [["kit-degraded-banner"]], inputs: { mode: [1, "mode"], snapshotTimestamp: [1, "snapshotTimestamp"], customMessage: [1, "customMessage"], exitDurationMs: [1, "exitDurationMs"] }, decls: 1, vars: 1, consts: [[1, "kit-banner-collapse", 3, "closing"], [1, "kit-banner-collapse"], [1, "kit-banner-collapse-inner"], ["data-testid", "kit-degraded-banner", "role", "status", "aria-live", "polite", 1, "kit-status-banner", "variant-warning", "kit-degraded-banner"], [1, "kit-degraded-badge"], [1, "kit-degraded-message"]], template: function KitDegradedBannerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, KitDegradedBannerComponent_Conditional_0_Template, 7, 6, "div", 0);
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵconditional((tmp_0_0 = ctx.effectiveMode()) ? 0 : -1, tmp_0_0);
        } }, styles: [_c0, _c1, "\n      .kit-degraded-banner {\n        display: flex;\n        flex-wrap: wrap;\n        align-items: center;\n        gap: 8px 12px;\n        margin-bottom: 16px;\n        line-height: 1.4;\n      }\n\n      .kit-degraded-badge {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        font-weight: 700;\n        white-space: nowrap;\n      }\n\n      .kit-degraded-message {\n        font-weight: 500;\n      }\n    "], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitDegradedBannerComponent, [{
        type: Component,
        args: [{ selector: 'kit-degraded-banner', standalone: true, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    @if (effectiveMode(); as activeMode) {
      <div class="kit-banner-collapse" [class.closing]="isClosing()">
        <div class="kit-banner-collapse-inner">
          <div
            class="kit-status-banner variant-warning kit-degraded-banner"
            [class.closing]="isClosing()"
            data-testid="kit-degraded-banner"
            role="status"
            aria-live="polite"
          >
            <span class="kit-degraded-badge">
              {{
                activeMode === 'backup'
                  ? '⚠️ Read-Only Backup Mode'
                  : '⚠️ Offline Read-Only Mode'
              }}
            </span>
            <span class="kit-degraded-message">{{ resolvedMessage() }}</span>
          </div>
        </div>
      </div>
    }
  `, styles: ["\n  @keyframes kitBannerIn {\n    from {\n      opacity: 0;\n      transform: translateY(-6px) scale(0.985);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0) scale(1);\n    }\n  }\n\n  @keyframes kitBannerOut {\n    from {\n      opacity: 1;\n      transform: translateY(0) scale(1);\n    }\n    to {\n      opacity: 0;\n      transform: translateY(-6px) scale(0.985);\n    }\n  }\n\n  .kit-banner-collapse {\n    display: grid;\n    grid-template-rows: 1fr;\n    opacity: 1;\n    transition:\n      grid-template-rows var(--kit-duration-medium, 260ms)\n        var(--kit-ease-smooth, cubic-bezier(0.22, 1, 0.36, 1)),\n      opacity 200ms var(--kit-ease-standard, cubic-bezier(0.4, 0, 0.2, 1));\n  }\n\n  @starting-style {\n    .kit-banner-collapse {\n      grid-template-rows: 0fr;\n      opacity: 0;\n    }\n  }\n\n  .kit-banner-collapse.closing {\n    grid-template-rows: 0fr;\n    opacity: 0;\n    pointer-events: none;\n    transition:\n      grid-template-rows 220ms var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)),\n      opacity 180ms var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1));\n  }\n\n  .kit-banner-collapse-inner {\n    min-height: 0;\n    overflow: hidden;\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    .kit-banner-collapse {\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n      transition-duration: 0.01ms !important;\n    }\n  }\n", "\n  @keyframes kitErrorShake {\n    0%,\n    100% {\n      transform: translateX(0);\n    }\n    20% {\n      transform: translateX(-6px);\n    }\n    40% {\n      transform: translateX(5px);\n    }\n    60% {\n      transform: translateX(-3px);\n    }\n    80% {\n      transform: translateX(2px);\n    }\n  }\n\n  .kit-status-banner {\n    padding: 12px 16px;\n    border-radius: var(--kit-radius-sm);\n    font-size: 0.875rem;\n    font-weight: 600;\n    border: 1px solid var(--kit-outline-variant);\n    background: var(--kit-surface-container-high);\n    color: var(--kit-on-surface);\n    animation: kitBannerIn 220ms var(--kit-ease-emphasized) both;\n  }\n\n  .kit-status-banner.variant-error {\n    background: var(--kit-danger-subtle);\n    border-color: var(--kit-danger-border);\n    color: var(--kit-danger);\n    animation:\n      kitBannerIn 200ms var(--kit-ease-emphasized) both,\n      kitErrorShake 360ms var(--kit-ease-standard) both;\n  }\n\n  .kit-status-banner.variant-success {\n    background: var(--kit-success-subtle);\n    border-color: var(--kit-success-border);\n    color: var(--kit-success);\n  }\n\n  .kit-status-banner.variant-warning {\n    background: var(--kit-warning-subtle);\n    border-color: var(--kit-warning-border);\n    color: var(--kit-warning);\n  }\n\n  .kit-status-banner.closing,\n  .kit-status-banner.variant-error.closing {\n    animation: kitBannerOut 200ms\n      var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)) forwards;\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    .kit-status-banner {\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n      transition-duration: 0.01ms !important;\n    }\n  }\n", "\n      .kit-degraded-banner {\n        display: flex;\n        flex-wrap: wrap;\n        align-items: center;\n        gap: 8px 12px;\n        margin-bottom: 16px;\n        line-height: 1.4;\n      }\n\n      .kit-degraded-badge {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        font-weight: 700;\n        white-space: nowrap;\n      }\n\n      .kit-degraded-message {\n        font-weight: 500;\n      }\n    "] }]
    }], () => [], { mode: [{ type: i0.Input, args: [{ isSignal: true, alias: "mode", required: false }] }], snapshotTimestamp: [{ type: i0.Input, args: [{ isSignal: true, alias: "snapshotTimestamp", required: false }] }], customMessage: [{ type: i0.Input, args: [{ isSignal: true, alias: "customMessage", required: false }] }], exitDurationMs: [{ type: i0.Input, args: [{ isSignal: true, alias: "exitDurationMs", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitDegradedBannerComponent, { className: "KitDegradedBannerComponent", filePath: "status-feedback.component.ts", lineNumber: 512 }); })();
/**
 * Shared animated loading/sync progress banner with pulsing status indicator,
 * optional determinate progress track, and smooth appear/disappear animations.
 */
export class KitLoadingBannerComponent {
    constructor() {
        this.active = input(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "active" }] : /* istanbul ignore next */ []));
        this.message = input('', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "message" }] : /* istanbul ignore next */ []));
        this.percent = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "percent" }] : /* istanbul ignore next */ []));
        this.showProgress = input(true, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "showProgress" }] : /* istanbul ignore next */ []));
        this.testId = input('kit-loading-banner', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "testId" }] : /* istanbul ignore next */ []));
        this.exitDurationMs = input(220, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "exitDurationMs" }] : /* istanbul ignore next */ []));
        this.isRendered = signal(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "isRendered" }] : /* istanbul ignore next */ []));
        this.isClosing = signal(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "isClosing" }] : /* istanbul ignore next */ []));
        this.lastMessage = signal('', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "lastMessage" }] : /* istanbul ignore next */ []));
        this.lastPercent = signal(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "lastPercent" }] : /* istanbul ignore next */ []));
        this.shouldShow = computed(() => this.active() || this.isRendered(), /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "shouldShow" }] : /* istanbul ignore next */ []));
        this.effectiveMessage = computed(() => this.isClosing()
            ? this.lastMessage() || this.message()
            : this.message() || this.lastMessage(), /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "effectiveMessage" }] : /* istanbul ignore next */ []));
        this.effectivePercent = computed(() => {
            const p = this.isClosing()
                ? (this.lastPercent() ?? this.percent())
                : (this.percent() ?? this.lastPercent());
            if (typeof p === 'number' && Number.isFinite(p)) {
                return Math.max(0, Math.min(100, p));
            }
            return null;
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "effectivePercent" }] : /* istanbul ignore next */ []));
        this.closeTimer = null;
        try {
            effect(() => {
                this.syncActiveState(this.active(), this.message(), this.percent());
            });
        }
        catch {
            // Allow plain unit-test instantiation outside an Angular injector context
        }
    }
    syncActiveState(isActive, msg, pct) {
        if (isActive) {
            this.clearCloseTimer();
            this.isClosing.set(false);
            this.isRendered.set(true);
            if (msg !== undefined) {
                this.lastMessage.set(msg);
            }
            if (pct !== undefined) {
                this.lastPercent.set(typeof pct === 'number' && Number.isFinite(pct)
                    ? Math.max(0, Math.min(100, pct))
                    : null);
            }
            return;
        }
        if (this.isRendered()) {
            const duration = Math.max(0, this.exitDurationMs());
            if (canAnimateKitBannerExit() && duration > 0) {
                if (!this.isClosing()) {
                    this.isClosing.set(true);
                    this.clearCloseTimer();
                    this.closeTimer = setTimeout(() => {
                        this.closeTimer = null;
                        this.isClosing.set(false);
                        this.isRendered.set(false);
                    }, duration);
                }
            }
            else {
                this.clearCloseTimer();
                this.isClosing.set(false);
                this.isRendered.set(false);
            }
        }
    }
    ngOnDestroy() {
        this.clearCloseTimer();
    }
    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }
    static { this.ɵfac = function KitLoadingBannerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitLoadingBannerComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitLoadingBannerComponent, selectors: [["kit-loading-banner"]], inputs: { active: [1, "active"], message: [1, "message"], percent: [1, "percent"], showProgress: [1, "showProgress"], testId: [1, "testId"], exitDurationMs: [1, "exitDurationMs"] }, ngContentSelectors: _c2, decls: 1, vars: 1, consts: [[1, "kit-banner-collapse", 3, "closing"], [1, "kit-banner-collapse"], [1, "kit-banner-collapse-inner"], ["role", "status", "aria-live", "polite", 1, "kit-loading-banner", "catalog-sync-banner"], [1, "kit-loading-banner-info", "catalog-sync-info"], ["aria-hidden", "true", 1, "kit-loading-banner-dot", "catalog-sync-dot"], [1, "kit-loading-banner-text"], ["aria-hidden", "true", 1, "kit-loading-banner-track", "catalog-sync-track"], [1, "kit-loading-banner-fill", "catalog-sync-fill"]], template: function KitLoadingBannerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵconditionalCreate(0, KitLoadingBannerComponent_Conditional_0_Template, 9, 7, "div", 0);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.shouldShow() ? 0 : -1);
        } }, styles: [_c0, "\n      @keyframes kitLoadingBannerPulse {\n        0%,\n        100% {\n          opacity: 0.45;\n        }\n        50% {\n          opacity: 1;\n        }\n      }\n\n      .kit-loading-banner {\n        display: flex;\n        flex-direction: column;\n        gap: 0.4rem;\n        margin-bottom: 0.75rem;\n        padding: 0.5rem 0.875rem;\n        background: var(--%NS%kit-surface-container-high);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        border-radius: var(--%NS%kit-radius-md);\n        font-size: 0.8125rem;\n        color: var(--%NS%kit-on-surface-variant);\n        animation: kitBannerIn 220ms var(--%NS%kit-ease-emphasized) both;\n      }\n\n      .kit-loading-banner.closing {\n        animation: kitBannerOut 200ms\n          var(--%NS%kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)) forwards;\n      }\n\n      .kit-loading-banner-info {\n        display: flex;\n        align-items: center;\n        gap: 0.5rem;\n      }\n\n      .kit-loading-banner-dot {\n        width: 8px;\n        height: 8px;\n        border-radius: 50%;\n        background: var(--%NS%kit-primary);\n        flex-shrink: 0;\n        animation: kitLoadingBannerPulse 1.4s ease-in-out infinite;\n      }\n\n      .kit-loading-banner-track {\n        width: 100%;\n        height: 4px;\n        border-radius: var(--%NS%kit-radius-full);\n        background: var(--%NS%kit-surface-container-highest);\n        overflow: hidden;\n      }\n\n      .kit-loading-banner-fill {\n        height: 100%;\n        border-radius: var(--%NS%kit-radius-full);\n        background: var(--%NS%kit-primary);\n        transition: width 180ms ease-out;\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-loading-banner,\n        .kit-loading-banner * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitLoadingBannerComponent, [{
        type: Component,
        args: [{ selector: 'kit-loading-banner', standalone: true, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    @if (shouldShow()) {
      <div class="kit-banner-collapse" [class.closing]="isClosing()">
        <div class="kit-banner-collapse-inner">
          <div
            class="kit-loading-banner catalog-sync-banner"
            [class.closing]="isClosing()"
            [attr.data-testid]="testId() || null"
            role="status"
            aria-live="polite"
          >
            <div class="kit-loading-banner-info catalog-sync-info">
              <span
                class="kit-loading-banner-dot catalog-sync-dot"
                aria-hidden="true"
              ></span>
              <span class="kit-loading-banner-text">
                @if (effectiveMessage()) {
                  {{ effectiveMessage() }}
                }
                <ng-content />
              </span>
            </div>
            @if (showProgress() && effectivePercent() !== null) {
              <div
                class="kit-loading-banner-track catalog-sync-track"
                aria-hidden="true"
              >
                <div
                  class="kit-loading-banner-fill catalog-sync-fill"
                  [style.width.%]="effectivePercent()"
                ></div>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `, styles: ["\n  @keyframes kitBannerIn {\n    from {\n      opacity: 0;\n      transform: translateY(-6px) scale(0.985);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0) scale(1);\n    }\n  }\n\n  @keyframes kitBannerOut {\n    from {\n      opacity: 1;\n      transform: translateY(0) scale(1);\n    }\n    to {\n      opacity: 0;\n      transform: translateY(-6px) scale(0.985);\n    }\n  }\n\n  .kit-banner-collapse {\n    display: grid;\n    grid-template-rows: 1fr;\n    opacity: 1;\n    transition:\n      grid-template-rows var(--kit-duration-medium, 260ms)\n        var(--kit-ease-smooth, cubic-bezier(0.22, 1, 0.36, 1)),\n      opacity 200ms var(--kit-ease-standard, cubic-bezier(0.4, 0, 0.2, 1));\n  }\n\n  @starting-style {\n    .kit-banner-collapse {\n      grid-template-rows: 0fr;\n      opacity: 0;\n    }\n  }\n\n  .kit-banner-collapse.closing {\n    grid-template-rows: 0fr;\n    opacity: 0;\n    pointer-events: none;\n    transition:\n      grid-template-rows 220ms var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)),\n      opacity 180ms var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1));\n  }\n\n  .kit-banner-collapse-inner {\n    min-height: 0;\n    overflow: hidden;\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    .kit-banner-collapse {\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n      transition-duration: 0.01ms !important;\n    }\n  }\n", "\n      @keyframes kitLoadingBannerPulse {\n        0%,\n        100% {\n          opacity: 0.45;\n        }\n        50% {\n          opacity: 1;\n        }\n      }\n\n      .kit-loading-banner {\n        display: flex;\n        flex-direction: column;\n        gap: 0.4rem;\n        margin-bottom: 0.75rem;\n        padding: 0.5rem 0.875rem;\n        background: var(--kit-surface-container-high);\n        border: 1px solid var(--kit-outline-variant);\n        border-radius: var(--kit-radius-md);\n        font-size: 0.8125rem;\n        color: var(--kit-on-surface-variant);\n        animation: kitBannerIn 220ms var(--kit-ease-emphasized) both;\n      }\n\n      .kit-loading-banner.closing {\n        animation: kitBannerOut 200ms\n          var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)) forwards;\n      }\n\n      .kit-loading-banner-info {\n        display: flex;\n        align-items: center;\n        gap: 0.5rem;\n      }\n\n      .kit-loading-banner-dot {\n        width: 8px;\n        height: 8px;\n        border-radius: 50%;\n        background: var(--kit-primary);\n        flex-shrink: 0;\n        animation: kitLoadingBannerPulse 1.4s ease-in-out infinite;\n      }\n\n      .kit-loading-banner-track {\n        width: 100%;\n        height: 4px;\n        border-radius: var(--kit-radius-full);\n        background: var(--kit-surface-container-highest);\n        overflow: hidden;\n      }\n\n      .kit-loading-banner-fill {\n        height: 100%;\n        border-radius: var(--kit-radius-full);\n        background: var(--kit-primary);\n        transition: width 180ms ease-out;\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-loading-banner,\n        .kit-loading-banner * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "] }]
    }], () => [], { active: [{ type: i0.Input, args: [{ isSignal: true, alias: "active", required: false }] }], message: [{ type: i0.Input, args: [{ isSignal: true, alias: "message", required: false }] }], percent: [{ type: i0.Input, args: [{ isSignal: true, alias: "percent", required: false }] }], showProgress: [{ type: i0.Input, args: [{ isSignal: true, alias: "showProgress", required: false }] }], testId: [{ type: i0.Input, args: [{ isSignal: true, alias: "testId", required: false }] }], exitDurationMs: [{ type: i0.Input, args: [{ isSignal: true, alias: "exitDurationMs", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitLoadingBannerComponent, { className: "KitLoadingBannerComponent", filePath: "status-feedback.component.ts", lineNumber: 719 }); })();
