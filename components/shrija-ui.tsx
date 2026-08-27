import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import { type ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { type AppTheme } from "@/lib/shrija-domain";
import { useShrija } from "@/lib/shrija-store";

export type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

const palettes = {
  light: {
    background: "#f7eded",
    surface: "#F7F7F8",
    elevated: "#FFFFFF",
    border: "#E5E7EB",
    text: "#171717",
    muted: "#6B7280",
    subtle: "#9CA3AF",
    accent: "#db3f7b",
    accentSoft: "#E8F7F3",
    error: "#E5484D",
    shadow: "rgba(17,24,39,0.08)",
    white: "#FFFFFF",
  },
  dark: {
    background: "#0f0e0e",
    surface: "#2F2F2F",
    elevated: "#292929",
    border: "#444444",
    text: "#F6F6F6",
    muted: "#B4B4B4",
    subtle: "#858585",
    accent: "#977fcf",
    accentSoft: "#2E1B5B",
    error: "#FB7185",
    shadow: "rgba(0,0,0,0.25)",
    white: "#FFFFFF",
  },
  
//   light: {
//   background: "#FFFFFF",
//   surface: "#F7F7F8",
//   elevated: "#FFFFFF",
//   border: "#E5E7EB",
//   text: "#171717",
//   muted: "#6B7280",
//   subtle: "#9CA3AF",

//   accent: "#8B5CF6",
//   accentSoft: "#F0E7FF",

//   error: "#E5484D",
//   shadow: "rgba(17,24,39,0.08)",
//   white: "#FFFFFF",
// },

// dark: {
//   background: "#212121",
//   surface: "#2F2F2F",
//   elevated: "#292929",
//   border: "#444444",

//   text: "#F6F6F6",
//   muted: "#B4B4B4",
//   subtle: "#858585",

//   accent: "#3B82F6",
//   accentSoft: "#172554",

//   error: "#FB7185",
//   shadow: "rgba(0,0,0,0.25)",
//   white: "#FFFFFF",
// },
} as const;

export function usePalette(theme?: AppTheme) {
  const { theme: savedTheme } = useShrija();
  return palettes[theme ?? savedTheme];
}

export function AppScreen({
  children,
  includeBottomInset = false,
}: {
  children: ReactNode;
  includeBottomInset?: boolean;
}) {
  const { theme } = useShrija();
  const p = usePalette(theme);
  return (
    <View style={[styles.root, { backgroundColor: p.background }]}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <SafeAreaView
        edges={
          includeBottomInset
            ? ["top", "right", "bottom", "left"]
            : ["top", "right", "left"]
        }
        style={styles.safe}
      >
        {children}
      </SafeAreaView>
    </View>
  );
}

export function Card({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const p = usePalette();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: p.elevated,
          borderColor: p.border,
          shadowColor: p.shadow,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

// export function Avatar({ size = 40 }: { size?: number }) {
//   const p = usePalette();
//   return (
//     <View
//       style={[
//         styles.avatar,
//         {
//           width: size,
//           height: size,
//           borderRadius: size / 2,
//           backgroundColor: p.accent,
//         },
//       ]}
//     >
//       <Text style={[styles.avatarText, { fontSize: size * 0.34 }]}>PS</Text>
//     </View>
//   );
// }

export function Avatar({
  size = 40,
  initials = "PS",
}: {
  size?: number;
  initials?: string;
}) {
  const p = usePalette();
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: p.accent,
        },
      ]}
    >
      <Text style={[styles.avatarText, { fontSize: size * 0.34 }]}>
        {initials}
      </Text>
    </View>
  );
}

export function IconButton({
  icon,
  label,
  onPress,
  alert = false,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
  alert?: boolean;
}) {
  const p = usePalette();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.iconButton,
        { backgroundColor: p.surface, opacity: pressed ? 0.62 : 1 },
      ]}
    >
      <MaterialIcons name={icon} color={p.text} size={20} />
      {alert ? (
        <View style={[styles.alertDot, { borderColor: p.background }]} />
      ) : null}
    </Pressable>
  );
}

export function PrimaryButton({
  label,
  icon,
  onPress,
  disabled = false,
}: {
  label: string;
  icon?: IconName;
  onPress: () => void;
  disabled?: boolean;
}) {
  const p = usePalette();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        {
          backgroundColor: p.accent,
          opacity: disabled ? 0.45 : pressed ? 0.8 : 1,
        },
      ]}
    >
      {icon ? <MaterialIcons name={icon} color="#FFFFFF" size={18} /> : null}
      <Text style={styles.primaryText}>{label}</Text>
    </Pressable>
  );
}

export function PageHeader({
  title,
  subtitle,
  right,
  onBack,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  onBack?: () => void;
}) {
  const p = usePalette();
  return (
    <View
      style={[
        styles.header,
        { borderBottomColor: p.border, backgroundColor: p.background },
      ]}
    >
      <View style={styles.headerMain}>
        {onBack ? (
          <Pressable
            accessibilityLabel="Go back"
            onPress={onBack}
            style={({ pressed }) => [
              styles.back,
              { backgroundColor: p.surface, opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <MaterialIcons name="arrow-back-ios-new" size={16} color={p.text} />
          </Pressable>
        ) : null}
        <View>
          <Text style={[styles.headerTitle, { color: p.text }]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.headerSub, { color: p.muted }]}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  avatar: { justifyContent: "center", alignItems: "center" },
  avatarText: { color: "#FFFFFF", fontWeight: "800" },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  alertDot: {
    position: "absolute",
    top: 7,
    right: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5484D",
    borderWidth: 2,
  },
  primaryButton: {
    height: 52,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16,
  },
  primaryText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  header: {
    height: 66,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerMain: { flexDirection: "row", alignItems: "center", gap: 10 },
  back: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "800",
    letterSpacing: -0.25,
  },
  headerSub: { fontSize: 11, lineHeight: 15, marginTop: 1 },
});
