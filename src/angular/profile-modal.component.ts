import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
  inject,
  input,
  output,
  computed,
  effect,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseUserProfile } from './auth.service.js';
import { BottomSheetDragController } from './bottom-sheet-drag.js';
import { KIT_DIALOG_KEYFRAMES_CSS } from './dialog-keyframes.styles.js';
import { canAnimateKitDialogExit } from './dialog-sheet.component.js';
import { KitPwaInstallService } from './pwa-install.service.js';

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
  styles: [
    KIT_DIALOG_KEYFRAMES_CSS,
    `
      .kit-profile-dialog:not([open]) {
        display: none;
      }

      .kit-profile-dialog {
        padding: 0;
        border: 1px solid var(--kit-outline-variant);
        border-radius: 20px;
        background: var(--kit-surface);
        color: var(--kit-on-surface);
        width: min(92vw, 480px);
        max-height: 90vh;
        box-shadow: 0 24px 48px rgba(0, 0, 0, 0.45);
        overflow: hidden;
        margin: auto;
        animation: kitModalSpringIn var(--kit-duration-medium)
          var(--kit-ease-spring) backwards;
      }

      .kit-profile-dialog.dragging {
        animation: none !important;
        transition: none !important;
      }

      .kit-profile-dialog.closing {
        animation: kitModalSpringOut 170ms var(--kit-ease-exit) forwards;
        pointer-events: none;
      }

      .kit-profile-dialog::backdrop {
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        animation: kitBackdropFadeIn 200ms var(--kit-ease-standard) both;
      }

      .kit-profile-dialog.closing::backdrop {
        animation: kitBackdropFadeOut 170ms var(--kit-ease-exit) forwards;
      }

      .kit-profile-dialog .profile-view-panel {
        display: flex;
        flex-direction: column;
        min-height: 0;
        flex: 1 1 auto;
      }

      .kit-profile-dialog .view-enter-subview {
        animation: kitSubviewSlideIn 220ms var(--kit-ease-smooth) both;
      }

      .kit-profile-dialog .view-enter-profile {
        animation: kitSubviewSlideBack 220ms var(--kit-ease-smooth) both;
      }

      .kit-profile-dialog .modal-card {
        display: flex;
        flex-direction: column;
        max-height: 90vh;
      }

      .kit-profile-dialog .sheet-drag-area {
        display: none;
      }

      .kit-profile-dialog .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid var(--kit-outline-variant);
      }

      .kit-profile-dialog .header-title-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .kit-profile-dialog .subview-back-btn {
        background: transparent;
        border: none;
        color: var(--kit-on-surface-variant);
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-left: -6px;
        flex-shrink: 0;
        transition:
          background-color 0.15s,
          color 0.15s;
      }

      .kit-profile-dialog .subview-back-btn:hover {
        background: var(--kit-surface-highest);
        color: var(--kit-on-surface);
      }

      .kit-profile-dialog .header-icon {
        color: var(--kit-primary);
        display: inline-flex;
        align-items: center;
      }

      .kit-profile-dialog .modal-header h2 {
        margin: 0;
        font-family: var(--kit-font-heading);
        font-size: 1.15rem;
        font-weight: 700;
      }

      .kit-profile-dialog .close-btn {
        background: transparent;
        border: none;
        color: var(--kit-on-surface-muted);
        cursor: pointer;
        padding: 6px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition:
          background-color 0.15s,
          color 0.15s;
      }

      .kit-profile-dialog .close-btn:hover {
        background: var(--kit-surface-highest);
        color: var(--kit-on-surface);
      }

      .kit-profile-dialog .modal-body {
        padding: 16px 20px;
        overflow-y: auto;
        overscroll-behavior: contain;
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .kit-profile-dialog .modal-body > * {
        flex-shrink: 0;
      }

      .kit-profile-dialog .identity-banner {
        background: var(--kit-surface-high);
        border: 1px solid var(--kit-outline-variant);
        border-radius: 14px;
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex-shrink: 0;
      }

      .kit-profile-dialog .identity-top-row {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
      }

      .kit-profile-dialog .identity-avatar {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: var(--kit-primary);
        color: var(--kit-on-primary);
        font-weight: 800;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .kit-profile-dialog .identity-details {
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex: 1;
        min-width: 0;
      }

      .kit-profile-dialog .identity-primary {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }

      .kit-profile-dialog .identity-display-name {
        font-weight: 700;
        font-size: 0.98rem;
        color: var(--kit-on-surface);
      }

      .kit-profile-dialog .username-tag {
        font-weight: 700;
        font-size: 0.88rem;
        color: var(--kit-primary);
      }

      .kit-profile-dialog .role-badge {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-weight: 700;
        padding: 2px 7px;
        border-radius: 999px;
        background: var(--kit-primary-container);
        color: var(--kit-on-primary-container);
      }

      .kit-profile-dialog .identity-email {
        font-size: 0.82rem;
        color: var(--kit-on-surface-muted);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .kit-profile-dialog .identity-edit-btn {
        margin-left: auto;
        padding: 5px 12px;
        border-radius: 999px;
        border: 1px solid var(--kit-outline-variant);
        background: var(--kit-surface-container);
        color: var(--kit-on-surface);
        font-size: 0.78rem;
        font-weight: 600;
        cursor: pointer;
        flex-shrink: 0;
        transition:
          background-color 0.15s,
          border-color 0.15s;
      }

      .kit-profile-dialog .identity-edit-btn:hover {
        border-color: var(--kit-primary);
        background: var(--kit-surface-container-highest);
      }

      .kit-profile-dialog .identity-bio-preview {
        margin: 0;
        font-size: 0.8rem;
        color: var(--kit-on-surface-muted);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 1.4;
      }

      .kit-profile-dialog .field-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .kit-profile-dialog .field-label-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .kit-profile-dialog .field-group label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--kit-on-surface);
      }

      .kit-profile-dialog .char-hint {
        font-size: 0.75rem;
        color: var(--kit-on-surface-muted);
      }

      .kit-profile-dialog .text-input,
      .kit-profile-dialog .select-input {
        background: var(--kit-surface-container);
        border: 1px solid var(--kit-outline-variant);
        border-radius: 10px;
        padding: 10px 12px;
        color: var(--kit-on-surface);
        font-size: 0.95rem;
        font-family: inherit;
        transition: border-color 0.15s;
      }

      .kit-profile-dialog .text-input:focus,
      .kit-profile-dialog .select-input:focus {
        border-color: var(--kit-primary);
      }

      .kit-profile-dialog .bio-input {
        resize: vertical;
        min-height: 68px;
      }

      .kit-profile-dialog .field-hint {
        font-size: 0.76rem;
        color: var(--kit-on-surface-muted);
      }

      .kit-profile-dialog .toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 12px 14px;
        border-radius: 12px;
        background: var(--kit-surface-container);
        border: 1px solid var(--kit-outline-variant);
        cursor: pointer;
      }

      .kit-profile-dialog .toggle-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .kit-profile-dialog .toggle-title {
        font-size: 0.92rem;
        font-weight: 600;
      }

      .kit-profile-dialog .toggle-desc {
        font-size: 0.78rem;
        color: var(--kit-on-surface-muted);
      }

      .kit-profile-dialog .switch-wrapper {
        position: relative;
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
      }

      .kit-profile-dialog .sr-only-checkbox {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }

      .kit-profile-dialog .sr-only-checkbox:focus-visible + .switch-track {
        outline: 2px solid var(--kit-primary);
        outline-offset: 2px;
      }

      .kit-profile-dialog .switch-track {
        width: 44px;
        height: 24px;
        background: var(--kit-surface-highest);
        border: 1px solid var(--kit-outline);
        border-radius: 999px;
        position: relative;
        transition:
          background-color 0.2s,
          border-color 0.2s;
      }

      .kit-profile-dialog .switch-track.checked {
        background: var(--kit-primary);
        border-color: var(--kit-primary);
      }

      .kit-profile-dialog .switch-thumb {
        width: 18px;
        height: 18px;
        background: var(--kit-on-surface);
        border-radius: 50%;
        position: absolute;
        top: 2px;
        left: 2px;
        transition:
          transform 0.2s cubic-bezier(0.2, 0, 0, 1),
          background-color 0.2s;
      }

      .kit-profile-dialog .switch-track.checked .switch-thumb {
        transform: translateX(20px);
        background: var(--kit-on-primary);
      }

      .kit-profile-dialog .public-sharing-card {
        border-radius: 12px;
        background: var(--kit-surface-container);
        border: 1px solid var(--kit-outline-variant);
        overflow: hidden;
        flex-shrink: 0;
      }

      .kit-profile-dialog .public-sharing-card .toggle-row {
        border: none;
        border-radius: 0;
        padding: 11px 14px;
        background: transparent;
      }

      .kit-profile-dialog .share-inline-bar {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: var(--kit-surface-container-low);
        border-top: 1px solid var(--kit-outline-variant);
      }

      .kit-profile-dialog .share-box {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 12px 14px;
        border-radius: 12px;
        background: var(--kit-surface-high);
        border: 1px dashed var(--kit-outline);
      }

      .kit-profile-dialog .share-label {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--kit-on-surface-muted);
      }

      .kit-profile-dialog .share-url-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .kit-profile-dialog .share-url {
        flex: 1;
        min-width: 0;
        font-family: var(--kit-font-mono);
        font-size: 0.8rem;
        padding: 6px 10px;
        border-radius: 8px;
        background: var(--kit-surface);
        color: var(--kit-primary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .kit-profile-dialog .copy-btn {
        padding: 6px 12px;
        border-radius: 8px;
        border: 1px solid var(--kit-outline-variant);
        background: var(--kit-surface-highest);
        color: var(--kit-on-surface);
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .kit-profile-dialog .share-open-link {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--kit-primary);
        text-decoration: none;
        margin-top: 2px;
      }

      .kit-profile-dialog .share-inline-bar .share-open-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        margin-top: 0;
        border-radius: 8px;
        border: 1px solid var(--kit-outline-variant);
        background: var(--kit-surface-highest);
        color: var(--kit-primary);
        font-size: 0.9rem;
        flex-shrink: 0;
      }

      .kit-profile-dialog .share-open-link:hover {
        text-decoration: underline;
      }

      .kit-profile-dialog .share-inline-bar .share-open-link:hover {
        text-decoration: none;
        border-color: var(--kit-primary);
      }

      .kit-profile-dialog .kit-nav-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .kit-profile-dialog .kit-nav-group-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--kit-on-surface-muted);
        padding: 2px 4px 0;
      }

      .kit-profile-dialog .kit-nav-group-list {
        display: flex;
        flex-direction: column;
        border-radius: 12px;
        border: 1px solid var(--kit-outline-variant);
        background: var(--kit-surface-container);
        overflow: hidden;
      }

      .kit-profile-dialog .nav-section-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        width: 100%;
        padding: 12px 14px;
        border-radius: 12px;
        background: var(--kit-surface-container);
        border: 1px solid var(--kit-outline-variant);
        color: var(--kit-on-surface);
        text-align: left;
        text-decoration: none;
        box-sizing: border-box;
        cursor: pointer;
        transition:
          background-color 0.15s,
          border-color 0.15s;
      }

      .kit-profile-dialog .nav-section-btn:hover {
        background: var(--kit-surface-high);
        border-color: var(--kit-primary);
      }

      .kit-profile-dialog .kit-nav-group-list .nav-section-btn {
        border: none;
        border-radius: 0;
        padding: 10px 14px;
        background: transparent;
      }

      .kit-profile-dialog
        .kit-nav-group-list
        .nav-section-btn
        + .nav-section-btn {
        border-top: 1px solid var(--kit-outline-variant);
      }

      .kit-profile-dialog .kit-nav-group-list .nav-section-btn:hover {
        background: var(--kit-surface-high);
      }

      .kit-profile-dialog .nav-section-left {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
        flex: 1;
      }

      .kit-profile-dialog .nav-section-icon {
        color: var(--kit-primary);
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
      }

      .kit-profile-dialog .nav-section-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .kit-profile-dialog .nav-section-title {
        font-size: 0.9rem;
        font-weight: 600;
      }

      .kit-profile-dialog .nav-section-desc {
        font-size: 0.76rem;
        color: var(--kit-on-surface-muted);
        line-height: 1.35;
      }

      .kit-profile-dialog .nav-section-chevron {
        color: var(--kit-on-surface-muted);
        flex-shrink: 0;
      }

      .kit-profile-dialog .guest-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 18px 16px;
        border-radius: 14px;
        background: var(--kit-surface-high);
        border: 1px solid var(--kit-outline-variant);
        gap: 10px;
      }

      .kit-profile-dialog .guest-icon-circle {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: var(--kit-primary-container);
        color: var(--kit-on-primary-container);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .kit-profile-dialog .guest-title {
        margin: 4px 0 0;
        font-family: var(--kit-font-heading);
        font-size: 1.05rem;
        font-weight: 700;
      }

      .kit-profile-dialog .guest-desc {
        margin: 0;
        font-size: 0.85rem;
        line-height: 1.45;
        color: var(--kit-on-surface-muted);
      }

      .kit-profile-dialog .signin-cta-btn {
        margin-top: 6px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 11px 18px;
        border-radius: 9999px;
        background: var(--kit-primary);
        color: var(--kit-on-primary);
        font-size: 0.92rem;
        font-weight: 700;
        text-decoration: none;
        box-sizing: border-box;
      }

      .kit-profile-dialog .status-msg {
        margin: 0;
        font-size: 0.84rem;
        font-weight: 600;
        color: var(--kit-success);
      }

      .kit-profile-dialog .status-msg.error {
        color: var(--kit-danger);
      }

      .kit-profile-dialog .modal-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 22px;
        border-top: 1px solid var(--kit-outline-variant);
        background: var(--kit-surface-container);
      }

      .kit-profile-dialog .footer-actions {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .kit-profile-dialog .signout-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--kit-danger);
        background: transparent;
        border: none;
        padding: 4px 6px;
        border-radius: 8px;
        cursor: pointer;
        text-decoration: none;
      }

      .kit-profile-dialog .signout-link:hover {
        text-decoration: underline;
      }

      .kit-profile-dialog .cancel-btn {
        padding: 9px 16px;
        border-radius: 9999px;
        border: 1px solid var(--kit-outline-variant);
        background: transparent;
        color: var(--kit-on-surface);
        font-weight: 600;
        font-size: 0.88rem;
        cursor: pointer;
      }

      .kit-profile-dialog .save-btn {
        padding: 9px 18px;
        border-radius: 9999px;
        border: none;
        background: var(--kit-primary);
        color: var(--kit-on-primary);
        font-weight: 700;
        font-size: 0.88rem;
        cursor: pointer;
      }

      .kit-profile-dialog .save-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      @media (max-width: 768px) {
        .kit-profile-dialog {
          width: 100vw;
          max-width: 100vw;
          margin: auto 0 0 0;
          border-radius: 24px 24px 0 0;
          border-bottom: none;
          animation: kitSheetSlideUp 260ms var(--kit-ease-smooth) backwards;
        }

        .kit-profile-dialog.closing {
          animation: kitSheetSlideDown 170ms var(--kit-ease-exit) forwards;
        }

        .kit-profile-dialog .sheet-drag-area {
          display: flex;
          justify-content: center;
          padding: 10px 0 2px;
          touch-action: none;
          user-select: none;
          cursor: grab;
        }

        .kit-profile-dialog .modal-header {
          touch-action: none;
          user-select: none;
          cursor: grab;
        }

        .kit-profile-dialog .modal-header button,
        .kit-profile-dialog .modal-header a {
          touch-action: manipulation;
          cursor: pointer;
        }

        .kit-profile-dialog .sheet-handle {
          width: 36px;
          height: 4px;
          border-radius: 999px;
          background: var(--kit-outline);
          opacity: 0.5;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .kit-profile-dialog,
        .kit-profile-dialog * {
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
      class="kit-profile-dialog profile-dialog"
      [class.dragging]="isDragging()"
      [class.closing]="isClosing()"
      [style.transform]="
        effectiveTransformY() !== 0
          ? 'translateY(' + effectiveTransformY() + 'px)'
          : null
      "
      [style.transition]="
        isDragging()
          ? 'none'
          : 'transform var(--kit-duration-medium, 260ms) var(--kit-ease-smooth, cubic-bezier(0.22, 1, 0.36, 1))'
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
        (touchcancel)="onTouchCancel()"
      >
        <div class="sheet-drag-area">
          <div class="sheet-handle"></div>
        </div>

        @if (effectiveView() !== 'profile' && effectiveView() !== 'edit') {
          <div class="profile-view-panel view-enter-subview">
            <ng-content select="[profileSubview]" />
          </div>
        } @else if (effectiveView() === 'edit') {
          <div
            class="profile-view-panel view-enter-subview"
            data-testid="profile-edit-subview"
          >
            <header class="modal-header">
              <div class="header-title-row">
                <button
                  type="button"
                  class="subview-back-btn state-layer"
                  (click)="closeEditProfile()"
                  aria-label="Back to Profile"
                  data-testid="profile-edit-back-btn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2>Edit Profile</h2>
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
              <div></div>
              <div class="footer-actions">
                <button
                  type="button"
                  class="cancel-btn"
                  (click)="closeEditProfile()"
                  data-testid="profile-edit-cancel-btn"
                >
                  Back
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
            </footer>
          </div>
        } @else {
          <div
            class="profile-view-panel view-enter-profile"
            data-testid="profile-hub-view"
          >
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
                    <div class="identity-top-row">
                      <div class="identity-avatar">
                        {{
                          (displayName() ||
                            u.displayName ||
                            u.username ||
                            'U')[0].toUpperCase()
                        }}
                      </div>
                      <div class="identity-details">
                        <div class="identity-primary">
                          @if (displayName() || u.displayName) {
                            <span class="identity-display-name">{{
                              displayName() || u.displayName
                            }}</span>
                          }
                          <span class="username-tag"
                            >&#64;{{ u.username }}</span
                          >
                          <span class="role-badge">{{ u.role }}</span>
                          <ng-content select="[profileIdentityBadges]" />
                        </div>
                        @if (u.email) {
                          <span class="identity-email">{{ u.email }}</span>
                        }
                      </div>
                      <button
                        type="button"
                        class="identity-edit-btn state-layer"
                        (click)="openEditProfile()"
                        data-testid="profile-edit-btn"
                        aria-label="Edit profile details"
                      >
                        Edit
                      </button>
                    </div>
                    @if (bio() || u.bio) {
                      <p class="identity-bio-preview">{{ bio() || u.bio }}</p>
                    }
                  </div>
                }

                <div class="public-sharing-card">
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
                        (ngModelChange)="onPublicToggleChange($event)"
                      />
                      <span class="switch-track" [class.checked]="isPublic()">
                        <span class="switch-thumb"></span>
                      </span>
                    </span>
                  </label>

                  @if (isPublic() && publicUrl()) {
                    <div class="share-inline-bar">
                      <code class="share-url">{{ publicUrl() }}</code>
                      <button
                        type="button"
                        class="copy-btn"
                        (click)="copyLink()"
                        data-testid="copy-public-url-btn"
                      >
                        {{ isCopied() ? 'Copied!' : 'Copy' }}
                      </button>
                      @if (publicRelativePath()) {
                        <a
                          class="share-open-link"
                          [href]="publicRelativePath()"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open public collection page"
                          aria-label="Open public collection page"
                        >
                          &#8599;
                        </a>
                      }
                    </div>
                  }
                </div>
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

              @if (showInstallAction() && pwaInstall?.canShowManualInstall()) {
                <div class="kit-nav-group">
                  <span class="kit-nav-group-label">App</span>
                  <div class="kit-nav-group-list">
                    <button
                      type="button"
                      class="nav-section-btn"
                      (click)="onInstallAppClick()"
                      data-testid="profile-install-app-btn"
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
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <div class="nav-section-text">
                          <span class="nav-section-title">Install App</span>
                          <span class="nav-section-desc">
                            Add to your home screen for offline access
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
                    </button>
                  </div>
                </div>
              }

              @if (isAuthenticated() && accountHubUrl()) {
                <div class="kit-nav-group">
                  <span class="kit-nav-group-label">Account</span>
                  <div class="kit-nav-group-list">
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
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <div class="nav-section-text">
                          <span class="nav-section-title">
                            Account &amp; Security Hub
                          </span>
                          <span class="nav-section-desc">
                            Passkeys, 2FA authenticator, password &amp; active
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
                  </div>
                </div>
              }

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
                    Close
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
          </div>
        }
      </div>
    </dialog>
  `,
})
export class KitProfileModalComponent implements OnDestroy {
  @ViewChild('dialogEl') dialogEl?: ElementRef<HTMLDialogElement>;

  protected readonly pwaInstall = inject(KitPwaInstallService, {
    optional: true,
  });

  readonly isOpen = input<boolean>(true);
  readonly showInstallAction = input<boolean>(true);
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
  readonly publicToggleSaved = output<boolean>();
  readonly editProfileClicked = output<void>();
  readonly saveClicked = output<void>();
  readonly copyClicked = output<void>();
  readonly signOutClicked = output<void>();
  readonly closed = output<void>();
  readonly backToProfile = output<void>();

  readonly isEditingProfile = signal<boolean>(false);
  readonly isClosing = signal(false);
  private readonly copiedInternal = signal(false);
  private copyTimer: ReturnType<typeof setTimeout> | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;
  private previousActiveView = 'profile';

  readonly effectiveView = computed(() => {
    const v = this.activeView();
    if (v !== 'profile') return v;
    return this.isEditingProfile() ? 'edit' : 'profile';
  });

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
        if (!open) {
          this.isEditingProfile.set(false);
        }
        const dialog = this.dialogEl?.nativeElement;
        if (!dialog) return;
        if (open) {
          if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
          }
          this.isClosing.set(false);
          if (!dialog.open && typeof dialog.showModal === 'function') {
            dialog.showModal();
          }
        } else if (dialog.open && typeof dialog.close === 'function') {
          this.isClosing.set(false);
          dialog.close();
        }
      });
    });

    effect(() => {
      const view = this.activeView();
      const prev = this.previousActiveView;
      this.previousActiveView = view;
      if (
        (prev === 'edit' && view === 'profile') ||
        (view !== 'profile' && view !== 'edit')
      ) {
        queueMicrotask(() => {
          this.isEditingProfile.set(false);
        });
      }
    });
  }

  openEditProfile(): void {
    this.isEditingProfile.set(true);
    this.editProfileClicked.emit();
  }

  closeEditProfile(): void {
    this.isEditingProfile.set(false);
    this.backToProfile.emit();
  }

  onPublicToggleChange(checked: boolean): void {
    this.isPublicChange.emit(checked);
    this.publicToggleSaved.emit(checked);
  }

  async onInstallAppClick(): Promise<void> {
    if (!this.pwaInstall) return;
    const outcome = await this.pwaInstall.promptInstall();
    if (outcome === 'accepted' || outcome === 'ios-guide') {
      this.requestClose();
    }
  }

  ngOnDestroy(): void {
    if (this.copyTimer) {
      clearTimeout(this.copyTimer);
      this.copyTimer = null;
    }
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
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
    if (this.isClosing()) return;
    const dialog = this.dialogEl?.nativeElement;
    if (canAnimateKitDialogExit(dialog)) {
      this.isClosing.set(true);
      if (this.closeTimer) clearTimeout(this.closeTimer);
      this.closeTimer = setTimeout(() => {
        this.closeTimer = null;
        this.isClosing.set(false);
        this.isEditingProfile.set(false);
        if (dialog?.open && typeof dialog.close === 'function') {
          dialog.close();
        }
        this.closed.emit();
      }, 170);
      return;
    }
    this.isClosing.set(false);
    this.isEditingProfile.set(false);
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
    if (this.effectiveView() !== 'profile') {
      event.preventDefault();
      this.isEditingProfile.set(false);
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

  onTouchCancel(): void {
    this.sheetDrag.reset();
  }
}
