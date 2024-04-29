import "./visual.js";
import "./optionsMenu.js";
import "./requireModules.cjs";
import "./style.css";
import getData from "./weatherRequest.js";
import { assign, getDataObject } from "./getDataObject";
import { setWeatherUI } from "./visual.js";

const hoursAhead = 6;
const days = 7;
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let data;

let options;
function createOptions() {
  let tempUnit = "";
  let disUnit = "";
  let THS = "";
  let city = "";

  const setTempUnit = (i) => (tempUnit = i);
  const setDisUnit = (i) => (disUnit = i);
  const setTHS = (i) => (THS = i);
  const setCity = (i) => (city = i);
  const getTempUnit = () => tempUnit;
  const getDisUnit = () => disUnit;
  const getTHS = () => THS;
  const getCity = () => city;

  return {
    setTempUnit,
    setDisUnit,
    setTHS,
    setCity,
    getTempUnit,
    getDisUnit,
    getTHS,
    getCity,
  };
}

function getWeatherData(city, lang) {
  getData(city, lang, days, onDataReceive);
}

function onDataReceive(input) {
  data = input;
  display();
}

function display(day = 0) {
  assign(data);
  const dataObj = getDataObject(day, hoursAhead);

  setWeatherUI(dataObj, options);
}

function updateOptions(newOptions) {
  options.setTempUnit(newOptions.tempValue);
  options.setDisUnit(newOptions.disValue);
  options.setTHS(newOptions.THS);
  options.setCity(newOptions.cityValue);

  getWeatherData(options.getCity(), "en");
}

function changeDay(day) {
  display(day);
}

function getDayNameByDate(input) {
  const date = new Date(input);
  const day = date.getDay();
  return weekDays[day];
}

options = createOptions();
options.setTempUnit("c");
options.setDisUnit("kph");
options.setTHS(false);
options.setCity("cairo");

getWeatherData(options.getCity(), "en");

export { getWeatherData, changeDay, getDayNameByDate, updateOptions };
