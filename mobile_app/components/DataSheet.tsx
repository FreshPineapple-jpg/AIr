import React, { useState } from "react";
import {
  Sheet,
  Button,
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
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(0);

  if (!weatherData) return null;

  const handleOpenChange = (newPosition: number) => {
    setPosition(newPosition);
    setIsOpen(newPosition !== 0);
  };

  // Trigger button that's always visible
  const SheetTrigger = () => (
    <Button
      position="absolute"
      bottom="$4"
      alignSelf="center"
      width={200}
      onPress={() => setIsOpen(true)}
      icon={<Ionicons name="chevron-up" size={24} />}
      pressStyle={{ opacity: 0.8 }}
      animation="quick"
    >
      View Weather Data
    </Button>
  );

  return (
    <>
      <SheetTrigger />

      <Sheet
        modal
        open={isOpen}
        onOpenChange={(open: boolean) => setIsOpen(open)}
        snapPoints={[50]}
        position={position}
        onPositionChange={handleOpenChange}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Sheet.Frame padding="$4" backgroundColor="$background">
          <Sheet.Handle />

          {/* Safety Status */}
          <Stack animation="quick">
            <SafetyStatus isSafe={isSafe} />
          </Stack>

          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            {/* Temperature Card */}
            <Card marginVertical="$2" padding="$3">
              <XStack alignItems="center" space="$2">
                <Ionicons
                  name="thermometer"
                  size={24}
                  color={theme.blue10.get()}
                />
                <YStack>
                  <Text fontSize="$4">Temperature</Text>
                  <Text
                    fontSize="$8"
                    fontWeight="bold"
                    color={theme.blue10.get()}
                  >
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
                  {
                    label: "NO₂",
                    value: weatherData.airQuality?.nitrogen_dioxide,
                  },
                  {
                    label: "CO",
                    value: weatherData.airQuality?.carbon_monoxide,
                  },
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
        </Sheet.Frame>
      </Sheet>
    </>
  );
};
