import { IonBadge, IonButton, IonIcon } from "@ionic/react";
import { chevronDown, chevronUp } from "ionicons/icons";
import React from "react";
import { SlidingItemComponent } from "../../../components/SlidingItemComponent";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import "./WorkshopElementItemComponent.css";

const WorkshopSectionComponent_WorkshopSection = graphql(`
  fragment WorkshopSectionComponent_WorkshopSection on WorkshopSection {
    id
    name
    color
    isCollapsed
    elements {
      id
    }
  }
`);

interface ContainerProps {
  workshopSectionFragment: FragmentType<
    typeof WorkshopSectionComponent_WorkshopSection
  >;
  isReordering?: boolean;
  onEditClick: (sectionId: string, sectionName: string | undefined) => void;
  onRemoveClick: (sectionId: string) => void;
  onCollapseClick: (sectionId: string, isCollapsed: boolean) => void;
}

export const WorkshopSectionComponent: React.FC<ContainerProps> = ({
  workshopSectionFragment,
  isReordering,
  onEditClick,
  onRemoveClick,
  onCollapseClick,
}) => {
  const workshopSection = getFragmentData(
    WorkshopSectionComponent_WorkshopSection,
    workshopSectionFragment,
  );
  return (
    <SlidingItemComponent
      onEditClick={() =>
        onEditClick(workshopSection.id, workshopSection.name ?? undefined)
      }
      onRemoveClick={() => onRemoveClick(workshopSection.id)}
      isReordering={isReordering}
      color={workshopSection.color ?? "light"}
      itemProps={{
        lines: "none",
        button: true,
        onClick: () =>
          onCollapseClick(workshopSection.id, workshopSection.isCollapsed),
      }}
      startSlot={
        <IonBadge color="medium">{workshopSection.elements.length}</IonBadge>
      }
      endSlot={
        <IonButton
          onClick={() =>
            onCollapseClick(workshopSection.id, workshopSection.isCollapsed)
          }
        >
          <IonIcon
            icon={workshopSection.isCollapsed ? chevronUp : chevronDown}
          ></IonIcon>
        </IonButton>
      }
    >
      <>{workshopSection.name ?? "[Default Section]"}</>
    </SlidingItemComponent>
  );
};
