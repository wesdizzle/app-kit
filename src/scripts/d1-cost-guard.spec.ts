import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterEach, describe, expect, it } from 'vitest';

import {
  auditSqlCost,
  extractTargetTable,
  isSecondaryIndexOrigin,
  runStaticSchemaCostGuard,
  splitSqlStatements,
} from './d1-cost-guard.js';

describe('@wesdizzle/app-kit/scripts d1-cost-guard', () => {
  const tempFiles: string[] = [];

  function createTempPath(prefix: string, ext: string): string {
    const filePath = path.join(
      os.tmpdir(),
      `${prefix}_${process.pid}_${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`,
    );
    tempFiles.push(filePath);
    return filePath;
  }

  afterEach(() => {
    for (const file of tempFiles.splice(0)) {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    }
  });

  it('classifies SQLite PRAGMA index_list origins accurately', () => {
    expect(isSecondaryIndexOrigin('c')).toBe(true);
    expect(isSecondaryIndexOrigin('u')).toBe(true);
    expect(isSecondaryIndexOrigin('pk')).toBe(false);
  });

  it('counts both explicit CREATE INDEX (c) and inline UNIQUE (u) constraints while excluding WITHOUT ROWID PK (pk)', () => {
    const baselinePath = createTempPath('baseline', '.db');
    const sqlPath = createTempPath('migration', '.sql');

    const db = new Database(baselinePath);
    db.exec(`
      CREATE TABLE toys (
        id TEXT UNIQUE,
        name TEXT NOT NULL,
        line TEXT NOT NULL
      );
      CREATE INDEX idx_toys_line ON toys (line);

      CREATE TABLE journal_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        item_type TEXT NOT NULL,
        item_id TEXT NOT NULL,
        UNIQUE (user_id, item_type, item_id)
      );

      CREATE TABLE user_toys (
        user_id INTEGER NOT NULL,
        toy_id TEXT NOT NULL,
        PRIMARY KEY (user_id, toy_id)
      ) WITHOUT ROWID;
      CREATE INDEX idx_ut_toy ON user_toys (toy_id);
    `);
    db.close();

    fs.writeFileSync(
      sqlPath,
      `
      INSERT INTO toys (id, name, line) VALUES ('t1', 'Mario', 'Amiibo');
      INSERT INTO journal_entries (user_id, item_type, item_id) VALUES (1, 'toy', 't1');
      INSERT INTO user_toys (user_id, toy_id) VALUES (1, 't1');
    `,
      'utf8',
    );

    const report = auditSqlCost(sqlPath, 100, baselinePath);

    expect(report.tableBreakdown['toys']).toEqual({
      rowsChanged: 1,
      secondaryIndexes: 2,
      multiplier: 3,
      billableWrites: 3,
    });

    expect(report.tableBreakdown['journal_entries']).toEqual({
      rowsChanged: 1,
      secondaryIndexes: 1,
      multiplier: 2,
      billableWrites: 2,
    });

    expect(report.tableBreakdown['user_toys']).toEqual({
      rowsChanged: 1,
      secondaryIndexes: 1,
      multiplier: 2,
      billableWrites: 2,
    });

    expect(report.totalBillableWrites).toBe(7);
    expect(report.isWithinBudget).toBe(true);
  });

  it('preserves existing inline UNIQUE index counts when CREATE INDEX is executed in a migration', () => {
    const baselinePath = createTempPath('baseline_idx', '.db');
    const sqlPath = createTempPath('migration_idx', '.sql');

    const db = new Database(baselinePath);
    db.exec(`
      CREATE TABLE platforms (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
      );
      INSERT INTO platforms (id, name) VALUES ('nes', 'Nintendo Entertainment System');
      INSERT INTO platforms (id, name) VALUES ('snes', 'Super Nintendo');
    `);
    db.close();

    fs.writeFileSync(
      sqlPath,
      `
      CREATE INDEX idx_platforms_name_2 ON platforms (name);
      INSERT INTO platforms (id, name) VALUES ('n64', 'Nintendo 64');
    `,
      'utf8',
    );

    const report = auditSqlCost(sqlPath, 100, baselinePath);
    expect(report.tableBreakdown['platforms'].secondaryIndexes).toBe(2);
    expect(report.tableBreakdown['platforms'].multiplier).toBe(3);
    expect(report.tableBreakdown['platforms'].billableWrites).toBe(5);
  });

  it('accounts for 2*(1+K) write amplification on INSERT OR REPLACE of existing rows', () => {
    const baselinePath = createTempPath('baseline_replace', '.db');
    const sqlPath = createTempPath('migration_replace', '.sql');

    const db = new Database(baselinePath);
    db.exec(`
      CREATE TABLE games (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL
      );
      CREATE INDEX idx_games_title ON games (title);
      INSERT INTO games (id, title) VALUES ('g1', 'Metroid');
    `);
    db.close();

    fs.writeFileSync(
      sqlPath,
      `
      INSERT OR REPLACE INTO games (id, title) VALUES ('g1', 'Super Metroid');
    `,
      'utf8',
    );

    const report = auditSqlCost(sqlPath, 100, baselinePath);
    // 1 replaced row on a table with K=1 secondary index => 2 row ops (DELETE + INSERT) * (1 + 1) = 4 billable writes
    expect(report.tableBreakdown['games']).toEqual({
      rowsChanged: 2,
      secondaryIndexes: 1,
      multiplier: 2,
      billableWrites: 4,
    });
  });

  it('splits SQL statements and extracts target tables accurately even with leading comments', () => {
    const stmts = splitSqlStatements(
      `-- comment with ; semicolon\nINSERT INTO games (id, title) VALUES ('g1', 'A;B'); /* block */ UPDATE toys SET name = 'X' WHERE id = 't1';`,
    );
    expect(stmts).toHaveLength(2);
    expect(extractTargetTable(stmts[0])).toBe('games');
    expect(extractTargetTable(stmts[1])).toBe('toys');
  });

  it('runs static schema cost guard in-memory and flags unindexed scans', () => {
    const schemaPath = createTempPath('schema', '.sql');
    fs.writeFileSync(
      schemaPath,
      `
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        bio TEXT
      );
    `,
      'utf8',
    );

    const passRes = runStaticSchemaCostGuard({
      schemaSqlPaths: [schemaPath],
      maxSecondaryIndexes: { users: 1 },
      criticalQueries: [
        {
          name: 'Lookup user by username',
          sql: 'SELECT id FROM users WHERE username = ?',
          params: ['wesley'],
        },
      ],
    });
    expect(passRes.passed).toBe(true);

    const failRes = runStaticSchemaCostGuard({
      schemaSqlPaths: [schemaPath],
      maxSecondaryIndexes: { users: 1 },
      criticalQueries: [
        {
          name: 'Unindexed bio scan',
          sql: 'SELECT id FROM users WHERE bio = ?',
          params: ['test'],
        },
      ],
    });
    expect(failRes.passed).toBe(false);
    expect(failRes.errors[0]).toContain('Unindexed table SCAN');
  });
});
