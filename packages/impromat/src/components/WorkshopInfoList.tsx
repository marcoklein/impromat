import { IonContent, IonIcon, IonPopover } from "@ionic/react";
import { calendar, globe, heart, person } from "ionicons/icons";
import { useMemo } from "react";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { Icon } from "./Icon";
import { InfoListItem } from "./InfoListItem";
const WorkshopInfoList_Workshop = graphql(`
  fragment WorkshopInfoList_Workshop on Workshop {
    id
    createdAt
    updatedAt
    isPublic
    canEdit
    isOwnerMe
    isLiked
    owner {
      name
    }
  }
`);

interface ContainerProps {
  workshopFragment: FragmentType<typeof WorkshopInfoList_Workshop>;
}

export const WorkshopInfoList: React.FC<ContainerProps> = ({
  workshopFragment,
}) => {
  const workshop = getFragmentData(WorkshopInfoList_Workshop, workshopFragment);

  const workshopCreatedAtText = useMemo(
    () => new Date(workshop.createdAt).toLocaleDateString(),
    [workshop],
  );
  const workshopUpdatedAtText = useMemo(
    () => new Date(workshop.updatedAt).toLocaleDateString(),
    [workshop],
  );

  return (
    <>
      {workshop.isLiked && (
        <InfoListItem
          ionicIcon={heart}
          color="red-5"
          displayText="liked"
        ></InfoListItem>
      )}
      {workshop.isPublic && (
        <InfoListItem
          ionicIcon={globe}
          color="success"
          displayText="publicly shared"
        ></InfoListItem>
      )}
      {workshop.isOwnerMe && (
        <InfoListItem
          ionicIcon={person}
          color="primary"
          displayText="my workshop"
        ></InfoListItem>
      )}
      {!workshop.isOwnerMe && (
        <InfoListItem
          ionicIcon={person}
          displayText={workshop.owner.name ?? "impromat"}
        ></InfoListItem>
      )}
      <div>
        <span
          id={`updated-and-created-popover-${workshop.id}`}
          style={{ cursor: "pointer" }}
        >
          <Icon icon={calendar}></Icon> {workshopUpdatedAtText}
        </span>
        <IonPopover
          trigger={`updated-and-created-popover-${workshop.id}`}
          triggerAction="click"
        >
          <IonContent class="ion-padding">
            <IonIcon icon={calendar}></IonIcon> {workshopUpdatedAtText}{" "}
            (updated)
          </IonContent>
          <IonContent class="ion-padding">
            <IonIcon icon={calendar}></IonIcon> {workshopCreatedAtText}{" "}
            (created)
          </IonContent>
        </IonPopover>
      </div>
    </>
  );
};
