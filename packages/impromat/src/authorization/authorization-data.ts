import { UserDocType } from "../database/collections/user/user-collection-types";

export type AuthorizationData =
  | LoggedInAuthorizationData
  | LoggedOutAuthorizationData;

export interface BaseAuthorizationData {
  isLoggedIn: boolean;
  myUser: UserDocType | undefined;
}

export interface LoggedInAuthorizationData extends BaseAuthorizationData {
  isLoggedIn: true;
  myUser: UserDocType;
}
export interface LoggedOutAuthorizationData extends BaseAuthorizationData {
  isLoggedIn: false;
  myUser: undefined;
}
