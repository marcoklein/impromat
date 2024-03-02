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
    "\n  fragment ElementInfoList_Element on Element {\n    id\n    isFavorite\n    isOwnerMe\n    languageCode\n    sourceName\n    visibility\n  }\n": types.ElementInfoList_ElementFragmentDoc,
    "\n  fragment ElementPreviewItem_ElementSearchResult on ElementSearchResult {\n    matches {\n      key\n      value\n    }\n  }\n": types.ElementPreviewItem_ElementSearchResultFragmentDoc,
    "\n  fragment ElementPreviewItem_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    summary\n    markdownShort\n    tags {\n      id\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    visibility\n    isFavorite\n    owner {\n      id\n    }\n    isOwnerMe\n    ...CustomElement_Element\n    ...ElementInfoList_Element\n  }\n": types.ElementPreviewItem_ElementFragmentDoc,
    "\n  fragment WorkshopInfoList_Workshop on Workshop {\n    id\n    createdAt\n    updatedAt\n    isPublic\n    isListed\n    canEdit\n    isOwnerMe\n    isLiked\n    dateOfWorkshop\n    owner {\n      id\n      name\n    }\n  }\n": types.WorkshopInfoList_WorkshopFragmentDoc,
    "\n      mutation CreateWorkshopMutation($input: CreateWorkshopInput!) {\n        createWorkshop(input: $input) {\n          id\n        }\n      }\n    ": types.CreateWorkshopMutationDocument,
    "\n      mutation DeleteWorkshopMutation($id: ID!) {\n        deleteWorkshop(id: $id) {\n          id\n        }\n      }\n    ": types.DeleteWorkshopMutationDocument,
    "\n      mutation DuplicateWorkshopMutation($input: DuplicateWorkshopInput!) {\n        duplicateWorkshop(input: $input) {\n          id\n        }\n      }\n    ": types.DuplicateWorkshopMutationDocument,
    "\n              query GoogleLoginHrefQuery {\n                googleAuthUrl\n              }\n            ": types.GoogleLoginHrefQueryDocument,
    "\n  query IsLoggedIn {\n    me {\n      id\n    }\n  }\n": types.IsLoggedInDocument,
    "\n      mutation LogoutMutation {\n        logout\n      }\n    ": types.LogoutMutationDocument,
    "\n  mutation UpdateUserFavoriteElement($input: UpdateUserFavoriteElementInput!) {\n    updateUserFavoriteElement(input: $input) {\n      id\n      isFavorite\n    }\n  }\n": types.UpdateUserFavoriteElementDocument,
    "\n  mutation UpdateUserLikedWorkshopMutation(\n    $input: UpdateUserLikedWorkshopInput!\n  ) {\n    updateUserLikedWorkshop(input: $input) {\n      id\n      isLiked\n    }\n  }\n": types.UpdateUserLikedWorkshopMutationDocument,
    "\n      mutation UpdateUserMutation($input: UpdateUserInput!) {\n        updateUser(input: $input) {\n          id\n          name\n          languageCodes\n\n          createdAt\n          updatedAt\n          version\n          deleted\n        }\n      }\n    ": types.UpdateUserMutationDocument,
    "\n      mutation UpdateWorkshopMutation($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateWorkshopMutationDocument,
    "\n  query LibraryCreateElementPage_Query(\n    $tagsInput: ElementTagsFilterInput!\n    $tagsTake: Int\n  ) {\n    tags(filter: $tagsInput, take: $tagsTake) {\n      id\n      name\n    }\n  }\n": types.LibraryCreateElementPage_QueryDocument,
    "\n  mutation CreateElementMutation($input: CreateElementInput!) {\n    createElement(input: $input) {\n      id\n    }\n  }\n": types.CreateElementMutationDocument,
    "\n  query LibraryUpdateElementPage_Query($id: ID!) {\n    element(id: $id) {\n      id\n      name\n      visibility\n      markdown\n      languageCode\n      tags {\n        id\n        name\n      }\n    }\n  }\n": types.LibraryUpdateElementPage_QueryDocument,
    "\n  query LibraryUpdateElementPageTags_Query(\n    $tagsInput: ElementTagsFilterInput!\n    $tagsTake: Int\n  ) {\n    tags(filter: $tagsInput, take: $tagsTake) {\n      id\n      name\n    }\n  }\n": types.LibraryUpdateElementPageTags_QueryDocument,
    "\n  mutation UpdateElementMutation($input: UpdateElementInput!) {\n    updateElement(input: $input) {\n      id\n    }\n  }\n": types.UpdateElementMutationDocument,
    "\n  fragment LibraryElements_ElementSearchResult on ElementSearchResult {\n    element {\n      id\n      createdAt\n      updatedAt\n      version\n      deleted\n      name\n      summary\n      markdownShort\n      tags {\n        id\n        name\n      }\n      usedBy {\n        id\n      }\n      languageCode\n      sourceUrl\n      sourceName\n      sourceBaseUrl\n      licenseName\n      licenseUrl\n      visibility\n      isFavorite\n      owner {\n        id\n      }\n      isOwnerMe\n      ...ElementItem_Element\n      ...ElementPreviewItem_Element\n    }\n    ...ElementPreviewItem_ElementSearchResult\n  }\n": types.LibraryElements_ElementSearchResultFragmentDoc,
    "\n  query MuiLibraryPageQuery(\n    $input: ElementSearchInput!\n    $skip: Int!\n    $take: Int!\n  ) {\n    searchElements(input: $input, skip: $skip, take: $take) {\n      element {\n        id\n        name\n        ...ElementItem_Element\n      }\n      ...LibraryElements_ElementSearchResult\n    }\n  }\n": types.MuiLibraryPageQueryDocument,
    "\n  fragment AddToWorkshopSelectDialog_Workshop on Workshop {\n    id\n    name\n    sections {\n      id\n    }\n  }\n": types.AddToWorkshopSelectDialog_WorkshopFragmentDoc,
    "\n  fragment ElementDetails_Element on Element {\n    id\n    name\n    markdown\n    summary\n\n    isOwnerMe\n    owner {\n      id\n      name\n    }\n    visibility\n    tags {\n      id\n      name\n    }\n\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n\n    ...CustomElement_Element\n  }\n": types.ElementDetails_ElementFragmentDoc,
    "\n  fragment ElementItem_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    summary\n    markdownShort\n    tags {\n      id\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    visibility\n    isFavorite\n    owner {\n      id\n    }\n    isOwnerMe\n  }\n": types.ElementItem_ElementFragmentDoc,
    "\n  fragment ElementLikeIconButton_Element on Element {\n    id\n    isFavorite\n  }\n": types.ElementLikeIconButton_ElementFragmentDoc,
    "\n  query MuiLibraryElementQuery($elementId: ID!) {\n    element(id: $elementId) {\n      id\n\n      ...ElementDetails_Element\n      ...ElementLikeIconButton_Element\n    }\n    me {\n      id\n      workshops {\n        ...AddToWorkshopSelectDialog_Workshop\n      }\n    }\n  }\n": types.MuiLibraryElementQueryDocument,
    "\n  query MySpacePage_Query {\n    me {\n      id\n      name\n      languageCodes\n    }\n  }\n": types.MySpacePage_QueryDocument,
    "\n  query WorkshopElementPage_Query($id: ID!) {\n    workshopElement(id: $id) {\n      id\n      note\n      basedOn {\n        id\n        name\n        markdown\n        sourceUrl\n        sourceName\n        sourceBaseUrl\n        licenseName\n        licenseUrl\n        owner {\n          id\n        }\n        isOwnerMe\n        ...ElementDetails_Element\n        ...CustomElement_Element\n        ...ElementLikeIconButton_Element\n      }\n      section {\n        id\n        workshop {\n          id\n          canEdit\n        }\n      }\n    }\n  }\n": types.WorkshopElementPage_QueryDocument,
    "\n      mutation UpdateWorkshopElementNote($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n          sections {\n            id\n            elements {\n              id\n              note\n            }\n          }\n        }\n      }\n    ": types.UpdateWorkshopElementNoteDocument,
    "\n  fragment WorkshopPage_Workshop on Workshop {\n    id\n    version\n    isPublic\n    isListed\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n    canEdit\n    isLiked\n    dateOfWorkshop\n    ...WorkshopContent_Workshop\n    elementRecommendations {\n      id\n      ...ElementPreviewItem_Element\n    }\n    ...WorkshopLikeIconButton_Workshop\n\n    ...WorkshopOptionsMenu_Workshop\n    ...ShareWorkshopModal_Workshop\n  }\n": types.WorkshopPage_WorkshopFragmentDoc,
    "\n  query WorkshopByIdQuery($id: ID!) {\n    workshop(id: $id) {\n      ...WorkshopPage_Workshop\n    }\n  }\n": types.WorkshopByIdQueryDocument,
    "\n  fragment WorkshopFields_Workshop on Workshop {\n    id\n    ...WorkshopPreviewItem_Workshop\n  }\n": types.WorkshopFields_WorkshopFragmentDoc,
    "\n  query WorkshopsQuery(\n    $userId: ID!\n    $userWorkshopsFilterInput: UserWorkshopsFilterInput\n  ) {\n    user(id: $userId) {\n      id\n      workshops(input: $userWorkshopsFilterInput) {\n        ...WorkshopFields_Workshop\n      }\n    }\n  }\n": types.WorkshopsQueryDocument,
    "\n  fragment ShareWorkshopModal_Workshop on Workshop {\n    id\n    isPublic\n    isListed\n  }\n": types.ShareWorkshopModal_WorkshopFragmentDoc,
    "\n  fragment WorkshopContent_Workshop on Workshop {\n    id\n    canEdit\n    sections {\n      id\n      name\n      elements {\n        id\n        ...WorkshopElementItem_WorkshopElement\n      }\n      isCollapsed\n      ...WorkshopSectionItem_WorkshopSection\n    }\n  }\n": types.WorkshopContent_WorkshopFragmentDoc,
    "\n      mutation UpdateWorkshopItemOrder($input: UpdateWorkshopItemOrder!) {\n        updateWorkshopItemOrder(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateWorkshopItemOrderDocument,
    "\n  fragment WorkshopElementItem_WorkshopElement on WorkshopElement {\n    id\n    note\n    basedOn {\n      id\n      name\n    }\n  }\n": types.WorkshopElementItem_WorkshopElementFragmentDoc,
    "\n  fragment WorkshopLikeIconButton_Workshop on Workshop {\n    id\n    isLiked\n  }\n": types.WorkshopLikeIconButton_WorkshopFragmentDoc,
    "\n  fragment WorkshopOptionsMenu_Workshop on Workshop {\n    id\n    name\n    description\n    dateOfWorkshop\n  }\n": types.WorkshopOptionsMenu_WorkshopFragmentDoc,
    "\n  fragment WorkshopPreviewItem_Workshop on Workshop {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n    canEdit\n    sections {\n      id\n      name\n      elements {\n        id\n        basedOn {\n          id\n          name\n        }\n      }\n    }\n    ...WorkshopInfoList_Workshop\n    ...WorkshopOptionsMenu_Workshop\n  }\n": types.WorkshopPreviewItem_WorkshopFragmentDoc,
    "\n  fragment WorkshopSectionItem_WorkshopSection on WorkshopSection {\n    id\n    name\n    isCollapsed\n    elements {\n      id\n    }\n    ...WorkshopSectionOptions_WorkshopSection\n  }\n": types.WorkshopSectionItem_WorkshopSectionFragmentDoc,
    "\n  fragment WorkshopSectionOptions_WorkshopSection on WorkshopSection {\n    id\n    name\n  }\n": types.WorkshopSectionOptions_WorkshopSectionFragmentDoc,
    "\n  query LanguageUpdate_Query {\n    me {\n      id\n      languageCodes\n    }\n  }\n": types.LanguageUpdate_QueryDocument,
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
export function graphql(source: "\n  fragment ElementInfoList_Element on Element {\n    id\n    isFavorite\n    isOwnerMe\n    languageCode\n    sourceName\n    visibility\n  }\n"): (typeof documents)["\n  fragment ElementInfoList_Element on Element {\n    id\n    isFavorite\n    isOwnerMe\n    languageCode\n    sourceName\n    visibility\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ElementPreviewItem_ElementSearchResult on ElementSearchResult {\n    matches {\n      key\n      value\n    }\n  }\n"): (typeof documents)["\n  fragment ElementPreviewItem_ElementSearchResult on ElementSearchResult {\n    matches {\n      key\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ElementPreviewItem_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    summary\n    markdownShort\n    tags {\n      id\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    visibility\n    isFavorite\n    owner {\n      id\n    }\n    isOwnerMe\n    ...CustomElement_Element\n    ...ElementInfoList_Element\n  }\n"): (typeof documents)["\n  fragment ElementPreviewItem_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    summary\n    markdownShort\n    tags {\n      id\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    visibility\n    isFavorite\n    owner {\n      id\n    }\n    isOwnerMe\n    ...CustomElement_Element\n    ...ElementInfoList_Element\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopInfoList_Workshop on Workshop {\n    id\n    createdAt\n    updatedAt\n    isPublic\n    isListed\n    canEdit\n    isOwnerMe\n    isLiked\n    dateOfWorkshop\n    owner {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment WorkshopInfoList_Workshop on Workshop {\n    id\n    createdAt\n    updatedAt\n    isPublic\n    isListed\n    canEdit\n    isOwnerMe\n    isLiked\n    dateOfWorkshop\n    owner {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateWorkshopMutation($input: CreateWorkshopInput!) {\n        createWorkshop(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateWorkshopMutation($input: CreateWorkshopInput!) {\n        createWorkshop(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteWorkshopMutation($id: ID!) {\n        deleteWorkshop(id: $id) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteWorkshopMutation($id: ID!) {\n        deleteWorkshop(id: $id) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DuplicateWorkshopMutation($input: DuplicateWorkshopInput!) {\n        duplicateWorkshop(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DuplicateWorkshopMutation($input: DuplicateWorkshopInput!) {\n        duplicateWorkshop(input: $input) {\n          id\n        }\n      }\n    "];
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
export function graphql(source: "\n  mutation UpdateUserLikedWorkshopMutation(\n    $input: UpdateUserLikedWorkshopInput!\n  ) {\n    updateUserLikedWorkshop(input: $input) {\n      id\n      isLiked\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserLikedWorkshopMutation(\n    $input: UpdateUserLikedWorkshopInput!\n  ) {\n    updateUserLikedWorkshop(input: $input) {\n      id\n      isLiked\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateUserMutation($input: UpdateUserInput!) {\n        updateUser(input: $input) {\n          id\n          name\n          languageCodes\n\n          createdAt\n          updatedAt\n          version\n          deleted\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateUserMutation($input: UpdateUserInput!) {\n        updateUser(input: $input) {\n          id\n          name\n          languageCodes\n\n          createdAt\n          updatedAt\n          version\n          deleted\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateWorkshopMutation($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateWorkshopMutation($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LibraryCreateElementPage_Query(\n    $tagsInput: ElementTagsFilterInput!\n    $tagsTake: Int\n  ) {\n    tags(filter: $tagsInput, take: $tagsTake) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query LibraryCreateElementPage_Query(\n    $tagsInput: ElementTagsFilterInput!\n    $tagsTake: Int\n  ) {\n    tags(filter: $tagsInput, take: $tagsTake) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateElementMutation($input: CreateElementInput!) {\n    createElement(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateElementMutation($input: CreateElementInput!) {\n    createElement(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LibraryUpdateElementPage_Query($id: ID!) {\n    element(id: $id) {\n      id\n      name\n      visibility\n      markdown\n      languageCode\n      tags {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query LibraryUpdateElementPage_Query($id: ID!) {\n    element(id: $id) {\n      id\n      name\n      visibility\n      markdown\n      languageCode\n      tags {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LibraryUpdateElementPageTags_Query(\n    $tagsInput: ElementTagsFilterInput!\n    $tagsTake: Int\n  ) {\n    tags(filter: $tagsInput, take: $tagsTake) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query LibraryUpdateElementPageTags_Query(\n    $tagsInput: ElementTagsFilterInput!\n    $tagsTake: Int\n  ) {\n    tags(filter: $tagsInput, take: $tagsTake) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateElementMutation($input: UpdateElementInput!) {\n    updateElement(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateElementMutation($input: UpdateElementInput!) {\n    updateElement(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment LibraryElements_ElementSearchResult on ElementSearchResult {\n    element {\n      id\n      createdAt\n      updatedAt\n      version\n      deleted\n      name\n      summary\n      markdownShort\n      tags {\n        id\n        name\n      }\n      usedBy {\n        id\n      }\n      languageCode\n      sourceUrl\n      sourceName\n      sourceBaseUrl\n      licenseName\n      licenseUrl\n      visibility\n      isFavorite\n      owner {\n        id\n      }\n      isOwnerMe\n      ...ElementItem_Element\n      ...ElementPreviewItem_Element\n    }\n    ...ElementPreviewItem_ElementSearchResult\n  }\n"): (typeof documents)["\n  fragment LibraryElements_ElementSearchResult on ElementSearchResult {\n    element {\n      id\n      createdAt\n      updatedAt\n      version\n      deleted\n      name\n      summary\n      markdownShort\n      tags {\n        id\n        name\n      }\n      usedBy {\n        id\n      }\n      languageCode\n      sourceUrl\n      sourceName\n      sourceBaseUrl\n      licenseName\n      licenseUrl\n      visibility\n      isFavorite\n      owner {\n        id\n      }\n      isOwnerMe\n      ...ElementItem_Element\n      ...ElementPreviewItem_Element\n    }\n    ...ElementPreviewItem_ElementSearchResult\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MuiLibraryPageQuery(\n    $input: ElementSearchInput!\n    $skip: Int!\n    $take: Int!\n  ) {\n    searchElements(input: $input, skip: $skip, take: $take) {\n      element {\n        id\n        name\n        ...ElementItem_Element\n      }\n      ...LibraryElements_ElementSearchResult\n    }\n  }\n"): (typeof documents)["\n  query MuiLibraryPageQuery(\n    $input: ElementSearchInput!\n    $skip: Int!\n    $take: Int!\n  ) {\n    searchElements(input: $input, skip: $skip, take: $take) {\n      element {\n        id\n        name\n        ...ElementItem_Element\n      }\n      ...LibraryElements_ElementSearchResult\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AddToWorkshopSelectDialog_Workshop on Workshop {\n    id\n    name\n    sections {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment AddToWorkshopSelectDialog_Workshop on Workshop {\n    id\n    name\n    sections {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ElementDetails_Element on Element {\n    id\n    name\n    markdown\n    summary\n\n    isOwnerMe\n    owner {\n      id\n      name\n    }\n    visibility\n    tags {\n      id\n      name\n    }\n\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n\n    ...CustomElement_Element\n  }\n"): (typeof documents)["\n  fragment ElementDetails_Element on Element {\n    id\n    name\n    markdown\n    summary\n\n    isOwnerMe\n    owner {\n      id\n      name\n    }\n    visibility\n    tags {\n      id\n      name\n    }\n\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n\n    ...CustomElement_Element\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ElementItem_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    summary\n    markdownShort\n    tags {\n      id\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    visibility\n    isFavorite\n    owner {\n      id\n    }\n    isOwnerMe\n  }\n"): (typeof documents)["\n  fragment ElementItem_Element on Element {\n    id\n    createdAt\n    updatedAt\n    version\n    deleted\n    name\n    summary\n    markdownShort\n    tags {\n      id\n      name\n    }\n    usedBy {\n      id\n    }\n    languageCode\n    sourceUrl\n    sourceName\n    sourceBaseUrl\n    licenseName\n    licenseUrl\n    visibility\n    isFavorite\n    owner {\n      id\n    }\n    isOwnerMe\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ElementLikeIconButton_Element on Element {\n    id\n    isFavorite\n  }\n"): (typeof documents)["\n  fragment ElementLikeIconButton_Element on Element {\n    id\n    isFavorite\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MuiLibraryElementQuery($elementId: ID!) {\n    element(id: $elementId) {\n      id\n\n      ...ElementDetails_Element\n      ...ElementLikeIconButton_Element\n    }\n    me {\n      id\n      workshops {\n        ...AddToWorkshopSelectDialog_Workshop\n      }\n    }\n  }\n"): (typeof documents)["\n  query MuiLibraryElementQuery($elementId: ID!) {\n    element(id: $elementId) {\n      id\n\n      ...ElementDetails_Element\n      ...ElementLikeIconButton_Element\n    }\n    me {\n      id\n      workshops {\n        ...AddToWorkshopSelectDialog_Workshop\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MySpacePage_Query {\n    me {\n      id\n      name\n      languageCodes\n    }\n  }\n"): (typeof documents)["\n  query MySpacePage_Query {\n    me {\n      id\n      name\n      languageCodes\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WorkshopElementPage_Query($id: ID!) {\n    workshopElement(id: $id) {\n      id\n      note\n      basedOn {\n        id\n        name\n        markdown\n        sourceUrl\n        sourceName\n        sourceBaseUrl\n        licenseName\n        licenseUrl\n        owner {\n          id\n        }\n        isOwnerMe\n        ...ElementDetails_Element\n        ...CustomElement_Element\n        ...ElementLikeIconButton_Element\n      }\n      section {\n        id\n        workshop {\n          id\n          canEdit\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query WorkshopElementPage_Query($id: ID!) {\n    workshopElement(id: $id) {\n      id\n      note\n      basedOn {\n        id\n        name\n        markdown\n        sourceUrl\n        sourceName\n        sourceBaseUrl\n        licenseName\n        licenseUrl\n        owner {\n          id\n        }\n        isOwnerMe\n        ...ElementDetails_Element\n        ...CustomElement_Element\n        ...ElementLikeIconButton_Element\n      }\n      section {\n        id\n        workshop {\n          id\n          canEdit\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateWorkshopElementNote($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n          sections {\n            id\n            elements {\n              id\n              note\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateWorkshopElementNote($input: UpdateWorkshopInput!) {\n        updateWorkshop(input: $input) {\n          id\n          sections {\n            id\n            elements {\n              id\n              note\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopPage_Workshop on Workshop {\n    id\n    version\n    isPublic\n    isListed\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n    canEdit\n    isLiked\n    dateOfWorkshop\n    ...WorkshopContent_Workshop\n    elementRecommendations {\n      id\n      ...ElementPreviewItem_Element\n    }\n    ...WorkshopLikeIconButton_Workshop\n\n    ...WorkshopOptionsMenu_Workshop\n    ...ShareWorkshopModal_Workshop\n  }\n"): (typeof documents)["\n  fragment WorkshopPage_Workshop on Workshop {\n    id\n    version\n    isPublic\n    isListed\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n    canEdit\n    isLiked\n    dateOfWorkshop\n    ...WorkshopContent_Workshop\n    elementRecommendations {\n      id\n      ...ElementPreviewItem_Element\n    }\n    ...WorkshopLikeIconButton_Workshop\n\n    ...WorkshopOptionsMenu_Workshop\n    ...ShareWorkshopModal_Workshop\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WorkshopByIdQuery($id: ID!) {\n    workshop(id: $id) {\n      ...WorkshopPage_Workshop\n    }\n  }\n"): (typeof documents)["\n  query WorkshopByIdQuery($id: ID!) {\n    workshop(id: $id) {\n      ...WorkshopPage_Workshop\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopFields_Workshop on Workshop {\n    id\n    ...WorkshopPreviewItem_Workshop\n  }\n"): (typeof documents)["\n  fragment WorkshopFields_Workshop on Workshop {\n    id\n    ...WorkshopPreviewItem_Workshop\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WorkshopsQuery(\n    $userId: ID!\n    $userWorkshopsFilterInput: UserWorkshopsFilterInput\n  ) {\n    user(id: $userId) {\n      id\n      workshops(input: $userWorkshopsFilterInput) {\n        ...WorkshopFields_Workshop\n      }\n    }\n  }\n"): (typeof documents)["\n  query WorkshopsQuery(\n    $userId: ID!\n    $userWorkshopsFilterInput: UserWorkshopsFilterInput\n  ) {\n    user(id: $userId) {\n      id\n      workshops(input: $userWorkshopsFilterInput) {\n        ...WorkshopFields_Workshop\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ShareWorkshopModal_Workshop on Workshop {\n    id\n    isPublic\n    isListed\n  }\n"): (typeof documents)["\n  fragment ShareWorkshopModal_Workshop on Workshop {\n    id\n    isPublic\n    isListed\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopContent_Workshop on Workshop {\n    id\n    canEdit\n    sections {\n      id\n      name\n      elements {\n        id\n        ...WorkshopElementItem_WorkshopElement\n      }\n      isCollapsed\n      ...WorkshopSectionItem_WorkshopSection\n    }\n  }\n"): (typeof documents)["\n  fragment WorkshopContent_Workshop on Workshop {\n    id\n    canEdit\n    sections {\n      id\n      name\n      elements {\n        id\n        ...WorkshopElementItem_WorkshopElement\n      }\n      isCollapsed\n      ...WorkshopSectionItem_WorkshopSection\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateWorkshopItemOrder($input: UpdateWorkshopItemOrder!) {\n        updateWorkshopItemOrder(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateWorkshopItemOrder($input: UpdateWorkshopItemOrder!) {\n        updateWorkshopItemOrder(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopElementItem_WorkshopElement on WorkshopElement {\n    id\n    note\n    basedOn {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment WorkshopElementItem_WorkshopElement on WorkshopElement {\n    id\n    note\n    basedOn {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopLikeIconButton_Workshop on Workshop {\n    id\n    isLiked\n  }\n"): (typeof documents)["\n  fragment WorkshopLikeIconButton_Workshop on Workshop {\n    id\n    isLiked\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopOptionsMenu_Workshop on Workshop {\n    id\n    name\n    description\n    dateOfWorkshop\n  }\n"): (typeof documents)["\n  fragment WorkshopOptionsMenu_Workshop on Workshop {\n    id\n    name\n    description\n    dateOfWorkshop\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopPreviewItem_Workshop on Workshop {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n    canEdit\n    sections {\n      id\n      name\n      elements {\n        id\n        basedOn {\n          id\n          name\n        }\n      }\n    }\n    ...WorkshopInfoList_Workshop\n    ...WorkshopOptionsMenu_Workshop\n  }\n"): (typeof documents)["\n  fragment WorkshopPreviewItem_Workshop on Workshop {\n    id\n    version\n    createdAt\n    updatedAt\n    deleted\n    name\n    description\n    canEdit\n    sections {\n      id\n      name\n      elements {\n        id\n        basedOn {\n          id\n          name\n        }\n      }\n    }\n    ...WorkshopInfoList_Workshop\n    ...WorkshopOptionsMenu_Workshop\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopSectionItem_WorkshopSection on WorkshopSection {\n    id\n    name\n    isCollapsed\n    elements {\n      id\n    }\n    ...WorkshopSectionOptions_WorkshopSection\n  }\n"): (typeof documents)["\n  fragment WorkshopSectionItem_WorkshopSection on WorkshopSection {\n    id\n    name\n    isCollapsed\n    elements {\n      id\n    }\n    ...WorkshopSectionOptions_WorkshopSection\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WorkshopSectionOptions_WorkshopSection on WorkshopSection {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment WorkshopSectionOptions_WorkshopSection on WorkshopSection {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LanguageUpdate_Query {\n    me {\n      id\n      languageCodes\n    }\n  }\n"): (typeof documents)["\n  query LanguageUpdate_Query {\n    me {\n      id\n      languageCodes\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;