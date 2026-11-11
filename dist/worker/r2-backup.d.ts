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
export declare function performScheduledBackup(env: BackupEnv, tables: readonly string[], options?: ScheduledBackupOptions): Promise<{
    key: string;
    rowCount: number;
    skipped?: boolean;
    prunedCount?: number;
}>;
