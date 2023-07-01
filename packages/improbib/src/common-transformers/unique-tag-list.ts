export function uniqueTagList({ tags }: { tags: string[] }) {
  const uniqueTags: Record<string, string> = {};
  for (const tag of tags) {
    uniqueTags[tag] = tag;
  }

  return { tags: Object.values(uniqueTags).sort() };
}
