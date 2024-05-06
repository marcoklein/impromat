import { parseLoginState } from './parse-login-state';

describe('parseLoginState', () => {
  it('should return undefined for empty input', () => {
    // given
    const urlEncodedStateString = undefined;

    // when
    const result = parseLoginState(urlEncodedStateString);

    // then
    expect(result).toBeUndefined();
  });

  it('should return undefined for invalid state object', () => {
    // given
    const urlEncodedStateString = 'invalidStateObject';

    // when
    const result = parseLoginState(urlEncodedStateString);

    // then
    expect(result).toBeUndefined();
  });

  it('should return parsed login state for valid input', () => {
    // given
    const urlEncodedStateString = encodeURIComponent(
      JSON.stringify({ pathAfterLogin: '/dashboard/d123-123123tufu' }),
    );

    // when
    const result = parseLoginState(urlEncodedStateString);

    // then
    expect(result).toEqual({ pathAfterLogin: '/dashboard/d123-123123tufu' });
  });
});
