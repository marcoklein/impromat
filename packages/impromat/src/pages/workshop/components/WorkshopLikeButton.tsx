import { useCallback } from "react";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useUpdateUserLikedWorkshopMutation } from "../../../hooks/use-update-liked-workshop-mutation";
import { LikeIconButton } from "../../library/LikeIconButton";

const WorkshopLikeIconButton_Workshop = graphql(`
  fragment WorkshopLikeIconButton_Workshop on Workshop {
    id
    isLiked
  }
`);

interface ContainerProps {
  workshopFragment: FragmentType<typeof WorkshopLikeIconButton_Workshop>;
}

export const WorkshopLikeIconButton: React.FC<ContainerProps> = ({
  workshopFragment,
}) => {
  const [
    updateUserFavoriteWorkshopMutationResult,
    updateUserFavoriteWorkshopMutation,
  ] = useUpdateUserLikedWorkshopMutation();

  const workshop = getFragmentData(
    WorkshopLikeIconButton_Workshop,
    workshopFragment,
  );

  const onStarWorkshopClick = useCallback(() => {
    if (workshop.isLiked === true) {
      updateUserFavoriteWorkshopMutation({
        input: { workshopId: workshop.id, isLiked: false },
      });
    } else {
      updateUserFavoriteWorkshopMutation({
        input: { workshopId: workshop.id, isLiked: true },
      });
    }
  }, [workshop, updateUserFavoriteWorkshopMutation]);

  return (
    <LikeIconButton
      onClick={onStarWorkshopClick}
      isLiked={!workshop.isLiked}
      disabled={updateUserFavoriteWorkshopMutationResult.fetching}
    />
  );
};
