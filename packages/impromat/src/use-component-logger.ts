import { useEffect } from "react";
import { useLogger } from "./use-logger";

/**
 * Logger to be used in React components or pages.
 *
 * @param namespace
 * @returns
 */
export function useComponentLogger(namespace: string) {
  const logger = useLogger(namespace);

  useEffect(() => {
    logger("Component initialized.");
    return () => {
      logger("Component destroyed.");
    };
  }, [logger]);

  return logger;
}
