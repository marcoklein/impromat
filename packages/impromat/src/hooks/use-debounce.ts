import { debounce } from "@mui/material/utils";
import { useRef, useEffect, useMemo } from "react";

type Callback = () => void;

/**
 * Custom hook that returns a debounced version of the provided callback function.
 * The debounced callback will only be invoked after a specified delay has passed
 * without any new invocations.
 *
 * Example:
 * ```tsx
 * const [value, setValue] = useState();
 *
 * const debouncedRequest = useDebounce(() => {
 *   // send request to the backend
 *   // access to latest state here
 *   console.log(value);
 * });
 *
 * const onChange = (e) => {
 *   const value = e.target.value;
 *   setValue(value);
 *
 *   debouncedRequest();
 * };
 * ```
 *
 * @param callback - The callback function to be debounced.
 * @returns The debounced callback function.
 */
export const useDebounce = (callback: Callback) => {
  const ref = useRef<Callback | null>(null);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback: Callback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 1000);
  }, []);

  return debouncedCallback;
};
