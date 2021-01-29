async function CategoriesFood(food) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${food}`;
  const data = await fetch(endpoint).then((response) => response.json());
  const { meals } = data;
  return meals;
}

export default CategoriesFood;
