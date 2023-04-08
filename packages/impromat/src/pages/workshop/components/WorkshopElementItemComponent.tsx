import React, { useMemo, useState } from "react";
import Markdown from "react-markdown";
import { SlidingItemComponent } from "../../../components/SlidingItemComponent";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import "./WorkshopElementItemComponent.css";

const WorkshopElementItemComponent_WorkshopElement = graphql(`
  fragment WorkshopElementItemComponent_WorkshopElement on WorkshopElement {
    id
    note
    basedOn {
      id
      name
      markdown
    }
  }
`);

interface ContainerProps {
  workshopElementFragment: FragmentType<
    typeof WorkshopElementItemComponent_WorkshopElement
  >;
  routerLink: string;
  isReordering?: boolean;
  onRemoveClick?: () => void;
  onEditClick?: () => void;
}

export const WorkshopElementItemComponent: React.FC<ContainerProps> = ({
  workshopElementFragment,
  routerLink,
  isReordering,
  onRemoveClick,
  onEditClick,
}) => {
  const workshopElement = getFragmentData(
    WorkshopElementItemComponent_WorkshopElement,
    workshopElementFragment,
  );
  const [maxHeight] = useState(4);
  const [fadeHeight] = useState(0.5);
  const basedOnElementFromDatabase = workshopElement.basedOn;

  const basedOnElement = useMemo(() => {
    return basedOnElementFromDatabase ?? workshopElement;
  }, [basedOnElementFromDatabase, workshopElement]);

  return (
    <SlidingItemComponent
      isReordering={isReordering}
      onEditClick={onEditClick}
      onRemoveClick={onRemoveClick}
      routerLink={routerLink}
    >
      <>
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
