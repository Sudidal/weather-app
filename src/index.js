import "./visual.js";
import "./style.css";
import getData from "./weatherRequest.js";
import { setWeatherUI } from "./visual.js";

const hoursAhead = 6;

function getWeatherData(city, lang) {
  getData(city, lang, onDataReceive);
}

function onDataReceive(data) {
  const conimg = data.current.condition.icon;
  const contxt = data.current.condition.text;
  const location = data.location.name;
  const day = data.forecast.forecastday[0].date;
  const avgtemp = data.forecast.forecastday[0].day.avgtemp_c;
  const maxtemp = data.forecast.forecastday[0].day.maxtemp_c;
  const mintemp = data.forecast.forecastday[0].day.mintemp_c;
  const humidity = data.current.humidity;
  const windSpeed = data.current.wind_kph;
  const persipitation = data.forecast.forecastday[0].day.daily_chance_of_rain;

  const hours = Array(6);
  for (let i = 0; i < hoursAhead; i++) {
    const hour = i;
    const img = data.forecast.forecastday[0].hour[i].condition.icon;
    const temp = data.forecast.forecastday[0].hour[i].temp_c;
    const obj = {
      hour,
      img,
      temp,
    };
    hours[i] = obj;
  }
  console.log(hours);
  setWeatherUI(
    conimg,
    contxt,
    location,
    day,
    avgtemp,
    maxtemp,
    mintemp,
    humidity,
    windSpeed,
    persipitation,
    hours,
  );
}

// console.log("debuggg here")
getWeatherData("hilla iraq", "en");

export { getWeatherData };
