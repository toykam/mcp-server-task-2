import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import weatherChecker from "./weather-checker";

const weatherToolHandler = async (server: McpServer) => {
    server.registerTool(
        'get_weather',
        {
            title: "Get Weather",
            description: "Fetch the current weather for a specified location.",
            inputSchema: {
                location: z.string()
            },
            outputSchema: z.object({
                result: z.string()
            })
        },
        async (input) => {
            const { location } = input;
            const result = await weatherChecker.getWeather(location);
            return {
                structuredContent: {
                    result
                },
                content: [

                ]
            }
        }
    )
}


export default weatherToolHandler;