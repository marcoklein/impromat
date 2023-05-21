import { useState } from "react";
import { useLogger } from "./use-logger";

/**
 *
 * Alternative to `useState` to persist changes to `localStorage`.
 *
 * @param key
 * @param defaultValue
 * @returns
 */
export function usePersistedState<
  T extends Partial<Record<keyof T, boolean | number | string | undefined>>,
>({
  key,
  defaultValue,
}: {
  key: string;
  defaultValue: Required<T>;
}): [T, (valueToPersist: T) => void] {
  const logger = useLogger("usePersistedState");
  const [state, setState] = useState<T>(() => {
    logger("key=%s: loading initial state", key);
    try {
      const value = localStorage.getItem(key);
      if (!value) return defaultValue;
      const loadedValue = JSON.parse(value) as T;
      if (
        JSON.stringify(Object.keys(defaultValue)) !==
        JSON.stringify(Object.keys(loadedValue))
      ) {
        logger("key=%s: cache mismatch", key);
        localStorage.removeItem(key);
        return defaultValue;
      }
      return loadedValue;
    } catch {
      logger("key=%s: error while state retrievel, removing item", key);
      localStorage.removeItem(key);
    }
    return defaultValue;
  });

  return [
    state,
    (valueToPersist: T) => {
      localStorage.setItem(key, JSON.stringify(valueToPersist));
      setState(valueToPersist);
      logger("key=%s: persisted new state", key);
    },
  ];
}
