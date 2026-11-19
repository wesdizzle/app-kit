import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'kit-public-banner',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .public-collection-banner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;
        padding: 16px 20px;
        margin-bottom: 20px;
        border-radius: var(--kit-radius-lg);
        background: var(--kit-surface-container);
        border: 1px solid var(--kit-outline-variant);
        color: var(--kit-on-surface);
      }

      .public-collection-banner .public-banner-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
      }

      .public-collection-banner .public-badge {
        display: inline-flex;
        align-self: flex-start;
        padding: 3px 10px;
        border-radius: var(--kit-radius-full);
        background: var(--kit-primary-container);
        color: var(--kit-on-primary-container);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .public-collection-banner h2 {
        margin: 2px 0 0;
        font-family: var(--kit-font-heading);
        font-size: 1.35rem;
        font-weight: 700;
        line-height: 1.2;
        color: var(--kit-on-surface);
      }

      .public-collection-banner .public-handle {
        font-family: var(--kit-font-mono);
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--kit-primary);
      }

      .public-collection-banner .public-bio {
        margin: 4px 0 0;
        font-size: 0.9rem;
        line-height: 1.45;
        color: var(--kit-on-surface-variant);
        max-width: 65ch;
      }

      .public-collection-banner .my-dex-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 9px 16px;
        border-radius: var(--kit-radius-full);
        background: var(--kit-primary);
        color: var(--kit-on-primary);
        font-size: 0.875rem;
        font-weight: 600;
        text-decoration: none;
        white-space: nowrap;
        transition: opacity 0.15s ease;
      }

      .public-collection-banner .my-dex-link:hover {
        opacity: 0.92;
      }
    `,
  ],
  template: `
    <div class="public-collection-banner kit-public-banner">
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
          class="my-dex-link state-layer"
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
