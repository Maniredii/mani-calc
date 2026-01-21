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
            await clipboardy.write(String(text));
            return true;
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            return false;
        }
    }

    async read() {
        try {
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
