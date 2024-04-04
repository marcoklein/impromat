import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Custom hook that provides a progress functionality.
 *
 * Usage:
 * ```ts
 * const [triggerProgress, isCompleted, progressMs] = useProgress(5000);
 *
 * triggerProgress();
 * ```
 *
 * @param delay The delay in milliseconds for the progress to complete.
 * @returns A tuple with the trigger function, a boolean indicating if the progress is completed and the current progress in milliseconds.
 */
export function useProgress(delay: number) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timeout | null>(null);
  const [progressMs, setProgressMs] = useState(0);
  const intervalSteps = useMemo(() => delay / 100 - 1, [delay]);
  console.log("intervalSteps: ", intervalSteps);
  console.log("delay/intervalSteps: ", delay / intervalSteps);

  useEffect(() => {
    return () => {
      if (timeoutRef) {
        clearTimeout(timeoutRef);
      }
    };
  }, [timeoutRef]);

  const triggerProgress = () => {
    if (timeoutRef) {
      clearInterval(timeoutRef);
    }
    const intervalRef = setInterval(() => {
      setProgressMs((prev) => {
        const newProgress = prev + intervalSteps;
        if (newProgress >= delay) {
          setIsCompleted(true);
          if (timeoutRef) clearInterval(timeoutRef);
        }
        return newProgress;
      });
    }, intervalSteps);
    setTimeoutRef(intervalRef);
    setIsCompleted(false);
    setProgressMs(0);
  };

  return [triggerProgress, isCompleted, progressMs] as const;
}
