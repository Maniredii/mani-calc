const MathEngine = require('./core/math-engine');
const NLPParser = require('./core/nlp-parser');
const UnitConverter = require('./core/unit-converter');
const HistoryManager = require('./core/history-manager');
const ClipboardManager = require('./core/clipboard-manager');
const CurrencyConverter = require('./core/currency-converter');
const DateTimeCalculator = require('./core/date-time-calculator');
const ProgrammerCalculator = require('./core/programmer-calc');
const SettingsManager = require('./core/settings-manager');
const WindowsSearchIntegration = require('./integration/windows-search');
const chalk = require('chalk');

class ManiCalc {
  constructor() {
    this.mathEngine = new MathEngine();
    this.nlpParser = new NLPParser();
    this.unitConverter = new UnitConverter();
    this.historyManager = new HistoryManager();
    this.clipboardManager = new ClipboardManager();
    this.currencyConverter = new CurrencyConverter();
    this.dateTimeCalculator = new DateTimeCalculator();
    this.programmerCalculator = new ProgrammerCalculator();
    this.settingsManager = new SettingsManager();
    this.windowsSearch = new WindowsSearchIntegration(this);
  }

  async initialize() {
    console.log(chalk.cyan('🚀 Mani-Calc initializing...'));

    try {
      await this.windowsSearch.register();
      console.log(chalk.green('✓ Windows Search integration registered'));
      console.log(chalk.yellow('\n📝 You can now use mani-calc directly from Windows Search!'));
      console.log(chalk.gray('   Examples:'));
      console.log(chalk.gray('   - calc: 2 + 3 * 5'));
      console.log(chalk.gray('   - calc: 100 USD to INR'));
      console.log(chalk.gray('   - calc: time in tokyo'));
      console.log(chalk.gray('   - calc: today + 30 days'));
      console.log(chalk.gray('   - calc: 255 to hex'));
      console.log(chalk.gray('   - calc: 10 km to miles'));
      console.log(chalk.gray('   - calc: history\n'));

      return true;
    } catch (error) {
      console.error(chalk.red('✗ Failed to initialize:'), error.message);
      return false;
    }
  }

  async processQuery(query) {
    try {
      const lowerQuery = query.toLowerCase().trim();

      // Check for special commands
      if (lowerQuery === 'history') {
        return this.historyManager.getHistory();
      }

      if (lowerQuery === 'clear history') {
        this.historyManager.clearHistory();
        return { result: 'History cleared', type: 'info', formatted: 'History cleared' };
      }

      // Check for settings commands
      if (lowerQuery === 'settings' || lowerQuery === 'config') {
        const settings = this.settingsManager.getAll();
        return {
          result: settings,
          type: 'settings',
          formatted: `Theme: ${settings.theme}, Hotkey: ${settings.hotkey}, Auto-start: ${settings.autoStart}`
        };
      }

      // Check for theme commands
      if (lowerQuery.startsWith('theme ') || lowerQuery === 'themes') {
        if (lowerQuery === 'themes') {
          const themes = this.settingsManager.getThemes();
          return {
            result: themes.map(t => t.name).join(', '),
            type: 'info',
            formatted: `Available themes: ${themes.map(t => t.id).join(', ')}`
          };
        }
        const themeId = lowerQuery.replace('theme ', '').trim();
        const theme = this.settingsManager.setTheme(themeId);
        if (theme) {
          return {
            result: theme.name,
            type: 'theme',
            themeId: theme.id,
            formatted: `Theme changed to: ${theme.name}`
          };
        }
      }

      // Check for auto-start command
      if (lowerQuery === 'autostart on' || lowerQuery === 'auto start on') {
        const result = await this.settingsManager.setAutoStart(true);
        return { result: result.message, type: 'info', formatted: result.message };
      }
      if (lowerQuery === 'autostart off' || lowerQuery === 'auto start off') {
        const result = await this.settingsManager.setAutoStart(false);
        return { result: result.message, type: 'info', formatted: result.message };
      }

      // Try currency conversion: "100 USD to INR", "100 dollars to rupees"
      const currencyResult = await this.tryCurrencyConversion(query);
      if (currencyResult) {
        this.historyManager.addEntry(currencyResult);
        await this.clipboardManager.copy(currencyResult.result.toString());
        return currencyResult;
      }

      // Try date/time calculation
      const dateTimeResult = this.dateTimeCalculator.parse(query);
      if (dateTimeResult && !dateTimeResult.error) {
        const response = {
          query,
          result: dateTimeResult.result,
          type: dateTimeResult.type,
          formatted: dateTimeResult.formatted
        };
        this.historyManager.addEntry(response);
        await this.clipboardManager.copy(dateTimeResult.result.toString());
        return response;
      }

      // Try programmer calculation
      const programmerResult = this.programmerCalculator.parse(query);
      if (programmerResult && !programmerResult.error) {
        const response = {
          query,
          result: programmerResult.result,
          type: 'programmer',
          formatted: programmerResult.formatted,
          conversions: programmerResult.conversions
        };
        this.historyManager.addEntry(response);
        await this.clipboardManager.copy(programmerResult.result.toString());
        return response;
      }

      // Try natural language parsing
      const nlpResult = this.nlpParser.parse(query);

      if (nlpResult.type === 'conversion') {
        const result = this.unitConverter.convert(
          nlpResult.value,
          nlpResult.fromUnit,
          nlpResult.toUnit
        );

        const response = {
          query,
          result,
          type: 'conversion',
          formatted: `${nlpResult.value} ${nlpResult.fromUnit} = ${result} ${nlpResult.toUnit}`
        };

        this.historyManager.addEntry(response);
        await this.clipboardManager.copy(result.toString());

        return response;
      }

      if (nlpResult.type === 'natural_language') {
        const mathResult = this.mathEngine.evaluate(nlpResult.expression);

        const response = {
          query,
          result: mathResult,
          type: 'natural_language',
          formatted: `${query} = ${mathResult}`
        };

        this.historyManager.addEntry(response);
        await this.clipboardManager.copy(mathResult.toString());

        return response;
      }

      // Direct math evaluation
      const mathResult = this.mathEngine.evaluate(query);

      const response = {
        query,
        result: mathResult,
        type: 'math',
        formatted: `${query} = ${mathResult}`
      };

      this.historyManager.addEntry(response);
      await this.clipboardManager.copy(mathResult.toString());

      return response;

    } catch (error) {
      return {
        query,
        error: error.message,
        type: 'error',
        formatted: `Error: ${error.message}`
      };
    }
  }

  /**
   * Try to parse as currency conversion
   */
  async tryCurrencyConversion(query) {
    // Pattern: "100 USD to INR", "100 dollars to rupees", "$100 to euros"
    const patterns = [
      /^(\d+(?:\.\d+)?)\s*([a-zA-Z$€£¥₹]+)\s+(?:to|in|=)\s+([a-zA-Z$€£¥₹]+)$/i,
      /^convert\s+(\d+(?:\.\d+)?)\s*([a-zA-Z$€£¥₹]+)\s+to\s+([a-zA-Z$€£¥₹]+)$/i
    ];

    for (const pattern of patterns) {
      const match = query.match(pattern);
      if (match) {
        try {
          const amount = parseFloat(match[1]);
          const fromCurrency = match[2];
          const toCurrency = match[3];

          const conversion = await this.currencyConverter.convert(amount, fromCurrency, toCurrency);

          return {
            query,
            result: conversion.result,
            type: 'currency',
            formatted: this.currencyConverter.formatResult(conversion),
            rate: conversion.rate
          };
        } catch (error) {
          // Not a valid currency conversion
          return null;
        }
      }
    }

    return null;
  }

  async shutdown() {
    console.log(chalk.cyan('👋 Mani-Calc shutting down...'));
    await this.windowsSearch.unregister();
  }
}

module.exports = ManiCalc;
