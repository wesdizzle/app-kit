import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { KitPwaInstallService } from './pwa-install.service.js';

@Component({
  selector: 'kit-pwa-install-prompt',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isVisible()) {
      <aside
        class="kit-pwa-prompt animate-expressive"
        role="region"
        [attr.aria-label]="'Install ' + appName()"
        data-testid="kit-pwa-install-prompt"
      >
        <div class="kit-pwa-prompt-header">
          <div class="kit-pwa-app-meta">
            <div class="kit-pwa-app-icon-wrap">
              <img
                [src]="logoUrl()"
                alt=""
                aria-hidden="true"
                width="28"
                height="28"
                class="kit-pwa-app-icon"
              />
            </div>
            <div class="kit-pwa-text">
              <strong class="kit-pwa-title">Install {{ appName() }}</strong>
              <p class="kit-pwa-desc">{{ description() }}</p>
            </div>
          </div>
          <button
            type="button"
            class="kit-pwa-close-btn"
            aria-label="Dismiss install prompt"
            data-testid="pwa-prompt-close-btn"
            (click)="onClose()"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        @if (pwa.canPromptNative() && !pwa.iosGuideOpen()) {
          <div class="kit-pwa-actions">
            <button
              type="button"
              class="kit-pwa-install-btn state-layer"
              data-testid="pwa-install-btn"
              (click)="onInstall()"
            >
              Install
            </button>
            <button
              type="button"
              class="kit-pwa-secondary-btn"
              data-testid="pwa-snooze-btn"
              (click)="pwa.snooze()"
            >
              Not now
            </button>
            <button
              type="button"
              class="kit-pwa-text-btn"
              data-testid="pwa-dismiss-btn"
              (click)="pwa.dismissPermanently()"
            >
              Don't ask again
            </button>
          </div>
        } @else if (pwa.isIosSafari() || pwa.iosGuideOpen()) {
          <ol class="kit-pwa-ios-steps" data-testid="pwa-ios-steps">
            <li>
              Tap the
              <span class="kit-pwa-share-inline">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                Share
              </span>
              button in Safari.
            </li>
            <li>Choose <strong>Add to Home Screen</strong>.</li>
          </ol>
          <div class="kit-pwa-actions">
            @if (pwa.iosGuideOpen()) {
              <button
                type="button"
                class="kit-pwa-secondary-btn"
                data-testid="pwa-ios-done-btn"
                (click)="pwa.closeIosGuide()"
              >
                Got it
              </button>
            } @else {
              <button
                type="button"
                class="kit-pwa-secondary-btn"
                data-testid="pwa-snooze-btn"
                (click)="pwa.snooze()"
              >
                Not now
              </button>
              <button
                type="button"
                class="kit-pwa-text-btn"
                data-testid="pwa-dismiss-btn"
                (click)="pwa.dismissPermanently()"
              >
                Don't ask again
              </button>
            }
          </div>
        }
      </aside>
    }
  `,
  styles: [
    `
      .kit-pwa-prompt {
        position: fixed;
        right: 20px;
        bottom: calc(20px + env(safe-area-inset-bottom, 0px));
        z-index: 900;
        width: min(calc(100vw - 32px), 380px);
        background: var(--kit-surface-container);
        border: 1px solid var(--kit-outline-variant);
        border-radius: 1.25rem;
        padding: 16px;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);
        color: var(--kit-on-surface);
        display: flex;
        flex-direction: column;
        gap: 12px;
        box-sizing: border-box;
      }

      .kit-pwa-prompt-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
      }

      .kit-pwa-app-meta {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        min-width: 0;
      }

      .kit-pwa-app-icon-wrap {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: var(--kit-surface-container-high);
        border: 1px solid var(--kit-outline-variant);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .kit-pwa-app-icon {
        width: 26px;
        height: 26px;
      }

      .kit-pwa-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .kit-pwa-title {
        font-family: var(--kit-font-heading);
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--kit-on-surface);
      }

      .kit-pwa-desc {
        margin: 0;
        font-size: 0.8125rem;
        line-height: 1.4;
        color: var(--kit-on-surface-variant);
      }

      .kit-pwa-close-btn {
        background: transparent;
        border: none;
        color: var(--kit-on-surface-variant);
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;
        transition:
          background-color 0.15s,
          color 0.15s;
      }

      .kit-pwa-close-btn:hover {
        background: var(--kit-surface-container-highest);
        color: var(--kit-on-surface);
      }

      .kit-pwa-ios-steps {
        margin: 0;
        padding-left: 1.2rem;
        font-size: 0.8125rem;
        line-height: 1.5;
        color: var(--kit-on-surface-variant);
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .kit-pwa-share-inline {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        font-weight: 600;
        color: var(--kit-primary);
        vertical-align: middle;
      }

      .kit-pwa-actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
      }

      .kit-pwa-install-btn {
        padding: 7px 16px;
        border-radius: var(--kit-radius-full);
        border: none;
        background: var(--kit-primary);
        color: var(--kit-on-primary);
        font-family: var(--kit-font-sans);
        font-size: 0.825rem;
        font-weight: 700;
        cursor: pointer;
      }

      .kit-pwa-secondary-btn {
        padding: 6px 12px;
        border-radius: var(--kit-radius-full);
        border: 1px solid var(--kit-outline-variant);
        background: transparent;
        color: var(--kit-on-surface);
        font-family: var(--kit-font-sans);
        font-size: 0.8125rem;
        font-weight: 600;
        cursor: pointer;
      }

      .kit-pwa-secondary-btn:hover {
        background: var(--kit-surface-container-high);
      }

      .kit-pwa-text-btn {
        padding: 6px 8px;
        border: none;
        background: transparent;
        color: var(--kit-on-surface-variant);
        font-family: var(--kit-font-sans);
        font-size: 0.78rem;
        font-weight: 500;
        cursor: pointer;
        margin-left: auto;
      }

      .kit-pwa-text-btn:hover {
        color: var(--kit-on-surface);
        text-decoration: underline;
      }

      @media (max-width: 768px) {
        .kit-pwa-prompt {
          left: 16px;
          right: 16px;
          width: auto;
          bottom: calc(16px + env(safe-area-inset-bottom, 0px));
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .kit-pwa-prompt,
        .kit-pwa-prompt * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `,
  ],
})
export class KitPwaInstallPromptComponent {
  public readonly pwa = inject(KitPwaInstallService);

  public readonly appName = input<string>('App');
  public readonly logoUrl = input<string>('/favicon.svg');
  public readonly description = input<string>(
    'Install for home-screen access and offline support.',
  );
  public readonly suppressed = input<boolean>(false);

  public readonly isVisible = computed(
    () =>
      !this.suppressed() &&
      (this.pwa.shouldShowAutoPrompt() || this.pwa.iosGuideOpen()),
  );

  @HostListener('document:keydown.escape')
  public onEscape(): void {
    if (!this.isVisible()) return;
    this.onClose();
  }

  public async onInstall(): Promise<void> {
    await this.pwa.promptInstall();
  }

  public onClose(): void {
    if (this.pwa.iosGuideOpen()) {
      this.pwa.closeIosGuide();
      return;
    }
    this.pwa.snooze();
  }
}
