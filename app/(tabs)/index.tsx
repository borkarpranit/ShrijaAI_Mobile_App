import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { AppScreen, usePalette } from "@/components/shrija-ui";

import ShrijaSidebar from "@/components/shrija-sidebar";
import ShrijaChatHeader from "@/components/shrija-chat-header";
import ShrijaWelcome from "@/components/shrija-welcome";
import ShrijaSuggestions from "@/components/shrija-suggestions";
import ShrijaComposer from "@/components/shrija-chat-composer";
import ShrijaChatMessage from "@/components/shrija-chat-message";

import { haptic } from "@/lib/haptics";
import { type ChatMessage } from "@/lib/shrija-domain";

import { useShrija } from "@/lib/shrija-store";

export default function ShrijaChatScreen() {
  const { messages, sendMessage, clearConversation } = useShrija();

  const p = usePalette();

  const [input, setInput] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const list = useRef<FlatList<ChatMessage>>(null);

  const isLargeScreen = Dimensions.get("window").width >= 900;

  // useEffect(() => {
  //   requestAnimationFrame(() => {
  //     list.current?.scrollToEnd({
  //       animated: true,
  //     });
  //   });
  // }, [messages.length]);
  useEffect(() => {
  const timer = setTimeout(() => {
    list.current?.scrollToEnd({
      animated: true,
    });
  }, 100);

  return () => clearTimeout(timer);
}, [messages.length]);

  useEffect(() => {
    const subscription = Keyboard.addListener("keyboardDidShow", () => {
      setTimeout(() => {
        list.current?.scrollToEnd({
          animated: true,
        });
      }, 250);
    });

    return () => subscription.remove();
  }, []);

  const submit = (value = input) => {
    if (!value.trim()) return;

    haptic.light();

    sendMessage(value);

    setInput("");

    setTimeout(() => {
      list.current?.scrollToEnd({
        animated: true,
      });
    }, 100);
  };

  const newChat = () => {
    haptic.selection();

    clearConversation();

    setInput("");

    setSidebarVisible(false);
  };

  const handleMicPress = () => {
    /*
     * Voice recognition will be connected here later.
     *
     * DO NOT import expo-speech-recognition here yet.
     *
     * For now this is only a UI placeholder.
     */

    Alert.alert(
      "Voice input",
      "Microphone integration will be connected next.",
    );
  };

  const openProfile = () => {
    setSidebarVisible(false);

    router.push("/(tabs)/profile");
  };

  const openNotifications = () => {
    router.push("/notifications");
  };

  const content = (
    <View style={[styles.main, { backgroundColor: p.background }]}>
      <ShrijaChatHeader
        onMenu={() => setSidebarVisible(true)}
        onNotification={openNotifications}
        onProfile={openProfile}
      />

      <KeyboardAvoidingView
        style={styles.chatArea}
        behavior="padding"
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        {/* <View style={styles.chatArea}> */}
        <FlatList
          ref={list}
          data={messages}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          // keyboardDismissMode={
          //   Platform.OS === "ios" ? "interactive" : "on-drag"
          // }
          // keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ShrijaChatMessage item={item} />}
          ListHeaderComponent={
            messages.length <= 1 ? (
              <View>
                <ShrijaWelcome />

                <ShrijaSuggestions onSelect={(text) => submit(text)} />
              </View>
            ) : null
          }
          contentContainerStyle={styles.messageList}
        />

        <ShrijaComposer
          value={input}
          onChangeText={setInput}
          onSend={() => submit()}
          onMicPress={handleMicPress}
        />
        {/* </View> */}
      </KeyboardAvoidingView>
    </View>
  );

  /*
   * Large screen:
   *
   * Sidebar permanently visible.
   *
   * Mobile:
   *
   * Sidebar appears as drawer when hamburger is pressed.
   */

  if (isLargeScreen) {
    return (
      <AppScreen>
        <View style={styles.desktop}>
          <ShrijaSidebar onNewChat={newChat} onProfile={openProfile} />

          {content}
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      {content}

      <Modal
        visible={sidebarVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setSidebarVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ShrijaSidebar
            onNewChat={newChat}
            onClose={() => setSidebarVisible(false)}
            onProfile={openProfile}
          />

          <Pressable
            style={styles.overlay}
            onPress={() => setSidebarVisible(false)}
          />
        </View>
      </Modal>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  desktop: {
    flex: 1,
    flexDirection: "row",
  },

  main: {
    flex: 1,
  },

  chatArea: {
    flex: 1,
  },

  messageList: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },

  modalContainer: {
    flex: 1,
    flexDirection: "row",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
});
