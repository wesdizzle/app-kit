import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  ViewEncapsulation,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface KitSelectOption<T = unknown> {
  value: T;
  label: string;
  indent?: boolean;
}

export interface KitSelectGroup<T = unknown> {
  label: string;
  options: readonly KitSelectOption<T>[];
}

let nextDropdownInstanceId = 1;
export const activeKitDropdownId = signal<string | null>(null);

export function closeAllKitDropdowns(): void {
  activeKitDropdownId.set(null);
}

@Component({
  selector: 'kit-select',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (variant() === 'compact-sort') {
      <div class="quick-sort-wrapper">
        <div
          class="input-wrapper dropdown-wrapper"
          [class.active-wrapper]="isOpen()"
        >
          <button
            type="button"
            class="m3-input dropdown-trigger quick-sort-trigger"
            [class.open]="isOpen()"
            [disabled]="disabled()"
            (click)="toggle($event)"
            [attr.id]="triggerId() || null"
            aria-haspopup="listbox"
            [attr.aria-expanded]="isOpen()"
          >
            <span class="sort-icon-prefix" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 6h18M6 12h12M10 18h4" />
              </svg>
            </span>
            <span class="trigger-text">{{ selectedLabel() }}</span>
            <span class="dropdown-icon-wrapper" aria-hidden="true">
              <svg
                class="dropdown-chevron"
                [class.open]="isOpen()"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path
                  d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                />
              </svg>
            </span>
          </button>

          @if (isOpen()) {
            <div class="dropdown-list animate-expressive" role="listbox">
              @for (opt of options(); track opt.value) {
                <button
                  type="button"
                  class="dropdown-item state-layer"
                  [class.selected]="isSelected(opt.value)"
                  (click)="select(opt.value)"
                  role="option"
                  [attr.aria-selected]="isSelected(opt.value)"
                >
                  <span class="item-label">{{ opt.label }}</span>
                  @if (isSelected(opt.value)) {
                    <svg
                      class="selected-check"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path
                        d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                      />
                    </svg>
                  }
                </button>
              }
            </div>
          }
        </div>
      </div>
    } @else {
      <div class="filter-group">
        @if (label()) {
          <div class="filter-group-header">
            <label
              class="m3-label"
              [attr.for]="triggerId() || null"
              [attr.title]="labelTitle() || null"
              >{{ label() }}</label
            >
          </div>
        }
        <div
          class="input-wrapper dropdown-wrapper"
          [class.active-wrapper]="isOpen()"
        >
          <button
            type="button"
            class="m3-input dropdown-trigger"
            [class.open]="isOpen()"
            [disabled]="disabled()"
            (click)="toggle($event)"
            [attr.id]="triggerId() || null"
            aria-haspopup="listbox"
            [attr.aria-expanded]="isOpen()"
          >
            <span class="trigger-text">{{ selectedLabel() }}</span>
            <span class="dropdown-icon-wrapper" aria-hidden="true">
              <svg
                class="dropdown-chevron"
                [class.open]="isOpen()"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path
                  d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                />
              </svg>
            </span>
          </button>

          @if (isOpen()) {
            <div class="dropdown-list animate-expressive" role="listbox">
              @if (allOption(); as allOpt) {
                <button
                  type="button"
                  class="dropdown-item state-layer"
                  [class.selected]="isSelected(allOpt.value)"
                  (click)="select(allOpt.value)"
                  role="option"
                  [attr.aria-selected]="isSelected(allOpt.value)"
                >
                  <span class="item-label">{{ allOpt.label }}</span>
                  @if (isSelected(allOpt.value)) {
                    <svg
                      class="selected-check"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path
                        d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                      />
                    </svg>
                  }
                </button>
              }

              @for (opt of options(); track opt.value) {
                <button
                  type="button"
                  class="dropdown-item state-layer"
                  [class.child-platform]="!!opt.indent"
                  [class.selected]="isSelected(opt.value)"
                  (click)="select(opt.value)"
                  role="option"
                  [attr.aria-selected]="isSelected(opt.value)"
                >
                  <span class="item-label">
                    @if (opt.indent) {
                      <span class="sub-platform-arrow">↳</span>
                    }
                    {{ opt.label }}
                  </span>
                  @if (isSelected(opt.value)) {
                    <svg
                      class="selected-check"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path
                        d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                      />
                    </svg>
                  }
                </button>
              }

              @for (group of groups(); track group.label) {
                <div class="dropdown-group-header">
                  {{ group.label }}
                </div>
                @for (opt of group.options; track opt.value) {
                  <button
                    type="button"
                    class="dropdown-item state-layer"
                    [class.child-platform]="!!opt.indent"
                    [class.selected]="isSelected(opt.value)"
                    (click)="select(opt.value)"
                    role="option"
                    [attr.aria-selected]="isSelected(opt.value)"
                  >
                    <span class="item-label">
                      @if (opt.indent) {
                        <span class="sub-platform-arrow">↳</span>
                      }
                      {{ opt.label }}
                    </span>
                    @if (isSelected(opt.value)) {
                      <svg
                        class="selected-check"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path
                          d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                        />
                      </svg>
                    }
                  </button>
                }
              }
            </div>
          }
        </div>
      </div>
    }
  `,
})
export class KitSelectComponent {
  private readonly fallbackId = `kit-select-${nextDropdownInstanceId++}`;

  readonly label = input<string>('');
  readonly labelTitle = input<string>('');
  readonly triggerId = input<string>('');
  readonly dropdownName = input<string>('');
  readonly value = input<unknown>(undefined);
  readonly options = input<readonly KitSelectOption[]>([]);
  readonly groups = input<readonly KitSelectGroup[]>([]);
  readonly allOption = input<KitSelectOption | null>(null);
  readonly placeholder = input<string>('All');
  readonly variant = input<'default' | 'compact-sort'>('default');
  readonly disabled = input<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly valueChange = output<any>();

  readonly dropdownKey = computed(
    () => this.dropdownName() || this.triggerId() || this.fallbackId,
  );

  readonly isOpen = computed(
    () => activeKitDropdownId() === this.dropdownKey(),
  );

  readonly selectedLabel = computed<string>(() => {
    const val = this.value();
    const allOpt = this.allOption();
    if (allOpt && this.isSelected(allOpt.value)) {
      return allOpt.label;
    }
    for (const opt of this.options()) {
      if (this.isSelected(opt.value)) {
        return opt.label;
      }
    }
    for (const group of this.groups()) {
      for (const opt of group.options) {
        if (this.isSelected(opt.value)) {
          return opt.label;
        }
      }
    }
    if (allOpt && (val === undefined || val === null || val === '')) {
      return allOpt.label;
    }
    return this.placeholder();
  });

  isSelected(optionValue: unknown): boolean {
    const current = this.value();
    if (current === optionValue) return true;
    const allOpt = this.allOption();
    if (
      allOpt &&
      optionValue === allOpt.value &&
      (current === undefined || current === null || current === '')
    ) {
      return true;
    }
    return false;
  }

  toggle(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.disabled()) return;
    const key = this.dropdownKey();
    activeKitDropdownId.update((cur) => (cur === key ? null : key));
  }

  close(): void {
    if (activeKitDropdownId() === this.dropdownKey()) {
      activeKitDropdownId.set(null);
    }
  }

  select(val: unknown): void {
    this.valueChange.emit(val);
    this.close();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) return;
    const target = event.target as HTMLElement | null;
    if (
      !target ||
      (!target.closest('.dropdown-wrapper') &&
        !target.closest('.combobox-wrapper'))
    ) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen()) {
      this.close();
    }
  }
}

@Component({
  selector: 'kit-combobox',
  standalone: true,
  imports: [FormsModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="filter-group">
      <div
        class="filter-group-header"
        [class.flex]="showExactToggle()"
        [class.justify-between]="showExactToggle()"
        [class.items-center]="showExactToggle()"
        [class.pr-xs]="showExactToggle()"
      >
        <label class="m3-label" [attr.for]="inputId() || null">{{
          label()
        }}</label>
        @if (showExactToggle()) {
          <label class="m3-checkbox-label" [attr.title]="exactTitle()">
            <input
              type="checkbox"
              [ngModel]="exact()"
              (ngModelChange)="exactChange.emit(!!$event)"
              class="m3-checkbox"
            />
            <span>Exact</span>
          </label>
        }
      </div>
      <div
        class="input-wrapper combobox-wrapper"
        [class.active-wrapper]="isOpen()"
      >
        <input
          type="text"
          [ngModel]="value()"
          (ngModelChange)="onTextInput($event)"
          (focus)="open()"
          class="m3-input list-input"
          [class.open]="isOpen()"
          [attr.placeholder]="placeholder()"
          [attr.id]="inputId() || null"
          autocomplete="off"
        />
        <button
          type="button"
          class="combobox-chevron-btn"
          (click)="toggle($event)"
          tabindex="-1"
          [attr.aria-label]="toggleAriaLabel()"
        >
          <span class="dropdown-icon-wrapper" aria-hidden="true">
            <svg
              class="dropdown-chevron"
              [class.open]="isOpen()"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path
                d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
              />
            </svg>
          </span>
        </button>

        @if (isOpen()) {
          <div class="dropdown-list animate-expressive" role="listbox">
            <button
              type="button"
              class="dropdown-item state-layer"
              [class.selected]="!value()"
              (click)="selectSuggestion('')"
              role="option"
              [attr.aria-selected]="!value()"
            >
              <span class="item-label">{{ allOptionLabel() }}</span>
              @if (!value()) {
                <svg
                  class="selected-check"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path
                    d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                  />
                </svg>
              }
            </button>
            @for (item of filteredSuggestions(); track item) {
              <button
                type="button"
                class="dropdown-item state-layer"
                [class.selected]="value() === item"
                (click)="selectSuggestion(item)"
                role="option"
                [attr.aria-selected]="value() === item"
              >
                <span class="item-label">{{ item }}</span>
                @if (value() === item) {
                  <svg
                    class="selected-check"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path
                      d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                    />
                  </svg>
                }
              </button>
            }
            @if (filteredSuggestions().length === 0 && value()) {
              <div class="dropdown-empty">
                {{ emptyMessagePrefix() }} "{{ value() }}"
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class KitComboboxComponent implements OnDestroy {
  private readonly fallbackId = `kit-combobox-${nextDropdownInstanceId++}`;
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  readonly label = input<string>('');
  readonly inputId = input<string>('');
  readonly dropdownName = input<string>('');
  readonly value = input<string>('');
  readonly suggestions = input<readonly string[]>([]);
  readonly placeholder = input<string>('All');
  readonly allOptionLabel = input<string>('All');
  readonly emptyMessagePrefix = input<string>('No matches for');
  readonly toggleAriaLabel = input<string>('Toggle suggestions');
  readonly showExactToggle = input<boolean>(false);
  readonly exact = input<boolean>(false);
  readonly exactTitle = input<string>('Exact Normalized Match');
  readonly debounceMs = input<number>(150);
  readonly maxSuggestions = input<number>(100);

  readonly valueChange = output<string>();
  readonly exactChange = output<boolean>();

  readonly dropdownKey = computed(
    () => this.dropdownName() || this.inputId() || this.fallbackId,
  );

  readonly isOpen = computed(
    () => activeKitDropdownId() === this.dropdownKey(),
  );

  readonly filteredSuggestions = computed<string[]>(() => {
    const query = (this.value() || '').trim().toLowerCase();
    const list = this.suggestions() || [];
    const limit = this.maxSuggestions();
    if (!query) {
      return list.slice(0, limit);
    }
    return list
      .filter((item) => item.toLowerCase().includes(query))
      .slice(0, limit);
  });

  ngOnDestroy(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
  }

  open(): void {
    activeKitDropdownId.set(this.dropdownKey());
  }

  toggle(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    const key = this.dropdownKey();
    activeKitDropdownId.update((cur) => (cur === key ? null : key));
  }

  close(): void {
    if (activeKitDropdownId() === this.dropdownKey()) {
      activeKitDropdownId.set(null);
    }
  }

  onTextInput(val: string): void {
    this.open();
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    const delay = this.debounceMs();
    if (delay <= 0) {
      this.valueChange.emit(val);
      return;
    }
    this.debounceTimer = setTimeout(() => {
      this.debounceTimer = null;
      this.valueChange.emit(val);
    }, delay);
  }

  selectSuggestion(item: string): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    this.valueChange.emit(item);
    this.close();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) return;
    const target = event.target as HTMLElement | null;
    if (
      !target ||
      (!target.closest('.dropdown-wrapper') &&
        !target.closest('.combobox-wrapper'))
    ) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen()) {
      this.close();
    }
  }
}

@Component({
  selector: 'kit-multiselect',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="filter-group" [class]="containerClass()">
      @if (label()) {
        <div class="filter-group-header">
          <label class="m3-label" [attr.for]="triggerId() || null">{{
            label()
          }}</label>
        </div>
      }
      <div
        class="input-wrapper dropdown-wrapper"
        [class.active-wrapper]="isOpen()"
      >
        <button
          type="button"
          class="m3-input dropdown-trigger"
          [class.open]="isOpen()"
          (click)="toggle($event)"
          [attr.id]="triggerId() || null"
          aria-haspopup="listbox"
          [attr.aria-expanded]="isOpen()"
        >
          <span class="trigger-text">{{ summaryLabel() }}</span>
          <span class="dropdown-icon-wrapper" aria-hidden="true">
            <svg
              class="dropdown-chevron"
              [class.open]="isOpen()"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path
                d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
              />
            </svg>
          </span>
        </button>

        @if (isOpen()) {
          <div class="dropdown-list animate-expressive" role="listbox">
            <button
              type="button"
              class="dropdown-clear-btn state-layer"
              (click)="clearAll()"
              [disabled]="selected().length === 0"
            >
              {{ clearLabel() }}
            </button>
            @for (item of options(); track item) {
              <label class="dropdown-item state-layer checkbox-item">
                <input
                  type="checkbox"
                  [checked]="isSelected(item)"
                  (change)="toggleItem(item)"
                  class="m3-checkbox"
                />
                <span class="item-label">{{ item }}</span>
              </label>
            }
            @if (options().length === 0) {
              <div class="dropdown-empty">{{ emptyLabel() }}</div>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class KitMultiSelectComponent {
  private readonly fallbackId = `kit-multiselect-${nextDropdownInstanceId++}`;

  readonly label = input<string>('');
  readonly triggerId = input<string>('');
  readonly dropdownName = input<string>('');
  readonly selected = input<readonly string[]>([]);
  readonly options = input<readonly string[]>([]);
  readonly allLabel = input<string>('All Regions');
  readonly clearLabel = input<string>('Clear Selection');
  readonly emptyLabel = input<string>('No regions found');
  readonly containerClass = input<string>('');

  readonly selectedChange = output<string[]>();

  readonly dropdownKey = computed(
    () => this.dropdownName() || this.triggerId() || this.fallbackId,
  );

  readonly isOpen = computed(
    () => activeKitDropdownId() === this.dropdownKey(),
  );

  readonly summaryLabel = computed<string>(() => {
    const sel = this.selected() || [];
    if (sel.length === 0) return this.allLabel();
    if (sel.length <= 2) return sel.join(', ');
    return `${sel.length} Selected`;
  });

  isSelected(item: string): boolean {
    return (this.selected() || []).includes(item);
  }

  toggle(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    const key = this.dropdownKey();
    activeKitDropdownId.update((cur) => (cur === key ? null : key));
  }

  close(): void {
    if (activeKitDropdownId() === this.dropdownKey()) {
      activeKitDropdownId.set(null);
    }
  }

  clearAll(): void {
    this.selectedChange.emit([]);
  }

  toggleItem(item: string): void {
    const current = this.selected() || [];
    const next = current.includes(item)
      ? current.filter((x) => x !== item)
      : [...current, item];
    this.selectedChange.emit(next);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) return;
    const target = event.target as HTMLElement | null;
    if (
      !target ||
      (!target.closest('.dropdown-wrapper') &&
        !target.closest('.combobox-wrapper'))
    ) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen()) {
      this.close();
    }
  }
}
