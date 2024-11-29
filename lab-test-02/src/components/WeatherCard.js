import React from "react";

const WeatherCard = ({ weatherData, forecastData }) => {
    if (!weatherData || !forecastData) {
        return <p>Loading weather data...</p>;
    }

    const { main, weather, wind, name } = weatherData;

    const formatDate = (date) =>
        date.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    const formatTemperature = (temp) => `${(temp - 273.15).toFixed(2)}°C`;

    const currentDate = formatDate(new Date());

    const dailyForecast = forecastData.list.filter((entry) =>
        entry.dt_txt.includes("12:00:00")
    );

    return (
        <div className="card">
            <h2 className="card-title">{name || "Unknown Location"}</h2>
            <p className="card-text">{currentDate}</p>
            {weather && weather.length > 0 && (
                <>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                        alt={weather[0].description}
                        className="weather-icon"
                    />
                    <p className="card-text">{weather[0].description.toUpperCase()}</p>
                </>
            )}
            <p className="card-text">Temperature: {formatTemperature(main.temp)}</p>
            <p className="card-text">Feels Like: {formatTemperature(main.feels_like)}</p>
            <p className="card-text">
                <strong>Humidity:</strong> {main.humidity}%
            </p>
            <p className="card-text">
                <strong>Wind Speed:</strong> {wind.speed} m/s
            </p>
            {dailyForecast.length > 0 && (
                <div className="forecast">
                    <h3>5-Day Forecast</h3>
                    <div className="forecast-container">
                        {dailyForecast.map((day, index) => (
                            <div className="forecast-item" key={index}>
                                <p>
                                    {new Date(day.dt_txt).toLocaleDateString(undefined, {
                                        weekday: "short",
                                    })}
                                </p>
                                <img
                                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                    alt={day.weather[0].description}
                                />
                                <p>{formatTemperature(day.main.temp)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherCard;
