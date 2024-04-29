import "./visual.js";
import "./optionsMenu.js";
import "./requireModules.cjs";
import "./weatherStyle.css";
import { save, load } from "./saveLoadManager.js";
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
  let THS = false;
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

checkData();

function checkData() {
  if (load("city") !== null) {
    if (load("tempUnit") === null) {
      const obj = {
        tempUnit: "c",
        disUnit: "kph",
        THS: true,
      };
      save(obj);
    }
    loadOptions();
    getWeatherData("en");
  } else {
    console.error("No data was found please go back to the home page");
  }
}

function loadOptions() {
  options = createOptions();
  options.setTempUnit(load("tempUnit"));
  options.setDisUnit(load("disUnit"));
  options.setTHS(JSON.parse(load("THS")));
  options.setCity(load("city"));
  options.setCountry(load("country"));
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
  const obj = {
    tempUnit: newOptions.tempValue,
    disUnit: newOptions.disValue,
    THS: newOptions.THS,
    city: newOptions.cityValue,
    country: newOptions.countryValue,
  };
  save(obj);
  checkData();
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

function getOptions() {
  return options;
}

export { changeDay, getDayNameByDate, updateOptions, getOptions };
