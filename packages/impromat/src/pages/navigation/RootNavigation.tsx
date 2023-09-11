import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { barbell, documents, home } from "ionicons/icons";
import { useMemo } from "react";
import { Redirect, Route } from "react-router";
import { ProtectedRouteComponent } from "../../components/ProtectedRoute";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useStateChangeLogger } from "../../hooks/use-state-change-logger";
import { routeLibrary } from "../../routes/library-routes";
import {
  routeAbout,
  routeAccount,
  routeCommunity,
  routeHome,
  routeLegal,
  routeMoreInfo,
  routePrivacyPolicy,
  routeRootNavigation,
  routeWorkshop,
  routeWorkshops,
} from "../../routes/shared-routes";
import { AboutPage } from "../AboutPage";
import { CommunityPage } from "../CommunityPage";
import { HomePage } from "../HomePage";
import { LegalPage } from "../LegalPage";
import { MoreInfoPage } from "../MoreInfoPage";
import { PrivacyPolicyPage } from "../PrivacyPolicyPage";
import { AccountPage } from "../account/AccountPage";
import { LibraryPage } from "../library/LibraryPage";
import { WorkshopPage } from "../workshop/WorkshopPage";
import { WorkshopsPage } from "../workshop/WorkshopsPage";
import { HIDE_MENU_SIZE } from "./responsive-navigation";

export interface TabConfig {
  name: string;
  icon: string;
  route: string;
  element: JSX.Element;
  exact?: boolean;
  protected?: boolean;
}

export enum RootTabs {
  HOME = "HOME",
  ELEMENTS = "ELEMENTS",
  WORKSHOPS = "WORKSHOPS",
}

export const ROOT_TABS: Record<RootTabs, TabConfig> = {
  HOME: {
    name: "Home",
    icon: home,
    route: routeMoreInfo(),
    element: <MoreInfoPage></MoreInfoPage>,
    exact: true,
  },
  ELEMENTS: {
    name: "Exercises & Games",
    icon: barbell,
    route: routeLibrary(),
    element: <LibraryPage></LibraryPage>,
    exact: true,
    protected: true,
  },
  WORKSHOPS: {
    name: "Workshops",
    icon: documents,
    route: routeWorkshops(),
    element: <WorkshopsPage></WorkshopsPage>,
    exact: true,
    protected: true,
  },
};

interface ContainerProps {
  workshopId?: string;
}

/**
 * Core component for the library page.
 * It contains the tabs for the different library content.
 *
 * @param workshopId if set, the library has been opened from a workshop.
 */
export const RootNavigation: React.FC<ContainerProps> = ({ workshopId }) => {
  const logger = useComponentLogger("RootNavigation");
  useStateChangeLogger(workshopId, "workshopId", logger);

  const defaultTab = useMemo(() => ROOT_TABS.HOME, []);

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect
            from={`${routeRootNavigation()}/`}
            to={`${defaultTab.route}`}
            exact
          ></Redirect>
          {Object.entries(ROOT_TABS).map(([key, value]) =>
            value.protected ? (
              <ProtectedRouteComponent
                key={key}
                path={`${value.route}`}
                children={value.element}
                exact={value.exact}
              ></ProtectedRouteComponent>
            ) : (
              <Route
                key={key}
                path={`${value.route}`}
                render={() => value.element}
                exact={value.exact}
              ></Route>
            ),
          )}
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
          <Route path={routeWorkshop()} exact>
            <WorkshopPage></WorkshopPage>
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" className={`ion-hide-${HIDE_MENU_SIZE}-up`}>
          {Object.entries(ROOT_TABS).map(([key, value]) => (
            <IonTabButton key={key} tab={key} href={`${value.route}`}>
              <IonIcon icon={value.icon}></IonIcon>
              <IonLabel>{value.name}</IonLabel>
            </IonTabButton>
          ))}
        </IonTabBar>
      </IonTabs>
    </>
  );
};
