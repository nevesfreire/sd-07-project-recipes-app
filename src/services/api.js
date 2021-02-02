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
