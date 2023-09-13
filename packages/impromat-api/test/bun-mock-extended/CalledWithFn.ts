import { AnyFunction } from 'bun';
import { Mock, jest } from 'bun:test';
import { Matcher, MatchersOrLiterals } from './Matchers';
import { CalledWithMock } from './Mock';

interface CalledWithStackItem<T extends AnyFunction, Y extends any[]> {
  args: MatchersOrLiterals<Y>;
  calledWithFn: Mock<T>;
}

interface JestAsymmetricMatcher {
  asymmetricMatch(...args: any[]): boolean;
}
function isJestAsymmetricMatcher(obj: any): obj is JestAsymmetricMatcher {
  return (
    !!obj &&
    typeof obj === 'object' &&
    'asymmetricMatch' in obj &&
    typeof obj.asymmetricMatch === 'function'
  );
}

const checkCalledWith = <T extends AnyFunction, Y extends any[]>(
  calledWithStack: CalledWithStackItem<T, Y>[],
  actualArgs: Y,
  fallbackMockImplementation?: (...args: Y) => T,
): T => {
  const calledWithInstance = calledWithStack.find((instance) =>
    instance.args.every((matcher, i) => {
      if (matcher instanceof Matcher) {
        return matcher.asymmetricMatch(actualArgs[i]);
      }

      if (isJestAsymmetricMatcher(matcher)) {
        return matcher.asymmetricMatch(actualArgs[i]);
      }

      return actualArgs[i] === matcher;
    }),
  );

  // @ts-ignore cannot return undefined, but this will fail the test if there is an expectation which is what we want
  return calledWithInstance
    ? calledWithInstance.calledWithFn(...(actualArgs as any))
    : fallbackMockImplementation && fallbackMockImplementation(...actualArgs);
};

export const calledWithFn = <T extends AnyFunction, Y extends any[]>({
  fallbackMockImplementation,
}: { fallbackMockImplementation?: (...args: Y) => T } = {}): CalledWithMock<
  T,
  Y
> => {
  const fn: Mock<any> = jest.fn(fallbackMockImplementation);
  let calledWithStack: CalledWithStackItem<T, Y>[] = [];

  (fn as CalledWithMock<any, any>).calledWith = (...args) => {
    // We create new function to delegate any interactions (mockReturnValue etc.) to for this set of args.
    // If that set of args is matched, we just call that jest.fn() for the result.
    const calledWithFn = jest.fn(fallbackMockImplementation);
    const mockImplementation = fn.getMockImplementation();
    if (
      !mockImplementation ||
      mockImplementation === fallbackMockImplementation
    ) {
      // Our original function gets a mock implementation which handles the matching
      fn.mockImplementation((...args: Y) =>
        checkCalledWith(calledWithStack, args, fallbackMockImplementation),
      );
      calledWithStack = [];
    }
    calledWithStack.unshift({ args, calledWithFn: calledWithFn as any });

    return calledWithFn;
  };

  return fn as unknown as CalledWithMock<T, Y>;
};

export default calledWithFn;
