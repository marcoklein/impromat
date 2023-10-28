import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useStateChangeLogger } from "../../../hooks/use-state-change-logger";
import { WorkshopElementItem } from "./WorkshopElementItem";

const SectionElementsComponent_WorkshopSection = graphql(`
  fragment SectionElementsComponent_WorkshopSection on WorkshopSection {
    id
    name
    isCollapsed
    orderIndex
    elements {
      id
      ...WorkshopElementItemComponent_WorkshopElement
    }
    workshop {
      id
      canEdit
    }
  }
`);

interface ContainerProps {
  workshopId: string;
  sectionFragment: FragmentType<
    typeof SectionElementsComponent_WorkshopSection
  >;
  onRemoveClick: (elementId: string) => void;
  isReordering: boolean;
}

export const SectionElementsComponent: React.FC<ContainerProps> = ({
  workshopId,
  sectionFragment,
  onRemoveClick,
  isReordering,
}) => {
  const logger = useComponentLogger("SectionElementsComponent");
  const section = getFragmentData(
    SectionElementsComponent_WorkshopSection,
    sectionFragment,
  );
  const elements = section.elements;

  useStateChangeLogger(section, "section", logger);

  if (
    section.workshop.canEdit &&
    (section.isCollapsed || !section.elements.length)
  ) {
    return <></>;
  }

  return (
    <>
      {elements.map((element) => (
        <WorkshopElementItem
          workshopElementFragment={element}
          key={element.id}
          routerLink={`/workshop/${workshopId}/part/${element.id}`}
          onRemoveClick={() => onRemoveClick(element.id)}
          isReordering={isReordering}
        ></WorkshopElementItem>
      ))}
    </>
  );
};
