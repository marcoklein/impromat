import {
  IonContent,
  IonFooter,
  IonIcon,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from "@ionic/react";
import { brush, search, star } from "ionicons/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useStateChangeLogger } from "../../../hooks/use-state-change-logger";
import { CreateElementTabComponent } from "../components/CreateElementTabComponent";
import { FavoriteElementsTabComponent } from "../components/FavoriteElementsTabComponent";
import { routeLibraryTab } from "../library-routes";
import { SearchElementTabComponent } from "./SearchElementTabComponent";

export enum Tabs {
  CREATE = "create",
  FAVORITES = "favorites",
  SEARCH = "search",
}

interface ContainerProps {
  workshopId?: string;
}

/**
 * Core component for the library page.
 * It contains the tabs for the different library content.
 *
 * @param workshopId if set, the library has been opened from a workshop.
 */
export const LibraryContentComponent: React.FC<ContainerProps> = ({
  workshopId,
}) => {
  const hasWorkshopContext = useMemo(() => !!workshopId, [workshopId]);
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const { path } = routeMatch;
  const location = useLocation();
  const logger = useComponentLogger("LibraryContentComponent");
  useStateChangeLogger(workshopId, "workshopId", logger);

  const [tab, setTab] = useState(Tabs.SEARCH);
  useEffect(() => {
    console.log("location pathname", location.pathname);
    if (location.pathname.endsWith(Tabs.CREATE)) {
      setTab(Tabs.CREATE);
    } else if (location.pathname.endsWith(Tabs.FAVORITES)) {
      setTab(Tabs.FAVORITES);
    } else {
      setTab(Tabs.SEARCH);
    }
  }, [location.pathname, hasWorkshopContext]);

  const createTabsRoute = useCallback(
    (tab: Tabs) => {
      logger("createTabsRoute workshopId=%s", workshopId);
      return routeLibraryTab(tab, { workshopId });
    },
    [workshopId, logger],
  );

  return (
    <>
      <IonContent fullscreen>
        <Switch>
          <Redirect
            from={`${path}/`}
            to={`${path}/${Tabs.SEARCH}${location.search}`}
            exact
          ></Redirect>
          <Route path={`${path}/${Tabs.SEARCH}`} exact>
            <SearchElementTabComponent
              workshopId={workshopId}
            ></SearchElementTabComponent>
          </Route>
          <Route path={`${path}/${Tabs.FAVORITES}`} exact>
            <FavoriteElementsTabComponent
              workshopId={workshopId}
            ></FavoriteElementsTabComponent>
          </Route>
          <Route path={`${path}/${Tabs.CREATE}`} exact>
            <CreateElementTabComponent
              workshopId={workshopId}
            ></CreateElementTabComponent>
          </Route>
        </Switch>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonSegment value={tab}>
            <IonSegmentButton
              value={Tabs.SEARCH}
              onClick={() => history.replace(createTabsRoute(Tabs.SEARCH))}
            >
              <IonIcon icon={search}></IonIcon>
              <IonLabel>Explore</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value={Tabs.FAVORITES}
              onClick={() => history.replace(createTabsRoute(Tabs.FAVORITES))}
            >
              <IonIcon icon={star}></IonIcon>
              <IonLabel>Favorites</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value={Tabs.CREATE}
              onClick={() => history.replace(createTabsRoute(Tabs.CREATE))}
            >
              <IonIcon icon={brush}></IonIcon>
              <IonLabel>Custom</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonFooter>
    </>
  );
};
