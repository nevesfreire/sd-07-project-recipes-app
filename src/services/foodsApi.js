import { twelve } from './numbers';

export async function foodByName(name) {
  const endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const response = await endpoint.json();
  const { meals } = response;
  return meals;
}
export async function foodByIngredient(ingredients) {
  console.log(ingredients);
  const endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  const response = await endpoint.json();
  const { meals } = response;
  return meals;
}
export async function foodByLetter(firstLetter) {
  const endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  console.log(firstLetter);
  const response = await endpoint.json();
  const { meals } = response;
  return meals;
}
export async function foodByCategory(category) {
  const endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const response = await endpoint.json();
  const { meals } = response;
  return meals;
}

export async function foodByArea(valueArea) {
  const endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${valueArea}`);
  const response = await endpoint.json();
  const { meals } = response;
  return meals;
}

export async function getInitialFood() {
  const response = await foodByName('');
  const list = [];
  Object.entries(response).forEach((meal, index) => {
    const { strMeal, strMealThumb, strCategory, idMeal } = meal[1];
    if (index < twelve) list.push({ strMeal, strMealThumb, strCategory, idMeal });
  });
  return list;
}

export async function getFoodCategories(category) {
  const response = await foodByCategory(category);
  const list = [];
  Object.entries(response).forEach((meal, index) => {
    const { strMeal, strMealThumb, strCategory } = meal[1];
    if (index < twelve) list.push({ strMeal, strMealThumb, strCategory });
  });
  return list;
}

export async function getFoodByIngredients(ingredients) {
  const response = await foodByIngredient(ingredients);
  const list = [];
  Object.entries(response).forEach((meal, index) => {
    const { strMeal, strMealThumb, strCategory } = meal[1];
    if (index < twelve) list.push({ strMeal, strMealThumb, strCategory });
  });
  return list;
}
