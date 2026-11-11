/**
 * HYBRID DEV SERVER ORCHESTRATOR (@wesdizzle/app-kit/scripts)
 *
 * Runs optional pre-start commands (e.g., local D1 schema init or initial build)
 * and spawns parallel processes (Wrangler local Worker + Angular dev server)
 * with clean process-tree SIGINT/SIGTERM teardown on Windows (`taskkill /T /F`) and POSIX.
 */
import { ChildProcess } from 'child_process';
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
export declare function terminateChildProcessTree(child: ChildProcess): void;
export declare function runHybridDev(config: HybridDevConfig): void;
