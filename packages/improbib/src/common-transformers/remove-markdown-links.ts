export function removeMarkdownLinks(input: { markdown: string }) {
  const removeMarkdownLinksRegex = /\[(.*?)\]\(.*?\)/gm;
  return {
    markdown: input.markdown.replaceAll(
      removeMarkdownLinksRegex,
      (_match, $1) => $1,
    ),
  };
}
