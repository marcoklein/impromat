import * as fs from "fs/promises";
import { Improbib } from "improbib";
import { environment } from "./environment";

export async function loadImprobibFromFile() {
  const file = await fs.readFile(`${environment.INPUT_FILE_PATH}`);
  const jsonInput = file.toString();
  const improbib = JSON.parse(jsonInput) as Improbib;
  return improbib;
}
