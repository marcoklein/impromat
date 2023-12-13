import { calendar, globe, heart, link, person } from "ionicons/icons";
import { useMemo } from "react";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { COLOR_LIKE, COLOR_USER_CREATED } from "../theme/theme-colors";
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
    dateOfWorkshop
    owner {
      id
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

  const dateOfWorkshopText = useMemo(
    () =>
      workshop.dateOfWorkshop &&
      new Date(workshop.dateOfWorkshop).toLocaleDateString(),
    [workshop],
  );

  return (
    <>
      {workshop.isLiked && (
        <InfoListItem
          ionicIcon={heart}
          color={COLOR_LIKE}
          displayText="liked"
          xs={{
            hideText: true,
          }}
        ></InfoListItem>
      )}
      {workshop.isPublic && (
        <InfoListItem
          ionicIcon={workshop.isListed ? globe : link}
          color="success"
          displayText={
            workshop.isListed ? "publicly shared" : "shared via link"
          }
          xs={{
            hideText: true,
          }}
        ></InfoListItem>
      )}
      {workshop.isOwnerMe && (
        <InfoListItem
          ionicIcon={person}
          color={COLOR_USER_CREATED}
          displayText="my workshop"
          xs={{
            hideText: true,
          }}
        ></InfoListItem>
      )}
      {!workshop.isOwnerMe && (
        <InfoListItem
          ionicIcon={person}
          displayText={workshop.owner.name ?? "impromat"}
          xs={{
            hideText: true,
          }}
        ></InfoListItem>
      )}
      {dateOfWorkshopText && (
        <InfoListItem
          ionicIcon={calendar}
          displayText={dateOfWorkshopText}
        ></InfoListItem>
      )}
    </>
  );
};
