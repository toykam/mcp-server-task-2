import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import calculator from "./calculator";


const calculatorHandler = async (server: McpServer) => {
    server.registerTool(
        'calculator',
        {
            description: "Perform basic math operations: add, subtract, multiply, divide",
            inputSchema: {
                operation: z.string().refine(op => ["add", "subtract", "multiply", "divide"].includes(op), {
                    message: "Operation must be one of: add, subtract, multiply, divide"
                }),
                a: z.number(),
                b: z.number(),
            },
            outputSchema: z.object({
                result: z.number()
            }),
        },
        async ({operation, a, b}) => {
            const result = calculator.calculate(operation, a, b);
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
        }
    );
}

export default calculatorHandler;