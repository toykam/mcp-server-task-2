import { config } from "dotenv";
import { ServiceResponse } from "../../../utils/types";
import cache from "../../../utils/cache";
import Cache from "../../../utils/cache";
import RateLimiter from "../../../utils/rate-limiter";

config();

class CurrencyConverter {
    private cache = new Cache<any>();
    private rateLimiter = new RateLimiter(1, 60000); // 10 requests per minute


    async convert(amount: number, fromCurrency: string, toCurrency: string): Promise<ServiceResponse<number>> {

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
            }
        }

        // check if a cache value exists
        const cacheKey = `convert:${amount}:${fromCurrency}:${toCurrency}`;
        const cached = this.cache.get(cacheKey);
        if (cached) {
            return {   success: true,  data: cached }
        }

        // rate limit
        if (!this.rateLimiter.checkLimit("currency-converter")) {
            return { success: false, error: "Rate limit exceeded. Please try again later." };
        }

        const apiKey = process.env.EXCHANGE_RATE_API_KEY;

        if (!apiKey) {
            return { success: false, error: "Exchange rate API key is not configured." };
        }

        const res = await fetch(
            `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&access_key=${apiKey}`
        );

        if (!res.ok) {
            return { success: false, error: "Failed to fetch exchange rates." };
        }

        const data: any = await res.json();

        console.log(data);

        if (!data.success) {
            return { success: false, error: "Error from exchange rate API: " + (data.error?.info || "Unknown error") };
        }

        return {
            success: true,
            data: data.result
        }
    }
}

const currencyConverter = new CurrencyConverter();

export default currencyConverter;