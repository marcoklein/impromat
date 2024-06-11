/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type BasedOnElementConnectInput = {
  connect: IdInput;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateElementInput = {
  /** Set if the element was imported from improbib, a project that collects existing improv resources. */
  improbibIdentifier?: InputMaybe<Scalars['String']['input']>;
  /** Language code (e.g. en, de) of the element. */
  languageCode: Scalars['String']['input'];
  licenseName?: InputMaybe<Scalars['String']['input']>;
  licenseUrl?: InputMaybe<Scalars['String']['input']>;
  markdown?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  orderIndex?: InputMaybe<Scalars['Int']['input']>;
  setPredictedLevelTags?: InputMaybe<Scalars['Boolean']['input']>;
  sourceBaseUrl?: InputMaybe<Scalars['String']['input']>;
  sourceName?: InputMaybe<Scalars['String']['input']>;
  sourceUrl?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<ElementTagsInput>;
  visibility: ElementVisibility;
};

export type CreateWorkshopElementInput = {
  basedOn: BasedOnElementConnectInput;
  note?: InputMaybe<Scalars['String']['input']>;
  orderIndex?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateWorkshopInput = {
  /** Date for which workshop is planned or was held. */
  dateOfWorkshop?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** Publicly list workshop within impromat. Worshop must be public in order to list it. */
  isListed?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sections?: InputMaybe<WorkshopSectionListCreateInput>;
};

export type CreateWorkshopSectionInput = {
  isCollapsed?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  orderIndex?: InputMaybe<Scalars['Float']['input']>;
};

export type DeleteWorkshopElementInput = {
  id: Scalars['ID']['input'];
};

export type DeleteWorkshopSectionInput = {
  id: Scalars['ID']['input'];
};

/** Duplicates a workshop to allow changes to the new workshop. */
export type DuplicateWorkshopInput = {
  name: Scalars['String']['input'];
  workshopId: Scalars['ID']['input'];
};

export type Element = {
  __typename?: 'Element';
  createdAt: Scalars['DateTime']['output'];
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** Set if the element was imported from improbib, a project that collects existing improv resources. */
  improbibIdentifier?: Maybe<Scalars['String']['output']>;
  /** Set if the element is called from a user context. */
  isFavorite?: Maybe<Scalars['Boolean']['output']>;
  /** Convenience field to determine if the owner of the element is the logged in user. */
  isOwnerMe?: Maybe<Scalars['Boolean']['output']>;
  /** The keywords of the element. This is generated asynchronously and might not be available immediately. */
  keywords?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  languageCode?: Maybe<Scalars['String']['output']>;
  licenseName?: Maybe<Scalars['String']['output']>;
  licenseUrl?: Maybe<Scalars['String']['output']>;
  markdown?: Maybe<Scalars['String']['output']>;
  /** Shortened markdown text for preview purposes to avoid loading the whole content in a request. */
  markdownShort?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner?: Maybe<User>;
  recommendations: Array<Element>;
  /** Changes of the element. */
  snapshots: Array<ElementSnapshot>;
  sourceBaseUrl?: Maybe<Scalars['String']['output']>;
  sourceName?: Maybe<Scalars['String']['output']>;
  sourceUrl?: Maybe<Scalars['String']['output']>;
  /** The summary of the element. This is generated asynchronously and might not be available immediately. */
  summary?: Maybe<Scalars['String']['output']>;
  tags: Array<ElementTag>;
  updatedAt: Scalars['DateTime']['output'];
  usedBy: Array<WorkshopElement>;
  /** The summary of the element. This is generated asynchronously and might not be available immediately. */
  variations?: Maybe<Array<Maybe<Variation>>>;
  version: Scalars['Int']['output'];
  visibility: ElementVisibility;
};


export type ElementSnapshotsArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type ElementSummaryArgs = {
  forceRefresh?: Scalars['Boolean']['input'];
};

export type ElementSearchInput = {
  /** Language code (e.g. en, de) for results. */
  languageCode?: InputMaybe<Scalars['String']['input']>;
  /** Language codes (e.g. en, de) to filter results by. */
  languageCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  /** If true, only elements created by the requesting user are returned. If false, only elements not created by the requesting user are returned. If not set, all elements are returned. */
  ownElement?: InputMaybe<Scalars['Boolean']['input']>;
  /** Search text. See https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search#postgresql for search usage information. */
  text?: InputMaybe<Scalars['String']['input']>;
};

export type ElementSearchKeyword = {
  __typename?: 'ElementSearchKeyword';
  /** Inverse document frequency. Describes how important a word is to a document in a collection or corpus. The more common a word is in a document, the lower its idf. */
  idf: Scalars['Float']['output'];
  /** The keyword in its stemmed form. */
  keyword: Scalars['String']['output'];
  /** The keyword in its original form(s) before stemming. */
  originalKeywords?: Maybe<Array<Scalars['String']['output']>>;
};

export type ElementSearchKeywords = {
  __typename?: 'ElementSearchKeywords';
  documentsCount: Scalars['Int']['output'];
  keywords: Array<ElementSearchKeyword>;
  similarKeywords?: Maybe<Array<SimilarKeyword>>;
  uniqueKeywordsCount: Scalars['Int']['output'];
};

/** Contains information about the exact match of a search term in an element. */
export type ElementSearchMatch = {
  __typename?: 'ElementSearchMatch';
  /** Identifier of the matched field. E.g. "name", "markdown", or "tags". */
  key: Scalars['String']['output'];
  /** The matched text in of the field. Could be used for highlighting. */
  value: Scalars['String']['output'];
};

export type ElementSearchResult = {
  __typename?: 'ElementSearchResult';
  element: Element;
  matches: Array<ElementSearchMatch>;
  score: Scalars['Float']['output'];
};

export type ElementSnapshot = {
  __typename?: 'ElementSnapshot';
  createdAt: Scalars['DateTime']['output'];
  /** Element of snapshot. */
  element: Element;
  id: Scalars['ID']['output'];
  /** Element this snapshot was created of. */
  parent: Element;
  /** User that created the snapshot. */
  user?: Maybe<User>;
};

export type ElementTag = {
  __typename?: 'ElementTag';
  /** Number of elements that have this tag. If used as part of a filter query the number of elements that would match the filter. */
  count: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};

export type ElementTagSetInput = {
  name: Scalars['String']['input'];
};

/** Filter tags of elements. */
export type ElementTagsFilterInput = {
  /** Language code (e.g. en, de) for results. */
  languageCode?: InputMaybe<Scalars['String']['input']>;
  selectedTagNames?: InputMaybe<Array<Scalars['String']['input']>>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type ElementTagsInput = {
  /** Defines all tags of the element. */
  set: Array<ElementTagSetInput>;
};

export enum ElementVisibility {
  /** Element is only visible to its owning user. */
  Private = 'PRIVATE',
  /** Element is publicly shared with the whole community. */
  Public = 'PUBLIC'
}

export type IdInput = {
  id: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Iterates over all elements and applies tag mappings. */
  applyAllTagMappings: Scalars['Float']['output'];
  /** Iterates over all elements and creates summaries. */
  createAllSummaries: Scalars['Float']['output'];
  createElement: Element;
  createWorkshop: Workshop;
  deleteWorkshop?: Maybe<Workshop>;
  duplicateWorkshop: Workshop;
  logout: Scalars['Boolean']['output'];
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
  id: Scalars['ID']['input'];
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
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  element?: Maybe<Element>;
  googleAuthUrl: Scalars['String']['output'];
  /** Get information about the current user. Returns null if not logged in. */
  me?: Maybe<User>;
  searchElements: Array<ElementSearchResult>;
  searchElementsKeywords: ElementSearchKeywords;
  searchElementsTfidf: Array<ElementSearchResult>;
  /** Universal search for workshops. Works for all users. */
  searchWorkshops: Array<WorkshopSearchResult>;
  tags: Array<ElementTag>;
  /** Get information about a user. Returns null if not found or not logged in. */
  user?: Maybe<User>;
  workshop?: Maybe<Workshop>;
  workshopElement: WorkshopElement;
  /** Find workshops. */
  workshops: Array<Workshop>;
};


export type QueryElementArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySearchElementsArgs = {
  input?: InputMaybe<ElementSearchInput>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QuerySearchElementsKeywordsArgs = {
  input: ElementSearchInput;
};


export type QuerySearchElementsTfidfArgs = {
  input: ElementSearchInput;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QuerySearchWorkshopsArgs = {
  input: WorkshopSearchInput;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryTagsArgs = {
  filter?: InputMaybe<ElementTagsFilterInput>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryWorkshopArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWorkshopElementArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWorkshopsArgs = {
  orderBy?: InputMaybe<Array<WorkshopsOrderByInput>>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<WorkshopsWhereInput>;
};

export type SimilarKeyword = {
  __typename?: 'SimilarKeyword';
  keyword: Scalars['String']['output'];
  score: Scalars['Float']['output'];
};

export enum SortOrder {
  /** Ascending sort order. */
  Asc = 'asc',
  /** Descending sort order. */
  Desc = 'desc'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateElementInput = {
  id: Scalars['ID']['input'];
  /** Set if the element was imported from improbib, a project that collects existing improv resources. */
  improbibIdentifier?: InputMaybe<Scalars['String']['input']>;
  /** Language code (e.g. en, de) of the element. */
  languageCode?: InputMaybe<Scalars['String']['input']>;
  licenseName?: InputMaybe<Scalars['String']['input']>;
  licenseUrl?: InputMaybe<Scalars['String']['input']>;
  markdown?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orderIndex?: InputMaybe<Scalars['Int']['input']>;
  setPredictedLevelTags?: InputMaybe<Scalars['Boolean']['input']>;
  sourceBaseUrl?: InputMaybe<Scalars['String']['input']>;
  sourceName?: InputMaybe<Scalars['String']['input']>;
  sourceUrl?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<ElementTagsInput>;
  visibility?: InputMaybe<ElementVisibility>;
};

export type UpdateUserFavoriteElementInput = {
  elementId: Scalars['ID']['input'];
  isFavorite: Scalars['Boolean']['input'];
};

export type UpdateUserInput = {
  id: Scalars['ID']['input'];
  /** Preferred languages of the user. E.g. de or en. */
  languageCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserLikedWorkshopInput = {
  isLiked: Scalars['Boolean']['input'];
  workshopId: Scalars['ID']['input'];
};

export type UpdateWorkshopElementInput = {
  basedOn?: InputMaybe<BasedOnElementConnectInput>;
  id: Scalars['ID']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  orderIndex?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateWorkshopInput = {
  /** Date for which workshop is planned or was held. */
  dateOfWorkshop?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  /** Publicly list workshop within impromat. Worshop must be public in order to list it. */
  isListed?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sections?: InputMaybe<WorkshopSectionListInput>;
};

/** Moves a workshop item (section or element) within a workshop considering collapsed sections. */
export type UpdateWorkshopItemOrder = {
  /** From position. */
  fromPosition: Scalars['Int']['input'];
  /** To position. */
  toPosition: Scalars['Int']['input'];
  workshopId: Scalars['ID']['input'];
};

export type UpdateWorkshopSectionInput = {
  elements?: InputMaybe<WorkshopElementListInput>;
  id: Scalars['ID']['input'];
  isCollapsed?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orderIndex?: InputMaybe<Scalars['Float']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  deleted?: Maybe<Scalars['Boolean']['output']>;
  favoriteElements: Array<UserFavoriteElement>;
  id: Scalars['ID']['output'];
  /** Preferred language codes of the user. */
  languageCodes: Array<Scalars['String']['output']>;
  likedWorkshops: Array<UserLikedWorkshop>;
  /** Public display name of the user. */
  name?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
  /** All workshops that this user has access to. */
  workshops: Array<Workshop>;
};


export type UserWorkshopsArgs = {
  input?: InputMaybe<UserWorkshopsFilterInput>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};

export type UserFavoriteElement = {
  __typename?: 'UserFavoriteElement';
  createdAt: Scalars['DateTime']['output'];
  element: Element;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserLikedWorkshop = {
  __typename?: 'UserLikedWorkshop';
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
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
  isCommunity?: Scalars['Boolean']['input'];
  /** Publicly or listed workshops of user. */
  isPublic?: Scalars['Boolean']['input'];
  liked?: Scalars['Boolean']['input'];
  /** Filter for workshops that are owned by the user. */
  owned?: Scalars['Boolean']['input'];
};

export type Variation = {
  __typename?: 'Variation';
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type Workshop = {
  __typename?: 'Workshop';
  /** If true, the client is authorized to edit the workshop. */
  canEdit?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** Optional metadata date when this workshop was planned (or held). */
  dateOfWorkshop?: Maybe<Scalars['DateTime']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** Find recommended elements. */
  elementRecommendations: Array<Element>;
  id: Scalars['ID']['output'];
  /** True, if liked by the logged in user. Undefined, if there is no user logged in. */
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  /** True, if the workshop is listed publicly in the improv community. */
  isListed: Scalars['Boolean']['output'];
  /** Convenience field to determine if the owner of the workshop is the logged in user. */
  isOwnerMe?: Maybe<Scalars['Boolean']['output']>;
  /** Public users can view the workshop but they require the direct link to the workshop. The url of the workshop does not change. */
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  owner: User;
  sections: Array<WorkshopSection>;
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};

export type WorkshopElement = {
  __typename?: 'WorkshopElement';
  basedOn: Element;
  createdAt: Scalars['DateTime']['output'];
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  section: WorkshopSection;
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};

export type WorkshopElementListInput = {
  create?: InputMaybe<Array<CreateWorkshopElementInput>>;
  delete?: InputMaybe<Array<DeleteWorkshopElementInput>>;
  update?: InputMaybe<Array<UpdateWorkshopElementInput>>;
};

export type WorkshopSearchInput = {
  /** Language codes (e.g. en, de) to filter results by. */
  languageCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  /** If true, only workshop created by the requesting user are returned. If false, only workshops not created by the requesting user are returned. If not set, all workshops are returned. */
  ownWorkshop?: InputMaybe<Scalars['Boolean']['input']>;
};

export type WorkshopSearchResult = {
  __typename?: 'WorkshopSearchResult';
  workshop: Workshop;
};

export type WorkshopSection = {
  __typename?: 'WorkshopSection';
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deleted?: Maybe<Scalars['Boolean']['output']>;
  elements: Array<WorkshopElement>;
  id: Scalars['ID']['output'];
  isCollapsed: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  orderIndex: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
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

export type ElementInfoList_ElementFragment = { __typename?: 'Element', id: string, isFavorite?: boolean | null, isOwnerMe?: boolean | null, languageCode?: string | null, sourceName?: string | null, visibility: ElementVisibility } & { ' $fragmentName'?: 'ElementInfoList_ElementFragment' };

export type ElementPreviewItem_ElementSearchResultFragment = { __typename?: 'ElementSearchResult', matches: Array<{ __typename?: 'ElementSearchMatch', key: string, value: string }> } & { ' $fragmentName'?: 'ElementPreviewItem_ElementSearchResultFragment' };

export type ElementPreviewItem_ElementFragment = (
  { __typename?: 'Element', id: string, createdAt: any, updatedAt: any, version: number, deleted?: boolean | null, name: string, summary?: string | null, markdownShort?: string | null, languageCode?: string | null, sourceUrl?: string | null, sourceName?: string | null, sourceBaseUrl?: string | null, licenseName?: string | null, licenseUrl?: string | null, visibility: ElementVisibility, isFavorite?: boolean | null, isOwnerMe?: boolean | null, tags: Array<{ __typename?: 'ElementTag', id: string, name: string }>, usedBy: Array<{ __typename?: 'WorkshopElement', id: string }>, owner?: { __typename?: 'User', id: string } | null }
  & { ' $fragmentRefs'?: { 'CustomElement_ElementFragment': CustomElement_ElementFragment;'ElementInfoList_ElementFragment': ElementInfoList_ElementFragment } }
) & { ' $fragmentName'?: 'ElementPreviewItem_ElementFragment' };

export type WorkshopInfoList_WorkshopFragment = { __typename?: 'Workshop', id: string, createdAt: any, updatedAt: any, isPublic?: boolean | null, isListed: boolean, canEdit?: boolean | null, isOwnerMe?: boolean | null, isLiked?: boolean | null, dateOfWorkshop?: any | null, owner: { __typename?: 'User', id: string, name?: string | null } } & { ' $fragmentName'?: 'WorkshopInfoList_WorkshopFragment' };

export type CreateWorkshopMutationMutationVariables = Exact<{
  input: CreateWorkshopInput;
}>;


export type CreateWorkshopMutationMutation = { __typename?: 'Mutation', createWorkshop: { __typename?: 'Workshop', id: string } };

export type DeleteWorkshopMutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteWorkshopMutationMutation = { __typename?: 'Mutation', deleteWorkshop?: { __typename?: 'Workshop', id: string } | null };

export type DuplicateWorkshopMutationMutationVariables = Exact<{
  input: DuplicateWorkshopInput;
}>;


export type DuplicateWorkshopMutationMutation = { __typename?: 'Mutation', duplicateWorkshop: { __typename?: 'Workshop', id: string } };

export type GoogleLoginHrefQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GoogleLoginHrefQueryQuery = { __typename?: 'Query', googleAuthUrl: string };

export type IsLoggedIn_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type IsLoggedIn_QueryQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string } | null };

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


export type UpdateUserMutationMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name?: string | null, languageCodes: Array<string>, createdAt: any, updatedAt: any, version: number, deleted?: boolean | null } };

export type UpdateWorkshopMutationMutationVariables = Exact<{
  input: UpdateWorkshopInput;
}>;


export type UpdateWorkshopMutationMutation = { __typename?: 'Mutation', updateWorkshop: { __typename?: 'Workshop', id: string } };

export type LibraryCreateElementPage_QueryQueryVariables = Exact<{
  tagsInput: ElementTagsFilterInput;
  tagsTake?: InputMaybe<Scalars['Int']['input']>;
}>;


export type LibraryCreateElementPage_QueryQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'ElementTag', id: string, name: string }> };

export type CreateElementMutationMutationVariables = Exact<{
  input: CreateElementInput;
}>;


export type CreateElementMutationMutation = { __typename?: 'Mutation', createElement: { __typename?: 'Element', id: string } };

export type LibraryUpdateElementPage_QueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LibraryUpdateElementPage_QueryQuery = { __typename?: 'Query', element?: { __typename?: 'Element', id: string, name: string, visibility: ElementVisibility, markdown?: string | null, languageCode?: string | null, tags: Array<{ __typename?: 'ElementTag', id: string, name: string }> } | null };

export type LibraryUpdateElementPageTags_QueryQueryVariables = Exact<{
  tagsInput: ElementTagsFilterInput;
  tagsTake?: InputMaybe<Scalars['Int']['input']>;
}>;


export type LibraryUpdateElementPageTags_QueryQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'ElementTag', id: string, name: string }> };

export type UpdateElementMutationMutationVariables = Exact<{
  input: UpdateElementInput;
}>;


export type UpdateElementMutationMutation = { __typename?: 'Mutation', updateElement: { __typename?: 'Element', id: string } };

export type LibraryElements_ElementSearchResultFragment = (
  { __typename?: 'ElementSearchResult', element: (
    { __typename?: 'Element', id: string, createdAt: any, updatedAt: any, version: number, deleted?: boolean | null, name: string, summary?: string | null, markdownShort?: string | null, languageCode?: string | null, sourceUrl?: string | null, sourceName?: string | null, sourceBaseUrl?: string | null, licenseName?: string | null, licenseUrl?: string | null, visibility: ElementVisibility, isFavorite?: boolean | null, isOwnerMe?: boolean | null, tags: Array<{ __typename?: 'ElementTag', id: string, name: string }>, usedBy: Array<{ __typename?: 'WorkshopElement', id: string }>, owner?: { __typename?: 'User', id: string } | null }
    & { ' $fragmentRefs'?: { 'ElementItem_ElementFragment': ElementItem_ElementFragment;'ElementPreviewItem_ElementFragment': ElementPreviewItem_ElementFragment } }
  ) }
  & { ' $fragmentRefs'?: { 'ElementPreviewItem_ElementSearchResultFragment': ElementPreviewItem_ElementSearchResultFragment } }
) & { ' $fragmentName'?: 'LibraryElements_ElementSearchResultFragment' };

export type MuiLibraryPageQueryQueryVariables = Exact<{
  input: ElementSearchInput;
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
}>;


export type MuiLibraryPageQueryQuery = { __typename?: 'Query', searchElements: Array<(
    { __typename?: 'ElementSearchResult', element: (
      { __typename?: 'Element', id: string, name: string }
      & { ' $fragmentRefs'?: { 'ElementItem_ElementFragment': ElementItem_ElementFragment } }
    ) }
    & { ' $fragmentRefs'?: { 'LibraryElements_ElementSearchResultFragment': LibraryElements_ElementSearchResultFragment } }
  )> };

export type AddToWorkshopSelectDialog_WorkshopFragment = { __typename?: 'Workshop', id: string, name: string, sections: Array<{ __typename?: 'WorkshopSection', id: string }> } & { ' $fragmentName'?: 'AddToWorkshopSelectDialog_WorkshopFragment' };

export type ElementDetails_ElementFragment = (
  { __typename?: 'Element', id: string, name: string, markdown?: string | null, summary?: string | null, isOwnerMe?: boolean | null, visibility: ElementVisibility, sourceUrl?: string | null, sourceName?: string | null, sourceBaseUrl?: string | null, licenseName?: string | null, licenseUrl?: string | null, owner?: { __typename?: 'User', id: string, name?: string | null } | null, tags: Array<{ __typename?: 'ElementTag', id: string, name: string }> }
  & { ' $fragmentRefs'?: { 'CustomElement_ElementFragment': CustomElement_ElementFragment } }
) & { ' $fragmentName'?: 'ElementDetails_ElementFragment' };

export type ElementItem_ElementFragment = { __typename?: 'Element', id: string, createdAt: any, updatedAt: any, version: number, deleted?: boolean | null, name: string, summary?: string | null, markdownShort?: string | null, languageCode?: string | null, sourceUrl?: string | null, sourceName?: string | null, sourceBaseUrl?: string | null, licenseName?: string | null, licenseUrl?: string | null, visibility: ElementVisibility, isFavorite?: boolean | null, isOwnerMe?: boolean | null, tags: Array<{ __typename?: 'ElementTag', id: string, name: string }>, usedBy: Array<{ __typename?: 'WorkshopElement', id: string }>, owner?: { __typename?: 'User', id: string } | null } & { ' $fragmentName'?: 'ElementItem_ElementFragment' };

export type ElementLikeIconButton_ElementFragment = { __typename?: 'Element', id: string, isFavorite?: boolean | null } & { ' $fragmentName'?: 'ElementLikeIconButton_ElementFragment' };

export type MuiLibraryElementQueryQueryVariables = Exact<{
  elementId: Scalars['ID']['input'];
}>;


export type MuiLibraryElementQueryQuery = { __typename?: 'Query', element?: (
    { __typename?: 'Element', id: string, name: string }
    & { ' $fragmentRefs'?: { 'ElementDetails_ElementFragment': ElementDetails_ElementFragment;'ElementLikeIconButton_ElementFragment': ElementLikeIconButton_ElementFragment } }
  ) | null, me?: { __typename?: 'User', id: string, workshops: Array<(
      { __typename?: 'Workshop' }
      & { ' $fragmentRefs'?: { 'AddToWorkshopSelectDialog_WorkshopFragment': AddToWorkshopSelectDialog_WorkshopFragment } }
    )> } | null };

export type MySpacePage_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MySpacePage_QueryQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name?: string | null, languageCodes: Array<string> } | null };

export type WorkshopElementPage_QueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type WorkshopElementPage_QueryQuery = { __typename?: 'Query', workshopElement: { __typename?: 'WorkshopElement', id: string, note?: string | null, basedOn: (
      { __typename?: 'Element', id: string, name: string, markdown?: string | null, sourceUrl?: string | null, sourceName?: string | null, sourceBaseUrl?: string | null, licenseName?: string | null, licenseUrl?: string | null, isOwnerMe?: boolean | null, owner?: { __typename?: 'User', id: string } | null }
      & { ' $fragmentRefs'?: { 'ElementDetails_ElementFragment': ElementDetails_ElementFragment;'CustomElement_ElementFragment': CustomElement_ElementFragment;'ElementLikeIconButton_ElementFragment': ElementLikeIconButton_ElementFragment } }
    ), section: { __typename?: 'WorkshopSection', id: string, workshop: { __typename?: 'Workshop', id: string, canEdit?: boolean | null } } } };

export type UpdateWorkshopElementNoteMutationVariables = Exact<{
  input: UpdateWorkshopInput;
}>;


export type UpdateWorkshopElementNoteMutation = { __typename?: 'Mutation', updateWorkshop: { __typename?: 'Workshop', id: string, sections: Array<{ __typename?: 'WorkshopSection', id: string, elements: Array<{ __typename?: 'WorkshopElement', id: string, note?: string | null }> }> } };

export type WorkshopPage_WorkshopFragment = (
  { __typename?: 'Workshop', id: string, version: number, isPublic?: boolean | null, isListed: boolean, createdAt: any, updatedAt: any, deleted?: boolean | null, name: string, description?: string | null, canEdit?: boolean | null, isLiked?: boolean | null, dateOfWorkshop?: any | null, elementRecommendations: Array<(
    { __typename?: 'Element', id: string }
    & { ' $fragmentRefs'?: { 'ElementPreviewItem_ElementFragment': ElementPreviewItem_ElementFragment } }
  )> }
  & { ' $fragmentRefs'?: { 'WorkshopContent_WorkshopFragment': WorkshopContent_WorkshopFragment;'WorkshopLikeIconButton_WorkshopFragment': WorkshopLikeIconButton_WorkshopFragment;'WorkshopOptionsMenu_WorkshopFragment': WorkshopOptionsMenu_WorkshopFragment;'WorkshopSharingButton_WorkshopFragment': WorkshopSharingButton_WorkshopFragment } }
) & { ' $fragmentName'?: 'WorkshopPage_WorkshopFragment' };

export type WorkshopByIdQueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type WorkshopByIdQueryQuery = { __typename?: 'Query', workshop?: (
    { __typename?: 'Workshop' }
    & { ' $fragmentRefs'?: { 'WorkshopPage_WorkshopFragment': WorkshopPage_WorkshopFragment } }
  ) | null };

export type WorkshopFields_WorkshopFragment = (
  { __typename?: 'Workshop', id: string }
  & { ' $fragmentRefs'?: { 'WorkshopPreviewItem_WorkshopFragment': WorkshopPreviewItem_WorkshopFragment } }
) & { ' $fragmentName'?: 'WorkshopFields_WorkshopFragment' };

export type WorkshopsPage_QueryQueryVariables = Exact<{
  workshopSearchInput: WorkshopSearchInput;
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
}>;


export type WorkshopsPage_QueryQuery = { __typename?: 'Query', searchWorkshops: Array<{ __typename?: 'WorkshopSearchResult', workshop: (
      { __typename?: 'Workshop' }
      & { ' $fragmentRefs'?: { 'WorkshopFields_WorkshopFragment': WorkshopFields_WorkshopFragment } }
    ) }> };

export type ShareWorkshopModal_WorkshopFragment = { __typename?: 'Workshop', id: string, isPublic?: boolean | null, isListed: boolean } & { ' $fragmentName'?: 'ShareWorkshopModal_WorkshopFragment' };

export type WorkshopContent_WorkshopFragment = { __typename?: 'Workshop', id: string, canEdit?: boolean | null, sections: Array<(
    { __typename?: 'WorkshopSection', id: string, name?: string | null, isCollapsed: boolean, elements: Array<(
      { __typename?: 'WorkshopElement', id: string }
      & { ' $fragmentRefs'?: { 'WorkshopElementItem_WorkshopElementFragment': WorkshopElementItem_WorkshopElementFragment } }
    )> }
    & { ' $fragmentRefs'?: { 'WorkshopSectionItem_WorkshopSectionFragment': WorkshopSectionItem_WorkshopSectionFragment } }
  )> } & { ' $fragmentName'?: 'WorkshopContent_WorkshopFragment' };

export type UpdateWorkshopItemOrderMutationVariables = Exact<{
  input: UpdateWorkshopItemOrder;
}>;


export type UpdateWorkshopItemOrderMutation = { __typename?: 'Mutation', updateWorkshopItemOrder: { __typename?: 'Workshop', id: string } };

export type WorkshopElementItem_WorkshopElementFragment = { __typename?: 'WorkshopElement', id: string, note?: string | null, basedOn: { __typename?: 'Element', id: string, name: string } } & { ' $fragmentName'?: 'WorkshopElementItem_WorkshopElementFragment' };

export type WorkshopLikeIconButton_WorkshopFragment = { __typename?: 'Workshop', id: string, isLiked?: boolean | null } & { ' $fragmentName'?: 'WorkshopLikeIconButton_WorkshopFragment' };

export type WorkshopOptionsMenu_WorkshopFragment = { __typename?: 'Workshop', id: string, name: string, description?: string | null, dateOfWorkshop?: any | null } & { ' $fragmentName'?: 'WorkshopOptionsMenu_WorkshopFragment' };

export type WorkshopPreviewItem_WorkshopFragment = (
  { __typename?: 'Workshop', id: string, version: number, createdAt: any, updatedAt: any, deleted?: boolean | null, name: string, description?: string | null, canEdit?: boolean | null, sections: Array<{ __typename?: 'WorkshopSection', id: string, name?: string | null, elements: Array<{ __typename?: 'WorkshopElement', id: string, basedOn: { __typename?: 'Element', id: string, name: string } }> }> }
  & { ' $fragmentRefs'?: { 'WorkshopInfoList_WorkshopFragment': WorkshopInfoList_WorkshopFragment;'WorkshopOptionsMenu_WorkshopFragment': WorkshopOptionsMenu_WorkshopFragment;'WorkshopLikeIconButton_WorkshopFragment': WorkshopLikeIconButton_WorkshopFragment } }
) & { ' $fragmentName'?: 'WorkshopPreviewItem_WorkshopFragment' };

export type WorkshopSectionItem_WorkshopSectionFragment = (
  { __typename?: 'WorkshopSection', id: string, name?: string | null, isCollapsed: boolean, elements: Array<{ __typename?: 'WorkshopElement', id: string }> }
  & { ' $fragmentRefs'?: { 'WorkshopSectionOptions_WorkshopSectionFragment': WorkshopSectionOptions_WorkshopSectionFragment } }
) & { ' $fragmentName'?: 'WorkshopSectionItem_WorkshopSectionFragment' };

export type WorkshopSectionOptions_WorkshopSectionFragment = { __typename?: 'WorkshopSection', id: string, name?: string | null } & { ' $fragmentName'?: 'WorkshopSectionOptions_WorkshopSectionFragment' };

export type WorkshopSharingButton_WorkshopFragment = (
  { __typename?: 'Workshop', id: string, isPublic?: boolean | null, isListed: boolean }
  & { ' $fragmentRefs'?: { 'ShareWorkshopModal_WorkshopFragment': ShareWorkshopModal_WorkshopFragment } }
) & { ' $fragmentName'?: 'WorkshopSharingButton_WorkshopFragment' };

export type LanguageUpdate_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type LanguageUpdate_QueryQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, languageCodes: Array<string> } | null };

export const ElementItem_ElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}}]}}]} as unknown as DocumentNode<ElementItem_ElementFragment, unknown>;
export const CustomElement_ElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}}]} as unknown as DocumentNode<CustomElement_ElementFragment, unknown>;
export const ElementInfoList_ElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}}]} as unknown as DocumentNode<ElementInfoList_ElementFragment, unknown>;
export const ElementPreviewItem_ElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementInfoList_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}}]} as unknown as DocumentNode<ElementPreviewItem_ElementFragment, unknown>;
export const ElementPreviewItem_ElementSearchResultFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_ElementSearchResult"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ElementSearchResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"matches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<ElementPreviewItem_ElementSearchResultFragment, unknown>;
export const LibraryElements_ElementSearchResultFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LibraryElements_ElementSearchResult"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ElementSearchResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementItem_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_ElementSearchResult"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementInfoList_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_ElementSearchResult"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ElementSearchResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"matches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<LibraryElements_ElementSearchResultFragment, unknown>;
export const AddToWorkshopSelectDialog_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddToWorkshopSelectDialog_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddToWorkshopSelectDialog_WorkshopFragment, unknown>;
export const ElementDetails_ElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementDetails_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}}]} as unknown as DocumentNode<ElementDetails_ElementFragment, unknown>;
export const ElementLikeIconButton_ElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementLikeIconButton_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}}]} as unknown as DocumentNode<ElementLikeIconButton_ElementFragment, unknown>;
export const WorkshopElementItem_WorkshopElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementItem_WorkshopElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<WorkshopElementItem_WorkshopElementFragment, unknown>;
export const WorkshopSectionOptions_WorkshopSectionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSectionOptions_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<WorkshopSectionOptions_WorkshopSectionFragment, unknown>;
export const WorkshopSectionItem_WorkshopSectionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSectionItem_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopSectionOptions_WorkshopSection"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSectionOptions_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<WorkshopSectionItem_WorkshopSectionFragment, unknown>;
export const WorkshopContent_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopContent_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopElementItem_WorkshopElement"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopSectionItem_WorkshopSection"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSectionOptions_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementItem_WorkshopElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSectionItem_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopSectionOptions_WorkshopSection"}}]}}]} as unknown as DocumentNode<WorkshopContent_WorkshopFragment, unknown>;
export const WorkshopLikeIconButton_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopLikeIconButton_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]} as unknown as DocumentNode<WorkshopLikeIconButton_WorkshopFragment, unknown>;
export const WorkshopOptionsMenu_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfWorkshop"}}]}}]} as unknown as DocumentNode<WorkshopOptionsMenu_WorkshopFragment, unknown>;
export const ShareWorkshopModal_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShareWorkshopModal_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}}]}}]} as unknown as DocumentNode<ShareWorkshopModal_WorkshopFragment, unknown>;
export const WorkshopSharingButton_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSharingButton_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ShareWorkshopModal_Workshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShareWorkshopModal_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}}]}}]} as unknown as DocumentNode<WorkshopSharingButton_WorkshopFragment, unknown>;
export const WorkshopPage_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopPage_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfWorkshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopContent_Workshop"}},{"kind":"Field","name":{"kind":"Name","value":"elementRecommendations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopLikeIconButton_Workshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopSharingButton_Workshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementItem_WorkshopElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSectionOptions_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSectionItem_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopSectionOptions_WorkshopSection"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShareWorkshopModal_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopContent_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopElementItem_WorkshopElement"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopSectionItem_WorkshopSection"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementInfoList_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopLikeIconButton_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfWorkshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSharingButton_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ShareWorkshopModal_Workshop"}}]}}]} as unknown as DocumentNode<WorkshopPage_WorkshopFragment, unknown>;
export const WorkshopInfoList_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopInfoList_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfWorkshop"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<WorkshopInfoList_WorkshopFragment, unknown>;
export const WorkshopPreviewItem_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopPreviewItem_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopInfoList_Workshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopLikeIconButton_Workshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopInfoList_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfWorkshop"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfWorkshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopLikeIconButton_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]} as unknown as DocumentNode<WorkshopPreviewItem_WorkshopFragment, unknown>;
export const WorkshopFields_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopFields_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopPreviewItem_Workshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopInfoList_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfWorkshop"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfWorkshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopLikeIconButton_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopPreviewItem_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopInfoList_Workshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopLikeIconButton_Workshop"}}]}}]} as unknown as DocumentNode<WorkshopFields_WorkshopFragment, unknown>;
export const CreateWorkshopMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWorkshopMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateWorkshopMutationMutation, CreateWorkshopMutationMutationVariables>;
export const DeleteWorkshopMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWorkshopMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteWorkshopMutationMutation, DeleteWorkshopMutationMutationVariables>;
export const DuplicateWorkshopMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DuplicateWorkshopMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DuplicateWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duplicateWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DuplicateWorkshopMutationMutation, DuplicateWorkshopMutationMutationVariables>;
export const GoogleLoginHrefQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GoogleLoginHrefQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"googleAuthUrl"}}]}}]} as unknown as DocumentNode<GoogleLoginHrefQueryQuery, GoogleLoginHrefQueryQueryVariables>;
export const IsLoggedIn_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsLoggedIn_Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<IsLoggedIn_QueryQuery, IsLoggedIn_QueryQueryVariables>;
export const LogoutMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutationMutation, LogoutMutationMutationVariables>;
export const UpdateUserFavoriteElementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserFavoriteElement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserFavoriteElementInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserFavoriteElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}}]}}]} as unknown as DocumentNode<UpdateUserFavoriteElementMutation, UpdateUserFavoriteElementMutationVariables>;
export const UpdateUserLikedWorkshopMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserLikedWorkshopMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserLikedWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserLikedWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}}]} as unknown as DocumentNode<UpdateUserLikedWorkshopMutationMutation, UpdateUserLikedWorkshopMutationMutationVariables>;
export const UpdateUserMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"languageCodes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutationMutation, UpdateUserMutationMutationVariables>;
export const UpdateWorkshopMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorkshopMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateWorkshopMutationMutation, UpdateWorkshopMutationMutationVariables>;
export const LibraryCreateElementPage_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LibraryCreateElementPage_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tagsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ElementTagsFilterInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tagsTake"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tagsInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tagsTake"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<LibraryCreateElementPage_QueryQuery, LibraryCreateElementPage_QueryQueryVariables>;
export const CreateElementMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateElementMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateElementInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateElementMutationMutation, CreateElementMutationMutationVariables>;
export const LibraryUpdateElementPage_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LibraryUpdateElementPage_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<LibraryUpdateElementPage_QueryQuery, LibraryUpdateElementPage_QueryQueryVariables>;
export const LibraryUpdateElementPageTags_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LibraryUpdateElementPageTags_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tagsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ElementTagsFilterInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tagsTake"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tagsInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tagsTake"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<LibraryUpdateElementPageTags_QueryQuery, LibraryUpdateElementPageTags_QueryQueryVariables>;
export const UpdateElementMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateElementMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateElementInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateElementMutationMutation, UpdateElementMutationMutationVariables>;
export const MuiLibraryPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MuiLibraryPageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ElementSearchInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchElements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementItem_Element"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"LibraryElements_ElementSearchResult"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementInfoList_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_ElementSearchResult"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ElementSearchResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"matches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LibraryElements_ElementSearchResult"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ElementSearchResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementItem_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_ElementSearchResult"}}]}}]} as unknown as DocumentNode<MuiLibraryPageQueryQuery, MuiLibraryPageQueryQueryVariables>;
export const MuiLibraryElementQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MuiLibraryElementQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"elementId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"elementId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementDetails_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementLikeIconButton_Element"}}]}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"workshops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddToWorkshopSelectDialog_Workshop"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementDetails_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementLikeIconButton_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddToWorkshopSelectDialog_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<MuiLibraryElementQueryQuery, MuiLibraryElementQueryQueryVariables>;
export const MySpacePage_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MySpacePage_Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"languageCodes"}}]}}]}}]} as unknown as DocumentNode<MySpacePage_QueryQuery, MySpacePage_QueryQueryVariables>;
export const WorkshopElementPage_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkshopElementPage_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshopElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementDetails_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementLikeIconButton_Element"}}]}},{"kind":"Field","name":{"kind":"Name","value":"section"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementDetails_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementLikeIconButton_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}}]} as unknown as DocumentNode<WorkshopElementPage_QueryQuery, WorkshopElementPage_QueryQueryVariables>;
export const UpdateWorkshopElementNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorkshopElementNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateWorkshopElementNoteMutation, UpdateWorkshopElementNoteMutationVariables>;
export const WorkshopByIdQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkshopByIdQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopPage_Workshop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementItem_WorkshopElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSectionOptions_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSectionItem_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopSectionOptions_WorkshopSection"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopContent_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopElementItem_WorkshopElement"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopSectionItem_WorkshopSection"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementInfoList_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementInfoList_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopLikeIconButton_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfWorkshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShareWorkshopModal_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSharingButton_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ShareWorkshopModal_Workshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopPage_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfWorkshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopContent_Workshop"}},{"kind":"Field","name":{"kind":"Name","value":"elementRecommendations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopLikeIconButton_Workshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopSharingButton_Workshop"}}]}}]} as unknown as DocumentNode<WorkshopByIdQueryQuery, WorkshopByIdQueryQueryVariables>;
export const WorkshopsPage_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkshopsPage_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workshopSearchInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSearchInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchWorkshops"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workshopSearchInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopFields_Workshop"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopInfoList_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isListed"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfWorkshop"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfWorkshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopLikeIconButton_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopPreviewItem_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopInfoList_Workshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopOptionsMenu_Workshop"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopLikeIconButton_Workshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopFields_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopPreviewItem_Workshop"}}]}}]} as unknown as DocumentNode<WorkshopsPage_QueryQuery, WorkshopsPage_QueryQueryVariables>;
export const UpdateWorkshopItemOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorkshopItemOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkshopItemOrder"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkshopItemOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateWorkshopItemOrderMutation, UpdateWorkshopItemOrderMutationVariables>;
export const LanguageUpdate_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LanguageUpdate_Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"languageCodes"}}]}}]}}]} as unknown as DocumentNode<LanguageUpdate_QueryQuery, LanguageUpdate_QueryQueryVariables>;