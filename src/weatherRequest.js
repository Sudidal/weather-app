const key = "cd2e59453b324bcf890145402242204";
let data = null;

async function sendRequest(_city, _lang, days) {
  const url = `https://api.weatherapi.com/v1/forecast.json?q=${_city}&key=${key}&days=${days}&lang=${_lang}`;
  try {
    console.log("Sending request...");
    const responseObject = await fetch(url);
    console.log("recieved response object");
    const response = await responseObject.json();

    if (response.location != null) {
      data = response;
    } else {
      handleRequestError(response);
    }
  } catch (err) {
    data = null;
    console.log("request failed: " + err);
  }
}

function handleRequestError(response) {
  console.log(response.error.message + " error code: " + response.error.code);
}

// sendRequest(city, language).then(() => {
//   if (data != null) console.log(data.forecast.forecastday[0].day.avgtemp_c);
// }, null);

function getData(city, lang, days, callback) {
  sendRequest(city, lang, days).then(() => {
    if (data != null) {
      callback(data);
    } else {
      console.log("oops, data is null");
    }
  });
}

export default getData;
