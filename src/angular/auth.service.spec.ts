import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  KitAuthService,
  clearCachedKitAuthSnapshot,
  clearSilentSsoAttempt,
  writeCachedKitAuthSnapshot,
} from './auth.service.js';

describe('@wesdizzle/app-kit/angular KitAuthService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    clearSilentSsoAttempt();
    clearCachedKitAuthSnapshot();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    clearSilentSsoAttempt();
    clearCachedKitAuthSnapshot();
  });

  it('automatically triggers checkSession() on construction and sets authInitialized() to true', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        authenticated: false,
        user: null,
      }),
    } as Response);

    const service = new KitAuthService();
    await service.ensureAuthLoaded();

    expect(service.authInitialized()).toBe(true);
    expect(service.isAuthenticated()).toBe(false);
    service.ngOnDestroy();
  });

  it('populates unprovisionedEmail from either unprovisionedEmail or email when provisioned is false', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        authenticated: false,
        provisioned: false,
        email: 'uninvited@example.com',
        user: null,
      }),
    } as Response);

    const service = new KitAuthService();
    await service.ensureAuthLoaded();

    expect(service.authInitialized()).toBe(true);
    expect(service.isProvisioned()).toBe(false);
    expect(service.unprovisionedEmail()).toBe('uninvited@example.com');
    service.ngOnDestroy();
  });

  it('initiates top-level prompt=none redirect when upstream status reports cookiePresent: false', async () => {
    const redirectSpy = vi
      .spyOn(
        KitAuthService.prototype as unknown as {
          redirectTo: (url: string) => void;
        },
        'redirectTo',
      )
      .mockImplementation(() => {});

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url === '/api/auth/me') {
        return {
          ok: true,
          json: async () => ({
            authenticated: false,
            oidcIssuer: 'https://auth.example.com',
            oidcClientId: 'living-dex',
            user: null,
          }),
        } as Response;
      }
      if (url.startsWith('https://auth.example.com/api/auth/status')) {
        return {
          ok: true,
          json: async () => ({
            authenticated: false,
            authorized: false,
            cookiePresent: false,
            user: null,
          }),
        } as Response;
      }
      return { ok: false } as Response;
    });

    const service = new KitAuthService();
    await service.ensureAuthLoaded();

    expect(service.isAutoSigningIn()).toBe(true);
    expect(redirectSpy).toHaveBeenCalledWith(
      '/api/auth/login?return_to=%2F&prompt=none',
    );
    service.ngOnDestroy();
  });

  it('issues POST /api/auth/logout?silent=1 when upstream session was revoked', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async (input) => {
        const url = typeof input === 'string' ? input : input.toString();
        if (url === '/api/auth/me') {
          return {
            ok: true,
            json: async () => ({
              authenticated: true,
              oidcIssuer: 'https://auth.example.com',
              oidcClientId: 'living-dex',
              user: {
                id: 1,
                username: 'alice',
                role: 'admin',
                isPublic: false,
              },
            }),
          } as Response;
        }
        if (url.startsWith('https://auth.example.com/api/auth/status')) {
          return {
            ok: true,
            json: async () => ({
              authenticated: false,
              authorized: false,
              cookiePresent: true,
              user: null,
            }),
          } as Response;
        }
        return { ok: true, json: async () => ({}) } as Response;
      });

    const service = new KitAuthService();
    await service.ensureAuthLoaded();

    expect(service.isAuthenticated()).toBe(false);
    expect(fetchSpy).toHaveBeenCalledWith(
      '/api/auth/logout?silent=1',
      expect.objectContaining({ method: 'POST' }),
    );
    service.ngOnDestroy();
  });

  it('does not falsely log out locally when upstream status reports cookiePresent: false', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async (input) => {
        const url = typeof input === 'string' ? input : input.toString();
        if (url === '/api/auth/me') {
          return {
            ok: true,
            json: async () => ({
              authenticated: true,
              oidcIssuer: 'https://auth.example.com',
              oidcClientId: 'living-dex',
              user: {
                id: 1,
                username: 'alice',
                role: 'admin',
                isPublic: true,
              },
            }),
          } as Response;
        }
        if (url.startsWith('https://auth.example.com/api/auth/status')) {
          return {
            ok: true,
            json: async () => ({
              authenticated: false,
              authorized: false,
              cookiePresent: false,
              user: null,
            }),
          } as Response;
        }
        return { ok: false } as Response;
      });

    const service = new KitAuthService();
    await service.ensureAuthLoaded();

    expect(service.isAuthenticated()).toBe(true);
    expect(fetchSpy).not.toHaveBeenCalledWith(
      '/api/auth/logout?silent=1',
      expect.anything(),
    );
    service.ngOnDestroy();
  });

  it('preserves authenticated session from localStorage cache when /api/auth/me returns 503 or offline error', async () => {
    const store = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => store.set(k, v),
      removeItem: (k: string) => store.delete(k),
    });

    writeCachedKitAuthSnapshot({
      user: {
        id: 1,
        username: 'alice',
        displayName: 'Alice',
        role: 'admin',
        isPublic: true,
        homeRegion: 'Japan',
      },
      accountHubUrl: 'https://account.example.com/account',
      oidcIssuer: 'https://account.example.com',
      oidcClientId: 'living-dex',
      updatedAt: 1700000000000,
    });

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 503,
      headers: new Headers(),
    } as Response);

    const service = new KitAuthService();
    await service.ensureAuthLoaded();

    expect(service.isAuthenticated()).toBe(true);
    expect(service.currentUser()?.username).toBe('alice');
    expect(service.currentUser()?.homeRegion).toBe('Japan');
    expect(service.isDegraded()).toBe(true);
    expect(service.degradedMode()).toBe('offline');

    // Subsequent network failure on focus recheck also preserves session
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Offline'));
    await service.checkSession();
    expect(service.isAuthenticated()).toBe(true);
    expect(service.degradedMode()).toBe('offline');

    // Explicit authenticated: false clears cached session
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      headers: new Headers(),
      json: async () => ({
        authenticated: false,
        user: null,
      }),
    } as Response);
    await service.checkSession();
    expect(service.isAuthenticated()).toBe(false);
    expect(service.isDegraded()).toBe(false);
    expect(store.size).toBe(0);
    service.ngOnDestroy();
  });

  it('merges cached profile fields and enters backup degradedMode when /api/auth/me returns degraded: true', async () => {
    const store = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => store.set(k, v),
      removeItem: (k: string) => store.delete(k),
    });

    writeCachedKitAuthSnapshot({
      user: {
        id: 1,
        username: 'alice',
        displayName: 'Alice Collector',
        bio: 'Full dex!',
        role: 'admin',
        isPublic: true,
        homeRegion: 'USA',
      },
      accountHubUrl: null,
      oidcIssuer: null,
      oidcClientId: null,
      updatedAt: 1700000000000,
    });

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      headers: new Headers(),
      json: async () => ({
        authenticated: true,
        degraded: true,
        degradedReason: 'r2-backup',
        snapshotTimestamp: '2026-11-16T03:00:00.000Z',
        user: {
          id: 1,
          username: 'alice',
          role: 'admin',
          isPublic: false,
        },
      }),
    } as Response);

    const service = new KitAuthService();
    await service.ensureAuthLoaded();

    expect(service.isAuthenticated()).toBe(true);
    expect(service.isDegraded()).toBe(true);
    expect(service.degradedMode()).toBe('backup');
    expect(service.degradedSnapshotTimestamp()).toBe(
      '2026-11-16T03:00:00.000Z',
    );
    expect(service.currentUser()?.displayName).toBe('Alice Collector');
    expect(service.currentUser()?.isPublic).toBe(true);
    service.ngOnDestroy();
  });

  it('prevents infinite username/role mismatch redirects during degraded mode and across repeat verifyUpstreamOidcSession calls', async () => {
    const store = new Map<string, string>();
    vi.stubGlobal('sessionStorage', {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => store.set(k, v),
      removeItem: (k: string) => store.delete(k),
    });

    class TestAuthService extends KitAuthService {
      redirects: string[] = [];
      protected override redirectTo(url: string): void {
        this.redirects.push(url);
      }
    }

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url === '/api/auth/me') {
        return {
          ok: true,
          headers: new Headers(),
          json: async () => ({
            authenticated: true,
            degraded: false,
            oidcIssuer: 'https://auth.example.com',
            oidcClientId: 'living-dex',
            user: {
              id: 1,
              username: 'old_alice',
              role: 'admin',
              isPublic: false,
            },
          }),
        } as Response;
      }
      if (url.startsWith('https://auth.example.com/api/auth/status')) {
        return {
          ok: true,
          headers: new Headers(),
          json: async () => ({
            authenticated: true,
            authorized: true,
            user: { id: 1, username: 'new_alice', role: 'admin' },
          }),
        } as Response;
      }
      return { ok: false } as Response;
    });

    const service = new TestAuthService();
    await service.ensureAuthLoaded();

    expect(service.redirects).toEqual([
      '/api/auth/login?return_to=%2F&prompt=none',
    ]);

    // Second check within the 5-minute cooldown must not redirect again
    await service.verifyUpstreamOidcSession();
    expect(service.redirects).toHaveLength(1);

    // Local degraded mode skips mismatch redirect even after clearing the cooldown
    clearSilentSsoAttempt('living-dex');
    service.isDegraded.set(true);
    await service.verifyUpstreamOidcSession();
    expect(service.redirects).toHaveLength(1);
    service.ngOnDestroy();
  });
});
