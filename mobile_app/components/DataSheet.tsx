import React, { useState } from "react";
import {
  Sheet,
  ScrollView,
  Card,
  XStack,
  YStack,
  Text,
  useTheme,
  Stack,
} from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { WeatherDataSheetProps } from "@/types/map/Types";
import { CollapsibleSection } from "./CollapsibleSection";
import { SafetyStatus } from "./SafetyStatus";

export const WeatherDataSheet: React.FC<WeatherDataSheetProps> = ({
  weatherData,
  isSafe,
  position,
  onPositionChange,
  snapPoints = [20, 50, 90], // Ensure snapPoints are numeric values
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!weatherData) return null;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Minimized view (safety status only)
  const MinimizedContent = () => (
    <Stack
      onPress={toggleExpanded}
      animation="quick"
      pressStyle={{ opacity: 0.8 }}
    >
      <SafetyStatus isSafe={isSafe} isMinimized />
    </Stack>
  );

  // Full content view
  const ExpandedContent = () => (
    <YStack>
      <Stack
        onPress={toggleExpanded}
        animation="quick"
        pressStyle={{ opacity: 0.8 }}
      >
        <SafetyStatus isSafe={isSafe} />
      </Stack>

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Temperature Card */}
        <Card marginVertical="$2" padding="$3">
          <XStack alignItems="center" space="$2">
            <Ionicons name="thermometer" size={24} color={theme.blue10.get()} />
            <YStack>
              <Text fontSize="$4">Temperature</Text>
              <Text fontSize="$8" fontWeight="bold" color={theme.blue10.get()}>
                {weatherData.weather?.temperature_2m}°C
              </Text>
            </YStack>
          </XStack>
        </Card>

        {/* Weather Conditions Section */}
        <CollapsibleSection title="Weather Conditions" icon="water">
          <XStack space="$4" justifyContent="space-between">
            <YStack space="$2">
              <Text color="$gray10">Humidity</Text>
              <Text fontSize="$5">
                {weatherData.weather?.relative_humidity_2m}%
              </Text>
            </YStack>
            <YStack space="$2">
              <Text color="$gray10">Wind Speed</Text>
              <Text fontSize="$5">
                {weatherData.weather?.wind_speed_10m} km/h
              </Text>
            </YStack>
          </XStack>
        </CollapsibleSection>

        {/* Air Quality Section */}
        <CollapsibleSection title="Air Quality" icon="leaf">
          <XStack flexWrap="wrap" justifyContent="space-between">
            {[
              { label: "PM2.5", value: weatherData.airQuality?.pm2_5 },
              { label: "PM10", value: weatherData.airQuality?.pm10 },
              { label: "NO₂", value: weatherData.airQuality?.nitrogen_dioxide },
              { label: "CO", value: weatherData.airQuality?.carbon_monoxide },
            ].map((item, index) => (
              <Card
                key={index}
                width="48%"
                marginVertical="$2"
                padding="$3"
                backgroundColor="$gray2"
              >
                <Text color="$gray10">{item.label}</Text>
                <Text fontSize="$5">{item.value} µg/m³</Text>
              </Card>
            ))}
          </XStack>
        </CollapsibleSection>
      </ScrollView>
    </YStack>
  );

  return (
    <Sheet
      modal={false}
      open={true}
      animation="medium"
      width="100%"
      snapPoints={snapPoints}
      snapPointsMode="percent"
      position={position}
      onPositionChange={onPositionChange}
      marginBottom={60}
    >
      <Sheet.Frame
        padding="$4"
        backgroundColor="white"
        animation="quick"
        height={isExpanded ? 500 : "auto"}
        borderTopLeftRadius="$4"
        borderTopRightRadius="$4"
        borderWidth={1}
        borderBottomWidth={0}
        borderColor="$gray5"
        elevate
      >
        {isExpanded ? <ExpandedContent /> : <MinimizedContent />}
      </Sheet.Frame>
    </Sheet>
  );
};
