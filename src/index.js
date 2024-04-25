import getData from "./weatherRequest.js";
import { setWeatherUI } from "./visual.js";

function getWeatherData(city, lang) {
  getData(city, lang, onDataReceive);
}

function onDataReceive(data) {
  console.log(data.forecast.forecastday[0].day.avgtemp_c);
  const conimg = data.current.condition.icon;
  const contxt = data.current.condition.text;
  const temp = data.current.temp_c;
  const humidity = data.current.humidity;
  const windSpeed = data.current.wind_kph;
  setWeatherUI(conimg, contxt, temp, humidity, windSpeed);
}

export { getWeatherData };
