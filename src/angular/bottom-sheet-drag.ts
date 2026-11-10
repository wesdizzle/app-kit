import { computed, signal } from '@angular/core';

const INTERACTIVE_SELECTOR =
  'button, a, input, select, textarea, [role="button"]';
const DRAG_ZONE_SELECTOR = '.sheet-drag-area, .sheet-handle, .modal-header';

/**
 * Reusable touch-drag controller for mobile bottom-sheet modals.
 * Allows dragging down from anywhere on the full top bar (`.sheet-drag-area`,
 * `.sheet-handle`, or `.modal-header`, including embedded subview headers),
 * while ignoring touches that start on interactive controls like Close or Back buttons.
 */
export class BottomSheetDragController {
  private touchStartY = 0;

  readonly dragOffsetY = signal(0);
  readonly isDragging = signal(false);
  readonly effectiveTransformY = computed(() => Math.max(0, this.dragOffsetY()));

  constructor(private readonly dismissThresholdPx = 90) {}

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

    this.touchStartY = event.touches[0].clientY;
    this.isDragging.set(true);
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging() || !event.touches || event.touches.length !== 1) {
      return;
    }
    const deltaY = event.touches[0].clientY - this.touchStartY;
    if (deltaY > 0) {
      this.dragOffsetY.set(deltaY);
    } else {
      this.dragOffsetY.set(0);
    }
  }

  onTouchEnd(onDismiss: () => void): void {
    if (!this.isDragging()) return;
    const finalOffset = this.dragOffsetY();
    this.isDragging.set(false);
    if (finalOffset > this.dismissThresholdPx) {
      this.dragOffsetY.set(0);
      onDismiss();
    } else {
      this.dragOffsetY.set(0);
    }
  }

  reset(): void {
    this.dragOffsetY.set(0);
    this.isDragging.set(false);
  }
}
