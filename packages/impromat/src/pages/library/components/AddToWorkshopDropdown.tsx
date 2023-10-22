import { IonIcon, IonSelect, IonSelectOption } from "@ionic/react";
import { add } from "ionicons/icons";

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
  return (
    <IonSelect
      labelPlacement="floating"
      label="Add to Workshop"
      interface="action-sheet"
      aria-label="Select workshop to add"
      value={workshopId}
      onIonChange={(e) => {
        onWorkshopIdChange(e.detail.value);
      }}
      placeholder="Select workshop"
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
