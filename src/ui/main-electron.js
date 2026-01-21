const { app } = require('electron');
const ManiCalc = require('../index');
const FloatingSearchBox = require('./floating-search');
const chalk = require('chalk');

let maniCalc;
let floatingSearch;

async function startOverlayMode() {
    console.log(chalk.cyan('\n🚀 Starting Mani-Calc Overlay Mode...\n'));

    // Initialize ManiCalc
    maniCalc = new ManiCalc();

    // Initialize Floating Search Box
    floatingSearch = new FloatingSearchBox(maniCalc);
    await floatingSearch.initialize();

    console.log(chalk.green('✓ Mani-Calc Overlay is running!'));
    console.log(chalk.yellow('\n📝 Press Alt+Space to toggle the search box'));
    console.log(chalk.gray('   Press Ctrl+C to exit\n'));
}

// Handle app ready
app.on('ready', startOverlayMode);

// Prevent app from quitting when all windows are closed
app.on('window-all-closed', (e) => {
    e.preventDefault();
});

// Handle app quit
app.on('will-quit', () => {
    if (floatingSearch) {
        floatingSearch.destroy();
    }
});

// Handle Ctrl+C
process.on('SIGINT', () => {
    console.log(chalk.cyan('\n\n👋 Shutting down Mani-Calc Overlay...\n'));
    app.quit();
    process.exit(0);
});
