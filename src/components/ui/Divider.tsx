import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { useTheme } from "../../theme";

export type DividerProps = {
  style?: StyleProp<ViewStyle>;
};

export function Divider({ style }: DividerProps) {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={[
        {
          height: StyleSheet.hairlineWidth,
          backgroundColor: colors.border,
          marginVertical: spacing.sm,
        },
        style,
      ]}
    />
  );
}
