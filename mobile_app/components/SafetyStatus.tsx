import React from "react";
import { Card, XStack, Text, useTheme } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { SafetyStatusProps } from "@/types/map/Types";

// SafetyStatus.tsx
interface SafetyStatusProps {
  isSafe: boolean;
  isMinimized?: boolean;
}
export const SafetyStatus: React.FC<SafetyStatusProps> = ({
  isSafe,
  isMinimized = false,
}) => {
  const theme = useTheme();

  return (
    <Card
      backgroundColor={isSafe ? theme.green2.get() : theme.red2.get()}
      marginVertical={0}
      animation="quick"
    >
      <XStack
        padding="$3"
        alignItems="center"
        space="$2"
        justifyContent="space-between"
      >
        <XStack space="$2" alignItems="center">
          <Ionicons
            name={isSafe ? "checkmark-circle" : "warning"}
            size={24}
            color={isSafe ? theme.green10.get() : theme.red10.get()}
          />
          <Text
            fontSize={isMinimized ? "$5" : "$6"}
            fontWeight="bold"
            color={isSafe ? theme.green10.get() : theme.red10.get()}
          >
            {isSafe ? "SAFE ZONE" : "UNSAFE ZONE"}
          </Text>
        </XStack>
        <Ionicons
          name={isMinimized ? "chevron-up" : "chevron-down"}
          size={24}
          color={isSafe ? theme.green10.get() : theme.red10.get()}
        />
      </XStack>
    </Card>
  );
};
