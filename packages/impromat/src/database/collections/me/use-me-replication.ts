import { useContext } from "react";
import { GraphQLContext } from "../../../graphql/graphql-context";
import { useImpromatRxDb } from "../../../hooks/use-impromat-rx-db";
import { useInterval } from "../../../hooks/use-interval";
import { useIsLoggedIn } from "../../../hooks/use-is-logged-in";
import { useLogout } from "../../../hooks/use-logout";
import { rootLogger } from "../../../logger";

export function useMeReplication() {
  // TODO store state of me replication in context
  const apiContext = useContext(GraphQLContext);
  const { triggerLogout } = useLogout();
  const { collections } = useImpromatRxDb();
  const meCollection = collections.me;

  const logger = rootLogger.extend("me-replication");

  async function onLogout() {
    logger("Logging out...");
    triggerLogout({ force: true });
  }

  async function sync() {
    logger("Triggering sync");
    try {
      const result = await apiContext.sdk.me();
      if (!result.me) {
        logger("No valid user session");
        await onLogout();
        return;
      }
      const userId = result.me.user.id;
      const loggedInUser = await meCollection
        .findOne({ selector: { id: "me" } })
        .exec();
      if (loggedInUser && loggedInUser.user !== userId) {
        logger("User changed");
        await onLogout();
      }
      if (!loggedInUser || loggedInUser.user !== userId) {
        // login
        meCollection.atomicUpsert({
          id: "me",
          user: userId,
          version: 0,
        });
        // synchronizing latest state
        logger("User logged in");
      }
      if (loggedInUser && loggedInUser.user === userId) {
        logger("Existing login verified");
      }
    } catch (e) {
      if (
        e instanceof TypeError &&
        e.name === "TypeError" &&
        e.message === "Network request failed"
      ) {
        logger("Backend request failed");
      } else {
        throw e;
      }
    }
  }
  useInterval(sync, 10 * 1000);
  sync();
}
