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
export interface BackupEnv {
    DB: D1Database;
    BACKUP_BUCKET?: R2Bucket;
}
export interface ScheduledBackupOptions {
    isDaily?: boolean;
    skipIfUnchanged?: boolean;
    retentionDays?: number;
    logPrefix?: string;
}
export interface R2BackupSnapshot<TTables = Record<string, Array<Record<string, unknown>>>> {
    timestamp: string | null;
    version?: string;
    metadata?: {
        timestamp?: string;
        date?: string;
        totalRows?: number;
        sha256?: string;
        tableCounts?: Record<string, number>;
    };
    tables: TTables;
}
export interface LoadR2LatestSnapshotOptions {
    cacheTtlMs?: number;
    forceRefresh?: boolean;
    objectKey?: string;
}
/**
 * Clears cached R2 backup snapshots (all buckets when called without arguments,
 * or a specific R2Bucket instance).
 */
export declare function resetR2SnapshotCache(bucket?: R2Bucket | null): void;
/**
 * Loads `snapshots/latest.json` from Cloudflare R2 with isolate-level TTL caching
 * and single-flight request deduplication so concurrent fallback reads during a
 * D1 outage consume at most 1 R2 Class B GetObject call per isolate window.
 */
export declare function loadR2LatestSnapshot<TTables = Record<string, Array<Record<string, unknown>>>>(bucket?: R2Bucket | null, options?: LoadR2LatestSnapshotOptions): Promise<R2BackupSnapshot<TTables> | null>;
export declare function performScheduledBackup(env: BackupEnv, tables: readonly string[], options?: ScheduledBackupOptions): Promise<{
    key: string;
    rowCount: number;
    skipped?: boolean;
    prunedCount?: number;
}>;
