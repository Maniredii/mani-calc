const MathEngine = require('./core/math-engine');
const NLPParser = require('./core/nlp-parser');
const UnitConverter = require('./core/unit-converter');
const HistoryManager = require('./core/history-manager');
const ClipboardManager = require('./core/clipboard-manager');
const WindowsSearchIntegration = require('./integration/windows-search');
const chalk = require('chalk');

class ManiCalc {
  constructor() {
    this.mathEngine = new MathEngine();
    this.nlpParser = new NLPParser();
    this.unitConverter = new UnitConverter();
    this.historyManager = new HistoryManager();
    this.clipboardManager = new ClipboardManager();
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
      console.log(chalk.gray('   - calc: what is 25 percent of 200'));
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
      // Check for special commands
      if (query.toLowerCase().trim() === 'history') {
        return this.historyManager.getHistory();
      }

      if (query.toLowerCase().trim() === 'clear history') {
        this.historyManager.clearHistory();
        return { result: 'History cleared', type: 'info' };
      }

      // Try natural language parsing first
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

  async shutdown() {
    console.log(chalk.cyan('👋 Mani-Calc shutting down...'));
    await this.windowsSearch.unregister();
  }
}

module.exports = ManiCalc;
