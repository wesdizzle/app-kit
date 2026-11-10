/**
 * R2 SCHEDULED BACKUP ENGINE (@wesdizzle/app-kit/worker)
 *
 * Performs daily D1 -> R2 JSON snapshot exports with:
 * - Atomic table export verification
 * - Optional zero-write `skipIfUnchanged` diffing against `snapshots/latest.json`
 * - Rolling snapshot retention pruning (default 30 days)
 */
export interface BackupEnv {
    DB: D1Database;
    BACKUP_BUCKET?: R2Bucket;
}
export interface ScheduledBackupOptions {
    skipIfUnchanged?: boolean;
    retentionDays?: number;
    logPrefix?: string;
}
export declare function performScheduledBackup(env: BackupEnv, tables: readonly string[], options?: ScheduledBackupOptions): Promise<{
    skipped: boolean;
    latestKey: string;
    dailyKey?: string;
    prunedCount: number;
}>;
