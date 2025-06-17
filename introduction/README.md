# Introduction to TypeScript

TypeScript is a superset of JavaScript that adds static typing and other features to help detect and prevent common coding errors.
In this lesson, you will explore why TypeScript is worth using and how it compares to plain JavaScript. You will also learn how to install TypeScript and set up a development environment. Additionally, you will be guided through the process of compiling TypeScript into JavaScript using the tsc command and get acquainted with the TSConfig options that can be used to configure a project.

## After completing this lesson, you will be able to:

• Identify the core principles of TypeScript and its advantages over JavaScript  
• Install TypeScript, set up a development environment, and compile TypeScript code into JavaScript  
• Configure a TypeScript project using TSConfig options to optimize performance and behavior

It will take you about **1 hour and 10 minutes** to complete this lesson: 50 minutes to go through the **theoretical material** and 20 minutes to complete the **practice**.

## Theoretical material

First, study the following resources. Then, you will use them to complete the practical task.

- [Why TypeScript?](https://www.linkedin.com/learning/typescript-essential-training-14687057/why-typescript) (duration: 3 min)
- [What is TypeScript](https://www.typescripttutorial.net/typescript-tutorial/what-is-typescript/) (study time: 3 min)
- [Why TypeScript](https://basarat.gitbook.io/typescript/getting-started/why-typescript) (study time: 10 min)
- [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) (study time: 5 min)
- [Installing TypeScript](https://www.linkedin.com/learning/typescript-essential-training-14687057/installing-typescript) (duration: 4.5 min)
- [Download TypeScript](https://www.typescriptlang.org/download) (study time: 2 min)
- [TypeScript Setup](https://www.typescripttutorial.net/typescript-tutorial/setup-typescript/) (study time: 1 min)
- [tsc, the TypeScript compiler](https://www.typescriptlang.org/docs/handbook/2/basic-types.html#tsc-the-typescript-compiler) (study time: 2 min)
- [Adding TypeScript to an existing solution](https://www.linkedin.com/learning/typescript-essential-training-14687057/adding-typescript-to-an-existing-solution) (duration: 6 min)
- [Migrating from JavaScript to TypeScript: A Step-by-step Guide](https://lyricalstring.medium.com/migrating-from-javascript-to-typescript-a-step-by-step-guide-d45674b255c7) (study time: 3 min)
- [tsconfig.json](https://basarat.gitbook.io/typescript/project/compilation-context/tsconfig) (study time: 2 min)
- [Migrating from JavaScript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html) (study time: 10 min)

## Task Description

This task should take you about **20 minutes**. 
Please be aware that the task is mandatory.

You have already set up an NPM package, which means you don't need to initiate a `package.json` file and can just use the one provided in the task.

1. Install TypeScript globally so you can use the `tsc` command in the console.
2. Install TypeScript locally to `devDependencies`. It should appear in `package.json` after that.
3. Create a `tsconfig.json` file in the project root. You can do this manually or by running `tsc --init`.

   Basic `tsconfig.json` requirements:

   - Target: `ES2015`
   - Module: `ESNext`
   - Output directory: `dist`
   - Allow JS
   - Include the folder `src`. Please use the `"include"` property for this.

   Also, please read and include the following `compilerOptions`:

   - ["strict"](https://www.typescriptlang.org/tsconfig#strict)
   - ["forceConsistentCasingInFileNames"](https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames)
   - ["strictFunctionTypes"](https://www.typescriptlang.org/tsconfig#strictFunctionTypes)
   - ["noUnusedLocals"](https://www.typescriptlang.org/tsconfig#noUnusedLocals)
   - ["noUnusedParameters"](https://www.typescriptlang.org/tsconfig#noUnusedParameters)
   - ["noImplicitReturns"](https://www.typescriptlang.org/tsconfig#noImplicitReturns)
   - ["skipLibCheck"](https://www.typescriptlang.org/tsconfig#skipLibCheck)

4. Create an `src` folder and put an `index.ts` file in it so that it contains `console.log("Hello, world!");`.
5. In `package.json`, create a script called `"compile"` with the command `"tsc"`. Run this script in the console and make sure `JS` files are created in the `dist` folder. Then, commit these new files. Notice that you have to commit these files in order to pass the tests.
6. Add eslint linting script. Please use [the following tutorial](https://typescript-eslint.io/getting-started/)
   - Install all required dependencies. Please note that all dependencies should be placed in the `"devDependecies"` section of the `package.json` file.
   - Create an `.eslintrc.cjs` file as specified in the tutorial. Please use the same file contents.
   - Add `lint` script to `package.json` with the following contents: `"eslint ./src/index.ts"`.
   - Run the new script in the console and check the results.

## Verify your solution 

To be sure your solution is correct before submitting it, you can verify it locally, but this will require some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).
