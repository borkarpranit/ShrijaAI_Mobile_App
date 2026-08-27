import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { usePalette } from "@/components/shrija-ui";

type ShrijaComposerProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onMicPress: () => void;
};

export default function ShrijaComposer({
  value,
  onChangeText,
  onSend,
  onMicPress,
}: ShrijaComposerProps) {
  const p = usePalette();

  const hasText = value.trim().length > 0;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: p.background,
          borderTopColor: p.border,
        },
      ]}
    >
      <View
        style={[
          styles.composer,
          {
            backgroundColor: p.surface,
            borderColor: p.border,
          },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Ask Shrija anything..."
          placeholderTextColor={p.subtle}
          multiline
          // maxLength={4000}
          blurOnSubmit={false}
          style={[
            styles.input,
            { color: p.text },
          ]}
        />

        {/* Microphone */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voice input"
          onPress={onMicPress}
          style={({ pressed }) => [
            styles.iconButton,
            {
              opacity: pressed ? 0.55 : 1,
            },
          ]}
        >
          <MaterialIcons
            name="mic-none"
            size={23}
            color={p.muted}
          />
        </Pressable>

        {/* Send */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Send message"
          disabled={!hasText}
          onPress={onSend}
          style={({ pressed }) => [
            styles.sendButton,
            {
              backgroundColor: hasText
                ? p.accent
                : p.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <MaterialIcons
            name="arrow-upward"
            size={21}
            color="#FFFFFF"
          />
        </Pressable>
      </View>

      {/* <TextInput
        editable={false}
        value="Shrija may make mistakes. Verify important information."
        style={[
          styles.disclaimer,
          { color: p.subtle },
        ]}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 45,
    // borderTopWidth: StyleSheet.hairlineWidth,
  },

  composer: {
    minHeight: 52,
    maxHeight: 130,
    borderRadius: 25,
    // borderWidth: 1,
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "flex-end",
  },

  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    fontSize: 15,
    lineHeight: 21,
    paddingTop: 9,
    paddingBottom: 8,
  },

  iconButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },

  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  // disclaimer: {
  //   fontSize: 9,
  //   lineHeight: 13,
  //   textAlign: "center",
  //   marginTop: 6,
  // },
});