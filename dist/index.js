"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const calculator_1 = require("./tools/calculator");
const weather_1 = require("./tools/weather");
const handler_1 = require("./tools/converter/currency/handler");
const handler_2 = require("./tools/converter/unit/handler");
const handler_3 = require("./tools/converter/timezone/handler");
const server = new mcp_js_1.McpServer({
    name: 'utility-tool-mcp-server',
    version: '1.0.0',
    description: 'A MCP server for varieties of utility tools',
}, {
    capabilities: {
        tools: {}
    }
});
// calculator tool
(0, calculator_1.calculatorHandler)(server);
// weather tool handler
(0, weather_1.weatherToolHandler)(server);
// currency converter tool handler
(0, handler_1.currencyConverterToolHandler)(server);
// unit converter tool handler
(0, handler_2.unitConverterToolHandler)(server);
// timezone converter tool handler
(0, handler_3.timeZoneConverterToolHandler)(server);
const main = async () => {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    server.sendToolListChanged();
    console.log("MCP Server is running...");
};
main().catch((err) => {
    console.error("Error starting MCP Server:", err);
    process.exit(1);
});
