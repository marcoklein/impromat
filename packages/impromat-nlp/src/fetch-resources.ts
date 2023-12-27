import { GraphQLClient } from "graphql-request";
import { graphql } from "./graphql-client";
import { ElementsQuery } from "./graphql-client/graphql";

const graphqlPath = "/graphql";
const loginPath = "/auth/login";

const fetchMyUserIdQuery = graphql(`
  query Me {
    me {
      id
    }
  }
`);

const _elementFieldsFragment = graphql(`
  fragment ElementFields on Element {
    id
    name
    improbibIdentifier
    markdown
    tags {
      id
      name
    }
  }
`);

const fetchElementsQuery = graphql(`
  query Elements($skip: Int!, $take: Int!, $input: ElementSearchInput!) {
    searchElements(skip: $skip, take: $take, input: $input) {
      element {
        ...ElementFields
      }
    }
  }
`);

export type ImpromatElementType = Awaited<
  ReturnType<typeof fetchImpromatElements>
>;

export async function fetchResources(options: { endpoint: string }) {
  const client = await createGraphQLClient(options);
  const impromatElements = await fetchImpromatElements(client);

  return {
    client,
    impromatElements,
  };
}

async function createGraphQLClient(options: { endpoint: string }) {
  const client = new GraphQLClient(`${options.endpoint}${graphqlPath}`);
  return client;
}

/**
 * Get type of array.
 */
type Unpacked<T> = T extends (infer U)[] ? U : T;

export type ImporterImpromatElement = Unpacked<
  ElementsQuery["searchElements"]
>["element"];

async function fetchImpromatElements(client: GraphQLClient) {
  const allElements: ImporterImpromatElement[] = [];
  const batchSize = 100;

  console.time("fetch");
  for (let i = 0; ; i++) {
    const response = await client.request(fetchElementsQuery, {
      skip: i * batchSize,
      take: batchSize,
      input: {
        languageCode: "de",
      },
    });
    console.log("skip", i * batchSize);
    allElements.push(
      ...response.searchElements.map((result) => result.element)
    );
    console.log(
      `Iteration ${i}: loaded ${response.searchElements.length} elements (${allElements.length} total)`
    );
    if (response.searchElements.length < batchSize) {
      console.timeEnd("fetch");
      console.log("Finished loading.");
      break;
    }
  }

  // TODO we cannot currently filter for improbib elements in the original query.
  // Thus, we have to fetch all elements and then filter for elements that represent an improbib element
  const improbibElements = allElements.filter(
    (element) => element.improbibIdentifier
  );
  return improbibElements;
}
