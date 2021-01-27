const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const auxFunc = (term, type) => {
  if (term && type) {
    if (type === 'i') {
      return `https://www.themealdb.com/api/json/v1/1/filter.php?${type}=${term}`;
    } if (type === 'f' && term.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      return `https://www.themealdb.com/api/json/v1/1/search.php?${type}=${term}`;
    }
  }
  return 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
};

export const mealsAPI = async (term, type) => {
  const mealUrl = auxFunc(term, type);
  try {
    const response = await fetch(mealUrl);
    const dataMeal = await response.json();
    return dataMeal;
  } catch (error) {
    return error.message;
  }
};

export const drinksAPI = async () => {
  try {
    const response = await fetch(drinkUrl);
    const dataDrink = await response.json();

    return dataDrink;
  } catch (error) {
    return error.message;
  }
};
