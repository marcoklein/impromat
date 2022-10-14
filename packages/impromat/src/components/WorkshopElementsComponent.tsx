import { IonList, IonReorderGroup, ItemReorderEventDetail } from "@ionic/react";
import immer from "immer";
import { Fragment, useCallback, useEffect, useState } from "react";
import { TRANSLATIONS } from "../functions/shared-text";
import { useInputDialog } from "../hooks/use-input-dialog";
import { Element, Section, Workshop } from "../store/schema.gen";
import { useRxdbMutations } from "../store/use-rxdb-mutations";
import { WORKSHOP_HELPER } from "../store/workshop-helper";
import { useComponentLogger } from "../use-component-logger";
import { WorkshopElementItemComponent } from "./WorkshopElementItemComponent";
import { WorkshopElementsHeaderComponent } from "./WorkshopElementsHeaderComponent";
import { WorkshopSectionComponent } from "./WorkshopSectionComponent";

interface ContainerProps {
  workshop: Workshop;
  onChangeOrder: (sections: Section[]) => void;
}

export const WorkshopElementsComponent: React.FC<ContainerProps> = ({
  workshop,
  onChangeOrder,
}) => {
  const logger = useComponentLogger("WorkshopElementsComponent");
  const database = useRxdbMutations();
  const [reorderWorkshopElements, setReorderWorkshopElements] = useState(false);
  const [sections, setSections] = useState(workshop.sections);
  const [presentInputDialog] = useInputDialog();
  const [sectionsBeforeReordering, setSectionsBeforeReordering] = useState<
    Section[]
  >([]);

  useEffect(() => {
    setSections(workshop.sections);
  }, [workshop]);

  const elementOnRemoveClick = (element: Element) => {
    if (!database) return;
    database.removePartFromWorkshop(workshop.id, element.id);
  };

  const onElementsReorder = useCallback(
    (event: CustomEvent<ItemReorderEventDetail>) => {
      const fromIndex = event.detail.from;
      const toIndex = event.detail.to;

      onChangeOrder(
        immer(workshop, (draft) => {
          WORKSHOP_HELPER.moveItemFromIndexToIndex(draft, fromIndex, toIndex);

          // const movedElement = draft[fromIndex];
          // draft.splice(fromIndex, 1);
          // const indexCorrection = fromIndex < toIndex ? 1 : 0;
          // draft.splice(toIndex + indexCorrection, 0, movedElement);
        }).sections,
      );
      // ionic must not reorder DOM nodes
      event.detail.complete(false);
    },
    [workshop, onChangeOrder],
  );

  const onReorderEvent = (
    event: "start" | "save" | "cancel",
    isReordering: boolean,
  ) => {
    if (!database) return;
    setReorderWorkshopElements(isReordering);
    switch (event) {
      case "start":
        setSectionsBeforeReordering(immer(sections, () => {}));
        break;
      case "save":
        database.updateWorkshop(workshop);
        setSectionsBeforeReordering([]);
        break;
      case "cancel":
        setSections(sectionsBeforeReordering);
        setSectionsBeforeReordering([]);
        break;
    }
  };

  const workshopSectionHandlers: Pick<
    React.ComponentPropsWithoutRef<typeof WorkshopSectionComponent>,
    "onCollapseClick" | "onEditClick" | "onRemoveClick"
  > = {
    onCollapseClick(section) {
      if (!database || !workshop) return;
      const updatedSection = immer(section, (draft) => {
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
          database.updateWorkshopSection(workshop, section, (draft) => {
            draft.name = text;
            return draft;
          });
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
              {!section.isCollapsed &&
                section.elements.map((element) => (
                  <WorkshopElementItemComponent
                    workshopElement={element}
                    key={element.id}
                    routerLink={`/workshop/${workshop.id}/part/${element.id}`}
                    onRemoveClick={() => elementOnRemoveClick(element)}
                    isReordering={reorderWorkshopElements}
                  ></WorkshopElementItemComponent>
                ))}
            </Fragment>
          ))}
        </IonReorderGroup>
      </IonList>
      <div style={{ height: "64px" }}></div>
    </>
  );
};
