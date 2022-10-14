import { IonBadge, IonText } from "@ionic/react";

interface ContainerProps {
  tags: string[] | null | undefined;
}

/**
 * Renders a list of tags.
 */
export const TagsComponent: React.FC<ContainerProps> = ({ tags }) => (
  <>
    {tags &&
      tags.map((tagName) => (
        <IonBadge key={tagName} color="light" style={{ marginRight: "4px" }}>
          <IonText color="medium">{tagName}</IonText>
        </IonBadge>
      ))}
  </>
);
