import { IonItem, IonLabel } from "@ionic/react";
import { useTranslation } from "react-i18next";
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

  const { t } = useTranslation("LicenseItemComponent");

  return (
    <IonItem color="" lines="none">
      <Icon tablerIcon="license" slot="start"></Icon>
      <IonLabel className="ion-text-wrap">
        {t("Based on")} "{OptionalLink(name, sourceUrl)}"
        {authorName && (
          <>
            {" "}
            {t("from")} {OptionalLink(authorName, authorUrl)}
            {licenseName && (
              <>
                , {t("licensed under")} {OptionalLink(licenseName, licenseUrl)}
              </>
            )}
          </>
        )}
      </IonLabel>
    </IonItem>
  );
};
