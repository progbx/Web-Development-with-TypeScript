### Time to complete the task: 2h

# Generics

In TypeScript, generics provide a way to create reusable code components that work with a variety of types rather than a single one. This allows you to write a single function or class that can work with different data types while maintaining type safety. With generics, you can define placeholder types that are selected when the function or class is used or instantiated. This way, you can create functions, classes, or interfaces that are capable of working on a general variety of data types but still provide the benefits of strong typing when they are used. 
In this lesson, you will explore generic functions; generic interfaces and classes; and generic constraints, utilities, mapped types, and conditional types. By the end of this lesson, you will be equipped with the knowledge you need to use generics effectively in TypeScript projects. 

## Learning outcomes

After completing this lesson, you will be able to: 
- Create generic functions and write type-safe code that works with multiple data types 
- Use generic interfaces and classes to build flexible and reusable components 
- Use generic constraints, utilities, mapped types, and conditional types to make code more expressive 
- Use generics to solve real-world problems and make code more scalable and adaptable 

It will take you about **2 hours** to complete this lesson: 1 hour to go through the **theoretical material** and 45 minutes to complete the **practice**. 

## Theoretical materials

You can use the following resources to solve the practical task: 

[Introducing generics](https://www.linkedin.com/learning/typescript-object-oriented-programming/generics-2?resume=false&u=2113185) (duration: **3 min**) 
 
[Generic Functions: Unlock the Power of Reusability](https://www.youtube.com/watch?v=RHah57-vv-E) (duration: **7 min**) 

[Creating generic classes](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-classes) (duration: **8 min**) 

[The Perfect Match Generics in Interfaces ](https://www.youtube.com/watch?v=9YPPjZustYg) (duration: **5.5 min**) 

[Default parameters](https://medium.com/@kidaneberihuntse/simplifying-typescript-functions-with-default-parameter-values-d07bc6c54fa3) (duration: **5 min**) 

[Mapped Types](https://www.youtube.com/watch?v=RjQpep8fBdo) (duration: **12.5 min**) 

[Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) (study time: **10 min**) 

[Conditional Types Advanced TypeScript](https://www.youtube.com/watch?v=QFWrbNehKk0) (optional, duration: **23.5 min**) 

[Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#handbook-content) (study time: **10 min**) 

[Utility Types - Advanced TypeScript](https://www.youtube.com/watch?v=Fgcu_iB2X04) (optional, duration: **35.5 min**) 


To recap the material in the resources above, you can look through the chapter on [Generics in the TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/generics.html) (optional, study time: **30 min**). 



## Task Description 

This task should take you about **45 minutes**.   
Please be aware that the task is **mandatory**.   

- You must set all classes, function parameter types, and return types. 
- Please put all your code into a `src/index.ts` file.  
- All functions, interfaces, and classes must be defined as follows: 

    ```ts 
    function getProperty(/* parameters */) { 
        // your code 
    } 
 
    interface QueueInterface { 
        // your code 
    } 
 
    class Queue<T> implements QueueInterface { 
        // your code 
    } 
 
    export {Queue, getProperty}; 

    ``` 

1.  Generic types for a function with TypeScript:

Implement and describe types for a function that gets an object property. 
 
Example: 

```js 

  getProperty({test: 'testValue'}, 'test'); // 'testValue' 
  getProperty({2: [1,2,3]}, 2); // [1,2,3] 
  getProperty([{a: 0}, {a: 1}, {a: 2}], 2); // {a: 2} 

``` 

2. A class and an interface with TypeScript: 

Implement and describe types for the Queue class. 

The class should support all TypeScript types. 

Example: 

```js 
  const numberQueue = new Queue<number>(); 
  numberQueue.push(1); 
  numberQueue.push(2); 
  numberQueue.push(3); 
  numberQueue.pop(); // 1 
  numberQueue.getValue(); // [2,3] 

  const objectQueue = new Queue<{}>(); 
  objectQueue.push({first: 1}); 
  objectQueue.push({second: 2}); 
  objectQueue.pop(); // {first: 1} 
  objectQueue.getValue(); // [{second: 2}] 

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

