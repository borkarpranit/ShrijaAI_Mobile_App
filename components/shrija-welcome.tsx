import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, Text, View } from "react-native";

import { usePalette } from "@/components/shrija-ui";
import { displayName } from "@/lib/shrija-domain";
import { useShrija } from "@/lib/shrija-store";

export default function ShrijaWelcome() {
  const p = usePalette();
  const { user } = useShrija();

  const hour = new Date().getHours();

  let greeting = "Good evening";

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 17) {
    greeting = "Good afternoon";
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.icon,
          { backgroundColor: p.accent },
        ]}
      >
        <MaterialIcons
          name="auto-awesome"
          size={35}
          color="#FFFFFF"
        />
      </View>

      <Text style={[styles.title, { color: p.text }]}>
        {greeting},{" "}
        <Text style={{ color: p.accent }}>
          {displayName(user)}.
        </Text>
      </Text>

      <Text
        style={[
          styles.subtitle,
          { color: p.muted },
        ]}
      >
        How can I help you today?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 20,
  },

  icon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  title: {
    textAlign: "center",
    fontSize: 29,
    lineHeight: 36,
    fontWeight: "900",
    letterSpacing: -0.7,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 23,
    marginTop: 7,
    textAlign: "center",
  },
});