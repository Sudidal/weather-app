import "./visual.js";
import "./style.css";
import getData from "./weatherRequest.js";
import { setWeatherUI } from "./visual.js";

const hoursAhead = 6;
const days = 6;
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let data;

function getWeatherData(city, lang) {
  getData(city, lang, days, onDataReceive);
}

function onDataReceive(input) {
  data = input;
  display();
}

function display(day = 0) {
  const localTime = data.location.localtime.split(" ");

  const conimg = data.forecast.forecastday[day].day.condition.icon;
  const contxt = data.forecast.forecastday[day].day.condition.text;
  const location = data.location.name;
  const curDate = data.forecast.forecastday[day].date;
  const avgtemp = data.forecast.forecastday[day].day.avgtemp_c;
  const maxtemp = data.forecast.forecastday[day].day.maxtemp_c;
  const mintemp = data.forecast.forecastday[day].day.mintemp_c;
  const humidity = data.forecast.forecastday[day].day.avghumidity;
  const windSpeed = data.forecast.forecastday[day].day.maxwind_kph;
  const persipitation = data.forecast.forecastday[day].day.daily_chance_of_rain;

  const curHourMinute = localTime[1].split(":");
  const curHourString = curHourMinute[0];
  const curHour = Number(curHourString);

  const receivedDays = data.forecast.forecastday.length;

  const hours = Array(hoursAhead);

  let startFrom = curHour;
  if (curHour + hoursAhead - 1 > 23) {
    startFrom = 23 - hoursAhead + 1;
  }
  for (let i = 0; i < hoursAhead; i++) {
    const hour = startFrom;
    const img = data.forecast.forecastday[day].hour[startFrom].condition.icon;
    const temp = data.forecast.forecastday[day].hour[startFrom].temp_c;
    const obj = {
      hour,
      img,
      temp,
    };
    hours[i] = obj;
    startFrom++;
  }
  setWeatherUI(
    conimg,
    contxt,
    location,
    curDate,
    localTime[0],
    avgtemp,
    maxtemp,
    mintemp,
    humidity,
    windSpeed,
    persipitation,
    hours,
    receivedDays,
  );
}

function changeDay(day) {
  display(day);
}

function getDayNameByDate(input) {
  const date = new Date(input);
  const day = date.getDay();
  return weekDays[day];
}

console.log("debug hererere");

// console.log("debuggg here")
getWeatherData("hilla iraq", "en");

export { getWeatherData, changeDay, getDayNameByDate };
