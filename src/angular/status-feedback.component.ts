import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewEncapsulation,
  computed,
  effect,
  input,
  signal,
  untracked,
} from '@angular/core';
import { isKitReducedMotionPreferred } from './theme.service.js';

export function canAnimateKitBannerExit(): boolean {
  if (isKitReducedMotionPreferred()) {
    return false;
  }
  return Boolean(
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches,
  );
}

export type KitSyncPhase = 'idle' | 'saving' | 'saved';

const KIT_BANNER_COLLAPSE_CSS = `
  @keyframes kitBannerIn {
    from {
      opacity: 0;
      transform: translateY(-6px) scale(0.985);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes kitBannerOut {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(-6px) scale(0.985);
    }
  }

  .kit-banner-collapse {
    display: grid;
    grid-template-rows: 1fr;
    opacity: 1;
    transition:
      grid-template-rows var(--kit-duration-medium, 260ms)
        var(--kit-ease-smooth, cubic-bezier(0.22, 1, 0.36, 1)),
      opacity 200ms var(--kit-ease-standard, cubic-bezier(0.4, 0, 0.2, 1));
  }

  @starting-style {
    .kit-banner-collapse {
      grid-template-rows: 0fr;
      opacity: 0;
    }
  }

  .kit-banner-collapse.closing {
    grid-template-rows: 0fr;
    opacity: 0;
    pointer-events: none;
    transition:
      grid-template-rows 220ms var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)),
      opacity 180ms var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1));
  }

  .kit-banner-collapse-inner {
    min-height: 0;
    overflow: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    .kit-banner-collapse {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const KIT_STATUS_BANNER_CSS = `
  @keyframes kitErrorShake {
    0%,
    100% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(-6px);
    }
    40% {
      transform: translateX(5px);
    }
    60% {
      transform: translateX(-3px);
    }
    80% {
      transform: translateX(2px);
    }
  }

  .kit-status-banner {
    padding: 12px 16px;
    border-radius: var(--kit-radius-sm);
    font-size: 0.875rem;
    font-weight: 600;
    border: 1px solid var(--kit-outline-variant);
    background: var(--kit-surface-container-high);
    color: var(--kit-on-surface);
    animation: kitBannerIn 220ms var(--kit-ease-emphasized) both;
  }

  .kit-status-banner.variant-error {
    background: var(--kit-danger-subtle);
    border-color: var(--kit-danger-border);
    color: var(--kit-danger);
    animation:
      kitBannerIn 200ms var(--kit-ease-emphasized) both,
      kitErrorShake 360ms var(--kit-ease-standard) both;
  }

  .kit-status-banner.variant-success {
    background: var(--kit-success-subtle);
    border-color: var(--kit-success-border);
    color: var(--kit-success);
  }

  .kit-status-banner.variant-warning {
    background: var(--kit-warning-subtle);
    border-color: var(--kit-warning-border);
    color: var(--kit-warning);
  }

  .kit-status-banner.closing,
  .kit-status-banner.variant-error.closing {
    animation: kitBannerOut 200ms
      var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)) forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    .kit-status-banner {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

/**
 * Header-friendly sync pill that morphs from a spinning indicator into a
 * checkmark confirmation before lingering briefly and fading out.
 */
@Component({
  selector: 'kit-sync-indicator',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      @keyframes kitSyncSpin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes kitSyncPopIn {
        from {
          opacity: 0;
          transform: translateY(-4px) scale(0.92);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes kitCheckDraw {
        from {
          stroke-dashoffset: 24;
        }
        to {
          stroke-dashoffset: 0;
        }
      }

      .kit-sync-indicator {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 11px;
        border-radius: var(--kit-radius-full);
        font-size: 0.78rem;
        font-weight: 600;
        border: 1px solid var(--kit-outline-variant);
        background: var(--kit-surface-container-high);
        color: var(--kit-on-surface-variant);
        animation: kitSyncPopIn 200ms var(--kit-ease-spring) both;
      }

      .kit-sync-indicator.saving {
        border-color: var(--kit-primary);
        color: var(--kit-primary);
        background: var(--kit-primary-container);
      }

      .kit-sync-indicator.saved {
        border-color: var(--kit-success-border);
        color: var(--kit-success);
        background: var(--kit-success-subtle);
      }

      .kit-sync-spinner {
        animation: kitSyncSpin 0.85s linear infinite;
      }

      .kit-sync-check path {
        stroke-dasharray: 24;
        animation: kitCheckDraw 240ms var(--kit-ease-emphasized) both;
      }

      @media (prefers-reduced-motion: reduce) {
        .kit-sync-indicator,
        .kit-sync-indicator * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `,
  ],
  template: `
    @if (phase() !== 'idle') {
      <div
        class="kit-sync-indicator"
        [class.saving]="phase() === 'saving'"
        [class.saved]="phase() === 'saved'"
        aria-live="polite"
      >
        @if (phase() === 'saving') {
          <svg
            class="kit-sync-spinner"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" opacity="0.25" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke-linecap="round" />
          </svg>
          <span>{{ savingLabel() }}</span>
        } @else {
          <svg
            class="kit-sync-check"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          <span>{{ savedLabel() }}</span>
        }
      </div>
    }
  `,
})
export class KitSyncIndicatorComponent implements OnDestroy {
  readonly isSaving = input<boolean>(false);
  readonly savingLabel = input<string>('Saving...');
  readonly savedLabel = input<string>('Saved');
  readonly lingerMs = input<number>(1400);

  readonly phase = signal<KitSyncPhase>('idle');

  private wasSaving = false;
  private lingerTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    try {
      effect(() => {
        this.updateSavingState(this.isSaving());
      });
    } catch {
      // Allow plain unit-test instantiation outside an Angular injector context
    }
  }

  updateSavingState(saving: boolean): void {
    if (saving) {
      this.clearLingerTimer();
      this.wasSaving = true;
      this.phase.set('saving');
    } else if (this.wasSaving) {
      this.wasSaving = false;
      this.phase.set('saved');
      this.clearLingerTimer();
      const delay = Math.max(0, this.lingerMs());
      this.lingerTimer = setTimeout(() => {
        this.lingerTimer = null;
        this.phase.set('idle');
      }, delay);
    }
  }

  ngOnDestroy(): void {
    this.clearLingerTimer();
  }

  private clearLingerTimer(): void {
    if (this.lingerTimer) {
      clearTimeout(this.lingerTimer);
      this.lingerTimer = null;
    }
  }
}

export type KitStatusBannerVariant = 'error' | 'success' | 'info' | 'warning';

/**
 * Animated inline status/alert banner with directional entrance, height collapse,
 * and exit animation on dismissal, plus a subtle horizontal shake on error feedback.
 */
@Component({
  selector: 'kit-status-banner',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [KIT_BANNER_COLLAPSE_CSS, KIT_STATUS_BANNER_CSS],
  template: `
    @if (effectiveMessage(); as activeMessage) {
      <div class="kit-banner-collapse" [class.closing]="isClosing()">
        <div class="kit-banner-collapse-inner">
          <div
            class="kit-status-banner"
            [class]="
              'kit-status-banner variant-' +
              variant() +
              (isClosing() ? ' closing' : '')
            "
            [attr.role]="variant() === 'error' ? 'alert' : 'status'"
            aria-live="polite"
          >
            <span class="kit-status-banner-text">{{ activeMessage }}</span>
          </div>
        </div>
      </div>
    }
  `,
})
export class KitStatusBannerComponent implements OnDestroy {
  readonly message = input<string | null | undefined>(null);
  readonly variant = input<KitStatusBannerVariant>('info');
  readonly exitDurationMs = input<number>(220);

  readonly displayedMessage = signal<string | null>(null);
  readonly isClosing = signal<boolean>(false);
  readonly effectiveMessage = computed(
    () => this.message() || this.displayedMessage(),
  );

  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    try {
      effect(() => {
        this.syncMessageState(this.message());
      });
    } catch {
      // Allow plain unit-test instantiation outside an Angular injector context
    }
  }

  syncMessageState(msg: string | null | undefined): void {
    if (msg) {
      this.clearCloseTimer();
      this.isClosing.set(false);
      this.displayedMessage.set(msg);
      return;
    }

    if (this.displayedMessage()) {
      const duration = Math.max(0, this.exitDurationMs());
      if (canAnimateKitBannerExit() && duration > 0) {
        if (!this.isClosing()) {
          this.isClosing.set(true);
          this.clearCloseTimer();
          this.closeTimer = setTimeout(() => {
            this.closeTimer = null;
            this.isClosing.set(false);
            this.displayedMessage.set(null);
          }, duration);
        }
      } else {
        this.clearCloseTimer();
        this.isClosing.set(false);
        this.displayedMessage.set(null);
      }
    }
  }

  ngOnDestroy(): void {
    this.clearCloseTimer();
  }

  private clearCloseTimer(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }
}

export type KitDegradedMode = 'offline' | 'backup' | null;

export function formatKitDegradedTimestamp(
  value: string | Date | null | undefined,
): string | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return typeof value === 'string' && value.trim() ? value.trim() : null;
  }
  try {
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return date.toISOString();
  }
}

/**
 * Shared read-only warning banner displayed when the app is running against an
 * R2 backup snapshot (due to D1 read quota exhaustion) or offline cached data,
 * with smooth appearing and disappearing animations.
 */
@Component({
  selector: 'kit-degraded-banner',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    KIT_BANNER_COLLAPSE_CSS,
    KIT_STATUS_BANNER_CSS,
    `
      .kit-degraded-banner {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px 12px;
        margin-bottom: 16px;
        line-height: 1.4;
      }

      .kit-degraded-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-weight: 700;
        white-space: nowrap;
      }

      .kit-degraded-message {
        font-weight: 500;
      }
    `,
  ],
  template: `
    @if (effectiveMode(); as activeMode) {
      <div class="kit-banner-collapse" [class.closing]="isClosing()">
        <div class="kit-banner-collapse-inner">
          <div
            class="kit-status-banner variant-warning kit-degraded-banner"
            [class.closing]="isClosing()"
            data-testid="kit-degraded-banner"
            role="status"
            aria-live="polite"
          >
            <span class="kit-degraded-badge">
              {{
                activeMode === 'backup'
                  ? '⚠️ Read-Only Backup Mode'
                  : '⚠️ Offline Read-Only Mode'
              }}
            </span>
            <span class="kit-degraded-message">{{ resolvedMessage() }}</span>
          </div>
        </div>
      </div>
    }
  `,
})
export class KitDegradedBannerComponent implements OnDestroy {
  readonly mode = input<KitDegradedMode>(null);
  readonly snapshotTimestamp = input<string | Date | null | undefined>(null);
  readonly customMessage = input<string | null | undefined>(null);
  readonly exitDurationMs = input<number>(220);

  readonly displayedMode = signal<KitDegradedMode>(null);
  readonly displayedMessage = signal<string>('');
  readonly isClosing = signal<boolean>(false);

  readonly effectiveMode = computed<KitDegradedMode>(
    () => this.mode() ?? this.displayedMode(),
  );

  readonly resolvedMessage = computed(() => {
    const custom = this.customMessage()?.trim();
    if (custom) return custom;

    const activeMode = this.effectiveMode();
    const ts = formatKitDegradedTimestamp(this.snapshotTimestamp());
    if (activeMode === 'backup') {
      const fromPart = ts ? ` from ${ts}` : '';
      return `Database read quota is temporarily exhausted. Showing backup snapshot${fromPart}. Editing is disabled until service resumes.`;
    }
    if (activeMode === 'offline') {
      const syncedPart = ts ? ` (last synced ${ts})` : '';
      return `Showing locally cached data${syncedPart}. Editing is disabled until connection is restored.`;
    }
    return this.displayedMessage();
  });

  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    try {
      effect(() => {
        this.syncModeState(this.mode());
      });
    } catch {
      // Allow plain unit-test instantiation outside an Angular injector context
    }
  }

  syncModeState(nextMode: KitDegradedMode): void {
    if (nextMode !== null) {
      this.clearCloseTimer();
      this.isClosing.set(false);
      this.displayedMode.set(nextMode);
      this.displayedMessage.set(untracked(() => this.resolvedMessage()));
      return;
    }

    if (this.displayedMode() !== null) {
      const duration = Math.max(0, this.exitDurationMs());
      if (canAnimateKitBannerExit() && duration > 0) {
        if (!this.isClosing()) {
          this.isClosing.set(true);
          this.clearCloseTimer();
          this.closeTimer = setTimeout(() => {
            this.closeTimer = null;
            this.isClosing.set(false);
            this.displayedMode.set(null);
            this.displayedMessage.set('');
          }, duration);
        }
      } else {
        this.clearCloseTimer();
        this.isClosing.set(false);
        this.displayedMode.set(null);
        this.displayedMessage.set('');
      }
    }
  }

  ngOnDestroy(): void {
    this.clearCloseTimer();
  }

  private clearCloseTimer(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }
}

/**
 * Shared animated loading/sync progress banner with pulsing status indicator,
 * optional determinate progress track, and smooth appear/disappear animations.
 */
@Component({
  selector: 'kit-loading-banner',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    KIT_BANNER_COLLAPSE_CSS,
    `
      @keyframes kitLoadingBannerPulse {
        0%,
        100% {
          opacity: 0.45;
        }
        50% {
          opacity: 1;
        }
      }

      .kit-loading-banner {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        margin-bottom: 0.75rem;
        padding: 0.5rem 0.875rem;
        background: var(--kit-surface-container-high);
        border: 1px solid var(--kit-outline-variant);
        border-radius: var(--kit-radius-md);
        font-size: 0.8125rem;
        color: var(--kit-on-surface-variant);
        animation: kitBannerIn 220ms var(--kit-ease-emphasized) both;
      }

      .kit-loading-banner.closing {
        animation: kitBannerOut 200ms
          var(--kit-ease-exit, cubic-bezier(0.4, 0, 1, 1)) forwards;
      }

      .kit-loading-banner-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .kit-loading-banner-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--kit-primary);
        flex-shrink: 0;
        animation: kitLoadingBannerPulse 1.4s ease-in-out infinite;
      }

      .kit-loading-banner-track {
        width: 100%;
        height: 4px;
        border-radius: var(--kit-radius-full);
        background: var(--kit-surface-container-highest);
        overflow: hidden;
      }

      .kit-loading-banner-fill {
        height: 100%;
        border-radius: var(--kit-radius-full);
        background: var(--kit-primary);
        transition: width 180ms ease-out;
      }

      @media (prefers-reduced-motion: reduce) {
        .kit-loading-banner,
        .kit-loading-banner * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `,
  ],
  template: `
    @if (shouldShow()) {
      <div class="kit-banner-collapse" [class.closing]="isClosing()">
        <div class="kit-banner-collapse-inner">
          <div
            class="kit-loading-banner catalog-sync-banner"
            [class.closing]="isClosing()"
            [attr.data-testid]="testId() || null"
            role="status"
            aria-live="polite"
          >
            <div class="kit-loading-banner-info catalog-sync-info">
              <span
                class="kit-loading-banner-dot catalog-sync-dot"
                aria-hidden="true"
              ></span>
              <span class="kit-loading-banner-text">
                @if (effectiveMessage()) {
                  {{ effectiveMessage() }}
                }
                <ng-content />
              </span>
            </div>
            @if (showProgress() && effectivePercent() !== null) {
              <div
                class="kit-loading-banner-track catalog-sync-track"
                aria-hidden="true"
              >
                <div
                  class="kit-loading-banner-fill catalog-sync-fill"
                  [style.width.%]="effectivePercent()"
                ></div>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `,
})
export class KitLoadingBannerComponent implements OnDestroy {
  readonly active = input<boolean>(false);
  readonly message = input<string>('');
  readonly percent = input<number | null | undefined>(null);
  readonly showProgress = input<boolean>(true);
  readonly testId = input<string>('kit-loading-banner');
  readonly exitDurationMs = input<number>(220);

  readonly isRendered = signal<boolean>(false);
  readonly isClosing = signal<boolean>(false);
  readonly lastMessage = signal<string>('');
  readonly lastPercent = signal<number | null>(null);

  readonly shouldShow = computed(() => this.active() || this.isRendered());
  readonly effectiveMessage = computed(() =>
    this.isClosing()
      ? this.lastMessage() || this.message()
      : this.message() || this.lastMessage(),
  );
  readonly effectivePercent = computed(() => {
    const p = this.isClosing()
      ? (this.lastPercent() ?? this.percent())
      : (this.percent() ?? this.lastPercent());
    if (typeof p === 'number' && Number.isFinite(p)) {
      return Math.max(0, Math.min(100, p));
    }
    return null;
  });

  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    try {
      effect(() => {
        this.syncActiveState(this.active(), this.message(), this.percent());
      });
    } catch {
      // Allow plain unit-test instantiation outside an Angular injector context
    }
  }

  syncActiveState(isActive: boolean, msg?: string, pct?: number | null): void {
    if (isActive) {
      this.clearCloseTimer();
      this.isClosing.set(false);
      this.isRendered.set(true);
      if (msg !== undefined) {
        this.lastMessage.set(msg);
      }
      if (pct !== undefined) {
        this.lastPercent.set(
          typeof pct === 'number' && Number.isFinite(pct)
            ? Math.max(0, Math.min(100, pct))
            : null,
        );
      }
      return;
    }

    if (this.isRendered()) {
      const duration = Math.max(0, this.exitDurationMs());
      if (canAnimateKitBannerExit() && duration > 0) {
        if (!this.isClosing()) {
          this.isClosing.set(true);
          this.clearCloseTimer();
          this.closeTimer = setTimeout(() => {
            this.closeTimer = null;
            this.isClosing.set(false);
            this.isRendered.set(false);
          }, duration);
        }
      } else {
        this.clearCloseTimer();
        this.isClosing.set(false);
        this.isRendered.set(false);
      }
    }
  }

  ngOnDestroy(): void {
    this.clearCloseTimer();
  }

  private clearCloseTimer(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }
}
