import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Integer holding milliseconds since UNIX epoch start. */
  SafeInt: any;
};

/** General element like a exercise or game. */
export type Element = {
  __typename?: 'Element';
  basedOn?: Maybe<Element>;
  id: Scalars['ID'];
  languageCode?: Maybe<Scalars['String']>;
  licenseName?: Maybe<Scalars['String']>;
  licenseUrl?: Maybe<Scalars['String']>;
  markdown: Scalars['String'];
  name: Scalars['String'];
  /** User defined note */
  note: Scalars['String'];
  sourceBaseUrl?: Maybe<Scalars['String']>;
  sourceName?: Maybe<Scalars['String']>;
  sourceUrl?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
};

export type ElementInput = {
  basedOn?: InputMaybe<ElementInput>;
  id: Scalars['ID'];
  languageCode?: InputMaybe<Scalars['String']>;
  licenseName?: InputMaybe<Scalars['String']>;
  licenseUrl?: InputMaybe<Scalars['String']>;
  markdown?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  sourceBaseUrl?: InputMaybe<Scalars['String']>;
  sourceName?: InputMaybe<Scalars['String']>;
  sourceUrl?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Log out from the application.
   * Returns true if the user was logged in and got logged out successfully.
   * Returns undefined, if the user was not logged in.
   */
  logout: Scalars['Boolean'];
  /**
   * Update user info of the logged in user.
   * Returns current master state if there is a conflict.
   * Throws an error if the user is not logged in.
   */
  pushUser?: Maybe<User>;
  /**
   * Update given workshops.
   * Returns conflicting workshops. That means the client has to resolve all workshops that the call returns.
   */
  pushWorkshops?: Maybe<Array<Maybe<Workshop>>>;
};


export type MutationPushUserArgs = {
  userPushRow: UserPushRowInput;
};


export type MutationPushWorkshopsArgs = {
  workshopPushRows: Array<WorkshopPushRowInput>;
};

export type PullCheckpoint = {
  __typename?: 'PullCheckpoint';
  id: Scalars['String'];
  updatedAt: Scalars['Float'];
};

export type PullCheckpointInput = {
  id: Scalars['ID'];
  updatedAt: Scalars['SafeInt'];
};

export type Query = {
  __typename?: 'Query';
  /** Returns an authentication url for google authentication. */
  googleAuthUrl: Scalars['String'];
  /** Information about the logged in session. */
  me?: Maybe<TokenInfo>;
  /** Returns new workshops since last sync. */
  pullWorkshops: WorkshopPullBulk;
  /** Version of the application. */
  version: Scalars['String'];
};


export type QueryPullWorkshopsArgs = {
  checkpoint: PullCheckpointInput;
  limit: Scalars['Int'];
};

/**
 * A section groups several elements of a workshop.
 * A workshop must always have at least one section.
 */
export type Section = {
  __typename?: 'Section';
  color?: Maybe<Scalars['String']>;
  elements: Array<Element>;
  id: Scalars['ID'];
  isCollapsed?: Maybe<Scalars['Boolean']>;
  /**
   * If false the section will not be shown.
   * If there are no sections yet there is an invisiable ghost section to hold all elements.
   */
  isVisible?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
};

export type SectionInput = {
  color?: InputMaybe<Scalars['String']>;
  elements?: InputMaybe<Array<ElementInput>>;
  id: Scalars['ID'];
  isCollapsed?: InputMaybe<Scalars['Boolean']>;
  isVisible?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
};

export type TokenInfo = {
  __typename?: 'TokenInfo';
  user: User;
  userId: Scalars['String'];
};

/** Information about a user that uses Impromat. */
export type User = {
  __typename?: 'User';
  favoriteElements: Array<Element>;
  /** Id of the user. */
  id: Scalars['ID'];
  /** Entity version. */
  version: Scalars['Int'];
};

export type UserInput = {
  favoriteElements?: InputMaybe<Array<Scalars['ID']>>;
  version: Scalars['Int'];
};

export type UserPushRowInput = {
  assumedMasterState: UserInput;
  newDocumentState: UserInput;
};

/** An improvisational theatre Workshop that a person can hold for their group. */
export type Workshop = {
  __typename?: 'Workshop';
  /** For syncing purposes this flag indicates deleted workshops. */
  deleted?: Maybe<Scalars['Boolean']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  sections: Array<Section>;
  updatedAt: Scalars['SafeInt'];
};

export type WorkshopInput = {
  deleted?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  sections?: InputMaybe<Array<InputMaybe<SectionInput>>>;
  updatedAt?: InputMaybe<Scalars['SafeInt']>;
};

export type WorkshopPullBulk = {
  __typename?: 'WorkshopPullBulk';
  checkpoint?: Maybe<PullCheckpoint>;
  documents: Array<Workshop>;
};

export type WorkshopPushRowInput = {
  assumedMasterState?: InputMaybe<WorkshopInput>;
  newDocumentState: WorkshopInput;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'TokenInfo', userId: string, user: { __typename?: 'User', id: string, version: number, favoriteElements: Array<{ __typename?: 'Element', id: string }> } } | null };


export const MeDocument = gql`
    query me {
  me {
    userId
    user {
      id
      version
      favoriteElements {
        id
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    me(variables?: MeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MeQuery>(MeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'me', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;