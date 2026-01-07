import { z } from "zod";
import { FastMCP } from "fastmcp";
import calculator from "./calculator.js";


const calculatorHandler = async (server: FastMCP) => {
    server.addTool({
        name: 'calculator',
        description: "Perform basic math operations: add, subtract, multiply, divide",
        parameters: z.object({
            operation: z.string().refine(op => ["add", "subtract", "multiply", "divide"].includes(op), {
                message: "Operation must be one of: add, subtract, multiply, divide"
            }),
            a: z.number(),
            b: z.number(),
        }),
        annotations: {
            title: "Calculator Tool",
            readOnlyHint: true,
            openWorldHint: true
        },
        execute: async ({operation, a, b}) => {
            const result = calculator.calculate(operation, a, b);
            return {
                content: [
                    {
                        type: "text",
                        text: result.error ? `Error: ${result.error}` : `The result of ${operation}ing ${a} and ${b} is ${result.data}.`
                    }
                ],
                isError: !result.success
            };
        }
    });
}

export default calculatorHandler;