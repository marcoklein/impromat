import { UserDocument } from "../database/collections/user/user-collection-types";

export type AuthorizationData =
  | LoggedInAuthorizationData
  | LoggedOutAuthorizationData;

export interface BaseAuthorizationData {
  isLoggedIn: boolean;
  myUser: UserDocument | undefined;
}

export interface LoggedInAuthorizationData extends BaseAuthorizationData {
  isLoggedIn: true;
  myUser: UserDocument;
}
export interface LoggedOutAuthorizationData extends BaseAuthorizationData {
  isLoggedIn: false;
  myUser: undefined;
}
