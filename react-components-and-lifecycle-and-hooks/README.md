# Creating React Components

## 1. ValidatedInput

**Task description:**

Create a `ValidatedInput` component that validates user input and shows an error message if the input is invalid. Use the `useEffect` hook to perform validation whenever the input value changes, simulating `componentDidUpdate` behavior. This exercise will help you understand how to use the `useEffect` hook to perform validation based on changes in state and the importance of the dependency array.

Please take the following steps: 
  1) Validate user input based on the provided validation function.
  2) Display an error message if the input is invalid.
  3) Perform validation whenever the input value changes.


Note: the example of validation function is already exist in `App.tsx` file.

```tsx
import React, { useState, useEffect } from "react";

const ValidatedInput = ({
    validationFunction,
    errorMessage,
}: {
    validationFunction: (a: string) => boolean;
    errorMessage: string;
}) => {
    // Add your state and useEffect logic here
    return (
        <div>
            {/* Create an input field and display an error message if needed */}
        </div>
    );
};

export default ValidatedInput;
```

## 2. Todo List

**Task description:**

In this exercise, you are tasked with creating a simple Todo List component that allows users to add new items to the list and delete items once they are completed. The Todo List should have the following features:

1)	An input field for adding new todo items
2)	A button to submit the new todo item
3)	Display the list of todo items
4)	A delete button next to each todo item to remove it from the list
5)	Use the useState hook to manage the todo list state


```tsx
import React from "react";

function TodoList() {
    return (
        <div>
            <input type="text" />
            <button>Add Todo</button>
            <ul>{/* Render the list of todo items here */}</ul>
        </div>
    );
}

export default TodoList;
```
## Where to put your code?
The foundation of your `React` application has already been prepared. This means that all the required dependencies have been added and everything is already set up, so you don't need to start the `React/Next` project by yourself.
Predefined files:
•	`src/App.tsx`: The main component of the application component. You are expected to render the components you create inside it.
•	`index.html`: The HTML page that renders the application;
•	`src/main.tsx`: The entry point for the application. Here, you must put the logic for rendering the `<App>` component and putting it on the page. By default, it is empty.
•	You can see that the other files have their own purposes, so please don't delete them.


### Please read the recommendations below carefully:
1. **You must import and render your component(s) inside the src/App.tsx file; otherwise, we can't verify your solution!**
2. **You must render the `<App>` component inside the element with the ID `root`! All the logic for putting the `<App>` component inside the `index.html` page must be written in the `src/main.tsx` file! Otherwise, we can't verify your solution.**
•	We suggest creating separate files for the components you are writing. For instance, if the task description says to create a header component, create a file `src/components/Header.tsx`, put all the code inside, and export the component as a result.
Then, import your new component to `src/App.tsx` and render it inside—for example, like this:

`src/components/Header.tsx`:

    ```tsx
    function Header() {
        return <header>Hello, I am header</header>;
    }

    export default Header;
    ```

    `src/App.tsx`:

    ```tsx
    import Header from "./components/Header";

    function App() {
        return <Header />;
    }

    export default App;
    ```

3. If the task says you need to apply styles, please import them directly to a component file like this:

    `src/components/MyComponent.css`:

    ```css
    .my-component {
        color: red;
    }
    ```

    `src/components/MyComponent.tsx`:

    ```tsx
    import "./MyComponent.css";

    function MyComponent() {
        return <div className="my-component">Hello, I am component</div>;
    }

    export default MyComponent;
    ```

4. To run the application in development mode, just run it in the terminal (`command line, Bash, Git Bash`):

    ```bash
    npm start
    ```

    It starts the application and updates it when you change something. See [Local Development](./docs/LOCAL_DEVELOPMENT_REACT_NEXT.md) for more information.


## Check your solution before submitting it. (Optional)

To be sure your solution is correct, you can verify it locally before submitting it. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).
