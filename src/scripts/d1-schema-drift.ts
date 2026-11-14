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

import Database from 'better-sqlite3';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

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

const DEFAULT_IGNORED = new Set(['d1_migrations', 'sqlite_sequence']);

export function isIgnoredD1SchemaObject(
  name: string,
  extraIgnored?: ReadonlySet<string>,
): boolean {
  return (
    DEFAULT_IGNORED.has(name) ||
    Boolean(extraIgnored?.has(name)) ||
    name.startsWith('sqlite_autoindex_') ||
    name.startsWith('_cf_')
  );
}

export function loadExpectedSchemaObjects(
  schemaSqlPath: string,
  extraIgnored?: ReadonlySet<string>,
): D1SchemaObject[] {
  const db = new Database(':memory:');
  try {
    db.exec(fs.readFileSync(schemaSqlPath, 'utf8'));
    return (
      db
        .prepare(
          `SELECT type, name, tbl_name FROM sqlite_master WHERE type IN ('table', 'index', 'trigger', 'view')`,
        )
        .all() as D1SchemaObject[]
    ).filter((o) => !isIgnoredD1SchemaObject(o.name, extraIgnored));
  } finally {
    db.close();
  }
}

export function readD1DatabaseIdFromDevVars(rootDir: string): string {
  const devVarsPath = path.join(rootDir, '.dev.vars');
  if (!fs.existsSync(devVarsPath)) {
    throw new Error('.dev.vars not found (needed for D1_DATABASE_ID).');
  }
  const match = fs
    .readFileSync(devVarsPath, 'utf8')
    .match(/^D1_DATABASE_ID\s*=\s*["']?([^"'\r\n]+)["']?/m);
  if (!match) {
    throw new Error('D1_DATABASE_ID not found in .dev.vars.');
  }
  return match[1].trim();
}

export function detectWranglerDatabaseName(tomlContent: string): string {
  const match = tomlContent.match(
    /^\s*database_name\s*=\s*["']([^"'\r\n]+)["']/m,
  );
  if (!match) {
    throw new Error(
      'Could not auto-detect `database_name` from wrangler.toml. Pass `remoteDbName` explicitly.',
    );
  }
  return match[1].trim();
}

export function fetchRemoteD1SchemaObjects(
  rootDir: string,
  options?: {
    remoteDbName?: string;
    placeholderDatabaseId?: string;
    extraIgnored?: ReadonlySet<string>;
  },
): D1SchemaObject[] {
  const tomlPath = path.join(rootDir, 'wrangler.toml');
  const tomlContent = fs.readFileSync(tomlPath, 'utf8');
  const remoteDbName =
    options?.remoteDbName ?? detectWranglerDatabaseName(tomlContent);
  const placeholder = options?.placeholderDatabaseId ?? 'local-dev-db';

  const tempToml = path.join(
    rootDir,
    'scripts',
    'temp',
    `_wrangler_drift_${process.pid}.toml`,
  );
  fs.mkdirSync(path.dirname(tempToml), { recursive: true });
  try {
    fs.writeFileSync(
      tempToml,
      tomlContent.replace(placeholder, readD1DatabaseIdFromDevVars(rootDir)),
      'utf8',
    );
    const sql = `SELECT type, name, tbl_name FROM sqlite_master WHERE type IN ('table','index','trigger','view')`;
    const out = execSync(
      `npx wrangler d1 execute ${remoteDbName} --remote -c "${tempToml}" --json --command "${sql}"`,
      { cwd: rootDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
    );
    const parsed = JSON.parse(out) as Array<{
      results: D1SchemaObject[];
      meta?: { rows_read?: number };
    }>;
    console.log(
      `[d1-schema-drift] Remote sqlite_master read (${parsed[0].meta?.rows_read ?? '?'} rows read, 0 writes).`,
    );
    return parsed[0].results.filter(
      (o) => !isIgnoredD1SchemaObject(o.name, options?.extraIgnored),
    );
  } finally {
    if (fs.existsSync(tempToml)) {
      fs.unlinkSync(tempToml);
    }
  }
}

export function runD1SchemaDriftCheck(
  options: D1SchemaDriftOptions = {},
): D1SchemaDriftReport {
  const rootDir = options.rootDir ?? process.cwd();
  const reportOnly = options.reportOnly ?? process.argv.includes('--report');
  const schemaSqlPath =
    options.schemaSqlPath ?? path.join(rootDir, 'migrations', 'schema.sql');

  const acceptedSet =
    options.acceptedMissing instanceof Set
      ? options.acceptedMissing
      : new Set(options.acceptedMissing ?? []);
  const extraIgnored =
    options.ignoredNames instanceof Set
      ? options.ignoredNames
      : new Set(options.ignoredNames ?? []);

  const expected = loadExpectedSchemaObjects(schemaSqlPath, extraIgnored);
  const remote = options.fetchRemoteObjects
    ? options
        .fetchRemoteObjects()
        .filter((o) => !isIgnoredD1SchemaObject(o.name, extraIgnored))
    : fetchRemoteD1SchemaObjects(rootDir, {
        remoteDbName: options.remoteDbName,
        placeholderDatabaseId: options.placeholderDatabaseId,
        extraIgnored,
      });

  const key = (o: D1SchemaObject) => `${o.type}:${o.name}`;
  const remoteKeys = new Set(remote.map(key));
  const expectedKeys = new Set(expected.map(key));

  const missingAll = expected.filter((o) => !remoteKeys.has(key(o)));
  const acceptedMissing = missingAll.filter((o) => acceptedSet.has(key(o)));
  const missing = missingAll.filter((o) => !acceptedSet.has(key(o)));
  const extra = remote.filter((o) => !expectedKeys.has(key(o)));

  for (const o of acceptedMissing) {
    console.log(
      `[d1-schema-drift] ℹ️  Accepted drift (missing on remote by design): ${o.type} ${o.name} (on ${o.tbl_name})`,
    );
  }

  if (missing.length === 0 && extra.length === 0) {
    console.log(
      '[d1-schema-drift] ✅ Remote D1 matches migrations/schema.sql (apart from accepted drift).',
    );
  } else {
    for (const o of missing) {
      console.log(
        `[d1-schema-drift] ❌ MISSING on remote: ${o.type} ${o.name} (on ${o.tbl_name})`,
      );
    }
    for (const o of extra) {
      console.log(
        `[d1-schema-drift] ⚠️  EXTRA on remote (not in schema.sql): ${o.type} ${o.name} (on ${o.tbl_name})`,
      );
    }
    if (missing.length > 0 && !reportOnly) {
      console.log(
        '[d1-schema-drift] Local plans/cost estimates may understate remote cost until drift is resolved.',
      );
      process.exit(1);
    }
  }

  return {
    expected,
    remote,
    missing,
    acceptedMissing,
    extra,
    inSync: missing.length === 0 && extra.length === 0,
  };
}
