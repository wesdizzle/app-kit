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
