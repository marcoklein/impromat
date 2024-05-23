import { LoginState } from './login-state';

export function parseLoginState(
  urlEncodedStateString: string | undefined,
): LoginState | undefined {
  if (!urlEncodedStateString) return undefined;
  try {
    const stateObject = JSON.parse(
      decodeURIComponent(urlEncodedStateString),
    ) as LoginState;

    // validate state object
    const validPathRegex = /^[a-zA-Z0-9-/]*$/;
    if (
      stateObject.pathAfterLogin &&
      (typeof stateObject.pathAfterLogin !== 'string' ||
        validPathRegex.test(stateObject.pathAfterLogin) === false)
    ) {
      console.error('Invalid state object', stateObject);
      return undefined;
    }

    return stateObject;
  } catch (e) {
    console.error('Failed to parse login state', e);
    return undefined;
  }
}
