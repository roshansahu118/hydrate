import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { I18nextProvider } from "react-i18next";

import { loadLocaleMode, saveLocaleMode } from "../storage/localePreference";
import i18n, { getDeviceLanguage } from "./i18n";
import type { AppLanguage, LocaleMode } from "./types";

type LocaleContextValue = {
  mode: LocaleMode;
  language: AppLanguage;
  setMode: (mode: LocaleMode) => void;
  isReady: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function resolveLanguage(mode: LocaleMode): AppLanguage {
  if (mode === "system") {
    return getDeviceLanguage();
  }
  return mode;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<LocaleMode>("system");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadLocaleMode().then(async (saved) => {
      if (!mounted) return;
      const language = resolveLanguage(saved);
      await i18n.changeLanguage(language);
      setModeState(saved);
      setIsReady(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const setMode = useCallback((next: LocaleMode) => {
    setModeState(next);
    void saveLocaleMode(next);
    void i18n.changeLanguage(resolveLanguage(next));
  }, []);

  const language = resolveLanguage(mode);

  const value = useMemo<LocaleContextValue>(
    () => ({
      mode,
      language,
      setMode,
      isReady,
    }),
    [mode, language, setMode, isReady],
  );

  return (
    <I18nextProvider i18n={i18n}>
      <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
    </I18nextProvider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
