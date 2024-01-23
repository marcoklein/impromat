import { PropsWithChildren } from "react";
import { Redirect } from "react-router";
import { useIsLoggedIn } from "../hooks/use-is-logged-in";

interface ContainerProps extends PropsWithChildren {}

export const ProtectedPage: React.FC<ContainerProps> = ({ children }) => {
  const { isLoggedIn, fetching: isLoggedInFetching } = useIsLoggedIn();

  if (isLoggedInFetching) {
    return <>...</>;
  }

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return <Redirect to={"/"}></Redirect>;
};
