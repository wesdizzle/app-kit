import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export interface KitTableColumn<T = Record<string, unknown>> {
    key: string;
    label: string;
    sortable?: boolean;
    align?: 'left' | 'center' | 'right';
    width?: string;
    sortValue?: (row: T) => string | number | null | undefined;
}
export type KitTableSortState = {
    key: string;
    direction: 'asc' | 'desc';
} | null;
export interface KitTableCellContext<T = Record<string, unknown>> {
    $implicit: T;
    column: KitTableColumn<T>;
    value: unknown;
}
export declare function sortKitTableRows<T>(rows: readonly T[], columns: readonly KitTableColumn<T>[], sort: KitTableSortState): readonly T[];
/**
 * Responsive sticky-header sortable table with optional custom `#cellTemplate` projection
 * and clean empty state.
 */
export declare class KitDataTableComponent<T = Record<string, unknown>> {
    readonly columns: import("@angular/core").InputSignal<readonly KitTableColumn<T>[]>;
    readonly rows: import("@angular/core").InputSignal<readonly T[]>;
    readonly trackByKey: import("@angular/core").InputSignal<string | null>;
    readonly initialSort: import("@angular/core").InputSignal<KitTableSortState>;
    readonly emptyText: import("@angular/core").InputSignal<string>;
    readonly tableTestId: import("@angular/core").InputSignal<string | null>;
    readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
    readonly stickyHeader: import("@angular/core").InputSignal<boolean>;
    readonly cellTemplate: import("@angular/core").Signal<TemplateRef<KitTableCellContext<T>> | undefined>;
    private readonly sortOverride;
    readonly sortState: import("@angular/core").Signal<KitTableSortState>;
    readonly sortedRows: import("@angular/core").Signal<readonly T[]>;
    toggleSort(col: KitTableColumn<T>): void;
    getAriaSort(col: KitTableColumn<T>): string | null;
    getCellValue(row: T, key: string): unknown;
    formatCellValue(value: unknown): string;
    trackRow(index: number, row: T): unknown;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitDataTableComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitDataTableComponent<any>, "kit-data-table", never, { "columns": { "alias": "columns"; "required": true; "isSignal": true; }; "rows": { "alias": "rows"; "required": true; "isSignal": true; }; "trackByKey": { "alias": "trackByKey"; "required": false; "isSignal": true; }; "initialSort": { "alias": "initialSort"; "required": false; "isSignal": true; }; "emptyText": { "alias": "emptyText"; "required": false; "isSignal": true; }; "tableTestId": { "alias": "tableTestId"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "stickyHeader": { "alias": "stickyHeader"; "required": false; "isSignal": true; }; }, {}, ["cellTemplate"], never, true, never>;
}
