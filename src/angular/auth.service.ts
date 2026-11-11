import { Injectable, OnDestroy, signal, computed } from '@angular/core';

export interface BaseUserProfile {
  id: number;
  email?: string | null;
  username: string;
  role: 'admin' | 'user';
  isPublic: boolean;
  displayName?: string | null;
  bio?: string | null;
  createdAt?: string;
  homeRegion?: string;
}

export interface AuthMeResponse<
  TUser extends BaseUserProfile = BaseUserProfile,
> {
  authenticated: boolean;
  provisioned?: boolean;
  email?: string | null;
  unprovisionedEmail?: string | null;
  accountHubUrl?: string | null;
  oidcIssuer?: string | null;
  oidcClientId?: string | null;
  user: TUser | null;
}

export interface UpstreamOidcStatusResult {
  reachable: boolean;
  authenticated: boolean;
  authorized: boolean;
  cookiePresent?: boolean;
  user: {
    id?: number;
    username?: string;
    displayName?: string | null;
    role?: 'admin' | 'user';
  } | null;
}

const SSO_ATTEMPT_KEY_PREFIX = 'kit_sso_attempt_';
const SSO_ATTEMPT_COOLDOWN_MS = 4_000;
const DEFAULT_FOCUS_RECHECK_COOLDOWN_MS = 60_000;
const ssoCheckedInMemory = new Set<string>();

function getSsoAttemptStorageKey(clientId?: string | null): string {
  return `${SSO_ATTEMPT_KEY_PREFIX}${clientId || 'default'}`;
}

function hasAsciiControlChars(value: string): boolean {
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code <= 0x1f || code === 0x7f) return true;
  }
  return false;
}

export function sanitizeClientReturnToPath(
  raw: string | null | undefined,
  defaultPath = '/',
): string {
  if (!raw || typeof raw !== 'string') return defaultPath;
  const trimmed = raw.trim();
  if (
    !trimmed.startsWith('/') ||
    trimmed.startsWith('//') ||
    trimmed.includes('\\') ||
    hasAsciiControlChars(trimmed) ||
    /^\/%5c/i.test(trimmed)
  ) {
    return defaultPath;
  }
  try {
    const origin =
      typeof window !== 'undefined' && window.location?.origin
        ? window.location.origin
        : 'https://app.local';
    const parsed = new URL(trimmed, origin);
    if (
      parsed.origin !== origin ||
      !parsed.pathname.startsWith('/') ||
      parsed.pathname.startsWith('//') ||
      parsed.pathname.includes('\\')
    ) {
      return defaultPath;
    }
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return defaultPath;
  }
}

export function consumeSilentSsoCallbackParam(
  clientId?: string | null,
): boolean {
  if (typeof window === 'undefined' || !window.location) {
    return false;
  }
  const search = window.location.search || '';
  if (!search.includes('sso=checked') && !search.includes('sso=none')) {
    return false;
  }
  markSilentSsoAttempt(clientId);
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete('sso');
    const cleanUrl =
      url.pathname +
      (url.search ? url.search : '') +
      (url.hash ? url.hash : '');
    if (
      typeof window.history !== 'undefined' &&
      typeof window.history.replaceState === 'function'
    ) {
      window.history.replaceState(window.history.state, '', cleanUrl);
    }
  } catch {
    // Ignore URL/history cleanup errors
  }
  return true;
}

export function shouldAttemptSilentSso(clientId?: string | null): boolean {
  if (consumeSilentSsoCallbackParam(clientId)) {
    return false;
  }
  if (typeof window !== 'undefined' && window.location) {
    const search = window.location.search || '';
    if (search.includes('account=missing') || search.includes('auth_error=')) {
      return false;
    }
  }
  const key = getSsoAttemptStorageKey(clientId);
  if (ssoCheckedInMemory.has(key)) {
    return false;
  }
  if (typeof sessionStorage !== 'undefined') {
    try {
      const raw = sessionStorage.getItem(key);
      if (raw) {
        const ts = Number(raw);
        if (!Number.isNaN(ts) && Date.now() - ts < SSO_ATTEMPT_COOLDOWN_MS) {
          return false;
        }
      }
    } catch {
      // Ignore storage errors
    }
  }
  return true;
}

export function markSilentSsoAttempt(clientId?: string | null): void {
  const key = getSsoAttemptStorageKey(clientId);
  ssoCheckedInMemory.add(key);
  if (typeof sessionStorage !== 'undefined') {
    try {
      sessionStorage.setItem(key, String(Date.now()));
    } catch {
      // Ignore storage errors
    }
  }
}

export function clearSilentSsoAttempt(clientId?: string | null): void {
  const key = getSsoAttemptStorageKey(clientId);
  ssoCheckedInMemory.delete(key);
  if (!clientId) {
    ssoCheckedInMemory.clear();
  }
  if (typeof sessionStorage !== 'undefined') {
    try {
      sessionStorage.removeItem(key);
    } catch {
      // Ignore storage errors
    }
  }
}

export function getCurrentReturnToPath(defaultPath = '/'): string {
  if (typeof window !== 'undefined' && window.location) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('sso');
      const combined =
        (url.pathname || '/') +
        (url.search ? url.search : '') +
        (url.hash ? url.hash : '');
      return sanitizeClientReturnToPath(combined, defaultPath);
    } catch {
      const combined =
        (window.location.pathname || '/') +
        (window.location.search || '') +
        (window.location.hash || '');
      return sanitizeClientReturnToPath(combined, defaultPath);
    }
  }
  return defaultPath;
}

/**
 * Queries the OIDC Account Server's `/api/auth/status` endpoint with credentials
 * to check if an upstream identity session is active and authorized for `oidcClientId`.
 */
export async function checkUpstreamOidcStatus(
  oidcIssuer: string,
  oidcClientId?: string | null,
): Promise<UpstreamOidcStatusResult> {
  if (typeof fetch !== 'function' || !oidcIssuer) {
    return {
      reachable: false,
      authenticated: false,
      authorized: false,
      user: null,
    };
  }

  try {
    const base = oidcIssuer.replace(/\/+$/, '');
    const statusUrl = oidcClientId
      ? `${base}/api/auth/status?client_id=${encodeURIComponent(oidcClientId)}`
      : `${base}/api/auth/status`;
    const res = await fetch(statusUrl, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      return {
        reachable: false,
        authenticated: false,
        authorized: false,
        user: null,
      };
    }

    const data = (await res.json().catch(() => null)) as {
      authenticated?: boolean;
      authorized?: boolean;
      cookiePresent?: boolean;
      user?: {
        id?: number;
        username?: string;
        displayName?: string | null;
        role?: 'admin' | 'user';
      } | null;
    } | null;

    if (!data) {
      return {
        reachable: false,
        authenticated: false,
        authorized: false,
        user: null,
      };
    }

    const authenticated = Boolean(data.authenticated && data.user);
    const authorized = authenticated
      ? data.authorized !== undefined
        ? Boolean(data.authorized)
        : true
      : false;

    return {
      reachable: true,
      authenticated,
      authorized,
      cookiePresent:
        typeof data.cookiePresent === 'boolean'
          ? data.cookiePresent
          : undefined,
      user: authenticated ? (data.user ?? null) : null,
    };
  } catch {
    return {
      reachable: false,
      authenticated: false,
      authorized: false,
      user: null,
    };
  }
}

@Injectable({
  providedIn: 'root',
})
export class KitAuthService<
  TUser extends BaseUserProfile = BaseUserProfile,
> implements OnDestroy {
  readonly currentUser = signal<TUser | null>(null);
  readonly authInitialized = signal<boolean>(false);
  readonly isAutoSigningIn = signal<boolean>(false);
  readonly isProvisioned = signal<boolean>(true);
  readonly unprovisionedEmail = signal<string | null>(null);
  readonly accountHubUrl = signal<string | null>(null);
  readonly oidcIssuer = signal<string | null>(null);
  readonly oidcClientId = signal<string | null>(null);

  readonly isLoading = computed(
    () => !this.authInitialized() || this.isAutoSigningIn(),
  );
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');
  readonly userEmail = computed(() => this.currentUser()?.email ?? null);
  readonly username = computed(() => this.currentUser()?.username ?? null);
  readonly displayName = computed(
    () =>
      this.currentUser()?.displayName || this.currentUser()?.username || null,
  );
  readonly bio = computed(() => this.currentUser()?.bio ?? null);
  readonly isPublic = computed(() => this.currentUser()?.isPublic ?? false);

  private authLoadPromise: Promise<void> | null = null;
  private lastUpstreamCheckMs = 0;
  private sessionEpoch = 0;
  private readonly cleanupCallbacks: Array<() => void> = [];

  constructor() {
    this.authLoadPromise = this.checkSession();
    this.registerUpstreamSessionLifecycleListeners();
  }

  ngOnDestroy(): void {
    for (const fn of this.cleanupCallbacks) {
      fn();
    }
    this.cleanupCallbacks.length = 0;
  }

  private registerUpstreamSessionLifecycleListeners(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const triggerCheck = (force = false) => {
      const now = Date.now();
      if (
        !force &&
        now - this.lastUpstreamCheckMs < DEFAULT_FOCUS_RECHECK_COOLDOWN_MS
      ) {
        return;
      }
      void this.checkSession();
    };

    if (typeof document.addEventListener === 'function') {
      const onVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          ssoCheckedInMemory.clear();
        } else if (document.visibilityState === 'visible') {
          triggerCheck(false);
        }
      };
      document.addEventListener('visibilitychange', onVisibilityChange);
      this.cleanupCallbacks.push(() =>
        document.removeEventListener('visibilitychange', onVisibilityChange),
      );
    }

    if (typeof window.addEventListener === 'function') {
      const onFocus = () => {
        triggerCheck(false);
      };
      const onPageShow = (event: PageTransitionEvent) => {
        if (event.persisted) {
          triggerCheck(true);
        }
      };
      window.addEventListener('focus', onFocus);
      window.addEventListener('pageshow', onPageShow);
      this.cleanupCallbacks.push(() => {
        window.removeEventListener('focus', onFocus);
        window.removeEventListener('pageshow', onPageShow);
      });
    }
  }

  async ensureAuthLoaded(): Promise<void> {
    if (this.authInitialized()) return;
    if (!this.authLoadPromise) {
      this.authLoadPromise = this.checkSession();
    }
    await this.authLoadPromise;
  }

  async checkSession(): Promise<void> {
    this.lastUpstreamCheckMs = Date.now();
    const epoch = ++this.sessionEpoch;
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'same-origin',
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
        },
      });
      if (epoch !== this.sessionEpoch) return;
      if (!response.ok) {
        this.currentUser.set(null);
        return;
      }
      const data = (await response.json()) as AuthMeResponse<TUser>;
      if (epoch !== this.sessionEpoch) return;

      if (typeof data.accountHubUrl === 'string' && data.accountHubUrl) {
        this.accountHubUrl.set(data.accountHubUrl);
      } else {
        this.accountHubUrl.set(null);
      }
      if (typeof data.oidcIssuer === 'string' && data.oidcIssuer) {
        this.oidcIssuer.set(data.oidcIssuer);
      } else {
        this.oidcIssuer.set(null);
      }
      if (typeof data.oidcClientId === 'string' && data.oidcClientId) {
        this.oidcClientId.set(data.oidcClientId);
      } else {
        this.oidcClientId.set(null);
      }

      if (data.authenticated && data.user) {
        clearSilentSsoAttempt(this.oidcClientId());
        this.isAutoSigningIn.set(false);
        const u = data.user;
        const fallbackUsername =
          u.username || (u.email ? u.email.split('@')[0] : 'user') || 'user';
        this.currentUser.set({
          ...u,
          id: typeof u.id === 'number' ? u.id : 1,
          email: u.email ?? null,
          username: fallbackUsername,
          role: u.role === 'admin' ? 'admin' : 'user',
          isPublic: typeof u.isPublic === 'boolean' ? u.isPublic : false,
          displayName: u.displayName ?? fallbackUsername,
          bio: u.bio ?? null,
        });
        this.isProvisioned.set(true);
        this.unprovisionedEmail.set(null);
        await this.verifyUpstreamOidcSession();
      } else {
        this.currentUser.set(null);
        if (data.provisioned === false) {
          this.isProvisioned.set(false);
          this.unprovisionedEmail.set(
            data.unprovisionedEmail ?? data.email ?? null,
          );
        } else {
          this.isProvisioned.set(true);
          this.unprovisionedEmail.set(data.unprovisionedEmail ?? null);
          await this.trySilentAutoSignIn();
        }
      }
    } catch {
      if (epoch === this.sessionEpoch) {
        this.currentUser.set(null);
      }
    } finally {
      this.authInitialized.set(true);
    }
  }

  protected canAutoSignIn(): boolean {
    if (typeof window !== 'undefined' && window.location) {
      const path = window.location.pathname || '/';
      if (path.startsWith('/u/')) {
        return false;
      }
    }
    return shouldAttemptSilentSso(this.oidcClientId());
  }

  protected async trySilentAutoSignIn(): Promise<boolean> {
    const issuer = this.oidcIssuer();
    const clientId = this.oidcClientId();
    if (!issuer || !this.canAutoSignIn()) {
      return false;
    }

    const status = await checkUpstreamOidcStatus(issuer, clientId);
    if (status.reachable && status.authenticated) {
      if (!status.authorized) {
        return false;
      }
      markSilentSsoAttempt(clientId);
      this.isAutoSigningIn.set(true);
      const returnTo = getCurrentReturnToPath('/');
      this.redirectTo(this.getLoginUrl(returnTo));
      return true;
    }

    if (status.reachable && status.cookiePresent === false) {
      markSilentSsoAttempt(clientId);
      this.isAutoSigningIn.set(true);
      const returnTo = getCurrentReturnToPath('/');
      this.redirectTo(this.getLoginUrl(returnTo, { prompt: 'none' }));
      return true;
    }

    return false;
  }

  /**
   * Verifies with the central OIDC Account Server (`/api/auth/status`) that the
   * user's upstream session is still active, authorized for this client, and
   * belongs to the same account.
   */
  async verifyUpstreamOidcSession(): Promise<void> {
    const issuer = this.oidcIssuer();
    const clientId = this.oidcClientId();
    const localUser = this.currentUser();
    if (!issuer || !localUser) return;

    const status = await checkUpstreamOidcStatus(issuer, clientId);
    if (!status.reachable) return;

    if (!status.authenticated && status.cookiePresent === false) {
      return;
    }

    if (!status.authenticated || !status.user || !status.authorized) {
      await fetch('/api/auth/logout?silent=1', {
        method: 'POST',
        credentials: 'same-origin',
        cache: 'no-store',
      }).catch(() => null);
      this.currentUser.set(null);
      return;
    }

    if (
      (status.user.username &&
        localUser.username &&
        status.user.username.toLowerCase() !==
          localUser.username.toLowerCase()) ||
      (status.user.role && status.user.role !== localUser.role)
    ) {
      const returnTo = getCurrentReturnToPath('/');
      this.redirectTo(this.getLoginUrl(returnTo));
    }
  }

  getLoginUrl(
    returnTo = '/',
    options?: { prompt?: 'none' | 'login' | 'select_account' },
  ): string {
    const safeReturnTo = sanitizeClientReturnToPath(returnTo, '/');
    const base = `/api/auth/login?return_to=${encodeURIComponent(safeReturnTo)}`;
    if (options?.prompt) {
      return `${base}&prompt=${encodeURIComponent(options.prompt)}`;
    }
    return base;
  }

  protected redirectTo(url: string): void {
    if (typeof window !== 'undefined' && window.location) {
      window.location.assign(url);
    }
  }

  async updateProfile(patch: {
    displayName?: string | null;
    bio?: string | null;
    isPublic?: boolean;
    homeRegion?: string;
  }): Promise<TUser> {
    this.sessionEpoch++;
    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(patch),
    });

    if (!response.ok) {
      const errBody = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      throw new Error(
        errBody.error || `Failed to save profile (${response.status})`,
      );
    }

    const data = (await response.json()) as { user: TUser };
    if (data?.user) {
      this.currentUser.set(data.user);
    }
    return data.user;
  }

  async logout(): Promise<void> {
    this.sessionEpoch++;
    try {
      await fetch('/api/auth/logout?silent=1', {
        method: 'POST',
        credentials: 'same-origin',
        cache: 'no-store',
      });
    } catch {
      // Ignore network errors on logout
    } finally {
      this.currentUser.set(null);
    }
  }

  getLogoutRedirectUrl(): string {
    const issuer = this.oidcIssuer();
    if (issuer && typeof window !== 'undefined' && window.location?.origin) {
      return `${issuer.replace(/\/+$/, '')}/logout?post_logout_redirect_uri=${encodeURIComponent(window.location.origin + '/')}`;
    }
    return '/';
  }
}
