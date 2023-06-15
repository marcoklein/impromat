import { IonItem, IonLabel } from "@ionic/react";
import { Icon } from "./Icon";

interface ContainerProps {
  name?: string | null;
  sourceUrl?: string | null;
  authorName?: string | null;
  authorUrl?: string | null;
  licenseUrl?: string | null;
  licenseName?: string | null;
}

export const LicenseItemComponent: React.FC<ContainerProps> = ({
  name,
  sourceUrl,
  authorUrl,
  authorName,
  licenseName,
  licenseUrl,
}) => {
  const OptionalLink = (
    text: string | undefined | null,
    url: string | undefined | null,
  ) =>
    url ? (
      <a href={url} target="_blank" rel="noreferrer">
        {text}
      </a>
    ) : (
      text
    );

  return (
    <IonItem color="" lines="none">
      <Icon tablerIcon="license" slot="start"></Icon>
      <IonLabel className="ion-text-wrap">
        Based on "{OptionalLink(name, sourceUrl)}"
        {authorName && (
          <>
            {" "}
            from {OptionalLink(authorName, authorUrl)}
            {licenseName && (
              <>, licensed under {OptionalLink(licenseName, licenseUrl)}</>
            )}
          </>
        )}
      </IonLabel>
    </IonItem>
  );
};
