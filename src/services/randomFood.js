async function RequestRandomFood() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const data = await fetch(endpoint).then((response) => response.json());
  const { meals } = data;
  return meals[0].idMeal;
}

export default RequestRandomFood;
