import { diffChars } from "diff";
import { GraphQLClient } from "graphql-request";
import { ImprobibElement } from "improbib";
import { ImpromatElementType, fetchResources } from "./fetch-resources";

/**
 * Finds difference between loaded improbib in Impromat and improbib from improbib.json.
 * Only compares differences, without writing to the database.
 */
export async function diffImprobib(options: {
  endpoint: string;
  userName: string;
  accessToken: string;
}) {
  const { client, improbibElements, impromatElements, myUserId } =
    await fetchResources(options);

  showDiff(client, myUserId, impromatElements, improbibElements);
}

async function showDiff(
  client: GraphQLClient,
  myUserId: string,
  impromatElements: ImpromatElementType,
  improbibElements: ImprobibElement[]
) {
  for (const improbibElement of improbibElements) {
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
