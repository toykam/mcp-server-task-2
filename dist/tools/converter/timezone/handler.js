"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeZoneConverterToolHandler = void 0;
const zod_1 = require("zod");
const timezone_1 = __importDefault(require("./timezone"));
const timeZoneConverterToolHandler = async (server) => {
    server.registerTool('get_time', {
        title: "Time Zone Converter",
        description: "Get the current time in a specified timezone.",
        inputSchema: {
            timezone: zod_1.z.string()
        },
        outputSchema: zod_1.z.object({
            result: zod_1.z.string(),
            error: zod_1.z.string().optional()
        })
    }, async (input) => {
        const { timezone } = input;
        const result = timezone_1.default.getCurrentTime(timezone);
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
        };
    });
    server.registerTool('convert_time', {
        title: "Time Zone Converter",
        description: "Convert time from one timezone to another.",
        inputSchema: {
            datetime: zod_1.z.string().optional(),
            fromTimezone: zod_1.z.string(),
            toTimezone: zod_1.z.string()
        },
        outputSchema: zod_1.z.object({
            result: zod_1.z.string(),
            error: zod_1.z.string().optional()
        })
    }, async (input) => {
        const { datetime, fromTimezone, toTimezone } = input;
        const result = timezone_1.default.convertTime(fromTimezone, toTimezone, datetime);
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
        };
    });
};
exports.timeZoneConverterToolHandler = timeZoneConverterToolHandler;
