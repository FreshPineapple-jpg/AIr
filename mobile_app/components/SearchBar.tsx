import React from "react";
import { XStack, Input, Button } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { SearchBarProps } from "@/types/map/Types";

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onSearch,
  onLocationPress,
}) => (
  <XStack
    position="absolute"
    top={40}
    left={10}
    right={10}
    zIndex={1}
    space="$2"
    padding="$2"
  >
    <Input
      flex={1}
      placeholder="Search location..."
      value={searchQuery}
      onChangeText={onSearchChange}
      backgroundColor="white"
      borderRadius="$10"
      color={"$gray10"}
    />
    <Button
      onPress={onSearch}
      icon={<Ionicons name="search" size={20} color="white" />}
    />
    <Button
      onPress={onLocationPress}
      icon={<Ionicons name="locate" size={20} color="white" />}
    />
  </XStack>
);
