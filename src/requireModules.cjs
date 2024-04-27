const cache = {};

function importAll(r) {
  const keysArray = r.keys();
  keysArray.forEach((key) => {
    cache[key] = r(key);
  });
}

importAll(require.context("../Images/", true, /\.(png|jpg|svg)$/));

function getModule(input) {
  return cache[input];
}
const ass = "Sunny";
console.log(getModule(`./${ass}/${ass}-img.jpg`));
module.exports = { getModule };
