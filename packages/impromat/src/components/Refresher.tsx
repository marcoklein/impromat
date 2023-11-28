import { IonRefresher, IonRefresherContent } from "@ionic/react";
import { useCallback, useEffect, useRef } from "react";
import { useComponentLogger } from "../hooks/use-component-logger";

interface ContainerProps {
  /**
   * If true, the refresher is disabled.
   */
  disabled?: boolean;
  /**
   * Callback for the refresh event.
   */
  onRefresh: () => void;
  /**
   * If true, the refresher remains in the refreshing state.
   */
  isRefreshing: boolean;
}

/**
 * Renders a refresher component that calls the `onRefresh` callback when the user pulls down.
 */
export const Refresher: React.FC<ContainerProps> = ({
  onRefresh,
  disabled,
  isRefreshing,
}) => {
  const logger = useComponentLogger("Refresher");
  const refresherRef = useRef<HTMLIonRefresherElement>(null);
  const stopRefresh = useCallback(() => {
    refresherRef.current?.complete();
  }, []);

  useEffect(() => {
    if (!isRefreshing) {
      logger("refreshing stopped");
      stopRefresh();
    }
  }, [isRefreshing, logger, stopRefresh]);

  return (
    <IonRefresher
      ref={refresherRef}
      slot="fixed"
      disabled={disabled}
      onIonRefresh={() => {
        onRefresh();
      }}
    >
      <IonRefresherContent></IonRefresherContent>
    </IonRefresher>
  );
};
