const start = 0;
const end = 12;

export const fetchAllCocktails = async (
  searcher = '',
  category = '',
  type,
) => {
  const URL_BASE = type === 'i'
    ? 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?'
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?';
  const URL_ALL = `${URL_BASE}${type}=${searcher}`;
  const URL_CATEGORY = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;

  const URL = category === '' ? URL_ALL : URL_CATEGORY;
  const resolve = await fetch(URL);

  const resolveJson = await resolve.json();

  if (!resolveJson.drinks) {
    return [];
  }

  const limitArray = resolveJson.drinks.slice(start, end);

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
