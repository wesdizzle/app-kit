import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { KitThemeToggleComponent } from './theme-toggle.component.js';
import { KitThemeMode, KitThemeService } from './theme.service.js';

@Component({
  selector: 'kit-landing-card',
  standalone: true,
  imports: [KitThemeToggleComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="landing-container kit-landing-container">
      @if (showThemeToggle() && !loading()) {
        <header class="kit-landing-topbar">
          <div class="kit-landing-brand-chip">
            <img
              [src]="logoUrl()"
              alt=""
              aria-hidden="true"
              width="20"
              height="20"
            />
            @if (appName()) {
              <span>{{ appName() }}</span>
            }
          </div>
          <kit-theme-toggle
            [theme]="effectiveTheme()"
            (toggled)="onThemeToggled($event)"
          />
        </header>
      }

      @if (!loading()) {
        <main class="kit-landing-main">
          <div class="welcome-card animate-expressive">
            <div class="logo-wrapper">
              <img
                [src]="logoUrl()"
                alt=""
                aria-hidden="true"
                class="app-logo"
                width="40"
                height="40"
              />
            </div>

            <h1 class="welcome-title">{{ appName() }}</h1>
            @if (subtitle()) {
              <p class="welcome-subtitle">{{ subtitle() }}</p>
            }

            <div class="kit-landing-details-slot">
              <ng-content select="[landingDetails]" />
            </div>

            @if (accountMissing()) {
              <div
                class="account-missing-alert"
                role="alert"
                data-testid="account-missing-alert"
              >
                <span class="alert-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path
                      d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <line
                      x1="12"
                      y1="9"
                      x2="12"
                      y2="13"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <circle cx="12" cy="17" r="1" fill="currentColor" />
                  </svg>
                </span>
                <div class="alert-content">
                  <strong>Account Not Provisioned</strong>
                  <p>{{ accountMissingMessage() }}</p>
                </div>
              </div>
            }

            @if (loginUrl()) {
              <a
                [href]="loginUrl()"
                class="sign-in-btn state-layer"
                data-testid="landing-signin-btn"
                (click)="signInClicked.emit($event)"
              >
                Sign In
              </a>
            } @else {
              <button
                type="button"
                class="sign-in-btn state-layer"
                data-testid="landing-signin-btn"
                (click)="signInClicked.emit($event)"
              >
                Sign In
              </button>
            }
          </div>

          <footer class="kit-landing-footer-slot">
            <ng-content select="[landingFooter]" />
          </footer>
        </main>
      }
    </div>
  `,
  styles: [
    `
      .kit-landing-container.landing-container {
        min-height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.25rem 1.5rem 2rem;
        background: var(--kit-surface);
        color: var(--kit-on-surface);
        box-sizing: border-box;
      }

      .kit-landing-container .kit-landing-topbar {
        width: 100%;
        max-width: 960px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        min-height: 44px;
      }

      .kit-landing-container .kit-landing-brand-chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: var(--kit-font-heading);
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--kit-on-surface-variant);
      }

      .kit-landing-container .kit-landing-main {
        flex: 1 1 auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1.5rem 0;
        gap: 1.25rem;
      }

      .kit-landing-container .welcome-card {
        width: 100%;
        max-width: 480px;
        background: var(--kit-surface-container);
        border: 1px solid var(--kit-outline-variant);
        border-radius: 1.5rem;
        padding: 2.25rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.16);
        box-sizing: border-box;
      }

      .kit-landing-container .logo-wrapper {
        width: 64px;
        height: 64px;
        border-radius: 1rem;
        background: var(--kit-surface-container-high);
        border: 1px solid var(--kit-outline-variant);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.25rem;
      }

      .kit-landing-container .app-logo {
        width: 40px;
        height: 40px;
      }

      .kit-landing-container .welcome-title {
        font-family: var(--kit-font-heading);
        font-size: 1.75rem;
        font-weight: 700;
        margin: 0 0 0.5rem;
        color: var(--kit-on-surface);
      }

      .kit-landing-container .welcome-subtitle {
        margin: 0 0 1.25rem;
        font-size: 0.95rem;
        line-height: 1.5;
        color: var(--kit-on-surface-variant);
      }

      .kit-landing-container .kit-landing-details-slot {
        width: 100%;
        margin-bottom: 1.5rem;
      }

      .kit-landing-container .kit-landing-details-slot:empty {
        display: none;
        margin-bottom: 0;
      }

      .kit-landing-container .kit-landing-details {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        text-align: left;
      }

      .kit-landing-container .kit-landing-detail-item {
        padding: 0.65rem 0.875rem;
        border-radius: 0.75rem;
        background: var(--kit-surface-container-low);
        border: 1px solid var(--kit-outline-variant);
        font-size: 0.84rem;
        line-height: 1.45;
        color: var(--kit-on-surface-variant);
      }

      .kit-landing-container .kit-landing-detail-item strong {
        color: var(--kit-on-surface);
        font-weight: 600;
      }

      .kit-landing-container .kit-landing-footer-slot {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;
        font-size: 0.8125rem;
        color: var(--kit-on-surface-variant);
      }

      .kit-landing-container .kit-landing-footer-slot:empty {
        display: none;
      }

      .kit-landing-container .kit-landing-footer-slot a {
        color: var(--kit-on-surface-variant);
        text-decoration: none;
        font-weight: 500;
      }

      .kit-landing-container .kit-landing-footer-slot a:hover {
        color: var(--kit-primary);
        text-decoration: underline;
      }

      .kit-landing-container .welcome-title:has(+ .sign-in-btn),
      .kit-landing-container .welcome-title:has(+ .account-missing-alert) {
        margin-bottom: 1.75rem;
      }

      .kit-landing-container .account-missing-alert {
        width: 100%;
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.875rem 1rem;
        margin-bottom: 1.5rem;
        border-radius: 0.75rem;
        background: var(--kit-warning-subtle);
        border: 1px solid var(--kit-warning-border);
        color: var(--kit-on-surface);
        text-align: left;
      }

      .kit-landing-container .alert-icon {
        color: var(--kit-warning);
        flex-shrink: 0;
        margin-top: 0.125rem;
      }

      .kit-landing-container .alert-content {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .kit-landing-container .alert-content strong {
        font-size: 0.875rem;
        font-weight: 700;
        color: var(--kit-warning);
      }

      .kit-landing-container .alert-content p {
        margin: 0;
        font-size: 0.8125rem;
        line-height: 1.45;
        color: var(--kit-on-surface-variant);
      }

      .kit-landing-container .sign-in-btn {
        width: 100%;
        padding: 0.875rem 1.5rem;
        border: none;
        border-radius: 9999px;
        background: var(--kit-primary);
        color: var(--kit-on-primary);
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition:
          transform 0.15s ease,
          opacity 0.15s ease;
      }

      .kit-landing-container .sign-in-btn:hover {
        opacity: 0.92;
      }

      .kit-landing-container .sign-in-btn:active {
        transform: scale(0.98);
      }

      @media (prefers-reduced-motion: reduce) {
        .kit-landing-container * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `,
  ],
})
export class KitLandingCardComponent {
  private readonly themeService = inject(KitThemeService, { optional: true });

  readonly appName = input<string>('');
  readonly subtitle = input<string>('');
  readonly logoUrl = input<string>('/favicon.svg');
  readonly accountMissing = input<boolean>(false);
  readonly accountMissingMessage = input<string>(
    'Your identity was verified, but no account exists for this application yet. Please contact the administrator to provision your profile.',
  );
  readonly loading = input<boolean>(false);
  readonly loginUrl = input<string>('');
  readonly showThemeToggle = input<boolean>(true);
  readonly theme = input<KitThemeMode | null>(null);

  readonly signInClicked = output<MouseEvent>();
  readonly themeToggled = output<KitThemeMode>();

  readonly effectiveTheme = computed<KitThemeMode>(
    () => this.theme() ?? this.themeService?.theme() ?? 'auto',
  );

  onThemeToggled(next: KitThemeMode): void {
    if (this.theme() === null && this.themeService) {
      const updated = this.themeService.toggleTheme();
      this.themeToggled.emit(updated);
      return;
    }
    this.themeToggled.emit(next);
  }
}
