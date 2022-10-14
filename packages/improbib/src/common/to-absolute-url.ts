export function toAbsoluteUrl(url: string, baseUrl: string) {
  if (url.startsWith("/")) return `${baseUrl}${url}`;
  if (url.startsWith("./") || url.startsWith("../")) {
    throw new Error("Not implemented yet: Url starts relatively: " + url);
  }

  return url;
}
