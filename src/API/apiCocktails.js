const start = 0;
const end = 12;

export const fetchAllCocktails = async (searcher = '', initArr = start, endArr = end) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searcher}`;
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
