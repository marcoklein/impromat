import { version } from "./version.gen";

function defaultIfEmpty(value: string | undefined, defaultValue: string) {
  if (!value || value.trim().length <= 0) {
    return defaultValue;
  }
  return value;
}

export const environment = {
  API_URL: process.env.REACT_APP_API_URL ?? "https://api.impromat.app",
  VERSION: defaultIfEmpty(process.env.REACT_APP_VERSION, version),
};
console.log("Loaded environment", environment);
