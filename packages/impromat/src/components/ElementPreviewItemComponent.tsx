import { IonBadge, IonItem, IonLabel, IonNote, IonText } from "@ionic/react";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { TagsComponent } from "./TagsComponent";

const ElementPreviewItem_ElementFragment = graphql(`
  fragment ElementPreviewItem_Element on Element {
    id
    createdAt
    updatedAt
    version
    deleted
    name
    markdown
    tags {
      name
    }
    usedBy {
      id
    }
    languageCode
    sourceUrl
    sourceName
    sourceBaseUrl
    licenseName
    licenseUrl
    owner {
      id
    }
    ...CustomElement_Element
  }
`);

interface ContainerProps {
  routerLink: string;
  workshopElementFragment: FragmentType<
    typeof ElementPreviewItem_ElementFragment
  >;
}

/**
 * Renders a workshop element as an `IonItem` to preview general information.
 * Use within an `IonList` component.
 */
export const ElementPreviewItemComponent: React.FC<ContainerProps> = ({
  routerLink,
  workshopElementFragment,
}) => {
  const element = getFragmentData(
    ElementPreviewItem_ElementFragment,
    workshopElementFragment,
  );
  return (
    <IonItem routerLink={routerLink}>
      <IonLabel className="ion-text-wrap">
        <IonText color="medium" style={{ float: "right" }}>
          <IonNote>{element.sourceName}</IonNote>
          {element.languageCode && (
            <span style={{ paddingLeft: "4px" }}>
              <IonBadge color="light">
                {element.languageCode.toUpperCase()}
              </IonBadge>
            </span>
          )}
        </IonText>
        {element.name}
        <div style={{ marginTop: "4px" }}>
          <TagsComponent tags={element.tags.map((t) => t.name)}></TagsComponent>
        </div>
      </IonLabel>
    </IonItem>
  );
};
