import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { KitIconComponent } from './icon.component.js';

let activeAudioEl: HTMLAudioElement | null = null;
let resetActiveAudioState: (() => void) | null = null;

export function canPlayKitAudioMime(mimeType: string): boolean {
  if (typeof Audio === 'undefined') {
    return false;
  }
  try {
    const probe = new Audio();
    if (typeof probe.canPlayType !== 'function') {
      return false;
    }
    return probe.canPlayType(mimeType) !== '';
  } catch {
    return false;
  }
}

export function stopActiveKitAudio(): void {
  if (activeAudioEl) {
    try {
      activeAudioEl.pause();
    } catch {
      // Ignore audio pause failures in non-browser stubs
    }
    activeAudioEl = null;
  }
  if (resetActiveAudioState) {
    const cb = resetActiveAudioState;
    resetActiveAudioState = null;
    cb();
  }
}

/**
 * Compact audio playback button with native MIME codec feature detection
 * (gracefully hidden on browsers like Safari/iOS when `.ogg` is unsupported)
 * and global single-clip coordination.
 */
@Component({
  selector: 'kit-audio-button',
  standalone: true,
  imports: [KitIconComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (src() && (isSupported() || !hideIfUnsupported())) {
      <button
        type="button"
        class="kit-audio-btn state-layer"
        [class.playing]="playState() === 'playing'"
        [class.loading]="playState() === 'loading'"
        [class.error]="playState() === 'error'"
        [disabled]="!isSupported()"
        [attr.aria-label]="ariaLabel() || label()"
        [attr.data-testid]="testId()"
        (click)="togglePlay()"
      >
        <kit-icon
          [name]="playState() === 'playing' ? 'square-stop' : 'volume'"
          [size]="15"
        />
        <span>{{
          playState() === 'playing'
            ? 'Stop'
            : playState() === 'loading'
              ? 'Loading...'
              : label()
        }}</span>
      </button>
    }
  `,
})
export class KitAudioButtonComponent {
  private readonly destroyRef = inject(DestroyRef, { optional: true });

  readonly src = input<string | null>(null);
  readonly mimeType = input<string>('audio/ogg');
  readonly label = input<string>('Play');
  readonly ariaLabel = input<string | null>(null);
  readonly hideIfUnsupported = input<boolean>(true);
  readonly testId = input<string | null>(null);

  readonly playState = signal<'idle' | 'loading' | 'playing' | 'error'>('idle');
  readonly isSupported = computed<boolean>(
    () => Boolean(this.src()) && canPlayKitAudioMime(this.mimeType()),
  );

  private ownedAudio: HTMLAudioElement | null = null;

  constructor() {
    this.destroyRef?.onDestroy(() => {
      if (this.ownedAudio && activeAudioEl === this.ownedAudio) {
        stopActiveKitAudio();
      }
      this.ownedAudio = null;
    });
  }

  togglePlay(): void {
    const sourceUrl = this.src();
    if (!sourceUrl || !this.isSupported() || typeof Audio === 'undefined') {
      return;
    }

    if (this.playState() === 'playing' && this.ownedAudio) {
      stopActiveKitAudio();
      return;
    }

    stopActiveKitAudio();

    try {
      const audio = new Audio(sourceUrl);
      this.ownedAudio = audio;
      activeAudioEl = audio;
      resetActiveAudioState = () => {
        if (this.ownedAudio === audio) {
          this.ownedAudio = null;
        }
        this.playState.set('idle');
      };

      this.playState.set('loading');
      audio.onplaying = () => {
        if (activeAudioEl === audio) {
          this.playState.set('playing');
        }
      };
      audio.onended = () => {
        if (activeAudioEl === audio) {
          stopActiveKitAudio();
        }
      };
      audio.onerror = () => {
        if (activeAudioEl === audio) {
          activeAudioEl = null;
          resetActiveAudioState = null;
        }
        this.ownedAudio = null;
        this.playState.set('error');
      };

      const playResult = audio.play();
      if (playResult && typeof playResult.then === 'function') {
        void playResult
          .then(() => {
            if (activeAudioEl === audio && this.playState() === 'loading') {
              this.playState.set('playing');
            }
          })
          .catch(() => {
            if (activeAudioEl === audio) {
              activeAudioEl = null;
              resetActiveAudioState = null;
            }
            this.ownedAudio = null;
            this.playState.set('error');
          });
      } else {
        this.playState.set('playing');
      }
    } catch {
      this.ownedAudio = null;
      this.playState.set('error');
    }
  }
}
