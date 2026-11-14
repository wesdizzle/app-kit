import { SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export type IconName = 'owned' | 'seeking' | 'wishlist' | 'ordered' | 'unowned' | 'hourglass' | 'gamepad' | 'play' | 'list-queued' | 'pause' | 'stop-circle' | 'verified-badge' | 'physical-box' | 'disc' | 'book-open' | 'ticket' | 'link' | 'rom-archive' | 'missing-dump' | 'flame' | 'zap' | 'coins' | 'tag' | 'shopping-cart' | 'storefront' | 'close' | 'bell' | 'lock' | 'unlock' | 'check' | 'alert-triangle' | 'ban' | 'inbox-empty' | 'compass' | 'sparkles' | 'refresh' | 'square-stop' | 'figure-toy' | 'sun' | 'moon' | 'sun-moon' | 'circle-fill' | 'circle-half' | 'circle-empty' | 'view-list' | 'view-grid' | 'tune' | 'search' | 'sort' | 'chevron-down' | 'eye' | 'eye-off' | 'mail' | 'edit' | 'calendar' | 'clock' | 'gift' | 'chart' | 'user' | 'copy';
export interface IconDef {
    viewBox: string;
    svgInner: string;
}
export declare const ICON_CATALOG: Record<IconName, IconDef>;
export declare class KitIconComponent {
    private readonly sanitizer;
    readonly name: import("@angular/core").InputSignal<IconName>;
    readonly size: import("@angular/core").InputSignal<string | number>;
    readonly className: import("@angular/core").InputSignal<string>;
    readonly ariaLabel: import("@angular/core").InputSignal<string>;
    readonly iconDef: import("@angular/core").Signal<IconDef | null>;
    readonly safeSvgInner: import("@angular/core").Signal<SafeHtml>;
    readonly pixelSize: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitIconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitIconComponent, "kit-icon, app-icon", never, { "name": { "alias": "name"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "className": { "alias": "className"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
export { KitIconComponent as IconComponent };
