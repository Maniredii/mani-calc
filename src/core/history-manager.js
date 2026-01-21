const fs = require('fs');
const path = require('path');

class HistoryManager {
    constructor() {
        this.historyFile = path.join(process.env.APPDATA || process.env.HOME, 'mani-calc', 'history.json');
        this.maxEntries = 100;
        this.ensureHistoryFile();
    }

    ensureHistoryFile() {
        const dir = path.dirname(this.historyFile);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        if (!fs.existsSync(this.historyFile)) {
            fs.writeFileSync(this.historyFile, JSON.stringify([], null, 2));
        }
    }

    addEntry(entry) {
        try {
            const history = this.loadHistory();

            const newEntry = {
                ...entry,
                timestamp: new Date().toISOString(),
                id: Date.now()
            };

            history.unshift(newEntry);

            // Keep only the most recent entries
            if (history.length > this.maxEntries) {
                history.splice(this.maxEntries);
            }

            this.saveHistory(history);

            return newEntry;
        } catch (error) {
            console.error('Failed to add history entry:', error);
        }
    }

    getHistory(limit = 10) {
        try {
            const history = this.loadHistory();
            return {
                type: 'history',
                entries: history.slice(0, limit),
                total: history.length,
                formatted: this.formatHistory(history.slice(0, limit))
            };
        } catch (error) {
            console.error('Failed to get history:', error);
            return {
                type: 'history',
                entries: [],
                total: 0,
                formatted: 'No history available'
            };
        }
    }

    formatHistory(entries) {
        if (entries.length === 0) {
            return 'No calculation history yet';
        }

        let formatted = 'Recent Calculations:\n\n';

        entries.forEach((entry, index) => {
            const date = new Date(entry.timestamp);
            const timeStr = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });

            formatted += `${index + 1}. ${entry.formatted} (${timeStr})\n`;
        });

        return formatted;
    }

    clearHistory() {
        try {
            this.saveHistory([]);
            return true;
        } catch (error) {
            console.error('Failed to clear history:', error);
            return false;
        }
    }

    loadHistory() {
        try {
            const data = fs.readFileSync(this.historyFile, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    saveHistory(history) {
        try {
            fs.writeFileSync(this.historyFile, JSON.stringify(history, null, 2));
        } catch (error) {
            console.error('Failed to save history:', error);
        }
    }

    searchHistory(query) {
        try {
            const history = this.loadHistory();
            const results = history.filter(entry =>
                entry.query.toLowerCase().includes(query.toLowerCase()) ||
                entry.formatted.toLowerCase().includes(query.toLowerCase())
            );

            return {
                type: 'search',
                query,
                results,
                formatted: this.formatHistory(results)
            };
        } catch (error) {
            console.error('Failed to search history:', error);
            return {
                type: 'search',
                query,
                results: [],
                formatted: 'Search failed'
            };
        }
    }
}

module.exports = HistoryManager;
