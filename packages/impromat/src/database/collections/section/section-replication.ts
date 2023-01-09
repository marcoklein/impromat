import { environment } from "../../../environment";
import { rootLogger } from "../../../logger";
import { ReplicationState } from "../replication-state";
import { SectionCollection } from "./section-collection";
import {
  sectionPullQueryBuilder,
  sectionPushQueryBuilder,
} from "./section-replication-query-builder";

export function enableSectionReplication(sectionCollection: SectionCollection) {
  const logger = rootLogger.extend("section-replication");
  const rxReplicationState = sectionCollection.syncGraphQL({
    url: {
      http: `${environment.API_URL}/graphql`,
    },
    pull: {
      queryBuilder: sectionPullQueryBuilder,
      batchSize: 5,
      modifier: (originalDoc: any) => {
        const doc = { ...originalDoc };
        logger("Retrieved document %O", doc);
        // const ids = doc.elements.map((element: any) => element.id);
        // // delete doc.elements;
        // // doc.elements = ids;
        // Object.entries(doc).forEach(([k, v]) => {
        //   if (v === null) {
        //     delete doc[k];
        //   }
        // });
        // const docCopy = {
        //   ...doc,
        //   ...{ elements: [] },
        //   // ...{ elements: ids },
        // };
        // logger("Modified document %O", docCopy);
        // return Object.assign({}, docCopy);
        doc.elements = doc.elementRefs;
        delete doc.elementRefs;
        return doc;
      },
    },
    push: {
      queryBuilder: sectionPushQueryBuilder,
      batchSize: 5,
      modifier: (originalDoc: any) => {
        const doc = { ...originalDoc, ...{ elements: originalDoc.elements } };
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
  const replication = new ReplicationState(rxReplicationState, logger);
  replication.start();
  return replication;
}
