import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  KitAuthService,
  clearSilentSsoAttempt,
} from './auth.service.js';

describe('@wesdizzle/app-kit/angular KitAuthService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    clearSilentSsoAttempt();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    clearSilentSsoAttempt();
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
                username: 'trainer',
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
  });
});
