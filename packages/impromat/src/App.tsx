import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Redirect, Route } from "react-router";
import { ProtectedRouteComponent } from "./components/ProtectedRoute";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LibraryCreateCustomElementPage } from "./pages/library/LibraryCreateCustomElementPage";
import { LibraryElementPage } from "./pages/library/LibraryElementPage";
import { MenuComponent } from "./pages/navigation/MenuComponent";
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
      <IonSplitPane when={HIDE_MENU_SIZE} contentId="main">
        <IonReactRouter>
          <MenuComponent></MenuComponent>
          <IonRouterOutlet id="main">
            <Redirect path="/" exact to={routeRootNavigation()}></Redirect>
            <Route path={routeWorkshopElement()} exact>
              <WorkshopElementPage></WorkshopElementPage>
            </Route>
            <ProtectedRouteComponent path={routeLibraryElement()} exact>
              <LibraryElementPage></LibraryElementPage>
            </ProtectedRouteComponent>
            <ProtectedRouteComponent
              path={routeLibraryCreateCustomElement()}
              exact
            >
              <LibraryCreateCustomElementPage></LibraryCreateCustomElementPage>
            </ProtectedRouteComponent>
            <ProtectedRouteComponent path={routeRootNavigation()}>
              <RootNavigation></RootNavigation>
            </ProtectedRouteComponent>

            <Route>
              <NotFoundPage></NotFoundPage>
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonSplitPane>
    </IonApp>
  );
};
