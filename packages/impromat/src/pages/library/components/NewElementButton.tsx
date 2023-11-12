import { IonButton, IonFab, IonLabel } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { routeLibraryCreateCustomElement } from "../../../routes/library-routes";

interface ContainerProps {}

export const NewElementButton: React.FC<ContainerProps> = () => {
  const { t } = useTranslation("NewElementButton");
  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonButton
        color="secondary"
        routerLink={routeLibraryCreateCustomElement()}
      >
        <IonLabel>{t("NewElement")}</IonLabel>
      </IonButton>
    </IonFab>
  );
};
