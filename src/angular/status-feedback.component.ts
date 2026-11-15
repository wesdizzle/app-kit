import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewEncapsulation,
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
