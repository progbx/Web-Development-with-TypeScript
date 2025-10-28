# Next.js routing & APIs

In this task, you will practice creating a `Next.js` project with navigation. The task focuses on creating a "City Guide" `Next.js` application that demonstrates the concepts of `Next.js` routing, including dynamic routing, navigation, and shared layouts.

## Step 1: Create nested routes.

1. In your application, you already have a root layout file: `src/app/layout.tsx`. You need to create a `page.tsx` file for the home page with the title of your application — `"City Guide"` — within `<h1>` tags.
2. Then, create a new route segment called `continents`, and inside it, create a file called `page.tsx`. For now, this page should contain `"Choose your continent"` within `<h1>` tags. Make sure you see this content when you visit <http://localhost:3000/continents>.
3. Develop 3 additional routes: `"Europe"`, `"Asia"`, and `"America"`.

   - These should be accessible at the URLs <http://localhost:3000/continents/europe>, <http://localhost:3000/continents/asia>, and <http://localhost:3000/continents/america>, respectively.
   - For now, each page should display a relevant paragraph tag (i.e., `<h2>Cities in Europe</h2>`, `<h2>Cities in Asia</h2>`, or `<h2>Cities in America</h2>`) and a list of all city names for the relevant continent.
   - Please use functions `fetchEuropeCities`, `fetchAsiaCities`, `fetchAmericaCities` from `src/app/lib/fetch-data.ts` file for getting cities.
   - You should display city names as a `<ul>` list for each continent.
   - Use the given data located in the `lib` folder of your project, and feel free to add additional data as necessary.

4. Please create separate components to display each list of cities, and don't forget to put all of them in the `src/app/ui` folder.

## Step 2: Build navigation.

1. Create a `<NavMenu />` component inside the `src/app/ui/nav-menu.tsx` folder that returns a navigation menu constructed within an `<ul>` tag that contains navigation links for `"Europe"`, `"Asia"`, and `"America"`. Feel free to add any style to the menu.

2. Build a shared layout for the application that contains this navigation menu for ease of navigation. In the `/continents` folder, add a new file named `layout.tsx` and paste the following code:

   ```tsx
   export default function Layout({ children }: { children: React.ReactNode }) {
     return (
       <>
         <NavMenu />

         {children}
       </>
     );
   }
   ```

   Don't forget to import the <NavMenu /> component.

3. Use `Next.js`'s `<Link>` component to enable navigation between different pages (`"Europe"`, `"Asia"`, and `"America"`).

4. Implement the functionality to highlight (underline) the link that is currently active. This can be done using a custom `usePathname()` hook that returns the current URL path.

## Step 3: Implement Dynamic Routes.

1. Within each continental route (`Europe`, `Asia`, and `America`), create dynamic routes for each city. The routes should follow these patterns: `/app/continents/europe/[id]`, `/app/continents/asia/[id]`, and `/app/continents/america/[id]`, where `id` is a unique identifier for each city in the mocked city data.

2. Make sure each city's page is accessible at the `URL`. For instance, `http://localhost:3000/continents/europe/id1` should display all the information about the European city with `id1` from the mock data.

3. Use functions `fetchEuropeCityById`, `fetchAsiaCityById`, `fetchAmericaCityById` from `src/app/lib/fetch-data.ts` file.

4. If city doesn't exist (function promise resolved with `undefined`), you should show `not-found` page.

5. Implement a custom `404 page` that will be shown when a user navigates to a city link that doesn't exist. This page should contain the heading `"There is no such city in the list."`

## Where to put your code

The foundation of your `React/Next` application has already been prepared. This means that all the required dependencies have been added and everything is already set up, so you don't need to start the `React/Next` project yourself.

To run the application in development mode, just run it in the terminal (`command line, Bash, Git Bash`):

```bash
npm start
```

This starts the application and updates it when you change something. See [Local Development](./docs/LOCAL_DEVELOPMENT_REACT_NEXT.md) for more information.

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).
