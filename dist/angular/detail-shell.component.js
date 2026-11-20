import { ChangeDetectionStrategy, Component, ViewEncapsulation, input, output, } from '@angular/core';
import { KitIconComponent } from './icon.component.js';
import * as i0 from "@angular/core";
const _c0 = [[["", "detailActions", ""]], [["", "detailHero", ""]], "*", [["", "detailSidebar", ""]]];
const _c1 = ["[detailActions]", "[detailHero]", "*", "[detailSidebar]"];
function KitDetailShellComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 12);
    i0.ɵɵlistener("click", function KitDetailShellComponent_Conditional_3_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onBackClick($event)); });
    i0.ɵɵelement(1, "kit-icon", 13);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("href", ctx, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", 18);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.backLabel());
} }
function KitDetailShellComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 14);
    i0.ɵɵlistener("click", function KitDetailShellComponent_Conditional_4_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onBackClick($event)); });
    i0.ɵɵelement(1, "kit-icon", 13);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", 18);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.backLabel());
} }
function KitDetailShellComponent_Conditional_5_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.code());
} }
function KitDetailShellComponent_Conditional_5_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.title());
} }
function KitDetailShellComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵconditionalCreate(1, KitDetailShellComponent_Conditional_5_Conditional_1_Template, 2, 1, "span", 15);
    i0.ɵɵconditionalCreate(2, KitDetailShellComponent_Conditional_5_Conditional_2_Template, 2, 1, "span", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.code() ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.title() ? 2 : -1);
} }
function KitDetailShellComponent_Conditional_8_Conditional_1_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 19);
    i0.ɵɵlistener("click", function KitDetailShellComponent_Conditional_8_Conditional_1_Conditional_0_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.onPagerClick($event, "prev")); });
    i0.ɵɵelement(1, "kit-icon", 20);
    i0.ɵɵelementStart(2, "span", 21);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prev_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("href", prev_r5.href, i0.ɵɵsanitizeUrl)("title", prev_r5.sublabel ? prev_r5.label + " (" + prev_r5.sublabel + ")" : prev_r5.label);
    i0.ɵɵattribute("aria-label", prev_r5.ariaLabel || "Previous: " + prev_r5.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", 16);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(prev_r5.label);
} }
function KitDetailShellComponent_Conditional_8_Conditional_1_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵlistener("click", function KitDetailShellComponent_Conditional_8_Conditional_1_Conditional_1_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.onPagerClick($event, "prev")); });
    i0.ɵɵelement(1, "kit-icon", 20);
    i0.ɵɵelementStart(2, "span", 21);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prev_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", prev_r5.sublabel ? prev_r5.label + " (" + prev_r5.sublabel + ")" : prev_r5.label);
    i0.ɵɵattribute("aria-label", prev_r5.ariaLabel || "Previous: " + prev_r5.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", 16);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(prev_r5.label);
} }
function KitDetailShellComponent_Conditional_8_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, KitDetailShellComponent_Conditional_8_Conditional_1_Conditional_0_Template, 4, 5, "a", 17)(1, KitDetailShellComponent_Conditional_8_Conditional_1_Conditional_1_Template, 4, 4, "button", 18);
} if (rf & 2) {
    i0.ɵɵconditional(ctx.href ? 0 : 1);
} }
function KitDetailShellComponent_Conditional_8_Conditional_2_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 25);
    i0.ɵɵlistener("click", function KitDetailShellComponent_Conditional_8_Conditional_2_Conditional_0_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.onPagerClick($event, "next")); });
    i0.ɵɵelementStart(1, "span", 21);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "kit-icon", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const next_r8 = i0.ɵɵnextContext();
    i0.ɵɵproperty("href", next_r8.href, i0.ɵɵsanitizeUrl)("title", next_r8.sublabel ? next_r8.label + " (" + next_r8.sublabel + ")" : next_r8.label);
    i0.ɵɵattribute("aria-label", next_r8.ariaLabel || "Next: " + next_r8.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(next_r8.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", 16);
} }
function KitDetailShellComponent_Conditional_8_Conditional_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 27);
    i0.ɵɵlistener("click", function KitDetailShellComponent_Conditional_8_Conditional_2_Conditional_1_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.onPagerClick($event, "next")); });
    i0.ɵɵelementStart(1, "span", 21);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "kit-icon", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const next_r8 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", next_r8.sublabel ? next_r8.label + " (" + next_r8.sublabel + ")" : next_r8.label);
    i0.ɵɵattribute("aria-label", next_r8.ariaLabel || "Next: " + next_r8.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(next_r8.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", 16);
} }
function KitDetailShellComponent_Conditional_8_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, KitDetailShellComponent_Conditional_8_Conditional_2_Conditional_0_Template, 4, 5, "a", 23)(1, KitDetailShellComponent_Conditional_8_Conditional_2_Conditional_1_Template, 4, 4, "button", 24);
} if (rf & 2) {
    i0.ɵɵconditional(ctx.href ? 0 : 1);
} }
function KitDetailShellComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵconditionalCreate(1, KitDetailShellComponent_Conditional_8_Conditional_1_Template, 2, 1);
    i0.ɵɵconditionalCreate(2, KitDetailShellComponent_Conditional_8_Conditional_2_Template, 2, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.prevItem()) ? 1 : -1, tmp_1_0);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_2_0 = ctx_r1.nextItem()) ? 2 : -1, tmp_2_0);
} }
export function shouldHandleDetailShellKeyNav(event, hasOpenDialog = false) {
    if (hasOpenDialog ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey) {
        return null;
    }
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
        return null;
    }
    const target = event.target;
    if (target) {
        const tag = (target.tagName ?? '').toUpperCase();
        if (tag === 'INPUT' ||
            tag === 'TEXTAREA' ||
            tag === 'SELECT' ||
            target.isContentEditable) {
            return null;
        }
        if (typeof target.closest === 'function' &&
            target.closest('[role="tablist"]')) {
            return null;
        }
    }
    return event.key === 'ArrowLeft' ? 'prev' : 'next';
}
/**
 * Reusable detail-page scaffold with sticky sub-navigation, back link/button,
 * optional Previous/Next item pager with keyboard navigation, hero banner slot,
 * primary content slot, and optional desktop sidebar slot.
 */
export class KitDetailShellComponent {
    constructor() {
        this.backLabel = input('Back', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "backLabel" }] : /* istanbul ignore next */ []));
        this.backHref = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "backHref" }] : /* istanbul ignore next */ []));
        this.interceptBackClick = input(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "interceptBackClick" }] : /* istanbul ignore next */ []));
        this.interceptPagerClick = input(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "interceptPagerClick" }] : /* istanbul ignore next */ []));
        this.title = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
        this.code = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "code" }] : /* istanbul ignore next */ []));
        this.prevItem = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "prevItem" }] : /* istanbul ignore next */ []));
        this.nextItem = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "nextItem" }] : /* istanbul ignore next */ []));
        this.enableKeyboardNav = input(true, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "enableKeyboardNav" }] : /* istanbul ignore next */ []));
        this.maxWidth = input('1200px', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "maxWidth" }] : /* istanbul ignore next */ []));
        this.backClicked = output();
        this.prevClicked = output();
        this.nextClicked = output();
    }
    onBackClick(event) {
        if (this.interceptBackClick() && this.backHref()) {
            event.preventDefault();
        }
        this.backClicked.emit(event);
    }
    onPagerClick(event, direction) {
        if (this.interceptPagerClick()) {
            event.preventDefault();
        }
        if (direction === 'prev') {
            this.prevClicked.emit(event);
        }
        else {
            this.nextClicked.emit(event);
        }
    }
    onDocumentKeydown(event) {
        if (!this.enableKeyboardNav())
            return;
        const hasOpenDialog = typeof document !== 'undefined' &&
            Boolean(document.querySelector('dialog[open]'));
        const dir = shouldHandleDetailShellKeyNav(event, hasOpenDialog);
        if (dir === 'prev' && this.prevItem()) {
            event.preventDefault();
            this.prevClicked.emit(event);
        }
        else if (dir === 'next' && this.nextItem()) {
            event.preventDefault();
            this.nextClicked.emit(event);
        }
    }
    static { this.ɵfac = function KitDetailShellComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitDetailShellComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitDetailShellComponent, selectors: [["kit-detail-shell"]], hostBindings: function KitDetailShellComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keydown", function KitDetailShellComponent_keydown_HostBindingHandler($event) { return ctx.onDocumentKeydown($event); }, i0.ɵɵresolveDocument);
        } }, inputs: { backLabel: [1, "backLabel"], backHref: [1, "backHref"], interceptBackClick: [1, "interceptBackClick"], interceptPagerClick: [1, "interceptPagerClick"], title: [1, "title"], code: [1, "code"], prevItem: [1, "prevItem"], nextItem: [1, "nextItem"], enableKeyboardNav: [1, "enableKeyboardNav"], maxWidth: [1, "maxWidth"] }, outputs: { backClicked: "backClicked", prevClicked: "prevClicked", nextClicked: "nextClicked" }, ngContentSelectors: _c1, decls: 16, vars: 5, consts: [[1, "kit-detail-shell"], ["aria-label", "Detail navigation", 1, "kit-detail-nav"], [1, "kit-detail-nav-left"], ["data-testid", "kit-detail-back-link", 1, "kit-detail-back", "state-layer", 3, "href"], ["type", "button", "data-testid", "kit-detail-back-btn", 1, "kit-detail-back", "state-layer"], [1, "kit-detail-nav-center"], [1, "kit-detail-nav-right"], ["role", "group", "aria-label", "Adjacent items", 1, "kit-detail-pager"], [1, "kit-detail-hero"], [1, "kit-detail-body"], [1, "kit-detail-main"], [1, "kit-detail-sidebar"], ["data-testid", "kit-detail-back-link", 1, "kit-detail-back", "state-layer", 3, "click", "href"], ["name", "arrow-left", 3, "size"], ["type", "button", "data-testid", "kit-detail-back-btn", 1, "kit-detail-back", "state-layer", 3, "click"], [1, "kit-detail-nav-code"], [1, "kit-detail-nav-title"], ["data-testid", "kit-detail-prev-btn", 1, "kit-detail-pager-btn", "state-layer", 3, "href", "title"], ["type", "button", "data-testid", "kit-detail-prev-btn", 1, "kit-detail-pager-btn", "state-layer", 3, "title"], ["data-testid", "kit-detail-prev-btn", 1, "kit-detail-pager-btn", "state-layer", 3, "click", "href", "title"], ["name", "chevron-left", 3, "size"], [1, "kit-detail-pager-label"], ["type", "button", "data-testid", "kit-detail-prev-btn", 1, "kit-detail-pager-btn", "state-layer", 3, "click", "title"], ["data-testid", "kit-detail-next-btn", 1, "kit-detail-pager-btn", "state-layer", 3, "href", "title"], ["type", "button", "data-testid", "kit-detail-next-btn", 1, "kit-detail-pager-btn", "state-layer", 3, "title"], ["data-testid", "kit-detail-next-btn", 1, "kit-detail-pager-btn", "state-layer", 3, "click", "href", "title"], ["name", "chevron-right", 3, "size"], ["type", "button", "data-testid", "kit-detail-next-btn", 1, "kit-detail-pager-btn", "state-layer", 3, "click", "title"]], template: function KitDetailShellComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef(_c0);
            i0.ɵɵelementStart(0, "div", 0)(1, "nav", 1)(2, "div", 2);
            i0.ɵɵconditionalCreate(3, KitDetailShellComponent_Conditional_3_Template, 4, 3, "a", 3)(4, KitDetailShellComponent_Conditional_4_Template, 4, 2, "button", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(5, KitDetailShellComponent_Conditional_5_Template, 3, 2, "div", 5);
            i0.ɵɵelementStart(6, "div", 6);
            i0.ɵɵprojection(7);
            i0.ɵɵconditionalCreate(8, KitDetailShellComponent_Conditional_8_Template, 3, 2, "div", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 8);
            i0.ɵɵprojection(10, 1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 9)(12, "div", 10);
            i0.ɵɵprojection(13, 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "aside", 11);
            i0.ɵɵprojection(15, 3);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            let tmp_1_0;
            i0.ɵɵstyleProp("--%NS%kit-detail-max-width", ctx.maxWidth());
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((tmp_1_0 = ctx.backHref()) ? 3 : 4, tmp_1_0);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.title() || ctx.code() ? 5 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.prevItem() || ctx.nextItem() ? 8 : -1);
        } }, dependencies: [KitIconComponent], styles: ["\n      .kit-detail-shell {\n        width: 100%;\n        max-width: var(--%NS%kit-detail-max-width, 1200px);\n        margin: 0 auto;\n      }\n\n      .kit-detail-nav {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        flex-wrap: wrap;\n        gap: 12px;\n        margin-bottom: 20px;\n        padding: 10px 14px;\n        border-radius: var(--%NS%kit-radius-md);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        background: var(--%NS%kit-surface-container);\n      }\n\n      .kit-detail-nav-left,\n      .kit-detail-nav-right,\n      .kit-detail-nav-center {\n        display: flex;\n        align-items: center;\n        gap: 10px;\n        min-width: 0;\n      }\n\n      .kit-detail-nav-right {\n        flex-wrap: wrap;\n        justify-content: flex-end;\n      }\n\n      .kit-detail-back {\n        display: inline-flex;\n        align-items: center;\n        gap: 8px;\n        padding: 7px 14px;\n        border-radius: var(--%NS%kit-radius-full);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        background: var(--%NS%kit-surface-container-low);\n        color: var(--%NS%kit-on-surface);\n        font-family: var(--%NS%kit-font-sans);\n        font-size: 0.875rem;\n        font-weight: 600;\n        text-decoration: none;\n        cursor: pointer;\n      }\n\n      .kit-detail-back:hover {\n        border-color: var(--%NS%kit-primary);\n        color: var(--%NS%kit-primary);\n      }\n\n      .kit-detail-nav-code {\n        font-family: var(--%NS%kit-font-mono);\n        font-size: 0.8rem;\n        font-weight: 700;\n        color: var(--%NS%kit-on-surface-variant);\n      }\n\n      .kit-detail-nav-title {\n        font-family: var(--%NS%kit-font-heading);\n        font-size: 1rem;\n        font-weight: 700;\n        color: var(--%NS%kit-on-surface);\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n\n      .kit-detail-pager {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n      }\n\n      .kit-detail-pager-btn {\n        display: inline-flex;\n        align-items: center;\n        gap: 4px;\n        padding: 6px 12px;\n        border-radius: var(--%NS%kit-radius-full);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        background: var(--%NS%kit-surface-container-low);\n        color: var(--%NS%kit-on-surface);\n        font-family: var(--%NS%kit-font-sans);\n        font-size: 0.8rem;\n        font-weight: 600;\n        text-decoration: none;\n        cursor: pointer;\n      }\n\n      .kit-detail-pager-btn:hover {\n        border-color: var(--%NS%kit-primary);\n        color: var(--%NS%kit-primary);\n      }\n\n      .kit-detail-back:focus-visible,\n      .kit-detail-pager-btn:focus-visible {\n        outline: 2.5px solid var(--%NS%kit-primary);\n        outline-offset: 2px;\n      }\n\n      .kit-detail-hero {\n        margin-bottom: 20px;\n      }\n\n      .kit-detail-hero:empty {\n        display: none;\n      }\n\n      .kit-detail-body {\n        display: grid;\n        grid-template-columns: minmax(0, 1fr);\n        gap: 20px;\n        align-items: start;\n      }\n\n      .kit-detail-body:has(.kit-detail-sidebar:not(:empty)) {\n        grid-template-columns: minmax(0, 1fr) 340px;\n      }\n\n      .kit-detail-main {\n        display: flex;\n        flex-direction: column;\n        gap: 20px;\n        min-width: 0;\n      }\n\n      .kit-detail-sidebar {\n        display: flex;\n        flex-direction: column;\n        gap: 20px;\n        min-width: 0;\n      }\n\n      .kit-detail-sidebar:empty {\n        display: none;\n      }\n\n      @media (max-width: 960px) {\n        .kit-detail-body:has(.kit-detail-sidebar:not(:empty)) {\n          grid-template-columns: minmax(0, 1fr);\n        }\n      }\n\n      @media (max-width: 640px) {\n        .kit-detail-nav {\n          padding: 8px 10px;\n        }\n        .kit-detail-pager-label {\n          max-width: 96px;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n        }\n      }\n    "], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitDetailShellComponent, [{
        type: Component,
        args: [{ selector: 'kit-detail-shell', standalone: true, imports: [KitIconComponent], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                    '(document:keydown)': 'onDocumentKeydown($event)',
                }, template: `
    <div class="kit-detail-shell" [style.--kit-detail-max-width]="maxWidth()">
      <nav class="kit-detail-nav" aria-label="Detail navigation">
        <div class="kit-detail-nav-left">
          @if (backHref(); as href) {
            <a
              [href]="href"
              class="kit-detail-back state-layer"
              data-testid="kit-detail-back-link"
              (click)="onBackClick($event)"
            >
              <kit-icon name="arrow-left" [size]="18" />
              <span>{{ backLabel() }}</span>
            </a>
          } @else {
            <button
              type="button"
              class="kit-detail-back state-layer"
              data-testid="kit-detail-back-btn"
              (click)="onBackClick($event)"
            >
              <kit-icon name="arrow-left" [size]="18" />
              <span>{{ backLabel() }}</span>
            </button>
          }
        </div>

        @if (title() || code()) {
          <div class="kit-detail-nav-center">
            @if (code()) {
              <span class="kit-detail-nav-code">{{ code() }}</span>
            }
            @if (title()) {
              <span class="kit-detail-nav-title">{{ title() }}</span>
            }
          </div>
        }

        <div class="kit-detail-nav-right">
          <ng-content select="[detailActions]" />

          @if (prevItem() || nextItem()) {
            <div
              class="kit-detail-pager"
              role="group"
              aria-label="Adjacent items"
            >
              @if (prevItem(); as prev) {
                @if (prev.href) {
                  <a
                    [href]="prev.href"
                    class="kit-detail-pager-btn state-layer"
                    data-testid="kit-detail-prev-btn"
                    [attr.aria-label]="
                      prev.ariaLabel || 'Previous: ' + prev.label
                    "
                    [title]="
                      prev.sublabel
                        ? prev.label + ' (' + prev.sublabel + ')'
                        : prev.label
                    "
                    (click)="onPagerClick($event, 'prev')"
                  >
                    <kit-icon name="chevron-left" [size]="16" />
                    <span class="kit-detail-pager-label">{{ prev.label }}</span>
                  </a>
                } @else {
                  <button
                    type="button"
                    class="kit-detail-pager-btn state-layer"
                    data-testid="kit-detail-prev-btn"
                    [attr.aria-label]="
                      prev.ariaLabel || 'Previous: ' + prev.label
                    "
                    [title]="
                      prev.sublabel
                        ? prev.label + ' (' + prev.sublabel + ')'
                        : prev.label
                    "
                    (click)="onPagerClick($event, 'prev')"
                  >
                    <kit-icon name="chevron-left" [size]="16" />
                    <span class="kit-detail-pager-label">{{ prev.label }}</span>
                  </button>
                }
              }

              @if (nextItem(); as next) {
                @if (next.href) {
                  <a
                    [href]="next.href"
                    class="kit-detail-pager-btn state-layer"
                    data-testid="kit-detail-next-btn"
                    [attr.aria-label]="next.ariaLabel || 'Next: ' + next.label"
                    [title]="
                      next.sublabel
                        ? next.label + ' (' + next.sublabel + ')'
                        : next.label
                    "
                    (click)="onPagerClick($event, 'next')"
                  >
                    <span class="kit-detail-pager-label">{{ next.label }}</span>
                    <kit-icon name="chevron-right" [size]="16" />
                  </a>
                } @else {
                  <button
                    type="button"
                    class="kit-detail-pager-btn state-layer"
                    data-testid="kit-detail-next-btn"
                    [attr.aria-label]="next.ariaLabel || 'Next: ' + next.label"
                    [title]="
                      next.sublabel
                        ? next.label + ' (' + next.sublabel + ')'
                        : next.label
                    "
                    (click)="onPagerClick($event, 'next')"
                  >
                    <span class="kit-detail-pager-label">{{ next.label }}</span>
                    <kit-icon name="chevron-right" [size]="16" />
                  </button>
                }
              }
            </div>
          }
        </div>
      </nav>

      <div class="kit-detail-hero">
        <ng-content select="[detailHero]" />
      </div>

      <div class="kit-detail-body">
        <div class="kit-detail-main">
          <ng-content />
        </div>
        <aside class="kit-detail-sidebar">
          <ng-content select="[detailSidebar]" />
        </aside>
      </div>
    </div>
  `, styles: ["\n      .kit-detail-shell {\n        width: 100%;\n        max-width: var(--kit-detail-max-width, 1200px);\n        margin: 0 auto;\n      }\n\n      .kit-detail-nav {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        flex-wrap: wrap;\n        gap: 12px;\n        margin-bottom: 20px;\n        padding: 10px 14px;\n        border-radius: var(--kit-radius-md);\n        border: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container);\n      }\n\n      .kit-detail-nav-left,\n      .kit-detail-nav-right,\n      .kit-detail-nav-center {\n        display: flex;\n        align-items: center;\n        gap: 10px;\n        min-width: 0;\n      }\n\n      .kit-detail-nav-right {\n        flex-wrap: wrap;\n        justify-content: flex-end;\n      }\n\n      .kit-detail-back {\n        display: inline-flex;\n        align-items: center;\n        gap: 8px;\n        padding: 7px 14px;\n        border-radius: var(--kit-radius-full);\n        border: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container-low);\n        color: var(--kit-on-surface);\n        font-family: var(--kit-font-sans);\n        font-size: 0.875rem;\n        font-weight: 600;\n        text-decoration: none;\n        cursor: pointer;\n      }\n\n      .kit-detail-back:hover {\n        border-color: var(--kit-primary);\n        color: var(--kit-primary);\n      }\n\n      .kit-detail-nav-code {\n        font-family: var(--kit-font-mono);\n        font-size: 0.8rem;\n        font-weight: 700;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-detail-nav-title {\n        font-family: var(--kit-font-heading);\n        font-size: 1rem;\n        font-weight: 700;\n        color: var(--kit-on-surface);\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n\n      .kit-detail-pager {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n      }\n\n      .kit-detail-pager-btn {\n        display: inline-flex;\n        align-items: center;\n        gap: 4px;\n        padding: 6px 12px;\n        border-radius: var(--kit-radius-full);\n        border: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container-low);\n        color: var(--kit-on-surface);\n        font-family: var(--kit-font-sans);\n        font-size: 0.8rem;\n        font-weight: 600;\n        text-decoration: none;\n        cursor: pointer;\n      }\n\n      .kit-detail-pager-btn:hover {\n        border-color: var(--kit-primary);\n        color: var(--kit-primary);\n      }\n\n      .kit-detail-back:focus-visible,\n      .kit-detail-pager-btn:focus-visible {\n        outline: 2.5px solid var(--kit-primary);\n        outline-offset: 2px;\n      }\n\n      .kit-detail-hero {\n        margin-bottom: 20px;\n      }\n\n      .kit-detail-hero:empty {\n        display: none;\n      }\n\n      .kit-detail-body {\n        display: grid;\n        grid-template-columns: minmax(0, 1fr);\n        gap: 20px;\n        align-items: start;\n      }\n\n      .kit-detail-body:has(.kit-detail-sidebar:not(:empty)) {\n        grid-template-columns: minmax(0, 1fr) 340px;\n      }\n\n      .kit-detail-main {\n        display: flex;\n        flex-direction: column;\n        gap: 20px;\n        min-width: 0;\n      }\n\n      .kit-detail-sidebar {\n        display: flex;\n        flex-direction: column;\n        gap: 20px;\n        min-width: 0;\n      }\n\n      .kit-detail-sidebar:empty {\n        display: none;\n      }\n\n      @media (max-width: 960px) {\n        .kit-detail-body:has(.kit-detail-sidebar:not(:empty)) {\n          grid-template-columns: minmax(0, 1fr);\n        }\n      }\n\n      @media (max-width: 640px) {\n        .kit-detail-nav {\n          padding: 8px 10px;\n        }\n        .kit-detail-pager-label {\n          max-width: 96px;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n        }\n      }\n    "] }]
    }], null, { backLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "backLabel", required: false }] }], backHref: [{ type: i0.Input, args: [{ isSignal: true, alias: "backHref", required: false }] }], interceptBackClick: [{ type: i0.Input, args: [{ isSignal: true, alias: "interceptBackClick", required: false }] }], interceptPagerClick: [{ type: i0.Input, args: [{ isSignal: true, alias: "interceptPagerClick", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], code: [{ type: i0.Input, args: [{ isSignal: true, alias: "code", required: false }] }], prevItem: [{ type: i0.Input, args: [{ isSignal: true, alias: "prevItem", required: false }] }], nextItem: [{ type: i0.Input, args: [{ isSignal: true, alias: "nextItem", required: false }] }], enableKeyboardNav: [{ type: i0.Input, args: [{ isSignal: true, alias: "enableKeyboardNav", required: false }] }], maxWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxWidth", required: false }] }], backClicked: [{ type: i0.Output, args: ["backClicked"] }], prevClicked: [{ type: i0.Output, args: ["prevClicked"] }], nextClicked: [{ type: i0.Output, args: ["nextClicked"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitDetailShellComponent, { className: "KitDetailShellComponent", filePath: "detail-shell.component.ts", lineNumber: 383 }); })();
