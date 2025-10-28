import React from "react";
import "./WeatherCard.css";
import { WeatherModel } from "../data/Weather.model";

interface WeatherCardProps {
    weather: WeatherModel;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
    const handleLike = () => {
        alert("Cool, we like this weather too!");
    };

    return (
        <div className="weather-card">
            <h3>{weather.location}</h3>
            <p>{weather.temperature}°F</p>
            <p>{weather.description}</p>
            <button aria-label="add a 'like' for the weather card" onClick={handleLike}>
                ❤️
            </button>
        </div>
    );
};

export default WeatherCard;
