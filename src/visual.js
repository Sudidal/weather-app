import { getWeatherData } from "./index.js";

const getInfoBtn = document.querySelector(".get-info-btn");
const cityInput = document.querySelector(".city-input");
const langInput = document.querySelector(".lang-input");

const conditionIcon = document.querySelector(".condition-icon");
const conditionText = document.querySelector(".condition-text");
const tempText = document.querySelector(".temp-text");
const humidityText = document.querySelector(".humidity-text");
const windSpeedText = document.querySelector(".wind-speed-text");

getInfoBtn.addEventListener("click", () => {
  const _city = cityInput.value;
  const _lang = langInput.value;
  getWeatherData(_city, _lang);
});

function setWeatherUI(conimg, contxt, temp, humidity, windSpeed) {
  conditionIcon.src = conimg;
  conditionText.textContent = contxt;
  tempText.textContent = temp + "c°";
  humidityText.textContent = humidity + "%";
  windSpeedText.textContent = windSpeed + "kph";
}

export { setWeatherUI };
