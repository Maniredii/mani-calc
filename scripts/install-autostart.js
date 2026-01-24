#!/usr/bin/env node
/**
 * Mani-Calc Auto-Start Installer
 * Adds Mani-Calc to Windows Startup so it runs automatically
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const APP_NAME = 'Mani-Calc';
const STARTUP_FOLDER = path.join(
    process.env.APPDATA,
    'Microsoft\\Windows\\Start Menu\\Programs\\Startup'
);

function getProjectRoot() {
    return path.resolve(__dirname, '..');
}

function createStartupShortcut() {
    console.log('\n🚀 Installing Mani-Calc Auto-Start...\n');

    const projectRoot = getProjectRoot();
    const overlayScript = path.join(projectRoot, 'bin', 'overlay.js');
    const shortcutPath = path.join(STARTUP_FOLDER, `${APP_NAME}.vbs`);

    // Check if overlay.js exists
    if (!fs.existsSync(overlayScript)) {
        console.error('❌ Error: overlay.js not found!');
        console.error(`   Expected at: ${overlayScript}`);
        process.exit(1);
    }

    // Get node path
    const nodePath = process.execPath;
    const scriptToRun = path.join(projectRoot, 'bin', 'overlay.js');

    // Create a VBS script that runs the overlay silently (no console window)
    const vbsContent = `
' Mani-Calc Auto-Start Script
' This script launches Mani-Calc Overlay silently at Windows startup

Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "${projectRoot.replace(/\\/g, '\\\\')}"
WshShell.Run """${nodePath.replace(/\\/g, '\\\\')}""" & " """ & "${scriptToRun.replace(/\\/g, '\\\\')}" & """", 0, False
Set WshShell = Nothing
`.trim();

    try {
        fs.writeFileSync(shortcutPath, vbsContent);
        console.log('✅ Auto-start installed successfully!\n');
        console.log('📁 Startup script created at:');
        console.log(`   ${shortcutPath}\n`);
        console.log('📝 What this means:');
        console.log('   • Mani-Calc will start automatically when Windows boots');
        console.log('   • It runs silently in the background (no console window)');
        console.log('   • Press Alt+Space anytime to use the calculator\n');
        console.log('💡 To start it now, run: npm run overlay\n');
        console.log('🗑️  To remove auto-start later, run: npm run uninstall-autostart\n');
    } catch (error) {
        console.error('❌ Failed to create startup script:', error.message);
        process.exit(1);
    }
}

function main() {
    // Check if running on Windows
    if (process.platform !== 'win32') {
        console.error('❌ This script only works on Windows!');
        process.exit(1);
    }

    // Check if Startup folder exists
    if (!fs.existsSync(STARTUP_FOLDER)) {
        console.error('❌ Windows Startup folder not found!');
        console.error(`   Expected at: ${STARTUP_FOLDER}`);
        process.exit(1);
    }

    createStartupShortcut();
}

main();
