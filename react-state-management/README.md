# React State Management

## Task description 

The Pomodoro technique involves working in intervals, typically 25 minutes of focused work followed by a 5-minute break. In this task, for simplicity's sake, you will take 25 seconds and 5 seconds for work sessions and breaks, respectively. The application will provide users with a timer to manage their work sessions and breaks effectively. It will also include features like starting, pausing, and resetting the timer.

**Work and Break Sessions:**

The application must support two types of sessions: work and break.

**Default settings:**

Work session: 25 seconds.
Break session: 5 seconds.

**Timer Control:**

- Start: Begin the countdown timer.
- Pause: Pause the countdown timer.
- Reset: Reset the timer to the initial state based on the current session type.

**Session Management:**

When the work session timer reaches 0, the application should automatically switch to the break session and vice versa.
The user should be able to manually switch between sessions using the reset button.

## Implement reducers:

-   In this task, you will implement reducers to handle each action and update the state accordingly. You will have all the components ready. You should change the `timerReducer.ts` file

### Action Types:

Define the following string constants as action types:

- `START_TIMER`: Initiates the timer 
- `PAUSE_TIMER``: Pauses the timer 
- `RESET_TIMER`: Resets the timer based on the current session type 
- `DECREMENT_TIME`: Decreases the time by 1 second 

### TimerState Interface:

Create an interface **TimerState** that represents the state of the timer. This state should include:

- `isRunning`: A boolean indicating if the timer is running
- `minutes`: A number representing the number of minutes left in the current session
- `seconds`: A number representing the number of seconds left in the current session
`sessionType`: A string that can only be **"work"** or **"break"**.

### Action Interfaces:

Define interfaces for each action type. These interfaces should only have a type property that matches the corresponding action type.

### Action Types Union:

Create a union type **TimerActionTypes** that combines all the individual action interfaces. This will represent any possible action that can be dispatched to the reducer.

### Initial State:

Create an **initialState** constant to represent the initial state of the timer. The initial state should start with:

-   `isRunning`: `false`
-   `minutes`: `0`
-   `seconds`: `25`
-   `sessionType`: `"work"`

### Reducer Function:

Implement a function called **timerReducer** that takes in the current `state` and an `action` and returns the new state based on the action type:

- `START_TIMER`: Sets isRunning to true
- `PAUSE_TIMER`: Sets isRunning to false
- `RESET_TIMER`: Resets the timer based on the current sessionType. If the session is "work", reset to 25 seconds; if it is "break", reset to 5 seconds
- `DECREMENT_TIME`: Decreases the time by 1 second. If both minutes and seconds reach 0, switch the session type and reset the timer accordingly. 

### Action Creators:

mplement the following action creators to return the appropriate action objects:

- `startTimer`: Returns an action of the type `START_TIMER`
- `pauseTimer`: Returns an action of the type `PAUSE_TIMER`
- `resetTimer`: Returns an action of the type `RESET_TIMER`
- `decrementTime`: Returns an action of the type `DECREMENT_TIME`.

### Export:

Ensure that the following are exported from the file:

-   `TimerState` interface
-   `initialState` constant
-   `timerReducer` function
-   `startTimer`, `pauseTimer`, `resetTimer`, and `decrementTime` action creators

The expected final result should be as follows:

![Expected final result](https://autocode.git.epam.com/gap_bs_react-next/react-state-management/-/raw/main/public/pomodoro.mp4?ref_type=heads)

## Where to put your code?
The foundation of your `React` application has already been prepared. This means that all the required dependencies have been added and everything is already set up, so you don't need to start the `React/Next` project by yourself.
Predefined files:
-	`src/App.tsx`: The main component of the application component. You are expected to render the components you create inside it.
-	`index.html`: The HTML page that renders the application;
-	`src/main.tsx`: The entry point for the application. Here, you must put the logic for rendering the `<App>` component and putting it on the page. By default, it is empty.
-	You can see that the other files have their own purposes, so please don't delete them.


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