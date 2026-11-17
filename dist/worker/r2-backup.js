/**
 * R2 SCHEDULED BACKUP ENGINE (@wesdizzle/app-kit/worker)
 *
 * Performs daily D1 -> R2 JSON snapshot exports within Cloudflare Workers' 10ms
 * CPU budget:
 * - Strict SQL table identifier validation
 * - Single-pass compact JSON serialization + native C++ WebCrypto SHA-256 hash
 * - Zero-download `BACKUP_BUCKET.head()` `customMetadata.sha256` `skipIfUnchanged` check
 * - Cursor-paginated rolling snapshot retention pruning (default 30 days)
 */
import { sha256Hex } from './crypto.js';
const VALID_TABLE_NAME_RE = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
const DEFAULT_R2_SNAPSHOT_CACHE_TTL_MS = 10 * 60 * 1000;
const DEFAULT_R2_MISSING_CACHE_TTL_MS = 30 * 1000;
let r2SnapshotCacheEpoch = 0;
const r2SnapshotCache = new WeakMap();
/**
 * Clears cached R2 backup snapshots (all buckets when called without arguments,
 * or a specific R2Bucket instance).
 */
export function resetR2SnapshotCache(bucket) {
    if (bucket) {
        r2SnapshotCache.delete(bucket);
    }
    else {
        r2SnapshotCacheEpoch++;
    }
}
async function parseR2SnapshotObject(obj, maxBytes) {
    let rawParsed = null;
    if (typeof obj.text === 'function') {
        const rawText = await obj.text();
        if (typeof maxBytes === 'number' &&
            maxBytes > 0 &&
            rawText.length > maxBytes) {
            return null;
        }
        rawParsed = JSON.parse(rawText);
    }
    else if (typeof obj.json === 'function') {
        rawParsed = await obj.json();
    }
    if (!rawParsed || typeof rawParsed !== 'object' || Array.isArray(rawParsed)) {
        return null;
    }
    const rec = rawParsed;
    const tables = rec.tables && typeof rec.tables === 'object' && !Array.isArray(rec.tables)
        ? rec.tables
        : {};
    const timestamp = typeof rec.timestamp === 'string' && rec.timestamp
        ? rec.timestamp
        : typeof rec.metadata?.timestamp === 'string' && rec.metadata.timestamp
            ? rec.metadata.timestamp
            : null;
    return {
        timestamp,
        version: typeof rec.version === 'string' ? rec.version : undefined,
        metadata: rec.metadata,
        tables,
    };
}
/**
 * Loads `snapshots/latest.json` from Cloudflare R2 with isolate-level TTL caching
 * and single-flight request deduplication so concurrent fallback reads during a
 * D1 outage consume at most 1 R2 Class B GetObject call per isolate window.
 */
export async function loadR2LatestSnapshot(bucket, options = {}) {
    if (!bucket || typeof bucket.get !== 'function') {
        return null;
    }
    const objectKey = options.objectKey ?? 'snapshots/latest.json';
    const cacheTtlMs = Math.max(0, options.cacheTtlMs ?? DEFAULT_R2_SNAPSHOT_CACHE_TTL_MS);
    const now = Date.now();
    const epoch = r2SnapshotCacheEpoch;
    let bucketMap = r2SnapshotCache.get(bucket);
    if (!bucketMap) {
        bucketMap = new Map();
        r2SnapshotCache.set(bucket, bucketMap);
    }
    const existing = bucketMap.get(objectKey);
    if (!options.forceRefresh &&
        existing &&
        existing.epoch === epoch &&
        existing.expiresAt > now) {
        return existing.snapshot;
    }
    if (existing && existing.epoch === epoch && existing.inFlight) {
        return (await existing.inFlight);
    }
    const fetchPromise = (async () => {
        try {
            const obj = await bucket.get(objectKey);
            if (!obj) {
                bucketMap.set(objectKey, {
                    epoch,
                    expiresAt: Date.now() + Math.min(cacheTtlMs, DEFAULT_R2_MISSING_CACHE_TTL_MS),
                    snapshot: null,
                });
                return null;
            }
            const objSize = obj.size;
            if (typeof options.maxBytes === 'number' &&
                options.maxBytes > 0 &&
                typeof objSize === 'number' &&
                objSize > options.maxBytes) {
                console.warn(`[WorkerBackup] Skipping R2 snapshot (${objectKey}): size ${objSize} exceeds maxBytes ${options.maxBytes}`);
                void obj.body
                    ?.cancel?.()
                    .catch(() => { });
                bucketMap.set(objectKey, {
                    epoch,
                    expiresAt: Date.now() + Math.min(cacheTtlMs, DEFAULT_R2_MISSING_CACHE_TTL_MS),
                    snapshot: null,
                });
                return null;
            }
            const parsed = await parseR2SnapshotObject(obj, options.maxBytes);
            if (parsed === null &&
                typeof options.maxBytes === 'number' &&
                options.maxBytes > 0) {
                console.warn(`[WorkerBackup] Skipping R2 snapshot (${objectKey}): payload exceeds maxBytes ${options.maxBytes} or is invalid`);
            }
            bucketMap.set(objectKey, {
                epoch,
                expiresAt: Date.now() +
                    (parsed
                        ? cacheTtlMs
                        : Math.min(cacheTtlMs, DEFAULT_R2_MISSING_CACHE_TTL_MS)),
                snapshot: parsed,
            });
            return parsed;
        }
        catch (err) {
            console.warn(`[WorkerBackup] Failed to read R2 fallback snapshot (${objectKey}):`, err);
            if (existing && existing.epoch === epoch) {
                bucketMap.delete(objectKey);
            }
            return null;
        }
    })();
    bucketMap.set(objectKey, {
        epoch,
        expiresAt: existing?.epoch === epoch ? existing.expiresAt : 0,
        snapshot: existing?.epoch === epoch ? existing.snapshot : null,
        inFlight: fetchPromise,
    });
    return (await fetchPromise);
}
export async function performScheduledBackup(env, tables, options = {}) {
    const logPrefix = options.logPrefix ?? '[WorkerBackup]';
    const retentionDays = options.retentionDays ?? 30;
    const isDaily = options.isDaily ?? true;
    const skipIfUnchanged = options.skipIfUnchanged ?? false;
    if (!env.BACKUP_BUCKET) {
        console.warn(`${logPrefix} BACKUP_BUCKET binding not configured. Skipping snapshot.`);
        return { key: 'none', rowCount: 0, prunedCount: 0 };
    }
    for (const table of tables) {
        if (!VALID_TABLE_NAME_RE.test(table)) {
            throw new Error(`${logPrefix} Invalid SQL table identifier in backup config: "${table}"`);
        }
    }
    const backupData = {};
    const tableCounts = {};
    let totalRows = 0;
    for (const table of tables) {
        try {
            const { results } = await env.DB.prepare(`SELECT * FROM "${table}"`).all();
            const rows = results || [];
            backupData[table] = rows;
            tableCounts[table] = rows.length;
            totalRows += rows.length;
        }
        catch (err) {
            console.error(`${logPrefix} Failed to dump table ${table}:`, err);
            throw new Error(`Aborted backup to prevent partial overwrite: failed dumping table ${table}`, { cause: err });
        }
    }
    const latestKey = 'snapshots/latest.json';
    const tablesJson = JSON.stringify(backupData);
    const tablesSha256 = await sha256Hex(tablesJson);
    if (skipIfUnchanged) {
        try {
            let matchedHash = false;
            let checkedHeadWithHash = false;
            if (typeof env.BACKUP_BUCKET.head === 'function') {
                const headObj = await env.BACKUP_BUCKET.head(latestKey);
                const existingSha = headObj?.customMetadata?.['sha256'];
                if (existingSha) {
                    checkedHeadWithHash = true;
                    matchedHash = existingSha === tablesSha256;
                }
            }
            if (!checkedHeadWithHash && typeof env.BACKUP_BUCKET.get === 'function') {
                const existingObj = await env.BACKUP_BUCKET.get(latestKey);
                if (existingObj) {
                    const metaSha = existingObj.customMetadata?.['sha256'];
                    if (metaSha) {
                        matchedHash = metaSha === tablesSha256;
                    }
                    else {
                        let existingParsed = null;
                        if (typeof existingObj.text === 'function') {
                            existingParsed = JSON.parse(await existingObj.text());
                        }
                        else if (typeof existingObj.json === 'function') {
                            existingParsed = (await existingObj.json());
                        }
                        if (existingParsed?.tables) {
                            const existingSha = await sha256Hex(JSON.stringify(existingParsed.tables));
                            matchedHash = existingSha === tablesSha256;
                        }
                    }
                }
            }
            if (matchedHash) {
                console.log(`${logPrefix} Database unchanged since last snapshot (sha256=${tablesSha256.slice(0, 12)}). Skipping upload.`);
                return {
                    key: 'none',
                    rowCount: totalRows,
                    skipped: true,
                    prunedCount: 0,
                };
            }
        }
        catch (cmpErr) {
            console.warn(`${logPrefix} Could not compare against existing latest.json, proceeding with backup:`, cmpErr);
        }
    }
    const now = new Date();
    const timestamp = now.toISOString();
    const dateStr = timestamp.slice(0, 10);
    const metadataJson = JSON.stringify({
        timestamp,
        date: dateStr,
        version: 1,
        totalRows,
        sha256: tablesSha256,
        tableCounts,
    });
    // Construct compact snapshot without re-serializing `backupData`
    const payload = `{"timestamp":${JSON.stringify(timestamp)},"version":"1.0","metadata":${metadataJson},"tables":${tablesJson}}`;
    const putOptions = {
        httpMetadata: { contentType: 'application/json' },
        customMetadata: { sha256: tablesSha256, totalRows: String(totalRows) },
    };
    await env.BACKUP_BUCKET.put(latestKey, payload, putOptions);
    let snapshotKey = latestKey;
    let prunedCount = 0;
    if (isDaily) {
        snapshotKey = `snapshots/backup-${dateStr}-${now.getTime()}.json`;
        await env.BACKUP_BUCKET.put(snapshotKey, payload, putOptions);
        console.log(`${logPrefix} Successfully saved daily snapshot ${snapshotKey} (${totalRows} rows)`);
        try {
            const cutoffMs = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
            if (typeof env.BACKUP_BUCKET.list === 'function') {
                let cursor;
                do {
                    const listed = await env.BACKUP_BUCKET.list({
                        prefix: 'snapshots/backup-',
                        ...(cursor ? { cursor } : {}),
                    });
                    if (listed && Array.isArray(listed.objects)) {
                        for (const obj of listed.objects) {
                            const uploadTime = obj.uploaded ? obj.uploaded.getTime() : null;
                            let isExpired = false;
                            if (uploadTime !== null) {
                                isExpired = uploadTime < cutoffMs;
                            }
                            else {
                                const match = obj.key.match(/-(\d+)\.json$/);
                                if (match) {
                                    const epoch = parseInt(match[1], 10);
                                    isExpired = epoch < cutoffMs;
                                }
                            }
                            if (isExpired && typeof env.BACKUP_BUCKET.delete === 'function') {
                                await env.BACKUP_BUCKET.delete(obj.key);
                                prunedCount++;
                            }
                        }
                    }
                    cursor =
                        listed &&
                            'truncated' in listed &&
                            listed.truncated &&
                            typeof listed.cursor === 'string'
                            ? listed.cursor
                            : undefined;
                } while (cursor);
                if (prunedCount > 0) {
                    console.log(`${logPrefix} Pruned ${prunedCount} snapshot(s) older than ${retentionDays} days.`);
                }
            }
        }
        catch (pruneErr) {
            console.warn(`${logPrefix} Failed to prune aged snapshots:`, pruneErr);
        }
    }
    else {
        console.log(`${logPrefix} Successfully updated latest snapshot ${latestKey} (${totalRows} rows)`);
    }
    return { key: snapshotKey, rowCount: totalRows, prunedCount };
}
