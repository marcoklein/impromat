import { useCallback } from "react";
import { FragmentType, getFragmentData, graphql } from "../../graphql-client";
import { useUpdateUserFavoriteElementMutation } from "../../hooks/use-update-favorite-element-mutation";
import { LikeIconButton } from "./LikeIconButton";

const ElementLikeIconButton_Element = graphql(`
  fragment ElementLikeIconButton_Element on Element {
    id
    isFavorite
  }
`);

interface ContainerProps {
  elementFragment: FragmentType<typeof ElementLikeIconButton_Element>;
}

export const ElementLikeIconButton: React.FC<ContainerProps> = ({
  elementFragment,
}) => {
  const [
    updateUserFavoriteElementMutationResult,
    updateUserFavoriteElementMutation,
  ] = useUpdateUserFavoriteElementMutation();

  const element = getFragmentData(
    ElementLikeIconButton_Element,
    elementFragment,
  );

  const onStarElementClick = useCallback(() => {
    if (element.isFavorite === true) {
      updateUserFavoriteElementMutation({
        input: { elementId: element.id, isFavorite: false },
      });
    } else {
      updateUserFavoriteElementMutation({
        input: { elementId: element.id, isFavorite: true },
      });
    }
  }, [element, updateUserFavoriteElementMutation]);

  return (
    <LikeIconButton
      onClick={onStarElementClick}
      isLiked={!!element.isFavorite}
      disabled={updateUserFavoriteElementMutationResult.fetching}
    />
  );
};
