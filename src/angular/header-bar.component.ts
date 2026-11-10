import {
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kit-header-bar',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="app-header main-header">
      <div class="header-inner">
        <div class="header-left">
          <ng-content select="[headerBrand]" />
        </div>

        <ng-content select="[headerCenter]" />

        <div class="header-right header-actions">
          <ng-content select="[headerActions]" />
          <button
            type="button"
            class="theme-toggle-btn icon-action-btn"
            (click)="themeToggleClicked.emit()"
            [attr.aria-label]="themeAriaLabel()"
            [title]="themeAriaLabel()"
          >
            <ng-content select="[headerThemeIcon]" />
          </button>
        </div>
      </div>
      <ng-content select="[headerTrim]" />
    </header>
  `,
})
export class KitHeaderBarComponent {
  readonly themeAriaLabel = input<string>('Toggle color theme');
  readonly themeToggleClicked = output<void>();
}
