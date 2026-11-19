import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';

export type KitStatBarTone =
  | 'low'
  | 'mid'
  | 'good'
  | 'high'
  | 'peak'
  | 'primary'
  | 'warning'
  | 'success'
  | 'danger';

export interface KitStatBarItem {
  id: string;
  label: string;
  value: number;
  max?: number;
  displayValue?: string;
  secondaryText?: string | null;
  tone?: KitStatBarTone;
}

export function computeKitStatPct(value: number, max: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(max) || max <= 0) {
    return 0;
  }
  return Math.max(0, Math.min(100, (value / max) * 100));
}

export function resolveKitStatTone(
  value: number,
  max: number,
  explicit?: KitStatBarTone,
): KitStatBarTone {
  if (explicit) return explicit;
  const ratio = max > 0 && Number.isFinite(value) ? value / max : 0;
  if (ratio < 0.24) return 'low';
  if (ratio < 0.36) return 'mid';
  if (ratio < 0.48) return 'good';
  if (ratio < 0.62) return 'high';
  return 'peak';
}

/**
 * Labeled horizontal metric bar list with automatic ratio-based semantic tiers,
 * optional secondary ranges, and an optional summary footer row.
 */
@Component({
  selector: 'kit-stat-bar-list',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .kit-stat-bar-list {
        display: flex;
        flex-direction: column;
        gap: 11px;
      }

      .kit-stat-bar-list.kit-stat-bar-compact {
        gap: 8px;
      }

      .kit-stat-row {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .kit-stat-header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 10px;
        font-size: 0.84rem;
      }

      .kit-stat-label {
        font-weight: 600;
        color: var(--kit-on-surface);
      }

      .kit-stat-values {
        display: inline-flex;
        align-items: baseline;
        gap: 8px;
        font-variant-numeric: tabular-nums;
      }

      .kit-stat-val {
        font-family: var(--kit-font-mono);
        font-size: 0.85rem;
        font-weight: 700;
        color: var(--kit-on-surface);
      }

      .kit-stat-secondary {
        font-family: var(--kit-font-mono);
        font-size: 0.75rem;
        color: var(--kit-on-surface-variant);
      }

      .kit-stat-track {
        height: 9px;
        border-radius: var(--kit-radius-full);
        background: var(--kit-surface-container-low);
        border: 1px solid var(--kit-outline-variant);
        overflow: hidden;
      }

      .kit-stat-bar-compact .kit-stat-track {
        height: 7px;
      }

      .kit-stat-fill {
        height: 100%;
        border-radius: var(--kit-radius-full);
        background: var(--kit-primary);
        transition: width var(--kit-duration-medium) var(--kit-ease-smooth);
      }

      .kit-stat-fill[data-tone='low'],
      .kit-stat-fill[data-tone='danger'] {
        background: var(--kit-danger);
      }
      .kit-stat-fill[data-tone='mid'],
      .kit-stat-fill[data-tone='warning'] {
        background: var(--kit-warning);
      }
      .kit-stat-fill[data-tone='good'],
      .kit-stat-fill[data-tone='success'] {
        background: var(--kit-success);
      }
      .kit-stat-fill[data-tone='high'] {
        background: #06b6d4;
      }
      .kit-stat-fill[data-tone='peak'] {
        background: #8b5cf6;
      }
      .kit-stat-fill[data-tone='primary'] {
        background: var(--kit-primary);
      }

      .kit-stat-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 8px;
        margin-top: 2px;
        border-top: 1px solid var(--kit-outline-variant);
        font-size: 0.86rem;
      }

      .kit-stat-footer-label {
        font-weight: 700;
        color: var(--kit-on-surface-variant);
      }

      .kit-stat-footer-val {
        font-family: var(--kit-font-mono);
        font-size: 0.96rem;
        font-weight: 800;
        color: var(--kit-on-surface);
      }

      @media (prefers-reduced-motion: reduce) {
        .kit-stat-fill {
          transition: none;
        }
      }
    `,
  ],
  template: `
    <div
      class="kit-stat-bar-list"
      [class.kit-stat-bar-compact]="compact()"
      role="list"
      [attr.aria-label]="ariaLabel()"
    >
      @for (item of items(); track item.id) {
        @let itemMax = item.max ?? defaultMax();
        @let pct = computePct(item.value, itemMax);
        @let tone = resolveTone(item.value, itemMax, item.tone);
        <div class="kit-stat-row" role="listitem">
          <div class="kit-stat-header">
            <span class="kit-stat-label">{{ item.label }}</span>
            <div class="kit-stat-values">
              <strong class="kit-stat-val">{{
                item.displayValue ?? item.value
              }}</strong>
              @if (item.secondaryText) {
                <span class="kit-stat-secondary">{{ item.secondaryText }}</span>
              }
            </div>
          </div>
          <div
            class="kit-stat-track"
            role="progressbar"
            aria-valuemin="0"
            [attr.aria-valuemax]="itemMax"
            [attr.aria-valuenow]="item.value"
            [attr.aria-label]="
              item.label + ': ' + (item.displayValue ?? item.value)
            "
          >
            <div
              class="kit-stat-fill"
              [attr.data-tone]="tone"
              [style.width.%]="pct"
            ></div>
          </div>
        </div>
      }

      @if (
        totalLabel() && totalValue() !== null && totalValue() !== undefined
      ) {
        <div class="kit-stat-footer">
          <span class="kit-stat-footer-label">{{ totalLabel() }}</span>
          <strong class="kit-stat-footer-val">{{ totalValue() }}</strong>
        </div>
      }
    </div>
  `,
})
export class KitStatBarListComponent {
  readonly items = input.required<readonly KitStatBarItem[]>();
  readonly defaultMax = input<number>(255);
  readonly totalLabel = input<string | null>(null);
  readonly totalValue = input<string | number | null>(null);
  readonly ariaLabel = input<string>('Statistics');
  readonly compact = input<boolean>(false);

  computePct(value: number, max: number): number {
    return computeKitStatPct(value, max);
  }

  resolveTone(
    value: number,
    max: number,
    explicit?: KitStatBarTone,
  ): KitStatBarTone {
    return resolveKitStatTone(value, max, explicit);
  }
}
