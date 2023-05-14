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
    "\n  fragment CustomElement_Element on Element {\n    id\n    name\n    visibility\n  }\n": types.CustomElement_ElementFragmentDoc,
    "\n  fragment Element_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    markdown\n    tags {\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    owner {\n      id\n      name\n    }\n    isOwnerMe\n    ...CustomElement_Element\n  }\n": types.Element_ElementFragmentDoc,
    "\n  fragment ElementInfoList_ElementSearchResult on ElementSearchResult {\n    score\n    matches {\n      key\n      indices\n      refIndex\n      value\n    }\n  }\n": types.ElementInfoList_ElementSearchResultFragmentDoc,
    "\n  fragment ElementInfoList_Element on Element {\n    id\n    isFavorite\n    isOwnerMe\n    languageCode\n    sourceName\n    visibility\n  }\n": types.ElementInfoList_ElementFragmentDoc,
    "\n  fragment ElementPreviewItem_ElementSearchResult on ElementSearchResult {\n    matches {\n      key\n      value\n    }\n    ...ElementInfoList_ElementSearchResult\n  }\n": types.ElementPreviewItem_ElementSearchResultFragmentDoc,
    "\n  fragment ElementPreviewItem_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    markdownShort\n    tags {\n      id\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    visibility\n    isFavorite\n    owner {\n      id\n    }\n    isOwnerMe\n    ...CustomElement_Element\n    ...ElementFavoriteIcon_Element\n    ...ElementInfoList_Element\n  }\n": types.ElementPreviewItem_ElementFragmentDoc,
    "\n  fragment WorkshopInfoList_Workshop on Workshop {\n    id\n    createdAt\n    updatedAt\n    isPublic\n  }\n": types.WorkshopInfoList_WorkshopFragmentDoc,
    "\n  query Me {\n    me {\n      id\n      version\n      favoriteElements {\n        element {\n          id\n        }\n      }\n    }\n  }\n": types.MeDocument,
    "\n      mutation DeleteWorkshopMutation($id: ID!) {\n        deleteWorkshop(id: $id) {\n          id\n        }\n      }\n    ": types.DeleteWorkshopMutationDocument,
    "\n              query GoogleLoginHrefQuery {\n                googleAuthUrl\n              }\n            ": types.GoogleLoginHrefQueryDocument,
    "\n  query IsLoggedIn {\n    me {\n      id\n    }\n  }\n": types.IsLoggedInDocument,
    "\n      mutation LogoutMutation {\n        logout\n      }\n    ": types.LogoutMutationDocument,
    "\n  mutation UpdateUserFavoriteElement($input: UpdateUserFavoriteElementInput!) {\n    updateUserFavoriteElement(input: $input) {\n      id\n      isFavorite\n    }\n  }\n": types.UpdateUserFavoriteElementDocument,
    "\n      mutation UpdateWorkshopMutation($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateWorkshopMutationDocument,
    "\n  query AccountPage_Query {\n    me {\n      ...AccountOptionsMenu_User\n      ...AccountSignedIn_User\n    }\n  }\n": types.AccountPage_QueryDocument,
    "\n  fragment AccountOptionsMenu_User on User {\n    id\n    name\n  }\n": types.AccountOptionsMenu_UserFragmentDoc,
    "\n      mutation UpdateUserMutation($input: UpdateUserInput!) {\n        updateUser(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateUserMutationDocument,
    "\n  fragment AccountSignedIn_User on User {\n    id\n    name\n  }\n": types.AccountSignedIn_UserFragmentDoc,
    "\n  query LibraryCreateCustomElement_Query($id: ID!) {\n    element(id: $id) {\n      id\n      name\n      visibility\n      markdown\n    }\n  }\n": types.LibraryCreateCustomElement_QueryDocument,
    "\n  mutation UpdateElementMutation($input: UpdateElementInput!) {\n    updateElement(input: $input) {\n      id\n    }\n  }\n": types.UpdateElementMutationDocument,
    "\n  mutation CreateElementMutation($input: CreateElementInput!) {\n    createElement(input: $input) {\n      id\n    }\n  }\n": types.CreateElementMutationDocument,
    "\n      query LibraryCreateCustomElementWorkshopQuery($id: ID!) {\n        workshop(id: $id) {\n          sections {\n            id\n          }\n        }\n      }\n    ": types.LibraryCreateCustomElementWorkshopQueryDocument,
    "\n  query LibraryElementQuery($id: ID!) {\n    element(id: $id) {\n      ...LibraryElement_Element\n    }\n  }\n": types.LibraryElementQueryDocument,
    "\n  fragment LibraryElement_Element on Element {\n    id\n    name\n    isFavorite\n    ...Element_Element\n    ...ElementFavoriteIcon_Element\n  }\n": types.LibraryElement_ElementFragmentDoc,
    "\n  query WorkshopSectionsQuery($id: ID!) {\n    workshop(id: $id) {\n      sections {\n        id\n      }\n    }\n  }\n": types.WorkshopSectionsQueryDocument,
    "\n  fragment CustomElementsTab_WorkshopFragment on User {\n    elements {\n      id\n      name\n      ...ElementPreviewItem_Element\n    }\n  }\n": types.CustomElementsTab_WorkshopFragmentFragmentDoc,
    "\n  query CustomElementsTab_Query {\n    me {\n      ...CustomElementsTab_WorkshopFragment\n    }\n  }\n": types.CustomElementsTab_QueryDocument,
    "\n  fragment ElementFavoriteIcon_Element on Element {\n    id\n    isFavorite\n  }\n": types.ElementFavoriteIcon_ElementFragmentDoc,
    "\n  fragment FavoriteElements_User on User {\n    favoriteElements {\n      element {\n        id\n        ...ElementPreviewItem_Element\n      }\n    }\n  }\n": types.FavoriteElements_UserFragmentDoc,
    "\n  fragment MyUser_Query on Query {\n    me {\n      id\n      favoriteElements {\n        element {\n          id\n        }\n      }\n      ...FavoriteElements_User\n    }\n  }\n": types.MyUser_QueryFragmentDoc,
    "\n  query MyUser {\n    ...MyUser_Query\n  }\n": types.MyUserDocument,
    "\n  query SearchElements($input: ElementSearchInput!, $skip: Int!, $take: Int!) {\n    searchElements(input: $input, skip: $skip, take: $take) {\n      element {\n        id\n        ...ElementPreviewItem_Element\n      }\n      ...ElementPreviewItem_ElementSearchResult\n    }\n  }\n": types.SearchElementsDocument,
    "\n  query WorkshopElementPage($id: ID!) {\n    workshopElement(id: $id) {\n      id\n      note\n      basedOn {\n        id\n        name\n        markdown\n        sourceUrl\n        sourceName\n        sourceBaseUrl\n        licenseName\n        licenseUrl\n        owner {\n          id\n        }\n        isOwnerMe\n        ...CustomElement_Element\n        ...Element_Element\n      }\n      section {\n        id\n        workshop {\n          canEdit\n        }\n      }\n    }\n  }\n": types.WorkshopElementPageDocument,
    "\n      mutation UpdateWorkshopElementNote($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n          sections {\n            id\n            elements {\n              id\n              note\n            }\n          }\n        }\n      }\n    ": types.UpdateWorkshopElementNoteDocument,
    "\n  fragment WorkshopOptionsMenu_Workshop on Workshop {\n    id\n    name\n    description\n  }\n": types.WorkshopOptionsMenu_WorkshopFragmentDoc,
    "\n  fragment WorkshopPage_Workshop on Workshop {\n    id\n    version\n    isPublic\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n    canEdit\n    sections {\n      name\n      elements {\n        id\n      }\n    }\n    ...WorkshopElementsComponent_Workshop\n    ...WorkshopOptionsMenu_Workshop\n  }\n": types.WorkshopPage_WorkshopFragmentDoc,
    "\n  query WorkshopByIdQuery($id: ID!) {\n    workshop(id: $id) {\n      ...WorkshopPage_Workshop\n    }\n  }\n": types.WorkshopByIdQueryDocument,
    "\n      mutation UpdateWorkshopItemOrder($input: UpdateWorkshopItemOrder!) {\n        updateWorkshopItemOrder(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateWorkshopItemOrderDocument,
    "\n  fragment WorkshopFields_Workshop on Workshop {\n    id\n    ...WorkshopPreviewItem_Workshop\n  }\n": types.WorkshopFields_WorkshopFragmentDoc,
    "\n  query WorkshopsQuery {\n    workshops {\n      ...WorkshopFields_Workshop\n    }\n  }\n": types.WorkshopsQueryDocument,
    "\n  mutation CreateWorkshopMutation($input: CreateWorkshopInput!) {\n    createWorkshop(input: $input) {\n      id\n    }\n  }\n": types.CreateWorkshopMutationDocument,
    "\n  fragment SectionElementsComponent_WorkshopSection on WorkshopSection {\n    id\n    name\n    isCollapsed\n    orderIndex\n    elements {\n      id\n      ...WorkshopElementItemComponent_WorkshopElement\n    }\n    workshop {\n      canEdit\n    }\n  }\n": types.SectionElementsComponent_WorkshopSectionFragmentDoc,
    "\n  fragment WorkshopElementItemComponent_WorkshopElement on WorkshopElement {\n    id\n    note\n    basedOn {\n      id\n      name\n      markdown\n    }\n    section {\n      workshop {\n        canEdit\n      }\n    }\n  }\n": types.WorkshopElementItemComponent_WorkshopElementFragmentDoc,
    "\n  fragment WorkshopElementsComponent_Workshop on Workshop {\n    canEdit\n    sections {\n      id\n      ...SectionElementsComponent_WorkshopSection\n      ...WorkshopSectionComponent_WorkshopSection\n    }\n  }\n": types.WorkshopElementsComponent_WorkshopFragmentDoc,
    "\n  fragment WorkshopPreviewItem_Workshop on Workshop {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n    sections {\n      name\n      elements {\n        basedOn {\n          name\n        }\n      }\n    }\n    ...WorkshopInfoList_Workshop\n    ...WorkshopOptionsMenu_Workshop\n  }\n": types.WorkshopPreviewItem_WorkshopFragmentDoc,
    "\n  fragment WorkshopSectionComponent_WorkshopSection on WorkshopSection {\n    id\n    name\n    color\n    isCollapsed\n    elements {\n      id\n    }\n    workshop {\n      canEdit\n    }\n  }\n": types.WorkshopSectionComponent_WorkshopSectionFragmentDoc,
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
export function graphql(source: "\n  fragment CustomElement_Element on Element {\n    id\n    name\n    visibility\n  }\n"): (typeof documents)["\n  fragment CustomElement_Element on Element {\n    id\n    name\n    visibility\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Element_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    markdown\n    tags {\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    owner {\n      id\n      name\n    }\n    isOwnerMe\n    ...CustomElement_Element\n  }\n"): (typeof documents)["\n  fragment Element_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    markdown\n    tags {\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    owner {\n      id\n      name\n    }\n    isOwnerMe\n    ...CustomElement_Element\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ElementInfoList_ElementSearchResult on ElementSearchResult {\n    score\n    matches {\n      key\n      indices\n      refIndex\n      value\n    }\n  }\n"): (typeof documents)["\n  fragment ElementInfoList_ElementSearchResult on ElementSearchResult {\n    score\n    matches {\n      key\n      indices\n      refIndex\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ElementInfoList_Element on Element {\n    id\n    isFavorite\n    isOwnerMe\n    languageCode\n    sourceName\n    visibility\n  }\n"): (typeof documents)["\n  fragment ElementInfoList_Element on Element {\n    id\n    isFavorite\n    isOwnerMe\n    languageCode\n    sourceName\n    visibility\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ElementPreviewItem_ElementSearchResult on ElementSearchResult {\n    matches {\n      key\n      value\n    }\n    ...ElementInfoList_ElementSearchResult\n  }\n"): (typeof documents)["\n  fragment ElementPreviewItem_ElementSearchResult on ElementSearchResult {\n    matches {\n      key\n      value\n    }\n    ...ElementInfoList_ElementSearchResult\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ElementPreviewItem_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    markdownShort\n    tags {\n      id\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    visibility\n    isFavorite\n    owner {\n      id\n    }\n    isOwnerMe\n    ...CustomElement_Element\n    ...ElementFavoriteIcon_Element\n    ...ElementInfoList_Element\n  }\n"): (typeof documents)["\n  fragment ElementPreviewItem_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    markdownShort\n    tags {\n      id\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    visibility\n    isFavorite\n    owner {\n      id\n    }\n    isOwnerMe\n    ...CustomElement_Element\n    ...ElementFavoriteIcon_Element\n    ...ElementInfoList_Element\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopInfoList_Workshop on Workshop {\n    id\n    createdAt\n    updatedAt\n    isPublic\n  }\n"): (typeof documents)["\n  fragment WorkshopInfoList_Workshop on Workshop {\n    id\n    createdAt\n    updatedAt\n    isPublic\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      version\n      favoriteElements {\n        element {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      version\n      favoriteElements {\n        element {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteWorkshopMutation($id: ID!) {\n        deleteWorkshop(id: $id) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteWorkshopMutation($id: ID!) {\n        deleteWorkshop(id: $id) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n              query GoogleLoginHrefQuery {\n                googleAuthUrl\n              }\n            "): (typeof documents)["\n              query GoogleLoginHrefQuery {\n                googleAuthUrl\n              }\n            "];
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
export function graphql(source: "\n  mutation UpdateUserFavoriteElement($input: UpdateUserFavoriteElementInput!) {\n    updateUserFavoriteElement(input: $input) {\n      id\n      isFavorite\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserFavoriteElement($input: UpdateUserFavoriteElementInput!) {\n    updateUserFavoriteElement(input: $input) {\n      id\n      isFavorite\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateWorkshopMutation($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateWorkshopMutation($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AccountPage_Query {\n    me {\n      ...AccountOptionsMenu_User\n      ...AccountSignedIn_User\n    }\n  }\n"): (typeof documents)["\n  query AccountPage_Query {\n    me {\n      ...AccountOptionsMenu_User\n      ...AccountSignedIn_User\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AccountOptionsMenu_User on User {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment AccountOptionsMenu_User on User {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateUserMutation($input: UpdateUserInput!) {\n        updateUser(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateUserMutation($input: UpdateUserInput!) {\n        updateUser(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AccountSignedIn_User on User {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment AccountSignedIn_User on User {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LibraryCreateCustomElement_Query($id: ID!) {\n    element(id: $id) {\n      id\n      name\n      visibility\n      markdown\n    }\n  }\n"): (typeof documents)["\n  query LibraryCreateCustomElement_Query($id: ID!) {\n    element(id: $id) {\n      id\n      name\n      visibility\n      markdown\n    }\n  }\n"];
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
export function graphql(source: "\n  query LibraryElementQuery($id: ID!) {\n    element(id: $id) {\n      ...LibraryElement_Element\n    }\n  }\n"): (typeof documents)["\n  query LibraryElementQuery($id: ID!) {\n    element(id: $id) {\n      ...LibraryElement_Element\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment LibraryElement_Element on Element {\n    id\n    name\n    isFavorite\n    ...Element_Element\n    ...ElementFavoriteIcon_Element\n  }\n"): (typeof documents)["\n  fragment LibraryElement_Element on Element {\n    id\n    name\n    isFavorite\n    ...Element_Element\n    ...ElementFavoriteIcon_Element\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WorkshopSectionsQuery($id: ID!) {\n    workshop(id: $id) {\n      sections {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query WorkshopSectionsQuery($id: ID!) {\n    workshop(id: $id) {\n      sections {\n        id\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  fragment ElementFavoriteIcon_Element on Element {\n    id\n    isFavorite\n  }\n"): (typeof documents)["\n  fragment ElementFavoriteIcon_Element on Element {\n    id\n    isFavorite\n  }\n"];
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
export function graphql(source: "\n  query SearchElements($input: ElementSearchInput!, $skip: Int!, $take: Int!) {\n    searchElements(input: $input, skip: $skip, take: $take) {\n      element {\n        id\n        ...ElementPreviewItem_Element\n      }\n      ...ElementPreviewItem_ElementSearchResult\n    }\n  }\n"): (typeof documents)["\n  query SearchElements($input: ElementSearchInput!, $skip: Int!, $take: Int!) {\n    searchElements(input: $input, skip: $skip, take: $take) {\n      element {\n        id\n        ...ElementPreviewItem_Element\n      }\n      ...ElementPreviewItem_ElementSearchResult\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WorkshopElementPage($id: ID!) {\n    workshopElement(id: $id) {\n      id\n      note\n      basedOn {\n        id\n        name\n        markdown\n        sourceUrl\n        sourceName\n        sourceBaseUrl\n        licenseName\n        licenseUrl\n        owner {\n          id\n        }\n        isOwnerMe\n        ...CustomElement_Element\n        ...Element_Element\n      }\n      section {\n        id\n        workshop {\n          canEdit\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query WorkshopElementPage($id: ID!) {\n    workshopElement(id: $id) {\n      id\n      note\n      basedOn {\n        id\n        name\n        markdown\n        sourceUrl\n        sourceName\n        sourceBaseUrl\n        licenseName\n        licenseUrl\n        owner {\n          id\n        }\n        isOwnerMe\n        ...CustomElement_Element\n        ...Element_Element\n      }\n      section {\n        id\n        workshop {\n          canEdit\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateWorkshopElementNote($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n          sections {\n            id\n            elements {\n              id\n              note\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateWorkshopElementNote($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n          sections {\n            id\n            elements {\n              id\n              note\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopOptionsMenu_Workshop on Workshop {\n    id\n    name\n    description\n  }\n"): (typeof documents)["\n  fragment WorkshopOptionsMenu_Workshop on Workshop {\n    id\n    name\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopPage_Workshop on Workshop {\n    id\n    version\n    isPublic\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n    canEdit\n    sections {\n      name\n      elements {\n        id\n      }\n    }\n    ...WorkshopElementsComponent_Workshop\n    ...WorkshopOptionsMenu_Workshop\n  }\n"): (typeof documents)["\n  fragment WorkshopPage_Workshop on Workshop {\n    id\n    version\n    isPublic\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n    canEdit\n    sections {\n      name\n      elements {\n        id\n      }\n    }\n    ...WorkshopElementsComponent_Workshop\n    ...WorkshopOptionsMenu_Workshop\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WorkshopByIdQuery($id: ID!) {\n    workshop(id: $id) {\n      ...WorkshopPage_Workshop\n    }\n  }\n"): (typeof documents)["\n  query WorkshopByIdQuery($id: ID!) {\n    workshop(id: $id) {\n      ...WorkshopPage_Workshop\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateWorkshopItemOrder($input: UpdateWorkshopItemOrder!) {\n        updateWorkshopItemOrder(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateWorkshopItemOrder($input: UpdateWorkshopItemOrder!) {\n        updateWorkshopItemOrder(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopFields_Workshop on Workshop {\n    id\n    ...WorkshopPreviewItem_Workshop\n  }\n"): (typeof documents)["\n  fragment WorkshopFields_Workshop on Workshop {\n    id\n    ...WorkshopPreviewItem_Workshop\n  }\n"];
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
export function graphql(source: "\n  fragment SectionElementsComponent_WorkshopSection on WorkshopSection {\n    id\n    name\n    isCollapsed\n    orderIndex\n    elements {\n      id\n      ...WorkshopElementItemComponent_WorkshopElement\n    }\n    workshop {\n      canEdit\n    }\n  }\n"): (typeof documents)["\n  fragment SectionElementsComponent_WorkshopSection on WorkshopSection {\n    id\n    name\n    isCollapsed\n    orderIndex\n    elements {\n      id\n      ...WorkshopElementItemComponent_WorkshopElement\n    }\n    workshop {\n      canEdit\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopElementItemComponent_WorkshopElement on WorkshopElement {\n    id\n    note\n    basedOn {\n      id\n      name\n      markdown\n    }\n    section {\n      workshop {\n        canEdit\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment WorkshopElementItemComponent_WorkshopElement on WorkshopElement {\n    id\n    note\n    basedOn {\n      id\n      name\n      markdown\n    }\n    section {\n      workshop {\n        canEdit\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopElementsComponent_Workshop on Workshop {\n    canEdit\n    sections {\n      id\n      ...SectionElementsComponent_WorkshopSection\n      ...WorkshopSectionComponent_WorkshopSection\n    }\n  }\n"): (typeof documents)["\n  fragment WorkshopElementsComponent_Workshop on Workshop {\n    canEdit\n    sections {\n      id\n      ...SectionElementsComponent_WorkshopSection\n      ...WorkshopSectionComponent_WorkshopSection\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopPreviewItem_Workshop on Workshop {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n    sections {\n      name\n      elements {\n        basedOn {\n          name\n        }\n      }\n    }\n    ...WorkshopInfoList_Workshop\n    ...WorkshopOptionsMenu_Workshop\n  }\n"): (typeof documents)["\n  fragment WorkshopPreviewItem_Workshop on Workshop {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n    sections {\n      name\n      elements {\n        basedOn {\n          name\n        }\n      }\n    }\n    ...WorkshopInfoList_Workshop\n    ...WorkshopOptionsMenu_Workshop\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopSectionComponent_WorkshopSection on WorkshopSection {\n    id\n    name\n    color\n    isCollapsed\n    elements {\n      id\n    }\n    workshop {\n      canEdit\n    }\n  }\n"): (typeof documents)["\n  fragment WorkshopSectionComponent_WorkshopSection on WorkshopSection {\n    id\n    name\n    color\n    isCollapsed\n    elements {\n      id\n    }\n    workshop {\n      canEdit\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;