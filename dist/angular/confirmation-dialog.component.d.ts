/**
 * SHARED CONFIRMATION DIALOG COMPONENT (@wesdizzle/app-kit/angular)
 *
 * A Material 3 Expressive dialog for critical user confirmations, numeric input prompts,
 * or multi-option choices. Uses a native <dialog> element for proper modal semantics and Escape handling.
 */
import { AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export interface KitConfirmationOption {
    label: string;
    value: string | number;
}
export declare class KitConfirmationDialogComponent implements AfterViewInit {
    title: string;
    message: string;
    type: 'confirm' | 'input' | 'options';
    inputValue?: string | number;
    options?: KitConfirmationOption[];
    confirm: EventEmitter<void>;
    confirmWithInput: EventEmitter<string | number>;
    cancel: EventEmitter<void>;
    dialogEl?: ElementRef<HTMLDialogElement>;
    numberInput?: ElementRef<HTMLInputElement>;
    ngAfterViewInit(): void;
    onBackdropClick(event: MouseEvent): void;
    onConfirm(): void;
    onOptionSelect(value: string | number): void;
    onCancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitConfirmationDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitConfirmationDialogComponent, "kit-confirmation-dialog, app-confirmation-dialog", never, { "title": { "alias": "title"; "required": false; }; "message": { "alias": "message"; "required": false; }; "type": { "alias": "type"; "required": false; }; "inputValue": { "alias": "inputValue"; "required": false; }; "options": { "alias": "options"; "required": false; }; }, { "confirm": "confirm"; "confirmWithInput": "confirmWithInput"; "cancel": "cancel"; }, never, never, true, never>;
}
export declare const ConfirmationDialogComponent: typeof KitConfirmationDialogComponent;
export type ConfirmationDialogComponent = KitConfirmationDialogComponent;
