import { environment } from "../../../environment";
import { rootLogger } from "../../../logger";
import { SectionCollection } from "./section-collection";
import {
  sectionPullQueryBuilder,
  sectionPushQueryBuilder,
} from "./section-replication-query-builder";

export function enableSectionReplication(sectionCollection: SectionCollection) {
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
        logger("Document before modification of push: %O", doc);
        doc.elementRefs = doc.elements;
        delete doc.elements;
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
  setInterval(() => {
    // TODO migrate to GraphQL stream
    replicationState.reSync();
    logger("Triggering sync");
  }, 10 * 1000);
}
