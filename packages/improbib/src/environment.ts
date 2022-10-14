import process from "node:process";
import { getPackageJsonVersion } from "./version";

export const environment = {
  CACHE_PATH: process.env.CACHE_PATH ?? "./.html-cache",
  OUTPUT_FILE_PATH: process.env.OUTPUT_FILE_PATH ?? "./output/improbib.json",
  VERSION: process.env.VERSION ?? getPackageJsonVersion(),
};
