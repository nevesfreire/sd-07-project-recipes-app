const END_POINT = '/api/json/v1/1';
const mealsBaseURL = `https://www.themealdb.com${END_POINT}`;
const cocktailsBaseURL = 'https://www.thecocktaildb.com/api/json/v1/1';
const alertMessage = 'Sua busca deve conter somente 1 caractere';
const firstLetter = 'first-letter';

const fetchMeal = async (value, type) => {
  let url = '';
  switch(type) {
  case 'ingredient':
    url = `${mealsBaseURL}/filter.php?i=${value}`;
    break;
  case 'name':
    url = `${mealsBaseURL}/filter.php?s=${value}`;
    break;
  case firstLetter:
    url = `${mealsBaseURL}/filter.php?f=${value}`;
    break;
  default:
    break;
  }
}