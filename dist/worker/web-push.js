/**
 * EDGE-NATIVE WEB PUSH HELPER — RFC 8291 (`aes128gcm`) & RFC 8292 (VAPID)
 * (@wesdizzle/app-kit/worker)
 *
 * Zero-dependency Web Push payload encryption and VAPID signing built strictly
 * on Cloudflare Workers native C++ WebCrypto (`crypto.subtle`) with SSRF
 * host, port (`443`), and redirect (`redirect: 'error'`) protections.
 */
import { base64UrlDecode, base64UrlEncode } from './crypto.js';
const ALLOWED_PUSH_HOST_SUFFIXES = [
    'fcm.googleapis.com',
    '.fcm.googleapis.com',
    '.mtalk.google.com',
    '.push.services.mozilla.com',
    '.autopush.stage.mozaws.net',
    '.autopush.dev.mozaws.net',
    '.notify.windows.com',
    'web.push.apple.com',
    '.push.apple.com',
    '.push.samsungosp.com',
    '.dbankcloud.cn',
];
/**
 * Validates that a push subscription endpoint targets a trusted HTTPS W3C Web Push
 * service on standard port 443 without embedded credentials.
 */
export function isAllowedPushEndpoint(endpoint, allowTestHost = false) {
    if (!endpoint || typeof endpoint !== 'string')
        return false;
    try {
        const parsed = new URL(endpoint);
        if (parsed.protocol !== 'https:')
            return false;
        if (parsed.username || parsed.password)
            return false;
        if (parsed.port !== '' && parsed.port !== '443')
            return false;
        const host = parsed.hostname.toLowerCase();
        if (allowTestHost && host === 'push.example.com') {
            return true;
        }
        return ALLOWED_PUSH_HOST_SUFFIXES.some((suffix) => suffix.startsWith('.') ? host.endsWith(suffix) : host === suffix);
    }
    catch {
        return false;
    }
}
export const base64UrlToUint8Array = base64UrlDecode;
export const uint8ArrayToBase64Url = base64UrlEncode;
async function hmacSha256(keyBytes, data) {
    const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const signature = await crypto.subtle.sign('HMAC', key, data);
    return new Uint8Array(signature);
}
async function hkdfExtract(salt, ikm) {
    return hmacSha256(salt, ikm);
}
async function hkdfExpand(prk, info, length) {
    const data = new Uint8Array(info.length + 1);
    data.set(info, 0);
    data[info.length] = 1;
    const t = await hmacSha256(prk, data);
    return t.subarray(0, length);
}
/**
 * Resolves a valid, routable contact URI for the VAPID `sub` claim (RFC 8292).
 */
export function resolveVapidSubject(subject, requestUrl, adminEmail) {
    if (subject &&
        !subject.includes('.local') &&
        !subject.includes('localhost')) {
        return subject;
    }
    if (adminEmail &&
        adminEmail.includes('@') &&
        !adminEmail.includes('.local')) {
        return `mailto:${adminEmail.trim()}`;
    }
    if (requestUrl) {
        try {
            const parsed = new URL(requestUrl);
            if (parsed.protocol === 'https:' &&
                !parsed.hostname.includes('.local') &&
                !parsed.hostname.includes('localhost')) {
                return `https://${parsed.host}`;
            }
        }
        catch {
            // ignore invalid URL
        }
    }
    return 'https://webpush.invalid';
}
export function resolveVapidJwk(customPrivateKey, customPublicKey, explicitJwk) {
    if (explicitJwk) {
        return explicitJwk;
    }
    if (customPrivateKey) {
        const trimmed = customPrivateKey.trim();
        if (trimmed.startsWith('{')) {
            try {
                const parsed = JSON.parse(trimmed);
                if (parsed.d && parsed.x && parsed.y) {
                    return parsed;
                }
            }
            catch {
                // continue
            }
        }
        if (!customPublicKey) {
            throw new Error('VAPID_PUBLIC_KEY is required when VAPID_PRIVATE_KEY is a raw scalar.');
        }
        const pubBytes = base64UrlDecode(customPublicKey.trim());
        if (pubBytes.length === 65 && pubBytes[0] === 4) {
            const x = base64UrlEncode(pubBytes.subarray(1, 33));
            const y = base64UrlEncode(pubBytes.subarray(33, 65));
            return {
                kty: 'EC',
                crv: 'P-256',
                d: trimmed,
                x,
                y,
            };
        }
        throw new Error('Invalid VAPID_PUBLIC_KEY format (expected 65-byte P-256 uncompressed point).');
    }
    throw new Error('VAPID_PRIVATE_KEY and VAPID_PUBLIC_KEY must be configured to send Web Push notifications.');
}
export async function createVapidAuthHeader(endpoint, options) {
    const jwk = resolveVapidJwk(options?.privateKey, options?.publicKey, options?.privateKeyJwk);
    let publicKey = options?.publicKey;
    if (!publicKey) {
        const xBytes = base64UrlDecode(jwk.x);
        const yBytes = base64UrlDecode(jwk.y);
        const pubBytes = new Uint8Array(65);
        pubBytes[0] = 4;
        pubBytes.set(xBytes, 1);
        pubBytes.set(yBytes, 33);
        publicKey = base64UrlEncode(pubBytes);
    }
    const subject = resolveVapidSubject(options?.subject);
    const origin = new URL(endpoint).origin;
    const exp = Math.floor(Date.now() / 1000) + 12 * 3600;
    const headerObj = { alg: 'ES256', typ: 'JWT' };
    const payloadObj = { aud: origin, exp, sub: subject };
    const encoder = new TextEncoder();
    const headerB64 = base64UrlEncode(encoder.encode(JSON.stringify(headerObj)));
    const payloadB64 = base64UrlEncode(encoder.encode(JSON.stringify(payloadObj)));
    const signInput = `${headerB64}.${payloadB64}`;
    const privateKey = await crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
    const signature = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, privateKey, encoder.encode(signInput));
    const sigB64 = base64UrlEncode(new Uint8Array(signature));
    return `vapid t=${signInput}.${sigB64}, k=${publicKey}`;
}
export async function encryptWebPushPayload(clientPublicKeyB64, clientAuthSecretB64, plaintext) {
    const uaPublicRaw = base64UrlDecode(clientPublicKeyB64);
    const uaAuth = base64UrlDecode(clientAuthSecretB64);
    const asKeyPair = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']);
    const asPublicRaw = new Uint8Array(await crypto.subtle.exportKey('raw', asKeyPair.publicKey));
    const uaPublicKey = await crypto.subtle.importKey('raw', uaPublicRaw, { name: 'ECDH', namedCurve: 'P-256' }, false, []);
    const sharedSecretBits = await crypto.subtle.deriveBits({ name: 'ECDH', public: uaPublicKey }, asKeyPair.privateKey, 256);
    const sharedSecret = new Uint8Array(sharedSecretBits);
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const prk = await hkdfExtract(uaAuth, sharedSecret);
    const encoder = new TextEncoder();
    const webpushInfoPrefix = encoder.encode('WebPush: info\0');
    const keyInfo = new Uint8Array(webpushInfoPrefix.length + uaPublicRaw.length + asPublicRaw.length);
    keyInfo.set(webpushInfoPrefix, 0);
    keyInfo.set(uaPublicRaw, webpushInfoPrefix.length);
    keyInfo.set(asPublicRaw, webpushInfoPrefix.length + uaPublicRaw.length);
    const ikm = await hkdfExpand(prk, keyInfo, 32);
    const prk2 = await hkdfExtract(salt, ikm);
    const cek = await hkdfExpand(prk2, encoder.encode('Content-Encoding: aes128gcm\0'), 16);
    const nonce = await hkdfExpand(prk2, encoder.encode('Content-Encoding: nonce\0'), 12);
    const plaintextBytes = encoder.encode(plaintext);
    const padded = new Uint8Array(plaintextBytes.length + 1);
    padded.set(plaintextBytes, 0);
    padded[plaintextBytes.length] = 2;
    const aesKey = await crypto.subtle.importKey('raw', cek, 'AES-GCM', false, ['encrypt']);
    const ciphertextBuffer = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: nonce, tagLength: 128 }, aesKey, padded);
    const ciphertext = new Uint8Array(ciphertextBuffer);
    const header = new Uint8Array(16 + 4 + 1 + 65);
    header.set(salt, 0);
    const rs = 4096;
    header[16] = (rs >> 24) & 0xff;
    header[17] = (rs >> 16) & 0xff;
    header[18] = (rs >> 8) & 0xff;
    header[19] = rs & 0xff;
    header[20] = asPublicRaw.length;
    header.set(asPublicRaw, 21);
    const fullPayload = new Uint8Array(header.length + ciphertext.length);
    fullPayload.set(header, 0);
    fullPayload.set(ciphertext, header.length);
    return fullPayload;
}
export function buildPushNotificationBody(payload) {
    const url = payload.data?.url || '/';
    const icon = payload.icon || '/icons/icon-192.png';
    const badge = payload.badge || '/icons/badge-96.png';
    const notificationData = {
        ...(payload.data || {}),
        url,
        onActionClick: payload.data?.onActionClick || {
            default: {
                operation: 'navigateLastFocusedOrOpen',
                url,
            },
        },
    };
    const formattedPayload = {
        ...payload,
        icon,
        badge,
        data: notificationData,
        notification: {
            title: payload.title,
            body: payload.body,
            icon,
            badge,
            data: notificationData,
            ...(payload.notification || {}),
        },
    };
    return JSON.stringify(formattedPayload);
}
export async function sendWebPushNotification(subscription, payload, options) {
    const fetchFn = options?.fetchFn || fetch;
    if (!isAllowedPushEndpoint(subscription.endpoint, options?.allowTestHost)) {
        return {
            success: false,
            status: 400,
            shouldDelete: true,
            error: 'Unsupported or untrusted push endpoint host',
        };
    }
    try {
        const jsonBody = buildPushNotificationBody(payload);
        const encryptedBody = await encryptWebPushPayload(subscription.p256dh, subscription.auth, jsonBody);
        const authHeader = await createVapidAuthHeader(subscription.endpoint, options);
        const response = await fetchFn(subscription.endpoint, {
            method: 'POST',
            redirect: 'error',
            headers: {
                TTL: '86400',
                Urgency: 'normal',
                'Content-Encoding': 'aes128gcm',
                'Content-Type': 'application/octet-stream',
                Authorization: authHeader,
            },
            body: encryptedBody,
        });
        const status = response.status;
        const shouldDelete = status === 404 || status === 410;
        const success = response.ok || status === 201;
        return {
            success,
            status,
            shouldDelete,
            ...(success
                ? {}
                : { error: `Push service responded with status ${status}` }),
        };
    }
    catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return {
            success: false,
            status: 0,
            shouldDelete: false,
            error: msg,
        };
    }
}
