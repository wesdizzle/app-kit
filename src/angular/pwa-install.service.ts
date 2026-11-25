import { Injectable, OnDestroy, computed, signal } from '@angular/core';

export const KIT_PWA_INSTALL_STORAGE_KEY = 'kit-pwa-install-v1';
export const KIT_PWA_DEFAULT_SNOOZE_DAYS = 14;

export interface KitBeforeInstallPromptEvent extends Event {
  readonly platforms?: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export interface KitInstallDismissalState {
  dismissedPermanently?: boolean;
  snoozedUntil?: number | null;
}

export type KitInstallOutcome =
  'accepted' | 'dismissed' | 'ios-guide' | 'unavailable';

export function detectKitStandaloneMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (window.matchMedia?.('(display-mode: standalone)')?.matches) {
      return true;
    }
    if (
      window.matchMedia?.('(display-mode: window-controls-overlay)')?.matches
    ) {
      return true;
    }
  } catch {
    // Ignore matchMedia failures in test environments
  }
  const nav = (typeof navigator !== 'undefined' ? navigator : null) as
    (Navigator & { standalone?: boolean }) | null;
  return Boolean(nav?.standalone);
}

export function detectKitIosSafari(
  userAgent: string,
  maxTouchPoints = 0,
): boolean {
  if (!userAgent) return false;
  const isIosDevice =
    /iP(?:ad|hone|od)/i.test(userAgent) ||
    (/Macintosh/i.test(userAgent) && maxTouchPoints > 1);
  if (!isIosDevice) return false;
  const isSafari = /Safari/i.test(userAgent);
  const isThirdPartyBrowser =
    /CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo|Focus|YaBrowser/i.test(userAgent);
  return isSafari && !isThirdPartyBrowser;
}

export function readKitInstallDismissalState(
  storage: Pick<Storage, 'getItem'> | null | undefined,
): KitInstallDismissalState {
  if (!storage) return {};
  try {
    const raw = storage.getItem(KIT_PWA_INSTALL_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as KitInstallDismissalState;
    return {
      dismissedPermanently: Boolean(parsed.dismissedPermanently),
      snoozedUntil:
        typeof parsed.snoozedUntil === 'number' &&
        Number.isFinite(parsed.snoozedUntil)
          ? parsed.snoozedUntil
          : null,
    };
  } catch {
    return {};
  }
}

export function isKitInstallAutoPromptSuppressed(
  state: KitInstallDismissalState,
  nowMs: number = Date.now(),
): boolean {
  if (state.dismissedPermanently) return true;
  if (typeof state.snoozedUntil === 'number' && state.snoozedUntil > nowMs) {
    return true;
  }
  return false;
}

function getSafeStorage(): Storage | null {
  try {
    return typeof localStorage !== 'undefined' ? localStorage : null;
  } catch {
    return null;
  }
}

function persistDismissalState(state: KitInstallDismissalState): void {
  const storage = getSafeStorage();
  if (!storage) return;
  try {
    storage.setItem(KIT_PWA_INSTALL_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota or private browsing errors
  }
}

@Injectable({
  providedIn: 'root',
})
export class KitPwaInstallService implements OnDestroy {
  private readonly _isInstalled = signal<boolean>(detectKitStandaloneMode());
  private readonly _isIosSafari = signal<boolean>(
    typeof navigator !== 'undefined'
      ? detectKitIosSafari(
          navigator.userAgent || '',
          navigator.maxTouchPoints || 0,
        )
      : false,
  );
  private readonly _deferredPrompt = signal<KitBeforeInstallPromptEvent | null>(
    null,
  );
  private readonly _iosGuideOpen = signal<boolean>(false);
  private readonly _dismissalState = signal<KitInstallDismissalState>(
    readKitInstallDismissalState(getSafeStorage()),
  );

  public readonly isInstalled = this._isInstalled.asReadonly();
  public readonly isIosSafari = this._isIosSafari.asReadonly();
  public readonly iosGuideOpen = this._iosGuideOpen.asReadonly();

  public readonly canPromptNative = computed(
    () => !this._isInstalled() && this._deferredPrompt() !== null,
  );

  public readonly canShowManualInstall = computed(
    () =>
      !this._isInstalled() &&
      (this._deferredPrompt() !== null || this._isIosSafari()),
  );

  public readonly shouldShowAutoPrompt = computed(() => {
    if (this._isInstalled()) return false;
    if (isKitInstallAutoPromptSuppressed(this._dismissalState(), Date.now())) {
      return false;
    }
    return this._deferredPrompt() !== null || this._isIosSafari();
  });

  private beforeInstallListener?: (event: Event) => void;
  private appInstalledListener?: () => void;
  private standaloneMediaQuery?: MediaQueryList;
  private standaloneMediaListener?: (event: MediaQueryListEvent) => void;

  constructor() {
    this.registerBrowserListeners();
  }

  private registerBrowserListeners(): void {
    if (typeof window === 'undefined') return;
    if (typeof window.addEventListener === 'function') {
      this.beforeInstallListener = (event: Event) => {
        if (this._isInstalled()) return;
        event.preventDefault?.();
        this._deferredPrompt.set(event as KitBeforeInstallPromptEvent);
      };
      this.appInstalledListener = () => {
        this._deferredPrompt.set(null);
        this._iosGuideOpen.set(false);
        this._isInstalled.set(true);
      };
      window.addEventListener(
        'beforeinstallprompt',
        this.beforeInstallListener,
      );
      window.addEventListener('appinstalled', this.appInstalledListener);
    }

    try {
      const mql = window.matchMedia?.('(display-mode: standalone)');
      if (mql && typeof mql.addEventListener === 'function') {
        this.standaloneMediaQuery = mql;
        this.standaloneMediaListener = (ev: MediaQueryListEvent) => {
          if (ev.matches) {
            this._deferredPrompt.set(null);
            this._iosGuideOpen.set(false);
            this._isInstalled.set(true);
          }
        };
        mql.addEventListener('change', this.standaloneMediaListener);
      }
    } catch {
      // Ignore matchMedia listener errors
    }
  }

  public ngOnDestroy(): void {
    if (
      typeof window !== 'undefined' &&
      typeof window.removeEventListener === 'function'
    ) {
      if (this.beforeInstallListener) {
        window.removeEventListener(
          'beforeinstallprompt',
          this.beforeInstallListener,
        );
        this.beforeInstallListener = undefined;
      }
      if (this.appInstalledListener) {
        window.removeEventListener('appinstalled', this.appInstalledListener);
        this.appInstalledListener = undefined;
      }
    }
    if (
      this.standaloneMediaQuery &&
      this.standaloneMediaListener &&
      typeof this.standaloneMediaQuery.removeEventListener === 'function'
    ) {
      this.standaloneMediaQuery.removeEventListener(
        'change',
        this.standaloneMediaListener,
      );
      this.standaloneMediaListener = undefined;
      this.standaloneMediaQuery = undefined;
    }
  }

  public async promptInstall(): Promise<KitInstallOutcome> {
    if (this._isInstalled()) {
      return 'unavailable';
    }
    const deferred = this._deferredPrompt();
    if (deferred) {
      this._deferredPrompt.set(null);
      try {
        await deferred.prompt();
        const choice = await deferred.userChoice;
        if (choice?.outcome === 'accepted') {
          this._isInstalled.set(true);
          this._iosGuideOpen.set(false);
          return 'accepted';
        }
        this.snooze(KIT_PWA_DEFAULT_SNOOZE_DAYS);
        return 'dismissed';
      } catch {
        return 'unavailable';
      }
    }
    if (this._isIosSafari()) {
      this._iosGuideOpen.set(true);
      return 'ios-guide';
    }
    return 'unavailable';
  }

  public snooze(days: number = KIT_PWA_DEFAULT_SNOOZE_DAYS): void {
    const safeDays = Number.isFinite(days) && days > 0 ? days : 14;
    const nextState: KitInstallDismissalState = {
      dismissedPermanently: false,
      snoozedUntil: Date.now() + safeDays * 86_400_000,
    };
    this._dismissalState.set(nextState);
    this._iosGuideOpen.set(false);
    persistDismissalState(nextState);
  }

  public dismissPermanently(): void {
    const nextState: KitInstallDismissalState = {
      dismissedPermanently: true,
      snoozedUntil: null,
    };
    this._dismissalState.set(nextState);
    this._iosGuideOpen.set(false);
    persistDismissalState(nextState);
  }

  public closeIosGuide(): void {
    this._iosGuideOpen.set(false);
  }
}
