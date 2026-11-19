import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  inject,
  input,
  output,
} from '@angular/core';
import { IconName, KitIconComponent } from './icon.component.js';

export interface KitTabItem {
  id: string;
  label: string;
  badge?: string | number | null;
  icon?: IconName;
  disabled?: boolean;
  testId?: string;
}

export function getNextEnabledTabId(
  tabs: readonly KitTabItem[],
  currentId: string,
  key: string,
): string | null {
  const enabled = tabs.filter((t) => !t.disabled);
  if (enabled.length === 0) return null;

  if (key === 'Home') {
    return enabled[0].id;
  }
  if (key === 'End') {
    return enabled[enabled.length - 1].id;
  }
  if (key !== 'ArrowLeft' && key !== 'ArrowRight') {
    return null;
  }

  const idx = enabled.findIndex((t) => t.id === currentId);
  const startIdx = idx >= 0 ? idx : 0;
  const delta = key === 'ArrowRight' ? 1 : -1;
  const nextIdx = (startIdx + delta + enabled.length) % enabled.length;
  return enabled[nextIdx].id;
}

/**
 * Accessible Material 3 Expressive segmented pill/underline tab bar
 * with roving keyboard navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`).
 */
@Component({
  selector: 'kit-tabs',
  standalone: true,
  imports: [KitIconComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .kit-tabs {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px;
        border-radius: var(--kit-radius-full);
        border: 1px solid var(--kit-outline-variant);
        background: var(--kit-surface-container-low);
        overflow-x: auto;
        scrollbar-width: none;
        max-width: 100%;
      }

      .kit-tabs::-webkit-scrollbar {
        display: none;
      }

      .kit-tabs.kit-tabs-underline {
        border-radius: 0;
        border: none;
        border-bottom: 1px solid var(--kit-outline-variant);
        background: transparent;
        padding: 0;
        gap: 4px;
      }

      .kit-tab {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 7px 14px;
        border-radius: var(--kit-radius-full);
        border: 1px solid transparent;
        background: transparent;
        color: var(--kit-on-surface-variant);
        font-family: var(--kit-font-sans);
        font-size: 0.84rem;
        font-weight: 600;
        white-space: nowrap;
        cursor: pointer;
        transition:
          background-color var(--kit-duration-fast) ease,
          color var(--kit-duration-fast) ease,
          border-color var(--kit-duration-fast) ease;
      }

      .kit-tab:hover:not(:disabled) {
        color: var(--kit-on-surface);
        background: var(--kit-surface-container-high);
      }

      .kit-tab.active {
        background: var(--kit-primary-container);
        color: var(--kit-on-primary-container);
        border-color: color-mix(in srgb, var(--kit-primary) 35%, transparent);
      }

      .kit-tabs-underline .kit-tab {
        border-radius: var(--kit-radius-xs) var(--kit-radius-xs) 0 0;
        border: none;
        border-bottom: 2.5px solid transparent;
        padding: 9px 14px;
      }

      .kit-tabs-underline .kit-tab.active {
        background: transparent;
        color: var(--kit-primary);
        border-bottom-color: var(--kit-primary);
      }

      .kit-tab:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }

      .kit-tab:focus-visible {
        outline: 2.5px solid var(--kit-primary);
        outline-offset: 2px;
      }

      .kit-tab-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 1px 7px;
        border-radius: var(--kit-radius-full);
        background: var(--kit-surface-container);
        color: var(--kit-on-surface-variant);
        font-family: var(--kit-font-mono);
        font-size: 0.72rem;
        font-weight: 700;
      }

      .kit-tab.active .kit-tab-badge {
        background: color-mix(in srgb, var(--kit-primary) 18%, transparent);
        color: inherit;
      }

      @media (prefers-reduced-motion: reduce) {
        .kit-tab {
          transition: none;
        }
      }
    `,
  ],
  template: `
    <div
      class="kit-tabs"
      [class.kit-tabs-underline]="variant() === 'underline'"
      role="tablist"
      [attr.aria-label]="ariaLabel()"
      [attr.data-testid]="testId()"
    >
      @for (tab of tabs(); track tab.id) {
        <button
          type="button"
          role="tab"
          class="kit-tab state-layer"
          [class.active]="tab.id === activeTab()"
          [attr.aria-selected]="tab.id === activeTab()"
          [attr.tabindex]="tab.id === activeTab() ? 0 : -1"
          [attr.data-kit-tab-id]="tab.id"
          [attr.data-testid]="tab.testId || null"
          [disabled]="tab.disabled ?? false"
          (click)="selectTab(tab)"
          (keydown)="onTabKeydown($event, tab.id)"
        >
          @if (tab.icon) {
            <kit-icon [name]="tab.icon" [size]="15" />
          }
          <span class="kit-tab-label">{{ tab.label }}</span>
          @if (
            tab.badge !== undefined && tab.badge !== null && tab.badge !== ''
          ) {
            <span class="kit-tab-badge">{{ tab.badge }}</span>
          }
        </button>
      }
    </div>
  `,
})
export class KitTabsComponent {
  private readonly hostRef: ElementRef<HTMLElement> | null = inject(
    ElementRef,
    { optional: true },
  );

  readonly tabs = input.required<readonly KitTabItem[]>();
  readonly activeTab = input.required<string>();
  readonly variant = input<'pill' | 'underline'>('pill');
  readonly ariaLabel = input<string>('Tabs');
  readonly testId = input<string | null>(null);

  readonly tabChange = output<string>();

  selectTab(tab: KitTabItem): void {
    if (tab.disabled || tab.id === this.activeTab()) return;
    this.tabChange.emit(tab.id);
  }

  onTabKeydown(event: KeyboardEvent, currentId: string): void {
    const nextId = getNextEnabledTabId(this.tabs(), currentId, event.key);
    if (!nextId) return;
    event.preventDefault();
    if (nextId !== this.activeTab()) {
      this.tabChange.emit(nextId);
    }
    const hostEl = this.hostRef?.nativeElement;
    if (hostEl && typeof hostEl.querySelectorAll === 'function') {
      const buttons =
        hostEl.querySelectorAll<HTMLButtonElement>('button[role="tab"]');
      buttons.forEach((btn: HTMLButtonElement) => {
        if (btn.getAttribute('data-kit-tab-id') === nextId) {
          btn.focus();
        }
      });
    }
  }
}
