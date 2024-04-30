import { getLocation } from "./getUserLocation.js";
import { save } from "./saveLoadManager.js";
import "./style.css";

const getStartedBtn = document.querySelector(".get-started-btn");
const findLocationBtn = document.querySelector(".find-location-btn");
let locationText; //initialized at runtime

const cityInput = document.querySelector(".city-input");
const countryInput = document.querySelector(".country-input");

let cityValue;
let countryValue;

getStartedBtn.addEventListener("click", () => {
  getStarted();
});
findLocationBtn.addEventListener("click", () => {
  locationText = document.createElement("p");
  locationText.className = "location-text";
  locationText.textContent = "Please wait...";
  findLocationBtn.replaceWith(locationText);
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
  locationText.textContent =
    "Your location is: " +
    data[0] +
    " " +
    data[1] +
    ", You can start using the app now";
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
  document.location.replace(document.location.pathname + "/weatherInfo.html");
  console.log(document.location.pathname + "/weatherInfo.html");
}
