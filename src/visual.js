import { getWeatherData } from "./index.js";

const getInfoBtn = document.querySelector(".get-info-btn");
const cityInput = document.querySelector(".city-input");
const langInput = document.querySelector(".lang-input");

const conditionIcon = document.querySelector(".condition-icon");
const conditionText = document.querySelector(".condition-text");
const locationText = document.querySelector(".location-text");
const dayText = document.querySelector(".day-text");

const avgTempText = document.querySelector(".avg-temp-text");
const maxTempText = document.querySelector(".max-temp-text");
const minTempText = document.querySelector(".min-temp-text");
const humidityText = document.querySelector(".humidity-text");
const windSpeedText = document.querySelector(".wind-speed-text");
const percipitationText = document.querySelector(".persipitation-text");

const hoursList = document.querySelector(".hours-list");

getInfoBtn.addEventListener("click", () => {
  const _city = cityInput.value;
  const _lang = langInput.value;
  getWeatherData(_city, _lang);
});

function setWeatherUI(
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
) {
  conditionIcon.src = conimg;
  conditionText.textContent = contxt;
  locationText.textContent = location;
  dayText.textContent = day;
  avgTempText.textContent = avgtemp + "c°";
  maxTempText.textContent = maxtemp + "c°";
  minTempText.textContent = mintemp + "c°";
  humidityText.textContent = "humidity " + humidity + "%";
  windSpeedText.textContent = windSpeed + "kph";
  percipitationText.textContent = "persipitation " + persipitation + "%";

  for (let i = 0; i < hours.length; i++) {
    const element = hoursList.children[i];
    element.querySelector(".time").textContent = hours[i].hour;
    element.querySelector(".temp").textContent = hours[i].temp;
    element.querySelector("img").src = hours[i].img;
  }
}

export { setWeatherUI };
