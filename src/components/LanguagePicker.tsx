import { Pressable, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

import { useLocale, type LocaleMode } from "../i18n";
import { useTheme } from "../theme";
import { AppText } from "./AppText";

const OPTIONS: LocaleMode[] = ["en", "hi", "system"];

export function LanguagePicker() {
  const { t } = useTranslation();
  const { mode, setMode } = useLocale();
  const { colors, spacing, radius } = useTheme();

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
        const selected = mode === option;
        return (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => setMode(option)}
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
              {t(`language.${option}`)}
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
