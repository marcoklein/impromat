import { useEffect, useRef, useState } from "react";

/**
 * Debounces a value.
 *
 * Usage:
 * ```ts
 * const debouncedSearchText = useDebounce(newSearchText, 500);
 * useEffect(() => {
 *   onSearch(debouncedSearchText);
 * }, [debouncedSearchText, onSearch]);
 * ```
 *
 * @param value
 * @param delay
 * @returns
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // Cancel the debounce on useEffect cleanup.
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}
