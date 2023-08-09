import React, { useState, useEffect } from "react";
import { fetchWeather } from "../api/weatherAPI";
import Dropdown from "./Dropdonw";
import Label from "./Label";
import { CANADA_CITIES } from "../data/cities";
import { getGradientInfo, getWeatherByUnit, getLocalTimeByFormat } from "../data/utils";
import ClockComponent from "./ClockComponent";

function WeatherComponent() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState(""); // default city  
    const [unit, setUnit] = useState("imperial");
    const [isCityChanging, setIsCityChanging] = useState(false);

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
                setIsCityChanging(false);
            } catch (error) {
            }
        };
        fetchData();
    }, [city]);


    const handleCityChange = (selectedOption) => {
        setIsCityChanging(true);
        setCity(selectedOption); 
    };

    const handleUnitChange = (selectedOption) => {
        setUnit(selectedOption);
        // renderWeather();
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

    const renderWeather = () => {
        if (!weatherData || unit === "" || city === "") {
            return null;
        }
        const getTempByUnit = getWeatherByUnit(weatherData.main.temp, unit);
        // console.log(weatherData);
        const gradientInfo = getGradientInfo({
            id: weatherData.weather[0].id,
            sunrise: weatherData.sys.sunrise,
            sunset: weatherData.sys.sunset,
            timezone: weatherData.timezone
        });
        
        return (
            <div className={`p-4 rounded-lg text-white ${gradientInfo}`}>
                
                <div>
                    {isCityChanging 
                        ? <p className="text-xl text-shadow-md flex mr-3">Loading...</p>                    
                        : <p className="text-xl text-shadow-md flex mr-3">Local Time <ClockComponent timezone={weatherData.timezone}></ClockComponent> </p>                    
                    }
                    
                </div>
                <div className="mt-4 ">
                    {Array(Math.ceil(weatherData.weather.length / 2)).fill().map((_, index) => {
                        const conditionsPair = weatherData.weather.slice(index * 2, (index * 2) + 2); // 2개마다 행바꿈
                        return (
                            <div key={index}>
                                {getWeatherInfo(conditionsPair)}
                            </div>
                        );
                    })}
                </div>
                <div className="flex">
                    <div className="w-1/2 text-white">
                        <h2 className="text-xl text-shadow-sm">Temperature</h2>
                        <p className="text-2xl text-shadow-lg-dark">{getTempByUnit}</p>
                    </div>
                    <div className="w-1/2 text-white">
                        <h2 className="text-xl text-shadow-sm">High / Low</h2>
                        <p className="text-2xl text-shadow-lg-dark">{getWeatherByUnit(weatherData.main.temp_max, unit)} / {getWeatherByUnit(weatherData.main.temp_min, unit)}</p>
                    </div>
                </div>
                <div className="flex justfy-center">
                    <div className="text-white text-shadow-sm mt-4 w-1/2">
                        <p className="text-xl flex"> Humidity : {weatherData.main.humidity}</p>
                        <p className="text-xl flex">Wind speed: {weatherData.wind.speed}</p>
                    </div>
                    <div className="text-white text-shadow-sm mt-4 w-1/2">
                        <p className="text-xl flex"> Sunrise : {getLocalTimeByFormat(weatherData.sys.sunrise, weatherData.timezone, "hm")}</p>
                        <p className="text-xl flex"> Sunset : {getLocalTimeByFormat(weatherData.sys.sunset, weatherData.timezone, "hm")}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex justify-center bg-gray-200 pt-20 pb-20">
            <div className="p-8 bg-white shadow-lg rounded-lg flex flex-col space-y-4 w-1/2 min-w-500">
                <Label size="large" className="text-shadow-lg-light">Weather Information</Label>
                <div className="flex space-x-4">
                    <Dropdown options={cities} onChange={handleCityChange} className="w-1/2" msg="select city" />
                    <Dropdown options={options} onChange={handleUnitChange} className="w-1/2" />
                </div>
                {renderWeather()}

            </div>
        </div>
    );
}

export default WeatherComponent;