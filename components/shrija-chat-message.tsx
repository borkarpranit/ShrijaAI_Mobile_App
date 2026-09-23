import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, Text, View } from "react-native";

import { usePalette } from "@/components/shrija-ui";
import { type ChatMessage } from "@/lib/shrija-domain";

export default function ShrijaChatMessage({
  item,
}: {
  item: ChatMessage;
}) {
  const p = usePalette();

  const isUser = item.role === "user";

  return (
    <View
      style={[
        styles.row,
        {
          justifyContent: isUser
            ? "flex-end"
            : "flex-start",
        },
      ]}
    >
      {!isUser && (
        <View
          style={[
            styles.assistantIcon,
            { backgroundColor: p.accent },
          ]}
        >
          <MaterialIcons
            name="auto-awesome"
            size={14}
            color="#FFFFFF"
          />
        </View>
      )}

      <View
        style={[
          styles.message,
          {
            backgroundColor: isUser
              ? p.accent
              : p.surface,
            borderColor: isUser
              ? p.accent
              : p.border,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: isUser
                ? "#FFFFFF"
                : p.text,
            },
          ]}
        >
          {item.text}
        </Text>

        <Text
          style={[
            styles.time,
            {
              color: isUser
                ? "rgba(255,255,255,0.7)"
                : p.subtle,
            },
          ]}
        >
          {item.createdAt}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginBottom: 13,
  },

  assistantIcon: {
    width: 29,
    height: 29,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 3,
  },

  message: {
    maxWidth: "82%",
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingTop: 11,
    paddingBottom: 8,
  },

  text: {
    fontSize: 15,
    lineHeight: 22,
  },

  time: {
    alignSelf: "flex-end",
    fontSize: 10,
    lineHeight: 13,
    marginTop: 6,
  },
});