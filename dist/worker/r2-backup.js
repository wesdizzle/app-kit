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
