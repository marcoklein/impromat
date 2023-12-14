import { toString } from "nlcst-to-string";
import { retext } from "retext";
import retextKeywords from "retext-keywords";
import retextPos from "retext-pos";
import { DocumentModel } from "../model";

export async function extractKeywordsFromDocument(
  documentModel: DocumentModel
) {
  const text = documentModel.markdown;

  const file = await retext()
    .use(retextPos) // Make sure to use `retext-pos` before `retext-keywords`.
    .use(retextKeywords, { maximum: 50 })
    .process(text);

  console.log("Keywords:");

  const keywords = file.data.keywords?.map((keyword) => {
    return {
      text: toString(keyword.matches[0].node),
      stem: keyword.stem,
      score: keyword.score,
    };
  });

  const keyphrases = file.data.keyphrases?.map((phrase) => {
    return {
      text: toString(phrase.matches[0].nodes),
      score: phrase.score,
    };
  });

  if (file.data.keywords) {
    for (const keyword of file.data.keywords) {
      console.log(toString(keyword.matches[0].node));
    }
  }

  console.log();
  console.log("Key-phrases:");

  if (file.data.keyphrases) {
    for (const phrase of file.data.keyphrases) {
      console.log(toString(phrase.matches[0].nodes));
    }
  }
  return { keywords: keywords ?? [], keyphrases: keyphrases ?? [] };
}
