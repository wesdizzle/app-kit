/**
 * EDGE-NATIVE WEBCRYPTO PRIMITIVES (@wesdizzle/app-kit/worker)
 *
 * Designed for Cloudflare Workers Free Tier (<10ms CPU budget):
 * - Base64URL encoding/decoding
 * - Constant-time byte & string comparison
 * - CSPRNG token generation
 * - Native C++ BoringSSL SHA-256 & HMAC-SHA-256 digests
 * - Strict ASN.1 DER -> IEEE P1363 ECDSA signature conversion
 * - Production secret entropy validation
 */

const encoder = new TextEncoder();

export function base64UrlEncode(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function base64UrlDecode(input: string): Uint8Array {
  if (typeof input !== 'string' || !/^[A-Za-z0-9_-]*={0,2}$/.test(input)) {
    throw new Error('Invalid base64url string');
  }
  let b64 = input.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4 !== 0) b64 += '=';
  const binary = atob(b64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    out[i] = binary.charCodeAt(i);
  }
  return out;
}

export function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  const maxLen = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < maxLen; i++) {
    diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  return diff === 0;
}

export function timingSafeEqualStrings(a: string, b: string): boolean {
  if (a.length === 0 || b.length === 0) {
    return false;
  }
  return timingSafeEqualBytes(encoder.encode(a), encoder.encode(b));
}

export function generateRandomBytes(byteLength = 32): Uint8Array {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return bytes;
}

export function generateRandomBase64Url(byteLength = 32): string {
  return base64UrlEncode(generateRandomBytes(byteLength));
}

export const generateRandomToken = generateRandomBase64Url;

export async function sha256Bytes(
  data: Uint8Array | string,
): Promise<Uint8Array> {
  const bytes = typeof data === 'string' ? encoder.encode(data) : data;
  const digest = await crypto.subtle.digest(
    'SHA-256',
    bytes as unknown as BufferSource,
  );
  return new Uint8Array(digest);
}

export async function sha256Hex(data: Uint8Array | string): Promise<string> {
  const digest = await sha256Bytes(data);
  let hex = '';
  for (let i = 0; i < digest.length; i++) {
    hex += digest[i]!.toString(16).padStart(2, '0');
  }
  return hex;
}

export async function sha256Base64Url(
  input: Uint8Array | string,
): Promise<string> {
  return base64UrlEncode(await sha256Bytes(input));
}

export const computePkceCodeChallenge = sha256Base64Url;
export const generatePkceChallenge = sha256Base64Url;

const hmacKeyCache = new Map<string, Promise<CryptoKey>>();

export function getCachedHmacKey(secret: string): Promise<CryptoKey> {
  let key = hmacKeyCache.get(secret);
  if (!key) {
    key = crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign', 'verify'],
    );
    hmacKeyCache.set(secret, key);
  }
  return key;
}

export async function hmacSha256Bytes(
  secret: string | Uint8Array,
  data: string | Uint8Array,
): Promise<Uint8Array> {
  const key =
    typeof secret === 'string'
      ? await getCachedHmacKey(secret)
      : await crypto.subtle.importKey(
          'raw',
          secret as unknown as BufferSource,
          { name: 'HMAC', hash: 'SHA-256' },
          false,
          ['sign'],
        );
  const payload = typeof data === 'string' ? encoder.encode(data) : data;
  const sig = await crypto.subtle.sign(
    'HMAC',
    key,
    payload as unknown as BufferSource,
  );
  return new Uint8Array(sig);
}

export async function hmacSha256Hex(
  secret: string | Uint8Array,
  data: string | Uint8Array,
): Promise<string> {
  const sig = await hmacSha256Bytes(secret, data);
  let hex = '';
  for (let i = 0; i < sig.length; i++) {
    hex += sig[i]!.toString(16).padStart(2, '0');
  }
  return hex;
}

/**
 * Converts an ASN.1 DER-encoded ECDSA signature into a fixed-width IEEE P1363
 * (`r || s`) signature, or returns `sig` unchanged when already P1363-sized and
 * not a valid DER SEQUENCE. Throws or rejects malformed/oversized DER integers.
 */
export function derToP1363(sig: Uint8Array, componentLength = 32): Uint8Array {
  const targetLen = componentLength * 2;

  if (sig.length < 8 || sig[0] !== 0x30) {
    if (sig.length === targetLen) return sig;
    throw new Error('Invalid ECDSA signature format');
  }

  let offset = 1;
  let seqLen = sig[offset]!;
  offset += 1;
  if ((seqLen & 0x80) !== 0) {
    const lenBytes = seqLen & 0x7f;
    if (lenBytes === 0 || lenBytes > 2 || offset + lenBytes > sig.length) {
      if (sig.length === targetLen) return sig;
      throw new Error('Invalid ASN.1 DER sequence length');
    }
    seqLen = 0;
    for (let i = 0; i < lenBytes; i++) {
      seqLen = (seqLen << 8) | sig[offset + i]!;
    }
    offset += lenBytes;
  }

  if (offset + seqLen !== sig.length) {
    if (sig.length === targetLen) return sig;
    throw new Error('ASN.1 DER sequence length mismatch');
  }

  const readDerInt = (): Uint8Array => {
    if (offset + 2 > sig.length || sig[offset] !== 0x02) {
      throw new Error('Expected ASN.1 DER INTEGER tag (0x02)');
    }
    const len = sig[offset + 1]!;
    offset += 2;
    if (len === 0 || offset + len > sig.length) {
      throw new Error('Invalid ASN.1 DER INTEGER length');
    }
    let bytes = sig.subarray(offset, offset + len);
    offset += len;
    while (bytes.length > componentLength && bytes[0] === 0x00) {
      bytes = bytes.subarray(1);
    }
    if (bytes.length > componentLength) {
      throw new Error('ECDSA integer component exceeds curve size');
    }
    return bytes;
  };

  let rBytes: Uint8Array;
  let sBytes: Uint8Array;
  try {
    rBytes = readDerInt();
    sBytes = readDerInt();
    if (offset !== sig.length) {
      throw new Error('Trailing bytes in ASN.1 DER signature');
    }
  } catch (err) {
    if (sig.length === targetLen) return sig;
    throw err;
  }

  const out = new Uint8Array(targetLen);
  out.set(rBytes, componentLength - rBytes.length);
  out.set(sBytes, targetLen - sBytes.length);
  return out;
}

const WEAK_SECRET_PATTERNS = [
  /^dev-only-/i,
  /^placeholder/i,
  /^changeme/i,
  /^local-dev/i,
  /^secret$/i,
  /^test-secret$/i,
];

/**
 * Validates secret strength in production while allowing explicit dev fallbacks
 * strictly on loopback origins (`localhost`, `127.0.0.1`, `[::1]`).
 */
export function resolveStrongSecret(
  rawSecret: string | undefined,
  secretName: string,
  isLoopback: boolean,
  devFallback?: string,
): string {
  const trimmed = rawSecret?.trim() ?? '';
  if (isLoopback) {
    if (trimmed.length >= 16) return trimmed;
    if (devFallback) return devFallback;
  }
  if (
    trimmed.length < 32 ||
    WEAK_SECRET_PATTERNS.some((re) => re.test(trimmed))
  ) {
    throw new Error(
      `Server configuration error: ${secretName} must be at least 32 characters and non-placeholder in production.`,
    );
  }
  return trimmed;
}
