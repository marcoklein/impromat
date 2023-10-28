import { IonItem, IonLabel, IonReorder, useIonRouter } from "@ionic/react";
import React, { useMemo, useState } from "react";
import Markdown from "react-markdown";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import "./WorkshopElementItem.css";
import { WorkshopElementOptionsMenu } from "./WorkshopElementOptionsMenu";

export const WorkshopElementItemComponent_WorkshopElement = graphql(`
  fragment WorkshopElementItemComponent_WorkshopElement on WorkshopElement {
    id
    note
    basedOn {
      id
      name
      markdown
    }
    section {
      id
      workshop {
        id
        canEdit
      }
    }
  }
`);

interface ContainerProps {
  workshopElementFragment: FragmentType<
    typeof WorkshopElementItemComponent_WorkshopElement
  >;
  routerLink: string;
  isReordering?: boolean;
  onRemoveClick: () => void;
}

export const WorkshopElementItem: React.FC<ContainerProps> = ({
  workshopElementFragment,
  routerLink,
  isReordering,
  onRemoveClick,
}) => {
  const workshopElement = getFragmentData(
    WorkshopElementItemComponent_WorkshopElement,
    workshopElementFragment,
  );
  const [maxHeight] = useState(4);
  const basedOnElementFromDatabase = workshopElement.basedOn;

  const basedOnElement = useMemo(() => {
    return basedOnElementFromDatabase ?? workshopElement;
  }, [basedOnElementFromDatabase, workshopElement]);

  const router = useIonRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <IonItem
      button
      onContextMenu={(e) => {
        e.preventDefault();
        setIsMenuOpen(true);
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "column", width: "100%" }}
        onClick={() => router.push(routerLink)}
      >
        <IonLabel className="ion-text-wrap ion-padding-vertical">
          <h2>{basedOnElement?.name}</h2>
          <div
            style={{
              maxHeight: `${maxHeight}rem`,
              position: "relative",
              marginTop: "4px",
            }}
          >
            <div style={{ paddingLeft: "4px" }}>
              {workshopElement.note && (
                <div style={{ display: "flex" }}>
                  <div
                    className="lightLeftBorder"
                    style={{
                      flexGrow: 1,
                      paddingLeft: "4px",
                    }}
                  >
                    <Markdown>{workshopElement.note ?? ""}</Markdown>
                  </div>
                </div>
              )}
              <Markdown>{basedOnElement.markdown ?? ""}</Markdown>
            </div>
          </div>
        </IonLabel>
        <div style={{ height: "0.5rem" }}></div>
      </div>
      <WorkshopElementOptionsMenu
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        onRemoveClick={onRemoveClick}
      ></WorkshopElementOptionsMenu>
      {isReordering && <IonReorder slot="end"></IonReorder>}
    </IonItem>
  );
};
