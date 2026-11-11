import { ChangeDetectionStrategy, Component, ViewEncapsulation, input, output, } from '@angular/core';
import * as i0 from "@angular/core";
function KitLandingCardComponent_Conditional_1_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p", 5);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.subtitle());
} }
function KitLandingCardComponent_Conditional_1_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 6)(1, "span", 9);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(2, "svg", 10);
    i0.ɵɵdomElement(3, "path", 11)(4, "line", 12)(5, "circle", 13);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵdomElementStart(6, "div", 14)(7, "strong");
    i0.ɵɵtext(8, "Account Not Provisioned");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(9, "p");
    i0.ɵɵtext(10);
    i0.ɵɵdomElementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r0.accountMissingMessage());
} }
function KitLandingCardComponent_Conditional_1_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "a", 15);
    i0.ɵɵdomListener("click", function KitLandingCardComponent_Conditional_1_Conditional_7_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.signInClicked.emit($event)); });
    i0.ɵɵtext(1, " Sign In ");
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵdomProperty("href", ctx_r0.loginUrl(), i0.ɵɵsanitizeUrl);
} }
function KitLandingCardComponent_Conditional_1_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 16);
    i0.ɵɵdomListener("click", function KitLandingCardComponent_Conditional_1_Conditional_8_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.signInClicked.emit($event)); });
    i0.ɵɵtext(1, " Sign In ");
    i0.ɵɵdomElementEnd();
} }
function KitLandingCardComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 1)(1, "div", 2);
    i0.ɵɵdomElement(2, "img", 3);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "h1", 4);
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(5, KitLandingCardComponent_Conditional_1_Conditional_5_Template, 2, 1, "p", 5);
    i0.ɵɵconditionalCreate(6, KitLandingCardComponent_Conditional_1_Conditional_6_Template, 11, 1, "div", 6);
    i0.ɵɵconditionalCreate(7, KitLandingCardComponent_Conditional_1_Conditional_7_Template, 2, 1, "a", 7)(8, KitLandingCardComponent_Conditional_1_Conditional_8_Template, 2, 0, "button", 8);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵdomProperty("src", ctx_r0.logoUrl(), i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.appName());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.subtitle() ? 5 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.accountMissing() ? 6 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.loginUrl() ? 7 : 8);
} }
export class KitLandingCardComponent {
    constructor() {
        this.appName = input('', ...(ngDevMode ? [{ debugName: "appName" }] : /* istanbul ignore next */ []));
        this.subtitle = input('', ...(ngDevMode ? [{ debugName: "subtitle" }] : /* istanbul ignore next */ []));
        this.logoUrl = input('/favicon.svg', ...(ngDevMode ? [{ debugName: "logoUrl" }] : /* istanbul ignore next */ []));
        this.accountMissing = input(false, ...(ngDevMode ? [{ debugName: "accountMissing" }] : /* istanbul ignore next */ []));
        this.accountMissingMessage = input('Your identity was verified, but no account exists for this application yet. Please contact the administrator to provision your profile.', ...(ngDevMode ? [{ debugName: "accountMissingMessage" }] : /* istanbul ignore next */ []));
        this.loading = input(false, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
        this.loginUrl = input('', ...(ngDevMode ? [{ debugName: "loginUrl" }] : /* istanbul ignore next */ []));
        this.signInClicked = output();
    }
    static { this.ɵfac = function KitLandingCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitLandingCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitLandingCardComponent, selectors: [["kit-landing-card"]], inputs: { appName: [1, "appName"], subtitle: [1, "subtitle"], logoUrl: [1, "logoUrl"], accountMissing: [1, "accountMissing"], accountMissingMessage: [1, "accountMissingMessage"], loading: [1, "loading"], loginUrl: [1, "loginUrl"] }, outputs: { signInClicked: "signInClicked" }, decls: 2, vars: 1, consts: [[1, "landing-container", "kit-landing-container"], [1, "welcome-card", "animate-expressive"], [1, "logo-wrapper"], ["alt", "", "aria-hidden", "true", "width", "40", "height", "40", 1, "app-logo", 3, "src"], [1, "welcome-title"], [1, "welcome-subtitle"], ["role", "alert", "data-testid", "account-missing-alert", 1, "account-missing-alert"], ["data-testid", "landing-signin-btn", 1, "sign-in-btn", "state-layer", 3, "href"], ["type", "button", "data-testid", "landing-signin-btn", 1, "sign-in-btn", "state-layer"], ["aria-hidden", "true", 1, "alert-icon"], ["viewBox", "0 0 24 24", "width", "18", "height", "18"], ["d", "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "12", "y1", "9", "x2", "12", "y2", "13", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["cx", "12", "cy", "17", "r", "1", "fill", "currentColor"], [1, "alert-content"], ["data-testid", "landing-signin-btn", 1, "sign-in-btn", "state-layer", 3, "click", "href"], ["type", "button", "data-testid", "landing-signin-btn", 1, "sign-in-btn", "state-layer", 3, "click"]], template: function KitLandingCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, KitLandingCardComponent_Conditional_1_Template, 9, 5, "div", 1);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.loading() ? 1 : -1);
        } }, styles: ["\n      .kit-landing-container.landing-container {\n        min-height: 100vh;\n        width: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        padding: 1.5rem;\n        background: var(--kit-surface);\n        color: var(--kit-on-surface);\n      }\n\n      .kit-landing-container .welcome-card {\n        width: 100%;\n        max-width: 420px;\n        background: var(--kit-surface-container);\n        border: 1px solid var(--kit-outline-variant);\n        border-radius: 1.5rem;\n        padding: 2.5rem 2rem;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        text-align: center;\n        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.16);\n      }\n\n      .kit-landing-container .logo-wrapper {\n        width: 64px;\n        height: 64px;\n        border-radius: 1rem;\n        background: var(--kit-surface-container-high);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        margin-bottom: 1.25rem;\n      }\n\n      .kit-landing-container .app-logo {\n        width: 40px;\n        height: 40px;\n      }\n\n      .kit-landing-container .welcome-title {\n        font-family: var(--kit-font-heading);\n        font-size: 1.75rem;\n        font-weight: 700;\n        margin: 0 0 0.5rem;\n        color: var(--kit-on-surface);\n      }\n\n      .kit-landing-container .welcome-subtitle {\n        margin: 0 0 1.75rem;\n        font-size: 0.925rem;\n        line-height: 1.5;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-landing-container .welcome-title:has(+ .sign-in-btn),\n      .kit-landing-container .welcome-title:has(+ .account-missing-alert) {\n        margin-bottom: 1.75rem;\n      }\n\n      .kit-landing-container .account-missing-alert {\n        width: 100%;\n        display: flex;\n        align-items: flex-start;\n        gap: 0.75rem;\n        padding: 0.875rem 1rem;\n        margin-bottom: 1.5rem;\n        border-radius: 0.75rem;\n        background: var(--kit-warning-subtle);\n        border: 1px solid var(--kit-warning-border);\n        color: var(--kit-on-surface);\n        text-align: left;\n      }\n\n      .kit-landing-container .alert-icon {\n        color: var(--kit-warning);\n        flex-shrink: 0;\n        margin-top: 0.125rem;\n      }\n\n      .kit-landing-container .alert-content {\n        display: flex;\n        flex-direction: column;\n        gap: 0.25rem;\n      }\n\n      .kit-landing-container .alert-content strong {\n        font-size: 0.875rem;\n        font-weight: 700;\n        color: var(--kit-warning);\n      }\n\n      .kit-landing-container .alert-content p {\n        margin: 0;\n        font-size: 0.8125rem;\n        line-height: 1.45;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-landing-container .sign-in-btn {\n        width: 100%;\n        padding: 0.875rem 1.5rem;\n        border: none;\n        border-radius: 9999px;\n        background: var(--kit-primary);\n        color: var(--kit-on-primary);\n        font-size: 1rem;\n        font-weight: 600;\n        cursor: pointer;\n        text-decoration: none;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        transition:\n          transform 0.15s ease,\n          opacity 0.15s ease;\n      }\n\n      .kit-landing-container .sign-in-btn:hover {\n        opacity: 0.92;\n      }\n\n      .kit-landing-container .sign-in-btn:active {\n        transform: scale(0.98);\n      }\n    "], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitLandingCardComponent, [{
        type: Component,
        args: [{ selector: 'kit-landing-card', standalone: true, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="landing-container kit-landing-container">
      @if (!loading()) {
        <div class="welcome-card animate-expressive">
          <div class="logo-wrapper">
            <img
              [src]="logoUrl()"
              alt=""
              aria-hidden="true"
              class="app-logo"
              width="40"
              height="40"
            />
          </div>

          <h1 class="welcome-title">{{ appName() }}</h1>
          @if (subtitle()) {
            <p class="welcome-subtitle">{{ subtitle() }}</p>
          }

          @if (accountMissing()) {
            <div
              class="account-missing-alert"
              role="alert"
              data-testid="account-missing-alert"
            >
              <span class="alert-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <line
                    x1="12"
                    y1="9"
                    x2="12"
                    y2="13"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <circle cx="12" cy="17" r="1" fill="currentColor" />
                </svg>
              </span>
              <div class="alert-content">
                <strong>Account Not Provisioned</strong>
                <p>{{ accountMissingMessage() }}</p>
              </div>
            </div>
          }

          @if (loginUrl()) {
            <a
              [href]="loginUrl()"
              class="sign-in-btn state-layer"
              data-testid="landing-signin-btn"
              (click)="signInClicked.emit($event)"
            >
              Sign In
            </a>
          } @else {
            <button
              type="button"
              class="sign-in-btn state-layer"
              data-testid="landing-signin-btn"
              (click)="signInClicked.emit($event)"
            >
              Sign In
            </button>
          }
        </div>
      }
    </div>
  `, styles: ["\n      .kit-landing-container.landing-container {\n        min-height: 100vh;\n        width: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        padding: 1.5rem;\n        background: var(--kit-surface);\n        color: var(--kit-on-surface);\n      }\n\n      .kit-landing-container .welcome-card {\n        width: 100%;\n        max-width: 420px;\n        background: var(--kit-surface-container);\n        border: 1px solid var(--kit-outline-variant);\n        border-radius: 1.5rem;\n        padding: 2.5rem 2rem;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        text-align: center;\n        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.16);\n      }\n\n      .kit-landing-container .logo-wrapper {\n        width: 64px;\n        height: 64px;\n        border-radius: 1rem;\n        background: var(--kit-surface-container-high);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        margin-bottom: 1.25rem;\n      }\n\n      .kit-landing-container .app-logo {\n        width: 40px;\n        height: 40px;\n      }\n\n      .kit-landing-container .welcome-title {\n        font-family: var(--kit-font-heading);\n        font-size: 1.75rem;\n        font-weight: 700;\n        margin: 0 0 0.5rem;\n        color: var(--kit-on-surface);\n      }\n\n      .kit-landing-container .welcome-subtitle {\n        margin: 0 0 1.75rem;\n        font-size: 0.925rem;\n        line-height: 1.5;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-landing-container .welcome-title:has(+ .sign-in-btn),\n      .kit-landing-container .welcome-title:has(+ .account-missing-alert) {\n        margin-bottom: 1.75rem;\n      }\n\n      .kit-landing-container .account-missing-alert {\n        width: 100%;\n        display: flex;\n        align-items: flex-start;\n        gap: 0.75rem;\n        padding: 0.875rem 1rem;\n        margin-bottom: 1.5rem;\n        border-radius: 0.75rem;\n        background: var(--kit-warning-subtle);\n        border: 1px solid var(--kit-warning-border);\n        color: var(--kit-on-surface);\n        text-align: left;\n      }\n\n      .kit-landing-container .alert-icon {\n        color: var(--kit-warning);\n        flex-shrink: 0;\n        margin-top: 0.125rem;\n      }\n\n      .kit-landing-container .alert-content {\n        display: flex;\n        flex-direction: column;\n        gap: 0.25rem;\n      }\n\n      .kit-landing-container .alert-content strong {\n        font-size: 0.875rem;\n        font-weight: 700;\n        color: var(--kit-warning);\n      }\n\n      .kit-landing-container .alert-content p {\n        margin: 0;\n        font-size: 0.8125rem;\n        line-height: 1.45;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-landing-container .sign-in-btn {\n        width: 100%;\n        padding: 0.875rem 1.5rem;\n        border: none;\n        border-radius: 9999px;\n        background: var(--kit-primary);\n        color: var(--kit-on-primary);\n        font-size: 1rem;\n        font-weight: 600;\n        cursor: pointer;\n        text-decoration: none;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        transition:\n          transform 0.15s ease,\n          opacity 0.15s ease;\n      }\n\n      .kit-landing-container .sign-in-btn:hover {\n        opacity: 0.92;\n      }\n\n      .kit-landing-container .sign-in-btn:active {\n        transform: scale(0.98);\n      }\n    "] }]
    }], null, { appName: [{ type: i0.Input, args: [{ isSignal: true, alias: "appName", required: false }] }], subtitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "subtitle", required: false }] }], logoUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "logoUrl", required: false }] }], accountMissing: [{ type: i0.Input, args: [{ isSignal: true, alias: "accountMissing", required: false }] }], accountMissingMessage: [{ type: i0.Input, args: [{ isSignal: true, alias: "accountMissingMessage", required: false }] }], loading: [{ type: i0.Input, args: [{ isSignal: true, alias: "loading", required: false }] }], loginUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "loginUrl", required: false }] }], signInClicked: [{ type: i0.Output, args: ["signInClicked"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitLandingCardComponent, { className: "KitLandingCardComponent", filePath: "landing-card.component.ts", lineNumber: 223 }); })();
