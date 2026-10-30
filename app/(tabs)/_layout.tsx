import { Tabs } from "expo-router";

import { AppText } from "@/components/AppText";
import { useTheme } from "@/theme";

function TabLabel({ label, focused }: { label: string; focused: boolean }) {
  return (
    <AppText variant="caption" color={focused ? "primary" : "muted"}>
      {label}
    </AppText>
  );
}

function TabIcon({ glyph, color }: { glyph: string; color: string }) {
  return (
    <AppText variant="body" style={{ color, fontSize: 18 }}>
      {glyph}
    </AppText>
  );
}

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Home" focused={focused} />
          ),
          tabBarIcon: ({ color }) => (
            <TabIcon glyph="💧" color={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarLabel: ({ focused }) => (
            <TabLabel label="History" focused={focused} />
          ),
          tabBarIcon: ({ color }) => (
            <TabIcon glyph="📊" color={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Settings" focused={focused} />
          ),
          tabBarIcon: ({ color }) => (
            <TabIcon glyph="⚙️" color={String(color)} />
          ),
        }}
      />
    </Tabs>
  );
}
