import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, inject, input, output, } from '@angular/core';
import { KitThemeService } from './theme.service.js';
import * as i0 from "@angular/core";
function KitThemeToggleComponent_Case_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(0, "svg", 1);
    i0.ɵɵdomElement(1, "circle", 2)(2, "line", 3)(3, "line", 4)(4, "line", 5)(5, "line", 6)(6, "line", 7)(7, "line", 8)(8, "line", 9)(9, "line", 10);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("width", ctx_r0.iconSize())("height", ctx_r0.iconSize());
} }
function KitThemeToggleComponent_Case_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(0, "svg", 1);
    i0.ɵɵdomElement(1, "path", 11);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("width", ctx_r0.iconSize())("height", ctx_r0.iconSize());
} }
function KitThemeToggleComponent_Case_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(0, "svg", 1);
    i0.ɵɵdomElement(1, "circle", 12)(2, "path", 13);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("width", ctx_r0.iconSize())("height", ctx_r0.iconSize());
} }
/**
 * Shared accessible theme toggle button cycling `light -> dark -> auto`
 * with a spring icon morph transition on state changes.
 * Accepts an explicit `[theme]` input (for controlled parents like `<kit-header-bar>`)
 * or operates directly against `KitThemeService` when used standalone.
 */
export class KitThemeToggleComponent {
    constructor() {
        this.themeService = inject(KitThemeService, { optional: true });
        this.theme = input(undefined, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "theme" }] : /* istanbul ignore next */ []));
        this.buttonClass = input('m3-button-icon state-layer', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "buttonClass" }] : /* istanbul ignore next */ []));
        this.testId = input('theme-toggle-btn', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "testId" }] : /* istanbul ignore next */ []));
        this.iconSize = input(18, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "iconSize" }] : /* istanbul ignore next */ []));
        this.toggled = output();
        this.effectiveTheme = computed(() => this.theme() ?? this.themeService?.theme() ?? 'auto', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "effectiveTheme" }] : /* istanbul ignore next */ []));
    }
    onToggle() {
        const controlled = this.theme();
        if (controlled === undefined && this.themeService) {
            const next = this.themeService.toggleTheme();
            this.toggled.emit(next);
            return;
        }
        const cur = controlled ?? 'auto';
        const next = cur === 'light' ? 'dark' : cur === 'dark' ? 'auto' : 'light';
        this.toggled.emit(next);
    }
    static { this.ɵfac = function KitThemeToggleComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitThemeToggleComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitThemeToggleComponent, selectors: [["kit-theme-toggle"]], inputs: { theme: [1, "theme"], buttonClass: [1, "buttonClass"], testId: [1, "testId"], iconSize: [1, "iconSize"] }, outputs: { toggled: "toggled" }, decls: 4, vars: 6, consts: [["type", "button", 1, "kit-theme-toggle", 3, "click", "title"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "kit-theme-icon"], ["cx", "12", "cy", "12", "r", "5", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "12", "y1", "1", "x2", "12", "y2", "3", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "12", "y1", "21", "x2", "12", "y2", "23", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "4.22", "y1", "4.22", "x2", "5.64", "y2", "5.64", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "18.36", "y1", "18.36", "x2", "19.78", "y2", "19.78", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "1", "y1", "12", "x2", "3", "y2", "12", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "21", "y1", "12", "x2", "23", "y2", "12", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "4.22", "y1", "19.78", "x2", "5.64", "y2", "18.36", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "18.36", "y1", "5.64", "x2", "19.78", "y2", "4.22", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "12", "cy", "12", "r", "9", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M12 3a9 9 0 0 1 0 18z", "fill", "currentColor"]], template: function KitThemeToggleComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "button", 0);
            i0.ɵɵdomListener("click", function KitThemeToggleComponent_Template_button_click_0_listener() { return ctx.onToggle(); });
            i0.ɵɵconditionalCreate(1, KitThemeToggleComponent_Case_1_Template, 10, 2, "svg", 1)(2, KitThemeToggleComponent_Case_2_Template, 2, 2, "svg", 1)(3, KitThemeToggleComponent_Case_3_Template, 3, 2, "svg", 1);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            let tmp_4_0;
            i0.ɵɵclassMap(ctx.buttonClass());
            i0.ɵɵdomProperty("title", "Theme: " + ctx.effectiveTheme());
            i0.ɵɵattribute("aria-label", "Toggle color theme (current: " + ctx.effectiveTheme() + ")")("data-testid", ctx.testId());
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_4_0 = ctx.effectiveTheme()) === "light" ? 1 : tmp_4_0 === "dark" ? 2 : 3);
        } }, encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitThemeToggleComponent, [{
        type: Component,
        args: [{
                selector: 'kit-theme-toggle',
                standalone: true,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <button
      type="button"
      class="kit-theme-toggle"
      [class]="buttonClass()"
      (click)="onToggle()"
      [title]="'Theme: ' + effectiveTheme()"
      [attr.aria-label]="
        'Toggle color theme (current: ' + effectiveTheme() + ')'
      "
      [attr.data-testid]="testId()"
    >
      @switch (effectiveTheme()) {
        @case ('light') {
          <svg
            class="kit-theme-icon"
            viewBox="0 0 24 24"
            [attr.width]="iconSize()"
            [attr.height]="iconSize()"
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
            class="kit-theme-icon"
            viewBox="0 0 24 24"
            [attr.width]="iconSize()"
            [attr.height]="iconSize()"
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
            class="kit-theme-icon"
            viewBox="0 0 24 24"
            [attr.width]="iconSize()"
            [attr.height]="iconSize()"
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
  `,
            }]
    }], null, { theme: [{ type: i0.Input, args: [{ isSignal: true, alias: "theme", required: false }] }], buttonClass: [{ type: i0.Input, args: [{ isSignal: true, alias: "buttonClass", required: false }] }], testId: [{ type: i0.Input, args: [{ isSignal: true, alias: "testId", required: false }] }], iconSize: [{ type: i0.Input, args: [{ isSignal: true, alias: "iconSize", required: false }] }], toggled: [{ type: i0.Output, args: ["toggled"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitThemeToggleComponent, { className: "KitThemeToggleComponent", filePath: "theme-toggle.component.ts", lineNumber: 167 }); })();
