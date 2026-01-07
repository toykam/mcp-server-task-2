import { z } from "zod";
import timeZone from "./timezone.js";
import type { FastMCP } from "fastmcp";

export const timeZoneConverterToolHandler = async (server: FastMCP) => {
    server.addTool({
        name: 'get_time',
        description: "Get the current time in a specified timezone.",
        parameters: z.object({
            timezone: z.string()
        }),
        // {
        //     title: "Time Zone Converter",
        //     outputSchema: z.object({
        //         result: z.string(),
        //         error: z.string().optional()
        //     })
        // },
        execute: async (input) => {
            const { timezone } = input;
            const result = timeZone.getCurrentTime(timezone)
            return {
                isError: !result.success,
                // structuredContent: {
                //     result: result.data ?? "",
                //     error: result.error
                // },
                content: [
                    {
                        type: "text",
                        text: result.error ? `Error: ${result.error}` : `The current time in ${timezone} is ${result.data}.`
                    }
                ]
            }
        }
    });

    server.addTool({
        name: 'convert_time',
        description: "Convert time from one timezone to another.",
        parameters: z.object({
            datetime: z.string().optional(),
            fromTimezone: z.string(),
            toTimezone: z.string()
        }),
        execute: async (input) => {
            const { datetime, fromTimezone, toTimezone } = input;
            const result = timeZone.convertTime(fromTimezone, toTimezone, datetime)
            return {
                isError: !result.success,
                content: [
                    {
                        type: "text",
                        text: result.error ? `Error: ${result.error}` : `Converted time from ${fromTimezone} to ${toTimezone} is ${result.data}.`
                    }
                ]
            }
        }
    });
}