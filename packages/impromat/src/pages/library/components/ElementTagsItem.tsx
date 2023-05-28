import {
  IonButton,
  IonChip,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSearchbar,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { useRef, useState } from "react";
import { useQuery } from "urql";
import { getFragmentData, graphql } from "../../../graphql-client";
import { ElementTagsItem_ElementTagFragment } from "../../../graphql-client/graphql";

const ElementTagsItem_Query = graphql(`
  query LibraryCreateCustomElementTags_Query($filter: ElementTagsFilterInput!) {
    tags(filter: $filter) {
      ...ElementTagsItem_ElementTag
    }
  }
`);

const ElementTagsItem_ElementTag = graphql(`
  fragment ElementTagsItem_ElementTag on ElementTag {
    id
    name
  }
`);

interface Tag {
  id: string;
  name: string;
}

interface ContainerProps {
  tags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
}

export const ElementTagsItem: React.FC<ContainerProps> = ({
  tags,
  onTagsChange,
}) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [elementSearchValue, setElementSearchValue] = useState("");
  const [elementTagsQueryResult, reexecuteElementTagsQuery] = useQuery({
    query: ElementTagsItem_Query,
    variables: {
      filter: {
        text: elementSearchValue,
      },
    },
  });
  const elementTags = getFragmentData(
    ElementTagsItem_ElementTag,
    elementTagsQueryResult.data?.tags,
  );
  const onPickTagElementClick = (tag: ElementTagsItem_ElementTagFragment) => {
    modal.current?.dismiss();
    const existingTag = tags.find(({ name: tagName }) => tagName === tag.name);
    if (!existingTag) {
      const newTags = [...tags, tag];
      onTagsChange(newTags);
    }
  };

  const removeTagClicked = (tagName: string) => {
    const newTags = tags.filter(
      ({ name: existingTagName }) => existingTagName !== tagName,
    );
    onTagsChange(newTags);
  };
  return (
    <>
      <IonItem className="ion-text-wrap">
        <div>
          {tags.map(({ id, name: tagName }) => (
            <IonChip id={id} onClick={() => removeTagClicked(tagName)}>
              {tagName}
              <IonIcon icon={close}></IonIcon>
            </IonChip>
          ))}
        </div>
        <IonButton id="open-modal">Add Tag</IonButton>
      </IonItem>
      <IonModal
        ref={modal}
        trigger="open-modal"
        initialBreakpoint={0.5}
        breakpoints={[0, 0.25, 0.5, 0.75]}
        style={{ "--width": "fit-content", "--min-width": "768px" }}
        showBackdrop={true}
      >
        <IonContent className="ion-padding">
          <IonSearchbar
            value={elementSearchValue}
            onIonInput={(e) => setElementSearchValue(e.detail.value ?? "")}
            onIonChange={() => {
              reexecuteElementTagsQuery();
            }}
            onClick={() => modal.current?.setCurrentBreakpoint(0.75)}
            placeholder="Enter Tag"
          ></IonSearchbar>
          <IonList>
            {elementTags?.map((tag) => (
              <IonItem
                disabled={
                  !!tags.find(({ name: tagName }) => tagName === tag.name)
                }
                button
                id={tag.name}
                onClick={() => onPickTagElementClick(tag)}
              >
                <IonLabel>{tag.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};
