let data;

function assign(input) {
  data = input;
}

function getDataObject(day, hoursAhead) {
  const getLocalTime = () => data.location.localtime.split(" ");
  const getDaysForecast = () => data.forecast.forecastday;
  const getConImg = () => data.forecast.forecastday[day].day.condition.icon;
  const getConTxt = () => data.forecast.forecastday[day].day.condition.text;
  const getLocation = () => data.location;
  const getCurDate = () => data.forecast.forecastday[day].date;
  const getHumidity = () => data.forecast.forecastday[day].day.avghumidity;
  const getPersipitation = () =>
    data.forecast.forecastday[day].day.daily_chance_of_rain;
  const getReceivedDaysCount = () => data.forecast.forecastday.length;
  const getConditionCode = () =>
    data.forecast.forecastday[day].day.condition.code;

  const getAvgTemp = (unit) => {
    if (unit === "c") return data.forecast.forecastday[day].day.avgtemp_c;
    else return data.forecast.forecastday[day].day.avgtemp_f;
  };
  const getMaxTemp = (unit) => {
    if (unit === "c") return data.forecast.forecastday[day].day.maxtemp_c;
    else return data.forecast.forecastday[day].day.maxtemp_f;
  };
  const getMinTemp = (unit) => {
    if (unit === "c") return data.forecast.forecastday[day].day.mintemp_c;
    else return data.forecast.forecastday[day].day.mintemp_f;
  };
  const getWind = (unit) => {
    if (unit === "kph") return data.forecast.forecastday[day].day.maxwind_kph;
    else return data.forecast.forecastday[day].day.maxwind_mph;
  };

  // hours forecast data
  const curHourMinute = getLocalTime()[1].split(":");
  const curHour = Number(curHourMinute[0]);
  const hours = Array(hoursAhead);
  let startFrom = curHour;
  if (curHour + hoursAhead - 1 > 23) {
    startFrom = 23 - hoursAhead + 1;
  }
  for (let i = 0; i < hoursAhead; i++) {
    const hour = startFrom;
    const img = data.forecast.forecastday[day].hour[startFrom].condition.icon;
    const temp = data.forecast.forecastday[day].hour[startFrom].temp_c;
    const obj = {
      hour,
      img,
      temp,
    };
    hours[i] = obj;
    startFrom++;
  }
  const getHoursForecast = () => hours;

  return {
    getLocalTime,
    getDaysForecast,
    getConImg,
    getConTxt,
    getLocation,
    getCurDate,
    getHumidity,
    getPersipitation,
    getReceivedDaysCount,
    getConditionCode,
    getAvgTemp,
    getMaxTemp,
    getMinTemp,
    getWind,
    getHoursForecast,
  };
}

export { assign, getDataObject };
