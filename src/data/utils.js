import classname from "classname";

export const WEATHER_CONDITIONS = {
    2: { name: 'Thunderstorm', bg: 'bg-gray-300', gradient: 'from-gray-500', dir: 'bg-gradient-to-t'},
    3: { name: 'Drizzle', bg: 'bg-gray-300', gradient: 'from-gray-500', dir: 'bg-gradient-to-t'},
    5: { name: 'Rain', bg: 'bg-gray-300', gradient: 'from-gray-500', dir: 'bg-gradient-to-t'},
    6: { name: 'Snow', bg: 'bg-gray-300', gradient: 'from-gray-500', dir: 'bg-gradient-to-t'},
    7: { name: 'Atmosphere', bg: 'bg-gray-300', gradient: 'from-gray-500', dir: 'bg-gradient-to-t'},
    80: { name: 'Clouds', bg: 'bg-indigo-300', gradient: 'from-gray-300', dir: 'bg-gradient-to-b'},
    800: { name: 'Clear', bg: 'bg-blue-200', gradient: 'from-indigo-500', dir: 'bg-gradient-to-t'},
    900: { name:'Night', bg:'bg-gray-900', gradient:'from-gray-700', dir: 'bg-gradient-to-t'},
};

export const getGradientInfo = ({id, sunrise, sunset, timezone}) => {
    const nowLocal = Date.now() / 1000 + timezone;

    const localSunrise = sunrise + timezone;
    const localSunset = sunset + timezone;
    // console.log("curr : ", new Date(nowLocal * 1000).toISOString().substr(11, 8));
    // console.log("sunrise : ", new Date(localSunrise * 1000).toISOString().substr(11, 8));
    // console.log("sunset : ", new Date(localSunset * 1000).toISOString().substr(11, 8));

    let group = getGroupById(id);
    if (nowLocal > localSunset || nowLocal < localSunrise) {
        group = 900; // nigth        
    }

    // group info : https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
    const bgGradientInfo = WEATHER_CONDITIONS[group];
    return classname(bgGradientInfo.dir, bgGradientInfo.bg, bgGradientInfo.gradient);
}


export const getWeatherByUnit = (temperature, unit) => {
    if (unit === "imperial") {
        return temperature + "℃";
    } else {
        return ((temperature * 1.8) + 32).toFixed(2) + "°F";
    }
}

const getGroupById = (id) => {
    const group = Math.floor(id / 100);
    if(group !== 8)
        return group;

    return id === 800 ? 800 : 80;
}

export const getLocalTimeByFormat = (time, timezone, format = "hms") => {
    const localTime = (time + timezone) * 1000; // Convert to milliseconds
    const date = new Date(localTime);

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    if (format === "hm") {
      return `${hours % 12}:${String(minutes).padStart(2, "0")} ${ampm}`;
    }

    hours = hours % 12;
    hours = hours ? hours : 12; 

    return `${hours}:${String(minutes).padStart(2, "0")} ${ampm}`;
};
