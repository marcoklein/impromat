import { toBaseUrl } from "../common/to-base-url";

export function addBaseUrl({ sourceUrl }: { sourceUrl: string }) {
  return { baseUrl: toBaseUrl(sourceUrl) };
}
