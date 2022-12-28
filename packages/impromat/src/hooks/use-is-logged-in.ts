import { useContext } from "react";
import { AuthorizationContext } from "../authorization/authorization-context";

export function useIsLoggedIn() {
  const { authorizationData } = useContext(AuthorizationContext);
  return authorizationData?.isLoggedIn;
}
