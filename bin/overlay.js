#!/usr/bin/env node

const path = require('path');

// Check if running directly via electron (electron bin/overlay.js)
// or via node (node bin/overlay.js)
if (process.versions.electron) {
    // Running in Electron directly - load main-electron.js
    require('../src/ui/main-electron.js');
} else {
    // Running from Node - spawn electron
    const { spawn, execSync } = require('child_process');

    // Get electron path (handles both string and object export)
    let electronPath;
    try {
        const electron = require('electron');
        electronPath = typeof electron === 'string' ? electron : electron.toString();

        // If still not a valid path, try finding electron
        if (!electronPath || typeof electronPath !== 'string') {
            electronPath = require.resolve('electron/cli.js');
        }
    } catch (e) {
        // Fallback: use npx electron
        electronPath = 'npx';
    }

    const mainScript = path.join(__dirname, '../src/ui/main-electron.js');

    const args = electronPath === 'npx'
        ? ['electron', mainScript]
        : [mainScript];

    const child = spawn(electronPath, args, {
        stdio: 'inherit',
        windowsHide: false,
        shell: electronPath === 'npx'
    });

    let isExiting = false;

    function gracefulShutdown(signal) {
        if (isExiting) return;
        isExiting = true;

        console.log(`\n👋 Shutting down Mani-Calc Overlay (${signal})...`);

        // Try graceful kill first
        try {
            child.kill('SIGTERM');
        } catch (e) { }

        // On Windows, also try taskkill as backup
        if (process.platform === 'win32') {
            setTimeout(() => {
                try {
                    // Kill any remaining electron processes for this app
                    execSync('taskkill /IM electron.exe /F 2>nul', { stdio: 'ignore' });
                } catch (e) {
                    // Ignore errors - process may already be dead
                }
                process.exit(0);
            }, 500);
        } else {
            process.exit(0);
        }
    }

    child.on('close', (code) => {
        process.exit(code || 0);
    });

    child.on('error', (err) => {
        console.error('Failed to start Mani-Calc:', err.message);
        process.exit(1);
    });

    // Handle termination signals - Windows uses different events
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGHUP', () => gracefulShutdown('SIGHUP'));

    // Windows-specific: handle Ctrl+C and window close
    if (process.platform === 'win32') {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on('close', () => gracefulShutdown('readline-close'));
        rl.on('SIGINT', () => gracefulShutdown('win-SIGINT'));
    }
}
