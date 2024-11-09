import React from "react";
import { YStack, Text, Stack } from "tamagui";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions, ImageBackground, StyleSheet } from "react-native";

export default function LandingPage() {
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <YStack flex={1} paddingTop={insets.top} paddingBottom={insets.bottom}>
        <Link href="/home" asChild>
          <Stack
            flex={1}
            justifyContent="flex-end"
            alignItems="center"
            paddingBottom="$8"
            animation="quick"
            pressStyle={{
              opacity: 0.8,
            }}
          >
            <Text
              color="Blue10"
              fontSize="$5"
              opacity={0.9}
              textAlign="center"
              animation="quick"
            >
              Tap anywhere to continue
            </Text>
          </Stack>
        </Link>
      </YStack>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
