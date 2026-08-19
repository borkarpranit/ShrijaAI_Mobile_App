import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ShrijaProvider } from "@/lib/shrija-store";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ShrijaProvider>
        <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="notifications" options={{ animation: "slide_from_right" }} />
        </Stack>
      </ShrijaProvider>
    </SafeAreaProvider>
  );
}
