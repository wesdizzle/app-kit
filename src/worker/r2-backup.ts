/**
 * R2 SCHEDULED BACKUP ENGINE (@wesdizzle/app-kit/worker)
 *
 * Performs daily D1 -> R2 JSON snapshot exports with:
 * - Atomic table export verification
 * - Optional zero-write `skipIfUnchanged` diffing against `snapshots/latest.json`
 * - Rolling snapshot retention pruning (default 30 days)
 */

export interface BackupEnv {
  DB: D1Database;
  BACKUP_BUCKET?: R2Bucket;
}

export interface ScheduledBackupOptions {
  skipIfUnchanged?: boolean;
  retentionDays?: number;
  logPrefix?: string;
}

export async function performScheduledBackup(
  env: BackupEnv,
  tables: readonly string[],
  options: ScheduledBackupOptions = {},
): Promise<{
  skipped: boolean;
  latestKey: string;
  dailyKey?: string;
  prunedCount: number;
}> {
  const logPrefix = options.logPrefix ?? '[ScheduledBackup]';
  const retentionDays = options.retentionDays ?? 30;
  const skipIfUnchanged = options.skipIfUnchanged ?? true;

  if (!env.BACKUP_BUCKET) {
    console.warn(
      `${logPrefix} BACKUP_BUCKET R2 binding not configured; skipping backup.`,
    );
    return { skipped: true, latestKey: 'snapshots/latest.json', prunedCount: 0 };
  }

  console.log(`${logPrefix} Starting scheduled D1 -> R2 snapshot...`);
  const snapshotData: Record<string, unknown[]> = {};

  for (const table of tables) {
    try {
      const { results } = await env.DB.prepare(
        `SELECT * FROM ${table}`,
      ).all();
      snapshotData[table] = results || [];
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(
        `${logPrefix} Aborting snapshot: failed to export table ${table}:`,
        msg,
      );
      throw new Error(`Scheduled backup aborted: table ${table} failed`);
    }
  }

  const latestKey = 'snapshots/latest.json';

  if (skipIfUnchanged) {
    try {
      const existingObj = await env.BACKUP_BUCKET.get(latestKey);
      if (existingObj) {
        const existingParsed = (await existingObj.json()) as {
          tables?: Record<string, unknown[]>;
        };
        if (
          existingParsed?.tables &&
          JSON.stringify(existingParsed.tables) === JSON.stringify(snapshotData)
        ) {
          console.log(
            `${logPrefix} Snapshot unchanged since latest.json; skipping R2 write.`,
          );
          return { skipped: true, latestKey, prunedCount: 0 };
        }
      }
    } catch {
      // Proceed with writing fresh backup if latest.json is missing or unreadable
    }
  }

  const now = new Date();
  const datePart = now.toISOString().split('T')[0];
  const payload = JSON.stringify({
    timestamp: now.toISOString(),
    version: '1.0',
    tables: snapshotData,
  });

  const dailyKey = `snapshots/backup-${datePart}-${ now.getTime() }.json`;

  await env.BACKUP_BUCKET.put(dailyKey, payload, {
    httpMetadata: { contentType: 'application/json' },
  });
  await env.BACKUP_BUCKET.put(latestKey, payload, {
    httpMetadata: { contentType: 'application/json' },
  });

  console.log(`${logPrefix} Saved snapshot to R2: ${dailyKey}`);

  // Prune snapshots older than retentionDays
  let prunedCount = 0;
  try {
    const retentionCutoffMs =
      now.getTime() - retentionDays * 24 * 60 * 60 * 1000;
    let cursor: string | undefined;
    do {
      const listed = await env.BACKUP_BUCKET.list({
        prefix: 'snapshots/backup-',
        cursor,
      });
      const keysToDelete = listed.objects
        .filter((obj) => obj.uploaded.getTime() < retentionCutoffMs)
        .map((obj) => obj.key);

      if (keysToDelete.length > 0) {
        await env.BACKUP_BUCKET.delete(keysToDelete);
        prunedCount += keysToDelete.length;
      }
      cursor = listed.truncated ? listed.cursor : undefined;
    } while (cursor);

    if (prunedCount > 0) {
      console.log(
        `${logPrefix} Pruned ${prunedCount} expired R2 snapshot(s) (> ${retentionDays}d).`,
      );
    }
  } catch (pruneErr: unknown) {
    const msg = pruneErr instanceof Error ? pruneErr.message : String(pruneErr);
    console.warn(`${logPrefix} Snapshot retention pruning warning: ${msg}`);
  }

  return { skipped: false, latestKey, dailyKey, prunedCount };
}
