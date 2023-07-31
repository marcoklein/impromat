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
  /** Preferred languages of the user. E.g. de or en. */
  languageCodes?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
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
  /** Preferred language codes of the user. */
  languageCodes: Array<Scalars['String']>;
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

export type CustomElement_ElementFragment = { __typename?: 'Element', id: string, name: string, visibility: ElementVisibility } & { ' $fragmentName'?: 'CustomElement_ElementFragment' };

export type Element_ElementFragment = (
  { __typename?: 'Element', id: string, createdAt: any, updatedAt: any, version: number, deleted: boolean, name: string, markdown?: string | null, languageCode?: string | null, sourceUrl?: string | null, sourceName?: string | null, sourceBaseUrl?: string | null, licenseName?: string | null, licenseUrl?: string | null, visibility: ElementVisibility, isOwnerMe?: boolean | null, tags: Array<{ __typename?: 'ElementTag', name: string }>, usedBy: Array<{ __typename?: 'WorkshopElement', id: string }>, owner?: { __typename?: 'User', id: string, name?: string | null } | null }
  & { ' $fragmentRefs'?: { 'CustomElement_ElementFragment': CustomElement_ElementFragment } }
) & { ' $fragmentName'?: 'Element_ElementFragment' };

export type ElementInfoList_ElementSearchResultFragment = { __typename?: 'ElementSearchResult', score: number, matches: Array<{ __typename?: 'ElementSearchMatch', key?: string | null, indices: Array<Array<number>>, refIndex?: number | null, value: string }> } & { ' $fragmentName'?: 'ElementInfoList_ElementSearchResultFragment' };

export type ElementInfoList_ElementFragment = { __typename?: 'Element', id: string, isFavorite?: boolean | null, isOwnerMe?: boolean | null, languageCode?: string | null, sourceName?: string | null, visibility: ElementVisibility } & { ' $fragmentName'?: 'ElementInfoList_ElementFragment' };

export type ElementPreviewItem_ElementSearchResultFragment = (
  { __typename?: 'ElementSearchResult', matches: Array<{ __typename?: 'ElementSearchMatch', key?: string | null, value: string }> }
  & { ' $fragmentRefs'?: { 'ElementInfoList_ElementSearchResultFragment': ElementInfoList_ElementSearchResultFragment } }
) & { ' $fragmentName'?: 'ElementPreviewItem_ElementSearchResultFragment' };

export type ElementPreviewItem_ElementFragment = (
  { __typename?: 'Element', id: string, createdAt: any, updatedAt: any, version: number, deleted: boolean, name: string, markdownShort?: string | null, languageCode?: string | null, sourceUrl?: string | null, sourceName?: string | null, sourceBaseUrl?: string | null, licenseName?: string | null, licenseUrl?: string | null, visibility: ElementVisibility, isFavorite?: boolean | null, isOwnerMe?: boolean | null, tags: Array<{ __typename?: 'ElementTag', id: string, name: string }>, usedBy: Array<{ __typename?: 'WorkshopElement', id: string }>, owner?: { __typename?: 'User', id: string } | null }
  & { ' $fragmentRefs'?: { 'CustomElement_ElementFragment': CustomElement_ElementFragment;'ElementFavoriteIcon_ElementFragment': ElementFavoriteIcon_ElementFragment;'ElementInfoList_ElementFragment': ElementInfoList_ElementFragment } }
) & { ' $fragmentName'?: 'ElementPreviewItem_ElementFragment' };

export type WorkshopInfoList_WorkshopFragment = { __typename?: 'Workshop', id: string, createdAt: any, updatedAt: any, isPublic?: boolean | null, isListed: boolean, canEdit?: boolean | null, isOwnerMe?: boolean | null, isLiked?: boolean | null, owner: { __typename?: 'User', name?: string | null } } & { ' $fragmentName'?: 'WorkshopInfoList_WorkshopFragment' };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, version: number, favoriteElements: Array<{ __typename?: 'UserFavoriteElement', element: { __typename?: 'Element', id: string } }> } };

export type DeleteWorkshopMutationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteWorkshopMutationMutation = { __typename?: 'Mutation', deleteWorkshop?: { __typename?: 'Workshop', id: string } | null };

export type DuplicateWorkshopMutationMutationVariables = Exact<{
  input: DuplicateWorkshopInput;
}>;


export type DuplicateWorkshopMutationMutation = { __typename?: 'Mutation', duplicateWorkshop: { __typename?: 'Workshop', id: string } };

export type GoogleLoginHrefQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GoogleLoginHrefQueryQuery = { __typename?: 'Query', googleAuthUrl: string };

export type IsLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type IsLoggedInQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string } };

export type LogoutMutationMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutationMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateUserFavoriteElementMutationVariables = Exact<{
  input: UpdateUserFavoriteElementInput;
}>;


export type UpdateUserFavoriteElementMutation = { __typename?: 'Mutation', updateUserFavoriteElement?: { __typename?: 'Element', id: string, isFavorite?: boolean | null } | null };

export type UpdateUserLikedWorkshopMutationMutationVariables = Exact<{
  input: UpdateUserLikedWorkshopInput;
}>;


export type UpdateUserLikedWorkshopMutationMutation = { __typename?: 'Mutation', updateUserLikedWorkshop?: { __typename?: 'Workshop', id: string, isLiked?: boolean | null } | null };

export type UpdateUserMutationMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutationMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string } };

export type UpdateWorkshopMutationMutationVariables = Exact<{
  input: UpdateWorkshopInput;
}>;


export type UpdateWorkshopMutationMutation = { __typename?: 'Mutation', updateWorkshop: { __typename?: 'Workshop', id: string } };

export type WorkshopFields_WorkshopFragment = (
  { __typename?: 'Workshop', id: string }
  & { ' $fragmentRefs'?: { 'WorkshopPreviewItem_WorkshopFragment': WorkshopPreviewItem_WorkshopFragment } }
) & { ' $fragmentName'?: 'WorkshopFields_WorkshopFragment' };

export type CommunityPage_ElementFragment = (
  { __typename?: 'Element', id: string }
  & { ' $fragmentRefs'?: { 'ElementPreviewItem_ElementFragment': ElementPreviewItem_ElementFragment } }
) & { ' $fragmentName'?: 'CommunityPage_ElementFragment' };

export type ExplorePageQueryQueryVariables = Exact<{
  userWorkshopsFilterInput?: InputMaybe<UserWorkshopsFilterInput>;
  elementsFilterInput?: InputMaybe<ElementsFilterInput>;
  take: Scalars['Int'];
}>;


export type ExplorePageQueryQuery = { __typename?: 'Query', me: { __typename?: 'User', workshops: Array<(
      { __typename?: 'Workshop' }
      & { ' $fragmentRefs'?: { 'WorkshopFields_WorkshopFragment': WorkshopFields_WorkshopFragment } }
    )> }, elements: Array<{ __typename?: 'ElementQueryResult', element: (
      { __typename?: 'Element' }
      & { ' $fragmentRefs'?: { 'CommunityPage_ElementFragment': CommunityPage_ElementFragment } }
    ) }> };

export type AccountPage_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountPage_QueryQuery = { __typename?: 'Query', me: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'AccountOptionsMenu_UserFragment': AccountOptionsMenu_UserFragment;'AccountSignedIn_UserFragment': AccountSignedIn_UserFragment } }
  ) };

export type AccountOptionsMenu_UserFragment = { __typename?: 'User', id: string, name?: string | null } & { ' $fragmentName'?: 'AccountOptionsMenu_UserFragment' };

export type AccountSignedIn_UserFragment = { __typename?: 'User', id: string, name?: string | null, languageCodes: Array<string> } & { ' $fragmentName'?: 'AccountSignedIn_UserFragment' };

export type LibraryCreateCustomElement_QueryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LibraryCreateCustomElement_QueryQuery = { __typename?: 'Query', element?: { __typename?: 'Element', id: string, name: string, visibility: ElementVisibility, markdown?: string | null, languageCode?: string | null, tags: Array<{ __typename?: 'ElementTag', id: string, name: string }> } | null };

export type UpdateElementMutationMutationVariables = Exact<{
  input: UpdateElementInput;
}>;


export type UpdateElementMutationMutation = { __typename?: 'Mutation', updateElement: { __typename?: 'Element', id: string } };

export type CreateElementMutationMutationVariables = Exact<{
  input: CreateElementInput;
}>;


export type CreateElementMutationMutation = { __typename?: 'Mutation', createElement: { __typename?: 'Element', id: string } };

export type LibraryCreateCustomElementWorkshopQueryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LibraryCreateCustomElementWorkshopQueryQuery = { __typename?: 'Query', workshop?: { __typename?: 'Workshop', sections: Array<{ __typename?: 'WorkshopSection', id: string }> } | null };

export type LibraryElementQueryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LibraryElementQueryQuery = (
  { __typename?: 'Query', element?: (
    { __typename?: 'Element' }
    & { ' $fragmentRefs'?: { 'LibraryElement_ElementFragment': LibraryElement_ElementFragment } }
  ) | null }
  & { ' $fragmentRefs'?: { 'LibraryElementPage_QueryFragment': LibraryElementPage_QueryFragment } }
);

export type LibraryElement_ElementFragment = (
  { __typename?: 'Element', id: string, name: string, isFavorite?: boolean | null }
  & { ' $fragmentRefs'?: { 'Element_ElementFragment': Element_ElementFragment;'ElementFavoriteIcon_ElementFragment': ElementFavoriteIcon_ElementFragment } }
) & { ' $fragmentName'?: 'LibraryElement_ElementFragment' };

export type LibraryElementPage_QueryFragment = { __typename?: 'Query', me: { __typename?: 'User', workshops: Array<{ __typename?: 'Workshop', id: string, name: string, sections: Array<{ __typename?: 'WorkshopSection', id: string }> }> } } & { ' $fragmentName'?: 'LibraryElementPage_QueryFragment' };

export type CustomElementsTab_WorkshopFragmentFragment = { __typename?: 'User', elements: Array<(
    { __typename?: 'Element', id: string, name: string }
    & { ' $fragmentRefs'?: { 'ElementPreviewItem_ElementFragment': ElementPreviewItem_ElementFragment } }
  )> } & { ' $fragmentName'?: 'CustomElementsTab_WorkshopFragmentFragment' };

export type CustomElementsTab_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomElementsTab_QueryQuery = { __typename?: 'Query', me: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'CustomElementsTab_WorkshopFragmentFragment': CustomElementsTab_WorkshopFragmentFragment } }
  ) };

export type ElementFavoriteIcon_ElementFragment = { __typename?: 'Element', id: string, isFavorite?: boolean | null } & { ' $fragmentName'?: 'ElementFavoriteIcon_ElementFragment' };

export type LibraryCreateCustomElementTags_QueryQueryVariables = Exact<{
  filter: ElementTagsFilterInput;
}>;


export type LibraryCreateCustomElementTags_QueryQuery = { __typename?: 'Query', tags: Array<(
    { __typename?: 'ElementTag' }
    & { ' $fragmentRefs'?: { 'ElementTagsItem_ElementTagFragment': ElementTagsItem_ElementTagFragment } }
  )> };

export type ElementTagsItem_ElementTagFragment = { __typename?: 'ElementTag', id: string, name: string } & { ' $fragmentName'?: 'ElementTagsItem_ElementTagFragment' };

export type FavoriteElements_UserFragment = { __typename?: 'User', favoriteElements: Array<{ __typename?: 'UserFavoriteElement', element: (
      { __typename?: 'Element', id: string }
      & { ' $fragmentRefs'?: { 'ElementPreviewItem_ElementFragment': ElementPreviewItem_ElementFragment } }
    ) }> } & { ' $fragmentName'?: 'FavoriteElements_UserFragment' };

export type MyUser_QueryFragment = { __typename?: 'Query', me: (
    { __typename?: 'User', id: string, favoriteElements: Array<{ __typename?: 'UserFavoriteElement', element: { __typename?: 'Element', id: string } }> }
    & { ' $fragmentRefs'?: { 'FavoriteElements_UserFragment': FavoriteElements_UserFragment } }
  ) } & { ' $fragmentName'?: 'MyUser_QueryFragment' };

export type MyUserQueryVariables = Exact<{ [key: string]: never; }>;


export type MyUserQuery = (
  { __typename?: 'Query' }
  & { ' $fragmentRefs'?: { 'MyUser_QueryFragment': MyUser_QueryFragment } }
);

export type SearchElementsQueryVariables = Exact<{
  input: ElementSearchInput;
  skip: Scalars['Int'];
  take: Scalars['Int'];
}>;


export type SearchElementsQuery = { __typename?: 'Query', searchElements: Array<(
    { __typename?: 'ElementSearchResult', element: (
      { __typename?: 'Element', id: string }
      & { ' $fragmentRefs'?: { 'ElementPreviewItem_ElementFragment': ElementPreviewItem_ElementFragment } }
    ) }
    & { ' $fragmentRefs'?: { 'ElementPreviewItem_ElementSearchResultFragment': ElementPreviewItem_ElementSearchResultFragment } }
  )> };

export type WorkshopElementPageQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WorkshopElementPageQuery = { __typename?: 'Query', workshopElement: { __typename?: 'WorkshopElement', id: string, note?: string | null, basedOn: (
      { __typename?: 'Element', id: string, name: string, markdown?: string | null, sourceUrl?: string | null, sourceName?: string | null, sourceBaseUrl?: string | null, licenseName?: string | null, licenseUrl?: string | null, isOwnerMe?: boolean | null, owner?: { __typename?: 'User', id: string } | null }
      & { ' $fragmentRefs'?: { 'CustomElement_ElementFragment': CustomElement_ElementFragment;'Element_ElementFragment': Element_ElementFragment } }
    ), section: { __typename?: 'WorkshopSection', id: string, workshop: { __typename?: 'Workshop', canEdit?: boolean | null } } } };

export type UpdateWorkshopElementNoteMutationVariables = Exact<{
  input: UpdateWorkshopInput;
}>;


export type UpdateWorkshopElementNoteMutation = { __typename?: 'Mutation', updateWorkshop: { __typename?: 'Workshop', id: string, sections: Array<{ __typename?: 'WorkshopSection', id: string, elements: Array<{ __typename?: 'WorkshopElement', id: string, note?: string | null }> }> } };

export type WorkshopOptionsMenu_WorkshopFragment = { __typename?: 'Workshop', id: string, name: string, description?: string | null } & { ' $fragmentName'?: 'WorkshopOptionsMenu_WorkshopFragment' };

export type WorkshopPage_WorkshopFragment = (
  { __typename?: 'Workshop', id: string, version: number, isPublic?: boolean | null, isListed: boolean, createdAt: any, updatedAt: any, deleted: boolean, name: string, description?: string | null, canEdit?: boolean | null, isLiked?: boolean | null, sections: Array<{ __typename?: 'WorkshopSection', name?: string | null, elements: Array<{ __typename?: 'WorkshopElement', id: string }> }> }
  & { ' $fragmentRefs'?: { 'WorkshopElementsComponent_WorkshopFragment': WorkshopElementsComponent_WorkshopFragment;'WorkshopOptionsMenu_WorkshopFragment': WorkshopOptionsMenu_WorkshopFragment } }
) & { ' $fragmentName'?: 'WorkshopPage_WorkshopFragment' };

export type WorkshopByIdQueryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WorkshopByIdQueryQuery = { __typename?: 'Query', workshop?: (
    { __typename?: 'Workshop' }
    & { ' $fragmentRefs'?: { 'WorkshopPage_WorkshopFragment': WorkshopPage_WorkshopFragment } }
  ) | null };

export type UpdateWorkshopItemOrderMutationVariables = Exact<{
  input: UpdateWorkshopItemOrder;
}>;


export type UpdateWorkshopItemOrderMutation = { __typename?: 'Mutation', updateWorkshopItemOrder: { __typename?: 'Workshop', id: string } };

export type WorkshopsQueryQueryVariables = Exact<{
  userWorkshopsFilterInput?: InputMaybe<UserWorkshopsFilterInput>;
}>;


export type WorkshopsQueryQuery = { __typename?: 'Query', me: { __typename?: 'User', workshops: Array<(
      { __typename?: 'Workshop' }
      & { ' $fragmentRefs'?: { 'WorkshopFields_WorkshopFragment': WorkshopFields_WorkshopFragment } }
    )> } };

export type CreateWorkshopMutationMutationVariables = Exact<{
  input: CreateWorkshopInput;
}>;


export type CreateWorkshopMutationMutation = { __typename?: 'Mutation', createWorkshop: { __typename?: 'Workshop', id: string } };

export type SectionElementsComponent_WorkshopSectionFragment = { __typename?: 'WorkshopSection', id: string, name?: string | null, isCollapsed: boolean, orderIndex: number, elements: Array<(
    { __typename?: 'WorkshopElement', id: string }
    & { ' $fragmentRefs'?: { 'WorkshopElementItemComponent_WorkshopElementFragment': WorkshopElementItemComponent_WorkshopElementFragment } }
  )>, workshop: { __typename?: 'Workshop', canEdit?: boolean | null } } & { ' $fragmentName'?: 'SectionElementsComponent_WorkshopSectionFragment' };

export type WorkshopElementItemComponent_WorkshopElementFragment = { __typename?: 'WorkshopElement', id: string, note?: string | null, basedOn: { __typename?: 'Element', id: string, name: string, markdown?: string | null }, section: { __typename?: 'WorkshopSection', workshop: { __typename?: 'Workshop', canEdit?: boolean | null } } } & { ' $fragmentName'?: 'WorkshopElementItemComponent_WorkshopElementFragment' };

export type WorkshopElementsComponent_WorkshopFragment = { __typename?: 'Workshop', canEdit?: boolean | null, sections: Array<(
    { __typename?: 'WorkshopSection', id: string, name?: string | null }
    & { ' $fragmentRefs'?: { 'SectionElementsComponent_WorkshopSectionFragment': SectionElementsComponent_WorkshopSectionFragment;'WorkshopSectionComponent_WorkshopSectionFragment': WorkshopSectionComponent_WorkshopSectionFragment } }
  )> } & { ' $fragmentName'?: 'WorkshopElementsComponent_WorkshopFragment' };

export type WorkshopPreviewItem_WorkshopFragment = (
  { __typename?: 'Workshop', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, name: string, description?: string | null, canEdit?: boolean | null, sections: Array<{ __typename?: 'WorkshopSection', name?: string | null, elements: Array<{ __typename?: 'WorkshopElement', basedOn: { __typename?: 'Element', name: string } }> }> }
  & { ' $fragmentRefs'?: { 'WorkshopInfoList_WorkshopFragment': WorkshopInfoList_WorkshopFragment;'WorkshopOptionsMenu_WorkshopFragment': WorkshopOptionsMenu_WorkshopFragment } }
) & { ' $fragmentName'?: 'WorkshopPreviewItem_WorkshopFragment' };

export type WorkshopSectionComponent_WorkshopSectionFragment = { __typename?: 'WorkshopSection', id: string, name?: string | null, color?: string | null, isCollapsed: boolean, elements: Array<{ __typename?: 'WorkshopElement', id: string }>, workshop: { __typename?: 'Workshop', canEdit?: boolean | null } } & { ' $fragmentName'?: 'WorkshopSectionComponent_WorkshopSectionFragment' };

export const ElementInfoList_ElementSearchResultFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_ElementSearchResult"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ElementSearchResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"matches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"indices"}},{"kind":"Field","name":{"kind":"Name","value":"refIndex"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<ElementInfoList_ElementSearchResultFragment, unknown>;
export const ElementPreviewItem_ElementSearchResultFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_ElementSearchResult"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ElementSearchResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"matches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementInfoList_ElementSearchResult"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_ElementSearchResult"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ElementSearchResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"matches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"indices"}},{"kind":"Field","name":{"kind":"Name","value":"refIndex"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<ElementPreviewItem_ElementSearchResultFragment, unknown>;
export const WorkshopInfoList_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopInfoList_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<WorkshopInfoList_WorkshopFragment, unknown>;
export const WorkshopOptionsMenu_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<WorkshopOptionsMenu_WorkshopFragment, unknown>;
export const WorkshopPreviewItem_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopPreviewItem_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopInfoList_Workshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopInfoList_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<WorkshopPreviewItem_WorkshopFragment, unknown>;
export const WorkshopFields_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopFields_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopPreviewItem_Workshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopInfoList_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopPreviewItem_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopInfoList_Workshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"}}]}}]} as unknown as DocumentNode<WorkshopFields_WorkshopFragment, unknown>;
export const CustomElement_ElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}}]} as unknown as DocumentNode<CustomElement_ElementFragment, unknown>;
export const ElementFavoriteIcon_ElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}}]} as unknown as DocumentNode<ElementFavoriteIcon_ElementFragment, unknown>;
export const ElementInfoList_ElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}}]} as unknown as DocumentNode<ElementInfoList_ElementFragment, unknown>;
export const ElementPreviewItem_ElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementInfoList_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}}]} as unknown as DocumentNode<ElementPreviewItem_ElementFragment, unknown>;
export const CommunityPage_ElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityPage_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementInfoList_Element"}}]}}]} as unknown as DocumentNode<CommunityPage_ElementFragment, unknown>;
export const AccountOptionsMenu_UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountOptionsMenu_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<AccountOptionsMenu_UserFragment, unknown>;
export const AccountSignedIn_UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountSignedIn_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"languageCodes"}}]}}]} as unknown as DocumentNode<AccountSignedIn_UserFragment, unknown>;
export const Element_ElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Element_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}}]} as unknown as DocumentNode<Element_ElementFragment, unknown>;
export const LibraryElement_ElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LibraryElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Element_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Element_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}}]} as unknown as DocumentNode<LibraryElement_ElementFragment, unknown>;
export const LibraryElementPage_QueryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LibraryElementPage_Query"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshops"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"owned"},"value":{"kind":"BooleanValue","value":true}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LibraryElementPage_QueryFragment, unknown>;
export const CustomElementsTab_WorkshopFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElementsTab_WorkshopFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementInfoList_Element"}}]}}]} as unknown as DocumentNode<CustomElementsTab_WorkshopFragmentFragment, unknown>;
export const ElementTagsItem_ElementTagFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementTagsItem_ElementTag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ElementTag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ElementTagsItem_ElementTagFragment, unknown>;
export const FavoriteElements_UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FavoriteElements_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"favoriteElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementInfoList_Element"}}]}}]} as unknown as DocumentNode<FavoriteElements_UserFragment, unknown>;
export const MyUser_QueryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyUser_Query"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"favoriteElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FavoriteElements_User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementInfoList_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FavoriteElements_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"favoriteElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}}]}}]}}]} as unknown as DocumentNode<MyUser_QueryFragment, unknown>;
export const WorkshopElementItemComponent_WorkshopElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}}]}},{"kind":"Field","name":{"kind":"Name","value":"section"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}}]}}]}}]}}]} as unknown as DocumentNode<WorkshopElementItemComponent_WorkshopElementFragment, unknown>;
export const SectionElementsComponent_WorkshopSectionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionElementsComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}}]}},{"kind":"Field","name":{"kind":"Name","value":"section"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}}]}}]}}]}}]} as unknown as DocumentNode<SectionElementsComponent_WorkshopSectionFragment, unknown>;
export const WorkshopSectionComponent_WorkshopSectionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSectionComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}}]}}]}}]} as unknown as DocumentNode<WorkshopSectionComponent_WorkshopSectionFragment, unknown>;
export const WorkshopElementsComponent_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementsComponent_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionElementsComponent_WorkshopSection"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopSectionComponent_WorkshopSection"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}}]}},{"kind":"Field","name":{"kind":"Name","value":"section"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionElementsComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSectionComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}}]}}]}}]} as unknown as DocumentNode<WorkshopElementsComponent_WorkshopFragment, unknown>;
export const WorkshopPage_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopPage_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopElementsComponent_Workshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}}]}},{"kind":"Field","name":{"kind":"Name","value":"section"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionElementsComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSectionComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementsComponent_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionElementsComponent_WorkshopSection"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopSectionComponent_WorkshopSection"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<WorkshopPage_WorkshopFragment, unknown>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"favoriteElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const DeleteWorkshopMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWorkshopMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteWorkshopMutationMutation, DeleteWorkshopMutationMutationVariables>;
export const DuplicateWorkshopMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DuplicateWorkshopMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DuplicateWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duplicateWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DuplicateWorkshopMutationMutation, DuplicateWorkshopMutationMutationVariables>;
export const GoogleLoginHrefQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GoogleLoginHrefQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"googleAuthUrl"}}]}}]} as unknown as DocumentNode<GoogleLoginHrefQueryQuery, GoogleLoginHrefQueryQueryVariables>;
export const IsLoggedInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsLoggedIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<IsLoggedInQuery, IsLoggedInQueryVariables>;
export const LogoutMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutationMutation, LogoutMutationMutationVariables>;
export const UpdateUserFavoriteElementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserFavoriteElement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserFavoriteElementInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserFavoriteElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}}]}}]} as unknown as DocumentNode<UpdateUserFavoriteElementMutation, UpdateUserFavoriteElementMutationVariables>;
export const UpdateUserLikedWorkshopMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserLikedWorkshopMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserLikedWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserLikedWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}}]} as unknown as DocumentNode<UpdateUserLikedWorkshopMutationMutation, UpdateUserLikedWorkshopMutationMutationVariables>;
export const UpdateUserMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutationMutation, UpdateUserMutationMutationVariables>;
export const UpdateWorkshopMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorkshopMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateWorkshopMutationMutation, UpdateWorkshopMutationMutationVariables>;
export const ExplorePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExplorePageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userWorkshopsFilterInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWorkshopsFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"elementsFilterInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ElementsFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshops"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userWorkshopsFilterInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopFields_Workshop"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"elementsFilterInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommunityPage_Element"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopInfoList_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopPreviewItem_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopInfoList_Workshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementInfoList_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopFields_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopPreviewItem_Workshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommunityPage_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}}]} as unknown as DocumentNode<ExplorePageQueryQuery, ExplorePageQueryQueryVariables>;
export const AccountPage_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountPage_Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountOptionsMenu_User"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountSignedIn_User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountOptionsMenu_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountSignedIn_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"languageCodes"}}]}}]} as unknown as DocumentNode<AccountPage_QueryQuery, AccountPage_QueryQueryVariables>;
export const LibraryCreateCustomElement_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LibraryCreateCustomElement_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<LibraryCreateCustomElement_QueryQuery, LibraryCreateCustomElement_QueryQueryVariables>;
export const UpdateElementMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateElementMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateElementInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateElementMutationMutation, UpdateElementMutationMutationVariables>;
export const CreateElementMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateElementMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateElementInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateElementMutationMutation, CreateElementMutationMutationVariables>;
export const LibraryCreateCustomElementWorkshopQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LibraryCreateCustomElementWorkshopQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<LibraryCreateCustomElementWorkshopQueryQuery, LibraryCreateCustomElementWorkshopQueryQueryVariables>;
export const LibraryElementQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LibraryElementQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LibraryElement_Element"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"LibraryElementPage_Query"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Element_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LibraryElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Element_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LibraryElementPage_Query"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshops"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"owned"},"value":{"kind":"BooleanValue","value":true}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LibraryElementQueryQuery, LibraryElementQueryQueryVariables>;
export const CustomElementsTab_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomElementsTab_Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElementsTab_WorkshopFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementInfoList_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElementsTab_WorkshopFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}}]}}]} as unknown as DocumentNode<CustomElementsTab_QueryQuery, CustomElementsTab_QueryQueryVariables>;
export const LibraryCreateCustomElementTags_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LibraryCreateCustomElementTags_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ElementTagsFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementTagsItem_ElementTag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementTagsItem_ElementTag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ElementTag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<LibraryCreateCustomElementTags_QueryQuery, LibraryCreateCustomElementTags_QueryQueryVariables>;
export const MyUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyUser_Query"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementInfoList_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FavoriteElements_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"favoriteElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyUser_Query"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"favoriteElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FavoriteElements_User"}}]}}]}}]} as unknown as DocumentNode<MyUserQuery, MyUserQueryVariables>;
export const SearchElementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchElements"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ElementSearchInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchElements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_ElementSearchResult"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_ElementSearchResult"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ElementSearchResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"matches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"indices"}},{"kind":"Field","name":{"kind":"Name","value":"refIndex"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFavoriteIcon_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementInfoList_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_ElementSearchResult"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ElementSearchResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"matches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementInfoList_ElementSearchResult"}}]}}]} as unknown as DocumentNode<SearchElementsQuery, SearchElementsQueryVariables>;
export const WorkshopElementPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkshopElementPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshopElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Element_Element"}}]}},{"kind":"Field","name":{"kind":"Name","value":"section"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Element_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}}]}}]} as unknown as DocumentNode<WorkshopElementPageQuery, WorkshopElementPageQueryVariables>;
export const UpdateWorkshopElementNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorkshopElementNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateWorkshopElementNoteMutation, UpdateWorkshopElementNoteMutationVariables>;
export const WorkshopByIdQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkshopByIdQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopPage_Workshop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}}]}},{"kind":"Field","name":{"kind":"Name","value":"section"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionElementsComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSectionComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementsComponent_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionElementsComponent_WorkshopSection"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopSectionComponent_WorkshopSection"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopPage_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopElementsComponent_Workshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"}}]}}]} as unknown as DocumentNode<WorkshopByIdQueryQuery, WorkshopByIdQueryQueryVariables>;
export const UpdateWorkshopItemOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorkshopItemOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkshopItemOrder"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkshopItemOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateWorkshopItemOrderMutation, UpdateWorkshopItemOrderMutationVariables>;
export const WorkshopsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkshopsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userWorkshopsFilterInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWorkshopsFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshops"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userWorkshopsFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopFields_Workshop"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopInfoList_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopPreviewItem_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopInfoList_Workshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopFields_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopPreviewItem_Workshop"}}]}}]} as unknown as DocumentNode<WorkshopsQueryQuery, WorkshopsQueryQueryVariables>;
export const CreateWorkshopMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWorkshopMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateWorkshopMutationMutation, CreateWorkshopMutationMutationVariables>;