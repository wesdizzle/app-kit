/**
 * Reusable touch-drag controller for mobile bottom-sheet modals.
 * Supports distance and downward flick-velocity dismissal as well as
 * damped upward rubber-banding, while ignoring interactive header controls.
 */
export declare class BottomSheetDragController {
    private readonly dismissThresholdPx;
    private readonly velocityThresholdPxPerMs;
    private touchStartY;
    private touchStartTime;
    private lastTouchY;
    private lastTouchTime;
    private velocityY;
    readonly dragOffsetY: import("@angular/core").WritableSignal<number>;
    readonly isDragging: import("@angular/core").WritableSignal<boolean>;
    readonly effectiveTransformY: import("@angular/core").Signal<number>;
    constructor(dismissThresholdPx?: number, velocityThresholdPxPerMs?: number);
    onTouchStart(event: TouchEvent): void;
    onTouchMove(event: TouchEvent): void;
    onTouchEnd(onDismiss: () => void): void;
    reset(): void;
}
