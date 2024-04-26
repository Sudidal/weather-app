import { getWeatherData, changeDay, getDayNameByDate } from "./index.js";

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

const dayButtonsList = document.querySelector(
  ".day-select-section .buttons-list",
);
const buttons = dayButtonsList.children;

const hoursList = document.querySelector(".hours-list");

getInfoBtn.addEventListener("click", () => {
  const _city = cityInput.value;
  const _lang = langInput.value;
  getWeatherData(_city, _lang);
});
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
    changeDay(i);
  });
}

function setWeatherUI(
  conimg,
  contxt,
  location,
  curDate,
  localDate,
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
  dayText.textContent = " " + getDayNameByDate(curDate) + " " + curDate;
  avgTempText.textContent = avgtemp + "c°";
  maxTempText.textContent = maxtemp + "c°";
  minTempText.textContent = mintemp + "c°";
  humidityText.textContent = "humidity " + humidity + "%";
  windSpeedText.textContent = windSpeed + "kph";
  percipitationText.textContent = "persipitation " + persipitation + "%";

  //hours
  for (let i = 0; i < hours.length; i++) {
    const element = hoursList.children[i];

    let hour = hours[i].hour;
    let timeSymbol = "AM";
    if (hour === 0) {
      hour = 12;
    }
    if (hour > 12) {
      hour -= 12;
      timeSymbol = "PM";
    }

    element.querySelector(".time").textContent = hour + timeSymbol;
    element.querySelector(".temp").textContent = hours[i].temp;
    element.querySelector("img").src = hours[i].img;
  }
  //days buttons
  //yy-mm-dd
  //[yy,mm,dd]
  const localDateSplitted = localDate.split("-");
  for (let i = 0; i < buttons.length; i++) {
    const curDay = Number(localDateSplitted[2]) + i;
    console.log(typeof curDay + " " + curDay);
    const localDateMerged =
      localDateSplitted[0] + "-" + localDateSplitted[1] + "-" + curDay;
    console.log(localDateMerged);
    buttons[i].textContent = getDayNameByDate(localDateMerged);
  }
}

export { setWeatherUI };
