import { IonList, IonReorderGroup, ItemReorderEventDetail } from "@ionic/react";
import { Fragment, useCallback, useState } from "react";
import { TRANSLATIONS } from "../../../functions/shared-text";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useInputDialog } from "../../../hooks/use-input-dialog";
import { useUpdateWorkshopMutation } from "../../../hooks/use-update-workshop-mutation";
import { SectionElementsComponent } from "./SectionElementsComponent";
import { WorkshopElementsHeaderComponent } from "./WorkshopElementsHeaderComponent";
import { WorkshopSectionComponent } from "./WorkshopSectionComponent";

const WorkshopElementsComponent_Workshop = graphql(`
  fragment WorkshopElementsComponent_Workshop on Workshop {
    canEdit
    sections {
      id
      name
      ...SectionElementsComponent_WorkshopSection
      ...WorkshopSectionComponent_WorkshopSection
    }
  }
`);

interface ContainerProps {
  workshopId: string;
  workshopFragment: FragmentType<typeof WorkshopElementsComponent_Workshop>;
  onChangeOrder: (fromIndex: number, toIndex: number) => void;
}

export const WorkshopElementsComponent: React.FC<ContainerProps> = ({
  workshopId,
  workshopFragment,
  onChangeOrder,
}) => {
  const workshop = getFragmentData(
    WorkshopElementsComponent_Workshop,
    workshopFragment,
  );
  const sections = workshop.sections;
  const canEdit = workshop.canEdit;
  const logger = useComponentLogger("WorkshopElementsComponent");
  const [reorderWorkshopElements, setReorderWorkshopElements] = useState(false);
  const [presentInputDialog] = useInputDialog();

  const [, updateWorkshopMutation] = useUpdateWorkshopMutation();

  const elementOnRemoveClick = (sectionId: string, elementId: string) => {
    updateWorkshopMutation({
      input: {
        id: workshopId,
        sections: {
          update: [
            { id: sectionId, elements: { delete: [{ id: elementId }] } },
          ],
        },
      },
    });
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
    setReorderWorkshopElements(isReordering);
  };

  const workshopSectionHandlers: Pick<
    React.ComponentPropsWithoutRef<typeof WorkshopSectionComponent>,
    "onCollapseClick" | "onEditClick" | "onRemoveClick"
  > = {
    onCollapseClick(sectionId, isCollapsed) {
      updateWorkshopMutation({
        input: {
          id: workshopId,
          sections: { update: [{ id: sectionId, isCollapsed: !isCollapsed }] },
        },
      });
    },
    onEditClick(sectionId, sectionName) {
      presentInputDialog({
        header: TRANSLATIONS.inputDialogSectionNameHeader(),
        initialText: sectionName,
        emptyInputMessage: TRANSLATIONS.inputMessageEnterValue("section name"),
        placeholder: TRANSLATIONS.inputDialogSectionNamePlaceholder(),
        onAccept: (newSectionName) => {
          updateWorkshopMutation({
            input: {
              id: workshopId,
              sections: {
                update: [
                  {
                    id: sectionId,
                    name: newSectionName,
                  },
                ],
              },
            },
          });
        },
      });
    },
    onRemoveClick(sectionId) {
      // TODO present confirmation dialog
      logger("Deleting section with id=%s", sectionId);
      updateWorkshopMutation({
        input: {
          id: workshopId,
          sections: {
            delete: [{ id: sectionId }],
          },
        },
      });
    },
  };

  return (
    <>
      <IonList>
        <WorkshopElementsHeaderComponent
          canEdit={!!canEdit}
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
          {sections.map((section, index) => (
            <Fragment key={section.id}>
              {/* TODO this exclusion causes the list to not re-order properly as the order index is wrong */}
              {/* {!(index === 0 && !section.name) && ( */}
              <WorkshopSectionComponent
                workshopSectionFragment={section}
                isReordering={reorderWorkshopElements}
                {...workshopSectionHandlers}
              ></WorkshopSectionComponent>
              {/* )} */}
              <SectionElementsComponent
                workshopId={workshopId}
                sectionFragment={section}
                onRemoveClick={(element) =>
                  elementOnRemoveClick(section.id, element)
                }
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
