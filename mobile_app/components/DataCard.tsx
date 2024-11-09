import { Ionicons } from '@expo/vector-icons';
import { Text, View, ScrollView } from 'react-native';
import { CollapsibleSection } from './CollapsibleCard';
import { styles } from '../styles/MapStyles';
import { SafetyZone, WeatherAPIData } from '@/types/map/Types';

import React from 'react';

interface DataCardProps {
    weatherData: WeatherAPIData | null;
    safetyZone: SafetyZone | null;
}

export const DataCard: React.FC<DataCardProps> = ({ weatherData, safetyZone }) => {
    if (!weatherData) return null;

    return (
        <View style={styles.dataCard}>
            <ScrollView style={styles.scrollContainer}>
                {/* Safety Status - Always Visible */}
                <View style={[
                    styles.safetySection,
                    { backgroundColor: safetyZone?.isSafe ? 'rgba(0, 228, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)' }
                ]}>
                    <Ionicons
                        name={safetyZone?.isSafe ? "checkmark-circle-outline" : "warning-outline"}
                        size={24}
                        color={safetyZone?.isSafe ? '#00E400' : '#FF0000'}
                    />
                    <Text style={[
                        styles.safetyText,
                        { color: safetyZone?.isSafe ? '#00E400' : '#FF0000' }
                    ]}>
                        {safetyZone?.isSafe ? 'SAFE ZONE' : 'UNSAFE ZONE'}
                    </Text>
                </View>
                {/* Temperature Section - Always Visible */}
                <View style={styles.temperatureSection}>
                    <View style={styles.dataHeader}>
                        <Ionicons name="thermometer-outline" size={24} color="#007AFF" />
                        <Text style={styles.dataTitle}>Temperature</Text>
                    </View>
                    <Text style={styles.mainValue}>{weatherData.weather?.temperature_2m}°C</Text>
                </View>

                {/* Weather Conditions Dropdown */}
                <CollapsibleSection
                    title="Weather Conditions"
                    icon="water-outline"
                    initiallyExpanded={true}
                >
                    <View style={styles.conditionsGrid}>
                        <View style={styles.conditionItem}>
                            <View style={styles.conditionHeader}>
                                <Ionicons name="water" size={16} color="#666" />
                                <Text style={styles.conditionLabel}>Humidity</Text>
                            </View>
                            <Text style={styles.conditionValue}>
                                {weatherData.weather?.relative_humidity_2m}%
                            </Text>
                        </View>
                        <View style={styles.conditionItem}>
                            <View style={styles.conditionHeader}>
                                <Ionicons name="speedometer" size={16} color="#666" />
                                <Text style={styles.conditionLabel}>Wind Speed</Text>
                            </View>
                            <Text style={styles.conditionValue}>
                                {weatherData.weather?.wind_speed_10m} km/h
                            </Text>
                        </View>
                    </View>
                </CollapsibleSection>

                {/* Air Quality Dropdown */}
                <CollapsibleSection
                    title="Air Quality"
                    icon="leaf-outline"
                    initiallyExpanded={false}
                >
                    <View style={styles.aqiGrid}>
                        <View style={styles.aqiItem}>
                            <View style={styles.aqiHeader}>
                                <Ionicons name="analytics" size={16} color="#666" />
                                <Text style={styles.aqiLabel}>PM2.5</Text>
                            </View>
                            <Text style={styles.aqiValue}>
                                {weatherData.airQuality?.pm2_5} µg/m³
                            </Text>
                        </View>
                        <View style={styles.aqiItem}>
                            <View style={styles.aqiHeader}>
                                <Ionicons name="analytics" size={16} color="#666" />
                                <Text style={styles.aqiLabel}>PM10</Text>
                            </View>
                            <Text style={styles.aqiValue}>
                                {weatherData.airQuality?.pm10} µg/m³
                            </Text>
                        </View>
                        <View style={styles.aqiItem}>
                            <View style={styles.aqiHeader}>
                                <Ionicons name="analytics" size={16} color="#666" />
                                <Text style={styles.aqiLabel}>NO₂</Text>
                            </View>
                            <Text style={styles.aqiValue}>
                                {weatherData.airQuality?.nitrogen_dioxide} µg/m³
                            </Text>
                        </View>
                        <View style={styles.aqiItem}>
                            <View style={styles.aqiHeader}>
                                <Ionicons name="analytics" size={16} color="#666" />
                                <Text style={styles.aqiLabel}>CO</Text>
                            </View>
                            <Text style={styles.aqiValue}>
                                {weatherData.airQuality?.carbon_monoxide} µg/m³
                            </Text>
                        </View>
                    </View>
                </CollapsibleSection>
            </ScrollView>
        </View>
    );
};