import { getWeatherData, changeDay, getDayNameByDate } from "./index.js";
import { getWallpaperAndAttribute } from "./wallpaperPicker.js";
import { getModule, getAttribute } from "./requireModules.cjs";
import { readFile } from "./fileReader.js";
import { openMenu } from "./settingsMenu.js";

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

function setWeatherUI(
  conimg,
  contxt,
  location,
  curDate,
  days,
  avgtemp,
  maxtemp,
  mintemp,
  humidity,
  windSpeed,
  persipitation,
  hours,
  receivedDays,
) {
  if (contxt === "Sunny") {
    conimg = getModule("./Icons/Sunny-icon.png");
  }

  conditionIcon.src = conimg;
  conditionText.textContent = contxt;
  locationText.textContent = location;
  dayText.textContent = " " + getDayNameByDate(curDate) + " " + curDate;
  avgTempText.textContent = Math.round(avgtemp) + "c°";
  maxTempText.textContent = Math.round(maxtemp) + "c°";
  minTempText.textContent = Math.round(mintemp) + "c°";
  humidityText.textContent = humidity + "%";
  windSpeedText.textContent = Math.round(windSpeed) + "kph";
  percipitationText.textContent = persipitation + "%";

  PersipitationImg.src = getModule("./Icons/Persipitation.png");
  humidityImg.src = getModule("./Icons/Humidity.png");
  windImg.src = getModule("./Icons/Wind.png");

  settingsIcon.src = getModule("./Icons/Settings.png");

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
    element.querySelector(".temp").textContent =
      Math.round(hours[i].temp) + "c°";
    element.querySelector("img").src = hours[i].img;
  }
  //days buttons
  for (let i = 0; i < buttons.length; i++) {
    if (i >= receivedDays) {
      buttons[i--].remove();
      continue;
    }
    let btnClassName = "unselected";
    const date = days[i].date;
    if (date === curDate) {
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
}

function setWallpaper(code) {
  const imageName = getWallpaperAndAttribute(code);
  let image = getModule(`./${imageName}/${imageName}-img.jpg`);
  const attributeFilePath = getAttribute(
    `./${imageName}/${imageName}-attribute.json`,
  );
  console.log(attributeFilePath);
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

export { setWeatherUI, setWallpaper };
