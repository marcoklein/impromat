import { GraphQLClient } from "graphql-request";
import { ImprobibElement } from "improbib";
import { ImporterImpromatElement, fetchResources } from "./fetch-resources";
import { graphql } from "./graphql-client";
import {
  CreateElementInput,
  ElementVisibility,
} from "./graphql-client/graphql";

const createElementMutation = graphql(`
  mutation CreateElementMutation($input: CreateElementInput!) {
    createElement(input: $input) {
      id
    }
  }
`);

export async function writeImprobib(options: {
  endpoint: string;
  userName: string;
  accessToken: string;
  dryRun: boolean;
}) {
  const { client, improbibElements, impromatElements, myUserId } =
    await fetchResources(options);

  console.log(
    `improbib elements count = ${improbibElements.length}, impromat elements count = ${impromatElements.length}`
  );
  const newImprobibElements: ImprobibElement[] = [];
  for (const improbibElement of improbibElements) {
    const impromatElement = impromatElements.find(
      (impromatElement) =>
        impromatElement.improbibIdentifier === improbibElement.identifier
    );
    if (!impromatElement) {
      newImprobibElements.push(improbibElement);
    } else {
      if (impromatElement.snapshots.length > 0) {
        // console.log(`${impromatElement.name} has snapshots.`);
        if (
          impromatElement.snapshots.filter(
            (snapshot) => !snapshot.user || snapshot.user.id !== myUserId
          ).length > 0
        ) {
          // console.log(
          //   `Element ${impromatElement.name} was edited by an impromat user. Skipping possible updates.`
          // );
          continue;
        }
      }
      if (
        impromatElement.markdown &&
        improbibElement.markdown !== impromatElement.markdown
      ) {
        // console.log(
        //   `Updated description in ${improbibElement.sourceName} (${improbibElement.languageCode}): ${improbibElement.name}`
        // );
      }
    }
  }

  console.log(`New improbib elements: ${newImprobibElements.length}`);
  for (const improbibElement of newImprobibElements) {
    console.log(
      `Creating new impromat element ${improbibElement.name} from ${improbibElement.sourceName} (${improbibElement.sourceUrl})`
    );
    await createElementRequest(client, improbibElement, options.dryRun);
  }
}

async function createElementRequest(
  client: GraphQLClient,
  improbibElement: ImprobibElement,
  dryRun: boolean
) {
  const input: CreateElementInput = {
    name: improbibElement.name,
    languageCode: improbibElement.languageCode,
    markdown: improbibElement.markdown,

    improbibIdentifier: improbibElement.identifier,
    licenseName: improbibElement.licenseName,
    licenseUrl: improbibElement.licenseUrl,
    sourceBaseUrl: improbibElement.baseUrl,
    sourceName: improbibElement.sourceName,
    sourceUrl: improbibElement.sourceUrl,

    visibility: ElementVisibility.Public,
    tags: {
      set: improbibElement.tags.map((improbibElementTag) => ({
        name: improbibElementTag,
      })),
    },
  };
  // console.log("Sending create element request with input:", input);
  if (!dryRun) {
    await client.request(createElementMutation, {
      input,
    });
  }
}
