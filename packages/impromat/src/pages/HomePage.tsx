import { IonPage } from "@ionic/react";
import { MenuContentComponent } from "../components/menu/MenuContentComponent";

export const HomePage: React.FC = () => {
  return (
    <IonPage>
      <MenuContentComponent></MenuContentComponent>
    </IonPage>
  );
};
