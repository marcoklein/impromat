const REGEX_PATH_NAME = /\w+(\.\w+)+.*/;

/**
 * Converts a url to a path name.
 *
 * @param url
 * @returns
 */
export function urlToPath(url: string) {
  return new RegExp(REGEX_PATH_NAME).exec(url)?.[0];
}
