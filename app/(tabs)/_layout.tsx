// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// import { usePalette } from "@/components/shrija-ui";

export default function TabLayout() {
  // const p = usePalette();
  // const insets = useSafeAreaInsets();

  return (
    // <Tabs
    //   screenOptions={{
    //     headerShown: false,
    //     tabBarHideOnKeyboard: true,

    //     tabBarActiveTintColor: p.accent,
    //     tabBarInactiveTintColor: p.subtle,

    //     tabBarStyle: {
    //       backgroundColor: p.background,
    //       borderTopColor: p.border,
    //       height: 58 + Math.max(insets.bottom, 8),
    //       paddingTop: 7,
    //       paddingBottom: Math.max(insets.bottom, 8),
    //     },

    //     tabBarLabelStyle: {
    //       fontSize: 11,
    //       fontWeight: "700",
    //     },
    //   }}
    // >
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shrija AI",
          // tabBarIcon: ({ color }) => (
          //   <MaterialIcons
          //     name="auto-awesome"
          //     size={23}
          //     color={color}
          //   />
          // ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          // tabBarIcon: ({ color }) => (
          //   <MaterialIcons
          //     name="person-outline"
          //     size={24}
          //     color={color}
          //   />
          // ),
        }}
      />
    </Tabs>
  );
}