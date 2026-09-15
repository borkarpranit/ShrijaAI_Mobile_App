import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Avatar, usePalette } from "@/components/shrija-ui";

type ShrijaSidebarProps = {
  onNewChat: () => void;
  onClose?: () => void;
  onProfile: () => void;
};

const todayChats = [
  "Leave policy overview",
  "Q2 performance report",
];

const yesterdayChats = [
  "Expense reimbursement",
  "Team meeting agenda",
];

const olderChats = [
  "Payslip clarification",
];

export default function ShrijaSidebar({
  onNewChat,
  onClose,
  onProfile,
}: ShrijaSidebarProps) {
  const p = usePalette();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: p.background,
          // borderRightColor: p.border,
        },
      ]}
    >
      {/* Top area */}
      <View style={styles.top}>
        <Pressable
          accessibilityLabel="Close sidebar"
          onPress={onClose}
          style={({ pressed }) => [
            styles.menuButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <MaterialIcons
            name="menu"
            size={23}
            color={p.muted}
          />
        </Pressable>

        <Pressable
          onPress={onNewChat}
          style={({ pressed }) => [
            styles.newChatButton,
            {
              borderColor: p.border,
              opacity: pressed ? 0.65 : 1,
            },
          ]}
        >
          <MaterialIcons
            name="auto-awesome"
            size={15}
            color={p.accent}
          />

          <Text
            style={[
              styles.newChatText,
              { color: p.text },
            ]}
          >
            New chat
          </Text>
        </Pressable>
      </View>

      {/* Brand */}
      <View style={styles.brand}>
        <View
          style={[
            styles.brandIcon,
            { backgroundColor: p.accent },
          ]}
        >
          <MaterialIcons
            name="auto-awesome"
            size={17}
            color="#FFFFFF"
          />
        </View>

        <Text
          style={[
            styles.brandText,
            { color: p.text },
          ]}
        >
          Shrija AI
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatList}
      >
        <ChatSection
          title="TODAY"
          chats={todayChats}
          onSelect={() => {}}
        />

        <ChatSection
          title="YESTERDAY"
          chats={yesterdayChats}
          onSelect={() => {}}
        />

        <ChatSection
          title="23 JUL"
          chats={olderChats}
          onSelect={() => {}}
        />
      </ScrollView>

      {/* User profile */}
      <Pressable
        onPress={onProfile}
        style={({ pressed }) => [
          styles.profile,
          {
            borderTopColor: p.border,
            opacity: pressed ? 0.65 : 1,
          },
        ]}
      >
        <Avatar size={36} />

        <View style={styles.profileInfo}>
          <Text
            numberOfLines={1}
            style={[
              styles.profileName,
              { color: p.text },
            ]}
          >
            Priya Sharma
          </Text>

          <Text
            numberOfLines={1}
            style={[
              styles.profileEmail,
              { color: p.subtle },
            ]}
          >
            priya.sharma@adk.com
          </Text>
        </View>

        <MaterialIcons
          name="more-horiz"
          size={21}
          color={p.subtle}
        />
      </Pressable>
    </View>
  );
}

function ChatSection({
  title,
  chats,
  onSelect,
}: {
  title: string;
  chats: string[];
  onSelect: (chat: string) => void;
}) {
  const p = usePalette();

  return (
    <View style={styles.section}>
      <Text
        style={[
          styles.sectionTitle,
          { color: p.subtle },
        ]}
      >
        {title}
      </Text>

      {chats.map((chat) => (
        <Pressable
          key={chat}
          onPress={() => onSelect(chat)}
          style={({ pressed }) => [
            styles.chatItem,
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          <MaterialIcons
            name="chat-bubble"
            size={14}
            color={p.muted}
          />

          <Text
            numberOfLines={1}
            style={[
              styles.chatText,
              { color: p.text },
            ]}
          >
            {chat}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: 260,
    width: 160,
    borderRightWidth: StyleSheet.hairlineWidth,
  },

  top: {
    height: 50,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
  },

  menuButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  newChatButton: {
    height: 40,
    borderRadius: 20,
    // borderWidth: 1,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  newChatText: {
    fontSize: 13,
    fontWeight: "700",
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 17,
    gap: 10,
  },

  brandIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  brandText: {
    fontSize: 16,
    fontWeight: "900",
  },

  chatList: {
    paddingHorizontal: 13,
    paddingBottom: 10,
  },

  section: {
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginHorizontal: 8,
    marginBottom: 7,
  },

  chatItem: {
    minHeight: 28,
    paddingHorizontal: 8,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  chatText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "300",
  },

  profile: {
    minHeight: 65,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  profileInfo: {
    flex: 1,
  },

  profileName: {
    fontSize: 13,
    fontWeight: "800",
  },

  profileEmail: {
    fontSize: 10,
    marginTop: 4,
  },
});