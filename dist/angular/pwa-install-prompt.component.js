import { ChangeDetectionStrategy, Component, HostListener, ViewEncapsulation, computed, inject, input, } from '@angular/core';
import { KitPwaInstallService } from './pwa-install.service.js';
import * as i0 from "@angular/core";
function KitPwaInstallPromptComponent_Conditional_0_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "div", 12)(1, "button", 13);
    i0.ɵɵdomListener("click", function KitPwaInstallPromptComponent_Conditional_0_Conditional_14_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onInstall()); });
    i0.ɵɵtext(2, " Install ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "button", 14);
    i0.ɵɵdomListener("click", function KitPwaInstallPromptComponent_Conditional_0_Conditional_14_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.pwa.snooze()); });
    i0.ɵɵtext(4, " Not now ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "button", 15);
    i0.ɵɵdomListener("click", function KitPwaInstallPromptComponent_Conditional_0_Conditional_14_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.pwa.dismissPermanently()); });
    i0.ɵɵtext(6, " Don't ask again ");
    i0.ɵɵdomElementEnd()();
} }
function KitPwaInstallPromptComponent_Conditional_0_Conditional_15_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 23);
    i0.ɵɵdomListener("click", function KitPwaInstallPromptComponent_Conditional_0_Conditional_15_Conditional_16_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.pwa.closeIosGuide()); });
    i0.ɵɵtext(1, " Got it ");
    i0.ɵɵdomElementEnd();
} }
function KitPwaInstallPromptComponent_Conditional_0_Conditional_15_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 14);
    i0.ɵɵdomListener("click", function KitPwaInstallPromptComponent_Conditional_0_Conditional_15_Conditional_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.pwa.snooze()); });
    i0.ɵɵtext(1, " Not now ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(2, "button", 15);
    i0.ɵɵdomListener("click", function KitPwaInstallPromptComponent_Conditional_0_Conditional_15_Conditional_17_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.pwa.dismissPermanently()); });
    i0.ɵɵtext(3, " Don't ask again ");
    i0.ɵɵdomElementEnd();
} }
function KitPwaInstallPromptComponent_Conditional_0_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "ol", 16)(1, "li");
    i0.ɵɵtext(2, " Tap the ");
    i0.ɵɵdomElementStart(3, "span", 17);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(4, "svg", 18);
    i0.ɵɵdomElement(5, "path", 19)(6, "polyline", 20)(7, "line", 21);
    i0.ɵɵdomElementEnd();
    i0.ɵɵtext(8, " Share ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵtext(9, " button in Safari. ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵdomElementStart(10, "li");
    i0.ɵɵtext(11, "Choose ");
    i0.ɵɵdomElementStart(12, "strong");
    i0.ɵɵtext(13, "Add to Home Screen");
    i0.ɵɵdomElementEnd();
    i0.ɵɵtext(14, ".");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(15, "div", 12);
    i0.ɵɵconditionalCreate(16, KitPwaInstallPromptComponent_Conditional_0_Conditional_15_Conditional_16_Template, 2, 0, "button", 22)(17, KitPwaInstallPromptComponent_Conditional_0_Conditional_15_Conditional_17_Template, 4, 0);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(16);
    i0.ɵɵconditional(ctx_r1.pwa.iosGuideOpen() ? 16 : 17);
} }
function KitPwaInstallPromptComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "aside", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
    i0.ɵɵdomElement(4, "img", 4);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "div", 5)(6, "strong", 6);
    i0.ɵɵtext(7);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(8, "p", 7);
    i0.ɵɵtext(9);
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵdomElementStart(10, "button", 8);
    i0.ɵɵdomListener("click", function KitPwaInstallPromptComponent_Conditional_0_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onClose()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(11, "svg", 9);
    i0.ɵɵdomElement(12, "line", 10)(13, "line", 11);
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵconditionalCreate(14, KitPwaInstallPromptComponent_Conditional_0_Conditional_14_Template, 7, 0, "div", 12)(15, KitPwaInstallPromptComponent_Conditional_0_Conditional_15_Template, 18, 1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-label", "Install " + ctx_r1.appName());
    i0.ɵɵadvance(4);
    i0.ɵɵdomProperty("src", ctx_r1.logoUrl());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Install ", ctx_r1.appName());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.description());
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r1.pwa.canPromptNative() && !ctx_r1.pwa.iosGuideOpen() ? 14 : ctx_r1.pwa.isIosSafari() || ctx_r1.pwa.iosGuideOpen() ? 15 : -1);
} }
export class KitPwaInstallPromptComponent {
    constructor() {
        this.pwa = inject(KitPwaInstallService);
        this.appName = input('App', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "appName" }] : /* istanbul ignore next */ []));
        this.logoUrl = input('/favicon.svg', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "logoUrl" }] : /* istanbul ignore next */ []));
        this.description = input('Install for home-screen access and offline support.', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "description" }] : /* istanbul ignore next */ []));
        this.suppressed = input(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "suppressed" }] : /* istanbul ignore next */ []));
        this.isVisible = computed(() => !this.suppressed() &&
            (this.pwa.shouldShowAutoPrompt() || this.pwa.iosGuideOpen()), /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "isVisible" }] : /* istanbul ignore next */ []));
    }
    onEscape() {
        if (!this.isVisible())
            return;
        this.onClose();
    }
    async onInstall() {
        await this.pwa.promptInstall();
    }
    onClose() {
        if (this.pwa.iosGuideOpen()) {
            this.pwa.closeIosGuide();
            return;
        }
        this.pwa.snooze();
    }
    static { this.ɵfac = function KitPwaInstallPromptComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitPwaInstallPromptComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitPwaInstallPromptComponent, selectors: [["kit-pwa-install-prompt"]], hostBindings: function KitPwaInstallPromptComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keydown.escape", function KitPwaInstallPromptComponent_keydown_escape_HostBindingHandler() { return ctx.onEscape(); }, i0.ɵɵresolveDocument);
        } }, inputs: { appName: [1, "appName"], logoUrl: [1, "logoUrl"], description: [1, "description"], suppressed: [1, "suppressed"] }, decls: 1, vars: 1, consts: [["role", "region", "data-testid", "kit-pwa-install-prompt", 1, "kit-pwa-prompt", "animate-expressive"], [1, "kit-pwa-prompt-header"], [1, "kit-pwa-app-meta"], [1, "kit-pwa-app-icon-wrap"], ["alt", "", "aria-hidden", "true", "width", "28", "height", "28", 1, "kit-pwa-app-icon", 3, "src"], [1, "kit-pwa-text"], [1, "kit-pwa-title"], [1, "kit-pwa-desc"], ["type", "button", "aria-label", "Dismiss install prompt", "data-testid", "pwa-prompt-close-btn", 1, "kit-pwa-close-btn", 3, "click"], ["viewBox", "0 0 24 24", "width", "16", "height", "16", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "kit-pwa-actions"], ["type", "button", "data-testid", "pwa-install-btn", 1, "kit-pwa-install-btn", "state-layer", 3, "click"], ["type", "button", "data-testid", "pwa-snooze-btn", 1, "kit-pwa-secondary-btn", 3, "click"], ["type", "button", "data-testid", "pwa-dismiss-btn", 1, "kit-pwa-text-btn", 3, "click"], ["data-testid", "pwa-ios-steps", 1, "kit-pwa-ios-steps"], [1, "kit-pwa-share-inline"], ["viewBox", "0 0 24 24", "width", "14", "height", "14", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true"], ["d", "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"], ["points", "16 6 12 2 8 6"], ["x1", "12", "y1", "2", "x2", "12", "y2", "15"], ["type", "button", "data-testid", "pwa-ios-done-btn", 1, "kit-pwa-secondary-btn"], ["type", "button", "data-testid", "pwa-ios-done-btn", 1, "kit-pwa-secondary-btn", 3, "click"]], template: function KitPwaInstallPromptComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, KitPwaInstallPromptComponent_Conditional_0_Template, 16, 5, "aside", 0);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.isVisible() ? 0 : -1);
        } }, styles: ["\n      .kit-pwa-prompt {\n        position: fixed;\n        right: 20px;\n        bottom: calc(20px + env(safe-area-inset-bottom, 0px));\n        z-index: 900;\n        width: min(calc(100vw - 32px), 380px);\n        background: var(--%NS%kit-surface-container);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        border-radius: 1.25rem;\n        padding: 16px;\n        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);\n        color: var(--%NS%kit-on-surface);\n        display: flex;\n        flex-direction: column;\n        gap: 12px;\n        box-sizing: border-box;\n      }\n\n      .kit-pwa-prompt-header {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 10px;\n      }\n\n      .kit-pwa-app-meta {\n        display: flex;\n        align-items: flex-start;\n        gap: 12px;\n        min-width: 0;\n      }\n\n      .kit-pwa-app-icon-wrap {\n        width: 40px;\n        height: 40px;\n        border-radius: 10px;\n        background: var(--%NS%kit-surface-container-high);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n      }\n\n      .kit-pwa-app-icon {\n        width: 26px;\n        height: 26px;\n      }\n\n      .kit-pwa-text {\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        min-width: 0;\n      }\n\n      .kit-pwa-title {\n        font-family: var(--%NS%kit-font-heading);\n        font-size: 0.95rem;\n        font-weight: 700;\n        color: var(--%NS%kit-on-surface);\n      }\n\n      .kit-pwa-desc {\n        margin: 0;\n        font-size: 0.8125rem;\n        line-height: 1.4;\n        color: var(--%NS%kit-on-surface-variant);\n      }\n\n      .kit-pwa-close-btn {\n        background: transparent;\n        border: none;\n        color: var(--%NS%kit-on-surface-variant);\n        width: 28px;\n        height: 28px;\n        border-radius: 50%;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        flex-shrink: 0;\n        transition:\n          background-color 0.15s,\n          color 0.15s;\n      }\n\n      .kit-pwa-close-btn:hover {\n        background: var(--%NS%kit-surface-container-highest);\n        color: var(--%NS%kit-on-surface);\n      }\n\n      .kit-pwa-ios-steps {\n        margin: 0;\n        padding-left: 1.2rem;\n        font-size: 0.8125rem;\n        line-height: 1.5;\n        color: var(--%NS%kit-on-surface-variant);\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n      }\n\n      .kit-pwa-share-inline {\n        display: inline-flex;\n        align-items: center;\n        gap: 3px;\n        font-weight: 600;\n        color: var(--%NS%kit-primary);\n        vertical-align: middle;\n      }\n\n      .kit-pwa-actions {\n        display: flex;\n        align-items: center;\n        flex-wrap: wrap;\n        gap: 8px;\n      }\n\n      .kit-pwa-install-btn {\n        padding: 7px 16px;\n        border-radius: var(--%NS%kit-radius-full);\n        border: none;\n        background: var(--%NS%kit-primary);\n        color: var(--%NS%kit-on-primary);\n        font-family: var(--%NS%kit-font-sans);\n        font-size: 0.825rem;\n        font-weight: 700;\n        cursor: pointer;\n      }\n\n      .kit-pwa-secondary-btn {\n        padding: 6px 12px;\n        border-radius: var(--%NS%kit-radius-full);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        background: transparent;\n        color: var(--%NS%kit-on-surface);\n        font-family: var(--%NS%kit-font-sans);\n        font-size: 0.8125rem;\n        font-weight: 600;\n        cursor: pointer;\n      }\n\n      .kit-pwa-secondary-btn:hover {\n        background: var(--%NS%kit-surface-container-high);\n      }\n\n      .kit-pwa-text-btn {\n        padding: 6px 8px;\n        border: none;\n        background: transparent;\n        color: var(--%NS%kit-on-surface-variant);\n        font-family: var(--%NS%kit-font-sans);\n        font-size: 0.78rem;\n        font-weight: 500;\n        cursor: pointer;\n        margin-left: auto;\n      }\n\n      .kit-pwa-text-btn:hover {\n        color: var(--%NS%kit-on-surface);\n        text-decoration: underline;\n      }\n\n      @media (max-width: 768px) {\n        .kit-pwa-prompt {\n          left: 16px;\n          right: 16px;\n          width: auto;\n          bottom: calc(16px + env(safe-area-inset-bottom, 0px));\n        }\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-pwa-prompt,\n        .kit-pwa-prompt * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitPwaInstallPromptComponent, [{
        type: Component,
        args: [{ selector: 'kit-pwa-install-prompt', standalone: true, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    @if (isVisible()) {
      <aside
        class="kit-pwa-prompt animate-expressive"
        role="region"
        [attr.aria-label]="'Install ' + appName()"
        data-testid="kit-pwa-install-prompt"
      >
        <div class="kit-pwa-prompt-header">
          <div class="kit-pwa-app-meta">
            <div class="kit-pwa-app-icon-wrap">
              <img
                [src]="logoUrl()"
                alt=""
                aria-hidden="true"
                width="28"
                height="28"
                class="kit-pwa-app-icon"
              />
            </div>
            <div class="kit-pwa-text">
              <strong class="kit-pwa-title">Install {{ appName() }}</strong>
              <p class="kit-pwa-desc">{{ description() }}</p>
            </div>
          </div>
          <button
            type="button"
            class="kit-pwa-close-btn"
            aria-label="Dismiss install prompt"
            data-testid="pwa-prompt-close-btn"
            (click)="onClose()"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        @if (pwa.canPromptNative() && !pwa.iosGuideOpen()) {
          <div class="kit-pwa-actions">
            <button
              type="button"
              class="kit-pwa-install-btn state-layer"
              data-testid="pwa-install-btn"
              (click)="onInstall()"
            >
              Install
            </button>
            <button
              type="button"
              class="kit-pwa-secondary-btn"
              data-testid="pwa-snooze-btn"
              (click)="pwa.snooze()"
            >
              Not now
            </button>
            <button
              type="button"
              class="kit-pwa-text-btn"
              data-testid="pwa-dismiss-btn"
              (click)="pwa.dismissPermanently()"
            >
              Don't ask again
            </button>
          </div>
        } @else if (pwa.isIosSafari() || pwa.iosGuideOpen()) {
          <ol class="kit-pwa-ios-steps" data-testid="pwa-ios-steps">
            <li>
              Tap the
              <span class="kit-pwa-share-inline">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                Share
              </span>
              button in Safari.
            </li>
            <li>Choose <strong>Add to Home Screen</strong>.</li>
          </ol>
          <div class="kit-pwa-actions">
            @if (pwa.iosGuideOpen()) {
              <button
                type="button"
                class="kit-pwa-secondary-btn"
                data-testid="pwa-ios-done-btn"
                (click)="pwa.closeIosGuide()"
              >
                Got it
              </button>
            } @else {
              <button
                type="button"
                class="kit-pwa-secondary-btn"
                data-testid="pwa-snooze-btn"
                (click)="pwa.snooze()"
              >
                Not now
              </button>
              <button
                type="button"
                class="kit-pwa-text-btn"
                data-testid="pwa-dismiss-btn"
                (click)="pwa.dismissPermanently()"
              >
                Don't ask again
              </button>
            }
          </div>
        }
      </aside>
    }
  `, styles: ["\n      .kit-pwa-prompt {\n        position: fixed;\n        right: 20px;\n        bottom: calc(20px + env(safe-area-inset-bottom, 0px));\n        z-index: 900;\n        width: min(calc(100vw - 32px), 380px);\n        background: var(--kit-surface-container);\n        border: 1px solid var(--kit-outline-variant);\n        border-radius: 1.25rem;\n        padding: 16px;\n        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);\n        color: var(--kit-on-surface);\n        display: flex;\n        flex-direction: column;\n        gap: 12px;\n        box-sizing: border-box;\n      }\n\n      .kit-pwa-prompt-header {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 10px;\n      }\n\n      .kit-pwa-app-meta {\n        display: flex;\n        align-items: flex-start;\n        gap: 12px;\n        min-width: 0;\n      }\n\n      .kit-pwa-app-icon-wrap {\n        width: 40px;\n        height: 40px;\n        border-radius: 10px;\n        background: var(--kit-surface-container-high);\n        border: 1px solid var(--kit-outline-variant);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n      }\n\n      .kit-pwa-app-icon {\n        width: 26px;\n        height: 26px;\n      }\n\n      .kit-pwa-text {\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        min-width: 0;\n      }\n\n      .kit-pwa-title {\n        font-family: var(--kit-font-heading);\n        font-size: 0.95rem;\n        font-weight: 700;\n        color: var(--kit-on-surface);\n      }\n\n      .kit-pwa-desc {\n        margin: 0;\n        font-size: 0.8125rem;\n        line-height: 1.4;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-pwa-close-btn {\n        background: transparent;\n        border: none;\n        color: var(--kit-on-surface-variant);\n        width: 28px;\n        height: 28px;\n        border-radius: 50%;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        flex-shrink: 0;\n        transition:\n          background-color 0.15s,\n          color 0.15s;\n      }\n\n      .kit-pwa-close-btn:hover {\n        background: var(--kit-surface-container-highest);\n        color: var(--kit-on-surface);\n      }\n\n      .kit-pwa-ios-steps {\n        margin: 0;\n        padding-left: 1.2rem;\n        font-size: 0.8125rem;\n        line-height: 1.5;\n        color: var(--kit-on-surface-variant);\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n      }\n\n      .kit-pwa-share-inline {\n        display: inline-flex;\n        align-items: center;\n        gap: 3px;\n        font-weight: 600;\n        color: var(--kit-primary);\n        vertical-align: middle;\n      }\n\n      .kit-pwa-actions {\n        display: flex;\n        align-items: center;\n        flex-wrap: wrap;\n        gap: 8px;\n      }\n\n      .kit-pwa-install-btn {\n        padding: 7px 16px;\n        border-radius: var(--kit-radius-full);\n        border: none;\n        background: var(--kit-primary);\n        color: var(--kit-on-primary);\n        font-family: var(--kit-font-sans);\n        font-size: 0.825rem;\n        font-weight: 700;\n        cursor: pointer;\n      }\n\n      .kit-pwa-secondary-btn {\n        padding: 6px 12px;\n        border-radius: var(--kit-radius-full);\n        border: 1px solid var(--kit-outline-variant);\n        background: transparent;\n        color: var(--kit-on-surface);\n        font-family: var(--kit-font-sans);\n        font-size: 0.8125rem;\n        font-weight: 600;\n        cursor: pointer;\n      }\n\n      .kit-pwa-secondary-btn:hover {\n        background: var(--kit-surface-container-high);\n      }\n\n      .kit-pwa-text-btn {\n        padding: 6px 8px;\n        border: none;\n        background: transparent;\n        color: var(--kit-on-surface-variant);\n        font-family: var(--kit-font-sans);\n        font-size: 0.78rem;\n        font-weight: 500;\n        cursor: pointer;\n        margin-left: auto;\n      }\n\n      .kit-pwa-text-btn:hover {\n        color: var(--kit-on-surface);\n        text-decoration: underline;\n      }\n\n      @media (max-width: 768px) {\n        .kit-pwa-prompt {\n          left: 16px;\n          right: 16px;\n          width: auto;\n          bottom: calc(16px + env(safe-area-inset-bottom, 0px));\n        }\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-pwa-prompt,\n        .kit-pwa-prompt * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "] }]
    }], null, { appName: [{ type: i0.Input, args: [{ isSignal: true, alias: "appName", required: false }] }], logoUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "logoUrl", required: false }] }], description: [{ type: i0.Input, args: [{ isSignal: true, alias: "description", required: false }] }], suppressed: [{ type: i0.Input, args: [{ isSignal: true, alias: "suppressed", required: false }] }], onEscape: [{
            type: HostListener,
            args: ['document:keydown.escape']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitPwaInstallPromptComponent, { className: "KitPwaInstallPromptComponent", filePath: "pwa-install-prompt.component.ts", lineNumber: 334 }); })();
