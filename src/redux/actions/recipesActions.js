export const REQUEST_RECIPES = 'REQUEST_RECIPES';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const LIST_RECIPES = 'LIST_RECIPES';
export const FILTERED_BY_CATEGORY = 'FILTERED_BY_CATEGORY';
export const REQUEST_INGREDIENTS = 'REQUEST_INGREDIENTS';
export const CHANGE_CURRENT_CATEGORY = 'CHANGE_CURRENT_CATEGORY';

export const filteredByCategoryAction = (filteredByCategory) => ({
  type: FILTERED_BY_CATEGORY,
  filteredByCategory,
});

export const requestRecipes = () => ({
  type: REQUEST_RECIPES,
});

export const failedRequest = (error) => ({
  type: REQUEST_FAILED,
  error,
});

export const listRecipes = (recipes) => ({
  type: LIST_RECIPES,
  recipes,
});

export const requestIngredients = (ingredients) => ({
  type: REQUEST_INGREDIENTS,
  ingredients,
});

export const changeCurrentCategoryAction = (category) => ({
  type: CHANGE_CURRENT_CATEGORY,
  category,
});
