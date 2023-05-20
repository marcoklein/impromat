import { IonSpinner } from "@ionic/react";
import { useRef, useState } from "react";
import {
  GridItemContent,
  VirtuosoGrid,
  VirtuosoGridHandle,
} from "react-virtuoso";
import { LoadingCard } from "./LoadingCard";
import "./PreviewCardGrid.css";
import { useComponentLogger } from "../hooks/use-component-logger";

interface ContainerProps<ItemData, Context> {
  scrollStoreKey?: string;
  itemContent: GridItemContent<ItemData, Context>;
  items: readonly ItemData[];
  endReached?: () => void;
  isFetching: boolean;
}

/**
 * Grid helper for rendering `PreviewCard`s with virtual scrolling support.
 */
export const PreviewCardGrid = <ItemData, Context>({
  scrollStoreKey,
  itemContent,
  items,
  endReached,
  isFetching,
}: ContainerProps<ItemData, Context>) => {
  const logger = useComponentLogger("PreviewCardGrid");
  const virtuosoRef = useRef<VirtuosoGridHandle>(null);
  const [isRestoringScrollPosition, setIsRestoringScrollPosition] = useState(
    scrollStoreKey ? true : false,
  );
  const [scrollerRef, setScrollerRef] = useState<HTMLElement | null>(null);

  return (
    <VirtuosoGrid
      scrollerRef={(ref) => setScrollerRef(ref)}
      ref={virtuosoRef}
      className="ion-content-scroll-host"
      rangeChanged={() => {
        if (isRestoringScrollPosition && scrollStoreKey) {
          setIsRestoringScrollPosition(false);
          const json = localStorage.getItem(scrollStoreKey);
          if (json) {
            const scrollOptions: { top: number; totalCount: number } =
              JSON.parse(json);
            logger("Retrieved scroll options %o", scrollOptions);
            if (scrollOptions.totalCount === items.length) {
              logger("Restore scroll position");
              setTimeout(() => {
                virtuosoRef.current?.scrollTo({
                  behavior: "auto",
                  top: scrollOptions.top,
                });
              }, 100);
            }
          }
        }
      }}
      isScrolling={(isScrolling) => {
        if (
          scrollStoreKey &&
          !isScrolling &&
          scrollerRef &&
          !isRestoringScrollPosition
        ) {
          const scrollOptions = {
            totalCount: items.length,
            top: scrollerRef.scrollTop,
          };
          logger("Save scroll position %o", scrollOptions);
          localStorage.setItem(scrollStoreKey, JSON.stringify(scrollOptions));
        }
      }}
      style={{ height: "100%" }}
      totalCount={items.length}
      endReached={() => endReached && endReached()}
      overscan={200}
      data={items}
      itemClassName="item-class-name"
      listClassName="list-class-name"
      components={{
        Footer: () =>
          isFetching ? (
            <div
              className="ion-margin"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IonSpinner className="ion-margin-end"></IonSpinner> Loading
            </div>
          ) : (
            <></>
          ),
        ScrollSeekPlaceholder: (props) => (
          <div
            style={{
              height: props.height,
              width: props.width,
              padding: "4px",
            }}
          >
            <LoadingCard></LoadingCard>
          </div>
        ),
      }}
      itemContent={itemContent}
      scrollSeekConfiguration={{
        enter: (velocity) => Math.abs(velocity) > 500,
        exit: (velocity) => Math.abs(velocity) < 30,
      }}
    ></VirtuosoGrid>
  );
};
