import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  Avatar,
  usePalette,
} from "@/components/shrija-ui";

type ShrijaChatHeaderProps = {
  onMenu: () => void;
  onNotification: () => void;
  onProfile: () => void;
};

export default function ShrijaChatHeader({
  onMenu,
  onNotification,
  onProfile,
}: ShrijaChatHeaderProps) {
  const p = usePalette();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: p.background,
          borderBottomColor: p.border,
        },
      ]}
    >
      <View style={styles.left}>
        <Pressable
          onPress={onMenu}
          style={({ pressed }) => [
            styles.menu,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <MaterialIcons
            name="menu"
            size={23}
            color={p.muted}
          />
        </Pressable>

        <View
          style={[
            styles.logo,
            { backgroundColor: p.accent },
          ]}
        >
          <MaterialIcons
            name="auto-awesome"
            size={17}
            color="#FFFFFF"
          />
        </View>

        <View>
          <Text
            style={[
              styles.title,
              { color: p.text },
            ]}
          >
            Shrija AI
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: p.subtle },
            ]}
          >
            Your AI work companion
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={onNotification}
          style={[
            styles.actionButton,
            {
              backgroundColor: p.surface,
              borderColor: p.border,
            },
          ]}
        >
          <MaterialIcons
            name="notifications-none"
            size={21}
            color={p.text}
          />

          <View
            style={[
              styles.notificationDot,
              { backgroundColor: p.error },
            ]}
          />
        </Pressable>

        <Pressable
          onPress={onProfile}
          style={({ pressed }) => [
            styles.avatarButton,
            { opacity: pressed ? 0.65 : 1 },
          ]}
        >
          <Avatar size={36} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 62,
    paddingHorizontal: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  menu: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 34,
    height: 34,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 15,
    fontWeight: "900",
  },

  subtitle: {
    fontSize: 10,
    marginTop: 1,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  actionButton: {
    width: 39,
    height: 39,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  notificationDot: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
    top: 7,
    right: 7,
  },

  avatarButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});