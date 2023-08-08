import React, { useState, useEffect } from "react";
import { fetchWeather } from "../api/weatherAPI";
import Dropdown from "./Dropdonw";
import { render } from "@testing-library/react";
import Label from "./Label";
import classname from "classname";

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
    const [city, setCity] = useState(""); // default city  
    const [unit, setUnit] = useState("imperial");
    const options = [
        { value: 'imperial', label: 'imperial' },
        { value: 'metric', label: 'metric' }
    ];
    const cities = [];
    for (const city in CANADA_CITIES) {
        cities.push({ value: city, label: city });
    }


    useEffect(() => {
        const fetchData = async () => {
            const location = CANADA_CITIES[city];
            if (!location) {
                renderWeather();
                console.log(`No location data for city: ${city}`);                
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


    const handleCityChange = (selectedOption) => {
        setCity(selectedOption);
    };

    const handleUnitChange = (selectedOption) => {
        setUnit(selectedOption);
        renderWeather();
    };

    const getWeatherInfo = (conditions) => {
        // if I have 1 weather data, it aligns center       

        return (
            <div className={`flex justify-center`}>
                {conditions.map((condition, index) => (
                    <div key={index} className="flex items-center mr-4 last:mr-0">
                        <p className="text-2xl font-semibold text-shadow-lg mr-2 pb-1">{condition.main}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${condition.icon}.png`}
                            alt={condition.description}
                            className=""
                        />
                    </div>
                ))}
            </div>
        );
    }
    const getGradientInfo = (id) => {
        const dir = "bg-gradient-to-t"; //direction : from top
        //default : id 800 clear 
        let bg = "bg-blue-200";
        let gradient = "from-indigo-500";      

        // group info : https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
        let group = Math.floor(id / 100);
        if([2, 3, 4, 5, 6, 7].indexOf(group) !== -1){ // 2 : Thunderstorm, 3: Drizzle, 5: Rain, 6: Snow, 7:Atmosphere
            bg = "bg-gray-300"; gradient = "from-gray-500";
        } else if (id !== 800){ // 80x : cloud, 800 : clear
            bg = "bg-indigo-200"; gradient = "from-gray-200"

        }
        return classname(bg, dir, gradient);
    }
    const renderWeather = () => {
        if (!weatherData || unit === "" || city === "") {
          return null;
        }
        const getTempByUnit = getWeatherByUnit(weatherData.main.temp, unit);
        const gradientInfo = getGradientInfo(weatherData.weather[0].id);
        return (
          <div className={`p-4 rounded-lg text-white ${gradientInfo}`}>
            <div className="mt-4 ">
            {Array(Math.ceil(weatherData.weather.length / 2)).fill().map((_, index) => {
                    const conditionsPair = weatherData.weather.slice(index * 2, (index * 2) + 2); // 2개마다 행바꿈
                    return getWeatherInfo(conditionsPair);
                })}
            </div>
            <div className="flex">
              <div className="w-1/2 text-white">
                <h2 className="text-xl text-shadow-sm">Temperature</h2> 
                <p className="text-2xl text-shadow-lg">{getTempByUnit}</p>
              </div>
              <div className="w-1/2 text-white">
                <h2 className="text-xl text-shadow-sm">High / Low</h2>
                <p className="text-2xl text-shadow-lg">{getWeatherByUnit(weatherData.main.temp_max, unit)} / {getWeatherByUnit(weatherData.main.temp_min, unit)}</p>                
              </div>
            </div>
      
            <div className="text-white mt-4">
              <p className="text-xl">Humidity: {weatherData.main.humidity}</p>
              <p className="text-xl">Wind speed: {weatherData.wind.speed}</p>
            </div>
          </div>
        );
      };

    const getWeatherByUnit = (temperature, unit) => {
        if (unit === "imperial") {
            return temperature + "℃";
        } else {
            return ((temperature * 1.8) + 32).toFixed(2) + "°F";
        }
    }

    return (
        <div className="min-h-screen flex justify-center bg-gray-200 pt-20 pb-20">
            <div className="p-8 bg-white shadow-lg rounded-lg flex flex-col space-y-4 w-1/2 min-w-500">
                <Label size="large">Weather Information</Label>
                <div className="flex space-x-4">
                    <Dropdown options={cities} onChange={handleCityChange} className="w-1/2" msg="select city"/>
                    <Dropdown options={options} onChange={handleUnitChange} className="w-1/2" />
                </div>
                {renderWeather()}

            </div>
        </div>
    );
}

export default WeatherComponent;