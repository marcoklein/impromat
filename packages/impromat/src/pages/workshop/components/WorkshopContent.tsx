import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box, List } from "@mui/material";
import { Fragment, useCallback, useMemo } from "react";
import { useMutation } from "urql";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useUpdateWorkshopMutation } from "../../../hooks/use-update-workshop-mutation";
import { WorkshopElementItem } from "./WorkshopElementItem";
import { WorkshopSectionItem } from "./WorkshopSectionItem";

const WorkshopContent_Workshop = graphql(`
  fragment WorkshopContent_Workshop on Workshop {
    id
    canEdit
    sections {
      id
      name
      elements {
        id
        ...WorkshopElementItem_WorkshopElement
      }
      isCollapsed
      ...WorkshopSectionItem_WorkshopSection
    }
  }
`);

interface ContainerProps {
  workshopFragment: FragmentType<typeof WorkshopContent_Workshop>;
}

export const WorkshopContent: React.FC<ContainerProps> = ({
  workshopFragment,
}) => {
  const logger = useComponentLogger("WorkshopContent");
  const workshop = getFragmentData(WorkshopContent_Workshop, workshopFragment);
  const sensors = useSensors(
    useSensor(
      window.ontouchstart !== undefined
        ? TouchSensor
        : PointerEvent
        ? PointerSensor
        : MouseSensor,
      {
        activationConstraint: {
          delay: 200,
          tolerance: 5,
        },
      },
    ),
  );

  const hideFirstSectionTitle = useMemo(
    () => workshop.sections.length > 0 && workshop.sections[0].name === null,
    [workshop.sections],
  );
  const workshopItems = useMemo(() => {
    return workshop.sections.flatMap((section, index) => {
      const sectionHidden = index === 0 && hideFirstSectionTitle;
      return [
        { id: section.id, section: section },
        ...(workshop.canEdit && section.isCollapsed && !sectionHidden
          ? []
          : section?.elements.map((element) => ({
              id: element.id,
              element: element,
              elementSection: section,
              isSectionHidden: sectionHidden,
            })) ?? []),
      ];
    });
  }, [hideFirstSectionTitle, workshop.canEdit, workshop.sections]);

  const [, updateWorkshopMutation] = useUpdateWorkshopMutation();

  const onCollapseClick = (sectionId: string, isCollapsed: boolean) => {
    updateWorkshopMutation({
      input: {
        id: workshop.id,
        sections: { update: [{ id: sectionId, isCollapsed: !isCollapsed }] },
      },
    });
  };

  const [, updateWorkshopOrder] = useMutation(
    graphql(`
      mutation UpdateWorkshopItemOrder($input: UpdateWorkshopItemOrder!) {
        updateWorkshopItemOrder(input: $input) {
          id
        }
      }
    `),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (!workshop) return;
      const { active, over } = event;
      if (active.id !== over?.id) {
        logger("Active ID: " + active.id);
        logger("Over ID: " + over?.id);
        const activeIndex = workshopItems.findIndex(
          (item) => item.id === active.id,
        );
        const overIndex = workshopItems.findIndex(
          (item) => item.id === over?.id,
        );
        updateWorkshopOrder({
          input: {
            workshopId: workshop.id,
            fromPosition: activeIndex,
            toPosition: overIndex,
          },
        });
      }
    },
    [logger, updateWorkshopOrder, workshop, workshopItems],
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToFirstScrollableAncestor]}
    >
      <SortableContext
        items={workshopItems}
        strategy={verticalListSortingStrategy}
      >
        <List sx={{ height: "100%" }}>
          {workshopItems.map((item, index) => {
            if (index === 0 && hideFirstSectionTitle)
              return <Fragment key={item.id} />;
            if ("section" in item) {
              return (
                <WorkshopSectionItem
                  workshopId={workshop.id}
                  key={item.id}
                  onCollapseClick={() =>
                    onCollapseClick(item.id, item.section.isCollapsed)
                  }
                  sectionFragment={item.section}
                />
              );
            } else if ("element" in item) {
              return (
                <Box pl={item.isSectionHidden ? 0 : 2} key={item.id}>
                  <WorkshopElementItem
                    workshopElementFragment={item.element}
                    sectionId={item.elementSection.id}
                    workshopId={workshop.id}
                  ></WorkshopElementItem>
                </Box>
              );
            } else {
              throw new Error("unknown element type");
            }
          })}
        </List>
      </SortableContext>
    </DndContext>
  );
};
