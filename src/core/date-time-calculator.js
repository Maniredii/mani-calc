/**
 * Date/Time Calculator Module
 * Handles date arithmetic, countdowns, and world clock
 */

class DateTimeCalculator {
    constructor() {
        // Timezone offsets (from UTC)
        this.timezones = {
            // Americas
            'new york': -5, 'nyc': -5, 'est': -5, 'eastern': -5,
            'los angeles': -8, 'la': -8, 'pst': -8, 'pacific': -8,
            'chicago': -6, 'cst': -6, 'central': -6,
            'denver': -7, 'mst': -7, 'mountain': -7,
            'toronto': -5, 'vancouver': -8, 'mexico city': -6,
            'sao paulo': -3, 'brazil': -3, 'buenos aires': -3,

            // Europe
            'london': 0, 'uk': 0, 'gmt': 0, 'utc': 0,
            'paris': 1, 'berlin': 1, 'rome': 1, 'madrid': 1, 'cet': 1,
            'amsterdam': 1, 'brussels': 1, 'vienna': 1, 'zurich': 1,
            'moscow': 3, 'istanbul': 3, 'athens': 2, 'helsinki': 2,

            // Asia
            'india': 5.5, 'delhi': 5.5, 'mumbai': 5.5, 'ist': 5.5, 'kolkata': 5.5,
            'dubai': 4, 'uae': 4, 'abu dhabi': 4,
            'singapore': 8, 'hong kong': 8, 'hk': 8,
            'tokyo': 9, 'japan': 9, 'jst': 9,
            'seoul': 9, 'korea': 9, 'kst': 9,
            'beijing': 8, 'shanghai': 8, 'china': 8,
            'bangkok': 7, 'jakarta': 7, 'vietnam': 7, 'hanoi': 7,
            'taipei': 8, 'taiwan': 8,
            'manila': 8, 'philippines': 8,
            'kuala lumpur': 8, 'malaysia': 8,

            // Oceania
            'sydney': 11, 'australia': 11, 'melbourne': 11, 'aest': 11,
            'perth': 8, 'brisbane': 10,
            'auckland': 13, 'new zealand': 13, 'nzst': 13,

            // Africa/Middle East
            'cairo': 2, 'johannesburg': 2, 'lagos': 1,
            'riyadh': 3, 'saudi': 3, 'tel aviv': 2, 'israel': 2
        };

        // Common date patterns
        this.months = {
            'jan': 0, 'january': 0,
            'feb': 1, 'february': 1,
            'mar': 2, 'march': 2,
            'apr': 3, 'april': 3,
            'may': 4,
            'jun': 5, 'june': 5,
            'jul': 6, 'july': 6,
            'aug': 7, 'august': 7,
            'sep': 8, 'sept': 8, 'september': 8,
            'oct': 9, 'october': 9,
            'nov': 10, 'november': 10,
            'dec': 11, 'december': 11
        };
    }

    /**
     * Parse date query and return result
     */
    parse(query) {
        const q = query.toLowerCase().trim();

        // Time in location: "time in tokyo", "what time in london"
        const timeMatch = q.match(/(?:what(?:'s| is)?\s+)?time\s+(?:in|at)\s+(.+)/i);
        if (timeMatch) {
            return this.getTimeInLocation(timeMatch[1].trim());
        }

        // Today +/- days: "today + 30 days", "today - 2 weeks"
        const todayMatch = q.match(/today\s*([+-])\s*(\d+)\s*(day|days|week|weeks|month|months|year|years)/i);
        if (todayMatch) {
            return this.addToToday(todayMatch[1], parseInt(todayMatch[2]), todayMatch[3]);
        }

        // Days until/since: "days until dec 25", "days since jan 1"
        const daysMatch = q.match(/(days?|weeks?|months?)\s+(until|since|from|to)\s+(.+)/i);
        if (daysMatch) {
            return this.calculateDuration(daysMatch[1], daysMatch[2], daysMatch[3]);
        }

        // What day: "what day is dec 25", "what day was jan 1 2020"
        const whatDayMatch = q.match(/what\s+day\s+(?:is|was|will be)\s+(.+)/i);
        if (whatDayMatch) {
            return this.getWeekday(whatDayMatch[1]);
        }

        // Current date/time
        if (q === 'today' || q === 'date' || q === 'now') {
            return this.getCurrentDateTime();
        }

        if (q === 'time' || q === 'current time') {
            return this.getCurrentTime();
        }

        // Week number
        if (q === 'week' || q === 'week number' || q === 'what week') {
            return this.getWeekNumber();
        }

        return null;
    }

    /**
     * Get time in a specific location
     */
    getTimeInLocation(location) {
        const loc = location.toLowerCase().trim();
        const offset = this.timezones[loc];

        if (offset === undefined) {
            return {
                error: `Unknown location: ${location}`,
                type: 'error'
            };
        }

        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const targetTime = new Date(utc + (offset * 3600000));

        const hours = targetTime.getHours();
        const minutes = targetTime.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 || 12;

        const dayName = targetTime.toLocaleDateString('en-US', { weekday: 'short' });
        const monthDay = targetTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        return {
            result: `${hour12}:${minutes} ${ampm}`,
            formatted: `${location.charAt(0).toUpperCase() + location.slice(1)}: ${hour12}:${minutes} ${ampm} (${dayName}, ${monthDay})`,
            type: 'time',
            location: location,
            offset: offset
        };
    }

    /**
     * Add/subtract from today
     */
    addToToday(operator, amount, unit) {
        const today = new Date();
        let multiplier = operator === '+' ? 1 : -1;

        switch (unit.toLowerCase().replace(/s$/, '')) {
            case 'day':
                today.setDate(today.getDate() + (amount * multiplier));
                break;
            case 'week':
                today.setDate(today.getDate() + (amount * 7 * multiplier));
                break;
            case 'month':
                today.setMonth(today.getMonth() + (amount * multiplier));
                break;
            case 'year':
                today.setFullYear(today.getFullYear() + (amount * multiplier));
                break;
        }

        const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
        const formatted = today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return {
            result: today.toISOString().split('T')[0],
            formatted: formatted,
            type: 'date',
            dayName: dayName
        };
    }

    /**
     * Calculate days until/since a date
     */
    calculateDuration(unit, direction, dateStr) {
        const targetDate = this.parseDate(dateStr);

        if (!targetDate) {
            return {
                error: `Could not parse date: ${dateStr}`,
                type: 'error'
            };
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        targetDate.setHours(0, 0, 0, 0);

        const diffTime = targetDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let result, formatted;
        const unitLower = unit.toLowerCase().replace(/s$/, '');

        if (unitLower === 'week') {
            const weeks = Math.abs(Math.floor(diffDays / 7));
            const remainingDays = Math.abs(diffDays % 7);
            result = weeks;
            formatted = `${weeks} week${weeks !== 1 ? 's' : ''}${remainingDays > 0 ? ` and ${remainingDays} day${remainingDays !== 1 ? 's' : ''}` : ''}`;
        } else if (unitLower === 'month') {
            const months = Math.abs(Math.floor(diffDays / 30));
            result = months;
            formatted = `${months} month${months !== 1 ? 's' : ''} (approximately)`;
        } else {
            result = Math.abs(diffDays);
            formatted = `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`;
        }

        const prefix = diffDays > 0 ? 'in' : 'ago';

        return {
            result: result,
            formatted: diffDays === 0 ? 'Today!' : `${formatted} ${diffDays > 0 ? 'from now' : 'ago'}`,
            type: 'duration',
            days: diffDays
        };
    }

    /**
     * Get weekday for a date
     */
    getWeekday(dateStr) {
        const date = this.parseDate(dateStr);

        if (!date) {
            return {
                error: `Could not parse date: ${dateStr}`,
                type: 'error'
            };
        }

        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const formatted = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return {
            result: dayName,
            formatted: formatted,
            type: 'date'
        };
    }

    /**
     * Parse various date formats
     */
    parseDate(dateStr) {
        const str = dateStr.toLowerCase().trim();

        // Named dates
        if (str === 'christmas' || str === 'xmas') {
            const year = new Date().getMonth() >= 11 && new Date().getDate() > 25
                ? new Date().getFullYear() + 1
                : new Date().getFullYear();
            return new Date(year, 11, 25);
        }
        if (str === 'new year' || str === 'new years' || str === "new year's") {
            return new Date(new Date().getFullYear() + 1, 0, 1);
        }
        if (str === 'halloween') {
            const year = new Date().getMonth() > 9 ? new Date().getFullYear() + 1 : new Date().getFullYear();
            return new Date(year, 9, 31);
        }
        if (str === 'valentine' || str === "valentine's" || str === 'valentines') {
            const year = new Date().getMonth() > 1 ? new Date().getFullYear() + 1 : new Date().getFullYear();
            return new Date(year, 1, 14);
        }

        // Month day format: "dec 25", "december 25", "25 dec"
        const monthDayMatch = str.match(/(\d{1,2})\s+([a-z]+)|([a-z]+)\s+(\d{1,2})(?:\s+(\d{4}))?/);
        if (monthDayMatch) {
            let day, monthStr, year;
            if (monthDayMatch[1]) {
                day = parseInt(monthDayMatch[1]);
                monthStr = monthDayMatch[2];
            } else {
                monthStr = monthDayMatch[3];
                day = parseInt(monthDayMatch[4]);
                year = monthDayMatch[5] ? parseInt(monthDayMatch[5]) : null;
            }

            const month = this.months[monthStr];
            if (month !== undefined && day >= 1 && day <= 31) {
                const targetYear = year || new Date().getFullYear();
                return new Date(targetYear, month, day);
            }
        }

        // Standard date formats
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
            return date;
        }

        return null;
    }

    /**
     * Get current date and time
     */
    getCurrentDateTime() {
        const now = new Date();
        return {
            result: now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            formatted: now.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }),
            type: 'datetime'
        };
    }

    /**
     * Get current time
     */
    getCurrentTime() {
        const now = new Date();
        return {
            result: now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }),
            formatted: now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            }),
            type: 'time'
        };
    }

    /**
     * Get current week number
     */
    getWeekNumber() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const diff = now - start;
        const oneWeek = 604800000;
        const weekNum = Math.ceil((diff + start.getDay() * 86400000) / oneWeek);

        return {
            result: weekNum,
            formatted: `Week ${weekNum} of ${now.getFullYear()}`,
            type: 'week'
        };
    }
}

module.exports = DateTimeCalculator;
