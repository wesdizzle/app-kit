/**
 * HYBRID DEV SERVER ORCHESTRATOR (@wesdizzle/app-kit/scripts)
 *
 * Runs optional pre-start commands (e.g., local D1 schema init or initial build)
 * and spawns parallel processes (Wrangler local Worker + Angular dev server)
 * with clean process-tree SIGINT/SIGTERM teardown on Windows (`taskkill /T /F`) and POSIX.
 */
import { spawn, spawnSync } from 'child_process';
export function terminateChildProcessTree(child) {
    if (child.killed || child.exitCode !== null)
        return;
    if (process.platform === 'win32' && typeof child.pid === 'number') {
        spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], {
            stdio: 'ignore',
            timeout: 5_000,
        });
        return;
    }
    child.kill('SIGTERM');
}
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
            terminateChildProcessTree(child);
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
