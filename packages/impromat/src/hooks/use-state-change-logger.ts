import { Debugger } from "debug";
import { useEffect } from "react";

export function useStateChangeLogger(
  state: unknown,
  varName: string,
  logger: Debugger,
) {
  useEffect(() => {
    logger("useStateChangeLogger %s changed to %O", varName, state);
  }, [varName, state, logger]);
}
