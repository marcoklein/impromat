import { getPackageJsonVersion } from './version';

export const environment = {
  SESSION_MAX_AGE: parseInt(
    process.env.SESSION_MAX_AGE ?? `${12 * 30 * 24 * 60 * 60 * 1000}`,
  ),
  SESSION_SECRET: process.env.SESSION_SECRET ?? '',
  VERSION: process.env.VERSION ?? getPackageJsonVersion(),
  PORT: parseInt(process.env.PORT ?? '8080'),
  STORAGE_PATH: process.env.STORAGE_PATH ?? 'storage',
  /**
   * Path to the JSON file holding authentication information for Google authentication.
   */
  GOOGLE_AUTH_JSON_PATH:
    process.env.GOOGLE_AUTH_JSON_PATH ?? 'assets/google.auth.json',
  GOOGLE_AUTH_CLIENT_SECRET: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
  GOOGLE_AUTH_REDIRECT_URL: process.env.GOOGLE_AUTH_REDIRECT_URL,
};
