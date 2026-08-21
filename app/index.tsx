import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { AppScreen, PrimaryButton, usePalette } from "@/components/shrija-ui";
import { useShrija } from "@/lib/shrija-store";

export default function SplashScreen() {
  const { ready, isSignedIn } = useShrija();
  const p = usePalette();
  useEffect(() => {
    if (!ready || !isSignedIn) return;
    const timer = setTimeout(() => router.replace("/(tabs)"), 420);
    return () => clearTimeout(timer);
  }, [isSignedIn, ready]);

  return (
    <AppScreen includeBottomInset>
      <View style={[styles.page, { backgroundColor: p.background }]}>
        <View style={styles.center}>
          <View style={[styles.mark, { backgroundColor: p.accent }]}>
            <MaterialIcons name="auto-awesome" size={44} color="#FFFFFF" />
          </View>
          <Text style={[styles.name, { color: p.text }]}>Shrija AI</Text>
          <Text style={[styles.copy, { color: p.muted }]}>
            Your work companion, one message away.
          </Text>
        </View>
        {!ready ? (
          <ActivityIndicator size="small" color={p.accent} />
        ) : isSignedIn ? (
          <Text style={[styles.continuing, { color: p.muted }]}>
            Opening your conversation…
          </Text>
        ) : (
          <View style={styles.action}>
            <PrimaryButton
              label="Login to Shrija"
              icon="login"
              onPress={() => router.replace("/login")}
            />
            <Text style={[styles.actionNote, { color: p.subtle }]}>
              Use the demo email and password on the next screen.
            </Text>
          </View>
        )}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingVertical: 48,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  mark: {
    width: 92,
    height: 92,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    lineHeight: 35,
    fontWeight: "900",
    letterSpacing: -0.7,
  },
  copy: { fontSize: 14, lineHeight: 20, marginTop: 5, textAlign: "center" },
  action: { width: "100%", gap: 12 },
  actionNote: { fontSize: 11, lineHeight: 16, textAlign: "center" },
  continuing: { fontSize: 13, lineHeight: 18, marginBottom: 16 },
});
