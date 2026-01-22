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
                    // Don't auto-hide for info commands like 'help' - let user read the content
                    // Only auto-hide for action commands that perform an action (sleep, lock, etc.)
                    const actionCommands = ['sleep', 'shutdown', 'restart', 'lock', 'logout', 'quit', 'exit'];
                    const cmd = query.toLowerCase().trim();
                    if (actionCommands.includes(cmd)) {
                        setTimeout(() => this.hide(), 1500);
                    }
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

        // Handle resize request
        ipcMain.on('resize-window', (event, height) => {
            if (this.window) {
                this.window.setSize(600, height);
            }
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
                    return `📊 MATH: 2+3, sqrt(16), 15% of 200
💱 CURRENCY: 100 USD to INR, 50 euros to dollars
📅 DATE/TIME: time in tokyo, today + 30 days, days until christmas
💻 PROGRAMMER: 255 to hex, 0xFF to decimal, 255 AND 128
📏 UNITS: 10 km to miles, 100 kg to pounds
⚙️ SYSTEM: sleep, lock, mute, volume up/down, screenshot
🎨 THEMES: theme dark, theme neon, themes
⚡ SETTINGS: autostart on/off, settings`;
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
                    // Use PowerShell to simulate volume up key press
                    await execAsync('powershell -Command "(New-Object -ComObject WScript.Shell).SendKeys([char]175)"');
                    return 'Volume increased';
                },
                description: 'Increase volume'
            },
            'volume down': {
                action: async () => {
                    // Use PowerShell to simulate volume down key press
                    await execAsync('powershell -Command "(New-Object -ComObject WScript.Shell).SendKeys([char]174)"');
                    return 'Volume decreased';
                },
                description: 'Decrease volume'
            },
            'mute': {
                action: async () => {
                    // Use PowerShell to simulate mute key press
                    await execAsync('powershell -Command "(New-Object -ComObject WScript.Shell).SendKeys([char]173)"');
                    return 'Volume muted/unmuted';
                },
                description: 'Toggle mute'
            },
            'unmute': {
                action: async () => {
                    // Same as mute - it's a toggle
                    await execAsync('powershell -Command "(New-Object -ComObject WScript.Shell).SendKeys([char]173)"');
                    return 'Volume muted/unmuted';
                },
                description: 'Toggle mute'
            },
            // Screenshot
            'screenshot': {
                action: async () => {
                    await execAsync('snippingtool');
                    return 'Opening Snipping Tool...';
                },
                description: 'Take a screenshot'
            },
            'snip': {
                action: async () => {
                    await execAsync('snippingtool');
                    return 'Opening Snipping Tool...';
                },
                description: 'Take a screenshot'
            },
            // Brightness controls
            'brightness up': {
                action: async () => {
                    await execAsync('powershell -Command "(Get-WmiObject -Namespace root/WMI -Class WmiMonitorBrightnessMethods).WmiSetBrightness(1, [Math]::Min(100, (Get-WmiObject -Namespace root/WMI -Class WmiMonitorBrightness).CurrentBrightness + 10))"');
                    return 'Brightness increased';
                },
                description: 'Increase screen brightness'
            },
            'brightness down': {
                action: async () => {
                    await execAsync('powershell -Command "(Get-WmiObject -Namespace root/WMI -Class WmiMonitorBrightnessMethods).WmiSetBrightness(1, [Math]::Max(0, (Get-WmiObject -Namespace root/WMI -Class WmiMonitorBrightness).CurrentBrightness - 10))"');
                    return 'Brightness decreased';
                },
                description: 'Decrease screen brightness'
            },
            // WiFi toggle
            'wifi on': {
                action: async () => {
                    await execAsync('netsh interface set interface "Wi-Fi" enable');
                    return 'WiFi enabled';
                },
                description: 'Enable WiFi'
            },
            'wifi off': {
                action: async () => {
                    await execAsync('netsh interface set interface "Wi-Fi" disable');
                    return 'WiFi disabled';
                },
                description: 'Disable WiFi'
            },
            // Bluetooth toggle
            'bluetooth on': {
                action: async () => {
                    await execAsync('powershell -Command "Start-Service bthserv"');
                    return 'Bluetooth service started';
                },
                description: 'Enable Bluetooth'
            },
            'bluetooth off': {
                action: async () => {
                    await execAsync('powershell -Command "Stop-Service bthserv"');
                    return 'Bluetooth service stopped';
                },
                description: 'Disable Bluetooth'
            },
            // Quick app launchers
            'notepad': {
                action: async () => {
                    await execAsync('notepad');
                    return 'Opening Notepad...';
                },
                description: 'Open Notepad'
            },
            'calculator': {
                action: async () => {
                    await execAsync('calc');
                    return 'Opening Calculator...';
                },
                description: 'Open Windows Calculator'
            },
            'calc app': {
                action: async () => {
                    await execAsync('calc');
                    return 'Opening Calculator...';
                },
                description: 'Open Windows Calculator'
            },
            'explorer': {
                action: async () => {
                    await execAsync('explorer');
                    return 'Opening File Explorer...';
                },
                description: 'Open File Explorer'
            },
            'files': {
                action: async () => {
                    await execAsync('explorer');
                    return 'Opening File Explorer...';
                },
                description: 'Open File Explorer'
            },
            'task manager': {
                action: async () => {
                    await execAsync('taskmgr');
                    return 'Opening Task Manager...';
                },
                description: 'Open Task Manager'
            },
            'taskmgr': {
                action: async () => {
                    await execAsync('taskmgr');
                    return 'Opening Task Manager...';
                },
                description: 'Open Task Manager'
            },
            'control panel': {
                action: async () => {
                    await execAsync('control');
                    return 'Opening Control Panel...';
                },
                description: 'Open Control Panel'
            },
            'settings app': {
                action: async () => {
                    await execAsync('start ms-settings:');
                    return 'Opening Windows Settings...';
                },
                description: 'Open Windows Settings'
            },
            'cmd': {
                action: async () => {
                    await execAsync('start cmd');
                    return 'Opening Command Prompt...';
                },
                description: 'Open Command Prompt'
            },
            'powershell': {
                action: async () => {
                    await execAsync('start powershell');
                    return 'Opening PowerShell...';
                },
                description: 'Open PowerShell'
            },
            'browser': {
                action: async () => {
                    await execAsync('start chrome || start msedge || start firefox');
                    return 'Opening Browser...';
                },
                description: 'Open default browser'
            },
            // System info
            'ip': {
                action: async () => {
                    const { stdout } = await execAsync('powershell -Command "(Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike \'*Loopback*\'} | Select-Object -First 1).IPAddress"');
                    return `Your IP: ${stdout.trim()}`;
                },
                description: 'Show IP address'
            },
            'battery': {
                action: async () => {
                    const { stdout } = await execAsync('powershell -Command "(Get-WmiObject Win32_Battery).EstimatedChargeRemaining"');
                    const percent = stdout.trim();
                    return `🔋 Battery: ${percent}%`;
                },
                description: 'Show battery level'
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
