import { BaseUserProfile } from './auth.service.js';
import { KitThemeMode } from './theme.service.js';
import * as i0 from "@angular/core";
export interface KitHeaderTab {
    id: string;
    label: string;
    href?: string;
    testId?: string;
}
export declare class KitHeaderBarComponent {
    readonly appName: import("@angular/core").InputSignal<string>;
    readonly subtitle: import("@angular/core").InputSignal<string>;
    readonly logoUrl: import("@angular/core").InputSignal<string>;
    readonly brandHref: import("@angular/core").InputSignal<string>;
    readonly tabs: import("@angular/core").InputSignal<KitHeaderTab[]>;
    readonly activeTab: import("@angular/core").InputSignal<string>;
    readonly theme: import("@angular/core").InputSignal<KitThemeMode>;
    readonly isAuthenticated: import("@angular/core").InputSignal<boolean>;
    readonly user: import("@angular/core").InputSignal<BaseUserProfile | null>;
    readonly profileTitle: import("@angular/core").InputSignal<string>;
    readonly profileAriaLabel: import("@angular/core").InputSignal<string>;
    readonly profileTestId: import("@angular/core").InputSignal<string>;
    readonly themeTestId: import("@angular/core").InputSignal<string>;
    readonly brandClicked: import("@angular/core").OutputEmitterRef<MouseEvent>;
    readonly tabSelected: import("@angular/core").OutputEmitterRef<string>;
    readonly profileClicked: import("@angular/core").OutputEmitterRef<void>;
    readonly themeToggled: import("@angular/core").OutputEmitterRef<void>;
    readonly resolvedProfileTitle: import("@angular/core").Signal<string>;
    onBrandClick(event: MouseEvent): void;
    onTabClick(event: MouseEvent, tab: KitHeaderTab): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitHeaderBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitHeaderBarComponent, "kit-header-bar", never, { "appName": { "alias": "appName"; "required": false; "isSignal": true; }; "subtitle": { "alias": "subtitle"; "required": false; "isSignal": true; }; "logoUrl": { "alias": "logoUrl"; "required": false; "isSignal": true; }; "brandHref": { "alias": "brandHref"; "required": false; "isSignal": true; }; "tabs": { "alias": "tabs"; "required": false; "isSignal": true; }; "activeTab": { "alias": "activeTab"; "required": false; "isSignal": true; }; "theme": { "alias": "theme"; "required": false; "isSignal": true; }; "isAuthenticated": { "alias": "isAuthenticated"; "required": false; "isSignal": true; }; "user": { "alias": "user"; "required": false; "isSignal": true; }; "profileTitle": { "alias": "profileTitle"; "required": false; "isSignal": true; }; "profileAriaLabel": { "alias": "profileAriaLabel"; "required": false; "isSignal": true; }; "profileTestId": { "alias": "profileTestId"; "required": false; "isSignal": true; }; "themeTestId": { "alias": "themeTestId"; "required": false; "isSignal": true; }; }, { "brandClicked": "brandClicked"; "tabSelected": "tabSelected"; "profileClicked": "profileClicked"; "themeToggled": "themeToggled"; }, never, ["[headerCenter]", "[headerRightStart]", "[headerRightEnd]"], true, never>;
}
