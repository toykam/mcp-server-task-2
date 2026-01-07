"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cache {
    cache = new Map();
    set(key, value, ttlMs) {
        this.cache.set(key, {
            value,
            expiry: Date.now() + ttlMs,
        });
    }
    get(key) {
        const item = this.cache.get(key);
        if (!item)
            return null;
        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }
        return item.value;
    }
    clear() {
        this.cache.clear();
    }
}
exports.default = Cache;
