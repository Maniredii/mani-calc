#!/usr/bin/env node

const path = require('path');

// Check if running directly via electron (electron bin/overlay.js)
// or via node (node bin/overlay.js)
if (process.versions.electron) {
    // Running in Electron directly - load main-electron.js
    require('../src/ui/main-electron.js');
} else {
    // Running from Node - spawn electron
    const { spawn } = require('child_process');

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

    child.on('close', (code) => {
        process.exit(code || 0);
    });

    // Handle termination signals
    process.on('SIGINT', () => {
        child.kill('SIGINT');
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        child.kill('SIGTERM');
        process.exit(0);
    });
}
