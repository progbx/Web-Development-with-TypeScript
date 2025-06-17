### Time to complete the task: 2.5 hours

# Modules and Namespaces

Modules and namespaces are significant structural elements in TypeScript. A module is a functional unit that encapsulates related code, making the code reusable and reducing global scope pollution. Conversely, namespaces, also known as "internal modules," group related code and interfaces so they can be managed and organized effectively. These architectural assets act as a robust mechanism for bolstering code organization, readability, and maintainability. Further, using them effectively is the core of designing scalable, modular, and efficient TypeScript applications—particularly for larger, complex constructs.

In this topic, you will explore how to define, import, and use both modules and namespaces, as well as the differences between the two and their importance in developing scalable and manageable TypeScript applications.

## After completing this lesson, you will be able to:

- Define modules and namespaces in TypeScript
- Use best practices for importing, using, and implementing modules and namespaces in TypeScript applications to enhance code organization, readability, and maintainability
- Use modules and namespaces to design scalable, modular, and efficient TypeScript applications, as well as describe the critical role such structures play in larger, complex applications

It will take you about **2.5 hours** to complete this lesson: 1.5 hours to go through the **theoretical material** and 45 minutes to complete the **practice**.

## Theoretical material

You can use the following resources to complete the practical task:

- [Modules in JavaScript](https://medium.com/@manasamancharla11/understanding-javascript-modules-fba7f037fe49) (duration: 10 min)
- [Module Basics](https://www.linkedin.com/learning/typescript-essential-training-14687057/module-basics?u=2113185) (duration: 2.5 min)
- [Modules - Theory](https://www.typescriptlang.org/docs/handbook/modules/theory.html) (study time: 20 min)
- [Share code with imports and exports](https://www.linkedin.com/learning/typescript-essential-training-14687057/share-code-with-imports-and-exports?resume=false&u=2113185)(duration: 3 min)
- [Defining global types with ambient modules](https://www.linkedin.com/learning/typescript-essential-training-14687057/defining-global-types-with-ambient-modules?resume=false&u=2113185) (duration: 4 min)
- [Declaration merging](https://www.linkedin.com/learning/typescript-essential-training-14687057/declaration-merging?resume=false&u=2113185) (duration: 3.5 min)
- [Modules - Choosing Compiler Options](https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html) (study time: 15 min)
- [Executing modular code](https://www.linkedin.com/learning/typescript-essential-training-14687057/executing-modular-code?resume=false&u=2113185) (duration: 2.5 min)
- [NameSpaces](https://www.typescriptlang.org/docs/handbook/namespaces.html) (study time: 15 min)
- [Namespaces and Modules](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html)(study time: 5 min)
- [Organizing TypeScript code using namespaces](https://blog.logrocket.com/organizing-typescript-code-using-namespaces/) (study time: 10 min)

## Task Description

This task should take you about **45 minutes**. 
Please be aware that the task is **mandatory**.

Consider a supermarket that sells different categories of products like fresh produce, baked goods, dairy products, canned goods, personal care items, etc. Your task is to create a TypeScript program that organizes all these different types of products using modules and namespaces.

Put all your task code into the `src` folder.

1. Create a directory named `supermarket`. In this directory, create different TypeScript files that represent each category of products, such as `FreshProduce.ts`, `BakedGoods.ts`, `DairyProducts.ts`, `CannedGoods.ts` and `PersonalCare.ts`.
2. In each file, define a class with name `Product` that represents each category, with properties that describe typical characteristics of the products in that category, such as `name: string,  price: number,  weight: number, expirationDate: Date`. You should also include constructors that set values for the properties in objects and methods relevant to the products in each class.
3. After defining the classes, use namespaces to encapsulate each class in its respective file. The namespace should have the same name as the category of the product it's encapsulating.
4. Now, in `index.ts` file, import and use all these modules. Instantiate a products from each category in the `index.ts` file by accessing the appropriate modules:
   - create `apple` as `FreshProduce` product with `name` = "Apple", `price` = 0.5, `weight` = 100, `expirationDate` = 30.12.2021;
   - create `bread` as `BakedGoods` product with `name` = "Bread", `price` = 1, `weight` = 500, `expirationDate` = 31.12.2021;
   - create `milk` as `DairyProducts` product with `name` = "Milk", `price` = 2, `weight` = 1000, `expirationDate` = 10.01.2022;
   - create `tuna` as `CannedGoods` product with `name` = "Tuna", `price` = 3, `weight` = 200, `expirationDate` = 30.12.2023;
   - create `soap` as `PersonalCare` product with `name` = "Soap", `price` = 1, `weight` = 50, `expirationDate` = 30.12.2024;
5. In `index.ts` file, create an exported class `Goods` with static function `displayProducts(Product)` to display in the console the details of the products created. Format of the message in console should be `"Product `name`, has price: `price`, weight: `weight`, expiration date: `expirationDate`"`.
6. Your program should not yield any errors or warnings in the TypeScript compiler.
   Note: Make sure to export all your classes and import them into the `index.ts` file correctly. This task will give you some practice creating and managing multiple modules and namespaces in TypeScript. Remember to follow TypeScript best practices throughout this task.

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
