import { useEffect, useRef } from "react";
import { rootLogger } from "./logger";

/**
 * Logger to be used in React components or pages.
 *
 * @param namespace
 * @returns
 */
export function useLogger(namespace: string) {
  const loggerRef = useRef(rootLogger.extend(namespace));

  useEffect(() => {
    loggerRef.current("Component initialized.");
  }, [loggerRef]);

  return loggerRef.current;
}
