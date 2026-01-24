/**
 * Utilities Module
 * Password Generator, Random Generator, Text Utils, Emoji Search, Encoding
 */

const crypto = require('crypto');

class UtilitiesModule {
    constructor() {
        // Emoji database
        this.emojis = {
            happy: ['😀', '😃', '😄', '😁', '😆', '😊', '🙂', '😇', '🥰', '😍'],
            sad: ['😢', '😭', '😿', '😞', '😔', '🥺', '😥', '😰', '💔'],
            love: ['❤️', '💕', '💖', '💗', '💘', '💝', '💞', '💓', '💟', '🥰', '😍', '😘'],
            heart: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '💕', '💖'],
            angry: ['😠', '😡', '🤬', '👿', '💢', '😤', '🔥'],
            laugh: ['😂', '🤣', '😆', '😹', '😁', '🤭', '😸'],
            cool: ['😎', '🆒', '🤙', '👊', '✌️', '🕶️', '🧊'],
            fire: ['🔥', '💥', '⚡', '✨', '💫', '🌟', '⭐'],
            music: ['🎵', '🎶', '🎼', '🎹', '🎸', '🎺', '🥁', '🎷', '🎻'],
            food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🥗', '🍣', '🍜', '🍩', '🍪'],
            drink: ['☕', '🍵', '🧃', '🥤', '🍺', '🍷', '🍸', '🧋', '🥛'],
            animal: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁'],
            nature: ['🌸', '🌺', '🌻', '🌹', '🌷', '🌱', '🌲', '🌳', '🍀', '🌈'],
            weather: ['☀️', '🌤️', '⛅', '🌧️', '⛈️', '🌩️', '❄️', '🌨️', '🌪️', '🌈'],
            sport: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸'],
            travel: ['✈️', '🚗', '🚕', '🚌', '🚂', '🚀', '🛸', '🚁', '⛵', '🗺️'],
            work: ['💼', '📊', '📈', '💻', '🖥️', '⌨️', '🖱️', '📱', '📧', '📝'],
            money: ['💰', '💵', '💴', '💶', '💷', '💎', '🏦', '💳', '🪙', '📈'],
            celebrate: ['🎉', '🎊', '🥳', '🎈', '🎁', '🎂', '🍾', '🥂', '🎆', '🎇'],
            thumbs: ['👍', '👎', '👊', '✊', '🤛', '🤜', '👏', '🙌', '🤝', '✋'],
            hand: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞'],
            face: ['🙂', '😐', '🙄', '😏', '😬', '🤔', '🤨', '😑', '😶', '🫥'],
            star: ['⭐', '🌟', '✨', '💫', '🌠', '⚡', '🔥', '💥', '✴️', '❇️'],
            check: ['✅', '✓', '☑️', '✔️', '👍', '👌', '🆗', '💯'],
            cross: ['❌', '✖️', '❎', '🚫', '⛔', '🔴', '👎'],
            time: ['⏰', '⏱️', '⏲️', '🕐', '🕑', '🕒', '🕓', '🕔', '📅', '📆'],
            arrow: ['➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '🔄', '🔃']
        };

        // Notes storage
        this.notes = [];
    }

    /**
     * Generate secure password
     */
    generatePassword(length = 12) {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const allChars = lowercase + uppercase + numbers + symbols;

        let password = '';

        // Ensure at least one of each type
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += symbols[Math.floor(Math.random() * symbols.length)];

        // Fill the rest
        for (let i = password.length; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }

        // Shuffle the password
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }

    /**
     * Generate random number
     */
    randomNumber(min = 1, max = 100) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Roll dice
     */
    rollDice(sides = 6) {
        return Math.floor(Math.random() * sides) + 1;
    }

    /**
     * Flip coin
     */
    flipCoin() {
        return Math.random() < 0.5 ? 'Heads' : 'Tails';
    }

    /**
     * Generate UUID
     */
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Convert color formats
     */
    convertColor(input) {
        const hexMatch = input.match(/^#?([0-9a-f]{6})$/i);
        if (hexMatch) {
            const hex = hexMatch[1];
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            return {
                hex: `#${hex.toUpperCase()}`,
                rgb: `rgb(${r}, ${g}, ${b})`,
                hsl: this.rgbToHsl(r, g, b)
            };
        }

        const rgbMatch = input.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
        if (rgbMatch) {
            const r = parseInt(rgbMatch[1]);
            const g = parseInt(rgbMatch[2]);
            const b = parseInt(rgbMatch[3]);
            const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
            return {
                hex: hex,
                rgb: `rgb(${r}, ${g}, ${b})`,
                hsl: this.rgbToHsl(r, g, b)
            };
        }

        return null;
    }

    rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }

        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }

    /**
     * Text utilities
     */
    textUtils(operation, text) {
        switch (operation) {
            case 'upper':
                return text.toUpperCase();
            case 'lower':
                return text.toLowerCase();
            case 'reverse':
                return text.split('').reverse().join('');
            case 'count':
                const chars = text.length;
                const words = text.trim() ? text.trim().split(/\s+/).length : 0;
                const lines = text.split('\n').length;
                return { chars, words, lines };
            case 'capitalize':
                return text.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
            case 'camelcase':
                return text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
            case 'snakecase':
                return text.toLowerCase().replace(/\s+/g, '_');
            case 'kebabcase':
                return text.toLowerCase().replace(/\s+/g, '-');
            default:
                return text;
        }
    }

    /**
     * Base64 encoding/decoding
     */
    base64Encode(text) {
        return Buffer.from(text).toString('base64');
    }

    base64Decode(encoded) {
        return Buffer.from(encoded, 'base64').toString('utf8');
    }

    /**
     * Generate hash
     */
    generateHash(algorithm, text) {
        return crypto.createHash(algorithm).update(text).digest('hex');
    }

    /**
     * Search emojis
     */
    searchEmoji(keyword) {
        const key = keyword.toLowerCase();
        if (this.emojis[key]) {
            return this.emojis[key];
        }

        // Search in all categories
        const results = [];
        for (const [category, emojis] of Object.entries(this.emojis)) {
            if (category.includes(key)) {
                results.push(...emojis);
            }
        }

        return results.length > 0 ? results.slice(0, 10) : ['No emojis found'];
    }

    /**
     * Get web search URL
     */
    getSearchUrl(engine, query) {
        const engines = {
            google: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
            youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
            bing: `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
            duckduckgo: `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
            wiki: `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}`,
            wikipedia: `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}`,
            github: `https://github.com/search?q=${encodeURIComponent(query)}`,
            stackoverflow: `https://stackoverflow.com/search?q=${encodeURIComponent(query)}`,
            amazon: `https://www.amazon.com/s?k=${encodeURIComponent(query)}`,
            twitter: `https://twitter.com/search?q=${encodeURIComponent(query)}`,
            reddit: `https://www.reddit.com/search/?q=${encodeURIComponent(query)}`,
            maps: `https://www.google.com/maps/search/${encodeURIComponent(query)}`
        };

        return engines[engine.toLowerCase()] || engines.google;
    }

    /**
     * Parse query and execute utility function
     */
    parse(query) {
        const q = query.toLowerCase().trim();

        // Password generator: "password", "password 16"
        const passMatch = q.match(/^password(?:\s+(\d+))?$/);
        if (passMatch) {
            const length = passMatch[1] ? parseInt(passMatch[1]) : 12;
            const password = this.generatePassword(Math.min(Math.max(length, 8), 64));
            return {
                result: password,
                formatted: `🔐 Password: ${password}`,
                type: 'password'
            };
        }

        // Random number: "random", "random 1 100"
        const randomMatch = q.match(/^random(?:\s+(\d+)\s+(\d+))?$/);
        if (randomMatch) {
            const min = randomMatch[1] ? parseInt(randomMatch[1]) : 1;
            const max = randomMatch[2] ? parseInt(randomMatch[2]) : 100;
            const num = this.randomNumber(min, max);
            return {
                result: num,
                formatted: `🎲 Random (${min}-${max}): ${num}`,
                type: 'random'
            };
        }

        // Dice roll: "dice", "roll", "d6", "d20"
        const diceMatch = q.match(/^(?:dice|roll|d(\d+))$/);
        if (diceMatch) {
            const sides = diceMatch[1] ? parseInt(diceMatch[1]) : 6;
            const result = this.rollDice(sides);
            return {
                result: result,
                formatted: `🎲 Dice (d${sides}): ${result}`,
                type: 'dice'
            };
        }

        // Coin flip: "coin", "flip"
        if (q === 'coin' || q === 'flip' || q === 'flip coin') {
            const result = this.flipCoin();
            const emoji = result === 'Heads' ? '🪙' : '🔴';
            return {
                result: result,
                formatted: `${emoji} Coin Flip: ${result}`,
                type: 'coin'
            };
        }

        // UUID: "uuid"
        if (q === 'uuid' || q === 'guid') {
            const uuid = this.generateUUID();
            return {
                result: uuid,
                formatted: `🔑 UUID: ${uuid}`,
                type: 'uuid'
            };
        }

        // Color conversion: "#FF5733 to rgb", "rgb(255,0,0) to hex"
        const colorMatch = query.match(/^(#?[0-9a-f]{6}|rgb\s*\([^)]+\))\s*(?:to\s+(\w+))?$/i);
        if (colorMatch) {
            const color = this.convertColor(colorMatch[1]);
            if (color) {
                const format = colorMatch[2]?.toLowerCase();
                let result = format ? color[format] || color.hex : `${color.hex} | ${color.rgb} | ${color.hsl}`;
                return {
                    result: result,
                    formatted: `🎨 Color: ${result}`,
                    type: 'color'
                };
            }
        }

        // Text utilities: "upper hello", "lower HELLO", "reverse hello"
        const textMatch = q.match(/^(upper|lower|reverse|capitalize|camelcase|snakecase|kebabcase)\s+(.+)$/);
        if (textMatch) {
            const result = this.textUtils(textMatch[1], textMatch[2]);
            return {
                result: result,
                formatted: `📝 ${textMatch[1]}: ${result}`,
                type: 'text'
            };
        }

        // Count: "count hello world"
        const countMatch = q.match(/^count\s+(.+)$/);
        if (countMatch) {
            const stats = this.textUtils('count', countMatch[1]);
            return {
                result: stats,
                formatted: `📊 Count: ${stats.chars} chars, ${stats.words} words`,
                type: 'count'
            };
        }

        // Base64 encode/decode
        const base64Match = query.match(/^base64\s+(encode|decode)\s+(.+)$/i);
        if (base64Match) {
            const operation = base64Match[1].toLowerCase();
            const text = base64Match[2];
            const result = operation === 'encode' ? this.base64Encode(text) : this.base64Decode(text);
            return {
                result: result,
                formatted: `🔤 Base64 ${operation}: ${result}`,
                type: 'base64'
            };
        }

        // Hash: "md5 hello", "sha256 hello"
        const hashMatch = q.match(/^(md5|sha1|sha256|sha512)\s+(.+)$/);
        if (hashMatch) {
            const hash = this.generateHash(hashMatch[1], hashMatch[2]);
            return {
                result: hash,
                formatted: `🔒 ${hashMatch[1].toUpperCase()}: ${hash}`,
                type: 'hash'
            };
        }

        // Emoji search: "emoji happy", "emoji heart"
        const emojiMatch = q.match(/^emoji\s+(.+)$/);
        if (emojiMatch) {
            const emojis = this.searchEmoji(emojiMatch[1]);
            return {
                result: emojis.join(' '),
                formatted: `😀 Emojis: ${emojis.join(' ')}`,
                type: 'emoji'
            };
        }

        // Web search: "google AI", "youtube music", "wiki einstein"
        const searchEngines = ['google', 'youtube', 'bing', 'duckduckgo', 'wiki', 'wikipedia', 'github', 'stackoverflow', 'amazon', 'twitter', 'reddit', 'maps'];
        for (const engine of searchEngines) {
            if (q.startsWith(engine + ' ')) {
                const searchQuery = query.slice(engine.length + 1);
                const url = this.getSearchUrl(engine, searchQuery);
                return {
                    result: url,
                    formatted: `🔍 Search ${engine}: ${searchQuery}`,
                    type: 'search',
                    url: url,
                    engine: engine
                };
            }
        }

        return null;
    }
}

module.exports = UtilitiesModule;
