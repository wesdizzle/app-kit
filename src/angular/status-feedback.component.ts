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

/**
 * Header-friendly sync pill that morphs from a spinning indicator into a
 * checkmark confirmation before lingering briefly and fading out.
 */
@Component({
  selector: 'kit-sync-indicator',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
