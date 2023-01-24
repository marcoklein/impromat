import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { GraphQLClient } from "graphql-request";
import { QueryClient, QueryClientProvider } from "react-query";
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
import { Route } from "react-router-dom";
import { Provider as RxDBProvider } from "rxdb-hooks";
import "../node_modules/flag-icons/css/flag-icons.min.css";
import { AuthorizationWrapper as AuthorizationContextComponent } from "./AuthorizationWrapper";
import { MenuComponent } from "./components/MenuComponent";
import { ProtectedRouteComponent } from "./components/ProtectedRoute";
import { ElementDocType } from "./database/collections/element/element-collection";
import { ReplicationsState } from "./database/collections/replications-state";
import { createDatabase } from "./database/create-database";
import { AppDatabase } from "./database/database-type";
import { enableAutoLogin } from "./database/enable-auto-login";
import { ImprovLibraryContext } from "./database/improbib/improv-library-context";
import { ReplicationsContext } from "./database/replications-context";
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
  routeProfile,
  routeWorkshop,
  routeWorkshopElement,
  routeWorkshops,
} from "./routes/shared-routes";
import "./theme/colors.css";
import "./theme/variables.css";
import { useLogout } from "./hooks/use-logout";

setupIonicReact();

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [improvElements, setImprovElements] = useState<
    ElementDocType[] | undefined
  >(undefined);
  const [replicationsState, setReplicationsState] = useState<
    ReplicationsState | undefined
  >(undefined);

  const clientRef = useRef(
    new GraphQLClient(`${environment.API_URL}/graphql`, {
      credentials: "include",
    }),
  );
  const sdkRef = useRef(getSdk(clientRef.current));
  const { triggerLogout } = useLogout();

  const [db, setDb] = useState<AppDatabase>();
  useEffect(() => {
    // RxDB instantiation can be asynchronous
    createDatabase(
      {
        client: clientRef.current,
        sdk: sdkRef.current,
      },
      triggerLogout,
    )
      .then(({ database, replications }) => {
        enableAutoLogin(database);
        setDb(database);
        setReplicationsState(replications);
      })
      .catch((error) => {
        if (error.rxdb && error.code === "DB8") {
          console.warn(
            "RxDB initialized twice. Disable StrictMode in index.tsx to avoid this warning.",
          );
        } else {
          console.log(error);
        }
      });
  }, [triggerLogout]);

  return (
    <QueryClientProvider client={queryClient}>
      <RxDBProvider db={db} idAttribute="id">
        <GraphQLContext.Provider
          value={{ client: clientRef.current, sdk: sdkRef.current }}
        >
          <ReplicationsContext.Provider value={{ replicationsState }}>
            <ImprovLibraryContext.Provider
              value={{ improvElements, setImprovElements }}
            >
              <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
                <AuthorizationContextComponent>
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
                          <ProtectedRouteComponent
                            path={routeWorkshops()}
                            exact
                          >
                            <WorkshopsPage></WorkshopsPage>
                          </ProtectedRouteComponent>
                          <ProtectedRouteComponent path={routeWorkshop()} exact>
                            <WorkshopPage></WorkshopPage>
                          </ProtectedRouteComponent>
                          <ProtectedRouteComponent
                            path={routeWorkshopElement()}
                            exact
                          >
                            <WorkshopElementPage></WorkshopElementPage>
                          </ProtectedRouteComponent>
                          <ProtectedRouteComponent
                            path={routeLibraryElement()}
                            exact
                          >
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
                </AuthorizationContextComponent>
              </ErrorBoundary>
            </ImprovLibraryContext.Provider>
          </ReplicationsContext.Provider>
        </GraphQLContext.Provider>
      </RxDBProvider>
    </QueryClientProvider>
  );
};

export default App;
