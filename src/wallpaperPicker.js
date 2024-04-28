function getWallpaperAndAttribute(code) {
  const image = pickImage(code);
  return image;
}

function pickImage(c) {
  let name = "";
  if (c === 1000) {
    name = "Sunny";
  } else if (c === 1003) {
    name = "PartlyCloudy";
  } else if (c === 1006) {
    name = "Cloudy";
  } else if (c === 1009) {
    name = "Overcast";
  } else if (c === 1030 || c === 1135) {
    name = "Mist";
  } else if (c === 1063 || c === 1180) {
    name = "PossibleRain";
  } else if (
    c === 1183 ||
    c === 1186 ||
    c === 1189 ||
    c === 1192 ||
    c === 1195
  ) {
    name = "Rain";
  } else if (c === 1240 || c === 1243 || c === 1246) {
    name = "HeavyRain";
  } else if (c === 1273 || c === 1276 || c === 1279 || c === 1282) {
    name = "Thunder";
  } else if (
    c === 1066 ||
    c === 1114 ||
    c === 1168 ||
    c === 1171 ||
    c === 1201 ||
    c === 1207
  ) {
    name = "Snow";
  } else if (c === 1117 || c === 1222 || c === 1225 || c === 1258) {
    name = "Blizzard";
  } else {
    console.log("Code wasn't assigned, Fallback to Overcast");
    name = "Overcast";
  }
  console.log(name);
  const img = name;
  return img;
}

export { getWallpaperAndAttribute };
