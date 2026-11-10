import { Component, ViewEncapsulation, input, output, } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
const _c0 = [[["", "headerBrand", ""]], [["", "headerCenter", ""]], [["", "headerActions", ""]], [["", "headerThemeIcon", ""]], [["", "headerTrim", ""]]];
const _c1 = ["[headerBrand]", "[headerCenter]", "[headerActions]", "[headerThemeIcon]", "[headerTrim]"];
export class KitHeaderBarComponent {
    constructor() {
        this.themeAriaLabel = input('Toggle color theme', ...(ngDevMode ? [{ debugName: "themeAriaLabel" }] : /* istanbul ignore next */ []));
        this.themeToggleClicked = output();
    }
    static { this.ɵfac = function KitHeaderBarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitHeaderBarComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitHeaderBarComponent, selectors: [["kit-header-bar"]], inputs: { themeAriaLabel: [1, "themeAriaLabel"] }, outputs: { themeToggleClicked: "themeToggleClicked" }, ngContentSelectors: _c1, decls: 10, vars: 2, consts: [[1, "app-header", "main-header"], [1, "header-inner"], [1, "header-left"], [1, "header-right", "header-actions"], ["type", "button", 1, "theme-toggle-btn", "icon-action-btn", 3, "click", "title"]], template: function KitHeaderBarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef(_c0);
            i0.ɵɵdomElementStart(0, "header", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵprojection(3);
            i0.ɵɵdomElementEnd();
            i0.ɵɵprojection(4, 1);
            i0.ɵɵdomElementStart(5, "div", 3);
            i0.ɵɵprojection(6, 2);
            i0.ɵɵdomElementStart(7, "button", 4);
            i0.ɵɵdomListener("click", function KitHeaderBarComponent_Template_button_click_7_listener() { return ctx.themeToggleClicked.emit(); });
            i0.ɵɵprojection(8, 3);
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵprojection(9, 4);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵdomProperty("title", ctx.themeAriaLabel());
            i0.ɵɵattribute("aria-label", ctx.themeAriaLabel());
        } }, dependencies: [CommonModule], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitHeaderBarComponent, [{
        type: Component,
        args: [{
                selector: 'kit-header-bar',
                standalone: true,
                imports: [CommonModule],
                encapsulation: ViewEncapsulation.None,
                template: `
    <header class="app-header main-header">
      <div class="header-inner">
        <div class="header-left">
          <ng-content select="[headerBrand]" />
        </div>

        <ng-content select="[headerCenter]" />

        <div class="header-right header-actions">
          <ng-content select="[headerActions]" />
          <button
            type="button"
            class="theme-toggle-btn icon-action-btn"
            (click)="themeToggleClicked.emit()"
            [attr.aria-label]="themeAriaLabel()"
            [title]="themeAriaLabel()"
          >
            <ng-content select="[headerThemeIcon]" />
          </button>
        </div>
      </div>
      <ng-content select="[headerTrim]" />
    </header>
  `,
            }]
    }], null, { themeAriaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "themeAriaLabel", required: false }] }], themeToggleClicked: [{ type: i0.Output, args: ["themeToggleClicked"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitHeaderBarComponent, { className: "KitHeaderBarComponent", filePath: "header-bar.component.ts", lineNumber: 40 }); })();
