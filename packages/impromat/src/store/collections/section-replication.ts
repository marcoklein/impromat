import { environment } from "../../environment";
import { rootLogger } from "../../logger";
import { MeCollection } from "./me-collection";
import {
  sectionPullQueryBuilder,
  sectionPushQueryBuilder,
} from "./section-replication-query-builder";

export function enableSectionReplication(sectionCollection: MeCollection) {
  const logger = rootLogger.extend("section-replication");
  const replicationState = sectionCollection.syncGraphQL({
    url: {
      http: `${environment.API_URL}/graphql`,
    },
    pull: {
      queryBuilder: sectionPullQueryBuilder,
      batchSize: 5,
      modifier: (doc: any) => {
        logger("Retrieved document %O", doc);
        const ids = doc.elements.map((element: any) => element.id);
        doc.elements = ids;
        logger("Modified document %O", doc);
        return doc;
      },
    },
    push: {
      queryBuilder: sectionPushQueryBuilder,
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
