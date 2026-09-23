import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { AppScreen, PrimaryButton, usePalette } from "@/components/shrija-ui";
import { haptic } from "@/lib/haptics";
import { useShrija } from "@/lib/shrija-store";

export default function LoginScreen() {
  const { signIn, isAuthenticating } = useShrija();
  const p = usePalette();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidden, setHidden] = useState(true);

  const continueToChat = async () => {
    try {
      await signIn(email, password);
      haptic.success();
      router.replace("/(tabs)");
    } catch (error) {
      haptic.medium();
      Alert.alert(
        "Sign in failed",
        error instanceof Error ? error.message : "Please check your details and try again.",
      );
    }
  };

  return (
    <AppScreen includeBottomInset>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.page}
      >
        <View style={styles.content}>
          <View style={[styles.mark, { backgroundColor: p.accent }]}>
            <MaterialIcons name="auto-awesome" size={31} color="#FFFFFF" />
          </View>
          <Text style={[styles.title, { color: p.text }]}>
            Welcome to Shrija
          </Text>
          <Text style={[styles.subtitle, { color: p.muted }]}>
            A focused AI space for quick, thoughtful work conversations.
          </Text>
          <View style={styles.form}>
            <Field
              label="WORK EMAIL"
              icon="mail-outline"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View>
              <Field
                label="PASSWORD"
                icon="lock-outline"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={hidden}
              />
              <Pressable
                accessibilityLabel={hidden ? "Show password" : "Hide password"}
                onPress={() => setHidden((current) => !current)}
                style={({ pressed }) => [
                  styles.passwordToggle,
                  { opacity: pressed ? 0.65 : 1 },
                ]}
              >
                <MaterialIcons
                  name={hidden ? "visibility" : "visibility-off"}
                  size={20}
                  color={p.muted}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <PrimaryButton
            label={isAuthenticating ? "Signing in…" : "Sign in"}
            icon="arrow-forward"
            onPress={continueToChat}
            disabled={!email.trim() || !password || isAuthenticating}
          />
          {isAuthenticating ? (
            <ActivityIndicator size="small" color={p.accent} />
          ) : (
            <Text style={[styles.note, { color: p.subtle }]}>
              Sign in with your HRMS work account.
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

function Field({
  label,
  icon,
  ...props
}: {
  label: string;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
} & React.ComponentProps<typeof TextInput>) {
  const p = usePalette();
  return (
    <View>
      <Text style={[styles.label, { color: p.muted }]}>{label}</Text>
      <View
        style={[
          styles.inputShell,
          { backgroundColor: p.surface, borderColor: p.border },
        ]}
      >
        <MaterialIcons name={icon} size={19} color={p.muted} />
        <TextInput
          {...props}
          placeholderTextColor={p.subtle}
          returnKeyType="done"
          style={[styles.input, { color: p.text }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, justifyContent: "space-between", padding: 24 },
  content: { paddingTop: 40 },
  mark: {
    width: 64,
    height: 64,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 27,
  },
  title: {
    fontSize: 29,
    lineHeight: 36,
    fontWeight: "900",
    letterSpacing: -0.7,
  },
  subtitle: { fontSize: 15, lineHeight: 22, marginTop: 7, maxWidth: 300 },
  form: { marginTop: 35, gap: 15 },
  label: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "900",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  inputShell: {
    minHeight: 54,
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    minHeight: 52,
    marginLeft: 10,
    fontSize: 15,
    paddingRight: 34,
  },
  passwordToggle: { position: "absolute", right: 15, bottom: 16 },
  bottom: { gap: 15 },
  note: {
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
