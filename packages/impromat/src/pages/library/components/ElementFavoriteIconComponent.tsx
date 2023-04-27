import { IonButton, IonIcon } from "@ionic/react";
import { star, starOutline } from "ionicons/icons";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useUpdateUserFavoriteElementMutation } from "../../../hooks/use-update-favorite-element-mutation";
import { useCallback } from "react";

const ElementFavoriteIcon_ElementFragment = graphql(`
  fragment ElementFavoriteIcon_Element on Element {
    id
    isFavorite
  }
`);

interface ContainerProps {
  elementFragment: FragmentType<typeof ElementFavoriteIcon_ElementFragment>;
}

export const ElementFavoriteIconComponent: React.FC<ContainerProps> = ({
  elementFragment,
}) => {
  const [, updateUserFavoriteElementMutation] =
    useUpdateUserFavoriteElementMutation();

  const element = getFragmentData(
    ElementFavoriteIcon_ElementFragment,
    elementFragment,
  );

  const onStarElementClick = useCallback(() => {
    if (!element) {
      return;
    }

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
    <IonButton onClick={() => onStarElementClick()} fill="clear">
      <IonIcon
        slot="icon-only"
        icon={element?.isFavorite ? star : starOutline}
        aria-label={
          element?.isFavorite ? "Remove from favorites." : "Add to favorites."
        }
      ></IonIcon>
    </IonButton>
  );
};
