import { Injectable, OnDestroy, signal } from '@angular/core';

export type KitThemeMode = 'light' | 'dark' | 'auto';

@Injectable({ providedIn: 'root' })
export class KitThemeService implements OnDestroy {
  readonly theme = signal<KitThemeMode>('auto');
  readonly resolvedTheme = signal<'light' | 'dark'>('dark');

  private storageKey = 'app-theme';
  private mediaQuery: MediaQueryList | null =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;

  private readonly mediaQueryListener = (): void => {
    if (this.theme() === 'auto') {
      this.applyTheme('auto');
    }
  };

  constructor() {
    if (this.mediaQuery) {
      if (typeof this.mediaQuery.addEventListener === 'function') {
        this.mediaQuery.addEventListener('change', this.mediaQueryListener);
      } else if ('addListener' in this.mediaQuery) {
        (
          this.mediaQuery as unknown as {
            addListener: (listener: () => void) => void;
          }
        ).addListener(this.mediaQueryListener);
      }
    }
    this.init();
  }

  init(
    storageKey = 'app-theme',
    legacyKeys: string[] = ['living-dex_theme'],
    defaultMode: KitThemeMode = 'auto',
  ): void {
    this.storageKey = storageKey;
    let saved: KitThemeMode | null = null;
    if (typeof localStorage !== 'undefined') {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw === 'light' || raw === 'dark' || raw === 'auto') {
          saved = raw;
        } else {
          for (const legacyKey of legacyKeys) {
            const legacyVal = localStorage.getItem(legacyKey);
            if (
              legacyVal === 'light' ||
              legacyVal === 'dark' ||
              legacyVal === 'auto'
            ) {
              saved = legacyVal;
              localStorage.setItem(storageKey, legacyVal);
              break;
            }
          }
        }
      } catch {
        // Ignore storage errors
      }
    }

    const initial = saved ?? defaultMode;
    this.theme.set(initial);
    this.applyTheme(initial);
  }

  ngOnDestroy(): void {
    if (this.mediaQuery) {
      if (typeof this.mediaQuery.removeEventListener === 'function') {
        this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
      } else if ('removeListener' in this.mediaQuery) {
        (
          this.mediaQuery as unknown as {
            removeListener: (listener: () => void) => void;
          }
        ).removeListener(this.mediaQueryListener);
      }
    }
  }

  toggleTheme(): KitThemeMode {
    const modes: KitThemeMode[] = ['light', 'dark', 'auto'];
    const next = modes[(modes.indexOf(this.theme()) + 1) % modes.length];
    this.setTheme(next);
    return next;
  }

  setTheme(mode: KitThemeMode): void {
    this.theme.set(mode);
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(this.storageKey, mode);
      } catch {
        // Ignore storage errors
      }
    }
    this.applyTheme(mode);
  }

  applyTheme(mode: KitThemeMode): void {
    const prefersDark = Boolean(
      typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches,
    );
    const effective: 'light' | 'dark' =
      mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode;
    this.resolvedTheme.set(effective);

    if (typeof document === 'undefined') return;

    const updateDom = (): void => {
      const root = document.documentElement;
      const body = document.body;

      root.setAttribute('data-theme', effective);
      root.classList.remove('theme-light', 'theme-dark');
      root.classList.add(effective === 'dark' ? 'theme-dark' : 'theme-light');

      if (body) {
        body.classList.remove('theme-light', 'theme-dark');
        body.classList.add(effective === 'dark' ? 'theme-dark' : 'theme-light');
      }

      this.updateThemeColorMeta(mode, effective);
    };

    const doc = document as unknown as {
      startViewTransition?: (callback: () => void) => void;
    };

    if (typeof doc.startViewTransition === 'function') {
      doc.startViewTransition(() => {
        updateDom();
      });
    } else {
      document.documentElement.classList.add('disable-theme-transitions');
      updateDom();
      if (
        typeof window !== 'undefined' &&
        typeof requestAnimationFrame === 'function'
      ) {
        void document.body?.offsetHeight;
        requestAnimationFrame(() => {
          document.documentElement.classList.remove(
            'disable-theme-transitions',
          );
        });
      } else {
        document.documentElement.classList.remove('disable-theme-transitions');
      }
    }
  }

  private updateThemeColorMeta(
    mode: KitThemeMode,
    effective: 'light' | 'dark',
  ): void {
    if (typeof document === 'undefined') return;
    const darkColor = '#121214';
    const lightColor = '#f8fafc';

    const metas = document.querySelectorAll<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    metas.forEach((meta) => {
      const media = meta.getAttribute('media');
      if (mode === 'dark') {
        meta.setAttribute('content', darkColor);
      } else if (mode === 'light') {
        meta.setAttribute('content', lightColor);
      } else if (media && media.includes('prefers-color-scheme: dark')) {
        meta.setAttribute('content', darkColor);
      } else if (media && media.includes('prefers-color-scheme: light')) {
        meta.setAttribute('content', lightColor);
      } else {
        meta.setAttribute(
          'content',
          effective === 'dark' ? darkColor : lightColor,
        );
      }
    });
  }
}
