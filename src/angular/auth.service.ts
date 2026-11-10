import { Injectable, signal, computed } from '@angular/core';

export interface BaseUserProfile {
  id: number;
  email: string;
  username: string;
  role: 'admin' | 'user';
  isPublic: boolean;
  displayName: string | null;
  bio: string | null;
  createdAt?: string;
  homeRegion?: string;
}

export interface AuthMeResponse<TUser extends BaseUserProfile = BaseUserProfile> {
  authenticated: boolean;
  provisioned?: boolean;
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
  readonly unprovisionedEmail = signal<string | null>(null);
  readonly accountHubUrl = signal<string | null>(null);
  readonly oidcIssuer = signal<string | null>(null);

  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');
  readonly isProvisioned = computed(
    () => this.currentUser() !== null || this.unprovisionedEmail() === null,
  );
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

  constructor() {
    this.registerUpstreamSessionLifecycleListeners();
  }

  private registerUpstreamSessionLifecycleListeners(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const triggerCheck = () => {
      const now = Date.now();
      if (now - this.lastUpstreamCheckMs < 2000) return;
      this.lastUpstreamCheckMs = now;
      void this.verifyUpstreamOidcSession();
    };

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        triggerCheck();
      }
    });

    window.addEventListener('focus', () => {
      triggerCheck();
    });

    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        triggerCheck();
      }
    });
  }

  async ensureAuthLoaded(): Promise<void> {
    if (this.authInitialized()) return;
    if (!this.authLoadPromise) {
      this.authLoadPromise = this.checkSession();
    }
    return this.authLoadPromise;
  }

  async checkSession(): Promise<void> {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'same-origin',
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
        },
      });
      if (!response.ok) {
        this.currentUser.set(null);
        return;
      }
      const data = (await response.json()) as AuthMeResponse<TUser>;
      if (data.accountHubUrl) {
        this.accountHubUrl.set(data.accountHubUrl);
      }
      if (data.oidcIssuer) {
        this.oidcIssuer.set(data.oidcIssuer);
      }
      if (data.authenticated && data.user) {
        this.currentUser.set({
          ...data.user,
          username: data.user.username || 'trainer',
          isPublic: data.user.isPublic ?? true,
          displayName: data.user.displayName ?? null,
          bio: data.user.bio ?? null,
        });
        this.unprovisionedEmail.set(null);
        await this.verifyUpstreamOidcSession();
      } else {
        this.currentUser.set(null);
        this.unprovisionedEmail.set(data.unprovisionedEmail ?? null);
      }
    } catch {
      this.currentUser.set(null);
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
        });
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
        if (typeof window !== 'undefined') {
          window.location.assign('/api/auth/login');
        }
      }
    } catch {
      // Network or CORS unavailable (e.g., offline mode); preserve local session
    }
  }

  async updateProfile(patch: {
    displayName?: string;
    bio?: string;
    isPublic?: boolean;
    homeRegion?: string;
  }): Promise<TUser> {
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
      throw new Error(errBody.error || 'Failed to update profile');
    }

    const data = (await response.json()) as { user: TUser };
    this.currentUser.set(data.user);
    return data.user;
  }

  async logout(): Promise<void> {
    try {
      await fetch('/api/auth/logout?silent=1', {
        method: 'POST',
        credentials: 'same-origin',
        cache: 'no-store',
      });
    } finally {
      this.currentUser.set(null);
    }
  }

  getLogoutRedirectUrl(): string {
    return '/api/auth/logout';
  }
}
