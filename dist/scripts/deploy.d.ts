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
export declare function isValidUuid(value: string): boolean;
export declare function loadDeployEnv(rootDir: string): Record<string, string>;
export declare function runCommand(cmd: string, args: string[], cwd: string, input?: string): void;
export declare function runWranglerDeploy(config: WranglerDeployConfig, cliArgs?: string[]): void;
