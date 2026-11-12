import '@angular/compiler';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { BottomSheetDragController } from './bottom-sheet-drag.js';
import {
  KitAuthService,
  checkUpstreamOidcStatus,
  clearSilentSsoAttempt,
  sanitizeClientReturnToPath,
  shouldAttemptSilentSso,
} from './auth.service.js';
import { KitThemeService } from './theme.service.js';

describe('@wesdizzle/app-kit/angular', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('drags and dismisses bottom sheet from both .sheet-drag-area and .modal-header while ignoring interactive buttons', () => {
    const controller = new BottomSheetDragController(90);
    const onDismiss = vi.fn();

    const buttonTarget = {
      closest: (sel: string) =>
        sel.includes('button') ? ({} as Element) : null,
    };
    controller.onTouchStart({
      touches: [{ clientY: 100 }],
      target: buttonTarget,
    } as unknown as TouchEvent);
    expect(controller.isDragging()).toBe(false);

    const headerTarget = {
      closest: (sel: string) =>
        sel.includes('.modal-header') ? ({} as Element) : null,
    };
    controller.onTouchStart({
      touches: [{ clientY: 100 }],
      target: headerTarget,
    } as unknown as TouchEvent);
    expect(controller.isDragging()).toBe(true);

    controller.onTouchMove({
      touches: [{ clientY: 220 }],
    } as unknown as TouchEvent);
    expect(controller.dragOffsetY()).toBe(120);
    expect(controller.effectiveTransformY()).toBe(120);

    controller.onTouchEnd(onDismiss);
    expect(controller.isDragging()).toBe(false);
    expect(controller.dragOffsetY()).toBe(0);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('sanitizes client return_to paths against backslash and protocol-relative redirects', () => {
    expect(sanitizeClientReturnToPath('/account?tab=security')).toBe(
      '/account?tab=security',
    );
    expect(sanitizeClientReturnToPath('/\\evil.example.com')).toBe('/');
    expect(sanitizeClientReturnToPath('//evil.example.com')).toBe('/');
    expect(sanitizeClientReturnToPath('https://evil.example.com')).toBe('/');
  });

  it('queries upstream /api/auth/status with client_id and evaluates authorization', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          authenticated: true,
          authorized: true,
          user: { id: 1, username: 'alice', role: 'admin' },
        }),
        { status: 200 },
      ),
    );

    const status = await checkUpstreamOidcStatus(
      'https://account.example.com/',
      'living-dex',
    );
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://account.example.com/api/auth/status?client_id=living-dex',
      expect.objectContaining({
        method: 'GET',
        credentials: 'include',
      }),
    );
    expect(status).toEqual({
      reachable: true,
      authenticated: true,
      authorized: true,
      user: { id: 1, username: 'alice', role: 'admin' },
    });

    fetchSpy.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          authenticated: true,
          authorized: false,
          user: { id: 2, username: 'guest', role: 'user' },
        }),
        { status: 200 },
      ),
    );
    const unauthStatus = await checkUpstreamOidcStatus(
      'https://account.example.com',
      'living-dex',
    );
    expect(unauthStatus.authenticated).toBe(true);
    expect(unauthStatus.authorized).toBe(false);
  });

  it('defaults missing role to fail-closed user and missing isPublic to false', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          authenticated: true,
          user: { id: 9 },
        }),
        { status: 200 },
      ),
    );

    const service = new KitAuthService();
    await service.ensureAuthLoaded();
    expect(service.currentUser()?.role).toBe('user');
    expect(service.currentUser()?.isPublic).toBe(false);
    expect(service.currentUser()?.username).toBe('user');
    service.ngOnDestroy();
  });

  it('supports custom theme-color configuration in KitThemeService without requiring DI context', () => {
    const themeService = new KitThemeService();
    themeService.init('test-theme', [], 'dark', {
      darkThemeColor: '#131114',
      lightThemeColor: '#fff8f6',
    });
    expect(themeService.theme()).toBe('dark');
    expect(themeService.resolvedTheme()).toBe('dark');
    expect(themeService.toggleTheme()).toBe('auto');
    themeService.ngOnDestroy();
  });

  it('automatically redirects to /api/auth/login when unauthenticated locally but authenticated and authorized upstream', async () => {
    const store = new Map<string, string>();
    vi.stubGlobal('sessionStorage', {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => store.set(k, v),
      removeItem: (k: string) => store.delete(k),
    });

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      const url = typeof input === 'string' ? input : (input as Request).url;
      if (url.includes('/api/auth/me')) {
        return new Response(
          JSON.stringify({
            authenticated: false,
            oidcIssuer: 'https://account.example.com',
            oidcClientId: 'living-dex',
            user: null,
          }),
          { status: 200 },
        );
      }
      if (url.includes('/api/auth/status')) {
        return new Response(
          JSON.stringify({
            authenticated: true,
            authorized: true,
            user: { id: 1, username: 'alice', role: 'admin' },
          }),
          { status: 200 },
        );
      }
      return new Response('{}', { status: 200 });
    });

    class TestAuthService extends KitAuthService {
      redirectedUrl: string | null = null;
      protected override redirectTo(url: string): void {
        this.redirectedUrl = url;
      }
    }

    const service = new TestAuthService();
    await service.ensureAuthLoaded();

    expect(service.redirectedUrl).toBe('/api/auth/login?return_to=%2F');
    expect(service.isAutoSigningIn()).toBe(true);
    expect(service.isLoading()).toBe(true);
    expect(shouldAttemptSilentSso('living-dex')).toBe(false);
    clearSilentSsoAttempt('living-dex');
    expect(shouldAttemptSilentSso('living-dex')).toBe(true);
    service.ngOnDestroy();
    vi.unstubAllGlobals();
  });

  it('isolates backdrop-filter onto .kit-header-bar.main-header::before so <header> never traps position:fixed mobile nav', () => {
    const specDir = dirname(fileURLToPath(import.meta.url));
    const headerSource = readFileSync(
      join(specDir, 'header-bar.component.ts'),
      'utf8',
    );
    const mainHeaderRuleMatch = headerSource.match(
      /\.kit-header-bar\.main-header\s*\{([^}]*)\}/,
    );
    expect(mainHeaderRuleMatch).not.toBeNull();
    const mainHeaderBody = mainHeaderRuleMatch![1]!;
    expect(mainHeaderBody).not.toMatch(/backdrop-filter\s*:/);
    expect(mainHeaderBody).not.toMatch(/(?:^|[\s;])filter\s*:/);
    expect(mainHeaderBody).not.toMatch(/transform\s*:/);
    expect(mainHeaderBody).not.toMatch(/contain\s*:/);

    const pseudoRuleMatch = headerSource.match(
      /\.kit-header-bar\.main-header::before\s*\{([^}]*)\}/,
    );
    expect(pseudoRuleMatch).not.toBeNull();
    expect(pseudoRuleMatch![1]!).toMatch(/backdrop-filter:\s*blur\(18px\)/);
  });

  it('skips document.startViewTransition during KitThemeService.init() and animates interactive setTheme()/toggleTheme()', () => {
    const startViewTransition = vi.fn((cb: () => void) => cb());
    const rootClassList = new Set<string>();
    const bodyClassList = new Set<string>();
    const rootAttrs = new Map<string, string>();

    vi.stubGlobal('document', {
      documentElement: {
        style: { colorScheme: '' },
        setAttribute: (k: string, v: string) => rootAttrs.set(k, v),
        classList: {
          add: (...cls: string[]) => cls.forEach((c) => rootClassList.add(c)),
          remove: (...cls: string[]) =>
            cls.forEach((c) => rootClassList.delete(c)),
        },
      },
      body: {
        offsetHeight: 0,
        classList: {
          add: (...cls: string[]) => cls.forEach((c) => bodyClassList.add(c)),
          remove: (...cls: string[]) =>
            cls.forEach((c) => bodyClassList.delete(c)),
        },
      },
      querySelectorAll: () => [],
      startViewTransition,
    });

    const themeService = new KitThemeService();
    themeService.init('test-theme', [], 'light');
    expect(startViewTransition).not.toHaveBeenCalled();
    expect(rootAttrs.get('data-theme')).toBe('light');
    expect(bodyClassList.has('theme-light')).toBe(true);

    themeService.toggleTheme();
    expect(startViewTransition).toHaveBeenCalledTimes(1);
    expect(rootAttrs.get('data-theme')).toBe('dark');
    expect(bodyClassList.has('theme-dark')).toBe(true);

    themeService.ngOnDestroy();
    vi.unstubAllGlobals();
  });

  it('hydrates KitThemeService from checkUpstreamOidcStatus without echo PATCH or animation and preserves local theme when preferences are empty', async () => {
    const storage = new Map<string, string>([['app-theme', 'light']]);
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => storage.get(k) ?? null,
      setItem: (k: string, v: string) => storage.set(k, v),
      removeItem: (k: string) => storage.delete(k),
    });
    const startViewTransition = vi.fn((cb: () => void) => cb());
    vi.stubGlobal('document', {
      documentElement: {
        style: { colorScheme: '' },
        setAttribute: () => {},
        classList: { add: () => {}, remove: () => {} },
      },
      body: {
        offsetHeight: 0,
        classList: { add: () => {}, remove: () => {} },
      },
      querySelectorAll: () => [],
      startViewTransition,
    });

    const themeService = new KitThemeService();
    expect(themeService.theme()).toBe('light');

    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      // 1. Empty preferences ({}) leaves existing local 'light' untouched
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            authenticated: true,
            authorized: true,
            user: {
              id: 1,
              username: 'alice',
              role: 'admin',
              preferences: {},
            },
          }),
          { status: 200 },
        ),
      )
      // 2. Explicit 'dark' preference updates local theme & localStorage without echo PATCH
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            authenticated: true,
            authorized: true,
            user: {
              id: 1,
              username: 'alice',
              role: 'admin',
              preferences: { theme: 'dark' },
            },
          }),
          { status: 200 },
        ),
      );

    await checkUpstreamOidcStatus(
      'https://account.example.com',
      'collection-tracker',
    );
    expect(themeService.theme()).toBe('light');
    expect(storage.get('app-theme')).toBe('light');

    const statusWithDark = await checkUpstreamOidcStatus(
      'https://account.example.com',
      'collection-tracker',
    );
    expect(statusWithDark.preferences).toEqual({ theme: 'dark' });
    expect(statusWithDark.user?.preferences).toEqual({ theme: 'dark' });
    expect(themeService.theme()).toBe('dark');
    expect(storage.get('app-theme')).toBe('dark');
    expect(startViewTransition).not.toHaveBeenCalled();
    // Only the two GET /api/auth/status calls were made (zero echo PATCH)
    expect(fetchSpy).toHaveBeenCalledTimes(2);

    // Late init() on a custom storageKey preserves the synced upstream theme
    themeService.init('living-dex_theme', [], 'auto');
    expect(themeService.theme()).toBe('dark');
    expect(storage.get('living-dex_theme')).toBe('dark');

    themeService.ngOnDestroy();
    vi.unstubAllGlobals();
  });

  it('coalesces rapid toggleTheme() calls into one debounced PATCH, ignores stale status snapshots while debouncing, and unbinds on 401', async () => {
    vi.useFakeTimers();
    try {
      const storage = new Map<string, string>();
      vi.stubGlobal('localStorage', {
        getItem: (k: string) => storage.get(k) ?? null,
        setItem: (k: string, v: string) => storage.set(k, v),
        removeItem: (k: string) => storage.delete(k),
      });

      const themeService = new KitThemeService();
      themeService.syncUpstreamState({
        issuerUrl: 'https://account.example.com/',
        clientId: 'living-dex',
        authenticated: true,
        preferences: { theme: 'light' },
      });
      expect(themeService.theme()).toBe('light');

      const fetchSpy = vi
        .spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ preferences: { theme: 'auto' } }), {
            status: 200,
          }),
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
          }),
        );

      // Rapidly click twice: light -> dark -> auto
      expect(themeService.toggleTheme()).toBe('dark');
      expect(themeService.toggleTheme()).toBe('auto');

      // While debounce timer is pending, a stale status snapshot ('light') must not overwrite 'auto'
      themeService.syncUpstreamState({
        issuerUrl: 'https://account.example.com',
        clientId: 'living-dex',
        authenticated: true,
        preferences: { theme: 'light' },
      });
      expect(themeService.theme()).toBe('auto');
      expect(fetchSpy).not.toHaveBeenCalled();

      await vi.advanceTimersByTimeAsync(400);
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenCalledWith(
        'https://account.example.com/api/auth/preferences?client_id=living-dex',
        expect.objectContaining({
          method: 'PATCH',
          credentials: 'include',
          body: JSON.stringify({ theme: 'auto' }),
        }),
      );

      // Next toggle receives 401 -> unbinds upstream sync so further toggles stay local-only
      themeService.setTheme('dark');
      await vi.advanceTimersByTimeAsync(400);
      expect(fetchSpy).toHaveBeenCalledTimes(2);

      themeService.setTheme('light');
      await vi.advanceTimersByTimeAsync(400);
      expect(fetchSpy).toHaveBeenCalledTimes(2);

      themeService.ngOnDestroy();
    } finally {
      vi.useRealTimers();
      vi.unstubAllGlobals();
    }
  });
});
