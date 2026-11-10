import { computed, signal } from '@angular/core';
const INTERACTIVE_SELECTOR = 'button, a, input, select, textarea, [role="button"]';
const DRAG_ZONE_SELECTOR = '.sheet-drag-area, .sheet-handle, .modal-header';
/**
 * Reusable touch-drag controller for mobile bottom-sheet modals.
 * Allows dragging down from anywhere on the full top bar (`.sheet-drag-area`,
 * `.sheet-handle`, or `.modal-header`, including embedded subview headers),
 * while ignoring touches that start on interactive controls like Close or Back buttons.
 */
export class BottomSheetDragController {
    constructor(dismissThresholdPx = 90) {
        this.dismissThresholdPx = dismissThresholdPx;
        this.touchStartY = 0;
        this.dragOffsetY = signal(0, ...(ngDevMode ? [{ debugName: "dragOffsetY" }] : /* istanbul ignore next */ []));
        this.isDragging = signal(false, ...(ngDevMode ? [{ debugName: "isDragging" }] : /* istanbul ignore next */ []));
        this.effectiveTransformY = computed(() => Math.max(0, this.dragOffsetY()), ...(ngDevMode ? [{ debugName: "effectiveTransformY" }] : /* istanbul ignore next */ []));
    }
    onTouchStart(event) {
        if (!event.touches || event.touches.length !== 1)
            return;
        const target = event.target;
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
    onTouchMove(event) {
        if (!this.isDragging() || !event.touches || event.touches.length !== 1) {
            return;
        }
        const deltaY = event.touches[0].clientY - this.touchStartY;
        if (deltaY > 0) {
            this.dragOffsetY.set(deltaY);
        }
        else {
            this.dragOffsetY.set(0);
        }
    }
    onTouchEnd(onDismiss) {
        if (!this.isDragging())
            return;
        const finalOffset = this.dragOffsetY();
        this.isDragging.set(false);
        if (finalOffset > this.dismissThresholdPx) {
            this.dragOffsetY.set(0);
            onDismiss();
        }
        else {
            this.dragOffsetY.set(0);
        }
    }
    reset() {
        this.dragOffsetY.set(0);
        this.isDragging.set(false);
    }
}
