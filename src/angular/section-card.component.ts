import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { IconName, KitIconComponent } from './icon.component.js';

export interface KitKvItem {
  label: string;
  value: string;
  hint?: string | null;
  mono?: boolean;
  tone?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger';
}

/**
 * Standardized Material 3 Expressive content card with optional icon,
 * subtitle, header action slot (`[cardActions]`), and collapsible toggle.
 */
@Component({
  selector: 'kit-section-card',
  standalone: true,
  imports: [KitIconComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .kit-section-card {
        background: var(--kit-surface-container);
        border: 1.5px solid var(--kit-outline-variant);
        border-radius: var(--kit-radius-lg);
        padding: 20px;
        min-width: 0;
      }

      .kit-section-card.kit-section-card-compact {
        padding: 16px;
      }

      .kit-section-card-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 16px;
      }

      .kit-section-card-collapsed .kit-section-card-header {
        margin-bottom: 0;
      }

      .kit-section-card-titles {
        min-width: 0;
        flex: 1 1 200px;
      }

      .kit-section-card-title {
        margin: 0;
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: var(--kit-font-heading);
        font-size: 1.05rem;
        font-weight: 800;
        color: var(--kit-on-surface);
        line-height: 1.3;
      }

      .kit-section-card-subtitle {
        margin: 4px 0 0;
        font-size: 0.82rem;
        color: var(--kit-on-surface-variant);
        line-height: 1.4;
      }

      .kit-section-card-actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
      }

      .kit-section-collapse-btn {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 11px;
        border-radius: var(--kit-radius-full);
        border: 1px solid var(--kit-outline-variant);
        background: var(--kit-surface-container-low);
        color: var(--kit-on-surface);
        font-family: var(--kit-font-sans);
        font-size: 0.78rem;
        font-weight: 600;
        cursor: pointer;
      }

      .kit-section-collapse-btn:hover {
        border-color: var(--kit-primary);
        color: var(--kit-primary);
      }

      .kit-section-collapse-btn:focus-visible {
        outline: 2.5px solid var(--kit-primary);
        outline-offset: 2px;
      }
    `,
  ],
  template: `
    <section
      class="kit-section-card"
      [class.kit-section-card-compact]="compact()"
      [class.kit-section-card-collapsed]="collapsible() && !isExpanded()"
      [attr.data-testid]="testId()"
    >
      <header class="kit-section-card-header">
        <div class="kit-section-card-titles">
          <h2 class="kit-section-card-title">
            @if (icon(); as iconName) {
              <kit-icon [name]="iconName" [size]="18" />
            }
            <span>{{ title() }}</span>
          </h2>
          @if (subtitle()) {
            <p class="kit-section-card-subtitle">{{ subtitle() }}</p>
          }
        </div>

        <div class="kit-section-card-actions">
          <ng-content select="[cardActions]" />
          @if (collapsible()) {
            <button
              type="button"
              class="kit-section-collapse-btn state-layer"
              [attr.aria-expanded]="isExpanded()"
              [attr.data-testid]="toggleTestId()"
              (click)="toggleExpanded()"
            >
              <span>{{ isExpanded() ? collapseLabel() : expandLabel() }}</span>
              <kit-icon
                [name]="isExpanded() ? 'chevron-up' : 'chevron-down'"
                [size]="15"
              />
            </button>
          }
        </div>
      </header>

      @if (!collapsible() || isExpanded()) {
        <div class="kit-section-card-body">
          <ng-content />
        </div>
      }
    </section>
  `,
})
export class KitSectionCardComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string | null>(null);
  readonly icon = input<IconName | null>(null);
  readonly collapsible = input<boolean>(false);
  readonly expanded = input<boolean>(true);
  readonly collapseLabel = input<string>('Collapse');
  readonly expandLabel = input<string>('Expand');
  readonly toggleTestId = input<string | null>(null);
  readonly testId = input<string | null>(null);
  readonly compact = input<boolean>(false);

  readonly expandedChange = output<boolean>();

  private readonly toggledState = signal<{
    base: boolean;
    value: boolean;
  } | null>(null);

  readonly isExpanded = computed<boolean>(() => {
    const base = this.expanded();
    const toggled = this.toggledState();
    return toggled && toggled.base === base ? toggled.value : base;
  });

  toggleExpanded(): void {
    if (!this.collapsible()) return;
    const next = !this.isExpanded();
    this.toggledState.set({ base: this.expanded(), value: next });
    this.expandedChange.emit(next);
  }
}

/**
 * Responsive semantic definition grid (`<dl>`) for key-value metadata rows.
 */
@Component({
  selector: 'kit-kv-grid',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .kit-kv-grid {
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 12px;
      }

      .kit-kv-grid.kit-kv-compact {
        grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
        gap: 8px;
      }

      .kit-kv-grid.kit-kv-list {
        grid-template-columns: minmax(0, 1fr);
        gap: 8px;
      }

      .kit-kv-grid.kit-kv-list .kit-kv-item {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
        padding: 8px 12px;
      }

      .kit-kv-item {
        padding: 10px 12px;
        border-radius: var(--kit-radius-sm);
        border: 1px solid var(--kit-outline-variant);
        background: var(--kit-surface-container-low);
        min-width: 0;
      }

      .kit-kv-label {
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--kit-on-surface-variant);
      }

      .kit-kv-value {
        margin: 4px 0 0;
        font-size: 0.92rem;
        font-weight: 700;
        color: var(--kit-on-surface);
        word-break: break-word;
      }

      .kit-kv-list .kit-kv-value {
        margin: 0;
        text-align: right;
      }

      .kit-kv-value.kit-kv-mono {
        font-family: var(--kit-font-mono);
        font-variant-numeric: tabular-nums;
      }

      .kit-kv-value[data-tone='muted'] {
        color: var(--kit-on-surface-variant);
        font-weight: 500;
      }
      .kit-kv-value[data-tone='primary'] {
        color: var(--kit-primary);
      }
      .kit-kv-value[data-tone='success'] {
        color: var(--kit-success);
      }
      .kit-kv-value[data-tone='warning'] {
        color: var(--kit-warning);
      }
      .kit-kv-value[data-tone='danger'] {
        color: var(--kit-danger);
      }

      .kit-kv-hint {
        margin: 2px 0 0;
        font-size: 0.74rem;
        color: var(--kit-on-surface-variant);
      }
    `,
  ],
  template: `
    <dl
      class="kit-kv-grid"
      [class.kit-kv-compact]="density() === 'compact'"
      [class.kit-kv-list]="layout() === 'list'"
    >
      @for (item of items(); track item.label) {
        <div class="kit-kv-item">
          <dt class="kit-kv-label">{{ item.label }}</dt>
          <dd
            class="kit-kv-value"
            [class.kit-kv-mono]="item.mono ?? false"
            [attr.data-tone]="item.tone || 'default'"
          >
            {{ item.value }}
          </dd>
          @if (item.hint) {
            <dd class="kit-kv-hint">{{ item.hint }}</dd>
          }
        </div>
      }
    </dl>
  `,
})
export class KitKvGridComponent {
  readonly items = input.required<readonly KitKvItem[]>();
  readonly density = input<'comfortable' | 'compact'>('comfortable');
  readonly layout = input<'grid' | 'list'>('grid');
}
