import { GraphQLClient } from 'graphql-request';

import { graphql } from '@/graphql-client';

export default async function SSRTest() {
  const SearchElementTabQuery = graphql(`
    query SearchElements($input: ElementSearchInput!) {
      searchElements(input: $input) {
        element {
          id
          name
        }
      }
    }
  `);
  const graphQLClient = new GraphQLClient('http://localhost:8080/graphql', {
    credentials: 'include',
    mode: 'cors',
  });
  const data = await graphQLClient.request(SearchElementTabQuery, {
    input: { text: 'freeze', limit: 1 },
  });
  // const data = use(
  //   graphQLClient.request(SearchElementTabQuery, {
  //     input: { text: 'freeze', limit: 1 },
  //   })
  // );

  return <>{data?.searchElements.map((e) => e.element.name)}</>;
}
