/**
 * REMOTE D1 SCHEMA DRIFT CHECK (@wesdizzle/app-kit/scripts)
 *
 * Compares the tables, indexes, triggers, and views defined in `migrations/schema.sql`
 * against the live remote D1 `sqlite_master` (~100 row reads, 0 writes). Local clones,
 * query plans, and `d1:cost-guard` are built from `schema.sql`, so any drift means
 * local pre-flight results may not reflect remote cost (e.g. a missing FK index turns
 * an indexed DELETE into a full table scan).
 *
 * The real database ID is read from `.dev.vars` (`D1_DATABASE_ID`) and injected into a
 * temporary wrangler config that is always deleted in a `finally` block; no IDs are
 * written to tracked files.
 */
export interface D1SchemaObject {
    type: string;
    name: string;
    tbl_name: string;
}
export interface D1SchemaDriftReport {
    expected: D1SchemaObject[];
    remote: D1SchemaObject[];
    missing: D1SchemaObject[];
    acceptedMissing: D1SchemaObject[];
    extra: D1SchemaObject[];
    inSync: boolean;
}
export interface D1SchemaDriftOptions {
    /** Workspace root directory (defaults to `process.cwd()`). */
    rootDir?: string;
    /** Path to `schema.sql` (defaults to `<rootDir>/migrations/schema.sql`). */
    schemaSqlPath?: string;
    /** Remote D1 database name (auto-detected from `wrangler.toml` `database_name` if omitted). */
    remoteDbName?: string;
    /** Placeholder `database_id` in `wrangler.toml` to replace (defaults to `'local-dev-db'`). */
    placeholderDatabaseId?: string;
    /** Set of `${type}:${name}` keys that are known/accepted missing on remote. */
    acceptedMissing?: ReadonlySet<string> | readonly string[];
    /** Additional object names to ignore on either side. */
    ignoredNames?: ReadonlySet<string> | readonly string[];
    /** If true (or if `--report` is in `process.argv`), do not `process.exit(1)` on missing objects. */
    reportOnly?: boolean;
    /** Optional override for supplying remote objects in unit tests without invoking `wrangler`. */
    fetchRemoteObjects?: () => D1SchemaObject[];
}
export declare function isIgnoredD1SchemaObject(name: string, extraIgnored?: ReadonlySet<string>): boolean;
export declare function loadExpectedSchemaObjects(schemaSqlPath: string, extraIgnored?: ReadonlySet<string>): D1SchemaObject[];
export declare function readD1DatabaseIdFromDevVars(rootDir: string): string;
export declare function detectWranglerDatabaseName(tomlContent: string): string;
export declare function fetchRemoteD1SchemaObjects(rootDir: string, options?: {
    remoteDbName?: string;
    placeholderDatabaseId?: string;
    extraIgnored?: ReadonlySet<string>;
}): D1SchemaObject[];
export declare function runD1SchemaDriftCheck(options?: D1SchemaDriftOptions): D1SchemaDriftReport;
