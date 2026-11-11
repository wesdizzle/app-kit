import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';
import { BaseUserProfile } from './auth.service.js';
import { KitThemeMode } from './theme.service.js';

export interface KitHeaderTab {
  id: string;
  label: string;
  href?: string;
  testId?: string;
}

@Component({
  selector: 'kit-header-bar',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="main-header kit-header-bar">
      <div class="header-inner">
        <div class="header-left">
          <a
            [href]="brandHref()"
            class="brand-link state-layer"
            (click)="onBrandClick($event)"
            data-testid="header-brand-link"
          >
            @if (logoUrl()) {
              <img
                [src]="logoUrl()"
                alt=""
                aria-hidden="true"
                class="brand-icon"
                width="32"
                height="32"
              />
            }
            <div class="brand-copy">
              <span class="brand-title">{{ appName() }}</span>
              @if (subtitle()) {
                <span class="brand-subtitle">{{ subtitle() }}</span>
              }
            </div>
          </a>
        </div>

        @if (tabs().length > 0) {
          <nav class="main-nav" aria-label="Main navigation">
            @for (tab of tabs(); track tab.id) {
              @if (tab.href) {
                <a
                  [href]="tab.href"
                  class="nav-item state-layer"
                  [class.active]="activeTab() === tab.id"
                  [attr.aria-current]="activeTab() === tab.id ? 'page' : null"
                  [attr.data-testid]="tab.testId || 'nav-tab-' + tab.id"
                  (click)="onTabClick($event, tab)"
                >
                  <span class="label">{{ tab.label }}</span>
                  <div class="indicator"></div>
                </a>
              } @else {
                <button
                  type="button"
                  class="nav-item state-layer"
                  [class.active]="activeTab() === tab.id"
                  [attr.aria-current]="activeTab() === tab.id ? 'page' : null"
                  [attr.data-testid]="tab.testId || 'nav-tab-' + tab.id"
                  (click)="onTabClick($event, tab)"
                >
                  <span class="label">{{ tab.label }}</span>
                  <div class="indicator"></div>
                </button>
              }
            }
          </nav>
        } @else {
          <div class="kit-header-center">
            <ng-content select="[headerCenter],[kitHeaderCenter]" />
          </div>
        }

        <div class="header-right">
          <ng-content select="[headerRightStart],[kitHeaderActions]" />

          @if (showProfileButton()) {
            <button
              type="button"
              class="m3-button-icon state-layer"
              (click)="profileClicked.emit()"
              [title]="resolvedProfileTitle()"
              [attr.aria-label]="profileAriaLabel()"
              [attr.data-testid]="profileTestId()"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <path
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          }

          <button
            type="button"
            class="m3-button-icon state-layer"
            (click)="themeToggled.emit()"
            [title]="'Theme: ' + theme()"
            [attr.aria-label]="'Toggle color theme (current: ' + theme() + ')'"
            [attr.data-testid]="themeTestId()"
          >
            @switch (theme()) {
              @case ('light') {
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <line
                    x1="12"
                    y1="1"
                    x2="12"
                    y2="3"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="12"
                    y1="21"
                    x2="12"
                    y2="23"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="4.22"
                    y1="4.22"
                    x2="5.64"
                    y2="5.64"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="18.36"
                    y1="18.36"
                    x2="19.78"
                    y2="19.78"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="1"
                    y1="12"
                    x2="3"
                    y2="12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="21"
                    y1="12"
                    x2="23"
                    y2="12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="4.22"
                    y1="19.78"
                    x2="5.64"
                    y2="18.36"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <line
                    x1="18.36"
                    y1="5.64"
                    x2="19.78"
                    y2="4.22"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              }
              @case ('dark') {
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              }
              @default {
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
                </svg>
              }
            }
          </button>
          <ng-content select="[headerRightEnd]" />
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      .kit-header-bar.main-header {
        position: sticky;
        top: 0;
        z-index: 500;
        width: 100%;
        background: transparent;
        border-bottom: 1px solid var(--kit-outline-variant);
      }

      .kit-header-bar.main-header::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        background: var(--kit-glass-bg, var(--kit-surface));
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        pointer-events: none;
      }

      .kit-header-bar .header-inner {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 var(--container-padding, 16px);
        height: var(--header-height, 64px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
      }

      .kit-header-bar .header-left,
      .kit-header-bar .header-right {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
      }

      .kit-header-bar .header-right {
        justify-content: flex-end;
      }

      .kit-header-bar .brand-link {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        border-radius: 12px;
        text-decoration: none;
        color: inherit;
        transition: background-color 0.2s;
      }

      .kit-header-bar .brand-link:hover {
        background: var(--kit-surface-container);
      }

      .kit-header-bar .brand-icon {
        width: 32px;
        height: 32px;
        flex-shrink: 0;
      }

      .kit-header-bar .brand-copy {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }

      .kit-header-bar .brand-title {
        font-family: var(--kit-font-heading);
        font-size: 1.35rem;
        font-weight: 700;
        color: var(--kit-on-surface);
        margin: 0;
        line-height: 1.1;
      }

      .kit-header-bar .brand-subtitle {
        font-size: 0.72rem;
        font-weight: 600;
        color: var(--kit-on-surface-variant);
        letter-spacing: 0.02em;
      }

      .kit-header-bar .main-nav {
        display: flex;
        justify-content: center;
        gap: 8px;
        z-index: 1000;
      }

      @media (min-width: 769px) {
        .kit-header-bar .main-nav {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
          height: 100%;
        }
      }

      .kit-header-bar .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 24px;
        height: 100%;
        position: relative;
        color: var(--kit-on-surface-variant);
        transition: color 0.2s;
        cursor: pointer;
        text-decoration: none;
        background: transparent;
        border: none;
        font-family: inherit;
      }

      .kit-header-bar .nav-item .label {
        font-size: 0.875rem;
        font-weight: 600;
        letter-spacing: 0.01em;
        z-index: 1;
      }

      .kit-header-bar .nav-item .indicator {
        position: absolute;
        bottom: 0;
        left: 24px;
        right: 24px;
        height: 3px;
        background: var(--kit-primary);
        border-radius: 3px 3px 0 0;
        opacity: 0;
        transform: scaleX(0.5);
        transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
      }

      .kit-header-bar .nav-item.active {
        color: var(--kit-primary);
      }

      .kit-header-bar .nav-item.active .indicator {
        opacity: 1;
        transform: scaleX(1);
      }

      .kit-header-bar .nav-item:hover {
        color: var(--kit-on-surface);
      }

      .kit-header-bar .m3-button-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: none;
        background: transparent;
        color: var(--kit-on-surface-variant);
        cursor: pointer;
        font-size: 1.25rem;
        transition:
          background-color 0.2s,
          color 0.2s;
      }

      .kit-header-bar .m3-button-icon:hover {
        background: var(--kit-surface-container-high);
        color: var(--kit-on-surface);
      }

      @media (max-width: 768px) {
        .kit-header-bar .brand-copy {
          display: none;
        }

        .kit-header-bar .main-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: var(--kit-surface-container-high);
          border-top: 1px solid var(--kit-outline-variant);
          padding-bottom: env(safe-area-inset-bottom);
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
          transform: none;
        }

        .kit-header-bar .nav-item {
          flex: 1;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .kit-header-bar .nav-item .indicator {
          display: none;
        }

        .kit-header-bar .nav-item .label {
          padding: 6px 14px;
          border-radius: 9999px;
          transition:
            background-color 0.25s cubic-bezier(0.2, 0, 0, 1),
            color 0.2s ease;
          white-space: nowrap;
        }

        .kit-header-bar .nav-item.active .label {
          background: var(
            --m3-secondary-container,
            var(--kit-primary-container)
          );
          color: var(
            --m3-on-secondary-container,
            var(--kit-on-primary-container)
          );
        }
      }
    `,
  ],
})
export class KitHeaderBarComponent {
  readonly appName = input<string>('');
  readonly subtitle = input<string>('');
  readonly logoUrl = input<string>('/favicon.svg');
  readonly brandHref = input<string>('/');
  readonly tabs = input<KitHeaderTab[]>([]);
  readonly activeTab = input<string>('');
  readonly theme = input<KitThemeMode>('auto');
  readonly isAuthenticated = input<boolean>(false);
  readonly user = input<BaseUserProfile | null>(null);
  readonly showProfileButton = input<boolean>(true);
  readonly profileTitle = input<string>('');
  readonly profileAriaLabel = input<string>('Profile and account settings');
  readonly profileTestId = input<string>('open-profile-modal-btn');
  readonly themeTestId = input<string>('theme-toggle-btn');

  readonly brandClicked = output<MouseEvent>();
  readonly tabSelected = output<string>();
  readonly profileClicked = output<void>();
  readonly themeToggled = output<void>();

  readonly resolvedProfileTitle = computed(() => {
    const custom = this.profileTitle();
    if (custom) return custom;
    if (this.isAuthenticated()) {
      const u = this.user();
      const label = u?.displayName || u?.username;
      return label ? `Signed in as ${label}` : 'Profile & Settings';
    }
    return 'Sign In / Profile';
  });

  onBrandClick(event: MouseEvent): void {
    this.brandClicked.emit(event);
  }

  onTabClick(event: MouseEvent, tab: KitHeaderTab): void {
    if (tab.href) {
      event.preventDefault();
    }
    this.tabSelected.emit(tab.id);
  }
}
