import { IonIcon, IonSelect, IonSelectOption } from "@ionic/react";
import { brush, heart } from "ionicons/icons";
import { UserElementsFilterInput } from "../graphql-client/graphql";
import { usePersistedState } from "../hooks/use-persisted-state";
import { COLOR_LIKE, COLOR_MY_WORKSHOP } from "../theme/theme-colors";

interface ContainerProps {
  filterInput: UserElementsFilterInput;
  onFilterInputChange: (filterInput: UserElementsFilterInput) => void;
}

/**
 * Renders a list of icons and text. Use with `PreviewCard`.
 */
export const ElementsFilterBar: React.FC<ContainerProps> = ({
  filterInput,
  onFilterInputChange,
}) => {
  const [currentFilter, setCurrentFilter] = usePersistedState<{
    value: string;
  }>("elements-filter-bar", { value: "explore" });
  const handleFilterChange = (action: string) => {
    if (action === "explore") {
      onFilterInputChange({
        public: true,
        liked: true,
        owned: true,
        searchText: filterInput.searchText,
      });
    } else if (action === "liked") {
      onFilterInputChange({
        public: false,
        liked: true,
        owned: false,
        searchText: filterInput.searchText,
      });
    } else if (action === "owned") {
      onFilterInputChange({
        public: false,
        liked: false,
        owned: true,
        searchText: filterInput.searchText,
      });
    }
    setCurrentFilter({ value: action });
  };

  return (
    <div
      className="ion-padding-horizontal"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* <IonIcon icon={filter} className="ion-margin-end"></IonIcon>
      <IonChip
        outline={!filterInput.public}
        onClick={() => {
          const newFilter = {
            ...filterInput,
            ...{ public: !filterInput.public },
          };
          onFilterInputChange(newFilter);
        }}
      >
        <IonIcon icon={globe} color="success"></IonIcon>
        <IonLabel>Public</IonLabel>
        {filterInput.public && <IonIcon icon={close}></IonIcon>}
      </IonChip>
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
        <IonIcon icon={brush} color={COLOR_MY_WORKSHOP}></IonIcon>
        <IonLabel>My Element</IonLabel>
        {filterInput.owned && <IonIcon icon={close}></IonIcon>}
      </IonChip> */}
      <IonSelect
        aria-label="fruit"
        placeholder="Select fruit"
        interface="popover"
        value={currentFilter.value}
        onIonChange={(event) => handleFilterChange(event.detail.value)}
      >
        <IonSelectOption value="explore">Explore</IonSelectOption>
        <IonSelectOption value="liked">
          <IonIcon icon={heart} color={COLOR_LIKE}></IonIcon> Liked
        </IonSelectOption>
        <IonSelectOption value="owned">
          <IonIcon icon={brush} color={COLOR_MY_WORKSHOP}></IonIcon> My Elements
        </IonSelectOption>
      </IonSelect>
    </div>
  );
};
