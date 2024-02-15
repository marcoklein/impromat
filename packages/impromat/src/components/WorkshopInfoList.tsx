import { Event, Favorite, Link, Person, Public } from "@mui/icons-material";
import { useMemo } from "react";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
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
          icon={<Favorite color="like" />}
          displayText="liked"
        ></InfoListItem>
      )}
      {workshop.isPublic && (
        <InfoListItem
          icon={
            workshop.isListed ? (
              <Public color="success" />
            ) : (
              <Link color="success" />
            )
          }
          displayText={
            workshop.isListed ? "publicly shared" : "shared via link"
          }
        ></InfoListItem>
      )}
      {workshop.isOwnerMe && (
        <InfoListItem
          icon={<Person color="primary" />}
          displayText="my workshop"
        ></InfoListItem>
      )}
      {!workshop.isOwnerMe && (
        <InfoListItem
          icon={<Person />}
          displayText={workshop.owner.name ?? "impromat"}
        ></InfoListItem>
      )}
      {dateOfWorkshopText && (
        <InfoListItem
          icon={<Event />}
          displayText={dateOfWorkshopText}
        ></InfoListItem>
      )}
    </>
  );
};
