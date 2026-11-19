import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  ViewChild,
  ViewEncapsulation,
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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .kit-command-palette {
        margin: var(--spacing-48, 48px) auto auto auto;
        padding: 0;
        width: calc(100% - var(--spacing-32, 32px));
        max-width: 640px;
        max-height: calc(85vh - 48px);
        background: var(--kit-surface-container-high);
        border: 1px solid var(--kit-outline-variant);
        border-radius: var(--kit-radius-md, 16px);
        box-shadow:
          0 24px 64px rgba(0, 0, 0, 0.5),
          0 0 0 1px rgba(255, 255, 255, 0.05);
        overflow: hidden;
        color: var(--kit-on-surface);
      }

      .kit-command-palette:not([open]) {
        display: none;
      }

      .kit-command-palette[open] {
        display: flex;
        flex-direction: column;
      }

      .kit-command-palette::backdrop {
        background: rgba(0, 0, 0, 0.65);
        backdrop-filter: blur(16px) contrast(95%) brightness(85%);
        -webkit-backdrop-filter: blur(16px) contrast(95%) brightness(85%);
        overscroll-behavior: contain;
        transition: opacity var(--kit-duration-medium, 220ms)
          var(--kit-ease-standard, cubic-bezier(0.2, 0, 0, 1));
      }

      .kit-command-palette.slide-up-enter {
        animation: kitPaletteDesktopIn var(--kit-duration-medium, 220ms)
          var(--kit-ease-emphasized, cubic-bezier(0.16, 1, 0.3, 1)) forwards;
      }

      @keyframes kitPaletteDesktopIn {
        from {
          opacity: 0;
          transform: scale(0.96) translateY(-8px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      .kit-command-palette.closing {
        opacity: 0;
        transform: scale(0.96) translateY(8px);
        transition:
          opacity var(--kit-duration-medium, 220ms)
            var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)),
          transform var(--kit-duration-medium, 220ms)
            var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1));
      }

      .kit-command-palette.closing::backdrop {
        opacity: 0;
      }

      .kit-palette-drag-area {
        cursor: grab;
        touch-action: none;
      }

      .kit-palette-drag-handle-bar {
        display: none;
      }

      .kit-palette-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-12, 12px) var(--spacing-20, 20px);
        border-bottom: 1px solid var(--kit-outline-variant);
        background: var(--kit-surface-container);
      }

      .kit-palette-title-group {
        display: flex;
        align-items: center;
        gap: var(--spacing-8, 8px);
        color: var(--kit-primary);
      }

      .kit-palette-title {
        font-size: 0.8125rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin: 0;
        color: var(--kit-on-surface);
      }

      .kit-palette-shortcut-badge {
        font-family: inherit;
        font-size: 0.6875rem;
        font-weight: 600;
        padding: 2px 7px;
        border-radius: 4px;
        background: var(--kit-surface-container-highest);
        color: var(--kit-on-surface-variant);
        border: 1px solid var(--kit-outline-variant);
      }

      .kit-palette-search-wrapper {
        display: flex;
        align-items: center;
        gap: var(--spacing-12, 12px);
        padding: var(--spacing-16, 16px) var(--spacing-20, 20px);
        border-bottom: 1px solid var(--kit-outline-variant);
        background: var(--kit-surface-container-high);
      }

      .kit-palette-search-icon {
        color: var(--kit-on-surface-variant);
        flex-shrink: 0;
      }

      .kit-palette-input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        font-size: 1.05rem;
        color: var(--kit-on-surface);
        font-family: inherit;
      }

      .kit-palette-input::-webkit-search-cancel-button,
      .kit-palette-input::-webkit-search-decoration {
        -webkit-appearance: none;
        appearance: none;
      }

      .kit-palette-input::placeholder {
        color: var(--kit-on-surface-variant);
        opacity: 0.7;
      }

      .kit-command-palette .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }

      .kit-palette-kbd {
        font-family: inherit;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 3px 6px;
        border-radius: 4px;
        background: var(--kit-surface-container-highest);
        color: var(--kit-on-surface-variant);
        border: 1px solid var(--kit-outline-variant);
        line-height: 1;
      }

      .kit-palette-kbd.mini {
        padding: 2px 5px;
        font-size: 0.7rem;
      }

      .kit-palette-esc-badge {
        cursor: pointer;
        transition:
          background-color var(--kit-duration-fast, 150ms) ease,
          color var(--kit-duration-fast, 150ms) ease;
      }

      .kit-palette-esc-badge:hover {
        background: var(--kit-surface-container);
        color: var(--kit-on-surface);
      }

      .kit-palette-results {
        flex: 1;
        overflow-y: auto;
        padding: var(--spacing-8, 8px) 0;
        overscroll-behavior: contain;
      }

      .kit-palette-group {
        margin-bottom: var(--spacing-8, 8px);
      }

      .kit-palette-group-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-8, 8px) var(--spacing-20, 20px)
          var(--spacing-4, 4px);
      }

      .kit-palette-group-title {
        padding: 0;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--kit-primary);
      }

      .kit-palette-clear-btn {
        background: transparent;
        border: none;
        font-family: inherit;
        font-size: 0.7rem;
        font-weight: 600;
        color: var(--kit-on-surface-variant);
        cursor: pointer;
        padding: 2px 6px;
        border-radius: 4px;
        line-height: 1;
        transition:
          color var(--kit-duration-fast, 150ms) ease,
          background-color var(--kit-duration-fast, 150ms) ease;
      }

      .kit-palette-clear-btn:hover {
        color: var(--m3-error, var(--kit-danger, #ef4444));
        background: var(--kit-surface-container-highest);
      }

      .kit-palette-item {
        position: relative;
        display: flex;
        align-items: center;
        gap: var(--spacing-12, 12px);
        padding: var(--spacing-8, 8px) var(--spacing-20, 20px);
        margin: 2px var(--spacing-8, 8px);
        border-radius: var(--kit-radius-xs, 8px);
        cursor: pointer;
        transition:
          background-color var(--kit-duration-fast, 150ms) ease,
          color var(--kit-duration-fast, 150ms) ease,
          transform var(--kit-duration-fast, 150ms)
            var(--kit-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
      }

      .kit-palette-item:hover,
      .kit-palette-item.selected {
        background: var(--m3-secondary-container, var(--kit-primary-container));
        color: var(
          --m3-on-secondary-container,
          var(--kit-on-primary-container)
        );
      }

      .kit-palette-item.selected {
        transform: translateX(2px);
      }

      .kit-palette-item:active {
        transform: scale(0.99);
      }

      .kit-palette-item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 6px;
        background: var(--kit-surface-container-highest);
        color: var(--kit-on-surface);
        flex-shrink: 0;
        transition:
          background-color var(--kit-duration-fast, 150ms) ease,
          color var(--kit-duration-fast, 150ms) ease;
      }

      .kit-palette-item-glyph {
        font-size: 0.875rem;
        font-weight: 700;
        line-height: 1;
      }

      .kit-palette-item.selected .kit-palette-item-icon {
        background: var(
          --m3-on-secondary-container,
          var(--kit-on-primary-container)
        );
        color: var(--m3-secondary-container, var(--kit-primary-container));
      }

      .kit-palette-item-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .kit-palette-title-row {
        display: flex;
        align-items: center;
        gap: var(--spacing-8, 8px);
        min-width: 0;
      }

      .kit-palette-item-title {
        font-size: 0.95rem;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .kit-palette-region-badge {
        font-size: 0.65rem;
        font-weight: 700;
        padding: 1px 5px;
        border-radius: 4px;
        background: var(--kit-surface-container-highest);
        color: var(--kit-on-surface-variant);
        border: 1px solid var(--kit-outline-variant);
        flex-shrink: 0;
        line-height: 1.2;
      }

      .kit-palette-item.selected .kit-palette-region-badge {
        background: var(
          --m3-on-secondary-container,
          var(--kit-on-primary-container)
        );
        color: var(--m3-secondary-container, var(--kit-primary-container));
        border-color: transparent;
      }

      .kit-palette-item-subtitle {
        font-size: 0.8rem;
        color: var(--kit-on-surface-variant);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .kit-palette-item.selected .kit-palette-item-subtitle {
        color: var(
          --m3-on-secondary-container,
          var(--kit-on-primary-container)
        );
        opacity: 0.85;
      }

      .kit-palette-mark {
        background: color-mix(
          in srgb,
          var(--kit-primary, #6366f1) 24%,
          transparent
        );
        color: inherit;
        font-weight: 700;
        border-radius: 2px;
        padding: 0 1px;
      }

      .kit-palette-item.selected .kit-palette-mark {
        background: color-mix(in srgb, currentColor 24%, transparent);
        color: inherit;
      }

      .kit-palette-item-badge {
        font-size: 0.75rem;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 12px;
        background: var(--kit-surface-container-highest);
        color: var(--kit-on-surface-variant);
        flex-shrink: 0;
      }

      .kit-palette-item-badge.tone-success {
        background: rgba(34, 197, 94, 0.15);
        color: #22c55e;
      }

      .kit-palette-item-badge.tone-info {
        background: rgba(59, 130, 246, 0.15);
        color: #3b82f6;
      }

      .kit-palette-item-badge.tone-warning {
        background: rgba(245, 158, 11, 0.18);
        color: #f59e0b;
      }

      .kit-palette-item-badge.tone-danger {
        background: rgba(239, 68, 68, 0.16);
        color: #ef4444;
      }

      .kit-palette-item-remove-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        background: transparent;
        border: none;
        border-radius: 4px;
        color: var(--kit-on-surface-variant);
        cursor: pointer;
        opacity: 0.6;
        flex-shrink: 0;
        padding: 0;
        margin-left: auto;
        transition:
          opacity var(--kit-duration-fast, 150ms) ease,
          background-color var(--kit-duration-fast, 150ms) ease,
          color var(--kit-duration-fast, 150ms) ease;
      }

      .kit-palette-item-remove-btn:hover {
        opacity: 1;
        color: var(--m3-error, var(--kit-danger, #ef4444));
        background: var(--kit-surface-container-highest);
      }

      .kit-palette-item.selected .kit-palette-item-remove-btn {
        color: var(
          --m3-on-secondary-container,
          var(--kit-on-primary-container)
        );
        opacity: 0.85;
      }

      .kit-palette-empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-48, 48px) var(--spacing-20, 20px);
        gap: var(--spacing-12, 12px);
        color: var(--kit-on-surface-variant);
      }

      .kit-palette-empty-state p {
        margin: 0;
        font-size: 0.95rem;
      }

      .kit-palette-footer {
        display: flex;
        align-items: center;
        gap: var(--spacing-16, 16px);
        padding: var(--spacing-8, 8px) var(--spacing-20, 20px);
        border-top: 1px solid var(--kit-outline-variant);
        background: var(--kit-surface-container);
        font-size: 0.75rem;
        color: var(--kit-on-surface-variant);
      }

      .kit-palette-hint {
        display: flex;
        align-items: center;
        gap: var(--spacing-4, 4px);
      }

      @media (max-width: 768px) {
        .kit-command-palette {
          margin: auto 0 0 0;
          width: 100%;
          max-width: 100%;
          max-height: calc(88dvh - env(safe-area-inset-top, 0px));
          border-radius: 20px 20px 0 0;
          border-bottom: none;
          border-left: none;
          border-right: none;
          padding-bottom: max(
            var(--spacing-16, 16px),
            env(safe-area-inset-bottom, 16px)
          );
          transform: translateY(0);
          transition: transform 0.25s cubic-bezier(0.2, 0, 0, 1);
        }

        .kit-command-palette.dragging {
          transition: none !important;
        }

        .kit-command-palette.slide-up-enter {
          animation: kitPaletteSheetUp var(--kit-duration-medium, 280ms)
            var(--kit-ease-emphasized, cubic-bezier(0.16, 1, 0.3, 1)) forwards;
        }

        @keyframes kitPaletteSheetUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .kit-command-palette.closing {
          transform: translateY(100%) !important;
          opacity: 1 !important;
          transition: transform var(--kit-duration-medium, 220ms)
            var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)) !important;
        }

        .kit-palette-drag-handle-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 0 4px;
          cursor: grab;
          touch-action: none;
          background: var(--kit-surface-container);
        }

        .kit-palette-drag-handle {
          width: 36px;
          height: 4px;
          border-radius: 2px;
          background: var(--kit-outline-variant);
        }

        .kit-palette-item {
          min-height: 48px;
          padding: 10px 16px;
        }

        .kit-palette-shortcut-badge,
        .kit-palette-esc-badge,
        .kit-palette-footer {
          display: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .kit-command-palette,
        .kit-command-palette * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `,
  ],
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
