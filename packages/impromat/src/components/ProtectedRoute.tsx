import { IonSpinner } from "@ionic/react";
import { Route, RouteComponentProps, StaticContext } from "react-router";
import { useIsLoggedIn } from "../hooks/use-is-logged-in";
import { AccountPage } from "../pages/account/AccountPage";

interface ContainerProps {
  path: string;
  component?:
    | React.ComponentType<any>
    | React.ComponentType<RouteComponentProps<any, StaticContext, unknown>>;
  exact?: boolean;
}

/**
 * Use with the react-router to protect a route.
 * If the user is not logged in, the AccountPage will be rendered.
 */
export const ProtectedRouteComponent: React.FC<ContainerProps> = ({
  path,
  exact,
  component,
}) => {
  const { fetching, isLoggedIn } = useIsLoggedIn();

  if (fetching) {
    return (
      <span>
        {/* TODO show in center of page */}
        <IonSpinner></IonSpinner> Validating Login
      </span>
    );
  }

  return (
    <Route
      path={path}
      exact={exact}
      component={isLoggedIn ? component : AccountPage}
    ></Route>
  );
};
