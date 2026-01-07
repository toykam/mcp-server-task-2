import { z } from "zod";
import unitConverter from "./unit-converter.js";
import type { FastMCP } from "fastmcp";

export const unitConverterToolHandler = async (server: FastMCP) => {
    server.addTool({
        name: 'convert_unit',
        description: "Convert from one unit to another (e.g., length, weight, temperature).",
        parameters: z.object({
            from_unit: z.string(),
            to_unit: z.string(),
            value: z.number(),
        }),
        execute: async (input) => {
            const { from_unit, to_unit, value } = input;
            const result = await unitConverter.convertUnit(value, from_unit, to_unit);
            return {
                isError: !result.success,
                content: [
                    {
                        type: "text",
                        text: result.error ? `Error: ${result.error}` : `The conversion of ${value} ${from_unit} to ${to_unit} is ${result.data} ${to_unit}.`
                    }
                ]
            }
        }
    })
}