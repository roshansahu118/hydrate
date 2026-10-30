export type TextColors = {
  primary: string;
  secondary: string;
  muted: string;
  danger: string;
  inverse: string;
};

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceElevated: string;
  border: string;
  accent: string;
  accentMuted: string;
  success: string;
  warning: string;
  text: TextColors;
  tabBar: string;
  tabIconDefault: string;
  tabIconSelected: string;
};

export const lightColors: ThemeColors = {
  background: "#F3F7FA",
  surface: "#FFFFFF",
  surfaceElevated: "#FFFFFF",
  border: "#D7E2EA",
  accent: "#1A8FBF",
  accentMuted: "#D6EEF8",
  success: "#1F8A5B",
  warning: "#C9851A",
  text: {
    primary: "#0B1F2A",
    secondary: "#3A5563",
    muted: "#6E8592",
    danger: "#C62828",
    inverse: "#FFFFFF",
  },
  tabBar: "#FFFFFF",
  tabIconDefault: "#6E8592",
  tabIconSelected: "#1A8FBF",
};

export const darkColors: ThemeColors = {
  background: "#07141C",
  surface: "#0F2430",
  surfaceElevated: "#143041",
  border: "#1E3A4A",
  accent: "#3DB7E6",
  accentMuted: "#143A4D",
  success: "#3DCF8E",
  warning: "#E0A93A",
  text: {
    primary: "#E8F2F7",
    secondary: "#A9C0CD",
    muted: "#7A94A3",
    danger: "#FF8A80",
    inverse: "#07141C",
  },
  tabBar: "#0F2430",
  tabIconDefault: "#7A94A3",
  tabIconSelected: "#3DB7E6",
};
