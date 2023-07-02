import { diffChars } from "diff";
import { GraphQLClient } from "graphql-request";
import { Improbib } from "improbib";
import fs from "node:fs/promises";
import { graphql } from "./graphql-client";
import { ElementsQuery } from "./graphql-client/graphql";

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
    elements(skip: $skip, take: $take) {
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

const endpoint = "http://localhost:8080/graphql";

/**
 * Finds difference between loaded improbib in Impromat and improbib from improbib.json.
 * Only compares differences, without writing to the database.
 */
export async function diffImprobib() {
  const client = await createSignedInGraphQLClient();
  const myUserId = await fetchMyUserId(client);
  const impromatElements = await fetchImpromatElements(client);
  const improbibElements = await fetchImprobibElements();

  for (const improbibElement of improbibElements.sort((a, b) =>
    a.name.localeCompare(b.name)
  )) {
    const impromatElement = impromatElements.find(
      (impromatElement) =>
        impromatElement.improbibIdentifier === improbibElement.identifier
    );
    if (!impromatElement) {
      console.log(
        `New element in ${improbibElement.sourceName} (${improbibElement.languageCode}): ${improbibElement.name}`
      );
    } else {
      if (impromatElement.snapshots.length > 0) {
        console.log(`${impromatElement.name} has snapshots.`);
        if (
          impromatElement.snapshots.filter(
            (snapshot) => !snapshot.user || snapshot.user.id !== myUserId
          ).length > 0
        ) {
          console.log(
            `Element ${impromatElement.name} was edited by an impromat user. Skipping possible updates.`
          );
        }
      }
      if (
        impromatElement.markdown &&
        improbibElement.markdown !== impromatElement.markdown
      ) {
        console.log(
          `Updated description in ${improbibElement.sourceName} (${improbibElement.languageCode}): ${improbibElement.name}`
        );
        const diff = diffChars(
          impromatElement.markdown,
          improbibElement.markdown
        );
        for (const diffPart of diff) {
          const reset = "\x1b[0m";
          const green = "\x1b[32m";
          const red = "\x1b[31m";
          const gray = `\x1b[90m`;
          const color = diffPart.added ? green : diffPart.removed ? red : gray;
          process.stdout.write(color + diffPart.value + reset);
        }
        console.log();
      }
    }
  }

  for (const impromatElement of impromatElements) {
    const improbibElement = improbibElements.find(
      (improbibElement) =>
        improbibElement.identifier === impromatElement.improbibIdentifier
    );
    if (!improbibElement) {
      console.log(`Deleted element (${impromatElement.name})`);
    }
  }
}

async function fetchMyUserId(client: GraphQLClient) {
  const response = await client.request(fetchMyUserIdQuery);
  return response.me.id;
}

async function fetchImprobibElements() {
  const improbibJson = await fs.readFile("../improbib/output/improbib.json");
  const improbib = JSON.parse(improbibJson.toString("utf8")) as Improbib;
  return improbib.elements;
}

async function createSignedInGraphQLClient() {
  const signInResponse = await fetch(
    "http://localhost:8080/auth/testlogin?userId=improbib-test"
  );
  const cookie = await signInResponse.text();
  console.log(cookie);

  const client = new GraphQLClient(endpoint, {
    headers: { Cookie: `connect.sid=s:${cookie}` },
  });
  return client;
}

/**
 * Get type of array.
 */
type Unpacked<T> = T extends (infer U)[] ? U : T;

async function fetchImpromatElements(client: GraphQLClient) {
  const allElements: Unpacked<ElementsQuery["elements"]>["element"][] = [];
  const batchSize = 100;

  console.time("fetch");
  for (let i = 0; ; i++) {
    const response = await client.request(fetchElementsQuery, {
      skip: i * batchSize,
      take: batchSize,
    });
    console.log("skip", i * batchSize);
    allElements.push(...response.elements.map((result) => result.element));
    console.log(
      `Iteration ${i}: loaded ${response.elements.length} elements (${allElements.length} total)`
    );
    if (response.elements.length < batchSize) {
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
