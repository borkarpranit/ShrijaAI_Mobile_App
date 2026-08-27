import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { usePalette } from "@/components/shrija-ui";

const suggestions = [
  {
    title: "Summarise leave policy",
    icon: "description" as const,
  },
  {
    title: "Draft a work update",
    icon: "edit" as const,
  },
  {
    title: "Analyse my performance",
    icon: "bar-chart" as const,
  },
];

type ShrijaSuggestionsProps = {
  onSelect: (text: string) => void;
};

export default function ShrijaSuggestions({
  onSelect,
}: ShrijaSuggestionsProps) {
  const p = usePalette();

  return (
    <View style={styles.container}>
      {suggestions.map((item) => (
        <Pressable
          key={item.title}
          onPress={() => onSelect(item.title)}
          style={({ pressed }) => [
            styles.card,
            {
              backgroundColor: p.surface,
              borderColor: p.border,
              opacity: pressed ? 0.65 : 1,
            },
          ]}
        >
          <Text
            numberOfLines={2}
            style={[
              styles.title,
              { color: p.muted },
            ]}
          >
            {item.title}
          </Text>

          <View
            style={[
              styles.icon,
              { backgroundColor: p.accentSoft },
            ]}
          >
            <MaterialIcons
              name={item.icon}
              size={20}
              color={p.accent}
            />
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 14,
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },

  card: {
    flex: 1,
    minHeight: 102,
    borderRadius: 15,
    borderWidth: 1,
    padding: 14,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700",
  },

  icon: {
    alignSelf: "flex-end",
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
});