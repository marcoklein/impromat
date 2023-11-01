import { IonSpinner } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import {
  GridItemContent,
  VirtuosoGrid,
  VirtuosoGridHandle,
} from "react-virtuoso";
import { useComponentLogger } from "../hooks/use-component-logger";
import { usePersistedState } from "../hooks/use-persisted-state";
import { useStateChangeLogger } from "../hooks/use-state-change-logger";
import { LoadingCard } from "./LoadingCard";
import "./VirtualCardGrid.css";

const MAX_SCROLL_RESTORE_TIME_MS = 200;

interface ContainerProps<ItemData, Context> {
  scrollStoreKey?: string;
  itemContent: GridItemContent<ItemData, Context>;
  items: readonly ItemData[];
  endReached?: () => void;
  isFetching: boolean;
  scrollToTop?: number;
}

/**
 * Grid helper for rendering `PreviewCard`s with virtual scrolling support.
 */
export const VirtualCardGrid = <ItemData, Context>({
  scrollStoreKey,
  itemContent,
  items,
  endReached,
  isFetching,
  scrollToTop,
}: ContainerProps<ItemData, Context>) => {
  const logger = useComponentLogger("VirtualCardGrid");
  const virtuosoRef = useRef<VirtuosoGridHandle>(null);
  const NOT_EXISTING_TOP = -1;
  const [scrollRestoreOptions] = usePersistedState<{
    top: number;
    totalCount: number;
  }>(scrollStoreKey, { top: NOT_EXISTING_TOP, totalCount: -1 });
  const [isRestoringScrollPosition, setIsRestoringScrollPosition] = useState(
    scrollRestoreOptions.top !== NOT_EXISTING_TOP,
  );

  const [scrollerRef, setScrollerRef] = useState<HTMLElement | null>(null);

  useStateChangeLogger(
    isRestoringScrollPosition,
    "isRestoringScrollPosition",
    logger,
  );
  useStateChangeLogger(scrollRestoreOptions, "scrollRestoreOptions", logger);

  useEffect(() => {
    logger("Scroll to top %o", scrollToTop);
    if (scrollToTop) {
      virtuosoRef.current?.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    }
  }, [scrollToTop, logger]);

  return (
    <VirtuosoGrid
      scrollerRef={(ref) => setScrollerRef(ref)}
      ref={virtuosoRef}
      className="ion-content-scroll-host"
      rangeChanged={() => {
        if (isRestoringScrollPosition) {
          if (scrollRestoreOptions.top <= 0) {
            logger("Scroll position to top <= 0");
            setIsRestoringScrollPosition(false);
            return;
          }
          logger("Retrieved scroll options %o", scrollRestoreOptions);
          if (scrollRestoreOptions.totalCount === items.length) {
            logger("Restore scroll position");
            function restoreScroll() {
              virtuosoRef.current?.scrollTo({
                behavior: "instant",
                top: scrollRestoreOptions.top,
              });
            }
            [30, 100, 150].forEach((delay) => {
              setTimeout(() => {
                restoreScroll();
              }, delay);
            });
            setTimeout(() => {
              setIsRestoringScrollPosition(false);
            }, MAX_SCROLL_RESTORE_TIME_MS);
          } else {
            setIsRestoringScrollPosition(false);
          }
        }
      }}
      isScrolling={(isScrolling) => {
        if (isRestoringScrollPosition && !isScrolling && scrollerRef) {
          if (scrollerRef.scrollTop === scrollRestoreOptions.top) {
            logger("Restored scroll position at %o", scrollerRef.scrollTop);
            setIsRestoringScrollPosition(false);
          }
        } else if (
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
          logger("isRestoringScrollPosition %o", isRestoringScrollPosition);
          localStorage.setItem(scrollStoreKey, JSON.stringify(scrollOptions));
        }
      }}
      style={{
        height: "100%",
        visibility: isRestoringScrollPosition ? "hidden" : "visible",
      }}
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
              <IonSpinner className="ion-margin-end"></IonSpinner> Don't look at
              me.
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
