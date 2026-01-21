const clipboardy = require('clipboardy');

class ClipboardManager {
    constructor() {
        this.autoCopy = true;
    }

    async copy(text) {
        if (!this.autoCopy) {
            return false;
        }

        try {
            // Check if running in Electron
            if (process.versions.electron) {
                const { clipboard } = require('electron');
                clipboard.writeText(String(text));
                return true;
            }

            // Fallback to clipboardy for CLI
            await clipboardy.write(String(text));
            return true;
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            return false;
        }
    }

    async read() {
        try {
            // Check if running in Electron
            if (process.versions.electron) {
                const { clipboard } = require('electron');
                return clipboard.readText();
            }

            return await clipboardy.read();
        } catch (error) {
            console.error('Failed to read from clipboard:', error);
            return null;
        }
    }

    setAutoCopy(enabled) {
        this.autoCopy = enabled;
    }

    isAutoCopyEnabled() {
        return this.autoCopy;
    }
}

module.exports = ClipboardManager;
