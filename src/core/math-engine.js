const math = require('mathjs');

class MathEngine {
    constructor() {
        // Configure mathjs for better precision and functionality
        this.parser = math.parser();

        // Add custom functions
        this.addCustomFunctions();
    }

    addCustomFunctions() {
        // Add percentage calculation
        this.parser.set('percent', (value, total) => {
            return (value / 100) * total;
        });

        // Add common shortcuts
        this.parser.set('half', (value) => value / 2);
        this.parser.set('double', (value) => value * 2);
        this.parser.set('triple', (value) => value * 3);
    }

    evaluate(expression) {
        try {
            // Clean the expression
            const cleanExpression = this.cleanExpression(expression);

            // Evaluate using mathjs
            const result = this.parser.evaluate(cleanExpression);

            // Format the result
            return this.formatResult(result);
        } catch (error) {
            throw new Error(`Invalid expression: ${error.message}`);
        }
    }

    cleanExpression(expr) {
        // Remove common prefixes
        expr = expr.replace(/^(calc:|calculate:|=)\s*/i, '');

        // Replace common words with operators
        expr = expr.replace(/\s+plus\s+/gi, ' + ');
        expr = expr.replace(/\s+minus\s+/gi, ' - ');
        expr = expr.replace(/\s+times\s+/gi, ' * ');
        expr = expr.replace(/\s+divided by\s+/gi, ' / ');
        expr = expr.replace(/\s+multiplied by\s+/gi, ' * ');

        // Handle implicit multiplication (e.g., "2(3+4)" -> "2*(3+4)")
        expr = expr.replace(/(\d)\(/g, '$1*(');

        return expr.trim();
    }

    formatResult(result) {
        // Handle complex numbers
        if (typeof result === 'object' && result.im !== undefined) {
            return result.toString();
        }

        // Handle arrays/matrices
        if (Array.isArray(result)) {
            return JSON.stringify(result);
        }

        // Handle regular numbers
        if (typeof result === 'number') {
            // Round to reasonable precision
            if (Math.abs(result) < 1e-10) return 0;
            if (Math.abs(result - Math.round(result)) < 1e-10) {
                return Math.round(result);
            }
            return Math.round(result * 1e10) / 1e10;
        }

        return result;
    }

    // Store variables for session
    setVariable(name, value) {
        this.parser.set(name, value);
    }

    getVariable(name) {
        return this.parser.get(name);
    }

    clearVariables() {
        this.parser.clear();
        this.addCustomFunctions();
    }
}

module.exports = MathEngine;
