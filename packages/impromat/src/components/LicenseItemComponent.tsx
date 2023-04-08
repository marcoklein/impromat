import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { information } from "ionicons/icons";

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
      <IonIcon icon={information} slot="start"></IonIcon>
      <IonLabel className="ion-text-wrap">
        <p>
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
        </p>
      </IonLabel>
    </IonItem>
  );
};
