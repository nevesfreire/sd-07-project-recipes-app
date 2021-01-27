export async function fetchGlobalMeal() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const meals = await response.json();
  return meals.meals;
}

export async function fetchMealCategory() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const categories = await response.json();
  return categories.meals;
}

export async function fetchMealByIngredients(ingredient) {
  const response = await fetch(`{'https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}'}`);
  const meals = response.json();
  return meals.meals;
}

export async function fetchMealByName(name) {
  const response = await fetch(`{'https://www.themealdb.com/api/json/v1/1/search.php?s=${name}'}`);
  const meals = response.json();
  return meals.meals;
}

export async function fetchMealByFirstLetter(letter) {
  const response = await fetch(`{'https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}'}`);
  const meals = response.json();
  return meals.meals;
}

export async function fetchGlobalDrink() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const drinks = await response.json();
  return drinks.drinks;
}

export async function fetchDrinkCategory() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const categories = await response.json();
  return categories.drinks;
}
