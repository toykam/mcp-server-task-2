"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimeZone {
    // get current time of a timezone
    getCurrentTime(timezone) {
        const date = new Date();
        const options = {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };
        return {
            success: true,
            data: date.toLocaleString('en-US', options)
        };
    }
    // convert time of a timezone to another timezone
    convertTime(fromTimezone, toTimezone, datetime) {
        const date = datetime != null ? new Date(datetime) : this.getCurrentTime(fromTimezone).data ? new Date(this.getCurrentTime(fromTimezone).data) : new Date();
        const options = {
            timeZone: toTimezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };
        return {
            success: true,
            data: date.toLocaleString('en-US', options)
        };
    }
}
const timeZone = new TimeZone();
exports.default = timeZone;
