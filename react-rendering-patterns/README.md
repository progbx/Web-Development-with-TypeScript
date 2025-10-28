# React Rendering Patterns

## Task description:

You will create a weather forecast application that demonstrates the use of RSC and SSR, focusing on the components required to render weather information and manage data rendering in a React environment.

## 1. Create a WeatherCard component

This component will receive weather data (location, temperature, and description) and render the current weather.

-   The component takes only one prop: an object that fits the `WeatherModel` interface. This interface has already been created; you can find it here: `src/data/Weather.model.ts`.
    -   `temperature`: A number representing the current temperature
    -   `description`: A string describing the current weather conditions (e.g., "Sunny" or "Rainy")
    -   `location`: A string representing the geographical location (e.g., "Los Angeles")
-   CSS styles have been created for you to use if you want: `src/components/WeatherCard.css`. Just import a file and add CSS class names. 
-   The `weather.location` value should be displayed inside the `<h3>` tag. 
-   `weather.temperature` and `weather.description` should each be displayed in a separate `<p>` tag. 
-   You should add `°F` after the `weather.temperature` value. 
-   At the bottom of the component, you should add a `<button>` with a heart symbol inside `❤️`: 
    -   This button should also have an aria-label attribute with the value `"add a 'like' for the weather card"`. 
    -   When a user clicks this button, an `alert()` with the text `"Cool, we like this weather too!"` should be called. 

**Example:**

```tsx
<WeatherCard
    weather={{
        temperature: 33,
        description: "Sunny",
        location: "Los Angeles",
    }}
/>
```

## 2. Create a Forecast component

This component will display the 3-day weather forecast.

-   The component takes only one prop: `forecast`, an array of forecast objects, each representing information about the weather on a given day. Each object fits the `ForecastModel` interface, which has already been created. You can find it at `src/data/Forecast.model.ts`: 
    -   `day`: A string representing the day of the week (e.g., "Monday")
    -   `temperature`: A number representing the temperature for the day in degrees Fahrenheit
    -   `description`: A string describing the weather conditions (e.g., "Sunny" or "Cloudy")
-   CSS styles have been created for you to use if you want: `src/components/Forecast.css`. Just import a file and add CSS class names. 
-   The component should have a `<h2>` heading with the text `"3-Day Forecast"` inside. 
-   The forecast list should be displayed using `<ul>` and `<li>` tags. 
-   `forecast.day` should be displayed inside the `<h3>` tag. 
-   `forecast.temperature` and `forecast.description` should be displayed inside `<p>` and formatted like this: `33°F - Sunny`. Don't forget to add `"°F - "`. 


**Example:**

```tsx
const forecastData: ForecastModel[] = [
    { day: "Monday", temperature: 75, description: "Sunny" },
    { day: "Tuesday", temperature: 70, description: "Cloudy" },
    { day: "Wednesday", temperature: 68, description: "Rain" },
];

<Forecast forecast={forecastData} />;
```

## 3. Use the WeatherCard and Forecast components in the App

The data to be displayed has been prepared for you: `src/data/weatherData.ts`. 
  
Import `currentWeather` and `forecastData` to `App.tsx` and display this data using `<WeatherCard />` and `<Forecast />`. 
  
## 4. Set Up Streaming SSR

The server-side code has been prepared for you; you can find it at `server/app.js`. 
  
Find an example of a similar project here: <https://dev.to/arsxlanali/a-guide-to-server-side-rendering-ssr-with-vite-and-reactjs-l9l> 
  
We used it as a reference, so you can feel free to use it to. 


1. Rewrite the `src/main-client.tsx` file from regular usage to SSR usage. 
    - Import the `hydrateRoot` function from `react-dom/client` 
    - Call this function with the following parameters: 
        - `document.getElementById("root")!` 
        - adn `<App>` wrapped into `<BrowserRouter>` from `react-router-dom`
    - Please note that after doing this, you will see a lot of errors in the browser console when you run `npm start`, but this is fine for now. 
  
2. Create the `main-server.tsx` file:  
    - Create and export as default a `render` function that takes two parameters: 
        - `url`: a string 
        - `options`: an object that fits the interface `RenderToPipeableStreamOptions` from `react-dom/server`
  
    - This function should call the `renderToPipeableStream` function from `react-dom/server` and return its result. 
    - As the first parameter of `renderToPipeableStream` please pass `<App>` wrapped into `<StaticRouter>` from `react-router-dom/server`. `<StaticRouter>` requires `url` prop, pass the `url` variable passed to `render` funciton. 
  
3. Verify your work: 
    - Run the NPM script `npm run build:ssr`. This script takes the `main-client.tsx` and `main-server.tsx` files and builds two separate bundles using the files as entries. You can see the results in the `dist/client` and `dist/server` folders. 
    - Run the SSR server using build files: `npm run server`.
    - Open `http://localhost:3033` and check the results. 
    - Your application should work the same way; there should be no errors in the browser console. Also, the button from the `WeatherCard` should work the same way as before. 
