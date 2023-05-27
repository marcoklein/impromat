import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { close, heart, person } from "ionicons/icons";
import { UserWorkshopsFilterInput } from "../graphql-client/graphql";
import { COLOR_LIKE, COLOR_USER_CREATED } from "../theme/theme-colors";

interface WorkshopsFilter extends UserWorkshopsFilterInput {}

interface ContainerProps {
  filterInput: WorkshopsFilter;
  onFilterInputChange: (filterInput: WorkshopsFilter) => void;
}

/**
 * Renders a list of icons and text. Use with `PreviewCard`.
 */
export const WorkshopsFilterBar: React.FC<ContainerProps> = ({
  filterInput,
  onFilterInputChange,
}) => {
  return (
    <div
      className="ion-padding-horizontal"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <IonChip
        outline={!filterInput.liked}
        onClick={() => {
          const newFilter = {
            ...filterInput,
            ...{ liked: !filterInput.liked },
          };
          onFilterInputChange(newFilter);
        }}
      >
        <IonIcon icon={heart} color={COLOR_LIKE}></IonIcon>
        <IonLabel>Liked</IonLabel>
        {filterInput.liked && <IonIcon icon={close}></IonIcon>}
      </IonChip>
      <IonChip
        outline={!filterInput.owned}
        onClick={() => {
          const newFilter = {
            ...filterInput,
            ...{ owned: !filterInput.owned },
          };
          onFilterInputChange(newFilter);
        }}
      >
        <IonIcon icon={person} color={COLOR_USER_CREATED}></IonIcon>
        <IonLabel>My Workshop</IonLabel>
        {filterInput.owned && <IonIcon icon={close}></IonIcon>}
      </IonChip>
    </div>
  );
};
