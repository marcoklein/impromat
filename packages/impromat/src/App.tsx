import { IonApp } from "@ionic/react";
import { Box } from "@mui/material";
import React from "react";
import { Redirect, Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import { ProtectedRouteComponent } from "./components/ProtectedRoute";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LibraryCreateElementPage } from "./pages/library-create-custom-element/LibraryCreateElementPage";
import { LibraryUpdateElementPage } from "./pages/library-create-custom-element/LibraryUpdateElementPage";
import { ResponsiveMenu } from "./pages/navigation/ResponsiveMenu";
import { RootNavigation } from "./pages/navigation/RootNavigation";
import { LegacyWorkshopElementPage } from "./pages/workshop/LegacyWorkshopElementPage";
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
import { WorkshopPage } from "./pages/workshop/WorkshopPage";
import { WorkshopElementPage } from "./pages/workshop/WorkshopElementPage";

export const App: React.FC = () => {
  useLanguageUpdateEffect();

  return (
    <IonApp>
      <BrowserRouter>
        <ResponsiveMenu></ResponsiveMenu>
        <Box id="main" height="100%" display="flex" flexDirection="column">
          <Switch>
            <Redirect path={"/"} exact to={routeLibrary()}></Redirect>
            <Route
              path={routeWorkshopElement()}
              exact
              component={WorkshopElementPage}
            ></Route>
            <ProtectedRouteComponent
              path={routeLibraryCreateCustomElement()}
              exact
              component={LibraryCreateElementPage}
            ></ProtectedRouteComponent>
            <ProtectedRouteComponent
              path={routeLibraryEditCustomElement()}
              exact
              component={LibraryUpdateElementPage}
            ></ProtectedRouteComponent>
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
