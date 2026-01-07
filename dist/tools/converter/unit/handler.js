"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitConverterToolHandler = void 0;
const zod_1 = require("zod");
const unit_converter_1 = __importDefault(require("./unit-converter"));
const unitConverterToolHandler = async (server) => {
    server.registerTool('convert_unit', {
        title: "Unit Converter",
        description: "Convert from one unit to another (e.g., length, weight, temperature).",
        inputSchema: {
            from_unit: zod_1.z.string(),
            to_unit: zod_1.z.string(),
            value: zod_1.z.number(),
        },
        outputSchema: zod_1.z.object({
            result: zod_1.z.number().optional(),
            error: zod_1.z.string().optional()
        })
    }, async (input) => {
        const { from_unit, to_unit, value } = input;
        const result = await unit_converter_1.default.convertUnit(value, from_unit, to_unit);
        return {
            isError: !result.success,
            structuredContent: {
                result: result.data,
                error: result.error
            },
            content: [
                {
                    type: "text",
                    text: result.error ? `Error: ${result.error}` : `The conversion of ${value} ${from_unit} to ${to_unit} is ${result.data} ${to_unit}.`
                }
            ]
        };
    });
};
exports.unitConverterToolHandler = unitConverterToolHandler;
