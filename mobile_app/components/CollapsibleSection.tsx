import React, { useState } from "react";
import {
  Card,
  XStack,
  YStack,
  Text,
  useTheme,
  Stack,
  AnimatePresence,
} from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { CollapsibleSectionProps } from "@/types/map/Types";

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  children,
  initiallyExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const theme = useTheme();

  return (
    <Card
      marginVertical="$2"
      padding="$3"
      bordered
      elevation={2}
      backgroundColor="$background"
    >
      <Stack
        pressStyle={{ opacity: 0.8 }}
        onPress={() => setExpanded(!expanded)}
        animation="medium" // Changed from 'quick' to 'medium'
      >
        <XStack justifyContent="space-between" alignItems="center">
          <XStack alignItems="center" space="$2">
            <Ionicons name={icon} size={24} color={theme.blue10.get()} />
            <Text fontSize="$4" fontWeight="600" color="$gray12">
              {title}
            </Text>
          </XStack>
          <Stack
            animation="medium" // Changed from 'quick' to 'medium'
            rotate={expanded ? "180deg" : "0deg"}
          >
            <Ionicons
              name="chevron-down"
              size={24}
              color={theme.gray11.get()}
            />
          </Stack>
        </XStack>
      </Stack>

      <AnimatePresence>
        {expanded && (
          <YStack
            animation="medium" // Changed from 'quick' to 'medium'
            enterStyle={{
              opacity: 0,
              y: -5, // Reduced from -10 for faster animation
              scale: 0.98, // Increased from 0.95 for subtler scale effect
            }}
            exitStyle={{
              opacity: 0,
              y: -5, // Reduced from -10 for faster animation
              scale: 0.98, // Increased from 0.95 for subtler scale effect
            }}
            y={0}
            scale={1}
            opacity={1}
            paddingTop="$3"
          >
            {children}
          </YStack>
        )}
      </AnimatePresence>
    </Card>
  );
};
