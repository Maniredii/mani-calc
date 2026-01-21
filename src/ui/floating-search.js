const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const path = require('path');

class FloatingSearchBox {
    constructor(maniCalc) {
        this.maniCalc = maniCalc;
        this.window = null;
        this.isVisible = false;
        this.hotkey = 'Alt+Space'; // Default hotkey
    }

    async initialize() {
        // Wait for Electron app to be ready
        if (!app.isReady()) {
            await app.whenReady();
        }

        this.createWindow();
        this.registerHotkey();
        this.setupIPC();
    }

    createWindow() {
        this.window = new BrowserWindow({
            width: 600,
            height: 80,
            frame: false,
            transparent: true,
            alwaysOnTop: true,
            skipTaskbar: true,
            resizable: false,
            show: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        // Center the window
        const { screen } = require('electron');
        const display = screen.getPrimaryDisplay();
        const { width, height } = display.workAreaSize;
        const x = Math.floor((width - 600) / 2);
        const y = Math.floor(height * 0.3); // 30% from top

        this.window.setPosition(x, y);

        // Load the HTML
        this.window.loadFile(path.join(__dirname, 'overlay.html'));

        // Hide when losing focus
        this.window.on('blur', () => {
            if (this.isVisible) {
                this.hide();
            }
        });
    }

    registerHotkey() {
        globalShortcut.register(this.hotkey, () => {
            this.toggle();
        });

        console.log(`✓ Hotkey registered: ${this.hotkey}`);
    }

    setupIPC() {
        // Handle query from renderer
        ipcMain.on('process-query', async (event, query) => {
            console.log('Processing query:', query);
            try {
                // Check for system commands first
                const systemResult = await this.handleSystemCommand(query);
                if (systemResult) {
                    console.log('System command executed:', systemResult);
                    event.reply('query-result', systemResult);
                    setTimeout(() => this.hide(), 1000);
                    return;
                }

                // Process as calculation
                console.log('Calculating...');
                const result = await this.maniCalc.processQuery(query);
                console.log('Calculation result:', result);
                event.reply('query-result', result);
            } catch (error) {
                console.error('Error processing query:', error);
                event.reply('query-result', {
                    error: error.message,
                    type: 'error'
                });
            }
        });

        // Handle hide request
        ipcMain.on('hide-window', () => {
            this.hide();
        });
    }

    async handleSystemCommand(query) {
        const cmd = query.toLowerCase().trim();
        const { exec } = require('child_process');
        const { promisify } = require('util');
        const execAsync = promisify(exec);

        const commands = {
            'help': {
                action: async () => {
                    return 'Commands: sleep, lock, shutdown, restart, logout, mute, volume up/down, theme, quit';
                },
                description: 'Show available commands'
            },
            'quit': {
                action: async () => {
                    setTimeout(() => app.quit(), 500);
                    return 'Quitting Mani-Calc...';
                },
                description: 'Quit application'
            },
            'exit': {
                action: async () => {
                    setTimeout(() => app.quit(), 500);
                    return 'Quitting Mani-Calc...';
                },
                description: 'Quit application'
            },
            'theme': {
                action: async () => {
                    this.window.webContents.send('toggle-theme');
                    return 'Toggled theme';
                },
                description: 'Toggle Light/Dark mode'
            },
            'sleep': {
                action: async () => {
                    await execAsync('rundll32.exe powrprof.dll,SetSuspendState 0,1,0');
                    return 'System going to sleep...';
                },
                description: 'Put computer to sleep'
            },
            'shutdown': {
                action: async () => {
                    await execAsync('shutdown /s /t 0');
                    return 'Shutting down...';
                },
                description: 'Shutdown computer'
            },
            'restart': {
                action: async () => {
                    await execAsync('shutdown /r /t 0');
                    return 'Restarting...';
                },
                description: 'Restart computer'
            },
            'lock': {
                action: async () => {
                    await execAsync('rundll32.exe user32.dll,LockWorkStation');
                    return 'Locking computer...';
                },
                description: 'Lock computer'
            },
            'logout': {
                action: async () => {
                    await execAsync('shutdown /l');
                    return 'Logging out...';
                },
                description: 'Log out current user'
            },
            'empty recycle bin': {
                action: async () => {
                    await execAsync('rd /s /q %systemdrive%\\$Recycle.bin');
                    return 'Recycle bin emptied';
                },
                description: 'Empty recycle bin'
            },
            'volume up': {
                action: async () => {
                    await execAsync('nircmd.exe changesysvolume 2000');
                    return 'Volume increased';
                },
                description: 'Increase volume'
            },
            'volume down': {
                action: async () => {
                    await execAsync('nircmd.exe changesysvolume -2000');
                    return 'Volume decreased';
                },
                description: 'Decrease volume'
            },
            'mute': {
                action: async () => {
                    await execAsync('nircmd.exe mutesysvolume 1');
                    return 'Volume muted';
                },
                description: 'Mute volume'
            },
            'unmute': {
                action: async () => {
                    await execAsync('nircmd.exe mutesysvolume 0');
                    return 'Volume unmuted';
                },
                description: 'Unmute volume'
            }
        };

        if (commands[cmd]) {
            try {
                const message = await commands[cmd].action();
                return {
                    result: message,
                    type: 'system_command',
                    formatted: message
                };
            } catch (error) {
                return {
                    error: `Failed to execute: ${error.message}`,
                    type: 'error'
                };
            }
        }

        return null;
    }

    show() {
        if (this.window) {
            this.window.show();
            this.window.focus();
            this.isVisible = true;
            this.window.webContents.send('focus-input');
        }
    }

    hide() {
        if (this.window) {
            this.window.hide();
            this.isVisible = false;
            this.window.webContents.send('clear-input');
        }
    }

    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    destroy() {
        if (this.window) {
            try {
                globalShortcut.unregister(this.hotkey);
                if (!this.window.isDestroyed()) {
                    this.window.close();
                }
            } catch (err) {
                console.error('Error destroying window:', err);
            }
            this.window = null;
        }
    }
}

module.exports = FloatingSearchBox;
