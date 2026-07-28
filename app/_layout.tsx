import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { getJSON, STORAGE_KEYS } from "../src/lib/storage";
import { colors } from "../src/theme";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    async function checkOnboarding() {
      try {
        const complete = await getJSON<boolean>(STORAGE_KEYS.onboardingComplete);
        setOnboarded(complete === true);
      } catch {
        setOnboarded(false);
      } finally {
        setIsReady(true);
      }
    }
    checkOnboarding();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    let cancelled = false;

    async function syncRouteWithStorage() {
      const inOnboarding = segments[0] === "onboarding";

      if (onboarded) {
        if (inOnboarding) router.replace("/(tabs)");
        return;
      }

      // Onboarding writes its completion flag before navigating. Re-read that
      // flag when the route changes so this layout does not immediately send
      // the user back to the first screen with stale in-memory state.
      if (!inOnboarding) {
        const complete = await getJSON<boolean>(
          STORAGE_KEYS.onboardingComplete
        );
        if (cancelled) return;

        if (complete === true) {
          setOnboarded(true);
        } else {
          router.replace("/onboarding");
        }
      }
    }

    syncRouteWithStorage();
    return () => {
      cancelled = true;
    };
  }, [isReady, onboarded, segments]);

  if (!isReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "600" },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="activity/[id]"
          options={{
            title: "Activity",
            presentation: "card",
          }}
        />
        <Stack.Screen
          name="talk-now"
          options={{
            title: "Talk Now",
            presentation: "card",
          }}
        />
        <Stack.Screen
          name="together/[sessionId]"
          options={{
            title: "Together",
            presentation: "fullScreenModal",
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="sign-in"
          options={{
            title: "Sign In",
            presentation: "modal",
          }}
        />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});
