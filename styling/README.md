# Styling

## 1. Inline styling

You will learn how to apply inline styling for an existing component.

**Instructions:**

1. In your homework repo, find the component `Quote.tsx`, which consists of `<div>` and `<p>` elements.
2. Add inline styling to the `<div>` and `<p>` elements so that the resulting CSS rules are:

    ```css
    div {
        background-color: #4299e1;
        border-radius: 0.25rem;
        padding: 1.25rem;
    }

    p {
        margin-top: 0.5rem;
        color: #6b7280;
    }
    ```

## 2. CSS modules

Now, try to style a component with CSS modules.

**Instructions:**

1. In your homework repo, find the component `Input.tsx`, which consists of `<input>` and `<label>` elements.
2. Add a CSS module to this component and apply styling to `<input>` and `<label>` so that the resulting CSS rules are:

    ```css
    input {
        border-width: 1px; /* This corresponds to border */
        border-color: #d1d5db; /*  This corresponds to border-gray-300 */
        padding: 0.5rem; /* This corresponds to p-2 */
        margin-top: 0.25rem; /*  This corresponds to mt-1 */
        border-radius: 0.125rem; /*  This corresponds to rounded-sm */
    }

    input:focus {
        outline: none; /*  This corresponds to focus:outline-none */
        box-shadow: 0 0 0 2px #6875f5; /*  This corresponds to focus:ring-2 and focus:ring-blue-500 */
    }

    label {
        display: block; /*  This corresponds to block */
        font-size: 0.875rem; /*  This corresponds to text-sm */
        color: #4b5563; /*  This corresponds to text-gray-600 */
    }
    ```

3. File name should be `Input.module.css`, and class names: `input-module`, `label-module`.

## 3. Styled-components

Now, use the `styled-components` library to style one of your components. To practice using `styled-components` in `React`, you will create a product showcase that will consist of product items displayed in a grid, each with a product name, price, and buy button.

**Instructions:**

1. Navigate to the project directory and install the `'styled-components'` library using npm by running `npm install styled-components`.
2. In `App.tsx`, import `'styled'` from `'styled-components'`.
3. Create a `StyledShowcase` component with `styled-components` using `styled.section`. Define the styles for the section to display child components as a grid.

    ```css
    .section {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 1rem;
        padding: 1rem;
        box-sizing: border-box;
    }
    ```

4. Inside `StyledShowcase`, create other `styled-components`: `StyledProduct`, `StyledName`, `StyledPrice`, and `StyledButton`. Each one should be created using `styled.[element]` syntax and the appropriate `CSS`.

    ```css
    .div {
        /* StyledProduct */
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 1rem;
        box-sizing: border-box;
        text-align: center;
    }

    .h2 {
        /* StyledName */
        font-size: 1.2rem;
        color: #333;
        margin-bottom: 0.5rem;
    }

    .p {
        /* StyledPrice */
        color: #888;
        margin-bottom: 1rem;
    }

    .button {
        /* StyledButton */
        background-color: #007bff;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        text-transform: uppercase;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .button:hover {
        /* StyledButton hover */
        background-color: #0056b3;
    }
    ```

5. Now, use these `styled-components` to build your React UI within the app component's return statement. Each `styled-component` can be used like a regular `React` component.

These components are already added to the `App.tsx` file. You should uncomment this code.

Your `App` component should look something like this:

```tsx
<StyledShowcase>
    <StyledProduct>
        <StyledName>Product Name</StyledName>
        <StyledPrice>Product Price</StyledPrice>
        <StyledButton>Buy Now</StyledButton>
    </StyledProduct>
</StyledShowcase>
```

## 4. Tailwind

To better understand how to use the `Tailwind CSS` framework with `React`, build a simple card component. This card will contain an image, title, description, and a button.

**Instructions:**

1.  Navigate to the project directory and install `Tailwind` by running `npm install -D tailwindcss postcss autoprefixer`.
2.  To configure `Tailwind`, create a `tailwind.config.js` and `postcss.config.js` files in the root directory of your project by running `npx tailwindcss init -p`.
3.  Update `tailwind.config.js`'s content attribute to look for all `\*.tsx` files in the `src` directory as follows:

    ```js
    /** @type {import('tailwindcss').Config} */
    export default {
        content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
        theme: {
            extend: {},
        },
        plugins: [],
    };
    ```

4.  Now, in `App.css`, import the necessary `Tailwind CSS` utilities by adding the following to top of the file:

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

5.  In your `Card.tsx` file, create a new component that renders a `div` with the card design. Your card should contain an image (`<img>`), a title (`<h2>`), a description (`<p>`), and a button (`<button>`). Apply `Tailwind CSS` classes to style them.

    `Card.tsx` HTML:

    ```html
    <div>
        <img src="src/public/product-card.webp" alt="car product image" />
        <h2>Super Car For Sale</h2>

        <p>
            The 2024 Luxo Sedan combines a sleek design with premium leather
            interiors and a cutting-edge infotainment system. Its turbocharged
            engine offers a blend of performance and efficiency, while advanced
            safety features ensure a secure ride.
        </p>

        <button>Buy This Car Now</button>
    </div>
    ```

    The `div` should be styled as follows:

    ```css
    div {
        background-color: #4299e1; /* This corresponds to bg-blue-500 */
        border-radius: 0.25rem; /* This corresponds to rounded */
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* This corresponds to shadow */
        padding: 1.25rem; /* This corresponds to p-5 */
    }
    ```

    For the image

    ```css
    img {
        height: 12rem; /* This corresponds to h-48 */
        width: 100%; /* This corresponds to w-full */
        object-fit: cover; /* This corresponds to object-cover */
    }

    /* For medium or larger screens */

    @media (min-width: 768px) {
        img {
            width: 12rem; /* This corresponds to md:w-48 */
        }
    }
    ```

    For `h2`

    ```css
    h2 {
        text-transform: uppercase; /* This corresponds to uppercase */
        letter-spacing: 0.05em; /* This corresponds to tracking-wide */
        font-size: 0.875rem; /* This corresponds to text-sm */
        color: #667eea; /* This corresponds to text-indigo-500 */
        font-weight: 600; /* This corresponds to font-semibold */
    }
    ```

    For p

    ```css
    p {
        margin-top: 0.5rem; /* This corresponds to mt-2 */
        color: #6b7280; /* This corresponds to text-gray-500 */
    }
    ```

    For the button

    ```css
    button {
        margin-top: 1.25rem; /* This corresponds to mt-5 */
        padding-left: 1rem; /* This corresponds to px-4 */
        padding-right: 1rem; /* This corresponds to px-4 */
        padding-top: 0.25rem; /* This corresponds to py-1 */
        padding-bottom: 0.25rem; /* This corresponds to py-1 */
        border-color: #3b82f6; /* This corresponds to border-blue-500 */
        border-width: 1px; /* This corresponds to border */
        color: #3b82f6; /* This corresponds to text-blue-500 */
        border-radius: 0.25rem; /* This corresponds to rounded */
        transition-duration: 300ms; /* This corresponds to duration-300 */
    }

    button:hover {
        background-color: #3b82f6; /* This corresponds to hover:bg-blue-500 */
        color: white; /* This corresponds to hover:text-white */
    }
    ```

## Where to put your code

The foundation of your `React` application has already been prepared. This means that all the required dependencies have been added and everything is already set up, so you don't need to start the `React/Next` project by yourself.

Predefined files:

- `src/App.tsx`: The main component of the application component. You are expected to render the components you create inside it.
- `index.html`: The HTML page that renders the application;
- `src/main.tsx`: The entry point for the application.
- You can see that the other files have their own purposes, so please don't delete them.

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
