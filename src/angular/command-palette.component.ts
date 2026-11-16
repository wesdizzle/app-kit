import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { BottomSheetDragController } from './bottom-sheet-drag.js';
import { canAnimateKitDialogExit } from './dialog-sheet.component.js';
import { IconName, KitIconComponent } from './icon.component.js';

export interface KitCommandPaletteToken {
  text: string;
  match: boolean;
}

export interface KitCommandPaletteItem {
  id: string;
  title: string;
  subtitle?: string;
  tag?: string;
  category: string;
  icon?: IconName;
  glyph?: string;
  badge?: string;
  badgeTone?: 'default' | 'success' | 'info' | 'warning' | 'danger';
  keywords?: string[];
  removable?: boolean;
  action?: () => void;
}

export interface KitCommandPaletteGroup {
  category: string;
  items: KitCommandPaletteItem[];
}

export interface KitCommandPaletteGroupEntry {
  item: KitCommandPaletteItem;
  flatIndex: number;
}

export interface KitCommandPaletteRenderedGroup {
  category: string;
  entries: KitCommandPaletteGroupEntry[];
}

export function tokenizeKitCommandQuery(
  text: string,
  query: string,
): KitCommandPaletteToken[] {
  if (!text) return [];
  const rawQuery = (query || '').trim().toLowerCase();
  if (!rawQuery) {
    return [{ text, match: false }];
  }

  const terms = rawQuery.split(/\s+/).filter(Boolean);
  if (terms.length === 0) {
    return [{ text, match: false }];
  }

  const lower = text.toLowerCase();
  const intervals: Array<[number, number]> = [];

  for (const term of terms) {
    let pos = 0;
    while (pos < lower.length) {
      const idx = lower.indexOf(term, pos);
      if (idx === -1) break;
      intervals.push([idx, idx + term.length]);
      pos = idx + Math.max(1, term.length);
    }
  }

  if (intervals.length === 0) {
    return [{ text, match: false }];
  }

  intervals.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

  const merged: Array<[number, number]> = [];
  let cur: [number, number] = [intervals[0][0], intervals[0][1]];
  for (let i = 1; i < intervals.length; i++) {
    const next = intervals[i];
    if (next[0] <= cur[1]) {
      cur[1] = Math.max(cur[1], next[1]);
    } else {
      merged.push(cur);
      cur = [next[0], next[1]];
    }
  }
  merged.push(cur);

  const tokens: KitCommandPaletteToken[] = [];
  let lastIndex = 0;
  for (const [start, end] of merged) {
    if (start > lastIndex) {
      tokens.push({ text: text.slice(lastIndex, start), match: false });
    }
    tokens.push({ text: text.slice(start, end), match: true });
    lastIndex = end;
  }
  if (lastIndex < text.length) {
    tokens.push({ text: text.slice(lastIndex), match: false });
  }

  return tokens;
}

export function matchesKitCommandTokens(text: string, query: string): boolean {
  const raw = (query || '').trim().toLowerCase();
  if (!raw) return true;
  const terms = raw.split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const target = (text || '').toLowerCase();
  return terms.every((term) => target.includes(term));
}

export function filterAndGroupKitCommands(
  items: readonly KitCommandPaletteItem[],
  query: string,
  options?: {
    categoryOrder?: readonly string[];
    filterLocally?: boolean;
  },
): {
  groups: KitCommandPaletteRenderedGroup[];
  flatItems: KitCommandPaletteItem[];
} {
  const filterLocally = options?.filterLocally ?? true;
  const trimmedQuery = (query || '').trim();
  const filtered =
    filterLocally && trimmedQuery.length > 0
      ? items.filter((item) => {
          const haystack = [
            item.title,
            item.subtitle ?? '',
            item.tag ?? '',
            item.category,
            ...(item.keywords ?? []),
          ].join(' ');
          return matchesKitCommandTokens(haystack, trimmedQuery);
        })
      : [...items];

  const buckets = new Map<string, KitCommandPaletteItem[]>();
  for (const cat of options?.categoryOrder ?? []) {
    buckets.set(cat, []);
  }
  for (const item of filtered) {
    let bucket = buckets.get(item.category);
    if (!bucket) {
      bucket = [];
      buckets.set(item.category, bucket);
    }
    bucket.push(item);
  }

  const groups: KitCommandPaletteRenderedGroup[] = [];
  const flatItems: KitCommandPaletteItem[] = [];
  let flatIndex = 0;

  for (const [category, bucket] of buckets.entries()) {
    if (bucket.length === 0) continue;
    const entries: KitCommandPaletteGroupEntry[] = bucket.map((item) => {
      flatItems.push(item);
      return { item, flatIndex: flatIndex++ };
    });
    groups.push({ category, entries });
  }

  return { groups, flatItems };
}

let nextPaletteInstanceId = 0;

@Component({
  selector: 'kit-command-palette',
  standalone: true,
  imports: [KitIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog
      #dialogEl
      class="kit-command-palette m3-surface-container-high"
      [class.dragging]="isDraggingSheet() || externalDragging()"
      [class.slide-up-enter]="isEntering()"
      [class.closing]="isClosing()"
      [style.transform]="
        !isClosing() && effectiveTransformY() !== 0
          ? 'translateY(' + effectiveTransformY() + 'px)'
          : null
      "
      (click)="onDialogClick($event)"
      (cancel)="onDialogCancel($event)"
      [attr.aria-label]="ariaLabel() || title()"
    >
      <div
        class="kit-palette-drag-area sheet-drag-area"
        (touchstart)="onDragHandleTouchStart($event)"
        (touchmove)="onDragHandleTouchMove($event)"
        (touchend)="onDragHandleTouchEnd()"
        (touchcancel)="onDragHandleTouchCancel()"
      >
        <div class="kit-palette-drag-handle-bar">
          <div class="kit-palette-drag-handle"></div>
        </div>

        <header class="kit-palette-header">
          <div class="kit-palette-title-group">
            <kit-icon [name]="headerIcon()" [size]="15" />
            <h2 class="kit-palette-title">{{ title() }}</h2>
          </div>
          @if (shortcutLabel()) {
            <span class="kit-palette-shortcut-badge">{{
              shortcutLabel()
            }}</span>
          }
        </header>
      </div>

      <div class="kit-palette-search-wrapper">
        <kit-icon
          name="search"
          [size]="20"
          className="kit-palette-search-icon"
        />
        <input
          #searchInput
          type="search"
          role="combobox"
          [attr.aria-expanded]="isOpen()"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          [attr.aria-controls]="listboxId"
          [attr.aria-activedescendant]="activeOptionId()"
          inputmode="search"
          enterkeyhint="go"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="none"
          spellcheck="false"
          class="kit-palette-input"
          [value]="query()"
          (input)="onInputChange($event)"
          [placeholder]="placeholder()"
        />
        <button
          type="button"
          class="kit-palette-kbd kit-palette-esc-badge"
          (click)="requestClose()"
          aria-label="Close command palette"
        >
          ESC
        </button>
      </div>

      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        @if (flatResults().length === 0) {
          @if (query()) {
            {{ emptyText() }} "{{ query() }}"
          } @else {
            {{ emptyText() }}
          }
        } @else {
          {{ flatResults().length }} results available
        }
      </div>

      <div
        [id]="listboxId"
        role="listbox"
        [attr.aria-label]="ariaLabel() || title()"
        class="kit-palette-results"
      >
        @if (flatResults().length === 0) {
          <div class="kit-palette-empty-state">
            <kit-icon name="inbox-empty" [size]="32" />
            <p>
              @if (query()) {
                {{ emptyText() }} "{{ query() }}"
              } @else {
                {{ emptyText() }}
              }
            </p>
          </div>
        } @else {
          @for (group of groupedResults(); track group.category) {
            <div
              class="kit-palette-group"
              role="group"
              [attr.aria-label]="group.category"
            >
              <div class="kit-palette-group-header">
                <span class="kit-palette-group-title" aria-hidden="true">{{
                  group.category
                }}</span>
                @if (clearableCategories().includes(group.category)) {
                  <button
                    type="button"
                    class="kit-palette-clear-btn"
                    (click)="onClearCategory(group.category, $event)"
                    [attr.aria-label]="'Clear ' + group.category"
                  >
                    Clear
                  </button>
                }
              </div>
              @for (entry of group.entries; track entry.item.id) {
                <div
                  [id]="optionId(entry.item)"
                  role="option"
                  [attr.aria-selected]="selectedIndex() === entry.flatIndex"
                  [attr.data-palette-selected]="
                    selectedIndex() === entry.flatIndex ? 'true' : null
                  "
                  class="kit-palette-item"
                  [class.selected]="selectedIndex() === entry.flatIndex"
                  (click)="onSelect(entry.item)"
                  (mouseenter)="onHover(entry.flatIndex)"
                >
                  <div class="kit-palette-item-icon">
                    @if (entry.item.icon) {
                      <kit-icon [name]="entry.item.icon" [size]="18" />
                    } @else if (entry.item.glyph) {
                      <span class="kit-palette-item-glyph">{{
                        entry.item.glyph
                      }}</span>
                    } @else {
                      <kit-icon name="search" [size]="16" />
                    }
                  </div>
                  <div class="kit-palette-item-info">
                    <div class="kit-palette-title-row">
                      <span class="kit-palette-item-title">
                        @for (
                          chunk of tokenize(entry.item.title);
                          track $index
                        ) {
                          @if (chunk.match) {
                            <mark class="kit-palette-mark">{{
                              chunk.text
                            }}</mark>
                          } @else {
                            {{ chunk.text }}
                          }
                        }
                      </span>
                      @if (entry.item.tag) {
                        <span class="kit-palette-region-badge">{{
                          entry.item.tag
                        }}</span>
                      }
                    </div>
                    @if (entry.item.subtitle) {
                      <span class="kit-palette-item-subtitle">
                        @for (
                          chunk of tokenize(entry.item.subtitle);
                          track $index
                        ) {
                          @if (chunk.match) {
                            <mark class="kit-palette-mark">{{
                              chunk.text
                            }}</mark>
                          } @else {
                            {{ chunk.text }}
                          }
                        }
                      </span>
                    }
                  </div>
                  @if (entry.item.badge) {
                    <span
                      class="kit-palette-item-badge"
                      [class.tone-success]="entry.item.badgeTone === 'success'"
                      [class.tone-info]="entry.item.badgeTone === 'info'"
                      [class.tone-warning]="entry.item.badgeTone === 'warning'"
                      [class.tone-danger]="entry.item.badgeTone === 'danger'"
                    >
                      {{ entry.item.badge }}
                    </span>
                  }
                  @if (
                    entry.item.removable ||
                    clearableCategories().includes(group.category)
                  ) {
                    <button
                      type="button"
                      class="kit-palette-item-remove-btn"
                      (click)="onRemoveItem(entry.item, $event)"
                      [attr.aria-label]="'Remove ' + entry.item.title"
                      title="Remove"
                    >
                      <kit-icon name="close" [size]="12" />
                    </button>
                  }
                </div>
              }
            </div>
          }
        }
      </div>

      <footer class="kit-palette-footer">
        <div class="kit-palette-hint">
          <kbd class="kit-palette-kbd mini">↑</kbd>
          <kbd class="kit-palette-kbd mini">↓</kbd>
          <span>Navigate</span>
        </div>
        <div class="kit-palette-hint">
          <kbd class="kit-palette-kbd mini">↵</kbd>
          <span>Select</span>
        </div>
        <div class="kit-palette-hint">
          <kbd class="kit-palette-kbd mini">esc</kbd>
          <span>Close</span>
        </div>
      </footer>
    </dialog>
  `,
})
export class KitCommandPaletteComponent implements AfterViewInit {
  public readonly isOpen = input<boolean>(false);
  public readonly title = input<string>('Command Palette');
  public readonly ariaLabel = input<string>('');
  public readonly headerIcon = input<IconName>('sparkles');
  public readonly shortcutLabel = input<string>('Ctrl + K');
  public readonly placeholder = input<string>('Search commands...');
  public readonly emptyText = input<string>('No results found');
  public readonly items = input<readonly KitCommandPaletteItem[]>([]);
  public readonly categoryOrder = input<readonly string[]>([]);
  public readonly filterLocally = input<boolean>(true);
  public readonly clearableCategories = input<readonly string[]>([
    'Recent Searches',
  ]);
  public readonly enableGlobalShortcut = input<boolean>(true);
  public readonly externalDragging = input<boolean>(false);
  public readonly closeOnSelect = input<boolean>(true);
  public readonly closeDurationMs = input<number>(220);

  public readonly openRequested = output<void>();
  public readonly toggleRequested = output<void>();
  public readonly closed = output<void>();
  public readonly queryChange = output<string>();
  public readonly itemSelected = output<KitCommandPaletteItem>();
  public readonly clearCategory = output<string>();
  public readonly removeItem = output<KitCommandPaletteItem>();

  @ViewChild('dialogEl') public dialogRef?: ElementRef<HTMLDialogElement>;
  @ViewChild('searchInput') public searchInput?: ElementRef<HTMLInputElement>;

  public readonly listboxId = `kit-palette-list-${++nextPaletteInstanceId}`;
  public readonly query = signal('');
  public readonly selectedIndex = signal(0);
  public readonly isEntering = signal(false);
  public readonly isClosing = signal(false);

  public readonly sheetDrag = new BottomSheetDragController();
  public readonly isDraggingSheet = this.sheetDrag.isDragging;
  public readonly effectiveTransformY = this.sheetDrag.effectiveTransformY;

  private readonly destroyRef = inject(DestroyRef);
  private wasOpen = false;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;
  private enterTimer: ReturnType<typeof setTimeout> | null = null;
  private focusTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly computedModel = computed(() =>
    filterAndGroupKitCommands(this.items(), this.query(), {
      categoryOrder: this.categoryOrder(),
      filterLocally: this.filterLocally(),
    }),
  );

  public readonly groupedResults = computed<KitCommandPaletteRenderedGroup[]>(
    () => this.computedModel().groups,
  );

  public readonly flatResults = computed<KitCommandPaletteItem[]>(
    () => this.computedModel().flatItems,
  );

  public readonly activeOptionId = computed<string | null>(() => {
    const flat = this.flatResults();
    const idx = this.selectedIndex();
    if (flat.length === 0 || idx < 0 || idx >= flat.length) {
      return null;
    }
    return this.optionId(flat[idx]);
  });

  constructor() {
    try {
      effect(() => {
        this.syncOpenState(this.isOpen(), this.externalDragging());
      });
    } catch {
      // Allow plain unit-test instantiation without an Angular effect scheduler
    }

    this.destroyRef.onDestroy(() => {
      this.clearTimers();
      this.restoreBodyScroll();
    });
  }

  public ngAfterViewInit(): void {
    if (this.isOpen()) {
      this.syncOpenState(true, this.externalDragging());
    }
  }

  public syncOpenState(open: boolean, dragging = false): void {
    if (open && !this.wasOpen) {
      this.clearTimers();
      this.wasOpen = true;
      this.isClosing.set(false);
      this.sheetDrag.reset();
      this.query.set('');
      this.queryChange.emit('');
      this.selectedIndex.set(0);
      this.lockBodyScroll();
      this.openDialog();

      if (!dragging) {
        this.isEntering.set(true);
        this.enterTimer = setTimeout(() => {
          this.enterTimer = null;
          this.isEntering.set(false);
        }, 280);
        this.focusTimer = setTimeout(() => {
          this.focusTimer = null;
          this.searchInput?.nativeElement?.focus();
        }, 50);
      }
    } else if (open && this.wasOpen && !dragging) {
      this.focusTimer = setTimeout(() => {
        this.focusTimer = null;
        this.searchInput?.nativeElement?.focus();
      }, 50);
    } else if (!open && this.wasOpen) {
      this.wasOpen = false;
      this.isEntering.set(false);
      if (!this.isClosing()) {
        this.performCloseTransition(false);
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  public onGlobalKeydown(event: KeyboardEvent): void {
    const key = (event.key || '').toLowerCase();
    if (
      this.enableGlobalShortcut() &&
      (event.ctrlKey || event.metaKey) &&
      key === 'k'
    ) {
      event.preventDefault();
      if (this.isOpen()) {
        this.requestClose();
      } else {
        this.openRequested.emit();
      }
      this.toggleRequested.emit();
      return;
    }

    if (!this.isOpen()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.requestClose();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.moveSelection(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.moveSelection(-1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.executeSelected();
    }
  }

  public optionId(item: KitCommandPaletteItem): string {
    return `${this.listboxId}-opt-${item.id}`;
  }

  public tokenize(text: string): KitCommandPaletteToken[] {
    return tokenizeKitCommandQuery(text, this.query());
  }

  public onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.setQuery(target?.value ?? '');
  }

  public setQuery(value: string): void {
    this.query.set(value);
    this.selectedIndex.set(0);
    this.queryChange.emit(value);
  }

  public moveSelection(delta: number): void {
    const total = this.flatResults().length;
    if (total === 0) return;
    this.selectedIndex.update((i) => (i + delta + total) % total);
    this.scrollActiveItemIntoView();
  }

  public executeSelected(): void {
    const flat = this.flatResults();
    const idx = this.selectedIndex();
    if (flat[idx]) {
      this.onSelect(flat[idx]);
    }
  }

  public onSelect(item: KitCommandPaletteItem): void {
    this.itemSelected.emit(item);
    item.action?.();
    if (this.closeOnSelect() && this.isOpen() && !this.isClosing()) {
      this.requestClose();
    }
  }

  public onHover(index: number): void {
    this.selectedIndex.set(index);
  }

  public onClearCategory(category: string, event: Event): void {
    event.stopPropagation();
    this.clearCategory.emit(category);
  }

  public onRemoveItem(item: KitCommandPaletteItem, event: Event): void {
    event.stopPropagation();
    this.removeItem.emit(item);
  }

  public onDialogClick(event: MouseEvent): void {
    const dialog = this.dialogRef?.nativeElement;
    if (!dialog) return;
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      this.requestClose();
    }
  }

  public onDialogCancel(event: Event): void {
    event.preventDefault();
    this.requestClose();
  }

  public requestClose(): void {
    if (this.isClosing()) return;
    this.performCloseTransition(true);
  }

  public onDragHandleTouchStart(event: TouchEvent): void {
    this.sheetDrag.onTouchStart(event);
  }

  public onDragHandleTouchMove(event: TouchEvent): void {
    this.sheetDrag.onTouchMove(event);
  }

  public onDragHandleTouchEnd(): void {
    this.sheetDrag.onTouchEnd(() => {
      this.requestClose();
    });
  }

  public onDragHandleTouchCancel(): void {
    this.sheetDrag.reset();
  }

  private performCloseTransition(emitClosed: boolean): void {
    const dialog = this.dialogRef?.nativeElement;
    if (canAnimateKitDialogExit(dialog)) {
      this.clearTimers();
      this.isClosing.set(true);
      this.closeTimer = setTimeout(() => {
        this.closeTimer = null;
        this.finishClose(emitClosed);
      }, this.closeDurationMs());
      return;
    }

    this.finishClose(emitClosed);
  }

  private finishClose(emitClosed: boolean): void {
    this.wasOpen = false;
    this.isEntering.set(false);
    this.isClosing.set(false);
    this.sheetDrag.reset();
    this.restoreBodyScroll();
    this.closeDialog();
    if (emitClosed) {
      this.closed.emit();
    }
  }

  private openDialog(): void {
    const dialog = this.dialogRef?.nativeElement;
    if (!dialog) return;
    if (!dialog.open) {
      if (typeof dialog.showModal === 'function') {
        try {
          dialog.showModal();
        } catch {
          dialog.setAttribute('open', '');
        }
      } else {
        dialog.setAttribute('open', '');
      }
    }
  }

  private closeDialog(): void {
    const dialog = this.dialogRef?.nativeElement;
    if (!dialog) return;
    if (dialog.open) {
      if (typeof dialog.close === 'function') {
        try {
          dialog.close();
        } catch {
          dialog.removeAttribute('open');
        }
      } else {
        dialog.removeAttribute('open');
      }
    }
  }

  private scrollActiveItemIntoView(): void {
    const dialog = this.dialogRef?.nativeElement;
    if (!dialog) return;
    setTimeout(() => {
      const activeEl = dialog.querySelector('[data-palette-selected="true"]');
      if (activeEl && typeof activeEl.scrollIntoView === 'function') {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }, 0);
  }

  private lockBodyScroll(): void {
    if (typeof document !== 'undefined' && document.body) {
      document.body.style.overflow = 'hidden';
    }
  }

  private restoreBodyScroll(): void {
    if (typeof document !== 'undefined' && document.body) {
      document.body.style.overflow = '';
    }
  }

  private clearTimers(): void {
    if (this.closeTimer !== null) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    if (this.enterTimer !== null) {
      clearTimeout(this.enterTimer);
      this.enterTimer = null;
    }
    if (this.focusTimer !== null) {
      clearTimeout(this.focusTimer);
      this.focusTimer = null;
    }
  }
}
