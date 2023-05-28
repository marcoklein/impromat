import { IonButton, IonIcon } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";
import { useCallback } from "react";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useUpdateUserFavoriteElementMutation } from "../../../hooks/use-update-favorite-element-mutation";
import { COLOR_LIKE } from "../../../theme/theme-colors";

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
        icon={element?.isFavorite ? heart : heartOutline}
        color={COLOR_LIKE}
        aria-label={
          element?.isFavorite ? "Remove from likes." : "Add to likes."
        }
      ></IonIcon>
    </IonButton>
  );
};
