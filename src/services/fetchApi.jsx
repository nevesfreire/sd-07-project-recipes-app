export async function fetchApi(endpoint) {
  const result = await fetch(endpoint);
  const jsonData = await result.json();
  console.log(jsonData);
  return jsonData;
}

export const allFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const allDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const getFoodIngredients = (ingredient) => (
  `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
);

export const getFoodName = (name) => (
  `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
);

export const getFoodFLetter = (firstLetter) => (
  `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
);

export const getFoodRecipeId = (id) => (
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
);

export const getFoodCategory = (category) => (
  `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
);

export const getFoodArea = (area) => (
  `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
);

export const getFoodList = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export const allFoodIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

export const allFoodAreas = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

export const getRandomFood = 'https://www.themealdb.com/api/json/v1/1/random.php';

export const getDrinkIngredients = (ingredient) => (
  `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
);

export const getDrinkName = (name) => (
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
);

export const getDrinkFLetter = (firstLetter) => (
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`
);

export const getDrinkRecipeId = (id) => (
  `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
);

export const getDrinksCategory = (category) => (
  `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
);

export const getDrinksList = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const allDrinkIngredients = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

export const getRandomDrink = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
