import * as i0 from "@angular/core";
export declare class KitPublicBannerComponent {
    readonly badgeLabel: import("@angular/core").InputSignal<string>;
    readonly title: import("@angular/core").InputSignal<string>;
    readonly username: import("@angular/core").InputSignal<string>;
    readonly bio: import("@angular/core").InputSignal<string | null>;
    readonly showBackLink: import("@angular/core").InputSignal<boolean>;
    readonly backHref: import("@angular/core").InputSignal<string>;
    readonly backLabel: import("@angular/core").InputSignal<string>;
    readonly interceptBackClick: import("@angular/core").InputSignal<boolean>;
    readonly backClicked: import("@angular/core").OutputEmitterRef<MouseEvent>;
    onBackClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitPublicBannerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitPublicBannerComponent, "kit-public-banner", never, { "badgeLabel": { "alias": "badgeLabel"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": true; "isSignal": true; }; "username": { "alias": "username"; "required": true; "isSignal": true; }; "bio": { "alias": "bio"; "required": false; "isSignal": true; }; "showBackLink": { "alias": "showBackLink"; "required": false; "isSignal": true; }; "backHref": { "alias": "backHref"; "required": false; "isSignal": true; }; "backLabel": { "alias": "backLabel"; "required": false; "isSignal": true; }; "interceptBackClick": { "alias": "interceptBackClick"; "required": false; "isSignal": true; }; }, { "backClicked": "backClicked"; }, never, never, true, never>;
}
