import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, arrowBack, search, star } from "ionicons/icons";
import { useEffect, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import {
  routeWorkshop,
  routeWorkshopAddElement,
} from "../routes/shared-routes";
import { CreateElementTabComponent } from "./add-workshop-element/CreateElementTabComponent";
import { FavoriteElementsTabComponent } from "./add-workshop-element/FavoriteElementsTabComponent";
import { SearchElementTabComponent } from "./add-workshop-element/SearchElementTabComponent";

enum Tabs {
  CREATE = "create",
  FAVORITES = "favorites",
  SEARCH = "search",
}

export const AddWorkshopElementPage: React.FC = () => {
  const { id: workshopId, partId } = useParams<{
    id: string;
    partId: string;
  }>();
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const { path } = routeMatch;
  const location = useLocation();

  const [tab, setTab] = useState(Tabs.SEARCH);
  useEffect(() => {
    if (location.pathname.endsWith(Tabs.CREATE)) {
      setTab(Tabs.CREATE);
    } else if (location.pathname.endsWith(Tabs.FAVORITES)) {
      setTab(Tabs.FAVORITES);
    } else {
      setTab(Tabs.SEARCH);
    }
  }, [location.pathname]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              routerLink={routeWorkshop(workshopId)}
              routerDirection="back"
            >
              <IonIcon icon={arrowBack} slot="icon-only"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Add Element</IonTitle>
          <IonButtons slot="end">
            <IonButton
              routerLink={`/workshop/${workshopId}/part/${partId}/edit`}
            ></IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <Switch>
          <Redirect
            from={`${path}/`}
            to={`${path}/${Tabs.SEARCH}`}
            exact
          ></Redirect>
          <Route path={`${path}/${Tabs.SEARCH}`} exact>
            <SearchElementTabComponent></SearchElementTabComponent>
          </Route>
          <Route path={`${path}/inspiration`} exact>
            <IonCard color="light">
              <IonCardHeader>
                <IonCardTitle>Coming soon</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Get meaningful recommendations for your workshop. This feature
                is currently under development.
              </IonCardContent>
            </IonCard>
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
              onClick={() =>
                history.replace(
                  `${routeWorkshopAddElement(workshopId)}/${Tabs.SEARCH}`,
                )
              }
            >
              <IonIcon icon={search}></IonIcon>
              <IonLabel>Explore</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value={Tabs.FAVORITES}
              onClick={() =>
                history.replace(
                  `${routeWorkshopAddElement(workshopId)}/${Tabs.FAVORITES}`,
                )
              }
            >
              <IonIcon icon={star}></IonIcon>
              <IonLabel>Favorites</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value={Tabs.CREATE}
              onClick={() =>
                history.replace(
                  `${routeWorkshopAddElement(workshopId)}/${Tabs.CREATE}`,
                )
              }
            >
              <IonIcon icon={add}></IonIcon>
              <IonLabel>Create</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
