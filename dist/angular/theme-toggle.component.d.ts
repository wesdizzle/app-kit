import { KitThemeMode } from './theme.service.js';
import * as i0 from "@angular/core";
/**
 * Shared accessible theme toggle button cycling `light -> dark -> auto`
 * with a spring icon morph transition on state changes.
 * Accepts an explicit `[theme]` input (for controlled parents like `<kit-header-bar>`)
 * or operates directly against `KitThemeService` when used standalone.
 */
export declare class KitThemeToggleComponent {
    private readonly themeService;
    readonly theme: import("@angular/core").InputSignal<KitThemeMode | undefined>;
    readonly buttonClass: import("@angular/core").InputSignal<string>;
    readonly testId: import("@angular/core").InputSignal<string>;
    readonly iconSize: import("@angular/core").InputSignal<number>;
    readonly toggled: import("@angular/core").OutputEmitterRef<KitThemeMode>;
    readonly effectiveTheme: import("@angular/core").Signal<KitThemeMode>;
    onToggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitThemeToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitThemeToggleComponent, "kit-theme-toggle", never, { "theme": { "alias": "theme"; "required": false; "isSignal": true; }; "buttonClass": { "alias": "buttonClass"; "required": false; "isSignal": true; }; "testId": { "alias": "testId"; "required": false; "isSignal": true; }; "iconSize": { "alias": "iconSize"; "required": false; "isSignal": true; }; }, { "toggled": "toggled"; }, never, never, true, never>;
}
