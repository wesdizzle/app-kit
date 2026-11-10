import { Injectable, signal, computed } from '@angular/core';

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
  user: TUser | null;
}

@Injectable({
  providedIn: 'root',
})
export class KitAuthService<TUser extends BaseUserProfile = BaseUserProfile> {
  readonly currentUser = signal<TUser | null>(null);
  readonly authInitialized = signal<boolean>(false);
  readonly isProvisioned = signal<boolean>(true);
  readonly unprovisionedEmail = signal<string | null>(null);
  readonly accountHubUrl = signal<string | null>(null);
  readonly oidcIssuer = signal<string | null>(null);

  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');
  readonly userEmail = computed(() => this.currentUser()?.email ?? null);
  readonly username = computed(() => this.currentUser()?.username ?? null);
  readonly displayName = computed(
    () =>
      this.currentUser()?.displayName || this.currentUser()?.username || null,
  );
  readonly bio = computed(() => this.currentUser()?.bio ?? null);
  readonly isPublic = computed(() => this.currentUser()?.isPublic ?? true);

  private authLoadPromise: Promise<void> | null = null;
  private lastUpstreamCheckMs = 0;
  private sessionEpoch = 0;

  constructor() {
    this.authLoadPromise = this.checkSession();
    this.registerUpstreamSessionLifecycleListeners();
  }

  private registerUpstreamSessionLifecycleListeners(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const triggerCheck = () => {
      const now = Date.now();
      if (now - this.lastUpstreamCheckMs < 2000) return;
      void this.checkSession();
    };

    if (typeof document.addEventListener === 'function') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          triggerCheck();
        }
      });
    }

    if (typeof window.addEventListener === 'function') {
      window.addEventListener('focus', () => {
        triggerCheck();
      });

      window.addEventListener('pageshow', (event: PageTransitionEvent) => {
        if (event.persisted) {
          triggerCheck();
        }
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

      if (data.authenticated && data.user) {
        const u = data.user;
        const fallbackUsername =
          u.username ||
          (u.email ? u.email.split('@')[0] : 'trainer') ||
          'trainer';
        this.currentUser.set({
          ...u,
          id: typeof u.id === 'number' ? u.id : 1,
          email: u.email ?? null,
          username: fallbackUsername,
          role: u.role === 'user' ? 'user' : 'admin',
          isPublic: typeof u.isPublic === 'boolean' ? u.isPublic : true,
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

  /**
   * Verifies with the central OIDC Account Server (`/api/auth/status`) that the
   * user's upstream session is still active and belongs to the same account.
   */
  async verifyUpstreamOidcSession(): Promise<void> {
    const issuer = this.oidcIssuer();
    const localUser = this.currentUser();
    if (!issuer || !localUser) return;

    try {
      const statusUrl = `${issuer.replace(/\/+$/, '')}/api/auth/status`;
      const res = await fetch(statusUrl, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) return;

      const status = (await res.json()) as {
        authenticated: boolean;
        user: { username: string; role: 'admin' | 'user' } | null;
      };

      if (!status.authenticated || !status.user) {
        await fetch('/api/auth/logout?silent=1', {
          method: 'GET',
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
        if (typeof window !== 'undefined' && window.location) {
          window.location.assign('/api/auth/login');
        }
      }
    } catch {
      // Network or CORS unavailable (e.g., offline mode); preserve local session
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
