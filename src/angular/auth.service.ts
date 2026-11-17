import { Injectable, OnDestroy, inject, signal, computed } from '@angular/core';
import {
  KitThemeService,
  KitUserPreferences,
  normalizeKitUserPreferences,
  notifyActiveThemeService,
} from './theme.service.js';

export const KIT_DEGRADED_HEADER = 'X-Kit-Degraded';
export const KIT_SNAPSHOT_TIMESTAMP_HEADER = 'X-Kit-Snapshot-Timestamp';

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
  degraded?: boolean;
  degradedReason?: string;
  snapshotTimestamp?: string | null;
}

export interface UpstreamOidcStatusResult {
  reachable: boolean;
  authenticated: boolean;
  authorized: boolean;
  cookiePresent?: boolean;
  degraded?: boolean;
  snapshotTimestamp?: string | null;
  preferences?: KitUserPreferences;
  user: {
    id?: number;
    username?: string;
    displayName?: string | null;
    role?: 'admin' | 'user';
    preferences?: KitUserPreferences;
  } | null;
}

export interface CachedKitAuthSnapshot<
  TUser extends BaseUserProfile = BaseUserProfile,
> {
  user: TUser;
  accountHubUrl: string | null;
  oidcIssuer: string | null;
  oidcClientId: string | null;
  updatedAt: number;
}

const DEFAULT_CACHED_AUTH_STORAGE_KEY = 'kit_auth_cached_session_v1';

export function readCachedKitAuthSnapshot<
  TUser extends BaseUserProfile = BaseUserProfile,
>(
  storageKey = DEFAULT_CACHED_AUTH_STORAGE_KEY,
): CachedKitAuthSnapshot<TUser> | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<
      CachedKitAuthSnapshot<TUser>
    > | null;
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      !parsed.user ||
      typeof parsed.user !== 'object' ||
      typeof parsed.user.id !== 'number' ||
      typeof parsed.user.username !== 'string'
    ) {
      return null;
    }
    return {
      user: parsed.user,
      accountHubUrl:
        typeof parsed.accountHubUrl === 'string' ? parsed.accountHubUrl : null,
      oidcIssuer:
        typeof parsed.oidcIssuer === 'string' ? parsed.oidcIssuer : null,
      oidcClientId:
        typeof parsed.oidcClientId === 'string' ? parsed.oidcClientId : null,
      updatedAt:
        typeof parsed.updatedAt === 'number' &&
        Number.isFinite(parsed.updatedAt)
          ? parsed.updatedAt
          : Date.now(),
    };
  } catch {
    return null;
  }
}

export function writeCachedKitAuthSnapshot<
  TUser extends BaseUserProfile = BaseUserProfile,
>(
  snapshot: CachedKitAuthSnapshot<TUser>,
  storageKey = DEFAULT_CACHED_AUTH_STORAGE_KEY,
): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(storageKey, JSON.stringify(snapshot));
  } catch {
    // Ignore storage quota / privacy mode errors
  }
}

export function clearCachedKitAuthSnapshot(
  storageKey = DEFAULT_CACHED_AUTH_STORAGE_KEY,
): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(storageKey);
  } catch {
    // Ignore storage errors
  }
}

export function mergeDegradedUserProfile<
  TUser extends BaseUserProfile = BaseUserProfile,
>(incoming: TUser, cached?: TUser | null): TUser {
  if (!cached || cached.id !== incoming.id) {
    return incoming;
  }
  const merged = { ...cached, ...incoming };
  if (
    (!incoming.displayName || incoming.displayName === incoming.username) &&
    cached.displayName
  ) {
    merged.displayName = cached.displayName;
  }
  if ((incoming.bio === undefined || incoming.bio === null) && cached.bio) {
    merged.bio = cached.bio;
  }
  if (incoming.isPublic === false && cached.isPublic === true) {
    merged.isPublic = cached.isPublic;
  }
  if (!incoming.email && cached.email) {
    merged.email = cached.email;
  }
  if (!incoming.homeRegion && cached.homeRegion) {
    merged.homeRegion = cached.homeRegion;
  }
  if (
    (!incoming.createdAt || incoming.createdAt === new Date(0).toISOString()) &&
    cached.createdAt
  ) {
    merged.createdAt = cached.createdAt;
  }
  return merged;
}

const SSO_ATTEMPT_KEY_PREFIX = 'kit_sso_attempt_';
const SSO_ATTEMPT_COOLDOWN_MS = 300_000;
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
      degraded?: boolean;
      snapshotTimestamp?: string | null;
      preferences?: unknown;
      user?: {
        id?: number;
        username?: string;
        displayName?: string | null;
        role?: 'admin' | 'user';
        preferences?: unknown;
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

    const rawPrefs = data.user?.preferences ?? data.preferences;
    const normalizedPrefs = normalizeKitUserPreferences(rawPrefs);
    const hasPrefs = Object.keys(normalizedPrefs).length > 0;

    if (authenticated && authorized) {
      notifyActiveThemeService({
        issuerUrl: base,
        clientId: oidcClientId ?? null,
        authenticated: true,
        preferences: normalizedPrefs,
      });
    } else {
      notifyActiveThemeService({
        issuerUrl: null,
        authenticated: false,
      });
    }

    let userObj: UpstreamOidcStatusResult['user'] = null;
    if (authenticated && data.user) {
      const { preferences: rawUserPrefs, ...restUser } = data.user;
      userObj = {
        ...restUser,
        ...(rawUserPrefs !== undefined || hasPrefs
          ? { preferences: normalizedPrefs }
          : {}),
      };
    }

    return {
      reachable: true,
      authenticated,
      authorized,
      cookiePresent:
        typeof data.cookiePresent === 'boolean'
          ? data.cookiePresent
          : undefined,
      ...(data.degraded === true ? { degraded: true } : {}),
      ...(typeof data.snapshotTimestamp === 'string' && data.snapshotTimestamp
        ? { snapshotTimestamp: data.snapshotTimestamp }
        : {}),
      ...(hasPrefs ? { preferences: normalizedPrefs } : {}),
      user: userObj,
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
  readonly isDegraded = signal<boolean>(false);
  readonly degradedMode = signal<'offline' | 'backup' | null>(null);
  readonly degradedSnapshotTimestamp = signal<string | null>(null);

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
    try {
      inject(KitThemeService, { optional: true });
    } catch {
      // Ignore when constructed outside an Angular DI context in unit tests
    }
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
        if (document.visibilityState === 'visible') {
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
      const onOnline = () => {
        if (this.isDegraded()) {
          triggerCheck(true);
        }
      };
      const onOffline = () => {
        if (this.currentUser()) {
          this.isDegraded.set(true);
          this.degradedMode.set('offline');
        }
      };
      window.addEventListener('focus', onFocus);
      window.addEventListener('pageshow', onPageShow);
      window.addEventListener('online', onOnline);
      window.addEventListener('offline', onOffline);
      this.cleanupCallbacks.push(() => {
        window.removeEventListener('focus', onFocus);
        window.removeEventListener('pageshow', onPageShow);
        window.removeEventListener('online', onOnline);
        window.removeEventListener('offline', onOffline);
      });
    }
  }

  private restoreSessionFromOfflineCache(
    mode: 'offline' | 'backup' = 'offline',
    snapshotTs?: string | null,
  ): void {
    const cached = readCachedKitAuthSnapshot<TUser>();
    const preserved = this.currentUser() ?? cached?.user ?? null;
    if (preserved) {
      if (!this.currentUser() && cached) {
        this.currentUser.set(cached.user);
        this.accountHubUrl.set(cached.accountHubUrl);
        this.oidcIssuer.set(cached.oidcIssuer);
        this.oidcClientId.set(cached.oidcClientId);
      }
      this.isDegraded.set(true);
      this.degradedMode.set(mode);
      this.degradedSnapshotTimestamp.set(
        snapshotTs ??
          (cached ? new Date(cached.updatedAt).toISOString() : null),
      );
      this.isProvisioned.set(true);
      this.unprovisionedEmail.set(null);
    } else {
      this.currentUser.set(null);
      this.isDegraded.set(false);
      this.degradedMode.set(null);
      this.degradedSnapshotTimestamp.set(null);
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
        if (response.status === 401) {
          clearCachedKitAuthSnapshot();
          this.currentUser.set(null);
          this.isDegraded.set(false);
          this.degradedMode.set(null);
          this.degradedSnapshotTimestamp.set(null);
          return;
        }
        const headerTs =
          response.headers?.get?.(KIT_SNAPSHOT_TIMESTAMP_HEADER) || null;
        this.restoreSessionFromOfflineCache('offline', headerTs);
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
        this.isAutoSigningIn.set(false);
        const u = data.user;
        const fallbackUsername =
          u.username || (u.email ? u.email.split('@')[0] : 'user') || 'user';
        const normalizedUser: TUser = {
          ...u,
          id: typeof u.id === 'number' ? u.id : 1,
          email: u.email ?? null,
          username: fallbackUsername,
          role: u.role === 'admin' ? 'admin' : 'user',
          isPublic: typeof u.isPublic === 'boolean' ? u.isPublic : false,
          displayName: u.displayName ?? fallbackUsername,
          bio: u.bio ?? null,
        };

        const headerDegraded =
          response.headers?.get?.(KIT_DEGRADED_HEADER) || null;
        const headerSnapshotTs =
          response.headers?.get?.(KIT_SNAPSHOT_TIMESTAMP_HEADER) || null;
        const isDegradedResp = Boolean(data.degraded || headerDegraded);
        const snapshotTs =
          (typeof data.snapshotTimestamp === 'string' && data.snapshotTimestamp
            ? data.snapshotTimestamp
            : null) ?? headerSnapshotTs;

        const cachedSnapshot = readCachedKitAuthSnapshot<TUser>();
        const existingOrCachedUser =
          this.currentUser() ?? cachedSnapshot?.user ?? null;
        const finalUser = isDegradedResp
          ? mergeDegradedUserProfile(normalizedUser, existingOrCachedUser)
          : normalizedUser;

        this.currentUser.set(finalUser);
        writeCachedKitAuthSnapshot({
          user: finalUser,
          accountHubUrl: this.accountHubUrl(),
          oidcIssuer: this.oidcIssuer(),
          oidcClientId: this.oidcClientId(),
          updatedAt:
            isDegradedResp && cachedSnapshot?.updatedAt
              ? cachedSnapshot.updatedAt
              : Date.now(),
        });
        this.isDegraded.set(isDegradedResp);
        this.degradedMode.set(
          isDegradedResp
            ? data.degradedReason === 'offline'
              ? 'offline'
              : 'backup'
            : null,
        );
        this.degradedSnapshotTimestamp.set(isDegradedResp ? snapshotTs : null);
        this.isProvisioned.set(true);
        this.unprovisionedEmail.set(null);
        await this.verifyUpstreamOidcSession();
      } else {
        clearCachedKitAuthSnapshot();
        this.currentUser.set(null);
        this.isDegraded.set(false);
        this.degradedMode.set(null);
        this.degradedSnapshotTimestamp.set(null);
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
        this.restoreSessionFromOfflineCache('offline', null);
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
      this.redirectTo(this.getLoginUrl(returnTo, { prompt: 'none' }));
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
      clearCachedKitAuthSnapshot();
      this.currentUser.set(null);
      this.isDegraded.set(false);
      this.degradedMode.set(null);
      this.degradedSnapshotTimestamp.set(null);
      return;
    }

    if (status.degraded || this.isDegraded()) {
      return;
    }

    if (
      (status.user.username &&
        localUser.username &&
        status.user.username.toLowerCase() !==
          localUser.username.toLowerCase()) ||
      (status.user.role && status.user.role !== localUser.role)
    ) {
      if (!shouldAttemptSilentSso(clientId)) {
        return;
      }
      markSilentSsoAttempt(clientId);
      const returnTo = getCurrentReturnToPath('/');
      this.redirectTo(this.getLoginUrl(returnTo, { prompt: 'none' }));
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
      writeCachedKitAuthSnapshot({
        user: data.user,
        accountHubUrl: this.accountHubUrl(),
        oidcIssuer: this.oidcIssuer(),
        oidcClientId: this.oidcClientId(),
        updatedAt: Date.now(),
      });
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
      notifyActiveThemeService({
        issuerUrl: null,
        authenticated: false,
      });
      clearCachedKitAuthSnapshot();
      this.currentUser.set(null);
      this.isDegraded.set(false);
      this.degradedMode.set(null);
      this.degradedSnapshotTimestamp.set(null);
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
