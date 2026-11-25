import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation, inject, input, output, computed, effect, signal, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BottomSheetDragController } from './bottom-sheet-drag.js';
import { KIT_DIALOG_KEYFRAMES_CSS } from './dialog-keyframes.styles.js';
import { canAnimateKitDialogExit } from './dialog-sheet.component.js';
import { KitPwaInstallService } from './pwa-install.service.js';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = ["dialogEl"];
const _c1 = [[["", "profileSubview", ""]], [["", "profileExtraFields", ""]], [["", "profileExtraNav", ""]], [["", "profileIdentityBadges", ""]]];
const _c2 = ["[profileSubview]", "[profileExtraFields]", "[profileExtraNav]", "[profileIdentityBadges]"];
function KitProfileModalComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵprojection(1);
    i0.ɵɵelementEnd();
} }
function KitProfileModalComponent_Conditional_6_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 31);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("error", ctx_r1.isError());
    i0.ɵɵattribute("role", ctx_r1.isError() ? "alert" : "status");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.statusMessage(), " ");
} }
function KitProfileModalComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "header", 8)(2, "div", 9)(3, "button", 10);
    i0.ɵɵlistener("click", function KitProfileModalComponent_Conditional_6_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeEditProfile()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(4, "svg", 11);
    i0.ɵɵelement(5, "path", 12);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "h2");
    i0.ɵɵtext(7, "Edit Profile");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 13);
    i0.ɵɵlistener("click", function KitProfileModalComponent_Conditional_6_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.requestClose()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(9, "svg", 14);
    i0.ɵɵelement(10, "line", 15)(11, "line", 16);
    i0.ɵɵelementEnd()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(12, "div", 17)(13, "div", 18)(14, "div", 19)(15, "label", 20);
    i0.ɵɵtext(16, "Display Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 21);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "input", 22);
    i0.ɵɵcontrolCreate();
    i0.ɵɵlistener("ngModelChange", function KitProfileModalComponent_Conditional_6_Template_input_ngModelChange_19_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.displayNameChange.emit($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span", 23);
    i0.ɵɵtext(21, " Shown on your public collection banner when sharing is enabled. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 18)(23, "div", 19)(24, "label", 24);
    i0.ɵɵtext(25, "Bio");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span", 21);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "textarea", 25);
    i0.ɵɵcontrolCreate();
    i0.ɵɵlistener("ngModelChange", function KitProfileModalComponent_Conditional_6_Template_textarea_ngModelChange_28_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.bioChange.emit($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵprojection(29, 1);
    i0.ɵɵconditionalCreate(30, KitProfileModalComponent_Conditional_6_Conditional_30_Template, 2, 4, "p", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "footer", 27);
    i0.ɵɵelement(32, "div");
    i0.ɵɵelementStart(33, "div", 28)(34, "button", 29);
    i0.ɵɵlistener("click", function KitProfileModalComponent_Conditional_6_Template_button_click_34_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeEditProfile()); });
    i0.ɵɵtext(35, " Back ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "button", 30);
    i0.ɵɵlistener("click", function KitProfileModalComponent_Conditional_6_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveClicked.emit()); });
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(18);
    i0.ɵɵtextInterpolate1("", ctx_r1.displayName().length, " / 60");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r1.displayName());
    i0.ɵɵcontrol();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("", ctx_r1.bio().length, " / 300");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r1.bio());
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.statusMessage() ? 30 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Saving..." : "Save Changes", " ");
} }
function KitProfileModalComponent_Conditional_7_Conditional_14_Conditional_0_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 53);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const u_r6 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.displayName() || u_r6.displayName);
} }
function KitProfileModalComponent_Conditional_7_Conditional_14_Conditional_0_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 56);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const u_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(u_r6.email);
} }
function KitProfileModalComponent_Conditional_7_Conditional_14_Conditional_0_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 58);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const u_r6 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.bio() || u_r6.bio);
} }
function KitProfileModalComponent_Conditional_7_Conditional_14_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 38)(1, "div", 49)(2, "div", 50);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 51)(5, "div", 52);
    i0.ɵɵconditionalCreate(6, KitProfileModalComponent_Conditional_7_Conditional_14_Conditional_0_Conditional_6_Template, 2, 1, "span", 53);
    i0.ɵɵelementStart(7, "span", 54);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 55);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵprojection(11, 3);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(12, KitProfileModalComponent_Conditional_7_Conditional_14_Conditional_0_Conditional_12_Template, 2, 1, "span", 56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 57);
    i0.ɵɵlistener("click", function KitProfileModalComponent_Conditional_7_Conditional_14_Conditional_0_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openEditProfile()); });
    i0.ɵɵtext(14, " Edit ");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(15, KitProfileModalComponent_Conditional_7_Conditional_14_Conditional_0_Conditional_15_Template, 2, 1, "p", 58);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const u_r6 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", (ctx_r1.displayName() || u_r6.displayName || u_r6.username || "U")[0].toUpperCase(), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.displayName() || u_r6.displayName ? 6 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("@", u_r6.username);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(u_r6.role);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(u_r6.email ? 12 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.bio() || u_r6.bio ? 15 : -1);
} }
function KitProfileModalComponent_Conditional_7_Conditional_14_Conditional_12_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 61);
    i0.ɵɵtext(1, " \u2197 ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("href", ctx_r1.publicRelativePath(), i0.ɵɵsanitizeUrl);
} }
function KitProfileModalComponent_Conditional_7_Conditional_14_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 48)(1, "code", 59);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 60);
    i0.ɵɵlistener("click", function KitProfileModalComponent_Conditional_7_Conditional_14_Conditional_12_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.copyLink()); });
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, KitProfileModalComponent_Conditional_7_Conditional_14_Conditional_12_Conditional_5_Template, 2, 1, "a", 61);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.publicUrl());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isCopied() ? "Copied!" : "Copy", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.publicRelativePath() ? 5 : -1);
} }
function KitProfileModalComponent_Conditional_7_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵconditionalCreate(0, KitProfileModalComponent_Conditional_7_Conditional_14_Conditional_0_Template, 16, 6, "div", 38);
    i0.ɵɵelementStart(1, "div", 39)(2, "label", 40)(3, "div", 41)(4, "span", 42);
    i0.ɵɵtext(5, "Public Collection");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 43);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 44)(9, "input", 45);
    i0.ɵɵcontrolCreate();
    i0.ɵɵlistener("ngModelChange", function KitProfileModalComponent_Conditional_7_Conditional_14_Template_input_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onPublicToggleChange($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 46);
    i0.ɵɵelement(11, "span", 47);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(12, KitProfileModalComponent_Conditional_7_Conditional_14_Conditional_12_Template, 6, 3, "div", 48);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional((tmp_3_0 = ctx_r1.user()) ? 0 : -1, tmp_3_0);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" Allow anyone with your link to view your read-only ", ctx_r1.collectionNoun(), ". ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngModel", ctx_r1.isPublic());
    i0.ɵɵattribute("aria-checked", ctx_r1.isPublic());
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵclassProp("checked", ctx_r1.isPublic());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.isPublic() && ctx_r1.publicUrl() ? 12 : -1);
} }
function KitProfileModalComponent_Conditional_7_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36)(1, "div", 62);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 63);
    i0.ɵɵelement(3, "rect", 64)(4, "path", 65);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "h3", 66);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 67);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "a", 68);
    i0.ɵɵtext(10, " Sign In ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.guestTitle());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.guestDescription());
    i0.ɵɵadvance();
    i0.ɵɵproperty("href", ctx_r1.loginUrl(), i0.ɵɵsanitizeUrl);
} }
function KitProfileModalComponent_Conditional_7_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 37)(1, "span", 69);
    i0.ɵɵtext(2, "App");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 70)(4, "button", 71);
    i0.ɵɵlistener("click", function KitProfileModalComponent_Conditional_7_Conditional_17_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onInstallAppClick()); });
    i0.ɵɵelementStart(5, "div", 72);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(6, "svg", 73);
    i0.ɵɵelement(7, "path", 74)(8, "polyline", 75)(9, "line", 76);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(10, "div", 77)(11, "span", 78);
    i0.ɵɵtext(12, "Install App");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 79);
    i0.ɵɵtext(14, " Add to your home screen for offline access ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(15, "svg", 80);
    i0.ɵɵelement(16, "polyline", 81);
    i0.ɵɵelementEnd()()()();
} }
function KitProfileModalComponent_Conditional_7_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37)(1, "span", 69);
    i0.ɵɵtext(2, "Account");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 70)(4, "a", 82)(5, "div", 72);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(6, "svg", 73);
    i0.ɵɵelement(7, "rect", 64)(8, "path", 65);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(9, "div", 77)(10, "span", 78);
    i0.ɵɵtext(11, " Account & Security Hub ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 79);
    i0.ɵɵtext(13, " Passkeys, 2FA authenticator, password & active sessions ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(14, "svg", 80);
    i0.ɵɵelement(15, "polyline", 81);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("href", ctx_r1.accountHubUrl(), i0.ɵɵsanitizeUrl);
} }
function KitProfileModalComponent_Conditional_7_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 31);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("error", ctx_r1.isError());
    i0.ɵɵattribute("role", ctx_r1.isError() ? "alert" : "status");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.statusMessage(), " ");
} }
function KitProfileModalComponent_Conditional_7_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 83);
    i0.ɵɵlistener("click", function KitProfileModalComponent_Conditional_7_Conditional_21_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.signOutClicked.emit()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 84);
    i0.ɵɵelement(2, "path", 85)(3, "polyline", 86)(4, "line", 87);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6, "Sign Out");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 28)(8, "button", 88);
    i0.ɵɵlistener("click", function KitProfileModalComponent_Conditional_7_Conditional_21_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.requestClose()); });
    i0.ɵɵtext(9, " Close ");
    i0.ɵɵelementEnd()();
} }
function KitProfileModalComponent_Conditional_7_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelement(0, "div");
    i0.ɵɵelementStart(1, "div", 28)(2, "button", 88);
    i0.ɵɵlistener("click", function KitProfileModalComponent_Conditional_7_Conditional_22_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.requestClose()); });
    i0.ɵɵtext(3, " Close ");
    i0.ɵɵelementEnd()();
} }
function KitProfileModalComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "header", 8)(2, "div", 9)(3, "span", 32);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(4, "svg", 33);
    i0.ɵɵelement(5, "path", 34)(6, "circle", 35);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(7, "h2");
    i0.ɵɵtext(8, "Profile & Sharing");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "button", 13);
    i0.ɵɵlistener("click", function KitProfileModalComponent_Conditional_7_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.requestClose()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(10, "svg", 14);
    i0.ɵɵelement(11, "line", 15)(12, "line", 16);
    i0.ɵɵelementEnd()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(13, "div", 17);
    i0.ɵɵconditionalCreate(14, KitProfileModalComponent_Conditional_7_Conditional_14_Template, 13, 7)(15, KitProfileModalComponent_Conditional_7_Conditional_15_Template, 11, 3, "div", 36);
    i0.ɵɵprojection(16, 2);
    i0.ɵɵconditionalCreate(17, KitProfileModalComponent_Conditional_7_Conditional_17_Template, 17, 0, "div", 37);
    i0.ɵɵconditionalCreate(18, KitProfileModalComponent_Conditional_7_Conditional_18_Template, 16, 1, "div", 37);
    i0.ɵɵconditionalCreate(19, KitProfileModalComponent_Conditional_7_Conditional_19_Template, 2, 4, "p", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "footer", 27);
    i0.ɵɵconditionalCreate(21, KitProfileModalComponent_Conditional_7_Conditional_21_Template, 10, 0)(22, KitProfileModalComponent_Conditional_7_Conditional_22_Template, 4, 0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵconditional(ctx_r1.isAuthenticated() ? 14 : 15);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.showInstallAction() && ctx_r1.pwaInstall?.canShowManualInstall() ? 17 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isAuthenticated() && ctx_r1.accountHubUrl() ? 18 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.statusMessage() ? 19 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.isAuthenticated() ? 21 : 22);
} }
export class KitProfileModalComponent {
    constructor() {
        this.pwaInstall = inject(KitPwaInstallService, {
            optional: true,
        });
        this.isOpen = input(true, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "isOpen" }] : /* istanbul ignore next */ []));
        this.showInstallAction = input(true, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "showInstallAction" }] : /* istanbul ignore next */ []));
        this.activeView = input('profile', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "activeView" }] : /* istanbul ignore next */ []));
        this.isAuthenticated = input(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "isAuthenticated" }] : /* istanbul ignore next */ []));
        this.user = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "user" }] : /* istanbul ignore next */ []));
        this.displayName = input('', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "displayName" }] : /* istanbul ignore next */ []));
        this.bio = input('', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "bio" }] : /* istanbul ignore next */ []));
        this.isPublic = input(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "isPublic" }] : /* istanbul ignore next */ []));
        this.saving = input(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "saving" }] : /* istanbul ignore next */ []));
        this.statusMessage = input('', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "statusMessage" }] : /* istanbul ignore next */ []));
        this.isError = input(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "isError" }] : /* istanbul ignore next */ []));
        this.copied = input(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "copied" }] : /* istanbul ignore next */ []));
        this.accountHubUrl = input('/api/auth/account', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "accountHubUrl" }] : /* istanbul ignore next */ []));
        this.loginUrl = input('/api/auth/login', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "loginUrl" }] : /* istanbul ignore next */ []));
        this.collectionNoun = input('collection', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "collectionNoun" }] : /* istanbul ignore next */ []));
        this.guestTitle = input('Sign in to manage your collection', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "guestTitle" }] : /* istanbul ignore next */ []));
        this.guestDescription = input('Authenticate with your account to edit your collection, customize your profile, and share a public link.', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "guestDescription" }] : /* istanbul ignore next */ []));
        this.displayNameChange = output();
        this.bioChange = output();
        this.isPublicChange = output();
        this.publicToggleSaved = output();
        this.editProfileClicked = output();
        this.saveClicked = output();
        this.copyClicked = output();
        this.signOutClicked = output();
        this.closed = output();
        this.backToProfile = output();
        this.isEditingProfile = signal(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "isEditingProfile" }] : /* istanbul ignore next */ []));
        this.isClosing = signal(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "isClosing" }] : /* istanbul ignore next */ []));
        this.copiedInternal = signal(false, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "copiedInternal" }] : /* istanbul ignore next */ []));
        this.copyTimer = null;
        this.closeTimer = null;
        this.previousActiveView = 'profile';
        this.effectiveView = computed(() => {
            const v = this.activeView();
            if (v !== 'profile')
                return v;
            return this.isEditingProfile() ? 'edit' : 'profile';
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "effectiveView" }] : /* istanbul ignore next */ []));
        this.sheetDrag = new BottomSheetDragController(90);
        this.dragOffsetY = this.sheetDrag.dragOffsetY;
        this.isDragging = this.sheetDrag.isDragging;
        this.effectiveTransformY = this.sheetDrag.effectiveTransformY;
        this.isCopied = computed(() => this.copied() || this.copiedInternal(), /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "isCopied" }] : /* istanbul ignore next */ []));
        this.publicRelativePath = computed(() => {
            const username = this.user()?.username;
            if (!username)
                return '';
            return `/u/${encodeURIComponent(username)}`;
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "publicRelativePath" }] : /* istanbul ignore next */ []));
        this.publicUrl = computed(() => {
            const rel = this.publicRelativePath();
            if (!rel)
                return '';
            const origin = typeof window !== 'undefined' ? window.location.origin : '';
            return `${origin}${rel}`;
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "publicUrl" }] : /* istanbul ignore next */ []));
        effect(() => {
            const open = this.isOpen();
            queueMicrotask(() => {
                if (!open) {
                    this.isEditingProfile.set(false);
                }
                const dialog = this.dialogEl?.nativeElement;
                if (!dialog)
                    return;
                if (open) {
                    if (this.closeTimer) {
                        clearTimeout(this.closeTimer);
                        this.closeTimer = null;
                    }
                    this.isClosing.set(false);
                    if (!dialog.open && typeof dialog.showModal === 'function') {
                        dialog.showModal();
                    }
                }
                else if (dialog.open && typeof dialog.close === 'function') {
                    this.isClosing.set(false);
                    dialog.close();
                }
            });
        });
        effect(() => {
            const view = this.activeView();
            const prev = this.previousActiveView;
            this.previousActiveView = view;
            if ((prev === 'edit' && view === 'profile') ||
                (view !== 'profile' && view !== 'edit')) {
                queueMicrotask(() => {
                    this.isEditingProfile.set(false);
                });
            }
        });
    }
    openEditProfile() {
        this.isEditingProfile.set(true);
        this.editProfileClicked.emit();
    }
    closeEditProfile() {
        this.isEditingProfile.set(false);
        this.backToProfile.emit();
    }
    onPublicToggleChange(checked) {
        this.isPublicChange.emit(checked);
        this.publicToggleSaved.emit(checked);
    }
    async onInstallAppClick() {
        if (!this.pwaInstall)
            return;
        const outcome = await this.pwaInstall.promptInstall();
        if (outcome === 'accepted' || outcome === 'ios-guide') {
            this.requestClose();
        }
    }
    ngOnDestroy() {
        if (this.copyTimer) {
            clearTimeout(this.copyTimer);
            this.copyTimer = null;
        }
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }
    copyLink() {
        const url = this.publicUrl();
        if (url &&
            typeof navigator !== 'undefined' &&
            typeof navigator.clipboard?.writeText === 'function') {
            void navigator.clipboard.writeText(url).then(() => {
                this.copiedInternal.set(true);
                if (this.copyTimer)
                    clearTimeout(this.copyTimer);
                this.copyTimer = setTimeout(() => {
                    this.copiedInternal.set(false);
                }, 2000);
            }, () => {
                // Fallback handled by parent if needed
            });
        }
        this.copyClicked.emit();
    }
    requestClose() {
        this.sheetDrag.reset();
        if (this.isClosing())
            return;
        const dialog = this.dialogEl?.nativeElement;
        if (canAnimateKitDialogExit(dialog)) {
            this.isClosing.set(true);
            if (this.closeTimer)
                clearTimeout(this.closeTimer);
            this.closeTimer = setTimeout(() => {
                this.closeTimer = null;
                this.isClosing.set(false);
                this.isEditingProfile.set(false);
                if (dialog?.open && typeof dialog.close === 'function') {
                    dialog.close();
                }
                this.closed.emit();
            }, 170);
            return;
        }
        this.isClosing.set(false);
        this.isEditingProfile.set(false);
        if (dialog?.open && typeof dialog.close === 'function') {
            dialog.close();
        }
        this.closed.emit();
    }
    onDialogClick(event) {
        if (event.target === this.dialogEl?.nativeElement) {
            this.requestClose();
        }
    }
    onDialogCancel(event) {
        if (this.effectiveView() !== 'profile') {
            event.preventDefault();
            this.isEditingProfile.set(false);
            this.backToProfile.emit();
            return;
        }
        event.preventDefault();
        this.requestClose();
    }
    onTouchStart(event) {
        this.sheetDrag.onTouchStart(event);
    }
    onTouchMove(event) {
        this.sheetDrag.onTouchMove(event);
    }
    onTouchEnd() {
        this.sheetDrag.onTouchEnd(() => this.requestClose());
    }
    onTouchCancel() {
        this.sheetDrag.reset();
    }
    static { this.ɵfac = function KitProfileModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitProfileModalComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitProfileModalComponent, selectors: [["kit-profile-modal"]], viewQuery: function KitProfileModalComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dialogEl = _t.first);
        } }, inputs: { isOpen: [1, "isOpen"], showInstallAction: [1, "showInstallAction"], activeView: [1, "activeView"], isAuthenticated: [1, "isAuthenticated"], user: [1, "user"], displayName: [1, "displayName"], bio: [1, "bio"], isPublic: [1, "isPublic"], saving: [1, "saving"], statusMessage: [1, "statusMessage"], isError: [1, "isError"], copied: [1, "copied"], accountHubUrl: [1, "accountHubUrl"], loginUrl: [1, "loginUrl"], collectionNoun: [1, "collectionNoun"], guestTitle: [1, "guestTitle"], guestDescription: [1, "guestDescription"] }, outputs: { displayNameChange: "displayNameChange", bioChange: "bioChange", isPublicChange: "isPublicChange", publicToggleSaved: "publicToggleSaved", editProfileClicked: "editProfileClicked", saveClicked: "saveClicked", copyClicked: "copyClicked", signOutClicked: "signOutClicked", closed: "closed", backToProfile: "backToProfile" }, ngContentSelectors: _c2, decls: 8, vars: 9, consts: [["dialogEl", ""], [1, "kit-profile-dialog", "profile-dialog", 3, "click", "cancel"], [1, "modal-card", 3, "click", "touchstart", "touchmove", "touchend", "touchcancel"], [1, "sheet-drag-area"], [1, "sheet-handle"], [1, "profile-view-panel", "view-enter-subview"], ["data-testid", "profile-edit-subview", 1, "profile-view-panel", "view-enter-subview"], ["data-testid", "profile-hub-view", 1, "profile-view-panel", "view-enter-profile"], [1, "modal-header"], [1, "header-title-row"], ["type", "button", "aria-label", "Back to Profile", "data-testid", "profile-edit-back-btn", 1, "subview-back-btn", "state-layer", 3, "click"], ["viewBox", "0 0 24 24", "width", "18", "height", "18", "fill", "none", "stroke", "currentColor", "stroke-width", "2.2", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true"], ["d", "M19 12H5M12 19l-7-7 7-7"], ["type", "button", "aria-label", "Close profile dialog", "data-testid", "profile-modal-close-btn", 1, "close-btn", 3, "click"], ["viewBox", "0 0 24 24", "width", "20", "height", "20", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "modal-body"], [1, "field-group"], [1, "field-label-row"], ["for", "kit-profile-display-name"], [1, "char-hint"], ["id", "kit-profile-display-name", "type", "text", "maxlength", "60", "placeholder", "Your collector handle", 1, "text-input", 3, "ngModelChange", "ngModel"], [1, "field-hint"], ["for", "kit-profile-bio"], ["id", "kit-profile-bio", "rows", "3", "maxlength", "300", "placeholder", "Share what you collect or hunt...", 1, "text-input", "bio-input", 3, "ngModelChange", "ngModel"], ["aria-live", "polite", 1, "status-msg", 3, "error"], [1, "modal-footer"], [1, "footer-actions"], ["type", "button", "data-testid", "profile-edit-cancel-btn", 1, "cancel-btn", 3, "click"], ["type", "button", "data-testid", "profile-save-btn", 1, "save-btn", "state-layer", 3, "click", "disabled"], ["aria-live", "polite", 1, "status-msg"], ["aria-hidden", "true", 1, "header-icon"], ["viewBox", "0 0 24 24", "width", "20", "height", "20", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"], ["cx", "12", "cy", "7", "r", "4"], ["data-testid", "profile-guest-view", 1, "guest-card"], [1, "kit-nav-group"], [1, "identity-banner"], [1, "public-sharing-card"], ["for", "kit-profile-is-public", 1, "toggle-row"], [1, "toggle-text"], [1, "toggle-title"], [1, "toggle-desc"], [1, "switch-wrapper"], ["id", "kit-profile-is-public", "type", "checkbox", "role", "switch", 1, "sr-only-checkbox", 3, "ngModelChange", "ngModel"], [1, "switch-track"], [1, "switch-thumb"], [1, "share-inline-bar"], [1, "identity-top-row"], [1, "identity-avatar"], [1, "identity-details"], [1, "identity-primary"], [1, "identity-display-name"], [1, "username-tag"], [1, "role-badge"], [1, "identity-email"], ["type", "button", "data-testid", "profile-edit-btn", "aria-label", "Edit profile details", 1, "identity-edit-btn", "state-layer", 3, "click"], [1, "identity-bio-preview"], [1, "share-url"], ["type", "button", "data-testid", "copy-public-url-btn", 1, "copy-btn", 3, "click"], ["target", "_blank", "rel", "noopener noreferrer", "title", "Open public collection page", "aria-label", "Open public collection page", 1, "share-open-link", 3, "href"], [1, "guest-icon-circle"], ["viewBox", "0 0 24 24", "width", "24", "height", "24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2", "ry", "2"], ["d", "M7 11V7a5 5 0 0 1 10 0v4"], [1, "guest-title"], [1, "guest-desc"], ["data-testid", "profile-guest-signin-btn", 1, "signin-cta-btn", "state-layer", 3, "href"], [1, "kit-nav-group-label"], [1, "kit-nav-group-list"], ["type", "button", "data-testid", "profile-install-app-btn", 1, "nav-section-btn", 3, "click"], [1, "nav-section-left"], ["viewBox", "0 0 24 24", "width", "18", "height", "18", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true", 1, "nav-section-icon"], ["d", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"], ["points", "7 10 12 15 17 10"], ["x1", "12", "y1", "15", "x2", "12", "y2", "3"], [1, "nav-section-text"], [1, "nav-section-title"], [1, "nav-section-desc"], ["viewBox", "0 0 24 24", "width", "18", "height", "18", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true", 1, "nav-section-chevron"], ["points", "9 18 15 12 9 6"], ["target", "_blank", "rel", "noopener noreferrer", "data-testid", "profile-account-hub-link", 1, "nav-section-btn", 3, "href"], ["type", "button", "data-testid", "profile-signout-link", 1, "signout-link", 3, "click"], ["viewBox", "0 0 24 24", "width", "16", "height", "16", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true"], ["d", "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"], ["points", "16 17 21 12 16 7"], ["x1", "21", "y1", "12", "x2", "9", "y2", "12"], ["type", "button", 1, "cancel-btn", 3, "click"]], template: function KitProfileModalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef(_c1);
            i0.ɵɵelementStart(0, "dialog", 1, 0);
            i0.ɵɵlistener("click", function KitProfileModalComponent_Template_dialog_click_0_listener($event) { return ctx.onDialogClick($event); })("cancel", function KitProfileModalComponent_Template_dialog_cancel_0_listener($event) { return ctx.onDialogCancel($event); });
            i0.ɵɵelementStart(2, "div", 2);
            i0.ɵɵlistener("click", function KitProfileModalComponent_Template_div_click_2_listener($event) { return $event.stopPropagation(); })("touchstart", function KitProfileModalComponent_Template_div_touchstart_2_listener($event) { return ctx.onTouchStart($event); })("touchmove", function KitProfileModalComponent_Template_div_touchmove_2_listener($event) { return ctx.onTouchMove($event); })("touchend", function KitProfileModalComponent_Template_div_touchend_2_listener() { return ctx.onTouchEnd(); })("touchcancel", function KitProfileModalComponent_Template_div_touchcancel_2_listener() { return ctx.onTouchCancel(); });
            i0.ɵɵelementStart(3, "div", 3);
            i0.ɵɵelement(4, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(5, KitProfileModalComponent_Conditional_5_Template, 2, 0, "div", 5)(6, KitProfileModalComponent_Conditional_6_Template, 38, 7, "div", 6)(7, KitProfileModalComponent_Conditional_7_Template, 23, 5, "div", 7);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵstyleProp("transform", ctx.effectiveTransformY() !== 0 ? "translateY(" + ctx.effectiveTransformY() + "px)" : null)("transition", ctx.isDragging() ? "none" : "transform var(--kit-duration-medium, 260ms) var(--kit-ease-smooth, cubic-bezier(0.22, 1, 0.36, 1))");
            i0.ɵɵclassProp("dragging", ctx.isDragging())("closing", ctx.isClosing());
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.effectiveView() !== "profile" && ctx.effectiveView() !== "edit" ? 5 : ctx.effectiveView() === "edit" ? 6 : 7);
        } }, dependencies: [FormsModule, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.NgControlStatus, i1.MaxLengthValidator, i1.NgModel], styles: ["\n  @keyframes kitModalSpringIn {\n    from {\n      opacity: 0;\n      transform: translateY(14px) scale(0.96);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0) scale(1);\n    }\n  }\n\n  @keyframes kitModalSpringOut {\n    from {\n      opacity: 1;\n      transform: translateY(0) scale(1);\n    }\n    to {\n      opacity: 0;\n      transform: translateY(10px) scale(0.96);\n    }\n  }\n\n  @keyframes kitSheetSlideUp {\n    from {\n      opacity: 0;\n      transform: translateY(100%);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n\n  @keyframes kitSheetSlideDown {\n    to {\n      opacity: 0;\n      transform: translateY(100%);\n    }\n  }\n\n  @keyframes kitBackdropFadeIn {\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }\n\n  @keyframes kitBackdropFadeOut {\n    from {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n    }\n  }\n\n  @keyframes kitSubviewSlideIn {\n    from {\n      opacity: 0;\n      transform: translateX(18px);\n    }\n    to {\n      opacity: 1;\n      transform: translateX(0);\n    }\n  }\n\n  @keyframes kitSubviewSlideBack {\n    from {\n      opacity: 0;\n      transform: translateX(-18px);\n    }\n    to {\n      opacity: 1;\n      transform: translateX(0);\n    }\n  }\n", "\n      .kit-profile-dialog:not([open]) {\n        display: none;\n      }\n\n      .kit-profile-dialog {\n        padding: 0;\n        border: 1px solid var(--%NS%kit-outline-variant);\n        border-radius: 20px;\n        background: var(--%NS%kit-surface);\n        color: var(--%NS%kit-on-surface);\n        width: min(92vw, 480px);\n        max-height: 90vh;\n        box-shadow: 0 24px 48px rgba(0, 0, 0, 0.45);\n        overflow: hidden;\n        margin: auto;\n        animation: kitModalSpringIn var(--%NS%kit-duration-medium)\n          var(--%NS%kit-ease-spring) backwards;\n      }\n\n      .kit-profile-dialog.dragging {\n        animation: none !important;\n        transition: none !important;\n      }\n\n      .kit-profile-dialog.closing {\n        animation: kitModalSpringOut 170ms var(--%NS%kit-ease-exit) forwards;\n        pointer-events: none;\n      }\n\n      .kit-profile-dialog::backdrop {\n        background: rgba(0, 0, 0, 0.6);\n        backdrop-filter: blur(4px);\n        animation: kitBackdropFadeIn 200ms var(--%NS%kit-ease-standard) both;\n      }\n\n      .kit-profile-dialog.closing::backdrop {\n        animation: kitBackdropFadeOut 170ms var(--%NS%kit-ease-exit) forwards;\n      }\n\n      .kit-profile-dialog .profile-view-panel {\n        display: flex;\n        flex-direction: column;\n        min-height: 0;\n        flex: 1 1 auto;\n      }\n\n      .kit-profile-dialog .view-enter-subview {\n        animation: kitSubviewSlideIn 220ms var(--%NS%kit-ease-smooth) both;\n      }\n\n      .kit-profile-dialog .view-enter-profile {\n        animation: kitSubviewSlideBack 220ms var(--%NS%kit-ease-smooth) both;\n      }\n\n      .kit-profile-dialog .modal-card {\n        display: flex;\n        flex-direction: column;\n        max-height: 90vh;\n      }\n\n      .kit-profile-dialog .sheet-drag-area {\n        display: none;\n      }\n\n      .kit-profile-dialog .modal-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        padding: 16px 20px;\n        border-bottom: 1px solid var(--%NS%kit-outline-variant);\n      }\n\n      .kit-profile-dialog .header-title-row {\n        display: flex;\n        align-items: center;\n        gap: 10px;\n      }\n\n      .kit-profile-dialog .subview-back-btn {\n        background: transparent;\n        border: none;\n        color: var(--%NS%kit-on-surface-variant);\n        width: 34px;\n        height: 34px;\n        border-radius: 50%;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        margin-left: -6px;\n        flex-shrink: 0;\n        transition:\n          background-color 0.15s,\n          color 0.15s;\n      }\n\n      .kit-profile-dialog .subview-back-btn:hover {\n        background: var(--%NS%kit-surface-highest);\n        color: var(--%NS%kit-on-surface);\n      }\n\n      .kit-profile-dialog .header-icon {\n        color: var(--%NS%kit-primary);\n        display: inline-flex;\n        align-items: center;\n      }\n\n      .kit-profile-dialog .modal-header h2 {\n        margin: 0;\n        font-family: var(--%NS%kit-font-heading);\n        font-size: 1.15rem;\n        font-weight: 700;\n      }\n\n      .kit-profile-dialog .close-btn {\n        background: transparent;\n        border: none;\n        color: var(--%NS%kit-on-surface-muted);\n        cursor: pointer;\n        padding: 6px;\n        border-radius: 50%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        transition:\n          background-color 0.15s,\n          color 0.15s;\n      }\n\n      .kit-profile-dialog .close-btn:hover {\n        background: var(--%NS%kit-surface-highest);\n        color: var(--%NS%kit-on-surface);\n      }\n\n      .kit-profile-dialog .modal-body {\n        padding: 16px 20px;\n        overflow-y: auto;\n        overscroll-behavior: contain;\n        flex: 1 1 auto;\n        min-height: 0;\n        display: flex;\n        flex-direction: column;\n        gap: 12px;\n      }\n\n      .kit-profile-dialog .modal-body > * {\n        flex-shrink: 0;\n      }\n\n      .kit-profile-dialog .identity-banner {\n        background: var(--%NS%kit-surface-high);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        border-radius: 14px;\n        padding: 12px 14px;\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n        flex-shrink: 0;\n      }\n\n      .kit-profile-dialog .identity-top-row {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        min-width: 0;\n      }\n\n      .kit-profile-dialog .identity-avatar {\n        width: 42px;\n        height: 42px;\n        border-radius: 50%;\n        background: var(--%NS%kit-primary);\n        color: var(--%NS%kit-on-primary);\n        font-weight: 800;\n        font-size: 1.1rem;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n      }\n\n      .kit-profile-dialog .identity-details {\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        flex: 1;\n        min-width: 0;\n      }\n\n      .kit-profile-dialog .identity-primary {\n        display: flex;\n        align-items: center;\n        gap: 6px;\n        flex-wrap: wrap;\n      }\n\n      .kit-profile-dialog .identity-display-name {\n        font-weight: 700;\n        font-size: 0.98rem;\n        color: var(--%NS%kit-on-surface);\n      }\n\n      .kit-profile-dialog .username-tag {\n        font-weight: 700;\n        font-size: 0.88rem;\n        color: var(--%NS%kit-primary);\n      }\n\n      .kit-profile-dialog .role-badge {\n        font-size: 0.68rem;\n        text-transform: uppercase;\n        letter-spacing: 0.06em;\n        font-weight: 700;\n        padding: 2px 7px;\n        border-radius: 999px;\n        background: var(--%NS%kit-primary-container);\n        color: var(--%NS%kit-on-primary-container);\n      }\n\n      .kit-profile-dialog .identity-email {\n        font-size: 0.82rem;\n        color: var(--%NS%kit-on-surface-muted);\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n\n      .kit-profile-dialog .identity-edit-btn {\n        margin-left: auto;\n        padding: 5px 12px;\n        border-radius: 999px;\n        border: 1px solid var(--%NS%kit-outline-variant);\n        background: var(--%NS%kit-surface-container);\n        color: var(--%NS%kit-on-surface);\n        font-size: 0.78rem;\n        font-weight: 600;\n        cursor: pointer;\n        flex-shrink: 0;\n        transition:\n          background-color 0.15s,\n          border-color 0.15s;\n      }\n\n      .kit-profile-dialog .identity-edit-btn:hover {\n        border-color: var(--%NS%kit-primary);\n        background: var(--%NS%kit-surface-container-highest);\n      }\n\n      .kit-profile-dialog .identity-bio-preview {\n        margin: 0;\n        font-size: 0.8rem;\n        color: var(--%NS%kit-on-surface-muted);\n        display: -webkit-box;\n        -webkit-line-clamp: 2;\n        -webkit-box-orient: vertical;\n        overflow: hidden;\n        line-height: 1.4;\n      }\n\n      .kit-profile-dialog .field-group {\n        display: flex;\n        flex-direction: column;\n        gap: 6px;\n      }\n\n      .kit-profile-dialog .field-label-row {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n      }\n\n      .kit-profile-dialog .field-group label {\n        font-size: 0.85rem;\n        font-weight: 600;\n        color: var(--%NS%kit-on-surface);\n      }\n\n      .kit-profile-dialog .char-hint {\n        font-size: 0.75rem;\n        color: var(--%NS%kit-on-surface-muted);\n      }\n\n      .kit-profile-dialog .text-input,\n      .kit-profile-dialog .select-input {\n        background: var(--%NS%kit-surface-container);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        border-radius: 10px;\n        padding: 10px 12px;\n        color: var(--%NS%kit-on-surface);\n        font-size: 0.95rem;\n        font-family: inherit;\n        transition: border-color 0.15s;\n      }\n\n      .kit-profile-dialog .text-input:focus,\n      .kit-profile-dialog .select-input:focus {\n        border-color: var(--%NS%kit-primary);\n      }\n\n      .kit-profile-dialog .bio-input {\n        resize: vertical;\n        min-height: 68px;\n      }\n\n      .kit-profile-dialog .field-hint {\n        font-size: 0.76rem;\n        color: var(--%NS%kit-on-surface-muted);\n      }\n\n      .kit-profile-dialog .toggle-row {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 16px;\n        padding: 12px 14px;\n        border-radius: 12px;\n        background: var(--%NS%kit-surface-container);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        cursor: pointer;\n      }\n\n      .kit-profile-dialog .toggle-text {\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n      }\n\n      .kit-profile-dialog .toggle-title {\n        font-size: 0.92rem;\n        font-weight: 600;\n      }\n\n      .kit-profile-dialog .toggle-desc {\n        font-size: 0.78rem;\n        color: var(--%NS%kit-on-surface-muted);\n      }\n\n      .kit-profile-dialog .switch-wrapper {\n        position: relative;\n        display: inline-flex;\n        align-items: center;\n        flex-shrink: 0;\n      }\n\n      .kit-profile-dialog .sr-only-checkbox {\n        position: absolute;\n        opacity: 0;\n        width: 0;\n        height: 0;\n      }\n\n      .kit-profile-dialog .sr-only-checkbox:focus-visible + .switch-track {\n        outline: 2px solid var(--%NS%kit-primary);\n        outline-offset: 2px;\n      }\n\n      .kit-profile-dialog .switch-track {\n        width: 44px;\n        height: 24px;\n        background: var(--%NS%kit-surface-highest);\n        border: 1px solid var(--%NS%kit-outline);\n        border-radius: 999px;\n        position: relative;\n        transition:\n          background-color 0.2s,\n          border-color 0.2s;\n      }\n\n      .kit-profile-dialog .switch-track.checked {\n        background: var(--%NS%kit-primary);\n        border-color: var(--%NS%kit-primary);\n      }\n\n      .kit-profile-dialog .switch-thumb {\n        width: 18px;\n        height: 18px;\n        background: var(--%NS%kit-on-surface);\n        border-radius: 50%;\n        position: absolute;\n        top: 2px;\n        left: 2px;\n        transition:\n          transform 0.2s cubic-bezier(0.2, 0, 0, 1),\n          background-color 0.2s;\n      }\n\n      .kit-profile-dialog .switch-track.checked .switch-thumb {\n        transform: translateX(20px);\n        background: var(--%NS%kit-on-primary);\n      }\n\n      .kit-profile-dialog .public-sharing-card {\n        border-radius: 12px;\n        background: var(--%NS%kit-surface-container);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        overflow: hidden;\n        flex-shrink: 0;\n      }\n\n      .kit-profile-dialog .public-sharing-card .toggle-row {\n        border: none;\n        border-radius: 0;\n        padding: 11px 14px;\n        background: transparent;\n      }\n\n      .kit-profile-dialog .share-inline-bar {\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        padding: 8px 12px;\n        background: var(--%NS%kit-surface-container-low);\n        border-top: 1px solid var(--%NS%kit-outline-variant);\n      }\n\n      .kit-profile-dialog .share-box {\n        display: flex;\n        flex-direction: column;\n        gap: 6px;\n        padding: 12px 14px;\n        border-radius: 12px;\n        background: var(--%NS%kit-surface-high);\n        border: 1px dashed var(--%NS%kit-outline);\n      }\n\n      .kit-profile-dialog .share-label {\n        font-size: 0.75rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.05em;\n        color: var(--%NS%kit-on-surface-muted);\n      }\n\n      .kit-profile-dialog .share-url-row {\n        display: flex;\n        align-items: center;\n        gap: 8px;\n      }\n\n      .kit-profile-dialog .share-url {\n        flex: 1;\n        min-width: 0;\n        font-family: var(--%NS%kit-font-mono);\n        font-size: 0.8rem;\n        padding: 6px 10px;\n        border-radius: 8px;\n        background: var(--%NS%kit-surface);\n        color: var(--%NS%kit-primary);\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n\n      .kit-profile-dialog .copy-btn {\n        padding: 6px 12px;\n        border-radius: 8px;\n        border: 1px solid var(--%NS%kit-outline-variant);\n        background: var(--%NS%kit-surface-highest);\n        color: var(--%NS%kit-on-surface);\n        font-size: 0.8rem;\n        font-weight: 600;\n        cursor: pointer;\n        white-space: nowrap;\n        flex-shrink: 0;\n      }\n\n      .kit-profile-dialog .share-open-link {\n        font-size: 0.8rem;\n        font-weight: 600;\n        color: var(--%NS%kit-primary);\n        text-decoration: none;\n        margin-top: 2px;\n      }\n\n      .kit-profile-dialog .share-inline-bar .share-open-link {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        width: 30px;\n        height: 30px;\n        margin-top: 0;\n        border-radius: 8px;\n        border: 1px solid var(--%NS%kit-outline-variant);\n        background: var(--%NS%kit-surface-highest);\n        color: var(--%NS%kit-primary);\n        font-size: 0.9rem;\n        flex-shrink: 0;\n      }\n\n      .kit-profile-dialog .share-open-link:hover {\n        text-decoration: underline;\n      }\n\n      .kit-profile-dialog .share-inline-bar .share-open-link:hover {\n        text-decoration: none;\n        border-color: var(--%NS%kit-primary);\n      }\n\n      .kit-profile-dialog .kit-nav-group {\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n      }\n\n      .kit-profile-dialog .kit-nav-group-label {\n        font-size: 0.7rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.06em;\n        color: var(--%NS%kit-on-surface-muted);\n        padding: 2px 4px 0;\n      }\n\n      .kit-profile-dialog .kit-nav-group-list {\n        display: flex;\n        flex-direction: column;\n        border-radius: 12px;\n        border: 1px solid var(--%NS%kit-outline-variant);\n        background: var(--%NS%kit-surface-container);\n        overflow: hidden;\n      }\n\n      .kit-profile-dialog .nav-section-btn {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 12px;\n        width: 100%;\n        padding: 12px 14px;\n        border-radius: 12px;\n        background: var(--%NS%kit-surface-container);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        color: var(--%NS%kit-on-surface);\n        text-align: left;\n        text-decoration: none;\n        box-sizing: border-box;\n        cursor: pointer;\n        transition:\n          background-color 0.15s,\n          border-color 0.15s;\n      }\n\n      .kit-profile-dialog .nav-section-btn:hover {\n        background: var(--%NS%kit-surface-high);\n        border-color: var(--%NS%kit-primary);\n      }\n\n      .kit-profile-dialog .kit-nav-group-list .nav-section-btn {\n        border: none;\n        border-radius: 0;\n        padding: 10px 14px;\n        background: transparent;\n      }\n\n      .kit-profile-dialog\n        .kit-nav-group-list\n        .nav-section-btn\n        + .nav-section-btn {\n        border-top: 1px solid var(--%NS%kit-outline-variant);\n      }\n\n      .kit-profile-dialog .kit-nav-group-list .nav-section-btn:hover {\n        background: var(--%NS%kit-surface-high);\n      }\n\n      .kit-profile-dialog .nav-section-left {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        min-width: 0;\n        flex: 1;\n      }\n\n      .kit-profile-dialog .nav-section-icon {\n        color: var(--%NS%kit-primary);\n        flex-shrink: 0;\n        display: inline-flex;\n        align-items: center;\n      }\n\n      .kit-profile-dialog .nav-section-text {\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        min-width: 0;\n      }\n\n      .kit-profile-dialog .nav-section-title {\n        font-size: 0.9rem;\n        font-weight: 600;\n      }\n\n      .kit-profile-dialog .nav-section-desc {\n        font-size: 0.76rem;\n        color: var(--%NS%kit-on-surface-muted);\n        line-height: 1.35;\n      }\n\n      .kit-profile-dialog .nav-section-chevron {\n        color: var(--%NS%kit-on-surface-muted);\n        flex-shrink: 0;\n      }\n\n      .kit-profile-dialog .guest-card {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        text-align: center;\n        padding: 18px 16px;\n        border-radius: 14px;\n        background: var(--%NS%kit-surface-high);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        gap: 10px;\n      }\n\n      .kit-profile-dialog .guest-icon-circle {\n        width: 52px;\n        height: 52px;\n        border-radius: 50%;\n        background: var(--%NS%kit-primary-container);\n        color: var(--%NS%kit-on-primary-container);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n\n      .kit-profile-dialog .guest-title {\n        margin: 4px 0 0;\n        font-family: var(--%NS%kit-font-heading);\n        font-size: 1.05rem;\n        font-weight: 700;\n      }\n\n      .kit-profile-dialog .guest-desc {\n        margin: 0;\n        font-size: 0.85rem;\n        line-height: 1.45;\n        color: var(--%NS%kit-on-surface-muted);\n      }\n\n      .kit-profile-dialog .signin-cta-btn {\n        margin-top: 6px;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        width: 100%;\n        padding: 11px 18px;\n        border-radius: 9999px;\n        background: var(--%NS%kit-primary);\n        color: var(--%NS%kit-on-primary);\n        font-size: 0.92rem;\n        font-weight: 700;\n        text-decoration: none;\n        box-sizing: border-box;\n      }\n\n      .kit-profile-dialog .status-msg {\n        margin: 0;\n        font-size: 0.84rem;\n        font-weight: 600;\n        color: var(--%NS%kit-success);\n      }\n\n      .kit-profile-dialog .status-msg.error {\n        color: var(--%NS%kit-danger);\n      }\n\n      .kit-profile-dialog .modal-footer {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        padding: 16px 22px;\n        border-top: 1px solid var(--%NS%kit-outline-variant);\n        background: var(--%NS%kit-surface-container);\n      }\n\n      .kit-profile-dialog .footer-actions {\n        display: flex;\n        align-items: center;\n        gap: 10px;\n      }\n\n      .kit-profile-dialog .signout-link {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        font-size: 0.85rem;\n        font-weight: 600;\n        color: var(--%NS%kit-danger);\n        background: transparent;\n        border: none;\n        padding: 4px 6px;\n        border-radius: 8px;\n        cursor: pointer;\n        text-decoration: none;\n      }\n\n      .kit-profile-dialog .signout-link:hover {\n        text-decoration: underline;\n      }\n\n      .kit-profile-dialog .cancel-btn {\n        padding: 9px 16px;\n        border-radius: 9999px;\n        border: 1px solid var(--%NS%kit-outline-variant);\n        background: transparent;\n        color: var(--%NS%kit-on-surface);\n        font-weight: 600;\n        font-size: 0.88rem;\n        cursor: pointer;\n      }\n\n      .kit-profile-dialog .save-btn {\n        padding: 9px 18px;\n        border-radius: 9999px;\n        border: none;\n        background: var(--%NS%kit-primary);\n        color: var(--%NS%kit-on-primary);\n        font-weight: 700;\n        font-size: 0.88rem;\n        cursor: pointer;\n      }\n\n      .kit-profile-dialog .save-btn:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      @media (max-width: 768px) {\n        .kit-profile-dialog {\n          width: 100vw;\n          max-width: 100vw;\n          margin: auto 0 0 0;\n          border-radius: 24px 24px 0 0;\n          border-bottom: none;\n          animation: kitSheetSlideUp 260ms var(--%NS%kit-ease-smooth) backwards;\n        }\n\n        .kit-profile-dialog.closing {\n          animation: kitSheetSlideDown 170ms var(--%NS%kit-ease-exit) forwards;\n        }\n\n        .kit-profile-dialog .sheet-drag-area {\n          display: flex;\n          justify-content: center;\n          padding: 10px 0 2px;\n          touch-action: none;\n          user-select: none;\n          cursor: grab;\n        }\n\n        .kit-profile-dialog .modal-header {\n          touch-action: none;\n          user-select: none;\n          cursor: grab;\n        }\n\n        .kit-profile-dialog .modal-header button,\n        .kit-profile-dialog .modal-header a {\n          touch-action: manipulation;\n          cursor: pointer;\n        }\n\n        .kit-profile-dialog .sheet-handle {\n          width: 36px;\n          height: 4px;\n          border-radius: 999px;\n          background: var(--%NS%kit-outline);\n          opacity: 0.5;\n        }\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-profile-dialog,\n        .kit-profile-dialog * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitProfileModalComponent, [{
        type: Component,
        args: [{ selector: 'kit-profile-modal', standalone: true, imports: [FormsModule], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <dialog
      #dialogEl
      class="kit-profile-dialog profile-dialog"
      [class.dragging]="isDragging()"
      [class.closing]="isClosing()"
      [style.transform]="
        effectiveTransformY() !== 0
          ? 'translateY(' + effectiveTransformY() + 'px)'
          : null
      "
      [style.transition]="
        isDragging()
          ? 'none'
          : 'transform var(--kit-duration-medium, 260ms) var(--kit-ease-smooth, cubic-bezier(0.22, 1, 0.36, 1))'
      "
      (click)="onDialogClick($event)"
      (cancel)="onDialogCancel($event)"
    >
      <div
        class="modal-card"
        (click)="$event.stopPropagation()"
        (touchstart)="onTouchStart($event)"
        (touchmove)="onTouchMove($event)"
        (touchend)="onTouchEnd()"
        (touchcancel)="onTouchCancel()"
      >
        <div class="sheet-drag-area">
          <div class="sheet-handle"></div>
        </div>

        @if (effectiveView() !== 'profile' && effectiveView() !== 'edit') {
          <div class="profile-view-panel view-enter-subview">
            <ng-content select="[profileSubview]" />
          </div>
        } @else if (effectiveView() === 'edit') {
          <div
            class="profile-view-panel view-enter-subview"
            data-testid="profile-edit-subview"
          >
            <header class="modal-header">
              <div class="header-title-row">
                <button
                  type="button"
                  class="subview-back-btn state-layer"
                  (click)="closeEditProfile()"
                  aria-label="Back to Profile"
                  data-testid="profile-edit-back-btn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2>Edit Profile</h2>
              </div>
              <button
                type="button"
                class="close-btn"
                (click)="requestClose()"
                aria-label="Close profile dialog"
                data-testid="profile-modal-close-btn"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>

            <div class="modal-body">
              <div class="field-group">
                <div class="field-label-row">
                  <label for="kit-profile-display-name">Display Name</label>
                  <span class="char-hint">{{ displayName().length }} / 60</span>
                </div>
                <input
                  id="kit-profile-display-name"
                  type="text"
                  maxlength="60"
                  [ngModel]="displayName()"
                  (ngModelChange)="displayNameChange.emit($event)"
                  placeholder="Your collector handle"
                  class="text-input"
                />
                <span class="field-hint">
                  Shown on your public collection banner when sharing is
                  enabled.
                </span>
              </div>

              <div class="field-group">
                <div class="field-label-row">
                  <label for="kit-profile-bio">Bio</label>
                  <span class="char-hint">{{ bio().length }} / 300</span>
                </div>
                <textarea
                  id="kit-profile-bio"
                  rows="3"
                  maxlength="300"
                  [ngModel]="bio()"
                  (ngModelChange)="bioChange.emit($event)"
                  placeholder="Share what you collect or hunt..."
                  class="text-input bio-input"
                ></textarea>
              </div>

              <ng-content select="[profileExtraFields]" />

              @if (statusMessage()) {
                <p
                  class="status-msg"
                  [class.error]="isError()"
                  [attr.role]="isError() ? 'alert' : 'status'"
                  aria-live="polite"
                >
                  {{ statusMessage() }}
                </p>
              }
            </div>

            <footer class="modal-footer">
              <div></div>
              <div class="footer-actions">
                <button
                  type="button"
                  class="cancel-btn"
                  (click)="closeEditProfile()"
                  data-testid="profile-edit-cancel-btn"
                >
                  Back
                </button>
                <button
                  type="button"
                  class="save-btn state-layer"
                  [disabled]="saving()"
                  (click)="saveClicked.emit()"
                  data-testid="profile-save-btn"
                >
                  {{ saving() ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </footer>
          </div>
        } @else {
          <div
            class="profile-view-panel view-enter-profile"
            data-testid="profile-hub-view"
          >
            <header class="modal-header">
              <div class="header-title-row">
                <span class="header-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <h2>Profile &amp; Sharing</h2>
              </div>
              <button
                type="button"
                class="close-btn"
                (click)="requestClose()"
                aria-label="Close profile dialog"
                data-testid="profile-modal-close-btn"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>

            <div class="modal-body">
              @if (isAuthenticated()) {
                @if (user(); as u) {
                  <div class="identity-banner">
                    <div class="identity-top-row">
                      <div class="identity-avatar">
                        {{
                          (displayName() ||
                            u.displayName ||
                            u.username ||
                            'U')[0].toUpperCase()
                        }}
                      </div>
                      <div class="identity-details">
                        <div class="identity-primary">
                          @if (displayName() || u.displayName) {
                            <span class="identity-display-name">{{
                              displayName() || u.displayName
                            }}</span>
                          }
                          <span class="username-tag"
                            >&#64;{{ u.username }}</span
                          >
                          <span class="role-badge">{{ u.role }}</span>
                          <ng-content select="[profileIdentityBadges]" />
                        </div>
                        @if (u.email) {
                          <span class="identity-email">{{ u.email }}</span>
                        }
                      </div>
                      <button
                        type="button"
                        class="identity-edit-btn state-layer"
                        (click)="openEditProfile()"
                        data-testid="profile-edit-btn"
                        aria-label="Edit profile details"
                      >
                        Edit
                      </button>
                    </div>
                    @if (bio() || u.bio) {
                      <p class="identity-bio-preview">{{ bio() || u.bio }}</p>
                    }
                  </div>
                }

                <div class="public-sharing-card">
                  <label class="toggle-row" for="kit-profile-is-public">
                    <div class="toggle-text">
                      <span class="toggle-title">Public Collection</span>
                      <span class="toggle-desc">
                        Allow anyone with your link to view your read-only
                        {{ collectionNoun() }}.
                      </span>
                    </div>
                    <span class="switch-wrapper">
                      <input
                        id="kit-profile-is-public"
                        type="checkbox"
                        role="switch"
                        class="sr-only-checkbox"
                        [attr.aria-checked]="isPublic()"
                        [ngModel]="isPublic()"
                        (ngModelChange)="onPublicToggleChange($event)"
                      />
                      <span class="switch-track" [class.checked]="isPublic()">
                        <span class="switch-thumb"></span>
                      </span>
                    </span>
                  </label>

                  @if (isPublic() && publicUrl()) {
                    <div class="share-inline-bar">
                      <code class="share-url">{{ publicUrl() }}</code>
                      <button
                        type="button"
                        class="copy-btn"
                        (click)="copyLink()"
                        data-testid="copy-public-url-btn"
                      >
                        {{ isCopied() ? 'Copied!' : 'Copy' }}
                      </button>
                      @if (publicRelativePath()) {
                        <a
                          class="share-open-link"
                          [href]="publicRelativePath()"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open public collection page"
                          aria-label="Open public collection page"
                        >
                          &#8599;
                        </a>
                      }
                    </div>
                  }
                </div>
              } @else {
                <div class="guest-card" data-testid="profile-guest-view">
                  <div class="guest-icon-circle">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      aria-hidden="true"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <h3 class="guest-title">{{ guestTitle() }}</h3>
                  <p class="guest-desc">{{ guestDescription() }}</p>
                  <a
                    [href]="loginUrl()"
                    class="signin-cta-btn state-layer"
                    data-testid="profile-guest-signin-btn"
                  >
                    Sign In
                  </a>
                </div>
              }

              <ng-content select="[profileExtraNav]" />

              @if (showInstallAction() && pwaInstall?.canShowManualInstall()) {
                <div class="kit-nav-group">
                  <span class="kit-nav-group-label">App</span>
                  <div class="kit-nav-group-list">
                    <button
                      type="button"
                      class="nav-section-btn"
                      (click)="onInstallAppClick()"
                      data-testid="profile-install-app-btn"
                    >
                      <div class="nav-section-left">
                        <svg
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          class="nav-section-icon"
                          aria-hidden="true"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <div class="nav-section-text">
                          <span class="nav-section-title">Install App</span>
                          <span class="nav-section-desc">
                            Add to your home screen for offline access
                          </span>
                        </div>
                      </div>
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        class="nav-section-chevron"
                        aria-hidden="true"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              }

              @if (isAuthenticated() && accountHubUrl()) {
                <div class="kit-nav-group">
                  <span class="kit-nav-group-label">Account</span>
                  <div class="kit-nav-group-list">
                    <a
                      class="nav-section-btn"
                      [href]="accountHubUrl()"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="profile-account-hub-link"
                    >
                      <div class="nav-section-left">
                        <svg
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          class="nav-section-icon"
                          aria-hidden="true"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <div class="nav-section-text">
                          <span class="nav-section-title">
                            Account &amp; Security Hub
                          </span>
                          <span class="nav-section-desc">
                            Passkeys, 2FA authenticator, password &amp; active
                            sessions
                          </span>
                        </div>
                      </div>
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        class="nav-section-chevron"
                        aria-hidden="true"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </a>
                  </div>
                </div>
              }

              @if (statusMessage()) {
                <p
                  class="status-msg"
                  [class.error]="isError()"
                  [attr.role]="isError() ? 'alert' : 'status'"
                  aria-live="polite"
                >
                  {{ statusMessage() }}
                </p>
              }
            </div>

            <footer class="modal-footer">
              @if (isAuthenticated()) {
                <button
                  type="button"
                  class="signout-link"
                  (click)="signOutClicked.emit()"
                  data-testid="profile-signout-link"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Sign Out</span>
                </button>
                <div class="footer-actions">
                  <button
                    type="button"
                    class="cancel-btn"
                    (click)="requestClose()"
                  >
                    Close
                  </button>
                </div>
              } @else {
                <div></div>
                <div class="footer-actions">
                  <button
                    type="button"
                    class="cancel-btn"
                    (click)="requestClose()"
                  >
                    Close
                  </button>
                </div>
              }
            </footer>
          </div>
        }
      </div>
    </dialog>
  `, styles: ["\n  @keyframes kitModalSpringIn {\n    from {\n      opacity: 0;\n      transform: translateY(14px) scale(0.96);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0) scale(1);\n    }\n  }\n\n  @keyframes kitModalSpringOut {\n    from {\n      opacity: 1;\n      transform: translateY(0) scale(1);\n    }\n    to {\n      opacity: 0;\n      transform: translateY(10px) scale(0.96);\n    }\n  }\n\n  @keyframes kitSheetSlideUp {\n    from {\n      opacity: 0;\n      transform: translateY(100%);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n\n  @keyframes kitSheetSlideDown {\n    to {\n      opacity: 0;\n      transform: translateY(100%);\n    }\n  }\n\n  @keyframes kitBackdropFadeIn {\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }\n\n  @keyframes kitBackdropFadeOut {\n    from {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n    }\n  }\n\n  @keyframes kitSubviewSlideIn {\n    from {\n      opacity: 0;\n      transform: translateX(18px);\n    }\n    to {\n      opacity: 1;\n      transform: translateX(0);\n    }\n  }\n\n  @keyframes kitSubviewSlideBack {\n    from {\n      opacity: 0;\n      transform: translateX(-18px);\n    }\n    to {\n      opacity: 1;\n      transform: translateX(0);\n    }\n  }\n", "\n      .kit-profile-dialog:not([open]) {\n        display: none;\n      }\n\n      .kit-profile-dialog {\n        padding: 0;\n        border: 1px solid var(--kit-outline-variant);\n        border-radius: 20px;\n        background: var(--kit-surface);\n        color: var(--kit-on-surface);\n        width: min(92vw, 480px);\n        max-height: 90vh;\n        box-shadow: 0 24px 48px rgba(0, 0, 0, 0.45);\n        overflow: hidden;\n        margin: auto;\n        animation: kitModalSpringIn var(--kit-duration-medium)\n          var(--kit-ease-spring) backwards;\n      }\n\n      .kit-profile-dialog.dragging {\n        animation: none !important;\n        transition: none !important;\n      }\n\n      .kit-profile-dialog.closing {\n        animation: kitModalSpringOut 170ms var(--kit-ease-exit) forwards;\n        pointer-events: none;\n      }\n\n      .kit-profile-dialog::backdrop {\n        background: rgba(0, 0, 0, 0.6);\n        backdrop-filter: blur(4px);\n        animation: kitBackdropFadeIn 200ms var(--kit-ease-standard) both;\n      }\n\n      .kit-profile-dialog.closing::backdrop {\n        animation: kitBackdropFadeOut 170ms var(--kit-ease-exit) forwards;\n      }\n\n      .kit-profile-dialog .profile-view-panel {\n        display: flex;\n        flex-direction: column;\n        min-height: 0;\n        flex: 1 1 auto;\n      }\n\n      .kit-profile-dialog .view-enter-subview {\n        animation: kitSubviewSlideIn 220ms var(--kit-ease-smooth) both;\n      }\n\n      .kit-profile-dialog .view-enter-profile {\n        animation: kitSubviewSlideBack 220ms var(--kit-ease-smooth) both;\n      }\n\n      .kit-profile-dialog .modal-card {\n        display: flex;\n        flex-direction: column;\n        max-height: 90vh;\n      }\n\n      .kit-profile-dialog .sheet-drag-area {\n        display: none;\n      }\n\n      .kit-profile-dialog .modal-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        padding: 16px 20px;\n        border-bottom: 1px solid var(--kit-outline-variant);\n      }\n\n      .kit-profile-dialog .header-title-row {\n        display: flex;\n        align-items: center;\n        gap: 10px;\n      }\n\n      .kit-profile-dialog .subview-back-btn {\n        background: transparent;\n        border: none;\n        color: var(--kit-on-surface-variant);\n        width: 34px;\n        height: 34px;\n        border-radius: 50%;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        margin-left: -6px;\n        flex-shrink: 0;\n        transition:\n          background-color 0.15s,\n          color 0.15s;\n      }\n\n      .kit-profile-dialog .subview-back-btn:hover {\n        background: var(--kit-surface-highest);\n        color: var(--kit-on-surface);\n      }\n\n      .kit-profile-dialog .header-icon {\n        color: var(--kit-primary);\n        display: inline-flex;\n        align-items: center;\n      }\n\n      .kit-profile-dialog .modal-header h2 {\n        margin: 0;\n        font-family: var(--kit-font-heading);\n        font-size: 1.15rem;\n        font-weight: 700;\n      }\n\n      .kit-profile-dialog .close-btn {\n        background: transparent;\n        border: none;\n        color: var(--kit-on-surface-muted);\n        cursor: pointer;\n        padding: 6px;\n        border-radius: 50%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        transition:\n          background-color 0.15s,\n          color 0.15s;\n      }\n\n      .kit-profile-dialog .close-btn:hover {\n        background: var(--kit-surface-highest);\n        color: var(--kit-on-surface);\n      }\n\n      .kit-profile-dialog .modal-body {\n        padding: 16px 20px;\n        overflow-y: auto;\n        overscroll-behavior: contain;\n        flex: 1 1 auto;\n        min-height: 0;\n        display: flex;\n        flex-direction: column;\n        gap: 12px;\n      }\n\n      .kit-profile-dialog .modal-body > * {\n        flex-shrink: 0;\n      }\n\n      .kit-profile-dialog .identity-banner {\n        background: var(--kit-surface-high);\n        border: 1px solid var(--kit-outline-variant);\n        border-radius: 14px;\n        padding: 12px 14px;\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n        flex-shrink: 0;\n      }\n\n      .kit-profile-dialog .identity-top-row {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        min-width: 0;\n      }\n\n      .kit-profile-dialog .identity-avatar {\n        width: 42px;\n        height: 42px;\n        border-radius: 50%;\n        background: var(--kit-primary);\n        color: var(--kit-on-primary);\n        font-weight: 800;\n        font-size: 1.1rem;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n      }\n\n      .kit-profile-dialog .identity-details {\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        flex: 1;\n        min-width: 0;\n      }\n\n      .kit-profile-dialog .identity-primary {\n        display: flex;\n        align-items: center;\n        gap: 6px;\n        flex-wrap: wrap;\n      }\n\n      .kit-profile-dialog .identity-display-name {\n        font-weight: 700;\n        font-size: 0.98rem;\n        color: var(--kit-on-surface);\n      }\n\n      .kit-profile-dialog .username-tag {\n        font-weight: 700;\n        font-size: 0.88rem;\n        color: var(--kit-primary);\n      }\n\n      .kit-profile-dialog .role-badge {\n        font-size: 0.68rem;\n        text-transform: uppercase;\n        letter-spacing: 0.06em;\n        font-weight: 700;\n        padding: 2px 7px;\n        border-radius: 999px;\n        background: var(--kit-primary-container);\n        color: var(--kit-on-primary-container);\n      }\n\n      .kit-profile-dialog .identity-email {\n        font-size: 0.82rem;\n        color: var(--kit-on-surface-muted);\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n\n      .kit-profile-dialog .identity-edit-btn {\n        margin-left: auto;\n        padding: 5px 12px;\n        border-radius: 999px;\n        border: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container);\n        color: var(--kit-on-surface);\n        font-size: 0.78rem;\n        font-weight: 600;\n        cursor: pointer;\n        flex-shrink: 0;\n        transition:\n          background-color 0.15s,\n          border-color 0.15s;\n      }\n\n      .kit-profile-dialog .identity-edit-btn:hover {\n        border-color: var(--kit-primary);\n        background: var(--kit-surface-container-highest);\n      }\n\n      .kit-profile-dialog .identity-bio-preview {\n        margin: 0;\n        font-size: 0.8rem;\n        color: var(--kit-on-surface-muted);\n        display: -webkit-box;\n        -webkit-line-clamp: 2;\n        -webkit-box-orient: vertical;\n        overflow: hidden;\n        line-height: 1.4;\n      }\n\n      .kit-profile-dialog .field-group {\n        display: flex;\n        flex-direction: column;\n        gap: 6px;\n      }\n\n      .kit-profile-dialog .field-label-row {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n      }\n\n      .kit-profile-dialog .field-group label {\n        font-size: 0.85rem;\n        font-weight: 600;\n        color: var(--kit-on-surface);\n      }\n\n      .kit-profile-dialog .char-hint {\n        font-size: 0.75rem;\n        color: var(--kit-on-surface-muted);\n      }\n\n      .kit-profile-dialog .text-input,\n      .kit-profile-dialog .select-input {\n        background: var(--kit-surface-container);\n        border: 1px solid var(--kit-outline-variant);\n        border-radius: 10px;\n        padding: 10px 12px;\n        color: var(--kit-on-surface);\n        font-size: 0.95rem;\n        font-family: inherit;\n        transition: border-color 0.15s;\n      }\n\n      .kit-profile-dialog .text-input:focus,\n      .kit-profile-dialog .select-input:focus {\n        border-color: var(--kit-primary);\n      }\n\n      .kit-profile-dialog .bio-input {\n        resize: vertical;\n        min-height: 68px;\n      }\n\n      .kit-profile-dialog .field-hint {\n        font-size: 0.76rem;\n        color: var(--kit-on-surface-muted);\n      }\n\n      .kit-profile-dialog .toggle-row {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 16px;\n        padding: 12px 14px;\n        border-radius: 12px;\n        background: var(--kit-surface-container);\n        border: 1px solid var(--kit-outline-variant);\n        cursor: pointer;\n      }\n\n      .kit-profile-dialog .toggle-text {\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n      }\n\n      .kit-profile-dialog .toggle-title {\n        font-size: 0.92rem;\n        font-weight: 600;\n      }\n\n      .kit-profile-dialog .toggle-desc {\n        font-size: 0.78rem;\n        color: var(--kit-on-surface-muted);\n      }\n\n      .kit-profile-dialog .switch-wrapper {\n        position: relative;\n        display: inline-flex;\n        align-items: center;\n        flex-shrink: 0;\n      }\n\n      .kit-profile-dialog .sr-only-checkbox {\n        position: absolute;\n        opacity: 0;\n        width: 0;\n        height: 0;\n      }\n\n      .kit-profile-dialog .sr-only-checkbox:focus-visible + .switch-track {\n        outline: 2px solid var(--kit-primary);\n        outline-offset: 2px;\n      }\n\n      .kit-profile-dialog .switch-track {\n        width: 44px;\n        height: 24px;\n        background: var(--kit-surface-highest);\n        border: 1px solid var(--kit-outline);\n        border-radius: 999px;\n        position: relative;\n        transition:\n          background-color 0.2s,\n          border-color 0.2s;\n      }\n\n      .kit-profile-dialog .switch-track.checked {\n        background: var(--kit-primary);\n        border-color: var(--kit-primary);\n      }\n\n      .kit-profile-dialog .switch-thumb {\n        width: 18px;\n        height: 18px;\n        background: var(--kit-on-surface);\n        border-radius: 50%;\n        position: absolute;\n        top: 2px;\n        left: 2px;\n        transition:\n          transform 0.2s cubic-bezier(0.2, 0, 0, 1),\n          background-color 0.2s;\n      }\n\n      .kit-profile-dialog .switch-track.checked .switch-thumb {\n        transform: translateX(20px);\n        background: var(--kit-on-primary);\n      }\n\n      .kit-profile-dialog .public-sharing-card {\n        border-radius: 12px;\n        background: var(--kit-surface-container);\n        border: 1px solid var(--kit-outline-variant);\n        overflow: hidden;\n        flex-shrink: 0;\n      }\n\n      .kit-profile-dialog .public-sharing-card .toggle-row {\n        border: none;\n        border-radius: 0;\n        padding: 11px 14px;\n        background: transparent;\n      }\n\n      .kit-profile-dialog .share-inline-bar {\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        padding: 8px 12px;\n        background: var(--kit-surface-container-low);\n        border-top: 1px solid var(--kit-outline-variant);\n      }\n\n      .kit-profile-dialog .share-box {\n        display: flex;\n        flex-direction: column;\n        gap: 6px;\n        padding: 12px 14px;\n        border-radius: 12px;\n        background: var(--kit-surface-high);\n        border: 1px dashed var(--kit-outline);\n      }\n\n      .kit-profile-dialog .share-label {\n        font-size: 0.75rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.05em;\n        color: var(--kit-on-surface-muted);\n      }\n\n      .kit-profile-dialog .share-url-row {\n        display: flex;\n        align-items: center;\n        gap: 8px;\n      }\n\n      .kit-profile-dialog .share-url {\n        flex: 1;\n        min-width: 0;\n        font-family: var(--kit-font-mono);\n        font-size: 0.8rem;\n        padding: 6px 10px;\n        border-radius: 8px;\n        background: var(--kit-surface);\n        color: var(--kit-primary);\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n\n      .kit-profile-dialog .copy-btn {\n        padding: 6px 12px;\n        border-radius: 8px;\n        border: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-highest);\n        color: var(--kit-on-surface);\n        font-size: 0.8rem;\n        font-weight: 600;\n        cursor: pointer;\n        white-space: nowrap;\n        flex-shrink: 0;\n      }\n\n      .kit-profile-dialog .share-open-link {\n        font-size: 0.8rem;\n        font-weight: 600;\n        color: var(--kit-primary);\n        text-decoration: none;\n        margin-top: 2px;\n      }\n\n      .kit-profile-dialog .share-inline-bar .share-open-link {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        width: 30px;\n        height: 30px;\n        margin-top: 0;\n        border-radius: 8px;\n        border: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-highest);\n        color: var(--kit-primary);\n        font-size: 0.9rem;\n        flex-shrink: 0;\n      }\n\n      .kit-profile-dialog .share-open-link:hover {\n        text-decoration: underline;\n      }\n\n      .kit-profile-dialog .share-inline-bar .share-open-link:hover {\n        text-decoration: none;\n        border-color: var(--kit-primary);\n      }\n\n      .kit-profile-dialog .kit-nav-group {\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n      }\n\n      .kit-profile-dialog .kit-nav-group-label {\n        font-size: 0.7rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.06em;\n        color: var(--kit-on-surface-muted);\n        padding: 2px 4px 0;\n      }\n\n      .kit-profile-dialog .kit-nav-group-list {\n        display: flex;\n        flex-direction: column;\n        border-radius: 12px;\n        border: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container);\n        overflow: hidden;\n      }\n\n      .kit-profile-dialog .nav-section-btn {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 12px;\n        width: 100%;\n        padding: 12px 14px;\n        border-radius: 12px;\n        background: var(--kit-surface-container);\n        border: 1px solid var(--kit-outline-variant);\n        color: var(--kit-on-surface);\n        text-align: left;\n        text-decoration: none;\n        box-sizing: border-box;\n        cursor: pointer;\n        transition:\n          background-color 0.15s,\n          border-color 0.15s;\n      }\n\n      .kit-profile-dialog .nav-section-btn:hover {\n        background: var(--kit-surface-high);\n        border-color: var(--kit-primary);\n      }\n\n      .kit-profile-dialog .kit-nav-group-list .nav-section-btn {\n        border: none;\n        border-radius: 0;\n        padding: 10px 14px;\n        background: transparent;\n      }\n\n      .kit-profile-dialog\n        .kit-nav-group-list\n        .nav-section-btn\n        + .nav-section-btn {\n        border-top: 1px solid var(--kit-outline-variant);\n      }\n\n      .kit-profile-dialog .kit-nav-group-list .nav-section-btn:hover {\n        background: var(--kit-surface-high);\n      }\n\n      .kit-profile-dialog .nav-section-left {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        min-width: 0;\n        flex: 1;\n      }\n\n      .kit-profile-dialog .nav-section-icon {\n        color: var(--kit-primary);\n        flex-shrink: 0;\n        display: inline-flex;\n        align-items: center;\n      }\n\n      .kit-profile-dialog .nav-section-text {\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        min-width: 0;\n      }\n\n      .kit-profile-dialog .nav-section-title {\n        font-size: 0.9rem;\n        font-weight: 600;\n      }\n\n      .kit-profile-dialog .nav-section-desc {\n        font-size: 0.76rem;\n        color: var(--kit-on-surface-muted);\n        line-height: 1.35;\n      }\n\n      .kit-profile-dialog .nav-section-chevron {\n        color: var(--kit-on-surface-muted);\n        flex-shrink: 0;\n      }\n\n      .kit-profile-dialog .guest-card {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        text-align: center;\n        padding: 18px 16px;\n        border-radius: 14px;\n        background: var(--kit-surface-high);\n        border: 1px solid var(--kit-outline-variant);\n        gap: 10px;\n      }\n\n      .kit-profile-dialog .guest-icon-circle {\n        width: 52px;\n        height: 52px;\n        border-radius: 50%;\n        background: var(--kit-primary-container);\n        color: var(--kit-on-primary-container);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n\n      .kit-profile-dialog .guest-title {\n        margin: 4px 0 0;\n        font-family: var(--kit-font-heading);\n        font-size: 1.05rem;\n        font-weight: 700;\n      }\n\n      .kit-profile-dialog .guest-desc {\n        margin: 0;\n        font-size: 0.85rem;\n        line-height: 1.45;\n        color: var(--kit-on-surface-muted);\n      }\n\n      .kit-profile-dialog .signin-cta-btn {\n        margin-top: 6px;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        width: 100%;\n        padding: 11px 18px;\n        border-radius: 9999px;\n        background: var(--kit-primary);\n        color: var(--kit-on-primary);\n        font-size: 0.92rem;\n        font-weight: 700;\n        text-decoration: none;\n        box-sizing: border-box;\n      }\n\n      .kit-profile-dialog .status-msg {\n        margin: 0;\n        font-size: 0.84rem;\n        font-weight: 600;\n        color: var(--kit-success);\n      }\n\n      .kit-profile-dialog .status-msg.error {\n        color: var(--kit-danger);\n      }\n\n      .kit-profile-dialog .modal-footer {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        padding: 16px 22px;\n        border-top: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container);\n      }\n\n      .kit-profile-dialog .footer-actions {\n        display: flex;\n        align-items: center;\n        gap: 10px;\n      }\n\n      .kit-profile-dialog .signout-link {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        font-size: 0.85rem;\n        font-weight: 600;\n        color: var(--kit-danger);\n        background: transparent;\n        border: none;\n        padding: 4px 6px;\n        border-radius: 8px;\n        cursor: pointer;\n        text-decoration: none;\n      }\n\n      .kit-profile-dialog .signout-link:hover {\n        text-decoration: underline;\n      }\n\n      .kit-profile-dialog .cancel-btn {\n        padding: 9px 16px;\n        border-radius: 9999px;\n        border: 1px solid var(--kit-outline-variant);\n        background: transparent;\n        color: var(--kit-on-surface);\n        font-weight: 600;\n        font-size: 0.88rem;\n        cursor: pointer;\n      }\n\n      .kit-profile-dialog .save-btn {\n        padding: 9px 18px;\n        border-radius: 9999px;\n        border: none;\n        background: var(--kit-primary);\n        color: var(--kit-on-primary);\n        font-weight: 700;\n        font-size: 0.88rem;\n        cursor: pointer;\n      }\n\n      .kit-profile-dialog .save-btn:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      @media (max-width: 768px) {\n        .kit-profile-dialog {\n          width: 100vw;\n          max-width: 100vw;\n          margin: auto 0 0 0;\n          border-radius: 24px 24px 0 0;\n          border-bottom: none;\n          animation: kitSheetSlideUp 260ms var(--kit-ease-smooth) backwards;\n        }\n\n        .kit-profile-dialog.closing {\n          animation: kitSheetSlideDown 170ms var(--kit-ease-exit) forwards;\n        }\n\n        .kit-profile-dialog .sheet-drag-area {\n          display: flex;\n          justify-content: center;\n          padding: 10px 0 2px;\n          touch-action: none;\n          user-select: none;\n          cursor: grab;\n        }\n\n        .kit-profile-dialog .modal-header {\n          touch-action: none;\n          user-select: none;\n          cursor: grab;\n        }\n\n        .kit-profile-dialog .modal-header button,\n        .kit-profile-dialog .modal-header a {\n          touch-action: manipulation;\n          cursor: pointer;\n        }\n\n        .kit-profile-dialog .sheet-handle {\n          width: 36px;\n          height: 4px;\n          border-radius: 999px;\n          background: var(--kit-outline);\n          opacity: 0.5;\n        }\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        .kit-profile-dialog,\n        .kit-profile-dialog * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    "] }]
    }], () => [], { dialogEl: [{
            type: ViewChild,
            args: ['dialogEl']
        }], isOpen: [{ type: i0.Input, args: [{ isSignal: true, alias: "isOpen", required: false }] }], showInstallAction: [{ type: i0.Input, args: [{ isSignal: true, alias: "showInstallAction", required: false }] }], activeView: [{ type: i0.Input, args: [{ isSignal: true, alias: "activeView", required: false }] }], isAuthenticated: [{ type: i0.Input, args: [{ isSignal: true, alias: "isAuthenticated", required: false }] }], user: [{ type: i0.Input, args: [{ isSignal: true, alias: "user", required: false }] }], displayName: [{ type: i0.Input, args: [{ isSignal: true, alias: "displayName", required: false }] }], bio: [{ type: i0.Input, args: [{ isSignal: true, alias: "bio", required: false }] }], isPublic: [{ type: i0.Input, args: [{ isSignal: true, alias: "isPublic", required: false }] }], saving: [{ type: i0.Input, args: [{ isSignal: true, alias: "saving", required: false }] }], statusMessage: [{ type: i0.Input, args: [{ isSignal: true, alias: "statusMessage", required: false }] }], isError: [{ type: i0.Input, args: [{ isSignal: true, alias: "isError", required: false }] }], copied: [{ type: i0.Input, args: [{ isSignal: true, alias: "copied", required: false }] }], accountHubUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "accountHubUrl", required: false }] }], loginUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "loginUrl", required: false }] }], collectionNoun: [{ type: i0.Input, args: [{ isSignal: true, alias: "collectionNoun", required: false }] }], guestTitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "guestTitle", required: false }] }], guestDescription: [{ type: i0.Input, args: [{ isSignal: true, alias: "guestDescription", required: false }] }], displayNameChange: [{ type: i0.Output, args: ["displayNameChange"] }], bioChange: [{ type: i0.Output, args: ["bioChange"] }], isPublicChange: [{ type: i0.Output, args: ["isPublicChange"] }], publicToggleSaved: [{ type: i0.Output, args: ["publicToggleSaved"] }], editProfileClicked: [{ type: i0.Output, args: ["editProfileClicked"] }], saveClicked: [{ type: i0.Output, args: ["saveClicked"] }], copyClicked: [{ type: i0.Output, args: ["copyClicked"] }], signOutClicked: [{ type: i0.Output, args: ["signOutClicked"] }], closed: [{ type: i0.Output, args: ["closed"] }], backToProfile: [{ type: i0.Output, args: ["backToProfile"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitProfileModalComponent, { className: "KitProfileModalComponent", filePath: "profile-modal.component.ts", lineNumber: 1322 }); })();
