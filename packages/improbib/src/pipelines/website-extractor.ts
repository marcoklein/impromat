import { load, CheerioAPI } from "cheerio";
import { getPageCached } from "../common/get-page-cached";

export class WebsiteExtractor {
  async extract(url: string): Promise<{ html: string; $: CheerioAPI }> {
    const page = await getPageCached(url);
    if (!page) throw new Error(`Page ${url} not found.`);
    return { html: page.content, $: load(page.content) };
  }
}
