export function removeMarkdownComments({ markdown }: { markdown: string }) {
  return { markdown: markdown.replaceAll(/<!--(.|\r?\n)*?-->/g, "") };
}
