### Time to complete the task: WIP hours

# React Elements & JSX

## Task description 

The goal of this task is to give you some practice creating React elements from scratch, styling React elements, and displaying list data. Before beginning the task, make sure you have studied all the required material.

Please take the following steps:

1.	Use `React.createElement` to create the title `<h1>` – `"Solar system planets"` and the style: `style: { color: '#999', fontSize: '19px'}`
2.	Use JSX syntax to list the planets in the solar system. This list should be created by using the semantic elements `<ul>` and `<li>` and should be styled using the `className` property.

```css
.planets-list {
    font-size: 14px;
}
```

**Planet list:**

-   Mercury
-   Venus
-   Earth
-   Mars
-   Jupiter
-   Saturn
-   Uranus
-   Neptune

The result should be the following:

![Expected final result](https://autocode.git.epam.com/gap_bs_react-next/react-elements-and-jsx/-/raw/main/public/task-result.png?ref_type=heads)

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

4. If the task says you need to apply styles, please import them directly to a component file like this:

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

5. To run the application in development mode, just run it in the terminal (`command line, Bash, Git Bash`):

    ```bash
    npm start
    ```

    It starts the application and updates it when you change something. See [Local Development](./docs/LOCAL_DEVELOPMENT_REACT_NEXT.md) for more information..


## Check your solution before submitting it. (Optional)

To be sure your solution is correct, you can verify it locally before submitting it. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).
