import {
  IonHeader,
  IonIcon,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from "@ionic/react";
import { brush, heart, search } from "ionicons/icons";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { usePersistedState } from "../../../hooks/use-persisted-state";
import { useStateChangeLogger } from "../../../hooks/use-state-change-logger";
import { COLOR_LIKE, COLOR_USER_CREATED } from "../../../theme/theme-colors";
import { CustomElementsTabComponent } from "./CustomElementsTabComponent";
import { FavoriteElementsTabComponent } from "./FavoriteElementsTabComponent";
import { SearchElementTabComponent } from "./SearchElementTabComponent";

export enum Tabs {
  CREATE = "create",
  LIKES = "likes",
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
  const logger = useComponentLogger("LibraryContentComponent");
  useStateChangeLogger(workshopId, "workshopId", logger);

  const [tab, setTab] = usePersistedState<Tabs>(
    "LibraryContentComponent",
    Tabs.SEARCH,
  );

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonSegment value={tab}>
            <IonSegmentButton
              value={Tabs.SEARCH}
              onClick={() => setTab(Tabs.SEARCH)}
            >
              <IonIcon icon={search}></IonIcon>
              <IonLabel>Explore</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value={Tabs.LIKES}
              onClick={() => setTab(Tabs.LIKES)}
              color="red-5"
            >
              <IonIcon icon={heart} color={COLOR_LIKE}></IonIcon>
              <IonLabel>Likes</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value={Tabs.CREATE}
              onClick={() => setTab(Tabs.CREATE)}
            >
              <IonIcon icon={brush} color={COLOR_USER_CREATED}></IonIcon>
              <IonLabel>My Library</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      {(tab === Tabs.SEARCH && (
        <SearchElementTabComponent
          workshopId={workshopId}
        ></SearchElementTabComponent>
      )) ||
        (tab === Tabs.LIKES && (
          <FavoriteElementsTabComponent
            workshopId={workshopId}
          ></FavoriteElementsTabComponent>
        )) ||
        (tab === Tabs.CREATE && (
          <CustomElementsTabComponent
            workshopId={workshopId}
          ></CustomElementsTabComponent>
        ))}
    </>
  );
};
