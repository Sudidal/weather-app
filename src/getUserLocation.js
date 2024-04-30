async function getLocation(callback) {
  navigator.geolocation.getCurrentPosition(async (response) => {
    console.log(
      "found location at: lat: " +
        response.coords.latitude +
        " long: " +
        response.coords.longitude,
    );
    console.log("sending request to nominatim.openstreetmap.org");
    getLocationName(response.coords.latitude, response.coords.longitude).then(
      (result) => {
        console.log("received user location name");
        callback(result);
      },
    );
  });
}
async function getLocationName(lat, long) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${long}&zoom=18&format=jsonv2`,
  );
  const data = await response.json();
  const city = data.address.city;
  const country = data.address.country;
  return [city, country];
}

export { getLocation };
