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
import { add, arrowBack, search } from "ionicons/icons";
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
import { CreateElementTabComponent } from "../components/CreateElementTabComponent";
import { SearchElementTabComponent } from "../components/SearchElementTabComponent";
import {
  routeWorkshop,
  routeWorkshopAddElement,
} from "../routes/shared-routes";

export const AddWorkshopElementPage: React.FC = () => {
  const { id: workshopId, partId } = useParams<{
    id: string;
    partId: string;
  }>();
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const { path } = routeMatch;
  const location = useLocation();

  const [tab, setTab] = useState("search");
  useEffect(() => {
    if (location.pathname.endsWith("create")) {
      setTab("create");
    } else {
      setTab("search");
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
          <Redirect from={`${path}/`} to={`${path}/search`} exact></Redirect>
          <Route path={`${path}/search`} exact>
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
          <Route path={`${path}/create`} exact>
            <CreateElementTabComponent></CreateElementTabComponent>
          </Route>
        </Switch>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonSegment value={tab}>
            <IonSegmentButton
              value="search"
              onClick={() =>
                history.replace(`${routeWorkshopAddElement(workshopId)}/search`)
              }
            >
              <IonIcon icon={search}></IonIcon>
              <IonLabel>Explore</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value="create"
              onClick={() =>
                history.replace(`${routeWorkshopAddElement(workshopId)}/create`)
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
