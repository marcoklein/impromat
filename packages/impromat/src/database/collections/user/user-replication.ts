import { environment } from "../../../environment";
import { rootLogger } from "../../../logger";
import { replicationErrorLogger } from "../replication-error-logger";
import { UserCollection } from "./user-collection-types";
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
        const ids = doc.favoriteElements.map((element: any) => element.id);
        doc.favoriteElements = ids;
        logger("Modified document %O", doc);
        return doc;
      },
      responseModifier: (response: any) => {
        logger("Received response %O", response);
        return response;
      },
    },
    push: {
      queryBuilder: userPushQueryBuilder,
      batchSize: 5,
      modifier: (doc: any) => {
        doc = { ...doc };
        doc.favoriteElementRefs = doc.favoriteElements;
        delete doc.favoriteElements;
        logger("Sending document %O", doc);
        return doc;
      },
    },
    deletedField: "deleted",
    live: true,
    retryTime: 5 * 1000,
    autoStart: true, // TODO start if logged in
    credentials: "include",
  });
  replicationState.error$.subscribe((error) => {
    replicationErrorLogger(error, logger);
  });
  setInterval(() => {
    logger("Triggering sync");
    replicationState.reSync();
  }, 10 * 1000);
}
