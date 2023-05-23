import { IonIcon } from "@ionic/react";
import { heart } from "ionicons/icons";
import { COLOR_LIKE } from "../../../theme/theme-colors";

export const FavoriteElementsEmptyComponent: React.FC = () => {
  return (
    <div className="ion-padding">
      <p>No likes yet.</p>
      <p>
        Click on the <IonIcon icon={heart} color={COLOR_LIKE}></IonIcon> of
        workshop elements to like them.
      </p>
    </div>
  );
};
