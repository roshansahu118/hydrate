import { View } from "react-native";

import { AppText } from "@/components/AppText";
import { Screen } from "@/components/Screen";
import { useTheme } from "@/theme";

export default function HistoryScreen() {
  const { colors, spacing, radius } = useTheme();

  return (
    <Screen>
      <AppText variant="title">History</AppText>
      <AppText variant="body" color="secondary">
        Charts land in M8. This screen only proves theme + AppText for now.
      </AppText>

      <View
        style={{
          marginTop: spacing.md,
          height: 140,
          borderRadius: radius.lg,
          backgroundColor: colors.accentMuted,
          borderWidth: 1,
          borderColor: colors.border,
          alignItems: "center",
          justifyContent: "center",
          padding: spacing.md,
        }}
      >
        <AppText variant="label" color="secondary">
          Chart placeholder
        </AppText>
      </View>
    </Screen>
  );
}
