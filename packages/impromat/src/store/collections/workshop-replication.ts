import { environment } from "../../environment";
import { rootLogger } from "../../logger";
import { WorkshopCollection } from "./workshop-collection";
import {
  pullQueryBuilder,
  pushQueryBuilder,
} from "./workshop-replication-query-builder";

export function enableWorkshopReplication(workshops: WorkshopCollection) {
  const logger = rootLogger.extend("workshop-replication");
  const replicationState = workshops.syncGraphQL({
    url: {
      http: `${environment.API_URL}/graphql`,
    },
    pull: {
      queryBuilder: pullQueryBuilder,
      batchSize: 5,
      modifier: (doc: any) => {
        logger("Retrieved document %O", doc);
        return doc;
      },
    },
    push: {
      queryBuilder: pushQueryBuilder,
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
