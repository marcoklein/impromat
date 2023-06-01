import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Route } from "react-router";
import { MenuComponent } from "./components/MenuComponent";
import { ProtectedRouteComponent } from "./components/ProtectedRoute";
import { AboutPage } from "./pages/AboutPage";
import { CommunityPage } from "./pages/CommunityPage";
import { HomePage } from "./pages/HomePage";
import { LegalPage } from "./pages/LegalPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { AccountPage } from "./pages/account/AccountPage";
import { LibraryCreateCustomElementPage } from "./pages/library/LibraryCreateCustomElementPage";
import { LibraryElementPage } from "./pages/library/LibraryElementPage";
import { LibraryPage } from "./pages/library/LibraryPage";
import {
  routeLibrary,
  routeLibraryCreateCustomElement,
  routeLibraryElement,
} from "./pages/library/library-routes";
import { WorkshopElementPage } from "./pages/workshop/WorkshopElementPage";
import { WorkshopPage } from "./pages/workshop/WorkshopPage";
import { WorkshopsPage } from "./pages/workshop/WorkshopsPage";
import {
  routeAbout,
  routeAccount,
  routeCommunity,
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
            <Route path={routeCommunity()} exact>
              <CommunityPage></CommunityPage>
            </Route>
            <ProtectedRouteComponent path={routeProfile()} exact>
              <AccountPage></AccountPage>
            </ProtectedRouteComponent>
            <ProtectedRouteComponent path={routeWorkshops()} exact>
              <WorkshopsPage></WorkshopsPage>
            </ProtectedRouteComponent>
            <Route path={routeWorkshop()} exact>
              <WorkshopPage></WorkshopPage>
            </Route>
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
            <ProtectedRouteComponent path={routeLibrary()}>
              <LibraryPage></LibraryPage>
            </ProtectedRouteComponent>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonSplitPane>
    </IonApp>
  );
};
