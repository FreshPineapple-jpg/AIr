import React, { useState, useCallback } from "react";
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
import { ScrollView, Platform, TouchableOpacity, Alert } from "react-native";
import { Link, router } from "expo-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  }, []);

  const togglePasswordVisibility = useCallback(
    (field: "password" | "confirmPassword") => {
      setVisibility((prev) => ({
        ...prev,
        [field]: !prev[field as "password" | "confirmPassword"],
      }));
    },
    []
  );

  const validateForm = useCallback(() => {
    const newErrors: {
      email: string;
      password: string;
      confirmPassword: string;
    } = {
      email: "",
      password: "",
      confirmPassword: "",
    };
    const { email, password, confirmPassword } = formData;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSignUp = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Clear form
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Navigate to home screen
      router.replace("/home");
    } catch (error) {
      let errorMessage = "An error occurred during sign up";

      const firebaseError = error as FirebaseError;
      switch (firebaseError.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Email/password accounts are not enabled";
          break;
        case "auth/weak-password":
          errorMessage = "Please choose a stronger password";
          break;
        default:
          console.error("Sign up error:", error);
      }

      Alert.alert("Sign Up Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm]);

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
                value={formData.email}
                onChangeText={(text) => handleInputChange("email", text)}
                placeholder="Enter your email"
                autoCapitalize="none"
                keyboardType="email-address"
                error={!!errors.email}
              />
            </XStack>
            {errors.email ? (
              <Text color="$red9" fontSize={12} marginTop="$1">
                {errors.email}
              </Text>
            ) : null}
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
                value={formData.password}
                onChangeText={(text) => handleInputChange("password", text)}
                placeholder="Create a password"
                secureTextEntry={!visibility.password}
                error={!!errors.password}
              />
              <IconButton
                style={{ right: 0 }}
                onPress={() => togglePasswordVisibility("password")}
              >
                {visibility.password ? (
                  <EyeOff size={20} color="gray" />
                ) : (
                  <Eye size={20} color="gray" />
                )}
              </IconButton>
            </XStack>
            {errors.password ? (
              <Text color="$red9" fontSize={12} marginTop="$1">
                {errors.password}
              </Text>
            ) : null}
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
                value={formData.confirmPassword}
                onChangeText={(text) =>
                  handleInputChange("confirmPassword", text)
                }
                placeholder="Confirm your password"
                secureTextEntry={!visibility.confirmPassword}
                error={!!errors.confirmPassword}
              />
              <IconButton
                style={{ right: 0 }}
                onPress={() => togglePasswordVisibility("confirmPassword")}
              >
                {visibility.confirmPassword ? (
                  <EyeOff size={20} color="gray" />
                ) : (
                  <Eye size={20} color="gray" />
                )}
              </IconButton>
            </XStack>
            {errors.confirmPassword ? (
              <Text color="$red9" fontSize={12} marginTop="$1">
                {errors.confirmPassword}
              </Text>
            ) : null}
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
              <Link
                href="/login"
                style={{ textDecorationLine: "underline" }}
                asChild
              >
                <Text color="$blue9" fontWeight="600">
                  Log in
                </Text>
              </Link>
            </Text>
          </XStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default SignUpPage;
