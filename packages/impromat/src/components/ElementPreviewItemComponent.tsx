import { IonBadge, IonItem, IonLabel, IonNote, IonText } from "@ionic/react";
import { ElementDocType } from "../database/collections/element/element-collection";
import { TagsComponent } from "./TagsComponent";

interface ContainerProps {
  routerLink: string;
  workshopElement: ElementDocType;
}

/**
 * Renders a workshop element as an `IonItem` to preview general information.
 * Use within an `IonList` component.
 */
export const ElementPreviewItemComponent: React.FC<ContainerProps> = ({
  routerLink,
  workshopElement: element,
}) => (
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
        <TagsComponent tags={element.tags}></TagsComponent>
      </div>
    </IonLabel>
  </IonItem>
);
