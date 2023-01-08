import { environment } from "../../../environment";
import { WorkshopInput } from "../../../graphql/schema.gen";
import { rootLogger } from "../../../logger";
import { ReplicationState } from "../replication-state";
import { WorkshopCollection } from "./workshop-collection";
import {
  pullQueryBuilder,
  pushQueryBuilder,
} from "./workshop-replication-query-builder";

export function enableWorkshopReplication(workshops: WorkshopCollection) {
  const logger = rootLogger.extend("workshop-replication");
  const rxReplicationState = workshops.syncGraphQL({
    url: {
      http: `${environment.API_URL}/graphql`,
    },
    pull: {
      queryBuilder: pullQueryBuilder,
      batchSize: 5,
      modifier: (doc: any) => {
        logger("Retrieved document %O", doc);
        doc.sections = doc.sections.map((item: any) => item.id);
        logger("Modified document %O", doc);
        return doc;
      },
    },
    push: {
      queryBuilder: pushQueryBuilder,
      batchSize: 5,
      modifier: (doc: any): WorkshopInput => {
        logger("Document before sending %O", doc);
        doc = { ...doc };
        // const currentVersion: number = doc.version ?? -1;
        // doc.version = currentVersion + 1;
        doc.sectionRefs = doc.sections;
        delete doc.sections;
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
