const mealBaseURL = 'https://www.themealdb.com/api/json/v1/1';
const beverageBaseURL = 'https://www.thecocktaildb.com/api/json/v1/1';
const alertMessage = 'Sua busca deve conter somente 1 (um) caracter';
const firstLetter = 'first-letter';

export const fetchDetails = async (id, api) => {
  let url = '';
  if (api === 'meal') url = `${mealBaseURL}/lookup.php?i=${id}`;
  else url = `${beverageBaseURL}/lookup.php?i=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return Object.values(data)[0][0];
};

const fetchMeal = async (value, type) => {
  let url = '';
  switch (type) {
  case 'ingredient':
    url = `${mealBaseURL}/filter.php?i=${value}`;
    break;
  case 'name':
    url = `${mealBaseURL}/search.php?s=${value}`;
    break;
  case firstLetter:
    url = `${mealBaseURL}/search.php?f=${value}`;
    break;
  case 'categories':
    url = `${mealBaseURL}/filter.php?c=${value}`;
    break;
  case 'firstFetch':
    url = `${mealBaseURL}/search.php?s=`;
    break;
  case 'categoriesList':
    url = `${mealBaseURL}/list.php?c=list`;
    break;
  default:
    break;
  }
  if (type === firstLetter && value.length > 1) {
    // eslint-disable-next-line no-alert
    window.alert(alertMessage);
    return null;
  }
  if (url === '') return null;

  const response = await fetch(url);
  const { meals } = await response.json();
  const empty = [];
  return meals || empty;
};

const fetchDrinks = async (value, type) => {
  let url = '';
  switch (type) {
  case 'ingredient':
    url = `${beverageBaseURL}/filter.php?i=${value}`;
    break;
  case 'name':
    url = `${beverageBaseURL}/search.php?s=${value}`;
    break;
  case firstLetter:
    url = `${beverageBaseURL}/search.php?f=${value}`;
    break;
  case 'categories':
    url = `${beverageBaseURL}/filter.php?c=${value}`;
    break;
  case 'firstFetch':
    url = `${beverageBaseURL}/search.php?s=`;
    break;
  case 'categoriesList':
    url = `${beverageBaseURL}/list.php?c=list`;
    break;
  default:
    break;
  }
  if (type === firstLetter && value.length > 1) {
    // eslint-disable-next-line no-alert
    window.alert(alertMessage);
    return null;
  }
  if (url === '') return null;

  const response = await fetch(url);
  const { drinks } = await response.json();
  const empty = [];
  return drinks || empty;
};

export const fetchApi = async (value, type, api) => {
  if (api === 'meal') return fetchMeal(value, type);
  return fetchDrinks(value, type);
};

export const fetchRandom = async (type) => {
  let url = '';
  switch (type) {
  case 'comidas':
    url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    break;
  case 'bebidas':
    url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    break;
  default:
    break;
  }
  const response = await fetch(url);
  const results = await response.json();
  if (type === 'comidas') return Object.entries(results)[0][1][0].idMeal;
  return Object.entries(results)[0][1][0].idDrink;
};

export const fetchByIngredients = async (type) => {
  const MAX_LENGTH = 12;
  const MIN_LENGTH = 0;
  let url = '';
  switch (type) {
  case 'comidas':
    url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    break;
  case 'bebidas':
    url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    break;
  default:
    break;
  }
  const response = await fetch(url);
  const results = await response.json();
  if (type === 'comidas') return results.meals.slice(MIN_LENGTH, MAX_LENGTH);
  return results.drinks.slice(MIN_LENGTH, MAX_LENGTH);
};
