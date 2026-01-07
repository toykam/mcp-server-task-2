
import { z } from "zod";
import weatherChecker from "./weather-checker.js";
import type { FastMCP } from "fastmcp";

const weatherToolHandler = async (server: FastMCP) => {
    server.addTool({
        name: 'get_weather',
        description: "Fetch the current weather for a specified location.",
        parameters: z.object({
            location: z.string()
        }),
        execute: async (input) => {
            const { location } = input;
            const result = await weatherChecker.getWeather(location);
            return {
                isError: !result.success,
                content: [
                    {
                        type: "text",
                        text: result.error ? `Error: ${result.error}` : `${result.data}.`
                    }
                ]
            }
        }
    })
}


export default weatherToolHandler;