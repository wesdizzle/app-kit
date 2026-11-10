import '@angular/compiler';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { BottomSheetDragController } from './bottom-sheet-drag.js';
import {
  KitAuthService,
  checkUpstreamOidcStatus,
  clearSilentSsoAttempt,
  markSilentSsoAttempt,
  shouldAttemptSilentSso,
} from './auth.service.js';

describe('@wesdizzle/app-kit/angular', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('drags and dismisses bottom sheet from both .sheet-drag-area and .modal-header while ignoring interactive buttons', () => {
    const controller = new BottomSheetDragController(90);
    const onDismiss = vi.fn();

    // 1. Touch starting on a close button inside .modal-header must be ignored
    const buttonTarget = {
      closest: (sel: string) =>
        sel.includes('button') ? ({} as Element) : null,
    };
    controller.onTouchStart({
      touches: [{ clientY: 100 }],
      target: buttonTarget,
    } as unknown as TouchEvent);
    expect(controller.isDragging()).toBe(false);

    // 2. Touch starting on .modal-header (non-button) starts dragging and dismisses past threshold
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

  it('queries upstream /api/auth/status with client_id and evaluates authorization', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          authenticated: true,
          authorized: true,
          user: { id: 1, username: 'wesley', role: 'admin' },
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
      user: { id: 1, username: 'wesley', role: 'admin' },
    });

    // Unauthorized client access
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
            user: { id: 1, username: 'wesley', role: 'admin' },
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
    vi.unstubAllGlobals();
  });
});
