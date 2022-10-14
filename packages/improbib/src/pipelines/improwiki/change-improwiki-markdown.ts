import { TransformerChain } from "../../common/transformer-chain";

export async function changeImprowikiMarkdown(input: {
  markdown: string;
  sourceUrl: string;
}) {
  if (!input.sourceUrl.includes("improwiki")) return;

  const improwikiMarkdown = TransformerChain.create<{ markdown: string }>()
    .apply(removeEditLinksRule)
    .apply(removeFilmbeispieleRule)
    .apply(removeSeeAlsoInlineRule)
    .apply(removeSeeAlsoLineRule)
    .apply(removeSeeAlsoSectionRule)
    .apply(removeVerwandtRule)
    .apply(removeTableOfContentsRule)
    .apply(replaceLinksRule);

  return improwikiMarkdown.run(input);
}

const REMOVE_EDIT_LINKS = /^\[edit]\(.*\/edit\)(\r?\n\r?\n)?/gm;
const REMOVE_FILMBEISPIELE = /^#{2,3} Filmbeispiel([^#])*/gm;
const REGEX_REMOVE_SEE_ALSO_LINE = /^_?[Ss]iehe [Aa]uch_?.*$$/gm;
const REGEX_REMOVE_SEE_ALSO_INLINE =
  / \(_?[Ss]iehe [Aa]uch_?.*?(\(.*?\)).*?\)/g;
const REGEX_REMOVE_SEE_ALSO_SECTION = /^#{2,3} [Ss]iehe [Aa]uch([^#])*/gm;
const REMOVE_TABLE_OF_CONTENTS = /(^#{2,3} Inhaltsverzeichnis(.|\n)*^)(#)/gm;
const REMOVE_VERWANDT = /^#{2,3} Verwandt([^#])*/gm;
const REPLACE_LINKS = /\[(.*?)]\(.*?\)/gm;

export const removeEditLinksRule = createRegexReplaceRule(REMOVE_EDIT_LINKS);
export const removeFilmbeispieleRule =
  createRegexReplaceRule(REMOVE_FILMBEISPIELE);
export const removeSeeAlsoLineRule = createRegexReplaceRule(
  REGEX_REMOVE_SEE_ALSO_LINE,
);
export const removeSeeAlsoInlineRule = createRegexReplaceRule(
  REGEX_REMOVE_SEE_ALSO_INLINE,
);
export const removeSeeAlsoSectionRule = createRegexReplaceRule(
  REGEX_REMOVE_SEE_ALSO_SECTION,
);
export const removeVerwandtRule = createRegexReplaceRule(REMOVE_VERWANDT);
export const removeTableOfContentsRule = createRegexReplaceRule(
  REMOVE_TABLE_OF_CONTENTS,
  "$3",
);
export const replaceLinksRule = createRegexReplaceRule(REPLACE_LINKS, "$1");

export const DEFAULT_PREPARATION_RULES = [
  removeEditLinksRule,
  removeFilmbeispieleRule,
  removeSeeAlsoInlineRule,
  removeSeeAlsoLineRule,
  removeSeeAlsoSectionRule,
  removeVerwandtRule,
  removeTableOfContentsRule,
  replaceLinksRule,
];

/**
 * Helper to create a rule based on a regex.
 *
 * @param regex Regex matches that will be removed.
 * @param replaceWith Text to replace regex with. You can also reference match groups with eg $1.
 * @returns PreparationRule that you can use to prepare a workshop element.
 */
function createRegexReplaceRule(regex: RegExp, replaceWith = "") {
  return (element: { markdown: string }) => {
    return { markdown: element.markdown.replaceAll(regex, replaceWith) };
  };
}
