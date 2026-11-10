import {
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kit-public-banner',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="public-collection-banner">
      <div class="public-banner-info">
        <span class="public-badge">{{ badgeLabel() }}</span>
        <h2>{{ title() }}</h2>
        <span class="public-handle">&#64;{{ username() }}</span>
        @if (bio()) {
          <p class="public-bio">{{ bio() }}</p>
        }
      </div>
      @if (showBackLink()) {
        <a
          [href]="backHref()"
          class="my-dex-link"
          (click)="onBackClick($event)"
        >
          {{ backLabel() }}
        </a>
      }
    </div>
  `,
})
export class KitPublicBannerComponent {
  readonly badgeLabel = input<string>('Public Collection');
  readonly title = input.required<string>();
  readonly username = input.required<string>();
  readonly bio = input<string | null>(null);
  readonly showBackLink = input<boolean>(true);
  readonly backHref = input<string>('/');
  readonly backLabel = input<string>('← My Collection');
  readonly interceptBackClick = input<boolean>(false);

  readonly backClicked = output<MouseEvent>();

  onBackClick(event: MouseEvent): void {
    if (this.interceptBackClick()) {
      event.preventDefault();
    }
    this.backClicked.emit(event);
  }
}
