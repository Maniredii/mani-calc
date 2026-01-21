const MathEngine = require('../src/core/math-engine');
const NLPParser = require('../src/core/nlp-parser');
const UnitConverter = require('../src/core/unit-converter');
const chalk = require('chalk');

console.log(chalk.cyan.bold('\n🧪 Running Mani-Calc Tests...\n'));

let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(chalk.green(`✓ ${name}`));
        passed++;
    } catch (error) {
        console.log(chalk.red(`✗ ${name}`));
        console.log(chalk.gray(`  ${error.message}`));
        failed++;
    }
}

function assertEqual(actual, expected, message = '') {
    if (actual !== expected) {
        throw new Error(`Expected ${expected}, got ${actual}. ${message}`);
    }
}

// Math Engine Tests
console.log(chalk.yellow('\n📐 Math Engine Tests:'));

const mathEngine = new MathEngine();

test('Basic addition', () => {
    assertEqual(mathEngine.evaluate('2 + 3'), 5);
});

test('Order of operations', () => {
    assertEqual(mathEngine.evaluate('2 + 3 * 5'), 17);
});

test('Parentheses', () => {
    assertEqual(mathEngine.evaluate('(10 + 20) / 5'), 6);
});

test('Square root', () => {
    assertEqual(mathEngine.evaluate('sqrt(49)'), 7);
});

test('Power', () => {
    assertEqual(mathEngine.evaluate('2^8'), 256);
});

test('Decimal operations', () => {
    assertEqual(mathEngine.evaluate('10.5 + 5.5'), 16);
});

// NLP Parser Tests
console.log(chalk.yellow('\n💬 NLP Parser Tests:'));

const nlpParser = new NLPParser();

test('Percentage parsing', () => {
    const result = nlpParser.parse('what is 25 percent of 200');
    assertEqual(result.type, 'natural_language');
    assertEqual(result.expression, '(25 / 100) * 200');
});

test('Fraction parsing', () => {
    const result = nlpParser.parse('half of 80');
    assertEqual(result.type, 'natural_language');
    assertEqual(result.expression, '80 / 2');
});

test('Square root parsing', () => {
    const result = nlpParser.parse('square root of 64');
    assertEqual(result.type, 'natural_language');
    assertEqual(result.expression, 'sqrt(64)');
});

test('Conversion parsing', () => {
    const result = nlpParser.parse('10 km to miles');
    assertEqual(result.type, 'conversion');
    assertEqual(result.value, 10);
    assertEqual(result.fromUnit, 'km');
    assertEqual(result.toUnit, 'miles');
});

// Unit Converter Tests
console.log(chalk.yellow('\n🔄 Unit Converter Tests:'));

const unitConverter = new UnitConverter();

test('Kilometers to miles', () => {
    const result = unitConverter.convert(10, 'km', 'miles');
    assertEqual(Math.round(result * 100), 621); // 6.21 miles
});

test('Kilograms to pounds', () => {
    const result = unitConverter.convert(5, 'kg', 'pounds');
    assertEqual(Math.round(result * 100), 1102); // 11.02 pounds
});

test('Celsius to Fahrenheit', () => {
    const result = unitConverter.convert(100, 'celsius', 'fahrenheit');
    assertEqual(result, 212);
});

test('Celsius to Fahrenheit (0°C)', () => {
    const result = unitConverter.convert(0, 'celsius', 'fahrenheit');
    assertEqual(result, 32);
});

test('Hours to seconds', () => {
    const result = unitConverter.convert(2, 'hours', 'seconds');
    assertEqual(result, 7200);
});

test('Meters to feet', () => {
    const result = unitConverter.convert(10, 'meters', 'feet');
    assertEqual(Math.round(result * 100), 3281); // 32.81 feet
});

// Summary
console.log(chalk.cyan.bold('\n📊 Test Summary:'));
console.log(chalk.green(`✓ Passed: ${passed}`));
if (failed > 0) {
    console.log(chalk.red(`✗ Failed: ${failed}`));
    process.exit(1);
} else {
    console.log(chalk.green('\n🎉 All tests passed!\n'));
    process.exit(0);
}
