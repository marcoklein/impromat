import { AnyFunction } from 'bun';
import { mock, Mock } from 'bun:test';

type MockedType<T> = T extends new (...args: any[]) => infer R ? R : T;

export type MockedObjectType<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any ? Mock<T[P]> : T[P];
};

function mockFunctionCalls<T extends object>(obj: T): any {
  const mockedObj: Record<string, Mock<AnyFunction>> = {};
  for (const key of Object.getOwnPropertyNames(
    Object.getPrototypeOf(new obj()),
  )) {
    mockedObj[key] = mock(async () => 'mocked');
  }
  // for (const key of Object.keys(obj)) {
  //   if (typeof obj[key] === 'function') {
  //     mockedObj[key] = mock(async () => 'mocked');
  //   } else {
  //     mockedObj[key] = obj[key];
  //   }
  // }
  return mockedObj;
}

export function mockObjectFunctions<T extends object>(
  obj: T,
): MockedObjectType<MockedType<T>> {
  return mockFunctionCalls<T>(obj);
}
