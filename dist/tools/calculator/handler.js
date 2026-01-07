"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const calculator_1 = __importDefault(require("./calculator"));
const calculatorHandler = async (server) => {
    server.registerTool('calculator', {
        description: "Perform basic math operations: add, subtract, multiply, divide",
        inputSchema: {
            operation: zod_1.z.string().refine(op => ["add", "subtract", "multiply", "divide"].includes(op), {
                message: "Operation must be one of: add, subtract, multiply, divide"
            }),
            a: zod_1.z.number(),
            b: zod_1.z.number(),
        },
        outputSchema: zod_1.z.object({
            result: zod_1.z.number()
        }),
    }, async ({ operation, a, b }) => {
        const result = calculator_1.default.calculate(operation, a, b);
        return {
            isError: !result.success,
            structuredContent: {
                result: result.data ?? 0
            },
            content: [
                {
                    type: "text",
                    text: `The result of ${operation}ing ${a} and ${b} is ${result}.`
                }
            ]
        };
    });
};
exports.default = calculatorHandler;
