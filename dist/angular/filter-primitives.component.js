import { ChangeDetectionStrategy, Component, HostListener, ViewEncapsulation, computed, input, output, signal, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KIT_COMBOBOX_CSS, KIT_FILTER_DROPDOWN_BASE_CSS, KIT_MULTISELECT_CSS, KIT_SELECT_CSS, } from './filter-primitives.styles.js';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.value;
const _forTrack1 = ($index, $item) => $item.label;
function KitSelectComponent_Conditional_0_Conditional_11_For_2_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(0, "svg", 15);
    i0.ɵɵdomElement(1, "path", 16);
    i0.ɵɵdomElementEnd();
} }
function KitSelectComponent_Conditional_0_Conditional_11_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 13);
    i0.ɵɵdomListener("click", function KitSelectComponent_Conditional_0_Conditional_11_For_2_Template_button_click_0_listener() { const opt_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.select(opt_r4.value)); });
    i0.ɵɵdomElementStart(1, "span", 14);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(3, KitSelectComponent_Conditional_0_Conditional_11_For_2_Conditional_3_Template, 2, 0, ":svg:svg", 15);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const opt_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("selected", ctx_r1.isSelected(opt_r4.value));
    i0.ɵɵattribute("aria-selected", ctx_r1.isSelected(opt_r4.value));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(opt_r4.label);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isSelected(opt_r4.value) ? 3 : -1);
} }
function KitSelectComponent_Conditional_0_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 11);
    i0.ɵɵrepeaterCreate(1, KitSelectComponent_Conditional_0_Conditional_11_For_2_Template, 4, 5, "button", 12, _forTrack0);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.options());
} }
function KitSelectComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 2)(2, "button", 3);
    i0.ɵɵdomListener("click", function KitSelectComponent_Conditional_0_Template_button_click_2_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggle($event)); });
    i0.ɵɵdomElementStart(3, "span", 4);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(4, "svg", 5);
    i0.ɵɵdomElement(5, "path", 6);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵdomElementStart(6, "span", 7);
    i0.ɵɵtext(7);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(8, "span", 8);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(9, "svg", 9);
    i0.ɵɵdomElement(10, "path", 10);
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵconditionalCreate(11, KitSelectComponent_Conditional_0_Conditional_11_Template, 3, 0, "div", 11);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active-wrapper", ctx_r1.isOpen());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("open", ctx_r1.isOpen());
    i0.ɵɵdomProperty("disabled", ctx_r1.disabled());
    i0.ɵɵattribute("id", ctx_r1.triggerId() || null)("aria-label", ctx_r1.ariaLabel() || null)("aria-expanded", ctx_r1.isOpen());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.selectedLabel());
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("open", ctx_r1.isOpen());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.isOpen() ? 11 : -1);
} }
function KitSelectComponent_Conditional_1_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 17)(1, "label", 20);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵattribute("for", ctx_r1.triggerId() || null)("title", ctx_r1.labelTitle() || null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.label());
} }
function KitSelectComponent_Conditional_1_Conditional_9_Conditional_1_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(0, "svg", 15);
    i0.ɵɵdomElement(1, "path", 16);
    i0.ɵɵdomElementEnd();
} }
function KitSelectComponent_Conditional_1_Conditional_9_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 13);
    i0.ɵɵdomListener("click", function KitSelectComponent_Conditional_1_Conditional_9_Conditional_1_Template_button_click_0_listener() { const allOpt_r7 = i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.select(allOpt_r7.value)); });
    i0.ɵɵdomElementStart(1, "span", 14);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(3, KitSelectComponent_Conditional_1_Conditional_9_Conditional_1_Conditional_3_Template, 2, 0, ":svg:svg", 15);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const allOpt_r7 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("selected", ctx_r1.isSelected(allOpt_r7.value));
    i0.ɵɵattribute("aria-selected", ctx_r1.isSelected(allOpt_r7.value));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(allOpt_r7.label);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isSelected(allOpt_r7.value) ? 3 : -1);
} }
function KitSelectComponent_Conditional_1_Conditional_9_For_3_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 22);
    i0.ɵɵtext(1, "\u21B3");
    i0.ɵɵdomElementEnd();
} }
function KitSelectComponent_Conditional_1_Conditional_9_For_3_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(0, "svg", 15);
    i0.ɵɵdomElement(1, "path", 16);
    i0.ɵɵdomElementEnd();
} }
function KitSelectComponent_Conditional_1_Conditional_9_For_3_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 13);
    i0.ɵɵdomListener("click", function KitSelectComponent_Conditional_1_Conditional_9_For_3_Template_button_click_0_listener() { const opt_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.select(opt_r9.value)); });
    i0.ɵɵdomElementStart(1, "span", 14);
    i0.ɵɵconditionalCreate(2, KitSelectComponent_Conditional_1_Conditional_9_For_3_Conditional_2_Template, 2, 0, "span", 22);
    i0.ɵɵtext(3);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(4, KitSelectComponent_Conditional_1_Conditional_9_For_3_Conditional_4_Template, 2, 0, ":svg:svg", 15);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const opt_r9 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("child-platform", !!opt_r9.indent)("selected", ctx_r1.isSelected(opt_r9.value));
    i0.ɵɵattribute("aria-selected", ctx_r1.isSelected(opt_r9.value));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(opt_r9.indent ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", opt_r9.label, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isSelected(opt_r9.value) ? 4 : -1);
} }
function KitSelectComponent_Conditional_1_Conditional_9_For_5_For_3_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 22);
    i0.ɵɵtext(1, "\u21B3");
    i0.ɵɵdomElementEnd();
} }
function KitSelectComponent_Conditional_1_Conditional_9_For_5_For_3_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(0, "svg", 15);
    i0.ɵɵdomElement(1, "path", 16);
    i0.ɵɵdomElementEnd();
} }
function KitSelectComponent_Conditional_1_Conditional_9_For_5_For_3_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 13);
    i0.ɵɵdomListener("click", function KitSelectComponent_Conditional_1_Conditional_9_For_5_For_3_Template_button_click_0_listener() { const opt_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.select(opt_r11.value)); });
    i0.ɵɵdomElementStart(1, "span", 14);
    i0.ɵɵconditionalCreate(2, KitSelectComponent_Conditional_1_Conditional_9_For_5_For_3_Conditional_2_Template, 2, 0, "span", 22);
    i0.ɵɵtext(3);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(4, KitSelectComponent_Conditional_1_Conditional_9_For_5_For_3_Conditional_4_Template, 2, 0, ":svg:svg", 15);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const opt_r11 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("child-platform", !!opt_r11.indent)("selected", ctx_r1.isSelected(opt_r11.value));
    i0.ɵɵattribute("aria-selected", ctx_r1.isSelected(opt_r11.value));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(opt_r11.indent ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", opt_r11.label, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isSelected(opt_r11.value) ? 4 : -1);
} }
function KitSelectComponent_Conditional_1_Conditional_9_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 23);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
    i0.ɵɵrepeaterCreate(2, KitSelectComponent_Conditional_1_Conditional_9_For_5_For_3_Template, 5, 8, "button", 21, _forTrack0);
} if (rf & 2) {
    const group_r12 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", group_r12.label, " ");
    i0.ɵɵadvance();
    i0.ɵɵrepeater(group_r12.options);
} }
function KitSelectComponent_Conditional_1_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 11);
    i0.ɵɵconditionalCreate(1, KitSelectComponent_Conditional_1_Conditional_9_Conditional_1_Template, 4, 5, "button", 12);
    i0.ɵɵrepeaterCreate(2, KitSelectComponent_Conditional_1_Conditional_9_For_3_Template, 5, 8, "button", 21, _forTrack0);
    i0.ɵɵrepeaterCreate(4, KitSelectComponent_Conditional_1_Conditional_9_For_5_Template, 4, 1, null, null, _forTrack1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_2_0 = ctx_r1.allOption()) ? 1 : -1, tmp_2_0);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.options());
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.groups());
} }
function KitSelectComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "div", 1);
    i0.ɵɵconditionalCreate(1, KitSelectComponent_Conditional_1_Conditional_1_Template, 3, 3, "div", 17);
    i0.ɵɵdomElementStart(2, "div", 2)(3, "button", 18);
    i0.ɵɵdomListener("click", function KitSelectComponent_Conditional_1_Template_button_click_3_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggle($event)); });
    i0.ɵɵdomElementStart(4, "span", 7);
    i0.ɵɵtext(5);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(6, "span", 8);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(7, "svg", 19);
    i0.ɵɵdomElement(8, "path", 10);
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵconditionalCreate(9, KitSelectComponent_Conditional_1_Conditional_9_Template, 6, 1, "div", 11);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.label() ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active-wrapper", ctx_r1.isOpen());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("open", ctx_r1.isOpen());
    i0.ɵɵdomProperty("disabled", ctx_r1.disabled());
    i0.ɵɵattribute("id", ctx_r1.triggerId() || null)("aria-label", ctx_r1.ariaLabel() || null)("aria-expanded", ctx_r1.isOpen());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.selectedLabel());
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("open", ctx_r1.isOpen());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.isOpen() ? 9 : -1);
} }
function KitComboboxComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 3)(1, "input", 11);
    i0.ɵɵlistener("ngModelChange", function KitComboboxComponent_Conditional_4_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.exactChange.emit(!!$event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Exact");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵattribute("title", ctx_r1.exactTitle());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r1.exact());
} }
function KitComboboxComponent_Conditional_11_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 14);
    i0.ɵɵelement(1, "path", 17);
    i0.ɵɵelementEnd();
} }
function KitComboboxComponent_Conditional_11_For_6_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 14);
    i0.ɵɵelement(1, "path", 17);
    i0.ɵɵelementEnd();
} }
function KitComboboxComponent_Conditional_11_For_6_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 12);
    i0.ɵɵlistener("click", function KitComboboxComponent_Conditional_11_For_6_Template_button_click_0_listener() { const item_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectSuggestion(item_r5)); });
    i0.ɵɵelementStart(1, "span", 13);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, KitComboboxComponent_Conditional_11_For_6_Conditional_3_Template, 2, 0, ":svg:svg", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", ctx_r1.value() === item_r5);
    i0.ɵɵattribute("aria-selected", ctx_r1.value() === item_r5);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r5);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.value() === item_r5 ? 3 : -1);
} }
function KitComboboxComponent_Conditional_11_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", ctx_r1.emptyMessagePrefix(), " \"", ctx_r1.value(), "\" ");
} }
function KitComboboxComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 10)(1, "button", 12);
    i0.ɵɵlistener("click", function KitComboboxComponent_Conditional_11_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectSuggestion("")); });
    i0.ɵɵelementStart(2, "span", 13);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, KitComboboxComponent_Conditional_11_Conditional_4_Template, 2, 0, ":svg:svg", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(5, KitComboboxComponent_Conditional_11_For_6_Template, 4, 5, "button", 15, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵconditionalCreate(7, KitComboboxComponent_Conditional_11_Conditional_7_Template, 2, 2, "div", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassProp("selected", !ctx_r1.value());
    i0.ɵɵattribute("aria-selected", !ctx_r1.value());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.allOptionLabel());
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r1.value() ? 4 : -1);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.filteredSuggestions());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.filteredSuggestions().length === 0 && ctx_r1.value() ? 7 : -1);
} }
const _c0 = "\n  kit-select,\n  kit-combobox,\n  kit-multiselect {\n    display: block;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .flex {\n    display: flex;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .items-center {\n    align-items: center;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .justify-between {\n    justify-content: space-between;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .gap-xs {\n    gap: 6px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .gap-sm {\n    gap: 10px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .pr-xs {\n    padding-right: 4px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .filter-group {\n    display: flex;\n    flex-direction: column;\n    gap: var(--spacing-8, 8px);\n    min-width: 0;\n    max-width: 100%;\n    width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .filter-group-header {\n    display: flex;\n    align-items: center;\n    min-height: 20px;\n    gap: 8px;\n    flex-wrap: wrap;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .m3-label {\n    font-size: 0.75rem;\n    font-weight: 700;\n    color: var(--kit-primary);\n    margin-left: 4px;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    line-height: 1;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper {\n    position: relative;\n    display: flex;\n    align-items: center;\n    width: 100%;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-wrapper.active-wrapper {\n    z-index: 60;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .m3-input {\n    box-sizing: border-box;\n    height: var(--kit-input-height, 46px);\n    background: var(--kit-surface-container-high);\n    border: 1px solid var(--kit-outline);\n    color: var(--kit-on-surface);\n    padding: 0 2.75rem 0 1rem;\n    border-radius: var(--kit-radius-sm);\n    font-family: var(--kit-font-sans);\n    font-size: var(--kit-input-font-size, 0.9375rem);\n    line-height: normal;\n    outline: none;\n    transition:\n      border-color 0.2s ease,\n      background-color 0.2s ease,\n      box-shadow 0.2s ease;\n    width: 100%;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:hover:not(:disabled) {\n    background: var(--kit-surface-container-highest);\n    border-color: var(--kit-outline);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:disabled {\n    opacity: 0.55;\n    cursor: not-allowed;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:focus,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger.open,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .list-input.open {\n    border-color: var(--kit-primary);\n    background: var(--kit-surface-container-highest);\n    box-shadow: 0 0 0 1px var(--kit-primary);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-icon-wrapper {\n    position: absolute;\n    right: 1rem;\n    top: 50%;\n    transform: translateY(-50%);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    pointer-events: none;\n    color: var(--kit-on-surface-variant);\n    transition: color 0.2s ease;\n    z-index: 1;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-chevron {\n    width: 18px;\n    height: 18px;\n    transition:\n      transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),\n      color 0.2s ease;\n    flex-shrink: 0;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-chevron.open {\n    transform: rotate(180deg);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper:hover\n    .dropdown-icon-wrapper,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper:focus-within\n    .dropdown-icon-wrapper,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger.open\n    .dropdown-icon-wrapper {\n    color: var(--kit-primary);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger {\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    cursor: pointer;\n    text-align: left;\n    padding-left: 1rem;\n    padding-right: 2.75rem;\n    position: relative;\n    user-select: none;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .trigger-text {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  @keyframes kitDropdownEnter {\n    from {\n      opacity: 0;\n      transform: translateY(-6px) scaleY(0.92);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0) scaleY(1);\n    }\n  }\n\n  @keyframes kitCheckPop {\n    from {\n      opacity: 0;\n      transform: scale(0.5);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-list,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-list.animate-expressive {\n    position: absolute;\n    top: calc(100% + 6px);\n    left: var(--kit-dropdown-left, 0);\n    right: var(--kit-dropdown-right, auto);\n    min-width: 100%;\n    width: var(--kit-dropdown-width, max-content);\n    max-width: var(--kit-dropdown-max-width, min(340px, calc(100vw - 48px)));\n    z-index: 100;\n    background: var(--kit-surface-container-high);\n    backdrop-filter: blur(20px) contrast(95%);\n    -webkit-backdrop-filter: blur(20px) contrast(95%);\n    border: 1px solid var(--kit-outline);\n    border-radius: var(--kit-radius-sm);\n    padding: 0.375rem 0;\n    max-height: 280px;\n    overflow-y: auto;\n    box-shadow: 0 12px 36px 0 rgba(0, 0, 0, 0.45);\n    scrollbar-width: thin;\n    scrollbar-color: var(--kit-outline-variant) transparent;\n    transform-origin: top center;\n    animation: kitDropdownEnter 180ms var(--kit-ease-spring) both;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    width: 100%;\n    padding: 0.625rem 1rem;\n    cursor: pointer;\n    user-select: none;\n    background: transparent;\n    border: none;\n    font-family: var(--kit-font-sans);\n    font-size: 0.875rem;\n    color: var(--kit-on-surface);\n    text-align: left;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease;\n    gap: 0.75rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item:hover {\n    background: var(--kit-surface-container-highest);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item.selected {\n    background: var(--m3-secondary-container, var(--kit-primary-container));\n    color: var(--m3-on-secondary-container, var(--kit-on-primary-container));\n    font-weight: 600;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item.selected\n    .selected-check {\n    color: var(--m3-on-secondary-container, var(--kit-on-primary-container));\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .selected-check {\n    color: var(--kit-primary);\n    flex-shrink: 0;\n    animation: kitCheckPop 180ms var(--kit-ease-spring) both;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .item-label {\n    font-size: 0.875rem;\n    color: inherit;\n    text-transform: none;\n    letter-spacing: normal;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-group-header {\n    padding: 0.6rem 1rem 0.25rem 1rem;\n    font-size: 0.7rem;\n    font-weight: 700;\n    color: var(--kit-primary);\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    pointer-events: none;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .child-platform {\n    padding-left: 1.75rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .sub-platform-arrow {\n    color: var(--kit-on-surface-variant);\n    margin-right: 0.35rem;\n    font-size: 0.85rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-empty {\n    padding: 0.75rem 1rem;\n    font-size: 0.85rem;\n    color: var(--kit-on-surface-variant);\n    text-align: center;\n  }\n";
function KitMultiSelectComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 1)(1, "label", 9);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵattribute("for", ctx_r0.triggerId() || null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.label());
} }
function KitMultiSelectComponent_Conditional_9_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "label", 11)(1, "input", 13);
    i0.ɵɵdomListener("change", function KitMultiSelectComponent_Conditional_9_For_4_Template_input_change_1_listener() { const item_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleItem(item_r4)); });
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(2, "span", 14);
    i0.ɵɵtext(3);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵdomProperty("checked", ctx_r0.isSelected(item_r4));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r4);
} }
function KitMultiSelectComponent_Conditional_9_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 12);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.emptyLabel());
} }
function KitMultiSelectComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "div", 8)(1, "button", 10);
    i0.ɵɵdomListener("click", function KitMultiSelectComponent_Conditional_9_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.clearAll()); });
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵrepeaterCreate(3, KitMultiSelectComponent_Conditional_9_For_4_Template, 4, 2, "label", 11, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵconditionalCreate(5, KitMultiSelectComponent_Conditional_9_Conditional_5_Template, 2, 1, "div", 12);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵdomProperty("disabled", ctx_r0.selected().length === 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.clearLabel(), " ");
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.options());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.options().length === 0 ? 5 : -1);
} }
let nextDropdownInstanceId = 1;
export const activeKitDropdownId = signal(null, ...(ngDevMode ? [{ debugName: "activeKitDropdownId" }] : /* istanbul ignore next */ []));
export function closeAllKitDropdowns() {
    activeKitDropdownId.set(null);
}
export class KitSelectComponent {
    constructor() {
        this.fallbackId = `kit-select-${nextDropdownInstanceId++}`;
        this.label = input('', ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
        this.labelTitle = input('', ...(ngDevMode ? [{ debugName: "labelTitle" }] : /* istanbul ignore next */ []));
        this.triggerId = input('', ...(ngDevMode ? [{ debugName: "triggerId" }] : /* istanbul ignore next */ []));
        this.dropdownName = input('', ...(ngDevMode ? [{ debugName: "dropdownName" }] : /* istanbul ignore next */ []));
        this.value = input(undefined, ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
        this.options = input([], ...(ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []));
        this.groups = input([], ...(ngDevMode ? [{ debugName: "groups" }] : /* istanbul ignore next */ []));
        this.allOption = input(null, ...(ngDevMode ? [{ debugName: "allOption" }] : /* istanbul ignore next */ []));
        this.placeholder = input('All', ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
        this.variant = input('default', ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
        this.disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
        this.ariaLabel = input('', ...(ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.valueChange = output();
        this.dropdownKey = computed(() => this.dropdownName() || this.triggerId() || this.fallbackId, ...(ngDevMode ? [{ debugName: "dropdownKey" }] : /* istanbul ignore next */ []));
        this.isOpen = computed(() => activeKitDropdownId() === this.dropdownKey(), ...(ngDevMode ? [{ debugName: "isOpen" }] : /* istanbul ignore next */ []));
        this.selectedLabel = computed(() => {
            const val = this.value();
            const allOpt = this.allOption();
            if (allOpt && this.isSelected(allOpt.value)) {
                return allOpt.label;
            }
            for (const opt of this.options()) {
                if (this.isSelected(opt.value)) {
                    return opt.label;
                }
            }
            for (const group of this.groups()) {
                for (const opt of group.options) {
                    if (this.isSelected(opt.value)) {
                        return opt.label;
                    }
                }
            }
            if (allOpt && (val === undefined || val === null || val === '')) {
                return allOpt.label;
            }
            return this.placeholder();
        }, ...(ngDevMode ? [{ debugName: "selectedLabel" }] : /* istanbul ignore next */ []));
    }
    isSelected(optionValue) {
        const current = this.value();
        if (current === optionValue)
            return true;
        const allOpt = this.allOption();
        if (allOpt &&
            optionValue === allOpt.value &&
            (current === undefined || current === null || current === '')) {
            return true;
        }
        return false;
    }
    toggle(event) {
        if (event) {
            event.stopPropagation();
        }
        if (this.disabled())
            return;
        const key = this.dropdownKey();
        activeKitDropdownId.update((cur) => (cur === key ? null : key));
    }
    close() {
        if (activeKitDropdownId() === this.dropdownKey()) {
            activeKitDropdownId.set(null);
        }
    }
    select(val) {
        this.valueChange.emit(val);
        this.close();
    }
    onDocumentClick(event) {
        if (!this.isOpen())
            return;
        const target = event.target;
        if (!target ||
            (!target.closest('.dropdown-wrapper') &&
                !target.closest('.combobox-wrapper'))) {
            this.close();
        }
    }
    onEscape() {
        if (this.isOpen()) {
            this.close();
        }
    }
    static { this.ɵfac = function KitSelectComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitSelectComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitSelectComponent, selectors: [["kit-select"]], hostBindings: function KitSelectComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function KitSelectComponent_click_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, i0.ɵɵresolveDocument)("keydown.escape", function KitSelectComponent_keydown_escape_HostBindingHandler() { return ctx.onEscape(); }, i0.ɵɵresolveDocument);
        } }, inputs: { label: [1, "label"], labelTitle: [1, "labelTitle"], triggerId: [1, "triggerId"], dropdownName: [1, "dropdownName"], value: [1, "value"], options: [1, "options"], groups: [1, "groups"], allOption: [1, "allOption"], placeholder: [1, "placeholder"], variant: [1, "variant"], disabled: [1, "disabled"], ariaLabel: [1, "ariaLabel"] }, outputs: { valueChange: "valueChange" }, decls: 2, vars: 1, consts: [[1, "quick-sort-wrapper"], [1, "filter-group"], [1, "input-wrapper", "dropdown-wrapper"], ["type", "button", "aria-haspopup", "listbox", 1, "m3-input", "dropdown-trigger", "quick-sort-trigger", 3, "click", "disabled"], ["aria-hidden", "true", 1, "sort-icon-prefix"], ["viewBox", "0 0 24 24", "width", "16", "height", "16", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M3 6h18M6 12h12M10 18h4"], [1, "trigger-text"], ["aria-hidden", "true", 1, "dropdown-icon-wrapper"], ["viewBox", "0 0 24 24", "width", "16", "height", "16", "fill", "currentColor", 1, "dropdown-chevron"], ["d", "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"], ["role", "listbox", 1, "dropdown-list", "animate-expressive"], ["type", "button", "role", "option", 1, "dropdown-item", "state-layer", 3, "selected"], ["type", "button", "role", "option", 1, "dropdown-item", "state-layer", 3, "click"], [1, "item-label"], ["viewBox", "0 0 24 24", "width", "16", "height", "16", "fill", "currentColor", 1, "selected-check"], ["d", "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"], [1, "filter-group-header"], ["type", "button", "aria-haspopup", "listbox", 1, "m3-input", "dropdown-trigger", 3, "click", "disabled"], ["viewBox", "0 0 24 24", "width", "18", "height", "18", "fill", "currentColor", 1, "dropdown-chevron"], [1, "m3-label"], ["type", "button", "role", "option", 1, "dropdown-item", "state-layer", 3, "child-platform", "selected"], [1, "sub-platform-arrow"], [1, "dropdown-group-header"]], template: function KitSelectComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, KitSelectComponent_Conditional_0_Template, 12, 12, "div", 0)(1, KitSelectComponent_Conditional_1_Template, 10, 13, "div", 1);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.variant() === "compact-sort" ? 0 : 1);
        } }, styles: [_c0, "\n  kit-select .quick-sort-wrapper {\n    width: 100%;\n    min-width: 0;\n    flex: 0 1 190px;\n  }\n\n  kit-select .quick-sort-trigger {\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    gap: 6px;\n  }\n\n  kit-select .sort-icon-prefix {\n    display: inline-flex;\n    align-items: center;\n    color: var(--kit-on-surface-variant);\n    flex-shrink: 0;\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    kit-select * {\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n      transition-duration: 0.01ms !important;\n    }\n  }\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitSelectComponent, [{
        type: Component,
        args: [{ selector: 'kit-select', standalone: true, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    @if (variant() === 'compact-sort') {
      <div class="quick-sort-wrapper">
        <div
          class="input-wrapper dropdown-wrapper"
          [class.active-wrapper]="isOpen()"
        >
          <button
            type="button"
            class="m3-input dropdown-trigger quick-sort-trigger"
            [class.open]="isOpen()"
            [disabled]="disabled()"
            (click)="toggle($event)"
            [attr.id]="triggerId() || null"
            [attr.aria-label]="ariaLabel() || null"
            aria-haspopup="listbox"
            [attr.aria-expanded]="isOpen()"
          >
            <span class="sort-icon-prefix" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 6h18M6 12h12M10 18h4" />
              </svg>
            </span>
            <span class="trigger-text">{{ selectedLabel() }}</span>
            <span class="dropdown-icon-wrapper" aria-hidden="true">
              <svg
                class="dropdown-chevron"
                [class.open]="isOpen()"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path
                  d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                />
              </svg>
            </span>
          </button>

          @if (isOpen()) {
            <div class="dropdown-list animate-expressive" role="listbox">
              @for (opt of options(); track opt.value) {
                <button
                  type="button"
                  class="dropdown-item state-layer"
                  [class.selected]="isSelected(opt.value)"
                  (click)="select(opt.value)"
                  role="option"
                  [attr.aria-selected]="isSelected(opt.value)"
                >
                  <span class="item-label">{{ opt.label }}</span>
                  @if (isSelected(opt.value)) {
                    <svg
                      class="selected-check"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path
                        d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                      />
                    </svg>
                  }
                </button>
              }
            </div>
          }
        </div>
      </div>
    } @else {
      <div class="filter-group">
        @if (label()) {
          <div class="filter-group-header">
            <label
              class="m3-label"
              [attr.for]="triggerId() || null"
              [attr.title]="labelTitle() || null"
              >{{ label() }}</label
            >
          </div>
        }
        <div
          class="input-wrapper dropdown-wrapper"
          [class.active-wrapper]="isOpen()"
        >
          <button
            type="button"
            class="m3-input dropdown-trigger"
            [class.open]="isOpen()"
            [disabled]="disabled()"
            (click)="toggle($event)"
            [attr.id]="triggerId() || null"
            [attr.aria-label]="ariaLabel() || null"
            aria-haspopup="listbox"
            [attr.aria-expanded]="isOpen()"
          >
            <span class="trigger-text">{{ selectedLabel() }}</span>
            <span class="dropdown-icon-wrapper" aria-hidden="true">
              <svg
                class="dropdown-chevron"
                [class.open]="isOpen()"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path
                  d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                />
              </svg>
            </span>
          </button>

          @if (isOpen()) {
            <div class="dropdown-list animate-expressive" role="listbox">
              @if (allOption(); as allOpt) {
                <button
                  type="button"
                  class="dropdown-item state-layer"
                  [class.selected]="isSelected(allOpt.value)"
                  (click)="select(allOpt.value)"
                  role="option"
                  [attr.aria-selected]="isSelected(allOpt.value)"
                >
                  <span class="item-label">{{ allOpt.label }}</span>
                  @if (isSelected(allOpt.value)) {
                    <svg
                      class="selected-check"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path
                        d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                      />
                    </svg>
                  }
                </button>
              }

              @for (opt of options(); track opt.value) {
                <button
                  type="button"
                  class="dropdown-item state-layer"
                  [class.child-platform]="!!opt.indent"
                  [class.selected]="isSelected(opt.value)"
                  (click)="select(opt.value)"
                  role="option"
                  [attr.aria-selected]="isSelected(opt.value)"
                >
                  <span class="item-label">
                    @if (opt.indent) {
                      <span class="sub-platform-arrow">↳</span>
                    }
                    {{ opt.label }}
                  </span>
                  @if (isSelected(opt.value)) {
                    <svg
                      class="selected-check"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path
                        d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                      />
                    </svg>
                  }
                </button>
              }

              @for (group of groups(); track group.label) {
                <div class="dropdown-group-header">
                  {{ group.label }}
                </div>
                @for (opt of group.options; track opt.value) {
                  <button
                    type="button"
                    class="dropdown-item state-layer"
                    [class.child-platform]="!!opt.indent"
                    [class.selected]="isSelected(opt.value)"
                    (click)="select(opt.value)"
                    role="option"
                    [attr.aria-selected]="isSelected(opt.value)"
                  >
                    <span class="item-label">
                      @if (opt.indent) {
                        <span class="sub-platform-arrow">↳</span>
                      }
                      {{ opt.label }}
                    </span>
                    @if (isSelected(opt.value)) {
                      <svg
                        class="selected-check"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path
                          d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                        />
                      </svg>
                    }
                  </button>
                }
              }
            </div>
          }
        </div>
      </div>
    }
  `, styles: ["\n  kit-select,\n  kit-combobox,\n  kit-multiselect {\n    display: block;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .flex {\n    display: flex;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .items-center {\n    align-items: center;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .justify-between {\n    justify-content: space-between;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .gap-xs {\n    gap: 6px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .gap-sm {\n    gap: 10px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .pr-xs {\n    padding-right: 4px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .filter-group {\n    display: flex;\n    flex-direction: column;\n    gap: var(--spacing-8, 8px);\n    min-width: 0;\n    max-width: 100%;\n    width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .filter-group-header {\n    display: flex;\n    align-items: center;\n    min-height: 20px;\n    gap: 8px;\n    flex-wrap: wrap;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .m3-label {\n    font-size: 0.75rem;\n    font-weight: 700;\n    color: var(--kit-primary);\n    margin-left: 4px;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    line-height: 1;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper {\n    position: relative;\n    display: flex;\n    align-items: center;\n    width: 100%;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-wrapper.active-wrapper {\n    z-index: 60;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .m3-input {\n    box-sizing: border-box;\n    height: var(--kit-input-height, 46px);\n    background: var(--kit-surface-container-high);\n    border: 1px solid var(--kit-outline);\n    color: var(--kit-on-surface);\n    padding: 0 2.75rem 0 1rem;\n    border-radius: var(--kit-radius-sm);\n    font-family: var(--kit-font-sans);\n    font-size: var(--kit-input-font-size, 0.9375rem);\n    line-height: normal;\n    outline: none;\n    transition:\n      border-color 0.2s ease,\n      background-color 0.2s ease,\n      box-shadow 0.2s ease;\n    width: 100%;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:hover:not(:disabled) {\n    background: var(--kit-surface-container-highest);\n    border-color: var(--kit-outline);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:disabled {\n    opacity: 0.55;\n    cursor: not-allowed;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:focus,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger.open,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .list-input.open {\n    border-color: var(--kit-primary);\n    background: var(--kit-surface-container-highest);\n    box-shadow: 0 0 0 1px var(--kit-primary);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-icon-wrapper {\n    position: absolute;\n    right: 1rem;\n    top: 50%;\n    transform: translateY(-50%);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    pointer-events: none;\n    color: var(--kit-on-surface-variant);\n    transition: color 0.2s ease;\n    z-index: 1;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-chevron {\n    width: 18px;\n    height: 18px;\n    transition:\n      transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),\n      color 0.2s ease;\n    flex-shrink: 0;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-chevron.open {\n    transform: rotate(180deg);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper:hover\n    .dropdown-icon-wrapper,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper:focus-within\n    .dropdown-icon-wrapper,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger.open\n    .dropdown-icon-wrapper {\n    color: var(--kit-primary);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger {\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    cursor: pointer;\n    text-align: left;\n    padding-left: 1rem;\n    padding-right: 2.75rem;\n    position: relative;\n    user-select: none;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .trigger-text {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  @keyframes kitDropdownEnter {\n    from {\n      opacity: 0;\n      transform: translateY(-6px) scaleY(0.92);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0) scaleY(1);\n    }\n  }\n\n  @keyframes kitCheckPop {\n    from {\n      opacity: 0;\n      transform: scale(0.5);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-list,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-list.animate-expressive {\n    position: absolute;\n    top: calc(100% + 6px);\n    left: var(--kit-dropdown-left, 0);\n    right: var(--kit-dropdown-right, auto);\n    min-width: 100%;\n    width: var(--kit-dropdown-width, max-content);\n    max-width: var(--kit-dropdown-max-width, min(340px, calc(100vw - 48px)));\n    z-index: 100;\n    background: var(--kit-surface-container-high);\n    backdrop-filter: blur(20px) contrast(95%);\n    -webkit-backdrop-filter: blur(20px) contrast(95%);\n    border: 1px solid var(--kit-outline);\n    border-radius: var(--kit-radius-sm);\n    padding: 0.375rem 0;\n    max-height: 280px;\n    overflow-y: auto;\n    box-shadow: 0 12px 36px 0 rgba(0, 0, 0, 0.45);\n    scrollbar-width: thin;\n    scrollbar-color: var(--kit-outline-variant) transparent;\n    transform-origin: top center;\n    animation: kitDropdownEnter 180ms var(--kit-ease-spring) both;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    width: 100%;\n    padding: 0.625rem 1rem;\n    cursor: pointer;\n    user-select: none;\n    background: transparent;\n    border: none;\n    font-family: var(--kit-font-sans);\n    font-size: 0.875rem;\n    color: var(--kit-on-surface);\n    text-align: left;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease;\n    gap: 0.75rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item:hover {\n    background: var(--kit-surface-container-highest);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item.selected {\n    background: var(--m3-secondary-container, var(--kit-primary-container));\n    color: var(--m3-on-secondary-container, var(--kit-on-primary-container));\n    font-weight: 600;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item.selected\n    .selected-check {\n    color: var(--m3-on-secondary-container, var(--kit-on-primary-container));\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .selected-check {\n    color: var(--kit-primary);\n    flex-shrink: 0;\n    animation: kitCheckPop 180ms var(--kit-ease-spring) both;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .item-label {\n    font-size: 0.875rem;\n    color: inherit;\n    text-transform: none;\n    letter-spacing: normal;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-group-header {\n    padding: 0.6rem 1rem 0.25rem 1rem;\n    font-size: 0.7rem;\n    font-weight: 700;\n    color: var(--kit-primary);\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    pointer-events: none;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .child-platform {\n    padding-left: 1.75rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .sub-platform-arrow {\n    color: var(--kit-on-surface-variant);\n    margin-right: 0.35rem;\n    font-size: 0.85rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-empty {\n    padding: 0.75rem 1rem;\n    font-size: 0.85rem;\n    color: var(--kit-on-surface-variant);\n    text-align: center;\n  }\n", "\n  kit-select .quick-sort-wrapper {\n    width: 100%;\n    min-width: 0;\n    flex: 0 1 190px;\n  }\n\n  kit-select .quick-sort-trigger {\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    gap: 6px;\n  }\n\n  kit-select .sort-icon-prefix {\n    display: inline-flex;\n    align-items: center;\n    color: var(--kit-on-surface-variant);\n    flex-shrink: 0;\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    kit-select * {\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n      transition-duration: 0.01ms !important;\n    }\n  }\n"] }]
    }], null, { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], labelTitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "labelTitle", required: false }] }], triggerId: [{ type: i0.Input, args: [{ isSignal: true, alias: "triggerId", required: false }] }], dropdownName: [{ type: i0.Input, args: [{ isSignal: true, alias: "dropdownName", required: false }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }], options: [{ type: i0.Input, args: [{ isSignal: true, alias: "options", required: false }] }], groups: [{ type: i0.Input, args: [{ isSignal: true, alias: "groups", required: false }] }], allOption: [{ type: i0.Input, args: [{ isSignal: true, alias: "allOption", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], ariaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }], valueChange: [{ type: i0.Output, args: ["valueChange"] }], onDocumentClick: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }], onEscape: [{
            type: HostListener,
            args: ['document:keydown.escape']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitSelectComponent, { className: "KitSelectComponent", filePath: "filter-primitives.component.ts", lineNumber: 271 }); })();
export class KitComboboxComponent {
    constructor() {
        this.fallbackId = `kit-combobox-${nextDropdownInstanceId++}`;
        this.debounceTimer = null;
        this.label = input('', ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
        this.inputId = input('', ...(ngDevMode ? [{ debugName: "inputId" }] : /* istanbul ignore next */ []));
        this.dropdownName = input('', ...(ngDevMode ? [{ debugName: "dropdownName" }] : /* istanbul ignore next */ []));
        this.value = input('', ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
        this.suggestions = input([], ...(ngDevMode ? [{ debugName: "suggestions" }] : /* istanbul ignore next */ []));
        this.placeholder = input('All', ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
        this.allOptionLabel = input('All', ...(ngDevMode ? [{ debugName: "allOptionLabel" }] : /* istanbul ignore next */ []));
        this.emptyMessagePrefix = input('No matches for', ...(ngDevMode ? [{ debugName: "emptyMessagePrefix" }] : /* istanbul ignore next */ []));
        this.toggleAriaLabel = input('Toggle suggestions', ...(ngDevMode ? [{ debugName: "toggleAriaLabel" }] : /* istanbul ignore next */ []));
        this.showExactToggle = input(false, ...(ngDevMode ? [{ debugName: "showExactToggle" }] : /* istanbul ignore next */ []));
        this.exact = input(false, ...(ngDevMode ? [{ debugName: "exact" }] : /* istanbul ignore next */ []));
        this.exactTitle = input('Exact Normalized Match', ...(ngDevMode ? [{ debugName: "exactTitle" }] : /* istanbul ignore next */ []));
        this.debounceMs = input(150, ...(ngDevMode ? [{ debugName: "debounceMs" }] : /* istanbul ignore next */ []));
        this.maxSuggestions = input(100, ...(ngDevMode ? [{ debugName: "maxSuggestions" }] : /* istanbul ignore next */ []));
        this.valueChange = output();
        this.exactChange = output();
        this.dropdownKey = computed(() => this.dropdownName() || this.inputId() || this.fallbackId, ...(ngDevMode ? [{ debugName: "dropdownKey" }] : /* istanbul ignore next */ []));
        this.isOpen = computed(() => activeKitDropdownId() === this.dropdownKey(), ...(ngDevMode ? [{ debugName: "isOpen" }] : /* istanbul ignore next */ []));
        this.filteredSuggestions = computed(() => {
            const query = (this.value() || '').trim().toLowerCase();
            const list = this.suggestions() || [];
            const limit = this.maxSuggestions();
            if (!query) {
                return list.slice(0, limit);
            }
            return list
                .filter((item) => item.toLowerCase().includes(query))
                .slice(0, limit);
        }, ...(ngDevMode ? [{ debugName: "filteredSuggestions" }] : /* istanbul ignore next */ []));
    }
    ngOnDestroy() {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = null;
        }
    }
    open() {
        activeKitDropdownId.set(this.dropdownKey());
    }
    toggle(event) {
        if (event) {
            event.stopPropagation();
        }
        const key = this.dropdownKey();
        activeKitDropdownId.update((cur) => (cur === key ? null : key));
    }
    close() {
        if (activeKitDropdownId() === this.dropdownKey()) {
            activeKitDropdownId.set(null);
        }
    }
    onTextInput(val) {
        this.open();
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = null;
        }
        const delay = this.debounceMs();
        if (delay <= 0) {
            this.valueChange.emit(val);
            return;
        }
        this.debounceTimer = setTimeout(() => {
            this.debounceTimer = null;
            this.valueChange.emit(val);
        }, delay);
    }
    selectSuggestion(item) {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = null;
        }
        this.valueChange.emit(item);
        this.close();
    }
    onDocumentClick(event) {
        if (!this.isOpen())
            return;
        const target = event.target;
        if (!target ||
            (!target.closest('.dropdown-wrapper') &&
                !target.closest('.combobox-wrapper'))) {
            this.close();
        }
    }
    onEscape() {
        if (this.isOpen()) {
            this.close();
        }
    }
    static { this.ɵfac = function KitComboboxComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitComboboxComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitComboboxComponent, selectors: [["kit-combobox"]], hostBindings: function KitComboboxComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function KitComboboxComponent_click_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, i0.ɵɵresolveDocument)("keydown.escape", function KitComboboxComponent_keydown_escape_HostBindingHandler() { return ctx.onEscape(); }, i0.ɵɵresolveDocument);
        } }, inputs: { label: [1, "label"], inputId: [1, "inputId"], dropdownName: [1, "dropdownName"], value: [1, "value"], suggestions: [1, "suggestions"], placeholder: [1, "placeholder"], allOptionLabel: [1, "allOptionLabel"], emptyMessagePrefix: [1, "emptyMessagePrefix"], toggleAriaLabel: [1, "toggleAriaLabel"], showExactToggle: [1, "showExactToggle"], exact: [1, "exact"], exactTitle: [1, "exactTitle"], debounceMs: [1, "debounceMs"], maxSuggestions: [1, "maxSuggestions"] }, outputs: { valueChange: "valueChange", exactChange: "exactChange" }, decls: 12, vars: 22, consts: [[1, "filter-group"], [1, "filter-group-header"], [1, "m3-label"], [1, "m3-checkbox-label"], [1, "input-wrapper", "combobox-wrapper"], ["type", "text", "autocomplete", "off", 1, "m3-input", "list-input", 3, "ngModelChange", "focus", "ngModel"], ["type", "button", "tabindex", "-1", 1, "combobox-chevron-btn", 3, "click"], ["aria-hidden", "true", 1, "dropdown-icon-wrapper"], ["viewBox", "0 0 24 24", "width", "18", "height", "18", "fill", "currentColor", 1, "dropdown-chevron"], ["d", "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"], ["role", "listbox", 1, "dropdown-list", "animate-expressive"], ["type", "checkbox", 1, "m3-checkbox", 3, "ngModelChange", "ngModel"], ["type", "button", "role", "option", 1, "dropdown-item", "state-layer", 3, "click"], [1, "item-label"], ["viewBox", "0 0 24 24", "width", "16", "height", "16", "fill", "currentColor", 1, "selected-check"], ["type", "button", "role", "option", 1, "dropdown-item", "state-layer", 3, "selected"], [1, "dropdown-empty"], ["d", "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"]], template: function KitComboboxComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "label", 2);
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(4, KitComboboxComponent_Conditional_4_Template, 4, 2, "label", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 4)(6, "input", 5);
            i0.ɵɵlistener("ngModelChange", function KitComboboxComponent_Template_input_ngModelChange_6_listener($event) { return ctx.onTextInput($event); })("focus", function KitComboboxComponent_Template_input_focus_6_listener() { return ctx.open(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "button", 6);
            i0.ɵɵlistener("click", function KitComboboxComponent_Template_button_click_7_listener($event) { return ctx.toggle($event); });
            i0.ɵɵelementStart(8, "span", 7);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(9, "svg", 8);
            i0.ɵɵelement(10, "path", 9);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(11, KitComboboxComponent_Conditional_11_Template, 8, 6, "div", 10);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵclassProp("flex", ctx.showExactToggle())("justify-between", ctx.showExactToggle())("items-center", ctx.showExactToggle())("pr-xs", ctx.showExactToggle());
            i0.ɵɵadvance();
            i0.ɵɵattribute("for", ctx.inputId() || null);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.label());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showExactToggle() ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("active-wrapper", ctx.isOpen());
            i0.ɵɵadvance();
            i0.ɵɵclassProp("open", ctx.isOpen());
            i0.ɵɵproperty("ngModel", ctx.value());
            i0.ɵɵattribute("placeholder", ctx.placeholder())("id", ctx.inputId() || null);
            i0.ɵɵadvance();
            i0.ɵɵattribute("aria-label", ctx.toggleAriaLabel());
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("open", ctx.isOpen());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isOpen() ? 11 : -1);
        } }, dependencies: [FormsModule, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.NgControlStatus, i1.NgModel], styles: [_c0, "\n  :is(.kit-filter-bar, kit-combobox) .combobox-wrapper {\n    position: relative;\n  }\n\n  :is(.kit-filter-bar, kit-combobox) .combobox-wrapper.active-wrapper {\n    z-index: 60;\n  }\n\n  :is(.kit-filter-bar, kit-combobox) .list-input {\n    cursor: text;\n  }\n\n  :is(.kit-filter-bar, kit-combobox) .combobox-chevron-btn {\n    position: absolute;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    width: 2.75rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: transparent;\n    border: none;\n    cursor: pointer;\n    color: var(--kit-on-surface-variant);\n    z-index: 2;\n    padding: 0;\n  }\n\n  :is(.kit-filter-bar, kit-combobox)\n    .combobox-chevron-btn:hover\n    .dropdown-icon-wrapper {\n    color: var(--kit-primary);\n  }\n\n  :is(.kit-filter-bar, kit-combobox) .m3-checkbox-label {\n    display: flex;\n    align-items: center;\n    gap: 4px;\n    font-size: 0.7rem;\n    font-weight: 600;\n    color: var(--kit-on-surface-variant);\n    cursor: pointer;\n    user-select: none;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n  }\n\n  :is(.kit-filter-bar, kit-combobox) .m3-checkbox {\n    width: 14px;\n    height: 14px;\n    accent-color: var(--kit-primary);\n    cursor: pointer;\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    kit-combobox * {\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n      transition-duration: 0.01ms !important;\n    }\n  }\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitComboboxComponent, [{
        type: Component,
        args: [{ selector: 'kit-combobox', standalone: true, imports: [FormsModule], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="filter-group">
      <div
        class="filter-group-header"
        [class.flex]="showExactToggle()"
        [class.justify-between]="showExactToggle()"
        [class.items-center]="showExactToggle()"
        [class.pr-xs]="showExactToggle()"
      >
        <label class="m3-label" [attr.for]="inputId() || null">{{
          label()
        }}</label>
        @if (showExactToggle()) {
          <label class="m3-checkbox-label" [attr.title]="exactTitle()">
            <input
              type="checkbox"
              [ngModel]="exact()"
              (ngModelChange)="exactChange.emit(!!$event)"
              class="m3-checkbox"
            />
            <span>Exact</span>
          </label>
        }
      </div>
      <div
        class="input-wrapper combobox-wrapper"
        [class.active-wrapper]="isOpen()"
      >
        <input
          type="text"
          [ngModel]="value()"
          (ngModelChange)="onTextInput($event)"
          (focus)="open()"
          class="m3-input list-input"
          [class.open]="isOpen()"
          [attr.placeholder]="placeholder()"
          [attr.id]="inputId() || null"
          autocomplete="off"
        />
        <button
          type="button"
          class="combobox-chevron-btn"
          (click)="toggle($event)"
          tabindex="-1"
          [attr.aria-label]="toggleAriaLabel()"
        >
          <span class="dropdown-icon-wrapper" aria-hidden="true">
            <svg
              class="dropdown-chevron"
              [class.open]="isOpen()"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path
                d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
              />
            </svg>
          </span>
        </button>

        @if (isOpen()) {
          <div class="dropdown-list animate-expressive" role="listbox">
            <button
              type="button"
              class="dropdown-item state-layer"
              [class.selected]="!value()"
              (click)="selectSuggestion('')"
              role="option"
              [attr.aria-selected]="!value()"
            >
              <span class="item-label">{{ allOptionLabel() }}</span>
              @if (!value()) {
                <svg
                  class="selected-check"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path
                    d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                  />
                </svg>
              }
            </button>
            @for (item of filteredSuggestions(); track item) {
              <button
                type="button"
                class="dropdown-item state-layer"
                [class.selected]="value() === item"
                (click)="selectSuggestion(item)"
                role="option"
                [attr.aria-selected]="value() === item"
              >
                <span class="item-label">{{ item }}</span>
                @if (value() === item) {
                  <svg
                    class="selected-check"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path
                      d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                    />
                  </svg>
                }
              </button>
            }
            @if (filteredSuggestions().length === 0 && value()) {
              <div class="dropdown-empty">
                {{ emptyMessagePrefix() }} "{{ value() }}"
              </div>
            }
          </div>
        }
      </div>
    </div>
  `, styles: ["\n  kit-select,\n  kit-combobox,\n  kit-multiselect {\n    display: block;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .flex {\n    display: flex;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .items-center {\n    align-items: center;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .justify-between {\n    justify-content: space-between;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .gap-xs {\n    gap: 6px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .gap-sm {\n    gap: 10px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .pr-xs {\n    padding-right: 4px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .filter-group {\n    display: flex;\n    flex-direction: column;\n    gap: var(--spacing-8, 8px);\n    min-width: 0;\n    max-width: 100%;\n    width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .filter-group-header {\n    display: flex;\n    align-items: center;\n    min-height: 20px;\n    gap: 8px;\n    flex-wrap: wrap;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .m3-label {\n    font-size: 0.75rem;\n    font-weight: 700;\n    color: var(--kit-primary);\n    margin-left: 4px;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    line-height: 1;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper {\n    position: relative;\n    display: flex;\n    align-items: center;\n    width: 100%;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-wrapper.active-wrapper {\n    z-index: 60;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .m3-input {\n    box-sizing: border-box;\n    height: var(--kit-input-height, 46px);\n    background: var(--kit-surface-container-high);\n    border: 1px solid var(--kit-outline);\n    color: var(--kit-on-surface);\n    padding: 0 2.75rem 0 1rem;\n    border-radius: var(--kit-radius-sm);\n    font-family: var(--kit-font-sans);\n    font-size: var(--kit-input-font-size, 0.9375rem);\n    line-height: normal;\n    outline: none;\n    transition:\n      border-color 0.2s ease,\n      background-color 0.2s ease,\n      box-shadow 0.2s ease;\n    width: 100%;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:hover:not(:disabled) {\n    background: var(--kit-surface-container-highest);\n    border-color: var(--kit-outline);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:disabled {\n    opacity: 0.55;\n    cursor: not-allowed;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:focus,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger.open,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .list-input.open {\n    border-color: var(--kit-primary);\n    background: var(--kit-surface-container-highest);\n    box-shadow: 0 0 0 1px var(--kit-primary);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-icon-wrapper {\n    position: absolute;\n    right: 1rem;\n    top: 50%;\n    transform: translateY(-50%);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    pointer-events: none;\n    color: var(--kit-on-surface-variant);\n    transition: color 0.2s ease;\n    z-index: 1;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-chevron {\n    width: 18px;\n    height: 18px;\n    transition:\n      transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),\n      color 0.2s ease;\n    flex-shrink: 0;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-chevron.open {\n    transform: rotate(180deg);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper:hover\n    .dropdown-icon-wrapper,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper:focus-within\n    .dropdown-icon-wrapper,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger.open\n    .dropdown-icon-wrapper {\n    color: var(--kit-primary);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger {\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    cursor: pointer;\n    text-align: left;\n    padding-left: 1rem;\n    padding-right: 2.75rem;\n    position: relative;\n    user-select: none;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .trigger-text {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  @keyframes kitDropdownEnter {\n    from {\n      opacity: 0;\n      transform: translateY(-6px) scaleY(0.92);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0) scaleY(1);\n    }\n  }\n\n  @keyframes kitCheckPop {\n    from {\n      opacity: 0;\n      transform: scale(0.5);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-list,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-list.animate-expressive {\n    position: absolute;\n    top: calc(100% + 6px);\n    left: var(--kit-dropdown-left, 0);\n    right: var(--kit-dropdown-right, auto);\n    min-width: 100%;\n    width: var(--kit-dropdown-width, max-content);\n    max-width: var(--kit-dropdown-max-width, min(340px, calc(100vw - 48px)));\n    z-index: 100;\n    background: var(--kit-surface-container-high);\n    backdrop-filter: blur(20px) contrast(95%);\n    -webkit-backdrop-filter: blur(20px) contrast(95%);\n    border: 1px solid var(--kit-outline);\n    border-radius: var(--kit-radius-sm);\n    padding: 0.375rem 0;\n    max-height: 280px;\n    overflow-y: auto;\n    box-shadow: 0 12px 36px 0 rgba(0, 0, 0, 0.45);\n    scrollbar-width: thin;\n    scrollbar-color: var(--kit-outline-variant) transparent;\n    transform-origin: top center;\n    animation: kitDropdownEnter 180ms var(--kit-ease-spring) both;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    width: 100%;\n    padding: 0.625rem 1rem;\n    cursor: pointer;\n    user-select: none;\n    background: transparent;\n    border: none;\n    font-family: var(--kit-font-sans);\n    font-size: 0.875rem;\n    color: var(--kit-on-surface);\n    text-align: left;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease;\n    gap: 0.75rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item:hover {\n    background: var(--kit-surface-container-highest);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item.selected {\n    background: var(--m3-secondary-container, var(--kit-primary-container));\n    color: var(--m3-on-secondary-container, var(--kit-on-primary-container));\n    font-weight: 600;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item.selected\n    .selected-check {\n    color: var(--m3-on-secondary-container, var(--kit-on-primary-container));\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .selected-check {\n    color: var(--kit-primary);\n    flex-shrink: 0;\n    animation: kitCheckPop 180ms var(--kit-ease-spring) both;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .item-label {\n    font-size: 0.875rem;\n    color: inherit;\n    text-transform: none;\n    letter-spacing: normal;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-group-header {\n    padding: 0.6rem 1rem 0.25rem 1rem;\n    font-size: 0.7rem;\n    font-weight: 700;\n    color: var(--kit-primary);\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    pointer-events: none;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .child-platform {\n    padding-left: 1.75rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .sub-platform-arrow {\n    color: var(--kit-on-surface-variant);\n    margin-right: 0.35rem;\n    font-size: 0.85rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-empty {\n    padding: 0.75rem 1rem;\n    font-size: 0.85rem;\n    color: var(--kit-on-surface-variant);\n    text-align: center;\n  }\n", "\n  :is(.kit-filter-bar, kit-combobox) .combobox-wrapper {\n    position: relative;\n  }\n\n  :is(.kit-filter-bar, kit-combobox) .combobox-wrapper.active-wrapper {\n    z-index: 60;\n  }\n\n  :is(.kit-filter-bar, kit-combobox) .list-input {\n    cursor: text;\n  }\n\n  :is(.kit-filter-bar, kit-combobox) .combobox-chevron-btn {\n    position: absolute;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    width: 2.75rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: transparent;\n    border: none;\n    cursor: pointer;\n    color: var(--kit-on-surface-variant);\n    z-index: 2;\n    padding: 0;\n  }\n\n  :is(.kit-filter-bar, kit-combobox)\n    .combobox-chevron-btn:hover\n    .dropdown-icon-wrapper {\n    color: var(--kit-primary);\n  }\n\n  :is(.kit-filter-bar, kit-combobox) .m3-checkbox-label {\n    display: flex;\n    align-items: center;\n    gap: 4px;\n    font-size: 0.7rem;\n    font-weight: 600;\n    color: var(--kit-on-surface-variant);\n    cursor: pointer;\n    user-select: none;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n  }\n\n  :is(.kit-filter-bar, kit-combobox) .m3-checkbox {\n    width: 14px;\n    height: 14px;\n    accent-color: var(--kit-primary);\n    cursor: pointer;\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    kit-combobox * {\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n      transition-duration: 0.01ms !important;\n    }\n  }\n"] }]
    }], null, { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], inputId: [{ type: i0.Input, args: [{ isSignal: true, alias: "inputId", required: false }] }], dropdownName: [{ type: i0.Input, args: [{ isSignal: true, alias: "dropdownName", required: false }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }], suggestions: [{ type: i0.Input, args: [{ isSignal: true, alias: "suggestions", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], allOptionLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "allOptionLabel", required: false }] }], emptyMessagePrefix: [{ type: i0.Input, args: [{ isSignal: true, alias: "emptyMessagePrefix", required: false }] }], toggleAriaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "toggleAriaLabel", required: false }] }], showExactToggle: [{ type: i0.Input, args: [{ isSignal: true, alias: "showExactToggle", required: false }] }], exact: [{ type: i0.Input, args: [{ isSignal: true, alias: "exact", required: false }] }], exactTitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "exactTitle", required: false }] }], debounceMs: [{ type: i0.Input, args: [{ isSignal: true, alias: "debounceMs", required: false }] }], maxSuggestions: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxSuggestions", required: false }] }], valueChange: [{ type: i0.Output, args: ["valueChange"] }], exactChange: [{ type: i0.Output, args: ["exactChange"] }], onDocumentClick: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }], onEscape: [{
            type: HostListener,
            args: ['document:keydown.escape']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitComboboxComponent, { className: "KitComboboxComponent", filePath: "filter-primitives.component.ts", lineNumber: 507 }); })();
export class KitMultiSelectComponent {
    constructor() {
        this.fallbackId = `kit-multiselect-${nextDropdownInstanceId++}`;
        this.label = input('', ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
        this.triggerId = input('', ...(ngDevMode ? [{ debugName: "triggerId" }] : /* istanbul ignore next */ []));
        this.dropdownName = input('', ...(ngDevMode ? [{ debugName: "dropdownName" }] : /* istanbul ignore next */ []));
        this.selected = input([], ...(ngDevMode ? [{ debugName: "selected" }] : /* istanbul ignore next */ []));
        this.options = input([], ...(ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []));
        this.allLabel = input('All Regions', ...(ngDevMode ? [{ debugName: "allLabel" }] : /* istanbul ignore next */ []));
        this.clearLabel = input('Clear Selection', ...(ngDevMode ? [{ debugName: "clearLabel" }] : /* istanbul ignore next */ []));
        this.emptyLabel = input('No regions found', ...(ngDevMode ? [{ debugName: "emptyLabel" }] : /* istanbul ignore next */ []));
        this.containerClass = input('', ...(ngDevMode ? [{ debugName: "containerClass" }] : /* istanbul ignore next */ []));
        this.selectedChange = output();
        this.dropdownKey = computed(() => this.dropdownName() || this.triggerId() || this.fallbackId, ...(ngDevMode ? [{ debugName: "dropdownKey" }] : /* istanbul ignore next */ []));
        this.isOpen = computed(() => activeKitDropdownId() === this.dropdownKey(), ...(ngDevMode ? [{ debugName: "isOpen" }] : /* istanbul ignore next */ []));
        this.summaryLabel = computed(() => {
            const sel = this.selected() || [];
            if (sel.length === 0)
                return this.allLabel();
            if (sel.length <= 2)
                return sel.join(', ');
            return `${sel.length} Selected`;
        }, ...(ngDevMode ? [{ debugName: "summaryLabel" }] : /* istanbul ignore next */ []));
    }
    isSelected(item) {
        return (this.selected() || []).includes(item);
    }
    toggle(event) {
        if (event) {
            event.stopPropagation();
        }
        const key = this.dropdownKey();
        activeKitDropdownId.update((cur) => (cur === key ? null : key));
    }
    close() {
        if (activeKitDropdownId() === this.dropdownKey()) {
            activeKitDropdownId.set(null);
        }
    }
    clearAll() {
        this.selectedChange.emit([]);
    }
    toggleItem(item) {
        const current = this.selected() || [];
        const next = current.includes(item)
            ? current.filter((x) => x !== item)
            : [...current, item];
        this.selectedChange.emit(next);
    }
    onDocumentClick(event) {
        if (!this.isOpen())
            return;
        const target = event.target;
        if (!target ||
            (!target.closest('.dropdown-wrapper') &&
                !target.closest('.combobox-wrapper'))) {
            this.close();
        }
    }
    onEscape() {
        if (this.isOpen()) {
            this.close();
        }
    }
    static { this.ɵfac = function KitMultiSelectComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitMultiSelectComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitMultiSelectComponent, selectors: [["kit-multiselect"]], hostBindings: function KitMultiSelectComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function KitMultiSelectComponent_click_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, i0.ɵɵresolveDocument)("keydown.escape", function KitMultiSelectComponent_keydown_escape_HostBindingHandler() { return ctx.onEscape(); }, i0.ɵɵresolveDocument);
        } }, inputs: { label: [1, "label"], triggerId: [1, "triggerId"], dropdownName: [1, "dropdownName"], selected: [1, "selected"], options: [1, "options"], allLabel: [1, "allLabel"], clearLabel: [1, "clearLabel"], emptyLabel: [1, "emptyLabel"], containerClass: [1, "containerClass"] }, outputs: { selectedChange: "selectedChange" }, decls: 10, vars: 13, consts: [[1, "filter-group"], [1, "filter-group-header"], [1, "input-wrapper", "dropdown-wrapper"], ["type", "button", "aria-haspopup", "listbox", 1, "m3-input", "dropdown-trigger", 3, "click"], [1, "trigger-text"], ["aria-hidden", "true", 1, "dropdown-icon-wrapper"], ["viewBox", "0 0 24 24", "width", "18", "height", "18", "fill", "currentColor", 1, "dropdown-chevron"], ["d", "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"], ["role", "listbox", 1, "dropdown-list", "animate-expressive"], [1, "m3-label"], ["type", "button", 1, "dropdown-clear-btn", "state-layer", 3, "click", "disabled"], [1, "dropdown-item", "state-layer", "checkbox-item"], [1, "dropdown-empty"], ["type", "checkbox", 1, "m3-checkbox", 3, "change", "checked"], [1, "item-label"]], template: function KitMultiSelectComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, KitMultiSelectComponent_Conditional_1_Template, 3, 2, "div", 1);
            i0.ɵɵdomElementStart(2, "div", 2)(3, "button", 3);
            i0.ɵɵdomListener("click", function KitMultiSelectComponent_Template_button_click_3_listener($event) { return ctx.toggle($event); });
            i0.ɵɵdomElementStart(4, "span", 4);
            i0.ɵɵtext(5);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(6, "span", 5);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵdomElementStart(7, "svg", 6);
            i0.ɵɵdomElement(8, "path", 7);
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵconditionalCreate(9, KitMultiSelectComponent_Conditional_9_Template, 6, 3, "div", 8);
            i0.ɵɵdomElementEnd()();
        } if (rf & 2) {
            i0.ɵɵclassMap(ctx.containerClass());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.label() ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("active-wrapper", ctx.isOpen());
            i0.ɵɵadvance();
            i0.ɵɵclassProp("open", ctx.isOpen());
            i0.ɵɵattribute("id", ctx.triggerId() || null)("aria-expanded", ctx.isOpen());
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.summaryLabel());
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("open", ctx.isOpen());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isOpen() ? 9 : -1);
        } }, styles: [_c0, "\n  :is(.kit-filter-bar, kit-multiselect) .checkbox-item {\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    gap: 12px;\n  }\n\n  :is(.kit-filter-bar, kit-multiselect) .dropdown-clear-btn {\n    display: block;\n    width: calc(100% - 1.5rem);\n    margin: 0.25rem 0.75rem 0.5rem 0.75rem;\n    padding: 0.55rem;\n    text-align: center;\n    background: var(--kit-primary-container);\n    color: var(--kit-on-primary-container);\n    border: none;\n    border-radius: var(--kit-radius-full);\n    font-family: var(--kit-font-sans);\n    font-size: 0.8rem;\n    font-weight: 700;\n    cursor: pointer;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    transition: all 0.2s ease;\n  }\n\n  :is(.kit-filter-bar, kit-multiselect)\n    .dropdown-clear-btn:hover:not(:disabled) {\n    background: var(--kit-primary);\n    color: var(--kit-on-primary);\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n  }\n\n  :is(.kit-filter-bar, kit-multiselect) .dropdown-clear-btn:disabled {\n    opacity: 0.4;\n    cursor: not-allowed;\n    background: var(--kit-surface-container-highest);\n    color: var(--kit-on-surface-variant);\n  }\n\n  :is(.kit-filter-bar, kit-multiselect) .m3-checkbox {\n    width: 14px;\n    height: 14px;\n    accent-color: var(--kit-primary);\n    cursor: pointer;\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    kit-multiselect * {\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n      transition-duration: 0.01ms !important;\n    }\n  }\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitMultiSelectComponent, [{
        type: Component,
        args: [{ selector: 'kit-multiselect', standalone: true, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="filter-group" [class]="containerClass()">
      @if (label()) {
        <div class="filter-group-header">
          <label class="m3-label" [attr.for]="triggerId() || null">{{
            label()
          }}</label>
        </div>
      }
      <div
        class="input-wrapper dropdown-wrapper"
        [class.active-wrapper]="isOpen()"
      >
        <button
          type="button"
          class="m3-input dropdown-trigger"
          [class.open]="isOpen()"
          (click)="toggle($event)"
          [attr.id]="triggerId() || null"
          aria-haspopup="listbox"
          [attr.aria-expanded]="isOpen()"
        >
          <span class="trigger-text">{{ summaryLabel() }}</span>
          <span class="dropdown-icon-wrapper" aria-hidden="true">
            <svg
              class="dropdown-chevron"
              [class.open]="isOpen()"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path
                d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
              />
            </svg>
          </span>
        </button>

        @if (isOpen()) {
          <div class="dropdown-list animate-expressive" role="listbox">
            <button
              type="button"
              class="dropdown-clear-btn state-layer"
              (click)="clearAll()"
              [disabled]="selected().length === 0"
            >
              {{ clearLabel() }}
            </button>
            @for (item of options(); track item) {
              <label class="dropdown-item state-layer checkbox-item">
                <input
                  type="checkbox"
                  [checked]="isSelected(item)"
                  (change)="toggleItem(item)"
                  class="m3-checkbox"
                />
                <span class="item-label">{{ item }}</span>
              </label>
            }
            @if (options().length === 0) {
              <div class="dropdown-empty">{{ emptyLabel() }}</div>
            }
          </div>
        }
      </div>
    </div>
  `, styles: ["\n  kit-select,\n  kit-combobox,\n  kit-multiselect {\n    display: block;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .flex {\n    display: flex;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .items-center {\n    align-items: center;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .justify-between {\n    justify-content: space-between;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .gap-xs {\n    gap: 6px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .gap-sm {\n    gap: 10px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .pr-xs {\n    padding-right: 4px;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .filter-group {\n    display: flex;\n    flex-direction: column;\n    gap: var(--spacing-8, 8px);\n    min-width: 0;\n    max-width: 100%;\n    width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .filter-group-header {\n    display: flex;\n    align-items: center;\n    min-height: 20px;\n    gap: 8px;\n    flex-wrap: wrap;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .m3-label {\n    font-size: 0.75rem;\n    font-weight: 700;\n    color: var(--kit-primary);\n    margin-left: 4px;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    line-height: 1;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper {\n    position: relative;\n    display: flex;\n    align-items: center;\n    width: 100%;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-wrapper.active-wrapper {\n    z-index: 60;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .m3-input {\n    box-sizing: border-box;\n    height: var(--kit-input-height, 46px);\n    background: var(--kit-surface-container-high);\n    border: 1px solid var(--kit-outline);\n    color: var(--kit-on-surface);\n    padding: 0 2.75rem 0 1rem;\n    border-radius: var(--kit-radius-sm);\n    font-family: var(--kit-font-sans);\n    font-size: var(--kit-input-font-size, 0.9375rem);\n    line-height: normal;\n    outline: none;\n    transition:\n      border-color 0.2s ease,\n      background-color 0.2s ease,\n      box-shadow 0.2s ease;\n    width: 100%;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:hover:not(:disabled) {\n    background: var(--kit-surface-container-highest);\n    border-color: var(--kit-outline);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:disabled {\n    opacity: 0.55;\n    cursor: not-allowed;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .m3-input:focus,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger.open,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .list-input.open {\n    border-color: var(--kit-primary);\n    background: var(--kit-surface-container-highest);\n    box-shadow: 0 0 0 1px var(--kit-primary);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-icon-wrapper {\n    position: absolute;\n    right: 1rem;\n    top: 50%;\n    transform: translateY(-50%);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    pointer-events: none;\n    color: var(--kit-on-surface-variant);\n    transition: color 0.2s ease;\n    z-index: 1;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-chevron {\n    width: 18px;\n    height: 18px;\n    transition:\n      transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),\n      color 0.2s ease;\n    flex-shrink: 0;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-chevron.open {\n    transform: rotate(180deg);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper:hover\n    .dropdown-icon-wrapper,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .input-wrapper:focus-within\n    .dropdown-icon-wrapper,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger.open\n    .dropdown-icon-wrapper {\n    color: var(--kit-primary);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-trigger {\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    cursor: pointer;\n    text-align: left;\n    padding-left: 1rem;\n    padding-right: 2.75rem;\n    position: relative;\n    user-select: none;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .trigger-text {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  @keyframes kitDropdownEnter {\n    from {\n      opacity: 0;\n      transform: translateY(-6px) scaleY(0.92);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0) scaleY(1);\n    }\n  }\n\n  @keyframes kitCheckPop {\n    from {\n      opacity: 0;\n      transform: scale(0.5);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-list,\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-list.animate-expressive {\n    position: absolute;\n    top: calc(100% + 6px);\n    left: var(--kit-dropdown-left, 0);\n    right: var(--kit-dropdown-right, auto);\n    min-width: 100%;\n    width: var(--kit-dropdown-width, max-content);\n    max-width: var(--kit-dropdown-max-width, min(340px, calc(100vw - 48px)));\n    z-index: 100;\n    background: var(--kit-surface-container-high);\n    backdrop-filter: blur(20px) contrast(95%);\n    -webkit-backdrop-filter: blur(20px) contrast(95%);\n    border: 1px solid var(--kit-outline);\n    border-radius: var(--kit-radius-sm);\n    padding: 0.375rem 0;\n    max-height: 280px;\n    overflow-y: auto;\n    box-shadow: 0 12px 36px 0 rgba(0, 0, 0, 0.45);\n    scrollbar-width: thin;\n    scrollbar-color: var(--kit-outline-variant) transparent;\n    transform-origin: top center;\n    animation: kitDropdownEnter 180ms var(--kit-ease-spring) both;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    width: 100%;\n    padding: 0.625rem 1rem;\n    cursor: pointer;\n    user-select: none;\n    background: transparent;\n    border: none;\n    font-family: var(--kit-font-sans);\n    font-size: 0.875rem;\n    color: var(--kit-on-surface);\n    text-align: left;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease;\n    gap: 0.75rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item:hover {\n    background: var(--kit-surface-container-highest);\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item.selected {\n    background: var(--m3-secondary-container, var(--kit-primary-container));\n    color: var(--m3-on-secondary-container, var(--kit-on-primary-container));\n    font-weight: 600;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-item.selected\n    .selected-check {\n    color: var(--m3-on-secondary-container, var(--kit-on-primary-container));\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .selected-check {\n    color: var(--kit-primary);\n    flex-shrink: 0;\n    animation: kitCheckPop 180ms var(--kit-ease-spring) both;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect) .item-label {\n    font-size: 0.875rem;\n    color: inherit;\n    text-transform: none;\n    letter-spacing: normal;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-group-header {\n    padding: 0.6rem 1rem 0.25rem 1rem;\n    font-size: 0.7rem;\n    font-weight: 700;\n    color: var(--kit-primary);\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    pointer-events: none;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .child-platform {\n    padding-left: 1.75rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .sub-platform-arrow {\n    color: var(--kit-on-surface-variant);\n    margin-right: 0.35rem;\n    font-size: 0.85rem;\n  }\n\n  :is(.kit-filter-bar, kit-select, kit-combobox, kit-multiselect)\n    .dropdown-empty {\n    padding: 0.75rem 1rem;\n    font-size: 0.85rem;\n    color: var(--kit-on-surface-variant);\n    text-align: center;\n  }\n", "\n  :is(.kit-filter-bar, kit-multiselect) .checkbox-item {\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    gap: 12px;\n  }\n\n  :is(.kit-filter-bar, kit-multiselect) .dropdown-clear-btn {\n    display: block;\n    width: calc(100% - 1.5rem);\n    margin: 0.25rem 0.75rem 0.5rem 0.75rem;\n    padding: 0.55rem;\n    text-align: center;\n    background: var(--kit-primary-container);\n    color: var(--kit-on-primary-container);\n    border: none;\n    border-radius: var(--kit-radius-full);\n    font-family: var(--kit-font-sans);\n    font-size: 0.8rem;\n    font-weight: 700;\n    cursor: pointer;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    transition: all 0.2s ease;\n  }\n\n  :is(.kit-filter-bar, kit-multiselect)\n    .dropdown-clear-btn:hover:not(:disabled) {\n    background: var(--kit-primary);\n    color: var(--kit-on-primary);\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n  }\n\n  :is(.kit-filter-bar, kit-multiselect) .dropdown-clear-btn:disabled {\n    opacity: 0.4;\n    cursor: not-allowed;\n    background: var(--kit-surface-container-highest);\n    color: var(--kit-on-surface-variant);\n  }\n\n  :is(.kit-filter-bar, kit-multiselect) .m3-checkbox {\n    width: 14px;\n    height: 14px;\n    accent-color: var(--kit-primary);\n    cursor: pointer;\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    kit-multiselect * {\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n      transition-duration: 0.01ms !important;\n    }\n  }\n"] }]
    }], null, { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], triggerId: [{ type: i0.Input, args: [{ isSignal: true, alias: "triggerId", required: false }] }], dropdownName: [{ type: i0.Input, args: [{ isSignal: true, alias: "dropdownName", required: false }] }], selected: [{ type: i0.Input, args: [{ isSignal: true, alias: "selected", required: false }] }], options: [{ type: i0.Input, args: [{ isSignal: true, alias: "options", required: false }] }], allLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "allLabel", required: false }] }], clearLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "clearLabel", required: false }] }], emptyLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "emptyLabel", required: false }] }], containerClass: [{ type: i0.Input, args: [{ isSignal: true, alias: "containerClass", required: false }] }], selectedChange: [{ type: i0.Output, args: ["selectedChange"] }], onDocumentClick: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }], onEscape: [{
            type: HostListener,
            args: ['document:keydown.escape']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitMultiSelectComponent, { className: "KitMultiSelectComponent", filePath: "filter-primitives.component.ts", lineNumber: 696 }); })();
