import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  computed,
  contentChild,
  input,
  signal,
} from '@angular/core';

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

function readRowField<T>(row: T, key: string): unknown {
  if (row && typeof row === 'object') {
    return (row as Record<string, unknown>)[key];
  }
  return undefined;
}

export function sortKitTableRows<T>(
  rows: readonly T[],
  columns: readonly KitTableColumn<T>[],
  sort: KitTableSortState,
): readonly T[] {
  if (!sort) return rows;
  const col = columns.find((c) => c.key === sort.key);
  if (!col) return rows;

  const dir = sort.direction === 'asc' ? 1 : -1;
  const getVal = (row: T): string | number | null | undefined => {
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
    if (aEmpty && bEmpty) return 0;
    if (aEmpty) return 1;
    if (bEmpty) return -1;

    if (typeof va === 'number' && typeof vb === 'number') {
      return (va - vb) * dir;
    }
    return (
      String(va).localeCompare(String(vb), undefined, {
        numeric: true,
        sensitivity: 'base',
      }) * dir
    );
  });
}

/**
 * Responsive sticky-header sortable table with optional custom `#cellTemplate` projection
 * and clean empty state.
 */
@Component({
  selector: 'kit-data-table',
  standalone: true,
  imports: [NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
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
  `,
})
export class KitDataTableComponent<T = Record<string, unknown>> {
  readonly columns = input.required<readonly KitTableColumn<T>[]>();
  readonly rows = input.required<readonly T[]>();
  readonly trackByKey = input<string | null>(null);
  readonly initialSort = input<KitTableSortState>(null);
  readonly emptyText = input<string>('No records available.');
  readonly tableTestId = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);
  readonly stickyHeader = input<boolean>(true);

  readonly cellTemplate =
    contentChild<TemplateRef<KitTableCellContext<T>>>('cellTemplate');

  private readonly sortOverride = signal<{
    base: KitTableSortState;
    value: KitTableSortState;
  } | null>(null);

  readonly sortState = computed<KitTableSortState>(() => {
    const base = this.initialSort();
    const override = this.sortOverride();
    if (override && override.base === base) {
      return override.value;
    }
    return base;
  });

  readonly sortedRows = computed<readonly T[]>(() => {
    return sortKitTableRows(this.rows(), this.columns(), this.sortState());
  });

  toggleSort(col: KitTableColumn<T>): void {
    if (!col.sortable) return;
    const current = this.sortState();
    const nextDir: 'asc' | 'desc' =
      current?.key === col.key && current.direction === 'asc' ? 'desc' : 'asc';
    this.sortOverride.set({
      base: this.initialSort(),
      value: { key: col.key, direction: nextDir },
    });
  }

  getAriaSort(col: KitTableColumn<T>): string | null {
    if (!col.sortable) return null;
    const current = this.sortState();
    if (current?.key !== col.key) return 'none';
    return current.direction === 'asc' ? 'ascending' : 'descending';
  }

  getCellValue(row: T, key: string): unknown {
    return readRowField(row, key);
  }

  formatCellValue(value: unknown): string {
    if (value === null || value === undefined || value === '') return '—';
    return String(value);
  }

  trackRow(index: number, row: T): unknown {
    const key = this.trackByKey();
    if (key) {
      const val = readRowField(row, key);
      if (val !== null && val !== undefined && val !== '') {
        return val;
      }
    }
    return index;
  }
}
