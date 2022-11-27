import { useEffect, useRef } from "react";
import { rootLogger } from "./logger";

const COMPONENT_NAMESPACE = "component";

/**
 * Base logger.
 *
 * @param namespace
 * @returns
 */
export function useLogger(namespace: string) {
  const loggerRef = useRef(
    rootLogger.extend(COMPONENT_NAMESPACE).extend(namespace),
  );

  useEffect(() => {
    loggerRef.current("Component initialized.");
  }, [loggerRef]);

  return loggerRef.current;
}
