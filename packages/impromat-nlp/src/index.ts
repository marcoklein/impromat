import { ImpromatApiExtractor } from "./extract/extract-api";
import { extractKeywordsFromDocument } from "./transform/keywords";

async function main() {
  const loader = new ImpromatApiExtractor();
  loader.languageCode = "en";

  let document = await loader.extractNext();

  console.log(document?.markdown);
  if (!document) {
    console.log("No document found");
    return;
  }

  const result = await extractKeywordsFromDocument(document);
  console.log(result);

  document = await loader.extractNext();
}

async function mainExtractKeywordsFromAllElements() {
  const loader = new ImpromatApiExtractor();
  loader.languageCode = "en";

  let document = await loader.extractNext();
  let bigMarkdown = document?.markdown ?? "";

  while (document) {
    console.log(document?.markdown);
    if (!document) {
      console.log("No document found");
      return;
    }

    document = await loader.extractNext();
    bigMarkdown += document?.markdown ?? "";
  }

  const result = await extractKeywordsFromDocument({
    id: "id",
    name: "name",
    markdown: bigMarkdown,
  });
  console.log(result);
}
mainExtractKeywordsFromAllElements();
