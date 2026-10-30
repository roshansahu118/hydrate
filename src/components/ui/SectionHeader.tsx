import { View, type StyleProp, type ViewStyle } from "react-native";

import { useTheme } from "../../theme";
import { AppText } from "../AppText";

export type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
};

export function SectionHeader({ title, subtitle, style }: SectionHeaderProps) {
  const { spacing } = useTheme();

  return (
    <View style={[{ gap: spacing.xs }, style]}>
      <AppText variant="subtitle">{title}</AppText>
      {subtitle ? (
        <AppText variant="caption" color="muted">
          {subtitle}
        </AppText>
      ) : null}
    </View>
  );
}
