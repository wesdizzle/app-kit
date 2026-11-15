import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { KitThemeMode, KitThemeService } from './theme.service.js';

/**
 * Shared accessible theme toggle button cycling `light -> dark -> auto`
 * with a spring icon morph transition on state changes.
 * Accepts an explicit `[theme]` input (for controlled parents like `<kit-header-bar>`)
 * or operates directly against `KitThemeService` when used standalone.
 */
@Component({
  selector: 'kit-theme-toggle',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="kit-theme-toggle"
      [class]="buttonClass()"
      (click)="onToggle()"
      [title]="'Theme: ' + effectiveTheme()"
      [attr.aria-label]="
        'Toggle color theme (current: ' + effectiveTheme() + ')'
      "
      [attr.data-testid]="testId()"
    >
      @switch (effectiveTheme()) {
        @case ('light') {
          <svg
            class="kit-theme-icon"
            viewBox="0 0 24 24"
            [attr.width]="iconSize()"
            [attr.height]="iconSize()"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />
            <line
              x1="12"
              y1="1"
              x2="12"
              y2="3"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="12"
              y1="21"
              x2="12"
              y2="23"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="4.22"
              y1="4.22"
              x2="5.64"
              y2="5.64"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="18.36"
              y1="18.36"
              x2="19.78"
              y2="19.78"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="1"
              y1="12"
              x2="3"
              y2="12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="21"
              y1="12"
              x2="23"
              y2="12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="4.22"
              y1="19.78"
              x2="5.64"
              y2="18.36"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="18.36"
              y1="5.64"
              x2="19.78"
              y2="4.22"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        }
        @case ('dark') {
          <svg
            class="kit-theme-icon"
            viewBox="0 0 24 24"
            [attr.width]="iconSize()"
            [attr.height]="iconSize()"
            aria-hidden="true"
          >
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
        @default {
          <svg
            class="kit-theme-icon"
            viewBox="0 0 24 24"
            [attr.width]="iconSize()"
            [attr.height]="iconSize()"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />
            <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
          </svg>
        }
      }
    </button>
  `,
})
export class KitThemeToggleComponent {
  private readonly themeService = inject(KitThemeService, { optional: true });

  readonly theme = input<KitThemeMode | undefined>(undefined);
  readonly buttonClass = input<string>('m3-button-icon state-layer');
  readonly testId = input<string>('theme-toggle-btn');
  readonly iconSize = input<number>(18);

  readonly toggled = output<KitThemeMode>();

  readonly effectiveTheme = computed<KitThemeMode>(
    () => this.theme() ?? this.themeService?.theme() ?? 'auto',
  );

  onToggle(): void {
    const controlled = this.theme();
    if (controlled === undefined && this.themeService) {
      const next = this.themeService.toggleTheme();
      this.toggled.emit(next);
      return;
    }
    const cur = controlled ?? 'auto';
    const next: KitThemeMode =
      cur === 'light' ? 'dark' : cur === 'dark' ? 'auto' : 'light';
    this.toggled.emit(next);
  }
}
