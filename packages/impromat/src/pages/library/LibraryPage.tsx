import {
  IonContent,
  IonIcon,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from "@ionic/react";
import { brush, heart, search } from "ionicons/icons";
import { PageScaffold } from "../../components/PageScaffold";
import { usePersistedState } from "../../hooks/use-persisted-state";
import { COLOR_LIKE, COLOR_USER_CREATED } from "../../theme/theme-colors";
import { CustomElementsTabComponent } from "./components/CustomElementsTabComponent";
import { FavoriteElementsTabComponent } from "./components/FavoriteElementsTabComponent";
import { SearchElementTabComponent } from "./components/SearchElementTabComponent";

export enum Tabs {
  CREATE = "create",
  LIKES = "likes",
  SEARCH = "search",
}

export const LibraryPage: React.FC = () => {
  const [tab, setTab] = usePersistedState<Tabs>(
    "LibraryContentComponent",
    Tabs.SEARCH,
  );

  return (
    <PageScaffold
      customContentWrapper
      bottomToolbar={
        <IonToolbar>
          <IonSegment
            value={tab}
            onIonChange={(e) => setTab(e.detail.value as Tabs)}
          >
            <IonSegmentButton value={Tabs.SEARCH} layout="icon-bottom">
              <IonIcon icon={search}></IonIcon>
              <IonLabel>Search</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value={Tabs.LIKES}
              color="red-5"
              layout="icon-bottom"
            >
              <IonIcon icon={heart} color={COLOR_LIKE}></IonIcon>
              <IonLabel class="ion-tex-wrap">Likes</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value={Tabs.CREATE} layout="icon-bottom">
              <IonIcon icon={brush} color={COLOR_USER_CREATED}></IonIcon>
              <IonLabel>My Elements</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      }
    >
      {(tab === Tabs.SEARCH && (
        <SearchElementTabComponent></SearchElementTabComponent>
      )) ||
        (tab === Tabs.LIKES && (
          <IonContent>
            <FavoriteElementsTabComponent
              workshopId={undefined}
            ></FavoriteElementsTabComponent>
          </IonContent>
        )) ||
        (tab === Tabs.CREATE && (
          <IonContent>
            <CustomElementsTabComponent
              workshopId={undefined}
            ></CustomElementsTabComponent>
          </IonContent>
        ))}
    </PageScaffold>
  );
};
