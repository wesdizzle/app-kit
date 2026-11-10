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
export declare function loadDeployEnv(rootDir: string): Record<string, string>;
export declare function runCommand(cmd: string, args: string[], cwd: string, input?: string): void;
export declare function runWranglerDeploy(config: WranglerDeployConfig, cliArgs?: string[]): void;
