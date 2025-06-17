# Interfaces

In TypeScript, interfaces define the structure and types of an object's properties. When you define an object with properties, TypeScript automatically creates an interface based on its structure. Interfaces help enforce good coding practices and prevent errors by verifying that objects have the expected properties and types. They also make code more readable and maintainable.
In this lesson, you will learn the basics of TypeScript interfaces, including how to define them for objects and functions. As a result, you will be able to use interfaces to write cleaner, safer, and more organized code in TypeScript.

## After completing this lesson, you will be able to:

- Declare interfaces with required, optional, and read-only properties.  
- Extend interfaces to create specialized interfaces that inherit properties from parent interfaces. 
- Implement interfaces in TypeScript classes.  
- Use intersection to override properties in interfaces.

It will take you about **3 hours** to complete this lesson: 1 hour to go through the **theoretical material** and 2 hours to complete the **practice**.

## Theoretical material

First, study the following resources. Then, use them to complete the practical task.

- [TypeScript Interfaces](https://www.typescripttutorial.net/typescript-tutorial/typescript-interface/) (study time: 5 min)
- [Creating custom types with interfaces](https://www.linkedin.com/learning/typescript-essential-training-14687057/creating-custom-types-with-interfaces) (duration: 6.5 min)
- [Property Modifiers](https://www.typescriptlang.org/docs/handbook/2/objects.html#property-modifiers) (study time: 10 min)
- [How to Extend Interfaces in TypeScript](https://www.typescripttutorial.net/typescript-tutorial/typescript-extend-interface/) (study time: 5 min)
- [Extending Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types) (study time: 10 min)
- [Intersection Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types) (study time: 5 min)
- [Generic Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#generic-object-types) (study time: 5 min)
- [How To Make A Class Implement An Interface In TypeScript?](https://timmousk.com/blog/typescript-class-implements-interface/) (study time: 3 min)
- [How to - override interface properties in TypeScript](https://www.sharooq.com/how-to-override-interface-properties-in-typescript) (study time: 3 min)

## Task Description

This task should take you about **2 hours**. 
Please be aware that the task is **mandatory**.

- Put all your solution code into the `src/index.ts` file.
- Please, export all the interfaces, functions, and classes from the `src/index.ts` file. Otherwise, we can't verify them.

1. Create an interface called `IDrawShape`. This interface must have two required properties, `name` (string) and `size` (number), and one optional property: `color` (string). Additionally, this interface should have a method called `calculateSquare` that calculates and returns the square value (type: number) of the shape.

2. Implement two classes, `Circle` and `Square`, which should each implement the `IDrawShape` interface. For the `Circle` class, consider the radius its size, and for `Square`, the length of a side is its size. You must export these classes from the `src/index.ts` file. Otherwise, they cannot be verified. The `calculateSquare` method should calculate the square using the respective mathematical formulas.

3. Create a function called `sortShapes` that receives an array of `IDrawShape` instances and returns an array with their names sorted in ascending order according to their calculated square values.

4. Extend the `IDrawShape` interface with two new interfaces: `IPaintShape` and `IChangeShape`. The `IPaintShape` interface should introduce the required property `color` (a string). The `IChangeShape` interface should introduce two methods:

   - `increaseSize` takes as a parameter a value (number) by which to multiply the size of the shape.
   - `decreaseSize` takes as a parameter a value (number) by which to divide the size of the shape, respectively.

5. Create a new class called `FilledFlexibleCircle` that implements both the `IPaintShape` and `IChangeShape` interfaces. 

### Usage example

1. Create several instances of the `Circle` and `Square` classes and calculate their squares.
2. Create instances of the `FilledFlexibleCircle` class, use the property and methods introduced by `IPaintShape` and `IChangeShape`, and check their colors and squares before and after the size modifications.

If you want to run this demo code for your interfaces and classes, please do it in a separate file. `index.ts` **file should have only declarations**.

```ts
const circle1 = new Circle("Circle1", 5);
circle1.calculateSquare(); // Returns: 78.54

const square1 = new Square("Square1", 6);
square1.calculateSquare(); // Returns: 36

const shapes: IDrawShape[] = [circle1, square1];
sortShapes(shapes); // Returns: ["Square1", "Circle1"]

const circle2 = new FilledFlexibleCircle("FlexibleCircle", 4, "Red");
circle2.increaseSize(2);
circle2.calculateSquare(); // Returns: 201.1

shapes.push(circle2);
sortShapes(shapes); // Returns: ["Square1", "Circle1", "FlexibleCircle"]

console.log(circle2.color); // Expected output: "Red"
circle2.decreaseSize(4);
circle2.calculateSquare(); // Returns: 12.57
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
