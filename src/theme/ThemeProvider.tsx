import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useColorScheme } from "react-native";

import { loadThemeMode, saveThemeMode } from "../storage/themePreference";
import { darkColors, lightColors } from "./colors";
import { radius, spacing } from "./tokens";
import type { AppTheme, ResolvedScheme, ThemeMode } from "./types";

type ThemeContextValue = AppTheme & {
  setMode: (mode: ThemeMode) => void;
  isReady: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveScheme(
  mode: ThemeMode,
  systemScheme: ResolvedScheme | null | undefined,
): ResolvedScheme {
  if (mode === "system") {
    return systemScheme === "dark" ? "dark" : "light";
  }
  return mode;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadThemeMode().then((saved) => {
      if (mounted) {
        setModeState(saved);
        setIsReady(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    void saveThemeMode(next);
  }, []);

  const scheme = resolveScheme(mode, systemScheme);
  const colors = scheme === "dark" ? darkColors : lightColors;

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      scheme,
      colors,
      spacing,
      radius,
      isDark: scheme === "dark",
      setMode,
      isReady,
    }),
    [mode, scheme, colors, setMode, isReady],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
