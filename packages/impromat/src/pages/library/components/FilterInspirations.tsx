import {
  IonChip,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import React, { useCallback, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";

interface ContainerProps {
  onTagsChange: (tags: string[]) => void;
  filterLanguage: string;
}

export const FilterInspirations: React.FC<ContainerProps> = ({
  onTagsChange,
  filterLanguage,
}) => {
  const { t } = useTranslation("FilterInspirations");
  const onFilterInspirationClick = useCallback(
    (tags: string[]) => {
      onTagsChange(tags);
    },
    [onTagsChange],
  );

  const tagInspirationsEn = useMemo(
    () => [
      ["warmup", "character"],
      ["exercise", "listening"],
      ["game", "replay"],
    ],
    [],
  );
  const tagInspirationsDe = useMemo(
    () => [
      ["Aufwärmspiel", "Kennenlernen"],
      ["Übung", "Zuhören"],
      ["Spiel", "Action"],
    ],
    [],
  );
  const tagInspirations = useMemo(
    () => (filterLanguage === "en" ? tagInspirationsEn : tagInspirationsDe),
    [filterLanguage, tagInspirationsEn, tagInspirationsDe],
  );

  return (
    <div className="ion-padding">
      <h1>
        {t(
          "Use the top filter bar to search over 1000 improv exercises and games.",
        )}
      </h1>
      <IonListHeader>
        <IonLabel>{t("or start with these inspirations:")}</IonLabel>
      </IonListHeader>
      <IonList>
        {tagInspirations.map((tags, index) => (
          <IonItem
            key={tags.join("-")}
            onClick={() => onFilterInspirationClick(tags)}
            button
          >
            <Trans
              t={t}
              i18nKey={`tagsInspiration${index}`}
              values={{ tagA: tags[0], tagB: tags[1] }}
              components={{
                Tag: <IonChip outline />,
              }}
            ></Trans>
          </IonItem>
        ))}
      </IonList>
    </div>
  );
};
