import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { usePalette } from "@/components/shrija-ui";

export type ShrijaAttachment = {
  uri: string;
  name: string;
  type: "image" | "document";
  mimeType?: string | null;
  size?: number | null;
};

type ShrijaComposerProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onMicPress: () => void;

  attachment: ShrijaAttachment[];
  onAttachPress: () => void;
  onRemoveAttachment: (index: number) => void;
};

export default function ShrijaComposer({
  value,
  onChangeText,
  onSend,
  onMicPress,
  attachment,
  onAttachPress,
  onRemoveAttachment,
}: ShrijaComposerProps) {
  const p = usePalette();

  const hasText = value.trim().length > 0 || attachment.length > 0;

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
      {attachment.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.attachmentScroll}
          contentContainerStyle={styles.attachmentScrollContent}
        >
          {attachment.map((attachment, index) => (
            <View
              key={`${attachment.uri}-${index}`}
              style={[
                styles.attachmentCard,
                {
                  backgroundColor: p.surface,
                  borderColor: p.border,
                },
              ]}
            >
              {attachment.type === "image" ? (
                <Image
                  source={{ uri: attachment.uri }}
                  style={styles.attachmentImageLarge}
                />
              ) : (
                <View
                  style={[
                    styles.documentIconLarge,
                    {
                      backgroundColor: p.accentSoft,
                    },
                  ]}
                >
                  <MaterialIcons
                    name="description"
                    size={26}
                    color={p.accent}
                  />
                </View>
              )}

              <Text
                numberOfLines={1}
                style={[styles.attachmentNameSmall, { color: p.text }]}
              >
                {attachment.name}
              </Text>

              <Pressable
                onPress={() => onRemoveAttachment(index)}
                style={styles.removeButton}
              >
                <MaterialIcons name="close" size={16} color="#FFFFFF" />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      ) : null}

      <View
        style={[
          styles.composer,
          {
            backgroundColor: p.surface,
            borderColor: p.border,
          },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Attach file"
          onPress={onAttachPress}
          style={({ pressed }) => [
            styles.attachButton,
            {
              // backgroundColor: p.accentSoft,
              opacity: pressed ? 0.55 : 1,
            },
          ]}
        >
          <MaterialIcons name="add" size={21} color="#FFFFFF" />
        </Pressable>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Ask Shrija anything..."
          placeholderTextColor={p.subtle}
          multiline
          // maxLength={4000}
          blurOnSubmit={false}
          style={[styles.input, { color: p.text }]}
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
          <MaterialIcons name="mic-none" size={23} color={p.muted} />
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
              backgroundColor: hasText ? p.accent : p.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <MaterialIcons name="arrow-upward" size={21} color="#FFFFFF" />
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

  // attachmentContainer: {
  //   maxHeight: 220,
  //   marginBottom: 8,
  // },

  // attachmentPreview: {
  //   minHeight: 64,
  //   borderRadius: 14,
  //   borderWidth: 1,
  //   marginBottom: 6,
  //   padding: 8,
  //   flexDirection: "row",
  //   alignItems: "center",
  // },

  // attachmentImage: {
  //   width: 48,
  //   height: 48,
  //   borderRadius: 10,
  // },

  // documentIcon: {
  //   width: 48,
  //   height: 48,
  //   borderRadius: 10,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },

  // attachmentInfo: {
  //   flex: 1,
  //   marginLeft: 10,
  //   marginRight: 8,
  // },

  // attachmentName: {
  //   fontSize: 13,
  //   fontWeight: "700",
  // },

  // attachmentType: {
  //   fontSize: 11,
  //   marginTop: 3,
  // },

  // removeAttachment: {
  //   width: 34,
  //   height: 34,
  //   borderRadius: 17,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },

  attachmentScroll: {
    marginBottom: 8,
  },

  attachmentScrollContent: {
    paddingHorizontal: 2,
    gap: 8,
  },

  attachmentCard: {
    width: 92,
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    padding: 6,
    position: "relative",
  },

  attachmentImageLarge: {
    width: "100%",
    height: 60,
    borderRadius: 8,
  },

  documentIconLarge: {
    width: "100%",
    height: 60,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  attachmentNameSmall: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 4,
  },

  removeButton: {
    position: "absolute",
    top: 3,
    right: 3,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.65)",
    alignItems: "center",
    justifyContent: "center",
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

  attachButton: {
    width: 42,
    height: 42,
    // borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
    marginBottom: 1,
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
    borderRadius: 20,
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
