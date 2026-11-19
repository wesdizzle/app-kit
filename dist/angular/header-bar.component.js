import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input, output, } from '@angular/core';
import { KitThemeToggleComponent } from './theme-toggle.component.js';
import * as i0 from "@angular/core";
const _c0 = [[["", "headerRightStart", ""], ["", "kitHeaderActions", ""]], [["", "headerRightEnd", ""]], [["", "headerCenter", ""], ["", "kitHeaderCenter", ""]]];
const _c1 = ["[headerRightStart],[kitHeaderActions]", "[headerRightEnd]", "[headerCenter],[kitHeaderCenter]"];
const _forTrack0 = ($index, $item) => $item.id;
function KitHeaderBarComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", ctx_r0.logoUrl(), i0.ɵɵsanitizeUrl);
} }
function KitHeaderBarComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.subtitle());
} }
function KitHeaderBarComponent_Conditional_9_For_2_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 15);
    i0.ɵɵlistener("click", function KitHeaderBarComponent_Conditional_9_For_2_Conditional_0_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r2); const tab_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onTabClick($event, tab_r3)); });
    i0.ɵɵelementStart(1, "span", 16);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "div", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tab_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r0.activeTab() === tab_r3.id);
    i0.ɵɵproperty("href", tab_r3.href, i0.ɵɵsanitizeUrl);
    i0.ɵɵattribute("aria-current", ctx_r0.activeTab() === tab_r3.id ? "page" : null)("data-testid", tab_r3.testId || "nav-tab-" + tab_r3.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(tab_r3.label);
} }
function KitHeaderBarComponent_Conditional_9_For_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function KitHeaderBarComponent_Conditional_9_For_2_Conditional_1_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r4); const tab_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onTabClick($event, tab_r3)); });
    i0.ɵɵelementStart(1, "span", 16);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "div", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tab_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r0.activeTab() === tab_r3.id);
    i0.ɵɵattribute("aria-current", ctx_r0.activeTab() === tab_r3.id ? "page" : null)("data-testid", tab_r3.testId || "nav-tab-" + tab_r3.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(tab_r3.label);
} }
function KitHeaderBarComponent_Conditional_9_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, KitHeaderBarComponent_Conditional_9_For_2_Conditional_0_Template, 4, 6, "a", 13)(1, KitHeaderBarComponent_Conditional_9_For_2_Conditional_1_Template, 4, 5, "button", 14);
} if (rf & 2) {
    const tab_r3 = ctx.$implicit;
    i0.ɵɵconditional(tab_r3.href ? 0 : 1);
} }
function KitHeaderBarComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 8);
    i0.ɵɵrepeaterCreate(1, KitHeaderBarComponent_Conditional_9_For_2_Template, 2, 1, null, null, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.tabs());
} }
function KitHeaderBarComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵprojection(1, 2);
    i0.ɵɵelementEnd();
} }
function KitHeaderBarComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 19);
    i0.ɵɵlistener("click", function KitHeaderBarComponent_Conditional_13_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.profileClicked.emit()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 20);
    i0.ɵɵelement(2, "path", 21)(3, "circle", 22);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", ctx_r0.resolvedProfileTitle());
    i0.ɵɵattribute("aria-label", ctx_r0.profileAriaLabel())("data-testid", ctx_r0.profileTestId());
} }
export class KitHeaderBarComponent {
    constructor() {
        this.appName = input('', ...(ngDevMode ? [{ debugName: "appName" }] : /* istanbul ignore next */ []));
        this.subtitle = input('', ...(ngDevMode ? [{ debugName: "subtitle" }] : /* istanbul ignore next */ []));
        this.logoUrl = input('/favicon.svg', ...(ngDevMode ? [{ debugName: "logoUrl" }] : /* istanbul ignore next */ []));
        this.brandHref = input('/', ...(ngDevMode ? [{ debugName: "brandHref" }] : /* istanbul ignore next */ []));
        this.tabs = input([], ...(ngDevMode ? [{ debugName: "tabs" }] : /* istanbul ignore next */ []));
        this.activeTab = input('', ...(ngDevMode ? [{ debugName: "activeTab" }] : /* istanbul ignore next */ []));
        this.theme = input('auto', ...(ngDevMode ? [{ debugName: "theme" }] : /* istanbul ignore next */ []));
        this.isAuthenticated = input(false, ...(ngDevMode ? [{ debugName: "isAuthenticated" }] : /* istanbul ignore next */ []));
        this.user = input(null, ...(ngDevMode ? [{ debugName: "user" }] : /* istanbul ignore next */ []));
        this.showProfileButton = input(true, ...(ngDevMode ? [{ debugName: "showProfileButton" }] : /* istanbul ignore next */ []));
        this.profileTitle = input('', ...(ngDevMode ? [{ debugName: "profileTitle" }] : /* istanbul ignore next */ []));
        this.profileAriaLabel = input('Profile and account settings', ...(ngDevMode ? [{ debugName: "profileAriaLabel" }] : /* istanbul ignore next */ []));
        this.profileTestId = input('open-profile-modal-btn', ...(ngDevMode ? [{ debugName: "profileTestId" }] : /* istanbul ignore next */ []));
        this.themeTestId = input('theme-toggle-btn', ...(ngDevMode ? [{ debugName: "themeTestId" }] : /* istanbul ignore next */ []));
        this.brandClicked = output();
        this.tabSelected = output();
        this.profileClicked = output();
        this.themeToggled = output();
        this.resolvedProfileTitle = computed(() => {
            const custom = this.profileTitle();
            if (custom)
                return custom;
            if (this.isAuthenticated()) {
                const u = this.user();
                const label = u?.displayName || u?.username;
                return label ? `Signed in as ${label}` : 'Profile & Settings';
            }
            return 'Sign In / Profile';
        }, ...(ngDevMode ? [{ debugName: "resolvedProfileTitle" }] : /* istanbul ignore next */ []));
    }
    onBrandClick(event) {
        this.brandClicked.emit(event);
    }
    onTabClick(event, tab) {
        if (tab.href) {
            event.preventDefault();
        }
        this.tabSelected.emit(tab.id);
    }
    static { this.ɵfac = function KitHeaderBarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitHeaderBarComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitHeaderBarComponent, selectors: [["kit-header-bar"]], inputs: { appName: [1, "appName"], subtitle: [1, "subtitle"], logoUrl: [1, "logoUrl"], brandHref: [1, "brandHref"], tabs: [1, "tabs"], activeTab: [1, "activeTab"], theme: [1, "theme"], isAuthenticated: [1, "isAuthenticated"], user: [1, "user"], showProfileButton: [1, "showProfileButton"], profileTitle: [1, "profileTitle"], profileAriaLabel: [1, "profileAriaLabel"], profileTestId: [1, "profileTestId"], themeTestId: [1, "themeTestId"] }, outputs: { brandClicked: "brandClicked", tabSelected: "tabSelected", profileClicked: "profileClicked", themeToggled: "themeToggled" }, ngContentSelectors: _c1, decls: 16, vars: 8, consts: [[1, "main-header", "kit-header-bar"], [1, "header-inner"], [1, "header-left"], ["data-testid", "header-brand-link", 1, "brand-link", "state-layer", 3, "click", "href"], ["alt", "", "aria-hidden", "true", "width", "32", "height", "32", 1, "brand-icon", 3, "src"], [1, "brand-copy"], [1, "brand-title"], [1, "brand-subtitle"], ["aria-label", "Main navigation", 1, "main-nav"], [1, "kit-header-center"], [1, "header-right"], ["type", "button", 1, "m3-button-icon", "state-layer", 3, "title"], [3, "toggled", "theme", "testId"], [1, "nav-item", 3, "href", "active"], ["type", "button", 1, "nav-item", 3, "active"], [1, "nav-item", 3, "click", "href"], [1, "label"], [1, "indicator"], ["type", "button", 1, "nav-item", 3, "click"], ["type", "button", 1, "m3-button-icon", "state-layer", 3, "click", "title"], ["viewBox", "0 0 24 24", "width", "18", "height", "18", "aria-hidden", "true"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "12", "cy", "7", "r", "4", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"]], template: function KitHeaderBarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef(_c0);
            i0.ɵɵelementStart(0, "header", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3);
            i0.ɵɵlistener("click", function KitHeaderBarComponent_Template_a_click_3_listener($event) { return ctx.onBrandClick($event); });
            i0.ɵɵconditionalCreate(4, KitHeaderBarComponent_Conditional_4_Template, 1, 1, "img", 4);
            i0.ɵɵelementStart(5, "div", 5)(6, "span", 6);
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(8, KitHeaderBarComponent_Conditional_8_Template, 2, 1, "span", 7);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(9, KitHeaderBarComponent_Conditional_9_Template, 3, 0, "nav", 8)(10, KitHeaderBarComponent_Conditional_10_Template, 2, 0, "div", 9);
            i0.ɵɵelementStart(11, "div", 10);
            i0.ɵɵprojection(12);
            i0.ɵɵconditionalCreate(13, KitHeaderBarComponent_Conditional_13_Template, 4, 3, "button", 11);
            i0.ɵɵelementStart(14, "kit-theme-toggle", 12);
            i0.ɵɵlistener("toggled", function KitHeaderBarComponent_Template_kit_theme_toggle_toggled_14_listener() { return ctx.themeToggled.emit(); });
            i0.ɵɵelementEnd();
            i0.ɵɵprojection(15, 1);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("href", ctx.brandHref(), i0.ɵɵsanitizeUrl);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.logoUrl() ? 4 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.appName());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.subtitle() ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.tabs().length > 0 ? 9 : 10);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.showProfileButton() ? 13 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("theme", ctx.theme())("testId", ctx.themeTestId());
        } }, dependencies: [KitThemeToggleComponent], styles: ["\n      .kit-header-bar.main-header {\n        position: sticky;\n        top: 0;\n        z-index: 500;\n        width: 100%;\n        background: transparent;\n        border-bottom: 1px solid var(--kit-outline-variant);\n      }\n\n      .kit-header-bar.main-header::before {\n        content: '';\n        position: absolute;\n        inset: 0;\n        z-index: -1;\n        background: var(--kit-glass-bg, var(--kit-surface));\n        backdrop-filter: blur(18px);\n        -webkit-backdrop-filter: blur(18px);\n        pointer-events: none;\n      }\n\n      .kit-header-bar .header-inner {\n        max-width: 1400px;\n        margin: 0 auto;\n        padding: 0 var(--container-padding, 16px);\n        height: var(--header-height, 64px);\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        position: relative;\n      }\n\n      .kit-header-bar .header-left,\n      .kit-header-bar .header-right {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        flex: 1;\n      }\n\n      .kit-header-bar .header-right {\n        justify-content: flex-end;\n      }\n\n      .kit-header-bar .brand-link {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 8px 12px;\n        border-radius: 12px;\n        text-decoration: none;\n        color: inherit;\n        -webkit-tap-highlight-color: transparent;\n        transition: background-color 0.2s;\n      }\n\n      .kit-header-bar .brand-link:hover {\n        background: var(--kit-surface-container);\n      }\n\n      .kit-header-bar .brand-icon {\n        width: 32px;\n        height: 32px;\n        flex-shrink: 0;\n      }\n\n      .kit-header-bar .brand-copy {\n        display: flex;\n        flex-direction: column;\n        gap: 1px;\n      }\n\n      .kit-header-bar .brand-title {\n        font-family: var(--kit-font-heading);\n        font-size: 1.35rem;\n        font-weight: 700;\n        color: var(--kit-on-surface);\n        margin: 0;\n        line-height: 1.1;\n      }\n\n      .kit-header-bar .brand-subtitle {\n        font-size: 0.72rem;\n        font-weight: 600;\n        color: var(--kit-on-surface-variant);\n        letter-spacing: 0.02em;\n      }\n\n      .kit-header-bar .main-nav {\n        display: flex;\n        justify-content: center;\n        gap: 8px;\n        z-index: 1000;\n      }\n\n      @media (min-width: 769px) {\n        .kit-header-bar .main-nav {\n          position: absolute;\n          left: 50%;\n          transform: translateX(-50%);\n          top: 0;\n          height: 100%;\n        }\n      }\n\n      .kit-header-bar .nav-item {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        padding: 0 24px;\n        height: 100%;\n        position: relative;\n        color: var(--kit-on-surface-variant);\n        transition: color 0.2s;\n        cursor: pointer;\n        text-decoration: none;\n        background: transparent;\n        border: none;\n        font-family: inherit;\n        -webkit-tap-highlight-color: transparent;\n      }\n\n      .kit-header-bar .nav-item::after {\n        display: none;\n        content: none;\n      }\n\n      .kit-header-bar .nav-item .label {\n        font-size: 0.875rem;\n        font-weight: 600;\n        letter-spacing: 0.01em;\n        z-index: 1;\n      }\n\n      .kit-header-bar .nav-item .indicator {\n        position: absolute;\n        bottom: 0;\n        left: 24px;\n        right: 24px;\n        height: 3px;\n        background: var(--kit-primary);\n        border-radius: 3px 3px 0 0;\n        opacity: 0;\n        transform: scaleX(0.35);\n        transform-origin: center bottom;\n        transition:\n          opacity 200ms var(--kit-ease-standard, ease),\n          transform 320ms\n            var(--kit-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));\n      }\n\n      .kit-header-bar .nav-item.active {\n        color: var(--kit-primary);\n      }\n\n      .kit-header-bar .nav-item.active .indicator {\n        opacity: 1;\n        transform: scaleX(1);\n      }\n\n      @media (hover: hover) {\n        .kit-header-bar .nav-item:not(.active):hover {\n          color: var(--kit-on-surface);\n        }\n      }\n\n      .kit-header-bar .m3-button-icon {\n        width: 40px;\n        height: 40px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        border-radius: 50%;\n        border: none;\n        background: transparent;\n        color: var(--kit-on-surface-variant);\n        cursor: pointer;\n        font-size: 1.25rem;\n        -webkit-tap-highlight-color: transparent;\n        transition:\n          background-color 0.2s,\n          color 0.2s;\n      }\n\n      .kit-header-bar .m3-button-icon:hover {\n        background: var(--kit-surface-container-high);\n        color: var(--kit-on-surface);\n      }\n\n      @media (max-width: 768px) {\n        .kit-header-bar .brand-copy {\n          display: none;\n        }\n\n        .kit-header-bar .main-nav {\n          position: fixed;\n          bottom: 0;\n          left: 0;\n          right: 0;\n          height: 80px;\n          background: var(--kit-surface-container-high);\n          border-top: 1px solid var(--kit-outline-variant);\n          padding-bottom: env(safe-area-inset-bottom);\n          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);\n          transform: none;\n        }\n\n        .kit-header-bar .nav-item {\n          flex: 1;\n          padding: 0;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n        }\n\n        .kit-header-bar .nav-item:focus,\n        .kit-header-bar .nav-item:active,\n        .kit-header-bar .nav-item.active {\n          background: transparent;\n        }\n\n        .kit-header-bar .nav-item .indicator {\n          display: none;\n        }\n\n        .kit-header-bar .nav-item .label {\n          padding: 6px 14px;\n          border-radius: 9999px;\n          transition:\n            background-color 260ms\n              var(--kit-ease-emphasized, cubic-bezier(0.2, 0, 0, 1)),\n            color 200ms ease,\n            transform 240ms\n              var(--kit-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));\n          white-space: nowrap;\n        }\n\n        .kit-header-bar .nav-item.active .label {\n          background: var(\n            --m3-secondary-container,\n            var(--kit-primary-container)\n          );\n          color: var(\n            --m3-on-secondary-container,\n            var(--kit-on-primary-container)\n          );\n          transform: scale(1.03);\n        }\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-header-bar * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitHeaderBarComponent, [{
        type: Component,
        args: [{ selector: 'kit-header-bar', standalone: true, imports: [KitThemeToggleComponent], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <header class="main-header kit-header-bar">
      <div class="header-inner">
        <div class="header-left">
          <a
            [href]="brandHref()"
            class="brand-link state-layer"
            (click)="onBrandClick($event)"
            data-testid="header-brand-link"
          >
            @if (logoUrl()) {
              <img
                [src]="logoUrl()"
                alt=""
                aria-hidden="true"
                class="brand-icon"
                width="32"
                height="32"
              />
            }
            <div class="brand-copy">
              <span class="brand-title">{{ appName() }}</span>
              @if (subtitle()) {
                <span class="brand-subtitle">{{ subtitle() }}</span>
              }
            </div>
          </a>
        </div>

        @if (tabs().length > 0) {
          <nav class="main-nav" aria-label="Main navigation">
            @for (tab of tabs(); track tab.id) {
              @if (tab.href) {
                <a
                  [href]="tab.href"
                  class="nav-item"
                  [class.active]="activeTab() === tab.id"
                  [attr.aria-current]="activeTab() === tab.id ? 'page' : null"
                  [attr.data-testid]="tab.testId || 'nav-tab-' + tab.id"
                  (click)="onTabClick($event, tab)"
                >
                  <span class="label">{{ tab.label }}</span>
                  <div class="indicator"></div>
                </a>
              } @else {
                <button
                  type="button"
                  class="nav-item"
                  [class.active]="activeTab() === tab.id"
                  [attr.aria-current]="activeTab() === tab.id ? 'page' : null"
                  [attr.data-testid]="tab.testId || 'nav-tab-' + tab.id"
                  (click)="onTabClick($event, tab)"
                >
                  <span class="label">{{ tab.label }}</span>
                  <div class="indicator"></div>
                </button>
              }
            }
          </nav>
        } @else {
          <div class="kit-header-center">
            <ng-content select="[headerCenter],[kitHeaderCenter]" />
          </div>
        }

        <div class="header-right">
          <ng-content select="[headerRightStart],[kitHeaderActions]" />

          @if (showProfileButton()) {
            <button
              type="button"
              class="m3-button-icon state-layer"
              (click)="profileClicked.emit()"
              [title]="resolvedProfileTitle()"
              [attr.aria-label]="profileAriaLabel()"
              [attr.data-testid]="profileTestId()"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <path
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          }

          <kit-theme-toggle
            [theme]="theme()"
            [testId]="themeTestId()"
            (toggled)="themeToggled.emit()"
          />
          <ng-content select="[headerRightEnd]" />
        </div>
      </div>
    </header>
  `, styles: ["\n      .kit-header-bar.main-header {\n        position: sticky;\n        top: 0;\n        z-index: 500;\n        width: 100%;\n        background: transparent;\n        border-bottom: 1px solid var(--kit-outline-variant);\n      }\n\n      .kit-header-bar.main-header::before {\n        content: '';\n        position: absolute;\n        inset: 0;\n        z-index: -1;\n        background: var(--kit-glass-bg, var(--kit-surface));\n        backdrop-filter: blur(18px);\n        -webkit-backdrop-filter: blur(18px);\n        pointer-events: none;\n      }\n\n      .kit-header-bar .header-inner {\n        max-width: 1400px;\n        margin: 0 auto;\n        padding: 0 var(--container-padding, 16px);\n        height: var(--header-height, 64px);\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        position: relative;\n      }\n\n      .kit-header-bar .header-left,\n      .kit-header-bar .header-right {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        flex: 1;\n      }\n\n      .kit-header-bar .header-right {\n        justify-content: flex-end;\n      }\n\n      .kit-header-bar .brand-link {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 8px 12px;\n        border-radius: 12px;\n        text-decoration: none;\n        color: inherit;\n        -webkit-tap-highlight-color: transparent;\n        transition: background-color 0.2s;\n      }\n\n      .kit-header-bar .brand-link:hover {\n        background: var(--kit-surface-container);\n      }\n\n      .kit-header-bar .brand-icon {\n        width: 32px;\n        height: 32px;\n        flex-shrink: 0;\n      }\n\n      .kit-header-bar .brand-copy {\n        display: flex;\n        flex-direction: column;\n        gap: 1px;\n      }\n\n      .kit-header-bar .brand-title {\n        font-family: var(--kit-font-heading);\n        font-size: 1.35rem;\n        font-weight: 700;\n        color: var(--kit-on-surface);\n        margin: 0;\n        line-height: 1.1;\n      }\n\n      .kit-header-bar .brand-subtitle {\n        font-size: 0.72rem;\n        font-weight: 600;\n        color: var(--kit-on-surface-variant);\n        letter-spacing: 0.02em;\n      }\n\n      .kit-header-bar .main-nav {\n        display: flex;\n        justify-content: center;\n        gap: 8px;\n        z-index: 1000;\n      }\n\n      @media (min-width: 769px) {\n        .kit-header-bar .main-nav {\n          position: absolute;\n          left: 50%;\n          transform: translateX(-50%);\n          top: 0;\n          height: 100%;\n        }\n      }\n\n      .kit-header-bar .nav-item {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        padding: 0 24px;\n        height: 100%;\n        position: relative;\n        color: var(--kit-on-surface-variant);\n        transition: color 0.2s;\n        cursor: pointer;\n        text-decoration: none;\n        background: transparent;\n        border: none;\n        font-family: inherit;\n        -webkit-tap-highlight-color: transparent;\n      }\n\n      .kit-header-bar .nav-item::after {\n        display: none;\n        content: none;\n      }\n\n      .kit-header-bar .nav-item .label {\n        font-size: 0.875rem;\n        font-weight: 600;\n        letter-spacing: 0.01em;\n        z-index: 1;\n      }\n\n      .kit-header-bar .nav-item .indicator {\n        position: absolute;\n        bottom: 0;\n        left: 24px;\n        right: 24px;\n        height: 3px;\n        background: var(--kit-primary);\n        border-radius: 3px 3px 0 0;\n        opacity: 0;\n        transform: scaleX(0.35);\n        transform-origin: center bottom;\n        transition:\n          opacity 200ms var(--kit-ease-standard, ease),\n          transform 320ms\n            var(--kit-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));\n      }\n\n      .kit-header-bar .nav-item.active {\n        color: var(--kit-primary);\n      }\n\n      .kit-header-bar .nav-item.active .indicator {\n        opacity: 1;\n        transform: scaleX(1);\n      }\n\n      @media (hover: hover) {\n        .kit-header-bar .nav-item:not(.active):hover {\n          color: var(--kit-on-surface);\n        }\n      }\n\n      .kit-header-bar .m3-button-icon {\n        width: 40px;\n        height: 40px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        border-radius: 50%;\n        border: none;\n        background: transparent;\n        color: var(--kit-on-surface-variant);\n        cursor: pointer;\n        font-size: 1.25rem;\n        -webkit-tap-highlight-color: transparent;\n        transition:\n          background-color 0.2s,\n          color 0.2s;\n      }\n\n      .kit-header-bar .m3-button-icon:hover {\n        background: var(--kit-surface-container-high);\n        color: var(--kit-on-surface);\n      }\n\n      @media (max-width: 768px) {\n        .kit-header-bar .brand-copy {\n          display: none;\n        }\n\n        .kit-header-bar .main-nav {\n          position: fixed;\n          bottom: 0;\n          left: 0;\n          right: 0;\n          height: 80px;\n          background: var(--kit-surface-container-high);\n          border-top: 1px solid var(--kit-outline-variant);\n          padding-bottom: env(safe-area-inset-bottom);\n          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);\n          transform: none;\n        }\n\n        .kit-header-bar .nav-item {\n          flex: 1;\n          padding: 0;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n        }\n\n        .kit-header-bar .nav-item:focus,\n        .kit-header-bar .nav-item:active,\n        .kit-header-bar .nav-item.active {\n          background: transparent;\n        }\n\n        .kit-header-bar .nav-item .indicator {\n          display: none;\n        }\n\n        .kit-header-bar .nav-item .label {\n          padding: 6px 14px;\n          border-radius: 9999px;\n          transition:\n            background-color 260ms\n              var(--kit-ease-emphasized, cubic-bezier(0.2, 0, 0, 1)),\n            color 200ms ease,\n            transform 240ms\n              var(--kit-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));\n          white-space: nowrap;\n        }\n\n        .kit-header-bar .nav-item.active .label {\n          background: var(\n            --m3-secondary-container,\n            var(--kit-primary-container)\n          );\n          color: var(\n            --m3-on-secondary-container,\n            var(--kit-on-primary-container)\n          );\n          transform: scale(1.03);\n        }\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-header-bar * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "] }]
    }], null, { appName: [{ type: i0.Input, args: [{ isSignal: true, alias: "appName", required: false }] }], subtitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "subtitle", required: false }] }], logoUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "logoUrl", required: false }] }], brandHref: [{ type: i0.Input, args: [{ isSignal: true, alias: "brandHref", required: false }] }], tabs: [{ type: i0.Input, args: [{ isSignal: true, alias: "tabs", required: false }] }], activeTab: [{ type: i0.Input, args: [{ isSignal: true, alias: "activeTab", required: false }] }], theme: [{ type: i0.Input, args: [{ isSignal: true, alias: "theme", required: false }] }], isAuthenticated: [{ type: i0.Input, args: [{ isSignal: true, alias: "isAuthenticated", required: false }] }], user: [{ type: i0.Input, args: [{ isSignal: true, alias: "user", required: false }] }], showProfileButton: [{ type: i0.Input, args: [{ isSignal: true, alias: "showProfileButton", required: false }] }], profileTitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "profileTitle", required: false }] }], profileAriaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "profileAriaLabel", required: false }] }], profileTestId: [{ type: i0.Input, args: [{ isSignal: true, alias: "profileTestId", required: false }] }], themeTestId: [{ type: i0.Input, args: [{ isSignal: true, alias: "themeTestId", required: false }] }], brandClicked: [{ type: i0.Output, args: ["brandClicked"] }], tabSelected: [{ type: i0.Output, args: ["tabSelected"] }], profileClicked: [{ type: i0.Output, args: ["profileClicked"] }], themeToggled: [{ type: i0.Output, args: ["themeToggled"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitHeaderBarComponent, { className: "KitHeaderBarComponent", filePath: "header-bar.component.ts", lineNumber: 403 }); })();
