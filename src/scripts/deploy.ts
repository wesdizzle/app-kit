/**
 * SECRET-INJECTED WRANGLER DEPLOYMENT ORCHESTRATOR (@wesdizzle/app-kit/scripts)
 *
 * Keeps tracked `wrangler.toml` and public assets free of production UUIDs and
 * custom branding secrets (Kerckhoffs's Principle):
 * 1. Loads `.dev.vars` and `process.env`.
 * 2. Validates `D1_DATABASE_ID` against placeholder `local-dev-db`.
 * 3. Optionally injects `FAVICON_SVG_OVERRIDE` into target asset paths before build.
 * 4. Supports `--put-secrets`, `--put-secret <KEY>`, and `--migrate`.
 * 5. Always restores `wrangler.toml` and modified favicon files in a `finally` block.
 */

import { spawnSync } from 'child_process';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export interface WranglerDeployConfig {
  rootDir: string;
  secretsToUpload: readonly string[];
  wranglerPath?: string;
  buildArgs?: string[];
  deployArgs?: string[];
  migrateDbName?: string;
  faviconTargets?: string[];
  appLabel?: string;
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

  const putSecrets = cliArgs.includes('--put-secrets');
  const runMigrate = cliArgs.includes('--migrate');
  const singleSecretIdx = cliArgs.indexOf('--put-secret');
  const singleSecretKey =
    singleSecretIdx !== -1 ? cliArgs[singleSecretIdx + 1] : null;

  const env = loadDeployEnv(rootDir);
  const d1DatabaseId = env['D1_DATABASE_ID']?.trim();

  if (!d1DatabaseId || d1DatabaseId === 'local-dev-db') {
    console.error(
      `${label} ERROR: D1_DATABASE_ID is required in .dev.vars or environment variables for production deployment.`,
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

  const faviconBackups = new Map<string, string>();
  const faviconOverride = env['FAVICON_SVG_OVERRIDE']?.trim();
  if (config.faviconTargets && config.faviconTargets.length > 0) {
    for (const target of config.faviconTargets) {
      if (fs.existsSync(target)) {
        faviconBackups.set(target, fs.readFileSync(target, 'utf-8'));
      }
    }
  }

  const patchedWrangler = originalWrangler.replace(
    'database_id = "local-dev-db"',
    `database_id = "${d1DatabaseId}"`,
  );

  try {
    if (faviconOverride && faviconBackups.size > 0) {
      console.log(
        `${label} Injecting FAVICON_SVG_OVERRIDE into ${faviconBackups.size} asset file(s)...`,
      );
      for (const target of faviconBackups.keys()) {
        fs.writeFileSync(target, faviconOverride, 'utf-8');
      }
    }

    console.log(`${label} Building production bundle...`);
    runCommand('npm', config.buildArgs ?? ['run', 'build'], rootDir);

    console.log(`${label} Injecting D1_DATABASE_ID into wrangler.toml...`);
    fs.writeFileSync(wranglerPath, patchedWrangler, 'utf-8');

    if (runMigrate && config.migrateDbName) {
      console.log(`${label} Applying remote D1 migrations...`);
      runCommand(
        'npx',
        [
          'wrangler',
          'd1',
          'migrations',
          'apply',
          config.migrateDbName,
          '--remote',
        ],
        rootDir,
      );
    }

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

    if (putSecrets) {
      for (const key of config.secretsToUpload) {
        const val = env[key]?.trim();
        if (val) {
          console.log(`${label} Uploading secret ${key}...`);
          runCommand('npx', ['wrangler', 'secret', 'put', key], rootDir, val);
        }
      }
    }

    console.log(`${label} Deploying Worker...`);
    runCommand(
      'npx',
      config.deployArgs ?? ['wrangler', 'deploy'],
      rootDir,
    );
    console.log(`${label} Deployment complete.`);
  } finally {
    fs.writeFileSync(wranglerPath, originalWrangler, 'utf-8');
    for (const [target, content] of faviconBackups.entries()) {
      fs.writeFileSync(target, content, 'utf-8');
    }
    console.log(
      `${label} Restored tracked files to clean placeholder state.`,
    );
  }
}
