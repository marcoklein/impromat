import { visit } from "unist-util-visit";
import { markdownParser } from "../common/markdown-parser";
import { toAbsoluteUrl } from "../common/to-absolute-url";

export async function createAbsoluteUrls<
  T extends { baseUrl: string; markdown: string },
>(element: T): Promise<T> {
  const parserFile = await markdownParser()
    .use(() => (mdast: any) => {
      visit(mdast, "link", (node) => {
        node.url = toAbsoluteUrl(node.url, element.baseUrl);
      });
    })
    .process(element.markdown);
  return {
    ...element,
    markdown: parserFile.toString(),
  };
}
