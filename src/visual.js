import { getWeatherData, changeDay, getDayNameByDate } from "./index.js";
import { getWallpaperAndAttribute } from "./wallpaperPicker.js";
import { getModule, getAttribute } from "./requireModules.cjs";
import { readFile } from "./fileReader.js";
import { openMenu } from "./optionsMenu.js";

const backGround = document.querySelector(".bg-image");
const attributeParent = document.querySelector(".attribute");

const getInfoBtn = document.querySelector(".get-info-btn");
const cityInput = document.querySelector(".city-input");
const langInput = document.querySelector(".lang-input");

const PersipitationImg = document.querySelector(".persipitation-img");
const humidityImg = document.querySelector(".humidity-img");
const windImg = document.querySelector(".wind-img");

const settingsBtn = document.querySelector(".settings-btn");
const settingsIcon = document.querySelector(".settings-img");

const conditionIcon = document.querySelector(".condition-icon");
const conditionText = document.querySelector(".condition-text");
const cityText = document.querySelector(".city-text");
const countryText = document.querySelector(".country-text");
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

settingsBtn.addEventListener("click", () => {
  openMenu();
});
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

function setWeatherUI(data, options) {
  conditionIcon.src = data.getConImg();
  if (data.getConTxt() === "Sunny") {
    conditionIcon.src = getModule("./Icons/Sunny-icon.png");
  }
  const tempUnit = options.getTempUnit();
  const disUnit = options.getDisUnit();
  const THS = options.getTHS();

  conditionText.textContent = data.getConTxt();
  cityText.textContent = data.getLocation().name;
  countryText.textContent = data.getLocation().country;
  dayText.textContent =
    " " + getDayNameByDate(data.getCurDate()) + " " + data.getCurDate();
  avgTempText.textContent =
    Math.round(data.getAvgTemp(tempUnit)) + "°" + tempUnit.toUpperCase();
  maxTempText.textContent =
    Math.round(data.getMaxTemp(tempUnit)) + "°" + tempUnit.toUpperCase();
  minTempText.textContent =
    Math.round(data.getMinTemp(tempUnit)) + "°" + tempUnit.toUpperCase();
  humidityText.textContent = data.getHumidity() + "%";
  windSpeedText.textContent = Math.round(data.getWind(disUnit)) + disUnit;
  percipitationText.textContent = data.getPersipitation() + "%";

  PersipitationImg.src = getModule("./Icons/Persipitation.png");
  humidityImg.src = getModule("./Icons/Humidity.png");
  windImg.src = getModule("./Icons/Wind.png");

  settingsIcon.src = getModule("./Icons/Settings.png");

  //hours
  const hours = data.getHoursForecast();
  for (let i = 0; i < hours.length; i++) {
    const element = hoursList.children[i];

    let hour = hours[i].hour;
    let timeExtension = ":00";
    if (THS) {
      if (hour === 0) {
        hour = 12;
      }
      if (hour > 12) {
        hour -= 12;
        timeExtension = "PM";
      } else [(timeExtension = "AM")];
    }

    element.querySelector(".time").textContent = hour + timeExtension;
    element.querySelector(".temp").textContent =
      Math.round(hours[i].temp) + "°" + tempUnit.toUpperCase();
    element.querySelector("img").src = hours[i].img;
  }
  //days buttons
  const days = data.getDaysForecast();
  for (let i = 0; i < buttons.length; i++) {
    if (i >= data.getReceivedDaysCount) {
      buttons[i--].remove();
      continue;
    }
    let btnClassName = "unselected";
    const date = days[i].date;
    if (date === data.getCurDate()) {
      btnClassName = "selected";
    }
    const img = days[i].day.condition.icon;
    const day = getDayNameByDate(date);
    const button = buttons[i];
    button.className = btnClassName;
    button.querySelector("span").textContent = day;
    const image = button.querySelector("img");
    image.src = img;
  }
  setWallpaper(data.getConditionCode());
}

function setWallpaper(code) {
  const imageName = getWallpaperAndAttribute(code);
  let image = getModule(`./${imageName}/${imageName}-img.jpg`);
  const attributeFilePath = getAttribute(
    `./${imageName}/${imageName}-attribute.json`,
  );
  readFile(attributeFilePath).then(setAttribute);
  if (image == undefined) {
    image = getModule(`./${imageName}/${imageName}-img.png`);
  }
  if (image == undefined) {
    console.error("Couldn't find Background Photo!");
    return;
  }

  backGround.src = image;
}
function setAttribute(input) {
  if (input) {
    const wrapper = attributeParent.querySelector(".attribute-text");
    wrapper.innerHTML = input.data;
  }
}

export { setWeatherUI };
