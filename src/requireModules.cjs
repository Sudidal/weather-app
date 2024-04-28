const images = {};
const attributes = {};

function importImages(r) {
  const keysArray = r.keys();
  keysArray.forEach((key) => {
    images[key] = r(key);
  });
}
function importAttributes(r) {
  const keysArray = r.keys();
  keysArray.forEach((key) => {
    attributes[key] = r(key);
  });
}

importImages(require.context("../Images/", true, /\.(png|jpg|svg)$/));
importAttributes(require.context("../Images/", true, /\.json$/));
function getModule(input) {
  return images[input];
}
function getAttribute(input) {
  const output = attributes[input];
  if (output) return output;
  else console.log("no attribute for this resource");
}
module.exports = { getModule, getAttribute };
