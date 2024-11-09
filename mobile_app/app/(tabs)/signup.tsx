import React, { useState } from "react";
import {
  YStack,
  XStack,
  Text,
  Button,
  Input,
  styled,
  Stack,
  Label,
  View,
} from "tamagui";
import { Eye, EyeOff, Mail, Lock } from "lucide-react-native";
import { ScrollView, Platform, TouchableOpacity } from "react-native";

const StyledInput = styled(Input, {
  height: 56,
  br: 16,
  bc: "$gray3",
  pl: 48,
  pr: 48,
  fontSize: 16,

  variants: {
    error: {
      true: {
        borderColor: "$red8",
        borderWidth: 1,
      },
    },
  },
});

const IconButton = styled(TouchableOpacity, {
  position: "absolute",
  zIndex: 1,
  alignItems: "center",
  justifyContent: "center",
  height: 56,
  width: 48,
});

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <ScrollView>
      <YStack f={1} padding="$4" space="$4" backgroundColor="$background">
        {/* Logo Section */}
        <YStack alignItems="center" marginVertical="$8">
          <Text
            color="$blue9"
            fontSize={42}
            fontWeight="900"
            letterSpacing={-1}
            fontFamily={Platform.OS === "ios" ? "SF Pro Display" : "Roboto"}
          >
            AI
            <Text color="$gray11" fontWeight="400">
              r
            </Text>
          </Text>
        </YStack>

        {/* Header */}
        <YStack space="$2" alignItems="center" marginBottom="$6">
          <Text
            fontSize={32}
            fontWeight="700"
            color="$gray12"
            fontFamily={Platform.OS === "ios" ? "SF Pro Display" : "Roboto"}
          >
            Create Account
          </Text>
          <Text fontSize={16} color="$gray11">
            Sign up to get started!
          </Text>
        </YStack>

        {/* Form */}
        <YStack space="$4">
          {/* Email Input */}
          <Stack>
            <Label htmlFor="email" color="$gray11">
              Email
            </Label>
            <XStack alignItems="center" position="relative">
              <IconButton style={{ left: 0 }}>
                <Mail size={20} color="gray" />
              </IconButton>
              <StyledInput
                id="email"
                flex={1}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </XStack>
          </Stack>

          {/* Password Input */}
          <Stack>
            <Label htmlFor="password" color="$gray11">
              Password
            </Label>
            <XStack alignItems="center" position="relative">
              <IconButton style={{ left: 0 }}>
                <Lock size={20} color="gray" />
              </IconButton>
              <StyledInput
                id="password"
                flex={1}
                value={password}
                onChangeText={setPassword}
                placeholder="Create a password"
                secureTextEntry={!showPassword}
              />
              <IconButton
                style={{ right: 0 }}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color="gray" />
                ) : (
                  <Eye size={20} color="gray" />
                )}
              </IconButton>
            </XStack>
          </Stack>

          {/* Confirm Password Input */}
          <Stack>
            <Label htmlFor="confirmPassword" color="$gray11">
              Confirm Password
            </Label>
            <XStack alignItems="center" position="relative">
              <IconButton style={{ left: 0 }}>
                <Lock size={20} color="gray" />
              </IconButton>
              <StyledInput
                id="confirmPassword"
                flex={1}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                secureTextEntry={!showConfirmPassword}
              />
              <IconButton
                style={{ right: 0 }}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color="gray" />
                ) : (
                  <Eye size={20} color="gray" />
                )}
              </IconButton>
            </XStack>
          </Stack>

          {/* Sign Up Button */}
          <Button
            size="$6"
            theme="blue"
            borderRadius="$4"
            marginTop="$4"
            onPress={handleSignUp}
            disabled={isLoading}
            pressStyle={{ opacity: 0.8 }}
            animation="quick"
          >
            <Text color="white" fontWeight="600">
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Text>
          </Button>

          {/* Terms and Privacy */}
          <Text
            textAlign="center"
            color="$gray11"
            fontSize={14}
            lineHeight={20}
          >
            By signing up, you agree to our{" "}
            <Text color="$blue9" fontWeight="500">
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text color="$blue9" fontWeight="500">
              Privacy Policy
            </Text>
          </Text>

          {/* Login Link */}
          <XStack justifyContent="center" marginTop="$2">
            <Text color="$gray11" fontSize={14}>
              Already have an account?{" "}
              <Text
                color="$blue9"
                fontWeight="600"
                onPress={() => {
                  // Add navigation logic
                }}
              >
                Log in
              </Text>
            </Text>
          </XStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default SignUpPage;
