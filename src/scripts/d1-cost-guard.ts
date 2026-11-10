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

import Database from 'better-sqlite3';
import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

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
  unindexedScans: { statementPreview: string; planDetail: string }[];
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

export const DEFAULT_PROTECTED_TABLES = [
  'games',
  'toys',
  'game_releases',
  'canonical_releases',
  'users',
  'user_games',
  'user_toys',
  'user_game_releases',
  'journal_entries',
  'dex_state',
  'sessions',
  'oauth_clients',
  'oauth_codes',
  'totp_credentials',
  'passkey_credentials',
  'backup_codes',
  'rate_limits',
] as const;

/**
 * Determines whether a SQLite `PRAGMA index_list` entry represents a secondary
 * index B-Tree that incurs an additional write per row mutation (`1 + K`).
 *
 * SQLite index `origin` codes:
 * - `'c'`: Explicit `CREATE [UNIQUE] INDEX` statement -> Secondary index (counts in K)
 * - `'u'`: Inline `UNIQUE` column or table constraint (`sqlite_autoindex_*`) -> Secondary index B-Tree on rowid tables (counts in K)
 * - `'pk'`: `PRIMARY KEY` constraint (`sqlite_autoindex_*`) -> On `WITHOUT ROWID` tables, this is the base table storage itself (already counted as the `1` in `1 + K`).
 */
export function isSecondaryIndexOrigin(origin: string): boolean {
  return origin === 'c' || origin === 'u';
}

function getSecondaryIndexMap(db: Database.Database): Record<string, number> {
  const tables = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_cf_%'",
    )
    .all() as { name: string }[];

  const indexMap: Record<string, number> = {};
  for (const t of tables) {
    const indexes = db
      .prepare(`PRAGMA index_list("${t.name.replace(/"/g, '""')}")`)
      .all() as {
      name: string;
      origin: string;
    }[];
    const secondaryCount = indexes.filter((idx) =>
      isSecondaryIndexOrigin(idx.origin),
    ).length;
    indexMap[t.name.toLowerCase()] = secondaryCount;
  }
  return indexMap;
}

/**
 * Splits a SQL script into individual statements while respecting single/double
 * quoted string literals and `--` / `/* ... * /` comments.
 */
export function splitSqlStatements(sqlContent: string): string[] {
  const statements: string[] = [];
  let current = '';
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = 0; i < sqlContent.length; i++) {
    const ch = sqlContent[i];
    const next = sqlContent[i + 1];

    if (inLineComment) {
      if (ch === '\n') {
        inLineComment = false;
      }
      current += ch;
      continue;
    }

    if (inBlockComment) {
      if (ch === '*' && next === '/') {
        inBlockComment = false;
        current += '*/';
        i++;
        continue;
      }
      current += ch;
      continue;
    }

    if (!inSingleQuote && !inDoubleQuote) {
      if (ch === '-' && next === '-') {
        inLineComment = true;
        current += '--';
        i++;
        continue;
      }
      if (ch === '/' && next === '*') {
        inBlockComment = true;
        current += '/*';
        i++;
        continue;
      }
    }

    if (ch === "'" && !inDoubleQuote) {
      if (inSingleQuote && next === "'") {
        current += "''";
        i++;
        continue;
      }
      inSingleQuote = !inSingleQuote;
      current += ch;
      continue;
    }

    if (ch === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
      current += ch;
      continue;
    }

    if (ch === ';' && !inSingleQuote && !inDoubleQuote) {
      const trimmed = current.trim();
      if (trimmed.length > 0) {
        statements.push(trimmed);
      }
      current = '';
      continue;
    }

    current += ch;
  }

  const tail = current.trim();
  if (tail.length > 0) {
    statements.push(tail);
  }

  return statements.filter((s) => {
    const withoutComments = s
      .replace(/--.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .trim();
    return withoutComments.length > 0;
  });
}

/**
 * Strips leading SQL line (`--`) and block (`/* ... * /`) comments so statement
 * classification regexes anchored with `^` match accurately.
 */
export function stripLeadingSqlComments(stmt: string): string {
  let s = stmt.trimStart();
  while (s.length > 0) {
    if (s.startsWith('--')) {
      const nl = s.indexOf('\n');
      if (nl === -1) return '';
      s = s.slice(nl + 1).trimStart();
    } else if (s.startsWith('/*')) {
      const end = s.indexOf('*/');
      if (end === -1) return '';
      s = s.slice(end + 2).trimStart();
    } else {
      break;
    }
  }
  return s;
}

export function extractTargetTable(stmt: string): string | null {
  const cleaned = stripLeadingSqlComments(stmt);
  const insertMatch = cleaned.match(
    /^INSERT\s+(?:OR\s+\w+\s+)?INTO\s+["`[]?(\w+)["`\]]?/i,
  );
  if (insertMatch) return insertMatch[1].toLowerCase();

  const replaceMatch = cleaned.match(
    /^REPLACE\s+INTO\s+["`[]?(\w+)["`\]]?/i,
  );
  if (replaceMatch) return replaceMatch[1].toLowerCase();

  const updateMatch = cleaned.match(
    /^UPDATE\s+(?:OR\s+\w+\s+)?["`[]?(\w+)["`\]]?/i,
  );
  if (updateMatch) return updateMatch[1].toLowerCase();

  const deleteMatch = cleaned.match(
    /^DELETE\s+FROM\s+["`[]?(\w+)["`\]]?/i,
  );
  if (deleteMatch) return deleteMatch[1].toLowerCase();

  const createIndexMatch = cleaned.match(
    /^CREATE\s+(?:UNIQUE\s+)?INDEX\s+(?:IF\s+NOT\s+EXISTS\s+)?["`[]?\w+["`\]]?\s+ON\s+["`[]?(\w+)["`\]]?/i,
  );
  if (createIndexMatch) return createIndexMatch[1].toLowerCase();

  return null;
}

export function isCreateIndexStatement(stmt: string): boolean {
  return /^CREATE\s+(?:UNIQUE\s+)?INDEX\b/i.test(stripLeadingSqlComments(stmt));
}

export function isInsertOrReplaceStatement(stmt: string): boolean {
  return /^(?:INSERT\s+OR\s+REPLACE\s+INTO|REPLACE\s+INTO)\b/i.test(
    stripLeadingSqlComments(stmt),
  );
}

/**
 * Audits a SQL file against a temporary sandbox copy of the baseline database.
 * Calculates exact row modifications, $(1 + K)$ index multipliers, and query plans.
 */
export function auditSqlCost(
  sqlFilePath: string,
  maxAllowedWrites = 5000,
  baselineDbPathOrOptions?: string | AuditSqlCostOptions,
): CostGuardReport {
  const options: AuditSqlCostOptions =
    typeof baselineDbPathOrOptions === 'string'
      ? { baselineDbPath: baselineDbPathOrOptions }
      : (baselineDbPathOrOptions ?? {});

  const baselineDbPath =
    options.baselineDbPath ??
    path.resolve(process.cwd(), 'data', 'remote_baseline.db');
  const protectedTables = options.protectedTables ?? DEFAULT_PROTECTED_TABLES;
  const protectedPattern = protectedTables
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const scanRegex = new RegExp(
    `\\bSCAN\\s+(?:TABLE\\s+)?(${protectedPattern})\\b`,
    'i',
  );

  if (!fs.existsSync(sqlFilePath)) {
    throw new Error(`[CostGuard] SQL file not found: ${sqlFilePath}`);
  }
  if (!fs.existsSync(baselineDbPath)) {
    throw new Error(
      `[CostGuard] Remote baseline database not found at ${baselineDbPath}. Run d1:pull first to initialize the baseline.`,
    );
  }

  const sandboxDbPath = path.join(
    os.tmpdir(),
    `_cost_guard_sandbox_${process.pid}_${Date.now()}_${Math.random().toString(36).slice(2)}.db`,
  );
  fs.copyFileSync(baselineDbPath, sandboxDbPath);

  const db = new Database(sandboxDbPath);
  try {
    const indexMap = getSecondaryIndexMap(db);
    const rawSql = fs.readFileSync(sqlFilePath, 'utf8');
    const statements = splitSqlStatements(rawSql);

    const tableBreakdown: Record<string, TableWriteCost> = {};
    const unindexedScans: { statementPreview: string; planDetail: string }[] =
      [];
    let totalRowsChanged = 0;
    let totalBillableWrites = 0;

    // 1. Audit query plans for unindexed scans before mutating
    for (const stmt of statements) {
      const upper = stripLeadingSqlComments(stmt).toUpperCase();
      if (
        upper.startsWith('BEGIN') ||
        upper.startsWith('COMMIT') ||
        upper.startsWith('ROLLBACK') ||
        upper.startsWith('PRAGMA') ||
        upper.startsWith('CREATE ') ||
        upper.startsWith('ALTER ') ||
        upper.startsWith('DROP ')
      ) {
        continue;
      }

      try {
        const planRows = db
          .prepare(`EXPLAIN QUERY PLAN ${stmt}`)
          .all() as { detail: string }[];
        for (const row of planRows) {
          if (
            scanRegex.test(row.detail) &&
            !row.detail.includes('USING INDEX') &&
            !row.detail.includes('USING INTEGER PRIMARY KEY') &&
            !row.detail.includes('USING COVERING INDEX')
          ) {
            unindexedScans.push({
              statementPreview: stmt.replace(/\s+/g, ' ').slice(0, 100),
              planDetail: row.detail,
            });
          }
        }
      } catch {
        // Ignore EXPLAIN errors on DDL or statements referencing newly created objects
      }
    }

    // 2. Execute in sandbox transaction to measure exact row changes & index write amplification
    const changesStmt = db.prepare('SELECT changes() as c');
    db.exec('BEGIN TRANSACTION');
    try {
      for (const stmt of statements) {
        const upper = stripLeadingSqlComments(stmt).toUpperCase();
        if (
          upper.startsWith('BEGIN') ||
          upper.startsWith('COMMIT') ||
          upper.startsWith('ROLLBACK')
        ) {
          continue;
        }

        const targetTable = extractTargetTable(stmt);

        // Handle CREATE INDEX write amplification (populates 1 B-tree entry per existing row in table)
        if (targetTable && isCreateIndexStatement(stmt)) {
          const indexesBefore = db
            .prepare(
              `PRAGMA index_list("${targetTable.replace(/"/g, '""')}")`,
            )
            .all() as { name: string; origin: string }[];
          const secBefore = indexesBefore.filter((idx) =>
            isSecondaryIndexOrigin(idx.origin),
          ).length;

          db.exec(stmt);

          const indexesAfter = db
            .prepare(
              `PRAGMA index_list("${targetTable.replace(/"/g, '""')}")`,
            )
            .all() as { name: string; origin: string }[];
          const secAfter = indexesAfter.filter((idx) =>
            isSecondaryIndexOrigin(idx.origin),
          ).length;

          if (secAfter > secBefore) {
            indexMap[targetTable] = secAfter;
            const rowCountRow = db
              .prepare(
                `SELECT COUNT(*) as c FROM "${targetTable.replace(/"/g, '""')}"`,
              )
              .get() as { c: number };
            const existingRows = rowCountRow?.c || 0;
            if (existingRows > 0) {
              if (!tableBreakdown[targetTable]) {
                tableBreakdown[targetTable] = {
                  rowsChanged: 0,
                  secondaryIndexes: secAfter,
                  multiplier: 1 + secAfter,
                  billableWrites: 0,
                };
              } else {
                tableBreakdown[targetTable].secondaryIndexes = secAfter;
                tableBreakdown[targetTable].multiplier = 1 + secAfter;
              }
              tableBreakdown[targetTable].rowsChanged += existingRows;
              tableBreakdown[targetTable].billableWrites += existingRows;
              totalRowsChanged += existingRows;
              totalBillableWrites += existingRows;
            }
          }
          continue;
        }

        const isReplace = Boolean(
          targetTable && isInsertOrReplaceStatement(stmt),
        );
        let countBefore = 0;
        if (isReplace && targetTable) {
          const r = db
            .prepare(
              `SELECT COUNT(*) as c FROM "${targetTable.replace(/"/g, '""')}"`,
            )
            .get() as { c: number };
          countBefore = r?.c || 0;
        }

        db.exec(stmt);

        if (targetTable) {
          const changes = (changesStmt.get() as { c: number }).c;
          if (changes > 0) {
            const k = indexMap[targetTable] ?? 0;
            const multiplier = 1 + k;

            // INSERT OR REPLACE on an existing row performs a DELETE + INSERT (2x write amplification)
            let effectiveRowOps = changes;
            if (isReplace) {
              const rAfter = db
                .prepare(
                  `SELECT COUNT(*) as c FROM "${targetTable.replace(/"/g, '""')}"`,
                )
                .get() as { c: number };
              const countAfter = rAfter?.c || 0;
              const netInserted = Math.max(0, countAfter - countBefore);
              const replacedCount = Math.max(0, changes - netInserted);
              effectiveRowOps = netInserted + replacedCount * 2;
            }

            const billable = effectiveRowOps * multiplier;

            if (!tableBreakdown[targetTable]) {
              tableBreakdown[targetTable] = {
                rowsChanged: 0,
                secondaryIndexes: k,
                multiplier,
                billableWrites: 0,
              };
            }
            tableBreakdown[targetTable].rowsChanged += changes;
            tableBreakdown[targetTable].billableWrites += billable;

            totalRowsChanged += changes;
            totalBillableWrites += billable;
          }
        }
      }
    } finally {
      db.exec('ROLLBACK');
    }

    return {
      sqlFilePath,
      statementCount: statements.length,
      totalRowsChanged,
      totalBillableWrites,
      maxAllowedWrites,
      tableBreakdown,
      unindexedScans,
      isWithinBudget:
        totalBillableWrites <= maxAllowedWrites && unindexedScans.length === 0,
    };
  } finally {
    db.close();
    for (const suffix of ['', '-wal', '-shm']) {
      const p = sandboxDbPath + suffix;
      if (fs.existsSync(p)) {
        try {
          fs.unlinkSync(p);
        } catch {
          // Ignore cleanup errors on Windows file locks
        }
      }
    }
  }
}

export function printCostReport(report: CostGuardReport): void {
  console.log('\n======================================================');
  console.log(' 🛡️  D1 PRE-FLIGHT COST GUARD REPORT');
  console.log('======================================================');
  console.log(` SQL File           : ${path.basename(report.sqlFilePath)}`);
  console.log(` Statements         : ${report.statementCount}`);
  console.log(` Total Rows Changed : ${report.totalRowsChanged}`);
  console.log(
    ` Est. D1 Writes     : ${report.totalBillableWrites} (Budget: ${report.maxAllowedWrites})`,
  );
  console.log('------------------------------------------------------');

  const tables = Object.entries(report.tableBreakdown);
  if (tables.length === 0) {
    console.log(' No rows modified (0 billable writes — no-op delta!).');
  } else {
    for (const [table, stats] of tables) {
      console.log(
        ` • ${table.padEnd(20)}: ${String(stats.rowsChanged).padStart(5)} rows × ${stats.multiplier} (1 + ${stats.secondaryIndexes} idx) = ${stats.billableWrites} writes`,
      );
    }
  }

  if (report.unindexedScans.length > 0) {
    console.log('------------------------------------------------------');
    console.error(
      ` ❌ UNINDEXED TABLE SCANS DETECTED (${report.unindexedScans.length}):`,
    );
    for (const scan of report.unindexedScans.slice(0, 5)) {
      console.error(`   Plan : ${scan.planDetail}`);
      console.error(`   SQL  : ${scan.statementPreview}...`);
    }
  }
  console.log('======================================================\n');
}

/**
 * Executes a SQL file remotely via `wrangler d1 execute --remote` ONLY if:
 * 1. It passes the Pre-Flight Cost Guard (`totalBillableWrites <= maxWrites` and 0 unindexed scans).
 * 2. `executeRemote` (`--confirm`) is explicitly enabled.
 * 3. `totalBillableWrites > 0` (skips remote execution if 0 rows changed).
 *
 * Upon successful remote execution, applies the exact same SQL to `data/remote_baseline.db`
 * so the local clone stays in lockstep with remote D1 without needing a remote read pull.
 */
export function runWithD1CostGuard(options: RunWithD1CostGuardOptions): CostGuardReport {
  const maxWrites = options.maxWrites ?? 5000;
  const executeRemote = options.executeRemote ?? false;
  const remoteDbName = options.remoteDbName ?? 'collection_db';
  const rootDir = options.rootDir ?? process.cwd();
  const baselineDbPath =
    options.baselineDbPath ?? path.join(rootDir, 'data', 'remote_baseline.db');
  const migrationsLogPath =
    options.migrationsLogPath ??
    path.join(rootDir, 'data', 'remote_migrations_log.json');

  const report = auditSqlCost(options.sqlFilePath, maxWrites, {
    baselineDbPath,
    protectedTables: options.protectedTables,
  });
  printCostReport(report);

  if (report.unindexedScans.length > 0) {
    throw new Error(
      `[CostGuard] Aborting: ${report.unindexedScans.length} unindexed table scan(s) detected.`,
    );
  }

  if (report.totalBillableWrites > maxWrites) {
    throw new Error(
      `[CostGuard] Aborting: Estimated ${report.totalBillableWrites} billable writes exceeds budget of ${maxWrites}. Pass a higher --max-writes=<N> if intentional.`,
    );
  }

  if (report.totalBillableWrites === 0) {
    console.log(
      '[CostGuard] ✅ 0 rows changed against remote baseline. Skipping remote D1 execution entirely!',
    );
    return report;
  }

  if (!executeRemote) {
    console.log(
      '[CostGuard] ℹ️ Dry-run complete. Re-run with --confirm to execute against remote D1 and update data/remote_baseline.db.',
    );
    return report;
  }

  console.log(
    `[CostGuard] 🚀 Executing ${path.basename(options.sqlFilePath)} against remote D1 (${report.totalBillableWrites} billable writes)...`,
  );

  const rawSql = fs.readFileSync(options.sqlFilePath, 'utf8');
  const allStatements = splitSqlStatements(rawSql).filter((s) => {
    const u = stripLeadingSqlComments(s).toUpperCase();
    return (
      !u.startsWith('BEGIN') &&
      !u.startsWith('COMMIT') &&
      !u.startsWith('ROLLBACK')
    );
  });

  const MAX_BATCH_BYTES = 7500;
  const batches: string[][] = [];
  let currentBatch: string[] = [];
  let currentBytes = 0;

  for (const stmt of allStatements) {
    const stmtWithSemi = `${stmt};`;
    const byteLen = Buffer.byteLength(stmtWithSemi, 'utf8');
    if (
      currentBatch.length > 0 &&
      currentBytes + byteLen > MAX_BATCH_BYTES
    ) {
      batches.push(currentBatch);
      currentBatch = [];
      currentBytes = 0;
    }
    currentBatch.push(stmtWithSemi);
    currentBytes += byteLen + 1;
  }
  if (currentBatch.length > 0) {
    batches.push(currentBatch);
  }

  const resolvedVars = options.resolveEnvVars ? options.resolveEnvVars() : {};
  const execEnv: NodeJS.ProcessEnv = { ...process.env, ...resolvedVars };
  delete execEnv['CLOUDFLARE_API_TOKEN'];

  const runBatches = () => {
    const baselineDb = new Database(baselineDbPath);
    try {
      for (let i = 0; i < batches.length; i++) {
        const batchSql = batches[i].join('\n');
        const batchPath = path.join(
          os.tmpdir(),
          `_remote_batch_${process.pid}_${i}.sql`,
        );
        fs.writeFileSync(batchPath, batchSql, 'utf8');
        try {
          if (batches.length > 1) {
            console.log(
              `[CostGuard]   -> Remote batch ${i + 1}/${batches.length} (${batches[i].length} statements)...`,
            );
          }
          execFileSync(
            'npx',
            [
              'wrangler',
              'd1',
              'execute',
              remoteDbName,
              '--remote',
              `--file=${batchPath}`,
              '--yes',
            ],
            {
              cwd: rootDir,
              stdio: 'inherit',
              shell: process.platform === 'win32',
              env: execEnv,
              timeout: 120_000,
            },
          );
          baselineDb.exec('BEGIN TRANSACTION');
          try {
            baselineDb.exec(batchSql);
            baselineDb.exec('COMMIT');
          } catch (e) {
            baselineDb.exec('ROLLBACK');
            throw e;
          }
        } finally {
          if (fs.existsSync(batchPath)) {
            fs.unlinkSync(batchPath);
          }
        }
      }
    } finally {
      baselineDb.close();
    }
  };

  if (options.patchWranglerConfig) {
    options.patchWranglerConfig(runBatches);
  } else {
    runBatches();
  }

  let logEntries: unknown[] = [];
  if (fs.existsSync(migrationsLogPath)) {
    try {
      logEntries = JSON.parse(fs.readFileSync(migrationsLogPath, 'utf8'));
    } catch {
      logEntries = [];
    }
  }
  logEntries.push({
    timestamp: new Date().toISOString(),
    sqlFile: path.basename(options.sqlFilePath),
    rowsChanged: report.totalRowsChanged,
    billableWrites: report.totalBillableWrites,
    sqlStatements: allStatements,
  });
  const logDir = path.dirname(migrationsLogPath);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  fs.writeFileSync(migrationsLogPath, JSON.stringify(logEntries, null, 2));

  console.log(
    '[CostGuard] ✅ Remote D1 and local data/remote_baseline.db updated in lockstep.',
  );
  return report;
}

export interface StaticSchemaCostGuardConfig {
  schemaSqlPaths: string[];
  maxSecondaryIndexes: Record<string, number>;
  criticalQueries: Array<{ name: string; sql: string; params: unknown[] }>;
  countAllIndexOrigins?: boolean;
}

/**
 * Mode B: Static Schema & Runtime Query Plan CI Auditor (`npm run d1:cost-guard`).
 * Applies schema SQL files to an in-memory `:memory:` SQLite database, enforces
 * secondary index caps (`1 + K`), and runs `EXPLAIN QUERY PLAN` on critical queries.
 */
export function runStaticSchemaCostGuard(
  config: StaticSchemaCostGuardConfig,
): { passed: boolean; errors: string[]; tableSummaries: string[] } {
  const db = new Database(':memory:');
  const errors: string[] = [];
  const tableSummaries: string[] = [];

  try {
    for (const filePath of config.schemaSqlPaths) {
      if (!fs.existsSync(filePath)) {
        errors.push(`Missing migration file: ${filePath}`);
        continue;
      }
      db.exec(fs.readFileSync(filePath, 'utf8'));
    }

    for (const [table, maxIdx] of Object.entries(config.maxSecondaryIndexes)) {
      const indexes = db
        .prepare(`PRAGMA index_list("${table.replace(/"/g, '""')}")`)
        .all() as Array<{
        name: string;
        unique: number;
        origin: string;
      }>;
      const countedIndexes = config.countAllIndexOrigins
        ? indexes.length
        : indexes.filter((idx) => isSecondaryIndexOrigin(idx.origin)).length;
      const writeMultiplier = 1 + countedIndexes;
      tableSummaries.push(
        `[d1-cost-guard] Table '${table}': ${countedIndexes} index(es) -> Write amplification = ${writeMultiplier}x (1 + ${countedIndexes})`,
      );
      if (countedIndexes > maxIdx) {
        errors.push(
          `Table '${table}' has ${countedIndexes} indexes, exceeding max allowed (${maxIdx}).`,
        );
      }
    }

    for (const q of config.criticalQueries) {
      const planRows = db
        .prepare(`EXPLAIN QUERY PLAN ${q.sql}`)
        .all(...q.params) as Array<{ detail: string }>;
      const details = planRows.map((r) => r.detail).join(' | ');
      const hasFullScan = planRows.some(
        (r) =>
          /\bSCAN\b/i.test(r.detail) &&
          !/USING COVERING INDEX/i.test(r.detail) &&
          !/USING INDEX/i.test(r.detail) &&
          !/USING INTEGER PRIMARY KEY/i.test(r.detail),
      );
      if (hasFullScan) {
        errors.push(
          `Unindexed table SCAN detected in '${q.name}': ${details}`,
        );
      } else {
        tableSummaries.push(`[d1-cost-guard] Query '${q.name}': ${details}`);
      }
    }

    return {
      passed: errors.length === 0,
      errors,
      tableSummaries,
    };
  } finally {
    db.close();
  }
}
