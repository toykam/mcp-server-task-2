"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const weather_checker_1 = __importDefault(require("./weather-checker"));
const weatherToolHandler = async (server) => {
    server.registerTool('get_weather', {
        title: "Get Weather",
        description: "Fetch the current weather for a specified location.",
        inputSchema: {
            location: zod_1.z.string()
        },
        outputSchema: zod_1.z.object({
            result: zod_1.z.string()
        })
    }, async (input) => {
        const { location } = input;
        const result = await weather_checker_1.default.getWeather(location);
        return {
            structuredContent: {
                result
            },
            content: []
        };
    });
};
exports.default = weatherToolHandler;
