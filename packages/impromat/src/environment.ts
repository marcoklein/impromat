import { version } from "./version.gen";

function defaultIfEmpty(value: string | undefined, defaultValue: string) {
  if (!value || value.trim().length <= 0) {
    return defaultValue;
  }
  return value;
}

function getApiUrl() {
  const envApiUrl = import.meta.env.VITE_API_URL;
  if (envApiUrl) return envApiUrl;

  return `${window.location.protocol}//api.${window.location.hostname}`;
}

export const environment = {
  API_URL: getApiUrl(),
  VERSION: defaultIfEmpty(import.meta.env.VITE_VERSION, version),
};
console.log("Loaded environment", environment);
