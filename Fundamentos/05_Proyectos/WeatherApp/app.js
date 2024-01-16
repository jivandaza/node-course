import axios from "axios";
import chalk from "chalk";

const API_KEY = "8c04c5a94eaeb1ba426b0430c6b3dd04";

const getWeather = async (city) => {
    try {
        let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

        const response = await axios.get(endpoint, {
           params: {
               q: city,
               appid: API_KEY,
               units: "metric"
           }
        });

        //console.log(response);
        return response.data;
    } catch (error) {
        displayMessageError("Error: "+error);
        throw new Error("No es posible obtener la información de la ciudad: "+ city);
    }
}

function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function displayMessageError(message) {
    console.log(chalk.bgRedBright.white.bold("\n\t "+message+" "));
}

function displayMessageAccept(message) {
    console.log(chalk.bgGreenBright.white.bold("\n\t "+message+" \n"));
}

function displayMessageWarning(message) {
    console.log(chalk.bgYellowBright.white.bold("\n\t "+message+" \n"));
}

function displayTitleText(text) {
    console.log(chalk.bgBlueBright.white.bold("\n\t\t\t "+text+" "));
}

function displayConsoleText(text) {
    console.log(chalk.cyan.bold("\n\t"+text));
}

function displayWeatherEmoji() {
    console.log(
        chalk.yellow(
            "\n☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️"
        )
    );
}

function handleError(err) {
    displayMessageWarning("Error: "+err.message);
    process.exit(1);
}

function displayWeather(city, weatherData) {
    displayTitleText(`Información del clima: ${city}`);
    displayWeatherEmoji();
    displayConsoleText(`Descripción: ${weatherData.weather[0].description}`);
    displayConsoleText(`Temperatura: ${weatherData.main.temp} °C`);
    displayConsoleText(`Humedad: ${weatherData.main.humidity}%`);
    displayConsoleText(`Velocidad del Viento: ${weatherData.wind.speed} m/s`);
    displayWeatherEmoji();
    displayMessageAccept("Se completo la busqueda")
}

function initApp() {

    let city;

    if (!process.argv[2]) {
        displayMessageError("Por favor, proporciona un nombre de lugar o ciudad");
        displayMessageWarning("Ejecuta el siguiente comando: node app.js [nombre ciudad]");
    } else {
        city = capitalizeFirstLetter(process.argv[2]);

        if (process.argv[3]) {
            city += ` ${capitalizeFirstLetter(process.argv[3])}`;
        }

        getWeather(city)
            .then(weatherData => displayWeather(city, weatherData))
            .catch(handleError);
    }
}

initApp();