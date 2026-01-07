import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import timeZone from "./timezone";
import { time } from "node:console";

export const timeZoneConverterToolHandler = async (server: McpServer) => {
    server.registerTool(
        'get_time',
        {
            title: "Time Zone Converter",
            description: "Get the current time in a specified timezone.",
            inputSchema: {
                timezone: z.string()
            },
            outputSchema: z.object({
                result: z.string(),
                error: z.string().optional()
            })
        },
        async (input) => {
            const { timezone } = input;
            const result = timeZone.getCurrentTime(timezone)
            return {
                isError: !result.success,
                structuredContent: {
                    result: result.data ?? "",
                    error: result.error
                },
                content: [
                    {
                        type: "text",
                        text: result.error ? `Error: ${result.error}` : `The current time in ${timezone} is ${result.data}.`
                    }
                ]
            }
        }
    );

    server.registerTool(
        'convert_time',
        {
            title: "Time Zone Converter",
            description: "Convert time from one timezone to another.",
            inputSchema: {
                datetime: z.string().optional(),
                fromTimezone: z.string(),
                toTimezone: z.string()
            },
            outputSchema: z.object({
                result: z.string(),
                error: z.string().optional()
            })
        },
        async (input) => {
            const { datetime, fromTimezone, toTimezone } = input;
            const result = timeZone.convertTime(fromTimezone, toTimezone, datetime)
            return {
                isError: !result.success,
                structuredContent: {
                    result: result.data ?? "",
                    error: result.error
                },
                content: [
                    {
                        type: "text",
                        text: result.error ? `Error: ${result.error}` : `Converted time from ${fromTimezone} to ${toTimezone} is ${result.data}.`
                    }
                ]
            }
        }
    );
}