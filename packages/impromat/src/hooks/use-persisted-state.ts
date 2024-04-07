import { useState } from "react";
import { APP_LOCAL_STORAGE_PREFIX } from "../app-local-storage-prefix";
import { useLogger } from "./use-logger";

export interface UsePersistedStateOptions<T> {
  /**
   * If set, the initial value will be set to this value even if there is a persisted value.
   */
  forceValue?: T;
  /**
   * Prefix to use for the key in localStorage.
   */
  prefix?: string;
}

/**
 * Alternative to `useState` to persist changes to `localStorage`.
 *
 * @template T The type of the state object.
 * @param key The key to use for storing the state in localStorage.
 * @param defaultValue The default value for the state object.
 * @param options Additional options for the hook.
 * @returns A tuple containing the current state object and a function to update and persist the state object.
 */
export function usePersistedState<
  T extends Partial<
    Record<keyof T, boolean | number | string | undefined | object>
  >,
>(
  key: string | undefined,
  defaultValue: Required<T>,
  options?: UsePersistedStateOptions<T>,
): [T, (valueToPersist: T) => void] {
  const forceValue = options?.forceValue;
  const prefix = options?.prefix ?? APP_LOCAL_STORAGE_PREFIX;
  const logger = useLogger("usePersistedState");

  if (key) {
    key = `${prefix}${key}`;
  }

  const [state, setState] = useState<T>(() => {
    logger("key=%s: loading initial state", key);
    if (!key) return defaultValue;
    if (forceValue) {
      logger("Forcing value %s", forceValue);
      localStorage.setItem(key, JSON.stringify(forceValue));
      return forceValue;
    }
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

  const persistValueFn = (valueToPersist: T) => {
    if (!key) {
      logger("No key provided. Not persisting state!");
      return;
    }

    localStorage.setItem(key, JSON.stringify(valueToPersist));
    setState(valueToPersist);
    logger('key=%s persisted new state with value "%s"', key, valueToPersist);
  };

  return [state, persistValueFn];
}
