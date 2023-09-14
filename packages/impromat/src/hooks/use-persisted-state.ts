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
  T extends Partial<
    Record<keyof T, boolean | number | string | undefined | object>
  >,
>(
  key: string | undefined,
  defaultValue: Required<T>,
): [T, (valueToPersist: T) => void] {
  const logger = useLogger("usePersistedState");
  const [state, setState] = useState<T>(() => {
    logger("key=%s: loading initial state", key);
    if (!key) return defaultValue;
    try {
      const value = localStorage.getItem(key);
      if (!value) return defaultValue;
      const loadedValue = JSON.parse(value) as T;
      if (
        loadedValue &&
        !Array.isArray(loadedValue) &&
        defaultValue &&
        JSON.stringify(Object.keys(defaultValue).sort()) !==
          JSON.stringify(Object.keys(loadedValue).sort())
      ) {
        logger(
          "key=%s: cache mismatch for loaded value %j (expected %j)",
          key,
          loadedValue,
          defaultValue,
        );
        localStorage.removeItem(key);
        return defaultValue;
      }
      return loadedValue;
    } catch (e) {
      logger(
        "key=%s: error during state retrieval, removing item",
        key,
        "error",
        e,
      );
      localStorage.removeItem(key);
    }
    return defaultValue;
  });

  return [
    state,
    (valueToPersist: T) => {
      if (!key) {
        logger("No key provided. Not persisting state!");
        return;
      }

      localStorage.setItem(key, JSON.stringify(valueToPersist));
      setState(valueToPersist);
      logger("key=%s: persisted new state", key);
    },
  ];
}
