import React from 'react';
import { YStack, Square, useTheme } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';

export const LoadingOverlay: React.FC = () => {
    const theme = useTheme();

    return (
        <YStack
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            backgroundColor="rgba(255, 255, 255, 0.7)"
            justifyContent="center"
            alignItems="center"
        >
            <Square animation="bouncy">
                <Ionicons name="sync" size={32} color={theme.blue10.get()} />
            </Square>
        </YStack>
    );
};