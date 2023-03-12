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
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  fragment CustomElement_Element on Element {\n    id\n    name\n  }\n": types.CustomElement_ElementFragmentDoc,
    "\n  fragment Element_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    markdown\n    tags {\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    owner {\n      id\n    }\n    ...CustomElement_Element\n  }\n": types.Element_ElementFragmentDoc,
    "\n  fragment ElementPreviewItem_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    markdown\n    tags {\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    owner {\n      id\n    }\n    ...CustomElement_Element\n  }\n": types.ElementPreviewItem_ElementFragmentDoc,
    "\n  query Me {\n    me {\n      id\n      version\n      favoriteElements {\n        element {\n          id\n        }\n      }\n    }\n  }\n": types.MeDocument,
    "\n  query IsLoggedIn {\n    me {\n      id\n    }\n  }\n": types.IsLoggedInDocument,
    "\n      mutation LogoutMutation {\n        logout\n      }\n    ": types.LogoutMutationDocument,
    "\n      mutation UpdateWorkshopMutation($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateWorkshopMutationDocument,
    "\n  query LibraryCreateCustomElement_Query($id: ID!) {\n    element(id: $id) {\n      id\n      name\n      markdown\n    }\n  }\n": types.LibraryCreateCustomElement_QueryDocument,
    "\n  mutation UpdateElementMutation($input: UpdateElementInput!) {\n    updateElement(input: $input) {\n      id\n    }\n  }\n": types.UpdateElementMutationDocument,
    "\n  mutation CreateElementMutation($input: CreateElementInput!) {\n    createElement(input: $input) {\n      id\n    }\n  }\n": types.CreateElementMutationDocument,
    "\n      query LibraryCreateCustomElementWorkshopQuery($id: ID!) {\n        workshop(id: $id) {\n          sections {\n            id\n          }\n        }\n      }\n    ": types.LibraryCreateCustomElementWorkshopQueryDocument,
    "\n  query LibraryElementQuery($id: ID!) {\n    element(id: $id) {\n      id\n      name\n      isFavorite\n      ...Element_Element\n    }\n  }\n": types.LibraryElementQueryDocument,
    "\n  query WorkshopSectionsQuery($id: ID!) {\n    workshop(id: $id) {\n      sections {\n        id\n      }\n    }\n  }\n": types.WorkshopSectionsQueryDocument,
    "\n  mutation AddToWorkhopMutation($input: UpdateWorkshopInput!) {\n    updateWorkshop(input: $input) {\n      id\n    }\n  }\n": types.AddToWorkhopMutationDocument,
    "\n  mutation UpdateUserFavoriteElement($input: UpdateUserFavoriteElementInput!) {\n    updateUserFavoriteElement(input: $input) {\n      id\n    }\n  }\n": types.UpdateUserFavoriteElementDocument,
    "\n  fragment CustomElementsTab_WorkshopFragment on User {\n    elements {\n      id\n      name\n      ...ElementPreviewItem_Element\n    }\n  }\n": types.CustomElementsTab_WorkshopFragmentFragmentDoc,
    "\n  query CustomElementsTab_Query {\n    me {\n      ...CustomElementsTab_WorkshopFragment\n    }\n  }\n": types.CustomElementsTab_QueryDocument,
    "\n  fragment FavoriteElements_User on User {\n    favoriteElements {\n      element {\n        id\n        ...ElementPreviewItem_Element\n      }\n    }\n  }\n": types.FavoriteElements_UserFragmentDoc,
    "\n  fragment MyUser_Query on Query {\n    me {\n      id\n      favoriteElements {\n        element {\n          id\n        }\n      }\n      ...FavoriteElements_User\n    }\n  }\n": types.MyUser_QueryFragmentDoc,
    "\n  query MyUser {\n    ...MyUser_Query\n  }\n": types.MyUserDocument,
    "\n  query SearchElements($input: ElementSearchInput!) {\n    searchElements(input: $input) {\n      element {\n        id\n        ...ElementPreviewItem_Element\n      }\n    }\n  }\n": types.SearchElementsDocument,
    "\n  query WorkshopElementPage($id: ID!) {\n    workshopElement(id: $id) {\n      id\n      note\n      basedOn {\n        id\n        name\n        markdown\n        sourceUrl\n        sourceName\n        sourceBaseUrl\n        licenseName\n        licenseUrl\n        owner {\n          id\n        }\n\n        ...CustomElement_Element\n      }\n      section {\n        id\n      }\n    }\n  }\n": types.WorkshopElementPageDocument,
    "\n      mutation UpdateWorkshopWithElement($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n          sections {\n            elements {\n              id\n            }\n          }\n        }\n      }\n    ": types.UpdateWorkshopWithElementDocument,
    "\n  fragment WorkshopPage_Workshop on Workshop {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n    sections {\n      name\n      elements {\n        id\n      }\n      ...WorkshopElementsComponent_WorkshopSection\n    }\n    ...WorkshopActionSheet_Workshop\n  }\n": types.WorkshopPage_WorkshopFragmentDoc,
    "\n  query WorkshopByIdQuery($id: ID!) {\n    workshop(id: $id) {\n      ...WorkshopPage_Workshop\n    }\n  }\n": types.WorkshopByIdQueryDocument,
    "\n      mutation DeleteWorkshopMutation($id: ID!) {\n        deleteWorkshop(id: $id) {\n          id\n        }\n      }\n    ": types.DeleteWorkshopMutationDocument,
    "\n      mutation UpdateWorkshop($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateWorkshopDocument,
    "\n      mutation UpdateWorkshopItemOrder($input: UpdateWorkshopItemOrder!) {\n        updateWorkshopItemOrder(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateWorkshopItemOrderDocument,
    "\n  fragment WorkshopFields_Workshop on Workshop {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n  }\n": types.WorkshopFields_WorkshopFragmentDoc,
    "\n  query WorkshopsQuery {\n    workshops {\n      ...WorkshopFields_Workshop\n    }\n  }\n": types.WorkshopsQueryDocument,
    "\n  mutation CreateWorkshopMutation($input: CreateWorkshopInput!) {\n    createWorkshop(input: $input) {\n      id\n    }\n  }\n": types.CreateWorkshopMutationDocument,
    "\n  fragment SectionElementsComponent_WorkshopSection on WorkshopSection {\n    id\n    name\n    isCollapsed\n    orderIndex\n    elements {\n      id\n      ...WorkshopElementItemComponent_WorkshopElement\n    }\n  }\n": types.SectionElementsComponent_WorkshopSectionFragmentDoc,
    "\n  fragment WorkshopActionSheet_Workshop on Workshop {\n    description\n  }\n": types.WorkshopActionSheet_WorkshopFragmentDoc,
    "\n  fragment WorkshopElementItemComponent_WorkshopElement on WorkshopElement {\n    id\n    note\n    basedOn {\n      id\n      name\n      markdown\n    }\n  }\n": types.WorkshopElementItemComponent_WorkshopElementFragmentDoc,
    "\n  fragment WorkshopElementsComponent_WorkshopSection on WorkshopSection {\n    id\n    ...SectionElementsComponent_WorkshopSection\n    ...WorkshopSectionComponent_WorkshopSection\n  }\n": types.WorkshopElementsComponent_WorkshopSectionFragmentDoc,
    "\n  fragment WorkshopSectionComponent_WorkshopSection on WorkshopSection {\n    id\n    name\n    color\n    isCollapsed\n    elements {\n      id\n    }\n  }\n": types.WorkshopSectionComponent_WorkshopSectionFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CustomElement_Element on Element {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment CustomElement_Element on Element {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Element_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    markdown\n    tags {\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    owner {\n      id\n    }\n    ...CustomElement_Element\n  }\n"): (typeof documents)["\n  fragment Element_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    markdown\n    tags {\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    owner {\n      id\n    }\n    ...CustomElement_Element\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ElementPreviewItem_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    markdown\n    tags {\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    owner {\n      id\n    }\n    ...CustomElement_Element\n  }\n"): (typeof documents)["\n  fragment ElementPreviewItem_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    markdown\n    tags {\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    owner {\n      id\n    }\n    ...CustomElement_Element\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      version\n      favoriteElements {\n        element {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      version\n      favoriteElements {\n        element {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query IsLoggedIn {\n    me {\n      id\n    }\n  }\n"): (typeof documents)["\n  query IsLoggedIn {\n    me {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation LogoutMutation {\n        logout\n      }\n    "): (typeof documents)["\n      mutation LogoutMutation {\n        logout\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateWorkshopMutation($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateWorkshopMutation($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LibraryCreateCustomElement_Query($id: ID!) {\n    element(id: $id) {\n      id\n      name\n      markdown\n    }\n  }\n"): (typeof documents)["\n  query LibraryCreateCustomElement_Query($id: ID!) {\n    element(id: $id) {\n      id\n      name\n      markdown\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateElementMutation($input: UpdateElementInput!) {\n    updateElement(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateElementMutation($input: UpdateElementInput!) {\n    updateElement(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateElementMutation($input: CreateElementInput!) {\n    createElement(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateElementMutation($input: CreateElementInput!) {\n    createElement(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query LibraryCreateCustomElementWorkshopQuery($id: ID!) {\n        workshop(id: $id) {\n          sections {\n            id\n          }\n        }\n      }\n    "): (typeof documents)["\n      query LibraryCreateCustomElementWorkshopQuery($id: ID!) {\n        workshop(id: $id) {\n          sections {\n            id\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LibraryElementQuery($id: ID!) {\n    element(id: $id) {\n      id\n      name\n      isFavorite\n      ...Element_Element\n    }\n  }\n"): (typeof documents)["\n  query LibraryElementQuery($id: ID!) {\n    element(id: $id) {\n      id\n      name\n      isFavorite\n      ...Element_Element\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WorkshopSectionsQuery($id: ID!) {\n    workshop(id: $id) {\n      sections {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query WorkshopSectionsQuery($id: ID!) {\n    workshop(id: $id) {\n      sections {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddToWorkhopMutation($input: UpdateWorkshopInput!) {\n    updateWorkshop(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AddToWorkhopMutation($input: UpdateWorkshopInput!) {\n    updateWorkshop(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUserFavoriteElement($input: UpdateUserFavoriteElementInput!) {\n    updateUserFavoriteElement(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserFavoriteElement($input: UpdateUserFavoriteElementInput!) {\n    updateUserFavoriteElement(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CustomElementsTab_WorkshopFragment on User {\n    elements {\n      id\n      name\n      ...ElementPreviewItem_Element\n    }\n  }\n"): (typeof documents)["\n  fragment CustomElementsTab_WorkshopFragment on User {\n    elements {\n      id\n      name\n      ...ElementPreviewItem_Element\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CustomElementsTab_Query {\n    me {\n      ...CustomElementsTab_WorkshopFragment\n    }\n  }\n"): (typeof documents)["\n  query CustomElementsTab_Query {\n    me {\n      ...CustomElementsTab_WorkshopFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FavoriteElements_User on User {\n    favoriteElements {\n      element {\n        id\n        ...ElementPreviewItem_Element\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment FavoriteElements_User on User {\n    favoriteElements {\n      element {\n        id\n        ...ElementPreviewItem_Element\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MyUser_Query on Query {\n    me {\n      id\n      favoriteElements {\n        element {\n          id\n        }\n      }\n      ...FavoriteElements_User\n    }\n  }\n"): (typeof documents)["\n  fragment MyUser_Query on Query {\n    me {\n      id\n      favoriteElements {\n        element {\n          id\n        }\n      }\n      ...FavoriteElements_User\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MyUser {\n    ...MyUser_Query\n  }\n"): (typeof documents)["\n  query MyUser {\n    ...MyUser_Query\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchElements($input: ElementSearchInput!) {\n    searchElements(input: $input) {\n      element {\n        id\n        ...ElementPreviewItem_Element\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchElements($input: ElementSearchInput!) {\n    searchElements(input: $input) {\n      element {\n        id\n        ...ElementPreviewItem_Element\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WorkshopElementPage($id: ID!) {\n    workshopElement(id: $id) {\n      id\n      note\n      basedOn {\n        id\n        name\n        markdown\n        sourceUrl\n        sourceName\n        sourceBaseUrl\n        licenseName\n        licenseUrl\n        owner {\n          id\n        }\n\n        ...CustomElement_Element\n      }\n      section {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query WorkshopElementPage($id: ID!) {\n    workshopElement(id: $id) {\n      id\n      note\n      basedOn {\n        id\n        name\n        markdown\n        sourceUrl\n        sourceName\n        sourceBaseUrl\n        licenseName\n        licenseUrl\n        owner {\n          id\n        }\n\n        ...CustomElement_Element\n      }\n      section {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateWorkshopWithElement($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n          sections {\n            elements {\n              id\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateWorkshopWithElement($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n          sections {\n            elements {\n              id\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopPage_Workshop on Workshop {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n    sections {\n      name\n      elements {\n        id\n      }\n      ...WorkshopElementsComponent_WorkshopSection\n    }\n    ...WorkshopActionSheet_Workshop\n  }\n"): (typeof documents)["\n  fragment WorkshopPage_Workshop on Workshop {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n    sections {\n      name\n      elements {\n        id\n      }\n      ...WorkshopElementsComponent_WorkshopSection\n    }\n    ...WorkshopActionSheet_Workshop\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WorkshopByIdQuery($id: ID!) {\n    workshop(id: $id) {\n      ...WorkshopPage_Workshop\n    }\n  }\n"): (typeof documents)["\n  query WorkshopByIdQuery($id: ID!) {\n    workshop(id: $id) {\n      ...WorkshopPage_Workshop\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteWorkshopMutation($id: ID!) {\n        deleteWorkshop(id: $id) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteWorkshopMutation($id: ID!) {\n        deleteWorkshop(id: $id) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateWorkshop($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateWorkshop($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateWorkshopItemOrder($input: UpdateWorkshopItemOrder!) {\n        updateWorkshopItemOrder(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateWorkshopItemOrder($input: UpdateWorkshopItemOrder!) {\n        updateWorkshopItemOrder(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopFields_Workshop on Workshop {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n  }\n"): (typeof documents)["\n  fragment WorkshopFields_Workshop on Workshop {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WorkshopsQuery {\n    workshops {\n      ...WorkshopFields_Workshop\n    }\n  }\n"): (typeof documents)["\n  query WorkshopsQuery {\n    workshops {\n      ...WorkshopFields_Workshop\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateWorkshopMutation($input: CreateWorkshopInput!) {\n    createWorkshop(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateWorkshopMutation($input: CreateWorkshopInput!) {\n    createWorkshop(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SectionElementsComponent_WorkshopSection on WorkshopSection {\n    id\n    name\n    isCollapsed\n    orderIndex\n    elements {\n      id\n      ...WorkshopElementItemComponent_WorkshopElement\n    }\n  }\n"): (typeof documents)["\n  fragment SectionElementsComponent_WorkshopSection on WorkshopSection {\n    id\n    name\n    isCollapsed\n    orderIndex\n    elements {\n      id\n      ...WorkshopElementItemComponent_WorkshopElement\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopActionSheet_Workshop on Workshop {\n    description\n  }\n"): (typeof documents)["\n  fragment WorkshopActionSheet_Workshop on Workshop {\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopElementItemComponent_WorkshopElement on WorkshopElement {\n    id\n    note\n    basedOn {\n      id\n      name\n      markdown\n    }\n  }\n"): (typeof documents)["\n  fragment WorkshopElementItemComponent_WorkshopElement on WorkshopElement {\n    id\n    note\n    basedOn {\n      id\n      name\n      markdown\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopElementsComponent_WorkshopSection on WorkshopSection {\n    id\n    ...SectionElementsComponent_WorkshopSection\n    ...WorkshopSectionComponent_WorkshopSection\n  }\n"): (typeof documents)["\n  fragment WorkshopElementsComponent_WorkshopSection on WorkshopSection {\n    id\n    ...SectionElementsComponent_WorkshopSection\n    ...WorkshopSectionComponent_WorkshopSection\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopSectionComponent_WorkshopSection on WorkshopSection {\n    id\n    name\n    color\n    isCollapsed\n    elements {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment WorkshopSectionComponent_WorkshopSection on WorkshopSection {\n    id\n    name\n    color\n    isCollapsed\n    elements {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;