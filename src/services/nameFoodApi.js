async function RequestFoodBayName(nome) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
  const data = await fetch(endpoint).then((response) => response.json());
  const { meals } = data;
  return meals;
}

export default RequestFoodBayName;
