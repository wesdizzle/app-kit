import { KitPwaInstallService } from './pwa-install.service.js';
import * as i0 from "@angular/core";
export declare class KitPwaInstallPromptComponent {
    readonly pwa: KitPwaInstallService;
    readonly appName: import("@angular/core").InputSignal<string>;
    readonly logoUrl: import("@angular/core").InputSignal<string>;
    readonly description: import("@angular/core").InputSignal<string>;
    readonly suppressed: import("@angular/core").InputSignal<boolean>;
    readonly isVisible: import("@angular/core").Signal<boolean>;
    onEscape(): void;
    onInstall(): Promise<void>;
    onClose(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitPwaInstallPromptComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitPwaInstallPromptComponent, "kit-pwa-install-prompt", never, { "appName": { "alias": "appName"; "required": false; "isSignal": true; }; "logoUrl": { "alias": "logoUrl"; "required": false; "isSignal": true; }; "description": { "alias": "description"; "required": false; "isSignal": true; }; "suppressed": { "alias": "suppressed"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
