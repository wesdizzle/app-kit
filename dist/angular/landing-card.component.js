import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, inject, input, output, } from '@angular/core';
import { KitThemeToggleComponent } from './theme-toggle.component.js';
import { KitThemeService } from './theme.service.js';
import * as i0 from "@angular/core";
const _c0 = [[["", "landingDetails", ""]], [["", "landingFooter", ""]]];
const _c1 = ["[landingDetails]", "[landingFooter]"];
function KitLandingCardComponent_Conditional_1_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.appName());
} }
function KitLandingCardComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header", 1)(1, "div", 3);
    i0.ɵɵelement(2, "img", 4);
    i0.ɵɵconditionalCreate(3, KitLandingCardComponent_Conditional_1_Conditional_3_Template, 2, 1, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "kit-theme-toggle", 5);
    i0.ɵɵlistener("toggled", function KitLandingCardComponent_Conditional_1_Template_kit_theme_toggle_toggled_4_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onThemeToggled($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", ctx_r1.logoUrl());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.appName() ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("theme", ctx_r1.effectiveTheme());
} }
function KitLandingCardComponent_Conditional_2_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.subtitle());
} }
function KitLandingCardComponent_Conditional_2_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12)(1, "span", 16);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 17);
    i0.ɵɵelement(3, "path", 18)(4, "line", 19)(5, "circle", 20);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "div", 21)(7, "strong");
    i0.ɵɵtext(8, "Account Not Provisioned");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r1.accountMissingMessage());
} }
function KitLandingCardComponent_Conditional_2_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 22);
    i0.ɵɵlistener("click", function KitLandingCardComponent_Conditional_2_Conditional_10_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.signInClicked.emit($event)); });
    i0.ɵɵtext(1, " Sign In ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("href", ctx_r1.loginUrl(), i0.ɵɵsanitizeUrl);
} }
function KitLandingCardComponent_Conditional_2_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 23);
    i0.ɵɵlistener("click", function KitLandingCardComponent_Conditional_2_Conditional_11_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.signInClicked.emit($event)); });
    i0.ɵɵtext(1, " Sign In ");
    i0.ɵɵelementEnd();
} }
function KitLandingCardComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "main", 2)(1, "div", 6)(2, "div", 7);
    i0.ɵɵelement(3, "img", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h1", 9);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(6, KitLandingCardComponent_Conditional_2_Conditional_6_Template, 2, 1, "p", 10);
    i0.ɵɵelementStart(7, "div", 11);
    i0.ɵɵprojection(8);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(9, KitLandingCardComponent_Conditional_2_Conditional_9_Template, 11, 1, "div", 12);
    i0.ɵɵconditionalCreate(10, KitLandingCardComponent_Conditional_2_Conditional_10_Template, 2, 1, "a", 13)(11, KitLandingCardComponent_Conditional_2_Conditional_11_Template, 2, 0, "button", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "footer", 15);
    i0.ɵɵprojection(13, 1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("src", ctx_r1.logoUrl());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.appName());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.subtitle() ? 6 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.accountMissing() ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.loginUrl() ? 10 : 11);
} }
export class KitLandingCardComponent {
    constructor() {
        this.themeService = inject(KitThemeService, { optional: true });
        this.appName = input('', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "appName" }] : /* istanbul ignore next */ []));
        this.subtitle = input('', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "subtitle" }] : /* istanbul ignore next */ []));
        this.logoUrl = input('/favicon.svg', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "logoUrl" }] : /* istanbul ignore next */ []));
        this.accountMissing = input(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "accountMissing" }] : /* istanbul ignore next */ []));
        this.accountMissingMessage = input('Your identity was verified, but no account exists for this application yet. Please contact the administrator to provision your profile.', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "accountMissingMessage" }] : /* istanbul ignore next */ []));
        this.loading = input(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
        this.loginUrl = input('', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "loginUrl" }] : /* istanbul ignore next */ []));
        this.showThemeToggle = input(true, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "showThemeToggle" }] : /* istanbul ignore next */ []));
        this.theme = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "theme" }] : /* istanbul ignore next */ []));
        this.signInClicked = output();
        this.themeToggled = output();
        this.effectiveTheme = computed(() => this.theme() ?? this.themeService?.theme() ?? 'auto', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "effectiveTheme" }] : /* istanbul ignore next */ []));
    }
    onThemeToggled(next) {
        if (this.theme() === null && this.themeService) {
            const updated = this.themeService.toggleTheme();
            this.themeToggled.emit(updated);
            return;
        }
        this.themeToggled.emit(next);
    }
    static { this.ɵfac = function KitLandingCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitLandingCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitLandingCardComponent, selectors: [["kit-landing-card"]], inputs: { appName: [1, "appName"], subtitle: [1, "subtitle"], logoUrl: [1, "logoUrl"], accountMissing: [1, "accountMissing"], accountMissingMessage: [1, "accountMissingMessage"], loading: [1, "loading"], loginUrl: [1, "loginUrl"], showThemeToggle: [1, "showThemeToggle"], theme: [1, "theme"] }, outputs: { signInClicked: "signInClicked", themeToggled: "themeToggled" }, ngContentSelectors: _c1, decls: 3, vars: 2, consts: [[1, "landing-container", "kit-landing-container"], [1, "kit-landing-topbar"], [1, "kit-landing-main"], [1, "kit-landing-brand-chip"], ["alt", "", "aria-hidden", "true", "width", "20", "height", "20", 3, "src"], [3, "toggled", "theme"], [1, "welcome-card", "animate-expressive"], [1, "logo-wrapper"], ["alt", "", "aria-hidden", "true", "width", "40", "height", "40", 1, "app-logo", 3, "src"], [1, "welcome-title"], [1, "welcome-subtitle"], [1, "kit-landing-details-slot"], ["role", "alert", "data-testid", "account-missing-alert", 1, "account-missing-alert"], ["data-testid", "landing-signin-btn", 1, "sign-in-btn", "state-layer", 3, "href"], ["type", "button", "data-testid", "landing-signin-btn", 1, "sign-in-btn", "state-layer"], [1, "kit-landing-footer-slot"], ["aria-hidden", "true", 1, "alert-icon"], ["viewBox", "0 0 24 24", "width", "18", "height", "18"], ["d", "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "12", "y1", "9", "x2", "12", "y2", "13", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["cx", "12", "cy", "17", "r", "1", "fill", "currentColor"], [1, "alert-content"], ["data-testid", "landing-signin-btn", 1, "sign-in-btn", "state-layer", 3, "click", "href"], ["type", "button", "data-testid", "landing-signin-btn", 1, "sign-in-btn", "state-layer", 3, "click"]], template: function KitLandingCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef(_c0);
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, KitLandingCardComponent_Conditional_1_Template, 5, 3, "header", 1);
            i0.ɵɵconditionalCreate(2, KitLandingCardComponent_Conditional_2_Template, 14, 5, "main", 2);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showThemeToggle() && !ctx.loading() ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.loading() ? 2 : -1);
        } }, dependencies: [KitThemeToggleComponent], styles: ["\n      .kit-landing-container.landing-container {\n        min-height: 100vh;\n        width: 100%;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        padding: 1.25rem 1.5rem 2rem;\n        background: var(--%NS%kit-surface);\n        color: var(--%NS%kit-on-surface);\n        box-sizing: border-box;\n      }\n\n      .kit-landing-container .kit-landing-topbar {\n        width: 100%;\n        max-width: 960px;\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 12px;\n        min-height: 44px;\n      }\n\n      .kit-landing-container .kit-landing-brand-chip {\n        display: inline-flex;\n        align-items: center;\n        gap: 8px;\n        font-family: var(--%NS%kit-font-heading);\n        font-size: 0.9rem;\n        font-weight: 700;\n        color: var(--%NS%kit-on-surface-variant);\n      }\n\n      .kit-landing-container .kit-landing-main {\n        flex: 1 1 auto;\n        width: 100%;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        padding: 1.5rem 0;\n        gap: 1.25rem;\n      }\n\n      .kit-landing-container .welcome-card {\n        width: 100%;\n        max-width: 480px;\n        background: var(--%NS%kit-surface-container);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        border-radius: 1.5rem;\n        padding: 2.25rem 2rem;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        text-align: center;\n        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.16);\n        box-sizing: border-box;\n      }\n\n      .kit-landing-container .logo-wrapper {\n        width: 64px;\n        height: 64px;\n        border-radius: 1rem;\n        background: var(--%NS%kit-surface-container-high);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        margin-bottom: 1.25rem;\n      }\n\n      .kit-landing-container .app-logo {\n        width: 40px;\n        height: 40px;\n      }\n\n      .kit-landing-container .welcome-title {\n        font-family: var(--%NS%kit-font-heading);\n        font-size: 1.75rem;\n        font-weight: 700;\n        margin: 0 0 0.5rem;\n        color: var(--%NS%kit-on-surface);\n      }\n\n      .kit-landing-container .welcome-subtitle {\n        margin: 0 0 1.25rem;\n        font-size: 0.95rem;\n        line-height: 1.5;\n        color: var(--%NS%kit-on-surface-variant);\n      }\n\n      .kit-landing-container .kit-landing-details-slot {\n        width: 100%;\n        margin-bottom: 1.5rem;\n      }\n\n      .kit-landing-container .kit-landing-details-slot:empty {\n        display: none;\n        margin-bottom: 0;\n      }\n\n      .kit-landing-container .kit-landing-details {\n        list-style: none;\n        margin: 0;\n        padding: 0;\n        display: flex;\n        flex-direction: column;\n        gap: 0.5rem;\n        text-align: left;\n      }\n\n      .kit-landing-container .kit-landing-detail-item {\n        padding: 0.65rem 0.875rem;\n        border-radius: 0.75rem;\n        background: var(--%NS%kit-surface-container-low);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        font-size: 0.84rem;\n        line-height: 1.45;\n        color: var(--%NS%kit-on-surface-variant);\n      }\n\n      .kit-landing-container .kit-landing-detail-item strong {\n        color: var(--%NS%kit-on-surface);\n        font-weight: 600;\n      }\n\n      .kit-landing-container .kit-landing-footer-slot {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-wrap: wrap;\n        gap: 1rem;\n        font-size: 0.8125rem;\n        color: var(--%NS%kit-on-surface-variant);\n      }\n\n      .kit-landing-container .kit-landing-footer-slot:empty {\n        display: none;\n      }\n\n      .kit-landing-container .kit-landing-footer-slot a {\n        color: var(--%NS%kit-on-surface-variant);\n        text-decoration: none;\n        font-weight: 500;\n      }\n\n      .kit-landing-container .kit-landing-footer-slot a:hover {\n        color: var(--%NS%kit-primary);\n        text-decoration: underline;\n      }\n\n      .kit-landing-container .welcome-title:has(+ .sign-in-btn),\n      .kit-landing-container .welcome-title:has(+ .account-missing-alert) {\n        margin-bottom: 1.75rem;\n      }\n\n      .kit-landing-container .account-missing-alert {\n        width: 100%;\n        display: flex;\n        align-items: flex-start;\n        gap: 0.75rem;\n        padding: 0.875rem 1rem;\n        margin-bottom: 1.5rem;\n        border-radius: 0.75rem;\n        background: var(--%NS%kit-warning-subtle);\n        border: 1px solid var(--%NS%kit-warning-border);\n        color: var(--%NS%kit-on-surface);\n        text-align: left;\n      }\n\n      .kit-landing-container .alert-icon {\n        color: var(--%NS%kit-warning);\n        flex-shrink: 0;\n        margin-top: 0.125rem;\n      }\n\n      .kit-landing-container .alert-content {\n        display: flex;\n        flex-direction: column;\n        gap: 0.25rem;\n      }\n\n      .kit-landing-container .alert-content strong {\n        font-size: 0.875rem;\n        font-weight: 700;\n        color: var(--%NS%kit-warning);\n      }\n\n      .kit-landing-container .alert-content p {\n        margin: 0;\n        font-size: 0.8125rem;\n        line-height: 1.45;\n        color: var(--%NS%kit-on-surface-variant);\n      }\n\n      .kit-landing-container .sign-in-btn {\n        width: 100%;\n        padding: 0.875rem 1.5rem;\n        border: none;\n        border-radius: 9999px;\n        background: var(--%NS%kit-primary);\n        color: var(--%NS%kit-on-primary);\n        font-size: 1rem;\n        font-weight: 600;\n        cursor: pointer;\n        text-decoration: none;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        transition:\n          transform 0.15s ease,\n          opacity 0.15s ease;\n      }\n\n      .kit-landing-container .sign-in-btn:hover {\n        opacity: 0.92;\n      }\n\n      .kit-landing-container .sign-in-btn:active {\n        transform: scale(0.98);\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-landing-container * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitLandingCardComponent, [{
        type: Component,
        args: [{ selector: 'kit-landing-card', standalone: true, imports: [KitThemeToggleComponent], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="landing-container kit-landing-container">
      @if (showThemeToggle() && !loading()) {
        <header class="kit-landing-topbar">
          <div class="kit-landing-brand-chip">
            <img
              [src]="logoUrl()"
              alt=""
              aria-hidden="true"
              width="20"
              height="20"
            />
            @if (appName()) {
              <span>{{ appName() }}</span>
            }
          </div>
          <kit-theme-toggle
            [theme]="effectiveTheme()"
            (toggled)="onThemeToggled($event)"
          />
        </header>
      }

      @if (!loading()) {
        <main class="kit-landing-main">
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

            <div class="kit-landing-details-slot">
              <ng-content select="[landingDetails]" />
            </div>

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

          <footer class="kit-landing-footer-slot">
            <ng-content select="[landingFooter]" />
          </footer>
        </main>
      }
    </div>
  `, styles: ["\n      .kit-landing-container.landing-container {\n        min-height: 100vh;\n        width: 100%;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        padding: 1.25rem 1.5rem 2rem;\n        background: var(--kit-surface);\n        color: var(--kit-on-surface);\n        box-sizing: border-box;\n      }\n\n      .kit-landing-container .kit-landing-topbar {\n        width: 100%;\n        max-width: 960px;\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 12px;\n        min-height: 44px;\n      }\n\n      .kit-landing-container .kit-landing-brand-chip {\n        display: inline-flex;\n        align-items: center;\n        gap: 8px;\n        font-family: var(--kit-font-heading);\n        font-size: 0.9rem;\n        font-weight: 700;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-landing-container .kit-landing-main {\n        flex: 1 1 auto;\n        width: 100%;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        padding: 1.5rem 0;\n        gap: 1.25rem;\n      }\n\n      .kit-landing-container .welcome-card {\n        width: 100%;\n        max-width: 480px;\n        background: var(--kit-surface-container);\n        border: 1px solid var(--kit-outline-variant);\n        border-radius: 1.5rem;\n        padding: 2.25rem 2rem;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        text-align: center;\n        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.16);\n        box-sizing: border-box;\n      }\n\n      .kit-landing-container .logo-wrapper {\n        width: 64px;\n        height: 64px;\n        border-radius: 1rem;\n        background: var(--kit-surface-container-high);\n        border: 1px solid var(--kit-outline-variant);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        margin-bottom: 1.25rem;\n      }\n\n      .kit-landing-container .app-logo {\n        width: 40px;\n        height: 40px;\n      }\n\n      .kit-landing-container .welcome-title {\n        font-family: var(--kit-font-heading);\n        font-size: 1.75rem;\n        font-weight: 700;\n        margin: 0 0 0.5rem;\n        color: var(--kit-on-surface);\n      }\n\n      .kit-landing-container .welcome-subtitle {\n        margin: 0 0 1.25rem;\n        font-size: 0.95rem;\n        line-height: 1.5;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-landing-container .kit-landing-details-slot {\n        width: 100%;\n        margin-bottom: 1.5rem;\n      }\n\n      .kit-landing-container .kit-landing-details-slot:empty {\n        display: none;\n        margin-bottom: 0;\n      }\n\n      .kit-landing-container .kit-landing-details {\n        list-style: none;\n        margin: 0;\n        padding: 0;\n        display: flex;\n        flex-direction: column;\n        gap: 0.5rem;\n        text-align: left;\n      }\n\n      .kit-landing-container .kit-landing-detail-item {\n        padding: 0.65rem 0.875rem;\n        border-radius: 0.75rem;\n        background: var(--kit-surface-container-low);\n        border: 1px solid var(--kit-outline-variant);\n        font-size: 0.84rem;\n        line-height: 1.45;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-landing-container .kit-landing-detail-item strong {\n        color: var(--kit-on-surface);\n        font-weight: 600;\n      }\n\n      .kit-landing-container .kit-landing-footer-slot {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-wrap: wrap;\n        gap: 1rem;\n        font-size: 0.8125rem;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-landing-container .kit-landing-footer-slot:empty {\n        display: none;\n      }\n\n      .kit-landing-container .kit-landing-footer-slot a {\n        color: var(--kit-on-surface-variant);\n        text-decoration: none;\n        font-weight: 500;\n      }\n\n      .kit-landing-container .kit-landing-footer-slot a:hover {\n        color: var(--kit-primary);\n        text-decoration: underline;\n      }\n\n      .kit-landing-container .welcome-title:has(+ .sign-in-btn),\n      .kit-landing-container .welcome-title:has(+ .account-missing-alert) {\n        margin-bottom: 1.75rem;\n      }\n\n      .kit-landing-container .account-missing-alert {\n        width: 100%;\n        display: flex;\n        align-items: flex-start;\n        gap: 0.75rem;\n        padding: 0.875rem 1rem;\n        margin-bottom: 1.5rem;\n        border-radius: 0.75rem;\n        background: var(--kit-warning-subtle);\n        border: 1px solid var(--kit-warning-border);\n        color: var(--kit-on-surface);\n        text-align: left;\n      }\n\n      .kit-landing-container .alert-icon {\n        color: var(--kit-warning);\n        flex-shrink: 0;\n        margin-top: 0.125rem;\n      }\n\n      .kit-landing-container .alert-content {\n        display: flex;\n        flex-direction: column;\n        gap: 0.25rem;\n      }\n\n      .kit-landing-container .alert-content strong {\n        font-size: 0.875rem;\n        font-weight: 700;\n        color: var(--kit-warning);\n      }\n\n      .kit-landing-container .alert-content p {\n        margin: 0;\n        font-size: 0.8125rem;\n        line-height: 1.45;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-landing-container .sign-in-btn {\n        width: 100%;\n        padding: 0.875rem 1.5rem;\n        border: none;\n        border-radius: 9999px;\n        background: var(--kit-primary);\n        color: var(--kit-on-primary);\n        font-size: 1rem;\n        font-weight: 600;\n        cursor: pointer;\n        text-decoration: none;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        transition:\n          transform 0.15s ease,\n          opacity 0.15s ease;\n      }\n\n      .kit-landing-container .sign-in-btn:hover {\n        opacity: 0.92;\n      }\n\n      .kit-landing-container .sign-in-btn:active {\n        transform: scale(0.98);\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-landing-container * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "] }]
    }], null, { appName: [{ type: i0.Input, args: [{ isSignal: true, alias: "appName", required: false }] }], subtitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "subtitle", required: false }] }], logoUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "logoUrl", required: false }] }], accountMissing: [{ type: i0.Input, args: [{ isSignal: true, alias: "accountMissing", required: false }] }], accountMissingMessage: [{ type: i0.Input, args: [{ isSignal: true, alias: "accountMissingMessage", required: false }] }], loading: [{ type: i0.Input, args: [{ isSignal: true, alias: "loading", required: false }] }], loginUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "loginUrl", required: false }] }], showThemeToggle: [{ type: i0.Input, args: [{ isSignal: true, alias: "showThemeToggle", required: false }] }], theme: [{ type: i0.Input, args: [{ isSignal: true, alias: "theme", required: false }] }], signInClicked: [{ type: i0.Output, args: ["signInClicked"] }], themeToggled: [{ type: i0.Output, args: ["themeToggled"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitLandingCardComponent, { className: "KitLandingCardComponent", filePath: "landing-card.component.ts", lineNumber: 361 }); })();
