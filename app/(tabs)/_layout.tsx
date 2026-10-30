import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
          title: t("tabs.home"),
          tabBarLabel: ({ focused }) => (
            <TabLabel label={t("tabs.home")} focused={focused} />
          ),
          tabBarIcon: ({ color }) => (
            <TabIcon glyph="💧" color={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: t("tabs.history"),
          tabBarLabel: ({ focused }) => (
            <TabLabel label={t("tabs.history")} focused={focused} />
          ),
          tabBarIcon: ({ color }) => (
            <TabIcon glyph="📊" color={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("tabs.settings"),
          tabBarLabel: ({ focused }) => (
            <TabLabel label={t("tabs.settings")} focused={focused} />
          ),
          tabBarIcon: ({ color }) => (
            <TabIcon glyph="⚙️" color={String(color)} />
          ),
        }}
      />
    </Tabs>
  );
}
