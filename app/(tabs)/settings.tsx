import { View } from "react-native";

import { AppText } from "@/components/AppText";
import { Screen } from "@/components/Screen";
import { ThemeModePicker } from "@/components/ThemeModePicker";
import { useTheme } from "@/theme";

export default function SettingsScreen() {
  const { mode, scheme, colors, spacing, radius } = useTheme();

  return (
    <Screen scroll>
      <AppText variant="title">Settings</AppText>
      <AppText variant="body" color="secondary">
        Appearance (M1). Language and goals come in later modules.
      </AppText>

      <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
        <AppText variant="subtitle">Theme</AppText>
        <AppText variant="caption" color="muted">
          Preference: {mode} · Resolved: {scheme}
        </AppText>
        <ThemeModePicker />
      </View>

      <View
        style={{
          marginTop: spacing.lg,
          padding: spacing.md,
          borderRadius: radius.md,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          gap: spacing.xs,
        }}
      >
        <AppText variant="label">Typography check</AppText>
        <AppText variant="display">Display</AppText>
        <AppText variant="title">Title</AppText>
        <AppText variant="subtitle">Subtitle</AppText>
        <AppText variant="body">Body text uses AppText.</AppText>
        <AppText variant="bodyEmphasis">Body emphasis</AppText>
        <AppText variant="caption" color="muted">
          Caption / muted
        </AppText>
      </View>
    </Screen>
  );
}
