/**
 * Reusable touch-drag controller for mobile bottom-sheet modals.
 * Allows dragging down from anywhere on the full top bar (`.sheet-drag-area`,
 * `.sheet-handle`, or `.modal-header`, including embedded subview headers),
 * while ignoring touches that start on interactive controls like Close or Back buttons.
 */
export declare class BottomSheetDragController {
    private readonly dismissThresholdPx;
    private touchStartY;
    readonly dragOffsetY: import("@angular/core").WritableSignal<number>;
    readonly isDragging: import("@angular/core").WritableSignal<boolean>;
    readonly effectiveTransformY: import("@angular/core").Signal<number>;
    constructor(dismissThresholdPx?: number);
    onTouchStart(event: TouchEvent): void;
    onTouchMove(event: TouchEvent): void;
    onTouchEnd(onDismiss: () => void): void;
    reset(): void;
}
