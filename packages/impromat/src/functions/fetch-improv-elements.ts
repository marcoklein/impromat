import { ImprovElement } from "../models/improv-element";

export async function fetchImprovElements() {
  const result = await fetch("assets/improbib.json");
  const resultContent = await result.text();
  const resultJson = JSON.parse(resultContent) as ImprovElement[];
  return resultJson;
}
