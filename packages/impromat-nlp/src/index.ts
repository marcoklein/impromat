import natural from "natural";
import * as readline from "readline";
import * as stopword from "stopword";
import { fetchResources } from "./fetch-resources";

const { impromatElements } = await fetchResources({
  endpoint: "http://localhost:8080/graphql",
  // endpoint: "https://api.impromat.app/graphql",
});

console.log(`Length of impromatElements: ${impromatElements.length}`);

console.log("Name", impromatElements[0].name);
console.log("Text", impromatElements[0].markdown);

const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();
const tokenizerDe = new natural.AggressiveTokenizerDe();
const stemmerDe = natural.PorterStemmerDe;

function preprocessingDe(text: string): string[] {
  const tokens = tokenizerDe.tokenize(text.toLowerCase());
  const filteredTokens = stopword.removeStopwords(tokens, stopword.deu);
  const stemmedTokens = filteredTokens.map((token) => stemmerDe.stem(token));
  return stemmedTokens;
}

const uniqueWords = new Set<string>();

impromatElements.forEach((element) => {
  // TODO find matches in titles separately to give it a higher weight
  // TODO find matches of tags separately to give it a higher weight
  const tokenizedMarkdown = preprocessingDe(
    `${element.name} ${element.tags.map((t) => t.name).join(", ")} ${
      element.markdown ?? ""
    }`
  );
  tfidf.addDocument(tokenizedMarkdown);
  const words = tokenizedMarkdown;
  words.forEach((word) => uniqueWords.add(word));
});

console.log("Sample Preprocessed:");
console.log(preprocessingDe(impromatElements[0].markdown ?? ""));

console.log("Sample TfIdf:");
console.log(
  tfidf
    .listTerms(0)
    .map((term) => term.term)
    .join(" ")
);

const allTerms: natural.TfIdfTerm[] = [];
for (let i = 0; i < impromatElements.length ?? 0; i++) {
  const terms = tfidf.listTerms(i).slice(0, 10);
  allTerms.push(...terms);
}
console.log("Most important terms:");
console.log(
  allTerms
    .sort((a, b) => b.tfidf - a.tfidf)
    .map((term) => term.term)
    .join(" ")
);

console.log("uniqueWords", uniqueWords.size);
console.log(Array.from(uniqueWords));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = async (query: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query, (ans) => resolve(ans)));
};

const main = async () => {
  let input: string = "";
  while (input !== "exit") {
    input = await askQuestion("Enter input or type exit to quit: ");
    console.log(`Matching documents for input: ${input}`);

    const preprocessedInput = preprocessingDe(input);
    // TODO filter out unknown words or search for similar words that are known (e.g. fuzzy search)
    const unknownWords = preprocessedInput.filter(
      (word) => !uniqueWords.has(word)
    );

    let result: { i: number; measure: number; key?: string }[] = [];
    tfidf.tfidfs(preprocessedInput, function (i, measure, key) {
      result.push({ i, measure, key });
    });
    const threshold = 0.1;
    result.sort((a, b) => a.measure - b.measure);
    result = result.filter((r) => r.measure > threshold);
    result.forEach((r) => {
      const element = impromatElements[r.i];
      // TODO mark text with preprocessed input
      let markedText = element.markdown?.toLowerCase() ?? "";
      for (const word of preprocessedInput) {
        markedText = markedText.replace(
          new RegExp(word, "gi"),
          (match) => `\x1b[33m${match}\x1b[0m`
        );
      }
      console.log(
        `\x1b[94mMeasure: ${r.measure}, Key: ${r.key}, Element: ${
          element.name
        }, Tags: ${element.tags.map((t) => t.name).join(", ")}\x1b[0m`
      );
      const lines = markedText
        ?.split("\n")
        .filter((line) => line.includes(`\x1b[33m${input}\x1b[0m`));
      console.log(`Marked Text: ${lines?.join("\n")}`);
      console.log();
    });
    console.log(`Number of results: ${result.length}`);
    console.log("unknownWords: ", unknownWords);
  }
  rl.close();
};

main();
