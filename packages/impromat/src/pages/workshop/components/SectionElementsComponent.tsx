import { useEffect, useState } from "react";
import { useImpromatRxDb } from "../../../hooks/use-impromat-rx-db";
import { ElementDocument } from "../../../database/collections/element/element-collection";
import { SectionDocument } from "../../../database/collections/section/section-collection";
import { WorkshopDocument } from "../../../database/collections/workshop/workshop-collection";
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
  const rxdb = useImpromatRxDb();
  useEffect(() => {
    if (section) {
      // TODO only listen for element ids!
      const subscription = rxdb.$.subscribe(() => {
        section.populateElements().then(setElements);
      });
      section.populateElements().then(setElements);
      return () => {
        subscription.unsubscribe();
      };
    } else {
      setElements([]);
    }
  }, [section, rxdb]);

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
