import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { calculatorHandler } from "./tools/calculator";
import { weatherToolHandler } from "./tools/weather";
import { currencyConverterToolHandler } from "./tools/converter/currency/handler";
import { unitConverterToolHandler } from "./tools/converter/unit/handler";
import { timeZoneConverterToolHandler } from "./tools/converter/timezone/handler";


const server = new McpServer({
    name: 'utility-tool-mcp-server',
    version: '1.0.0',
    description: 'A MCP server for varieties of utility tools',
}, {
    capabilities: {
        tools: {}
    }
})

// calculator tool
calculatorHandler(server);
// weather tool handler
weatherToolHandler(server);
// currency converter tool handler
currencyConverterToolHandler(server);
// unit converter tool handler
unitConverterToolHandler(server);
// timezone converter tool handler
timeZoneConverterToolHandler(server);


const main = async () => {
    const transport = new StdioServerTransport();
    await server.connect(transport);

    server.sendToolListChanged();

    console.log("MCP Server is running...");
}


main().catch((err) => {
    console.error("Error starting MCP Server:", err);
    process.exit(1);
});
