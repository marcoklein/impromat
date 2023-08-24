import {
  Alltagsolympiade,
  Bauernregel,
  Fingerzeig,
  FolgeDemFolgenden,
  Freeze,
  Harold,
  Johannes,
  KoerperVerstecken,
  StrangersInTheNight,
  TheMovie,
} from "./experiments/data";
import { TagOutput } from "./lib";
import { GradedLevelPromptEn } from "./lib/prompts/graded-level-prompt-en";
import { processPrompt } from "./lib/utils";

async function run() {
  const inputs = [
    Bauernregel,
    KoerperVerstecken,
    Freeze,
    TheMovie,
    Johannes,
    Harold,
    StrangersInTheNight,
    Alltagsolympiade,
    FolgeDemFolgenden,
    Fingerzeig,
  ];

  let results: {
    input: Partial<typeof Johannes>;
    output: TagOutput[];
    message: string;
  }[] = [];
  for (const input of inputs) {
    // input.markdown = input.markdownEn;
    const result = await processPrompt(new GradedLevelPromptEn(input));
    console.log(`result for ${input.name}`, result);
    results.push({
      input,
      output: result.parsedResponse,
      message: result.message.content ?? "",
    });
  }

  for (const result of results) {
    console.log(
      `${result.input.name}: ${result.output.map((t) => t.name).join(", ")}`
    );
  }
}
run();
