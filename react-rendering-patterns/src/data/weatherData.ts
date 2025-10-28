import { ForecastModel } from "./Forecast.model";
import { WeatherModel } from "./Weather.model";

export const currentWeather: WeatherModel = {
    temperature: 72,
    description: "Sunny",
    location: "Los Angeles",
};

export const forecastData: ForecastModel[] = [
    { day: "Monday", temperature: 75, description: "Sunny" },
    { day: "Tuesday", temperature: 70, description: "Cloudy" },
    { day: "Wednesday", temperature: 68, description: "Rain" },
];
