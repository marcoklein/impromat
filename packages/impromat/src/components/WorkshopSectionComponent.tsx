import { IonBadge, IonButton, IonIcon } from "@ionic/react";
import { chevronDown, chevronUp } from "ionicons/icons";
import React from "react";
import { SectionDocType } from "../store/collections/section-collection";
import { SlidingItemComponent } from "./SlidingItemComponent";
import "./WorkshopElementItemComponent.css";

interface ContainerProps {
  workshopSection: SectionDocType;
  isReordering?: boolean;
  onEditClick: (section: SectionDocType) => void;
  onRemoveClick: (section: SectionDocType) => void;
  onCollapseClick: (section: SectionDocType) => void;
}

export const WorkshopSectionComponent: React.FC<ContainerProps> = ({
  workshopSection,
  isReordering,
  onEditClick,
  onRemoveClick,
  onCollapseClick,
}) => {
  if (!workshopSection.isVisible) {
    return <></>;
  }
  return (
    <SlidingItemComponent
      onEditClick={() => onEditClick(workshopSection)}
      onRemoveClick={() => onRemoveClick(workshopSection)}
      isReordering={isReordering}
      color={workshopSection.color ?? "light"}
      itemProps={{
        lines: "none",
        button: true,
        onClick: () => onCollapseClick(workshopSection),
      }}
      startSlot={
        <IonBadge color="medium">{workshopSection.elements.length}</IonBadge>
      }
      endSlot={
        <IonButton onClick={() => onCollapseClick(workshopSection)}>
          <IonIcon
            icon={workshopSection.isCollapsed ? chevronUp : chevronDown}
          ></IonIcon>
        </IonButton>
      }
    >
      <>{workshopSection.name}</>
    </SlidingItemComponent>
  );
};
