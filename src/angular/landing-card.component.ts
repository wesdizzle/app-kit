import { Component, ViewEncapsulation, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kit-landing-card',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="landing-container kit-landing-container">
      @if (!loading()) {
        <div class="welcome-card animate-expressive">
          <div class="logo-wrapper">
            <img
              [src]="logoUrl()"
              alt=""
              aria-hidden="true"
              class="app-logo"
            />
          </div>

          <h1 class="welcome-title">{{ appName() }}</h1>

          @if (accountMissing()) {
            <div
              class="account-missing-alert"
              role="alert"
              data-testid="account-missing-alert"
            >
              <span class="alert-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
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
      }
    </div>
  `,
  styles: [
    `
      .kit-landing-container.landing-container {
        min-height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
        background: var(--kit-surface, #1a1b20);
        color: var(--kit-on-surface, #f1f5f9);
      }

      .kit-landing-container .welcome-card {
        width: 100%;
        max-width: 420px;
        background: var(--kit-surface-container, #22232a);
        border: 1px solid var(--kit-outline-variant, #2d3039);
        border-radius: 1.5rem;
        padding: 2.5rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
      }

      .kit-landing-container .logo-wrapper {
        width: 64px;
        height: 64px;
        border-radius: 1rem;
        background: var(--kit-surface-container-high, #272930);
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
        font-size: 1.75rem;
        font-weight: 700;
        margin: 0 0 2rem;
        color: var(--kit-on-surface, #f1f5f9);
      }

      .kit-landing-container .account-missing-alert {
        width: 100%;
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.875rem 1rem;
        margin-bottom: 1.5rem;
        border-radius: 0.75rem;
        background: rgba(245, 158, 11, 0.12);
        border: 1px solid rgba(245, 158, 11, 0.35);
        color: var(--kit-on-surface, #f1f5f9);
        text-align: left;
      }

      .kit-landing-container .alert-icon {
        color: #f59e0b;
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
        color: #f59e0b;
      }

      .kit-landing-container .alert-content p {
        margin: 0;
        font-size: 0.8125rem;
        line-height: 1.45;
        color: var(--kit-on-surface-variant, #94a3b8);
      }

      .kit-landing-container .sign-in-btn {
        width: 100%;
        padding: 0.875rem 1.5rem;
        border: none;
        border-radius: 9999px;
        background: var(--kit-primary, #60a5fa);
        color: var(--kit-on-primary, #0f172a);
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
    `,
  ],
})
export class KitLandingCardComponent {
  readonly appName = input<string>('');
  readonly logoUrl = input<string>('/favicon.svg');
  readonly accountMissing = input<boolean>(false);
  readonly accountMissingMessage = input<string>(
    'Your identity was verified, but no account exists for this application yet. Please contact the administrator to provision your profile.',
  );
  readonly loading = input<boolean>(false);
  readonly loginUrl = input<string>('');

  readonly signInClicked = output<MouseEvent>();
}
