import { createContext } from "react";
import { AuthorizationData } from "./authorization-data";

export type AuthorizationContextType = {
  authorizationData: AuthorizationData | undefined;
  isLoading: boolean;
};

export const AuthorizationContext = createContext<AuthorizationContextType>({
  isLoading: true,
  authorizationData: undefined,
});
