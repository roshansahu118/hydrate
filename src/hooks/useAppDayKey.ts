import { useEffect, useState } from "react";

import { toDayKey, type DayKey } from "../domain";

/**
 * Tracks the local calendar day and refreshes after midnight
 * so Home/History totals don't stick on yesterday.
 */
export function useAppDayKey(): DayKey {
  const [dayKey, setDayKey] = useState(() => toDayKey());

  useEffect(() => {
    const tick = () => {
      const next = toDayKey();
      setDayKey((current) => (current === next ? current : next));
    };

    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return dayKey;
}
