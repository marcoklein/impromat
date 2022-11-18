import { SafeIntResolver } from "graphql-scalars";
import { generateGoogleAuthUrl } from "../authentication/google-auth";
import { UserModel } from "../database/user-model";
import { DatabaseUtils } from "../database/database-utils";
import { environment } from "../environment";
import { UserMapper } from "../mappers/user-mapper";
import { Element, Resolvers, User } from "./schema.gen";

export const resolvers: Resolvers = {
  SafeInt: SafeIntResolver,
  User: {
    favoriteElements: (root, args, ctx) => {
      console.log("root id fav el", root.id);
      const userId = root.id;
      const ids = ctx.database.getUser(userId).favoriteElementIds;
      const elements: Element[] = [];
      const databaseUtils = new DatabaseUtils(ctx.database);
      for (const elementId of ids) {
        const element = databaseUtils.getElement(userId, elementId);
        elements.push(element);
      }
      return elements;
    },
    id: (root, args, ctx) => {
      // console.log("id is fetched", root, args, ctx);
      // return ctx.session.userId;
      console.log("root id: ", root.id);
      return root.id;
    },
  },
  Query: {
    version: (root, args, ctx) => {
      if (!ctx.session?.userId) throw new Error("Unauthorized");
      return environment.VERSION;
    },
    pullWorkshops: (root, args, ctx, info) => {
      if (!ctx.session?.userId) throw new Error("Unauthorized");
      const { database } = ctx;
      const limit = args.limit;
      const lastId = args.checkpoint ? args.checkpoint.id : "";
      const minUpdatedAt = args.checkpoint ? args.checkpoint.updatedAt : 0;

      const userWorkshops = database.getWorkshops(ctx.session.userId);
      const sortedDocuments = userWorkshops.sort((a, b) => {
        if (a.updatedAt === b.updatedAt) {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          else return 0;
        }
        if (a.updatedAt > b.updatedAt) return 1;
        return -1; // a.updatedAt < b.updatedAt
      });

      const filterForMinUpdatedAtAndId = sortedDocuments.filter((doc) => {
        if (doc.updatedAt < minUpdatedAt) return false;
        if (doc.updatedAt > minUpdatedAt) return true;
        if (doc.updatedAt === minUpdatedAt) {
          if (doc.id > lastId) return true;
        }
        return false;
      });

      const limitedDocuments = filterForMinUpdatedAtAndId.slice(0, limit);

      // use the last document for the checkpoint
      function getCheckpoint(docs: any[]): {
        id: string;
        updatedAt: number;
      } {
        if (docs.length > 0) {
          const lastDoc = docs[docs.length - 1];
          return {
            id: lastDoc.id,
            updatedAt: lastDoc.updatedAt,
          };
        }
        return {
          id: lastId,
          updatedAt: minUpdatedAt,
        };
      }

      // console.log("## sending documents:");
      // console.log(JSON.stringify(limitedDocuments, null, 4));

      return {
        documents: limitedDocuments,
        checkpoint: getCheckpoint(limitedDocuments),
      };
    },
    googleAuthUrl: () => {
      return generateGoogleAuthUrl();
    },
    me: (root, args, ctx) => {
      const userId = ctx.session?.userId;
      if (!userId) throw new Error("Unauthorized");
      return {
        userId,
        user: new UserMapper().fromModelToDto(ctx.database.getUser(userId), {
          userId,
        }),
      };
    },
  },
  Mutation: {
    pushUser: (root, args, ctx) => {
      const userId = ctx.session?.userId;
      if (!userId) throw new Error("Unauthorized");
      const { database } = ctx;
      const assumedMasterState = args.userPushRow.assumedMasterState;
      const newDocumentState = args.userPushRow.newDocumentState;
      const masterState = database.getUser(userId);

      console.log("## received user", args.userPushRow);

      if (
        assumedMasterState.version !== masterState.version ||
        newDocumentState.version !== masterState.version + 1
      ) {
        console.log("Version Conflict");
        const userConflict: User = new UserMapper().fromModelToDto(
          masterState,
          { userId }
        );
        return userConflict;
      }
      const newUser: UserModel = {
        updatedAt: Date.now(),
        favoriteElementIds:
          newDocumentState.favoriteElements ?? masterState.favoriteElementIds,
        version: newDocumentState.version,
      };
      database.setUser(userId, newUser);
      console.log("## set state ", newUser);
      return undefined;
    },
    pushWorkshops: (root, args, ctx) => {
      if (!ctx.session?.userId) throw new Error("Unauthorized");
      const { database } = ctx;
      console.log("## received docs");
      // console.log(JSON.stringify(args.workshopPushRows, null, 4));
      const pushedRows = args.workshopPushRows;
      let userWorkshops = database.getWorkshops(ctx.session.userId);
      const conflicts = [];
      const writtenDocs = [];

      for (const row of pushedRows) {
        const docId = row.newDocumentState.id;
        const docCurrentMaster = userWorkshops.find((d) => d.id === docId);
        if (
          docCurrentMaster &&
          row.assumedMasterState &&
          docCurrentMaster.updatedAt !== row.assumedMasterState.updatedAt
        ) {
          conflicts.push(docCurrentMaster);
          continue;
        }

        const doc = row.newDocumentState;
        if (typeof doc.updatedAt !== "number") {
          console.error(`updatedAt is not a number ${doc.updatedAt}`);
          throw new Error(`updatedAt is not a number ${doc.updatedAt}`);
        }
        // doc.updatedAt = Date.now();
        const updatedWorkshops = userWorkshops.filter((d) => d.id !== doc.id);
        updatedWorkshops.push(doc);
        writtenDocs.push(doc);
        userWorkshops = updatedWorkshops;
      }

      // TODO publish in stream

      // console.log("## current documents:");
      // console.log(JSON.stringify(userWorkshops, null, 4));
      if (conflicts.length) {
        console.log("## conflicts:");
        console.log(JSON.stringify(conflicts, null, 4));
      }

      database.setWorkshops(ctx.session.userId, userWorkshops);
      return conflicts;
    },
    logout: async (root, args, ctx) => {
      if (ctx.session) {
        return await new Promise((resolve, reject) => {
          ctx.req.session.destroy((err) => {
            if (err) reject(err);
            else resolve(true);
          });
        });
      }
      return false;
    },
  },
};
