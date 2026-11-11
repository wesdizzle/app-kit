/**
 * ZERO-D1-READ R2 SNAPSHOT LOCAL HYDRATION UTILITY (@wesdizzle/app-kit/scripts)
 *
 * Pulls `snapshots/latest.json` from Cloudflare R2 (`0` D1 row reads) into an isolated
 * `os.tmpdir()` scratch file and hydrates a local SQLite database initialized from
 * canonical `migrations/schema.sql` (with atomic WAL-safe `.bak` backup via `await db.backup(...)`).
 */
import Database from 'better-sqlite3';
import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
const SAFE_IDENTIFIER_REGEX = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
export function findWranglerSqliteFile(wranglerStateDir) {
    if (!fs.existsSync(wranglerStateDir))
        return null;
    const entries = fs.readdirSync(wranglerStateDir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(wranglerStateDir, entry.name);
        if (entry.isDirectory()) {
            const found = findWranglerSqliteFile(fullPath);
            if (found)
                return found;
        }
        else if (entry.isFile() && entry.name.endsWith('.sqlite')) {
            return fullPath;
        }
    }
    return null;
}
export async function hydrateSqliteFromSnapshot(dbPath, schemaSqlPaths, snapshot, tableOrder) {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (fs.existsSync(dbPath)) {
        const existingDb = new Database(dbPath, { readonly: true });
        try {
            await existingDb.backup(`${dbPath}.bak`);
        }
        finally {
            existingDb.close();
        }
    }
    const db = new Database(dbPath);
    const rowCounts = {};
    try {
        for (const schemaPath of schemaSqlPaths) {
            if (fs.existsSync(schemaPath)) {
                db.exec(fs.readFileSync(schemaPath, 'utf-8'));
            }
        }
        const tables = snapshot.tables ?? {};
        db.pragma('foreign_keys = OFF');
        const tx = db.transaction(() => {
            for (const tableName of tableOrder) {
                if (!SAFE_IDENTIFIER_REGEX.test(tableName)) {
                    throw new Error(`Invalid SQLite table identifier: ${tableName}`);
                }
                const rows = tables[tableName];
                if (!Array.isArray(rows))
                    continue;
                db.prepare(`DELETE FROM "${tableName}"`).run();
                if (rows.length === 0) {
                    rowCounts[tableName] = 0;
                    continue;
                }
                const columns = Object.keys(rows[0]).filter((c) => SAFE_IDENTIFIER_REGEX.test(c));
                const colList = columns.map((c) => `"${c}"`).join(', ');
                const placeholders = columns.map(() => '?').join(', ');
                const insertStmt = db.prepare(`INSERT INTO "${tableName}" (${colList}) VALUES (${placeholders})`);
                for (const row of rows) {
                    insertStmt.run(...columns.map((c) => row[c] ?? null));
                }
                rowCounts[tableName] = rows.length;
            }
        });
        tx();
        db.pragma('foreign_keys = ON');
    }
    finally {
        db.close();
    }
    return rowCounts;
}
export async function runD1PullFromR2(config) {
    const objectKey = config.r2ObjectKey ?? 'snapshots/latest.json';
    const schemaPaths = config.schemaSqlPaths ?? [
        path.join(config.rootDir, 'migrations', 'schema.sql'),
    ];
    const tempSnapshotPath = path.join(os.tmpdir(), `_r2_snapshot_${process.pid}_${Date.now()}_${Math.random().toString(36).slice(2)}.json`);
    try {
        const r2Res = spawnSync('npx', [
            'wrangler',
            'r2',
            'object',
            'get',
            `${config.r2BucketName}/${objectKey}`,
            '--file',
            tempSnapshotPath,
            '--remote',
        ], {
            cwd: config.rootDir,
            stdio: 'inherit',
            shell: process.platform === 'win32',
            timeout: 60_000,
        });
        if (r2Res.status !== 0 || !fs.existsSync(tempSnapshotPath)) {
            throw new Error(`Failed to download R2 snapshot ${config.r2BucketName}/${objectKey}`);
        }
        const snapshot = JSON.parse(fs.readFileSync(tempSnapshotPath, 'utf-8'));
        return await hydrateSqliteFromSnapshot(config.localDbPath, schemaPaths, snapshot, config.tableOrder);
    }
    finally {
        if (fs.existsSync(tempSnapshotPath)) {
            fs.unlinkSync(tempSnapshotPath);
        }
    }
}
