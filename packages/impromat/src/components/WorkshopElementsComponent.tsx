import { IonList, IonReorderGroup, ItemReorderEventDetail } from "@ionic/react";
import immer from "immer";
import { Fragment, useCallback, useEffect, useState } from "react";
import { TRANSLATIONS } from "../functions/shared-text";
import { useImpromatRxDb } from "../hooks/use-impromat-rx-db";
import { useInputDialog } from "../hooks/use-input-dialog";
import { ElementDocType } from "../database/collections/element/element-collection";
import { SectionDocument } from "../database/collections/section/section-collection";
import { WorkshopDocument } from "../database/collections/workshop/workshop-collection";
import { useRxdbMutations } from "../database/use-rxdb-mutations";
import { useComponentLogger } from "../use-component-logger";
import { SectionElementsComponent } from "./SectionElementsComponent";
import { WorkshopElementsHeaderComponent } from "./WorkshopElementsHeaderComponent";
import { WorkshopSectionComponent } from "./WorkshopSectionComponent";

interface ContainerProps {
  workshop: WorkshopDocument;
  onChangeOrder: (fromIndex: number, toIndex: number) => void;
}

export const WorkshopElementsComponent: React.FC<ContainerProps> = ({
  workshop,
  onChangeOrder,
}) => {
  const logger = useComponentLogger("WorkshopElementsComponent");
  const database = useRxdbMutations();
  const [reorderWorkshopElements, setReorderWorkshopElements] = useState(false);
  const [sections, setSections] = useState<SectionDocument[]>([]);
  const [presentInputDialog] = useInputDialog();
  const rxdb = useImpromatRxDb();

  useEffect(() => {
    if (workshop) {
      const subscription = rxdb.collections.sections.$.subscribe(
        (changeEvent) => {
          logger("sectionCollection on change", changeEvent);
          workshop.populateSections().then(setSections);
        },
      );
      workshop.populateSections().then(setSections);
      return () => {
        subscription.unsubscribe();
      };
    } else {
      setSections([]);
    }
  }, [workshop, logger, rxdb]);

  const elementOnRemoveClick = (element: ElementDocType) => {
    if (!database) return;
    database.removePartFromWorkshop(workshop.id, element.id);
  };

  const onElementsReorder = useCallback(
    (event: CustomEvent<ItemReorderEventDetail>) => {
      const fromIndex = event.detail.from;
      const toIndex = event.detail.to;
      onChangeOrder(fromIndex, toIndex);
      // ionic must not reorder DOM nodes
      event.detail.complete(false);
    },
    [onChangeOrder],
  );

  const onReorderEvent = (
    event: "start" | "save" | "cancel",
    isReordering: boolean,
  ) => {
    if (!database) return;
    setReorderWorkshopElements(isReordering);
  };

  const workshopSectionHandlers: Pick<
    React.ComponentPropsWithoutRef<typeof WorkshopSectionComponent>,
    "onCollapseClick" | "onEditClick" | "onRemoveClick"
  > = {
    onCollapseClick(section) {
      if (!database || !workshop) return;
      const updatedSection = immer(section.toMutableJSON(), (draft) => {
        draft.isCollapsed = !draft.isCollapsed;
        console.log("changing collapsed to ", draft.isCollapsed);
      });
      database.updateWorkshopSection(workshop, updatedSection);
    },
    onEditClick(section) {
      presentInputDialog({
        header: TRANSLATIONS.inputDialogSectionNameHeader(),
        initialText: section.name,
        emptyInputMessage: TRANSLATIONS.inputMessageEnterValue("section name"),
        placeholder: TRANSLATIONS.inputDialogSectionNamePlaceholder(),
        onAccept: (text) => {
          if (!database) return;
          const newSection = immer(section.toMutableJSON(), (draft) => {
            draft.name = text;
            return draft;
          });
          database.updateWorkshopSection(workshop, newSection);
        },
      });
    },
    onRemoveClick(section) {
      // TODO present confirmation dialog
      if (!database || !workshop) return;
      logger(
        "Deleting section with name=%s and id=%s",
        section.name,
        section.id,
      );
      database.removeSectionFromWorkshop(workshop.id, section.id);
    },
  };

  return (
    <>
      <IonList>
        <WorkshopElementsHeaderComponent
          isReordering={reorderWorkshopElements}
          disableReordering={sections.length <= 1}
          onReorderEvent={(event, isReordering) =>
            onReorderEvent(event, isReordering)
          }
        ></WorkshopElementsHeaderComponent>

        <IonReorderGroup
          disabled={!reorderWorkshopElements}
          onIonItemReorder={(event) => onElementsReorder(event)}
        >
          {sections.map((section) => (
            <Fragment key={section.id}>
              <WorkshopSectionComponent
                workshopSection={section}
                isReordering={reorderWorkshopElements}
                {...workshopSectionHandlers}
              ></WorkshopSectionComponent>
              <SectionElementsComponent
                workshop={workshop}
                section={section}
                onRemoveClick={(element) => elementOnRemoveClick(element)}
                isReordering={reorderWorkshopElements}
              ></SectionElementsComponent>
            </Fragment>
          ))}
        </IonReorderGroup>
      </IonList>
      <div style={{ height: "64px" }}></div>
    </>
  );
};
