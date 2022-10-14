import path from "node:path";
import fs from "node:fs/promises";
import { environment } from "../environment";
import { createLogger } from "../logger";
import { urlToPath } from "./url-to-path";
import { requestPageContent } from "./request-page-content";
import { isFileExisting } from "./is-file-existing";

const logger = createLogger("page-cache");

interface CacheData {
  source: "cache" | "request";
  redirectedToUrl: string | undefined;
}

export async function getPageCached(url: string): Promise<
  | {
      cache: CacheData;
      content: string;
    }
  | undefined
> {
  const urlPath = urlToPath(url);
  if (urlPath === undefined)
    throw new Error(`Cannot convert url ${url} to path`);
  const cachePath = path.join(environment.CACHE_PATH, urlPath) + ".html";

  if (await isFileExisting(cachePath)) {
    logger.log(`File for ${url} cached.`);
    const file = await fs.readFile(cachePath);
    const content = file.toString("utf8");
    const cache: CacheData = {
      source: "cache",
      redirectedToUrl: undefined, // TODO load from metadata
    };
    return {
      cache,
      content,
    };
  }

  logger.log(`Loading ${url} through request.`);
  const page = await requestPageContent(url);
  if (!page) {
    return undefined;
  }

  const { redirectedToUrl, content } = page;
  await fs.mkdir(path.dirname(cachePath), { recursive: true });
  await fs.writeFile(cachePath, content);

  const cache: CacheData = {
    source: "request",
    redirectedToUrl,
  };
  return {
    cache,
    content,
  };
}
