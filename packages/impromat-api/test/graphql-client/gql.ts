/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment ElementFields on Element {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n\n    name\n    markdown\n    markdownShort\n\n    tags {\n      id\n    }\n    usedBy {\n      id\n    }\n    owner {\n      id\n    }\n    isOwnerMe\n  }\n": types.ElementFieldsFragmentDoc,
    "\n  query UserElementsQuery {\n    elements {\n      ...ElementFields\n    }\n  }\n": types.UserElementsQueryDocument,
    "\n  query ElementsQuery($input: ElementsQueryInput!) {\n    elements(input: $input) {\n      ...ElementFields\n    }\n  }\n": types.ElementsQueryDocument,
    "\n  query SearchElementsQuery($input: ElementSearchInput!) {\n    searchElements(input: $input) {\n      element {\n        ...ElementFields\n      }\n    }\n  }\n": types.SearchElementsQueryDocument,
    "\n  mutation AddElementQuery($input: CreateElementInput!) {\n    createElement(input: $input) {\n      ...ElementFields\n    }\n  }\n": types.AddElementQueryDocument,
    "\n  mutation UpdateElement($input: UpdateWorkshopInput!) {\n    updateWorkshop(input: $input) {\n      ...WorkshopFields\n    }\n  }\n": types.UpdateElementDocument,
    "\n    query MeQuery {\n      me {\n        id\n        workshops {\n          id\n        }\n        elements {\n          id\n        }\n        favoriteElements {\n          element {\n            id\n          }\n        }\n      }\n    }\n  ": types.MeQueryDocument,
    "\n  mutation UpdateUserFavoriteElement($input: UpdateUserFavoriteElementInput!) {\n    updateUserFavoriteElement(input: $input) {\n      id\n    }\n  }\n": types.UpdateUserFavoriteElementDocument,
    "\n  query MeFavoriteElements {\n    me {\n      favoriteElements {\n        element {\n          id\n        }\n      }\n    }\n  }\n": types.MeFavoriteElementsDocument,
    "\n        query ElementIsFavorite($id: ID!) {\n          element(id: $id) {\n            isFavorite\n          }\n        }\n      ": types.ElementIsFavoriteDocument,
    "\n  fragment WorkshopFields on Workshop {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n\n    name\n    description\n    sections {\n      id\n      version\n      createdAt\n      updatedAt\n      deleted\n\n      orderIndex\n      name\n      color\n      isCollapsed\n\n      elements {\n        id\n        note\n        basedOn {\n          name\n        }\n      }\n      workshop {\n        id\n      }\n    }\n    owner {\n      id\n    }\n  }\n": types.WorkshopFieldsFragmentDoc,
    "\n  query UserWorkshopsQuery {\n    workshops {\n      ...WorkshopFields\n    }\n  }\n": types.UserWorkshopsQueryDocument,
    "\n  query WorkshopQuery($workshopId: ID!) {\n    workshop(id: $workshopId) {\n      ...WorkshopFields\n    }\n  }\n": types.WorkshopQueryDocument,
    "\n  mutation DeleteWorkshop($id: ID!) {\n    deleteWorkshop(id: $id) {\n      id\n    }\n  }\n": types.DeleteWorkshopDocument,
    "\n  mutation AddWorkshopWithEmptyName {\n    createWorkshop(input: { name: \"\" }) {\n      ...WorkshopFields\n    }\n  }\n": types.AddWorkshopWithEmptyNameDocument,
    "\n  mutation AddWorkshop($name: String!) {\n    createWorkshop(input: { name: $name }) {\n      ...WorkshopFields\n    }\n  }\n": types.AddWorkshopDocument,
    "\n  mutation AddTestWorkshop {\n    createWorkshop(input: { name: \"test-workshop\" }) {\n      ...WorkshopFields\n    }\n  }\n": types.AddTestWorkshopDocument,
    "\n  mutation UpdateWorkshop($input: UpdateWorkshopInput!) {\n    updateWorkshop(input: $input) {\n      ...WorkshopFields\n    }\n  }\n": types.UpdateWorkshopDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ElementFields on Element {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n\n    name\n    markdown\n    markdownShort\n\n    tags {\n      id\n    }\n    usedBy {\n      id\n    }\n    owner {\n      id\n    }\n    isOwnerMe\n  }\n"): (typeof documents)["\n  fragment ElementFields on Element {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n\n    name\n    markdown\n    markdownShort\n\n    tags {\n      id\n    }\n    usedBy {\n      id\n    }\n    owner {\n      id\n    }\n    isOwnerMe\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserElementsQuery {\n    elements {\n      ...ElementFields\n    }\n  }\n"): (typeof documents)["\n  query UserElementsQuery {\n    elements {\n      ...ElementFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ElementsQuery($input: ElementsQueryInput!) {\n    elements(input: $input) {\n      ...ElementFields\n    }\n  }\n"): (typeof documents)["\n  query ElementsQuery($input: ElementsQueryInput!) {\n    elements(input: $input) {\n      ...ElementFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchElementsQuery($input: ElementSearchInput!) {\n    searchElements(input: $input) {\n      element {\n        ...ElementFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchElementsQuery($input: ElementSearchInput!) {\n    searchElements(input: $input) {\n      element {\n        ...ElementFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddElementQuery($input: CreateElementInput!) {\n    createElement(input: $input) {\n      ...ElementFields\n    }\n  }\n"): (typeof documents)["\n  mutation AddElementQuery($input: CreateElementInput!) {\n    createElement(input: $input) {\n      ...ElementFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateElement($input: UpdateWorkshopInput!) {\n    updateWorkshop(input: $input) {\n      ...WorkshopFields\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateElement($input: UpdateWorkshopInput!) {\n    updateWorkshop(input: $input) {\n      ...WorkshopFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query MeQuery {\n      me {\n        id\n        workshops {\n          id\n        }\n        elements {\n          id\n        }\n        favoriteElements {\n          element {\n            id\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query MeQuery {\n      me {\n        id\n        workshops {\n          id\n        }\n        elements {\n          id\n        }\n        favoriteElements {\n          element {\n            id\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUserFavoriteElement($input: UpdateUserFavoriteElementInput!) {\n    updateUserFavoriteElement(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserFavoriteElement($input: UpdateUserFavoriteElementInput!) {\n    updateUserFavoriteElement(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MeFavoriteElements {\n    me {\n      favoriteElements {\n        element {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query MeFavoriteElements {\n    me {\n      favoriteElements {\n        element {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query ElementIsFavorite($id: ID!) {\n          element(id: $id) {\n            isFavorite\n          }\n        }\n      "): (typeof documents)["\n        query ElementIsFavorite($id: ID!) {\n          element(id: $id) {\n            isFavorite\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopFields on Workshop {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n\n    name\n    description\n    sections {\n      id\n      version\n      createdAt\n      updatedAt\n      deleted\n\n      orderIndex\n      name\n      color\n      isCollapsed\n\n      elements {\n        id\n        note\n        basedOn {\n          name\n        }\n      }\n      workshop {\n        id\n      }\n    }\n    owner {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment WorkshopFields on Workshop {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n\n    name\n    description\n    sections {\n      id\n      version\n      createdAt\n      updatedAt\n      deleted\n\n      orderIndex\n      name\n      color\n      isCollapsed\n\n      elements {\n        id\n        note\n        basedOn {\n          name\n        }\n      }\n      workshop {\n        id\n      }\n    }\n    owner {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserWorkshopsQuery {\n    workshops {\n      ...WorkshopFields\n    }\n  }\n"): (typeof documents)["\n  query UserWorkshopsQuery {\n    workshops {\n      ...WorkshopFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WorkshopQuery($workshopId: ID!) {\n    workshop(id: $workshopId) {\n      ...WorkshopFields\n    }\n  }\n"): (typeof documents)["\n  query WorkshopQuery($workshopId: ID!) {\n    workshop(id: $workshopId) {\n      ...WorkshopFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteWorkshop($id: ID!) {\n    deleteWorkshop(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteWorkshop($id: ID!) {\n    deleteWorkshop(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddWorkshopWithEmptyName {\n    createWorkshop(input: { name: \"\" }) {\n      ...WorkshopFields\n    }\n  }\n"): (typeof documents)["\n  mutation AddWorkshopWithEmptyName {\n    createWorkshop(input: { name: \"\" }) {\n      ...WorkshopFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddWorkshop($name: String!) {\n    createWorkshop(input: { name: $name }) {\n      ...WorkshopFields\n    }\n  }\n"): (typeof documents)["\n  mutation AddWorkshop($name: String!) {\n    createWorkshop(input: { name: $name }) {\n      ...WorkshopFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddTestWorkshop {\n    createWorkshop(input: { name: \"test-workshop\" }) {\n      ...WorkshopFields\n    }\n  }\n"): (typeof documents)["\n  mutation AddTestWorkshop {\n    createWorkshop(input: { name: \"test-workshop\" }) {\n      ...WorkshopFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateWorkshop($input: UpdateWorkshopInput!) {\n    updateWorkshop(input: $input) {\n      ...WorkshopFields\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateWorkshop($input: UpdateWorkshopInput!) {\n    updateWorkshop(input: $input) {\n      ...WorkshopFields\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;