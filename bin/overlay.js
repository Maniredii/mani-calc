#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const electron = require('electron');

const mainScript = path.join(__dirname, '../src/ui/main-electron.js');

const child = spawn(electron, [mainScript], {
    stdio: 'inherit',
    windowsHide: false
});

child.on('close', (code) => {
    process.exit(code);
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
