import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PreviewCard } from "../../../components/PreviewCard";
import { WorkshopInfoList } from "../../../components/WorkshopInfoList";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { routeWorkshop } from "../../../routes/shared-routes";
import { WorkshopOptionsMenu } from "./WorkshopOptionsMenu";

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

  const elementNames = useMemo(
    () =>
      workshop.sections.flatMap((section) =>
        section.elements.map((element) => element.basedOn.name),
      ),
    [workshop],
  );
  const { t } = useTranslation("WorkshopPreviewCard");

  const workshopContent = useMemo(() => {
    const elementsText =
      elementNames.length > 0
        ? `${t("Games")}${elementNames.join(", ")}`
        : t("OpenWorkshop");
    if (workshop.description) {
      return workshop.description + " " + elementsText;
    }
    return elementsText;
  }, [workshop, elementNames, t]);

  return (
    <PreviewCard
      routerLink={routeWorkshop(workshop.id)}
      infoListElement={
        <WorkshopInfoList workshopFragment={workshop}></WorkshopInfoList>
      }
      title={workshop.name}
      menuButtonElement={
        <>
          {workshop.canEdit && (
            <WorkshopOptionsMenu
              workshopFragment={workshop}
            ></WorkshopOptionsMenu>
          )}
        </>
      }
      content={workshopContent}
    ></PreviewCard>
  );
};
