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
