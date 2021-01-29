async function RequestDrinkByName(nome) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`;
  const data = await fetch(endpoint).then((response) => response.json());
  const { drinks } = data;
  return drinks;
}

export default RequestDrinkByName;
