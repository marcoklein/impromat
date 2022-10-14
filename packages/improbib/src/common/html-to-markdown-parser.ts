import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import remarkGfm from "remark-gfm";
import { unified } from "unified";

export const htmlToMarkdownParser = unified()
  .use(rehypeParse)
  .use(rehypeRemark)
  .use(remarkGfm)
  .use(remarkStringify);
