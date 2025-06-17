# TypeScript MidTerm Variant 1

This midterm assessment is an important part of your learning journey, providing a practical platform for reinforcing and integrating the concepts you've learned so far. It will also give you an opportunity to receive feedback on your work, highlighting areas of strength and those that may require further reinforcement.

This task will help you understand if you are able to:

- Apply the core principles of TypeScript
- Utilize TypeScript's basic data types, including strings, numbers, booleans, arrays, and objects
- Correctly use TypeScript functions
- Work with indexed access types and the Record type
- Use TypeScript classes
- Implement interfaces in TypeScript classes
- Use generics to make code more scalable and adaptable

The aim of this project is to create a structured definition that meets the requirements in the task description.

This project should take you about **1.5 hours**.

## General Instructions

1. Complete the task below and submit it before the deadline specified in your learning pass.
2. This practical task will be verified automatically with tests.
3. Please put all TypeScript code in the `src/index.ts` file. If you use any other file, we will not be able to verify it.
4. To transpile TypeScript, you have set up a tsconfig.json file with a set of rules. Please don't change it; this could affect your grade for the task. This configuration file includes a set of compilerOptions:

   - ["strict"](https://www.typescriptlang.org/tsconfig#strict)
   - ["forceConsistentCasingInFileNames"](https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames)
   - ["strictFunctionTypes"](https://www.typescriptlang.org/tsconfig#strictFunctionTypes)
   - ["noUnusedLocals"](https://www.typescriptlang.org/tsconfig#noUnusedLocals)
   - ["noUnusedParameters"](https://www.typescriptlang.org/tsconfig#noUnusedParameters)
   - ["noImplicitReturns"](https://www.typescriptlang.org/tsconfig#noImplicitReturns)
   - Also we disallow using `any`.

## Task Description

- Please read the task description below carefully.
- Please put all your code into the `src/index.ts` file.
- Please export all interfaces/classes/types/functions according to the instructions in the task description.

### Variant 1:

Define a transport company that owns different vehicles, including electric ones. Follow the steps below to design an organized structure:

1. Classes and Interfaces:

   - Create an interface called `Vehicle` with the properties `model`(string) and `year`(number) and the method `description()` that returns a string stating the model and year of the vehicle.
   - Create a class called `Car` that implements the `Vehicle` Interface.

2. Add a constructor to the `Car` class with the optional parameter `color`(string). If a color is provided while creating an object, assign it to a relevant instance variable.

   ```ts
   let car = new Car("Ford", 2001, "red");

   car.description(); // returns: "Ford 2001"
   ```

3. Create a class called `ElectricCar` that extends the `Car` class. Include an additional property called `batteryLife` (number). Also, override the description method to include information about the battery life.

   ```ts
   let car = new ElectricCar("Ford", 2021, 88, "green");

   // Please note that the class method returns the adjusted string.
   car.description(); // returns: "Ford 2001 88"
   ```

4. Rest Parameters and Function Overload

   - Create a function called `getFleetYears`
     - It should accept either a single object that conforms to the `Vehicle` interface or an array of such objects as a parameter.
     - It should return an array containing the years the vehicles were manufactured. If only one vehicle is passed, the function should return an array with a single item.
     - Implement this function using the function overloading approach. You must have two function declarations and one function implementation.
   - Create a function called `getModels`
     - It should be capable of accepting a variable number of objects that conform to the `Vehicle` interface using rest parameters.
     - It should return an array containing models of the vehicles.
     - If no parameters are passed, the function should return an array containing the string `"No Models"`.

5. In the class `ElectricCar`, create a method called `chargeBattery(life?: number)` where `life` is an optional argument. If a value is provided, set the battery life to that value; otherwise, set the battery life to 100.
