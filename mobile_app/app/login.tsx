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
} from "tamagui";
import { Eye, EyeOff, Mail, Lock } from "lucide-react-native";
import {
  ScrollView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebase";
import { Link } from "expo-router";

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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Successfully logged in!");
    } catch (err) {
      setError((err as any).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "$background" }}>
      <ScrollView>
        <YStack f={1} padding="$4" backgroundColor="$background">
          <YStack height={100} />

          {/* Logo Section */}
          <YStack alignItems="center" marginBottom="$8">
            <Text
              color="$blue9"
              fontSize={42}
              fontWeight="900"
              letterSpacing={-1}
              fontFamily={Platform.OS === "ios" ? "SF Pro Display" : "Roboto"}
            >
              AIR
            </Text>
          </YStack>

          {/* Header */}
          <YStack alignItems="center" marginBottom="$6">
            <Text
              fontSize={32}
              fontWeight="700"
              color="$gray12"
              fontFamily={Platform.OS === "ios" ? "SF Pro Display" : "Roboto"}
            >
              Login
            </Text>
          </YStack>

          {/* Error Message */}
          {error && (
            <Text color="$red10" textAlign="center" marginBottom="$4">
              {error}
            </Text>
          )}

          {/* Form */}
          <YStack space="$4">
            {/* Email Input */}
            <Stack>
              <Label htmlFor="email-input" color="$gray11">
                Email
              </Label>
              <XStack alignItems="center" position="relative">
                <IconButton style={{ left: 0 }}>
                  <Mail size={20} color="gray" />
                </IconButton>
                <StyledInput
                  id="email-input"
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
              <Label htmlFor="password-input" color="$gray11">
                Password
              </Label>
              <XStack alignItems="center" position="relative">
                <IconButton style={{ left: 0 }}>
                  <Lock size={20} color="gray" />
                </IconButton>
                <StyledInput
                  id="password-input"
                  flex={1}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
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

            {/* Login Button */}
            <Button
              size="$6"
              theme="blue"
              borderRadius="$4"
              marginTop="$4"
              onPress={handleLogin}
              disabled={isLoading}
              pressStyle={{ opacity: 0.8 }}
              animation="quick"
            >
              <Text color="white" fontWeight="600">
                {isLoading ? "Logging in..." : "Login"}
              </Text>
            </Button>

            {/* Sign Up Link */}
            <XStack justifyContent="center" marginTop="$4">
              <Text color="$gray11" fontSize={14}>
                Don't have an account?{" "}
                <Link href="/signup">
                  <Text color="$blue9" fontWeight="600">
                    Sign Up
                  </Text>
                </Link>
              </Text>
            </XStack>

            {/* Forgot Password Link */}
            <XStack justifyContent="center" marginTop="$2">
              <Link href="/forgot-password">
                <Text color="$blue9" fontSize={14} fontWeight="500">
                  Forgot Password?
                </Text>
              </Link>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;
