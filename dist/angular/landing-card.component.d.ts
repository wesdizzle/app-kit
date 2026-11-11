import * as i0 from "@angular/core";
export declare class KitLandingCardComponent {
    readonly appName: import("@angular/core").InputSignal<string>;
    readonly subtitle: import("@angular/core").InputSignal<string>;
    readonly logoUrl: import("@angular/core").InputSignal<string>;
    readonly accountMissing: import("@angular/core").InputSignal<boolean>;
    readonly accountMissingMessage: import("@angular/core").InputSignal<string>;
    readonly loading: import("@angular/core").InputSignal<boolean>;
    readonly loginUrl: import("@angular/core").InputSignal<string>;
    readonly signInClicked: import("@angular/core").OutputEmitterRef<MouseEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitLandingCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitLandingCardComponent, "kit-landing-card", never, { "appName": { "alias": "appName"; "required": false; "isSignal": true; }; "subtitle": { "alias": "subtitle"; "required": false; "isSignal": true; }; "logoUrl": { "alias": "logoUrl"; "required": false; "isSignal": true; }; "accountMissing": { "alias": "accountMissing"; "required": false; "isSignal": true; }; "accountMissingMessage": { "alias": "accountMissingMessage"; "required": false; "isSignal": true; }; "loading": { "alias": "loading"; "required": false; "isSignal": true; }; "loginUrl": { "alias": "loginUrl"; "required": false; "isSignal": true; }; }, { "signInClicked": "signInClicked"; }, never, never, true, never>;
}
