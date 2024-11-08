import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { WeatherApiResponse, AirQualityApiResponse, WeatherAPIData } from '@/types/Weather';

export default function WeatherMap() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [weatherData, setWeatherData] = useState<WeatherAPIData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            fetchWeatherAndAirQuality(location.coords.latitude, location.coords.longitude);
        })();
    }, []);



    const fetchWeatherAndAirQuality = async (latitude: number, longitude: number): Promise<void> => {
        try {
            // Fetch weather data
            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
            );
            const weatherResult: WeatherApiResponse = await weatherResponse.json();

            // Fetch air quality data
            const airQualityResponse = await fetch(
                `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,european_aqi`
            );
            const airQualityResult: AirQualityApiResponse = await airQualityResponse.json();

            setWeatherData({
                weather: weatherResult.current,
                airQuality: airQualityResult.current,
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const getWeatherDescription = (code: string | number) => {
        // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
        const weatherCodes = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Foggy',
            48: 'Depositing rime fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            61: 'Slight rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            71: 'Slight snow',
            73: 'Moderate snow',
            75: 'Heavy snow',
            95: 'Thunderstorm',
        };
        return weatherCodes[code as keyof typeof weatherCodes] || 'Unknown';
    };

    const getAirQualityStatus = (aqi: number) => {
        if (aqi <= 20) return 'Good';
        if (aqi <= 40) return 'Fair';
        if (aqi <= 60) return 'Moderate';
        if (aqi <= 80) return 'Poor';
        if (aqi <= 100) return 'Very Poor';
        return 'Extremely Poor';
    };

    if (!location || loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                >
                    <Callout>
                        <View style={styles.calloutContainer}>
                            <Text style={styles.calloutTitle}>Current Conditions</Text>

                            {/* Weather Information */}
                            <Text style={styles.sectionTitle}>Weather</Text>
                            <Text>Temperature: {weatherData?.weather?.temperature_2m}°C</Text>
                            <Text>Conditions: {getWeatherDescription(weatherData?.weather?.weather_code ?? 'Unknown')}</Text>
                            <Text>Humidity: {weatherData?.weather?.relative_humidity_2m}%</Text>
                            <Text>Wind Speed: {weatherData?.weather?.wind_speed_10m} km/h</Text>

                            {/* Air Quality Information */}
                            <Text style={styles.sectionTitle}>Air Quality</Text>
                            <Text>European AQI: {weatherData?.airQuality?.european_aqi}</Text>
                            <Text>Status: {getAirQualityStatus(weatherData?.airQuality?.european_aqi ?? -1)}</Text>
                            <Text>PM2.5: {weatherData?.airQuality?.pm2_5} µg/m³</Text>
                            <Text>PM10: {weatherData?.airQuality?.pm10} µg/m³</Text>
                            <Text>NO₂: {weatherData?.airQuality?.nitrogen_dioxide} µg/m³</Text>
                            <Text>CO: {weatherData?.airQuality?.carbon_monoxide} µg/m³</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>

            {/* Current conditions summary card */}
            <View style={styles.summaryCard}>
                <Text style={styles.summaryTemp}>
                    {weatherData?.weather?.temperature_2m}°C
                </Text>
                <Text style={styles.summaryDesc}>
                    {getWeatherDescription(weatherData?.weather?.weather_code ?? 'Unknown')}
                </Text>
                <Text style={styles.summaryAqi}>
                    Air Quality: {getAirQualityStatus(weatherData?.airQuality?.european_aqi ?? -1)}
                </Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    calloutContainer: {
        width: 200,
        padding: 10,
    },
    calloutTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 4,
    },
    summaryCard: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    summaryTemp: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    summaryDesc: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 5,
    },
    summaryAqi: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
});