import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  HOST_SESSION_COOKIE,
  SESSION_COOKIE,
  base64UrlEncode,
  derToP1363,
  isAllowedPushEndpoint,
  isCrossOriginMutatingRequest,
  parseAuthenticatorData,
  performScheduledBackup,
  readSessionCookie,
  resetOidcJwksCache,
  resolveStrongSecret,
  sanitizeReturnToPath,
  serializeClearSessionCookies,
  serializeSessionCookie,
  sha256Hex,
  signOidcStateCookie,
  signSession,
  verifyOidcIdToken,
  verifyOidcStateCookie,
  verifySession,
  withSecurityHeaders,
} from './index.js';

describe('@wesdizzle/app-kit/worker', () => {
  beforeEach(() => {
    resetOidcJwksCache();
    vi.restoreAllMocks();
  });

  it('signs and verifies domain-separated sessions and preserves v1 fallback compatibility', async () => {
    const secret = '0123456789abcdef0123456789abcdef';
    const token = await signSession(
      {
        id: 42,
        username: 'alice',
        role: 'admin',
        homeRegion: 'Japan',
      },
      secret,
    );

    const verified = await verifySession(token, secret);
    expect(verified).toEqual({
      id: 42,
      username: 'alice',
      role: 'admin',
      homeRegion: 'Japan',
    });

    // Legacy v1 unprefixed HMAC signature still verifies cleanly during rolling upgrade
    const legacyPayloadB64 = base64UrlEncode(
      new TextEncoder().encode(
        JSON.stringify({
          uid: 7,
          un: 'bob',
          r: 'user',
          exp: Math.floor(Date.now() / 1000) + 3600,
        }),
      ),
    );
    const legacyKey = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    );
    const legacySig = await crypto.subtle.sign(
      'HMAC',
      legacyKey,
      new TextEncoder().encode(legacyPayloadB64),
    );
    const legacyToken = `${legacyPayloadB64}.${base64UrlEncode(new Uint8Array(legacySig))}`;
    expect(await verifySession(legacyToken, secret)).toEqual({
      id: 7,
      username: 'bob',
      role: 'user',
    });

    const tampered = await verifySession(token, 'wrong-secret');
    expect(tampered).toBeNull();
  });

  it('serializes __Host- cookies on HTTPS with legacy read/clear support', () => {
    const secureCookie = serializeSessionCookie('tok123', true);
    expect(secureCookie).toContain(`${HOST_SESSION_COOKIE}=tok123`);
    expect(secureCookie).toContain('Secure');
    expect(secureCookie).toContain('SameSite=Lax');

    const localCookie = serializeSessionCookie('tok123', false);
    expect(localCookie).toContain(`${SESSION_COOKIE}=tok123`);
    expect(localCookie).not.toContain('Secure');

    expect(readSessionCookie({ [SESSION_COOKIE]: 'legacy-tok' })).toBe(
      'legacy-tok',
    );
    expect(
      readSessionCookie({
        [HOST_SESSION_COOKIE]: 'host-tok',
        [SESSION_COOKIE]: 'legacy-tok',
      }),
    ).toBe('host-tok');

    const clearHeaders = serializeClearSessionCookies(true);
    expect(
      clearHeaders.some((h) => h.startsWith(`${HOST_SESSION_COOKIE}=;`)),
    ).toBe(true);
    expect(clearHeaders.some((h) => h.startsWith(`${SESSION_COOKIE}=;`))).toBe(
      true,
    );
  });

  it('blocks open-redirect vectors including backslash normalization in sanitizeReturnToPath', () => {
    expect(
      sanitizeReturnToPath(
        '/collection/games?tab=owned#top',
        'https://app.example.com',
      ),
    ).toBe('/collection/games?tab=owned#top');
    expect(
      sanitizeReturnToPath('//evil.example.com', 'https://app.example.com'),
    ).toBe('/');
    expect(
      sanitizeReturnToPath('/\\evil.example.com', 'https://app.example.com'),
    ).toBe('/');
    expect(
      sanitizeReturnToPath('/%5cevil.example.com', 'https://app.example.com'),
    ).toBe('/');
    expect(
      sanitizeReturnToPath(
        'https://evil.example.com/path',
        'https://app.example.com',
      ),
    ).toBe('/');
    expect(
      sanitizeReturnToPath(
        '/foo\r\nSet-Cookie: x=1',
        'https://app.example.com',
      ),
    ).toBe('/');
  });

  it('rejects weak or placeholder production secrets while allowing loopback dev fallbacks', () => {
    expect(() => resolveStrongSecret('short', 'SESSION_SECRET', false)).toThrow(
      /at least 32 characters/,
    );
    expect(() =>
      resolveStrongSecret(
        'dev-only-placeholder-secret-1234567890',
        'SESSION_SECRET',
        false,
      ),
    ).toThrow(/non-placeholder/);
    expect(
      resolveStrongSecret(
        undefined,
        'SESSION_SECRET',
        true,
        'loopback-fallback-secret',
      ),
    ).toBe('loopback-fallback-secret');
  });

  it('signs and verifies OIDC state cookies with returnTo path', async () => {
    const secret = '0123456789abcdef0123456789abcdef';
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

  it('converts ASN.1 DER ECDSA signatures to 64-byte IEEE P1363 and rejects malformed DER', () => {
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

    // Truncated / non-64-byte malformed DER throws cleanly
    expect(() =>
      derToP1363(new Uint8Array([0x30, 0x06, 0x02, 0x10]), 32),
    ).toThrow();
  });

  it('parses WebAuthn authenticatorData flags, signCount, and attested credentialId', () => {
    const authData = new Uint8Array(55 + 16);
    authData.fill(0xaa, 0, 32);
    authData[32] = 0x01 | 0x04 | 0x40; // UP + UV + AT
    new DataView(authData.buffer).setUint32(33, 9, false);
    new DataView(authData.buffer).setUint16(53, 16, false);
    authData.fill(0xbb, 55, 71);

    const parsed = parseAuthenticatorData(authData);
    expect(parsed.userPresent).toBe(true);
    expect(parsed.userVerified).toBe(true);
    expect(parsed.attestedCredentialDataIncluded).toBe(true);
    expect(parsed.signCount).toBe(9);
    expect(parsed.credentialId?.length).toBe(16);
  });

  it('validates W3C Web Push endpoints strictly against HTTPS and port 443', () => {
    expect(
      isAllowedPushEndpoint('https://fcm.googleapis.com/fcm/send/abc'),
    ).toBe(true);
    expect(
      isAllowedPushEndpoint('http://fcm.googleapis.com/fcm/send/abc'),
    ).toBe(false);
    expect(
      isAllowedPushEndpoint('https://fcm.googleapis.com:8443/fcm/send/abc'),
    ).toBe(false);
    expect(
      isAllowedPushEndpoint(
        'https://user:pass@fcm.googleapis.com/fcm/send/abc',
      ),
    ).toBe(false);
    expect(isAllowedPushEndpoint('https://evil.example.com/push')).toBe(false);
  });

  it('verifies ES256 OIDC ID tokens and rejects access_token confusion (at+jwt / token_use=access)', async () => {
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

    const nowSec = Math.floor(Date.now() / 1000);
    const makeToken = async (
      headerExtra: Record<string, unknown>,
      claimsExtra: Record<string, unknown>,
    ) => {
      const headerB64 = base64UrlEncode(
        new TextEncoder().encode(
          JSON.stringify({ alg: 'ES256', kid: 'k-es256', ...headerExtra }),
        ),
      );
      const payloadB64 = base64UrlEncode(
        new TextEncoder().encode(
          JSON.stringify({
            iss: 'https://auth.example.com',
            sub: '1',
            aud: 'test-client',
            exp: nowSec + 300,
            iat: nowSec,
            nonce: 'n-123',
            preferred_username: 'alice',
            email: 'alice@example.com',
            email_verified: true,
            role: 'admin',
            ...claimsExtra,
          }),
        ),
      );
      const sigBuf = await crypto.subtle.sign(
        { name: 'ECDSA', hash: 'SHA-256' },
        keyPair.privateKey,
        new TextEncoder().encode(`${headerB64}.${payloadB64}`),
      );
      return `${headerB64}.${payloadB64}.${base64UrlEncode(new Uint8Array(sigBuf))}`;
    };

    const validIdToken = await makeToken({}, { token_use: 'id' });
    const claims = await verifyOidcIdToken(validIdToken, {
      issuer: 'https://auth.example.com',
      clientId: 'test-client',
      expectedNonce: 'n-123',
      fetchFn: mockFetch,
    });
    expect(claims?.preferred_username).toBe('alice');
    expect(claims?.email_verified).toBe(true);

    // Reject access tokens replayed as ID tokens
    const accessToken = await makeToken(
      { typ: 'at+jwt' },
      { token_use: 'access' },
    );
    expect(
      await verifyOidcIdToken(accessToken, {
        issuer: 'https://auth.example.com',
        clientId: 'test-client',
        expectedNonce: 'n-123',
        fetchFn: mockFetch,
      }),
    ).toBeNull();
  });

  it('enforces CSRF protection across POST/PUT/PATCH/DELETE including /api/auth/logout and Sec-Fetch-Site', () => {
    const crossSiteLogout = new Request(
      'https://app.example.com/api/auth/logout',
      {
        method: 'POST',
        headers: { Origin: 'null' },
      },
    );
    expect(
      isCrossOriginMutatingRequest(
        crossSiteLogout,
        new URL(crossSiteLogout.url),
      ),
    ).toBe(true);

    const sameOriginLogout = new Request(
      'https://app.example.com/api/auth/logout',
      {
        method: 'POST',
        headers: {
          Origin: 'https://app.example.com',
          'Sec-Fetch-Site': 'same-origin',
        },
      },
    );
    expect(
      isCrossOriginMutatingRequest(
        sameOriginLogout,
        new URL(sameOriginLogout.url),
      ),
    ).toBe(false);

    const subdomainPatch = new Request(
      'https://app.example.com/api/user/profile',
      {
        method: 'PATCH',
        headers: { 'Sec-Fetch-Site': 'same-site' },
      },
    );
    expect(
      isCrossOriginMutatingRequest(subdomainPatch, new URL(subdomainPatch.url)),
    ).toBe(true);
  });

  it('adds hardened CSP (no unsafe-inline in script-src), HSTS, and Permissions-Policy headers', () => {
    const raw = new Response('<html></html>', {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
    const secured = withSecurityHeaders(raw, { includeHsts: true });
    expect(secured.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(secured.headers.get('X-Frame-Options')).toBe('DENY');
    expect(secured.headers.get('Strict-Transport-Security')).toContain(
      'max-age=31536000',
    );
    expect(secured.headers.get('Permissions-Policy')).toContain('camera=()');
    const csp = secured.headers.get('Content-Security-Policy') ?? '';
    expect(csp).toContain("script-src 'self'");
    expect(csp).not.toContain("script-src 'self' 'unsafe-inline'");
    expect(csp).toContain("object-src 'none'");
  });

  it('validates SQL identifiers, uses head() sha256 zero-download skip, and paginates retention pruning', async () => {
    await expect(
      performScheduledBackup(
        {
          DB: {} as D1Database,
          BACKUP_BUCKET: {} as R2Bucket,
        },
        ['users; DROP TABLE users'],
      ),
    ).rejects.toThrow(/Invalid SQL table identifier/);

    const rows = [{ id: 1, username: 'alice' }];
    const expectedHash = await sha256Hex(JSON.stringify({ users: rows }));
    const getSpy = vi.fn();
    const putSpy = vi.fn();

    const skipRes = await performScheduledBackup(
      {
        DB: {
          prepare: () => ({
            all: async () => ({ results: rows }),
          }),
        } as unknown as D1Database,
        BACKUP_BUCKET: {
          head: async () => ({
            customMetadata: { sha256: expectedHash },
          }),
          get: getSpy,
          put: putSpy,
          list: async () => ({ objects: [], truncated: false }),
        } as unknown as R2Bucket,
      },
      ['users'],
      { isDaily: true, skipIfUnchanged: true },
    );

    expect(skipRes.skipped).toBe(true);
    expect(getSpy).not.toHaveBeenCalled();
    expect(putSpy).not.toHaveBeenCalled();

    // Paginated retention pruning
    const deletedKeys: string[] = [];
    const oldEpoch = Date.now() - 45 * 24 * 60 * 60 * 1000;
    const writeRes = await performScheduledBackup(
      {
        DB: {
          prepare: () => ({
            all: async () => ({ results: rows }),
          }),
        } as unknown as D1Database,
        BACKUP_BUCKET: {
          head: async () => null,
          put: putSpy,
          list: vi
            .fn()
            .mockResolvedValueOnce({
              objects: [
                { key: `snapshots/backup-2025-01-01-${oldEpoch}.json` },
              ],
              truncated: true,
              cursor: 'page-2',
            })
            .mockResolvedValueOnce({
              objects: [
                { key: `snapshots/backup-2025-01-02-${oldEpoch - 1000}.json` },
              ],
              truncated: false,
            }),
          delete: async (k: string) => {
            deletedKeys.push(k);
          },
        } as unknown as R2Bucket,
      },
      ['users'],
      { isDaily: true, skipIfUnchanged: true, retentionDays: 30 },
    );

    expect(writeRes.prunedCount).toBe(2);
    expect(deletedKeys).toHaveLength(2);
  });
});
