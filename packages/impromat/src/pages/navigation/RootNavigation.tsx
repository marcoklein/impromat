import { Login, Person } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, Route, useParams } from "react-router";
import { Link, Switch } from "react-router-dom";
import { ElementsIcon } from "../../components/icons/ElementsIcon";
import { WorkshopsIcon } from "../../components/icons/WorkshopsIcon";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { useStateChangeLogger } from "../../hooks/use-state-change-logger";
import {
  routeAbout,
  routeHome,
  routeLegal,
  routeLibrary,
  routeLibraryElement,
  routeLogin,
  routeMySpace,
  routePrivacyPolicy,
  routeRootNavigation,
  routeWorkshops,
} from "../../routes/shared-routes";
import { AboutPage } from "../AboutPage";
import { HomePage } from "../home/HomePage";
import { LegalPage } from "../LegalPage";
import { PrivacyPolicyPage } from "../PrivacyPolicyPage";
import { MuiLibraryPage } from "../library-page/LibraryPage";
import { LibraryElementPage } from "../library/LibraryElementPage";
import { LoginPage } from "../login/LoginPage";
import { MySpacePage } from "../myspace/MySpacePage";
import { WorkshopsPage } from "../workshop/WorkshopsPage";

export interface TabConfig {
  name: string;
  icon: JSX.Element;
  route: string;
  // element: FunctionComponent<{}>;
  element: JSX.Element;
  exact?: boolean;
  showForUser: "all" | "loggedIn" | "loggedOut";
}

export enum RootTabs {
  ELEMENTS = "ELEMENTS",
  WORKSHOPS = "WORKSHOPS",
  MYSPACE = "MYSPACE",
  LOGIN = "LOGIN",
}

export const ROOT_TABS: Record<RootTabs, TabConfig> = {
  ELEMENTS: {
    name: "Exercises & Games",
    icon: <ElementsIcon />,
    route: routeLibrary(),
    element: <MuiLibraryPage />,
    exact: true,
    showForUser: "all",
  },
  WORKSHOPS: {
    name: "Workshops",
    icon: <WorkshopsIcon />,
    route: routeWorkshops(),
    element: <WorkshopsPage />,
    exact: true,
    showForUser: "all",
  },
  MYSPACE: {
    name: "My Space",
    icon: <Person />,
    route: routeMySpace(),
    element: <MySpacePage />,
    exact: true,
    showForUser: "loggedIn",
  },
  LOGIN: {
    name: "Login",
    icon: <Login />,
    route: routeLogin(),
    element: <LoginPage />,
    exact: true,
    showForUser: "loggedOut",
  },
};

interface ContainerProps {}

/**
 * Core component for the library page.
 * It contains the tabs for the different library content.
 *
 * @param workshopId if set, the library has been opened from a workshop.
 */
export const RootNavigation: React.FC<ContainerProps> = () => {
  const logger = useComponentLogger("RootNavigation");
  const { t } = useTranslation("RootNavigation");
  const params = useParams<{ tabName: string }>();
  const defaultTab = useMemo(() => ROOT_TABS.ELEMENTS, []);

  const currentTab = params.tabName ?? defaultTab.route;
  useStateChangeLogger(params.tabName, "tabName", logger);

  const { isLoggedIn } = useIsLoggedIn();

  const activeRouteTabs = useMemo(
    () =>
      Object.entries(ROOT_TABS).filter(
        ([_key, tabConfig]) =>
          tabConfig.showForUser === "all" ||
          (tabConfig.showForUser === "loggedIn" && isLoggedIn) ||
          (tabConfig.showForUser === "loggedOut" && !isLoggedIn),
      ),
    [isLoggedIn],
  );

  return (
    <Box display="flex" flexDirection="column" flexGrow={1} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <Switch>
          <Redirect
            from={`${routeRootNavigation()}/`}
            to={`${defaultTab.route}`}
            exact
          ></Redirect>
          {activeRouteTabs.map(([key, value]) => (
            <Route
              key={key}
              path={value.route}
              exact={value.exact}
              children={value.element}
            ></Route>
          ))}

          <Route path={routeLibraryElement()}>
            <LibraryElementPage></LibraryElementPage>
          </Route>
          <Route path={routeHome()} exact>
            <HomePage></HomePage>
          </Route>
          <Route path={routeAbout()} exact>
            <AboutPage></AboutPage>
          </Route>
          <Route
            path={routePrivacyPolicy()}
            exact
            component={PrivacyPolicyPage}
          ></Route>
          <Route path={routeLegal()} exact component={LegalPage}></Route>
          <Route path="*">
            <Redirect to={routeHome()}></Redirect>
          </Route>
        </Switch>
      </Box>
      <Box>
        <BottomNavigation showLabels value={currentTab}>
          <BottomNavigationAction
            sx={{
              flexGrow: 0,
              width: 40,
              "&.Mui-selected>img": {
                width: 32,
                height: 32,
                filter: "grayscale(0%)",
              },
            }}
            component={Link}
            value={"home"}
            to={routeHome()}
            aria-label="home"
            icon={
              <Box
                component="img"
                src="/assets/logo.svg"
                sx={{
                  filter: "grayscale(100%)",
                  transition: "filter 0.3s ease-in-out",
                  width: 30,
                  height: 30,
                }}
              />
            }
          />
          {activeRouteTabs.map(([key, value]) => (
            <BottomNavigationAction
              sx={{ textAlign: "center" }}
              component={Link}
              key={key}
              value={value.route.match(/\/([^/]+)\/([^/]+)/)?.at(2) ?? ""}
              to={value.route}
              label={t(value.name)}
              icon={value.icon}
            />
          ))}
        </BottomNavigation>
      </Box>
    </Box>
  );
};
