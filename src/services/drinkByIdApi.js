async function RequestDrinkById(id) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const data = await fetch(endpoint).then((response) => response.json());
  const { drinks } = data;
  return drinks;
}

export default RequestDrinkById;
