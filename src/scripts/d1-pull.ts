/**
 * ZERO-D1-READ R2 SNAPSHOT LOCAL HYDRATION UTILITY (@wesdizzle/app-kit/scripts)
 *
 * Pulls `snapshots/latest.json` from Cloudflare R2 (`0` D1 row reads) and hydrates
 * a local SQLite database (with atomic WAL-safe `.bak` backup via `await db.backup(...)`).
 */

import Database from 'better-sqlite3';
import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

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

export function findWranglerSqliteFile(
  wranglerStateDir: string,
): string | null {
  if (!fs.existsSync(wranglerStateDir)) return null;
  const entries = fs.readdirSync(wranglerStateDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(wranglerStateDir, entry.name);
    if (entry.isDirectory()) {
      const found = findWranglerSqliteFile(fullPath);
      if (found) return found;
    } else if (entry.isFile() && entry.name.endsWith('.sqlite')) {
      return fullPath;
    }
  }
  return null;
}

export async function hydrateSqliteFromSnapshot(
  dbPath: string,
  schemaSqlPaths: readonly string[],
  snapshot: R2SnapshotPayload,
  tableOrder: readonly string[],
): Promise<Record<string, number>> {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(dbPath)) {
    const existingDb = new Database(dbPath, { readonly: true });
    try {
      await existingDb.backup(`${dbPath}.bak`);
    } finally {
      existingDb.close();
    }
  }

  const db = new Database(dbPath);
  const rowCounts: Record<string, number> = {};

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
        const rows = tables[tableName];
        if (!Array.isArray(rows)) continue;

        db.prepare(`DELETE FROM "${tableName.replace(/"/g, '""')}"`).run();
        if (rows.length === 0) {
          rowCounts[tableName] = 0;
          continue;
        }

        const columns = Object.keys(rows[0]);
        const colList = columns
          .map((c) => `"${c.replace(/"/g, '""')}"`)
          .join(', ');
        const placeholders = columns.map(() => '?').join(', ');
        const insertStmt = db.prepare(
          `INSERT INTO "${tableName.replace(/"/g, '""')}" (${colList}) VALUES (${placeholders})`,
        );

        for (const row of rows) {
          insertStmt.run(...columns.map((c) => row[c] ?? null));
        }
        rowCounts[tableName] = rows.length;
      }
    });
    tx();
    db.pragma('foreign_keys = ON');
  } finally {
    db.close();
  }

  return rowCounts;
}

export async function runD1PullFromR2(
  config: D1PullFromR2Config,
): Promise<Record<string, number>> {
  const objectKey = config.r2ObjectKey ?? 'snapshots/latest.json';
  const tempSnapshotPath = path.join(config.rootDir, '.tmp-r2-latest.json');

  try {
    const r2Res = spawnSync(
      'npx',
      [
        'wrangler',
        'r2',
        'object',
        'get',
        `${config.r2BucketName}/${objectKey}`,
        '--file',
        tempSnapshotPath,
        '--remote',
      ],
      {
        cwd: config.rootDir,
        stdio: 'inherit',
        shell: process.platform === 'win32',
        timeout: 60_000,
      },
    );

    if (r2Res.status !== 0 || !fs.existsSync(tempSnapshotPath)) {
      throw new Error(
        `Failed to download R2 snapshot ${config.r2BucketName}/${objectKey}`,
      );
    }

    const snapshot = JSON.parse(
      fs.readFileSync(tempSnapshotPath, 'utf-8'),
    ) as R2SnapshotPayload;

    return await hydrateSqliteFromSnapshot(
      config.localDbPath,
      config.schemaSqlPaths,
      snapshot,
      config.tableOrder,
    );
  } finally {
    if (fs.existsSync(tempSnapshotPath)) {
      fs.unlinkSync(tempSnapshotPath);
    }
  }
}
