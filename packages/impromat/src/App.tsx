import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Redirect, Route } from "react-router-dom";
import { Provider as RxDBProvider } from "rxdb-hooks";
import { MenuComponent } from "./components/MenuComponent";
import { AboutPage } from "./pages/AboutPage";
import { AccountPage } from "./pages/AccountPage";
import { AddWorkshopElementPage } from "./pages/AddWorkshopElementPage";
import { ErrorFallbackPage } from "./pages/ErrorFallbackPage";
import { HomePage } from "./pages/HomePage";
import { ImprobibElementPage } from "./pages/ImprobibElementPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { WorkshopElementPage } from "./pages/WorkshopElementPage";
import { WorkshopPage } from "./pages/WorkshopPage";
import { WorkshopsPage } from "./pages/WorkshopsPage";
import {
  routeAbout,
  routeAccount,
  routeHome,
  routePrivacyPolicy,
  routeWorkshop,
  routeWorkshopAddElement,
  routeWorkshopAddElementFromImprobib,
  routeWorkshopElement,
  routeWorkshops,
} from "./routes/shared-routes";
import { ImprovLibraryContext } from "./store/improbib/improv-library-context";
import { ImpromatRxDatabase, initialize } from "./store/initialize";
import { Element } from "./store/schema.gen";
import "./theme/colors.css";
import "./theme/variables.css";
import "../../../node_modules/flag-icons/css/flag-icons.min.css";

setupIonicReact();

const App: React.FC = () => {
  const [improvElements, setImprovElements] = useState<Element[] | undefined>(
    undefined,
  );

  const [db, setDb] = useState<ImpromatRxDatabase>();
  useEffect(() => {
    // RxDB instantiation can be asynchronous
    initialize()
      .then(setDb)
      .catch((error) => {
        if (error.rxdb && error.code === "DB8") {
          console.warn(
            "RxDB initialized twice. Disable StrictMode in index.tsx to avoid this warning.",
          );
        } else {
          console.log(error);
        }
      });
  }, []);

  return (
    <RxDBProvider db={db}>
      <ImprovLibraryContext.Provider
        value={{ improvElements, setImprovElements }}
      >
        <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
          <IonApp>
            <IonReactRouter>
              <MenuComponent></MenuComponent>
              <IonRouterOutlet id="main">
                <Redirect from="/" to={routeWorkshops()} exact></Redirect>
                <Route path={routeHome()} exact>
                  <HomePage></HomePage>
                </Route>
                <Route path={routeAbout()} exact>
                  <AboutPage></AboutPage>
                </Route>
                <Route path={routePrivacyPolicy()} exact>
                  <PrivacyPolicyPage></PrivacyPolicyPage>
                </Route>
                <Route path={routeAccount()} exact>
                  <AccountPage></AccountPage>
                </Route>
                <Route path={routeWorkshops()} exact>
                  <WorkshopsPage></WorkshopsPage>
                </Route>
                <Route path={routeWorkshop()} exact>
                  <WorkshopPage></WorkshopPage>
                </Route>
                <Route path={routeWorkshopElement()} exact>
                  <WorkshopElementPage></WorkshopElementPage>
                </Route>
                <Route path={routeWorkshopAddElementFromImprobib()} exact>
                  <ImprobibElementPage></ImprobibElementPage>
                </Route>
                <Route path={routeWorkshopAddElement()}>
                  <AddWorkshopElementPage></AddWorkshopElementPage>
                </Route>
              </IonRouterOutlet>
            </IonReactRouter>
          </IonApp>
        </ErrorBoundary>
      </ImprovLibraryContext.Provider>
    </RxDBProvider>
  );
};

export default App;
