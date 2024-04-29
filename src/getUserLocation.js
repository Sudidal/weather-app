async function getLocation(callback) {
  navigator.geolocation.getCurrentPosition(async (response) => {
    getLocationName(response.coords.latitude, response.coords.longitude).then(
      (result) => {
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
