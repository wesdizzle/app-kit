import { computed, signal } from '@angular/core';
const INTERACTIVE_SELECTOR = 'button, a, input, select, textarea, [role="button"]';
const DRAG_ZONE_SELECTOR = '.sheet-drag-area, .sheet-handle, .modal-header';
function getTimestamp() {
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
    constructor(dismissThresholdPx = 90, velocityThresholdPxPerMs = 0.55) {
        this.dismissThresholdPx = dismissThresholdPx;
        this.velocityThresholdPxPerMs = velocityThresholdPxPerMs;
        this.touchStartY = 0;
        this.touchStartTime = 0;
        this.lastTouchY = 0;
        this.lastTouchTime = 0;
        this.velocityY = 0;
        this.lastMoveDirectionY = 0;
        this.maxDragOffsetY = 0;
        this.dragOffsetY = signal(0, ...(ngDevMode ? [{ debugName: "dragOffsetY" }] : /* istanbul ignore next */ []));
        this.isDragging = signal(false, ...(ngDevMode ? [{ debugName: "isDragging" }] : /* istanbul ignore next */ []));
        this.effectiveTransformY = computed(() => this.dragOffsetY(), ...(ngDevMode ? [{ debugName: "effectiveTransformY" }] : /* istanbul ignore next */ []));
    }
    onTouchStart(event) {
        if (!event.touches || event.touches.length !== 1)
            return;
        const rawTarget = event.target;
        const target = rawTarget &&
            'closest' in rawTarget &&
            typeof rawTarget.closest === 'function'
            ? rawTarget
            : (rawTarget?.parentElement ?? null);
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
        this.lastMoveDirectionY = 0;
        this.maxDragOffsetY = 0;
        this.isDragging.set(true);
    }
    onTouchMove(event) {
        if (!this.isDragging() || !event.touches || event.touches.length !== 1) {
            return;
        }
        const now = getTimestamp();
        const currentY = event.touches[0].clientY;
        const dy = currentY - this.lastTouchY;
        const dt = Math.max(1, now - this.lastTouchTime);
        if (dy !== 0) {
            this.velocityY = dy / dt;
            this.lastMoveDirectionY = Math.sign(dy);
            this.lastTouchY = currentY;
            this.lastTouchTime = now;
        }
        const deltaY = currentY - this.touchStartY;
        if (deltaY > 0) {
            this.maxDragOffsetY = Math.max(this.maxDragOffsetY, deltaY);
            this.dragOffsetY.set(deltaY);
        }
        else if (deltaY < 0) {
            const damped = -Math.min(28, Math.round(Math.sqrt(Math.abs(deltaY)) * 3.5));
            this.dragOffsetY.set(damped);
        }
        else {
            this.dragOffsetY.set(0);
        }
    }
    onTouchEnd(onDismiss) {
        if (!this.isDragging())
            return;
        const finalOffset = this.dragOffsetY();
        const now = getTimestamp();
        const isMovingUpward = this.velocityY < 0 ||
            this.lastMoveDirectionY < 0 ||
            (this.maxDragOffsetY > 0 && finalOffset < this.maxDragOffsetY - 8);
        const isRecentDownwardFlick = !isMovingUpward &&
            now - this.lastTouchTime <= 120 &&
            this.velocityY >= this.velocityThresholdPxPerMs;
        const shouldDismiss = !isMovingUpward &&
            (finalOffset > this.dismissThresholdPx ||
                (finalOffset > 24 && isRecentDownwardFlick));
        this.isDragging.set(false);
        this.dragOffsetY.set(0);
        this.velocityY = 0;
        this.lastMoveDirectionY = 0;
        this.maxDragOffsetY = 0;
        if (shouldDismiss) {
            onDismiss();
        }
    }
    reset() {
        this.dragOffsetY.set(0);
        this.isDragging.set(false);
        this.velocityY = 0;
        this.lastMoveDirectionY = 0;
        this.maxDragOffsetY = 0;
    }
}
