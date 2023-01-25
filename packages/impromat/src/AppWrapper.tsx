import { setupIonicReact } from "@ionic/react";
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
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider as RxDBProvider } from "rxdb-hooks";
import "../node_modules/flag-icons/css/flag-icons.min.css";
import { AuthorizationWrapper as AuthorizationContextComponent } from "./AuthorizationWrapper";
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
import { ErrorFallbackPage } from "./pages/ErrorFallbackPage";
import "./theme/colors.css";
import "./theme/variables.css";

setupIonicReact();

const queryClient = new QueryClient();

export const AppWrapper: React.FC<PropsWithChildren> = ({ children }) => {
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

  const [db, setDb] = useState<AppDatabase>();
  useEffect(() => {
    // RxDB instantiation can be asynchronous
    createDatabase()
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
  }, []);

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
                  {children}
                </AuthorizationContextComponent>
              </ErrorBoundary>
            </ImprovLibraryContext.Provider>
          </ReplicationsContext.Provider>
        </GraphQLContext.Provider>
      </RxDBProvider>
    </QueryClientProvider>
  );
};
