import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

import {
  AppScreen,
  Avatar,
  Card,
  PageHeader,
  usePalette,
} from "@/components/shrija-ui";
import { employee } from "@/lib/shrija-domain";
import { haptic } from "@/lib/haptics";
import { useShrija } from "@/lib/shrija-store";

export default function ProfileScreen() {
  const { theme, toggleTheme, signOut, clearConversation } = useShrija();
  const p = usePalette();
  const logOut = () =>
    Alert.alert(
      "Sign out",
      "You can return whenever you are ready to continue chatting.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign out",
          style: "destructive",
          onPress: () => {
            haptic.medium();
            signOut();
            router.replace("/login");
          },
        },
      ],
    );
  const clear = () =>
    Alert.alert(
      "Clear conversation",
      "This removes messages saved on this device.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            clearConversation();
            haptic.success();
            router.replace("/(tabs)");
          },
        },
      ],
    );
  return (
    <AppScreen>
      <PageHeader title="Profile" subtitle="Your Shrija space" />
      <ScrollView
        contentContainerStyle={[styles.content, { backgroundColor: p.surface }]}
      >
        <Card style={styles.profileCard}>
          <View style={styles.identity}>
            <Avatar size={62} />
            <View>
              <Text style={[styles.name, { color: p.text }]}>
                {employee.name}
              </Text>
              <Text style={[styles.role, { color: p.muted }]}>
                {employee.role}
              </Text>
              <Text style={[styles.email, { color: p.subtle }]}>
                {employee.email}
              </Text>
            </View>
          </View>
        </Card>
        <Text style={[styles.section, { color: p.muted }]}>PREFERENCES</Text>
        <Card style={styles.menuCard}>
          <MenuRow
            icon="notifications-none"
            label="Notifications"
            onPress={() => router.push("/notifications")}
          />
          <View style={[styles.menuRow, { borderBottomColor: p.border }]}>
            <View style={[styles.menuIcon, { backgroundColor: p.accentSoft }]}>
              <MaterialIcons
                name={theme === "dark" ? "dark-mode" : "light-mode"}
                size={19}
                color={p.accent}
              />
            </View>
            <Text style={[styles.menuLabel, { color: p.text }]}>
              {theme === "dark" ? "Dark appearance" : "Light appearance"}
            </Text>
            <Switch
              value={theme === "dark"}
              onValueChange={() => {
                haptic.selection();
                toggleTheme();
              }}
              trackColor={{ false: p.border, true: p.accent }}
              thumbColor="#FFFFFF"
            />
          </View>
          <MenuRow
            icon="delete-outline"
            label="Clear conversation"
            onPress={clear}
          />
          <MenuRow
            icon="logout"
            label="Sign out"
            destructive
            onPress={logOut}
            last
          />
        </Card>
        <Text style={[styles.footer, { color: p.subtle }]}>
          Ready for secure connection to your existing backend.
        </Text>
      </ScrollView>
    </AppScreen>
  );
}

function MenuRow({
  icon,
  label,
  onPress,
  destructive = false,
  last = false,
}: {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  label: string;
  onPress: () => void;
  destructive?: boolean;
  last?: boolean;
}) {
  const p = usePalette();
  const color = destructive ? p.error : p.accent;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.menuRow,
        {
          opacity: pressed ? 0.62 : 1,
          borderBottomColor: p.border,
          borderBottomWidth: last ? 0 : StyleSheet.hairlineWidth,
        },
      ]}
    >
      <View
        style={[
          styles.menuIcon,
          { backgroundColor: destructive ? `${p.error}18` : p.accentSoft },
        ]}
      >
        <MaterialIcons name={icon} size={19} color={color} />
      </View>
      <Text
        style={[styles.menuLabel, { color: destructive ? p.error : p.text }]}
      >
        {label}
      </Text>
      {!destructive ? (
        <MaterialIcons name="arrow-forward-ios" size={15} color={p.subtle} />
      ) : null}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  content: { flexGrow: 1, padding: 16, paddingBottom: 28 },
  profileCard: { marginBottom: 23 },
  identity: { flexDirection: "row", alignItems: "center", gap: 14 },
  name: { fontSize: 18, lineHeight: 24, fontWeight: "900" },
  role: { fontSize: 13, lineHeight: 18, marginTop: 2 },
  email: { fontSize: 11, lineHeight: 16, marginTop: 4 },
  section: {
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 0.8,
    fontWeight: "900",
    marginBottom: 8,
    marginLeft: 4,
  },
  menuCard: { padding: 0, overflow: "hidden" },
  menuRow: {
    minHeight: 65,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: { flex: 1, fontSize: 14, lineHeight: 19, fontWeight: "700" },
  footer: {
    textAlign: "center",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 20,
    paddingHorizontal: 30,
  },
});
