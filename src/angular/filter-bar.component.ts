import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewEncapsulation,
  input,
  linkedSignal,
  model,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconName, KitIconComponent } from './icon.component.js';

export interface KitFilterPill {
  id: string;
  label: string;
  active: boolean;
  title?: string;
  variant?: 'default' | 'deals';
  icon?: IconName;
}

export interface KitFilterViewModeOption {
  value: string;
  icon: 'view-grid' | 'view-list' | IconName;
  title: string;
  ariaLabel: string;
}

export const DEFAULT_KIT_VIEW_MODES: readonly KitFilterViewModeOption[] = [
  {
    value: 'grid',
    icon: 'view-grid',
    title: 'Tile View (Grid)',
    ariaLabel: 'Tile View',
  },
  {
    value: 'compact',
    icon: 'view-list',
    title: 'Compact View (Rows)',
    ariaLabel: 'Compact View',
  },
];

@Component({
  selector: 'kit-filter-bar',
  standalone: true,
  imports: [FormsModule, DatePipe, KitIconComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="kit-filter-bar filter-wrapper animate-expressive animate-stagger-1"
    >
      <div class="filter-bar m3-surface-container mb-lg">
        <!-- Tier 1: Quick Toolbar -->
        <div class="quick-toolbar">
          <!-- Search input -->
          <div class="quick-search-box">
            <span class="search-icon-wrapper" aria-hidden="true">
              <svg
                class="search-svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              class="m3-input quick-search-input"
              [attr.placeholder]="searchPlaceholder()"
              [attr.aria-label]="searchAriaLabel() || null"
              [ngModel]="searchInput()"
              (ngModelChange)="onQuickSearchInput($event)"
              (keydown.enter)="onQuickSearchEnter($event)"
              [attr.id]="searchInputId() || null"
              autocomplete="off"
            />
            @if (searchInput()) {
              <button
                type="button"
                class="clear-search-btn"
                (click)="clearQuickSearch()"
                aria-label="Clear search"
              >
                <kit-icon name="close" [size]="14" />
              </button>
            }
          </div>

          <!-- Segmented Quick Status Pills -->
          @if (quickPills().length > 0) {
            <div
              class="segmented-status-group"
              role="group"
              [attr.aria-label]="quickPillsAriaLabel()"
            >
              @for (pill of quickPills(); track pill.id) {
                <button
                  type="button"
                  class="status-pill-btn state-layer"
                  [class.deals-pill]="pill.variant === 'deals'"
                  [class.active]="pill.active"
                  [attr.title]="pill.title || null"
                  (click)="quickPillClick.emit(pill.id)"
                >
                  @if (pill.icon) {
                    <span class="pill-fire-icon">
                      <kit-icon [name]="pill.icon" [size]="14" />
                    </span>
                  }
                  {{ pill.label }}
                </button>
              }
            </div>
          }

          <ng-content select="[kitFilterPills]" />

          <!-- Optional Quick Sort By Slot -->
          <ng-content select="[kitFilterQuickSort]" />

          <!-- More Filters Toggle Button -->
          <button
            type="button"
            class="m3-button m3-button-outlined more-filters-btn"
            [class.drawer-active]="showDrawer() || activeFilterCount() > 0"
            (click)="showDrawer.set(!showDrawer())"
            id="toggle-more-filters"
            aria-haspopup="true"
            [attr.aria-expanded]="showDrawer()"
          >
            <kit-icon name="tune" [size]="16" />
            <span>Filters</span>
            @if (activeFilterCount() > 0) {
              <span class="filter-count-badge">{{ activeFilterCount() }}</span>
            }
          </button>
        </div>

        <!-- Auxiliary Row: Count & Layout Toggle -->
        <div class="toolbar-auxiliary-row flex items-center justify-between">
          <div class="filter-info flex items-center gap-xs">
            <span class="count-badge">
              {{ resultCount() }} {{ resultCountNoun() }}
            </span>
            @if (lastUpdated()) {
              <span
                class="sync-timestamp"
                [title]="
                  'Last synced with server: ' + (lastUpdated() | date: 'medium')
                "
              >
                • Updated {{ lastUpdated() | date: 'shortTime' }}
              </span>
            }
          </div>

          @if (viewModes().length > 0) {
            <div
              class="view-toggle-group"
              role="group"
              aria-label="View layout"
            >
              @for (vm of viewModes(); track vm.value) {
                <button
                  type="button"
                  class="view-toggle-btn state-layer"
                  [class.active]="viewMode() === vm.value"
                  (click)="onViewModeSelect(vm.value)"
                  [attr.title]="vm.title"
                  [attr.aria-label]="vm.ariaLabel"
                >
                  <kit-icon [name]="vm.icon" [size]="16" />
                </button>
              }
            </div>
          }
        </div>

        <!-- Tier 2: Collapsible Secondary Filter Drawer -->
        <div
          class="secondary-filters-drawer"
          [class.drawer-collapsed]="!showDrawer()"
        >
          <div class="drawer-header flex items-center justify-between">
            <div class="drawer-title flex items-center gap-xs">
              <span class="drawer-heading">Advanced Filters</span>
              @if (activeFilterCount() > 0) {
                <span class="active-tag">{{ activeFilterCount() }} active</span>
              }
            </div>
            <div class="drawer-actions flex items-center gap-sm">
              <button
                type="button"
                class="m3-button m3-button-text reset-filters-btn"
                (click)="onResetClick()"
                [attr.title]="resetTitle()"
              >
                <kit-icon name="refresh" [size]="14" />
                <span>Reset All</span>
              </button>
              <button
                type="button"
                class="drawer-close-btn"
                (click)="showDrawer.set(false)"
                aria-label="Close filters drawer"
              >
                <kit-icon name="close" [size]="16" />
              </button>
            </div>
          </div>

          <div class="secondary-filters-grid">
            <ng-content />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class KitFilterBarComponent implements OnDestroy {
  private searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  readonly search = input<string>('');
  readonly searchPlaceholder = input<string>('Search by title or series...');
  readonly searchInputId = input<string>('filter-name');
  readonly searchAriaLabel = input<string>('');
  readonly searchDebounceMs = input<number>(150);

  readonly quickPills = input<readonly KitFilterPill[]>([]);
  readonly quickPillsAriaLabel = input<string>('Quick ownership filter');

  readonly activeFilterCount = input<number>(0);
  readonly resultCount = input<number>(0);
  readonly resultCountNoun = input<string>('items');
  readonly lastUpdated = input<Date | null>(null);

  readonly viewMode = input<string>('grid');
  readonly viewModes = input<readonly KitFilterViewModeOption[]>(
    DEFAULT_KIT_VIEW_MODES,
  );
  readonly resetTitle = input<string>('Reset all filters back to Owned');

  readonly showDrawer = model<boolean>(false);

  readonly searchChange = output<string>();
  readonly searchCleared = output<void>();
  readonly quickPillClick = output<string>();
  readonly viewModeChange = output<string>();
  readonly resetFilters = output<void>();

  readonly searchInput = linkedSignal(() => this.search());

  ngOnDestroy(): void {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
  }

  onQuickSearchInput(value: string): void {
    this.searchInput.set(value);
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
    const delay = this.searchDebounceMs();
    if (delay <= 0) {
      this.searchChange.emit(value);
      return;
    }
    this.searchDebounceTimer = setTimeout(() => {
      this.searchDebounceTimer = null;
      this.searchChange.emit(value);
    }, delay);
  }

  onQuickSearchEnter(event: Event): void {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
    const target = event.target as HTMLInputElement | null;
    if (target) {
      this.searchInput.set(target.value);
      this.searchChange.emit(target.value);
    }
  }

  clearQuickSearch(): void {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
    this.searchInput.set('');
    this.searchChange.emit('');
    this.searchCleared.emit();
  }

  onViewModeSelect(mode: string): void {
    if (this.viewMode() !== mode) {
      this.viewModeChange.emit(mode);
    }
  }

  onResetClick(): void {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
    this.searchInput.set('');
    this.resetFilters.emit();
  }
}
