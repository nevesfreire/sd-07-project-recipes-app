import {
  requestDrinkRecipes,
  listDrinkRecipes,
  failedDrinkRequest,
} from '../redux/actions';

const getDrinkRecipes = ({ searchInput, searchRadio }) => {
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

export default getDrinkRecipes;
