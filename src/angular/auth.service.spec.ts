import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { KitAuthService } from './auth.service.js';

describe('@wesdizzle/app-kit/angular KitAuthService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
});
