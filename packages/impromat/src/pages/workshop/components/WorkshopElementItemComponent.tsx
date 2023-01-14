import React, { useCallback, useState } from "react";
import Markdown from "react-markdown";
import { SlidingItemComponent } from "../../../components/SlidingItemComponent";
import { ElementDocType } from "../../../database/collections/element/element-collection";
import { useDocument } from "../../../database/use-document";
import "./WorkshopElementItemComponent.css";

interface ContainerProps {
  workshopElement: ElementDocType;
  routerLink: string;
  isReordering?: boolean;
  onRemoveClick?: () => void;
  onEditClick?: () => void;
}

export const WorkshopElementItemComponent: React.FC<ContainerProps> = ({
  workshopElement,
  routerLink,
  isReordering,
  onRemoveClick,
  onEditClick,
}) => {
  const [maxHeight] = useState(4);
  const [fadeHeight] = useState(0.5);

  const { document: basedOnElement } = useDocument(
    "elements",
    workshopElement.basedOn,
  );

  const noteMarkdown = useCallback(
    () => <Markdown>{workshopElement.note ?? ""}</Markdown>,
    [workshopElement],
  );

  const contentMarkdown = useCallback(
    () => (
      <Markdown>
        {workshopElement.markdown && workshopElement.markdown !== ""
          ? workshopElement.markdown
          : basedOnElement?.markdown ?? ""}
      </Markdown>
    ),
    [workshopElement, basedOnElement],
  );

  return (
    <SlidingItemComponent
      isReordering={isReordering}
      onEditClick={onEditClick}
      onRemoveClick={onRemoveClick}
      routerLink={routerLink}
    >
      <>
        <h2>{workshopElement.name}</h2>
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
                  {noteMarkdown()}
                </div>
              </div>
            )}
            {contentMarkdown()}
          </div>
          <div
            style={{
              top: `${maxHeight - fadeHeight}rem`,
              position: "absolute",
              verticalAlign: "text-bottom",
              // background:
              //   "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
              width: "32px",
              height: `${fadeHeight}rem`,
            }}
          >
            {/* <p style={{ position: "absolute", bottom: 0 }}>...</p> */}
          </div>
        </div>
      </>
    </SlidingItemComponent>
  );
};
