import {
  IonContent,
  IonFooter,
  IonIcon,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from "@ionic/react";
import { add, search, star } from "ionicons/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router";
import { CreateElementTabComponent } from "../pages/add-workshop-element/CreateElementTabComponent";
import { FavoriteElementsTabComponent } from "../pages/add-workshop-element/FavoriteElementsTabComponent";
import { SearchElementTabComponent } from "../pages/add-workshop-element/SearchElementTabComponent";
import { routeLibrary, routeWorkshopAddElement } from "../routes/shared-routes";

enum Tabs {
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

  const [tab, setTab] = useState(Tabs.SEARCH);
  useEffect(() => {
    if (location.pathname.endsWith(Tabs.CREATE)) {
      if (hasWorkshopContext) {
        setTab(Tabs.SEARCH);
      } else {
        setTab(Tabs.CREATE);
      }
    } else if (location.pathname.endsWith(Tabs.FAVORITES)) {
      setTab(Tabs.FAVORITES);
    } else {
      setTab(Tabs.SEARCH);
    }
  }, [location.pathname, hasWorkshopContext]);

  const createTabsRoute = useCallback(
    (tab: Tabs) => {
      if (hasWorkshopContext) {
        return `${routeWorkshopAddElement(workshopId)}/${tab}`;
      } else {
        return `${routeLibrary()}/${tab}`;
      }
    },
    [hasWorkshopContext, workshopId],
  );

  return (
    <>
      <IonContent fullscreen>
        <Switch>
          <Redirect
            from={`${path}/`}
            to={`${path}/${Tabs.SEARCH}`}
            exact
          ></Redirect>
          <Route path={`${path}/${Tabs.SEARCH}`} exact>
            <SearchElementTabComponent
              workshopId={workshopId}
            ></SearchElementTabComponent>
          </Route>
          <Route path={`${path}/${Tabs.FAVORITES}`} exact>
            <FavoriteElementsTabComponent></FavoriteElementsTabComponent>
          </Route>
          <Route path={`${path}/${Tabs.CREATE}`} exact>
            <CreateElementTabComponent></CreateElementTabComponent>
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
            {hasWorkshopContext && (
              <IonSegmentButton
                value={Tabs.CREATE}
                onClick={() => history.replace(createTabsRoute(Tabs.CREATE))}
              >
                <IonIcon icon={add}></IonIcon>
                <IonLabel>Create</IonLabel>
              </IonSegmentButton>
            )}
          </IonSegment>
        </IonToolbar>
      </IonFooter>
    </>
  );
};
