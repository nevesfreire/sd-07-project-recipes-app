const start = 0;
const end = 12;

export const fetchAllCocktails = async (
  searcher = '',
  category = '',
  initArr = start,
  endArr = end,
) => {
  const URL_ALL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searcher}`;
  const URL_CATEGORY = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;

  const URL = category === '' ? URL_ALL : URL_CATEGORY;
  const resolve = await fetch(URL);

  const resolveJson = await resolve.json();

  const limitArray = resolveJson.drinks.slice(initArr, endArr);

  return limitArray;
};

export const fetchCategoriesCocktails = async () => {
  const sizeInit = 0;
  const sizeEnd = 5;

  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const resolve = await fetch(URL);

  const resolveJson = await resolve.json();

  const limitArray = resolveJson.drinks.slice(sizeInit, sizeEnd);

  return limitArray;
};

export const getAPIIngredientsDrinks = async (
  ingredient,
  initArr = start,
  endArr = end,
) => {
  const resolveJson = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const ingredientJSON = await resolveJson.json();
  const ingredientsData = await ingredientJSON.drinks.slice(initArr, endArr);
  return ingredientsData;
};

export const getAPINameDrinks = async (
  name,
  initArr = start,
  endArr = end,
) => {
  const resolve = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

  const nameJSON = await resolve.json();
  const nameData = await nameJSON.drinks.slice(initArr, endArr);
  return nameData;
};

export const getAPIFilterFirstLetterDrinks = async (
  firstLetter,
  initArr = start,
  endArr = end,
) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const firstLetterJSON = await response.json();
  const firstLetterData = firstLetterJSON.drinks.slice(initArr, endArr);
  return firstLetterData;
};
