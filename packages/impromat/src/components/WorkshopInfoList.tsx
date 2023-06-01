import { IonContent, IonIcon, IonPopover } from "@ionic/react";
import { calendar, globe, heart, link, person } from "ionicons/icons";
import { useMemo } from "react";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { COLOR_LIKE, COLOR_USER_CREATED } from "../theme/theme-colors";
import { Icon } from "./Icon";
import { InfoListItem } from "./InfoListItem";
const WorkshopInfoList_Workshop = graphql(`
  fragment WorkshopInfoList_Workshop on Workshop {
    id
    createdAt
    updatedAt
    isPublic
    isListed
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
          color={COLOR_LIKE}
          displayText="liked"
        ></InfoListItem>
      )}
      {workshop.isPublic && (
        <InfoListItem
          ionicIcon={workshop.isListed ? globe : link}
          color="success"
          displayText={
            workshop.isListed ? "publicly shared" : "shared via link"
          }
        ></InfoListItem>
      )}
      {workshop.isOwnerMe && (
        <InfoListItem
          ionicIcon={person}
          color={COLOR_USER_CREATED}
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
