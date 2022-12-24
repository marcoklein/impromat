import { SafeIntResolver } from "graphql-scalars";
import { generateGoogleAuthUrl } from "../authentication/google-auth";
import { UserModel } from "../database/user-model";
import { environment } from "../environment";
import { ElementInputMapper } from "../mappers/element-input-mapper";
import { ElementMapper } from "../mappers/element-mapper";
import {
  fromSectionInputDtoToSectionModel,
  fromSectionModelToSectionDto,
} from "../mappers/section-mapper";
import { UserMapper } from "../mappers/user-mapper";
import {
  fromWorkshopInputDtoToWorkshopModel,
  fromWorkshopModelToWorkshopDto,
} from "../mappers/workshop-mapper";
import { handlePushRows } from "./handle-push-rows";
import { Resolvers } from "./schema.gen";
import { prepareDocumentsForPull } from "./sort-models";
import { userPushRowInputHandler } from "./user-resolver";

export const resolvers: Resolvers = {
  SafeInt: SafeIntResolver,
  User: {
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
    pullUsers: (root, args, ctx, info) => {
      const userId = ctx.session?.userId;
      if (!userId) throw new Error("Unauthorized");
      const { database } = ctx;
      const minUpdatedAt = args.checkpoint ? args.checkpoint.updatedAt : 0;

      const user = database.getUser(userId);
      if (user && user.updatedAt > minUpdatedAt) {
        return {
          documents: [new UserMapper().fromModelToDto(user, { userId })],
          checkpoint: {
            id: userId,
            updatedAt: user.updatedAt,
          },
        };
      }
      return {
        documents: [],
        checkpoint: {
          id: userId,
          updatedAt: minUpdatedAt,
        },
      };
    },
    pullElements: (root, args, ctx, info) => {
      if (!ctx.session?.userId) throw new Error("Unauthorized");
      console.log("-- pull elements", ctx.session.userId);
      const { database } = ctx;
      const documents = database.getElements(ctx.session.userId) ?? [];
      console.log("-- existing documents length", documents.length);
      const result = prepareDocumentsForPull(
        documents,
        args,
        new ElementMapper().fromModelToDto
      );
      console.log("-- returned documents length", result.documents.length);
      return result;
    },
    pullSections: (root, args, ctx, info) => {
      if (!ctx.session?.userId) throw new Error("Unauthorized");
      const { database } = ctx;
      const documents = database.getSections(ctx.session.userId) ?? [];
      return prepareDocumentsForPull(
        documents,
        args,
        fromSectionModelToSectionDto
      );
    },
    pullWorkshops: (root, args, ctx, info) => {
      if (!ctx.session?.userId) throw new Error("Unauthorized");
      const { database } = ctx;
      const documents = database.getWorkshops(ctx.session.userId) ?? [];
      return prepareDocumentsForPull(
        documents,
        args,
        fromWorkshopModelToWorkshopDto
      );
    },
    googleAuthUrl: () => {
      return generateGoogleAuthUrl();
    },
    me: (root, args, ctx) => {
      console.log("Me query.");
      const userId = ctx.session?.userId;
      if (!userId) return undefined;
      let user = ctx.database.getUser(userId);
      console.log("Existing user:", !!user);
      if (!user) {
        console.log(
          "No user info found for userId %s. Creating a new user info object.",
          userId
        );
        const createdAt = Date.now();
        const initialUser: UserModel = {
          favoriteElementIds: [],
          deleted: false,
          createdAt: createdAt,
          updatedAt: createdAt,
          version: 0,
        };
        ctx.database.setUser(userId, initialUser);
        return {
          userId,
          user: new UserMapper().fromModelToDto(initialUser, { userId }),
        };
      }
      return {
        userId,
        user: new UserMapper().fromModelToDto(user, {
          userId,
        }),
      };
    },
  },
  Mutation: {
    pushUser: (root, args, ctx) => {
      if (!ctx.session?.userId) throw new Error("Unauthorized");
      return userPushRowInputHandler(args.userPushRow, ctx);
    },
    pushUsers: (root, args, ctx) => {
      if (!ctx.session?.userId) throw new Error("Unauthorized");

      if (!args.userPushRows.length) {
        return [];
      }
      if (args.userPushRows.length > 1) {
        throw new Error("Only updates for logged in user allowed.");
      }
      const conflict = userPushRowInputHandler(args.userPushRows[0], ctx);
      if (conflict) {
        return [conflict];
      }
      return [];
    },
    pushElements: (root, args, ctx) => {
      if (!ctx.session?.userId) throw new Error("Unauthorized");
      const { database } = ctx;
      console.log("## received docs");
      const pushedRows = args.elementPushRows;
      const inputModels = database.getElements(ctx.session.userId) ?? [];
      const { models, conflicts } = handlePushRows(inputModels, pushedRows, {
        fromInputDtoToModel: new ElementInputMapper().fromDtoToModel,
        fromModelToDto: new ElementMapper().fromModelToDto,
      });
      database.setElements(ctx.session.userId, models);
      return conflicts;
    },
    pushSections: (root, args, ctx) => {
      if (!ctx.session?.userId) throw new Error("Unauthorized");
      const { database } = ctx;
      console.log("## received docs");
      const pushedRows = args.sectionPushRows;
      const inputModels = database.getSections(ctx.session.userId) ?? [];
      const { models, conflicts } = handlePushRows(inputModels, pushedRows, {
        fromInputDtoToModel: fromSectionInputDtoToSectionModel,
        fromModelToDto: fromSectionModelToSectionDto,
      });
      database.setSections(ctx.session.userId, models);
      return conflicts;
    },
    pushWorkshops: (root, args, ctx) => {
      if (!ctx.session?.userId) throw new Error("Unauthorized");
      const { database } = ctx;
      console.log("## received docs");
      const pushedRows = args.workshopPushRows;
      const inputModels = database.getWorkshops(ctx.session.userId) ?? [];
      const { models, conflicts } = handlePushRows(inputModels, pushedRows, {
        fromInputDtoToModel: fromWorkshopInputDtoToWorkshopModel,
        fromModelToDto: fromWorkshopModelToWorkshopDto,
      });
      database.setWorkshops(ctx.session.userId, models);
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
