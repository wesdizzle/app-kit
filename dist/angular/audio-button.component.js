import { ChangeDetectionStrategy, Component, DestroyRef, ViewEncapsulation, computed, inject, input, signal, } from '@angular/core';
import { KitIconComponent } from './icon.component.js';
import * as i0 from "@angular/core";
function KitAudioButtonComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 1);
    i0.ɵɵlistener("click", function KitAudioButtonComponent_Conditional_0_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.togglePlay()); });
    i0.ɵɵelement(1, "kit-icon", 2);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("playing", ctx_r1.playState() === "playing")("loading", ctx_r1.playState() === "loading")("error", ctx_r1.playState() === "error");
    i0.ɵɵproperty("disabled", !ctx_r1.isSupported());
    i0.ɵɵattribute("aria-label", ctx_r1.ariaLabel() || ctx_r1.label())("data-testid", ctx_r1.testId());
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", ctx_r1.playState() === "playing" ? "square-stop" : "volume")("size", 15);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.playState() === "playing" ? "Stop" : ctx_r1.playState() === "loading" ? "Loading..." : ctx_r1.label());
} }
let activeAudioEl = null;
let resetActiveAudioState = null;
export function canPlayKitAudioMime(mimeType) {
    if (typeof Audio === 'undefined') {
        return false;
    }
    try {
        const probe = new Audio();
        if (typeof probe.canPlayType !== 'function') {
            return false;
        }
        return probe.canPlayType(mimeType) !== '';
    }
    catch {
        return false;
    }
}
export function stopActiveKitAudio() {
    if (activeAudioEl) {
        try {
            activeAudioEl.pause();
        }
        catch {
            // Ignore audio pause failures in non-browser stubs
        }
        activeAudioEl = null;
    }
    if (resetActiveAudioState) {
        const cb = resetActiveAudioState;
        resetActiveAudioState = null;
        cb();
    }
}
/**
 * Compact audio playback button with native MIME codec feature detection
 * (gracefully hidden on browsers like Safari/iOS when `.ogg` is unsupported)
 * and global single-clip coordination.
 */
export class KitAudioButtonComponent {
    constructor() {
        this.destroyRef = inject(DestroyRef, { optional: true });
        this.src = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "src" }] : /* istanbul ignore next */ []));
        this.mimeType = input('audio/ogg', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "mimeType" }] : /* istanbul ignore next */ []));
        this.label = input('Play', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
        this.ariaLabel = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
        this.hideIfUnsupported = input(true, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "hideIfUnsupported" }] : /* istanbul ignore next */ []));
        this.testId = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "testId" }] : /* istanbul ignore next */ []));
        this.playState = signal('idle', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "playState" }] : /* istanbul ignore next */ []));
        this.isSupported = computed(() => Boolean(this.src()) && canPlayKitAudioMime(this.mimeType()), /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "isSupported" }] : /* istanbul ignore next */ []));
        this.ownedAudio = null;
        this.destroyRef?.onDestroy(() => {
            if (this.ownedAudio && activeAudioEl === this.ownedAudio) {
                stopActiveKitAudio();
            }
            this.ownedAudio = null;
        });
    }
    togglePlay() {
        const sourceUrl = this.src();
        if (!sourceUrl || !this.isSupported() || typeof Audio === 'undefined') {
            return;
        }
        if (this.playState() === 'playing' && this.ownedAudio) {
            stopActiveKitAudio();
            return;
        }
        stopActiveKitAudio();
        try {
            const audio = new Audio(sourceUrl);
            this.ownedAudio = audio;
            activeAudioEl = audio;
            resetActiveAudioState = () => {
                if (this.ownedAudio === audio) {
                    this.ownedAudio = null;
                }
                this.playState.set('idle');
            };
            this.playState.set('loading');
            audio.onplaying = () => {
                if (activeAudioEl === audio) {
                    this.playState.set('playing');
                }
            };
            audio.onended = () => {
                if (activeAudioEl === audio) {
                    stopActiveKitAudio();
                }
            };
            audio.onerror = () => {
                if (activeAudioEl === audio) {
                    activeAudioEl = null;
                    resetActiveAudioState = null;
                }
                this.ownedAudio = null;
                this.playState.set('error');
            };
            const playResult = audio.play();
            if (playResult && typeof playResult.then === 'function') {
                void playResult
                    .then(() => {
                    if (activeAudioEl === audio && this.playState() === 'loading') {
                        this.playState.set('playing');
                    }
                })
                    .catch(() => {
                    if (activeAudioEl === audio) {
                        activeAudioEl = null;
                        resetActiveAudioState = null;
                    }
                    this.ownedAudio = null;
                    this.playState.set('error');
                });
            }
            else {
                this.playState.set('playing');
            }
        }
        catch {
            this.ownedAudio = null;
            this.playState.set('error');
        }
    }
    static { this.ɵfac = function KitAudioButtonComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitAudioButtonComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitAudioButtonComponent, selectors: [["kit-audio-button"]], inputs: { src: [1, "src"], mimeType: [1, "mimeType"], label: [1, "label"], ariaLabel: [1, "ariaLabel"], hideIfUnsupported: [1, "hideIfUnsupported"], testId: [1, "testId"] }, decls: 1, vars: 1, consts: [["type", "button", 1, "kit-audio-btn", "state-layer", 3, "playing", "loading", "error", "disabled"], ["type", "button", 1, "kit-audio-btn", "state-layer", 3, "click", "disabled"], [3, "name", "size"]], template: function KitAudioButtonComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, KitAudioButtonComponent_Conditional_0_Template, 4, 12, "button", 0);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.src() && (ctx.isSupported() || !ctx.hideIfUnsupported()) ? 0 : -1);
        } }, dependencies: [KitIconComponent], styles: ["\n      .kit-audio-btn {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        padding: 6px 13px;\n        border-radius: var(--%NS%kit-radius-full);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        background: var(--%NS%kit-surface-container-low);\n        color: var(--%NS%kit-on-surface);\n        font-family: var(--%NS%kit-font-sans);\n        font-size: 0.8rem;\n        font-weight: 600;\n        cursor: pointer;\n      }\n\n      .kit-audio-btn:hover:not(:disabled) {\n        border-color: var(--%NS%kit-primary);\n        color: var(--%NS%kit-primary);\n      }\n\n      .kit-audio-btn.playing {\n        background: var(--%NS%kit-primary-container);\n        color: var(--%NS%kit-on-primary-container);\n        border-color: color-mix(in srgb, var(--%NS%kit-primary) 45%, transparent);\n      }\n\n      .kit-audio-btn.error {\n        border-color: var(--%NS%kit-danger-border);\n        color: var(--%NS%kit-danger);\n      }\n\n      .kit-audio-btn:disabled {\n        opacity: 0.45;\n        cursor: not-allowed;\n      }\n\n      .kit-audio-btn:focus-visible {\n        outline: 2.5px solid var(--%NS%kit-primary);\n        outline-offset: 2px;\n      }\n    "], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitAudioButtonComponent, [{
        type: Component,
        args: [{ selector: 'kit-audio-button', standalone: true, imports: [KitIconComponent], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    @if (src() && (isSupported() || !hideIfUnsupported())) {
      <button
        type="button"
        class="kit-audio-btn state-layer"
        [class.playing]="playState() === 'playing'"
        [class.loading]="playState() === 'loading'"
        [class.error]="playState() === 'error'"
        [disabled]="!isSupported()"
        [attr.aria-label]="ariaLabel() || label()"
        [attr.data-testid]="testId()"
        (click)="togglePlay()"
      >
        <kit-icon
          [name]="playState() === 'playing' ? 'square-stop' : 'volume'"
          [size]="15"
        />
        <span>{{
          playState() === 'playing'
            ? 'Stop'
            : playState() === 'loading'
              ? 'Loading...'
              : label()
        }}</span>
      </button>
    }
  `, styles: ["\n      .kit-audio-btn {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        padding: 6px 13px;\n        border-radius: var(--kit-radius-full);\n        border: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container-low);\n        color: var(--kit-on-surface);\n        font-family: var(--kit-font-sans);\n        font-size: 0.8rem;\n        font-weight: 600;\n        cursor: pointer;\n      }\n\n      .kit-audio-btn:hover:not(:disabled) {\n        border-color: var(--kit-primary);\n        color: var(--kit-primary);\n      }\n\n      .kit-audio-btn.playing {\n        background: var(--kit-primary-container);\n        color: var(--kit-on-primary-container);\n        border-color: color-mix(in srgb, var(--kit-primary) 45%, transparent);\n      }\n\n      .kit-audio-btn.error {\n        border-color: var(--kit-danger-border);\n        color: var(--kit-danger);\n      }\n\n      .kit-audio-btn:disabled {\n        opacity: 0.45;\n        cursor: not-allowed;\n      }\n\n      .kit-audio-btn:focus-visible {\n        outline: 2.5px solid var(--kit-primary);\n        outline-offset: 2px;\n      }\n    "] }]
    }], () => [], { src: [{ type: i0.Input, args: [{ isSignal: true, alias: "src", required: false }] }], mimeType: [{ type: i0.Input, args: [{ isSignal: true, alias: "mimeType", required: false }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], ariaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }], hideIfUnsupported: [{ type: i0.Input, args: [{ isSignal: true, alias: "hideIfUnsupported", required: false }] }], testId: [{ type: i0.Input, args: [{ isSignal: true, alias: "testId", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitAudioButtonComponent, { className: "KitAudioButtonComponent", filePath: "audio-button.component.ts", lineNumber: 130 }); })();
