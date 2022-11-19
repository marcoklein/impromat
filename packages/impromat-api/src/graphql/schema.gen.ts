import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GraphQLContext } from './graphql-context';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
   * Update given users.
   * Returns conflicting users. That means the client has to resolve all users that the call returns.
   */
  pushUsers?: Maybe<Array<Maybe<User>>>;
  /**
   * Update given workshops.
   * Returns conflicting workshops. That means the client has to resolve all workshops that the call returns.
   */
  pushWorkshops?: Maybe<Array<Maybe<Workshop>>>;
};


export type MutationPushUserArgs = {
  userPushRow: UserPushRowInput;
};


export type MutationPushUsersArgs = {
  userPushRows: Array<UserPushRowInput>;
};


export type MutationPushWorkshopsArgs = {
  workshopPushRows: Array<WorkshopPushRowInput>;
};

export type PullCheckpoint = {
  id: Scalars['String'];
  updatedAt: Scalars['Float'];
};

export type PullCheckpointInput = {
  id: Scalars['ID'];
  updatedAt: Scalars['SafeInt'];
};

export type Query = {
  /** Returns an authentication url for google authentication. */
  googleAuthUrl: Scalars['String'];
  /**
   * Information about the logged in session.
   * Null indicates a not logged in user.
   */
  me?: Maybe<TokenInfo>;
  /** Returns new users since last sync. */
  pullUsers: UserPullBulk;
  /** Returns new workshops since last sync. */
  pullWorkshops: WorkshopPullBulk;
  /** Version of the application. */
  version: Scalars['String'];
};


export type QueryPullUsersArgs = {
  checkpoint: PullCheckpointInput;
  limit: Scalars['Int'];
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
  user?: Maybe<User>;
  userId: Scalars['String'];
};

/** Information about a user that uses Impromat. */
export type User = {
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

export type UserPullBulk = {
  checkpoint?: Maybe<PullCheckpoint>;
  documents: Array<User>;
};

export type UserPushRowInput = {
  assumedMasterState?: InputMaybe<UserInput>;
  newDocumentState: UserInput;
};

/** An improvisational theatre Workshop that a person can hold for their group. */
export type Workshop = {
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
  checkpoint?: Maybe<PullCheckpoint>;
  documents: Array<Workshop>;
};

export type WorkshopPushRowInput = {
  assumedMasterState?: InputMaybe<WorkshopInput>;
  newDocumentState: WorkshopInput;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Element: ResolverTypeWrapper<Element>;
  ElementInput: ElementInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  PullCheckpoint: ResolverTypeWrapper<PullCheckpoint>;
  PullCheckpointInput: PullCheckpointInput;
  Query: ResolverTypeWrapper<{}>;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']>;
  Section: ResolverTypeWrapper<Section>;
  SectionInput: SectionInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  TokenInfo: ResolverTypeWrapper<TokenInfo>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  UserPullBulk: ResolverTypeWrapper<UserPullBulk>;
  UserPushRowInput: UserPushRowInput;
  Workshop: ResolverTypeWrapper<Workshop>;
  WorkshopInput: WorkshopInput;
  WorkshopPullBulk: ResolverTypeWrapper<WorkshopPullBulk>;
  WorkshopPushRowInput: WorkshopPushRowInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Element: Element;
  ElementInput: ElementInput;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  PullCheckpoint: PullCheckpoint;
  PullCheckpointInput: PullCheckpointInput;
  Query: {};
  SafeInt: Scalars['SafeInt'];
  Section: Section;
  SectionInput: SectionInput;
  String: Scalars['String'];
  TokenInfo: TokenInfo;
  User: User;
  UserInput: UserInput;
  UserPullBulk: UserPullBulk;
  UserPushRowInput: UserPushRowInput;
  Workshop: Workshop;
  WorkshopInput: WorkshopInput;
  WorkshopPullBulk: WorkshopPullBulk;
  WorkshopPushRowInput: WorkshopPushRowInput;
};

export type ElementResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Element'] = ResolversParentTypes['Element']> = {
  basedOn?: Resolver<Maybe<ResolversTypes['Element']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  languageCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  licenseName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  licenseUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  markdown?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceBaseUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  pushUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationPushUserArgs, 'userPushRow'>>;
  pushUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<MutationPushUsersArgs, 'userPushRows'>>;
  pushWorkshops?: Resolver<Maybe<Array<Maybe<ResolversTypes['Workshop']>>>, ParentType, ContextType, RequireFields<MutationPushWorkshopsArgs, 'workshopPushRows'>>;
};

export type PullCheckpointResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PullCheckpoint'] = ResolversParentTypes['PullCheckpoint']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  googleAuthUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['TokenInfo']>, ParentType, ContextType>;
  pullUsers?: Resolver<ResolversTypes['UserPullBulk'], ParentType, ContextType, RequireFields<QueryPullUsersArgs, 'checkpoint' | 'limit'>>;
  pullWorkshops?: Resolver<ResolversTypes['WorkshopPullBulk'], ParentType, ContextType, RequireFields<QueryPullWorkshopsArgs, 'checkpoint' | 'limit'>>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export interface SafeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export type SectionResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Section'] = ResolversParentTypes['Section']> = {
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  elements?: Resolver<Array<ResolversTypes['Element']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isCollapsed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isVisible?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenInfoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TokenInfo'] = ResolversParentTypes['TokenInfo']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  favoriteElements?: Resolver<Array<ResolversTypes['Element']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPullBulkResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UserPullBulk'] = ResolversParentTypes['UserPullBulk']> = {
  checkpoint?: Resolver<Maybe<ResolversTypes['PullCheckpoint']>, ParentType, ContextType>;
  documents?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkshopResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Workshop'] = ResolversParentTypes['Workshop']> = {
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sections?: Resolver<Array<ResolversTypes['Section']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['SafeInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkshopPullBulkResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['WorkshopPullBulk'] = ResolversParentTypes['WorkshopPullBulk']> = {
  checkpoint?: Resolver<Maybe<ResolversTypes['PullCheckpoint']>, ParentType, ContextType>;
  documents?: Resolver<Array<ResolversTypes['Workshop']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Element?: ElementResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PullCheckpoint?: PullCheckpointResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SafeInt?: GraphQLScalarType;
  Section?: SectionResolvers<ContextType>;
  TokenInfo?: TokenInfoResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserPullBulk?: UserPullBulkResolvers<ContextType>;
  Workshop?: WorkshopResolvers<ContextType>;
  WorkshopPullBulk?: WorkshopPullBulkResolvers<ContextType>;
};

