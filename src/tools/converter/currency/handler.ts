import currencyConverter from "./currency-converter.js";
import { z } from "zod";
import type { FastMCP } from "fastmcp";

export const currencyConverterToolHandler = async (server: FastMCP) => {

    server.addTool({
        name: 'convert_currency',
        description: "Convert an amount from one currency to another.",
        parameters: z.object({
            amount: z.number().min(0),
            fromCurrency: z.string().length(3),
            toCurrency: z.string().length(3),
        }),
        execute: async (input) => {
            const { amount, fromCurrency, toCurrency } = input;
            const result = await currencyConverter.convert(amount, fromCurrency, toCurrency);
            return {
                isError: !result.success,
                content: [
                    {
                        type: "text",
                        text: result.error ? `Error: ${result.error}` : `The conversion of ${amount} ${fromCurrency} to ${toCurrency} is ${result.data} ${toCurrency}.`
                    }
                ]
            }
        }
    });
}