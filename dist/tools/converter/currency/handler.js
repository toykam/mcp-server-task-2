"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyConverterToolHandler = void 0;
const currency_converter_1 = __importDefault(require("./currency-converter"));
const zod_1 = require("zod");
const currencyConverterToolHandler = async (server) => {
    server.registerTool('convert_currency', {
        title: "Currency Converter",
        description: "Convert an amount from one currency to another.",
        inputSchema: {
            amount: zod_1.z.number().min(0),
            fromCurrency: zod_1.z.string().length(3),
            toCurrency: zod_1.z.string().length(3),
        },
        outputSchema: zod_1.z.object({
            result: zod_1.z.any(),
            error: zod_1.z.string().optional()
        })
    }, async (input) => {
        const { amount, fromCurrency, toCurrency } = input;
        const result = await currency_converter_1.default.convert(amount, fromCurrency, toCurrency);
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
        };
    });
};
exports.currencyConverterToolHandler = currencyConverterToolHandler;
