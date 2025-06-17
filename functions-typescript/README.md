### Time to complete the task: 2h30min

# Functions

In TypeScript, functions are the building blocks of reusable code. They can have parameters and a return value of a specific type or return nothing. TypeScript allows you to create functions with optional, default, and rest parameters. The return type of function can be any valid data type, such as number, string, boolean, enum, void, null, undefined, any, never, array, or object—basically any data type you want.

In this lesson, you will explore how to use functions effectively. You will get acquainted with different types of functions, how to work with parameters (including optional and default), rest parameters, function overloading, and how to use assertion functions. By the end of the lesson, you'll be better equipped to use functions in TypeScript for your projects.

## Learning outcomes

After completing this lesson, you will be able to:

· Identify the different types of functions in TypeScript

· Work with function parameters, including optional and default parameters

· Explain what rest parameters are

· Describe master function overloading and assertion functions

It will take about **2.5 hours** to complete this lesson: 1 hour and 30 minutes to go through the **theoretical material** and 45 minutes to complete the **practice**.



## Theoretical material

You can use the following resources to complete the practical task:

· [Function Basics](https://www.youtube.com/watch?v=jXoSaX_yFh4) (duration: **8.5 min**)

· [Optional Parameter in TypeScript](https://medium.com/nerd-for-tech/optional-parameter-in-typescript-2d42de4fc1f3) (study time: **2 min**)

· [Default parameters](https://www.linkedin.com/learning/typescript-essential-training/default-parameters) (duration: **3 min**)

· [Lambdas](https://www.linkedin.com/learning/typescript-essential-training/lambdas) (duration: **4 min**)

· [Destructuring](https://www.linkedin.com/learning/typescript-essential-training/destructuring) (duration: **7 min**)

· [The spread operator](https://www.linkedin.com/learning/typescript-essential-training/the-spread-operator) (duration: **4 min**)

· [Overloads or generics: which is better? ](https://www.youtube.com/watch?v=Vr1BUFw6dJM) (duration: **2 min**)

· [Type Assertions](https://www.youtube.com/watch?v=QBnJa6_3Xj4) (duration: **2 min**)

To summarize the information in the resources above, you can look through the chapter  [More on Functions in the TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/functions.html#handbook-content) (optional, study time: **40 min**).



## Task Description

This task should take you about **45 minutes**.

Please be aware that the task is **mandatory**. 

You must set all function parameter types and return types.

- Please put all your code into the file `src/index.ts`.

- All functions must be defined as `Function Declaration` and exported like this:


```ts

export function add(/* parameters */) {
  // your code
}

```

1. A function with TypeScript:

- Create a function called `add` that takes two numbers and returns the sum of them.

- Create a function `concatenate` that takes two strings, concatenates them, and returns the result.


2. Function parameters:

- Implement a function named `printInfo` that takes a person's name, age (optional), and gender (the default value is `"Unknown"`) and returns a formatted string:


```js
"Name: {{person's name}}, Age: {{age (optional)}}, Gender: {{gender}}";
```

Please note that if no age is provided, it should be shown as `"Unknown"`, but this is not the default value. You must add it later yourself.

3. Rest parameters:

- Write a function named `sumAll` that can take any number of parameters and return the sum of all of them. You can use the spread operator to work with any number of parameters. If no arguments are provided, this function should return `0`.

Example:

```ts

// Types of functions
const sum: number = add(5, 3); // Returns: 8
const result: string = concatenate("Hello", " TypeScript"); // Returns: "Hello TypeScript"

// Function parameters
printInfo("John"); // Returns: "Name: John, Age: Unknown, Gender: Unknown"
printInfo("Alice", 25); // Returns: "Name: Alice, Age: 25, Gender: Unknown"
printInfo("Bob", 30, "Male"); // Returns: "Name: Bob, Age: 30, Gender: Male"

// Rest parameters
const totalOne: number = sumAll(1); // Returns: 1
const total: number = sumAll(1, 2, 3, 4, 5, 6); // Returns: 21

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
