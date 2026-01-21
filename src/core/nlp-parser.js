class NLPParser {
    constructor() {
        this.patterns = this.initializePatterns();
    }

    initializePatterns() {
        return {
            // Percentage patterns
            percentage: [
                /what is (\d+\.?\d*)\s*(?:percent|%)\s*of\s*(\d+\.?\d*)/i,
                /(\d+\.?\d*)\s*(?:percent|%)\s*of\s*(\d+\.?\d*)/i,
                /calculate (\d+\.?\d*)\s*(?:percent|%)\s*of\s*(\d+\.?\d*)/i
            ],

            // Fraction patterns
            fraction: [
                /(half|quarter|third)\s*of\s*(\d+\.?\d*)/i,
                /(\d+\.?\d*)\s*(?:divided|split)\s*(?:by|into)\s*(\d+)/i
            ],

            // Square root patterns
            squareRoot: [
                /(?:square root|sqrt)\s*(?:of\s*)?(\d+\.?\d*)/i,
                /√(\d+\.?\d*)/
            ],

            // Power patterns
            power: [
                /(\d+\.?\d*)\s*(?:to the power of|raised to|power)\s*(\d+\.?\d*)/i,
                /(\d+\.?\d*)\s*(?:squared|²)/i,
                /(\d+\.?\d*)\s*(?:cubed|³)/i
            ],

            // Conversion patterns (handled separately)
            conversion: [
                /(\d+\.?\d*)\s*([a-z]+)\s*(?:to|in|as)\s*([a-z]+)/i
            ]
        };
    }

    parse(query) {
        const cleanQuery = query.trim();

        // Check for percentage
        for (const pattern of this.patterns.percentage) {
            const match = cleanQuery.match(pattern);
            if (match) {
                const percentage = parseFloat(match[1]);
                const total = parseFloat(match[2]);
                return {
                    type: 'natural_language',
                    expression: `(${percentage} / 100) * ${total}`,
                    original: cleanQuery
                };
            }
        }

        // Check for fractions
        for (const pattern of this.patterns.fraction) {
            const match = cleanQuery.match(pattern);
            if (match) {
                const fractionMap = {
                    'half': 2,
                    'quarter': 4,
                    'third': 3
                };

                if (match[1].toLowerCase() in fractionMap) {
                    const divisor = fractionMap[match[1].toLowerCase()];
                    const value = parseFloat(match[2]);
                    return {
                        type: 'natural_language',
                        expression: `${value} / ${divisor}`,
                        original: cleanQuery
                    };
                }
            }
        }

        // Check for square root
        for (const pattern of this.patterns.squareRoot) {
            const match = cleanQuery.match(pattern);
            if (match) {
                const value = parseFloat(match[1]);
                return {
                    type: 'natural_language',
                    expression: `sqrt(${value})`,
                    original: cleanQuery
                };
            }
        }

        // Check for power
        for (const pattern of this.patterns.power) {
            const match = cleanQuery.match(pattern);
            if (match) {
                if (cleanQuery.includes('squared') || cleanQuery.includes('²')) {
                    const value = parseFloat(match[1]);
                    return {
                        type: 'natural_language',
                        expression: `${value}^2`,
                        original: cleanQuery
                    };
                }
                if (cleanQuery.includes('cubed') || cleanQuery.includes('³')) {
                    const value = parseFloat(match[1]);
                    return {
                        type: 'natural_language',
                        expression: `${value}^3`,
                        original: cleanQuery
                    };
                }
                const base = parseFloat(match[1]);
                const exponent = parseFloat(match[2]);
                return {
                    type: 'natural_language',
                    expression: `${base}^${exponent}`,
                    original: cleanQuery
                };
            }
        }

        // Check for conversion
        for (const pattern of this.patterns.conversion) {
            const match = cleanQuery.match(pattern);
            if (match) {
                return {
                    type: 'conversion',
                    value: parseFloat(match[1]),
                    fromUnit: match[2].toLowerCase(),
                    toUnit: match[3].toLowerCase(),
                    original: cleanQuery
                };
            }
        }

        // No pattern matched, return as direct expression
        return {
            type: 'direct',
            expression: cleanQuery,
            original: cleanQuery
        };
    }
}

module.exports = NLPParser;
