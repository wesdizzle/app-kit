import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  input,
  output,
  computed,
  effect,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseUserProfile } from './auth.service.js';
import { BottomSheetDragController } from './bottom-sheet-drag.js';

export interface ProfileSavePayload {
  displayName: string;
  bio: string;
  isPublic: boolean;
}

@Component({
  selector: 'kit-profile-modal',
  standalone: true,
  imports: [FormsModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        isDragging() ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
      "
      (click)="onDialogClick($event)"
      (cancel)="onDialogCancel($event)"
    >
      <div
        class="modal-card"
        (click)="$event.stopPropagation()"
        (touchstart)="onTouchStart($event)"
        (touchmove)="onTouchMove($event)"
        (touchend)="onTouchEnd()"
        (touchcancel)="onTouchEnd()"
      >
        <div class="sheet-drag-area">
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
                aria-hidden="true"
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
                    {{ (u.displayName || u.username || 'U')[0].toUpperCase() }}
                  </div>
                  <div class="identity-details">
                    <div class="identity-primary">
                      <span class="username-tag">&#64;{{ u.username }}</span>
                      <span class="role-badge">{{ u.role }}</span>
                    </div>
                    @if (u.email) {
                      <span class="identity-email">{{ u.email }}</span>
                    }
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
                  Shown on your public collection banner when sharing is
                  enabled.
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
                    role="switch"
                    class="sr-only-checkbox"
                    [attr.aria-checked]="isPublic()"
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
                      {{ isCopied() ? 'Copied!' : 'Copy' }}
                    </button>
                  </div>
                  @if (publicRelativePath()) {
                    <a
                      class="share-open-link"
                      [href]="publicRelativePath()"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open public collection page &#8599;
                    </a>
                  }
                </div>
              }

              @if (accountHubUrl()) {
                <a
                  class="nav-section-btn"
                  [href]="accountHubUrl()"
                  target="_blank"
                  rel="noopener noreferrer"
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
                      aria-hidden="true"
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
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              }
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
                    aria-hidden="true"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 class="guest-title">{{ guestTitle() }}</h3>
                <p class="guest-desc">{{ guestDescription() }}</p>
                <a
                  [href]="loginUrl()"
                  class="signin-cta-btn state-layer"
                  data-testid="profile-guest-signin-btn"
                >
                  Sign In
                </a>
              </div>
            }

            <ng-content select="[profileExtraNav]" />

            @if (statusMessage()) {
              <p
                class="status-msg"
                [class.error]="isError()"
                [attr.role]="isError() ? 'alert' : 'status'"
                aria-live="polite"
              >
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
                  aria-hidden="true"
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
                  class="save-btn state-layer"
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

  readonly isOpen = input<boolean>(true);
  readonly activeView = input<string>('profile');
  readonly isAuthenticated = input<boolean>(false);
  readonly user = input<BaseUserProfile | null>(null);
  readonly displayName = input<string>('');
  readonly bio = input<string>('');
  readonly isPublic = input<boolean>(false);
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

  private readonly copiedInternal = signal(false);
  private copyTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly sheetDrag = new BottomSheetDragController(90);
  readonly dragOffsetY = this.sheetDrag.dragOffsetY;
  readonly isDragging = this.sheetDrag.isDragging;
  readonly effectiveTransformY = this.sheetDrag.effectiveTransformY;

  readonly isCopied = computed(() => this.copied() || this.copiedInternal());

  readonly publicRelativePath = computed(() => {
    const username = this.user()?.username;
    if (!username) return '';
    return `/u/${encodeURIComponent(username)}`;
  });

  readonly publicUrl = computed(() => {
    const rel = this.publicRelativePath();
    if (!rel) return '';
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
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
    const url = this.publicUrl();
    if (
      url &&
      typeof navigator !== 'undefined' &&
      typeof navigator.clipboard?.writeText === 'function'
    ) {
      void navigator.clipboard.writeText(url).then(
        () => {
          this.copiedInternal.set(true);
          if (this.copyTimer) clearTimeout(this.copyTimer);
          this.copyTimer = setTimeout(() => {
            this.copiedInternal.set(false);
          }, 2000);
        },
        () => {
          // Fallback handled by parent if needed
        },
      );
    }
    this.copyClicked.emit();
  }

  requestClose(): void {
    this.sheetDrag.reset();
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
    this.sheetDrag.onTouchStart(event);
  }

  onTouchMove(event: TouchEvent): void {
    this.sheetDrag.onTouchMove(event);
  }

  onTouchEnd(): void {
    this.sheetDrag.onTouchEnd(() => this.requestClose());
  }
}
