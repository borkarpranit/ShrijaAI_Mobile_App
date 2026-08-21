import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  AppScreen,
  Avatar,
  IconButton,
  usePalette,
} from "@/components/shrija-ui";
import { haptic } from "@/lib/haptics";
import { type ChatMessage } from "@/lib/shrija-domain";
import { useShrija } from "@/lib/shrija-store";

const starters = [
  "Explain our leave policy",
  "Help write a work update",
  "What can you help with?",
];

export default function ShrijaChatScreen() {
  const { messages, sendMessage, clearConversation } = useShrija();
  const p = usePalette();
  const [input, setInput] = useState("");
  const list = useRef<FlatList<ChatMessage>>(null);

  useEffect(() => {
    requestAnimationFrame(() => list.current?.scrollToEnd({ animated: true }));
  }, [messages.length]);

  useEffect(() => {
    const subscription = Keyboard.addListener("keyboardDidShow", () => {
      setTimeout(() => {
        list.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const submit = (value = input) => {
    if (!value.trim()) return;
    haptic.light();
    sendMessage(value);
    setInput("");
  };
  const newChat = () => {
    haptic.selection();
    clearConversation();
  };

  return (
    <AppScreen>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={0}
        style={styles.screen}
      >
        <View
          style={[
            styles.header,
            { borderBottomColor: p.border, backgroundColor: p.background },
          ]}
        >
          <View style={styles.brandRow}>
            <View style={[styles.mark, { backgroundColor: p.accent }]}>
              <MaterialIcons name="auto-awesome" size={18} color="#FFFFFF" />
            </View>
            <View>
              <Text style={[styles.title, { color: p.text }]}>Shrija AI</Text>
              <View style={styles.statusRow}>
                <View style={[styles.status, { backgroundColor: p.accent }]} />
                <Text style={[styles.statusText, { color: p.muted }]}>
                  Always here to help
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.headerActions}>
            <IconButton
              icon="add-comment"
              label="Start a new chat"
              onPress={newChat}
            />
            <IconButton
              icon="notifications-none"
              label="Notifications"
              alert
              onPress={() => router.push("/notifications")}
            />
            <Pressable
              onPress={() => router.push("/(tabs)/profile")}
              style={({ pressed }) => ({ opacity: pressed ? 0.65 : 1 })}
            >
              <Avatar size={39} />
            </Pressable>
          </View>
        </View>
        <FlatList
          ref={list}
          data={messages}
          keyboardShouldPersistTaps="handled"
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Message item={item} />}
          contentContainerStyle={[
            styles.list,
            { backgroundColor: p.background },
          ]}
          ListHeaderComponent={
            messages.length <= 1 ? (
              <View style={styles.starters}>
                {starters.map((starter) => (
                  <Pressable
                    key={starter}
                    onPress={() => submit(starter)}
                    style={({ pressed }) => [
                      styles.starter,
                      {
                        backgroundColor: p.surface,
                        borderColor: p.border,
                        opacity: pressed ? 0.62 : 1,
                      },
                    ]}
                  >
                    <Text style={[styles.starterText, { color: p.text }]}>
                      {starter}
                    </Text>
                    <MaterialIcons
                      name="north-east"
                      size={16}
                      color={p.muted}
                    />
                  </Pressable>
                ))}
              </View>
            ) : null
          }
        />
        <View
          style={[
            styles.composerArea,
            { backgroundColor: p.background, borderTopColor: p.border },
          ]}
        >
          <View
            style={[
              styles.composer,
              { backgroundColor: p.surface, borderColor: p.border },
            ]}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              onSubmitEditing={() => submit()}
              multiline
              blurOnSubmit={false}
              placeholder="Message Shrija…"
              placeholderTextColor={p.subtle}
              returnKeyType="send"
              style={[styles.input, { color: p.text }]}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Send message"
              onPress={() => submit()}
              style={({ pressed }) => [
                styles.send,
                {
                  backgroundColor: input.trim() ? p.accent : p.border,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <MaterialIcons name="arrow-upward" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
          <Text style={[styles.disclaimer, { color: p.subtle }]}>
            Shrija can make mistakes. Verify important information.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

function Message({ item }: { item: ChatMessage }) {
  const p = usePalette();
  const isUser = item.role === "user";
  return (
    <View
      style={[
        styles.messageRow,
        { justifyContent: isUser ? "flex-end" : "flex-start" },
      ]}
    >
      {!isUser ? (
        <View style={[styles.assistantIcon, { backgroundColor: p.accent }]}>
          <MaterialIcons name="auto-awesome" size={14} color="#FFFFFF" />
        </View>
      ) : null}
      <View
        style={[
          styles.message,
          {
            backgroundColor: isUser ? p.accent : p.surface,
            borderColor: isUser ? p.accent : p.border,
          },
        ]}
      >
        <Text
          style={[styles.messageText, { color: isUser ? "#FFFFFF" : p.text }]}
        >
          {item.text}
        </Text>
        <Text
          style={[
            styles.messageTime,
            { color: isUser ? "rgba(255,255,255,0.72)" : p.subtle },
          ]}
        >
          {item.createdAt}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    minHeight: 69,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  mark: {
    width: 39,
    height: 39,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 2,
  },
  status: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, lineHeight: 14 },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 7 },
  list: { flexGrow: 1, paddingHorizontal: 16, paddingVertical: 18, gap: 15 },
  starters: { gap: 9, marginTop: 4 },
  starter: {
    minHeight: 50,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  starterText: { fontSize: 13, lineHeight: 18, fontWeight: "700" },
  messageRow: { flexDirection: "row", alignItems: "flex-end", gap: 8 },
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
  messageText: { fontSize: 15, lineHeight: 22 },
  messageTime: {
    alignSelf: "flex-end",
    fontSize: 10,
    lineHeight: 13,
    marginTop: 6,
  },
  composerArea: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  composer: {
    borderWidth: 1,
    minHeight: 52,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingLeft: 14,
    paddingRight: 5,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 104,
    fontSize: 15,
    lineHeight: 21,
    paddingTop: 9,
    paddingBottom: 8,
  },
  send: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 7,
  },
  disclaimer: {
    fontSize: 10,
    lineHeight: 14,
    textAlign: "center",
    marginTop: 7,
  },
});
