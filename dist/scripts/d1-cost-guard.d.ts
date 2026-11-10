/**
 * D1 PRE-FLIGHT COST GUARD & STATIC SCHEMA / QUERY PLAN AUDITOR (@wesdizzle/app-kit/scripts)
 *
 * Provides two complementary D1 cost protection modes:
 * 1. Pre-Flight SQL Migration Sandbox Cost Guard (`auditSqlCost`, `printCostReport`, `runWithD1CostGuard`):
 *    - Validates SQL migration files against a local clone of remote state (`data/remote_baseline.db`)
 *      in an isolated `os.tmpdir()` sandbox before any remote execution.
 *    - Accounts for $(1 + K)$ write amplification across both explicit `CREATE INDEX` (`origin === 'c'`)
 *      and inline `UNIQUE` constraint auto-indexes (`origin === 'u'`), while excluding `PRIMARY KEY`
 *      (`origin === 'pk'`).
 *    - Accounts for `CREATE INDEX` $N$-row B-Tree population writes and increments $(1 + K)$ for
 *      subsequent statements in the same migration.
 *    - Accounts for `INSERT OR REPLACE` / `REPLACE INTO` $2 \times (1 + K)$ write amplification on
 *      replaced rows (`netInserted + replacedCount * 2`).
 *    - Runs `EXPLAIN QUERY PLAN` on every statement to block unindexed table scans on protected tables.
 * 2. Static Schema & Runtime Query Plan CI Auditor (`runStaticSchemaCostGuard`):
 *    - Applies schema migrations to an in-memory `better-sqlite3` (`:memory:`) DB during CI.
 *    - Verifies per-table secondary index bounds and audits parameterized runtime queries with
 *      `EXPLAIN QUERY PLAN` to guarantee zero full-table scans.
 */
export interface TableWriteCost {
    rowsChanged: number;
    secondaryIndexes: number;
    multiplier: number;
    billableWrites: number;
}
export interface CostGuardReport {
    sqlFilePath: string;
    statementCount: number;
    totalRowsChanged: number;
    totalBillableWrites: number;
    maxAllowedWrites: number;
    tableBreakdown: Record<string, TableWriteCost>;
    unindexedScans: {
        statementPreview: string;
        planDetail: string;
    }[];
    isWithinBudget: boolean;
}
export interface AuditSqlCostOptions {
    baselineDbPath?: string;
    protectedTables?: readonly string[];
}
export interface RunWithD1CostGuardOptions {
    sqlFilePath: string;
    maxWrites?: number;
    executeRemote?: boolean;
    remoteDbName?: string;
    baselineDbPath?: string;
    migrationsLogPath?: string;
    protectedTables?: readonly string[];
    rootDir?: string;
    resolveEnvVars?: () => Record<string, string>;
    patchWranglerConfig?: <T>(fn: () => T) => T;
}
export declare const DEFAULT_PROTECTED_TABLES: readonly ["games", "toys", "game_releases", "canonical_releases", "users", "user_games", "user_toys", "user_game_releases", "journal_entries", "dex_state", "sessions", "oauth_clients", "oauth_codes", "totp_credentials", "passkey_credentials", "backup_codes", "rate_limits"];
/**
 * Determines whether a SQLite `PRAGMA index_list` entry represents a secondary
 * index B-Tree that incurs an additional write per row mutation (`1 + K`).
 *
 * SQLite index `origin` codes:
 * - `'c'`: Explicit `CREATE [UNIQUE] INDEX` statement -> Secondary index (counts in K)
 * - `'u'`: Inline `UNIQUE` column or table constraint (`sqlite_autoindex_*`) -> Secondary index B-Tree on rowid tables (counts in K)
 * - `'pk'`: `PRIMARY KEY` constraint (`sqlite_autoindex_*`) -> On `WITHOUT ROWID` tables, this is the base table storage itself (already counted as the `1` in `1 + K`).
 */
export declare function isSecondaryIndexOrigin(origin: string): boolean;
/**
 * Splits a SQL script into individual statements while respecting single/double
 * quoted string literals and `--` / `/* ... * /` comments.
 */
export declare function splitSqlStatements(sqlContent: string): string[];
/**
 * Strips leading SQL line (`--`) and block (`/* ... * /`) comments so statement
 * classification regexes anchored with `^` match accurately.
 */
export declare function stripLeadingSqlComments(stmt: string): string;
export declare function extractTargetTable(stmt: string): string | null;
export declare function isCreateIndexStatement(stmt: string): boolean;
export declare function isInsertOrReplaceStatement(stmt: string): boolean;
/**
 * Audits a SQL file against a temporary sandbox copy of the baseline database.
 * Calculates exact row modifications, $(1 + K)$ index multipliers, and query plans.
 */
export declare function auditSqlCost(sqlFilePath: string, maxAllowedWrites?: number, baselineDbPathOrOptions?: string | AuditSqlCostOptions): CostGuardReport;
export declare function printCostReport(report: CostGuardReport): void;
/**
 * Executes a SQL file remotely via `wrangler d1 execute --remote` ONLY if:
 * 1. It passes the Pre-Flight Cost Guard (`totalBillableWrites <= maxWrites` and 0 unindexed scans).
 * 2. `executeRemote` (`--confirm`) is explicitly enabled.
 * 3. `totalBillableWrites > 0` (skips remote execution if 0 rows changed).
 *
 * Upon successful remote execution, applies the exact same SQL to `data/remote_baseline.db`
 * so the local clone stays in lockstep with remote D1 without needing a remote read pull.
 */
export declare function runWithD1CostGuard(options: RunWithD1CostGuardOptions): CostGuardReport;
export interface StaticSchemaCostGuardConfig {
    schemaSqlPaths: string[];
    maxSecondaryIndexes: Record<string, number>;
    criticalQueries: Array<{
        name: string;
        sql: string;
        params: unknown[];
    }>;
    countAllIndexOrigins?: boolean;
}
/**
 * Mode B: Static Schema & Runtime Query Plan CI Auditor (`npm run d1:cost-guard`).
 * Applies schema SQL files to an in-memory `:memory:` SQLite database, enforces
 * secondary index caps (`1 + K`), and runs `EXPLAIN QUERY PLAN` on critical queries.
 */
export declare function runStaticSchemaCostGuard(config: StaticSchemaCostGuardConfig): {
    passed: boolean;
    errors: string[];
    tableSummaries: string[];
};
