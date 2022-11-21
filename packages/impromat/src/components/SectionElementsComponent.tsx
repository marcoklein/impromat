import { useEffect, useState } from "react";
import { ElementDocument } from "../store/collections/element-collection";
import { SectionDocument } from "../store/collections/section-collection";
import { WorkshopDocument } from "../store/collections/workshop-collection";
import { WorkshopElementItemComponent } from "./WorkshopElementItemComponent";

interface ContainerProps {
  workshop: WorkshopDocument;
  section: SectionDocument;
  onRemoveClick: (element: ElementDocument) => void;
  isReordering: boolean;
}

export const SectionElementsComponent: React.FC<ContainerProps> = ({
  workshop,
  section,
  onRemoveClick,
  isReordering,
}) => {
  // const { document: section, isFetching } = useDocument("sections", sectionId);
  const [elements, setElements] = useState<ElementDocument[]>([]);
  useEffect(() => {
    if (section) {
      section.populateElements().then(setElements);
    } else {
      setElements([]);
    }
  }, [section]);

  if (section.isCollapsed || !section.elements || !elements) {
    return <></>;
  }

  return (
    <>
      {elements.map((element) => (
        <WorkshopElementItemComponent
          workshopElement={element}
          key={element.id}
          routerLink={`/workshop/${workshop.id}/part/${element.id}`}
          onRemoveClick={() => onRemoveClick(element)}
          isReordering={isReordering}
        ></WorkshopElementItemComponent>
      ))}
    </>
  );
};
