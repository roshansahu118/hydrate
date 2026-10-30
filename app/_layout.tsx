import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";

import { LocaleProvider, useLocale } from "@/i18n";
import { ThemeProvider, useTheme } from "@/theme";

function RootNavigator() {
  const { colors, isDark, isReady: themeReady } = useTheme();
  const { isReady: localeReady } = useLocale();

  if (!themeReady || !localeReady) {
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
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <RootNavigator />
      </LocaleProvider>
    </ThemeProvider>
  );
}
