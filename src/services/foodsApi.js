const cinco = 5;
const doze = 12;

export async function foodByName(name) {
  const endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const response = await endpoint.json();
  const { meals } = response;
  return meals;
}
export async function foodByIngredient(ingredients) {
  const endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  const response = await endpoint.json();
  const { meals } = response;
  return meals;
}
export async function foodByLetter(firstLetter) {
  const endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const response = await endpoint.json();
  const { meals } = response;
  return meals;
}

export async function getInitialFood() {
  const response = await foodByName('');
  const list = [];
  Object.entries(response).forEach((meal, index) => {
    const { strMeal, strMealThumb, strCategory } = meal[1];
    if (index < doze) list.push({ strMeal, strMealThumb, strCategory });
  });
  return list;
}
