import { identifier, once } from "./index";

// Fixes Error with Reflect.metadata
// https://stackoverflow.com/questions/72009995/typeerror-reflect-getmetadata-is-not-a-function
import "reflect-metadata";

describe("'once' decorator logic", () => {
  it("should call method once with single argument", () => {
    class TestClass {
      data: string | undefined;
      @once
      setData(newData: string) {
        this.data = newData;
      }
    }

    const test = new TestClass();
    test.setData("first string");
    test.setData("second string");
    expect(test.data).toBe("first string");
  });

  it("should call method once with multiple arguments", () => {
    class TestClass {
      user: { name: string; age: number } | undefined;
      @once
      setUser(name: string, age: number) {
        this.user = { name, age };
      }
    }

    const test = new TestClass();
    test.setUser("John", 22);
    test.setUser("Bill", 34);
    expect(test.user).toEqual({ name: "John", age: 22 });
  });

  it("should always return first execution result", () => {
    class TestClass {
      @once
      sayHello(name: string) {
        return `Hello ${name}!`;
      }
    }

    const test = new TestClass();
    test.sayHello("John");
    test.sayHello("Mark");
    expect(test.sayHello("new name")).toBe("Hello John!");
  });

  it('should always return "Decorated with once" from test method', () => {
    class TestClass {
      @once
      test(value: string) {
        return `Decorated with ${value}`;
      }
    }

    const test = new TestClass();
    test.test("once");
    test.test("memo");
    expect(test.test("test")).toBe("Decorated with once");
  });

  it("should always return 42 from multiply method", () => {
    class TestClass {
      @once
      multiply(a: number, b: number) {
        return a * b;
      }
    }

    const test = new TestClass();
    test.multiply(21, 2);
    expect(test.multiply(2, 2)).toBe(42);
  });
});

describe("'identifier' decorator logic", () => {
  it("should return Test-example from identify", () => {
    @identifier("example")
    class Test {}
    const test: any = new Test();
    const result = test.identify();
    expect(result).toBe("Test-example");
  });

  it("should return ClassA-prototype from identify", () => {
    @identifier("prototype")
    class ClassA {}
    const test: any = new ClassA();
    const result = test.identify();
    expect(result).toBe("ClassA-prototype");
  });

  it("should return TestClass-test from identify", () => {
    @identifier("test")
    class TestClass {}
    const test: any = new TestClass();
    const result = test.identify();
    expect(result).toBe("TestClass-test");
  });

  it("should return ExampleClass-some-value from identify", () => {
    @identifier("some-value")
    class ExampleClass {}
    const test: any = new ExampleClass();
    const result = test.identify();
    expect(result).toBe("ExampleClass-some-value");
  });
});
