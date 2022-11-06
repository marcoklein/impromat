import { MdastRoot } from "rehype-remark/lib";
import { visit } from "unist-util-visit";
import { markdownParser } from "../common/markdown-parser";

/**
 * Parse markdown to extract all link nodes.
 * List all links as a new attribute called `outgoingLinks`.
 *
 * @param element Entry to process.
 * @returns Processed element.
 */
export async function extractOutgoingLinks<T extends { markdown: string }>(
  element: T,
): Promise<{
  outgoingLinks: Array<{ title: string | undefined; url: string }>;
}> {
  const outgoingLinks: Array<{ title: string | undefined; url: string }> = [];
  await markdownParser()
    .use(() => (mdast: MdastRoot) => {
      visit(mdast, "link", (node) => {
        const { url, title } = node;
        let titleText = title;
        if (!titleText) {
          visit(node, "text", (text) => {
            titleText = text.value;
          });
        }

        outgoingLinks.push({ title: titleText ?? undefined, url });
      });
    })
    .process(element.markdown);
  return {
    outgoingLinks,
  };
}
