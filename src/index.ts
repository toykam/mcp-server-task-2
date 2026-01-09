import { FastMCP } from "fastmcp";
import calculatorHandler from "./tools/calculator/handler.js";
import weatherToolHandler from "./tools/weather/handler.js";
import { currencyConverterToolHandler } from "./tools/converter/currency/handler.js";
import { unitConverterToolHandler } from "./tools/converter/unit/handler.js";
import { timeZoneConverterToolHandler } from "./tools/converter/timezone/handler.js";
import logger from "./utils/logger.js";
import { reviewAnalyzerToolHandler } from "./tools/analyzer/review/handler.js";
import codeGeneratorToolHandler from "./tools/code-generator/handler.js";


// const server = new McpServer({
//     name: 'utility-tool-mcp-server',
//     version: '1.0.0',
//     description: 'A MCP server for varieties of utility tools',
// }, {
//     capabilities: {
//         tools: {}
//     }
// })

const server = new FastMCP({
    name: 'utility-tool-mcp-server',
    version: '1.0.0',
    health: {
        enabled: true,
        path: '/health',
        message: 'OK'
    }
});

// calculator tool
calculatorHandler(server);
// weather tool handler
weatherToolHandler(server);
// // currency converter tool handler
currencyConverterToolHandler(server);
// // unit converter tool handler
unitConverterToolHandler(server);
// // timezone converter tool handler
timeZoneConverterToolHandler(server);

reviewAnalyzerToolHandler(server);

codeGeneratorToolHandler(server);


// const main = async () => {
//     const transport = new StdioServerTransport();
//     await server.connect(transport);

//     server.sendToolListChanged();

//     console.log("MCP Server is running...");
// }

// app.use('/mcp);

// app.listen(3000, () => {
//     console.log("Express MCP Server is running on http://localhost:3000");
// });


server.start({
    transportType: "httpStream",
    httpStream: {
        port: 8080,
        endpoint: "/mcp"
    }
}).then(() => {
    console.log("FastMCP Server is running...");
});

// main().catch((err) => {
//     console.error("Error starting MCP Server:", err);
//     process.exit(1);
// });
