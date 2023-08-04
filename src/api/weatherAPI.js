import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "593d8a8bc10cb3a6391035a5e3f681fb";

export const fetchWeather = async (lat, lon, unit = 'metric') => {
  try {
    // console.log("unit", unit)
    // metric(섭씨 c), imperial(화씨 f)
    const response = await axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data", error);
    throw error;
  }
};
