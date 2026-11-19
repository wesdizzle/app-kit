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
        this.src = input(null, ...(ngDevMode ? [{ debugName: "src" }] : /* istanbul ignore next */ []));
        this.mimeType = input('audio/ogg', ...(ngDevMode ? [{ debugName: "mimeType" }] : /* istanbul ignore next */ []));
        this.label = input('Play', ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
        this.ariaLabel = input(null, ...(ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
        this.hideIfUnsupported = input(true, ...(ngDevMode ? [{ debugName: "hideIfUnsupported" }] : /* istanbul ignore next */ []));
        this.testId = input(null, ...(ngDevMode ? [{ debugName: "testId" }] : /* istanbul ignore next */ []));
        this.playState = signal('idle', ...(ngDevMode ? [{ debugName: "playState" }] : /* istanbul ignore next */ []));
        this.isSupported = computed(() => Boolean(this.src()) && canPlayKitAudioMime(this.mimeType()), ...(ngDevMode ? [{ debugName: "isSupported" }] : /* istanbul ignore next */ []));
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
        } }, dependencies: [KitIconComponent], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitAudioButtonComponent, [{
        type: Component,
        args: [{
                selector: 'kit-audio-button',
                standalone: true,
                imports: [KitIconComponent],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
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
  `,
            }]
    }], () => [], { src: [{ type: i0.Input, args: [{ isSignal: true, alias: "src", required: false }] }], mimeType: [{ type: i0.Input, args: [{ isSignal: true, alias: "mimeType", required: false }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], ariaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }], hideIfUnsupported: [{ type: i0.Input, args: [{ isSignal: true, alias: "hideIfUnsupported", required: false }] }], testId: [{ type: i0.Input, args: [{ isSignal: true, alias: "testId", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitAudioButtonComponent, { className: "KitAudioButtonComponent", filePath: "audio-button.component.ts", lineNumber: 86 }); })();
