# Utility Tools MCP Server

A comprehensive Model Context Protocol (MCP) server that provides five essential utility tools: weather information, calculator, currency converter, timezone information, and unit converter.

## Features

### 🌤️ Weather Tool
Get current weather conditions for any location worldwide:
- Temperature (actual and feels-like)
- Humidity
- Weather conditions
- Wind speed
- Precipitation

### 🧮 Calculator Tool
Perform basic mathematical operations:
- Addition
- Subtraction
- Multiplication
- Division
- Full error handling for invalid inputs and division by zero

### 💱 Currency Converter
Convert between different currencies with current exchange rates:
- Supports major world currencies
- Live exchange rates
- Automatic caching (1 hour)
- Rate limiting to prevent API abuse

### 🕐 Timezone Tool
Get current time for any city or convert between timezones:
- Current time for any city worldwide
- Compare times between cities
- Full timezone information

### 📏 Unit Converter
Convert between different units of measurement:
- **Length**: meter, kilometer, mile, foot, inch, yard, centimeter, millimeter
- **Weight**: kilogram, gram, pound, ounce, ton, milligram
- **Temperature**: Celsius, Fahrenheit, Kelvin
- **Volume**: liter, milliliter, gallon, quart, pint, cup

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd utility-tools-mcp-server
```

2. Install dependencies:
```bash
pnpm install
```

3. Build the project:
```bash
pnpm run build
```

## Usage

### Running the Server

Start the server:
```bash
pnpm start
```

Or run in development mode with auto-reload:
```bash
pnpm run dev
```

### Configure with Claude Desktop

Add to your Claude Desktop config file (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "utility-tools": {
      "command": "node",
      "args": ["/path/to/your/utility-tools-mcp-server/dist/index.js"]
    }
  }
}
```

### Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Tool Examples

### Weather Tool
```typescript
// Get weather for a city
{
  "tool": "get_weather",
  "arguments": {
    "location": "New York"
  }
}
```

### Calculator Tool
```typescript
// Perform calculation
{
  "tool": "calculate",
  "arguments": {
    "operation": "multiply",
    "a": 15,
    "b": 7
  }
}
```

### Currency Converter
ApiKey from https://exchangerate.host/ is needed to run the convert_currency tool.
```typescript
// Convert currency
{
  "tool": "convert_currency",
  "arguments": {
    "amount": 100,
    "from": "USD",
    "to": "EUR"
  }
}
```

### Timezone Tool
```typescript
// Get time for a city
{
  "tool": "get_time",
  "arguments": {
    "city": "Tokyo",
    "convert_to": "London"
  }
}
```

### Unit Converter
```typescript
// Convert units
{
  "tool": "convert_unit",
  "arguments": {
    "value": 100,
    "from_unit": "celsius",
    "to_unit": "fahrenheit"
  }
}
```

## Features Implemented

✅ **Error Handling**: Comprehensive error handling for all tools with meaningful error messages

✅ **Logging**: Built-in logging system that outputs to stderr (doesn't interfere with MCP protocol)

✅ **Rate Limiting**: API requests are rate-limited (10 requests/minute for weather and currency)

✅ **Caching**: Weather data cached for 10 minutes, exchange rates cached for 1 hour

✅ **Unit Tests**: Comprehensive test suite covering all tools and edge cases

✅ **Type Safety**: Full TypeScript implementation with strict type checking

## API Dependencies

This server uses free, no-API-key-required services:

- **Weather**: [Open-Meteo API](https://open-meteo.com/) - Free weather data
- **Geocoding**: [Open-Meteo Geocoding API](https://open-meteo.com/) - Free location lookup
- **Currency**: [ExchangeRate-API](https://www.exchangerate-api.com/) - Free tier available

## Project Structure

```
utility-tools-mcp-server/
├── src/
│   └── tools              # the list of tools in the mcp server
│   └── utils             # Utilities used in the mcp server
│   └── index.ts          # Main server implementation
├── dist/                 # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## Development

### Adding New Tools

1. Create a new tool class in `src/index.ts`
2. Add the tool definition to the `tools` array
3. Add a case in the `CallToolRequestSchema` handler
4. Write tests in `tests/tools.test.ts`

### Code Style

This project uses:
- TypeScript for type safety
- ESLint for linting
- Strict mode enabled

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.