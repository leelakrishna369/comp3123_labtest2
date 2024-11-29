import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";

const App = () => {
    const [city, setCity] = useState("Toronto");
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_KEY = "899fbf367024b3fd96799ed785383769";

    const fetchWeather = async (cityName) => {
        setLoading(true);
        setError("");
        try {
            const weatherResponse = await axios.get(
                `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(weatherResponse.data);

            const forecastResponse = await axios.get(
                `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
            );
            setForecastData(forecastResponse.data);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setWeatherData(null);
            setForecastData(null);
            setError("City not found. Please try again.");
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        fetchWeather(city);
    }, [city]);

    return (
        <div className="container">
            <h1>Weather Forecast</h1>
            <SearchBar setCity={setCity} />
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && weatherData && (
                <WeatherCard weatherData={weatherData} forecastData={forecastData} />
            )}
        </div>
    );
};

export default App;
