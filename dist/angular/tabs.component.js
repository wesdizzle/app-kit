import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, inject, input, output, } from '@angular/core';
import { KitIconComponent } from './icon.component.js';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function KitTabsComponent_For_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "kit-icon", 3);
} if (rf & 2) {
    const tab_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("name", tab_r2.icon)("size", 15);
} }
function KitTabsComponent_For_2_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tab_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(tab_r2.badge);
} }
function KitTabsComponent_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 2);
    i0.ɵɵlistener("click", function KitTabsComponent_For_2_Template_button_click_0_listener() { const tab_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.selectTab(tab_r2)); })("keydown", function KitTabsComponent_For_2_Template_button_keydown_0_listener($event) { const tab_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onTabKeydown($event, tab_r2.id)); });
    i0.ɵɵconditionalCreate(1, KitTabsComponent_For_2_Conditional_1_Template, 1, 2, "kit-icon", 3);
    i0.ɵɵelementStart(2, "span", 4);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, KitTabsComponent_For_2_Conditional_4_Template, 2, 1, "span", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", tab_r2.id === ctx_r2.activeTab());
    i0.ɵɵproperty("disabled", tab_r2.disabled ?? false);
    i0.ɵɵattribute("aria-selected", tab_r2.id === ctx_r2.activeTab())("tabindex", tab_r2.id === ctx_r2.activeTab() ? 0 : -1)("data-kit-tab-id", tab_r2.id)("data-testid", tab_r2.testId || null);
    i0.ɵɵadvance();
    i0.ɵɵconditional(tab_r2.icon ? 1 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(tab_r2.label);
    i0.ɵɵadvance();
    i0.ɵɵconditional(tab_r2.badge !== undefined && tab_r2.badge !== null && tab_r2.badge !== "" ? 4 : -1);
} }
export function getNextEnabledTabId(tabs, currentId, key) {
    const enabled = tabs.filter((t) => !t.disabled);
    if (enabled.length === 0)
        return null;
    if (key === 'Home') {
        return enabled[0].id;
    }
    if (key === 'End') {
        return enabled[enabled.length - 1].id;
    }
    if (key !== 'ArrowLeft' && key !== 'ArrowRight') {
        return null;
    }
    const idx = enabled.findIndex((t) => t.id === currentId);
    const startIdx = idx >= 0 ? idx : 0;
    const delta = key === 'ArrowRight' ? 1 : -1;
    const nextIdx = (startIdx + delta + enabled.length) % enabled.length;
    return enabled[nextIdx].id;
}
/**
 * Accessible Material 3 Expressive segmented pill/underline tab bar
 * with roving keyboard navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`).
 */
export class KitTabsComponent {
    constructor() {
        this.hostRef = inject(ElementRef, { optional: true });
        this.tabs = input.required(/* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "tabs" }] : /* istanbul ignore next */ []));
        this.activeTab = input.required(/* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "activeTab" }] : /* istanbul ignore next */ []));
        this.variant = input('pill', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
        this.ariaLabel = input('Tabs', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
        this.testId = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "testId" }] : /* istanbul ignore next */ []));
        this.tabChange = output();
    }
    selectTab(tab) {
        if (tab.disabled || tab.id === this.activeTab())
            return;
        this.tabChange.emit(tab.id);
    }
    onTabKeydown(event, currentId) {
        const nextId = getNextEnabledTabId(this.tabs(), currentId, event.key);
        if (!nextId)
            return;
        event.preventDefault();
        if (nextId !== this.activeTab()) {
            this.tabChange.emit(nextId);
        }
        const hostEl = this.hostRef?.nativeElement;
        if (hostEl && typeof hostEl.querySelectorAll === 'function') {
            const buttons = hostEl.querySelectorAll('button[role="tab"]');
            buttons.forEach((btn) => {
                if (btn.getAttribute('data-kit-tab-id') === nextId) {
                    btn.focus();
                }
            });
        }
    }
    static { this.ɵfac = function KitTabsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitTabsComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitTabsComponent, selectors: [["kit-tabs"]], inputs: { tabs: [1, "tabs"], activeTab: [1, "activeTab"], variant: [1, "variant"], ariaLabel: [1, "ariaLabel"], testId: [1, "testId"] }, outputs: { tabChange: "tabChange" }, decls: 3, vars: 4, consts: [["role", "tablist", 1, "kit-tabs"], ["type", "button", "role", "tab", 1, "kit-tab", "state-layer", 3, "active", "disabled"], ["type", "button", "role", "tab", 1, "kit-tab", "state-layer", 3, "click", "keydown", "disabled"], [3, "name", "size"], [1, "kit-tab-label"], [1, "kit-tab-badge"]], template: function KitTabsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵrepeaterCreate(1, KitTabsComponent_For_2_Template, 5, 10, "button", 1, _forTrack0);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("kit-tabs-underline", ctx.variant() === "underline");
            i0.ɵɵattribute("aria-label", ctx.ariaLabel())("data-testid", ctx.testId());
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.tabs());
        } }, dependencies: [KitIconComponent], styles: ["\n      .kit-tabs {\n        display: flex;\n        align-items: center;\n        gap: 6px;\n        padding: 4px;\n        border-radius: var(--%NS%kit-radius-full);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        background: var(--%NS%kit-surface-container-low);\n        overflow-x: auto;\n        scrollbar-width: none;\n        max-width: 100%;\n      }\n\n      .kit-tabs::-webkit-scrollbar {\n        display: none;\n      }\n\n      .kit-tabs.kit-tabs-underline {\n        border-radius: 0;\n        border: none;\n        border-bottom: 1px solid var(--%NS%kit-outline-variant);\n        background: transparent;\n        padding: 0;\n        gap: 4px;\n      }\n\n      .kit-tab {\n        display: inline-flex;\n        align-items: center;\n        gap: 7px;\n        padding: 7px 14px;\n        border-radius: var(--%NS%kit-radius-full);\n        border: 1px solid transparent;\n        background: transparent;\n        color: var(--%NS%kit-on-surface-variant);\n        font-family: var(--%NS%kit-font-sans);\n        font-size: 0.84rem;\n        font-weight: 600;\n        white-space: nowrap;\n        cursor: pointer;\n        transition:\n          background-color var(--%NS%kit-duration-fast) ease,\n          color var(--%NS%kit-duration-fast) ease,\n          border-color var(--%NS%kit-duration-fast) ease;\n      }\n\n      .kit-tab:hover:not(:disabled) {\n        color: var(--%NS%kit-on-surface);\n        background: var(--%NS%kit-surface-container-high);\n      }\n\n      .kit-tab.active {\n        background: var(--%NS%kit-primary-container);\n        color: var(--%NS%kit-on-primary-container);\n        border-color: color-mix(in srgb, var(--%NS%kit-primary) 35%, transparent);\n      }\n\n      .kit-tabs-underline .kit-tab {\n        border-radius: var(--%NS%kit-radius-xs) var(--%NS%kit-radius-xs) 0 0;\n        border: none;\n        border-bottom: 2.5px solid transparent;\n        padding: 9px 14px;\n      }\n\n      .kit-tabs-underline .kit-tab.active {\n        background: transparent;\n        color: var(--%NS%kit-primary);\n        border-bottom-color: var(--%NS%kit-primary);\n      }\n\n      .kit-tab:disabled {\n        opacity: 0.45;\n        cursor: not-allowed;\n      }\n\n      .kit-tab:focus-visible {\n        outline: 2.5px solid var(--%NS%kit-primary);\n        outline-offset: 2px;\n      }\n\n      .kit-tab-badge {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        padding: 1px 7px;\n        border-radius: var(--%NS%kit-radius-full);\n        background: var(--%NS%kit-surface-container);\n        color: var(--%NS%kit-on-surface-variant);\n        font-family: var(--%NS%kit-font-mono);\n        font-size: 0.72rem;\n        font-weight: 700;\n      }\n\n      .kit-tab.active .kit-tab-badge {\n        background: color-mix(in srgb, var(--%NS%kit-primary) 18%, transparent);\n        color: inherit;\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-tab {\n          transition: none;\n        }\n      }\n    "], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitTabsComponent, [{
        type: Component,
        args: [{ selector: 'kit-tabs', standalone: true, imports: [KitIconComponent], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div
      class="kit-tabs"
      [class.kit-tabs-underline]="variant() === 'underline'"
      role="tablist"
      [attr.aria-label]="ariaLabel()"
      [attr.data-testid]="testId()"
    >
      @for (tab of tabs(); track tab.id) {
        <button
          type="button"
          role="tab"
          class="kit-tab state-layer"
          [class.active]="tab.id === activeTab()"
          [attr.aria-selected]="tab.id === activeTab()"
          [attr.tabindex]="tab.id === activeTab() ? 0 : -1"
          [attr.data-kit-tab-id]="tab.id"
          [attr.data-testid]="tab.testId || null"
          [disabled]="tab.disabled ?? false"
          (click)="selectTab(tab)"
          (keydown)="onTabKeydown($event, tab.id)"
        >
          @if (tab.icon) {
            <kit-icon [name]="tab.icon" [size]="15" />
          }
          <span class="kit-tab-label">{{ tab.label }}</span>
          @if (
            tab.badge !== undefined && tab.badge !== null && tab.badge !== ''
          ) {
            <span class="kit-tab-badge">{{ tab.badge }}</span>
          }
        </button>
      }
    </div>
  `, styles: ["\n      .kit-tabs {\n        display: flex;\n        align-items: center;\n        gap: 6px;\n        padding: 4px;\n        border-radius: var(--kit-radius-full);\n        border: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container-low);\n        overflow-x: auto;\n        scrollbar-width: none;\n        max-width: 100%;\n      }\n\n      .kit-tabs::-webkit-scrollbar {\n        display: none;\n      }\n\n      .kit-tabs.kit-tabs-underline {\n        border-radius: 0;\n        border: none;\n        border-bottom: 1px solid var(--kit-outline-variant);\n        background: transparent;\n        padding: 0;\n        gap: 4px;\n      }\n\n      .kit-tab {\n        display: inline-flex;\n        align-items: center;\n        gap: 7px;\n        padding: 7px 14px;\n        border-radius: var(--kit-radius-full);\n        border: 1px solid transparent;\n        background: transparent;\n        color: var(--kit-on-surface-variant);\n        font-family: var(--kit-font-sans);\n        font-size: 0.84rem;\n        font-weight: 600;\n        white-space: nowrap;\n        cursor: pointer;\n        transition:\n          background-color var(--kit-duration-fast) ease,\n          color var(--kit-duration-fast) ease,\n          border-color var(--kit-duration-fast) ease;\n      }\n\n      .kit-tab:hover:not(:disabled) {\n        color: var(--kit-on-surface);\n        background: var(--kit-surface-container-high);\n      }\n\n      .kit-tab.active {\n        background: var(--kit-primary-container);\n        color: var(--kit-on-primary-container);\n        border-color: color-mix(in srgb, var(--kit-primary) 35%, transparent);\n      }\n\n      .kit-tabs-underline .kit-tab {\n        border-radius: var(--kit-radius-xs) var(--kit-radius-xs) 0 0;\n        border: none;\n        border-bottom: 2.5px solid transparent;\n        padding: 9px 14px;\n      }\n\n      .kit-tabs-underline .kit-tab.active {\n        background: transparent;\n        color: var(--kit-primary);\n        border-bottom-color: var(--kit-primary);\n      }\n\n      .kit-tab:disabled {\n        opacity: 0.45;\n        cursor: not-allowed;\n      }\n\n      .kit-tab:focus-visible {\n        outline: 2.5px solid var(--kit-primary);\n        outline-offset: 2px;\n      }\n\n      .kit-tab-badge {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        padding: 1px 7px;\n        border-radius: var(--kit-radius-full);\n        background: var(--kit-surface-container);\n        color: var(--kit-on-surface-variant);\n        font-family: var(--kit-font-mono);\n        font-size: 0.72rem;\n        font-weight: 700;\n      }\n\n      .kit-tab.active .kit-tab-badge {\n        background: color-mix(in srgb, var(--kit-primary) 18%, transparent);\n        color: inherit;\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-tab {\n          transition: none;\n        }\n      }\n    "] }]
    }], null, { tabs: [{ type: i0.Input, args: [{ isSignal: true, alias: "tabs", required: true }] }], activeTab: [{ type: i0.Input, args: [{ isSignal: true, alias: "activeTab", required: true }] }], variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], ariaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }], testId: [{ type: i0.Input, args: [{ isSignal: true, alias: "testId", required: false }] }], tabChange: [{ type: i0.Output, args: ["tabChange"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitTabsComponent, { className: "KitTabsComponent", filePath: "tabs.component.ts", lineNumber: 199 }); })();
