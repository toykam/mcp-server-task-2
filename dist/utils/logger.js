"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    prefix;
    constructor(prefix) {
        this.prefix = prefix;
    }
    info(message, data) {
        console.error(`[${this.prefix}] INFO: ${message}`, data || "");
    }
    error(message, error) {
        console.error(`[${this.prefix}] ERROR: ${message}`, error || "");
    }
    warn(message, data) {
        console.error(`[${this.prefix}] WARN: ${message}`, data || "");
    }
}
const logger = new Logger("MCP-Server");
exports.default = logger;
