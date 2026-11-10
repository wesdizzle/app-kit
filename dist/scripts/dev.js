/**
 * HYBRID DEV SERVER ORCHESTRATOR (@wesdizzle/app-kit/scripts)
 *
 * Runs optional pre-start commands (e.g., local D1 migrations or initial build)
 * and spawns parallel processes (Wrangler local Worker + Angular dev server)
 * with clean SIGINT/SIGTERM teardown.
 */
import { spawn, spawnSync } from 'child_process';
export function runHybridDev(config) {
    const cwd = config.cwd ?? process.cwd();
    if (config.banner) {
        console.log(config.banner);
    }
    for (const pre of config.preCommands ?? []) {
        console.log(pre.label);
        const res = spawnSync(pre.command, pre.args, {
            cwd,
            stdio: 'inherit',
            shell: process.platform === 'win32',
        });
        if (res.status !== 0) {
            process.exit(res.status ?? 1);
        }
    }
    const children = [];
    let shuttingDown = false;
    const shutdown = (code = 0) => {
        if (shuttingDown)
            return;
        shuttingDown = true;
        for (const child of children) {
            if (!child.killed) {
                child.kill();
            }
        }
        process.exit(code);
    };
    for (const spec of config.processes) {
        const child = spawn(spec.command, spec.args, {
            cwd,
            stdio: 'inherit',
            shell: process.platform === 'win32',
        });
        children.push(child);
        child.on('exit', (code) => {
            if (!shuttingDown && code !== null && code !== 0) {
                shutdown(code);
            }
        });
    }
    process.on('SIGINT', () => shutdown(0));
    process.on('SIGTERM', () => shutdown(0));
}
