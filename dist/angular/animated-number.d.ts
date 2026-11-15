import { Injector, Signal } from '@angular/core';
export declare function interpolateNumber(from: number, to: number, progress: number, decimals?: number): number;
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
export declare function createAnimatedNumber(source: Signal<number>, options?: KitAnimatedNumberOptions): Signal<number>;
