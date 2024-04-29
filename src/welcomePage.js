import { getLocation } from "./getUserLocation.js";
import { save } from "./saveLoadManager.js";
import "./style.css";

const getStartedBtn = document.querySelector(".get-started-btn");
const findLocationBtn = document.querySelector(".find-location-btn");

const cityInput = document.querySelector(".city-input");
const countryInput = document.querySelector(".country-input");

let cityValue;
let countryValue;

getStartedBtn.addEventListener("click", () => {
  getStarted();
});
findLocationBtn.addEventListener("click", () => {
  findLocationBtn.textContent = "Please Wait";
  getLocation(onLocationReceive);
});

cityInput.addEventListener("input", () => {
  checkInputValidity();
  cityValue = cityInput.value;
});
countryInput.addEventListener("input", () => {
  checkInputValidity();
  countryValue = countryInput.value;
});

getStartedBtn.disabled = true;

function onLocationReceive(data) {
  cityValue = data[0];
  countryValue = data[1];
  findLocationBtn.textContent = data[0] + " " + data[1];
  getStartedBtn.disabled = false;
  cityInput.disabled = true;
  countryInput.disabled = true;
}

function checkInputValidity() {
  if (cityInput.value !== "" && countryInput.value !== "") {
    getStartedBtn.disabled = false;
  } else {
    getStartedBtn.disabled = true;
  }
}

function getStarted() {
  const obj = {
    city: cityValue,
    country: countryValue,
  };
  save(obj);
  document.location.replace("/weatherInfo.html");
}
