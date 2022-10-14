export const environment = {
  API_URL:
    process.env.REACT_APP_API_URL ?? "https://api.impromat.marcoklein.dev",
  VERSION: process.env.REACT_APP_VERSION ?? "",
};
console.log("Loaded environment", environment);
