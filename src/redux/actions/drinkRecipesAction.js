export const REQUEST_DRINK_RECIPES = 'REQUEST_DRINK_RECIPES';
export const REQUEST_DRINK_FAILED = 'REQUEST_DRINK_FAILED';
export const LIST_DRINK_RECIPES = 'LIST_DRINK_RECIPES';
export const UPDATE_DRINK_IS_FETCHING = 'UPDATE_DRINK_IS_FETCHING';

export const updateDrinkIsFetching = () => ({
  type: UPDATE_DRINK_IS_FETCHING,
});

export const requestDrinkRecipes = () => ({
  type: REQUEST_DRINK_RECIPES,
});

export const failedDrinkRequest = (error) => ({
  type: REQUEST_DRINK_FAILED,
  error,
});

export const listDrinkRecipes = (recipes) => ({
  type: LIST_DRINK_RECIPES,
  payload: recipes,
});
