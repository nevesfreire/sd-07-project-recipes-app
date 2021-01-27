export const REQUEST_FOOD_RECIPES = 'REQUEST_FOOD_RECIPES';
export const REQUEST_FOOD_FAILED = 'REQUEST_FOOD_FAILED';
export const LIST_FOOD_RECIPES = 'LIST_FOOD_RECIPES';
export const UPDATE_FOOD_IS_FETCHING = 'UPDATE_FOOD_IS_FETCHING';

export const updateFoodIsFetching = () => ({
  type: UPDATE_FOOD_IS_FETCHING,
});

export const requestFoodRecipes = () => ({
  type: REQUEST_FOOD_RECIPES,
});

export const failedFoodRequest = (error) => ({
  type: REQUEST_FOOD_FAILED,
  error,
});

export const listFoodRecipes = (recipes) => ({
  type: LIST_FOOD_RECIPES,
  payload: recipes,
});
