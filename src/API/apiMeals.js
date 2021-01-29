const start = 0;
const end = 12;

export const fetchAllRecipes = async (
  searcher = '',
  category = '',
  initArr = start,
  endArr = end,
) => {
  const URL_ALL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searcher}`;
  const URL_CATEGORY = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

  const URL = category === '' ? URL_ALL : URL_CATEGORY;
  const resolve = await fetch(URL);

  const resolveJson = await resolve.json();

  const limitArray = resolveJson.meals.slice(initArr, endArr);

  return limitArray;
};

export const fetchCategoriesMeals = async () => {
  const sizeInit = 0;
  const sizeEnd = 5;

  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const resolve = await fetch(URL);

  const resolveJson = await resolve.json();

  const limitArray = resolveJson.meals.slice(sizeInit, sizeEnd);

  return limitArray;
};
