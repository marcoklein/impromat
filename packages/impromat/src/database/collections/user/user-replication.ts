import { environment } from "../../../environment";
import { rootLogger } from "../../../logger";
import { UserCollection } from "./user-collection";
import {
  userPullQueryBuilder,
  userPushQueryBuilder,
} from "./user-replication-query-builder";

export function enableUserReplication(userCollection: UserCollection) {
  const logger = rootLogger.extend("user-replication");
  const replicationState = userCollection.syncGraphQL({
    url: {
      http: `${environment.API_URL}/graphql`,
    },
    pull: {
      queryBuilder: userPullQueryBuilder,
      batchSize: 5,
      modifier: (doc: any) => {
        logger("Retrieved document %O", doc);
        // const ids = doc.favoriteElements.map((element: any) => element.id);
        doc.favoriteElementRefs = doc.favoriteElements;
        delete doc.favoriteElementRefs;
        logger("Modified document %O", doc);
        return doc;
      },
    },
    push: {
      queryBuilder: userPushQueryBuilder,
      batchSize: 5,
      modifier: (doc: any) => {
        logger("Sending document %O", doc);
        delete doc._meta;
        return doc;
      },
    },
    deletedField: "deleted",
    live: true,
    retryTime: 5 * 1000,
    autoStart: true, // TODO start if logged in
    credentials: "include",
  });
  setInterval(() => {
    // TODO migrate to GraphQL stream
    replicationState.reSync();
    logger("Triggering sync");
  }, 10 * 1000);
}
