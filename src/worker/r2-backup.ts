/**
 * R2 SCHEDULED BACKUP ENGINE (@wesdizzle/app-kit/worker)
 *
 * Performs daily D1 -> R2 JSON snapshot exports with:
 * - Atomic table export verification
 * - Zero-write `skipIfUnchanged` diffing against `snapshots/latest.json`
 * - Rolling snapshot retention pruning (default 30 days)
 */

export interface BackupEnv {
  DB: D1Database;
  BACKUP_BUCKET?: R2Bucket;
}

export interface ScheduledBackupOptions {
  isDaily?: boolean;
  skipIfUnchanged?: boolean;
  retentionDays?: number;
  logPrefix?: string;
}

export async function performScheduledBackup(
  env: BackupEnv,
  tables: readonly string[],
  options: ScheduledBackupOptions = {},
): Promise<{
  key: string;
  rowCount: number;
  skipped?: boolean;
  prunedCount?: number;
}> {
  const logPrefix = options.logPrefix ?? '[WorkerBackup]';
  const retentionDays = options.retentionDays ?? 30;
  const isDaily = options.isDaily ?? true;
  const skipIfUnchanged = options.skipIfUnchanged ?? false;

  if (!env.BACKUP_BUCKET) {
    console.warn(
      `${logPrefix} BACKUP_BUCKET binding not configured. Skipping snapshot.`,
    );
    return { key: 'none', rowCount: 0 };
  }

  const backupData: Record<string, unknown[]> = {};
  let totalRows = 0;

  for (const table of tables) {
    try {
      const { results } = await env.DB.prepare(`SELECT * FROM ${table}`).all();
      backupData[table] = results || [];
      totalRows += (results || []).length;
    } catch (err) {
      console.error(`${logPrefix} Failed to dump table ${table}:`, err);
      throw new Error(
        `Aborted backup to prevent partial overwrite: failed dumping table ${table}`,
        { cause: err },
      );
    }
  }

  const latestKey = 'snapshots/latest.json';

  if (skipIfUnchanged && typeof env.BACKUP_BUCKET.get === 'function') {
    try {
      const existingObj = await env.BACKUP_BUCKET.get(latestKey);
      if (existingObj) {
        let existingParsed: { tables?: Record<string, unknown[]> } | null =
          null;
        if (typeof existingObj.text === 'function') {
          existingParsed = JSON.parse(await existingObj.text()) as {
            tables?: Record<string, unknown[]>;
          };
        } else if (typeof existingObj.json === 'function') {
          existingParsed = (await existingObj.json()) as {
            tables?: Record<string, unknown[]>;
          };
        }
        if (
          existingParsed?.tables &&
          JSON.stringify(existingParsed.tables) === JSON.stringify(backupData)
        ) {
          console.log(
            '[WorkerCron] Database unchanged since last daily backup. Skipping snapshot.',
          );
          return { key: 'none', rowCount: totalRows, skipped: true };
        }
      }
    } catch (cmpErr) {
      console.warn(
        `${logPrefix} Could not compare against existing latest.json, proceeding with backup:`,
        cmpErr,
      );
    }
  }

  const now = new Date();
  const timestamp = now.toISOString();
  const dateStr = timestamp.slice(0, 10);

  const payload = JSON.stringify(
    {
      timestamp,
      version: '1.0',
      metadata: {
        timestamp,
        date: dateStr,
        version: 1,
        totalRows,
        tableCounts: Object.fromEntries(
          Object.entries(backupData).map(([tbl, rows]) => [tbl, rows.length]),
        ),
      },
      tables: backupData,
    },
    null,
    2,
  );

  await env.BACKUP_BUCKET.put(latestKey, payload, {
    httpMetadata: { contentType: 'application/json' },
  });

  let snapshotKey = latestKey;
  let prunedCount = 0;

  if (isDaily) {
    snapshotKey = `snapshots/backup-${dateStr}-${now.getTime()}.json`;
    await env.BACKUP_BUCKET.put(snapshotKey, payload, {
      httpMetadata: { contentType: 'application/json' },
    });

    console.log(
      `${logPrefix} Successfully saved daily snapshot ${snapshotKey} (${totalRows} rows)`,
    );

    try {
      const cutoffMs = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
      if (typeof env.BACKUP_BUCKET.list === 'function') {
        const listed = await env.BACKUP_BUCKET.list({
          prefix: 'snapshots/backup-',
        });
        if (listed && Array.isArray(listed.objects)) {
          for (const obj of listed.objects) {
            const uploadTime = obj.uploaded ? obj.uploaded.getTime() : null;
            let isExpired = false;
            if (uploadTime !== null) {
              isExpired = uploadTime < cutoffMs;
            } else {
              const match = obj.key.match(/-(\d+)\.json$/);
              if (match) {
                const epoch = parseInt(match[1], 10);
                isExpired = epoch < cutoffMs;
              }
            }
            if (isExpired && typeof env.BACKUP_BUCKET.delete === 'function') {
              await env.BACKUP_BUCKET.delete(obj.key);
              prunedCount++;
            }
          }
          if (prunedCount > 0) {
            console.log(
              `${logPrefix} Pruned ${prunedCount} snapshot(s) older than ${retentionDays} days.`,
            );
          }
        }
      }
    } catch (pruneErr) {
      console.warn(`${logPrefix} Failed to prune aged snapshots:`, pruneErr);
    }
  } else {
    console.log(
      `${logPrefix} Successfully updated latest snapshot ${latestKey} (${totalRows} rows)`,
    );
  }

  return { key: snapshotKey, rowCount: totalRows };
}
