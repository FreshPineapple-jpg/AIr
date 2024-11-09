import React, { useState, useEffect } from "react";
import { YStack, Button, Sheet, Input, XStack, Text, Form } from "tamagui";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import {
  WeatherApiResponse,
  AirQualityApiResponse,
  WeatherAPIData,
  SafetyZone,
} from "@/types/map/Types";
import { SearchBar } from "@/components/SearchBar";
import { WeatherDataSheet } from "@/components/DataSheet";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { renderSafetyZone } from "@/components/SafetyZone";

interface DateTimeInputs {
  year: string;
  month: string;
  day: string;
  hour: string;
}

// Mock ML model prediction function
// In a real application, this would make an API call to your ML service
const predictLocationSafety = async (
  temperature: number,
  humidity: number,
  windSpeed: number,
  pm25: number,
  pm10: number,
  no2: number,
  co: number
): Promise<boolean> => {
  // Mock ML model logic
  // This is a simplified example - replace with actual ML model API call
  const riskScore =
    pm25 / 10 +
    pm10 / 20 +
    no2 / 40 +
    co / 1000 +
    (temperature > 35 ? 2 : 0) +
    (humidity > 80 ? 1 : 0) +
    (windSpeed < 5 ? 1 : 0);

  return riskScore < 5; // Threshold for safety
};

export default function WeatherMap() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [weatherData, setWeatherData] = useState<WeatherAPIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [safetyZone, setSafetyZone] = useState<SafetyZone | null>(null);
  const [position, setPosition] = useState(0);

  // New state for form
  const [showForm, setShowForm] = useState(false);
  const [place, setPlace] = useState("");
  const [dateTime, setDateTime] = useState<DateTimeInputs>({
    year: "",
    month: "",
    day: "",
    hour: "",
  });

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setSelectedLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    fetchWeatherAndAssessSafety(
      location.coords.latitude,
      location.coords.longitude
    );
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const searchResult = await Location.geocodeAsync(searchQuery);
      if (searchResult.length > 0) {
        const { latitude, longitude } = searchResult[0];
        setSelectedLocation({ latitude, longitude });
        fetchWeatherAndAssessSafety(latitude, longitude);
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  const fetchWeatherAndAssessSafety = async (
    latitude: number,
    longitude: number
  ): Promise<void> => {
    try {
      const [weatherResponse, airQualityResponse] = await Promise.all([
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
        ),
        fetch(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,european_aqi`
        ),
      ]);

      const weatherResult: WeatherApiResponse = await weatherResponse.json();
      const airQualityResult: AirQualityApiResponse =
        await airQualityResponse.json();

      setWeatherData({
        weather: weatherResult.current,
        airQuality: airQualityResult.current,
      });

      // Predict safety using ML model
      const isSafe = await predictLocationSafety(
        weatherResult.current.temperature_2m,
        weatherResult.current.relative_humidity_2m,
        weatherResult.current.wind_speed_10m,
        airQualityResult.current.pm2_5,
        airQualityResult.current.pm10,
        airQualityResult.current.nitrogen_dioxide,
        airQualityResult.current.carbon_monoxide
      );

      // Update safety zone
      setSafetyZone({
        latitude,
        longitude,
        radius: 1000, // 1000 meters radius
        isSafe,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleAddEntry = () => {
    // Will implement later
    setShowForm(false);
    setPlace("");
    setDateTime({ year: "", month: "", day: "", hour: "" });
  };

  return (
    <YStack flex={1}>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
        onLocationPress={getCurrentLocation}
      />

      <MapView
        style={{ width: "100%", height: "100%" }}
        region={{
          latitude:
            selectedLocation?.latitude ?? location?.coords.latitude ?? 0,
          longitude:
            selectedLocation?.longitude ?? location?.coords.longitude ?? 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {renderSafetyZone({ safetyZone })}
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>

      <WeatherDataSheet
        weatherData={weatherData}
        isSafe={safetyZone?.isSafe ?? false}
      />

      {/* Floating Action Button */}
      <Button
        position="absolute"
        bottom={100}
        right={16}
        size="$6"
        circular
        backgroundColor="$blue10"
        pressStyle={{ scale: 0.95 }}
        onPress={() => setShowForm(true)}
        icon={<Ionicons name="add" size={24} color="white" />}
      />

      {/* Entry Form Sheet */}
      <Sheet
        modal
        open={showForm}
        onOpenChange={setShowForm}
        snapPoints={[50]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <Sheet.Handle />
          <YStack space="$4">
            <Text fontSize="$6" fontWeight="bold">
              Add Asthma Attack Entry
            </Text>
            <Form onSubmit={handleAddEntry}>
              <Input
                placeholder="Enter location"
                value={place}
                onChangeText={setPlace}
                marginBottom="$2"
              />

              <XStack space="$2" marginBottom="$2">
                <Input
                  flex={1}
                  placeholder="Year"
                  value={dateTime.year}
                  onChangeText={(text) =>
                    setDateTime({
                      ...dateTime,
                      year: text.replace(/[^0-9]/g, ""),
                    })
                  }
                  keyboardType="numeric"
                  maxLength={4}
                />
                <Input
                  flex={1}
                  placeholder="Month (1-12)"
                  value={dateTime.month}
                  onChangeText={(text) =>
                    setDateTime({
                      ...dateTime,
                      month: text.replace(/[^0-9]/g, ""),
                    })
                  }
                  keyboardType="numeric"
                  maxLength={2}
                />
              </XStack>

              <XStack space="$2" marginBottom="$4">
                <Input
                  flex={1}
                  placeholder="Day (1-31)"
                  value={dateTime.day}
                  onChangeText={(text) =>
                    setDateTime({
                      ...dateTime,
                      day: text.replace(/[^0-9]/g, ""),
                    })
                  }
                  keyboardType="numeric"
                  maxLength={2}
                />
                <Input
                  flex={1}
                  placeholder="Hour (0-23)"
                  value={dateTime.hour}
                  onChangeText={(text) =>
                    setDateTime({
                      ...dateTime,
                      hour: text.replace(/[^0-9]/g, ""),
                    })
                  }
                  keyboardType="numeric"
                  maxLength={2}
                />
              </XStack>

              <XStack space="$2" justifyContent="flex-end">
                <Button onPress={() => setShowForm(false)} variant="outlined">
                  Cancel
                </Button>
                <Button theme="active" onPress={handleAddEntry}>
                  Add Entry
                </Button>
              </XStack>
            </Form>
          </YStack>
        </Sheet.Frame>
      </Sheet>
      {loading && <LoadingOverlay />}
    </YStack>
  );
}
