import { IonBadge, IonButton, IonIcon } from "@ionic/react";
import { chevronDown, chevronUp } from "ionicons/icons";
import React from "react";
import { SectionDocument } from "../database/collections/section/section-collection";
import { SlidingItemComponent } from "./SlidingItemComponent";
import "./WorkshopElementItemComponent.css";

interface ContainerProps {
  workshopSection: SectionDocument;
  isReordering?: boolean;
  onEditClick: (section: SectionDocument) => void;
  onRemoveClick: (section: SectionDocument) => void;
  onCollapseClick: (section: SectionDocument) => void;
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
