import { ChangeDetectionStrategy, Component, ViewEncapsulation, input, output, } from '@angular/core';
import * as i0 from "@angular/core";
function KitPublicBannerComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p", 4);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.bio());
} }
function KitPublicBannerComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "a", 6);
    i0.ɵɵdomListener("click", function KitPublicBannerComponent_Conditional_9_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onBackClick($event)); });
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵdomProperty("href", ctx_r0.backHref(), i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.backLabel(), " ");
} }
export class KitPublicBannerComponent {
    constructor() {
        this.badgeLabel = input('Public Collection', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "badgeLabel" }] : /* istanbul ignore next */ []));
        this.title = input.required(/* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
        this.username = input.required(/* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "username" }] : /* istanbul ignore next */ []));
        this.bio = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "bio" }] : /* istanbul ignore next */ []));
        this.showBackLink = input(true, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "showBackLink" }] : /* istanbul ignore next */ []));
        this.backHref = input('/', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "backHref" }] : /* istanbul ignore next */ []));
        this.backLabel = input('← My Collection', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "backLabel" }] : /* istanbul ignore next */ []));
        this.interceptBackClick = input(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "interceptBackClick" }] : /* istanbul ignore next */ []));
        this.backClicked = output();
    }
    onBackClick(event) {
        if (this.interceptBackClick()) {
            event.preventDefault();
        }
        this.backClicked.emit(event);
    }
    static { this.ɵfac = function KitPublicBannerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitPublicBannerComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitPublicBannerComponent, selectors: [["kit-public-banner"]], inputs: { badgeLabel: [1, "badgeLabel"], title: [1, "title"], username: [1, "username"], bio: [1, "bio"], showBackLink: [1, "showBackLink"], backHref: [1, "backHref"], backLabel: [1, "backLabel"], interceptBackClick: [1, "interceptBackClick"] }, outputs: { backClicked: "backClicked" }, decls: 10, vars: 5, consts: [[1, "public-collection-banner", "kit-public-banner"], [1, "public-banner-info"], [1, "public-badge"], [1, "public-handle"], [1, "public-bio"], [1, "my-dex-link", "state-layer", 3, "href"], [1, "my-dex-link", "state-layer", 3, "click", "href"]], template: function KitPublicBannerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵtext(3);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(4, "h2");
            i0.ɵɵtext(5);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(6, "span", 3);
            i0.ɵɵtext(7);
            i0.ɵɵdomElementEnd();
            i0.ɵɵconditionalCreate(8, KitPublicBannerComponent_Conditional_8_Template, 2, 1, "p", 4);
            i0.ɵɵdomElementEnd();
            i0.ɵɵconditionalCreate(9, KitPublicBannerComponent_Conditional_9_Template, 2, 2, "a", 5);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.badgeLabel());
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.title());
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("@", ctx.username());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.bio() ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showBackLink() ? 9 : -1);
        } }, styles: ["\n      .public-collection-banner {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        flex-wrap: wrap;\n        gap: 16px;\n        padding: 16px 20px;\n        margin-bottom: 20px;\n        border-radius: var(--%NS%kit-radius-lg);\n        background: var(--%NS%kit-surface-container);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        color: var(--%NS%kit-on-surface);\n      }\n\n      .public-collection-banner .public-banner-info {\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n        min-width: 0;\n      }\n\n      .public-collection-banner .public-badge {\n        display: inline-flex;\n        align-self: flex-start;\n        padding: 3px 10px;\n        border-radius: var(--%NS%kit-radius-full);\n        background: var(--%NS%kit-primary-container);\n        color: var(--%NS%kit-on-primary-container);\n        font-size: 0.72rem;\n        font-weight: 700;\n        letter-spacing: 0.06em;\n        text-transform: uppercase;\n      }\n\n      .public-collection-banner h2 {\n        margin: 2px 0 0;\n        font-family: var(--%NS%kit-font-heading);\n        font-size: 1.35rem;\n        font-weight: 700;\n        line-height: 1.2;\n        color: var(--%NS%kit-on-surface);\n      }\n\n      .public-collection-banner .public-handle {\n        font-family: var(--%NS%kit-font-mono);\n        font-size: 0.85rem;\n        font-weight: 600;\n        color: var(--%NS%kit-primary);\n      }\n\n      .public-collection-banner .public-bio {\n        margin: 4px 0 0;\n        font-size: 0.9rem;\n        line-height: 1.45;\n        color: var(--%NS%kit-on-surface-variant);\n        max-width: 65ch;\n      }\n\n      .public-collection-banner .my-dex-link {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        padding: 9px 16px;\n        border-radius: var(--%NS%kit-radius-full);\n        background: var(--%NS%kit-primary);\n        color: var(--%NS%kit-on-primary);\n        font-size: 0.875rem;\n        font-weight: 600;\n        text-decoration: none;\n        white-space: nowrap;\n        transition: opacity 0.15s ease;\n      }\n\n      .public-collection-banner .my-dex-link:hover {\n        opacity: 0.92;\n      }\n    "], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitPublicBannerComponent, [{
        type: Component,
        args: [{ selector: 'kit-public-banner', standalone: true, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="public-collection-banner kit-public-banner">
      <div class="public-banner-info">
        <span class="public-badge">{{ badgeLabel() }}</span>
        <h2>{{ title() }}</h2>
        <span class="public-handle">&#64;{{ username() }}</span>
        @if (bio()) {
          <p class="public-bio">{{ bio() }}</p>
        }
      </div>
      @if (showBackLink()) {
        <a
          [href]="backHref()"
          class="my-dex-link state-layer"
          (click)="onBackClick($event)"
        >
          {{ backLabel() }}
        </a>
      }
    </div>
  `, styles: ["\n      .public-collection-banner {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        flex-wrap: wrap;\n        gap: 16px;\n        padding: 16px 20px;\n        margin-bottom: 20px;\n        border-radius: var(--kit-radius-lg);\n        background: var(--kit-surface-container);\n        border: 1px solid var(--kit-outline-variant);\n        color: var(--kit-on-surface);\n      }\n\n      .public-collection-banner .public-banner-info {\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n        min-width: 0;\n      }\n\n      .public-collection-banner .public-badge {\n        display: inline-flex;\n        align-self: flex-start;\n        padding: 3px 10px;\n        border-radius: var(--kit-radius-full);\n        background: var(--kit-primary-container);\n        color: var(--kit-on-primary-container);\n        font-size: 0.72rem;\n        font-weight: 700;\n        letter-spacing: 0.06em;\n        text-transform: uppercase;\n      }\n\n      .public-collection-banner h2 {\n        margin: 2px 0 0;\n        font-family: var(--kit-font-heading);\n        font-size: 1.35rem;\n        font-weight: 700;\n        line-height: 1.2;\n        color: var(--kit-on-surface);\n      }\n\n      .public-collection-banner .public-handle {\n        font-family: var(--kit-font-mono);\n        font-size: 0.85rem;\n        font-weight: 600;\n        color: var(--kit-primary);\n      }\n\n      .public-collection-banner .public-bio {\n        margin: 4px 0 0;\n        font-size: 0.9rem;\n        line-height: 1.45;\n        color: var(--kit-on-surface-variant);\n        max-width: 65ch;\n      }\n\n      .public-collection-banner .my-dex-link {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        padding: 9px 16px;\n        border-radius: var(--kit-radius-full);\n        background: var(--kit-primary);\n        color: var(--kit-on-primary);\n        font-size: 0.875rem;\n        font-weight: 600;\n        text-decoration: none;\n        white-space: nowrap;\n        transition: opacity 0.15s ease;\n      }\n\n      .public-collection-banner .my-dex-link:hover {\n        opacity: 0.92;\n      }\n    "] }]
    }], null, { badgeLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "badgeLabel", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: true }] }], username: [{ type: i0.Input, args: [{ isSignal: true, alias: "username", required: true }] }], bio: [{ type: i0.Input, args: [{ isSignal: true, alias: "bio", required: false }] }], showBackLink: [{ type: i0.Input, args: [{ isSignal: true, alias: "showBackLink", required: false }] }], backHref: [{ type: i0.Input, args: [{ isSignal: true, alias: "backHref", required: false }] }], backLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "backLabel", required: false }] }], interceptBackClick: [{ type: i0.Input, args: [{ isSignal: true, alias: "interceptBackClick", required: false }] }], backClicked: [{ type: i0.Output, args: ["backClicked"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitPublicBannerComponent, { className: "KitPublicBannerComponent", filePath: "public-banner.component.ts", lineNumber: 116 }); })();
