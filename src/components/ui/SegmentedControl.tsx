import { Pressable, StyleSheet, View } from "react-native";

import { useTheme } from "../../theme";
import { AppText } from "../AppText";

export type SegmentOption<T extends string> = {
  value: T;
  label: string;
};

export type SegmentedControlProps<T extends string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
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
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(option.value)}
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
