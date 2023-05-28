import process from "node:process";
import { getPackageJsonVersion } from "./version";

export const environment = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  VERSION: process.env.VERSION ?? getPackageJsonVersion(),
};
