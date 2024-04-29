function save(object) {
  for (const property in object) {
    const key = property;
    const value = object[property];
    localStorage.setItem(key, value);
  }
}
function load(itemKey) {
  return localStorage.getItem(itemKey);
}

export { save, load };
