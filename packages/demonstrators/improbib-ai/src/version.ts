import fs from "node:fs";

export function getPackageJsonVersion() {
  const version: string = JSON.parse(
    fs.readFileSync("./package.json").toString()
  ).version as string;
  return version;
}
