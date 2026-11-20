import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation, computed, input, output, signal, } from '@angular/core';
import * as i0 from "@angular/core";
const _c0 = ["stageRef"];
const _c1 = (a0, a1, a2, a3) => ({ $implicit: a0, point: a1, index: a2, visibleSeries: a3 });
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.value;
const _forTrack2 = ($index, $item) => $item.index;
const _forTrack3 = ($index, $item) => $item.series.id;
const _forTrack4 = ($index, $item) => $item.key;
function KitTimeSeriesChartComponent_Conditional_1_For_2_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u00B7 ", s_r2.disabledHint);
} }
function KitTimeSeriesChartComponent_Conditional_1_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 6);
    i0.ɵɵlistener("click", function KitTimeSeriesChartComponent_Conditional_1_For_2_Template_button_click_0_listener() { const s_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleSeries(s_r2.id)); });
    i0.ɵɵelement(1, "span", 7);
    i0.ɵɵelementStart(2, "span", 8);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, KitTimeSeriesChartComponent_Conditional_1_For_2_Conditional_4_Template, 2, 1, "span", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r2.isSeriesVisible(s_r2))("disabled", !!s_r2.disabled);
    i0.ɵɵproperty("disabled", !!s_r2.disabled);
    i0.ɵɵattribute("aria-pressed", ctx_r2.isSeriesVisible(s_r2))("title", s_r2.disabled ? s_r2.disabledHint || s_r2.label + " unavailable" : "Toggle " + s_r2.label);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", s_r2.dashed ? null : s_r2.color)("border-color", s_r2.dashed ? s_r2.color : null);
    i0.ɵɵclassProp("dashed", !!s_r2.dashed);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r2.label);
    i0.ɵɵadvance();
    i0.ɵɵconditional(s_r2.disabled && s_r2.disabledHint ? 4 : -1);
} }
function KitTimeSeriesChartComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵrepeaterCreate(1, KitTimeSeriesChartComponent_Conditional_1_For_2_Template, 5, 15, "button", 5, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.series());
} }
function KitTimeSeriesChartComponent_Conditional_2_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.emptyMessage());
} }
function KitTimeSeriesChartComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "p", 11);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, KitTimeSeriesChartComponent_Conditional_2_Conditional_3_Template, 2, 1, "p", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("min-height", ctx_r2.heightPx(), "px");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.emptyTitle());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.emptyMessage() ? 3 : -1);
} }
function KitTimeSeriesChartComponent_Conditional_3_For_5_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "linearGradient", 25);
    i0.ɵɵelement(1, "stop", 26)(2, "stop", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("id", ctx_r2.getGradientId(s_r5.id));
    i0.ɵɵadvance();
    i0.ɵɵattribute("stop-color", s_r5.color);
    i0.ɵɵadvance();
    i0.ɵɵattribute("stop-color", s_r5.color);
} }
function KitTimeSeriesChartComponent_Conditional_3_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, KitTimeSeriesChartComponent_Conditional_3_For_5_Conditional_0_Template, 3, 3, "linearGradient", 25);
} if (rf & 2) {
    const s_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(s_r5.areaFill && ctx_r2.mode() === "line" ? 0 : -1);
} }
function KitTimeSeriesChartComponent_Conditional_3_For_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "line", 16);
} if (rf & 2) {
    const tick_r6 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("x1", ctx_r2.geometry().padLeft)("y1", tick_r6.y)("x2", ctx_r2.geometry().width - ctx_r2.geometry().padRight)("y2", tick_r6.y);
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_9_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "text", 28);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lbl_r7 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵattribute("x", ctx_r2.geometry().padLeft - 8)("y", lbl_r7.y + 4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", lbl_r7.text, " ");
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_9_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "text", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵattribute("x", ctx_r2.geometry().padLeft);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.leftAxisLabel(), " ");
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "g", 17);
    i0.ɵɵrepeaterCreate(1, KitTimeSeriesChartComponent_Conditional_3_Conditional_9_For_2_Template, 2, 3, "text", 28, _forTrack1);
    i0.ɵɵconditionalCreate(3, KitTimeSeriesChartComponent_Conditional_3_Conditional_9_Conditional_3_Template, 2, 2, "text", 29);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.leftAxisLabels());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.leftAxisLabel() ? 3 : -1);
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_10_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "text", 32);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lbl_r8 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵstyleProp("fill", ctx_r2.rightAxisTint());
    i0.ɵɵattribute("x", ctx_r2.geometry().width - ctx_r2.geometry().padRight + 8)("y", lbl_r8.y + 4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", lbl_r8.text, " ");
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_10_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "text", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵstyleProp("fill", ctx_r2.rightAxisTint());
    i0.ɵɵattribute("x", ctx_r2.geometry().width - ctx_r2.geometry().padRight);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.rightAxisLabel(), " ");
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "g", 18);
    i0.ɵɵrepeaterCreate(1, KitTimeSeriesChartComponent_Conditional_3_Conditional_10_For_2_Template, 2, 5, "text", 30, _forTrack1);
    i0.ɵɵconditionalCreate(3, KitTimeSeriesChartComponent_Conditional_3_Conditional_10_Conditional_3_Template, 2, 4, "text", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.rightAxisLabels());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.rightAxisLabel() ? 3 : -1);
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_11_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "path", 34);
} if (rf & 2) {
    const seg_r9 = ctx.$implicit;
    i0.ɵɵattribute("d", seg_r9.path)("fill", seg_r9.color);
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_11_For_3_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "path", 35);
} if (rf & 2) {
    const render_r10 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵattribute("d", render_r10.areaPath)("fill", "url(#" + ctx_r2.getGradientId(render_r10.series.id) + ")");
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_11_For_3_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "path", 36);
} if (rf & 2) {
    const render_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵattribute("d", render_r10.linePath)("stroke", render_r10.series.color)("stroke-dasharray", render_r10.series.dashed ? "6 4" : null);
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_11_For_3_For_3_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "circle", 38);
} if (rf & 2) {
    const pt_r11 = i0.ɵɵnextContext().$implicit;
    const render_r10 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("active", ctx_r2.activeIndex() === pt_r11.index);
    i0.ɵɵattribute("cx", pt_r11.x)("cy", pt_r11.y)("r", ctx_r2.activeIndex() === pt_r11.index ? 5 : 3)("fill", render_r10.series.color);
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_11_For_3_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, KitTimeSeriesChartComponent_Conditional_3_Conditional_11_For_3_For_3_Conditional_0_Template, 1, 6, "circle", 37);
} if (rf & 2) {
    const pt_r11 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵconditional(ctx_r2.showAllDots() || ctx_r2.activeIndex() === pt_r11.index ? 0 : -1);
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_11_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, KitTimeSeriesChartComponent_Conditional_3_Conditional_11_For_3_Conditional_0_Template, 1, 2, "path", 35);
    i0.ɵɵconditionalCreate(1, KitTimeSeriesChartComponent_Conditional_3_Conditional_11_For_3_Conditional_1_Template, 1, 3, "path", 36);
    i0.ɵɵrepeaterCreate(2, KitTimeSeriesChartComponent_Conditional_3_Conditional_11_For_3_For_3_Template, 1, 1, null, null, _forTrack2);
} if (rf & 2) {
    const render_r10 = ctx.$implicit;
    i0.ɵɵconditional(render_r10.areaPath ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(render_r10.linePath ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(render_r10.dots);
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, KitTimeSeriesChartComponent_Conditional_3_Conditional_11_For_1_Template, 1, 2, "path", 34, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵrepeaterCreate(2, KitTimeSeriesChartComponent_Conditional_3_Conditional_11_For_3_Template, 4, 2, null, null, _forTrack3);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵrepeater(ctx_r2.renderedDiffBand());
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r2.renderedLineSeries());
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_12_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "rect", 40);
} if (rf & 2) {
    const bar_r12 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("active", ctx_r2.activeIndex() === bar_r12.index);
    i0.ɵɵattribute("x", bar_r12.x)("y", bar_r12.y)("width", bar_r12.width)("height", bar_r12.height)("fill", bar_r12.color);
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, KitTimeSeriesChartComponent_Conditional_3_Conditional_12_For_1_Template, 1, 7, "rect", 39, _forTrack4);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵrepeater(ctx_r2.renderedBars());
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "line", 19);
} if (rf & 2) {
    const cx_r13 = ctx;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("x1", cx_r13)("y1", ctx_r2.padTop)("x2", cx_r13)("y2", ctx_r2.geometry().baselineY);
} }
function KitTimeSeriesChartComponent_Conditional_3_For_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "text", 41);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const xl_r14 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r2.activeIndex() === xl_r14.index);
    i0.ɵɵattribute("x", xl_r14.x)("y", ctx_r2.geometry().height - 10);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", xl_r14.text, " ");
} }
function KitTimeSeriesChartComponent_Conditional_3_For_19_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "rect", 42);
    i0.ɵɵlistener("mouseenter", function KitTimeSeriesChartComponent_Conditional_3_For_19_Template_rect_mouseenter_0_listener() { const hit_r16 = i0.ɵɵrestoreView(_r15).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.setActiveIndex(hit_r16.index)); })("focus", function KitTimeSeriesChartComponent_Conditional_3_For_19_Template_rect_focus_0_listener() { const hit_r16 = i0.ɵɵrestoreView(_r15).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.setActiveIndex(hit_r16.index)); })("blur", function KitTimeSeriesChartComponent_Conditional_3_For_19_Template_rect_blur_0_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onHitBlur($event)); })("click", function KitTimeSeriesChartComponent_Conditional_3_For_19_Template_rect_click_0_listener() { const hit_r16 = i0.ɵɵrestoreView(_r15).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onHitClick(hit_r16.index)); })("keydown", function KitTimeSeriesChartComponent_Conditional_3_For_19_Template_rect_keydown_0_listener($event) { const hit_r16 = i0.ɵɵrestoreView(_r15).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onHitKeydown($event, hit_r16.index)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const hit_r16 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("clickable", ctx_r2.interactive());
    i0.ɵɵattribute("x", hit_r16.x)("y", ctx_r2.padTop)("width", hit_r16.width)("height", ctx_r2.geometry().plotHeight)("role", ctx_r2.interactive() ? "button" : "img")("aria-label", hit_r16.ariaLabel);
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_20_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0, 44);
} if (rf & 2) {
    const tip_r17 = i0.ɵɵnextContext();
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngTemplateOutlet", ctx)("ngTemplateOutletContext", i0.ɵɵpureFunction4(2, _c1, tip_r17.point, tip_r17.point, tip_r17.index, ctx_r2.visibleSeries()));
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_20_Conditional_2_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 47)(1, "span", 48);
    i0.ɵɵelement(2, "span", 49);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "strong", 50);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r18 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("background", row_r18.color);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r18.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r18.formatted);
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_20_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 45);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 46);
    i0.ɵɵrepeaterCreate(3, KitTimeSeriesChartComponent_Conditional_3_Conditional_20_Conditional_2_For_4_Template, 7, 4, "div", 47, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tip_r17 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(tip_r17.point.label);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(tip_r17.rows);
} }
function KitTimeSeriesChartComponent_Conditional_3_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵconditionalCreate(1, KitTimeSeriesChartComponent_Conditional_3_Conditional_20_Conditional_1_Template, 1, 7, "ng-container", 44)(2, KitTimeSeriesChartComponent_Conditional_3_Conditional_20_Conditional_2_Template, 5, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_6_0;
    const tip_r17 = ctx;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("left", tip_r17.leftPct, "%");
    i0.ɵɵclassProp("align-right", tip_r17.flipLeft);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_6_0 = ctx_r2.tooltipTemplate()) ? 1 : 2, tmp_6_0);
} }
function KitTimeSeriesChartComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 13, 0);
    i0.ɵɵlistener("mouseleave", function KitTimeSeriesChartComponent_Conditional_3_Template_div_mouseleave_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onStageMouseLeave()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 14)(3, "defs");
    i0.ɵɵrepeaterCreate(4, KitTimeSeriesChartComponent_Conditional_3_For_5_Template, 1, 1, null, null, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "g", 15);
    i0.ɵɵrepeaterCreate(7, KitTimeSeriesChartComponent_Conditional_3_For_8_Template, 1, 4, "line", 16, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(9, KitTimeSeriesChartComponent_Conditional_3_Conditional_9_Template, 4, 1, "g", 17);
    i0.ɵɵconditionalCreate(10, KitTimeSeriesChartComponent_Conditional_3_Conditional_10_Template, 4, 1, "g", 18);
    i0.ɵɵconditionalCreate(11, KitTimeSeriesChartComponent_Conditional_3_Conditional_11_Template, 4, 0)(12, KitTimeSeriesChartComponent_Conditional_3_Conditional_12_Template, 2, 0);
    i0.ɵɵconditionalCreate(13, KitTimeSeriesChartComponent_Conditional_3_Conditional_13_Template, 1, 4, "line", 19);
    i0.ɵɵelementStart(14, "g", 20);
    i0.ɵɵrepeaterCreate(15, KitTimeSeriesChartComponent_Conditional_3_For_16_Template, 2, 5, "text", 21, _forTrack2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "g", 22);
    i0.ɵɵrepeaterCreate(18, KitTimeSeriesChartComponent_Conditional_3_For_19_Template, 1, 8, "rect", 23, _forTrack2);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(20, KitTimeSeriesChartComponent_Conditional_3_Conditional_20_Template, 3, 5, "div", 24);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_10_0;
    let tmp_13_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("height", ctx_r2.geometry().height, "px");
    i0.ɵɵattribute("viewBox", "0 0 " + ctx_r2.geometry().width + " " + ctx_r2.geometry().height)("aria-label", ctx_r2.ariaLabel());
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r2.visibleSeries());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.gridLines());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.geometry().hasLeftAxis ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.geometry().hasRightAxis ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.mode() === "line" ? 11 : 12);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_10_0 = ctx_r2.activeCrosshairX()) ? 13 : -1, tmp_10_0);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r2.xAxisLabels());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.hitColumns());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_13_0 = ctx_r2.activeTooltipData()) ? 20 : -1, tmp_13_0);
} }
const DEFAULT_STAGE_WIDTH = 760;
const PAD_TOP = 18;
const PAD_BOTTOM = 36;
function roundFloat(n) {
    return Math.round(n * 1e6) / 1e6;
}
/**
 * Computes clean "1 / 2 / 2.5 / 5 × 10^n" Y-axis ticks starting at 0.
 * Guards against zero, negative, or non-finite upper bounds.
 */
export function computeNiceAxisTicks(maxValue, tickCount = 5) {
    if (!Number.isFinite(maxValue) || maxValue <= 0) {
        return { max: 1, ticks: [0, 1] };
    }
    const targetTicks = Math.max(2, Math.floor(tickCount));
    const rawStep = maxValue / (targetTicks - 1);
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const normalized = rawStep / magnitude;
    let niceMultiplier = 10;
    if (normalized <= 1) {
        niceMultiplier = 1;
    }
    else if (normalized <= 2) {
        niceMultiplier = 2;
    }
    else if (normalized <= 2.5) {
        niceMultiplier = 2.5;
    }
    else if (normalized <= 5) {
        niceMultiplier = 5;
    }
    const step = niceMultiplier * magnitude;
    const max = roundFloat(Math.ceil(maxValue / step) * step);
    const ticks = [];
    const stepCount = Math.max(1, Math.round(max / step));
    for (let i = 0; i <= stepCount; i++) {
        ticks.push(roundFloat(i * step));
    }
    return { max: max > 0 ? max : 1, ticks };
}
/**
 * Builds an SVG line path across nullable coordinates, breaking cleanly across gaps.
 */
export function buildSeriesLinePath(coords) {
    const segments = [];
    let inRun = false;
    for (const pt of coords) {
        if (!pt || !Number.isFinite(pt.x) || !Number.isFinite(pt.y)) {
            inRun = false;
            continue;
        }
        const x = roundFloat(pt.x);
        const y = roundFloat(pt.y);
        if (!inRun) {
            segments.push(`M ${x} ${y}`);
            inRun = true;
        }
        else {
            segments.push(`L ${x} ${y}`);
        }
    }
    return segments.join(' ');
}
/**
 * Builds a closed SVG area fill path down to `baselineY` across contiguous runs of >= 2 points.
 */
export function buildSeriesAreaPath(coords, baselineY) {
    const safeBaseline = roundFloat(baselineY);
    const paths = [];
    let run = [];
    const flushRun = () => {
        if (run.length >= 2) {
            const first = run[0];
            const last = run[run.length - 1];
            const lineParts = run
                .map((p) => `L ${roundFloat(p.x)} ${roundFloat(p.y)}`)
                .join(' ');
            paths.push(`M ${roundFloat(first.x)} ${safeBaseline} ${lineParts} L ${roundFloat(last.x)} ${safeBaseline} Z`);
        }
        run = [];
    };
    for (const pt of coords) {
        if (!pt || !Number.isFinite(pt.x) || !Number.isFinite(pt.y)) {
            flushRun();
        }
        else {
            run.push({ x: pt.x, y: pt.y });
        }
    }
    flushRun();
    return paths.join(' ');
}
/**
 * Builds positive/negative SVG diff-band polygons between two same-axis series,
 * splitting cleanly at exact linear crossover points.
 * Note: in SVG space, smaller Y corresponds to higher numeric values (`upperY <= lowerY` => positive).
 */
export function buildDiffBandSegments(pairs) {
    const segments = [];
    let run = [];
    const emitContiguousRun = (items) => {
        if (items.length < 2)
            return;
        let currentSign = items[0].upperY <= items[0].lowerY;
        let upperPts = [
            { x: items[0].x, y: items[0].upperY },
        ];
        let lowerPts = [
            { x: items[0].x, y: items[0].lowerY },
        ];
        const pushPolygon = (positive) => {
            if (upperPts.length < 2)
                return;
            const top = upperPts
                .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${roundFloat(p.x)} ${roundFloat(p.y)}`)
                .join(' ');
            const bottom = [...lowerPts]
                .reverse()
                .map((p) => `L ${roundFloat(p.x)} ${roundFloat(p.y)}`)
                .join(' ');
            segments.push({ positive, path: `${top} ${bottom} Z` });
        };
        for (let i = 1; i < items.length; i++) {
            const prev = items[i - 1];
            const curr = items[i];
            const prevDiff = prev.lowerY - prev.upperY;
            const currDiff = curr.lowerY - curr.upperY;
            const nextSign = curr.upperY <= curr.lowerY;
            if ((prevDiff > 0 && currDiff < 0) || (prevDiff < 0 && currDiff > 0)) {
                const t = prevDiff / (prevDiff - currDiff);
                const cx = prev.x + t * (curr.x - prev.x);
                const cy = prev.upperY + t * (curr.upperY - prev.upperY);
                upperPts.push({ x: cx, y: cy });
                lowerPts.push({ x: cx, y: cy });
                pushPolygon(currentSign);
                currentSign = nextSign;
                upperPts = [
                    { x: cx, y: cy },
                    { x: curr.x, y: curr.upperY },
                ];
                lowerPts = [
                    { x: cx, y: cy },
                    { x: curr.x, y: curr.lowerY },
                ];
            }
            else {
                upperPts.push({ x: curr.x, y: curr.upperY });
                lowerPts.push({ x: curr.x, y: curr.lowerY });
                currentSign = nextSign;
            }
        }
        pushPolygon(currentSign);
    };
    for (const p of pairs) {
        if (p.upperY !== null &&
            p.lowerY !== null &&
            Number.isFinite(p.x) &&
            Number.isFinite(p.upperY) &&
            Number.isFinite(p.lowerY)) {
            run.push({ x: p.x, upperY: p.upperY, lowerY: p.lowerY });
        }
        else {
            emitContiguousRun(run);
            run = [];
        }
    }
    emitContiguousRun(run);
    return segments;
}
/**
 * Computes an X-axis tick label stride so dense timelines do not overlap horizontally.
 */
export function computeXLabelStep(pointCount, maxLabels = 8) {
    if (pointCount <= 0)
        return 1;
    const safeMax = Math.max(2, Math.floor(maxLabels));
    if (pointCount <= safeMax)
        return 1;
    return Math.ceil(pointCount / safeMax);
}
/**
 * Zero-dependency, responsive dual-axis SVG time-series chart with interactive legend
 * toggles, line/area and grouped-bar modes, optional difference shading, crosshair,
 * keyboard accessibility, and custom tooltip projection.
 */
export class KitTimeSeriesChartComponent {
    constructor() {
        this.resizeObserver = null;
        this.chartUid = ++KitTimeSeriesChartComponent.nextInstanceId;
        this.padTop = PAD_TOP;
        this.padBottom = PAD_BOTTOM;
        this.points = input.required(/* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "points" }] : /* istanbul ignore next */ []));
        this.series = input.required(/* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "series" }] : /* istanbul ignore next */ []));
        this.mode = input('line', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "mode" }] : /* istanbul ignore next */ []));
        this.diffBand = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "diffBand" }] : /* istanbul ignore next */ []));
        this.leftAxisFormatter = input((v) => String(Math.round(v)), /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "leftAxisFormatter" }] : /* istanbul ignore next */ []));
        this.rightAxisFormatter = input((v) => String(Math.round(v)), /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "rightAxisFormatter" }] : /* istanbul ignore next */ []));
        this.leftAxisLabel = input('', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "leftAxisLabel" }] : /* istanbul ignore next */ []));
        this.rightAxisLabel = input('', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "rightAxisLabel" }] : /* istanbul ignore next */ []));
        this.heightPx = input(300, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "heightPx" }] : /* istanbul ignore next */ []));
        this.ariaLabel = input('Time series chart', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
        this.emptyTitle = input('No timeline data yet', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "emptyTitle" }] : /* istanbul ignore next */ []));
        this.emptyMessage = input('', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "emptyMessage" }] : /* istanbul ignore next */ []));
        this.showLegend = input(true, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "showLegend" }] : /* istanbul ignore next */ []));
        this.interactive = input(true, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "interactive" }] : /* istanbul ignore next */ []));
        this.tooltipTemplate = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "tooltipTemplate" }] : /* istanbul ignore next */ []));
        this.pointClick = output();
        this.activePointChange = output();
        this.visibleSeriesChange = output();
        this.stageWidth = signal(DEFAULT_STAGE_WIDTH, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "stageWidth" }] : /* istanbul ignore next */ []));
        this.visibilityOverrides = signal({}, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "visibilityOverrides" }] : /* istanbul ignore next */ []));
        this.activeIndex = signal(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "activeIndex" }] : /* istanbul ignore next */ []));
        this.visibleSeries = computed(() => {
            const overrides = this.visibilityOverrides();
            return this.series().filter((s) => this.resolveVisibility(s, overrides));
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "visibleSeries" }] : /* istanbul ignore next */ []));
        this.showAllDots = computed(() => this.points().length <= 24, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "showAllDots" }] : /* istanbul ignore next */ []));
        this.geometry = computed(() => {
            const width = Math.max(280, this.stageWidth());
            const height = Math.max(180, this.heightPx());
            const pts = this.points();
            const vis = this.visibleSeries();
            const leftSeries = vis.filter((s) => (s.axis ?? 'left') === 'left');
            const rightSeries = vis.filter((s) => s.axis === 'right');
            const hasLeftAxis = leftSeries.length > 0;
            const hasRightAxis = rightSeries.length > 0;
            const isNarrow = width < 480;
            const padLeft = hasLeftAxis ? (isNarrow ? 50 : 66) : isNarrow ? 16 : 24;
            const padRight = hasRightAxis ? (isNarrow ? 40 : 54) : isNarrow ? 16 : 24;
            const plotWidth = Math.max(80, width - padLeft - padRight);
            const plotHeight = Math.max(80, height - PAD_TOP - PAD_BOTTOM);
            const baselineY = PAD_TOP + plotHeight;
            let leftMax = 0;
            for (const s of leftSeries) {
                for (const p of pts) {
                    const val = p.values[s.id];
                    if (typeof val === 'number' && Number.isFinite(val) && val > leftMax) {
                        leftMax = val;
                    }
                }
            }
            let rightMax = 0;
            for (const s of rightSeries) {
                for (const p of pts) {
                    const val = p.values[s.id];
                    if (typeof val === 'number' && Number.isFinite(val) && val > rightMax) {
                        rightMax = val;
                    }
                }
            }
            const leftAxis = computeNiceAxisTicks(leftMax, 5);
            const rightAxis = computeNiceAxisTicks(rightMax, 5);
            const primaryTicks = hasLeftAxis ? leftAxis.ticks : rightAxis.ticks;
            const primaryAxisMax = hasLeftAxis ? leftAxis.max : rightAxis.max;
            return {
                width,
                height,
                padLeft,
                padRight,
                plotWidth,
                plotHeight,
                baselineY,
                hasLeftAxis,
                hasRightAxis,
                leftAxis,
                rightAxis,
                primaryTicks,
                primaryAxisMax,
            };
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "geometry" }] : /* istanbul ignore next */ []));
        this.pointXPositions = computed(() => {
            const pts = this.points();
            const geom = this.geometry();
            const n = pts.length;
            if (n === 0)
                return [];
            if (n === 1) {
                return [geom.padLeft + geom.plotWidth / 2];
            }
            if (this.mode() === 'bar') {
                const slot = geom.plotWidth / n;
                return pts.map((_, i) => geom.padLeft + (i + 0.5) * slot);
            }
            return pts.map((_, i) => geom.padLeft + (i / (n - 1)) * geom.plotWidth);
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "pointXPositions" }] : /* istanbul ignore next */ []));
        this.gridLines = computed(() => {
            const geom = this.geometry();
            return geom.primaryTicks.map((value) => ({
                value,
                y: roundFloat(geom.baselineY - (value / geom.primaryAxisMax) * geom.plotHeight),
            }));
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "gridLines" }] : /* istanbul ignore next */ []));
        this.leftAxisLabels = computed(() => {
            const geom = this.geometry();
            if (!geom.hasLeftAxis)
                return [];
            const fmt = this.leftAxisFormatter();
            return geom.leftAxis.ticks.map((value) => ({
                value,
                y: roundFloat(geom.baselineY - (value / geom.leftAxis.max) * geom.plotHeight),
                text: fmt(value),
            }));
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "leftAxisLabels" }] : /* istanbul ignore next */ []));
        this.rightAxisLabels = computed(() => {
            const geom = this.geometry();
            if (!geom.hasRightAxis)
                return [];
            const fmt = this.rightAxisFormatter();
            return geom.rightAxis.ticks.map((value) => ({
                value,
                y: roundFloat(geom.baselineY - (value / geom.rightAxis.max) * geom.plotHeight),
                text: fmt(value),
            }));
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "rightAxisLabels" }] : /* istanbul ignore next */ []));
        this.rightAxisTint = computed(() => {
            const vis = this.visibleSeries().filter((s) => s.axis === 'right');
            return vis.length === 1 ? vis[0].color : null;
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "rightAxisTint" }] : /* istanbul ignore next */ []));
        this.renderedLineSeries = computed(() => {
            if (this.mode() !== 'line')
                return [];
            const pts = this.points();
            const xs = this.pointXPositions();
            const geom = this.geometry();
            return this.visibleSeries().map((s) => {
                const axisMax = s.axis === 'right' ? geom.rightAxis.max : geom.leftAxis.max;
                const coords = pts.map((pt, idx) => {
                    const raw = pt.values[s.id];
                    if (typeof raw !== 'number' || !Number.isFinite(raw)) {
                        return null;
                    }
                    const clamped = Math.max(0, raw);
                    const y = geom.baselineY - (clamped / axisMax) * geom.plotHeight;
                    return { x: xs[idx], y: roundFloat(y), index: idx };
                });
                const linePath = buildSeriesLinePath(coords);
                const areaPath = s.areaFill
                    ? buildSeriesAreaPath(coords, geom.baselineY)
                    : '';
                const dots = coords.filter((c) => c !== null);
                return { series: s, linePath, areaPath, dots };
            });
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "renderedLineSeries" }] : /* istanbul ignore next */ []));
        this.renderedDiffBand = computed(() => {
            const band = this.diffBand();
            if (!band || this.mode() !== 'line')
                return [];
            const vis = this.visibleSeries();
            const upper = vis.find((s) => s.id === band.upperSeriesId);
            const lower = vis.find((s) => s.id === band.lowerSeriesId);
            if (!upper || !lower)
                return [];
            if ((upper.axis ?? 'left') !== (lower.axis ?? 'left'))
                return [];
            const geom = this.geometry();
            const axisMax = upper.axis === 'right' ? geom.rightAxis.max : geom.leftAxis.max;
            const xs = this.pointXPositions();
            const pts = this.points();
            const pairs = pts.map((pt, idx) => {
                const uRaw = pt.values[upper.id];
                const lRaw = pt.values[lower.id];
                const upperY = typeof uRaw === 'number' && Number.isFinite(uRaw)
                    ? roundFloat(geom.baselineY - (Math.max(0, uRaw) / axisMax) * geom.plotHeight)
                    : null;
                const lowerY = typeof lRaw === 'number' && Number.isFinite(lRaw)
                    ? roundFloat(geom.baselineY - (Math.max(0, lRaw) / axisMax) * geom.plotHeight)
                    : null;
                return { x: xs[idx], upperY, lowerY };
            });
            const posColor = band.positiveColor ?? 'rgba(34, 197, 94, 0.14)';
            const negColor = band.negativeColor ?? 'rgba(248, 113, 113, 0.14)';
            return buildDiffBandSegments(pairs).map((seg) => ({
                path: seg.path,
                color: seg.positive ? posColor : negColor,
            }));
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "renderedDiffBand" }] : /* istanbul ignore next */ []));
        this.renderedBars = computed(() => {
            if (this.mode() !== 'bar')
                return [];
            const pts = this.points();
            const vis = this.visibleSeries();
            const xs = this.pointXPositions();
            const geom = this.geometry();
            const n = pts.length;
            const m = vis.length;
            if (n === 0 || m === 0)
                return [];
            const slotWidth = geom.plotWidth / n;
            const groupWidth = Math.min(44, Math.max(6, slotWidth * 0.72));
            const innerGap = m > 1 ? Math.min(4, groupWidth * 0.1) : 0;
            const barWidth = Math.max(2, (groupWidth - innerGap * (m - 1)) / m);
            const bars = [];
            for (let i = 0; i < n; i++) {
                const centerX = xs[i];
                const groupStartX = centerX - groupWidth / 2;
                for (let j = 0; j < m; j++) {
                    const s = vis[j];
                    const raw = pts[i].values[s.id];
                    if (typeof raw !== 'number' || !Number.isFinite(raw) || raw <= 0) {
                        continue;
                    }
                    const axisMax = s.axis === 'right' ? geom.rightAxis.max : geom.leftAxis.max;
                    const barHeight = Math.max(2, (raw / axisMax) * geom.plotHeight);
                    bars.push({
                        key: `${pts[i].key}:${s.id}`,
                        index: i,
                        x: roundFloat(groupStartX + j * (barWidth + innerGap)),
                        y: roundFloat(geom.baselineY - barHeight),
                        width: roundFloat(barWidth),
                        height: roundFloat(barHeight),
                        color: s.color,
                    });
                }
            }
            return bars;
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "renderedBars" }] : /* istanbul ignore next */ []));
        this.xAxisLabels = computed(() => {
            const pts = this.points();
            const xs = this.pointXPositions();
            const w = this.geometry().width;
            const maxLabels = w < 460 ? 4 : w < 700 ? 6 : 9;
            const step = computeXLabelStep(pts.length, maxLabels);
            const out = [];
            for (let i = 0; i < pts.length; i++) {
                const isLast = i === pts.length - 1;
                const lastEmittedIdx = out.length > 0 ? out[out.length - 1].index : -99;
                if (i % step === 0 ||
                    (isLast && i - lastEmittedIdx >= Math.max(1, Math.floor(step / 2)))) {
                    out.push({
                        index: i,
                        x: roundFloat(xs[i]),
                        text: pts[i].shortLabel || pts[i].label,
                    });
                }
            }
            return out;
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "xAxisLabels" }] : /* istanbul ignore next */ []));
        this.hitColumns = computed(() => {
            const pts = this.points();
            const xs = this.pointXPositions();
            const geom = this.geometry();
            const vis = this.visibleSeries();
            const n = pts.length;
            if (n === 0)
                return [];
            return pts.map((pt, i) => {
                const prevMid = i === 0 ? geom.padLeft : (xs[i - 1] + xs[i]) / 2;
                const nextMid = i === n - 1 ? geom.width - geom.padRight : (xs[i] + xs[i + 1]) / 2;
                const summaryParts = vis
                    .map((s) => {
                    const val = pt.values[s.id];
                    if (typeof val !== 'number' || !Number.isFinite(val))
                        return null;
                    return `${s.label}: ${this.formatSeriesValue(s, val)}`;
                })
                    .filter((part) => part !== null);
                return {
                    index: i,
                    x: roundFloat(prevMid),
                    width: roundFloat(Math.max(8, nextMid - prevMid)),
                    ariaLabel: `${pt.label}${summaryParts.length ? ` — ${summaryParts.join(', ')}` : ''}`,
                };
            });
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "hitColumns" }] : /* istanbul ignore next */ []));
        this.activeCrosshairX = computed(() => {
            const idx = this.activeIndex();
            if (idx === null)
                return null;
            const xs = this.pointXPositions();
            return idx >= 0 && idx < xs.length ? roundFloat(xs[idx]) : null;
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "activeCrosshairX" }] : /* istanbul ignore next */ []));
        this.activeTooltipData = computed(() => {
            const idx = this.activeIndex();
            const pts = this.points();
            if (idx === null || idx < 0 || idx >= pts.length)
                return null;
            const pt = pts[idx];
            const xs = this.pointXPositions();
            const geom = this.geometry();
            const xPct = (xs[idx] / geom.width) * 100;
            const vis = this.visibleSeries();
            const rows = vis
                .map((s) => {
                const val = pt.values[s.id];
                if (typeof val !== 'number' || !Number.isFinite(val))
                    return null;
                return {
                    id: s.id,
                    label: s.label,
                    color: s.color,
                    formatted: this.formatSeriesValue(s, val),
                };
            })
                .filter((r) => r !== null);
            return {
                point: pt,
                index: idx,
                leftPct: roundFloat(xPct),
                flipLeft: xPct > 56,
                rows,
            };
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "activeTooltipData" }] : /* istanbul ignore next */ []));
    }
    static { this.nextInstanceId = 0; }
    ngAfterViewInit() {
        const el = this.stageRef?.nativeElement;
        if (!el)
            return;
        const measure = () => {
            const w = Math.round(el.clientWidth);
            if (w >= 240 && w !== this.stageWidth()) {
                this.stageWidth.set(w);
            }
        };
        measure();
        if (typeof ResizeObserver !== 'undefined') {
            this.resizeObserver = new ResizeObserver(() => measure());
            this.resizeObserver.observe(el);
        }
    }
    ngOnDestroy() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    }
    isSeriesVisible(s) {
        return this.resolveVisibility(s, this.visibilityOverrides());
    }
    toggleSeries(seriesId) {
        const target = this.series().find((s) => s.id === seriesId);
        if (!target || target.disabled)
            return;
        const currentVisible = this.visibleSeries();
        const isCurrentlyVisible = currentVisible.some((s) => s.id === seriesId);
        if (isCurrentlyVisible && currentVisible.length <= 1) {
            return;
        }
        this.visibilityOverrides.update((prev) => ({
            ...prev,
            [seriesId]: !isCurrentlyVisible,
        }));
        this.visibleSeriesChange.emit(this.visibleSeries().map((s) => s.id));
    }
    setActiveIndex(index) {
        if (index === this.activeIndex())
            return;
        this.activeIndex.set(index);
        const pts = this.points();
        const pt = index !== null && index >= 0 && index < pts.length ? pts[index] : null;
        this.activePointChange.emit(pt);
    }
    onStageMouseLeave() {
        this.setActiveIndex(null);
    }
    onHitBlur(_event) {
        this.setActiveIndex(null);
    }
    onHitClick(index) {
        const pts = this.points();
        if (!this.interactive() || index < 0 || index >= pts.length)
            return;
        this.pointClick.emit(pts[index]);
    }
    onHitKeydown(event, index) {
        const n = this.points().length;
        if (n === 0)
            return;
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            this.setActiveIndex(Math.min(n - 1, index + 1));
        }
        else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            this.setActiveIndex(Math.max(0, index - 1));
        }
        else if (event.key === 'Home') {
            event.preventDefault();
            this.setActiveIndex(0);
        }
        else if (event.key === 'End') {
            event.preventDefault();
            this.setActiveIndex(n - 1);
        }
        else if (event.key === 'Enter' || event.key === ' ') {
            if (this.interactive()) {
                event.preventDefault();
                this.onHitClick(index);
            }
        }
        else if (event.key === 'Escape') {
            this.setActiveIndex(null);
        }
    }
    getGradientId(seriesId) {
        const safe = seriesId.replace(/[^a-zA-Z0-9_-]/g, '_');
        return `kit-ts-grad-${this.chartUid}-${safe}`;
    }
    resolveVisibility(s, overrides) {
        if (s.disabled)
            return false;
        if (Object.prototype.hasOwnProperty.call(overrides, s.id)) {
            return overrides[s.id];
        }
        return !s.hiddenByDefault;
    }
    formatSeriesValue(s, val) {
        if (s.formatValue)
            return s.formatValue(val);
        return s.axis === 'right'
            ? this.rightAxisFormatter()(val)
            : this.leftAxisFormatter()(val);
    }
    static { this.ɵfac = function KitTimeSeriesChartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitTimeSeriesChartComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitTimeSeriesChartComponent, selectors: [["kit-time-series-chart"]], viewQuery: function KitTimeSeriesChartComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.stageRef = _t.first);
        } }, inputs: { points: [1, "points"], series: [1, "series"], mode: [1, "mode"], diffBand: [1, "diffBand"], leftAxisFormatter: [1, "leftAxisFormatter"], rightAxisFormatter: [1, "rightAxisFormatter"], leftAxisLabel: [1, "leftAxisLabel"], rightAxisLabel: [1, "rightAxisLabel"], heightPx: [1, "heightPx"], ariaLabel: [1, "ariaLabel"], emptyTitle: [1, "emptyTitle"], emptyMessage: [1, "emptyMessage"], showLegend: [1, "showLegend"], interactive: [1, "interactive"], tooltipTemplate: [1, "tooltipTemplate"] }, outputs: { pointClick: "pointClick", activePointChange: "activePointChange", visibleSeriesChange: "visibleSeriesChange" }, decls: 4, vars: 3, consts: [["stageRef", ""], [1, "kit-ts-chart"], ["role", "group", "aria-label", "Chart series visibility", 1, "kit-ts-legend"], [1, "kit-ts-empty", 3, "min-height"], [1, "kit-ts-stage"], ["type", "button", 1, "kit-ts-legend-btn", 3, "active", "disabled"], ["type", "button", 1, "kit-ts-legend-btn", 3, "click", "disabled"], [1, "kit-ts-legend-swatch"], [1, "kit-ts-legend-label"], [1, "kit-ts-legend-hint"], [1, "kit-ts-empty"], [1, "kit-ts-empty-title"], [1, "kit-ts-empty-message"], [1, "kit-ts-stage", 3, "mouseleave"], ["role", "img", 1, "kit-ts-svg"], [1, "kit-ts-grid"], [1, "kit-ts-grid-line"], [1, "kit-ts-axis", "kit-ts-axis-left"], [1, "kit-ts-axis", "kit-ts-axis-right"], [1, "kit-ts-crosshair"], [1, "kit-ts-x-axis"], ["text-anchor", "middle", 1, "kit-ts-axis-text", 3, "active"], [1, "kit-ts-hits"], ["tabindex", "0", 1, "kit-ts-hit-rect", 3, "clickable"], ["role", "status", "aria-live", "polite", 1, "kit-ts-tooltip", 3, "align-right", "left"], ["x1", "0", "y1", "0", "x2", "0", "y2", "1"], ["offset", "0%", "stop-opacity", "0.22"], ["offset", "100%", "stop-opacity", "0.01"], ["text-anchor", "end", 1, "kit-ts-axis-text"], ["y", "11", "text-anchor", "start", 1, "kit-ts-axis-caption"], ["text-anchor", "start", 1, "kit-ts-axis-text", 3, "fill"], ["y", "11", "text-anchor", "end", 1, "kit-ts-axis-caption", 3, "fill"], ["text-anchor", "start", 1, "kit-ts-axis-text"], ["y", "11", "text-anchor", "end", 1, "kit-ts-axis-caption"], [1, "kit-ts-diff-band"], [1, "kit-ts-area"], ["fill", "none", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "kit-ts-line"], [1, "kit-ts-dot", 3, "active"], [1, "kit-ts-dot"], ["rx", "3", 1, "kit-ts-bar", 3, "active"], ["rx", "3", 1, "kit-ts-bar"], ["text-anchor", "middle", 1, "kit-ts-axis-text"], ["tabindex", "0", 1, "kit-ts-hit-rect", 3, "mouseenter", "focus", "blur", "click", "keydown"], ["role", "status", "aria-live", "polite", 1, "kit-ts-tooltip"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "kit-ts-tooltip-title"], [1, "kit-ts-tooltip-rows"], [1, "kit-ts-tooltip-row"], [1, "kit-ts-tooltip-key"], [1, "kit-ts-tooltip-dot"], [1, "kit-ts-tooltip-val"]], template: function KitTimeSeriesChartComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵconditionalCreate(1, KitTimeSeriesChartComponent_Conditional_1_Template, 3, 0, "div", 2);
            i0.ɵɵconditionalCreate(2, KitTimeSeriesChartComponent_Conditional_2_Template, 4, 4, "div", 3)(3, KitTimeSeriesChartComponent_Conditional_3_Template, 21, 9, "div", 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵattribute("aria-label", ctx.ariaLabel());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showLegend() && ctx.series().length > 0 ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.points().length === 0 ? 2 : 3);
        } }, dependencies: [NgTemplateOutlet], styles: ["\n      .kit-ts-chart {\n        display: flex;\n        flex-direction: column;\n        gap: 12px;\n        width: 100%;\n        min-width: 0;\n      }\n\n      .kit-ts-legend {\n        display: flex;\n        flex-wrap: wrap;\n        align-items: center;\n        gap: 8px;\n      }\n\n      .kit-ts-legend-btn {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        padding: 5px 11px;\n        border-radius: var(--%NS%kit-radius-full);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        background: var(--%NS%kit-surface-container-high);\n        color: var(--%NS%kit-on-surface-variant);\n        font-family: inherit;\n        font-size: 0.78rem;\n        font-weight: 600;\n        cursor: pointer;\n        opacity: 0.58;\n        transition:\n          opacity var(--%NS%kit-duration-fast) ease,\n          border-color var(--%NS%kit-duration-fast) ease,\n          background-color var(--%NS%kit-duration-fast) ease,\n          color var(--%NS%kit-duration-fast) ease;\n      }\n\n      .kit-ts-legend-btn.active {\n        opacity: 1;\n        color: var(--%NS%kit-on-surface);\n        border-color: var(--%NS%kit-outline);\n      }\n\n      .kit-ts-legend-btn:hover:not(:disabled) {\n        background: var(--%NS%kit-surface-container-highest);\n      }\n\n      .kit-ts-legend-btn.disabled,\n      .kit-ts-legend-btn:disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n      }\n\n      .kit-ts-legend-swatch {\n        width: 10px;\n        height: 10px;\n        border-radius: 50%;\n        flex-shrink: 0;\n      }\n\n      .kit-ts-legend-swatch.dashed {\n        width: 14px;\n        height: 0;\n        border-radius: 0;\n        border-top: 2px dashed;\n        background: transparent;\n      }\n\n      .kit-ts-legend-hint {\n        font-size: 0.72rem;\n        font-weight: 500;\n        color: var(--%NS%kit-on-surface-variant);\n      }\n\n      .kit-ts-stage {\n        position: relative;\n        width: 100%;\n        min-width: 0;\n      }\n\n      .kit-ts-svg {\n        display: block;\n        width: 100%;\n        overflow: visible;\n        user-select: none;\n      }\n\n      .kit-ts-grid-line {\n        stroke: var(--%NS%kit-outline-variant);\n        stroke-width: 1;\n        stroke-dasharray: 3 4;\n        opacity: 0.65;\n      }\n\n      .kit-ts-axis-text {\n        fill: var(--%NS%kit-on-surface-variant);\n        font-family: var(--%NS%kit-font-sans);\n        font-size: 11px;\n        font-weight: 500;\n        font-variant-numeric: tabular-nums;\n      }\n\n      .kit-ts-axis-text.active {\n        fill: var(--%NS%kit-on-surface);\n        font-weight: 700;\n      }\n\n      .kit-ts-axis-caption {\n        fill: var(--%NS%kit-on-surface-variant);\n        font-family: var(--%NS%kit-font-sans);\n        font-size: 10px;\n        font-weight: 700;\n        letter-spacing: 0.04em;\n        text-transform: uppercase;\n      }\n\n      .kit-ts-line {\n        transition: opacity var(--%NS%kit-duration-fast) ease;\n      }\n\n      .kit-ts-dot {\n        stroke: var(--%NS%kit-surface-container);\n        stroke-width: 1.5;\n        transition: r var(--%NS%kit-duration-fast) ease;\n      }\n\n      .kit-ts-bar {\n        opacity: 0.88;\n        transition: opacity var(--%NS%kit-duration-fast) ease;\n      }\n\n      .kit-ts-bar.active {\n        opacity: 1;\n      }\n\n      .kit-ts-crosshair {\n        stroke: var(--%NS%kit-outline);\n        stroke-width: 1.25;\n        stroke-dasharray: 4 3;\n        pointer-events: none;\n      }\n\n      .kit-ts-hit-rect {\n        fill: transparent;\n        outline: none;\n      }\n\n      .kit-ts-hit-rect.clickable {\n        cursor: pointer;\n      }\n\n      .kit-ts-hit-rect:focus-visible {\n        fill: color-mix(in srgb, var(--%NS%kit-primary) 8%, transparent);\n      }\n\n      .kit-ts-tooltip {\n        position: absolute;\n        top: 8px;\n        z-index: 15;\n        transform: translateX(10px);\n        min-width: 185px;\n        max-width: 270px;\n        padding: 10px 12px;\n        border-radius: var(--%NS%kit-radius-sm);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        background: var(--%NS%kit-surface-container-highest);\n        color: var(--%NS%kit-on-surface);\n        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);\n        pointer-events: none;\n        font-size: 0.78rem;\n        font-variant-numeric: tabular-nums;\n      }\n\n      .kit-ts-tooltip.align-right {\n        transform: translateX(calc(-100% - 10px));\n      }\n\n      .kit-ts-tooltip-title {\n        font-weight: 700;\n        color: var(--%NS%kit-on-surface);\n        margin-bottom: 6px;\n      }\n\n      .kit-ts-tooltip-rows {\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n      }\n\n      .kit-ts-tooltip-row {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 12px;\n      }\n\n      .kit-ts-tooltip-key {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        color: var(--%NS%kit-on-surface-variant);\n      }\n\n      .kit-ts-tooltip-dot {\n        width: 8px;\n        height: 8px;\n        border-radius: 50%;\n        flex-shrink: 0;\n      }\n\n      .kit-ts-tooltip-val {\n        color: var(--%NS%kit-on-surface);\n        font-weight: 700;\n      }\n\n      .kit-ts-empty {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        text-align: center;\n        padding: 24px;\n        border-radius: var(--%NS%kit-radius-sm);\n        border: 1px dashed var(--%NS%kit-outline-variant);\n        background: var(--%NS%kit-surface-container-low);\n      }\n\n      .kit-ts-empty-title {\n        margin: 0 0 4px 0;\n        font-size: 0.92rem;\n        font-weight: 600;\n        color: var(--%NS%kit-on-surface);\n      }\n\n      .kit-ts-empty-message {\n        margin: 0;\n        font-size: 0.8rem;\n        color: var(--%NS%kit-on-surface-variant);\n        max-width: 440px;\n      }\n\n      @media (max-width: 600px) {\n        .kit-ts-tooltip {\n          position: static;\n          transform: none !important;\n          max-width: 100%;\n          margin-top: 8px;\n        }\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-ts-chart * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitTimeSeriesChartComponent, [{
        type: Component,
        args: [{ selector: 'kit-time-series-chart', standalone: true, imports: [NgTemplateOutlet], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="kit-ts-chart" [attr.aria-label]="ariaLabel()">
      @if (showLegend() && series().length > 0) {
        <div
          class="kit-ts-legend"
          role="group"
          aria-label="Chart series visibility"
        >
          @for (s of series(); track s.id) {
            <button
              type="button"
              class="kit-ts-legend-btn"
              [class.active]="isSeriesVisible(s)"
              [class.disabled]="!!s.disabled"
              [disabled]="!!s.disabled"
              [attr.aria-pressed]="isSeriesVisible(s)"
              [attr.title]="
                s.disabled
                  ? s.disabledHint || s.label + ' unavailable'
                  : 'Toggle ' + s.label
              "
              (click)="toggleSeries(s.id)"
            >
              <span
                class="kit-ts-legend-swatch"
                [class.dashed]="!!s.dashed"
                [style.background]="s.dashed ? null : s.color"
                [style.border-color]="s.dashed ? s.color : null"
              ></span>
              <span class="kit-ts-legend-label">{{ s.label }}</span>
              @if (s.disabled && s.disabledHint) {
                <span class="kit-ts-legend-hint">· {{ s.disabledHint }}</span>
              }
            </button>
          }
        </div>
      }

      @if (points().length === 0) {
        <div class="kit-ts-empty" [style.min-height.px]="heightPx()">
          <p class="kit-ts-empty-title">{{ emptyTitle() }}</p>
          @if (emptyMessage()) {
            <p class="kit-ts-empty-message">{{ emptyMessage() }}</p>
          }
        </div>
      } @else {
        <div #stageRef class="kit-ts-stage" (mouseleave)="onStageMouseLeave()">
          <svg
            class="kit-ts-svg"
            [attr.viewBox]="'0 0 ' + geometry().width + ' ' + geometry().height"
            [style.height.px]="geometry().height"
            role="img"
            [attr.aria-label]="ariaLabel()"
          >
            <defs>
              @for (s of visibleSeries(); track s.id) {
                @if (s.areaFill && mode() === 'line') {
                  <linearGradient
                    [attr.id]="getGradientId(s.id)"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      [attr.stop-color]="s.color"
                      stop-opacity="0.22"
                    />
                    <stop
                      offset="100%"
                      [attr.stop-color]="s.color"
                      stop-opacity="0.01"
                    />
                  </linearGradient>
                }
              }
            </defs>

            <!-- Horizontal Gridlines -->
            <g class="kit-ts-grid">
              @for (tick of gridLines(); track tick.value) {
                <line
                  class="kit-ts-grid-line"
                  [attr.x1]="geometry().padLeft"
                  [attr.y1]="tick.y"
                  [attr.x2]="geometry().width - geometry().padRight"
                  [attr.y2]="tick.y"
                />
              }
            </g>

            <!-- Left Y-Axis Labels -->
            @if (geometry().hasLeftAxis) {
              <g class="kit-ts-axis kit-ts-axis-left">
                @for (lbl of leftAxisLabels(); track lbl.value) {
                  <text
                    class="kit-ts-axis-text"
                    [attr.x]="geometry().padLeft - 8"
                    [attr.y]="lbl.y + 4"
                    text-anchor="end"
                  >
                    {{ lbl.text }}
                  </text>
                }
                @if (leftAxisLabel()) {
                  <text
                    class="kit-ts-axis-caption"
                    [attr.x]="geometry().padLeft"
                    y="11"
                    text-anchor="start"
                  >
                    {{ leftAxisLabel() }}
                  </text>
                }
              </g>
            }

            <!-- Right Y-Axis Labels -->
            @if (geometry().hasRightAxis) {
              <g class="kit-ts-axis kit-ts-axis-right">
                @for (lbl of rightAxisLabels(); track lbl.value) {
                  <text
                    class="kit-ts-axis-text"
                    [attr.x]="geometry().width - geometry().padRight + 8"
                    [attr.y]="lbl.y + 4"
                    text-anchor="start"
                    [style.fill]="rightAxisTint()"
                  >
                    {{ lbl.text }}
                  </text>
                }
                @if (rightAxisLabel()) {
                  <text
                    class="kit-ts-axis-caption"
                    [attr.x]="geometry().width - geometry().padRight"
                    y="11"
                    text-anchor="end"
                    [style.fill]="rightAxisTint()"
                  >
                    {{ rightAxisLabel() }}
                  </text>
                }
              </g>
            }

            <!-- Line / Area Mode -->
            @if (mode() === 'line') {
              @for (seg of renderedDiffBand(); track $index) {
                <path
                  [attr.d]="seg.path"
                  [attr.fill]="seg.color"
                  class="kit-ts-diff-band"
                />
              }

              @for (render of renderedLineSeries(); track render.series.id) {
                @if (render.areaPath) {
                  <path
                    [attr.d]="render.areaPath"
                    [attr.fill]="
                      'url(#' + getGradientId(render.series.id) + ')'
                    "
                    class="kit-ts-area"
                  />
                }
                @if (render.linePath) {
                  <path
                    [attr.d]="render.linePath"
                    fill="none"
                    [attr.stroke]="render.series.color"
                    [attr.stroke-dasharray]="
                      render.series.dashed ? '6 4' : null
                    "
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="kit-ts-line"
                  />
                }
                @for (pt of render.dots; track pt.index) {
                  @if (showAllDots() || activeIndex() === pt.index) {
                    <circle
                      [attr.cx]="pt.x"
                      [attr.cy]="pt.y"
                      [attr.r]="activeIndex() === pt.index ? 5 : 3"
                      [attr.fill]="render.series.color"
                      class="kit-ts-dot"
                      [class.active]="activeIndex() === pt.index"
                    />
                  }
                }
              }
            } @else {
              <!-- Grouped Bar Mode -->
              @for (bar of renderedBars(); track bar.key) {
                <rect
                  class="kit-ts-bar"
                  [class.active]="activeIndex() === bar.index"
                  [attr.x]="bar.x"
                  [attr.y]="bar.y"
                  [attr.width]="bar.width"
                  [attr.height]="bar.height"
                  [attr.fill]="bar.color"
                  rx="3"
                />
              }
            }

            <!-- Active Crosshair -->
            @if (activeCrosshairX(); as cx) {
              <line
                class="kit-ts-crosshair"
                [attr.x1]="cx"
                [attr.y1]="padTop"
                [attr.x2]="cx"
                [attr.y2]="geometry().baselineY"
              />
            }

            <!-- X-Axis Labels -->
            <g class="kit-ts-x-axis">
              @for (xl of xAxisLabels(); track xl.index) {
                <text
                  class="kit-ts-axis-text"
                  [class.active]="activeIndex() === xl.index"
                  [attr.x]="xl.x"
                  [attr.y]="geometry().height - 10"
                  text-anchor="middle"
                >
                  {{ xl.text }}
                </text>
              }
            </g>

            <!-- Interactive Column Hit Targets -->
            <g class="kit-ts-hits">
              @for (hit of hitColumns(); track hit.index) {
                <rect
                  class="kit-ts-hit-rect"
                  [class.clickable]="interactive()"
                  [attr.x]="hit.x"
                  [attr.y]="padTop"
                  [attr.width]="hit.width"
                  [attr.height]="geometry().plotHeight"
                  tabindex="0"
                  [attr.role]="interactive() ? 'button' : 'img'"
                  [attr.aria-label]="hit.ariaLabel"
                  (mouseenter)="setActiveIndex(hit.index)"
                  (focus)="setActiveIndex(hit.index)"
                  (blur)="onHitBlur($event)"
                  (click)="onHitClick(hit.index)"
                  (keydown)="onHitKeydown($event, hit.index)"
                />
              }
            </g>
          </svg>

          <!-- Floating Crosshair Tooltip -->
          @if (activeTooltipData(); as tip) {
            <div
              class="kit-ts-tooltip"
              [class.align-right]="tip.flipLeft"
              [style.left.%]="tip.leftPct"
              role="status"
              aria-live="polite"
            >
              @if (tooltipTemplate(); as customTpl) {
                <ng-container
                  [ngTemplateOutlet]="customTpl"
                  [ngTemplateOutletContext]="{
                    $implicit: tip.point,
                    point: tip.point,
                    index: tip.index,
                    visibleSeries: visibleSeries(),
                  }"
                />
              } @else {
                <div class="kit-ts-tooltip-title">{{ tip.point.label }}</div>
                <div class="kit-ts-tooltip-rows">
                  @for (row of tip.rows; track row.id) {
                    <div class="kit-ts-tooltip-row">
                      <span class="kit-ts-tooltip-key">
                        <span
                          class="kit-ts-tooltip-dot"
                          [style.background]="row.color"
                        ></span>
                        <span>{{ row.label }}</span>
                      </span>
                      <strong class="kit-ts-tooltip-val">{{
                        row.formatted
                      }}</strong>
                    </div>
                  }
                </div>
              }
            </div>
          }
        </div>
      }
    </div>
  `, styles: ["\n      .kit-ts-chart {\n        display: flex;\n        flex-direction: column;\n        gap: 12px;\n        width: 100%;\n        min-width: 0;\n      }\n\n      .kit-ts-legend {\n        display: flex;\n        flex-wrap: wrap;\n        align-items: center;\n        gap: 8px;\n      }\n\n      .kit-ts-legend-btn {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        padding: 5px 11px;\n        border-radius: var(--kit-radius-full);\n        border: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container-high);\n        color: var(--kit-on-surface-variant);\n        font-family: inherit;\n        font-size: 0.78rem;\n        font-weight: 600;\n        cursor: pointer;\n        opacity: 0.58;\n        transition:\n          opacity var(--kit-duration-fast) ease,\n          border-color var(--kit-duration-fast) ease,\n          background-color var(--kit-duration-fast) ease,\n          color var(--kit-duration-fast) ease;\n      }\n\n      .kit-ts-legend-btn.active {\n        opacity: 1;\n        color: var(--kit-on-surface);\n        border-color: var(--kit-outline);\n      }\n\n      .kit-ts-legend-btn:hover:not(:disabled) {\n        background: var(--kit-surface-container-highest);\n      }\n\n      .kit-ts-legend-btn.disabled,\n      .kit-ts-legend-btn:disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n      }\n\n      .kit-ts-legend-swatch {\n        width: 10px;\n        height: 10px;\n        border-radius: 50%;\n        flex-shrink: 0;\n      }\n\n      .kit-ts-legend-swatch.dashed {\n        width: 14px;\n        height: 0;\n        border-radius: 0;\n        border-top: 2px dashed;\n        background: transparent;\n      }\n\n      .kit-ts-legend-hint {\n        font-size: 0.72rem;\n        font-weight: 500;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-ts-stage {\n        position: relative;\n        width: 100%;\n        min-width: 0;\n      }\n\n      .kit-ts-svg {\n        display: block;\n        width: 100%;\n        overflow: visible;\n        user-select: none;\n      }\n\n      .kit-ts-grid-line {\n        stroke: var(--kit-outline-variant);\n        stroke-width: 1;\n        stroke-dasharray: 3 4;\n        opacity: 0.65;\n      }\n\n      .kit-ts-axis-text {\n        fill: var(--kit-on-surface-variant);\n        font-family: var(--kit-font-sans);\n        font-size: 11px;\n        font-weight: 500;\n        font-variant-numeric: tabular-nums;\n      }\n\n      .kit-ts-axis-text.active {\n        fill: var(--kit-on-surface);\n        font-weight: 700;\n      }\n\n      .kit-ts-axis-caption {\n        fill: var(--kit-on-surface-variant);\n        font-family: var(--kit-font-sans);\n        font-size: 10px;\n        font-weight: 700;\n        letter-spacing: 0.04em;\n        text-transform: uppercase;\n      }\n\n      .kit-ts-line {\n        transition: opacity var(--kit-duration-fast) ease;\n      }\n\n      .kit-ts-dot {\n        stroke: var(--kit-surface-container);\n        stroke-width: 1.5;\n        transition: r var(--kit-duration-fast) ease;\n      }\n\n      .kit-ts-bar {\n        opacity: 0.88;\n        transition: opacity var(--kit-duration-fast) ease;\n      }\n\n      .kit-ts-bar.active {\n        opacity: 1;\n      }\n\n      .kit-ts-crosshair {\n        stroke: var(--kit-outline);\n        stroke-width: 1.25;\n        stroke-dasharray: 4 3;\n        pointer-events: none;\n      }\n\n      .kit-ts-hit-rect {\n        fill: transparent;\n        outline: none;\n      }\n\n      .kit-ts-hit-rect.clickable {\n        cursor: pointer;\n      }\n\n      .kit-ts-hit-rect:focus-visible {\n        fill: color-mix(in srgb, var(--kit-primary) 8%, transparent);\n      }\n\n      .kit-ts-tooltip {\n        position: absolute;\n        top: 8px;\n        z-index: 15;\n        transform: translateX(10px);\n        min-width: 185px;\n        max-width: 270px;\n        padding: 10px 12px;\n        border-radius: var(--kit-radius-sm);\n        border: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container-highest);\n        color: var(--kit-on-surface);\n        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);\n        pointer-events: none;\n        font-size: 0.78rem;\n        font-variant-numeric: tabular-nums;\n      }\n\n      .kit-ts-tooltip.align-right {\n        transform: translateX(calc(-100% - 10px));\n      }\n\n      .kit-ts-tooltip-title {\n        font-weight: 700;\n        color: var(--kit-on-surface);\n        margin-bottom: 6px;\n      }\n\n      .kit-ts-tooltip-rows {\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n      }\n\n      .kit-ts-tooltip-row {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 12px;\n      }\n\n      .kit-ts-tooltip-key {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        color: var(--kit-on-surface-variant);\n      }\n\n      .kit-ts-tooltip-dot {\n        width: 8px;\n        height: 8px;\n        border-radius: 50%;\n        flex-shrink: 0;\n      }\n\n      .kit-ts-tooltip-val {\n        color: var(--kit-on-surface);\n        font-weight: 700;\n      }\n\n      .kit-ts-empty {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        text-align: center;\n        padding: 24px;\n        border-radius: var(--kit-radius-sm);\n        border: 1px dashed var(--kit-outline-variant);\n        background: var(--kit-surface-container-low);\n      }\n\n      .kit-ts-empty-title {\n        margin: 0 0 4px 0;\n        font-size: 0.92rem;\n        font-weight: 600;\n        color: var(--kit-on-surface);\n      }\n\n      .kit-ts-empty-message {\n        margin: 0;\n        font-size: 0.8rem;\n        color: var(--kit-on-surface-variant);\n        max-width: 440px;\n      }\n\n      @media (max-width: 600px) {\n        .kit-ts-tooltip {\n          position: static;\n          transform: none !important;\n          max-width: 100%;\n          margin-top: 8px;\n        }\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-ts-chart * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "] }]
    }], null, { stageRef: [{
            type: ViewChild,
            args: ['stageRef']
        }], points: [{ type: i0.Input, args: [{ isSignal: true, alias: "points", required: true }] }], series: [{ type: i0.Input, args: [{ isSignal: true, alias: "series", required: true }] }], mode: [{ type: i0.Input, args: [{ isSignal: true, alias: "mode", required: false }] }], diffBand: [{ type: i0.Input, args: [{ isSignal: true, alias: "diffBand", required: false }] }], leftAxisFormatter: [{ type: i0.Input, args: [{ isSignal: true, alias: "leftAxisFormatter", required: false }] }], rightAxisFormatter: [{ type: i0.Input, args: [{ isSignal: true, alias: "rightAxisFormatter", required: false }] }], leftAxisLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "leftAxisLabel", required: false }] }], rightAxisLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "rightAxisLabel", required: false }] }], heightPx: [{ type: i0.Input, args: [{ isSignal: true, alias: "heightPx", required: false }] }], ariaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }], emptyTitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "emptyTitle", required: false }] }], emptyMessage: [{ type: i0.Input, args: [{ isSignal: true, alias: "emptyMessage", required: false }] }], showLegend: [{ type: i0.Input, args: [{ isSignal: true, alias: "showLegend", required: false }] }], interactive: [{ type: i0.Input, args: [{ isSignal: true, alias: "interactive", required: false }] }], tooltipTemplate: [{ type: i0.Input, args: [{ isSignal: true, alias: "tooltipTemplate", required: false }] }], pointClick: [{ type: i0.Output, args: ["pointClick"] }], activePointChange: [{ type: i0.Output, args: ["activePointChange"] }], visibleSeriesChange: [{ type: i0.Output, args: ["visibleSeriesChange"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitTimeSeriesChartComponent, { className: "KitTimeSeriesChartComponent", filePath: "time-series-chart.component.ts", lineNumber: 873 }); })();
