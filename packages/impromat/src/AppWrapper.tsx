import { setupIonicReact } from "@ionic/react";
import { CombinedError, Provider as UrqlProvider } from "urql";
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
import React, { PropsWithChildren, useCallback, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createCachedGraphqlClient } from "./create-cached-graphql-client";
import { useComponentLogger } from "./hooks/use-component-logger";
import { ErrorFallbackPage } from "./pages/ErrorFallbackPage";
import "./theme/colors.css";
import "./theme/variables.css";

setupIonicReact();

export const AppWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const logger = useComponentLogger("AppWrapper");
  const onGraphqlError = useCallback(
    (error: CombinedError) => {
      logger("On Graphql error, %j", error);
    },
    [logger],
  );
  const graphqlClientRef = useRef(createCachedGraphqlClient(onGraphqlError));

  return (
    <UrqlProvider value={graphqlClientRef.current}>
      <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
        {children}
      </ErrorBoundary>
    </UrqlProvider>
  );
};
