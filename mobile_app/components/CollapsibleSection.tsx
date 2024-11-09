import React, { useState } from "react";
import { Card, XStack, YStack, Text, useTheme } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { AnimatePresence, YStackAnimated } from "tamagui";
import { CollapsibleSectionProps } from "@/types/map/Types";

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  children,
  initiallyExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const theme = useTheme();

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Card bordered marginVertical="$2" padding="$3">
      <XStack
        justifyContent="space-between"
        alignItems="center"
        pressable
        onPress={toggleExpanded}
      >
        <XStack alignItems="center" space="$2">
          <Ionicons name={icon} size={24} />
          <Text>{title}</Text>
        </XStack>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={24} />
      </XStack>
      <AnimatePresence>
        {expanded && (
          <YStackAnimated
            key="content"
            animation="lazy"
            entering={{ opacity: 1, height: "auto" }}
            exiting={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden" }}
          >
            <YStack padding="$2">{children}</YStack>
          </YStackAnimated>
        )}
      </AnimatePresence>
    </Card>
  );
};
