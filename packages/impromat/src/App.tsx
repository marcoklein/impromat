import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Redirect, Route } from "react-router";
import { ProtectedRouteComponent } from "./components/ProtectedRoute";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LibraryCreateCustomElementPage } from "./pages/library/LibraryCreateCustomElementPage";
import { LibraryElementPage } from "./pages/library/LibraryElementPage";
import { ResponsiveMenu } from "./pages/navigation/ResponsiveMenu";
import { RootNavigation } from "./pages/navigation/RootNavigation";
import { HIDE_MENU_SIZE } from "./pages/navigation/responsive-navigation";
import { WorkshopElementPage } from "./pages/workshop/WorkshopElementPage";
import {
  routeLibraryCreateCustomElement,
  routeLibraryElement,
} from "./routes/library-routes";
import {
  routeRootNavigation,
  routeWorkshopElement,
} from "./routes/shared-routes";

export const App: React.FC = () => {
  return (
    <IonApp>
      <IonSplitPane
        when={HIDE_MENU_SIZE}
        contentId="main"
        style={{ "--side-width": "20rem", "--side-max-width": "20rem" }}
      >
        <IonReactRouter>
          <ResponsiveMenu></ResponsiveMenu>
          <IonRouterOutlet id="main" animated={true}>
            <Route
              path={routeWorkshopElement()}
              exact
              component={WorkshopElementPage}
            ></Route>
            <ProtectedRouteComponent
              path={routeLibraryElement()}
              exact
              children={<LibraryElementPage></LibraryElementPage>}
            ></ProtectedRouteComponent>
            <ProtectedRouteComponent
              path={routeLibraryCreateCustomElement()}
              exact
              children={
                <LibraryCreateCustomElementPage></LibraryCreateCustomElementPage>
              }
            ></ProtectedRouteComponent>
            <Route
              path={routeRootNavigation()}
              component={RootNavigation}
            ></Route>

            <Route component={NotFoundPage}></Route>
            <Redirect path="/" exact to={routeRootNavigation()}></Redirect>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonSplitPane>
    </IonApp>
  );
};
