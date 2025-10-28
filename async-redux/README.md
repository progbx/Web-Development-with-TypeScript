### Time to complete the task: 3 hours

# Async Redux

## Task Description

A `Contacts` application has been prepared for you. All the components and styles are in place. You need to configure the store using `@reduxjs/toolkit`, set up queries, and create a state slice.

### Application Structure

The `Contacts` application allows users to:

- Preview an existing list of contacts
- Add new contacts
- Remove existing contacts

## 1. Configure the store

Please use the following documentation to configure the store: [Redux Toolkit TypeScript Quick Start](https://redux-toolkit.js.org/tutorials/typescript)

1. Install the required dependencies from `NPM`. Make sure these dependencies are added to the `package.json` file.

2. Create a `src/redux/store.ts` file.

   - Here, you must use the `configureStore` function from `@reduxjs/toolkit`.
   - Export the `RootState` and `AppDispatch` types, which define your store. 3. In `src/main.tsx`, use `Provider` from `react-redux` to provide a global store.

## 2. Configure contactsApi

All the data to show what is received from the server. The server has been configured with mock data. It starts to work when you run the `npm start` command in the terminal. See [Local Development](./docs/LOCAL_DEVELOPMENT_REACT_NEXT.md) for more information.

1. Create the file `src/features/contactsApi.ts`.

2. Using the `createApi` function from `@reduxjs/toolkit/query/react`, create a new API and export it as the variable `contactsApi` (Create an API service)[https://redux-toolkit.js.org/tutorials/rtk-query#create-an-api-service]. Please use the parameters below:

   - `reducerPath`: `"contactsApi"`
   - `baseQuery`: `fetchBaseQuery` with `baseUrl`: `"http://localhost:3033/api/contacts"`

3. Endpoints

   - `getContacts` endpoint: an RTK query to get contacts
     - The `GET` method
     - The server returns an array of contacts.
     ```ts
     interface Contact {
        id: string;
        name: string;
        phone: string;
     }
     ```
     - The complete URL for it is the same as the `baseUrl`.
   - `addContact` endpoint: an RTK mutation to create a new contact.
     - It takes as a parameter an object `newContact` with `name` and `phone`: `{ name: string, phone: string }`
     - It passes the `newContact` object as a request body to the server.
     - The complete URL for it is the same as the `baseUrl`.
   - `removeContact` endpoint: an RTK mutation to remove an existing contact
     - It takes as a parameter the contact `id` (string type).
     - It uses `http://localhost:3033/api/contacts/:contactId` as the URL for deletion. Where `contactId` is the ID of the contact you want to delete.

4. Export React hooks for your endpoints. These hooks should be: `useGetContactsQuery, useAddContactMutation, useRemoveContactMutation`. You will use them later.

5. Add `contactsApi` to the store. Please use this article as a reference: [Add the service to your store](https://redux-toolkit.js.org/tutorials/rtk-query#add-the-service-to-your-store)

   - Add the `contactsApi` reducer.
   - Update the store middleware.

## 3. Using contactsApi

You must add your code to `src/component/App.tsx`.

1. Showing existing contacts.

   - Using `useGetContactsQuery` hook, load contacts and render them. The block for showing contacts is already there: `<ul>` element with `contact-list` class name.
   - When loading contacts, instead of showing `<ul>`, you should show `<p>Loading...</p>`. When contacts are loaded, this paragraph should be hidden.

2. Adding a new contact. There are inputs and a button for adding a new contact; you just need to update the `handleAddContact` function using the `useAddContactMutation` hook from `contactsApi`.

   When the `handleAddContact` function is called:

   - Trigger `AddContactMutation` by unwrapping its trigger. - After `handleAddContact` is called, reset the two variables (the `name` and the `phone`).
   - Re-fetch all the contacts. Please note that you need to wait for the promise to resolve.

3. Removing an existing contact. Each contact item has a remove button. You just need to update the `handleRemoveContact` function using the `useRemoveContactMutation` hook from `contactsApi`.

   When the `handleRemoveContact` function is called:

   - Trigger `RemoveContactMutation` by unwrapping its trigger.
   - Re-fetch all the contacts. Please note that you need to wait for the promise to resolve.

## 4. Adding a new state slice to the store

In this slice, you will store some additional information about the contacts list. The name of the slice is `info`.

1. Create a file for your code: `src/features/infoSlice.ts`.

2. Using the `createSlice` function from `@reduxjs/toolkit`, create a slice called `infoSlice` and export it from the file. Slice Options:

   - `name`: `"info"`
   - The type/interface for the slice should be:

   ```ts
   interface InfoState {
     lastAction: string | null;
   }
   ```

   In `lastAction`, the last action the user conducted is stored in the application.

   - Create an initial state value; `lastAction` should be `null`.

3. Create `setLastActionReducer`. It should take as a payload a string with the new `lastAction` value and save it to the state.

   - Don't forget to add this reducer to the slice and export `setLastAction` from the file.

4. Create `resetLastActionReducer`. It should reset the `lastAction` value to `null`.

   - Don't forget to add this reducer to the slice and export `resetLastAction` from the file.

5. Add this slice to the store for the `info` property.

## 5. Updating "info" when a user performs an action

1. When a user successfully adds a contact, please set `"Add Contact"` to the `lastAction` of the `info` slice. Please note that this should only be done when a contact was added successfully.

2. When a user successfully removes a contact, please set `"Remove Contact"` to the `lastAction` of the `info` slice. Please note that this is only done when a contact has been removed successfully.

3. When `lastAction` is `null`, show `No Updates in This Session` inside the element with the class name `info-last-action`.

4. When `lastAction` has a value, show `Last Action: [LAST ACTION VALUE]` inside the element with the class name `info-last-action`.

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
