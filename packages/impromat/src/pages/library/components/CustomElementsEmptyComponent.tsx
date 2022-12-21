import { IonIcon } from "@ionic/react";
import { addCircle } from "ionicons/icons";

export const CustomElementsEmptyComponent: React.FC = () => {
  return (
    <div className="ion-padding">
      <h1>Your Individual Elements</h1>
      <p>
        You cannot find the improv exercise or game that you are always playing
        in your group? Do you have an idea for a new element that you want to
        bring into the next improvisational theatre workshop?
      </p>
      <p>
        Here you can manage your custom exercises and games. Create them for
        yourself or contribute them to the ever growing improv community by
        making it accessible to others.
      </p>
      <p>
        Click on the <IonIcon icon={addCircle}></IonIcon> to add a new element.
      </p>
    </div>
  );
};
