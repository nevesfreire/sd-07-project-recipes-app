export const fetchApi = async (endpoint) => {
  let data = null;
  try {
    const response = await fetch(endpoint);
    data = await response.json();
  } catch (err) {
    console.error(err);
    console.warn(err);
  }
  return data;
};

export const allFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const allDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const getFoodIngredients = (inputText) => (
  `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputText}`
);

export const getFoodName = (inputText) => (
  `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`
);

export const getFoodFLetter = (inputText) => (
  `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`
);

export const getFoodRecipeId = (id) => (
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
);

export const getDrinkIngredients = (inputText) => (
  `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputText}`
);

export const getDrinkName = (inputText) => (
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`
);

export const getDrinkFLetter = (inputText) => (
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputText}`
);

export const getDrinkRecipeId = (id) => (
  `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
);
export const getFoodList = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export const getDrinksList = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const getFoodCategory = (category) => (
  `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
);

export const getDrinksCategory = (category) => (
  `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
);
