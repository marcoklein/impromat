import { IonSpinner } from "@ionic/react";
import { useEffect, useState } from "react";
import { DeepReadonlyObject } from "rxdb";
import { ElementDocType } from "../../../database/collections/element/element-collection";
import { SectionDocument } from "../../../database/collections/section/section-collection";
import { WorkshopDocument } from "../../../database/collections/workshop/workshop-collection";
import { useDocument } from "../../../database/use-document";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useImpromatRxDb } from "../../../hooks/use-impromat-rx-db";
import { useStateChangeLogger } from "../../../hooks/use-state-change-logger";
import { WorkshopElementItemComponent } from "./WorkshopElementItemComponent";

interface ContainerProps {
  workshop: WorkshopDocument;
  section: SectionDocument;
  onRemoveClick: (element: DeepReadonlyObject<ElementDocType>) => void;
  isReordering: boolean;
}

export const SectionElementsComponent: React.FC<ContainerProps> = ({
  workshop,
  section: sectionInput,
  onRemoveClick,
  isReordering,
}) => {
  const [elements, setElements] = useState<
    DeepReadonlyObject<ElementDocType>[]
  >([]);
  const { document: section, isFetching: isSectionFetching } = useDocument(
    "sections",
    sectionInput.id,
  );
  const rxdb = useImpromatRxDb();
  const logger = useComponentLogger("SectionElementsComponent");
  useEffect(() => {
    logger(section);
  }, [section, logger]);

  useStateChangeLogger(section, "section", logger);
  useStateChangeLogger(isSectionFetching, "isSectionFetching", logger);

  useEffect(() => {
    if (section) {
      const updateElementsOfSection = () => {
        logger("Searching for elements:", section.elements);
        const sectionElementIds = section.elements;
        logger("Mapped section element ids", sectionElementIds);
        rxdb.elements
          .findByIds(sectionElementIds ?? [])
          .then((sectionElements) => {
            const fetchedElements: DeepReadonlyObject<ElementDocType>[] = [];
            for (const elementId of sectionElementIds) {
              const currentElement = sectionElements.get(elementId);
              if (!currentElement) {
                console.warn(
                  "Could not find element with id",
                  elementId,
                  "in section",
                  section.id,
                  "elements",
                );
                continue;
              }
              fetchedElements.push(currentElement.toJSON());
            }
            setElements(fetchedElements);
          })
          .catch((error) => {
            console.error(
              "Could not fetch elements of section",
              section.id,
              error,
            );
          });
      };
      // TODO only listen for element ids!
      const subscription = rxdb.$.subscribe(() => {
        updateElementsOfSection();
      });
      updateElementsOfSection();
      return () => {
        subscription.unsubscribe();
      };
    } else {
      setElements([]);
    }
  }, [section, rxdb, logger]);

  if (!section) {
    return <IonSpinner></IonSpinner>;
  }
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
