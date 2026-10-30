import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  applyProfileUpdate,
  clampIntakeMl,
  createDefaultProfile,
  createIntakeEntry,
  DEFAULT_NOTIFICATION_PREFS,
  entriesForDay,
  progressTowardGoal,
  totalMlForDay,
  type IntakeEntry,
  type NotificationPrefs,
  type ProfileUpdate,
  type UserProfile,
} from "../domain";
import {
  loadIntakeEntries,
  loadNotificationPrefs,
  loadProfile,
  removeIntakeEntry as removeStoredIntake,
  saveIntakeEntries,
  saveNotificationPrefs,
  saveProfile,
} from "../storage";

type HydrateContextValue = {
  isReady: boolean;
  profile: UserProfile;
  notificationPrefs: NotificationPrefs;
  entries: IntakeEntry[];
  todayEntries: IntakeEntry[];
  todayTotalMl: number;
  progress: number;
  updateProfile: (update: ProfileUpdate) => Promise<void>;
  addIntake: (amountMl: number, note?: string) => Promise<IntakeEntry>;
  removeIntake: (id: string) => Promise<void>;
  undoLastIntake: () => Promise<IntakeEntry | null>;
  updateNotificationPrefs: (
    prefs: Partial<NotificationPrefs>,
  ) => Promise<void>;
};

const HydrateContext = createContext<HydrateContextValue | null>(null);

export function HydrateProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(createDefaultProfile);
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPrefs>(
    DEFAULT_NOTIFICATION_PREFS,
  );
  const [entries, setEntries] = useState<IntakeEntry[]>([]);

  useEffect(() => {
    let mounted = true;

    Promise.all([
      loadProfile(),
      loadIntakeEntries(),
      loadNotificationPrefs(),
    ]).then(([storedProfile, storedEntries, storedPrefs]) => {
      if (!mounted) return;
      setProfile(storedProfile);
      setEntries(storedEntries);
      setNotificationPrefs(storedPrefs);
      setIsReady(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const updateProfile = useCallback(async (update: ProfileUpdate) => {
    let nextProfile: UserProfile | null = null;
    setProfile((current) => {
      nextProfile = applyProfileUpdate(current, update);
      return nextProfile;
    });
    if (nextProfile) {
      await saveProfile(nextProfile);
    }
  }, []);

  const addIntake = useCallback(async (amountMl: number, note?: string) => {
    const entry = createIntakeEntry(clampIntakeMl(amountMl), note);
    setEntries((current) => {
      const next = [entry, ...current];
      void saveIntakeEntries(next);
      return next;
    });
    return entry;
  }, []);

  const removeIntake = useCallback(async (id: string) => {
    const next = await removeStoredIntake(id);
    setEntries(next);
  }, []);

  const undoLastIntake = useCallback(async () => {
    let removed: IntakeEntry | null = null;
    setEntries((current) => {
      const today = entriesForDay(current);
      const latest = today[0];
      if (!latest) {
        removed = null;
        return current;
      }
      removed = latest;
      const next = current.filter((entry) => entry.id !== latest.id);
      void saveIntakeEntries(next);
      return next;
    });
    return removed;
  }, []);

  const updateNotificationPrefs = useCallback(
    async (prefs: Partial<NotificationPrefs>) => {
      let nextPrefs: NotificationPrefs | null = null;
      setNotificationPrefs((current) => {
        nextPrefs = { ...current, ...prefs };
        return nextPrefs;
      });
      if (nextPrefs) {
        await saveNotificationPrefs(nextPrefs);
      }
    },
    [],
  );

  const todayEntries = useMemo(() => entriesForDay(entries), [entries]);
  const todayTotalMl = useMemo(() => totalMlForDay(entries), [entries]);
  const progress = useMemo(
    () => progressTowardGoal(todayTotalMl, profile.dailyGoalMl),
    [todayTotalMl, profile.dailyGoalMl],
  );

  const value = useMemo<HydrateContextValue>(
    () => ({
      isReady,
      profile,
      notificationPrefs,
      entries,
      todayEntries,
      todayTotalMl,
      progress,
      updateProfile,
      addIntake,
      removeIntake,
      undoLastIntake,
      updateNotificationPrefs,
    }),
    [
      isReady,
      profile,
      notificationPrefs,
      entries,
      todayEntries,
      todayTotalMl,
      progress,
      updateProfile,
      addIntake,
      removeIntake,
      undoLastIntake,
      updateNotificationPrefs,
    ],
  );

  return (
    <HydrateContext.Provider value={value}>{children}</HydrateContext.Provider>
  );
}

export function useHydrate(): HydrateContextValue {
  const ctx = useContext(HydrateContext);
  if (!ctx) {
    throw new Error("useHydrate must be used within HydrateProvider");
  }
  return ctx;
}
