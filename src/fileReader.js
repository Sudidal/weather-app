async function readFile(input) {
  try {
    const response = await fetch(input);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("failed to read the parsed file " + err);
  }
}

export { readFile };
