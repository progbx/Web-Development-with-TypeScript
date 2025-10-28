# Forms in React

## Task description 

1. Create the type `Inputs`. Create a file named `src/types/Inputs.tsx` that contains a description of the type `Inputs`, which will be used in the registration form:

```
    name: string,
    email: string,
    password: string,
```

2. Create the `Input`. The Create file `src/components/Input.tsx`. `Input` component should contain `input` and `label` tags. You will use the `Input` component in several places throughout your app, so you should use `props` for this component, such as `label`, `placeholder` (or any other props you want).

3. Create the component `Button`. The Create file `src/components/Button.tsx`. `Button` component should be used to submit the form.

4. Create the component `Registration`. The Create file `src/components/Registration.tsx`. `Registration` component should contain a form with the attribute `name="registration"` and the following elements:

    - A name field with the placeholder `"Enter Name"`
    - An email field with the placeholder `"Enter Email"`
    - A password field with the placeholder `"Enter Password"`
    - A Registration button

   You should reuse the `Input` and `Button` components. Validation should be added (all fields are required, and empty values are not allowed). When the user submits the form and fields are not valid, the validation error `"All fields are required!"` should be displayed.

5. Using `React Hook Form`, add validation and submit the functionality to the `form`. If the `form` is valid, the results submitted should be shown on the page with the component `Results` in following format: `"User Name: {name}, User email: {email}, Password {password}."` The component (Create file `src/components/Results.tsx`) should have the title `"Registration Details."`


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
