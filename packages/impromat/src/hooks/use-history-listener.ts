import { useEffect } from "react";
import { useHistory } from "react-router";

/**
 * Listens for a history change and calls the provided function if the history changed.
 * Unregisters if the component is destroyed.
 *
 * @param callback Function to call on history change.
 */
export function useHistoryListener(callback: () => void) {
  const history = useHistory();

  useEffect(() => {
    const unregisterHistoryListener = history.listen(() => {
      callback();
    });
    return () => {
      unregisterHistoryListener();
    };
  }, [history, callback]);
}
