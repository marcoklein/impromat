/**
 * Custom hook that provides a timeout functionality.
 *
 * Usage:
 * ```ts
 * const [trigger, isCompleted, reset] = useTimeout(5000);
 *
 * trigger();
 * ```
 *
 * Use the `reset` function to cancel the timeout.
 * The `isCompleted` boolean indicates if the timeout has completed.
 *
 * @param delay The delay in milliseconds for the timeout to complete.
 * @returns A tuple with the trigger function, a boolean indicating if the timeout is completed and the reset function.
 */
import { useEffect, useState } from "react";

export function useTimeout(delay: number) {
  const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timeout | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const resetTimeout = () => {
    if (timeoutRef) {
      clearTimeout(timeoutRef);
    }
  };

  const triggerTimeout = () => {
    resetTimeout();
    setTimeoutRef(
      setTimeout(() => {
        setIsCompleted(true);
      }, delay),
    );
  };

  useEffect(() => {
    return () => {
      if (timeoutRef) {
        clearTimeout(timeoutRef);
      }
    };
  }, [timeoutRef]);

  return [triggerTimeout, isCompleted, resetTimeout] as const;
}
