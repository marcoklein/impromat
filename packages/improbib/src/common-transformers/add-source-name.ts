const SOURCE_NAME_FROM_BASE_URL_REGEX = /(\w*)\.\w*$/;

/**
 * Source name is the domain name of the baseUrl without extensions.
 * E.g. `improwiki`, `improvencyclopedia`.
 *
 * @param entry
 * @returns
 */
export function addSourceName(entry: { sourceName: string; baseUrl: string }) {
  if (entry.sourceName.length > 0) return {};

  const regexResult = new RegExp(SOURCE_NAME_FROM_BASE_URL_REGEX).exec(
    entry.baseUrl,
  );
  if (regexResult === null) {
    throw new Error(
      `Could not extract sourceName from baseUrl="${entry.baseUrl}"`,
    );
  }

  return {
    sourceName: regexResult[1],
  };
}
