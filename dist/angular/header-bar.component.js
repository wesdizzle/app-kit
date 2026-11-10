import { Component, ViewEncapsulation, computed, input, output, } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
const _c0 = [[["", "headerRightStart", ""]], [["", "headerRightEnd", ""]], [["", "headerCenter", ""]]];
const _c1 = ["[headerRightStart]", "[headerRightEnd]", "[headerCenter]"];
const _forTrack0 = ($index, $item) => $item.id;
function KitHeaderBarComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElement(0, "img", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵdomProperty("src", ctx_r0.logoUrl(), i0.ɵɵsanitizeUrl);
} }
function KitHeaderBarComponent_Conditional_7_For_2_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "a", 16);
    i0.ɵɵdomListener("click", function KitHeaderBarComponent_Conditional_7_For_2_Conditional_0_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r2); const tab_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onTabClick($event, tab_r3)); });
    i0.ɵɵdomElementStart(1, "span", 17);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElement(3, "div", 18);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const tab_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r0.activeTab() === tab_r3.id);
    i0.ɵɵdomProperty("href", tab_r3.href, i0.ɵɵsanitizeUrl);
    i0.ɵɵattribute("aria-current", ctx_r0.activeTab() === tab_r3.id ? "page" : null)("data-testid", tab_r3.testId || "nav-tab-" + tab_r3.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(tab_r3.label);
} }
function KitHeaderBarComponent_Conditional_7_For_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 19);
    i0.ɵɵdomListener("click", function KitHeaderBarComponent_Conditional_7_For_2_Conditional_1_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r4); const tab_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onTabClick($event, tab_r3)); });
    i0.ɵɵdomElementStart(1, "span", 17);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElement(3, "div", 18);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const tab_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r0.activeTab() === tab_r3.id);
    i0.ɵɵattribute("aria-current", ctx_r0.activeTab() === tab_r3.id ? "page" : null)("data-testid", tab_r3.testId || "nav-tab-" + tab_r3.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(tab_r3.label);
} }
function KitHeaderBarComponent_Conditional_7_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, KitHeaderBarComponent_Conditional_7_For_2_Conditional_0_Template, 4, 6, "a", 14)(1, KitHeaderBarComponent_Conditional_7_For_2_Conditional_1_Template, 4, 5, "button", 15);
} if (rf & 2) {
    const tab_r3 = ctx.$implicit;
    i0.ɵɵconditional(tab_r3.href ? 0 : 1);
} }
function KitHeaderBarComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "nav", 6);
    i0.ɵɵrepeaterCreate(1, KitHeaderBarComponent_Conditional_7_For_2_Template, 2, 1, null, null, _forTrack0);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.tabs());
} }
function KitHeaderBarComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 7);
    i0.ɵɵprojection(1, 2);
    i0.ɵɵdomElementEnd();
} }
function KitHeaderBarComponent_Case_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(0, "svg", 10);
    i0.ɵɵdomElement(1, "circle", 20)(2, "line", 21)(3, "line", 22)(4, "line", 23)(5, "line", 24)(6, "line", 25)(7, "line", 26)(8, "line", 27)(9, "line", 28);
    i0.ɵɵdomElementEnd();
} }
function KitHeaderBarComponent_Case_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(0, "svg", 10);
    i0.ɵɵdomElement(1, "path", 29);
    i0.ɵɵdomElementEnd();
} }
function KitHeaderBarComponent_Case_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(0, "svg", 10);
    i0.ɵɵdomElement(1, "circle", 30)(2, "path", 31);
    i0.ɵɵdomElementEnd();
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
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitHeaderBarComponent, selectors: [["kit-header-bar"]], inputs: { appName: [1, "appName"], subtitle: [1, "subtitle"], logoUrl: [1, "logoUrl"], brandHref: [1, "brandHref"], tabs: [1, "tabs"], activeTab: [1, "activeTab"], theme: [1, "theme"], isAuthenticated: [1, "isAuthenticated"], user: [1, "user"], profileTitle: [1, "profileTitle"], profileAriaLabel: [1, "profileAriaLabel"], profileTestId: [1, "profileTestId"], themeTestId: [1, "themeTestId"] }, outputs: { brandClicked: "brandClicked", tabSelected: "tabSelected", profileClicked: "profileClicked", themeToggled: "themeToggled" }, ngContentSelectors: _c1, decls: 20, vars: 10, consts: [[1, "main-header", "kit-header-bar"], [1, "header-inner"], [1, "header-left"], ["data-testid", "header-brand-link", 1, "brand-link", "state-layer", 3, "click", "href"], ["alt", "", "aria-hidden", "true", 1, "brand-icon", 3, "src"], [1, "brand-title"], ["aria-label", "Main navigation", 1, "main-nav"], [1, "kit-header-center"], [1, "header-right"], ["type", "button", 1, "m3-button-icon", "state-layer", 3, "click", "title"], ["viewBox", "0 0 24 24", "width", "18", "height", "18", "aria-hidden", "true"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "12", "cy", "7", "r", "4", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["type", "button", "aria-label", "Toggle color theme", 1, "m3-button-icon", "state-layer", 3, "click", "title"], [1, "nav-item", "state-layer", 3, "href", "active"], ["type", "button", 1, "nav-item", "state-layer", 3, "active"], [1, "nav-item", "state-layer", 3, "click", "href"], [1, "label"], [1, "indicator"], ["type", "button", 1, "nav-item", "state-layer", 3, "click"], ["cx", "12", "cy", "12", "r", "5", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "12", "y1", "1", "x2", "12", "y2", "3", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "12", "y1", "21", "x2", "12", "y2", "23", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "4.22", "y1", "4.22", "x2", "5.64", "y2", "5.64", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "18.36", "y1", "18.36", "x2", "19.78", "y2", "19.78", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "1", "y1", "12", "x2", "3", "y2", "12", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "21", "y1", "12", "x2", "23", "y2", "12", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "4.22", "y1", "19.78", "x2", "5.64", "y2", "18.36", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "18.36", "y1", "5.64", "x2", "19.78", "y2", "4.22", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "12", "cy", "12", "r", "9", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M12 3a9 9 0 0 1 0 18z", "fill", "currentColor"]], template: function KitHeaderBarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef(_c0);
            i0.ɵɵdomElementStart(0, "header", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3);
            i0.ɵɵdomListener("click", function KitHeaderBarComponent_Template_a_click_3_listener($event) { return ctx.onBrandClick($event); });
            i0.ɵɵconditionalCreate(4, KitHeaderBarComponent_Conditional_4_Template, 1, 1, "img", 4);
            i0.ɵɵdomElementStart(5, "span", 5);
            i0.ɵɵtext(6);
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵconditionalCreate(7, KitHeaderBarComponent_Conditional_7_Template, 3, 0, "nav", 6)(8, KitHeaderBarComponent_Conditional_8_Template, 2, 0, "div", 7);
            i0.ɵɵdomElementStart(9, "div", 8);
            i0.ɵɵprojection(10);
            i0.ɵɵdomElementStart(11, "button", 9);
            i0.ɵɵdomListener("click", function KitHeaderBarComponent_Template_button_click_11_listener() { return ctx.profileClicked.emit(); });
            i0.ɵɵnamespaceSVG();
            i0.ɵɵdomElementStart(12, "svg", 10);
            i0.ɵɵdomElement(13, "path", 11)(14, "circle", 12);
            i0.ɵɵdomElementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵdomElementStart(15, "button", 13);
            i0.ɵɵdomListener("click", function KitHeaderBarComponent_Template_button_click_15_listener() { return ctx.themeToggled.emit(); });
            i0.ɵɵconditionalCreate(16, KitHeaderBarComponent_Case_16_Template, 10, 0, ":svg:svg", 10)(17, KitHeaderBarComponent_Case_17_Template, 2, 0, ":svg:svg", 10)(18, KitHeaderBarComponent_Case_18_Template, 3, 0, ":svg:svg", 10);
            i0.ɵɵdomElementEnd();
            i0.ɵɵprojection(19, 1);
            i0.ɵɵdomElementEnd()()();
        } if (rf & 2) {
            let tmp_9_0;
            i0.ɵɵadvance(3);
            i0.ɵɵdomProperty("href", ctx.brandHref(), i0.ɵɵsanitizeUrl);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.logoUrl() ? 4 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.appName());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.tabs().length > 0 ? 7 : 8);
            i0.ɵɵadvance(4);
            i0.ɵɵdomProperty("title", ctx.resolvedProfileTitle());
            i0.ɵɵattribute("aria-label", ctx.profileAriaLabel())("data-testid", ctx.profileTestId());
            i0.ɵɵadvance(4);
            i0.ɵɵdomProperty("title", "Theme: " + ctx.theme());
            i0.ɵɵattribute("data-testid", ctx.themeTestId());
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_9_0 = ctx.theme()) === "light" ? 16 : tmp_9_0 === "dark" ? 17 : 18);
        } }, dependencies: [CommonModule], styles: ["\n      .kit-header-bar.main-header {\n        position: sticky;\n        top: 0;\n        z-index: 100;\n        width: 100%;\n        background: var(--kit-surface, #1a1b20);\n        border-bottom: 1px solid var(--kit-outline-variant, #2d3039);\n      }\n\n      .kit-header-bar .header-inner {\n        max-width: 1400px;\n        margin: 0 auto;\n        padding: 0 var(--container-padding, 16px);\n        height: var(--header-height, 64px);\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        position: relative;\n      }\n\n      .kit-header-bar .header-left,\n      .kit-header-bar .header-right {\n        display: flex;\n        align-items: center;\n        gap: 16px;\n        flex: 1;\n      }\n\n      .kit-header-bar .header-right {\n        justify-content: flex-end;\n      }\n\n      .kit-header-bar .brand-link {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 8px 12px;\n        border-radius: 12px;\n        text-decoration: none;\n        color: inherit;\n        transition: background-color 0.2s;\n      }\n\n      .kit-header-bar .brand-link:hover {\n        background: var(--kit-surface-container, rgba(255, 255, 255, 0.05));\n      }\n\n      .kit-header-bar .brand-icon {\n        width: 32px;\n        height: 32px;\n        flex-shrink: 0;\n      }\n\n      .kit-header-bar .brand-title {\n        font-size: 1.5rem;\n        font-weight: 700;\n        color: var(--kit-on-surface, #f1f5f9);\n        margin: 0;\n        line-height: 1.1;\n      }\n\n      .kit-header-bar .main-nav {\n        display: flex;\n        justify-content: center;\n        gap: 8px;\n        z-index: 1000;\n      }\n\n      @media (min-width: 769px) {\n        .kit-header-bar .main-nav {\n          position: absolute;\n          left: 50%;\n          transform: translateX(-50%);\n          top: 0;\n          height: 100%;\n        }\n      }\n\n      .kit-header-bar .nav-item {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        padding: 0 24px;\n        height: 100%;\n        position: relative;\n        color: var(--kit-on-surface-variant, #94a3b8);\n        transition: color 0.2s;\n        cursor: pointer;\n        text-decoration: none;\n        background: transparent;\n        border: none;\n        font-family: inherit;\n      }\n\n      .kit-header-bar .nav-item .label {\n        font-size: 0.875rem;\n        font-weight: 600;\n        letter-spacing: 0.01em;\n        z-index: 1;\n      }\n\n      .kit-header-bar .nav-item .indicator {\n        position: absolute;\n        bottom: 0;\n        left: 24px;\n        right: 24px;\n        height: 3px;\n        background: var(--kit-primary, #60a5fa);\n        border-radius: 3px 3px 0 0;\n        opacity: 0;\n        transform: scaleX(0.5);\n        transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);\n      }\n\n      .kit-header-bar .nav-item.active {\n        color: var(--kit-primary, #60a5fa);\n      }\n\n      .kit-header-bar .nav-item.active .indicator {\n        opacity: 1;\n        transform: scaleX(1);\n      }\n\n      .kit-header-bar .nav-item:hover {\n        color: var(--kit-on-surface, #f1f5f9);\n      }\n\n      .kit-header-bar .m3-button-icon {\n        width: 40px;\n        height: 40px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        border-radius: 50%;\n        border: none;\n        background: transparent;\n        color: var(--kit-on-surface-variant, #94a3b8);\n        cursor: pointer;\n        font-size: 1.25rem;\n        transition:\n          background-color 0.2s,\n          color 0.2s;\n      }\n\n      .kit-header-bar .m3-button-icon:hover {\n        background: var(--kit-surface-container-high, rgba(255, 255, 255, 0.08));\n        color: var(--kit-on-surface, #f1f5f9);\n      }\n\n      @media (max-width: 768px) {\n        .kit-header-bar .brand-title {\n          display: none;\n        }\n\n        .kit-header-bar .main-nav {\n          position: fixed;\n          bottom: 0;\n          left: 0;\n          right: 0;\n          height: 80px;\n          background: var(--kit-surface-container-high, #272930);\n          border-top: 1px solid var(--kit-outline-variant, #2d3039);\n          padding-bottom: env(safe-area-inset-bottom);\n          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);\n          transform: none;\n        }\n\n        .kit-header-bar .nav-item {\n          flex: 1;\n          padding: 0;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n        }\n\n        .kit-header-bar .nav-item .indicator {\n          display: none;\n        }\n\n        .kit-header-bar .nav-item .label {\n          padding: 6px 14px;\n          border-radius: 9999px;\n          transition:\n            background-color 0.25s cubic-bezier(0.2, 0, 0, 1),\n            color 0.2s ease;\n          white-space: nowrap;\n        }\n\n        .kit-header-bar .nav-item.active .label {\n          background: var(\n            --m3-secondary-container,\n            var(--kit-primary-container, rgba(96, 165, 250, 0.2))\n          );\n          color: var(\n            --m3-on-secondary-container,\n            var(--kit-on-primary-container, #dbeafe)\n          );\n        }\n      }\n    "], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitHeaderBarComponent, [{
        type: Component,
        args: [{ selector: 'kit-header-bar', standalone: true, imports: [CommonModule], encapsulation: ViewEncapsulation.None, template: `
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
              />
            }
            <span class="brand-title">{{ appName() }}</span>
          </a>
        </div>

        @if (tabs().length > 0) {
          <nav class="main-nav" aria-label="Main navigation">
            @for (tab of tabs(); track tab.id) {
              @if (tab.href) {
                <a
                  [href]="tab.href"
                  class="nav-item state-layer"
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
                  class="nav-item state-layer"
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
            <ng-content select="[headerCenter]" />
          </div>
        }

        <div class="header-right">
          <ng-content select="[headerRightStart]" />
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

          <button
            type="button"
            class="m3-button-icon state-layer"
            (click)="themeToggled.emit()"
            [title]="'Theme: ' + theme()"
            aria-label="Toggle color theme"
            [attr.data-testid]="themeTestId()"
          >
            @switch (theme()) {
              @case ('light') {
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <line
                    x1="12"
                    y1="1"
                    x2="12"
                    y2="3"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="12"
                    y1="21"
                    x2="12"
                    y2="23"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="4.22"
                    y1="4.22"
                    x2="5.64"
                    y2="5.64"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="18.36"
                    y1="18.36"
                    x2="19.78"
                    y2="19.78"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="1"
                    y1="12"
                    x2="3"
                    y2="12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="21"
                    y1="12"
                    x2="23"
                    y2="12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="4.22"
                    y1="19.78"
                    x2="5.64"
                    y2="18.36"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="18.36"
                    y1="5.64"
                    x2="19.78"
                    y2="4.22"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              }
              @case ('dark') {
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              }
              @default {
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
                </svg>
              }
            }
          </button>
          <ng-content select="[headerRightEnd]" />
        </div>
      </div>
    </header>
  `, styles: ["\n      .kit-header-bar.main-header {\n        position: sticky;\n        top: 0;\n        z-index: 100;\n        width: 100%;\n        background: var(--kit-surface, #1a1b20);\n        border-bottom: 1px solid var(--kit-outline-variant, #2d3039);\n      }\n\n      .kit-header-bar .header-inner {\n        max-width: 1400px;\n        margin: 0 auto;\n        padding: 0 var(--container-padding, 16px);\n        height: var(--header-height, 64px);\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        position: relative;\n      }\n\n      .kit-header-bar .header-left,\n      .kit-header-bar .header-right {\n        display: flex;\n        align-items: center;\n        gap: 16px;\n        flex: 1;\n      }\n\n      .kit-header-bar .header-right {\n        justify-content: flex-end;\n      }\n\n      .kit-header-bar .brand-link {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 8px 12px;\n        border-radius: 12px;\n        text-decoration: none;\n        color: inherit;\n        transition: background-color 0.2s;\n      }\n\n      .kit-header-bar .brand-link:hover {\n        background: var(--kit-surface-container, rgba(255, 255, 255, 0.05));\n      }\n\n      .kit-header-bar .brand-icon {\n        width: 32px;\n        height: 32px;\n        flex-shrink: 0;\n      }\n\n      .kit-header-bar .brand-title {\n        font-size: 1.5rem;\n        font-weight: 700;\n        color: var(--kit-on-surface, #f1f5f9);\n        margin: 0;\n        line-height: 1.1;\n      }\n\n      .kit-header-bar .main-nav {\n        display: flex;\n        justify-content: center;\n        gap: 8px;\n        z-index: 1000;\n      }\n\n      @media (min-width: 769px) {\n        .kit-header-bar .main-nav {\n          position: absolute;\n          left: 50%;\n          transform: translateX(-50%);\n          top: 0;\n          height: 100%;\n        }\n      }\n\n      .kit-header-bar .nav-item {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        padding: 0 24px;\n        height: 100%;\n        position: relative;\n        color: var(--kit-on-surface-variant, #94a3b8);\n        transition: color 0.2s;\n        cursor: pointer;\n        text-decoration: none;\n        background: transparent;\n        border: none;\n        font-family: inherit;\n      }\n\n      .kit-header-bar .nav-item .label {\n        font-size: 0.875rem;\n        font-weight: 600;\n        letter-spacing: 0.01em;\n        z-index: 1;\n      }\n\n      .kit-header-bar .nav-item .indicator {\n        position: absolute;\n        bottom: 0;\n        left: 24px;\n        right: 24px;\n        height: 3px;\n        background: var(--kit-primary, #60a5fa);\n        border-radius: 3px 3px 0 0;\n        opacity: 0;\n        transform: scaleX(0.5);\n        transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);\n      }\n\n      .kit-header-bar .nav-item.active {\n        color: var(--kit-primary, #60a5fa);\n      }\n\n      .kit-header-bar .nav-item.active .indicator {\n        opacity: 1;\n        transform: scaleX(1);\n      }\n\n      .kit-header-bar .nav-item:hover {\n        color: var(--kit-on-surface, #f1f5f9);\n      }\n\n      .kit-header-bar .m3-button-icon {\n        width: 40px;\n        height: 40px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        border-radius: 50%;\n        border: none;\n        background: transparent;\n        color: var(--kit-on-surface-variant, #94a3b8);\n        cursor: pointer;\n        font-size: 1.25rem;\n        transition:\n          background-color 0.2s,\n          color 0.2s;\n      }\n\n      .kit-header-bar .m3-button-icon:hover {\n        background: var(--kit-surface-container-high, rgba(255, 255, 255, 0.08));\n        color: var(--kit-on-surface, #f1f5f9);\n      }\n\n      @media (max-width: 768px) {\n        .kit-header-bar .brand-title {\n          display: none;\n        }\n\n        .kit-header-bar .main-nav {\n          position: fixed;\n          bottom: 0;\n          left: 0;\n          right: 0;\n          height: 80px;\n          background: var(--kit-surface-container-high, #272930);\n          border-top: 1px solid var(--kit-outline-variant, #2d3039);\n          padding-bottom: env(safe-area-inset-bottom);\n          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);\n          transform: none;\n        }\n\n        .kit-header-bar .nav-item {\n          flex: 1;\n          padding: 0;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n        }\n\n        .kit-header-bar .nav-item .indicator {\n          display: none;\n        }\n\n        .kit-header-bar .nav-item .label {\n          padding: 6px 14px;\n          border-radius: 9999px;\n          transition:\n            background-color 0.25s cubic-bezier(0.2, 0, 0, 1),\n            color 0.2s ease;\n          white-space: nowrap;\n        }\n\n        .kit-header-bar .nav-item.active .label {\n          background: var(\n            --m3-secondary-container,\n            var(--kit-primary-container, rgba(96, 165, 250, 0.2))\n          );\n          color: var(\n            --m3-on-secondary-container,\n            var(--kit-on-primary-container, #dbeafe)\n          );\n        }\n      }\n    "] }]
    }], null, { appName: [{ type: i0.Input, args: [{ isSignal: true, alias: "appName", required: false }] }], subtitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "subtitle", required: false }] }], logoUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "logoUrl", required: false }] }], brandHref: [{ type: i0.Input, args: [{ isSignal: true, alias: "brandHref", required: false }] }], tabs: [{ type: i0.Input, args: [{ isSignal: true, alias: "tabs", required: false }] }], activeTab: [{ type: i0.Input, args: [{ isSignal: true, alias: "activeTab", required: false }] }], theme: [{ type: i0.Input, args: [{ isSignal: true, alias: "theme", required: false }] }], isAuthenticated: [{ type: i0.Input, args: [{ isSignal: true, alias: "isAuthenticated", required: false }] }], user: [{ type: i0.Input, args: [{ isSignal: true, alias: "user", required: false }] }], profileTitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "profileTitle", required: false }] }], profileAriaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "profileAriaLabel", required: false }] }], profileTestId: [{ type: i0.Input, args: [{ isSignal: true, alias: "profileTestId", required: false }] }], themeTestId: [{ type: i0.Input, args: [{ isSignal: true, alias: "themeTestId", required: false }] }], brandClicked: [{ type: i0.Output, args: ["brandClicked"] }], tabSelected: [{ type: i0.Output, args: ["tabSelected"] }], profileClicked: [{ type: i0.Output, args: ["profileClicked"] }], themeToggled: [{ type: i0.Output, args: ["themeToggled"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitHeaderBarComponent, { className: "KitHeaderBarComponent", filePath: "header-bar.component.ts", lineNumber: 464 }); })();
