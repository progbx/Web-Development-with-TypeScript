# Decorators

Decorators are a powerful and flexible feature in TypeScript, allowing developers to extend and modify the behavior of classes, methods, properties, and parameters in a declarative way. They are a form of special syntax in TypeScript that allows for an element such as a class or method to be annotated or transformed. Essentially, decorators provide a way to add both annotations and meta-programming syntax to class declarations and members. They have been proposed as a feature for JavaScript and are available in TypeScript as an experimental feature.

In this lesson, you will learn how to work with decorators to modify and enhance TypeScript code.

## After completing this lesson, you will be able to

- Describe the concept of decorators in TypeScript and how they are used
- Apply decorators to various elements, including classes, methods, properties, and parameters
- Develop custom decorators to enhance the behavior of classes and methods

It will take you about **2 hours and 30 minutes** to complete this lesson: 1 hour and 30 minutes to go through the **theoretical material** and 1 hour to complete the **practice**.

## Theoretical material

You can use the following resources to complete the practical task:

1. ["Decorators: introduction"](https://www.typescriptlang.org/docs/handbook/decorators.html#introduction) (study time: **5 min**)
2. ["What are decorators and why are they helpful?"](https://www.linkedin.com/learning/typescript-essential-training-14687057/what-are-decorators-and-why-are-they-helpful) (duration: **5 min**)
3. ["Decorator factories"](https://www.typescriptlang.org/docs/handbook/decorators.html#decorator-factories) (study time: **5 min**)
4. ["Creating decorator factories"](https://www.linkedin.com/learning/typescript-essential-training-14687057/creating-decorator-factories) (duration: **2 min**)
5. ["Decorator composition"](https://www.typescriptlang.org/docs/handbook/decorators.html#decorator-composition) (study time: **5 min**)
6. ["Class decorators"](https://www.typescriptlang.org/docs/handbook/decorators.html#class-decorators) (study time: **5 min**)
7. ["Creating a class decorator"](https://www.linkedin.com/learning/typescript-essential-training-14687057/creating-a-class-decorator) (duration: **6.5 min**)
8. ["Method decorators"](https://www.typescriptlang.org/docs/handbook/decorators.html#method-decorators) (study time: **5 min**)
9. ["Creating a method decorator"](https://www.linkedin.com/learning/typescript-essential-training-14687057/creating-a-method-decorator) (duration: **5 min**)
10. ["Property decorators"](https://www.typescriptlang.org/docs/handbook/decorators.html#property-decorators) (study time: **5 min**)
11. ["Creating a property decorator"](https://www.linkedin.com/learning/typescript-essential-training-14687057/creating-a-property-decorator) (duration: **3 min**)
12. ["Parameter decorators"](https://www.typescriptlang.org/docs/handbook/decorators.html#parameter-decorators) (study time: **5 min**)
13. ["Decorators in TypeScript 5.0"](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators) (study time: **15 min**)
14. ["A complete guide to TypeScript decorators"](https://mirone.me/a-complete-guide-to-typescript-decorator/) (study time: **15 min**)

## Task Description

This task should take you about **1 hour**.  
Please be aware that the task is **mandatory**.

- Please, put all your code into `src/index.ts` file.
- Please, export types/functions that are supposed to be exported by task description.
- All functions have to be defined as Function Declaration and have to be exported like this:

```ts
export function foo(/_ parameters _/) {
// your code
}
```

### Once decorator

Implement the function decorator `once`, which allows a decorated method to be executed only once.

1. The function should take three parameters: `target`, `key`, and `descriptor`.
2. Initialize variables to track whether the method has been called and to store the result.
3. Update `descriptor.value` to create a new function that checks whether the method has been called.

For example:

```typescript
class Test {
  data: any;

  @once
  setData(newData: any) {
    this.data = newData;
  }
}

const test = new Test();
test.setData([1, 2, 3]);
console.log(test.data); // [1, 2, 3]
test.setData("new string");
console.log(test.data); // [1, 2, 3]
```

### Identifier decorator

Implement the class decorator to add the class method `identify`, which returns a class name with the information passed in the decorator.

1. The function `identifier `takes a single parameter, uid, which is a string representing the unique identifier.
2. The function should return a string consisting of the class name and the unique identifier.

For example:

```typescript
@identifier("example")
class Test {}

const test = new Test();
console.log(test.identify()); // Test-example
```

## Generic Instructions

1. This practical task is verified automatically with tests.
2. Please, put all your `TypeScript` code in the `src/index.ts` file. If you use any other file, we will not be able to verify it.
3. For TypeScript transpilation, we setup a `tsconfig.json` with a rule set. Please, don't change it, otherwise, it could affect your grade for the task. In this configuration file, we use a set of `compilerOptions`:
   - ["strict"](https://www.typescriptlang.org/tsconfig#strict)
   - ["forceConsistentCasingInFileNames"](https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames)
   - ["strictFunctionTypes"](https://www.typescriptlang.org/tsconfig#strictFunctionTypes)
   - ["noUnusedLocals"](https://www.typescriptlang.org/tsconfig#noUnusedLocals)
   - ["noUnusedParameters"](https://www.typescriptlang.org/tsconfig#noUnusedParameters)
   - ["noImplicitReturns"](https://www.typescriptlang.org/tsconfig#noImplicitReturns)

## Verify your solution

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).
