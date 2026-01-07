import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import currencyConverter from "./currency-converter";
import { z } from "zod";
import { error } from "node:console";

export const currencyConverterToolHandler = async (server: McpServer) => {

    server.registerTool(
        'convert_currency',
        {
            title: "Currency Converter",
            description: "Convert an amount from one currency to another.",
            inputSchema: {
                amount: z.number().min(0),
                fromCurrency: z.string().length(3),
                toCurrency: z.string().length(3),
            },
            outputSchema: z.object({
                result: z.any(),
                error: z.string().optional()
            })
        },
        async (input) => {
            const { amount, fromCurrency, toCurrency } = input;
            const result = await currencyConverter.convert(amount, fromCurrency, toCurrency);
            return {
                isError: !result.success,
                structuredContent: {
                    result: result.data ?? 0,
                    error: result.error
                },
                content: [
                    {
                        type: "text",
                        text: result.error ? `Error: ${result.error}` : `The conversion of ${amount} ${fromCurrency} to ${toCurrency} is ${result.data} ${toCurrency}.`
                    }
                ]
            }
        }
    );
}