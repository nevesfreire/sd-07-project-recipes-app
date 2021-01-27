import {
  requestFoodRecipes,
  listFoodRecipes,
  failedFoodRequest,
} from '../redux/actions';

const getFoodRecipes = ({ searchInput, searchRadio }) => {
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

export default getFoodRecipes;
