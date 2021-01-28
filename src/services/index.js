const auxFunc = (term, type, url) => {
  if (term && type) {
    if (type === 'i') {
      return `${url}filter.php?${type}=${term}`;
    } if (type === 'f' && term.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      return `${url}search.php?${type}=${term}`;
    }
  }
  return `${url}search.php?s=`;
};

export const mealsAPI = async (term, type) => {
  const mealUrl = 'https://www.themealdb.com/api/json/v1/1/';
  const URL = auxFunc(term, type, mealUrl);
  try {
    const response = await fetch(URL);
    const dataMeal = await response.json();
    return dataMeal;
  } catch (error) {
    return error.message;
  }
};

export const drinksAPI = async (term, type) => {
  const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';
  const URL = auxFunc(term, type, drinkUrl);
  try {
    const response = await fetch(URL);
    const dataDrink = await response.json();

    return dataDrink;
  } catch (error) {
    return error.message;
  }
};
