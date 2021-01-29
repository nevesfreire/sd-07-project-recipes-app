import {
  requestFoodRecipes,
  listFoodRecipes,
  failedFoodRequest,
  foodFilteredByCategoryAction,
} from '../redux/actions';

export const getFoodRecipes = ({ searchInput = '', searchRadio = 's' }) => {
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

export const getSuggestedFoods = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllFoodCategories = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const foodFilterByCategory = (category) => {
  let foodUrlForFilterByCategory = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`;
  if (category === '') {
    foodUrlForFilterByCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  }
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

export const randomFoodsApi = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
