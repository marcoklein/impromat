import { ClientError, GraphQLClient } from 'graphql-request';
import { Improbib } from 'improbib';
import { graphql } from './graphql-client';
import { ElementsQuery } from './graphql-client/graphql';
import fs from 'node:fs/promises';

const graphqlPath = '/graphql';
const loginPath = '/auth/login';

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
  query Elements($skip: Int!, $take: Int!) {
    searchElements(skip: $skip, take: $take) {
      element {
        ...ElementFields
        snapshots {
          id
          user {
            id
          }
          element {
            ...ElementFields
          }
        }
      }
    }
  }
`);

export type ImpromatElementType = Awaited<
  ReturnType<typeof fetchImpromatElements>
>;

export async function fetchResources(options: {
  endpoint: string;
  userName: string;
  accessToken: string;
}) {
  const client = await createSignedInGraphQLClient(options);
  const myUserId = await fetchMyUserId(client);
  const impromatElements = await fetchImpromatElements(client);
  const improbibElements = await fetchImprobibElements();

  return {
    client,
    myUserId,
    improbibElements,
    impromatElements,
  };
}

async function fetchMyUserId(client: GraphQLClient): Promise<string> {
  try {
    const response = await client.request(fetchMyUserIdQuery);
    return response.me.id;
  } catch (e) {
    if (e instanceof ClientError) {
      console.log('Error: ', e);
      console.error('Access denied. Access token correct?');
      process.exit(1);
    }
    throw e;
  }
}

async function fetchImprobibElements() {
  const improbibJson = await fs.readFile('../improbib/output/improbib.json');
  const improbib = JSON.parse(improbibJson.toString('utf8')) as Improbib;
  return improbib.elements.sort((a, b) => a.name.localeCompare(b.name));
}

async function createSignedInGraphQLClient(options: {
  endpoint: string;
  userName: string;
  accessToken: string;
}) {
  const signInResponse = await fetch(`${options.endpoint}${loginPath}`, {
    method: 'post',
    body: JSON.stringify({
      name: options.userName,
      accessToken: options.accessToken,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (signInResponse.status !== 200) {
    console.log('Login response:', signInResponse);
    throw new Error('Login invalid. Credentials correct?');
  }
  const response = await signInResponse.json();

  const client = new GraphQLClient(`${options.endpoint}${graphqlPath}`, {
    headers: response,
  });
  return client;
}

/**
 * Get type of array.
 */
type Unpacked<T> = T extends (infer U)[] ? U : T;

export type ImporterImpromatElement = Unpacked<
  ElementsQuery['elements']
>['element'];

async function fetchImpromatElements(client: GraphQLClient) {
  const allElements: ImporterImpromatElement[] = [];
  const batchSize = 100;

  console.time('fetch');
  for (let i = 0; ; i++) {
    const response = await client.request(fetchElementsQuery, {
      skip: i * batchSize,
      take: batchSize,
    });
    console.log('skip', i * batchSize);
    allElements.push(...response.elements.map((result) => result.element));
    console.log(
      `Iteration ${i}: loaded ${response.elements.length} elements (${allElements.length} total)`
    );
    if (response.elements.length < batchSize) {
      console.timeEnd('fetch');
      console.log('Finished loading.');
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
