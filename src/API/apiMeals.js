const start = 0;
const end = 12;

export const fetchAllRecipes = async (searcher = '', initArr = start, endArr = end) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searcher}`;
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
