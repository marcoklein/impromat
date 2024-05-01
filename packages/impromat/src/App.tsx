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
  routeRootNavigation,
  routeWorkshop,
  routeWorkshopElement,
  routeWorkshops,
} from "./routes/shared-routes";
import { useLanguageUpdateEffect } from "./use-language-update-effect";

export const App: React.FC = () => {
  useLanguageUpdateEffect();

  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        position: "absolute",
        flexDirection: "column",
        justifyContent: "space-between",
        contain: "layout size style",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <BrowserRouter>
        <Box id="main" height="100%" display="flex" flexDirection="column">
          <Switch>
            <Redirect path={"/"} exact to={routeWorkshops()}></Redirect>
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
            <Route>
              <NotFoundPage />
            </Route>
            {/* <Route component={NotFoundPage}></Route> */}
          </Switch>
        </Box>
      </BrowserRouter>
    </Box>
  );
};
