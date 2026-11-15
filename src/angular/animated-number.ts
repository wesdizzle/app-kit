import { Injector, Signal, effect, signal, untracked } from '@angular/core';
import { isKitReducedMotionPreferred } from './theme.service.js';

export function interpolateNumber(
  from: number,
  to: number,
  progress: number,
  decimals = 0,
): number {
  const clamped = Math.max(0, Math.min(1, progress));
  const eased = 1 - Math.pow(1 - clamped, 3);
  const raw = from + (to - from) * eased;
  const factor = Math.pow(10, Math.max(0, decimals));
  return Math.round(raw * factor) / factor;
}

export interface KitAnimatedNumberOptions {
  durationMs?: number;
  decimals?: number;
  injector?: Injector;
}

/**
 * Smoothly interpolates numeric signal changes over `requestAnimationFrame`
 * in motion-enabled browser environments while updating synchronously in
 * `prefers-reduced-motion: reduce` and non-browser/test environments.
 */
export function createAnimatedNumber(
  source: Signal<number>,
  options?: KitAnimatedNumberOptions,
): Signal<number> {
  const durationMs = Math.max(0, options?.durationMs ?? 380);
  const decimals = Math.max(0, options?.decimals ?? 0);
  const initial = Number.isFinite(source()) ? source() : 0;
  const display = signal<number>(initial);

  try {
    effect(
      (onCleanup) => {
        const target = Number.isFinite(source()) ? source() : 0;
        const startValue = untracked(() => display());
        const canAnimate =
          durationMs > 0 &&
          typeof window !== 'undefined' &&
          typeof window.requestAnimationFrame === 'function' &&
          typeof window.matchMedia === 'function' &&
          window.matchMedia('(prefers-reduced-motion: no-preference)')
            .matches &&
          !isKitReducedMotionPreferred();

        if (!canAnimate || startValue === target) {
          display.set(target);
          return;
        }

        const startTime =
          typeof performance !== 'undefined' &&
          typeof performance.now === 'function'
            ? performance.now()
            : Date.now();
        let rafId = 0;

        const step = (now: number): void => {
          const elapsed = Math.max(0, now - startTime);
          const progress = Math.min(1, elapsed / durationMs);
          display.set(
            interpolateNumber(startValue, target, progress, decimals),
          );
          if (progress < 1) {
            rafId = window.requestAnimationFrame(step);
          } else {
            display.set(target);
          }
        };

        rafId = window.requestAnimationFrame(step);
        onCleanup(() => {
          if (rafId && typeof window.cancelAnimationFrame === 'function') {
            window.cancelAnimationFrame(rafId);
          }
        });
      },
      options?.injector ? { injector: options.injector } : undefined,
    );
  } catch {
    return source;
  }

  return display.asReadonly();
}
