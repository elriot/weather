import React, { useState, useEffect } from "react";
import { fetchWeather } from "../api/weatherAPI";
import Dropdown from "./Dropdonw";
import { render } from "@testing-library/react";

const CANADA_CITIES = {
  Vancouver: { lat: 49.28, lon: -123.12 },
  Kelowna: { lat: 49.89, lon: -119.50 },
  Toronto: { lat: 43.70, lon: -79.42 },
  Montreal: { lat: 45.51, lon: -73.59 },
  Calgary: { lat: 51.0447, lon: -114.0719 },
  Edmonton: { lat: 53.5461, lon: -113.4938 },
  Ottawa: { lat: 45.4215, lon: -75.6972 },
  Quebec: { lat: 46.8139, lon: -71.2082 },
  Winnipeg: { lat: 49.8951, lon: -97.1384 },
  London: { lat: 42.9849, lon: -81.2453 },
  Halifax: { lat: 44.6488, lon: -63.5752 },
  Victoria: { lat: 48.4284, lon: -123.3656 },
};

function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Vancouver"); // default city  
  const [unit, setUnit] = useState("imperial");
  const options = [
    { value: 'imperial', label: 'imperial' },
    { value: 'metric', label: 'metric' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const location = CANADA_CITIES[city];
      if (!location) {
        console.error(`No location data for city: ${city}`);
        return;
      }
      try {
        const data = await fetchWeather(location.lat, location.lon);
        setWeatherData(data);
      } catch (error) {
      }
    };
    fetchData();
  }, [city]);


  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleUnitChange = (selectedOption) => {
    setUnit(selectedOption);
    renderWeather();
  };

  const getWeatherInfo = (condition, index) => {
    return <div key={index}>
      <p>{condition.main}</p>
      <img        
        src={`https://openweathermap.org/img/wn/${condition.icon}.png`}
        alt={condition.description}
      />
    </div>
  }

  const renderWeather = () => {
    if (!weatherData || unit === "")
      return null;
    const getTempByUnit = getWeatherByUnit(weatherData.main.temp, unit);
    return <div>
      <p>Temperature: {getTempByUnit} </p>
      <p>High temp : {getWeatherByUnit(weatherData.main.temp_max, unit)}, Low Temp : {getWeatherByUnit(weatherData.main.temp_min, unit)}</p>
      <p>Humidity: {weatherData.main.humidity}</p>
      <p>Wind speed: {weatherData.wind.speed}</p>

      {weatherData.weather.map((weatherCondition, index) => (
        getWeatherInfo(weatherCondition, index)
      ))}
    </div>
  }

  const getWeatherByUnit = (temperature, unit) => {
    if (unit === "imperial") {
      return temperature + "℃";
    } else {
      return ((temperature * 1.8) + 32).toFixed(2) + "°F";
    }
  }

  return (
    <div>
      <h1>Weather Information</h1>
      <Dropdown options={options} onChange={handleUnitChange} />
      <select value={city} onChange={handleCityChange}>
        {Object.keys(CANADA_CITIES).map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {renderWeather()}
    </div>
  );
}

export default WeatherComponent;