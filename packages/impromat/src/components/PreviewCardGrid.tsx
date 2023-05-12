import { GridItemContent, VirtuosoGrid } from "react-virtuoso";
import { LoadingCard } from "./LoadingCard";
import "./PreviewCardGrid.css";

interface ContainerProps<ItemData, Context> {
  itemContent: GridItemContent<ItemData, Context>;
  items: readonly ItemData[];
  endReached?: () => void;
}

/**
 * Grid helper for rendering `PreviewCard`s with virtual scrolling support.
 */
export const PreviewCardGrid = <ItemData, Context>({
  itemContent,
  items,
  endReached,
}: ContainerProps<ItemData, Context>) => {
  return (
    <VirtuosoGrid
      className="ion-content-scroll-host"
      style={{ height: "100%" }}
      totalCount={items.length}
      endReached={() => endReached && endReached()}
      overscan={200}
      data={items}
      itemClassName="item-class-name"
      listClassName="list-class-name"
      components={{
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
