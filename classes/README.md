# Classes

In TypeScript, classes serve as the building blocks of reusable and modular code. They are a powerful abstraction mechanism that brings principles of object-oriented programming such as inheritance, encapsulation, and polymorphism into JavaScript, providing robust and maintainable code structures. Classes are used to define custom data types, encapsulate related properties and methods, and create instances or objects of those custom types. They enable developers to effectively model complex relationships and functionalities within applications.

In this lesson, you will learn how to utilize classes to organize, structure, and instantiate objects in TypeScript. You will get acquainted with the syntax and semantics of defining classes and using constructors to initialize object properties. Additionally, you will explore inheritance and how to create subclass objects that inherit properties and methods from a parent class. You will also learn how to use access modifiers to control the visibility and accessibility of class members. Furthermore, you will become familiar with how to implement static methods and readonly properties. 

## After completing this lesson, you will be able to:

• Define custom classes using the appropriate syntax
• Initialize object properties through constructors
• Explain the process of inheritance and creating subclass objects
• Describe abstract classes and how they are used
• List the different access modifiers, static methods, and properties
• Use classes to develop robust, scalable applications

It will take you about **4.5 hours** to complete this lesson: 1 hour and 50 minutes to go through the **theoretical material** and 2 hours and 40 minutes to complete the **practice**.

## Theoretical material
You can use the information in the following resources to help you complete the practical task:

- [Object Oriented Programming with TypeScript](https://dev.to/kevin_odongo35/object-oriented-programming-with-typescript-574o) (study time: 7 min)
- [Classes or Objects](https://www.linkedin.com/learning/typescript-object-oriented-programming/classes-vs-objects-2?autoplay=true&resume=false&u=2113185) (duration: 2 min)
- [Understanding prototypical inheritance](https://code-craft.hashnode.dev/understand-prototypal-inheritance-in-a-simple-way) (duration: 5.5 min)
- [Prototypes or Classes](https://www.linkedin.com/learning/typescript-object-oriented-programming/prototypes-vs-classes-2?autoplay=true&resume=false&u=2113185) (duration: 2.5 min)
- [Constructor and class properties](https://www.linkedin.com/learning/typescript-object-oriented-programming/constructor-and-class-properties-2?autoplay=true&resume=false&u=2113185) (duration: 2.5 min)
- [Methods with TypeScript](https://www.linkedin.com/learning/typescript-object-oriented-programming/methods-with-typescript-2?autoplay=true&resume=false&u=2113185) (duration: 2 min)
- [Using get](https://www.linkedin.com/learning/typescript-object-oriented-programming/using-get-2?autoplay=true&resume=false&u=2113185) (duration: 2 min)
- [Using set](https://www.linkedin.com/learning/typescript-object-oriented-programming/using-set-2?autoplay=true&resume=false&u=2113185) (duration: 3 min)
- [Inheritance introduction](https://www.linkedin.com/learning/typescript-object-oriented-programming/inheritance-introduction-2?autoplay=true&resume=false&u=2113185) (duration: 2 min)
- [Extending classes in TypeScript](https://www.linkedin.com/learning/typescript-object-oriented-programming/extending-classes-in-typescript-2?autoplay=true&resume=false&u=2113185) (duration: 3 min)
- [Implementing classes in TypeScript](https://www.linkedin.com/learning/typescript-object-oriented-programming/implementing-classes-in-typescript-2?autoplay=true&resume=false&u=2113185) (duration: 2 min)
- [Super()](https://www.linkedin.com/learning/typescript-object-oriented-programming/super-2?autoplay=true&resume=false&u=2113185) (duration: 4 min)
- [Super() overrides](https://www.linkedin.com/learning/typescript-object-oriented-programming/super-overrides-2?autoplay=true&resume=false&u=2113185) (duration: 2 min)
- [What is encapsulation?](https://www.linkedin.com/learning/typescript-object-oriented-programming/what-is-encapsulation-2?autoplay=true&resume=false&u=2113185) (duration: 2 min)
- [Public vs. private](https://www.linkedin.com/learning/typescript-object-oriented-programming/public-vs-private-2?autoplay=true&resume=false&u=2113185) (duration: 3 min)
- [Protected](https://www.linkedin.com/learning/typescript-object-oriented-programming/protected-2?autoplay=true&resume=false&u=2113185) (duration: 2 min)
- [Static](https://www.linkedin.com/learning/typescript-object-oriented-programming/static-2?autoplay=true&resume=false&u=2113185) (duration: 5 min)
- [Readonly](https://www.linkedin.com/learning/typescript-object-oriented-programming/readonly-2?autoplay=true&resume=false&u=2113185) (duration: 2 min)
- [Polymorphism](https://www.linkedin.com/learning/typescript-object-oriented-programming/polymorphism-2?autoplay=true&resume=false&u=2113185) (duration: 4 min)
- [Abstract Classes and Members](https://www.typescriptlang.org/docs/handbook/classes.html#abstract-classes) (study time: 2 min)
- [Introduction to TypeScript abstract classes](https://www.typescripttutorial.net/typescript-tutorial/typescript-abstract-classes/) (duration: 3 min)
- [Converting legacy classes to TypeScript](https://www.linkedin.com/learning/typescript-object-oriented-programming/converting-legacy-classes-to-typescript-2?autoplay=true&resume=false&u=2113185) (duration: 3 min)

To sum up the resources above, you can look through the chapter [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) in the TypeScript Handbook (optional, study time: 30 min).

## Task Description

This task should take you about **2 hours and 40 minutes**.  
Please be aware that the task is mandatory.  

Put all your solution code into the `src/index.ts` file.

### BankAccount class
Create an abstract class called `BankAccount` that represents a generic bank account. You must export this class from the `src/index.ts` file. Otherwise, we can't verify it.This abstract class should have the following functionality:

- A public static property called `totalAccounts` that keeps track of the total number of bank accounts created. You should not be able to change it from outside the class, so we suggest using a mix of `getter` and private property for it.
- Private properties: `_ownerName` (read-only) to store the account owner's name (which cannot be changed once set), and `_balance` (private) to store the account balance.
- An abstract method called `calculateInterest` that calculates and returns the interest earned on the account balance. The formula for calculating interest can be hardcoded.
- A `constructor` that takes in the account owner's name and an initial balance and initializes the private properties. It should also increment the static `totalAccounts` property.
- Public methods: `deposit` for depositing and `withdraw` for withdrawing money from the account. These methods should update the balance property accordingly. They both should take only one parameter: `amount` with `number` type. `deposit`: adds `amount` to the balance, and `withdraw`: withdraws `amount` from the balance.

- A method called `getBalance` that return the `_balance` private property value. The returned type should be a number.
- A static method called `displayTotalAccounts` that displays in the console the total number of bank accounts created so far


Extend the `BankAccount` class to create two subclasses: `SavingsAccount` and `CheckingAccount`.

1. The `SavingsAccount` class:

   - should have an additional private property called `_interestRate`.
   - The constructor must require the third parameter: a number value `interestRate`, and it should set it to `_interestRate` private property.
   - It should implement the `calculateInterest` method to calculate and return the interest earned on the balance based on the interest rate. Basically, it is a balance multiplied by the interest rate.
   - You must export this class from the `src/index.ts` file. Otherwise, we can't verify it.

2. The `CheckingAccount` class:
   - should have an additional private property called `_transactionLimit`.
   - The constructor must require the third parameter: a number value `transactionLimit`, and it should set it to `_transactionLimit` private property.
   - It should override the `withdraw` method to check if the withdrawal amount exceeds the transaction limit. If it equals it or less, it should withdraw it. But if it exceeds it, it should not withdraw it and show a message in the console:
   ```ts
   console.log(
     `Warning: Exceeds transaction limit of $${this._transactionLimit}`
   );
   ```
   - It should declare the `calculateInterest` method which always returns `0`.
   - You must export this class from the `src/index.ts` file. Otherwise, we can't verify it.

### Usage example

If you want to run this demo code for your classes, please do it in a separate file. `index.ts` **file should have only class declarations**. We require that because it could affect checking static methods and properties.

```ts
const savingsAccount = new SavingsAccount("John Doe", 1000, 0.05);
savingsAccount.deposit(500);
savingsAccount.withdraw(200);
savingsAccount.getBalance(); // Returns: 1300
console.log("Interest earned: $", savingsAccount.calculateInterest()); // Expected output: "Interest earned: $65"

const checkingAccount = new CheckingAccount("Jane Smith", 2000, 500);
checkingAccount.getBalance(); // Returns: 2000
checkingAccount.withdraw(1000);
checkingAccount.getBalance(); // Returns: 1000
checkingAccount.withdraw(1000); // Expected output: "Warning: Exceeds transaction limit of $500"

BankAccount.displayTotalAccounts(); // Expected output: "Total accounts: 2"
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
