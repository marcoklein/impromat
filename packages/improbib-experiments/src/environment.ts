import process from "node:process";
import { getPackageJsonVersion } from "./version";

export const environment = {
  INPUT_FILE_PATH: process.env.INPUT_FILE_PATH ?? "./assets/improbib.json",
  VERSION: process.env.VERSION ?? getPackageJsonVersion(),
};
