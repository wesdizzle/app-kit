import { computed, signal } from '@angular/core';

const INTERACTIVE_SELECTOR =
  'button, a, input, select, textarea, [role="button"]';
const DRAG_ZONE_SELECTOR = '.sheet-drag-area, .sheet-handle, .modal-header';

function getTimestamp(): number {
  return typeof performance !== 'undefined' &&
    typeof performance.now === 'function'
    ? performance.now()
    : Date.now();
}

/**
 * Reusable touch-drag controller for mobile bottom-sheet modals.
 * Supports distance and downward flick-velocity dismissal as well as
 * damped upward rubber-banding, while ignoring interactive header controls.
 */
export class BottomSheetDragController {
  private touchStartY = 0;
  private touchStartTime = 0;
  private lastTouchY = 0;
  private lastTouchTime = 0;
  private velocityY = 0;

  readonly dragOffsetY = signal(0);
  readonly isDragging = signal(false);
  readonly effectiveTransformY = computed(() => this.dragOffsetY());

  constructor(
    private readonly dismissThresholdPx = 90,
    private readonly velocityThresholdPxPerMs = 0.55,
  ) {}

  onTouchStart(event: TouchEvent): void {
    if (!event.touches || event.touches.length !== 1) return;

    const target = event.target as Element | null | undefined;
    if (target && typeof target.closest === 'function') {
      if (target.closest(INTERACTIVE_SELECTOR)) {
        return;
      }
      if (!target.closest(DRAG_ZONE_SELECTOR)) {
        return;
      }
    }

    const now = getTimestamp();
    const y = event.touches[0].clientY;
    this.touchStartY = y;
    this.lastTouchY = y;
    this.touchStartTime = now;
    this.lastTouchTime = now;
    this.velocityY = 0;
    this.isDragging.set(true);
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging() || !event.touches || event.touches.length !== 1) {
      return;
    }
    const now = getTimestamp();
    const currentY = event.touches[0].clientY;
    const dt = Math.max(1, now - this.lastTouchTime);
    this.velocityY = (currentY - this.lastTouchY) / dt;
    this.lastTouchY = currentY;
    this.lastTouchTime = now;

    const deltaY = currentY - this.touchStartY;
    if (deltaY > 0) {
      this.dragOffsetY.set(deltaY);
    } else if (deltaY < 0) {
      const damped = -Math.min(
        28,
        Math.round(Math.sqrt(Math.abs(deltaY)) * 3.5),
      );
      this.dragOffsetY.set(damped);
    } else {
      this.dragOffsetY.set(0);
    }
  }

  onTouchEnd(onDismiss: () => void): void {
    if (!this.isDragging()) return;
    const finalOffset = this.dragOffsetY();
    const totalDt = Math.max(1, getTimestamp() - this.touchStartTime);
    const averageVelocity = finalOffset / totalDt;
    const flickVelocity = Math.max(this.velocityY, averageVelocity);
    const shouldDismiss =
      finalOffset > this.dismissThresholdPx ||
      (finalOffset > 24 && flickVelocity >= this.velocityThresholdPxPerMs);

    this.isDragging.set(false);
    this.dragOffsetY.set(0);
    this.velocityY = 0;

    if (shouldDismiss) {
      onDismiss();
    }
  }

  reset(): void {
    this.dragOffsetY.set(0);
    this.isDragging.set(false);
    this.velocityY = 0;
  }
}
