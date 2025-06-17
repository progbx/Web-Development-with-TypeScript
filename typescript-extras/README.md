### Time to complete the task: 4 hours

# TypeScript Extras

TypeScript language is constantly evolving and becoming more convenient for developers. Each new version introduces new features—not only in the language but also in the form of new tools for the overall ecosystem. Today's TypeScript ecosystem is not only a compiler with a playground, but it also includes powerful debugging and development tools, alternative parsers, linters, and text editor extensions. For instance, with source maps and Babel, you can debug TypeScript code in the browser, previewing it in TypeScript, not JavaScript syntax.

In this lesson, you will learn how to work with modern tools and significantly improve the development experience.

## After completing this lesson, you will be able to:

- Describe modern TypeScript best practices
- Use Webpack and Babel to effectively compile and build TypeScript code in real-world projects
- Use TSLint and Jest to improve code and product quality

It will take about **4 hours** to complete this lesson: 2 hours to go through the **theoretical material** and 2 hours to complete the **practice**.

## Theoretical material

You can use the following resources to complete the practical task:

- [TypeScript Best Practices: Writing Clean and Modern Code](https://blog.stackademic.com/typescript-best-practices-writing-clean-and-modern-code-a04196310e4d) (study time: **10 min**)
- [Follow TypeScript best practices](https://docs.aws.amazon.com/prescriptive-guidance/latest/best-practices-cdk-typescript-iac/typescript-best-practices.html) (study time: **10 min**)
- [Debugging TypeScript](https://code.visualstudio.com/docs/typescript/typescript-debugging) (optional, study time: **10 min**)
- [What are source maps?](https://web.dev/articles/source-maps) (study time: **20 min**)
- [What is Babel?](https://babeljs.io/docs/) (study time: **10 min**)
- [@babel/preset-typescript](https://babeljs.io/docs/babel-preset-typescript) (study time: **10 min**)
- [Using Babel with TypeScript](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html) (study time: **10 min**)
- [Using Babel with TypeScript](https://learntypescript.dev/12/l2-babel) (study time: **10 min**)
- [typescript-eslint](https://typescript-eslint.io/) (study time: **3 min**)
- [Getting Started](https://typescript-eslint.io/getting-started) (study time: **5 min**)
- [Using ESLint with TypeScript](https://learntypescript.dev/12/l3-eslint) (study time: **10 min**)
- [TypeScript-Babel-Starter](https://github.com/microsoft/TypeScript-Babel-Starter) (study time: **10 min**)
- [Fundamentals of unit tests](https://www.linkedin.com/learning/learning-end-to-end-testing-with-jest/fundamentals-of-unit-tests?u=2113185) (duration: **2 min**)
- [TypeScript Unit Testing 101: A Developer's Guide](https://www.testim.io/blog/typescript-unit-testing-101/) (study time: **10 min**)
- [Using TypeScript](https://jestjs.io/docs/getting-started#using-typescript) (study time: **5 min**)

## Task Description

This task should take you about **2 hours**.  
Please be aware that the task is **mandatory**.

In this task, you will set up several NPM scripts to work with your project. You will find the code in the `src/index.ts` file. Please don't edit it yet; you will do this later.

### 1. Code Transpilation With @babel/cli

Create an NPM script called `babel:transpile` to transpile TypeScript code from `src/index.ts`.

**Requirements:**

- The output folder should be `dist`, and the name of the output file should be `index.js`.
- The required dependencies must be saved to the `package.json` file; otherwise, you will receive a score of `0`.
- You must use the `.babelrc.json` file to configure `babel`.
- You must use `@babel/cli` to transpile code.

### 2. Generate declaration files with tsc (TypeScript)

Create an NPM script called `ts:declaration` to create TypeScript declarations for `src/index.ts`.

- The output folder should be `dist`,  output file name: `index.d.ts`
- The required dependencies must be saved to the `package.json` file; otherwise, you will receive a score of `0`.
- Please use the existing `tsconfig.json` file to configure TypeScript.
- Add the following compiler options to it:

  - ["strict"](https://www.typescriptlang.org/tsconfig#strict)
  - ["forceConsistentCasingInFileNames"](https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames)
  - ["strictFunctionTypes"](https://www.typescriptlang.org/tsconfig#strictFunctionTypes)
  - Only emit .d.ts files; [do not emit .js files](https://www.typescriptlang.org/tsconfig#emitDeclarationOnly)

### 3. Linting code with ESLint 

Create an NPM script called `lint` for linting the file `./src/index.ts` with the recommended set of rules.

- The required dependencies must be saved to the `package.json` file; otherwise, you will receive a score of `0`. 
- You must use the `.babelrc.json` file to configure `babel`. 
- For `ESLint` rules, you must use the sets of rules `eslint:recommended` and `@typescript-eslint/recommended`. 
- This script must try [to fix as many issues as possible.](https://eslint.org/docs/latest/use/command-line-interface#--fix). 

## Verify your solution

To be sure your solution is correct before submitting it, you can verify it locally, but this will require some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).
