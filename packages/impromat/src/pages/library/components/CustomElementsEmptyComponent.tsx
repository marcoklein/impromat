import { IonIcon } from "@ionic/react";
import { addCircle } from "ionicons/icons";

export const CustomElementsEmptyComponent: React.FC = () => {
  return (
    <div className="ion-padding">
      <h1>Your Individual Elements</h1>
      <p>
        Are you struggling to find a specific improv exercise or game that you
        usually play in your group? Or, do you have an exciting new idea for an
        element that you want to introduce in your next improvisational theatre
        workshop?
      </p>
      <p>
        Look no further! Here you can manage custom exercises and games. You can
        create them for your personal use or share them with the ever-growing
        improv community by making them accessible to others.
      </p>
      <p>
        Click on the <IonIcon icon={addCircle}></IonIcon> to add a new element.
      </p>
    </div>
  );
};
