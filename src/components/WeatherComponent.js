import React, { useState, useEffect } from "react";
import { fetchWeather } from "../api/weatherAPI";
import Dropdown from "./Dropdonw";
import Label from "./Label";
import { MAIN_CITIES } from "../data/cities";
import { renderWeather } from "./WeatherInfo";

const IMPERIAL = 'Imperial';
const METRIC  = 'Metric';

function WeatherComponent() {
    const [city, setCity] = useState(""); // default city  
    const [unit, setUnit] = useState(IMPERIAL);
    const [isCityChanging, setIsCityChanging] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const location = MAIN_CITIES[city];
            if (!location) {
                // renderWeather();
                // console.error(`No location data for city: ${city}`);
                return;
            }
            try {
                const data = await fetchWeather(location.lat, location.lon);
                setWeatherData(data);
                setIsCityChanging(false);
            } catch (error) {
                console.error("failed to fatch weather data", error);
            }
        };
        fetchData();
    }, [city]);

    const options = [
        { value: IMPERIAL.toLowerCase(), label: IMPERIAL },
        { value: METRIC.toUpperCase(), label: METRIC }
    ];
    
    const handleCityChange = (selectedOption) => {
        setIsCityChanging(true);
        setCity(selectedOption); 
    };
    
    const handleUnitChange = (selectedOption) => {
        setUnit(selectedOption);
        renderWeather(weatherData, unit, city, isCityChanging);
    };
    const cities = Object.keys(MAIN_CITIES).map(city => ({ value: city, label: city }));
    return (
        <div className="min-h-screen flex justify-center bg-gray-200 pt-20 pb-20">
            <div className="p-8 bg-white shadow-lg rounded-lg flex flex-col space-y-4 md:w-1/2 w-full md:min-w-600">
                <Label size="large" className="text-shadow-lg-light">Weather Information</Label>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <Dropdown options={cities} onChange={handleCityChange} className="w-full md:w-1/2" msg="Select City" />
                    <Dropdown options={options} onChange={handleUnitChange} className="w-full md:w-1/2" />
                </div>
                {renderWeather(weatherData, unit, city, isCityChanging)}
            </div>
        </div>

        // <div className="min-h-screen flex justify-center bg-gray-200 pt-20 pb-20 f">
        //     <div className="p-8 bg-white shadow-lg rounded-lg flex flex-col space-y-4 w-1/2 min-w-600">
        //         <Label size="large" className="text-shadow-lg-light">Weather Information</Label>
        //         <div className="flex space-x-4">
        //             <Dropdown options={cities} onChange={handleCityChange} className="w-1/2" msg="Select City" />
        //             <Dropdown options={options} onChange={handleUnitChange} className="w-1/2" />
        //         </div>
        //         {renderWeather(weatherData, unit, city, isCityChanging)}

        //     </div>
        // </div>
    );
}

export default WeatherComponent;