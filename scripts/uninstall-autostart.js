#!/usr/bin/env node
/**
 * Mani-Calc Auto-Start Uninstaller
 * Removes Mani-Calc from Windows Startup
 */

const fs = require('fs');
const path = require('path');

const APP_NAME = 'Mani-Calc';
const STARTUP_FOLDER = path.join(
    process.env.APPDATA,
    'Microsoft\\Windows\\Start Menu\\Programs\\Startup'
);

function removeStartupShortcut() {
    console.log('\n🗑️  Removing Mani-Calc Auto-Start...\n');

    const shortcutPath = path.join(STARTUP_FOLDER, `${APP_NAME}.vbs`);

    if (!fs.existsSync(shortcutPath)) {
        console.log('ℹ️  Auto-start was not installed (nothing to remove).\n');
        return;
    }

    try {
        fs.unlinkSync(shortcutPath);
        console.log('✅ Auto-start removed successfully!\n');
        console.log('📝 What this means:');
        console.log('   • Mani-Calc will NO longer start automatically');
        console.log('   • You can still run it manually with: npm run overlay\n');
        console.log('💡 To re-enable auto-start, run: npm run install-autostart\n');
    } catch (error) {
        console.error('❌ Failed to remove startup script:', error.message);
        process.exit(1);
    }
}

function main() {
    // Check if running on Windows
    if (process.platform !== 'win32') {
        console.error('❌ This script only works on Windows!');
        process.exit(1);
    }

    removeStartupShortcut();
}

main();
