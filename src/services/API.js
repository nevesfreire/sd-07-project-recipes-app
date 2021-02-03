async function fetchGlobalMeal() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const meals = await response.json();
  return meals.meals;
}

async function fetchMealCategory() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const categories = await response.json();
  return categories.meals;
}

async function fetchMealByIngredients(ingredient) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const meals = await response.json();
  return meals.meals;
}

async function fetchMealByName(name) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const meals = await response.json();
  return meals.meals;
}

async function fetchMealByFirstLetter(letter) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const meals = await response.json();
  return meals.meals;
}

async function fetchMealByCategory(category) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const meals = await response.json();
  return meals.meals;
}

async function fetchGlobalDrink() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const drinks = await response.json();
  return drinks.drinks;
}

async function fetchDrinkCategory() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const categories = await response.json();
  return categories.drinks;
}

async function fetchDrinkByIngredients(ingredient) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const drinks = await response.json();
  return drinks.drinks;
}

async function fetchDrinkByName(name) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const drinks = await response.json();
  return drinks.drinks;
}

async function fetchDrinksByFirstLetter(letter) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const drinks = await response.json();
  return drinks.drinks;
}
async function fetchDrinkByCategory(category) {
  try {
    const response1 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const drinks = await response1.json();
    return drinks.drinks;
  } catch (e) {
    return [];
  }
}

async function fetchDrinkDetailsById(id) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const details = await response.json();
  return details.drinks;
}

async function fetchFoodDetailsById(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const details = await response.json();
  if (details) return details.meals;
}

async function fetchRamdonFood() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const meal = await response.json();
  if (meal) return meal.meals;
}

async function fetchRamdonDrink() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const drink = await response.json();
  if (drink) return drink.drinks;
}

async function fetchAllAreaOptions() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const list = await response.json();
  if (list) return list.meals;
}

async function fetchFoodByArea(area) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const list = await response.json();
  if (list) return list.meals;
}

export {
  fetchGlobalMeal,
  fetchMealCategory,
  fetchMealByIngredients,
  fetchMealByName,
  fetchMealByFirstLetter,
  fetchMealByCategory,
  fetchGlobalDrink,
  fetchDrinkCategory,
  fetchDrinkByIngredients,
  fetchDrinkByName,
  fetchDrinksByFirstLetter,
  fetchDrinkByCategory,
  fetchDrinkDetailsById,
  fetchFoodDetailsById,
  fetchRamdonFood,
  fetchRamdonDrink,
  fetchAllAreaOptions,
  fetchFoodByArea,
};
