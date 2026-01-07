"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RateLimiter {
    requests = new Map();
    maxRequests;
    windowMs;
    constructor(maxRequests, windowMs) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
    }
    checkLimit(key) {
        const now = Date.now();
        const timestamps = this.requests.get(key) || [];
        // Remove old timestamps
        const validTimestamps = timestamps.filter((t) => now - t < this.windowMs);
        if (validTimestamps.length >= this.maxRequests) {
            return false;
        }
        validTimestamps.push(now);
        this.requests.set(key, validTimestamps);
        return true;
    }
}
exports.default = RateLimiter;
