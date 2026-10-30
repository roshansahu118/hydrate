import { View, type StyleProp, type ViewStyle } from "react-native";

import { useTheme } from "../../theme";
import { AppText } from "../AppText";
import { Button } from "./Button";

export type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  style,
}: EmptyStateProps) {
  const { spacing } = useTheme();

  return (
    <View
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: spacing.xl,
          paddingHorizontal: spacing.md,
          gap: spacing.sm,
        },
        style,
      ]}
    >
      <AppText variant="subtitle" style={{ textAlign: "center" }}>
        {title}
      </AppText>
      {description ? (
        <AppText
          variant="body"
          color="secondary"
          style={{ textAlign: "center" }}
        >
          {description}
        </AppText>
      ) : null}
      {actionLabel && onAction ? (
        <Button
          label={actionLabel}
          onPress={onAction}
          style={{ marginTop: spacing.sm }}
        />
      ) : null}
    </View>
  );
}
