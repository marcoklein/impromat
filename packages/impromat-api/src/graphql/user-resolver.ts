import { UserModel } from "../database/user-model";
import { UserMapper } from "../mappers/user-mapper";
import { GraphQLContext } from "./graphql-context";
import { User, UserPushRowInput } from "./schema.gen";

const START_VERSION = 0;

export function userPushRowInputHandler(
  userPushRow: UserPushRowInput,
  ctx: GraphQLContext
) {
  const userId = ctx.session?.userId;
  if (!userId) throw new Error("Unauthorized");
  const { database } = ctx;
  const assumedMasterState = userPushRow.assumedMasterState;
  const newDocumentState = userPushRow.newDocumentState;
  const masterState = database.getUser(userId);

  console.log("## received user", userPushRow);

  if (
    masterState &&
    (assumedMasterState?.version !== masterState.version ||
      newDocumentState.version !== masterState.version + 1)
  ) {
    console.log("Version Conflict");
    const userConflict: User = new UserMapper().fromModelToDto(masterState, {
      userId,
    });
    return userConflict;
  }
  const newUser: UserModel = {
    updatedAt: Date.now(),
    favoriteElementIds:
      newDocumentState.favoriteElements ??
      masterState?.favoriteElementIds ??
      [],
    version: !masterState ? START_VERSION : newDocumentState.version,
  };
  database.setUser(userId, newUser);
  console.log("## set state ", newUser);
}
