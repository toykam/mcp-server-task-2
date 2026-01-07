class Logger {
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  info(message: string, data?: any) {
    console.error(`[${this.prefix}] INFO: ${message}`, data || "");
  }

  error(message: string, error?: any) {
    console.error(`[${this.prefix}] ERROR: ${message}`, error || "");
  }

  warn(message: string, data?: any) {
    console.error(`[${this.prefix}] WARN: ${message}`, data || "");
  }
}

const logger = new Logger("MCP-Server");

export default logger;