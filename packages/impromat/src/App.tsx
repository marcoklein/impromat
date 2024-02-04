import { IonApp } from "@ionic/react";
import { Box } from "@mui/material";
import React from "react";
import { Redirect, Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import { ProtectedPage } from "./components/ProtectedPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LibraryCreateElementPage } from "./pages/library-create-custom-element/LibraryCreateElementPage";
import { LibraryUpdateElementPage } from "./pages/library-create-custom-element/LibraryUpdateElementPage";
import { RootNavigation } from "./pages/navigation/RootNavigation";
import { WorkshopElementPage } from "./pages/workshop/WorkshopElementPage";
import { WorkshopPage } from "./pages/workshop/WorkshopPage";
import {
  routeLibraryCreateCustomElement,
  routeLibraryEditCustomElement,
} from "./routes/library-routes";
import {
  routeHome,
  routeLibrary,
  routeRootNavigation,
  routeWorkshop,
  routeWorkshopElement,
} from "./routes/shared-routes";
import { useLanguageUpdateEffect } from "./use-language-update-effect";

export const App: React.FC = () => {
  useLanguageUpdateEffect();

  return (
    <IonApp>
      <BrowserRouter>
        <Box id="main" height="100%" display="flex" flexDirection="column">
          <Switch>
            <Redirect path={"/"} exact to={routeLibrary()}></Redirect>
            <Route
              path={routeWorkshopElement()}
              exact
              component={WorkshopElementPage}
            ></Route>
            <Route path={routeLibraryCreateCustomElement()} exact>
              <ProtectedPage>
                <LibraryCreateElementPage />
              </ProtectedPage>
            </Route>
            <Route path={routeLibraryEditCustomElement()} exact>
              <ProtectedPage>
                <LibraryUpdateElementPage />
              </ProtectedPage>
            </Route>
            <Route
              path={routeWorkshop()}
              exact
              component={WorkshopPage}
            ></Route>
            <Route
              path={routeRootNavigation() + "/:tabName"}
              component={RootNavigation}
            ></Route>
            <Redirect
              path={routeRootNavigation()}
              to={routeHome()}
              exact
            ></Redirect>
            <Route component={NotFoundPage}></Route>
          </Switch>
        </Box>
      </BrowserRouter>
    </IonApp>
  );
};
