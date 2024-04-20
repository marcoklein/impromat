import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useRef, useState } from "react";
import { GridItemContent, Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { APP_LOCAL_STORAGE_PREFIX } from "../app-local-storage-prefix";
import { useComponentLogger } from "../hooks/use-component-logger";
import { usePersistedState } from "../hooks/use-persisted-state";
import { useStateChangeLogger } from "../hooks/use-state-change-logger";
import { LoadingCard } from "./LoadingCard";

const MAX_SCROLL_RESTORE_TIME_MS = 200;

interface ContainerProps<ItemData, Context> {
  /**
   * The key to store the scroll position in local storage.
   */
  scrollStoreKey?: string;
  /**
   * The item content to render.
   */
  itemContent: GridItemContent<ItemData, Context>;
  /**
   * The items to render.
   */
  items: readonly ItemData[];
  /**
   * Callback for the end reached event.
   */
  endReached?: () => void;
  /**
   * Callback for the top state change.
   *
   * @param atTop True if the grid is at the top. False otherwise.
   */
  onTopStateChange?: (atTop: boolean) => void;
  /**
   * If true, the loading footer is rendered.
   */
  isFetching: boolean;
  /**
   * Grid scrolls to top if this value changes.
   */
  scrollToTop?: number;
  headerElement?: JSX.Element;
}

/**
 * Grid helper for rendering `PreviewCard`s with virtual scrolling support.
 */
export const VirtualCardGrid = <ItemData, Context>({
  scrollStoreKey,
  itemContent,
  items,
  endReached,
  onTopStateChange,
  isFetching,
  scrollToTop,
  headerElement,
}: ContainerProps<ItemData, Context>) => {
  const logger = useComponentLogger("VirtualCardGrid");
  const virtuosoRef = useRef<VirtuosoHandle>(null);
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

  const onRangeChanged = () => {
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
  };

  const onIsScrolling = (isScrolling: boolean) => {
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
      localStorage.setItem(
        `${APP_LOCAL_STORAGE_PREFIX}${scrollStoreKey}`,
        JSON.stringify(scrollOptions),
      );
    }
  };

  return (
    <Virtuoso
      scrollerRef={(ref) => setScrollerRef(ref as any)}
      ref={virtuosoRef}
      rangeChanged={onRangeChanged}
      isScrolling={onIsScrolling}
      style={{
        height: "100%",
        visibility: isRestoringScrollPosition ? "hidden" : "visible",
      }}
      totalCount={items.length}
      atTopStateChange={(atTop) => onTopStateChange && onTopStateChange(atTop)}
      endReached={() => endReached && endReached()}
      overscan={200}
      data={items}
      className="virtuoso-list"
      components={{
        Footer: () =>
          isFetching ? (
            <Box
              sx={{
                p: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <></>
          ),
        ScrollSeekPlaceholder: (props) => (
          <Box sx={{ height: props.height }}>
            <LoadingCard></LoadingCard>
          </Box>
        ),
        Header: () => headerElement || null,
      }}
      itemContent={itemContent}
      scrollSeekConfiguration={{
        enter: (velocity) => Math.abs(velocity) > 500,
        exit: (velocity) => Math.abs(velocity) < 30,
      }}
    />
  );
};
