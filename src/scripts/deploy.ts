/**
 * SECRET-INJECTED WRANGLER DEPLOYMENT ORCHESTRATOR (@wesdizzle/app-kit/scripts)
 *
 * Keeps tracked `wrangler.toml` and public assets free of production UUIDs, bucket
 * names, and custom branding secrets (Kerckhoffs's Principle):
 * 1. Loads `.dev.vars` and `process.env`.
 * 2. Supports `--put-secrets` and `--put-secret <KEY>` directly without running a build or deploy.
 * 3. Validates `D1_DATABASE_ID` is a well-formed UUID (never `local-dev-db`).
 * 4. Optionally injects `R2_BUCKET_NAME` and `FAVICON_SVG_OVERRIDE` before deploying.
 * 5. Avoids redundant builds when `wrangler.toml` already configures `[build]` (`npm run build`),
 *    or runs `npm run build` once prior to `wrangler deploy`.
 * 6. Always restores `wrangler.toml` and modified favicon files in a `finally` block.
 *
 * Note: Legacy unguarded `wrangler d1 migrations apply --remote` (`--migrate`) is retired;
 * all remote D1 schema updates flow through `runWithD1CostGuard` + `diffSqliteSchema`.
 */

import { spawnSync } from 'child_process';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface WranglerDeployConfig {
  rootDir: string;
  secretsToUpload: readonly string[];
  wranglerPath?: string;
  buildArgs?: string[];
  deployArgs?: string[];
  faviconTargets?: string[];
  r2BucketPlaceholder?: string;
  skipPreBuild?: boolean;
  appLabel?: string;
}

export function isValidUuid(value: string): boolean {
  return UUID_REGEX.test(value.trim());
}

export function loadDeployEnv(rootDir: string): Record<string, string> {
  const devVarsPath = path.join(rootDir, '.dev.vars');
  let parsedDevVars: Record<string, string> = {};
  if (fs.existsSync(devVarsPath)) {
    parsedDevVars = dotenv.parse(fs.readFileSync(devVarsPath, 'utf-8'));
  }
  const merged: Record<string, string> = { ...parsedDevVars };
  for (const [k, v] of Object.entries(process.env)) {
    if (typeof v === 'string' && v.length > 0) {
      merged[k] = v;
    }
  }
  return merged;
}

export function runCommand(
  cmd: string,
  args: string[],
  cwd: string,
  input?: string,
): void {
  const result = spawnSync(cmd, args, {
    cwd,
    stdio: input !== undefined ? ['pipe', 'inherit', 'inherit'] : 'inherit',
    input,
    shell: process.platform === 'win32',
    timeout: 300_000,
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(
      `Command failed with exit code ${result.status}: ${cmd} ${args.join(' ')}`,
    );
  }
}

export function runWranglerDeploy(
  config: WranglerDeployConfig,
  cliArgs = process.argv.slice(2),
): void {
  const rootDir = config.rootDir;
  const wranglerPath =
    config.wranglerPath ?? path.join(rootDir, 'wrangler.toml');
  const label = config.appLabel ? `[deploy:${config.appLabel}]` : '[deploy]';

  if (cliArgs.includes('--migrate')) {
    throw new Error(
      `${label} '--migrate' is retired. Use canonical migrations/schema.sql + d1-cost-guard (diffSqliteSchema / runWithD1CostGuard) for remote D1 updates.`,
    );
  }

  const putSecrets = cliArgs.includes('--put-secrets');
  const singleSecretIdx = cliArgs.indexOf('--put-secret');
  const singleSecretKey =
    singleSecretIdx !== -1 ? cliArgs[singleSecretIdx + 1] : null;

  const env = loadDeployEnv(rootDir);
  const d1DatabaseId = env['D1_DATABASE_ID']?.trim();

  if (
    !d1DatabaseId ||
    d1DatabaseId === 'local-dev-db' ||
    !isValidUuid(d1DatabaseId)
  ) {
    console.error(
      `${label} ERROR: A valid UUID D1_DATABASE_ID is required in .dev.vars or environment variables.`,
    );
    process.exit(1);
  }

  const originalWrangler = fs.readFileSync(wranglerPath, 'utf-8');
  if (!originalWrangler.includes('database_id = "local-dev-db"')) {
    console.error(
      `${label} ERROR: Expected placeholder database_id = "local-dev-db" in wrangler.toml.`,
    );
    process.exit(1);
  }

  let patchedWrangler = originalWrangler.replace(
    'database_id = "local-dev-db"',
    `database_id = "${d1DatabaseId}"`,
  );

  if (config.r2BucketPlaceholder) {
    const r2BucketName = env['R2_BUCKET_NAME']?.trim();
    if (r2BucketName && originalWrangler.includes(config.r2BucketPlaceholder)) {
      patchedWrangler = patchedWrangler.replaceAll(
        config.r2BucketPlaceholder,
        r2BucketName,
      );
    }
  }

  // Secret-only mode: inject wrangler.toml config, upload secret(s), restore, and return immediately without building or deploying!
  if (singleSecretKey || putSecrets) {
    try {
      fs.writeFileSync(wranglerPath, patchedWrangler, 'utf-8');

      if (singleSecretKey) {
        const val = env[singleSecretKey]?.trim();
        if (!val) {
          throw new Error(
            `${label} Secret "${singleSecretKey}" not found or empty in .dev.vars`,
          );
        }
        console.log(
          `${label} Uploading secret ${singleSecretKey} to Cloudflare Worker...`,
        );
        runCommand(
          'npx',
          ['wrangler', 'secret', 'put', singleSecretKey],
          rootDir,
          val,
        );
        return;
      }

      let uploadedCount = 0;
      for (const key of config.secretsToUpload) {
        const val = env[key]?.trim();
        if (val) {
          console.log(`${label} Uploading secret ${key}...`);
          runCommand('npx', ['wrangler', 'secret', 'put', key], rootDir, val);
          uploadedCount++;
        }
      }
      console.log(
        `${label} Uploaded ${uploadedCount} secret(s) (skipping build & deploy).`,
      );
      return;
    } finally {
      fs.writeFileSync(wranglerPath, originalWrangler, 'utf-8');
      console.log(
        `${label} Restored tracked wrangler.toml to clean placeholder state.`,
      );
    }
  }

  const faviconBackups = new Map<string, string>();
  const faviconOverride = env['FAVICON_SVG_OVERRIDE']?.trim();
  if (config.faviconTargets && config.faviconTargets.length > 0) {
    for (const target of config.faviconTargets) {
      if (fs.existsSync(target)) {
        faviconBackups.set(target, fs.readFileSync(target, 'utf-8'));
      }
    }
  }

  const wranglerHasCustomBuild =
    /^\[build\]/m.test(originalWrangler) &&
    /command\s*=\s*"[^"]*npm\s+run\s+build/i.test(originalWrangler);
  const shouldRunPreBuild = !config.skipPreBuild && !wranglerHasCustomBuild;

  try {
    if (faviconOverride && faviconBackups.size > 0) {
      console.log(
        `${label} Injecting FAVICON_SVG_OVERRIDE into ${faviconBackups.size} asset file(s)...`,
      );
      for (const target of faviconBackups.keys()) {
        fs.writeFileSync(target, faviconOverride, 'utf-8');
      }
    }

    if (shouldRunPreBuild) {
      console.log(`${label} Building production bundle...`);
      runCommand('npm', config.buildArgs ?? ['run', 'build'], rootDir);
    }

    console.log(`${label} Injecting D1_DATABASE_ID into wrangler.toml...`);
    fs.writeFileSync(wranglerPath, patchedWrangler, 'utf-8');

    console.log(`${label} Deploying Worker...`);
    runCommand('npx', config.deployArgs ?? ['wrangler', 'deploy'], rootDir);
    console.log(`${label} Deployment complete.`);
  } finally {
    fs.writeFileSync(wranglerPath, originalWrangler, 'utf-8');
    for (const [target, content] of faviconBackups.entries()) {
      fs.writeFileSync(target, content, 'utf-8');
    }
    console.log(`${label} Restored tracked files to clean placeholder state.`);
  }
}
