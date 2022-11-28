import { IonIcon } from "@ionic/react";
import { star } from "ionicons/icons";

export const FavoriteElementsEmptyComponent: React.FC = () => {
  return (
    <div className="ion-padding">
      <p>No favorites yet.</p>
      <p>
        Click on the <IonIcon icon={star}></IonIcon> of workshop elements to
        mark an element as a favorite.
      </p>
    </div>
  );
};
