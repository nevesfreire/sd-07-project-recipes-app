export const REQUEST_DRINK_RECIPES = 'REQUEST_DRINK_RECIPES';
export const REQUEST_DRINK_FAILED = 'REQUEST_DRINK_FAILED';
export const LIST_DRINK_RECIPES = 'LIST_DRINK_RECIPES';
export const UPDATE_DRINK_IS_FETCHING = 'UPDATE_DRINK_IS_FETCHING';
export const RESQUEST_ALL_CATEGORIES_DRINKS = 'RESQUEST_ALL_CATEGORIES_DRINKS';
export const FILTERED_DRINK_BY_CATEGORY = 'FILTERED_DRINK_BY_CATEGORY';

export const updateDrinkIsFetching = () => ({
  type: UPDATE_DRINK_IS_FETCHING,
});

export const drinkFilteredByCategoryAction = (drinkFilteredByCategory) => ({
  type: FILTERED_DRINK_BY_CATEGORY,
  drinkFilteredByCategory,
});

export const allCategoriesDrinksAction = (categories) => ({
  type: RESQUEST_ALL_CATEGORIES_DRINKS,
  categories,
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
