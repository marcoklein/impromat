import { UserModel } from "../database/user-model";
import { Element, User } from "../graphql/schema.gen";
import { Mapper } from "./mapper";

export class UserMapper
  implements Mapper<User, UserModel, {}, { userId: string }>
{
  fromDtoToModel(dto: User): UserModel {
    throw new Error("not implemented");
  }
  fromModelToDto(model: UserModel, props: { userId: string }): User {
    return {
      id: props.userId,
      version: model.version,
      favoriteElements: model.favoriteElementIds.map(
        (favoriteElementId): Element => ({
          id: favoriteElementId,
          version: 0,
          markdown: "",
          name: "",
          note: "",
          tags: [],
        })
      ),
    };
  }
}
