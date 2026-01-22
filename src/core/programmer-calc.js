/**
 * Programmer Calculator Module
 * Handles hex, binary, octal conversions and bitwise operations
 */

class ProgrammerCalculator {
    constructor() {
        // Regex patterns for different number formats
        this.patterns = {
            hex: /^(?:0x|#)?([0-9a-fA-F]+)$/,
            binary: /^(?:0b)?([01]+)$/,
            octal: /^(?:0o)?([0-7]+)$/,
            decimal: /^(\d+)$/
        };
    }

    /**
     * Parse programmer calculation query
     */
    parse(query) {
        const q = query.toLowerCase().trim();

        // Convert to decimal: "0xFF to decimal", "hex FF to dec"
        const toDecMatch = q.match(/(?:0x|hex\s*)?([0-9a-f]+)\s+to\s+(?:dec|decimal)/i);
        if (toDecMatch) {
            return this.hexToDecimal(toDecMatch[1]);
        }

        // Convert to hex: "255 to hex", "decimal 255 to hex"
        const toHexMatch = q.match(/(?:decimal\s+)?(\d+)\s+to\s+hex/i);
        if (toHexMatch) {
            return this.decimalToHex(parseInt(toHexMatch[1]));
        }

        // Convert to binary: "255 to binary", "255 to bin"
        const toBinMatch = q.match(/(?:decimal\s+)?(\d+)\s+to\s+(?:bin|binary)/i);
        if (toBinMatch) {
            return this.decimalToBinary(parseInt(toBinMatch[1]));
        }

        // Convert binary to decimal: "0b1111 to decimal", "binary 1111 to dec"
        const binToDecMatch = q.match(/(?:0b|binary\s+)?([01]+)\s+to\s+(?:dec|decimal)/i);
        if (binToDecMatch && q.includes('bin') || q.startsWith('0b')) {
            return this.binaryToDecimal(binToDecMatch[1]);
        }

        // Convert to octal: "255 to octal", "255 to oct"
        const toOctMatch = q.match(/(?:decimal\s+)?(\d+)\s+to\s+(?:oct|octal)/i);
        if (toOctMatch) {
            return this.decimalToOctal(parseInt(toOctMatch[1]));
        }

        // Quick hex prefix: "hex 255", "hex(255)"
        const hexMatch = q.match(/^hex\s*\(?(\d+)\)?$/i);
        if (hexMatch) {
            return this.decimalToHex(parseInt(hexMatch[1]));
        }

        // Quick binary prefix: "bin 255", "binary 255"
        const binMatch = q.match(/^(?:bin|binary)\s*\(?(\d+)\)?$/i);
        if (binMatch) {
            return this.decimalToBinary(parseInt(binMatch[1]));
        }

        // Quick octal prefix: "oct 255", "octal 255"
        const octMatch = q.match(/^(?:oct|octal)\s*\(?(\d+)\)?$/i);
        if (octMatch) {
            return this.decimalToOctal(parseInt(octMatch[1]));
        }

        // Bitwise operations: "255 AND 128", "255 OR 64", "NOT 255", "255 XOR 128"
        const bitwiseMatch = q.match(/(\d+)\s+(and|or|xor|nand|nor)\s+(\d+)/i);
        if (bitwiseMatch) {
            return this.bitwiseOperation(
                parseInt(bitwiseMatch[1]),
                bitwiseMatch[2].toLowerCase(),
                parseInt(bitwiseMatch[3])
            );
        }

        // NOT operation: "NOT 255", "~255"
        const notMatch = q.match(/(?:not|~)\s*(\d+)/i);
        if (notMatch) {
            return this.bitwiseNot(parseInt(notMatch[1]));
        }

        // Shift operations: "255 << 2", "255 >> 2"
        const shiftMatch = q.match(/(\d+)\s*(<<|>>|>>>)\s*(\d+)/);
        if (shiftMatch) {
            return this.bitShift(
                parseInt(shiftMatch[1]),
                shiftMatch[2],
                parseInt(shiftMatch[3])
            );
        }

        // Direct 0x prefix detection
        if (q.startsWith('0x')) {
            return this.hexToDecimal(q.slice(2));
        }

        // Direct 0b prefix detection
        if (q.startsWith('0b')) {
            return this.binaryToDecimal(q.slice(2));
        }

        return null;
    }

    /**
     * Hex to Decimal
     */
    hexToDecimal(hex) {
        const decimal = parseInt(hex, 16);
        if (isNaN(decimal)) {
            return { error: `Invalid hex: ${hex}`, type: 'error' };
        }
        return {
            result: decimal,
            formatted: `0x${hex.toUpperCase()} = ${decimal} (decimal)`,
            type: 'programmer',
            conversions: this.getAllConversions(decimal)
        };
    }

    /**
     * Decimal to Hex
     */
    decimalToHex(decimal) {
        if (isNaN(decimal)) {
            return { error: `Invalid number: ${decimal}`, type: 'error' };
        }
        const hex = decimal.toString(16).toUpperCase();
        return {
            result: `0x${hex}`,
            formatted: `${decimal} = 0x${hex} (hex)`,
            type: 'programmer',
            conversions: this.getAllConversions(decimal)
        };
    }

    /**
     * Decimal to Binary
     */
    decimalToBinary(decimal) {
        if (isNaN(decimal)) {
            return { error: `Invalid number: ${decimal}`, type: 'error' };
        }
        const binary = decimal.toString(2);
        // Pad to 8-bit boundaries
        const padded = binary.padStart(Math.ceil(binary.length / 8) * 8, '0');
        const formatted = padded.replace(/(.{4})/g, '$1 ').trim();
        return {
            result: `0b${binary}`,
            formatted: `${decimal} = ${formatted} (binary)`,
            type: 'programmer',
            conversions: this.getAllConversions(decimal)
        };
    }

    /**
     * Binary to Decimal
     */
    binaryToDecimal(binary) {
        const clean = binary.replace(/\s/g, '');
        const decimal = parseInt(clean, 2);
        if (isNaN(decimal)) {
            return { error: `Invalid binary: ${binary}`, type: 'error' };
        }
        return {
            result: decimal,
            formatted: `0b${clean} = ${decimal} (decimal)`,
            type: 'programmer',
            conversions: this.getAllConversions(decimal)
        };
    }

    /**
     * Decimal to Octal
     */
    decimalToOctal(decimal) {
        if (isNaN(decimal)) {
            return { error: `Invalid number: ${decimal}`, type: 'error' };
        }
        const octal = decimal.toString(8);
        return {
            result: `0o${octal}`,
            formatted: `${decimal} = 0o${octal} (octal)`,
            type: 'programmer',
            conversions: this.getAllConversions(decimal)
        };
    }

    /**
     * Bitwise operations
     */
    bitwiseOperation(a, op, b) {
        let result;
        switch (op) {
            case 'and': result = a & b; break;
            case 'or': result = a | b; break;
            case 'xor': result = a ^ b; break;
            case 'nand': result = ~(a & b); break;
            case 'nor': result = ~(a | b); break;
            default: return { error: `Unknown operation: ${op}`, type: 'error' };
        }
        return {
            result: result,
            formatted: `${a} ${op.toUpperCase()} ${b} = ${result}`,
            type: 'programmer',
            conversions: this.getAllConversions(result)
        };
    }

    /**
     * Bitwise NOT
     */
    bitwiseNot(a) {
        // For 32-bit unsigned representation
        const result = ~a >>> 0;
        return {
            result: result,
            formatted: `NOT ${a} = ${result} (32-bit unsigned)`,
            type: 'programmer',
            conversions: this.getAllConversions(result)
        };
    }

    /**
     * Bit shift operations
     */
    bitShift(a, op, b) {
        let result;
        switch (op) {
            case '<<': result = a << b; break;
            case '>>': result = a >> b; break;
            case '>>>': result = a >>> b; break;
            default: return { error: `Unknown shift: ${op}`, type: 'error' };
        }
        return {
            result: result,
            formatted: `${a} ${op} ${b} = ${result}`,
            type: 'programmer',
            conversions: this.getAllConversions(result)
        };
    }

    /**
     * Get all conversions for a number
     */
    getAllConversions(decimal) {
        if (decimal < 0) {
            // Handle negative numbers with 32-bit representation
            decimal = decimal >>> 0;
        }
        return {
            decimal: decimal,
            hex: '0x' + decimal.toString(16).toUpperCase(),
            binary: '0b' + decimal.toString(2),
            octal: '0o' + decimal.toString(8)
        };
    }
}

module.exports = ProgrammerCalculator;
