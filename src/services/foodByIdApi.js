async function RequestFoodById(id) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const data = await fetch(endpoint).then((response) => response.json());
  const { meals } = data;
  return meals;
}

export default RequestFoodById;
