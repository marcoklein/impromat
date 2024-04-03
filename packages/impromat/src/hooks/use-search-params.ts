import { useMemo } from "react";
import { useLocation } from "react-router";

/**
 * Access one search param from the current location.
 *
 *
 * ```ts
 * // Example Url: `https://example.com?search=foo`
 * const searchParamValue = useSearchParam("search");
 * // searchParamValue will be `"foo"`.
 * ```
 *
 *
 * @param searchParamName Param name to access
 * @returns Value of the param or undefined if not present
 */
export function useSearchParam(searchParamName: string) {
  const location = useLocation();
  return useMemo(
    () =>
      new URLSearchParams(location.search).get(searchParamName) ?? undefined,
    [location, searchParamName],
  );
}
