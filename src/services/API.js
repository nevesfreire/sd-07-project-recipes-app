export async function fetchGlobalFood() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const meals = await response.json();
  return meals.meals;
}

export async function fetchFoodByIngredients(ingredient) {
  const response = await fetch(`{'https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}'}`);
  const meals = response.json();
  return meals.meals;
}

export async function fetchFoodByName(name) {
  const response = await fetch(`{'https://www.themealdb.com/api/json/v1/1/search.php?s=${name}'}`);
  const meals = response.json();
  return meals.meals;
}

export async function fetchFoodByFirstLetter(letter) {
  const response = await fetch(`{'https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}'}`);
  const meals = response.json();
  return meals.meals;
}

export async function fetchGlobalDrink() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const drinks = await response.json();
  return drinks.drinks;
}
