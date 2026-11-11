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
});
