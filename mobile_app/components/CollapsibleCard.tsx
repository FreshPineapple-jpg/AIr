import React, { useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/MapStyles";
import { CollapsibleSectionProps } from "@/types/map/Types";

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
    title,
    icon,
    children,
    initiallyExpanded = false
}) => {
    const [expanded, setExpanded] = useState(initiallyExpanded);
    const [animation] = useState(new Animated.Value(initiallyExpanded ? 1 : 0));

    const toggleExpanded = () => {
        Animated.timing(animation, {
            toValue: expanded ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setExpanded(!expanded);
    };

    const containerHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200], // Adjust based on content
    });

    return (
        <View style={styles.collapsibleSection}>
            <TouchableOpacity
                style={styles.sectionHeader}
                onPress={toggleExpanded}
                activeOpacity={0.7}
            >
                <View style={styles.headerLeft}>
                    <Ionicons name={icon as any} size={24} color="#007AFF" />
                    <Text style={styles.sectionTitle}>{title}</Text>
                </View>
                <Ionicons
                    name={expanded ? "chevron-up" : "chevron-down"}
                    size={24}
                    color="#007AFF"
                />
            </TouchableOpacity>
            <Animated.View style={[styles.collapsibleContent, { maxHeight: containerHeight }]}>
                {children}
            </Animated.View>
        </View>
    );
};