# Testing and Debugging

## Task Description

In this task, you will write tests for a simple application with a heading and a menu.

## Application to Test

-   We prepared a simple `React` application with a heading and a menu.
-   When a user clicks the button with the label `Open Menu`, the menu is shown, and the button label changes to `Close Menu`.
-   To close the menu, the user should click the button `Close Menu`.
-   To run the application locally, please run `npm start` after installing new dependencies.

## Testing environment

We have already set up a testing environment to make everything work. To learn more about it, please read the following article: [article](https://jestjs.io/docs/getting-started).

You can use the commands `npm run test:local` and `npm run test:watch` to run your tests. More details are available here: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md)

### The `src/App.test.tsx` file.

For your convenience, we have already created a file for your tests `src/App.test.tsx`:

```js
describe("App", () => {
    // Your tests go here
});
```

### Requirements for unit tests

1. All of your tests should pass.
2. You must use the function `it()` for each unit test.
3. Each test should have a unique title.
4. The test file should not have any disabled or commented tests.

## 1. Snapshot testing

Snapshot testing is not that popular nowadays; however, you need to know how to use it.
You should write two snapshot tests:

-   For a case when a menu is hidden: The test title should be `should match snapshot`.
-   For a case when a menu is shown after the user clicks the button. The test title should be `should match snapshot after opening a menu`.
-   After you write your tests, **please run them locally and commit your snapshots file. Otherwise, you will receive a score of 0 for this task.**

## 2. Check the page heading

Using `react-testing-library` functions, check to make sure the heading on the page has the following text inside: `Empower Your Journey with Our Solutions`.

Please search by role, as in this example [Example](https://testing-library.com/docs/react-testing-library/example-intro), and use the role `heading`.

The test title should be: `should have a correct page heading`.

## 3. Check the button text after clicking

Using `react-testing-library` functions:

-   Check to make sure the button text changes to `Close Menu` after clicking on it. The test title should be: `should change button text after clicking`.
-   Check to make sure the button text changes back to `Open Menu` after clicking on it again. The test title should be: `should change back button text when clicked twice`.
-   Please search by role `button`.

## 4. Check to make sure the menu appears after clicking the button

-   Check to make sure the `<nav>` element appears after clicking the button. The test title should be: `should have a menu after clicking the button`
-   Please search by role `navigation`.

## 5. Check to make sure there is a list with four options inside the `<nav>` element.

-   Find the `<ul>` list inside `<nav>` with four `<li>` options. The test title should be: `should have four menu items`.
-   Please search by role `navigation`

## Check your solution before submitting it (OPTIONAL)

This task is different from the rest because you will write unit tests.

So, to **verify the tests you wrote**: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md)

**If you want to run the tests we use to evaluate your tests**:

-   `npm run auto:tests` launches a single run of all the tests we have for a task.
-   `npm run auto:tests:watch` launches tests in `"watch mode"`. In `"watch mode"`, tests are rerun every time you change the solution file (`script.js`, `script.test.js` files). This might come in handy when fixing something in your solution. This task `"freezes"` your terminal. To stop it, press `CTRL + C` on `Windows(Linux) OS` or `CMD + C` on `MacOS`.
