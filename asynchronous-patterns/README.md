### Time to complete the task: 2h 30min

# Asynchronous Patterns

In TypeScript, asynchronous patterns provide a way to handle code that needs some time for execution, like fetch requests or timers. In this lesson, you will learn how to handle asynchronous operations effectively using callback functions, promises, and async functions.


After completing this lesson, you will be able to: 

 • Use callback functions to handle asynchronous tasks in TypeScript 

 • Use promises to simplify asynchronous code and improve readability 

 • Use async functions to provide more convenient syntax for writing asynchronous code 

 It will take you about **2.5 hours** to complete this lesson: 1.5 hours to go through the **theoretical material** and 45 minutes to complete the **practice**. 


## Theoretical materials

You can use the following resources to complete the practical task: 

 • [What is a callback function and how to use it (TypeScript)? ](https://medium.com/@daanworks/what-is-a-callback-function-and-how-to-use-it-typescript-8b5834397e1d)(study time: **5 min**)

 • [TypeScript: Functions and Function callbacks ](https://www.youtube.com/watch?v=fi4JutPj-ZU) (duration: **3 min**)

 • [Callback Types](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#callback-types) (study time: **7 min**)

 • [Understanding Promises in TypeScript: An Introduction](https://www.linkedin.com/pulse/understanding-promises-typescript-introduction-tamjid-ahmed/) (study time: **5 min**)

 • [Programming Tutorial: Guide to Promises in TypeScript](https://www.youtube.com/watch?v=0RLGl_kHhp0) (study time: **18.5 min**)

 • [TypeScript Challenges: Unwrapping a Promise](https://www.youtube.com/watch?v=wON6MCS0NkE) (optional, duration: **7.5 min**)

 • [Mastering async code with TypeScript and JavaScript](https://www.youtube.com/watch?v=VcOMq3LQtBU) (duration: **39.5 min**)


## Task Description 

This task should take you about **45 minutes**.   

Please be aware that the task is **mandatory**.   
 

1. Callback functions with TypeScript:


Implement and define types for a function that gets a callback function and invokes it after a 1-second delay.


Example:

```js
export function invokeAfterDelay(callback){
  // your code here
}

// string "test" should appear in the console after one second
invokeAfterDelay(() => {
  console.log("test");
});
invokeAfterDelay(() => {}); // callback will be invoked in one second

function myCallback() {}
invokeAfterDelay(myCallback); // callback will be invoked in one second
```



2. Promise with typescript:


Implement and define types for the `getPosts` function. 


- This function takes an array of URLs as a parameter and makes parallel calls for each URL using `fetch`.

- It returns a promise, which resolves when it gets the entire response.

- It converts responses to objects and resolves the promise with an array of these objects.

- Each response should be an object with the interface `Post`:

    ```ts
    interface Post {
      body: string;
      id: number;
      title: string;
      userId: number;
    }
    ```

- Add the `Post` interface to the file and use it to define `getPosts` as the return type of the function.

- Use `Promise.all` for values return.


**Example:**

```js
export function getPosts(urls){
  // your code here
}

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
];

getPosts(urls).then((contents) => {
  console.log("posts: ", contents);
});
```


**The data logged in the browser console should look like the following:** 

```js
posts: [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipitsuscipit recusandae consequuntur expedita et cumreprehenderit molestiae ut ut quas totamnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitaesequi sint nihil reprehenderit dolor beatae ea dolores nequefugiat blanditiis voluptate porro vel nihil molestiae ut reiciendisqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iurevoluptatem occaecati omnis eligendi aut advoluptatem doloribus vel accusantium quis pariaturmolestiae porro eius odio et labore et velit aut",
  },
];
```


**An example with an empty array:** 


```js
getPosts([]).then((contents) => {
  console.log("posts:", contents);
});
```


**The data logged in the console is the following:** 


```js
posts: [];
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
