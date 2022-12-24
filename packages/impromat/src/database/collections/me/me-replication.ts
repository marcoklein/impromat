import { GraphQLContextType } from "../../../graphql/graphql-context";
import { rootLogger } from "../../../logger";
import { MeCollection } from "./me-collection";

export function enableMeReplication(
  meCollection: MeCollection,
  apiContext: GraphQLContextType,
) {
  const logger = rootLogger.extend("me-replication");

  async function onLogout() {
    logger("Logging out...");
    console.warn("Logout in me replication not implemented yet");
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
  setInterval(async () => {
    sync();
  }, 10 * 1000);
  sync();
}
