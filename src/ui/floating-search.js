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

    // ... (rest of methods) ...

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
