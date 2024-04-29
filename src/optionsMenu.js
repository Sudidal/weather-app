import { updateOptions, getOptions } from "./weatherApp.js";

const dialog = document.querySelector(".settings-dialog");
const closeBtn = dialog.querySelector(".close-btn");
const saveBtn = dialog.querySelector(".save-btn");

const tempInput = dialog.querySelectorAll("[name='temp-unit']");
const disInput = dialog.querySelectorAll("[name='dis-unit']");
const hoursSystem = dialog.querySelector("#hours-check");
const cityInput = dialog.querySelector("#city-input");
const countryInput = dialog.querySelector("#country-input");

closeBtn.addEventListener("click", () => {
  closeMenu();
});
saveBtn.addEventListener("click", () => {
  if (setOptions()) closeMenu();
});

function openMenu() {
  const curOptions = getOptions();
  hoursSystem.checked = curOptions.getTHS();
  console.log(typeof curOptions.getTHS() + " " + curOptions.getTHS());
  cityInput.value = curOptions.getCity();
  countryInput.value = curOptions.getCountry();

  for (let i = 0; i < tempInput.length; i++) {
    if (tempInput[i].value === getOptions().getTempUnit()) {
      tempInput[i].checked = true;
    }
  }
  for (let i = 0; i < disInput.length; i++) {
    if (disInput[i].value === getOptions().getDisUnit()) {
      disInput[i].checked = true;
    }
  }

  dialog.show();
}
function closeMenu() {
  dialog.close();
}

function setOptions() {
  let tempValue = "";
  let disValue = "";
  let THS = "";
  let cityValue = "";
  let countryValue = "";

  for (let i = 0; i < tempInput.length; i++) {
    if (tempInput[i].checked) {
      tempValue = tempInput[i].value;
    }
  }
  if (tempValue === "") {
    console.log("No temperature unit selected");
    return false;
  }

  for (let i = 0; i < disInput.length; i++) {
    if (disInput[i].checked) {
      disValue = disInput[i].value;
    }
  }
  if (disValue === "") {
    console.log("No distance unit selected");
    return false;
  }

  if (hoursSystem.checked) {
    THS = true;
  } else {
    THS = false;
  }

  cityValue = cityInput.value;
  if (cityValue === "") {
    console.log("No city was entered");
    return false;
  }

  countryValue = countryInput.value;
  if (countryValue === "") {
    console.log("No country was entered");
    return false;
  }

  const newOptions = {
    tempValue,
    disValue,
    THS,
    cityValue,
    countryValue,
  };

  updateOptions(newOptions);
  return true;
}

export { openMenu };
