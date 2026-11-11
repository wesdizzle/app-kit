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
export declare function base64UrlEncode(bytes: Uint8Array): string;
export declare function base64UrlDecode(input: string): Uint8Array;
export declare function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean;
export declare function timingSafeEqualStrings(a: string, b: string): boolean;
export declare function generateRandomBytes(byteLength?: number): Uint8Array;
export declare function generateRandomBase64Url(byteLength?: number): string;
export declare const generateRandomToken: typeof generateRandomBase64Url;
export declare function sha256Bytes(data: Uint8Array | string): Promise<Uint8Array>;
export declare function sha256Hex(data: Uint8Array | string): Promise<string>;
export declare function sha256Base64Url(input: Uint8Array | string): Promise<string>;
export declare const computePkceCodeChallenge: typeof sha256Base64Url;
export declare const generatePkceChallenge: typeof sha256Base64Url;
export declare function getCachedHmacKey(secret: string): Promise<CryptoKey>;
export declare function hmacSha256Bytes(secret: string | Uint8Array, data: string | Uint8Array): Promise<Uint8Array>;
export declare function hmacSha256Hex(secret: string | Uint8Array, data: string | Uint8Array): Promise<string>;
/**
 * Converts an ASN.1 DER-encoded ECDSA signature into a fixed-width IEEE P1363
 * (`r || s`) signature, or returns `sig` unchanged when already P1363-sized and
 * not a valid DER SEQUENCE. Throws or rejects malformed/oversized DER integers.
 */
export declare function derToP1363(sig: Uint8Array, componentLength?: number): Uint8Array;
/**
 * Validates secret strength in production while allowing explicit dev fallbacks
 * strictly on loopback origins (`localhost`, `127.0.0.1`, `[::1]`).
 */
export declare function resolveStrongSecret(rawSecret: string | undefined, secretName: string, isLoopback: boolean, devFallback?: string): string;
