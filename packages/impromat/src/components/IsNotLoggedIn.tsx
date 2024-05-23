import { PropsWithChildren } from "react";
import { useIsLoggedIn } from "../hooks/use-is-logged-in";

interface ContainerProps extends PropsWithChildren {}

export const IsNotLoggedIn: React.FC<ContainerProps> = ({ children }) => {
  const { isLoggedIn } = useIsLoggedIn();

  if (isLoggedIn) {
    return null;
  }
  return <>{children}</>;
};
