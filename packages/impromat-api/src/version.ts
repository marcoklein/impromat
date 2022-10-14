import fs from "fs";

export function getPackageJsonVersion() {
  const version = JSON.parse(
    fs.readFileSync("./package.json").toString()
  ).version;
  return version;
}
