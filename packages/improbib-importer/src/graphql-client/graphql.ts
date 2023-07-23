/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type BasedOnElementConnectInput = {
  connect: IdInput;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
};

export type CreateElementInput = {
  /** Set if the element was imported from improbib, a project that collects existing improv resources. */
  improbibIdentifier?: InputMaybe<Scalars['String']>;
  /** Language code (e.g. en, de) of the element. */
  languageCode?: Scalars['String'];
  licenseName?: InputMaybe<Scalars['String']>;
  licenseUrl?: InputMaybe<Scalars['String']>;
  markdown?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  orderIndex?: InputMaybe<Scalars['Int']>;
  sourceBaseUrl?: InputMaybe<Scalars['String']>;
  sourceName?: Scalars['String'];
  sourceUrl?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<ElementTagsInput>;
  visibility?: ElementVisibility;
};

export type CreateWorkshopElementInput = {
  basedOn: BasedOnElementConnectInput;
  note?: InputMaybe<Scalars['String']>;
  orderIndex?: InputMaybe<Scalars['Float']>;
};

export type CreateWorkshopInput = {
  description?: InputMaybe<Scalars['String']>;
  /** Publicly list workshop within impromat. Worshop must be public in order to list it. */
  isListed?: InputMaybe<Scalars['Boolean']>;
  isPublic?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  sections?: InputMaybe<WorkshopSectionListCreateInput>;
};

export type CreateWorkshopSectionInput = {
  isCollapsed?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  orderIndex?: InputMaybe<Scalars['Float']>;
};

export type DeleteWorkshopElementInput = {
  id: Scalars['ID'];
};

export type DeleteWorkshopSectionInput = {
  id: Scalars['ID'];
};

/** Duplicates a workshop to allow changes to the new workshop. */
export type DuplicateWorkshopInput = {
  name: Scalars['String'];
  workshopId: Scalars['ID'];
};

export type Element = {
  __typename?: 'Element';
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  id: Scalars['ID'];
  /** Set if the element was imported from improbib, a project that collects existing improv resources. */
  improbibIdentifier?: Maybe<Scalars['String']>;
  /** Set if the element is called from a user context. */
  isFavorite?: Maybe<Scalars['Boolean']>;
  /** Convenience field to determine if the owner of the element is the logged in user. */
  isOwnerMe?: Maybe<Scalars['Boolean']>;
  languageCode?: Maybe<Scalars['String']>;
  licenseName?: Maybe<Scalars['String']>;
  licenseUrl?: Maybe<Scalars['String']>;
  markdown?: Maybe<Scalars['String']>;
  /** Shortened markdown text for preview purposes to avoid loading the whole content in a request. */
  markdownShort?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owner?: Maybe<User>;
  /** Changes of the element. */
  snapshots: Array<ElementSnapshot>;
  sourceBaseUrl?: Maybe<Scalars['String']>;
  sourceName?: Maybe<Scalars['String']>;
  sourceUrl?: Maybe<Scalars['String']>;
  tags: Array<ElementTag>;
  updatedAt: Scalars['DateTime'];
  usedBy: Array<WorkshopElement>;
  version: Scalars['Int'];
  visibility: ElementVisibility;
};


export type ElementSnapshotsArgs = {
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
};

export type ElementQueryResult = {
  __typename?: 'ElementQueryResult';
  element: Element;
};

export type ElementSearchInput = {
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
  text?: InputMaybe<Scalars['String']>;
};

export type ElementSearchMatch = {
  __typename?: 'ElementSearchMatch';
  indices: Array<Array<Scalars['Int']>>;
  /** Key of field where searched text was found. */
  key?: Maybe<Scalars['String']>;
  /** If the matching field is an array this field points to the index of the matching element in the source array. */
  refIndex?: Maybe<Scalars['Int']>;
  value: Scalars['String'];
};

export type ElementSearchResult = {
  __typename?: 'ElementSearchResult';
  element: Element;
  matches: Array<ElementSearchMatch>;
  score: Scalars['Float'];
};

export type ElementSnapshot = {
  __typename?: 'ElementSnapshot';
  createdAt: Scalars['DateTime'];
  /** Element of snapshot. */
  element: Element;
  id: Scalars['ID'];
  /** User that created the snapshot. */
  user?: Maybe<User>;
};

export type ElementTag = {
  __typename?: 'ElementTag';
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  version: Scalars['Int'];
};

export type ElementTagSetInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ElementTagWhereInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

/** Filter tags of elements. */
export type ElementTagsFilterInput = {
  text?: InputMaybe<Scalars['String']>;
};

export type ElementTagsInput = {
  connect?: InputMaybe<Array<ElementTagWhereInput>>;
  /** Defines all tags of the element. */
  set?: InputMaybe<Array<ElementTagSetInput>>;
};

export enum ElementVisibility {
  /** Element is only visible to its owning user. */
  Private = 'PRIVATE',
  /** Element is publicly shared with the whole community. */
  Public = 'PUBLIC'
}

/** Filter for elements */
export type ElementsFilterInput = {
  /** Include all elements of the currently active user. */
  isOwnerMe?: InputMaybe<Scalars['Boolean']>;
  /** Include all elements that are publicly available to the logged-in user. */
  isPublic?: InputMaybe<Scalars['Boolean']>;
  nameSearch?: InputMaybe<Scalars['String']>;
};

export type ElementsOrderByInput = {
  notImplemented: Scalars['Boolean'];
};

export type IdInput = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createElement: Element;
  createWorkshop: Workshop;
  deleteWorkshop?: Maybe<Workshop>;
  duplicateWorkshop: Workshop;
  logout: Scalars['Boolean'];
  updateElement: Element;
  updateUser: User;
  /** Change the favorite state for element of the logged in user. */
  updateUserFavoriteElement?: Maybe<Element>;
  /** Change the liked state for workshop of the logged in user. */
  updateUserLikedWorkshop?: Maybe<Workshop>;
  updateWorkshop: Workshop;
  updateWorkshopItemOrder: Workshop;
};


export type MutationCreateElementArgs = {
  input: CreateElementInput;
};


export type MutationCreateWorkshopArgs = {
  input: CreateWorkshopInput;
};


export type MutationDeleteWorkshopArgs = {
  id: Scalars['ID'];
};


export type MutationDuplicateWorkshopArgs = {
  input: DuplicateWorkshopInput;
};


export type MutationUpdateElementArgs = {
  input: UpdateElementInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserFavoriteElementArgs = {
  input: UpdateUserFavoriteElementInput;
};


export type MutationUpdateUserLikedWorkshopArgs = {
  input: UpdateUserLikedWorkshopInput;
};


export type MutationUpdateWorkshopArgs = {
  input: UpdateWorkshopInput;
};


export type MutationUpdateWorkshopItemOrderArgs = {
  input: UpdateWorkshopItemOrder;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  element?: Maybe<Element>;
  elements: Array<ElementQueryResult>;
  googleAuthUrl: Scalars['String'];
  /** Get information about the current user. */
  me: User;
  searchElements: Array<ElementSearchResult>;
  tags: Array<ElementTag>;
  workshop?: Maybe<Workshop>;
  workshopElement: WorkshopElement;
  /** Find workshops. */
  workshops: Array<Workshop>;
};


export type QueryElementArgs = {
  id: Scalars['ID'];
};


export type QueryElementsArgs = {
  filter?: InputMaybe<ElementsFilterInput>;
  orderBy?: InputMaybe<ElementsOrderByInput>;
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
};


export type QuerySearchElementsArgs = {
  input: ElementSearchInput;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryTagsArgs = {
  filter?: InputMaybe<ElementTagsFilterInput>;
  skip?: InputMaybe<Scalars['Float']>;
  take?: InputMaybe<Scalars['Float']>;
};


export type QueryWorkshopArgs = {
  id: Scalars['ID'];
};


export type QueryWorkshopElementArgs = {
  id: Scalars['ID'];
};


export type QueryWorkshopsArgs = {
  orderBy?: InputMaybe<Array<WorkshopsOrderByInput>>;
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
  where?: InputMaybe<WorkshopsWhereInput>;
};

export enum SortOrder {
  /** Ascending sort order. */
  Asc = 'asc',
  /** Descending sort order. */
  Desc = 'desc'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type UpdateElementInput = {
  id: Scalars['ID'];
  /** Set if the element was imported from improbib, a project that collects existing improv resources. */
  improbibIdentifier?: InputMaybe<Scalars['String']>;
  /** Language code (e.g. en, de) of the element. */
  languageCode?: InputMaybe<Scalars['String']>;
  licenseName?: InputMaybe<Scalars['String']>;
  licenseUrl?: InputMaybe<Scalars['String']>;
  markdown?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orderIndex?: InputMaybe<Scalars['Int']>;
  sourceBaseUrl?: InputMaybe<Scalars['String']>;
  sourceName?: InputMaybe<Scalars['String']>;
  sourceUrl?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<ElementTagsInput>;
  visibility?: InputMaybe<ElementVisibility>;
};

export type UpdateUserFavoriteElementInput = {
  elementId: Scalars['ID'];
  isFavorite: Scalars['Boolean'];
};

export type UpdateUserInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateUserLikedWorkshopInput = {
  isLiked: Scalars['Boolean'];
  workshopId: Scalars['ID'];
};

export type UpdateWorkshopElementInput = {
  basedOn?: InputMaybe<BasedOnElementConnectInput>;
  id: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
  orderIndex?: InputMaybe<Scalars['Float']>;
};

export type UpdateWorkshopInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Publicly list workshop within impromat. Worshop must be public in order to list it. */
  isListed?: InputMaybe<Scalars['Boolean']>;
  isPublic?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  sections?: InputMaybe<WorkshopSectionListInput>;
};

/** Moves a workshop item (section or element) within a workshop considering collapsed sections. */
export type UpdateWorkshopItemOrder = {
  /** From position. */
  fromPosition: Scalars['Int'];
  /** To position. */
  toPosition: Scalars['Int'];
  workshopId: Scalars['ID'];
};

export type UpdateWorkshopSectionInput = {
  elements?: InputMaybe<WorkshopElementListInput>;
  id: Scalars['ID'];
  isCollapsed?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  orderIndex?: InputMaybe<Scalars['Float']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  /** Elements owned by this user. */
  elements: Array<Element>;
  favoriteElements: Array<UserFavoriteElement>;
  id: Scalars['ID'];
  likedWorkshops: Array<UserLikedWorkshop>;
  /** Public display name of the user. */
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  version: Scalars['Int'];
  /** All workshops that this user has access to. */
  workshops: Array<Workshop>;
};


export type UserWorkshopsArgs = {
  input?: InputMaybe<UserWorkshopsFilterInput>;
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
};

export type UserFavoriteElement = {
  __typename?: 'UserFavoriteElement';
  createdAt: Scalars['DateTime'];
  element: Element;
  updatedAt: Scalars['DateTime'];
};

export type UserLikedWorkshop = {
  __typename?: 'UserLikedWorkshop';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  workshop: Workshop;
};

export type UserLikedWorkshopListRelationFilter = {
  every?: InputMaybe<UserLikedWorkshopWhereInput>;
  none?: InputMaybe<UserLikedWorkshopWhereInput>;
  some?: InputMaybe<UserLikedWorkshopWhereInput>;
};

export type UserLikedWorkshopWhereInput = {
  userId?: InputMaybe<StringFilter>;
};

/** Filter workshops of user. */
export type UserWorkshopsFilterInput = {
  /** Publicly accessible community workshop. */
  isCommunity?: Scalars['Boolean'];
  /** Publicly or listed workshops of user. */
  isPublic?: Scalars['Boolean'];
  liked?: Scalars['Boolean'];
  /** Filter for workshops that are owned by the user. */
  owned?: Scalars['Boolean'];
};

export type Workshop = {
  __typename?: 'Workshop';
  /** If true, the client is authorized to edit the workshop. */
  canEdit?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** True, if liked by the logged in user. Undefined, if there is no user logged in. */
  isLiked?: Maybe<Scalars['Boolean']>;
  /** True, if the workshop is listed publicly in the improv community. */
  isListed: Scalars['Boolean'];
  /** Convenience field to determine if the owner of the workshop is the logged in user. */
  isOwnerMe?: Maybe<Scalars['Boolean']>;
  /** Public users can view the workshop but they require the direct link to the workshop. The url of the workshop does not change. */
  isPublic?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  owner: User;
  sections: Array<WorkshopSection>;
  updatedAt: Scalars['DateTime'];
  version: Scalars['Int'];
};

export type WorkshopElement = {
  __typename?: 'WorkshopElement';
  basedOn: Element;
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  section: WorkshopSection;
  updatedAt: Scalars['DateTime'];
  version: Scalars['Int'];
};

export type WorkshopElementListInput = {
  create?: InputMaybe<Array<CreateWorkshopElementInput>>;
  delete?: InputMaybe<Array<DeleteWorkshopElementInput>>;
  update?: InputMaybe<Array<UpdateWorkshopElementInput>>;
};

export type WorkshopSection = {
  __typename?: 'WorkshopSection';
  color?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  elements: Array<WorkshopElement>;
  id: Scalars['ID'];
  isCollapsed: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  orderIndex: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  version: Scalars['Int'];
  workshop: Workshop;
};

export type WorkshopSectionListCreateInput = {
  create?: InputMaybe<Array<CreateWorkshopSectionInput>>;
};

export type WorkshopSectionListInput = {
  create?: InputMaybe<Array<CreateWorkshopSectionInput>>;
  delete?: InputMaybe<Array<DeleteWorkshopSectionInput>>;
  update?: InputMaybe<Array<UpdateWorkshopSectionInput>>;
};

export type WorkshopsOrderByInput = {
  createdAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type WorkshopsWhereInput = {
  AND?: InputMaybe<Array<WorkshopsWhereInput>>;
  NOT?: InputMaybe<Array<WorkshopsWhereInput>>;
  OR?: InputMaybe<Array<WorkshopsWhereInput>>;
  id?: InputMaybe<StringFilter>;
  isListed?: InputMaybe<BoolFilter>;
  isPublic?: InputMaybe<BoolFilter>;
  ownerId?: InputMaybe<StringFilter>;
  userLikedWorkshops?: InputMaybe<UserLikedWorkshopListRelationFilter>;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string } };

export type ElementFieldsFragment = { __typename?: 'Element', id: string, name: string, improbibIdentifier?: string | null, markdown?: string | null, tags: Array<{ __typename?: 'ElementTag', id: string, name: string }> };

export type ElementsQueryVariables = Exact<{
  skip: Scalars['Int'];
  take: Scalars['Int'];
}>;


export type ElementsQuery = { __typename?: 'Query', elements: Array<{ __typename?: 'ElementQueryResult', element: { __typename?: 'Element', id: string, name: string, improbibIdentifier?: string | null, markdown?: string | null, snapshots: Array<{ __typename?: 'ElementSnapshot', id: string, user?: { __typename?: 'User', id: string } | null, element: { __typename?: 'Element', id: string, name: string, improbibIdentifier?: string | null, markdown?: string | null, tags: Array<{ __typename?: 'ElementTag', id: string, name: string }> } }>, tags: Array<{ __typename?: 'ElementTag', id: string, name: string }> } }> };

export type CreateElementMutationMutationVariables = Exact<{
  input: CreateElementInput;
}>;


export type CreateElementMutationMutation = { __typename?: 'Mutation', createElement: { __typename?: 'Element', id: string } };

export const ElementFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"improbibIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ElementFieldsFragment, unknown>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const ElementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Elements"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFields"}},{"kind":"Field","name":{"kind":"Name","value":"snapshots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFields"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"improbibIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ElementsQuery, ElementsQueryVariables>;
export const CreateElementMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateElementMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateElementInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateElementMutationMutation, CreateElementMutationMutationVariables>;