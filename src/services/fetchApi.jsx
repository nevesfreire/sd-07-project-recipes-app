// export const fetchApi = (endpoint) => fetch(endpoint)

//   .then((data) => {
//     console.log(data);
//     data.json();
//   })
//   .catch((err) => console.log(err));

export async function fetchApi(endpoint) {
  const result = await fetch(endpoint);
  const jsonData = await result.json();
  console.log(jsonData);
  return jsonData;
}

//   .then((data) => {
//     console.log(data);
//     data.json();
//   })
//   .catch((err) => console.log(err));

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

export const getFoodCategory = (category) => (
  `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
);

export const getFoodList = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export const allFoodIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

export const allFoodAreas = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

export const getRandomFood = 'https://www.themealdb.com/api/json/v1/1/random.php';

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

export const getDrinksCategory = (category) => (
  `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
);

export const getDrinksList = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const allDrinkIngredients = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

export const getRandomDrink = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
