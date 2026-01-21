class UnitConverter {
    constructor() {
        this.conversions = this.initializeConversions();
    }

    initializeConversions() {
        return {
            // Length conversions (base: meters)
            length: {
                m: 1,
                meter: 1,
                meters: 1,
                km: 1000,
                kilometer: 1000,
                kilometers: 1000,
                cm: 0.01,
                centimeter: 0.01,
                centimeters: 0.01,
                mm: 0.001,
                millimeter: 0.001,
                millimeters: 0.001,
                mile: 1609.34,
                miles: 1609.34,
                yard: 0.9144,
                yards: 0.9144,
                foot: 0.3048,
                feet: 0.3048,
                ft: 0.3048,
                inch: 0.0254,
                inches: 0.0254,
                in: 0.0254
            },

            // Weight conversions (base: kilograms)
            weight: {
                kg: 1,
                kilogram: 1,
                kilograms: 1,
                g: 0.001,
                gram: 0.001,
                grams: 0.001,
                mg: 0.000001,
                milligram: 0.000001,
                milligrams: 0.000001,
                lb: 0.453592,
                lbs: 0.453592,
                pound: 0.453592,
                pounds: 0.453592,
                oz: 0.0283495,
                ounce: 0.0283495,
                ounces: 0.0283495,
                ton: 1000,
                tons: 1000,
                tonne: 1000,
                tonnes: 1000
            },

            // Temperature conversions (special handling)
            temperature: {
                celsius: 'C',
                c: 'C',
                fahrenheit: 'F',
                f: 'F',
                kelvin: 'K',
                k: 'K'
            },

            // Volume conversions (base: liters)
            volume: {
                l: 1,
                liter: 1,
                liters: 1,
                ml: 0.001,
                milliliter: 0.001,
                milliliters: 0.001,
                gallon: 3.78541,
                gallons: 3.78541,
                gal: 3.78541,
                quart: 0.946353,
                quarts: 0.946353,
                qt: 0.946353,
                pint: 0.473176,
                pints: 0.473176,
                pt: 0.473176,
                cup: 0.236588,
                cups: 0.236588,
                floz: 0.0295735,
                'fluid ounce': 0.0295735,
                'fluid ounces': 0.0295735
            },

            // Time conversions (base: seconds)
            time: {
                s: 1,
                sec: 1,
                second: 1,
                seconds: 1,
                min: 60,
                minute: 60,
                minutes: 60,
                h: 3600,
                hr: 3600,
                hour: 3600,
                hours: 3600,
                day: 86400,
                days: 86400,
                week: 604800,
                weeks: 604800,
                month: 2592000,
                months: 2592000,
                year: 31536000,
                years: 31536000
            },

            // Speed conversions (base: m/s)
            speed: {
                'm/s': 1,
                'km/h': 0.277778,
                'mph': 0.44704,
                'ft/s': 0.3048,
                knot: 0.514444,
                knots: 0.514444
            }
        };
    }

    convert(value, fromUnit, toUnit) {
        fromUnit = fromUnit.toLowerCase();
        toUnit = toUnit.toLowerCase();

        // Find which category the units belong to
        const category = this.findCategory(fromUnit, toUnit);

        if (!category) {
            throw new Error(`Cannot convert from ${fromUnit} to ${toUnit}`);
        }

        // Special handling for temperature
        if (category === 'temperature') {
            return this.convertTemperature(value, fromUnit, toUnit);
        }

        // Standard conversion
        const conversions = this.conversions[category];

        if (!conversions[fromUnit] || !conversions[toUnit]) {
            throw new Error(`Unknown unit in conversion: ${fromUnit} or ${toUnit}`);
        }

        // Convert to base unit, then to target unit
        const baseValue = value * conversions[fromUnit];
        const result = baseValue / conversions[toUnit];

        return this.formatResult(result);
    }

    findCategory(fromUnit, toUnit) {
        for (const [category, units] of Object.entries(this.conversions)) {
            if (units[fromUnit] !== undefined && units[toUnit] !== undefined) {
                return category;
            }
        }
        return null;
    }

    convertTemperature(value, fromUnit, toUnit) {
        const temps = this.conversions.temperature;
        const from = temps[fromUnit];
        const to = temps[toUnit];

        if (!from || !to) {
            throw new Error(`Unknown temperature unit: ${fromUnit} or ${toUnit}`);
        }

        let celsius;

        // Convert to Celsius first
        if (from === 'C') {
            celsius = value;
        } else if (from === 'F') {
            celsius = (value - 32) * 5 / 9;
        } else if (from === 'K') {
            celsius = value - 273.15;
        }

        // Convert from Celsius to target
        let result;
        if (to === 'C') {
            result = celsius;
        } else if (to === 'F') {
            result = (celsius * 9 / 5) + 32;
        } else if (to === 'K') {
            result = celsius + 273.15;
        }

        return this.formatResult(result);
    }

    formatResult(result) {
        // Round to reasonable precision
        if (Math.abs(result - Math.round(result)) < 1e-10) {
            return Math.round(result);
        }
        return Math.round(result * 100) / 100;
    }
}

module.exports = UnitConverter;
