import { Improbib } from "improbib";

export async function fetchImprovElements() {
  const result = await fetch("assets/improbib.json");
  const resultContent = await result.text();
  const resultJson = JSON.parse(resultContent) as Improbib;
  const elements = resultJson.elements;
  return elements;
}
