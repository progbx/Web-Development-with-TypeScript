### Time to complete the task: 1 hour

# React Router

## Task description 

Implement a small web application with routing functionality:

1. Create a React website that consists of three main pages: `Home`, `About`, and `Gallery`. Each of these pages should have a navigation menu: `Home`, `About`, and `Gallery` with links to the other pages. They should be created with exact URLs and carry specific content:

-   The "Home" page, accessible at the root (`"/"`) of your site, should contain a message within `<h1>` tags:

```html
<h1>Welcome to our website!</h1>
```

-   The "About" page, accessible via the `/about` URL, should contain a message within `<h1>` tags:

```html
<h1>Learn more about us</h1>
```

-   The `Gallery` page, accessible via the `/gallery` URL, should contain a message within `<h1>` tags:

```html
<h1>Our Photo catalog</h1>
```

The `Gallery` page should also contain several photos placed in an  `img` tag with at least the name of the location where the photo was taken. Please use the given layout data located in the `__mock__` folder of your project. Feel free to add additional data as needed.

To fill the `Gallery` page with content, you can also use the existing `Gallery` component from the task `State & props`.

2. Use the `Link` component from React Router to allow navigation between these pages. Each photo item present on the `Gallery` page should be a link that leads to a separate `PhotoCard` page.

-   The "PhotoCard" page should at least contain:

1. The name of the location within `<h1>` tags, for example:

```html
<h1>Paris</h1>
```

2.  A description of the photo, for example:

```html
<p>Eiffel Tower at sunset</p>
```

To fill the "PhotoCard" page with content, you can also use the existing "PhotoCard" component from the task `State & props`.

3. Use the `useParams` hook from React Router to fetch and display the details of each individual photo dynamically on the `PhotoCard` page. This should be based on the id parameter in the URL. For instance, the URLs `/gallery/id1` and `/gallery/id2` should display the details of different photos.

4. Implement a `NotFound` page displaying the following message within `<h1>` tags:

```html
<h1>404: The page you are looking for cannot be found</h1>
```

This page should be rendered anytime a user tries to access a URL that does not correspond to a defined route in the application.

## Where to put your code

The foundation of your `React` application has already been prepared. This means that all the required dependencies have been added and everything is already set up, so you don't need to start the `React/Next` project by yourself.

Predefined files:

-   `src/App.tsx`: The main component of the application component. You are expected to render the components you create inside it.
-   `index.html`: The HTML page that renders the application;
-   `src/main.tsx`: The entry point for the application.
-   You can see that the other files have their own purposes, so please don't delete them.

### Please read the recommendations below carefully:

1. **You must import and render your component(s) inside the src/App.tsx file; otherwise, we can't verify your solution!**
2. We suggest creating separate files for the components you are writing. For instance, if the task description says to create a header component, create a file `src/components/Header.tsx`, put all the code inside, and export the component as a result. Then, import your new component to `src/App.tsx` and render it inside—for example, like this:

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

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).
