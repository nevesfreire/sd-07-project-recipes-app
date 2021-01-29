async function RequestDrinkAPI(ingrediente) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const data = await fetch(endpoint)
    .then((response) => response.json())
    .catch((error) => error);
  const { drinks } = data;
  return drinks;
}

export default RequestDrinkAPI;
