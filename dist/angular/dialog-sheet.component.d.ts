import { ElementRef, OnDestroy } from '@angular/core';
import { BottomSheetDragController } from './bottom-sheet-drag.js';
import * as i0 from "@angular/core";
export declare function canAnimateKitDialogExit(dialog?: HTMLDialogElement | null): boolean;
/**
 * Shared accessible modal & mobile bottom-sheet wrapper built on native `<dialog>`.
 * Coordinates desktop spring-pop entrance, mobile bottom-sheet slide-up,
 * velocity-aware drag-to-dismiss, and non-blocking `.closing` exit animations.
 */
export declare class KitDialogSheetComponent implements OnDestroy {
    dialogEl?: ElementRef<HTMLDialogElement>;
    readonly isOpen: import("@angular/core").InputSignal<boolean>;
    readonly ariaLabelledby: import("@angular/core").InputSignal<string | undefined>;
    readonly ariaLabel: import("@angular/core").InputSignal<string | undefined>;
    readonly maxWidth: import("@angular/core").InputSignal<string>;
    readonly showHandle: import("@angular/core").InputSignal<boolean>;
    readonly panelClass: import("@angular/core").InputSignal<string>;
    readonly closeDurationMs: import("@angular/core").InputSignal<number>;
    readonly closed: import("@angular/core").OutputEmitterRef<void>;
    readonly isClosing: import("@angular/core").WritableSignal<boolean>;
    readonly dragController: BottomSheetDragController;
    readonly dismissFromDrag: () => void;
    private closeTimer;
    constructor();
    ngOnDestroy(): void;
    requestClose(): void;
    onBackdropClick(event: MouseEvent): void;
    onDialogCancel(event: Event): void;
    private finalizeClose;
    private clearCloseTimer;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitDialogSheetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitDialogSheetComponent, "kit-dialog-sheet", never, { "isOpen": { "alias": "isOpen"; "required": false; "isSignal": true; }; "ariaLabelledby": { "alias": "ariaLabelledby"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "maxWidth": { "alias": "maxWidth"; "required": false; "isSignal": true; }; "showHandle": { "alias": "showHandle"; "required": false; "isSignal": true; }; "panelClass": { "alias": "panelClass"; "required": false; "isSignal": true; }; "closeDurationMs": { "alias": "closeDurationMs"; "required": false; "isSignal": true; }; }, { "closed": "closed"; }, never, ["*"], true, never>;
}
