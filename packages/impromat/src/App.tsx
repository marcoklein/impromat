import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { GraphQLClient } from "graphql-request";
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
import React, { useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Redirect, Route } from "react-router-dom";
import { Provider as RxDBProvider } from "rxdb-hooks";
import "../node_modules/flag-icons/css/flag-icons.min.css";
import { MenuComponent } from "./components/MenuComponent";
import { ElementDocType } from "./database/collections/element/element-collection";
import { createDatabase } from "./database/create-database";
import { AppDatabase } from "./database/database-type";
import { ImprovLibraryContext } from "./database/improbib/improv-library-context";
import { environment } from "./environment";
import { GraphQLContext } from "./graphql/graphql-context";
import { getSdk } from "./graphql/schema.gen";
import { AboutPage } from "./pages/AboutPage";
import { AccountPage } from "./pages/account/AccountPage";
import { ErrorFallbackPage } from "./pages/ErrorFallbackPage";
import { HomePage } from "./pages/HomePage";
import { LegalPage } from "./pages/LegalPage";
import {
  routeLibrary,
  routeLibraryCreateCustomElement,
  routeLibraryElement,
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
  routeWorkshop,
  routeWorkshopElement,
  routeWorkshops,
} from "./routes/shared-routes";
import "./theme/colors.css";
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const [improvElements, setImprovElements] = useState<
    ElementDocType[] | undefined
  >(undefined);

  const clientRef = useRef(
    new GraphQLClient(`${environment.API_URL}/graphql`, {
      credentials: "include",
    }),
  );
  const sdkRef = useRef(getSdk(clientRef.current));

  const [db, setDb] = useState<AppDatabase>();
  useEffect(() => {
    // RxDB instantiation can be asynchronous
    createDatabase({ client: clientRef.current, sdk: sdkRef.current })
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
    <RxDBProvider db={db} idAttribute="id">
      <GraphQLContext.Provider
        value={{ client: clientRef.current, sdk: sdkRef.current }}
      >
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
                  <Route path={routeLegal()} exact>
                    <LegalPage></LegalPage>
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
                  <Route path={routeLibraryElement()} exact>
                    <LibraryElementPage></LibraryElementPage>
                  </Route>
                  <Route path={routeLibraryCreateCustomElement()} exact>
                    <LibraryCreateCustomElementPage></LibraryCreateCustomElementPage>
                  </Route>
                  <Route path={routeLibrary()}>
                    <LibraryPage></LibraryPage>
                  </Route>
                </IonRouterOutlet>
              </IonReactRouter>
            </IonApp>
          </ErrorBoundary>
        </ImprovLibraryContext.Provider>
      </GraphQLContext.Provider>
    </RxDBProvider>
  );
};

export default App;
