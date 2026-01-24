#!/usr/bin/env node

const ManiCalc = require('../src/index');
const chalk = require('chalk');
const readline = require('readline');

const maniCalc = new ManiCalc();

async function main() {
    const args = process.argv.slice(2);

    // Handle protocol URLs (calc:query)
    if (args.length > 0 && args[0].startsWith('calc:')) {
        const query = maniCalc.windowsSearch.parseProtocolUrl(args[0]);
        if (query) {
            const result = await maniCalc.processQuery(query);
            displayResult(result);
            process.exit(0);
        }
    }

    // Handle direct query
    if (args.length > 0) {
        const query = args.join(' ');


        // Special commands
        if (query === 'install') {
            await installService();
            return;
        }

        if (query === 'uninstall') {
            await uninstallService();
            return;
        }

        if (query === 'install-autostart') {
            const path = require('path');
            const scriptPath = path.join(__dirname, '../scripts/install-autostart.js');
            require(scriptPath);
            return;
        }

        if (query === 'uninstall-autostart') {
            const path = require('path');
            const scriptPath = path.join(__dirname, '../scripts/uninstall-autostart.js');
            require(scriptPath);
            return;
        }

        if (query === 'version' || query === '-v' || query === '--version') {
            const pkg = require('../package.json');
            console.log(chalk.cyan(`mani-calc v${pkg.version}`));
            return;
        }

        if (query === 'help' || query === '-h' || query === '--help') {
            displayHelp();
            return;
        }

        // Process calculation
        const result = await maniCalc.processQuery(query);
        displayResult(result);
        return;
    }

    // Interactive mode
    await startInteractiveMode();
}

async function installService() {
    console.log(chalk.cyan('\n🔧 Installing Mani-Calc...\n'));

    const success = await maniCalc.initialize();

    if (success) {
        console.log(chalk.green('\n✓ Installation complete!'));
        console.log(chalk.yellow('\n📝 Usage:'));
        console.log(chalk.gray('   Type in Windows Search: calc: 2 + 3 * 5'));
        console.log(chalk.gray('   Or use CLI: mani-calc "10 km to miles"'));
        console.log(chalk.gray('   Interactive mode: mani-calc\n'));
    } else {
        console.log(chalk.red('\n✗ Installation failed. Please try running as administrator.\n'));
        process.exit(1);
    }
}

async function uninstallService() {
    console.log(chalk.cyan('\n🔧 Uninstalling Mani-Calc...\n'));

    await maniCalc.shutdown();

    console.log(chalk.green('✓ Uninstallation complete!\n'));
}

function displayHelp() {
    const pkg = require('../package.json');

    console.log(chalk.cyan.bold(`\n📊 Mani-Calc v${pkg.version}`));
    console.log(chalk.gray('Instant calculations from Windows Search\n'));

    console.log(chalk.yellow('Usage:'));
    console.log('  mani-calc [query]              Calculate expression');
    console.log('  mani-calc install              Install Windows Search integration');
    console.log('  mani-calc uninstall            Uninstall integration');
    console.log('  mani-calc                      Start interactive mode\n');

    console.log(chalk.yellow('Examples:'));
    console.log(chalk.gray('  Math:'));
    console.log('    mani-calc "2 + 3 * 5"');
    console.log('    mani-calc "sqrt(49)"');
    console.log('    mani-calc "(10 + 20) / 5"\n');

    console.log(chalk.gray('  Natural Language:'));
    console.log('    mani-calc "what is 25 percent of 200"');
    console.log('    mani-calc "half of 80"');
    console.log('    mani-calc "square root of 64"\n');

    console.log(chalk.gray('  Unit Conversions:'));
    console.log('    mani-calc "10 km to miles"');
    console.log('    mani-calc "5 kg to pounds"');
    console.log('    mani-calc "100 celsius to fahrenheit"\n');

    console.log(chalk.gray('  Special Commands:'));
    console.log('    mani-calc history');
    console.log('    mani-calc "clear history"\n');

    console.log(chalk.yellow('Windows Search:'));
    console.log(chalk.gray('  After installation, type in Windows Search:'));
    console.log(chalk.gray('  calc: 2 + 3 * 5\n'));
}

function displayResult(result) {
    if (result.type === 'error') {
        console.log(chalk.red(`\n✗ ${result.formatted}\n`));
        return;
    }

    if (result.type === 'history') {
        console.log(chalk.cyan(`\n${result.formatted}\n`));
        return;
    }

    if (result.type === 'info') {
        console.log(chalk.blue(`\n${result.result}\n`));
        return;
    }

    console.log(chalk.green(`\n✓ ${result.formatted}`));
    console.log(chalk.gray('  (Result copied to clipboard)\n'));
}

async function startInteractiveMode() {
    console.log(chalk.cyan.bold('\n📊 Mani-Calc Interactive Mode'));
    console.log(chalk.gray('Type your calculations or "help" for examples. Press Ctrl+C to exit.\n'));

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: chalk.yellow('calc> ')
    });

    rl.prompt();

    rl.on('line', async (line) => {
        const query = line.trim();

        if (!query) {
            rl.prompt();
            return;
        }

        if (query === 'exit' || query === 'quit') {
            console.log(chalk.cyan('\n👋 Goodbye!\n'));
            process.exit(0);
        }

        if (query === 'help') {
            displayHelp();
            rl.prompt();
            return;
        }

        if (query === 'clear') {
            console.clear();
            rl.prompt();
            return;
        }

        const result = await maniCalc.processQuery(query);
        displayResult(result);

        rl.prompt();
    });

    rl.on('close', () => {
        console.log(chalk.cyan('\n👋 Goodbye!\n'));
        process.exit(0);
    });
}

// Handle errors gracefully
process.on('uncaughtException', (error) => {
    console.error(chalk.red('\n✗ Error:'), error.message);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    console.error(chalk.red('\n✗ Error:'), error.message);
    process.exit(1);
});

main().catch((error) => {
    console.error(chalk.red('\n✗ Error:'), error.message);
    process.exit(1);
});
