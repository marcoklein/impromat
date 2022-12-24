import { Debugger } from "debug";
import { useDocument } from "./use-document";

/**
 *
 * @returns Information about the currently logged in user.
 */
export function useMyUser(logger?: Debugger) {
  const { document: meDocument } = useDocument("me", "me");
  return useDocument("users", meDocument?.user, logger);
}
