import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, contentChild, input, signal, } from '@angular/core';
import * as i0 from "@angular/core";
const _c0 = ["cellTemplate"];
const _c1 = (a0, a1, a2) => ({ $implicit: a0, column: a1, value: a2 });
const _forTrack0 = ($index, $item) => $item.key;
function KitDataTableComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 0);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.emptyText(), " ");
} }
function KitDataTableComponent_Conditional_1_For_5_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function KitDataTableComponent_Conditional_1_For_5_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const col_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleSort(col_r3)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 8);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const col_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r0.sortState()?.key === col_r3.key);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(col_r3.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.sortState()?.key === col_r3.key ? ctx_r0.sortState()?.direction === "asc" ? "\u25B2" : "\u25BC" : "\u2195", " ");
} }
function KitDataTableComponent_Conditional_1_For_5_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const col_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(col_r3.label);
} }
function KitDataTableComponent_Conditional_1_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 5);
    i0.ɵɵconditionalCreate(1, KitDataTableComponent_Conditional_1_For_5_Conditional_1_Template, 5, 4, "button", 6)(2, KitDataTableComponent_Conditional_1_For_5_Conditional_2_Template, 2, 1, "span");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const col_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("width", col_r3.width || null);
    i0.ɵɵclassProp("align-center", col_r3.align === "center")("align-right", col_r3.align === "right");
    i0.ɵɵattribute("aria-sort", ctx_r0.getAriaSort(col_r3));
    i0.ɵɵadvance();
    i0.ɵɵconditional(col_r3.sortable ? 1 : 2);
} }
function KitDataTableComponent_Conditional_1_For_8_For_2_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0, 10);
} if (rf & 2) {
    const col_r4 = i0.ɵɵnextContext().$implicit;
    const val_r5 = i0.ɵɵreadContextLet(0);
    const row_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("ngTemplateOutlet", ctx)("ngTemplateOutletContext", i0.ɵɵpureFunction3(2, _c1, row_r6, col_r4, val_r5));
} }
function KitDataTableComponent_Conditional_1_For_8_For_2_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const val_r5 = i0.ɵɵreadContextLet(0);
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.formatCellValue(val_r5), " ");
} }
function KitDataTableComponent_Conditional_1_For_8_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdeclareLet(0);
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵconditionalCreate(2, KitDataTableComponent_Conditional_1_For_8_For_2_Conditional_2_Template, 1, 6, "ng-container", 10)(3, KitDataTableComponent_Conditional_1_For_8_For_2_Conditional_3_Template, 1, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_24_0;
    const col_r4 = ctx.$implicit;
    const row_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵstoreLet(ctx_r0.getCellValue(row_r6, col_r4.key));
    i0.ɵɵadvance();
    i0.ɵɵclassProp("align-center", col_r4.align === "center")("align-right", col_r4.align === "right");
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_24_0 = ctx_r0.cellTemplate()) ? 2 : 3, tmp_24_0);
} }
function KitDataTableComponent_Conditional_1_For_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵrepeaterCreate(1, KitDataTableComponent_Conditional_1_For_8_For_2_Template, 4, 6, "td", 9, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.columns());
} }
function KitDataTableComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2)(1, "table", 3)(2, "thead")(3, "tr");
    i0.ɵɵrepeaterCreate(4, KitDataTableComponent_Conditional_1_For_5_Template, 3, 8, "th", 4, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "tbody");
    i0.ɵɵrepeaterCreate(7, KitDataTableComponent_Conditional_1_For_8_Template, 3, 0, "tr", null, i0.ɵɵcomponentInstance().trackRow, true);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("kit-data-table-sticky", ctx_r0.stickyHeader());
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-testid", ctx_r0.tableTestId())("aria-label", ctx_r0.ariaLabel());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.columns());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.sortedRows());
} }
function readRowField(row, key) {
    if (row && typeof row === 'object') {
        return row[key];
    }
    return undefined;
}
export function sortKitTableRows(rows, columns, sort) {
    if (!sort)
        return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col)
        return rows;
    const dir = sort.direction === 'asc' ? 1 : -1;
    const getVal = (row) => {
        if (col.sortValue) {
            return col.sortValue(row);
        }
        const raw = readRowField(row, col.key);
        if (typeof raw === 'number' || typeof raw === 'string') {
            return raw;
        }
        if (raw === null || raw === undefined) {
            return null;
        }
        return String(raw);
    };
    return [...rows].sort((a, b) => {
        const va = getVal(a);
        const vb = getVal(b);
        const aEmpty = va === null || va === undefined || va === '';
        const bEmpty = vb === null || vb === undefined || vb === '';
        if (aEmpty && bEmpty)
            return 0;
        if (aEmpty)
            return 1;
        if (bEmpty)
            return -1;
        if (typeof va === 'number' && typeof vb === 'number') {
            return (va - vb) * dir;
        }
        return (String(va).localeCompare(String(vb), undefined, {
            numeric: true,
            sensitivity: 'base',
        }) * dir);
    });
}
/**
 * Responsive sticky-header sortable table with optional custom `#cellTemplate` projection
 * and clean empty state.
 */
export class KitDataTableComponent {
    constructor() {
        this.columns = input.required(/* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "columns" }] : /* istanbul ignore next */ []));
        this.rows = input.required(/* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "rows" }] : /* istanbul ignore next */ []));
        this.trackByKey = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "trackByKey" }] : /* istanbul ignore next */ []));
        this.initialSort = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "initialSort" }] : /* istanbul ignore next */ []));
        this.emptyText = input('No records available.', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "emptyText" }] : /* istanbul ignore next */ []));
        this.tableTestId = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "tableTestId" }] : /* istanbul ignore next */ []));
        this.ariaLabel = input(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
        this.stickyHeader = input(true, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "stickyHeader" }] : /* istanbul ignore next */ []));
        this.cellTemplate = contentChild('cellTemplate', /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "cellTemplate" }] : /* istanbul ignore next */ []));
        this.sortOverride = signal(null, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "sortOverride" }] : /* istanbul ignore next */ []));
        this.sortState = computed(() => {
            const base = this.initialSort();
            const override = this.sortOverride();
            if (override && override.base === base) {
                return override.value;
            }
            return base;
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "sortState" }] : /* istanbul ignore next */ []));
        this.sortedRows = computed(() => {
            return sortKitTableRows(this.rows(), this.columns(), this.sortState());
        }, /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "sortedRows" }] : /* istanbul ignore next */ []));
    }
    toggleSort(col) {
        if (!col.sortable)
            return;
        const current = this.sortState();
        const nextDir = current?.key === col.key && current.direction === 'asc' ? 'desc' : 'asc';
        this.sortOverride.set({
            base: this.initialSort(),
            value: { key: col.key, direction: nextDir },
        });
    }
    getAriaSort(col) {
        if (!col.sortable)
            return null;
        const current = this.sortState();
        if (current?.key !== col.key)
            return 'none';
        return current.direction === 'asc' ? 'ascending' : 'descending';
    }
    getCellValue(row, key) {
        return readRowField(row, key);
    }
    formatCellValue(value) {
        if (value === null || value === undefined || value === '')
            return '—';
        return String(value);
    }
    trackRow(index, row) {
        const key = this.trackByKey();
        if (key) {
            const val = readRowField(row, key);
            if (val !== null && val !== undefined && val !== '') {
                return val;
            }
        }
        return index;
    }
    static { this.ɵfac = function KitDataTableComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KitDataTableComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KitDataTableComponent, selectors: [["kit-data-table"]], contentQueries: function KitDataTableComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
            i0.ɵɵcontentQuerySignal(dirIndex, ctx.cellTemplate, _c0, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance();
        } }, inputs: { columns: [1, "columns"], rows: [1, "rows"], trackByKey: [1, "trackByKey"], initialSort: [1, "initialSort"], emptyText: [1, "emptyText"], tableTestId: [1, "tableTestId"], ariaLabel: [1, "ariaLabel"], stickyHeader: [1, "stickyHeader"] }, decls: 2, vars: 1, consts: [["role", "status", 1, "kit-data-table-empty"], [1, "kit-data-table-scroll", 3, "kit-data-table-sticky"], [1, "kit-data-table-scroll"], [1, "kit-data-table"], ["scope", "col", 3, "width", "align-center", "align-right"], ["scope", "col"], ["type", "button", 1, "kit-sort-btn", 3, "active"], ["type", "button", 1, "kit-sort-btn", 3, "click"], ["aria-hidden", "true", 1, "kit-sort-indicator"], [3, "align-center", "align-right"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function KitDataTableComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, KitDataTableComponent_Conditional_0_Template, 2, 1, "div", 0)(1, KitDataTableComponent_Conditional_1_Template, 9, 4, "div", 1);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.rows().length === 0 ? 0 : 1);
        } }, dependencies: [NgTemplateOutlet], styles: ["\n      .kit-data-table-scroll {\n        width: 100%;\n        overflow-x: auto;\n        border-radius: var(--%NS%kit-radius-sm);\n        border: 1px solid var(--%NS%kit-outline-variant);\n        background: var(--%NS%kit-surface-container-low);\n      }\n\n      .kit-data-table {\n        width: 100%;\n        border-collapse: collapse;\n        font-size: 0.84rem;\n      }\n\n      .kit-data-table thead th {\n        padding: 10px 12px;\n        text-align: left;\n        font-size: 0.74rem;\n        font-weight: 700;\n        letter-spacing: 0.04em;\n        text-transform: uppercase;\n        color: var(--%NS%kit-on-surface-variant);\n        background: var(--%NS%kit-surface-container);\n        border-bottom: 1.5px solid var(--%NS%kit-outline-variant);\n        white-space: nowrap;\n      }\n\n      .kit-data-table-sticky thead th {\n        position: sticky;\n        top: 0;\n        z-index: 2;\n      }\n\n      .kit-data-table th.align-center,\n      .kit-data-table td.align-center {\n        text-align: center;\n      }\n\n      .kit-data-table th.align-right,\n      .kit-data-table td.align-right {\n        text-align: right;\n      }\n\n      .kit-sort-btn {\n        display: inline-flex;\n        align-items: center;\n        gap: 5px;\n        border: none;\n        background: transparent;\n        color: inherit;\n        font: inherit;\n        letter-spacing: inherit;\n        text-transform: inherit;\n        padding: 0;\n        cursor: pointer;\n      }\n\n      .kit-sort-btn:hover,\n      .kit-sort-btn.active {\n        color: var(--%NS%kit-primary);\n      }\n\n      .kit-sort-btn:focus-visible {\n        outline: 2.5px solid var(--%NS%kit-primary);\n        outline-offset: 2px;\n      }\n\n      .kit-sort-indicator {\n        font-size: 0.68rem;\n        opacity: 0.75;\n      }\n\n      .kit-data-table tbody td {\n        padding: 9px 12px;\n        border-bottom: 1px solid var(--%NS%kit-outline-variant);\n        color: var(--%NS%kit-on-surface);\n        vertical-align: middle;\n      }\n\n      .kit-data-table tbody tr:last-child td {\n        border-bottom: none;\n      }\n\n      .kit-data-table tbody tr:hover td {\n        background: color-mix(in srgb, var(--%NS%kit-primary) 5%, transparent);\n      }\n\n      .kit-data-table-empty {\n        padding: 20px;\n        text-align: center;\n        border-radius: var(--%NS%kit-radius-sm);\n        border: 1px dashed var(--%NS%kit-outline-variant);\n        background: var(--%NS%kit-surface-container-low);\n        color: var(--%NS%kit-on-surface-variant);\n        font-size: 0.86rem;\n      }\n    "], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KitDataTableComponent, [{
        type: Component,
        args: [{ selector: 'kit-data-table', standalone: true, imports: [NgTemplateOutlet], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    @if (rows().length === 0) {
      <div class="kit-data-table-empty" role="status">
        {{ emptyText() }}
      </div>
    } @else {
      <div
        class="kit-data-table-scroll"
        [class.kit-data-table-sticky]="stickyHeader()"
      >
        <table
          class="kit-data-table"
          [attr.data-testid]="tableTestId()"
          [attr.aria-label]="ariaLabel()"
        >
          <thead>
            <tr>
              @for (col of columns(); track col.key) {
                <th
                  scope="col"
                  [style.width]="col.width || null"
                  [class.align-center]="col.align === 'center'"
                  [class.align-right]="col.align === 'right'"
                  [attr.aria-sort]="getAriaSort(col)"
                >
                  @if (col.sortable) {
                    <button
                      type="button"
                      class="kit-sort-btn"
                      [class.active]="sortState()?.key === col.key"
                      (click)="toggleSort(col)"
                    >
                      <span>{{ col.label }}</span>
                      <span class="kit-sort-indicator" aria-hidden="true">
                        {{
                          sortState()?.key === col.key
                            ? sortState()?.direction === 'asc'
                              ? '▲'
                              : '▼'
                            : '↕'
                        }}
                      </span>
                    </button>
                  } @else {
                    <span>{{ col.label }}</span>
                  }
                </th>
              }
            </tr>
          </thead>
          <tbody>
            @for (row of sortedRows(); track trackRow($index, row)) {
              <tr>
                @for (col of columns(); track col.key) {
                  @let val = getCellValue(row, col.key);
                  <td
                    [class.align-center]="col.align === 'center'"
                    [class.align-right]="col.align === 'right'"
                  >
                    @if (cellTemplate(); as tpl) {
                      <ng-container
                        [ngTemplateOutlet]="tpl"
                        [ngTemplateOutletContext]="{
                          $implicit: row,
                          column: col,
                          value: val,
                        }"
                      />
                    } @else {
                      {{ formatCellValue(val) }}
                    }
                  </td>
                }
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  `, styles: ["\n      .kit-data-table-scroll {\n        width: 100%;\n        overflow-x: auto;\n        border-radius: var(--kit-radius-sm);\n        border: 1px solid var(--kit-outline-variant);\n        background: var(--kit-surface-container-low);\n      }\n\n      .kit-data-table {\n        width: 100%;\n        border-collapse: collapse;\n        font-size: 0.84rem;\n      }\n\n      .kit-data-table thead th {\n        padding: 10px 12px;\n        text-align: left;\n        font-size: 0.74rem;\n        font-weight: 700;\n        letter-spacing: 0.04em;\n        text-transform: uppercase;\n        color: var(--kit-on-surface-variant);\n        background: var(--kit-surface-container);\n        border-bottom: 1.5px solid var(--kit-outline-variant);\n        white-space: nowrap;\n      }\n\n      .kit-data-table-sticky thead th {\n        position: sticky;\n        top: 0;\n        z-index: 2;\n      }\n\n      .kit-data-table th.align-center,\n      .kit-data-table td.align-center {\n        text-align: center;\n      }\n\n      .kit-data-table th.align-right,\n      .kit-data-table td.align-right {\n        text-align: right;\n      }\n\n      .kit-sort-btn {\n        display: inline-flex;\n        align-items: center;\n        gap: 5px;\n        border: none;\n        background: transparent;\n        color: inherit;\n        font: inherit;\n        letter-spacing: inherit;\n        text-transform: inherit;\n        padding: 0;\n        cursor: pointer;\n      }\n\n      .kit-sort-btn:hover,\n      .kit-sort-btn.active {\n        color: var(--kit-primary);\n      }\n\n      .kit-sort-btn:focus-visible {\n        outline: 2.5px solid var(--kit-primary);\n        outline-offset: 2px;\n      }\n\n      .kit-sort-indicator {\n        font-size: 0.68rem;\n        opacity: 0.75;\n      }\n\n      .kit-data-table tbody td {\n        padding: 9px 12px;\n        border-bottom: 1px solid var(--kit-outline-variant);\n        color: var(--kit-on-surface);\n        vertical-align: middle;\n      }\n\n      .kit-data-table tbody tr:last-child td {\n        border-bottom: none;\n      }\n\n      .kit-data-table tbody tr:hover td {\n        background: color-mix(in srgb, var(--kit-primary) 5%, transparent);\n      }\n\n      .kit-data-table-empty {\n        padding: 20px;\n        text-align: center;\n        border-radius: var(--kit-radius-sm);\n        border: 1px dashed var(--kit-outline-variant);\n        background: var(--kit-surface-container-low);\n        color: var(--kit-on-surface-variant);\n        font-size: 0.86rem;\n      }\n    "] }]
    }], null, { columns: [{ type: i0.Input, args: [{ isSignal: true, alias: "columns", required: true }] }], rows: [{ type: i0.Input, args: [{ isSignal: true, alias: "rows", required: true }] }], trackByKey: [{ type: i0.Input, args: [{ isSignal: true, alias: "trackByKey", required: false }] }], initialSort: [{ type: i0.Input, args: [{ isSignal: true, alias: "initialSort", required: false }] }], emptyText: [{ type: i0.Input, args: [{ isSignal: true, alias: "emptyText", required: false }] }], tableTestId: [{ type: i0.Input, args: [{ isSignal: true, alias: "tableTestId", required: false }] }], ariaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }], stickyHeader: [{ type: i0.Input, args: [{ isSignal: true, alias: "stickyHeader", required: false }] }], cellTemplate: [{ type: i0.ContentChild, args: ['cellTemplate', { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KitDataTableComponent, { className: "KitDataTableComponent", filePath: "data-table.component.ts", lineNumber: 276 }); })();
