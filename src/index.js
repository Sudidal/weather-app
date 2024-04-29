import "./visual.js";
import { getLocation } from "./getUserLocation.js";
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
  let country = "";

  const setTempUnit = (i) => (tempUnit = i);
  const setDisUnit = (i) => (disUnit = i);
  const setTHS = (i) => (THS = i);
  const setCity = (i) => (city = i);
  const setCountry = (i) => (country = i);
  const getTempUnit = () => tempUnit;
  const getDisUnit = () => disUnit;
  const getTHS = () => THS;
  const getCity = () => city;
  const getCountry = () => country;

  return {
    setTempUnit,
    setDisUnit,
    setTHS,
    setCity,
    setCountry,
    getTempUnit,
    getDisUnit,
    getTHS,
    getCity,
    getCountry,
  };
}

function getWeatherData(lang) {
  const location = options.getCity() + " " + options.getCountry();
  getData(location, lang, days, onDataReceive);
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
  options.setCountry(newOptions.countryValue);
  getWeatherData("en");
}

function changeDay(day) {
  display(day);
}

function getDayNameByDate(input) {
  const date = new Date(input);
  const day = date.getDay();
  return weekDays[day];
}

getLocation(onLocationReceive);

function onLocationReceive(input) {
  options = createOptions();
  options.setTempUnit("c");
  options.setDisUnit("kph");
  options.setTHS(false);
  options.setCity(input[0]);
  options.setCountry(input[1]);
  const loc = options.getCity() + " " + options.getCountry();
  getWeatherData("en");
}

function getOptions() {
  return options;
}

export {
  getWeatherData,
  changeDay,
  getDayNameByDate,
  updateOptions,
  getOptions,
};
