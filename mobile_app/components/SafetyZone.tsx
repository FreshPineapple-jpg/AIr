import React from 'react';
import { Circle } from 'react-native-maps';
import { SafetyZone } from '@/types/map/Types';

export const renderSafetyZone = ({ safetyZone }: { safetyZone: SafetyZone | null }) => {
    if (!safetyZone) return null;

    const baseColor = safetyZone.isSafe ? '#00E400' : '#FF0000'; // Green for safe, Red for unsafe
    const gradientLayers = 5;

    return Array.from({ length: gradientLayers }).map((_, index) => {
        const ratio = (gradientLayers - index) / gradientLayers;
        return (
            <Circle
                key={index}
                center={{
                    latitude: safetyZone.latitude,
                    longitude: safetyZone.longitude,
                }}
                radius={safetyZone.radius * ((gradientLayers - index) / gradientLayers)}
                fillColor={`${baseColor}${Math.round(ratio * 40).toString(16).padStart(2, '0')}`}
                strokeColor={index === 0 ? baseColor : 'transparent'}
                strokeWidth={2}
                zIndex={1000 - index}
            />
        );
    });
};