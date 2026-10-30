import { View } from "react-native";

import { AppText } from "@/components/AppText";
import { Screen } from "@/components/Screen";
import { useTheme } from "@/theme";

export default function HomeScreen() {
  const { colors, spacing, radius, scheme } = useTheme();

  return (
    <Screen>
      <AppText variant="title">Hydrate</AppText>
      <AppText variant="body" color="secondary">
        M1 theme demo — Home shell. Intake logging comes in a later module.
      </AppText>

      <View
        style={{
          marginTop: spacing.md,
          padding: spacing.lg,
          borderRadius: radius.lg,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          gap: spacing.sm,
        }}
      >
        <AppText variant="caption" color="muted">
          Active scheme
        </AppText>
        <AppText variant="display" color="primary">
          {scheme === "dark" ? "Dark" : "Light"}
        </AppText>
        <AppText variant="body" color="secondary">
          Change theme from the Settings tab. Preference is saved on device.
        </AppText>
      </View>
    </Screen>
  );
}
