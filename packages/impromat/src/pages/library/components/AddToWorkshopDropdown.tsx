import { IonIcon, IonSelect, IonSelectOption } from "@ionic/react";
import { add } from "ionicons/icons";
import { useTranslation } from "react-i18next";

interface ContainerProps {
  workshopId: string | undefined;
  onWorkshopIdChange: (workshopId: string) => void;
  workshops: { id: string; name: string }[];
}

export const AddToWorkshopDropdown: React.FC<ContainerProps> = ({
  workshopId,
  onWorkshopIdChange,
  workshops,
}) => {
  const { t } = useTranslation("AddToWorkshopDropdown");
  return (
    <IonSelect
      labelPlacement="floating"
      label={t("AddToWorkshop")}
      interface="action-sheet"
      aria-label={t("SelectWorkshop")}
      value={workshopId}
      onIonChange={(e) => {
        onWorkshopIdChange(e.detail.value);
      }}
      placeholder={t("SelectWorkshop")}
    >
      {workshops.map(({ id, name }) => (
        <IonSelectOption key={id} value={id}>
          <IonIcon icon={add}></IonIcon>
          {name}
        </IonSelectOption>
      ))}
    </IonSelect>
  );
};
