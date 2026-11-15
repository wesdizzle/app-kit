import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation, effect, input, output, signal, } from '@angular/core';
import { BottomSheetDragController } from './bottom-sheet-drag.js';
import { isKitReducedMotionPreferred } from './theme.service.js';
import * as i0 from "@angular/core";
const _c0 = ["dialogEl"];
const _c1 = ["*"];
function KitDialogSheetComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 3);
    i0.ɵɵdomElement(1, "div", 4);
    i0.ɵɵdomElementEnd();
} }
export function canAnimateKitDialogExit(dialog) {
    if (!dialog?.open || isKitReducedMotionPreferred()) {
        return false;
    }
    return (typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: no-preference)').matches);
}
/**
 * Shared accessible modal & mobile bottom-sheet wrapper built on native `<dialog>`.
 * Coordinates desktop spring-pop entrance, mobile bottom-sheet slide-up,
 * velocity-aware drag-to-dismiss, and non-blocking `.closing` exit animations.
 */
export class KitDialogSheetComponent {
    constructor() {
        this.isOpen = input(true, ...(ngDevMode ? [{ debugName: "isOpen" }] : /* istanbul ignore next */ []));
        this.ariaLabelledby = input(undefined, ...(ngDevMode ? [{ debugName: "ariaLabelledby" }] : /* istanbul ignore next */ []));
        this.ariaLabel = input(undefined, ...(ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
        this.maxWidth = input('500px', ...(ngDevMode ? [{ debugName: "maxWidth" }] : /* istanbul ignore next */ []));
        this.showHandle = input(true, ...(ngDevMode ? [{ debugName: "showHandle" }] : /* istanbul ignore next */ []));
        this.panelClass = input('', ...(ngDevMode ? [{ debugName: "panelClass" }] : /* istanbul ignore next */ []));
        this.closeDurationMs = input(170, ...(ngDevMode ? [{ debugName: "closeDurationMs" }] : /* istanbul ignore next */ []));
        this.closed = output();
        this.isClosing = signal(false, ...(ngDevMode ? [{ debugName: "isClosing" }] : /* istanbul ignore next */ []));
        this.dragController = new BottomSheetDragController();
        this.dismissFromDrag = () => this.requestClose();
        this.closeTimer = null;
        effect(() => {
            const open = this.isOpen();
            queueMicrotask(() => {
                const dialog = this.dialogEl?.nativeElement;
                if (!dialog)
                    return;
                if (open) {
                    this.clearCloseTimer();
                    this.isClosing.set(false);
                    if (!dialog.open && typeof dialog.showModal === 'function') {
                        try {
                            dialog.showModal();
                        }
                        catch {
                            dialog.setAttribute('open', '');
                        }
                    }
                    else if (!dialog.open) {
                        dialog.setAttribute('open', '');
                    }
                }
                else if (dialog.open) {
                    this.finalizeClose();
                }
            });
        });
    }
    ngOnDestroy() {
        this.clearCloseTimer();
        const dialog = this.dialogEl?.nativeElement;
        if (dialog?.open && typeof dialog.close === 'function') {
            try {
                dialog.close();
            }
            catch {
                // Ignore teardown errors in synthetic DOMs
            }
        }
    }
    requestClose() {
        this.dragController.reset();
        if (this.isClosing())
            return;
        const dialog = this.dialogEl?.nativeElement;
        if (canAnimateKitDialogExit(dialog)) {
            this.isClosing.set(true);
            this.clearCloseTimer();
            this.closeTimer = setTimeout(() => {
                this.closeTimer = null;
                this.finalizeClose();
                this.closed.emit();
            }, this.closeDurationMs());
            return;
        }
        this.finalizeClose();
        this.closed.emit();
    }
    onBackdropClick(event) {
        if (event.target === this.dialogEl?.nativeElement) {
            this.requestClose();
        }
    }
    onDialogCancel(event) {
        event.preventDefault();
        this.requestClose();
    }
    finalizeClose() {
        this.isClosing.set(false);
        const dialog = this.dialogEl?.nativeElement;
        if (!dialog)
            return;
        if (dialog.open && typeof dialog.close === 'function') {
            try {
                dialog.close();
            }
            catch {
                dialog.removeAttribute('open');
            }
        }
        else {
            dialog.removeAttribute('open');
        }
    }
    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }
    static { this.ɵfac = function KitDialogSheetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitDialogSheetComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitDialogSheetComponent, selectors: [["kit-dialog-sheet"]], viewQuery: function KitDialogSheetComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dialogEl = _t.first);
        } }, inputs: { isOpen: [1, "isOpen"], ariaLabelledby: [1, "ariaLabelledby"], ariaLabel: [1, "ariaLabel"], maxWidth: [1, "maxWidth"], showHandle: [1, "showHandle"], panelClass: [1, "panelClass"], closeDurationMs: [1, "closeDurationMs"] }, outputs: { closed: "closed" }, ngContentSelectors: _c1, decls: 5, vars: 13, consts: [["dialogEl", ""], [1, "kit-dialog-sheet", 3, "click", "cancel"], [1, "kit-dialog-sheet-panel", 3, "click", "touchstart", "touchmove", "touchend", "touchcancel"], ["aria-hidden", "true", 1, "sheet-drag-area"], [1, "sheet-handle"]], template: function KitDialogSheetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵdomElementStart(0, "dialog", 1, 0);
            i0.ɵɵdomListener("click", function KitDialogSheetComponent_Template_dialog_click_0_listener($event) { return ctx.onBackdropClick($event); })("cancel", function KitDialogSheetComponent_Template_dialog_cancel_0_listener($event) { return ctx.onDialogCancel($event); });
            i0.ɵɵdomElementStart(2, "div", 2);
            i0.ɵɵdomListener("click", function KitDialogSheetComponent_Template_div_click_2_listener($event) { return $event.stopPropagation(); })("touchstart", function KitDialogSheetComponent_Template_div_touchstart_2_listener($event) { return ctx.dragController.onTouchStart($event); })("touchmove", function KitDialogSheetComponent_Template_div_touchmove_2_listener($event) { return ctx.dragController.onTouchMove($event); })("touchend", function KitDialogSheetComponent_Template_div_touchend_2_listener() { return ctx.dragController.onTouchEnd(ctx.dismissFromDrag); })("touchcancel", function KitDialogSheetComponent_Template_div_touchcancel_2_listener() { return ctx.dragController.reset(); });
            i0.ɵɵconditionalCreate(3, KitDialogSheetComponent_Conditional_3_Template, 2, 0, "div", 3);
            i0.ɵɵprojection(4);
            i0.ɵɵdomElementEnd()();
        } if (rf & 2) {
            i0.ɵɵclassProp("closing", ctx.isClosing());
            i0.ɵɵattribute("aria-labelledby", ctx.ariaLabelledby() || null)("aria-label", ctx.ariaLabel() || null);
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx.panelClass());
            i0.ɵɵstyleProp("max-width", ctx.maxWidth())("transform", ctx.dragController.effectiveTransformY() !== 0 ? "translateY(" + ctx.dragController.effectiveTransformY() + "px)" : null)("transition", ctx.dragController.isDragging() ? "none" : "transform var(--kit-duration-medium, 260ms) var(--kit-ease-smooth, cubic-bezier(0.22, 1, 0.36, 1))");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showHandle() ? 3 : -1);
        } }, encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitDialogSheetComponent, [{
        type: Component,
        args: [{
                selector: 'kit-dialog-sheet',
                standalone: true,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <dialog
      #dialogEl
      class="kit-dialog-sheet"
      [class.closing]="isClosing()"
      [attr.aria-labelledby]="ariaLabelledby() || null"
      [attr.aria-label]="ariaLabel() || null"
      (click)="onBackdropClick($event)"
      (cancel)="onDialogCancel($event)"
    >
      <div
        class="kit-dialog-sheet-panel"
        [class]="panelClass()"
        [style.max-width]="maxWidth()"
        [style.transform]="
          dragController.effectiveTransformY() !== 0
            ? 'translateY(' + dragController.effectiveTransformY() + 'px)'
            : null
        "
        [style.transition]="
          dragController.isDragging()
            ? 'none'
            : 'transform var(--kit-duration-medium, 260ms) var(--kit-ease-smooth, cubic-bezier(0.22, 1, 0.36, 1))'
        "
        (click)="$event.stopPropagation()"
        (touchstart)="dragController.onTouchStart($event)"
        (touchmove)="dragController.onTouchMove($event)"
        (touchend)="dragController.onTouchEnd(dismissFromDrag)"
        (touchcancel)="dragController.reset()"
      >
        @if (showHandle()) {
          <div class="sheet-drag-area" aria-hidden="true">
            <div class="sheet-handle"></div>
          </div>
        }
        <ng-content />
      </div>
    </dialog>
  `,
            }]
    }], () => [], { dialogEl: [{
            type: ViewChild,
            args: ['dialogEl']
        }], isOpen: [{ type: i0.Input, args: [{ isSignal: true, alias: "isOpen", required: false }] }], ariaLabelledby: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabelledby", required: false }] }], ariaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }], maxWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxWidth", required: false }] }], showHandle: [{ type: i0.Input, args: [{ isSignal: true, alias: "showHandle", required: false }] }], panelClass: [{ type: i0.Input, args: [{ isSignal: true, alias: "panelClass", required: false }] }], closeDurationMs: [{ type: i0.Input, args: [{ isSignal: true, alias: "closeDurationMs", required: false }] }], closed: [{ type: i0.Output, args: ["closed"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitDialogSheetComponent, { className: "KitDialogSheetComponent", filePath: "dialog-sheet.component.ts", lineNumber: 79 }); })();
