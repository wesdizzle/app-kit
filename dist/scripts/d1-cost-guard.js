/**
 * D1 PRE-FLIGHT COST GUARD, SCHEMA DIFFER & STATIC QUERY PLAN AUDITOR (@wesdizzle/app-kit/scripts)
 *
 * Provides three complementary D1 cost & schema protection modes:
 * 1. Pre-Flight SQL Migration Sandbox Cost Guard (`auditSqlCost`, `printCostReport`, `runWithD1CostGuard`):
 *    - Validates SQL delta files against a local clone of remote state (`data/remote_baseline.db`)
 *      in an isolated `os.tmpdir()` sandbox before any remote execution.
 *    - Accounts for $(1 + K)$ write amplification across explicit `CREATE INDEX` (`origin === 'c'`),
 *      inline `UNIQUE` auto-indexes (`origin === 'u'`), and `PRIMARY KEY` auto-indexes (`origin === 'pk'`)
 *      on standard `rowid` tables, while excluding `'pk'` on `WITHOUT ROWID` tables (where the PK B-tree
 *      is the base table storage itself).
 *    - Accounts for `CREATE INDEX` $N$-row B-Tree population writes and increments $(1 + K)$ for
 *      subsequent statements in the same migration.
 *    - Accounts for `INSERT OR REPLACE` / `REPLACE INTO` $2 \times (1 + K)$ write amplification on
 *      replaced rows (`netInserted + replacedCount * 2`).
 *    - Runs `EXPLAIN QUERY PLAN` on every statement to block unindexed table scans on protected tables.
 * 2. Declarative Schema Differ (`diffSqliteSchema`):
 *    - Compares an R2-hydrated `data/remote_baseline.db` against `:memory:` initialized from canonical
 *      `migrations/schema.sql` and emits minimal additive `CREATE TABLE`, `ALTER TABLE ... ADD COLUMN`,
 *      and `CREATE INDEX` statements (plus warnings for destructive/incompatible drift).
 * 3. Static Schema & Runtime Query Plan CI Auditor (`runStaticSchemaCostGuard`):
 *    - Applies `migrations/schema.sql` to an in-memory `better-sqlite3` (`:memory:`) DB during CI.
 *    - Verifies per-table secondary index bounds and audits parameterized runtime queries with
 *      `EXPLAIN QUERY PLAN` to guarantee zero full-table scans.
 */
import Database from 'better-sqlite3';
import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
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
    'auth_codes',
    'action_tokens',
    'user_client_access',
    'totp_credentials',
    'passkey_credentials',
    'backup_codes',
    'rate_limits',
];
/**
 * Determines whether a SQLite table was declared with `WITHOUT ROWID`.
 */
export function isTableWithoutRowid(db, tableName) {
    const row = db
        .prepare("SELECT sql FROM sqlite_master WHERE type='table' AND lower(name)=lower(?)")
        .get(tableName);
    return Boolean(row?.sql && /\bWITHOUT\s+ROWID\b/i.test(row.sql));
}
/**
 * Determines whether a SQLite `PRAGMA index_list` entry represents a secondary
 * index B-Tree that incurs an additional write per row mutation (`1 + K`).
 *
 * SQLite index `origin` codes:
 * - `'c'`: Explicit `CREATE [UNIQUE] INDEX` statement -> Secondary index (counts in K)
 * - `'u'`: Inline `UNIQUE` column or table constraint (`sqlite_autoindex_*`) -> Secondary index B-Tree (counts in K)
 * - `'pk'`: `PRIMARY KEY` auto-index (`sqlite_autoindex_*` for TEXT or composite PKs):
 *   - On `WITHOUT ROWID` tables (`isWithoutRowid === true`), this IS the base table storage (`false`).
 *   - On standard `rowid` tables (`isWithoutRowid === false`), this is an additional B-Tree alongside the `rowid` table (`true`).
 *   (Note: `INTEGER PRIMARY KEY` on a `rowid` table aliases `rowid` directly and does not appear in `PRAGMA index_list`.)
 */
export function isSecondaryIndexOrigin(origin, isWithoutRowid = false) {
    if (origin === 'c' || origin === 'u') {
        return true;
    }
    if (origin === 'pk') {
        return !isWithoutRowid;
    }
    return false;
}
function countTableSecondaryIndexes(db, tableName) {
    const withoutRowid = isTableWithoutRowid(db, tableName);
    const indexes = db
        .prepare(`PRAGMA index_list("${tableName.replace(/"/g, '""')}")`)
        .all();
    return indexes.filter((idx) => isSecondaryIndexOrigin(idx.origin, withoutRowid)).length;
}
function getSecondaryIndexMap(db) {
    const tables = db
        .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_cf_%'")
        .all();
    const indexMap = {};
    for (const t of tables) {
        indexMap[t.name.toLowerCase()] = countTableSecondaryIndexes(db, t.name);
    }
    return indexMap;
}
/**
 * Splits a SQL script into individual statements while respecting single/double
 * quoted string literals and `--` / `/* ... * /` comments.
 */
export function splitSqlStatements(sqlContent) {
    const statements = [];
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
export function stripLeadingSqlComments(stmt) {
    let s = stmt.trimStart();
    while (s.length > 0) {
        if (s.startsWith('--')) {
            const nl = s.indexOf('\n');
            if (nl === -1)
                return '';
            s = s.slice(nl + 1).trimStart();
        }
        else if (s.startsWith('/*')) {
            const end = s.indexOf('*/');
            if (end === -1)
                return '';
            s = s.slice(end + 2).trimStart();
        }
        else {
            break;
        }
    }
    return s;
}
export function extractTargetTable(stmt) {
    const cleaned = stripLeadingSqlComments(stmt);
    const insertMatch = cleaned.match(/^INSERT\s+(?:OR\s+\w+\s+)?INTO\s+["`[]?(\w+)["`\]]?/i);
    if (insertMatch)
        return insertMatch[1].toLowerCase();
    const replaceMatch = cleaned.match(/^REPLACE\s+INTO\s+["`[]?(\w+)["`\]]?/i);
    if (replaceMatch)
        return replaceMatch[1].toLowerCase();
    const updateMatch = cleaned.match(/^UPDATE\s+(?:OR\s+\w+\s+)?["`[]?(\w+)["`\]]?/i);
    if (updateMatch)
        return updateMatch[1].toLowerCase();
    const deleteMatch = cleaned.match(/^DELETE\s+FROM\s+["`[]?(\w+)["`\]]?/i);
    if (deleteMatch)
        return deleteMatch[1].toLowerCase();
    const createIndexMatch = cleaned.match(/^CREATE\s+(?:UNIQUE\s+)?INDEX\s+(?:IF\s+NOT\s+EXISTS\s+)?["`[]?\w+["`\]]?\s+ON\s+["`[]?(\w+)["`\]]?/i);
    if (createIndexMatch)
        return createIndexMatch[1].toLowerCase();
    return null;
}
export function isCreateIndexStatement(stmt) {
    return /^CREATE\s+(?:UNIQUE\s+)?INDEX\b/i.test(stripLeadingSqlComments(stmt));
}
export function isDdlStatement(stmt) {
    return /^(?:CREATE|ALTER|DROP)\s+/i.test(stripLeadingSqlComments(stmt));
}
export function isInsertOrReplaceStatement(stmt) {
    return /^(?:INSERT\s+OR\s+REPLACE\s+INTO|REPLACE\s+INTO)\b/i.test(stripLeadingSqlComments(stmt));
}
/**
 * Audits a SQL file against a temporary sandbox copy of the baseline database.
 * Calculates exact row modifications, $(1 + K)$ index multipliers, and query plans.
 */
export function auditSqlCost(sqlFilePath, maxAllowedWrites = 5000, baselineDbPathOrOptions) {
    const options = typeof baselineDbPathOrOptions === 'string'
        ? { baselineDbPath: baselineDbPathOrOptions }
        : (baselineDbPathOrOptions ?? {});
    const baselineDbPath = options.baselineDbPath ??
        path.resolve(process.cwd(), 'data', 'remote_baseline.db');
    const protectedTables = options.protectedTables ?? DEFAULT_PROTECTED_TABLES;
    const protectedPattern = protectedTables
        .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('|');
    const scanRegex = new RegExp(`\\bSCAN\\s+(?:TABLE\\s+)?(${protectedPattern})\\b`, 'i');
    if (!fs.existsSync(sqlFilePath)) {
        throw new Error(`[CostGuard] SQL file not found: ${sqlFilePath}`);
    }
    if (!fs.existsSync(baselineDbPath)) {
        throw new Error(`[CostGuard] Remote baseline database not found at ${baselineDbPath}. Run d1:pull first to initialize the baseline.`);
    }
    const sandboxDbPath = path.join(os.tmpdir(), `_cost_guard_sandbox_${process.pid}_${Date.now()}_${Math.random().toString(36).slice(2)}.db`);
    fs.copyFileSync(baselineDbPath, sandboxDbPath);
    const db = new Database(sandboxDbPath);
    try {
        const indexMap = getSecondaryIndexMap(db);
        const rawSql = fs.readFileSync(sqlFilePath, 'utf8');
        const statements = splitSqlStatements(rawSql);
        const hasDdlStatements = statements.some((s) => isDdlStatement(s));
        const tableBreakdown = {};
        const unindexedScans = [];
        let totalRowsChanged = 0;
        let totalBillableWrites = 0;
        // 1. Audit query plans for unindexed scans before mutating
        for (const stmt of statements) {
            const upper = stripLeadingSqlComments(stmt).toUpperCase();
            if (upper.startsWith('BEGIN') ||
                upper.startsWith('COMMIT') ||
                upper.startsWith('ROLLBACK') ||
                upper.startsWith('PRAGMA') ||
                upper.startsWith('CREATE ') ||
                upper.startsWith('ALTER ') ||
                upper.startsWith('DROP ')) {
                continue;
            }
            try {
                const planRows = db.prepare(`EXPLAIN QUERY PLAN ${stmt}`).all();
                for (const row of planRows) {
                    if (scanRegex.test(row.detail) &&
                        !row.detail.includes('USING INDEX') &&
                        !row.detail.includes('USING INTEGER PRIMARY KEY') &&
                        !row.detail.includes('USING PRIMARY KEY') &&
                        !row.detail.includes('USING COVERING INDEX')) {
                        unindexedScans.push({
                            statementPreview: stmt.replace(/\s+/g, ' ').slice(0, 100),
                            planDetail: row.detail,
                        });
                    }
                }
            }
            catch {
                // Ignore EXPLAIN errors on DDL or statements referencing newly created objects
            }
        }
        // 2. Execute in sandbox transaction to measure exact row changes & index write amplification
        const changesStmt = db.prepare('SELECT changes() as c');
        db.exec('BEGIN TRANSACTION');
        try {
            for (const stmt of statements) {
                const upper = stripLeadingSqlComments(stmt).toUpperCase();
                if (upper.startsWith('BEGIN') ||
                    upper.startsWith('COMMIT') ||
                    upper.startsWith('ROLLBACK')) {
                    continue;
                }
                const targetTable = extractTargetTable(stmt);
                // Refresh index map if CREATE TABLE was executed
                if (/^CREATE\s+TABLE\b/i.test(upper)) {
                    db.exec(stmt);
                    Object.assign(indexMap, getSecondaryIndexMap(db));
                    continue;
                }
                // Handle CREATE INDEX write amplification (populates 1 B-tree entry per existing row in table)
                if (targetTable && isCreateIndexStatement(stmt)) {
                    const secBefore = countTableSecondaryIndexes(db, targetTable);
                    db.exec(stmt);
                    const secAfter = countTableSecondaryIndexes(db, targetTable);
                    if (secAfter > secBefore) {
                        indexMap[targetTable] = secAfter;
                        const rowCountRow = db
                            .prepare(`SELECT COUNT(*) as c FROM "${targetTable.replace(/"/g, '""')}"`)
                            .get();
                        const existingRows = rowCountRow?.c || 0;
                        if (existingRows > 0) {
                            if (!tableBreakdown[targetTable]) {
                                tableBreakdown[targetTable] = {
                                    rowsChanged: 0,
                                    secondaryIndexes: secAfter,
                                    multiplier: 1 + secAfter,
                                    billableWrites: 0,
                                };
                            }
                            else {
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
                const isReplace = Boolean(targetTable && isInsertOrReplaceStatement(stmt));
                let countBefore = 0;
                if (isReplace && targetTable) {
                    const r = db
                        .prepare(`SELECT COUNT(*) as c FROM "${targetTable.replace(/"/g, '""')}"`)
                        .get();
                    countBefore = r?.c || 0;
                }
                db.exec(stmt);
                if (targetTable) {
                    const changes = changesStmt.get().c;
                    if (changes > 0) {
                        const k = indexMap[targetTable] ??
                            countTableSecondaryIndexes(db, targetTable);
                        indexMap[targetTable] = k;
                        const multiplier = 1 + k;
                        // INSERT OR REPLACE on an existing row performs a DELETE + INSERT (2x write amplification)
                        let effectiveRowOps = changes;
                        if (isReplace) {
                            const rAfter = db
                                .prepare(`SELECT COUNT(*) as c FROM "${targetTable.replace(/"/g, '""')}"`)
                                .get();
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
                        tableBreakdown[targetTable].rowsChanged += effectiveRowOps;
                        tableBreakdown[targetTable].billableWrites += billable;
                        totalRowsChanged += effectiveRowOps;
                        totalBillableWrites += billable;
                    }
                }
            }
        }
        finally {
            db.exec('ROLLBACK');
        }
        return {
            sqlFilePath,
            statementCount: statements.length,
            hasDdlStatements,
            totalRowsChanged,
            totalBillableWrites,
            maxAllowedWrites,
            tableBreakdown,
            unindexedScans,
            isWithinBudget: totalBillableWrites <= maxAllowedWrites && unindexedScans.length === 0,
        };
    }
    finally {
        db.close();
        for (const suffix of ['', '-wal', '-shm']) {
            const p = sandboxDbPath + suffix;
            if (fs.existsSync(p)) {
                try {
                    fs.unlinkSync(p);
                }
                catch {
                    // Ignore cleanup errors on Windows file locks
                }
            }
        }
    }
}
export function printCostReport(report) {
    console.log('\n======================================================');
    console.log(' 🛡️  D1 PRE-FLIGHT COST GUARD REPORT');
    console.log('======================================================');
    console.log(` SQL File           : ${path.basename(report.sqlFilePath)}`);
    console.log(` Statements         : ${report.statementCount}`);
    console.log(` DDL Statements     : ${report.hasDdlStatements ? 'yes' : 'no'}`);
    console.log(` Total Rows Changed : ${report.totalRowsChanged}`);
    console.log(` Est. D1 Writes     : ${report.totalBillableWrites} (Budget: ${report.maxAllowedWrites})`);
    console.log('------------------------------------------------------');
    const tables = Object.entries(report.tableBreakdown);
    if (tables.length === 0) {
        console.log(report.hasDdlStatements
            ? ' Pure DDL schema delta (0 row data writes).'
            : ' No rows modified (0 billable writes — no-op delta!).');
    }
    else {
        for (const [table, stats] of tables) {
            console.log(` • ${table.padEnd(20)}: ${String(stats.rowsChanged).padStart(5)} rows × ${stats.multiplier} (1 + ${stats.secondaryIndexes} idx) = ${stats.billableWrites} writes`);
        }
    }
    if (report.unindexedScans.length > 0) {
        console.log('------------------------------------------------------');
        console.error(` ❌ UNINDEXED TABLE SCANS DETECTED (${report.unindexedScans.length}):`);
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
 * 3. `totalBillableWrites > 0` OR `hasDdlStatements === true` (skips pure DML no-ops).
 *
 * Upon successful remote execution, applies the exact same SQL to `data/remote_baseline.db`
 * so the local clone stays in lockstep with remote D1 without needing a remote read pull.
 */
export function runWithD1CostGuard(options) {
    const maxWrites = options.maxWrites ?? 5000;
    const executeRemote = options.executeRemote ?? false;
    const remoteDbName = options.remoteDbName ?? 'collection_db';
    const rootDir = options.rootDir ?? process.cwd();
    const baselineDbPath = options.baselineDbPath ?? path.join(rootDir, 'data', 'remote_baseline.db');
    const migrationsLogPath = options.migrationsLogPath ??
        path.join(rootDir, 'data', 'remote_migrations_log.json');
    const report = auditSqlCost(options.sqlFilePath, maxWrites, {
        baselineDbPath,
        protectedTables: options.protectedTables,
    });
    printCostReport(report);
    if (report.unindexedScans.length > 0) {
        throw new Error(`[CostGuard] Aborting: ${report.unindexedScans.length} unindexed table scan(s) detected.`);
    }
    if (report.totalBillableWrites > maxWrites) {
        throw new Error(`[CostGuard] Aborting: Estimated ${report.totalBillableWrites} billable writes exceeds budget of ${maxWrites}. Pass a higher --max-writes=<N> if intentional.`);
    }
    if (report.totalBillableWrites === 0 && !report.hasDdlStatements) {
        console.log('[CostGuard] ✅ 0 rows changed against remote baseline and no DDL statements present. Skipping remote D1 execution entirely!');
        return report;
    }
    if (!executeRemote) {
        console.log('[CostGuard] ℹ️ Dry-run complete. Re-run with --confirm to execute against remote D1 and update data/remote_baseline.db.');
        return report;
    }
    console.log(`[CostGuard] 🚀 Executing ${path.basename(options.sqlFilePath)} against remote D1 (${report.totalBillableWrites} billable writes)...`);
    const rawSql = fs.readFileSync(options.sqlFilePath, 'utf8');
    const allStatements = splitSqlStatements(rawSql).filter((s) => {
        const u = stripLeadingSqlComments(s).toUpperCase();
        return (!u.startsWith('BEGIN') &&
            !u.startsWith('COMMIT') &&
            !u.startsWith('ROLLBACK'));
    });
    const MAX_BATCH_BYTES = 7500;
    const batches = [];
    let currentBatch = [];
    let currentBytes = 0;
    for (const stmt of allStatements) {
        const stmtWithSemi = `${stmt};`;
        const byteLen = Buffer.byteLength(stmtWithSemi, 'utf8');
        if (currentBatch.length > 0 && currentBytes + byteLen > MAX_BATCH_BYTES) {
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
    const execEnv = { ...process.env, ...resolvedVars };
    delete execEnv['CLOUDFLARE_API_TOKEN'];
    const runBatches = () => {
        const baselineDb = new Database(baselineDbPath);
        try {
            for (let i = 0; i < batches.length; i++) {
                const batchSql = batches[i].join('\n');
                const batchPath = path.join(os.tmpdir(), `_remote_batch_${process.pid}_${i}.sql`);
                fs.writeFileSync(batchPath, batchSql, 'utf8');
                try {
                    if (batches.length > 1) {
                        console.log(`[CostGuard]   -> Remote batch ${i + 1}/${batches.length} (${batches[i].length} statements)...`);
                    }
                    execFileSync('npx', [
                        'wrangler',
                        'd1',
                        'execute',
                        remoteDbName,
                        '--remote',
                        `--file=${batchPath}`,
                        '--yes',
                    ], {
                        cwd: rootDir,
                        stdio: 'inherit',
                        shell: process.platform === 'win32',
                        env: execEnv,
                        timeout: 120_000,
                    });
                    baselineDb.exec('BEGIN TRANSACTION');
                    try {
                        baselineDb.exec(batchSql);
                        baselineDb.exec('COMMIT');
                    }
                    catch (e) {
                        baselineDb.exec('ROLLBACK');
                        throw e;
                    }
                }
                finally {
                    if (fs.existsSync(batchPath)) {
                        fs.unlinkSync(batchPath);
                    }
                }
            }
        }
        finally {
            baselineDb.close();
        }
    };
    if (options.patchWranglerConfig) {
        options.patchWranglerConfig(runBatches);
    }
    else {
        runBatches();
    }
    let logEntries = [];
    if (fs.existsSync(migrationsLogPath)) {
        try {
            logEntries = JSON.parse(fs.readFileSync(migrationsLogPath, 'utf8'));
        }
        catch {
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
    console.log('[CostGuard] ✅ Remote D1 and local data/remote_baseline.db updated in lockstep.');
    return report;
}
function extractColumnClausesFromCreateTable(createTableSql) {
    const map = new Map();
    const openIdx = createTableSql.indexOf('(');
    if (openIdx === -1)
        return map;
    let depth = 0;
    let closeIdx = -1;
    let inSingle = false;
    let inDouble = false;
    for (let i = openIdx; i < createTableSql.length; i++) {
        const ch = createTableSql[i];
        if (ch === "'" && !inDouble) {
            if (inSingle && createTableSql[i + 1] === "'") {
                i++;
                continue;
            }
            inSingle = !inSingle;
        }
        else if (ch === '"' && !inSingle) {
            inDouble = !inDouble;
        }
        else if (!inSingle && !inDouble) {
            if (ch === '(')
                depth++;
            else if (ch === ')') {
                depth--;
                if (depth === 0) {
                    closeIdx = i;
                    break;
                }
            }
        }
    }
    if (closeIdx === -1)
        return map;
    const body = createTableSql.slice(openIdx + 1, closeIdx);
    const parts = [];
    let current = '';
    depth = 0;
    inSingle = false;
    inDouble = false;
    for (let i = 0; i < body.length; i++) {
        const ch = body[i];
        const next = body[i + 1];
        if (!inSingle && !inDouble && ch === '-' && next === '-') {
            const nl = body.indexOf('\n', i);
            if (nl === -1)
                break;
            i = nl;
            continue;
        }
        if (ch === "'" && !inDouble) {
            if (inSingle && next === "'") {
                current += "''";
                i++;
                continue;
            }
            inSingle = !inSingle;
            current += ch;
            continue;
        }
        if (ch === '"' && !inSingle) {
            inDouble = !inDouble;
            current += ch;
            continue;
        }
        if (!inSingle && !inDouble) {
            if (ch === '(')
                depth++;
            else if (ch === ')')
                depth--;
            else if (ch === ',' && depth === 0) {
                if (current.trim())
                    parts.push(current.trim());
                current = '';
                continue;
            }
        }
        current += ch;
    }
    if (current.trim())
        parts.push(current.trim());
    const constraintKeywords = new Set([
        'PRIMARY',
        'UNIQUE',
        'CHECK',
        'FOREIGN',
        'CONSTRAINT',
    ]);
    for (const part of parts) {
        const cleaned = stripLeadingSqlComments(part).trim();
        if (!cleaned)
            continue;
        const match = cleaned.match(/^(?:"([^"]+)"|`([^`]+)`|\[([^\]]+)\]|(\w+))\b/);
        if (!match)
            continue;
        const ident = match[1] ?? match[2] ?? match[3] ?? match[4];
        const isQuoted = Boolean(match[1] ?? match[2] ?? match[3]);
        if (!isQuoted && constraintKeywords.has(ident.toUpperCase())) {
            continue;
        }
        map.set(ident.toLowerCase(), cleaned.replace(/\s+/g, ' '));
    }
    return map;
}
function normalizeCreateStatementIfNotExists(sql) {
    const trimmed = sql.trim().replace(/;+\s*$/, '');
    if (/^CREATE\s+TABLE\s+(?!IF\s+NOT\s+EXISTS\b)/i.test(trimmed)) {
        return `${trimmed.replace(/^CREATE\s+TABLE\s+/i, 'CREATE TABLE IF NOT EXISTS ')};`;
    }
    if (/^CREATE\s+(UNIQUE\s+)?INDEX\s+(?!IF\s+NOT\s+EXISTS\b)/i.test(trimmed)) {
        return `${trimmed.replace(/^CREATE\s+(UNIQUE\s+)?INDEX\s+/i, (_m, u) => `CREATE ${u ?? ''}INDEX IF NOT EXISTS `)};`;
    }
    return `${trimmed};`;
}
/**
 * Compares an existing SQLite baseline database (e.g., `data/remote_baseline.db`)
 * against the canonical declarative schema (`migrations/schema.sql`) loaded in `:memory:`.
 *
 * Emits minimal additive SQL statements (`CREATE TABLE IF NOT EXISTS`,
 * `ALTER TABLE ... ADD COLUMN`, `CREATE [UNIQUE] INDEX IF NOT EXISTS`) and flags any
 * non-additive differences (dropped columns, type/PK changes, WITHOUT ROWID changes)
 * for manual review.
 */
export function diffSqliteSchema(baselineDbPath, schemaSqlPaths) {
    if (!fs.existsSync(baselineDbPath)) {
        throw new Error(`[SchemaDiff] Baseline database not found at ${baselineDbPath}`);
    }
    const paths = typeof schemaSqlPaths === 'string' ? [schemaSqlPaths] : schemaSqlPaths;
    const targetDb = new Database(':memory:');
    const baseDb = new Database(baselineDbPath, { readonly: true });
    const additiveSql = [];
    const manualReviewWarnings = [];
    try {
        for (const p of paths) {
            if (!fs.existsSync(p)) {
                throw new Error(`[SchemaDiff] Schema SQL file not found: ${p}`);
            }
            targetDb.exec(fs.readFileSync(p, 'utf8'));
        }
        const tableQuery = "SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_cf_%' AND name != 'd1_migrations' ORDER BY name";
        const targetTables = targetDb.prepare(tableQuery).all();
        const baseTables = baseDb.prepare(tableQuery).all();
        const baseTableMap = new Map(baseTables.map((t) => [t.name.toLowerCase(), t]));
        const targetTableMap = new Map(targetTables.map((t) => [t.name.toLowerCase(), t]));
        for (const baseTable of baseTables) {
            if (!targetTableMap.has(baseTable.name.toLowerCase())) {
                manualReviewWarnings.push(`Baseline has extra table '${baseTable.name}' not present in target schema.`);
            }
        }
        for (const targetTable of targetTables) {
            const key = targetTable.name.toLowerCase();
            const existing = baseTableMap.get(key);
            if (!existing) {
                additiveSql.push(normalizeCreateStatementIfNotExists(targetTable.sql));
                continue;
            }
            const targetWithoutRowid = /\bWITHOUT\s+ROWID\b/i.test(targetTable.sql);
            const baseWithoutRowid = /\bWITHOUT\s+ROWID\b/i.test(existing.sql);
            if (targetWithoutRowid !== baseWithoutRowid) {
                manualReviewWarnings.push(`Table '${targetTable.name}' WITHOUT ROWID mismatch (baseline=${baseWithoutRowid}, target=${targetWithoutRowid}).`);
            }
            const targetCols = targetDb
                .prepare(`PRAGMA table_info("${targetTable.name.replace(/"/g, '""')}")`)
                .all();
            const baseCols = baseDb
                .prepare(`PRAGMA table_info("${existing.name.replace(/"/g, '""')}")`)
                .all();
            const baseColMap = new Map(baseCols.map((c) => [c.name.toLowerCase(), c]));
            const targetColMap = new Map(targetCols.map((c) => [c.name.toLowerCase(), c]));
            const clauseMap = extractColumnClausesFromCreateTable(targetTable.sql);
            for (const bCol of baseCols) {
                if (!targetColMap.has(bCol.name.toLowerCase())) {
                    manualReviewWarnings.push(`Table '${targetTable.name}' has legacy column '${bCol.name}' in baseline that is absent from target schema.`);
                }
            }
            for (const tCol of targetCols) {
                const bCol = baseColMap.get(tCol.name.toLowerCase());
                if (!bCol) {
                    if (tCol.pk > 0) {
                        manualReviewWarnings.push(`Table '${targetTable.name}' adds PRIMARY KEY column '${tCol.name}', which SQLite ALTER TABLE ADD COLUMN cannot apply.`);
                        continue;
                    }
                    const rawClause = clauseMap.get(tCol.name.toLowerCase());
                    const fallbackDef = [
                        `"${tCol.name.replace(/"/g, '""')}"`,
                        tCol.type || 'TEXT',
                        tCol.notnull ? 'NOT NULL' : '',
                        tCol.dflt_value !== null ? `DEFAULT ${tCol.dflt_value}` : '',
                    ]
                        .filter(Boolean)
                        .join(' ');
                    const colDef = rawClause ?? fallbackDef;
                    additiveSql.push(`ALTER TABLE "${targetTable.name.replace(/"/g, '""')}" ADD COLUMN ${colDef};`);
                    continue;
                }
                if (tCol.type.toUpperCase() !== bCol.type.toUpperCase() ||
                    tCol.pk !== bCol.pk ||
                    tCol.notnull !== bCol.notnull) {
                    manualReviewWarnings.push(`Column '${targetTable.name}.${tCol.name}' definition differs between baseline (${bCol.type}, notnull=${bCol.notnull}, pk=${bCol.pk}) and target (${tCol.type}, notnull=${tCol.notnull}, pk=${tCol.pk}).`);
                }
            }
        }
        const indexQuery = "SELECT name, tbl_name, sql FROM sqlite_master WHERE type='index' AND sql IS NOT NULL AND name NOT LIKE 'sqlite_%' ORDER BY name";
        const targetIndexes = targetDb.prepare(indexQuery).all();
        const baseIndexes = baseDb.prepare(indexQuery).all();
        const baseIdxMap = new Map(baseIndexes.map((idx) => [idx.name.toLowerCase(), idx]));
        const targetIdxMap = new Map(targetIndexes.map((idx) => [idx.name.toLowerCase(), idx]));
        for (const bIdx of baseIndexes) {
            if (!targetIdxMap.has(bIdx.name.toLowerCase())) {
                manualReviewWarnings.push(`Baseline has extra explicit index '${bIdx.name}' on '${bIdx.tbl_name}' not present in target schema.`);
            }
        }
        for (const tIdx of targetIndexes) {
            if (!baseIdxMap.has(tIdx.name.toLowerCase())) {
                additiveSql.push(normalizeCreateStatementIfNotExists(tIdx.sql));
            }
        }
        return {
            inSync: additiveSql.length === 0 && manualReviewWarnings.length === 0,
            additiveSql,
            manualReviewWarnings,
        };
    }
    finally {
        targetDb.close();
        baseDb.close();
    }
}
/**
 * Mode B: Static Schema & Runtime Query Plan CI Auditor (`npm run d1:cost-guard`).
 * Applies schema SQL files to an in-memory `:memory:` SQLite database, enforces
 * secondary index caps (`1 + K`), and runs `EXPLAIN QUERY PLAN` on critical queries.
 */
export function runStaticSchemaCostGuard(config) {
    const db = new Database(':memory:');
    const errors = [];
    const tableSummaries = [];
    try {
        for (const filePath of config.schemaSqlPaths) {
            if (!fs.existsSync(filePath)) {
                errors.push(`Missing migration file: ${filePath}`);
                continue;
            }
            db.exec(fs.readFileSync(filePath, 'utf8'));
        }
        for (const [table, maxIdx] of Object.entries(config.maxSecondaryIndexes)) {
            const withoutRowid = isTableWithoutRowid(db, table);
            const indexes = db
                .prepare(`PRAGMA index_list("${table.replace(/"/g, '""')}")`)
                .all();
            const countedIndexes = config.countAllIndexOrigins
                ? indexes.length
                : indexes.filter((idx) => isSecondaryIndexOrigin(idx.origin, withoutRowid)).length;
            const writeMultiplier = 1 + countedIndexes;
            tableSummaries.push(`[d1-cost-guard] Table '${table}': ${countedIndexes} index(es) -> Write amplification = ${writeMultiplier}x (1 + ${countedIndexes})`);
            if (countedIndexes > maxIdx) {
                errors.push(`Table '${table}' has ${countedIndexes} indexes, exceeding max allowed (${maxIdx}).`);
            }
        }
        for (const q of config.criticalQueries) {
            const planRows = db
                .prepare(`EXPLAIN QUERY PLAN ${q.sql}`)
                .all(...q.params);
            const details = planRows.map((r) => r.detail).join(' | ');
            const hasFullScan = planRows.some((r) => /\bSCAN\b/i.test(r.detail) &&
                !/USING COVERING INDEX/i.test(r.detail) &&
                !/USING INDEX/i.test(r.detail) &&
                !/USING (?:INTEGER )?PRIMARY KEY/i.test(r.detail));
            if (hasFullScan) {
                errors.push(`Unindexed table SCAN detected in '${q.name}': ${details}`);
            }
            else {
                tableSummaries.push(`[d1-cost-guard] Query '${q.name}': ${details}`);
            }
        }
        return {
            passed: errors.length === 0,
            errors,
            tableSummaries,
        };
    }
    finally {
        db.close();
    }
}
