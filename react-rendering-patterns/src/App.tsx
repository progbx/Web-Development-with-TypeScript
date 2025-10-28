
import { currentWeather, forecastData } from "./data/weatherData";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";

const App = () => {
    return (
        <section>
            <h1>Let's talk weather!</h1>

            <WeatherCard weather={currentWeather} />
            <Forecast forecast={forecastData} />
        </section>
    );
};

export default App;
