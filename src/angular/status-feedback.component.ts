import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewEncapsulation,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';

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
 * Animated inline status/alert banner with directional entrance and a subtle
 * horizontal shake on error feedback.
 */
@Component({
  selector: 'kit-status-banner',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (message()) {
      <div
        class="kit-status-banner"
        [class]="'kit-status-banner variant-' + variant()"
        [attr.role]="variant() === 'error' ? 'alert' : 'status'"
        aria-live="polite"
      >
        <span class="kit-status-banner-text">{{ message() }}</span>
      </div>
    }
  `,
})
export class KitStatusBannerComponent {
  readonly message = input<string | null | undefined>(null);
  readonly variant = input<KitStatusBannerVariant>('info');
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
 * R2 backup snapshot (due to D1 read quota exhaustion) or offline cached data.
 */
@Component({
  selector: 'kit-degraded-banner',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (mode(); as activeMode) {
      <div
        class="kit-status-banner variant-warning kit-degraded-banner"
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
    }
  `,
})
export class KitDegradedBannerComponent {
  readonly mode = input<KitDegradedMode>(null);
  readonly snapshotTimestamp = input<string | Date | null | undefined>(null);
  readonly customMessage = input<string | null | undefined>(null);

  readonly resolvedMessage = computed(() => {
    const custom = this.customMessage()?.trim();
    if (custom) return custom;

    const activeMode = this.mode();
    const ts = formatKitDegradedTimestamp(this.snapshotTimestamp());
    if (activeMode === 'backup') {
      const fromPart = ts ? ` from ${ts}` : '';
      return `Database read quota is temporarily exhausted. Showing backup snapshot${fromPart}. Editing is disabled until service resumes.`;
    }
    if (activeMode === 'offline') {
      const syncedPart = ts ? ` (last synced ${ts})` : '';
      return `Showing locally cached data${syncedPart}. Editing is disabled until connection is restored.`;
    }
    return '';
  });
}
