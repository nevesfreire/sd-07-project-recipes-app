const categoryMealUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const categoryDrinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const foodDetail = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const drinkDetail = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const mealIngredientsUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const drinkIngredientsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const areaExplore = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
const randomDrinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

const auxFunc = (term, type, url) => {
  if (term && type) {
    if (type === 'i' || type === 'c' || type === 'a') {
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

export const categoryMealApi = async () => {
  try {
    const response = await fetch(categoryMealUrl);
    const categoryMeal = await response.json();

    return categoryMeal;
  } catch (error) {
    return error.message;
  }
};

export const categoryDrinkApi = async () => {
  try {
    const response = await fetch(categoryDrinkUrl);
    const categoryDrink = await response.json();

    return categoryDrink;
  } catch (error) {
    return error.message;
  }
};

export const detailApi = async (id, pathname) => {
  let url = '';
  if (pathname === 'comidas') {
    url = `${foodDetail}${id}`;
  } else {
    url = `${drinkDetail}${id}`;
  }
  try {
    const response = await fetch(url);
    const recipeDetailData = await response.json();

    return recipeDetailData;
  } catch (error) {
    return error.message;
  }
};

export const mealIngredientsAPI = async () => {
  try {
    const response = await fetch(mealIngredientsUrl);
    const ingredients = await response.json();

    return ingredients;
  } catch (error) {
    return error.message;
  }
};

export const drinkIngredientsAPI = async () => {
  try {
    const response = await fetch(drinkIngredientsUrl);
    const ingredients = await response.json();

    return ingredients;
  } catch (error) {
    return error.message;
  }
};

export const areaExplorerAPI = async () => {
  try {
    const response = await fetch(areaExplore);
    const areas = await response.json();

    return areas;
  } catch (error) {
    return error.message;
  }
};

export const randomMealAPI = async () => {
  try {
    const response = await fetch(randomMealUrl);
    const meal = await response.json();

    return meal;
  } catch (error) {
    return error.message;
  }
};

export const randomDrinkAPI = async () => {
  try {
    const response = await fetch(randomDrinkUrl);
    const drink = await response.json();

    return drink;
  } catch (error) {
    return error.message;
  }
};
