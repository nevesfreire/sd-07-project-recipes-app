export const REQUEST_FOOD_RECIPES = 'REQUEST_FOOD_RECIPES';
export const REQUEST_FOOD_FAILED = 'REQUEST_FOOD_FAILED';
export const LIST_FOOD_RECIPES = 'LIST_FOOD_RECIPES';
export const UPDATE_FOOD_IS_FETCHING = 'UPDATE_FOOD_IS_FETCHING';
export const RESQUEST_ALL_CATEGORIES_MEALS = 'RESQUEST_ALL_CATEGORIES_MEALS';
export const FILTERED_FOOD_BY_CATEGORY = 'FILTERED_FOOD_BY_CATEGORY';

export const updateFoodIsFetching = () => ({
  type: UPDATE_FOOD_IS_FETCHING,
});

export const foodFilteredByCategoryAction = (foodFilteredByCategory, category) => ({
  type: FILTERED_FOOD_BY_CATEGORY,
  foodFilteredByCategory,
  category,
});

export const allCategoriesFoodsAction = (categories) => ({
  type: RESQUEST_ALL_CATEGORIES_MEALS,
  categories,
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
