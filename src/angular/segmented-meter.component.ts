import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

export interface KitMeterSegment {
  id: string;
  label?: string;
  pct: number;
  color?: string;
  className?: string;
  title?: string;
}

/**
 * Multi-segment animated meter bar with `@starting-style` mount growth and
 * smooth width interpolation as percentages change.
 */
@Component({
  selector: 'kit-segmented-meter',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .kit-segmented-meter {
        display: block;
        width: 100%;
      }

      .kit-meter-track {
        display: flex;
        width: 100%;
        border-radius: var(--kit-radius-full);
        background: var(--kit-surface-container-low);
        border: 1px solid var(--kit-outline-variant);
        overflow: hidden;
      }

      .kit-meter-segment {
        height: 100%;
        transition: width 550ms var(--kit-ease-smooth);
      }

      @starting-style {
        .kit-meter-segment {
          width: 0% !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .kit-segmented-meter * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `,
  ],
  template: `
    <div
      class="kit-segmented-meter"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-valuenow]="totalPct()"
      [attr.aria-label]="ariaLabel()"
    >
      <div class="kit-meter-track" [style.height.px]="heightPx()">
        @for (seg of segments(); track seg.id) {
          <div
            class="kit-meter-segment"
            [class]="seg.className || ''"
            [style.width.%]="clampPct(seg.pct)"
            [style.background]="seg.color || null"
            [attr.title]="seg.title || seg.label || null"
          ></div>
        }
      </div>
    </div>
  `,
})
export class KitSegmentedMeterComponent {
  readonly segments = input.required<readonly KitMeterSegment[]>();
  readonly heightPx = input<number>(12);
  readonly ariaLabel = input<string>('Completion progress');

  readonly totalPct = computed(() => {
    const sum = this.segments().reduce(
      (acc, seg) => acc + this.clampPct(seg.pct),
      0,
    );
    return Math.min(100, Math.round(sum));
  });

  clampPct(val: number): number {
    if (!Number.isFinite(val)) return 0;
    return Math.max(0, Math.min(100, val));
  }
}
