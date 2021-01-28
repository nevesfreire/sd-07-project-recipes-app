async function RequestFoodAPI(ingrediente) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const data = await fetch(endpoint).then((response) => response.json());
  const { meals } = data;
  return meals;
}

export default RequestFoodAPI;
