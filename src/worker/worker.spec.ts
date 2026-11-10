import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  signSession,
  verifySession,
  signOidcStateCookie,
  verifyOidcStateCookie,
  derToP1363,
  verifyOidcIdToken,
  resetOidcJwksCache,
  base64UrlEncode,
  isCrossOriginMutatingRequest,
  withSecurityHeaders,
  performScheduledBackup,
} from './index.js';

describe('@wesdizzle/app-kit/worker', () => {
  beforeEach(() => {
    resetOidcJwksCache();
    vi.restoreAllMocks();
  });

  it('signs and verifies sessions including optional homeRegion claim', async () => {
    const secret = 'test-hmac-secret-key-123456';
    const token = await signSession(
      {
        id: 42,
        username: 'wesley',
        role: 'admin',
        homeRegion: 'Japan',
      },
      secret,
    );

    const verified = await verifySession(token, secret);
    expect(verified).toEqual({
      id: 42,
      username: 'wesley',
      role: 'admin',
      homeRegion: 'Japan',
    });

    const tampered = await verifySession(token, 'wrong-secret');
    expect(tampered).toBeNull();
  });

  it('signs and verifies OIDC state cookies with returnTo path', async () => {
    const secret = 'test-oidc-secret';
    const cookieVal = await signOidcStateCookie(
      {
        state: 's1',
        codeVerifier: 'cv1',
        nonce: 'n1',
        returnTo: '/collection/games',
      },
      secret,
    );

    const verified = await verifyOidcStateCookie(cookieVal, secret);
    expect(verified).toMatchObject({
      state: 's1',
      codeVerifier: 'cv1',
      nonce: 'n1',
      returnTo: '/collection/games',
    });
  });

  it('converts ASN.1 DER ECDSA signatures to 64-byte IEEE P1363', () => {
    const r = new Uint8Array(32).fill(0x11);
    const s = new Uint8Array(32).fill(0x22);
    const der = new Uint8Array(2 + 2 + 33 + 2 + 32);
    der[0] = 0x30;
    der[1] = 33 + 32 + 4;
    der[2] = 0x02;
    der[3] = 33;
    der[4] = 0x00;
    der.set(r, 5);
    der[37] = 0x02;
    der[38] = 32;
    der.set(s, 39);

    const p1363 = derToP1363(der, 32);
    expect(p1363.length).toBe(64);
    expect(Array.from(p1363.subarray(0, 32))).toEqual(Array.from(r));
    expect(Array.from(p1363.subarray(32, 64))).toEqual(Array.from(s));
  });

  it('verifies ES256 OIDC ID tokens against cached JWKS', async () => {
    const keyPair = (await crypto.subtle.generateKey(
      { name: 'ECDSA', namedCurve: 'P-256' },
      true,
      ['sign', 'verify'],
    )) as CryptoKeyPair;
    const publicJwk = (await crypto.subtle.exportKey(
      'jwk',
      keyPair.publicKey,
    )) as JsonWebKey;

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        keys: [{ ...publicJwk, kid: 'k-es256', alg: 'ES256', use: 'sig' }],
      }),
    } as unknown as Response);

    const headerB64 = base64UrlEncode(
      new TextEncoder().encode(JSON.stringify({ alg: 'ES256', kid: 'k-es256' })),
    );
    const nowSec = Math.floor(Date.now() / 1000);
    const payloadB64 = base64UrlEncode(
      new TextEncoder().encode(
        JSON.stringify({
          iss: 'https://auth.example.com',
          sub: '1',
          aud: 'test-client',
          exp: nowSec + 300,
          iat: nowSec,
          nonce: 'n-123',
          preferred_username: 'wesley',
          role: 'admin',
        }),
      ),
    );
    const sigBuf = await crypto.subtle.sign(
      { name: 'ECDSA', hash: 'SHA-256' },
      keyPair.privateKey,
      new TextEncoder().encode(`${headerB64}.${payloadB64}`),
    );
    const idToken = `${headerB64}.${payloadB64}.${base64UrlEncode(new Uint8Array(sigBuf))}`;

    const claims = await verifyOidcIdToken(idToken, {
      issuer: 'https://auth.example.com',
      clientId: 'test-client',
      expectedNonce: 'n-123',
      fetchFn: mockFetch,
    });

    expect(claims?.preferred_username).toBe('wesley');
    expect(claims?.role).toBe('admin');
  });

  it('exempts /api/auth/logout from cross-origin mutation guard and blocks foreign POSTs', () => {
    const logoutReq = new Request('https://app.example.com/api/auth/logout', {
      method: 'POST',
      headers: { Origin: 'null' },
    });
    expect(
      isCrossOriginMutatingRequest(logoutReq, new URL(logoutReq.url)),
    ).toBe(false);

    const foreignMutation = new Request(
      'https://app.example.com/api/user/profile',
      {
        method: 'PUT',
        headers: { Origin: 'https://evil.example.com' },
      },
    );
    expect(
      isCrossOriginMutatingRequest(
        foreignMutation,
        new URL(foreignMutation.url),
      ),
    ).toBe(true);
  });

  it('adds security headers to HTML responses', () => {
    const raw = new Response('<html></html>', {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
    const secured = withSecurityHeaders(raw);
    expect(secured.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(secured.headers.get('X-Frame-Options')).toBe('DENY');
    expect(secured.headers.get('Content-Security-Policy')).toContain(
      "default-src 'self'",
    );
  });

  it('skips R2 put in performScheduledBackup when snapshot matches latest.json', async () => {
    const putSpy = vi.fn();
    const env = {
      DB: {
        prepare: () => ({
          all: async () => ({ results: [{ id: 1, username: 'wesley' }] }),
        }),
      } as unknown as D1Database,
      BACKUP_BUCKET: {
        get: async () => ({
          text: async () =>
            JSON.stringify({
              tables: { users: [{ id: 1, username: 'wesley' }] },
            }),
        }),
        put: putSpy,
        list: async () => ({ objects: [], truncated: false }),
      } as unknown as R2Bucket,
    };

    const res = await performScheduledBackup(env, ['users'], {
      isDaily: true,
      skipIfUnchanged: true,
    });
    expect(res.skipped).toBe(true);
    expect(putSpy).not.toHaveBeenCalled();
  });
});
