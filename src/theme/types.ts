import type { ThemeColors } from "./colors";
import type { radius, spacing } from "./tokens";

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedScheme = "light" | "dark";

export type AppTheme = {
  mode: ThemeMode;
  scheme: ResolvedScheme;
  colors: ThemeColors;
  spacing: typeof spacing;
  radius: typeof radius;
  isDark: boolean;
};
