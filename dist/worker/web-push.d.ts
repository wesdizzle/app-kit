/**
 * EDGE-NATIVE WEB PUSH HELPER — RFC 8291 (`aes128gcm`) & RFC 8292 (VAPID)
 * (@wesdizzle/app-kit/worker)
 *
 * Zero-dependency Web Push payload encryption and VAPID signing built strictly
 * on Cloudflare Workers native C++ WebCrypto (`crypto.subtle`) with SSRF
 * host, port (`443`), and redirect (`redirect: 'error'`) protections.
 */
import { base64UrlDecode, base64UrlEncode } from './crypto.js';
export interface VapidJwk {
    kty: string;
    crv: string;
    d: string;
    x: string;
    y: string;
}
export interface WebPushSubscription {
    endpoint: string;
    p256dh: string;
    auth: string;
}
export interface WebPushNotificationPayload {
    title: string;
    body: string;
    icon?: string;
    badge?: string;
    data?: {
        url?: string;
        onActionClick?: Record<string, {
            operation: string;
            url?: string;
        }>;
        [key: string]: unknown;
    };
    notification?: {
        title: string;
        body: string;
        icon?: string;
        badge?: string;
        data?: {
            url?: string;
            onActionClick?: Record<string, {
                operation: string;
                url?: string;
            }>;
            [key: string]: unknown;
        };
        [key: string]: unknown;
    };
    [key: string]: unknown;
}
export interface SendWebPushOptions {
    subject?: string;
    publicKey?: string;
    privateKey?: string;
    privateKeyJwk?: VapidJwk;
    fetchFn?: typeof fetch;
    allowTestHost?: boolean;
}
export interface SendWebPushResult {
    success: boolean;
    status: number;
    shouldDelete: boolean;
    error?: string;
}
/**
 * Validates that a push subscription endpoint targets a trusted HTTPS W3C Web Push
 * service on standard port 443 without embedded credentials.
 */
export declare function isAllowedPushEndpoint(endpoint: string | null | undefined, allowTestHost?: boolean): boolean;
export declare const base64UrlToUint8Array: typeof base64UrlDecode;
export declare const uint8ArrayToBase64Url: typeof base64UrlEncode;
/**
 * Resolves a valid, routable contact URI for the VAPID `sub` claim (RFC 8292).
 */
export declare function resolveVapidSubject(subject?: string, requestUrl?: string, adminEmail?: string): string;
export declare function resolveVapidJwk(customPrivateKey?: string, customPublicKey?: string, explicitJwk?: VapidJwk): VapidJwk;
export declare function createVapidAuthHeader(endpoint: string, options?: SendWebPushOptions): Promise<string>;
export declare function encryptWebPushPayload(clientPublicKeyB64: string, clientAuthSecretB64: string, plaintext: string): Promise<Uint8Array>;
export declare function buildPushNotificationBody(payload: WebPushNotificationPayload): string;
export declare function sendWebPushNotification(subscription: WebPushSubscription, payload: WebPushNotificationPayload, options?: SendWebPushOptions): Promise<SendWebPushResult>;
