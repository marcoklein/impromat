import { useDocument } from "./use-document";

/**
 *
 * @returns Information about the currently logged in user.
 */
export function useMyUser() {
  const { document: meDocument } = useDocument("me", "me");
  return useDocument("users", meDocument?.user);
}
