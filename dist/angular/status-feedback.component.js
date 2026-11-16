import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, effect, input, signal, } from '@angular/core';
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
    i0.ɵɵdomElementStart(0, "div", 1)(1, "span", 2);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap("kit-status-banner variant-" + ctx_r0.variant());
    i0.ɵɵattribute("role", ctx_r0.variant() === "error" ? "alert" : "status");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.message());
} }
function KitDegradedBannerComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 0)(1, "span", 1);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "span", 2);
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx === "backup" ? "\u26A0\uFE0F Read-Only Backup Mode" : "\u26A0\uFE0F Offline Read-Only Mode", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.resolvedMessage());
} }
/**
 * Header-friendly sync pill that morphs from a spinning indicator into a
 * checkmark confirmation before lingering briefly and fading out.
 */
export class KitSyncIndicatorComponent {
    constructor() {
        this.isSaving = input(false, ...(ngDevMode ? [{ debugName: "isSaving" }] : /* istanbul ignore next */ []));
        this.savingLabel = input('Saving...', ...(ngDevMode ? [{ debugName: "savingLabel" }] : /* istanbul ignore next */ []));
        this.savedLabel = input('Saved', ...(ngDevMode ? [{ debugName: "savedLabel" }] : /* istanbul ignore next */ []));
        this.lingerMs = input(1400, ...(ngDevMode ? [{ debugName: "lingerMs" }] : /* istanbul ignore next */ []));
        this.phase = signal('idle', ...(ngDevMode ? [{ debugName: "phase" }] : /* istanbul ignore next */ []));
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
        } }, encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitSyncIndicatorComponent, [{
        type: Component,
        args: [{
                selector: 'kit-sync-indicator',
                standalone: true,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
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
  `,
            }]
    }], () => [], { isSaving: [{ type: i0.Input, args: [{ isSignal: true, alias: "isSaving", required: false }] }], savingLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "savingLabel", required: false }] }], savedLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "savedLabel", required: false }] }], lingerMs: [{ type: i0.Input, args: [{ isSignal: true, alias: "lingerMs", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitSyncIndicatorComponent, { className: "KitSyncIndicatorComponent", filePath: "status-feedback.component.ts", lineNumber: 67 }); })();
/**
 * Animated inline status/alert banner with directional entrance and a subtle
 * horizontal shake on error feedback.
 */
export class KitStatusBannerComponent {
    constructor() {
        this.message = input(null, ...(ngDevMode ? [{ debugName: "message" }] : /* istanbul ignore next */ []));
        this.variant = input('info', ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    }
    static { this.ɵfac = function KitStatusBannerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitStatusBannerComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitStatusBannerComponent, selectors: [["kit-status-banner"]], inputs: { message: [1, "message"], variant: [1, "variant"] }, decls: 1, vars: 1, consts: [["aria-live", "polite", 1, "kit-status-banner", 3, "class"], ["aria-live", "polite", 1, "kit-status-banner"], [1, "kit-status-banner-text"]], template: function KitStatusBannerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, KitStatusBannerComponent_Conditional_0_Template, 3, 4, "div", 0);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.message() ? 0 : -1);
        } }, encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitStatusBannerComponent, [{
        type: Component,
        args: [{
                selector: 'kit-status-banner',
                standalone: true,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    @if (message()) {
      <div
        class="kit-status-banner"
        [class]="'kit-status-banner variant-' + variant()"
        [attr.role]="variant() === 'error' ? 'alert' : 'status'"
        aria-live="polite"
      >
        <span class="kit-status-banner-text">{{ message() }}</span>
      </div>
    }
  `,
            }]
    }], null, { message: [{ type: i0.Input, args: [{ isSignal: true, alias: "message", required: false }] }], variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitStatusBannerComponent, { className: "KitStatusBannerComponent", filePath: "status-feedback.component.ts", lineNumber: 141 }); })();
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
 * R2 backup snapshot (due to D1 read quota exhaustion) or offline cached data.
 */
export class KitDegradedBannerComponent {
    constructor() {
        this.mode = input(null, ...(ngDevMode ? [{ debugName: "mode" }] : /* istanbul ignore next */ []));
        this.snapshotTimestamp = input(null, ...(ngDevMode ? [{ debugName: "snapshotTimestamp" }] : /* istanbul ignore next */ []));
        this.customMessage = input(null, ...(ngDevMode ? [{ debugName: "customMessage" }] : /* istanbul ignore next */ []));
        this.resolvedMessage = computed(() => {
            const custom = this.customMessage()?.trim();
            if (custom)
                return custom;
            const activeMode = this.mode();
            const ts = formatKitDegradedTimestamp(this.snapshotTimestamp());
            if (activeMode === 'backup') {
                const fromPart = ts ? ` from ${ts}` : '';
                return `Database read quota is temporarily exhausted. Showing backup snapshot${fromPart}. Editing is disabled until service resumes.`;
            }
            if (activeMode === 'offline') {
                const syncedPart = ts ? ` (last synced ${ts})` : '';
                return `Showing locally cached data${syncedPart}. Editing is disabled until connection is restored.`;
            }
            return '';
        }, ...(ngDevMode ? [{ debugName: "resolvedMessage" }] : /* istanbul ignore next */ []));
    }
    static { this.ɵfac = function KitDegradedBannerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitDegradedBannerComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitDegradedBannerComponent, selectors: [["kit-degraded-banner"]], inputs: { mode: [1, "mode"], snapshotTimestamp: [1, "snapshotTimestamp"], customMessage: [1, "customMessage"] }, decls: 1, vars: 1, consts: [["data-testid", "kit-degraded-banner", "role", "status", "aria-live", "polite", 1, "kit-status-banner", "variant-warning", "kit-degraded-banner"], [1, "kit-degraded-badge"], [1, "kit-degraded-message"]], template: function KitDegradedBannerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, KitDegradedBannerComponent_Conditional_0_Template, 5, 2, "div", 0);
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵconditional((tmp_0_0 = ctx.mode()) ? 0 : -1, tmp_0_0);
        } }, encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitDegradedBannerComponent, [{
        type: Component,
        args: [{
                selector: 'kit-degraded-banner',
                standalone: true,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    @if (mode(); as activeMode) {
      <div
        class="kit-status-banner variant-warning kit-degraded-banner"
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
    }
  `,
            }]
    }], null, { mode: [{ type: i0.Input, args: [{ isSignal: true, alias: "mode", required: false }] }], snapshotTimestamp: [{ type: i0.Input, args: [{ isSignal: true, alias: "snapshotTimestamp", required: false }] }], customMessage: [{ type: i0.Input, args: [{ isSignal: true, alias: "customMessage", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitDegradedBannerComponent, { className: "KitDegradedBannerComponent", filePath: "status-feedback.component.ts", lineNumber: 197 }); })();
