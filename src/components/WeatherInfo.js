
import { getGradientInfo, getWeatherByUnit, getLocalTimeByFormat } from "../data/utils";
import ClockComponent from "./ClockComponent";
import { WiSunrise, WiSunset, WiHumidity, WiStrongWind, WiRaindrop, WiThermometer, WiTime4, WiBarometer, WiAlien, WiWindDeg } from "react-icons/wi";

export const getWeatherInfo = (conditions) => {
    return (
        <div className="flex justify-center mt-4 mb-4 -translate-x-2">
            {conditions.map((condition, index) => (
                <div key={index} className="flex items-center mr-4 last:mr-0">
                    <img
                        src={`https://openweathermap.org/img/wn/${condition.icon}.png`}
                        alt={condition.description}
                        className=""
                    />
                    <p className="text-2xl font-bold text-shadow-lg mr-2 pb-1">{condition.main}</p>
                </div>
            ))}
        </div>
    );
}

export const renderWeather = (weatherData, unit, city, isCityChanging) => {
    if (!weatherData || unit === "" || city === "") {
        return null;
    }
    const getTempByUnit = getWeatherByUnit(weatherData.main.temp, unit);
    const feelsLikeByUnit = getWeatherByUnit(weatherData.main.feels_like, unit);
    // console.log(weatherData);
    const gradientInfo = getGradientInfo({
        id: weatherData.weather[0].id,
        sunrise: weatherData.sys.sunrise,
        sunset: weatherData.sys.sunset,
        timezone: weatherData.timezone
    });

    return (
        <div className={`p-4 rounded-lg text-white ${gradientInfo}`}>

            <div className="flex justify-end">
                <WiTime4 className="text-xl self-center mr-1 mt-1 drop-shadow-md-semi-dark" />
                {isCityChanging
                    ? <p className="text-xl text-shadow-md flex mr-3">Loading...</p>
                    : <p className="text-xl text-shadow-md flex mr-3">Local Time <ClockComponent timezone={weatherData.timezone}></ClockComponent> </p>
                }

            </div>
            <div className="mt-8 mb-10">
                {Array(Math.ceil(weatherData.weather.length / 2)).fill().map((_, index) => {
                    const conditionsPair = weatherData.weather.slice(index * 2, (index * 2) + 2); // 2개마다 행바꿈
                    return (
                        <div key={index}>
                            {getWeatherInfo(conditionsPair)}
                        </div>
                    );
                })}
            </div>
            <div className="flex mt-3">
                <div className="w-1/2 text-white">
                    <h2 className="text-lg text-shadow-md flex font-bold"><WiThermometer className="self-center mr-1 mt-1 drop-shadow-md-semi-dark" />TEMPERATURE</h2>
                    <p className="text-2xl text-shadow-lg-dark ml-4">{getTempByUnit}</p>
                    <div className="flex text-sm text-shadow-md ml-4">
                        FEELS LIKE : {feelsLikeByUnit}
                    </div>
                </div>
                <div className="w-1/2 text-white">
                    <h2 className="text-lg text-shadow-md flex font-bold">HIGH / LOW</h2>
                    <p className="text-2xl text-shadow-lg-dark">{getWeatherByUnit(weatherData.main.temp_max, unit)} / {getWeatherByUnit(weatherData.main.temp_min, unit)}</p>
                </div>
            </div>
            <div className="flex flex-col">
                {weatherData.rain && weatherData.rain["1h"] &&
                    <div className="text-white text-shadow-md mt-10">
                        <p className="ml-1 text-sm font-bold">RAIN</p>
                        <div className="flex flex-row">
                            {/* <p className="flex">SUNSET</p> */}
                            <p className="text-lg flex w-1/2">
                                <WiRaindrop className="self-center mr-1 mt-1 drop-shadow-md-semi-dark" />
                                RAIN FALL : {weatherData.rain["1h"]} mm
                            </p>
                        </div>
                    </div>
                }
                <div className="flex flex-row item-center mt-10">
                    <div className="text-white text-shadow-md w-1/2">
                        <p className="ml-1 text-sm font-bold">SUN</p>
                        <div className="flex flex-col ml-1">
                            {/* <p className="flex">SUNSET</p> */}
                            <p className="text-lg flex">
                                <WiSunrise className="self-center mr-1 mt-1 drop-shadow-md-semi-dark" />
                                SUNRISE : {getLocalTimeByFormat(weatherData.sys.sunrise, weatherData.timezone, "hm")}
                            </p>
                            <p className="text-lg flex">
                                <WiSunset className="self-center mr-1 mt-1 drop-shadow-md-semi-dark" />
                                SUNSET: {getLocalTimeByFormat(weatherData.sys.sunset, weatherData.timezone, "hm")}
                            </p>
                        </div>
                    </div>
                    <div className="text-white text-shadow-md w-1/2">
                        <p className="ml-1 text-sm font-bold">WIND</p>
                        <div className="flex flex-col ml-1">
                            <p className="text-lg flex">
                                <WiStrongWind className="self-center mr-1 mt-1 drop-shadow-md-semi-dark" />
                                WIND SPEED : {weatherData.wind.speed} Km/h
                            </p>
                            <p className="text-lg flex">
                                <WiWindDeg className="self-center mr-1 mt-1 drop-shadow-md-semi-dark" />
                                WIND DEGREE : {weatherData.wind.deg}°
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-white text-shadow-md mt-10 flex flex-col">
                    <p className="ml-1 text-sm font-bold">OTHERS</p>
                    <div className="flex flex-row flex-wrap">
                        <p className="text-lg flex w-1/2">
                            <WiAlien className="self-center mr-1 mt-1 drop-shadow-md-semi-dark" />
                            VISIBILITY: {weatherData.visibility}
                        </p>
                        <p className="text-lg flex w-1/2">
                            <WiBarometer className="self-center mr-1 mt-1 drop-shadow-md-semi-dark" />
                            PRESSURE : {weatherData.main.pressure} hPa
                        </p>
                        <p className="text-lg flex w-1/2">
                            <WiHumidity className="self-center mr-1 mt-1 drop-shadow-md-semi-dark" />
                            HUMIDITY : {weatherData.main.humidity} %
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
