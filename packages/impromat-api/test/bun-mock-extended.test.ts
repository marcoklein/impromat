import { describe, expect, it } from 'bun:test';
import { mockObjectFunctions } from './bun-mock-extended';

class MyClass {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  setValue(value: number): void {
    this.value = value;
  }
}

describe('mockObjectFunctions', () => {
  it('should mock all functions in an object', () => {
    const obj = {
      foo: () => 'foo',
      bar: () => 'bar',
      baz: 'baz',
    };

    const mockedObj = mockObjectFunctions(obj);

    expect(mockedObj.foo).toBeInstanceOf(Function);
    expect(mockedObj.bar).toBeInstanceOf(Function);
    expect(mockedObj.baz).toBe('baz');

    mockedObj.foo.mockReturnValue('mocked foo');
    mockedObj.bar.mockReturnValue('mocked bar');

    expect(mockedObj.foo()).toBe('mocked foo');
    expect(mockedObj.bar()).toBe('mocked bar');
  });

  it('should mock all functions in a class instance', () => {
    const myClass = new MyClass(42);

    const mockedMyClass = mockObjectFunctions(myClass);

    expect(mockedMyClass.getValue).toBeInstanceOf(Function);
    expect(mockedMyClass.setValue).toBeInstanceOf(Function);
    expect(mockedMyClass.getValue()).toBe('mocked');

    mockedMyClass.getValue.mockReturnValue(24);
    mockedMyClass.setValue.mockImplementation((value: number) => {
      mockedMyClass.getValue.mockReturnValue(value);
    });

    expect(mockedMyClass.getValue()).toBe(24);
  });

  it('should list object keys', () => {
    const obj = new MyClass(42);
    const keys = Object.keys(obj);
    expect(keys).toEqual(['value']);
  });

  it('should list object functions', () => {
    const obj = MyClass;
    // const allKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
    const allKeys = Object.getOwnPropertyNames(
      Object.getPrototypeOf(obj.prototype),
    );

    expect(allKeys).toContain('getValue');
    expect(allKeys).toContain('setValue');
  });

  it('should mock object class', () => {
    // given
    const clazz = MyClass;

    // when
    const deepMock = mockObjectFunctions(clazz);

    // then
    expect(deepMock.getValue).toBeInstanceOf(Function);
    expect(deepMock.setValue).toBeInstanceOf(Function);
  });
});
