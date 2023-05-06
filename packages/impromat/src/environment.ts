import { version } from "./version.gen";

function defaultIfEmpty(value: string | undefined, defaultValue: string) {
  if (!value || value.trim().length <= 0) {
    return defaultValue;
  }
  return value;
}

export const environment = {
  API_URL: import.meta.env.VITE_API_URL ?? "https://api.impromat.app",
  VERSION: defaultIfEmpty(import.meta.env.VITE_VERSION, version),
};
console.log("Loaded environment", environment);
