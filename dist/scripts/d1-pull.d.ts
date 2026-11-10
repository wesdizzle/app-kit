/**
 * ZERO-D1-READ R2 SNAPSHOT LOCAL HYDRATION UTILITY (@wesdizzle/app-kit/scripts)
 *
 * Pulls `snapshots/latest.json` from Cloudflare R2 (`0` D1 row reads) and hydrates
 * a local SQLite database (with atomic WAL-safe `.bak` backup via `await db.backup(...)`).
 */
export interface R2SnapshotPayload {
    timestamp?: string;
    version?: string;
    tables?: Record<string, Array<Record<string, unknown>>>;
}
export interface D1PullFromR2Config {
    rootDir: string;
    r2BucketName: string;
    r2ObjectKey?: string;
    localDbPath: string;
    schemaSqlPaths: string[];
    tableOrder: readonly string[];
}
export declare function findWranglerSqliteFile(wranglerStateDir: string): string | null;
export declare function hydrateSqliteFromSnapshot(dbPath: string, schemaSqlPaths: readonly string[], snapshot: R2SnapshotPayload, tableOrder: readonly string[]): Promise<Record<string, number>>;
export declare function runD1PullFromR2(config: D1PullFromR2Config): Promise<Record<string, number>>;
