import { Pressable, StyleSheet, View } from "react-native";

import { useTheme, type ThemeMode } from "../theme";
import { AppText } from "./AppText";

const OPTIONS: { mode: ThemeMode; label: string }[] = [
  { mode: "light", label: "Light" },
  { mode: "dark", label: "Dark" },
  { mode: "system", label: "System" },
];

export function ThemeModePicker() {
  const { mode, setMode, colors, spacing, radius } = useTheme();

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: radius.md,
          padding: spacing.xs,
          gap: spacing.xs,
        },
      ]}
    >
      {OPTIONS.map((option) => {
        const selected = mode === option.mode;
        return (
          <Pressable
            key={option.mode}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => setMode(option.mode)}
            style={[
              styles.option,
              {
                borderRadius: radius.sm,
                backgroundColor: selected
                  ? colors.accent
                  : colors.surfaceElevated,
                paddingVertical: spacing.sm,
              },
            ]}
          >
            <AppText
              variant="label"
              color={selected ? "inverse" : "secondary"}
              style={styles.optionLabel}
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderWidth: 1,
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  optionLabel: {
    textAlign: "center",
  },
});
