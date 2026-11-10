import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  inject,
  input,
  output,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BaseUserProfile } from './auth.service.js';

export interface ProfileSavePayload {
  displayName: string;
  bio: string;
  isPublic: boolean;
}

@Component({
  selector: 'kit-profile-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <dialog
      #dialogEl
      class="kit-profile-dialog profile-dialog"
      [style.transform]="
        effectiveTransformY() > 0
          ? 'translateY(' + effectiveTransformY() + 'px)'
          : null
      "
      [style.transition]="
        isDragging()
          ? 'none'
          : 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
      "
      (click)="onDialogClick($event)"
      (cancel)="onDialogCancel($event)"
    >
      <div class="modal-card" (click)="$event.stopPropagation()">
        <div
          class="sheet-drag-area"
          (touchstart)="onTouchStart($event)"
          (touchmove)="onTouchMove($event)"
          (touchend)="onTouchEnd()"
          (touchcancel)="onTouchEnd()"
        >
          <div class="sheet-handle"></div>
        </div>

        @if (activeView() !== 'profile') {
          <ng-content select="[profileSubview]" />
        } @else {
          <header class="modal-header">
            <div class="header-title-row">
              <span class="header-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <h2>Profile &amp; Sharing</h2>
            </div>
            <button
              type="button"
              class="close-btn"
              (click)="requestClose()"
              aria-label="Close profile dialog"
              data-testid="profile-modal-close-btn"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </header>

          <div class="modal-body">
            @if (isAuthenticated()) {
              @if (user(); as u) {
                <div class="identity-banner">
                  <div class="identity-avatar">
                    {{ (u.displayName || u.username || 'T')[0].toUpperCase() }}
                  </div>
                  <div class="identity-details">
                    <div class="identity-primary">
                      <span class="username-tag">&#64;{{ u.username }}</span>
                      <span class="role-badge">{{ u.role }}</span>
                    </div>
                    <span class="identity-email">{{ u.email }}</span>
                  </div>
                </div>
              }

              <div class="field-group">
                <div class="field-label-row">
                  <label for="kit-profile-display-name">Display Name</label>
                  <span class="char-hint">{{ displayName().length }} / 60</span>
                </div>
                <input
                  id="kit-profile-display-name"
                  type="text"
                  maxlength="60"
                  [ngModel]="displayName()"
                  (ngModelChange)="displayNameChange.emit($event)"
                  placeholder="Your collector handle"
                  class="text-input"
                />
                <span class="field-hint">
                  Shown on your public collection banner when sharing is enabled.
                </span>
              </div>

              <div class="field-group">
                <div class="field-label-row">
                  <label for="kit-profile-bio">Bio</label>
                  <span class="char-hint">{{ bio().length }} / 300</span>
                </div>
                <textarea
                  id="kit-profile-bio"
                  rows="3"
                  maxlength="300"
                  [ngModel]="bio()"
                  (ngModelChange)="bioChange.emit($event)"
                  placeholder="Share what you collect or hunt..."
                  class="text-input bio-input"
                ></textarea>
              </div>

              <ng-content select="[profileExtraFields]" />

              <label class="toggle-row" for="kit-profile-is-public">
                <div class="toggle-text">
                  <span class="toggle-title">Public Collection</span>
                  <span class="toggle-desc">
                    Allow anyone with your link to view your read-only
                    {{ collectionNoun() }}.
                  </span>
                </div>
                <span class="switch-wrapper">
                  <input
                    id="kit-profile-is-public"
                    type="checkbox"
                    class="sr-only-checkbox"
                    [ngModel]="isPublic()"
                    (ngModelChange)="isPublicChange.emit($event)"
                  />
                  <span class="switch-track" [class.checked]="isPublic()">
                    <span class="switch-thumb"></span>
                  </span>
                </span>
              </label>

              @if (isPublic() && publicUrl()) {
                <div class="share-box">
                  <span class="share-label">Public Share Link</span>
                  <div class="share-url-row">
                    <code class="share-url">{{ publicUrl() }}</code>
                    <button
                      type="button"
                      class="copy-btn"
                      (click)="copyLink()"
                      data-testid="copy-public-url-btn"
                    >
                      {{ copied() ? 'Copied!' : 'Copy' }}
                    </button>
                  </div>
                  @if (publicRelativePath()) {
                    <a
                      class="share-open-link"
                      [href]="publicRelativePath()"
                      target="_blank"
                      rel="noopener"
                    >
                      Open public collection page &#8599;
                    </a>
                  }
                </div>
              }

              <a
                class="nav-section-btn"
                [href]="getAccountHubLaunchUrl()"
                [attr.target]="shouldOpenAccountHubInNewTab() ? '_blank' : null"
                [attr.rel]="
                  shouldOpenAccountHubInNewTab() ? 'noopener noreferrer' : null
                "
                data-testid="profile-account-hub-link"
              >
                <div class="nav-section-left">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    class="nav-section-icon"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <div class="nav-section-text">
                    <span class="nav-section-title">
                      Account &amp; Security Hub
                    </span>
                    <span class="nav-section-desc">
                      Manage password, 2FA authenticator, passkeys, and active
                      sessions
                    </span>
                  </div>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="nav-section-chevron"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            } @else {
              <div class="guest-card" data-testid="profile-guest-view">
                <div class="guest-icon-circle">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 class="guest-title">{{ guestTitle() }}</h3>
                <p class="guest-desc">{{ guestDescription() }}</p>
                <a
                  [href]="loginUrl()"
                  class="signin-cta-btn"
                  data-testid="profile-guest-signin-btn"
                >
                  Sign In
                </a>
              </div>
            }

            <ng-content select="[profileExtraNav]" />

            @if (statusMessage()) {
              <p class="status-msg" [class.error]="isError()">
                {{ statusMessage() }}
              </p>
            }
          </div>

          <footer class="modal-footer">
            @if (isAuthenticated()) {
              <button
                type="button"
                class="signout-link"
                (click)="signOutClicked.emit()"
                data-testid="profile-signout-link"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Sign Out</span>
              </button>
              <div class="footer-actions">
                <button
                  type="button"
                  class="cancel-btn"
                  (click)="requestClose()"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="save-btn"
                  [disabled]="saving()"
                  (click)="saveClicked.emit()"
                  data-testid="profile-save-btn"
                >
                  {{ saving() ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            } @else {
              <div></div>
              <div class="footer-actions">
                <button
                  type="button"
                  class="cancel-btn"
                  (click)="requestClose()"
                >
                  Close
                </button>
              </div>
            }
          </footer>
        }
      </div>
    </dialog>
  `,
})
export class KitProfileModalComponent {
  @ViewChild('dialogEl') dialogEl?: ElementRef<HTMLDialogElement>;

  private readonly sanitizer = inject(DomSanitizer, { optional: true });

  readonly isOpen = input<boolean>(true);
  readonly activeView = input<string>('profile');
  readonly isAuthenticated = input<boolean>(false);
  readonly user = input<BaseUserProfile | null>(null);
  readonly displayName = input<string>('');
  readonly bio = input<string>('');
  readonly isPublic = input<boolean>(true);
  readonly saving = input<boolean>(false);
  readonly statusMessage = input<string>('');
  readonly isError = input<boolean>(false);
  readonly copied = input<boolean>(false);

  readonly accountHubUrl = input<string>('/api/auth/account');
  readonly loginUrl = input<string>('/api/auth/login');
  readonly collectionNoun = input<string>('collection');
  readonly guestTitle = input<string>('Sign in to manage your collection');
  readonly guestDescription = input<string>(
    'Authenticate with your account to edit your collection, customize your profile, and share a public link.',
  );

  readonly displayNameChange = output<string>();
  readonly bioChange = output<string>();
  readonly isPublicChange = output<boolean>();
  readonly saveClicked = output<void>();
  readonly copyClicked = output<void>();
  readonly signOutClicked = output<void>();
  readonly closed = output<void>();
  readonly backToProfile = output<void>();

  private touchStartY = 0;
  readonly dragOffsetY = signal(0);
  readonly isDragging = signal(false);
  readonly effectiveTransformY = computed(() =>
    Math.max(0, this.dragOffsetY()),
  );

  readonly publicRelativePath = computed(() => {
    const username = this.user()?.username;
    if (!username) return '';
    return `/u/${encodeURIComponent(username)}`;
  });

  readonly publicUrl = computed(() => {
    const rel = this.publicRelativePath();
    if (!rel) return '';
    const origin =
      typeof window !== 'undefined' ? window.location.origin : '';
    return `${origin}${rel}`;
  });

  constructor() {
    effect(() => {
      const open = this.isOpen();
      queueMicrotask(() => {
        const dialog = this.dialogEl?.nativeElement;
        if (!dialog) return;
        if (open) {
          if (!dialog.open && typeof dialog.showModal === 'function') {
            dialog.showModal();
          }
        } else if (dialog.open && typeof dialog.close === 'function') {
          dialog.close();
        }
      });
    });
  }

  copyLink(): void {
    this.copyClicked.emit();
  }

  private isAndroidBrowser(): boolean {
    return (
      typeof navigator !== 'undefined' &&
      /\bAndroid\b/i.test(navigator.userAgent)
    );
  }

  shouldOpenAccountHubInNewTab(): boolean {
    return !this.isAndroidBrowser();
  }

  getAccountHubLaunchUrl(): SafeUrl | string {
    const rawUrl = this.accountHubUrl();
    if (!this.isAndroidBrowser() || !rawUrl) {
      return rawUrl;
    }
    try {
      const base =
        typeof window !== 'undefined' && window.location?.origin
          ? window.location.origin
          : 'https://localhost';
      const parsed = new URL(rawUrl, base);
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
        return rawUrl;
      }
      const scheme = parsed.protocol.slice(0, -1);
      const hostAndPath = `${parsed.host}${parsed.pathname}${parsed.search}${parsed.hash}`;
      const fallback = encodeURIComponent(parsed.toString());
      const intentUri = `intent://${hostAndPath}#Intent;scheme=${scheme};package=com.android.chrome;S.browser_fallback_url=${fallback};end`;
      return this.sanitizer
        ? this.sanitizer.bypassSecurityTrustUrl(intentUri)
        : intentUri;
    } catch {
      return rawUrl;
    }
  }

  requestClose(): void {
    this.dragOffsetY.set(0);
    this.isDragging.set(false);
    const dialog = this.dialogEl?.nativeElement;
    if (dialog?.open && typeof dialog.close === 'function') {
      dialog.close();
    }
    this.closed.emit();
  }

  onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialogEl?.nativeElement) {
      this.requestClose();
    }
  }

  onDialogCancel(event: Event): void {
    if (this.activeView() !== 'profile') {
      event.preventDefault();
      this.backToProfile.emit();
      return;
    }
    event.preventDefault();
    this.requestClose();
  }

  onTouchStart(event: TouchEvent): void {
    if (event.touches.length !== 1) return;
    this.touchStartY = event.touches[0].clientY;
    this.isDragging.set(true);
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging() || event.touches.length !== 1) return;
    const deltaY = event.touches[0].clientY - this.touchStartY;
    if (deltaY > 0) {
      this.dragOffsetY.set(deltaY);
    } else {
      this.dragOffsetY.set(0);
    }
  }

  onTouchEnd(): void {
    if (!this.isDragging()) return;
    const finalOffset = this.dragOffsetY();
    this.isDragging.set(false);
    if (finalOffset > 90) {
      this.requestClose();
    } else {
      this.dragOffsetY.set(0);
    }
  }
}
