export function trimMarkdown(input: { markdown: string }) {
  return { markdown: input.markdown.trim() };
}
