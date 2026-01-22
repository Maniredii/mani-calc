/**
 * Settings Manager Module
 * Handles app settings, themes, hotkeys, and auto-start
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

class SettingsManager {
    constructor() {
        this.settingsDir = path.join(os.homedir(), '.mani-calc');
        this.settingsFile = path.join(this.settingsDir, 'settings.json');

        // Default settings
        this.defaults = {
            hotkey: 'Alt+Space',
            theme: 'dark',
            autoStart: false,
            soundEnabled: true,
            historyLimit: 100,
            clipboardEnabled: true,
            showHints: true,
            compactMode: false,
            customAccentColor: '#00D9FF',
            animationsEnabled: true,
            position: 'center', // center, top, bottom
            opacity: 0.95
        };

        this.settings = { ...this.defaults };
        this.load();
    }

    /**
     * Ensure settings directory exists
     */
    ensureDir() {
        if (!fs.existsSync(this.settingsDir)) {
            fs.mkdirSync(this.settingsDir, { recursive: true });
        }
    }

    /**
     * Load settings from file
     */
    load() {
        try {
            if (fs.existsSync(this.settingsFile)) {
                const data = fs.readFileSync(this.settingsFile, 'utf8');
                const saved = JSON.parse(data);
                this.settings = { ...this.defaults, ...saved };
            }
        } catch (error) {
            console.error('Failed to load settings:', error.message);
            this.settings = { ...this.defaults };
        }
        return this.settings;
    }

    /**
     * Save settings to file
     */
    save() {
        try {
            this.ensureDir();
            fs.writeFileSync(this.settingsFile, JSON.stringify(this.settings, null, 2));
            return true;
        } catch (error) {
            console.error('Failed to save settings:', error.message);
            return false;
        }
    }

    /**
     * Get a setting
     */
    get(key) {
        return this.settings[key] ?? this.defaults[key];
    }

    /**
     * Set a setting
     */
    set(key, value) {
        this.settings[key] = value;
        this.save();
        return value;
    }

    /**
     * Get all settings
     */
    getAll() {
        return { ...this.settings };
    }

    /**
     * Reset to defaults
     */
    reset() {
        this.settings = { ...this.defaults };
        this.save();
        return this.settings;
    }

    /**
     * Configure auto-start on Windows boot
     */
    async setAutoStart(enabled) {
        const { exec } = require('child_process');
        const { promisify } = require('util');
        const execAsync = promisify(exec);

        try {
            const appPath = process.execPath;
            const startupFolder = path.join(os.homedir(), 'AppData', 'Roaming', 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'Startup');
            const shortcutPath = path.join(startupFolder, 'Mani-Calc.lnk');

            if (enabled) {
                // Create shortcut using PowerShell
                const psCommand = `
                    $WshShell = New-Object -comObject WScript.Shell
                    $Shortcut = $WshShell.CreateShortcut("${shortcutPath.replace(/\\/g, '\\\\')}")
                    $Shortcut.TargetPath = "npx"
                    $Shortcut.Arguments = "electron ${path.join(__dirname, '..', 'ui', 'main-electron.js').replace(/\\/g, '\\\\')}"
                    $Shortcut.WorkingDirectory = "${path.join(__dirname, '..', '..').replace(/\\/g, '\\\\')}"
                    $Shortcut.Description = "Mani-Calc Overlay"
                    $Shortcut.Save()
                `;
                await execAsync(`powershell -Command "${psCommand.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`);
                this.set('autoStart', true);
                return { success: true, message: 'Auto-start enabled! Mani-Calc will start with Windows.' };
            } else {
                // Remove shortcut
                if (fs.existsSync(shortcutPath)) {
                    fs.unlinkSync(shortcutPath);
                }
                this.set('autoStart', false);
                return { success: true, message: 'Auto-start disabled.' };
            }
        } catch (error) {
            return { success: false, message: `Failed: ${error.message}` };
        }
    }

    /**
     * Get available themes
     */
    getThemes() {
        return [
            { id: 'dark', name: 'Dark Mode', colors: { bg: '#1e1e1e', accent: '#00D9FF' } },
            { id: 'light', name: 'Light Mode', colors: { bg: '#ffffff', accent: '#0066cc' } },
            { id: 'midnight', name: 'Midnight Blue', colors: { bg: '#0a1628', accent: '#4a9eff' } },
            { id: 'forest', name: 'Forest Green', colors: { bg: '#1a2f1a', accent: '#4caf50' } },
            { id: 'sunset', name: 'Sunset Orange', colors: { bg: '#2d1a1a', accent: '#ff6b35' } },
            { id: 'purple', name: 'Royal Purple', colors: { bg: '#1a1a2e', accent: '#9c27b0' } },
            { id: 'neon', name: 'Neon Glow', colors: { bg: '#0d0d0d', accent: '#39ff14' } },
            { id: 'ocean', name: 'Deep Ocean', colors: { bg: '#0a1929', accent: '#00bcd4' } }
        ];
    }

    /**
     * Set theme
     */
    setTheme(themeId) {
        const themes = this.getThemes();
        const theme = themes.find(t => t.id === themeId);

        if (theme) {
            this.set('theme', themeId);
            return theme;
        }

        return null;
    }
}

module.exports = SettingsManager;
