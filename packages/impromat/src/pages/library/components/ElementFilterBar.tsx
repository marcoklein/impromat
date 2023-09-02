import { IonChip, IonLabel } from "@ionic/react";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";

export const ElementFilterBar_Query = graphql(`
  fragment ElementFilterBar_Query on Query {
    tags(take: 200, filter: { selectedTagNames: $selectedTagNames }) {
      id
      name
    }
  }
`);

interface ContainerProps {
  queryFragment: FragmentType<typeof ElementFilterBar_Query>;
  selectedTagNames: string[];
  loadingAvailableTags: boolean;
  onTagsChange: (tags: string[]) => void;
}

/**
 * Search for a specific workshop element. Search includes all elements from the improbib and all custom elements.
 */
export const ElementFilterBar: React.FC<ContainerProps> = ({
  queryFragment,
  selectedTagNames,
  loadingAvailableTags,
  onTagsChange,
}) => {
  const tags = getFragmentData(ElementFilterBar_Query, queryFragment).tags;

  return (
    <div>
      {/* <IonChip>
        <IonIcon icon={filter}></IonIcon>
        <IonLabel>Filter</IonLabel>
      </IonChip> */}
      {/* <IonChip>
        <IonSelect value="en">
          <IonSelectOption value="en">EN</IonSelectOption>
          <IonSelectOption value="de">DE</IonSelectOption>
        </IonSelect>
      </IonChip> */}
      {/* <IonChip outline>
        <IonIcon color={COLOR_LIKE} icon={heart}></IonIcon>
        <IonLabel>liked</IonLabel>
      </IonChip> */}
      {selectedTagNames.map((tagName) => (
        <IonChip
          style={{ "--background": "var(--ion-color-primary)" }}
          key={tagName}
          onClick={() => {
            const newSelectedTagNames = selectedTagNames.filter(
              (selectedTagName) => selectedTagName !== tagName,
            );
            onTagsChange(newSelectedTagNames);
          }}
        >
          <IonLabel color="light">{tagName}</IonLabel>
        </IonChip>
      ))}
      {tags.map((tag) => (
        <IonChip
          outline
          key={tag.id}
          onClick={() => {
            onTagsChange([...new Set([...selectedTagNames, tag.name])]);
          }}
          disabled={loadingAvailableTags}
        >
          <IonLabel>
            {tag.name}
            {/* <IonNote>DE</IonNote> */}
          </IonLabel>
        </IonChip>
      ))}
    </div>
  );
};
