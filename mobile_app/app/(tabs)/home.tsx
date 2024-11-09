import React from "react";
import {
  YStack,
  XStack,
  Card,
  Text,
  ScrollView,
  Separator,
  Button,
} from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Mock user data
const userData = {
  name: "John Doe",
  lastAttack: "3 days ago",
  totalEntries: 12,
  lastLocation: "Home Office",
};

// Mock tips data
const asthmaTips = [
  {
    id: 1,
    title: "Keep Your Inhaler Close",
    description:
      "Always carry your rescue inhaler with you, especially during physical activities.",
  },
  {
    id: 2,
    title: "Monitor Air Quality",
    description:
      "Check daily air quality reports and plan outdoor activities accordingly.",
  },
  {
    id: 3,
    title: "Identify Triggers",
    description:
      "Keep track of what triggers your asthma attacks to better avoid them.",
  },
];

export default function Homepage() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView>
      <YStack
        flex={1}
        padding="$4"
        paddingTop={insets.top}
        backgroundColor="$background"
        space="$4"
      >
        {/* User Summary Card */}
        <Card
          bordered
          elevation={2}
          padding="$4"
          animation="quick"
          scale={0.98}
          pressStyle={{ scale: 0.96 }}
        >
          <YStack space="$2">
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize="$7" fontWeight="bold">
                {userData.name}
              </Text>
              <Link href="/settings" asChild>
                <Button
                  icon={<Ionicons name="settings-outline" size={20} />}
                  backgroundColor="transparent"
                  pressStyle={{ opacity: 0.7 }}
                />
              </Link>
            </XStack>
            <Separator marginVertical="$2" />
            <XStack flexWrap="wrap" gap="$4">
              <YStack space="$1" flex={1} minWidth={140}>
                <Text color="$gray10">Last Attack</Text>
                <Text fontSize="$5" fontWeight="600">
                  {userData.lastAttack}
                </Text>
              </YStack>
              <YStack space="$1" flex={1} minWidth={140}>
                <Text color="$gray10">Total Entries</Text>
                <Text fontSize="$5" fontWeight="600">
                  {userData.totalEntries}
                </Text>
              </YStack>
            </XStack>
          </YStack>
        </Card>

        {/* Quick Actions */}
        <XStack space="$2" justifyContent="space-between">
          <Link href="/entries" asChild style={{ flex: 1 }}>
            <Button
              flex={1}
              height="$6"
              backgroundColor="$blue10"
              icon={
                <Ionicons name="add-circle-outline" size={24} color="white" />
              }
            >
              New Entry
            </Button>
          </Link>
          <Link href="/history" asChild style={{ flex: 1 }}>
            <Button
              flex={1}
              height="$6"
              backgroundColor="$gray8"
              icon={<Ionicons name="time-outline" size={24} color="white" />}
            >
              History
            </Button>
          </Link>
        </XStack>

        {/* Asthma Tips Section */}
        <YStack space="$2">
          <Text fontSize="$6" fontWeight="bold">
            Asthma Management Tips
          </Text>
          {asthmaTips.map((tip) => (
            <Card
              key={tip.id}
              bordered
              padding="$3"
              animation="quick"
              pressStyle={{ scale: 0.98 }}
            >
              <YStack space="$1">
                <XStack space="$2" alignItems="center">
                  <Ionicons
                    name="information-circle"
                    size={24}
                    color="$blue10"
                  />
                  <Text fontSize="$5" fontWeight="600">
                    {tip.title}
                  </Text>
                </XStack>
                <Text color="$gray11" paddingLeft="$6">
                  {tip.description}
                </Text>
              </YStack>
            </Card>
          ))}
        </YStack>

        {/* Emergency Section */}
        <Card
          backgroundColor="$red10"
          padding="$4"
          pressStyle={{ scale: 0.98 }}
        >
          <XStack alignItems="center" space="$3">
            <Ionicons name="warning" size={32} color="white" />
            <YStack flex={1}>
              <Text color="white" fontSize="$5" fontWeight="bold">
                In Case of Emergency
              </Text>
              <Text color="white" opacity={0.9}>
                Call emergency services immediately if you experience severe
                symptoms
              </Text>
            </YStack>
          </XStack>
        </Card>

        {/* Air Quality Alert */}
        <Card
          backgroundColor="$blue5"
          padding="$4"
          pressStyle={{ scale: 0.98 }}
        >
          <XStack alignItems="center" space="$3">
            <Ionicons name="cloud" size={32} color="$blue10" />
            <YStack flex={1}>
              <Text fontSize="$5" fontWeight="bold" color="$blue10">
                Today's Air Quality
              </Text>
              <Text color="$blue10">
                Good conditions for outdoor activities
              </Text>
            </YStack>
          </XStack>
        </Card>
      </YStack>
    </ScrollView>
  );
}
