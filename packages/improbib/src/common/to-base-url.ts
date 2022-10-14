export function toBaseUrl(url: string) {
  /**
   * Returns domain name including protocol to generate absolute urls.
   */
  const REGEX_DOMAIN_NAME = /^(\w*:\/\/)?[\w.]+/;
  const baseDomain = new RegExp(REGEX_DOMAIN_NAME).exec(url)?.[0];
  if (baseDomain === undefined) {
    throw new Error(`baseDomain undefined ${url}`);
  }

  return baseDomain;
}
