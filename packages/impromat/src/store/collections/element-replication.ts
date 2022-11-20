import { environment } from "../../environment";
import { rootLogger } from "../../logger";
import { MeCollection } from "./me-collection";
import {
  elementPullQueryBuilder,
  elementPushQueryBuilder,
} from "./element-replication-query-builder";

export function enableElementReplication(elementCollection: MeCollection) {
  const logger = rootLogger.extend("element-replication");
  const replicationState = elementCollection.syncGraphQL({
    url: {
      http: `${environment.API_URL}/graphql`,
    },
    pull: {
      queryBuilder: elementPullQueryBuilder,
      batchSize: 5,
      modifier: (doc: any) => {
        logger("Retrieved document %O", doc);
        doc.basedOn = doc.basedOn?.id;
        logger("Modified document %O", doc);
        return doc;
      },
    },
    push: {
      queryBuilder: elementPushQueryBuilder,
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
