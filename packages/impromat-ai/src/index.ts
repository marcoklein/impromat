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
import { LevelPromptDe, TagOutput, TimeEstimatePromptDe } from "./lib";
import { ComplexityPromptDe } from "./lib/prompts/complexity-prompt-de";
import { GradedComplexityPromptDe } from "./lib/prompts/graded-complexity-prompt-de";
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

  // const inputs = [
  //   Bauernregel,
  //   KoerperVerstecken,
  //   TheMovie,
  //   Fingerzeig,
  //   FolgeDemFolgenden,
  // ];

  // const inputs = [Freeze, Alltagsolympiade, Harold];

  let results: {
    input: typeof Harold;
    output: TagOutput[];
    message: string;
  }[] = [];
  for (const input of inputs) {
    const result = await processPrompt(new GradedComplexityPromptDe(input));
    console.log(`result for ${input.name}`, result);
    results.push({
      input,
      output: result.parsedResponse,
      message: result.message.content ?? "",
    });
  }

  console.log("results", results);

  let errorCount = 0;

  for (const result of results) {
    console.log();
    console.log();
    console.log(`## ${result.input.name}`);
    console.log();
    console.log(`### Expected Tags`);
    console.log(`${result.input.expectedLevelTags.join(", ")}`);
    console.log(`### Actual Tags`);
    console.log(`${result.output.map((t) => t.name).join(", ")}`);
    const expectedAndActualTagsMatch =
      result.input.expectedLevelTags.sort().join(",") ===
      result.output
        .map((o) => o.name)
        .sort()
        .join(",");
    if (expectedAndActualTagsMatch) {
      console.log(`✅ EXPECTED TAGS MATCH`);
    } else {
      errorCount++;
      console.log(`❌ EXPECTED TAGS DO NOT MATCH`);
      console.log(`Output: ${JSON.stringify(result, undefined, 2)}`);
      console.log();
    }
  }

  if (errorCount === 0) {
    console.log("✅ ALL TESTS PASSED");
  } else {
    console.log(
      `❌ TESTS FAILED with ${errorCount} unexpected tag predictions.`
    );
  }

  for (const result of results) {
    console.log(
      `${result.input.name}: ${result.output.map((t) => t.name).join(", ")}`
    );
  }
}
run();
