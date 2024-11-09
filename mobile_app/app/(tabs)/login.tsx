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
import {
  ScrollView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase"; // Adjust path as needed

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
  const [isSignUp, setIsSignUp] = useState(false);

  const auth = FIREBASE_AUTH;

  const handleEmailAuth = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      // Handle successful authentication
      console.log("Successfully authenticated!");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSignUp = () => {
    console.log("Toggling Sign Up: ", isSignUp); // Debug log
    setIsSignUp((prevState) => {
      console.log("Prev state:", prevState); // Debug log
      return !prevState;
    });
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // Handle successful Google sign-in
      console.log("Successfully signed in with Google!", result.user);
    } catch (err) {
      setError(err.message);
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
              AI
              <Text color="$gray11" fontWeight="400">
                R
              </Text>
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
              {isSignUp ? "Sign Up" : "Sign In"}
            </Text>
          </YStack>

          {/* Error Message */}
          {error && (
            <Text color="$red10" textAlign="center" marginBottom="$4">
              {error}
            </Text>
          )}

          {/* Form */}
          <YStack>
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

            {/* Email/Password Auth Button */}
            <Button
              size="$6"
              theme="blue"
              borderRadius="$4"
              marginTop="$4"
              onPress={handleEmailAuth}
              disabled={isLoading}
              pressStyle={{ opacity: 0.8 }}
              animation="quick"
            >
              <Text color="white" fontWeight="600">
                {isLoading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
              </Text>
            </Button>

            {/* Google Sign In Button */}
            <Button
              size="$6"
              theme="gray"
              borderRadius="$4"
              marginTop="$4"
              onPress={handleGoogleSignIn}
              disabled={isLoading}
              pressStyle={{ opacity: 0.8 }}
              animation="quick"
            >
              <Text color="$gray12" fontWeight="600">
                Continue with Google
              </Text>
            </Button>

            {/* Terms and Privacy */}
            <Text
              textAlign="center"
              color="$gray11"
              fontSize={14}
              lineHeight={20}
              marginTop="$4"
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

            {/* Toggle Sign Up/Sign In */}
            <XStack justifyContent="center" marginTop="$4">
              <Text color="$gray11" fontSize={14} onPress={handleToggleSignUp}>
                {isSignUp
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <Text color="$blue9" fontWeight="600">
                  {isSignUp ? "Sign In" : "Sign Up"}
                </Text>
              </Text>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;
