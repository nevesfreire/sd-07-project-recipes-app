import {
  requestFoodRecipes,
  listFoodRecipes,
  failedFoodRequest,
} from '../redux/actions';

export const getFoodRecipes = ({ searchInput, searchRadio }) => {
  let endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?${searchRadio}=${searchInput}`;
  if (searchRadio === 's' || searchRadio === 'f') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?${searchRadio}=${searchInput}`;
  }
  return async (dispatch) => {
    dispatch(requestFoodRecipes());
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      dispatch(listFoodRecipes(data));
    } catch (error) {
      dispatch(failedFoodRequest(error));
    }
  };
};

export const getFood = async (recipeId) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
