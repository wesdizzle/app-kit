import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { KitIconComponent } from './icon.component.js';

export interface KitDetailNavItem {
  label: string;
  sublabel?: string;
  href?: string;
  ariaLabel?: string;
}

export function shouldHandleDetailShellKeyNav(
  event: {
    key: string;
    altKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
    target?: unknown;
  },
  hasOpenDialog: boolean = false,
): 'prev' | 'next' | null {
  if (
    hasOpenDialog ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  ) {
    return null;
  }
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
    return null;
  }
  const target = event.target as {
    tagName?: string;
    isContentEditable?: boolean;
    closest?: (selector: string) => unknown;
  } | null;
  if (target) {
    const tag = (target.tagName ?? '').toUpperCase();
    if (
      tag === 'INPUT' ||
      tag === 'TEXTAREA' ||
      tag === 'SELECT' ||
      target.isContentEditable
    ) {
      return null;
    }
    if (
      typeof target.closest === 'function' &&
      target.closest('[role="tablist"]')
    ) {
      return null;
    }
  }
  return event.key === 'ArrowLeft' ? 'prev' : 'next';
}

/**
 * Reusable detail-page scaffold with sticky sub-navigation, back link/button,
 * optional Previous/Next item pager with keyboard navigation, hero banner slot,
 * primary content slot, and optional desktop sidebar slot.
 */
@Component({
  selector: 'kit-detail-shell',
  standalone: true,
  imports: [KitIconComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'onDocumentKeydown($event)',
  },
  template: `
    <div class="kit-detail-shell" [style.--kit-detail-max-width]="maxWidth()">
      <nav class="kit-detail-nav" aria-label="Detail navigation">
        <div class="kit-detail-nav-left">
          @if (backHref(); as href) {
            <a
              [href]="href"
              class="kit-detail-back state-layer"
              data-testid="kit-detail-back-link"
              (click)="onBackClick($event)"
            >
              <kit-icon name="arrow-left" [size]="18" />
              <span>{{ backLabel() }}</span>
            </a>
          } @else {
            <button
              type="button"
              class="kit-detail-back state-layer"
              data-testid="kit-detail-back-btn"
              (click)="onBackClick($event)"
            >
              <kit-icon name="arrow-left" [size]="18" />
              <span>{{ backLabel() }}</span>
            </button>
          }
        </div>

        @if (title() || code()) {
          <div class="kit-detail-nav-center">
            @if (code()) {
              <span class="kit-detail-nav-code">{{ code() }}</span>
            }
            @if (title()) {
              <span class="kit-detail-nav-title">{{ title() }}</span>
            }
          </div>
        }

        <div class="kit-detail-nav-right">
          <ng-content select="[detailActions]" />

          @if (prevItem() || nextItem()) {
            <div
              class="kit-detail-pager"
              role="group"
              aria-label="Adjacent items"
            >
              @if (prevItem(); as prev) {
                @if (prev.href) {
                  <a
                    [href]="prev.href"
                    class="kit-detail-pager-btn state-layer"
                    data-testid="kit-detail-prev-btn"
                    [attr.aria-label]="
                      prev.ariaLabel || 'Previous: ' + prev.label
                    "
                    [title]="
                      prev.sublabel
                        ? prev.label + ' (' + prev.sublabel + ')'
                        : prev.label
                    "
                    (click)="onPagerClick($event, 'prev')"
                  >
                    <kit-icon name="chevron-left" [size]="16" />
                    <span class="kit-detail-pager-label">{{ prev.label }}</span>
                  </a>
                } @else {
                  <button
                    type="button"
                    class="kit-detail-pager-btn state-layer"
                    data-testid="kit-detail-prev-btn"
                    [attr.aria-label]="
                      prev.ariaLabel || 'Previous: ' + prev.label
                    "
                    [title]="
                      prev.sublabel
                        ? prev.label + ' (' + prev.sublabel + ')'
                        : prev.label
                    "
                    (click)="onPagerClick($event, 'prev')"
                  >
                    <kit-icon name="chevron-left" [size]="16" />
                    <span class="kit-detail-pager-label">{{ prev.label }}</span>
                  </button>
                }
              }

              @if (nextItem(); as next) {
                @if (next.href) {
                  <a
                    [href]="next.href"
                    class="kit-detail-pager-btn state-layer"
                    data-testid="kit-detail-next-btn"
                    [attr.aria-label]="next.ariaLabel || 'Next: ' + next.label"
                    [title]="
                      next.sublabel
                        ? next.label + ' (' + next.sublabel + ')'
                        : next.label
                    "
                    (click)="onPagerClick($event, 'next')"
                  >
                    <span class="kit-detail-pager-label">{{ next.label }}</span>
                    <kit-icon name="chevron-right" [size]="16" />
                  </a>
                } @else {
                  <button
                    type="button"
                    class="kit-detail-pager-btn state-layer"
                    data-testid="kit-detail-next-btn"
                    [attr.aria-label]="next.ariaLabel || 'Next: ' + next.label"
                    [title]="
                      next.sublabel
                        ? next.label + ' (' + next.sublabel + ')'
                        : next.label
                    "
                    (click)="onPagerClick($event, 'next')"
                  >
                    <span class="kit-detail-pager-label">{{ next.label }}</span>
                    <kit-icon name="chevron-right" [size]="16" />
                  </button>
                }
              }
            </div>
          }
        </div>
      </nav>

      <div class="kit-detail-hero">
        <ng-content select="[detailHero]" />
      </div>

      <div class="kit-detail-body">
        <div class="kit-detail-main">
          <ng-content />
        </div>
        <aside class="kit-detail-sidebar">
          <ng-content select="[detailSidebar]" />
        </aside>
      </div>
    </div>
  `,
})
export class KitDetailShellComponent {
  readonly backLabel = input<string>('Back');
  readonly backHref = input<string | null>(null);
  readonly interceptBackClick = input<boolean>(false);
  readonly interceptPagerClick = input<boolean>(false);
  readonly title = input<string | null>(null);
  readonly code = input<string | null>(null);
  readonly prevItem = input<KitDetailNavItem | null>(null);
  readonly nextItem = input<KitDetailNavItem | null>(null);
  readonly enableKeyboardNav = input<boolean>(true);
  readonly maxWidth = input<string>('1200px');

  readonly backClicked = output<MouseEvent>();
  readonly prevClicked = output<MouseEvent | KeyboardEvent>();
  readonly nextClicked = output<MouseEvent | KeyboardEvent>();

  onBackClick(event: MouseEvent): void {
    if (this.interceptBackClick() && this.backHref()) {
      event.preventDefault();
    }
    this.backClicked.emit(event);
  }

  onPagerClick(event: MouseEvent, direction: 'prev' | 'next'): void {
    if (this.interceptPagerClick()) {
      event.preventDefault();
    }
    if (direction === 'prev') {
      this.prevClicked.emit(event);
    } else {
      this.nextClicked.emit(event);
    }
  }

  onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.enableKeyboardNav()) return;
    const hasOpenDialog =
      typeof document !== 'undefined' &&
      Boolean(document.querySelector('dialog[open]'));
    const dir = shouldHandleDetailShellKeyNav(event, hasOpenDialog);
    if (dir === 'prev' && this.prevItem()) {
      event.preventDefault();
      this.prevClicked.emit(event);
    } else if (dir === 'next' && this.nextItem()) {
      event.preventDefault();
      this.nextClicked.emit(event);
    }
  }
}
