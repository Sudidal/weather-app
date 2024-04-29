import { updateOptions, getOptions } from "./index.js";

const dialog = document.querySelector(".settings-dialog");
const closeBtn = dialog.querySelector(".close-btn");
const saveBtn = dialog.querySelector(".save-btn");

const tempInput = dialog.querySelectorAll("[name='temp-unit']");
const disInput = dialog.querySelectorAll("[name='dis-unit']");
const hoursSystem = dialog.querySelector("#hours-check");
const cityInput = dialog.querySelector("#city-input");

closeBtn.addEventListener("click", () => {
  closeMenu();
});
saveBtn.addEventListener("click", () => {
  setOptions();
  closeMenu();
});

function openMenu() {
  const curOptions = getOptions();
  hoursSystem.value = curOptions.getTHS();
  cityInput.value = curOptions.getCity();

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

  for (let i = 0; i < tempInput.length; i++) {
    if (tempInput[i].checked) {
      tempValue = tempInput[i].value;
    }
  }
  if (tempValue === "") {
    console.log("No temperature unit selected");
  }

  for (let i = 0; i < disInput.length; i++) {
    if (disInput[i].checked) {
      disValue = disInput[i].value;
    }
  }
  if (disValue === "") {
    console.log("No distance unit selected");
  }

  if (hoursSystem.checked) {
    THS = true;
  } else {
    THS = false;
  }

  cityValue = cityInput.value;
  if (cityValue === "") {
    console.log("No city was entered");
  }

  const newOptions = {
    tempValue,
    disValue,
    THS,
    cityValue,
  };

  updateOptions(newOptions);
}

export { openMenu };
