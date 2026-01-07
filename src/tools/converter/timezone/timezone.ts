import { ServiceResponse } from "../../../utils/types";

class TimeZone {
    // get current time of a timezone
    getCurrentTime(timezone: string): ServiceResponse<string> {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = {
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
    convertTime(fromTimezone: string, toTimezone: string, datetime?: string, ): ServiceResponse<string> {
        const date = datetime != null ? new Date(datetime) : this.getCurrentTime(fromTimezone).data ? new Date(this.getCurrentTime(fromTimezone).data!) : new Date();
        const options: Intl.DateTimeFormatOptions = {
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

export default timeZone;