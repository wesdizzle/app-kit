/**
 * HYBRID DEV SERVER ORCHESTRATOR (@wesdizzle/app-kit/scripts)
 *
 * Runs optional pre-start commands (e.g., local D1 migrations or initial build)
 * and spawns parallel processes (Wrangler local Worker + Angular dev server)
 * with clean SIGINT/SIGTERM teardown.
 */
export interface HybridDevProcessSpec {
    name: string;
    command: string;
    args: string[];
}
export interface HybridDevConfig {
    cwd?: string;
    banner?: string;
    preCommands?: Array<{
        label: string;
        command: string;
        args: string[];
    }>;
    processes: HybridDevProcessSpec[];
}
export declare function runHybridDev(config: HybridDevConfig): void;
