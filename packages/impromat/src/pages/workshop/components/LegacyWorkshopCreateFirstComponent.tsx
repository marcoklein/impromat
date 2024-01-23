import { IonButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { useTranslation } from "react-i18next";

interface ContainerProps {
  onCreateWorkshopClick: () => void;
}

export const LegacyWorkshopCreateFirstComponent: React.FC<ContainerProps> = ({
  onCreateWorkshopClick,
}) => {
  const { t } = useTranslation("WorkshopsCreateFirstComponent");
  return (
    <div
      className="ion-padding"
      style={{
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p>{t("StartWorkshop")}</p>
      <IonButton expand="full" onClick={() => onCreateWorkshopClick()}>
        <IonIcon slot="start" icon={add}></IonIcon>
        {t("AddWorkshop")}
      </IonButton>
    </div>
  );
};
