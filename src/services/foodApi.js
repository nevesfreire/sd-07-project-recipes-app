import {
  requestFoodRecipes,
  listFoodRecipes,
  failedFoodRequest,
  foodFilteredByCategoryAction,
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

export const foodFilterByCategory = (category) => {
  const foodUrlForFilterByCategory = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`;

  return async (dispatch) => {
    dispatch(requestFoodRecipes());
    try {
      const resquestFilteredByCategory = await fetch(foodUrlForFilterByCategory);
      const JSONresponseFiltered = await resquestFilteredByCategory.json();
      console.log(JSONresponseFiltered.meals);
      dispatch(foodFilteredByCategoryAction(JSONresponseFiltered.meals));
    } catch (error) {
      dispatch(failedFoodRequest(error));
    }
  };
};
