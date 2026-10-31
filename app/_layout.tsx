import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";

import { HydrateProvider, useHydrate } from "@/data";
import { LocaleProvider, useLocale } from "@/i18n";
import { ReminderSync } from "@/notifications";
import { FontProvider, ThemeProvider, useTheme } from "@/theme";

function RootNavigator() {
  const { colors, isDark, isReady: themeReady } = useTheme();
  const { isReady: localeReady } = useLocale();
  const { isReady: hydrateReady, profile } = useHydrate();

  if (!themeReady || !localeReady || !hydrateReady) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "fade",
        }}
      >
        <Stack.Protected guard={!profile.onboarded}>
          <Stack.Screen name="onboarding" />
        </Stack.Protected>
        <Stack.Protected guard={profile.onboarded}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <FontProvider>
      <ThemeProvider>
        <LocaleProvider>
          <HydrateProvider>
            <ReminderSync />
            <RootNavigator />
          </HydrateProvider>
        </LocaleProvider>
      </ThemeProvider>
    </FontProvider>
  );
}
