const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.OPENWEATHER_API_KEY;

async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

        const response = await axios.get(url);

        return {
            success: true,
            city: city,
            weather: response.data.weather[0].main,
            description: response.data.weather[0].description
        };
    } catch (error) {
        console.error(`Error fetching weather for ${city}`);

        return {
            success: false,
            city: city,
            message: "City not found"
        };
    }
}

module.exports = {
    getWeather
};