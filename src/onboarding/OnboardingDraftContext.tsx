import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useHydrate } from "../data";
import { DEFAULT_DAILY_GOAL_ML } from "../domain";

type OnboardingDraftContextValue = {
  name: string;
  setName: (name: string) => void;
  dailyGoalMl: number;
  setDailyGoalMl: (goalMl: number) => void;
  nameError: string | null;
  validateName: () => boolean;
  complete: () => Promise<void>;
  completing: boolean;
};

const OnboardingDraftContext =
  createContext<OnboardingDraftContextValue | null>(null);

export function OnboardingDraftProvider({ children }: { children: ReactNode }) {
  const { profile, updateProfile } = useHydrate();
  const [name, setNameState] = useState(profile.name);
  const [dailyGoalMl, setDailyGoalMl] = useState(
    profile.dailyGoalMl || DEFAULT_DAILY_GOAL_ML,
  );
  const [nameError, setNameError] = useState<string | null>(null);
  const [completing, setCompleting] = useState(false);

  const setName = useCallback((next: string) => {
    setNameState(next);
    setNameError(null);
  }, []);

  const validateName = useCallback(() => {
    if (name.trim().length === 0) {
      setNameError("required");
      return false;
    }
    setNameError(null);
    return true;
  }, [name]);

  const complete = useCallback(async () => {
    if (!validateName()) return;
    setCompleting(true);
    try {
      await updateProfile({
        name: name.trim(),
        dailyGoalMl,
        onboarded: true,
      });
    } finally {
      setCompleting(false);
    }
  }, [dailyGoalMl, name, updateProfile, validateName]);

  const value = useMemo(
    () => ({
      name,
      setName,
      dailyGoalMl,
      setDailyGoalMl,
      nameError,
      validateName,
      complete,
      completing,
    }),
    [
      name,
      setName,
      dailyGoalMl,
      nameError,
      validateName,
      complete,
      completing,
    ],
  );

  return (
    <OnboardingDraftContext.Provider value={value}>
      {children}
    </OnboardingDraftContext.Provider>
  );
}

export function useOnboardingDraft(): OnboardingDraftContextValue {
  const ctx = useContext(OnboardingDraftContext);
  if (!ctx) {
    throw new Error(
      "useOnboardingDraft must be used within OnboardingDraftProvider",
    );
  }
  return ctx;
}
