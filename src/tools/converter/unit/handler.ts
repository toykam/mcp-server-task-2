import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import unitConverter from "./unit-converter";

export const unitConverterToolHandler = async (server: McpServer) => {
    server.registerTool(
        'convert_unit',
        {
            title: "Unit Converter",
            description: "Convert from one unit to another (e.g., length, weight, temperature).",
            inputSchema: {
                from_unit: z.string(),
                to_unit: z.string(),
                value: z.number(),
            },
            outputSchema: z.object({
                result: z.number().optional(),
                error: z.string().optional()
            })
        },
        async (input) => {
            const { from_unit, to_unit, value } = input;
            const result = await unitConverter.convertUnit(value, from_unit, to_unit);
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
            }
        }
    )
}