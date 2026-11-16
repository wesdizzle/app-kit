import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { BottomSheetDragController } from './bottom-sheet-drag.js';
import { isKitReducedMotionPreferred } from './theme.service.js';

export function canAnimateKitDialogExit(
  dialog?: HTMLDialogElement | null,
): boolean {
  if (!dialog?.open || isKitReducedMotionPreferred()) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  );
}

/**
 * Shared accessible modal & mobile bottom-sheet wrapper built on native `<dialog>`.
 * Coordinates desktop spring-pop entrance, mobile bottom-sheet slide-up,
 * velocity-aware drag-to-dismiss, and non-blocking `.closing` exit animations.
 */
@Component({
  selector: 'kit-dialog-sheet',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog
      #dialogEl
      class="kit-dialog-sheet"
      [class.closing]="isClosing()"
      [attr.aria-labelledby]="ariaLabelledby() || null"
      [attr.aria-label]="ariaLabel() || null"
      (click)="onBackdropClick($event)"
      (cancel)="onDialogCancel($event)"
    >
      <div
        class="kit-dialog-sheet-panel"
        [class]="panelClass()"
        [class.dragging]="dragController.isDragging()"
        [style.max-width]="maxWidth()"
        [style.transform]="
          dragController.effectiveTransformY() !== 0
            ? 'translateY(' + dragController.effectiveTransformY() + 'px)'
            : null
        "
        [style.transition]="
          dragController.isDragging()
            ? 'none'
            : 'transform var(--kit-duration-medium, 260ms) var(--kit-ease-smooth, cubic-bezier(0.22, 1, 0.36, 1))'
        "
        (click)="$event.stopPropagation()"
        (touchstart)="dragController.onTouchStart($event)"
        (touchmove)="dragController.onTouchMove($event)"
        (touchend)="dragController.onTouchEnd(dismissFromDrag)"
        (touchcancel)="dragController.reset()"
      >
        @if (showHandle()) {
          <div class="sheet-drag-area" aria-hidden="true">
            <div class="sheet-handle"></div>
          </div>
        }
        <ng-content />
      </div>
    </dialog>
  `,
})
export class KitDialogSheetComponent implements OnDestroy {
  @ViewChild('dialogEl') dialogEl?: ElementRef<HTMLDialogElement>;

  readonly isOpen = input<boolean>(true);
  readonly ariaLabelledby = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly maxWidth = input<string>('500px');
  readonly showHandle = input<boolean>(true);
  readonly panelClass = input<string>('');
  readonly closeDurationMs = input<number>(170);

  readonly closed = output<void>();

  readonly isClosing = signal(false);
  readonly dragController = new BottomSheetDragController();
  readonly dismissFromDrag = (): void => this.requestClose();

  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      const open = this.isOpen();
      queueMicrotask(() => {
        const dialog = this.dialogEl?.nativeElement;
        if (!dialog) return;
        if (open) {
          this.clearCloseTimer();
          this.isClosing.set(false);
          if (!dialog.open && typeof dialog.showModal === 'function') {
            try {
              dialog.showModal();
            } catch {
              dialog.setAttribute('open', '');
            }
          } else if (!dialog.open) {
            dialog.setAttribute('open', '');
          }
        } else if (dialog.open) {
          this.finalizeClose();
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.clearCloseTimer();
    const dialog = this.dialogEl?.nativeElement;
    if (dialog?.open && typeof dialog.close === 'function') {
      try {
        dialog.close();
      } catch {
        // Ignore teardown errors in synthetic DOMs
      }
    }
  }

  requestClose(): void {
    this.dragController.reset();
    if (this.isClosing()) return;
    const dialog = this.dialogEl?.nativeElement;
    if (canAnimateKitDialogExit(dialog)) {
      this.isClosing.set(true);
      this.clearCloseTimer();
      this.closeTimer = setTimeout(() => {
        this.closeTimer = null;
        this.finalizeClose();
        this.closed.emit();
      }, this.closeDurationMs());
      return;
    }
    this.finalizeClose();
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === this.dialogEl?.nativeElement) {
      this.requestClose();
    }
  }

  onDialogCancel(event: Event): void {
    event.preventDefault();
    this.requestClose();
  }

  private finalizeClose(): void {
    this.isClosing.set(false);
    const dialog = this.dialogEl?.nativeElement;
    if (!dialog) return;
    if (dialog.open && typeof dialog.close === 'function') {
      try {
        dialog.close();
      } catch {
        dialog.removeAttribute('open');
      }
    } else {
      dialog.removeAttribute('open');
    }
  }

  private clearCloseTimer(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }
}
