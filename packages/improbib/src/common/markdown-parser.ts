import remarkGfm from "remark-gfm";
import { remark } from "remark";

export function markdownParser() {
  return remark().use(remarkGfm);
}
