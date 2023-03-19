import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Route } from "react-router";
import { MenuComponent } from "./components/MenuComponent";
import { ProtectedRouteComponent } from "./components/ProtectedRoute";
import { AboutPage } from "./pages/AboutPage";
import { AccountPage } from "./pages/account/AccountPage";
import { HomePage } from "./pages/HomePage";
import { LegalPage } from "./pages/LegalPage";
import {
  routeLibraryElement,
  routeLibraryCreateCustomElement,
  routeLibrary,
} from "./pages/library/library-routes";
import { LibraryCreateCustomElementPage } from "./pages/library/LibraryCreateCustomElementPage";
import { LibraryElementPage } from "./pages/library/LibraryElementPage";
import { LibraryPage } from "./pages/library/LibraryPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { WorkshopElementPage } from "./pages/workshop/WorkshopElementPage";
import { WorkshopPage } from "./pages/workshop/WorkshopPage";
import { WorkshopsPage } from "./pages/workshop/WorkshopsPage";
import {
  routeAbout,
  routeAccount,
  routeHome,
  routeLegal,
  routePrivacyPolicy,
  routeProfile,
  routeWorkshop,
  routeWorkshopElement,
  routeWorkshops,
} from "./routes/shared-routes";

export const App: React.FC = () => {
  return (
    <IonApp>
      <IonSplitPane when="lg" contentId="main">
        <IonReactRouter>
          <MenuComponent></MenuComponent>
          <IonRouterOutlet id="main">
            <Route path={routeHome()} exact>
              <HomePage></HomePage>
            </Route>
            <Route path={routeAbout()} exact>
              <AboutPage></AboutPage>
            </Route>
            <Route path={routePrivacyPolicy()} exact>
              <PrivacyPolicyPage></PrivacyPolicyPage>
            </Route>
            <Route path={routeLegal()} exact>
              <LegalPage></LegalPage>
            </Route>
            <Route path={routeAccount()} exact>
              <AccountPage></AccountPage>
            </Route>
            <ProtectedRouteComponent path={routeProfile()} exact>
              <AccountPage></AccountPage>
            </ProtectedRouteComponent>
            <ProtectedRouteComponent path={routeWorkshops()} exact>
              <WorkshopsPage></WorkshopsPage>
            </ProtectedRouteComponent>
            <ProtectedRouteComponent path={routeWorkshop()} exact>
              <WorkshopPage></WorkshopPage>
            </ProtectedRouteComponent>
            <ProtectedRouteComponent path={routeWorkshopElement()} exact>
              <WorkshopElementPage></WorkshopElementPage>
            </ProtectedRouteComponent>
            <ProtectedRouteComponent path={routeLibraryElement()} exact>
              <LibraryElementPage></LibraryElementPage>
            </ProtectedRouteComponent>
            <ProtectedRouteComponent
              path={routeLibraryCreateCustomElement()}
              exact
            >
              <LibraryCreateCustomElementPage></LibraryCreateCustomElementPage>
            </ProtectedRouteComponent>
            <ProtectedRouteComponent path={routeLibrary()}>
              <LibraryPage></LibraryPage>
            </ProtectedRouteComponent>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonSplitPane>
    </IonApp>
  );
};
