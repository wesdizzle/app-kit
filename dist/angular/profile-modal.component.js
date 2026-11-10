import { Component, ViewChild, ViewEncapsulation, input, output, signal, computed, effect, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = ["dialogEl"];
const _c1 = [[["", "profileSubview", ""]], [["", "profileExtraNav", ""]], [["", "profileExtraFields", ""]]];
const _c2 = ["[profileSubview]", "[profileExtraNav]", "[profileExtraFields]"];
function KitProfileModalComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵprojection(0);
} }
function KitProfileModalComponent_Conditional_6_Conditional_13_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18)(1, "div", 46);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 47)(4, "div", 48)(5, "span", 49);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 50);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "span", 51);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const u_r4 = ctx;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", (u_r4.displayName || u_r4.username || "T")[0].toUpperCase(), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("@", u_r4.username);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(u_r4.role);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(u_r4.email);
} }
function KitProfileModalComponent_Conditional_6_Conditional_13_Conditional_28_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 56);
    i0.ɵɵtext(1, " Open public collection page \u2197 ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("href", ctx_r1.publicRelativePath(), i0.ɵɵsanitizeUrl);
} }
function KitProfileModalComponent_Conditional_6_Conditional_13_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 35)(1, "span", 52);
    i0.ɵɵtext(2, "Public Share Link");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 53)(4, "code", 54);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 55);
    i0.ɵɵlistener("click", function KitProfileModalComponent_Conditional_6_Conditional_13_Conditional_28_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.copyLink()); });
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(8, KitProfileModalComponent_Conditional_6_Conditional_13_Conditional_28_Conditional_8_Template, 2, 1, "a", 56);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.publicUrl());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.copied() ? "Copied!" : "Copy", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.publicRelativePath() ? 8 : -1);
} }
function KitProfileModalComponent_Conditional_6_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵconditionalCreate(0, KitProfileModalComponent_Conditional_6_Conditional_13_Conditional_0_Template, 11, 4, "div", 18);
    i0.ɵɵelementStart(1, "div", 19)(2, "div", 20)(3, "label", 21);
    i0.ɵɵtext(4, "Display Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 22);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "input", 23);
    i0.ɵɵlistener("ngModelChange", function KitProfileModalComponent_Conditional_6_Conditional_13_Template_input_ngModelChange_7_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.displayNameChange.emit($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 24);
    i0.ɵɵtext(9, " Shown on your public collection banner when sharing is enabled. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 19)(11, "div", 20)(12, "label", 25);
    i0.ɵɵtext(13, "Bio");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 22);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "textarea", 26);
    i0.ɵɵlistener("ngModelChange", function KitProfileModalComponent_Conditional_6_Conditional_13_Template_textarea_ngModelChange_16_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.bioChange.emit($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵprojection(17, 2);
    i0.ɵɵelementStart(18, "label", 27)(19, "div", 28)(20, "span", 29);
    i0.ɵɵtext(21, "Public Collection");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span", 30);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "span", 31)(25, "input", 32);
    i0.ɵɵlistener("ngModelChange", function KitProfileModalComponent_Conditional_6_Conditional_13_Template_input_ngModelChange_25_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.isPublicChange.emit($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span", 33);
    i0.ɵɵelement(27, "span", 34);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(28, KitProfileModalComponent_Conditional_6_Conditional_13_Conditional_28_Template, 9, 3, "div", 35);
    i0.ɵɵelementStart(29, "a", 36)(30, "div", 37);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(31, "svg", 38);
    i0.ɵɵelement(32, "rect", 39)(33, "path", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(34, "div", 41)(35, "span", 42);
    i0.ɵɵtext(36, " Account & Security Hub ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "span", 43);
    i0.ɵɵtext(38, " Manage password, 2FA authenticator, passkeys, and active sessions ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(39, "svg", 44);
    i0.ɵɵelement(40, "polyline", 45);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional((tmp_3_0 = ctx_r1.user()) ? 0 : -1, tmp_3_0);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", ctx_r1.displayName().length, " / 60");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r1.displayName());
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("", ctx_r1.bio().length, " / 300");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r1.bio());
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" Allow anyone with your link to view your read-only ", ctx_r1.collectionNoun(), ". ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngModel", ctx_r1.isPublic());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("checked", ctx_r1.isPublic());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.isPublic() && ctx_r1.publicUrl() ? 28 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("href", ctx_r1.accountHubUrl(), i0.ɵɵsanitizeUrl);
} }
function KitProfileModalComponent_Conditional_6_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15)(1, "div", 57);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 58);
    i0.ɵɵelement(3, "rect", 39)(4, "path", 40);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "h3", 59);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 60);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "a", 61);
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
function KitProfileModalComponent_Conditional_6_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 62);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("error", ctx_r1.isError());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.statusMessage(), " ");
} }
function KitProfileModalComponent_Conditional_6_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 63);
    i0.ɵɵlistener("click", function KitProfileModalComponent_Conditional_6_Conditional_18_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.signOutClicked.emit()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 64);
    i0.ɵɵelement(2, "path", 65)(3, "polyline", 66)(4, "line", 67);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6, "Sign Out");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 68)(8, "button", 69);
    i0.ɵɵlistener("click", function KitProfileModalComponent_Conditional_6_Conditional_18_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.requestClose()); });
    i0.ɵɵtext(9, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 70);
    i0.ɵɵlistener("click", function KitProfileModalComponent_Conditional_6_Conditional_18_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.saveClicked.emit()); });
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Saving..." : "Save Changes", " ");
} }
function KitProfileModalComponent_Conditional_6_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelement(0, "div");
    i0.ɵɵelementStart(1, "div", 68)(2, "button", 69);
    i0.ɵɵlistener("click", function KitProfileModalComponent_Conditional_6_Conditional_19_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.requestClose()); });
    i0.ɵɵtext(3, " Close ");
    i0.ɵɵelementEnd()();
} }
function KitProfileModalComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header", 5)(1, "div", 6)(2, "span", 7);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 8);
    i0.ɵɵelement(4, "path", 9)(5, "circle", 10);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "h2");
    i0.ɵɵtext(7, "Profile & Sharing");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 11);
    i0.ɵɵlistener("click", function KitProfileModalComponent_Conditional_6_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.requestClose()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(9, "svg", 8);
    i0.ɵɵelement(10, "line", 12)(11, "line", 13);
    i0.ɵɵelementEnd()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(12, "div", 14);
    i0.ɵɵconditionalCreate(13, KitProfileModalComponent_Conditional_6_Conditional_13_Template, 41, 11)(14, KitProfileModalComponent_Conditional_6_Conditional_14_Template, 11, 3, "div", 15);
    i0.ɵɵprojection(15, 1);
    i0.ɵɵconditionalCreate(16, KitProfileModalComponent_Conditional_6_Conditional_16_Template, 2, 3, "p", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "footer", 17);
    i0.ɵɵconditionalCreate(18, KitProfileModalComponent_Conditional_6_Conditional_18_Template, 12, 2)(19, KitProfileModalComponent_Conditional_6_Conditional_19_Template, 4, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(13);
    i0.ɵɵconditional(ctx_r1.isAuthenticated() ? 13 : 14);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.statusMessage() ? 16 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.isAuthenticated() ? 18 : 19);
} }
export class KitProfileModalComponent {
    constructor() {
        this.isOpen = input(true, ...(ngDevMode ? [{ debugName: "isOpen" }] : /* istanbul ignore next */ []));
        this.activeView = input('profile', ...(ngDevMode ? [{ debugName: "activeView" }] : /* istanbul ignore next */ []));
        this.isAuthenticated = input(false, ...(ngDevMode ? [{ debugName: "isAuthenticated" }] : /* istanbul ignore next */ []));
        this.user = input(null, ...(ngDevMode ? [{ debugName: "user" }] : /* istanbul ignore next */ []));
        this.displayName = input('', ...(ngDevMode ? [{ debugName: "displayName" }] : /* istanbul ignore next */ []));
        this.bio = input('', ...(ngDevMode ? [{ debugName: "bio" }] : /* istanbul ignore next */ []));
        this.isPublic = input(true, ...(ngDevMode ? [{ debugName: "isPublic" }] : /* istanbul ignore next */ []));
        this.saving = input(false, ...(ngDevMode ? [{ debugName: "saving" }] : /* istanbul ignore next */ []));
        this.statusMessage = input('', ...(ngDevMode ? [{ debugName: "statusMessage" }] : /* istanbul ignore next */ []));
        this.isError = input(false, ...(ngDevMode ? [{ debugName: "isError" }] : /* istanbul ignore next */ []));
        this.copied = input(false, ...(ngDevMode ? [{ debugName: "copied" }] : /* istanbul ignore next */ []));
        this.accountHubUrl = input('/api/auth/account', ...(ngDevMode ? [{ debugName: "accountHubUrl" }] : /* istanbul ignore next */ []));
        this.loginUrl = input('/api/auth/login', ...(ngDevMode ? [{ debugName: "loginUrl" }] : /* istanbul ignore next */ []));
        this.collectionNoun = input('collection', ...(ngDevMode ? [{ debugName: "collectionNoun" }] : /* istanbul ignore next */ []));
        this.guestTitle = input('Sign in to manage your collection', ...(ngDevMode ? [{ debugName: "guestTitle" }] : /* istanbul ignore next */ []));
        this.guestDescription = input('Authenticate with your account to edit your collection, customize your profile, and share a public link.', ...(ngDevMode ? [{ debugName: "guestDescription" }] : /* istanbul ignore next */ []));
        this.displayNameChange = output();
        this.bioChange = output();
        this.isPublicChange = output();
        this.saveClicked = output();
        this.copyClicked = output();
        this.signOutClicked = output();
        this.closed = output();
        this.backToProfile = output();
        this.touchStartY = 0;
        this.dragOffsetY = signal(0, ...(ngDevMode ? [{ debugName: "dragOffsetY" }] : /* istanbul ignore next */ []));
        this.isDragging = signal(false, ...(ngDevMode ? [{ debugName: "isDragging" }] : /* istanbul ignore next */ []));
        this.effectiveTransformY = computed(() => Math.max(0, this.dragOffsetY()), ...(ngDevMode ? [{ debugName: "effectiveTransformY" }] : /* istanbul ignore next */ []));
        this.publicRelativePath = computed(() => {
            const username = this.user()?.username;
            if (!username)
                return '';
            return `/u/${encodeURIComponent(username)}`;
        }, ...(ngDevMode ? [{ debugName: "publicRelativePath" }] : /* istanbul ignore next */ []));
        this.publicUrl = computed(() => {
            const rel = this.publicRelativePath();
            if (!rel)
                return '';
            const origin = typeof window !== 'undefined' ? window.location.origin : '';
            return `${origin}${rel}`;
        }, ...(ngDevMode ? [{ debugName: "publicUrl" }] : /* istanbul ignore next */ []));
        effect(() => {
            const open = this.isOpen();
            queueMicrotask(() => {
                const dialog = this.dialogEl?.nativeElement;
                if (!dialog)
                    return;
                if (open) {
                    if (!dialog.open && typeof dialog.showModal === 'function') {
                        dialog.showModal();
                    }
                }
                else if (dialog.open && typeof dialog.close === 'function') {
                    dialog.close();
                }
            });
        });
    }
    copyLink() {
        this.copyClicked.emit();
    }
    requestClose() {
        this.dragOffsetY.set(0);
        this.isDragging.set(false);
        const dialog = this.dialogEl?.nativeElement;
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
        if (this.activeView() !== 'profile') {
            event.preventDefault();
            this.backToProfile.emit();
            return;
        }
        event.preventDefault();
        this.requestClose();
    }
    onTouchStart(event) {
        if (event.touches.length !== 1)
            return;
        this.touchStartY = event.touches[0].clientY;
        this.isDragging.set(true);
    }
    onTouchMove(event) {
        if (!this.isDragging() || event.touches.length !== 1)
            return;
        const deltaY = event.touches[0].clientY - this.touchStartY;
        if (deltaY > 0) {
            this.dragOffsetY.set(deltaY);
        }
        else {
            this.dragOffsetY.set(0);
        }
    }
    onTouchEnd() {
        if (!this.isDragging())
            return;
        const finalOffset = this.dragOffsetY();
        this.isDragging.set(false);
        if (finalOffset > 90) {
            this.requestClose();
        }
        else {
            this.dragOffsetY.set(0);
        }
    }
    static { this.ɵfac = function KitProfileModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitProfileModalComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitProfileModalComponent, selectors: [["kit-profile-modal"]], viewQuery: function KitProfileModalComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dialogEl = _t.first);
        } }, inputs: { isOpen: [1, "isOpen"], activeView: [1, "activeView"], isAuthenticated: [1, "isAuthenticated"], user: [1, "user"], displayName: [1, "displayName"], bio: [1, "bio"], isPublic: [1, "isPublic"], saving: [1, "saving"], statusMessage: [1, "statusMessage"], isError: [1, "isError"], copied: [1, "copied"], accountHubUrl: [1, "accountHubUrl"], loginUrl: [1, "loginUrl"], collectionNoun: [1, "collectionNoun"], guestTitle: [1, "guestTitle"], guestDescription: [1, "guestDescription"] }, outputs: { displayNameChange: "displayNameChange", bioChange: "bioChange", isPublicChange: "isPublicChange", saveClicked: "saveClicked", copyClicked: "copyClicked", signOutClicked: "signOutClicked", closed: "closed", backToProfile: "backToProfile" }, ngContentSelectors: _c2, decls: 7, vars: 5, consts: [["dialogEl", ""], [1, "kit-profile-dialog", "profile-dialog", 3, "click", "cancel"], [1, "modal-card", 3, "click"], [1, "sheet-drag-area", 3, "touchstart", "touchmove", "touchend", "touchcancel"], [1, "sheet-handle"], [1, "modal-header"], [1, "header-title-row"], ["aria-hidden", "true", 1, "header-icon"], ["viewBox", "0 0 24 24", "width", "20", "height", "20", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"], ["cx", "12", "cy", "7", "r", "4"], ["type", "button", "aria-label", "Close profile dialog", "data-testid", "profile-modal-close-btn", 1, "close-btn", 3, "click"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "modal-body"], ["data-testid", "profile-guest-view", 1, "guest-card"], [1, "status-msg", 3, "error"], [1, "modal-footer"], [1, "identity-banner"], [1, "field-group"], [1, "field-label-row"], ["for", "kit-profile-display-name"], [1, "char-hint"], ["id", "kit-profile-display-name", "type", "text", "maxlength", "60", "placeholder", "Your collector handle", 1, "text-input", 3, "ngModelChange", "ngModel"], [1, "field-hint"], ["for", "kit-profile-bio"], ["id", "kit-profile-bio", "rows", "3", "maxlength", "300", "placeholder", "Share what you collect or hunt...", 1, "text-input", "bio-input", 3, "ngModelChange", "ngModel"], ["for", "kit-profile-is-public", 1, "toggle-row"], [1, "toggle-text"], [1, "toggle-title"], [1, "toggle-desc"], [1, "switch-wrapper"], ["id", "kit-profile-is-public", "type", "checkbox", 1, "sr-only-checkbox", 3, "ngModelChange", "ngModel"], [1, "switch-track"], [1, "switch-thumb"], [1, "share-box"], ["target", "_blank", "rel", "noopener noreferrer", "data-testid", "profile-account-hub-link", 1, "nav-section-btn", 3, "href"], [1, "nav-section-left"], ["viewBox", "0 0 24 24", "width", "18", "height", "18", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "nav-section-icon"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2", "ry", "2"], ["d", "M7 11V7a5 5 0 0 1 10 0v4"], [1, "nav-section-text"], [1, "nav-section-title"], [1, "nav-section-desc"], ["viewBox", "0 0 24 24", "width", "18", "height", "18", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "nav-section-chevron"], ["points", "9 18 15 12 9 6"], [1, "identity-avatar"], [1, "identity-details"], [1, "identity-primary"], [1, "username-tag"], [1, "role-badge"], [1, "identity-email"], [1, "share-label"], [1, "share-url-row"], [1, "share-url"], ["type", "button", "data-testid", "copy-public-url-btn", 1, "copy-btn", 3, "click"], ["target", "_blank", "rel", "noopener", 1, "share-open-link", 3, "href"], [1, "guest-icon-circle"], ["viewBox", "0 0 24 24", "width", "24", "height", "24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], [1, "guest-title"], [1, "guest-desc"], ["data-testid", "profile-guest-signin-btn", 1, "signin-cta-btn", 3, "href"], [1, "status-msg"], ["type", "button", "data-testid", "profile-signout-link", 1, "signout-link", 3, "click"], ["viewBox", "0 0 24 24", "width", "16", "height", "16", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"], ["points", "16 17 21 12 16 7"], ["x1", "21", "y1", "12", "x2", "9", "y2", "12"], [1, "footer-actions"], ["type", "button", 1, "cancel-btn", 3, "click"], ["type", "button", "data-testid", "profile-save-btn", 1, "save-btn", 3, "click", "disabled"]], template: function KitProfileModalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef(_c1);
            i0.ɵɵelementStart(0, "dialog", 1, 0);
            i0.ɵɵlistener("click", function KitProfileModalComponent_Template_dialog_click_0_listener($event) { return ctx.onDialogClick($event); })("cancel", function KitProfileModalComponent_Template_dialog_cancel_0_listener($event) { return ctx.onDialogCancel($event); });
            i0.ɵɵelementStart(2, "div", 2);
            i0.ɵɵlistener("click", function KitProfileModalComponent_Template_div_click_2_listener($event) { return $event.stopPropagation(); });
            i0.ɵɵelementStart(3, "div", 3);
            i0.ɵɵlistener("touchstart", function KitProfileModalComponent_Template_div_touchstart_3_listener($event) { return ctx.onTouchStart($event); })("touchmove", function KitProfileModalComponent_Template_div_touchmove_3_listener($event) { return ctx.onTouchMove($event); })("touchend", function KitProfileModalComponent_Template_div_touchend_3_listener() { return ctx.onTouchEnd(); })("touchcancel", function KitProfileModalComponent_Template_div_touchcancel_3_listener() { return ctx.onTouchEnd(); });
            i0.ɵɵelement(4, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(5, KitProfileModalComponent_Conditional_5_Template, 1, 0)(6, KitProfileModalComponent_Conditional_6_Template, 20, 3);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵstyleProp("transform", ctx.effectiveTransformY() > 0 ? "translateY(" + ctx.effectiveTransformY() + "px)" : null)("transition", ctx.isDragging() ? "none" : "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)");
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.activeView() !== "profile" ? 5 : 6);
        } }, dependencies: [CommonModule, FormsModule, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.NgControlStatus, i1.MaxLengthValidator, i1.NgModel], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitProfileModalComponent, [{
        type: Component,
        args: [{
                selector: 'kit-profile-modal',
                standalone: true,
                imports: [CommonModule, FormsModule],
                encapsulation: ViewEncapsulation.None,
                template: `
    <dialog
      #dialogEl
      class="kit-profile-dialog profile-dialog"
      [style.transform]="
        effectiveTransformY() > 0
          ? 'translateY(' + effectiveTransformY() + 'px)'
          : null
      "
      [style.transition]="
        isDragging()
          ? 'none'
          : 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
      "
      (click)="onDialogClick($event)"
      (cancel)="onDialogCancel($event)"
    >
      <div class="modal-card" (click)="$event.stopPropagation()">
        <div
          class="sheet-drag-area"
          (touchstart)="onTouchStart($event)"
          (touchmove)="onTouchMove($event)"
          (touchend)="onTouchEnd()"
          (touchcancel)="onTouchEnd()"
        >
          <div class="sheet-handle"></div>
        </div>

        @if (activeView() !== 'profile') {
          <ng-content select="[profileSubview]" />
        } @else {
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
                  <div class="identity-avatar">
                    {{ (u.displayName || u.username || 'T')[0].toUpperCase() }}
                  </div>
                  <div class="identity-details">
                    <div class="identity-primary">
                      <span class="username-tag">&#64;{{ u.username }}</span>
                      <span class="role-badge">{{ u.role }}</span>
                    </div>
                    <span class="identity-email">{{ u.email }}</span>
                  </div>
                </div>
              }

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
                  Shown on your public collection banner when sharing is enabled.
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
                    class="sr-only-checkbox"
                    [ngModel]="isPublic()"
                    (ngModelChange)="isPublicChange.emit($event)"
                  />
                  <span class="switch-track" [class.checked]="isPublic()">
                    <span class="switch-thumb"></span>
                  </span>
                </span>
              </label>

              @if (isPublic() && publicUrl()) {
                <div class="share-box">
                  <span class="share-label">Public Share Link</span>
                  <div class="share-url-row">
                    <code class="share-url">{{ publicUrl() }}</code>
                    <button
                      type="button"
                      class="copy-btn"
                      (click)="copyLink()"
                      data-testid="copy-public-url-btn"
                    >
                      {{ copied() ? 'Copied!' : 'Copy' }}
                    </button>
                  </div>
                  @if (publicRelativePath()) {
                    <a
                      class="share-open-link"
                      [href]="publicRelativePath()"
                      target="_blank"
                      rel="noopener"
                    >
                      Open public collection page &#8599;
                    </a>
                  }
                </div>
              }

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
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <div class="nav-section-text">
                    <span class="nav-section-title">
                      Account &amp; Security Hub
                    </span>
                    <span class="nav-section-desc">
                      Manage password, 2FA authenticator, passkeys, and active
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
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
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
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 class="guest-title">{{ guestTitle() }}</h3>
                <p class="guest-desc">{{ guestDescription() }}</p>
                <a
                  [href]="loginUrl()"
                  class="signin-cta-btn"
                  data-testid="profile-guest-signin-btn"
                >
                  Sign In
                </a>
              </div>
            }

            <ng-content select="[profileExtraNav]" />

            @if (statusMessage()) {
              <p class="status-msg" [class.error]="isError()">
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
                  Cancel
                </button>
                <button
                  type="button"
                  class="save-btn"
                  [disabled]="saving()"
                  (click)="saveClicked.emit()"
                  data-testid="profile-save-btn"
                >
                  {{ saving() ? 'Saving...' : 'Save Changes' }}
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
        }
      </div>
    </dialog>
  `,
            }]
    }], () => [], { dialogEl: [{
            type: ViewChild,
            args: ['dialogEl']
        }], isOpen: [{ type: i0.Input, args: [{ isSignal: true, alias: "isOpen", required: false }] }], activeView: [{ type: i0.Input, args: [{ isSignal: true, alias: "activeView", required: false }] }], isAuthenticated: [{ type: i0.Input, args: [{ isSignal: true, alias: "isAuthenticated", required: false }] }], user: [{ type: i0.Input, args: [{ isSignal: true, alias: "user", required: false }] }], displayName: [{ type: i0.Input, args: [{ isSignal: true, alias: "displayName", required: false }] }], bio: [{ type: i0.Input, args: [{ isSignal: true, alias: "bio", required: false }] }], isPublic: [{ type: i0.Input, args: [{ isSignal: true, alias: "isPublic", required: false }] }], saving: [{ type: i0.Input, args: [{ isSignal: true, alias: "saving", required: false }] }], statusMessage: [{ type: i0.Input, args: [{ isSignal: true, alias: "statusMessage", required: false }] }], isError: [{ type: i0.Input, args: [{ isSignal: true, alias: "isError", required: false }] }], copied: [{ type: i0.Input, args: [{ isSignal: true, alias: "copied", required: false }] }], accountHubUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "accountHubUrl", required: false }] }], loginUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "loginUrl", required: false }] }], collectionNoun: [{ type: i0.Input, args: [{ isSignal: true, alias: "collectionNoun", required: false }] }], guestTitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "guestTitle", required: false }] }], guestDescription: [{ type: i0.Input, args: [{ isSignal: true, alias: "guestDescription", required: false }] }], displayNameChange: [{ type: i0.Output, args: ["displayNameChange"] }], bioChange: [{ type: i0.Output, args: ["bioChange"] }], isPublicChange: [{ type: i0.Output, args: ["isPublicChange"] }], saveClicked: [{ type: i0.Output, args: ["saveClicked"] }], copyClicked: [{ type: i0.Output, args: ["copyClicked"] }], signOutClicked: [{ type: i0.Output, args: ["signOutClicked"] }], closed: [{ type: i0.Output, args: ["closed"] }], backToProfile: [{ type: i0.Output, args: ["backToProfile"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitProfileModalComponent, { className: "KitProfileModalComponent", filePath: "profile-modal.component.ts", lineNumber: 335 }); })();
