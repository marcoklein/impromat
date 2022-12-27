import { PropsWithChildren, useEffect, useState } from "react";
import { AuthorizationContext } from "./authorization/authorization-context";
import { AuthorizationData } from "./authorization/authorization-data";
import { useMyUser } from "./database/use-my-user";
import { useComponentLogger } from "./hooks/use-component-logger";

export const AuthorizationWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const logger = useComponentLogger("AuthorizationWrapper");
  const [authorizationData, setAuthorizationData] = useState<
    AuthorizationData | undefined
  >(undefined);
  const myUser = useMyUser();
  useEffect(() => {
    logger("Loading authorization data");
    const isLoggedIn = !myUser.isFetching && !!myUser.document;
    if (isLoggedIn && myUser.document) {
      setAuthorizationData({ isLoggedIn: true, myUser: myUser.document });
    } else {
      setAuthorizationData({ isLoggedIn: false, myUser: undefined });
    }
  }, [logger, myUser.document, myUser.isFetching]);

  return (
    <AuthorizationContext.Provider
      value={{
        authorizationData: authorizationData,
        isLoading: authorizationData === undefined,
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};
