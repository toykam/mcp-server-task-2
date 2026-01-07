"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const cache_1 = __importDefault(require("../../../utils/cache"));
const rate_limiter_1 = __importDefault(require("../../../utils/rate-limiter"));
(0, dotenv_1.config)();
class CurrencyConverter {
    cache = new cache_1.default();
    rateLimiter = new rate_limiter_1.default(1, 60000); // 10 requests per minute
    async convert(amount, fromCurrency, toCurrency) {
        if (!isFinite(amount)) {
            return {
                success: false,
                error: "Amount must be finite (not Infinity or NaN)"
            };
        }
        if (fromCurrency === toCurrency) {
            return {
                success: true,
                data: amount
            };
        }
        // check if a cache value exists
        const cacheKey = `convert:${amount}:${fromCurrency}:${toCurrency}`;
        const cached = this.cache.get(cacheKey);
        if (cached) {
            return { success: true, data: cached };
        }
        // rate limit
        if (!this.rateLimiter.checkLimit("currency-converter")) {
            return { success: false, error: "Rate limit exceeded. Please try again later." };
        }
        const apiKey = process.env.EXCHANGE_RATE_API_KEY;
        if (!apiKey) {
            return { success: false, error: "Exchange rate API key is not configured." };
        }
        const res = await fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&access_key=${apiKey}`);
        if (!res.ok) {
            return { success: false, error: "Failed to fetch exchange rates." };
        }
        const data = await res.json();
        console.log(data);
        if (!data.success) {
            return { success: false, error: "Error from exchange rate API: " + (data.error?.info || "Unknown error") };
        }
        return {
            success: true,
            data: data.result
        };
    }
}
const currencyConverter = new CurrencyConverter();
exports.default = currencyConverter;
