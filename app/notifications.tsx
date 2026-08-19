import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen, PageHeader, usePalette } from "@/components/shrija-ui";
import { haptic } from "@/lib/haptics";
import { notifications } from "@/lib/shrija-domain";

export default function NotificationsScreen() {
  const p = usePalette();
  return <AppScreen><PageHeader title="Notifications" subtitle="Updates from Shrija" onBack={() => router.back()} /><FlatList data={notifications} keyExtractor={(item) => item.id} contentContainerStyle={[styles.list, { backgroundColor: p.surface }]} renderItem={({ item }) => <Pressable accessibilityRole="button" accessibilityLabel={`Open ${item.title}`} onPress={() => { haptic.light(); Alert.alert(item.title, item.body); }} style={({ pressed }) => [styles.item, { backgroundColor: p.background, borderColor: item.unread ? `${p.accent}55` : p.border, opacity: pressed ? 0.66 : 1 }]}><View style={[styles.icon, { backgroundColor: p.accentSoft }]}><MaterialIcons name={item.icon} size={19} color={p.accent} /></View><View style={styles.copy}><View style={styles.titleRow}><Text style={[styles.title, { color: p.text }]}>{item.title}</Text>{item.unread ? <View style={[styles.dot, { backgroundColor: p.accent }]} /> : null}</View><Text style={[styles.body, { color: p.muted }]}>{item.body}</Text><Text style={[styles.time, { color: p.subtle }]}>{item.time}</Text></View></Pressable>} ItemSeparatorComponent={() => <View style={{ height: 9 }} />} /></AppScreen>;
}

const styles = StyleSheet.create({ list: { padding: 16, paddingBottom: 28 }, item: { borderWidth: 1, borderRadius: 16, padding: 14, flexDirection: "row", gap: 12 }, icon: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center" }, copy: { flex: 1 }, titleRow: { flexDirection: "row", alignItems: "center", gap: 7 }, title: { flex: 1, fontSize: 14, lineHeight: 19, fontWeight: "900" }, dot: { width: 7, height: 7, borderRadius: 4 }, body: { fontSize: 12, lineHeight: 18, marginTop: 4 }, time: { fontSize: 10, lineHeight: 14, marginTop: 6 } });
