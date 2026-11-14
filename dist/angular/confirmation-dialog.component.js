/**
 * SHARED CONFIRMATION DIALOG COMPONENT (@wesdizzle/app-kit/angular)
 *
 * A Material 3 Expressive dialog for critical user confirmations, numeric input prompts,
 * or multi-option choices. Uses a native <dialog> element for proper modal semantics and Escape handling.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = ["dialogEl"];
const _c1 = ["numberInput"];
const _forTrack0 = ($index, $item) => $item.value;
function KitConfirmationDialogComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "input", 11, 1);
    i0.ɵɵtwoWayListener("ngModelChange", function KitConfirmationDialogComponent_Conditional_9_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.inputValue, $event) || (ctx_r2.inputValue = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("keydown.enter", function KitConfirmationDialogComponent_Conditional_9_Template_input_keydown_enter_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onConfirm()); })("keydown.escape", function KitConfirmationDialogComponent_Conditional_9_Template_input_keydown_escape_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onCancel()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.inputValue);
} }
function KitConfirmationDialogComponent_Conditional_10_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 13);
    i0.ɵɵlistener("click", function KitConfirmationDialogComponent_Conditional_10_For_2_Template_button_click_0_listener() { const opt_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onOptionSelect(opt_r5.value)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const opt_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", opt_r5.label, " ");
} }
function KitConfirmationDialogComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵrepeaterCreate(1, KitConfirmationDialogComponent_Conditional_10_For_2_Template, 2, 1, "button", 12, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.options);
} }
function KitConfirmationDialogComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "footer", 9)(1, "button", 14);
    i0.ɵɵlistener("click", function KitConfirmationDialogComponent_Conditional_11_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onCancel()); });
    i0.ɵɵtext(2, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 15);
    i0.ɵɵlistener("click", function KitConfirmationDialogComponent_Conditional_11_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onConfirm()); });
    i0.ɵɵtext(4, " Confirm ");
    i0.ɵɵelementEnd()();
} }
function KitConfirmationDialogComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "footer", 10)(1, "button", 14);
    i0.ɵɵlistener("click", function KitConfirmationDialogComponent_Conditional_12_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onCancel()); });
    i0.ɵɵtext(2, " Cancel ");
    i0.ɵɵelementEnd()();
} }
export class KitConfirmationDialogComponent {
    constructor() {
        this.title = 'Confirm Action';
        this.message = 'Are you sure you want to proceed?';
        this.type = 'confirm';
        this.confirm = new EventEmitter();
        this.confirmWithInput = new EventEmitter();
        this.cancel = new EventEmitter();
    }
    ngAfterViewInit() {
        const dialog = this.dialogEl?.nativeElement;
        if (dialog && !dialog.open) {
            if (typeof dialog.showModal === 'function') {
                try {
                    dialog.showModal();
                }
                catch {
                    dialog.setAttribute('open', '');
                }
            }
            else {
                dialog.setAttribute('open', '');
            }
        }
        if (this.type === 'input' && this.numberInput) {
            setTimeout(() => {
                this.numberInput?.nativeElement.focus();
                this.numberInput?.nativeElement.select();
            }, 100);
        }
    }
    onBackdropClick(event) {
        if (event.target === event.currentTarget) {
            this.onCancel();
        }
    }
    onConfirm() {
        if (this.type === 'input') {
            this.confirmWithInput.emit(this.inputValue ?? '');
        }
        else {
            this.confirm.emit();
        }
    }
    onOptionSelect(value) {
        this.confirmWithInput.emit(value);
    }
    onCancel() {
        this.cancel.emit();
    }
    static { this.ɵfac = function KitConfirmationDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitConfirmationDialogComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitConfirmationDialogComponent, selectors: [["kit-confirmation-dialog"], ["app-confirmation-dialog"]], viewQuery: function KitConfirmationDialogComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5)(_c1, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dialogEl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.numberInput = _t.first);
        } }, inputs: { title: "title", message: "message", type: "type", inputValue: "inputValue", options: "options" }, outputs: { confirm: "confirm", confirmWithInput: "confirmWithInput", cancel: "cancel" }, decls: 13, vars: 5, consts: [["dialogEl", ""], ["numberInput", ""], ["aria-modal", "true", "aria-labelledby", "confirmation-dialog-title", 1, "dialog-overlay", 3, "click", "cancel"], [1, "dialog-container", "m3-surface-container-high", "animate-expressive", 3, "click"], [1, "dialog-header"], ["id", "confirmation-dialog-title", 1, "dialog-title"], [1, "dialog-body"], [1, "input-container", "mt-md"], [1, "options-container", "mt-md"], [1, "dialog-footer"], [1, "dialog-footer", "options-footer"], ["type", "number", "aria-label", "Confirmation input value", 1, "m3-input", 3, "ngModelChange", "keydown.enter", "keydown.escape", "ngModel"], ["type", "button", 1, "m3-button", "m3-button-filled", "state-layer", "option-btn"], ["type", "button", 1, "m3-button", "m3-button-filled", "state-layer", "option-btn", 3, "click"], ["type", "button", 1, "m3-button", "m3-button-text", "state-layer", 3, "click"], ["type", "button", 1, "m3-button", "m3-button-filled", "state-layer", 3, "click"]], template: function KitConfirmationDialogComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "dialog", 2, 0);
            i0.ɵɵlistener("click", function KitConfirmationDialogComponent_Template_dialog_click_0_listener($event) { return ctx.onBackdropClick($event); })("cancel", function KitConfirmationDialogComponent_Template_dialog_cancel_0_listener($event) { i0.ɵɵrestoreView(_r1); $event.preventDefault(); return i0.ɵɵresetView(ctx.onCancel()); });
            i0.ɵɵelementStart(2, "div", 3);
            i0.ɵɵlistener("click", function KitConfirmationDialogComponent_Template_div_click_2_listener($event) { return $event.stopPropagation(); });
            i0.ɵɵelementStart(3, "header", 4)(4, "h3", 5);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div", 6)(7, "p");
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(9, KitConfirmationDialogComponent_Conditional_9_Template, 3, 1, "div", 7);
            i0.ɵɵconditionalCreate(10, KitConfirmationDialogComponent_Conditional_10_Template, 3, 0, "div", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(11, KitConfirmationDialogComponent_Conditional_11_Template, 5, 0, "footer", 9)(12, KitConfirmationDialogComponent_Conditional_12_Template, 3, 0, "footer", 10);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", ctx.title, " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.message);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.type === "input" ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.type === "options" && ctx.options ? 10 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.type !== "options" ? 11 : 12);
        } }, dependencies: [FormsModule, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.NgControlStatus, i1.NgModel], styles: [".dialog-overlay[_ngcontent-%COMP%]:not([open]) {\n        display: none;\n      }\n\n      .dialog-overlay[_ngcontent-%COMP%] {\n        position: fixed;\n        inset: 0;\n        width: 100vw;\n        max-width: 100vw;\n        height: 100vh;\n        max-height: 100vh;\n        margin: 0;\n        border: none;\n        background: rgba(0, 0, 0, 0.75);\n        backdrop-filter: blur(20px) contrast(90%) brightness(80%);\n        -webkit-backdrop-filter: blur(20px) contrast(90%) brightness(80%);\n        z-index: 99999;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        padding: var(--spacing-24, 24px);\n        overscroll-behavior: contain;\n        transform: translateZ(0);\n        will-change: transform, backdrop-filter;\n      }\n\n      .dialog-overlay[_ngcontent-%COMP%]::backdrop {\n        background: transparent;\n      }\n\n      .dialog-container[_ngcontent-%COMP%] {\n        width: 100%;\n        max-width: 440px;\n        padding: var(--spacing-32, 32px);\n        border-radius: var(--kit-radius-md, var(--radius-md, 16px));\n        box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5);\n        border: 1px solid var(--kit-outline-variant, var(--m3-outline-variant));\n        background: var(\n          --kit-surface-container-high,\n          var(--m3-surface-container-high)\n        );\n      }\n\n      .dialog-header[_ngcontent-%COMP%] {\n        margin-bottom: var(--spacing-16, 16px);\n      }\n\n      .dialog-title[_ngcontent-%COMP%] {\n        font-size: 1.5rem;\n        color: var(--kit-on-surface, var(--m3-on-surface));\n        margin: 0;\n        font-family: var(--kit-font-heading, var(--font-heading));\n        font-weight: 700;\n      }\n\n      .dialog-body[_ngcontent-%COMP%] {\n        color: var(--kit-on-surface-variant, var(--m3-on-surface-variant));\n        font-size: 1.05rem;\n        margin-bottom: var(--spacing-32, 32px);\n        line-height: 1.6;\n      }\n\n      .input-container[_ngcontent-%COMP%] {\n        margin-top: 1.5rem;\n      }\n\n      .m3-input[_ngcontent-%COMP%] {\n        width: 100%;\n        background: var(\n          --kit-surface-container-highest,\n          var(--m3-surface-container-highest)\n        );\n        border: 2px solid var(--kit-primary, var(--m3-primary));\n        border-radius: var(--kit-radius-sm, var(--radius-sm, 12px));\n        padding: 1rem;\n        color: var(--kit-on-surface, var(--m3-on-surface));\n        font-size: 1.5rem;\n        font-weight: 700;\n        font-family: var(--kit-font-sans, var(--font-body));\n        text-align: center;\n        outline: none;\n        transition: all 0.2s ease;\n      }\n\n      .m3-input[_ngcontent-%COMP%]:focus {\n        box-shadow: 0 0 0 4px\n          var(--kit-primary-container, var(--m3-primary-container));\n      }\n\n      .dialog-footer[_ngcontent-%COMP%] {\n        display: flex;\n        justify-content: flex-end;\n        gap: var(--spacing-16, 16px);\n      }\n\n      .m3-button[_ngcontent-%COMP%] {\n        padding: 0.8rem 1.8rem;\n        border-radius: var(--kit-radius-full, var(--radius-full, 9999px));\n        font-weight: 600;\n        cursor: pointer;\n        border: none;\n        transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);\n        font-family: var(--kit-font-sans, var(--font-body));\n        font-size: 0.9375rem;\n        letter-spacing: 0.01em;\n      }\n\n      .m3-button-text[_ngcontent-%COMP%] {\n        background: transparent;\n        color: var(--kit-primary, var(--m3-primary));\n      }\n\n      .m3-button-text[_ngcontent-%COMP%]:hover {\n        background: var(--kit-primary-container, var(--m3-primary-container));\n        color: var(--kit-on-primary-container, var(--m3-on-primary-container));\n      }\n\n      .m3-button-filled[_ngcontent-%COMP%] {\n        background: var(--kit-primary, var(--m3-primary));\n        color: var(--kit-on-primary, var(--m3-on-primary));\n      }\n\n      .m3-button-filled[_ngcontent-%COMP%]:hover {\n        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);\n        transform: translateY(-2px);\n        filter: brightness(1.1);\n      }\n\n      .m3-button-filled[_ngcontent-%COMP%]:active {\n        transform: translateY(0);\n      }\n\n      .options-container[_ngcontent-%COMP%] {\n        display: flex;\n        flex-direction: column;\n        gap: var(--spacing-12, 12px);\n        margin-top: var(--spacing-24, 24px);\n      }\n\n      .option-btn[_ngcontent-%COMP%] {\n        width: 100%;\n        padding: 1rem;\n        font-size: 1.1rem;\n        text-align: left;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        background: var(\n          --kit-surface-container-highest,\n          var(--m3-surface-container-highest)\n        );\n        color: var(--kit-on-surface, var(--m3-on-surface));\n        border: 1px solid var(--kit-outline-variant, var(--m3-outline-variant));\n      }\n\n      .option-btn[_ngcontent-%COMP%]:hover {\n        background: var(--kit-primary-container, var(--m3-primary-container));\n        color: var(--kit-on-primary-container, var(--m3-on-primary-container));\n        border-color: var(--kit-primary, var(--m3-primary));\n      }\n\n      .options-footer[_ngcontent-%COMP%] {\n        justify-content: center;\n        padding-top: var(--spacing-16, 16px);\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitConfirmationDialogComponent, [{
        type: Component,
        args: [{ selector: 'kit-confirmation-dialog, app-confirmation-dialog', standalone: true, imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <dialog
      #dialogEl
      class="dialog-overlay"
      aria-modal="true"
      aria-labelledby="confirmation-dialog-title"
      (click)="onBackdropClick($event)"
      (cancel)="$event.preventDefault(); onCancel()"
    >
      <div
        class="dialog-container m3-surface-container-high animate-expressive"
        (click)="$event.stopPropagation()"
      >
        <header class="dialog-header">
          <h3 id="confirmation-dialog-title" class="dialog-title">
            {{ title }}
          </h3>
        </header>
        <div class="dialog-body">
          <p>{{ message }}</p>

          @if (type === 'input') {
            <div class="input-container mt-md">
              <input
                #numberInput
                type="number"
                [(ngModel)]="inputValue"
                class="m3-input"
                aria-label="Confirmation input value"
                (keydown.enter)="onConfirm()"
                (keydown.escape)="onCancel()"
              />
            </div>
          }

          @if (type === 'options' && options) {
            <div class="options-container mt-md">
              @for (opt of options; track opt.value) {
                <button
                  type="button"
                  class="m3-button m3-button-filled state-layer option-btn"
                  (click)="onOptionSelect(opt.value)"
                >
                  {{ opt.label }}
                </button>
              }
            </div>
          }
        </div>
        @if (type !== 'options') {
          <footer class="dialog-footer">
            <button
              type="button"
              class="m3-button m3-button-text state-layer"
              (click)="onCancel()"
            >
              Cancel
            </button>
            <button
              type="button"
              class="m3-button m3-button-filled state-layer"
              (click)="onConfirm()"
            >
              Confirm
            </button>
          </footer>
        } @else {
          <footer class="dialog-footer options-footer">
            <button
              type="button"
              class="m3-button m3-button-text state-layer"
              (click)="onCancel()"
            >
              Cancel
            </button>
          </footer>
        }
      </div>
    </dialog>
  `, styles: ["\n      .dialog-overlay:not([open]) {\n        display: none;\n      }\n\n      .dialog-overlay {\n        position: fixed;\n        inset: 0;\n        width: 100vw;\n        max-width: 100vw;\n        height: 100vh;\n        max-height: 100vh;\n        margin: 0;\n        border: none;\n        background: rgba(0, 0, 0, 0.75);\n        backdrop-filter: blur(20px) contrast(90%) brightness(80%);\n        -webkit-backdrop-filter: blur(20px) contrast(90%) brightness(80%);\n        z-index: 99999;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        padding: var(--spacing-24, 24px);\n        overscroll-behavior: contain;\n        transform: translateZ(0);\n        will-change: transform, backdrop-filter;\n      }\n\n      .dialog-overlay::backdrop {\n        background: transparent;\n      }\n\n      .dialog-container {\n        width: 100%;\n        max-width: 440px;\n        padding: var(--spacing-32, 32px);\n        border-radius: var(--kit-radius-md, var(--radius-md, 16px));\n        box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5);\n        border: 1px solid var(--kit-outline-variant, var(--m3-outline-variant));\n        background: var(\n          --kit-surface-container-high,\n          var(--m3-surface-container-high)\n        );\n      }\n\n      .dialog-header {\n        margin-bottom: var(--spacing-16, 16px);\n      }\n\n      .dialog-title {\n        font-size: 1.5rem;\n        color: var(--kit-on-surface, var(--m3-on-surface));\n        margin: 0;\n        font-family: var(--kit-font-heading, var(--font-heading));\n        font-weight: 700;\n      }\n\n      .dialog-body {\n        color: var(--kit-on-surface-variant, var(--m3-on-surface-variant));\n        font-size: 1.05rem;\n        margin-bottom: var(--spacing-32, 32px);\n        line-height: 1.6;\n      }\n\n      .input-container {\n        margin-top: 1.5rem;\n      }\n\n      .m3-input {\n        width: 100%;\n        background: var(\n          --kit-surface-container-highest,\n          var(--m3-surface-container-highest)\n        );\n        border: 2px solid var(--kit-primary, var(--m3-primary));\n        border-radius: var(--kit-radius-sm, var(--radius-sm, 12px));\n        padding: 1rem;\n        color: var(--kit-on-surface, var(--m3-on-surface));\n        font-size: 1.5rem;\n        font-weight: 700;\n        font-family: var(--kit-font-sans, var(--font-body));\n        text-align: center;\n        outline: none;\n        transition: all 0.2s ease;\n      }\n\n      .m3-input:focus {\n        box-shadow: 0 0 0 4px\n          var(--kit-primary-container, var(--m3-primary-container));\n      }\n\n      .dialog-footer {\n        display: flex;\n        justify-content: flex-end;\n        gap: var(--spacing-16, 16px);\n      }\n\n      .m3-button {\n        padding: 0.8rem 1.8rem;\n        border-radius: var(--kit-radius-full, var(--radius-full, 9999px));\n        font-weight: 600;\n        cursor: pointer;\n        border: none;\n        transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);\n        font-family: var(--kit-font-sans, var(--font-body));\n        font-size: 0.9375rem;\n        letter-spacing: 0.01em;\n      }\n\n      .m3-button-text {\n        background: transparent;\n        color: var(--kit-primary, var(--m3-primary));\n      }\n\n      .m3-button-text:hover {\n        background: var(--kit-primary-container, var(--m3-primary-container));\n        color: var(--kit-on-primary-container, var(--m3-on-primary-container));\n      }\n\n      .m3-button-filled {\n        background: var(--kit-primary, var(--m3-primary));\n        color: var(--kit-on-primary, var(--m3-on-primary));\n      }\n\n      .m3-button-filled:hover {\n        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);\n        transform: translateY(-2px);\n        filter: brightness(1.1);\n      }\n\n      .m3-button-filled:active {\n        transform: translateY(0);\n      }\n\n      .options-container {\n        display: flex;\n        flex-direction: column;\n        gap: var(--spacing-12, 12px);\n        margin-top: var(--spacing-24, 24px);\n      }\n\n      .option-btn {\n        width: 100%;\n        padding: 1rem;\n        font-size: 1.1rem;\n        text-align: left;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        background: var(\n          --kit-surface-container-highest,\n          var(--m3-surface-container-highest)\n        );\n        color: var(--kit-on-surface, var(--m3-on-surface));\n        border: 1px solid var(--kit-outline-variant, var(--m3-outline-variant));\n      }\n\n      .option-btn:hover {\n        background: var(--kit-primary-container, var(--m3-primary-container));\n        color: var(--kit-on-primary-container, var(--m3-on-primary-container));\n        border-color: var(--kit-primary, var(--m3-primary));\n      }\n\n      .options-footer {\n        justify-content: center;\n        padding-top: var(--spacing-16, 16px);\n      }\n    "] }]
    }], null, { title: [{
            type: Input
        }], message: [{
            type: Input
        }], type: [{
            type: Input
        }], inputValue: [{
            type: Input
        }], options: [{
            type: Input
        }], confirm: [{
            type: Output
        }], confirmWithInput: [{
            type: Output
        }], cancel: [{
            type: Output
        }], dialogEl: [{
            type: ViewChild,
            args: ['dialogEl']
        }], numberInput: [{
            type: ViewChild,
            args: ['numberInput']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitConfirmationDialogComponent, { className: "KitConfirmationDialogComponent", filePath: "confirmation-dialog.component.ts", lineNumber: 280 }); })();
export const ConfirmationDialogComponent = KitConfirmationDialogComponent;
