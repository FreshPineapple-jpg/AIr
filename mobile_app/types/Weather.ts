export interface WeatherAPIData {
    weather: WeatherApiResponse['current'];
    airQuality: AirQualityApiResponse['current'];
}

export interface WeatherData {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
}

export interface AirQualityData {
    pm10: number;
    pm2_5: number;
    carbon_monoxide: number;
    nitrogen_dioxide: number;
    european_aqi: number;
}

export interface WeatherApiResponse {
    current: WeatherData;
}

export interface AirQualityApiResponse {
    current: AirQualityData;
}