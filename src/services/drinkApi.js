import {
  requestDrinkRecipes,
  listDrinkRecipes,
  failedDrinkRequest,
  drinkFilteredByCategoryAction,
} from '../redux/actions';

export const getDrinkRecipes = ({ searchInput = '', searchRadio = 's' }) => {
  let endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${searchRadio}=${searchInput}`;
  if (searchRadio === 's' || searchRadio === 'f') {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${searchRadio}=${searchInput}`;
  }
  return async (dispatch) => {
    dispatch(requestDrinkRecipes());
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      dispatch(listDrinkRecipes(data));
    } catch (error) {
      dispatch(failedDrinkRequest(error));
    }
  };
};

export const getDrink = async (recipeId) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getSuggestedDrinks = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllDrinksCategories = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const drinksFilteredByCategory = (category) => {
  let drinkUrlForFilterByCategory = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.strCategory}`;
  if (category === '') {
    drinkUrlForFilterByCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  }
  return async (dispatch) => {
    dispatch(requestDrinkRecipes());
    try {
      const resquestFilteredByCategory = await fetch(drinkUrlForFilterByCategory);
      const JSONresponseFiltered = await resquestFilteredByCategory.json();
      dispatch(drinkFilteredByCategoryAction(JSONresponseFiltered.drinks, category));
    } catch (error) {
      dispatch(failedDrinkRequest(error));
    }
  };
};

export const getIngredientsDrink = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
