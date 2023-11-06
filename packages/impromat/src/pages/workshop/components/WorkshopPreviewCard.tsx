import { IonButton, IonCardContent } from "@ionic/react";
import { useMemo } from "react";
import { useHistory } from "react-router";
import { PreviewCard } from "../../../components/PreviewCard";
import { WorkshopInfoList } from "../../../components/WorkshopInfoList";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { routeWorkshop } from "../../../routes/shared-routes";
import { WorkshopOptionsMenu } from "../WorkshopOptionsMenu";
import { useTranslation } from "react-i18next";

const WorkshopPreviewItem_WorkshopFragment = graphql(`
  fragment WorkshopPreviewItem_Workshop on Workshop {
    id
    version
    createdAt
    updatedAt
    deleted
    name
    description
    canEdit
    sections {
      id
      name
      elements {
        id
        basedOn {
          id
          name
        }
      }
    }
    ...WorkshopInfoList_Workshop
    ...WorkshopOptionsMenu_Workshop
  }
`);

interface ContainerProps {
  workshopFragment: FragmentType<typeof WorkshopPreviewItem_WorkshopFragment>;
}

export const WorkshopPreviewCard: React.FC<ContainerProps> = ({
  workshopFragment,
}) => {
  const workshop = getFragmentData(
    WorkshopPreviewItem_WorkshopFragment,
    workshopFragment,
  );

  const history = useHistory();

  const elementNames = useMemo(
    () =>
      workshop.sections.flatMap((section) =>
        section.elements.map((element) => element.basedOn.name),
      ),
    [workshop],
  );
  const { t } = useTranslation("WorkshopPreviewCard");

  return (
    <PreviewCard
      onCardClick={() => {
        history.push(routeWorkshop(workshop.id));
      }}
      infoListElement={
        <WorkshopInfoList workshopFragment={workshop}></WorkshopInfoList>
      }
      titleElement={<>{workshop.name}</>}
      buttonsElement={
        <>
          <IonButton
            style={{ flexGrow: 1 }}
            fill="clear"
            routerLink={routeWorkshop(workshop.id)}
          >
            {t("Open", { ns: "common" })}
          </IonButton>
          {workshop.canEdit && (
            <WorkshopOptionsMenu
              workshopFragment={workshop}
            ></WorkshopOptionsMenu>
          )}
        </>
      }
    >
      <IonCardContent>{workshop.description}</IonCardContent>
      {elementNames.length === 0 && (
        <IonCardContent>{t("OpenWorkshop")}</IonCardContent>
      )}
      {elementNames.length > 0 && (
        <IonCardContent>
          {t("Games")}
          {elementNames.join(", ")}
        </IonCardContent>
      )}
    </PreviewCard>
  );
};
