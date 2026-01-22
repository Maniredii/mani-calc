/**
 * Currency Converter Module
 * Supports real-time and offline currency conversion
 */

class CurrencyConverter {
    constructor() {
        // Fallback exchange rates (USD base) - Updated periodically
        this.fallbackRates = {
            USD: 1,
            EUR: 0.92,
            GBP: 0.79,
            INR: 83.12,
            JPY: 148.50,
            CAD: 1.35,
            AUD: 1.53,
            CHF: 0.88,
            CNY: 7.19,
            HKD: 7.82,
            SGD: 1.34,
            KRW: 1320.50,
            MXN: 17.15,
            BRL: 4.97,
            RUB: 89.50,
            ZAR: 18.75,
            AED: 3.67,
            SAR: 3.75,
            THB: 35.20,
            MYR: 4.72,
            PHP: 55.80,
            IDR: 15650,
            VND: 24350,
            NZD: 1.62,
            SEK: 10.45,
            NOK: 10.65,
            DKK: 6.88,
            PLN: 4.02,
            TRY: 30.25,
            TWD: 31.50,
            PKR: 278.50,
            BDT: 110.25,
            NGN: 890.50,
            EGP: 30.90,
            COP: 3950,
            ARS: 815.50,
            CLP: 885.50,
            PEN: 3.72,
            ILS: 3.65,
            CZK: 22.85,
            HUF: 355.50,
            RON: 4.58
        };

        this.rates = { ...this.fallbackRates };
        this.lastUpdate = null;
        this.cacheTimeout = 3600000; // 1 hour cache

        // Currency symbols for display
        this.symbols = {
            USD: '$', EUR: '€', GBP: '£', INR: '₹', JPY: '¥',
            CNY: '¥', KRW: '₩', THB: '฿', RUB: '₽', TRY: '₺',
            BRL: 'R$', PLN: 'zł', ILS: '₪', PHP: '₱', VND: '₫'
        };

        // Currency names for NLP
        this.currencyNames = {
            'dollar': 'USD', 'dollars': 'USD', 'usd': 'USD',
            'euro': 'EUR', 'euros': 'EUR', 'eur': 'EUR',
            'pound': 'GBP', 'pounds': 'GBP', 'gbp': 'GBP', 'sterling': 'GBP',
            'rupee': 'INR', 'rupees': 'INR', 'inr': 'INR',
            'yen': 'JPY', 'jpy': 'JPY',
            'yuan': 'CNY', 'cny': 'CNY', 'rmb': 'CNY',
            'won': 'KRW', 'krw': 'KRW',
            'peso': 'MXN', 'pesos': 'MXN',
            'real': 'BRL', 'reais': 'BRL', 'brl': 'BRL',
            'ruble': 'RUB', 'rubles': 'RUB', 'rub': 'RUB',
            'dirham': 'AED', 'aed': 'AED',
            'riyal': 'SAR', 'sar': 'SAR',
            'baht': 'THB', 'thb': 'THB',
            'ringgit': 'MYR', 'myr': 'MYR',
            'lira': 'TRY', 'try': 'TRY',
            'franc': 'CHF', 'chf': 'CHF',
            'canadian': 'CAD', 'cad': 'CAD',
            'australian': 'AUD', 'aud': 'AUD'
        };
    }

    /**
     * Try to fetch live rates (with fallback to cached rates)
     */
    async fetchRates() {
        // Check if cache is still valid
        if (this.lastUpdate && (Date.now() - this.lastUpdate) < this.cacheTimeout) {
            return this.rates;
        }

        try {
            // Try free API (no key required)
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
                timeout: 5000
            });

            if (response.ok) {
                const data = await response.json();
                this.rates = data.rates;
                this.lastUpdate = Date.now();
                console.log('Currency rates updated from API');
            }
        } catch (error) {
            // Use fallback rates silently
            console.log('Using offline currency rates');
        }

        return this.rates;
    }

    /**
     * Parse currency from text
     */
    parseCurrency(text) {
        const upper = text.toUpperCase().trim();

        // Check direct currency code
        if (this.rates[upper]) {
            return upper;
        }

        // Check currency names
        const lower = text.toLowerCase().trim();
        if (this.currencyNames[lower]) {
            return this.currencyNames[lower];
        }

        return null;
    }

    /**
     * Convert between currencies
     */
    async convert(amount, fromCurrency, toCurrency) {
        await this.fetchRates();

        const from = this.parseCurrency(fromCurrency);
        const to = this.parseCurrency(toCurrency);

        if (!from || !to) {
            throw new Error(`Unknown currency: ${!from ? fromCurrency : toCurrency}`);
        }

        if (!this.rates[from] || !this.rates[to]) {
            throw new Error(`Exchange rate not available for ${from} or ${to}`);
        }

        // Convert via USD base
        const inUSD = amount / this.rates[from];
        const result = inUSD * this.rates[to];

        return {
            amount: amount,
            from: from,
            to: to,
            result: Math.round(result * 100) / 100,
            rate: Math.round((this.rates[to] / this.rates[from]) * 10000) / 10000,
            symbol: this.symbols[to] || ''
        };
    }

    /**
     * Format currency result for display
     */
    formatResult(conversion) {
        const fromSymbol = this.symbols[conversion.from] || '';
        const toSymbol = this.symbols[conversion.to] || '';

        const formattedResult = conversion.result.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        return `${fromSymbol}${conversion.amount} ${conversion.from} = ${toSymbol}${formattedResult} ${conversion.to}`;
    }

    /**
     * Get list of supported currencies
     */
    getSupportedCurrencies() {
        return Object.keys(this.rates);
    }
}

module.exports = CurrencyConverter;
