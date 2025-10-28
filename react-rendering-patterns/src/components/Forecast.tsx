import React from "react";
import "./Forecast.css";
import { ForecastModel } from "../data/Forecast.model";

interface ForecastProps {
    forecast: ForecastModel[];
}

const Forecast: React.FC<ForecastProps> = ({ forecast }: ForecastProps) => {
    return (
        <div className="forecast">
            <h2>3-Day Forecast</h2>
            <ul>
                {forecast.map((dayForecast: ForecastModel, idx: number) => (
                    <li key={idx} className="forecast-item">
                        <h3>{dayForecast.day}</h3>
                        <p>
                            {dayForecast.temperature}°F - {dayForecast.description}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Forecast;
