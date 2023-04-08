import {
  IonBadge,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonText,
} from "@ionic/react";
import { eye } from "ionicons/icons";
import { FragmentType, getFragmentData, graphql } from "../graphql-client";
import { ElementVisibility } from "../graphql-client/graphql";
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
    visibility
    owner {
      id
    }
    ...CustomElement_Element
  }
`);

interface ContainerProps {
  routerLink: string;
  /**
   * If true, shows an extra icon to depict elements with a PUBLIC visibility.
   */
  showVisibility?: boolean;
  workshopElementFragment: FragmentType<
    typeof ElementPreviewItem_ElementFragment
  >;
}

/**
 * Renders a workshop element as an `IonItem` to preview general information.
 * Use within an `IonList` component.
 */
export const ElementPreviewItemComponent: React.FC<ContainerProps> = ({
  showVisibility,
  routerLink,
  workshopElementFragment,
}) => {
  const element = getFragmentData(
    ElementPreviewItem_ElementFragment,
    workshopElementFragment,
  );
  return (
    <IonItem routerLink={routerLink}>
      {showVisibility && element.visibility === ElementVisibility.Public && (
        <IonIcon slot="start" icon={eye} color="tertiary"></IonIcon>
      )}
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
