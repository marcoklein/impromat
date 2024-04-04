/**
 * Custom hook that provides a timeout functionality.
 *
 * Usage:
 * ```ts
 * const setDelay = useTimeout(() => {
 *  console.log("Timeout executed!");
 * });
 *
 * setDelay(5000);
 * ```
 *
 * Prints "Timeout executed!" after 5 seconds.
 *
 * @param callback The callback function to be executed after the timeout.
 * @returns A function that can be used to set the timeout delay.
 */
import { useEffect, useState } from "react";

export function useTimeout(callback: () => void, delay: number) {
  const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef) {
        clearTimeout(timeoutRef);
      }
    };
  }, [timeoutRef]);

  return () => {
    if (timeoutRef) {
      clearTimeout(timeoutRef);
    }
    setTimeoutRef(setTimeout(callback, delay));
  };
}
