import { IconName } from './icon.component.js';
import * as i0 from "@angular/core";
export interface KitTabItem {
    id: string;
    label: string;
    badge?: string | number | null;
    icon?: IconName;
    disabled?: boolean;
    testId?: string;
}
export declare function getNextEnabledTabId(tabs: readonly KitTabItem[], currentId: string, key: string): string | null;
/**
 * Accessible Material 3 Expressive segmented pill/underline tab bar
 * with roving keyboard navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`).
 */
export declare class KitTabsComponent {
    private readonly hostRef;
    readonly tabs: import("@angular/core").InputSignal<readonly KitTabItem[]>;
    readonly activeTab: import("@angular/core").InputSignal<string>;
    readonly variant: import("@angular/core").InputSignal<"pill" | "underline">;
    readonly ariaLabel: import("@angular/core").InputSignal<string>;
    readonly testId: import("@angular/core").InputSignal<string | null>;
    readonly tabChange: import("@angular/core").OutputEmitterRef<string>;
    selectTab(tab: KitTabItem): void;
    onTabKeydown(event: KeyboardEvent, currentId: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitTabsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitTabsComponent, "kit-tabs", never, { "tabs": { "alias": "tabs"; "required": true; "isSignal": true; }; "activeTab": { "alias": "activeTab"; "required": true; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "testId": { "alias": "testId"; "required": false; "isSignal": true; }; }, { "tabChange": "tabChange"; }, never, never, true, never>;
}
