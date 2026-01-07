import Cache from "../../utils/cache";
import cache from "../../utils/cache";
import logger from "../../utils/logger";
import RateLimiter from "../../utils/rate-limiter";
import rateLimiter from "../../utils/rate-limiter";

class WeatherChecker {
  private cache = new Cache<any>();
  private rateLimiter = new RateLimiter(10, 60000); // 10 requests per minute

  async getWeather(location: string): Promise<string> {
    if (!this.rateLimiter.checkLimit("weather")) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    const cacheKey = `weather:${location.toLowerCase()}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      logger.info("Weather data retrieved from cache", { location });
      return cached;
    }

    // Using Open-Meteo API (free, no API key required)
    try {
      // First, geocode the location
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          location
        )}&count=1&language=en&format=json`
      );

      if (!geoResponse.ok) {
        throw new Error("Failed to geocode location");
      }

      const geoData: any = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`Location not found: ${location}`);
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Get weather data
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=auto`
      );

      if (!weatherResponse.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const weatherData: any = await weatherResponse.json();
      const current = weatherData.current;

      const weatherCodes: { [key: number]: string } = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Foggy",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        71: "Slight snow",
        73: "Moderate snow",
        75: "Heavy snow",
        77: "Snow grains",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Slight snow showers",
        86: "Heavy snow showers",
        95: "Thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail",
      };

      const result = `Weather for ${name}, ${country}:
- Temperature: ${current.temperature_2m}°C
- Feels like: ${current.apparent_temperature}°C
- Humidity: ${current.relative_humidity_2m}%
- Conditions: ${weatherCodes[current.weather_code] || "Unknown"}
- Wind Speed: ${current.wind_speed_10m} km/h
- Precipitation: ${current.precipitation} mm`;

      this.cache.set(cacheKey, result, 600000); // Cache for 10 minutes
      logger.info("Weather data fetched successfully", { location });
      return result;
    } catch (error: any) {
      logger.error("Weather fetch error", error);
      throw new Error(`Failed to get weather: ${error.message}`);
    }
  }
}

const weatherChecker = new WeatherChecker();

export default weatherChecker;