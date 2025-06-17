# TypeScript: Types

Types are a fundamental aspect of TypeScript that enables developers to define and enforce specific data structures and shapes in their code. TypeScript provides a set of built-in types, including Number, String, Boolean, Object, Array, Tuple, Enum, Any, Never, Union, type aliases, and string literal types. Each type serves a unique purpose, allowing for precise and static type-checking and enhancing the reliability and maintainability of code.

In this lesson, you will learn how to use TypeScript types to catch potential errors early in the development process which will allow you to create more robust and predictable code.

## After completing this lesson, you will be able to:

Declare and utilize TypeScript's basic data types, including strings, numbers, booleans, arrays, and objects.
Apply special type concepts such as any, null, and undefined.

It will take you about **3.5 hours** to complete this lesson: 2.5 hours to go through the **theoretical material**, and 1 hour to complete the **practice**.

## Theoretical materials

You can use the following resources to complete the practical task:

1. ["The primitives: string, number, and boolean"](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean) (study time: **3 min**)
2. ["Primitives and built in types"](https://www.linkedin.com/learning/typescript-essential-training-14687057/primitives-and-built-in-types) (duration: **4.5 min**)
3. ["Null and Undefined types"](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined) (study time: **5 min**)
4. ["Understanding Type Annotations in TypeScript"](https://www.typescripttutorial.net/typescript-tutorial/typescript-type-annotations/) (study time: **7 min**)
5. ["Type Inference"](https://www.typescriptlang.org/docs/handbook/type-inference.html) (study time: **10 min**)
6. ["TypeScript Type Inference"](https://www.typescripttutorial.net/typescript-tutorial/typescript-type-inference/) (study time: **10 min**)
7. ["Object Types"](https://www.typescriptlang.org/docs/handbook/2/objects.html) (study time: **20 min**)
8. ["TypeScript Object Type"](https://www.typescripttutorial.net/typescript-tutorial/typescript-object-type/) (study time: **7 min**)
9. ["Arrays"](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays) (study time: **3 min**)
10. ["TypeScript Array Type"](https://www.typescripttutorial.net/typescript-tutorial/typescript-array-type/) (study time: **5 min**)
11. ["Tuple Types"](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types) (study time: **5 min**)
12. ["TypeScript Tuple"](https://www.typescripttutorial.net/typescript-tutorial/typescript-tuple/) (study time: **3 min**)
13. ["Enums"](https://www.typescriptlang.org/docs/handbook/enums.html) (study time: **15 min**)
14. ["TypeScript Enum"](https://www.typescripttutorial.net/typescript-tutorial/typescript-enum/) (study time: **10 min**)
15. ["Defining Enumerable Types"](https://www.linkedin.com/learning/typescript-essential-training-14687057/defining-enumerable-types) (duration time: **3.5 min**)
16. ["Unknown Type"](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown) (study time: **2 min**)
17. ["Any Type"](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any) (study time: **2 min**)
18. ["TypeScript Any Type"](https://www.typescripttutorial.net/typescript-tutorial/typescript-any-type/) (study time: **5 min**)
19. ["Never Type"](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type) (study time: **3 min**)
20. ["TypeScript Never Type"](https://www.typescripttutorial.net/typescript-tutorial/typescript-never-type/) (study time: **5 min**)
21. ["Union Types"](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) (study time: **5 min**)
22. ["TypeScript Union Types"](https://www.typescripttutorial.net/typescript-tutorial/typescript-union-type/) (study time: **5 min**)
23. ["Type Aliases"](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases/) (study time: **3 min**)
24. ["Defining Types Using Type Aliases"](https://www.linkedin.com/learning/typescript-essential-training-14687057/defining-types-using-type-aliases) (duration time: **2.5 min**)
25. ["Literal Types"](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types) (study time: **5 min**)

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

### Validationg User Input

Implement a TypeScript function called `validateUserInput` that takes user input and performs type-safe validation using the unknown type. Ensure that the input data adheres to specific types, and make sure to handle various scenarios where user input may be in an unknown or unexpected format.

1. Create a TypeScript function that accepts an unknown parameter representing user input.
2. Check to make sure user input is the object.
3. Iterate through all the properties of the user input object.
4. Check each property against its expected type (string, number, boolean).
5. Implement validation logic to handle cases where the input may be partially correct or in an unexpected format.
6. Return the message `Valid User Input` for valid input.
7. Return the error message `Invalid input format` for invalid input.

**Example:**

```ts
// Example:
const userInput = {
  name: "John Doe",
  age: 25,
  subscribed: true,
};

const validationResult = validateUserInput(userInput); //Valid User Input
```

### Exploring Union Types

Create a TypeScript function called `handleInput` that accepts a union type as a parameter.

1. Recall that aA union type represents a variable that can be one of several types (string, number or boolean).
2. Check the type of input and handle each case accordingly.
3. Return the updated value according to the following rules:

- If the input is a string, the function should concatenate it with the string ` - is a string!`.
- If the input is a number, it should add 10 to it.
- If the input is a boolean, it should negate the boolean value.
- If the input is not a string, number or boolean, the result should be `Error`.

**Example:**

```ts
handleInput("hello"); //hello - is a string!

handleInput(5); //15
```

### Logger

Implement the function `logger` which will prepare data for logging.
It should have default service configuration {serviceName: 'global', serviceId: 1}

1. Define and export a type called `ServiceConfig` with the following properties:
   `serviceName`: with string type
   `serviceId`: with a number type
2. Define and export `defaultServiceConfig`: `serviceName`: 'global',
   `serviceId`: 1
3. The function `logger` takes an array of messages and an optional `ServiceConfig` parameters.
4. Iterate through the messages and create log entries.
5. Return the result as an object - e.g., [key: string].

**Example:**

```ts
// {
//   "3-0":"[auth_service] Wrong email",
//   "3-1":"[auth_service] Wrong password",
//   "3-2":"[auth_service] Success login"
// }
logger(["Wrong email", "Wrong password", "Success login"], {
  serviceName: "auth_service",
  serviceId: 3,
});

// {
//   "1-0": "[global] Fatal error",
//   "1-1":"[global] Data corrupted"
// }
logger(["Fatal error", "Data corrupted"]);
```

## General Instructions

1. This practical task will be verified automatically with tests.
2. Please put all TypeScript code in the `src/index.ts` file. If you use any other file, we will not be able to verify it.
3. To transpile TypeScript, you have set up a tsconfig.json file with a set of rules. Please don't change it; this could affect your grade for the task. This configuration file includes a set of compilerOptions:

- ["strict"](https://www.typescriptlang.org/tsconfig#strict)
- ["forceConsistentCasingInFileNames"](https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames)
- ["strictFunctionTypes"](https://www.typescriptlang.org/tsconfig#strictFunctionTypes)
- ["noUnusedLocals"](https://www.typescriptlang.org/tsconfig#noUnusedLocals)
- ["noUnusedParameters"](https://www.typescriptlang.org/tsconfig#noUnusedParameters)
- ["noImplicitReturns"](https://www.typescriptlang.org/tsconfig#noImplicitReturns)
- Also we disallow using `any`.

## Verify your solution 

To be sure your solution is correct before submitting it, you can verify it locally, but this will require some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).
